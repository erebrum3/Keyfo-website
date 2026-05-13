type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
    keyfoCookieConsent?: {
      get: () => string | null;
      open: () => void;
      isAccepted: () => boolean;
    };
  }
}

const CONSENT_KEY = 'keyfo_cookie_consent';

function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.keyfoCookieConsent) return window.keyfoCookieConsent.isAccepted();
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

type EventParams = Record<string, unknown>;

function basePageParams(): EventParams {
  if (typeof window === 'undefined' || typeof document === 'undefined') return {};
  return {
    page_path: window.location.pathname + window.location.search,
    page_language: document.documentElement.lang || 'nl'
  };
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;
  try {
    const gtag = window.gtag;
    if (typeof gtag !== 'function') return;
    gtag('event', name, { ...basePageParams(), ...params });
  } catch {
    // Tracking must never break the page.
  }
}

function paramsFromElement(el: Element): EventParams {
  const out: EventParams = {};
  const ds = (el as HTMLElement).dataset;
  if (ds.ctaLocation) out.cta_location = ds.ctaLocation;
  if (ds.itemName) out.item_name = ds.itemName;
  if (ds.itemCategory) out.item_category = ds.itemCategory;
  if (ds.destination) out.destination = ds.destination;
  return out;
}

let bound = false;

export function bindAutoTracking(): void {
  if (bound || typeof document === 'undefined') return;
  bound = true;
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null;
      if (!target) return;
      const el = target.closest<HTMLElement>('[data-event]');
      if (!el) return;
      const name = el.getAttribute('data-event');
      if (!name) return;
      trackEvent(name, paramsFromElement(el));
    },
    { capture: true }
  );
}
