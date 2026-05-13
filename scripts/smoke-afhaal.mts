// Smoke test for the WhatsApp afhaal message builder.
// Exercises the cart logic + WhatsApp URL/message builder in a Node
// shim of localStorage. Not a replacement for browser QA, but it
// guards the public surface of src/scripts/afhaal-cart.ts.
//
// Run: npx tsx scripts/smoke-afhaal.mts

const store: Record<string, string> = {};
(globalThis as { window?: unknown }).window = {
  localStorage: {
    getItem: (k: string) => (k in store ? store[k] : null),
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    }
  }
};

const cart = await import('../src/scripts/afhaal-cart.ts');

let pass = 0;
let fail = 0;
function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    console.log(`  ❌ ${name}`);
    console.log(`     expected: ${JSON.stringify(expected)}`);
    console.log(`     actual:   ${JSON.stringify(actual)}`);
  }
}

console.log('--- cart basics ---');
check('start empty', cart.getState().items, []);

cart.addItem('doner__doner-sandwich', 2);
check('add x2', cart.getState().items[0]?.quantity, 2);

cart.addItem('doner__doner-sandwich', 50);
check('clamp to 20', cart.getState().items[0]?.quantity, 20);

cart.updateQuantity('doner__doner-sandwich', 0);
check('updateQuantity(0) removes', cart.getState().items.length, 0);

cart.addItem('nonexistent__id', 1);
check('unknown id ignored', cart.getState().items.length, 0);

console.log('--- full flow ---');
cart.addItem('doner__kapsalon-large', 1);
cart.addItem('sauces__garlic-sauce', 3);
cart.setItemNote('doner__kapsalon-large', 'zonder ui');
cart.setName('Ahmet');
cart.setPickupTime(new Date(Date.now() + 90 * 60_000).toISOString());

const nlMsg = cart.buildWhatsAppMessage(cart.getState(), 'nl');
const trMsg = cart.buildWhatsAppMessage(cart.getState(), 'tr');
check('NL message starts with intro', nlMsg.startsWith('Hallo KEYFO'), true);
check('TR message starts with intro', trMsg.startsWith('Merhaba KEYFO'), true);
check('NL includes Kapsalon line', /1× Kapsalon large \(zonder ui\)/.test(nlMsg), true);
check('TR includes Kapsalon büyük line', /1× Kapsalon büyük \(zonder ui\)/.test(trMsg), true);
check('NL ends with disclaimer', /bevestiging van KEYFO via WhatsApp\.$/.test(nlMsg), true);
check('TR ends with disclaimer', /onayından sonra kesinleşir\.$/.test(trMsg), true);

const url = cart.buildWhatsAppUrl(cart.getState(), 'nl');
check('URL prefix', url.startsWith('https://wa.me/31641014926?text='), true);
const encoded = url.split('text=')[1];
check('URL round-trip decode', decodeURIComponent(encoded), nlMsg);

console.log('--- persistence guards ---');
store['keyfo_afhaal_v1'] = JSON.stringify({
  version: 1,
  updatedAt: Date.now() - 25 * 60 * 60_000,
  items: [{ itemId: 'doner__doner-sandwich', quantity: 1 }]
});
const expired = await import('../src/scripts/afhaal-cart.ts?bust=1');
check('expired (>24h) wiped on load', expired.loadState().items.length, 0);

store['keyfo_afhaal_v1'] = JSON.stringify({
  version: 1,
  updatedAt: Date.now(),
  items: [],
  pickupTimeIso: new Date(Date.now() - 60_000).toISOString()
});
const stalePickup = await import('../src/scripts/afhaal-cart.ts?bust=2');
check('past pickup time cleared on load', stalePickup.loadState().pickupTimeIso, undefined);

store['keyfo_afhaal_v1'] = '{not: valid json';
const broken = await import('../src/scripts/afhaal-cart.ts?bust=3');
check('corrupt JSON wiped on load', broken.loadState().items.length, 0);

console.log('--- subscribe / unsubscribe ---');
let fires = 0;
const unsub = cart.subscribe(() => fires++);
cart.addItem('drinks__ayran-200ml', 1);
cart.addItem('drinks__ayran-200ml', 1);
unsub();
cart.addItem('drinks__ayran-200ml', 1);
check('fires exactly twice before unsubscribe', fires, 2);

console.log('---');
console.log(`pass: ${pass}, fail: ${fail}`);
if (fail > 0) process.exit(1);
