import { BUSINESS } from '../data/business';
import { MENU, formatPriceEurNl, type MenuItem } from '../data/menu';
import { CONTENT_NL } from '../data/content.nl';
import { CONTENT_TR } from '../data/content.tr';
import { formatPickupLabel } from '../lib/hours';

export type Locale = 'nl' | 'tr';

export type LineItem = {
  itemId: string;
  quantity: number;
  note?: string;
};

export type AfhaalState = {
  version: 1;
  updatedAt: number;
  items: LineItem[];
  pickupTimeIso?: string;
  name?: string;
  orderNote?: string;
};

const STORAGE_KEY = 'keyfo_afhaal_v1';
const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_QTY = BUSINESS.afhaal.maxQuantityPerItem;

const ITEM_INDEX: Map<string, MenuItem> = (() => {
  const map = new Map<string, MenuItem>();
  for (const cat of MENU.categories) {
    for (const item of cat.items) map.set(item.id, item);
  }
  return map;
})();

function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function emptyState(): AfhaalState {
  return { version: 1, updatedAt: Date.now(), items: [] };
}

function isValidState(value: unknown): value is AfhaalState {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<AfhaalState>;
  if (s.version !== 1) return false;
  if (typeof s.updatedAt !== 'number') return false;
  if (!Array.isArray(s.items)) return false;
  for (const it of s.items) {
    if (!it || typeof it !== 'object') return false;
    if (typeof it.itemId !== 'string') return false;
    if (typeof it.quantity !== 'number' || it.quantity < 1) return false;
    if (it.note !== undefined && typeof it.note !== 'string') return false;
  }
  if (s.pickupTimeIso !== undefined && typeof s.pickupTimeIso !== 'string') return false;
  if (s.name !== undefined && typeof s.name !== 'string') return false;
  if (s.orderNote !== undefined && typeof s.orderNote !== 'string') return false;
  return true;
}

let state: AfhaalState = emptyState();
let loaded = false;
const subscribers = new Set<(s: AfhaalState) => void>();

function notify() {
  for (const cb of subscribers) cb(state);
}

export function loadState(): AfhaalState {
  if (!hasStorage()) {
    state = emptyState();
    loaded = true;
    return state;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = emptyState();
    } else {
      const parsed = JSON.parse(raw);
      if (!isValidState(parsed)) {
        window.localStorage.removeItem(STORAGE_KEY);
        state = emptyState();
      } else if (Date.now() - parsed.updatedAt > TTL_MS) {
        window.localStorage.removeItem(STORAGE_KEY);
        state = emptyState();
      } else {
        // Drop pickup time if it's now in the past
        if (parsed.pickupTimeIso) {
          const t = Date.parse(parsed.pickupTimeIso);
          if (Number.isNaN(t) || t < Date.now()) delete parsed.pickupTimeIso;
        }
        // Drop unknown item IDs (menu changed since)
        parsed.items = parsed.items.filter((it: LineItem) => ITEM_INDEX.has(it.itemId));
        state = parsed;
      }
    }
  } catch {
    state = emptyState();
  }
  loaded = true;
  return state;
}

export function saveState(): void {
  state = { ...state, updatedAt: Date.now() };
  if (hasStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Quota exceeded or storage disabled — fail silently
    }
  }
  notify();
}

export function getState(): AfhaalState {
  if (!loaded) loadState();
  return state;
}

function ensureLoaded() {
  if (!loaded) loadState();
}

function clamp(qty: number): number {
  if (!Number.isFinite(qty)) return 0;
  return Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));
}

export function addItem(itemId: string, qty: number = 1): void {
  ensureLoaded();
  if (!ITEM_INDEX.has(itemId)) return;
  const delta = clamp(qty);
  if (delta === 0) return;
  const existing = state.items.find((i) => i.itemId === itemId);
  if (existing) {
    existing.quantity = clamp(existing.quantity + delta);
    if (existing.quantity === 0) {
      state.items = state.items.filter((i) => i.itemId !== itemId);
    }
  } else {
    state.items = [...state.items, { itemId, quantity: delta }];
  }
  saveState();
}

