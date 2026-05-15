// Smoke test for reservation + groepsbestelling WhatsApp message builders.
// Mirrors the inline buildMessage logic from src/components/ReservationForm.astro
// and src/components/CateringForm.astro. Verifies wording rules from
// memory/feedback_reservation_catering_rules.md.
//
// Run: npx tsx scripts/smoke-requests.mts

import { BUSINESS } from '../src/data/business';
import { CONTENT_NL } from '../src/data/content.nl';
import { CONTENT_TR } from '../src/data/content.tr';

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, info?: unknown) {
  if (cond) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    console.log(`  ❌ ${name}`);
    if (info !== undefined) console.log(`     ${JSON.stringify(info)}`);
  }
}

const FORBIDDEN_PATTERNS: RegExp[] = [
  /\bbeste\b/i,
  /\bnummer\s*1\b/i,
  /\bnumara\s*1\b/i,
  /100\s*%\s*halal/i,
  /certified\s+halal/i,
  /op\s+locatie/i,
  /bezorgen\s+(thuis|aan\s+huis)/i,
  /\bonline\s+bestellen\b/i
];

function buildReservationMessage(locale: 'nl' | 'tr', d: Record<string, string>): string {
  const m = (locale === 'tr' ? CONTENT_TR : CONTENT_NL).reservation.message;
  const lines: string[] = [m.intro, ''];
  lines.push(`${m.nameLabel}: ${d.name}`);
  lines.push(`${m.phoneLabel}: ${d.phone}`);
  lines.push(`${m.peopleLabel}: ${d.people}`);
  lines.push(`${m.dateLabel}: ${d.date}`);
  lines.push(`${m.timeLabel}: ${d.time}`);
  if (d.note) lines.push(`${m.noteLabel}: ${d.note}`);
  lines.push('', m.closing);
  return lines.join('\n');
}

function buildCateringMessage(locale: 'nl' | 'tr', d: Record<string, string>): string {
  const c = (locale === 'tr' ? CONTENT_TR : CONTENT_NL).groepsbestelling;
  const m = c.message;
  const orderTypeMap = c.form.orderTypeOptions as Record<string, string>;
  const budgetMap = c.form.budgetOptions as Record<string, string>;
  const lines: string[] = [m.intro, ''];
  lines.push(`${m.peopleLabel}: ${d.people}`);
  lines.push(`${m.dateLabel}: ${d.date}`);
  lines.push(`${m.timeLabel}: ${d.time}`);
  lines.push(`${m.orderTypeLabel}: ${orderTypeMap[d.orderType] ?? d.orderType}`);
  lines.push(`${m.dishesLabel}: ${d.dishes}`);
  if (d.budget && d.budget !== 'notSpecified') {
    lines.push(`${m.budgetLabel}: ${budgetMap[d.budget] ?? d.budget}`);
  }
  lines.push(`${m.nameLabel}: ${d.name}`);
  lines.push(`${m.phoneLabel}: ${d.phone}`);
  if (d.note) lines.push(`${m.noteLabel}: ${d.note}`);
  lines.push('', m.closing);
  return lines.join('\n');
}

function checkNoForbidden(label: string, text: string) {
  for (const re of FORBIDDEN_PATTERNS) {
    check(`${label}: no forbidden /${re.source}/`, !re.test(text), { match: text.match(re)?.[0] });
  }
}

console.log('--- config ---');
check('reservation.minLeadHours > 0', BUSINESS.reservation.minLeadHours > 0);
check('reservation.maxAdvanceDays > 0', BUSINESS.reservation.maxAdvanceDays > 0);
check('groepsbestelling.minPeople >= 5', BUSINESS.groepsbestelling.minPeople >= 5);
check('groepsbestelling.minLeadHours >= 12', BUSINESS.groepsbestelling.minLeadHours >= 12);

