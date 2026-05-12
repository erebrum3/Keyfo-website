export const BUSINESS = {
  canonicalName: 'KEYFO Restaurant & Cafe',
  alsoKnownAs: ['Keyfo kip&grill'],
  address: {
    streetAddress: 'Broersveld 103',
    postalCode: '3111 LE',
    addressLocality: 'Schiedam',
    addressCountry: 'NL'
  },
  phone: '+31 6 41014926',
  phoneTel: 'tel:+31641014926',
  whatsappPhoneDigits: '31641014926',
  getWhatsAppUrl(message: string) {
    return `https://wa.me/${this.whatsappPhoneDigits}?text=${encodeURIComponent(message)}`;
  },
  email: 'keyfo-grill@hotmail.com',
  emailMailto: 'mailto:keyfo-grill@hotmail.com',
  openingHours: {
    days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    closedDays: ['Tuesday'],
    opens: '11:30',
    closes: '22:00'
  },
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Broersveld%20103%2C%203111%20LE%20Schiedam',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Broersveld%20103%2C%203111%20LE%20Schiedam&output=embed',
  servesCuisine: ['Turkish', 'Grill'],
  paymentAccepted: 'Cash, Debit Card',
  areaServed: {
    type: 'City',
    name: 'Schiedam'
  },
  currency: 'EUR',
  googleRating: 4.9,
  googleReviewCount: 23,
  // TODO: Replace with official GBP review link when owner grants access.
  // Previous value was a desktop-only Google Search deep link (#lkt=LocalPoiReviews)
  // that did not open the Reviews tab on mobile. CID fallback routes to the
  // correct business profile on both mobile and web.
  googleReviewsUrl: 'https://maps.google.com/?cid=6959290857801238836',
  social: {
    instagram: 'https://www.instagram.com/keyfo.schiedam/',
    facebook: 'https://www.facebook.com/profile.php?id=61589404211645',
    tiktok: 'https://www.tiktok.com/@keyfo.schiedam',
    twitter: 'https://x.com/KeyfoRestaurant',
    pinterest: 'https://www.pinterest.com/keyforestaurant/',
    thuisbezorgd: 'https://www.thuisbezorgd.nl/da/menu/keyfo'
  },
  website: {
    nlUrl: 'https://keyfo.nl/',
    trUrl: 'https://keyfo.nl/tr/'
  },
  // Afhaal (gel-al) message builder defaults. NOT an online order system —
  // the site only prepares a WhatsApp message; the order is finalized after
  // KEYFO confirms via WhatsApp. Values are placeholders until owner sign-off.
  afhaal: {
    minLeadMinutes: 20,
    pickupSlotStepMinutes: 15,
    lastOrderBeforeCloseMinutes: 30,
    maxQuantityPerItem: 20,
    extraClosedDates: [] as readonly string[]
  }
} as const;
