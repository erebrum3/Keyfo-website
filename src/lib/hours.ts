import { BUSINESS } from '../data/business';

const TIMEZONE = 'Europe/Amsterdam';
const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 24 * 60 * MS_PER_MINUTE;

type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

type AmsterdamParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: Weekday;
  isoDate: string;
  minutesSinceMidnight: number;
};

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  weekday: 'long',
  hour12: false
});

function getAmsterdamParts(date: Date): AmsterdamParts {
  const map = Object.fromEntries(
    partsFormatter.formatToParts(date).map((p) => [p.type, p.value])
  );
  const year = Number(map.year);
  const month = Number(map.month);
  const day = Number(map.day);
  let hour = Number(map.hour);
  if (hour === 24) hour = 0;
  const minute = Number(map.minute);
  const weekday = map.weekday as Weekday;
  const isoDate = `${map.year}-${map.month}-${map.day}`;
  return {
    year,
    month,
    day,
    hour,
    minute,
    weekday,
    isoDate,
    minutesSinceMidnight: hour * 60 + minute
  };
}

function amsterdamWallToDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute);
  const probeParts = getAmsterdamParts(new Date(naiveUtcMs));
  const probeAsUtcMs = Date.UTC(
    probeParts.year,
    probeParts.month - 1,
    probeParts.day,
    probeParts.hour,
    probeParts.minute
  );
  const offsetMs = probeAsUtcMs - naiveUtcMs;
  return new Date(naiveUtcMs - offsetMs);
}

function parseHm(hm: string): { h: number; m: number; minutes: number } {
  const [h, m] = hm.split(':').map(Number);
  return { h, m, minutes: h * 60 + m };
}

const OPENS = parseHm(BUSINESS.openingHours.opens);
const CLOSES = parseHm(BUSINESS.openingHours.closes);
const LAST_PICKUP_MINUTES =
  CLOSES.minutes - BUSINESS.afhaal.lastOrderBeforeCloseMinutes;

const CLOSED_DAYS = new Set<string>(BUSINESS.openingHours.closedDays as readonly string[]);

function isClosedDay(parts: AmsterdamParts): boolean {
  if (CLOSED_DAYS.has(parts.weekday)) return true;
  if (BUSINESS.afhaal.extraClosedDates.includes(parts.isoDate)) return true;
  return false;
}

function nextDayOpening(candidate: Date): Date {
  const next = new Date(candidate.getTime() + MS_PER_DAY);
  const pn = getAmsterdamParts(next);
  return amsterdamWallToDate(pn.year, pn.month, pn.day, OPENS.h, OPENS.m);
}

export function isOpenAt(date: Date): boolean {
  const p = getAmsterdamParts(date);
  if (isClosedDay(p)) return false;
  return (
    p.minutesSinceMidnight >= OPENS.minutes &&
    p.minutesSinceMidnight < CLOSES.minutes
  );
}

export function nextValidPickupSlot(now: Date): Date {
  const stepMs = BUSINESS.afhaal.pickupSlotStepMinutes * MS_PER_MINUTE;
  const leadMs = BUSINESS.afhaal.minLeadMinutes * MS_PER_MINUTE;
  const earliestMs = now.getTime() + leadMs;
  let candidate = new Date(Math.ceil(earliestMs / stepMs) * stepMs);

  for (let i = 0; i < 14 * 24 * 4; i++) {
    const p = getAmsterdamParts(candidate);
    if (isClosedDay(p)) {
      candidate = nextDayOpening(candidate);
      continue;
    }
    if (p.minutesSinceMidnight < OPENS.minutes) {
      candidate = amsterdamWallToDate(p.year, p.month, p.day, OPENS.h, OPENS.m);
      continue;
    }
    if (p.minutesSinceMidnight > LAST_PICKUP_MINUTES) {
      candidate = nextDayOpening(candidate);
      continue;
    }
    return candidate;
  }
  throw new Error('No valid pickup slot found within 14 days');
}

export function validPickupSlotsForNext24h(now: Date): Date[] {
  const stepMs = BUSINESS.afhaal.pickupSlotStepMinutes * MS_PER_MINUTE;
  const first = nextValidPickupSlot(now);
  const cutoffMs = first.getTime() + MS_PER_DAY;
  const slots: Date[] = [];
  let candidate = first;
  let safety = 0;

  while (candidate.getTime() <= cutoffMs && safety++ < 2000) {
    const p = getAmsterdamParts(candidate);
    if (isClosedDay(p)) {
      candidate = nextDayOpening(candidate);
      continue;
    }
    if (p.minutesSinceMidnight < OPENS.minutes) {
      candidate = amsterdamWallToDate(p.year, p.month, p.day, OPENS.h, OPENS.m);
      continue;
    }
    if (p.minutesSinceMidnight > LAST_PICKUP_MINUTES) {
      candidate = nextDayOpening(candidate);
      continue;
    }
    slots.push(candidate);
    candidate = new Date(candidate.getTime() + stepMs);
  }
  return slots;
}

export function formatPickupLabel(date: Date, locale: 'nl' | 'tr'): string {
  const target = getAmsterdamParts(date);
  const now = new Date();
  const today = getAmsterdamParts(now);
  const tomorrow = getAmsterdamParts(new Date(now.getTime() + MS_PER_DAY));

  const localeTag = locale === 'tr' ? 'tr-TR' : 'nl-NL';
  const timeFmt = new Intl.DateTimeFormat(localeTag, {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const timeStr = timeFmt.format(date);

  if (target.isoDate === today.isoDate) {
    return locale === 'tr' ? `bugün ${timeStr}` : `vandaag ${timeStr}`;
  }
  if (target.isoDate === tomorrow.isoDate) {
    return locale === 'tr' ? `yarın ${timeStr}` : `morgen ${timeStr}`;
  }
  const dateFmt = new Intl.DateTimeFormat(localeTag, {
    timeZone: TIMEZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
  return `${dateFmt.format(date)} ${timeStr}`;
}