console.log('\n--- NL reservation message ---');
const resNl = buildReservationMessage('nl', {
  name: 'Ahmet',
  phone: '+31 6 12345678',
  people: '4',
  date: '2026-06-15',
  time: '19:30',
  note: 'Bij het raam graag'
});
console.log(resNl);
check('NL reservation: contains intro', resNl.includes('reserveringsaanvraag'));
check('NL reservation: uses request wording (not "rezerveer nu")', !/reserveer\s+nu/i.test(resNl));
check('NL reservation: has all fields', /Naam:.*Telefoon:.*Aantal personen:.*Datum:.*Tijd:/s.test(resNl));
check('NL reservation: closing asks confirm', /bevestigen/i.test(resNl));
checkNoForbidden('NL reservation', resNl);

console.log('\n--- TR reservation message ---');
const resTr = buildReservationMessage('tr', {
  name: 'Ayşe',
  phone: '+31 6 12345678',
  people: '2',
  date: '2026-06-15',
  time: '19:30',
  note: ''
});
console.log(resTr);
check('TR reservation: contains "rezervasyon talebi"', resTr.includes('rezervasyon talebi'));
check('TR reservation: note absent when empty', !resTr.includes(`Not:`));
check('TR reservation: closing in TR', /WhatsApp\s+üzerinden/i.test(resTr));
checkNoForbidden('TR reservation', resTr);

console.log('\n--- NL catering message ---');
const catNl = buildCateringMessage('nl', {
  people: '20',
  date: '2026-07-10',
  time: '18:00',
  orderType: 'afhalen',
  dishes: 'döner, kapsalon, grill mix',
  budget: 'mid',
  name: 'Familie Y.',
  phone: '+31 6 98765432',
  note: 'Verjaardag'
});
console.log(catNl);
check('NL catering: contains "groepsaanvraag"', catNl.includes('groepsaanvraag'));
check('NL catering: order type localized', catNl.includes('Afhalen'));
check('NL catering: budget localized', /€15\s*–\s*€20/.test(catNl));
check('NL catering: dishes preserved', catNl.includes('döner, kapsalon, grill mix'));
checkNoForbidden('NL catering', catNl);

console.log('\n--- TR catering message ---');
const catTr = buildCateringMessage('tr', {
  people: '15',
  date: '2026-07-10',
  time: '18:00',
  orderType: 'eatIn',
  dishes: 'döner, mantı',
  budget: 'notSpecified',
  name: 'Ahmet',
  phone: '+31 6 11112222',
  note: ''
});
console.log(catTr);
check('TR catering: contains "toplu gel-al talebi"', catTr.includes('toplu gel-al talebi'));
check('TR catering: does NOT contain "toplu sipariş"', !catTr.includes('toplu sipariş'));
check('TR catering: order type "Restoranda yemek"', catTr.includes('Restoranda yemek'));
check('TR catering: budget omitted when notSpecified', !catTr.includes('Kişi başı bütçe'));
check('TR catering: no "op locatie"', !/op\s+locatie/i.test(catTr));
checkNoForbidden('TR catering', catTr);

console.log('\n--- WhatsApp URL ---');
const url = BUSINESS.getWhatsAppUrl(resNl);
check('URL points to wa.me', url.startsWith('https://wa.me/'));
check('URL contains business phone', url.includes(BUSINESS.whatsappPhoneDigits));
check('URL is properly encoded', url.includes('%20') || url.includes('%0A'));
check('URL roundtrip preserves message',
  decodeURIComponent(url.split('?text=')[1]!) === resNl,
  { url });

console.log('\n--- content wording ---');
check('NL reservation pageTitle no "beste"', !/\bbeste\b/i.test(CONTENT_NL.reservation.pageTitle));
check('NL groepsbestelling no "op locatie"', !/op\s+locatie/i.test(JSON.stringify(CONTENT_NL.groepsbestelling)));
check('TR groepsbestelling no "op locatie"', !/op\s+locatie/i.test(JSON.stringify(CONTENT_TR.groepsbestelling)));
check('NL reservation availability note present',
  CONTENT_NL.reservation.form.availabilityNote.toLowerCase().includes('whatsapp'));
check('TR reservation availability note present',
  CONTENT_TR.reservation.form.availabilityNote.toLowerCase().includes('whatsapp'));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