export function updateQuantity(itemId: string, qty: number): void {
  ensureLoaded();
  const next = clamp(qty);
  if (next === 0) {
    state.items = state.items.filter((i) => i.itemId !== itemId);
  } else {
    const existing = state.items.find((i) => i.itemId === itemId);
    if (existing) {
      existing.quantity = next;
    } else if (ITEM_INDEX.has(itemId)) {
      state.items = [...state.items, { itemId, quantity: next }];
    }
  }
  saveState();
}

export function removeItem(itemId: string): void {
  ensureLoaded();
  state.items = state.items.filter((i) => i.itemId !== itemId);
  saveState();
}

export function setItemNote(itemId: string, note: string): void {
  ensureLoaded();
  const trimmed = note.trim();
  const existing = state.items.find((i) => i.itemId === itemId);
  if (!existing) return;
  if (trimmed.length === 0) {
    delete existing.note;
  } else {
    existing.note = trimmed;
  }
  saveState();
}

export function setPickupTime(value: string | undefined): void {
  ensureLoaded();
  if (!value) {
    delete state.pickupTimeIso;
  } else {
    state.pickupTimeIso = value;
  }
  saveState();
}

export function setName(value: string | undefined): void {
  ensureLoaded();
  const v = value?.trim();
  if (!v) delete state.name;
  else state.name = v;
  saveState();
}

export function setOrderNote(value: string | undefined): void {
  ensureLoaded();
  const v = value?.trim();
  if (!v) delete state.orderNote;
  else state.orderNote = v;
  saveState();
}

export function clearList(): void {
  ensureLoaded();
  state = emptyState();
  if (hasStorage()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  notify();
}

export function subscribe(callback: (s: AfhaalState) => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function formatPriceForLocale(priceEur: number, locale: Locale): string {
  if (locale === 'tr') {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'EUR'
    }).format(priceEur);
  }
  return formatPriceEurNl(priceEur);
}

export function lineTotal(item: LineItem): number {
  const def = ITEM_INDEX.get(item.itemId);
  if (!def) return 0;
  return def.priceEur * item.quantity;
}

export function indicativeTotal(s: AfhaalState = state): number {
  return s.items.reduce((sum, it) => sum + lineTotal(it), 0);
}

export function buildWhatsAppMessage(s: AfhaalState, locale: Locale): string {
  const content = locale === 'tr' ? CONTENT_TR.afhaal : CONTENT_NL.afhaal;
  const lines: string[] = [content.messageIntro, ''];

  if (s.name) lines.push(`${content.messageNameLabel}: ${s.name}`);
  if (s.pickupTimeIso) {
    const d = new Date(s.pickupTimeIso);
    if (!Number.isNaN(d.getTime())) {
      lines.push(`${content.messagePickupLabel}: ${formatPickupLabel(d, locale)}`);
    }
  }
  if (s.name || s.pickupTimeIso) lines.push('');

  lines.push(`${content.messageListLabel}:`);
  for (const it of s.items) {
    const def = ITEM_INDEX.get(it.itemId);
    if (!def) continue;
    const name = locale === 'tr' ? def.nameTr : def.nameNl;
    let line = `- ${it.quantity}× ${name}`;
    if (it.note) line += ` (${it.note})`;
    lines.push(line);
  }

  if (s.orderNote) {
    lines.push('');
    lines.push(`${content.messageNoteLabel}: ${s.orderNote}`);
  }

  const total = indicativeTotal(s);
  if (total > 0) {
    lines.push('');
    lines.push(
      `(${content.messageTotalLabel}: ${formatPriceForLocale(total, locale)} — ${content.indicativeTotalNote})`
    );
  }

  lines.push('');
  lines.push(content.messageDisclaimer);

  return lines.join('\n');
}

export function buildWhatsAppUrl(s: AfhaalState, locale: Locale): string {
  const message = buildWhatsAppMessage(s, locale);
  return BUSINESS.getWhatsAppUrl(message);
}
