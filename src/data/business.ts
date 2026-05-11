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
  googleReviewsUrl: 'https://www.google.com/search?q=Keyfo+Reviews&rldimm=6959290857801238836&tbm=lcl#lkt=LocalPoiReviews',
  social: {
    instagram: 'https://www.instagram.com/keyfokipgrill_/',
    facebook: 'https://www.facebook.com/hanife.isleyen.1/photos',
    thuisbezorgd: 'https://www.thuisbezorgd.nl/da/menu/keyfo'
  },
  website: {
    nlUrl: 'https://keyfo.nl/',
    trUrl: 'https://keyfo.nl/tr/'
  }
} as const;
