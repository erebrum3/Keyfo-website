export type ReviewLang = 'nl' | 'tr';

export type Review = {
  name: string;
  initial: string;
  rating: number;
  date: { nl: string; tr: string };
  source: 'Google';
  quote: string;
  quoteLang?: ReviewLang;
};

export const REVIEWS: Review[] = [
  {
    name: 'Hicham',
    initial: 'H',
    rating: 5,
    date: { nl: 'Sep 2025', tr: 'Eyl 2025' },
    source: 'Google',
    quote:
      'De lekkerste kip van Schiedam! Ik kom hier regelmatig eten. Het eten wordt elke dag vers, smaakvol en huisgemaakt bereid! Voor de gezonde eters is dit ook de ideale optie. Daarnaast is de service ook goed, je wordt in ieder geval geholpen met een grote glimlach!',
    quoteLang: 'nl'
  },
  {
    name: 'Yulian Yoskov',
    initial: 'Y',
    rating: 5,
    date: { nl: 'Jan 2026', tr: 'Oca 2026' },
    source: 'Google',
    quote:
      'Heerlijk gegeten voor goede prijzen, en de service was ook top. lekkere broodjes, soep en thee. 5/5 sterren zal hier zeker vaker eten.',
    quoteLang: 'nl'
  },
  {
    name: 'Cigdem Demir',
    initial: 'C',
    rating: 5,
    date: { nl: 'Sep 2025', tr: 'Eyl 2025' },
    source: 'Google',
    quote:
      'Heerlijke en super grote pannenkoeken gegeten! Je mag ze zelf versieren met Nutella, poedersuiker, stroop etc. En dat voor €5! Vriendelijke bediening en huiselijke sfeer. Leuke speelkeukentje voor de kleintjes terwijl ze wachten op hun pannenkoeken! Aanrader!',
    quoteLang: 'nl'
  },
  {
    name: 'Yentl de Lange',
    initial: 'Y',
    rating: 5,
    date: { nl: 'Dec 2025', tr: 'Ara 2025' },
    source: 'Google',
    quote:
      'Gisteravond hier met mijn moeder en broertje gegeten… wat een lieve mensen! En het eten was ontzettend lekker!!! Aanrader! 🙏',
    quoteLang: 'nl'
  },
  {
    name: 'FastServicesGazelle',
    initial: 'F',
    rating: 5,
    date: { nl: 'Dec 2025', tr: 'Ara 2025' },
    source: 'Google',
    quote: 'Eten zeer smakelijk! Super mooie prijs ook.',
    quoteLang: 'nl'
  },
  {
    name: 'Sahar',
    initial: 'S',
    rating: 5,
    date: { nl: 'Sep 2025', tr: 'Eyl 2025' },
    source: 'Google',
    quote:
      'We waren daar voor het eerst gaan eten. Het eten was echt lekker. Voor de service en gastvrijheid krijgen ze van mij 5 sterren.',
    quoteLang: 'nl'
  },
  {
    name: 'L. Navarro',
    initial: 'L',
    rating: 5,
    date: { nl: 'Jan 2026', tr: 'Oca 2026' },
    source: 'Google',
    quote: 'Super unkfood maar powerfood.',
    quoteLang: 'nl'
  },
  {
    name: 'dama nian',
    initial: 'D',
    rating: 5,
    date: { nl: 'Dec 2025', tr: 'Ara 2025' },
    source: 'Google',
    quote: 'Heerlijk huisgemaakte eten voor een goede prijs.',
    quoteLang: 'nl'
  },
  {
    name: 'Aytul Acer',
    initial: 'A',
    rating: 5,
    date: { nl: 'Okt 2025', tr: 'Eki 2025' },
    source: 'Google',
    quote: 'Heerlijke kip!! Vriendelijke mensen, service is top!',
    quoteLang: 'nl'
  },
  {
    name: 'Enes Altiparmak',
    initial: 'E',
    rating: 5,
    date: { nl: 'Sep 2025', tr: 'Eyl 2025' },
    source: 'Google',
    quote: 'Heerlijke kip, knusse sfeer, vriendelijk personeel. Aanrader!',
    quoteLang: 'nl'
  },
  {
    name: 'Manuela Rodriguez',
    initial: 'M',
    rating: 5,
    date: { nl: 'Aug 2025', tr: 'Ağu 2025' },
    source: 'Google',
    quote: 'Voor de lekkerste kip moet je hierheen gaan. Een aanwinst voor Schiedam!',
    quoteLang: 'nl'
  },
  {
    name: 'Esra Tan',
    initial: 'E',
    rating: 5,
    date: { nl: 'Aug 2025', tr: 'Ağu 2025' },
    source: 'Google',
    quote: 'Gezellige personeel, altijd vers eten.',
    quoteLang: 'nl'
  },
  {
    name: 'Samet',
    initial: 'S',
    rating: 5,
    date: { nl: 'Okt 2025', tr: 'Eki 2025' },
    source: 'Google',
    quote: 'Hele lekkere eten service goed.',
    quoteLang: 'nl'
  },
  {
    name: 'Şerife Ebru Sukut',
    initial: 'Ş',
    rating: 5,
    date: { nl: 'Mei 2026', tr: 'May 2026' },
    source: 'Google',
    quote:
      'Heerlijk gegeten! Hele gezellige zaak! Top Service altijd zeer vriendelijk!',
    quoteLang: 'nl'
  },
  {
    name: 'Zenda Ibrahim',
    initial: 'Z',
    rating: 5,
    date: { nl: 'Apr 2026', tr: 'Nis 2026' },
    source: 'Google',
    quote:
      'Ik had hier een hele fijne ervaring! Ik bestelde soep, kipfilet met rijst en een ayran, en alles was voor een goede prijs. De kip was ontzettend lekker en mals, en de soep was echt heerlijk. Daarnaast waren de medewerkers erg vriendelijk en gastvrij, wat het nog beter maakte. Ik raad deze plek zeker aan!',
    quoteLang: 'nl'
  },
  {
    name: 'Konrad',
    initial: 'K',
    rating: 5,
    date: { nl: 'Jan 2026', tr: 'Oca 2026' },
    source: 'Google',
    quote:
      'De kip was mals en zacht – zonder twijfel een van de beste restaurants hier in de buurt.',
    quoteLang: 'nl'
  },
  {
    name: 'Miguel C',
    initial: 'M',
    rating: 5,
    date: { nl: 'Aug 2025', tr: 'Ağu 2025' },
    source: 'Google',
    quote: 'Heerlijke kip en goede service!',
    quoteLang: 'nl'
  },
  {
    name: 'Kamil Wojdylo',
    initial: 'K',
    rating: 5,
    date: { nl: 'Apr 2026', tr: 'Nis 2026' },
    source: 'Google',
    quote:
      'Ik heb echt genoten van het eten en de sfeer van het restaurant. Ik had een heerlijke, malse en smaakvolle kipfilet. De bediening was uitstekend. Ik kom zeker terug. Een aanrader voor iedereen die lekker wil eten!',
    quoteLang: 'nl'
  },
  {
    name: 'Nihat Yılmaz',
    initial: 'N',
    rating: 5,
    date: { nl: 'Mei 2026', tr: 'May 2026' },
    source: 'Google',
    quote:
      'Schiedam’da Türk yemekleri yemek için Keyfo’yu denedim ve çok memnun kaldım. Mekan temiz ve özenli, servis güler yüzlüydü. Döner ve grill ürünleri lezzetliydi, fiyatlar da makul. Broersveld’de merkezi bir konumda. Ücretsiz otoparka oldukça yakın olması da gerçekten çok iyi.',
    quoteLang: 'tr'
  },
  {
    name: 'Mücahid Sert',
    initial: 'M',
    rating: 5,
    date: { nl: 'Dec 2025', tr: 'Ara 2025' },
    source: 'Google',
    quote:
      'Het eten was heerlijk! De kip mals en goed gekruid, de rijst perfect bereid en de salade lekker vers. De Turkse thee erbij maakte het helemaal compleet. Zeker een aanrader.',
    quoteLang: 'nl'
  },
  {
    name: 'Jeremiah',
    initial: 'J',
    rating: 5,
    date: { nl: 'Dec 2025', tr: 'Ara 2025' },
    source: 'Google',
    quote:
      'Fantastische ervaring bij Keyfo in Schiedam! Heerlijk eten, authentieke smaken en supervriendelijke bediening. De sfeer is warm en gastvrij — je voelt je direct thuis.',
    quoteLang: 'nl'
  }
];
