export type MenuItem = {
  id: string;
  name: string;
  nameNl: string;
  nameTr: string;
  priceEur: number;
  featured?: boolean;
  descriptionNl?: string;
  descriptionTr?: string;
};

export type MenuCategory = {
  id: string;
  titleNl: string;
  titleTr: string;
  items: MenuItem[];
};

export const MENU = {
  lastUpdated: '2026-05-12',
  categories: [
    {
      id: 'starters-sides',
      titleNl: 'Starters & bijgerechten',
      titleTr: 'Başlangıçlar & yan ürünler',
      items: [
        {
          id: 'starters-sides__lentil-soup',
          name: 'Lentil Soup',
          nameNl: 'Linzensoep',
          nameTr: 'Mercimek çorbası',
          priceEur: 7.0,
          featured: true,
          descriptionNl: 'Romige rode linzensoep met citroen, elke dag vers gekookt — een warme Turkse start.',
          descriptionTr: 'Limonla servis edilen klasik kırmızı mercimek çorbası, her gün taze pişer.'
        },
        {
          id: 'starters-sides__manti',
          name: 'Manti',
          nameNl: 'Manti',
          nameTr: 'Mantı',
          priceEur: 11.0,
          featured: true,
          descriptionNl: 'Kleine Turkse deegpakketjes met gehakt, geserveerd met knoflookyoghurt en gesmolten boter met paprika.',
          descriptionTr: 'El boyu küçük mantı; sarımsaklı yoğurt ve kırmızı biberli tereyağıyla servis edilir.'
        },
        { id: 'starters-sides__rice', name: 'Rice', nameNl: 'Rijst', nameTr: 'Pilav', priceEur: 7.0 },
        { id: 'starters-sides__pasta', name: 'Pasta', nameNl: 'Pasta', nameTr: 'Makarna', priceEur: 5.0 },
        { id: 'starters-sides__chips', name: 'Chips', nameNl: 'Friet', nameTr: 'Patates kızartması', priceEur: 5.0 },
        { id: 'starters-sides__vegetable-mix', name: 'Vegetable mix', nameNl: 'Groentemix', nameTr: 'Sebze karışımı', priceEur: 7.0 },
        { id: 'starters-sides__salad', name: 'Salad', nameNl: 'Salade', nameTr: 'Salata', priceEur: 4.0 }
      ]
    },
    {
      id: 'doner',
      titleNl: 'Döner',
      titleTr: 'Döner',
      items: [
        {
          id: 'doner__doner-sandwich',
          name: 'Döner sandwich',
          nameNl: 'Döner broodje',
          nameTr: 'Döner sandviç',
          priceEur: 8.5,
          featured: true,
          descriptionNl: 'Vers van de spies gesneden döner in een knapperig broodje, met salade en saus.',
          descriptionTr: 'Şişten yeni kesilmiş döner; çıtır ekmek, taze salata ve sosla buluşur.'
        },
        { id: 'doner__durum-doner', name: 'Dürüm döner (wrap)', nameNl: 'Dürüm döner (wrap)', nameTr: 'Dürüm döner', priceEur: 11.5 },
        { id: 'doner__keyfo-special-doner-sandwich', name: 'Keyfo special döner sandwich', nameNl: 'Keyfo special döner broodje', nameTr: 'Keyfo özel döner sandviç', priceEur: 10.0 },
        { id: 'doner__durum-doner-keyfo-special', name: 'Dürüm döner Keyfo special', nameNl: 'Dürüm döner Keyfo special', nameTr: 'Dürüm döner Keyfo özel', priceEur: 12.5 },
        {
          id: 'doner__kapsalon-large',
          name: 'Kapsalon large',
          nameNl: 'Kapsalon large',
          nameTr: 'Kapsalon büyük',
          priceEur: 13.5,
          featured: true,
          descriptionNl: 'Friet, döner, gesmolten kaas en frisse salade — oven-gegrild, een Schiedams favoriet.',
          descriptionTr: 'Patates, döner, eritilmiş kaşar ve taze salata — fırında kızarmış Schiedam klasiği.'
        }
      ]
    },
    {
      id: 'bbq-grill',
      titleNl: 'BBQ Grill',
      titleTr: 'BBQ Grill',
      items: [
        { id: 'bbq-grill__chicken-breast', name: 'Chicken Breast', nameNl: 'Kipfilet', nameTr: 'Tavuk göğsü', priceEur: 6.5 },
        { id: 'bbq-grill__wings-6x', name: 'Wings (6x)', nameNl: 'Kippenvleugels (6x)', nameTr: 'Tavuk kanat (6x)', priceEur: 9.75 },
        { id: 'bbq-grill__chicken-fillet-3x', name: 'Chicken Fillet (3x)', nameNl: 'Kipfilet (3x)', nameTr: 'Tavuk fileto (3x)', priceEur: 9.75 },
        { id: 'bbq-grill__kofte-3x', name: 'Köfte (3x)', nameNl: 'Köfte (3x)', nameTr: 'Köfte (3x)', priceEur: 9.75 },
        { id: 'bbq-grill__chicken-carbonade-2x', name: 'Chicken Carbonade (2x)', nameNl: 'Kip carbonade (2x)', nameTr: 'Tavuk pirzola (2x)', priceEur: 10.0 }
      ]
    },
    {
      id: 'grill-sandwiches',
      titleNl: 'Grill sandwiches',
      titleTr: 'Grill sandviçler',
      items: [
        { id: 'grill-sandwiches__kofta-sandwich', name: 'Kofta Sandwich', nameNl: 'Köfte broodje', nameTr: 'Köfte sandviç', priceEur: 11.5 },
        { id: 'grill-sandwiches__chicken-sandwich', name: 'Chicken sandwich', nameNl: 'Kip broodje', nameTr: 'Tavuk sandviç', priceEur: 11.5 }
      ]
    },
    {
      id: 'turkish-pizza',
      titleNl: 'Turkse pizza',
      titleTr: 'Türk pizzası',
      items: [
        { id: 'turkish-pizza__turkish-pizza', name: 'Turkish pizza', nameNl: 'Turkse pizza', nameTr: 'Türk pizzası', priceEur: 4.75 },
        { id: 'turkish-pizza__turkish-pizza-doner', name: 'Turkish pizza + döner', nameNl: 'Turkse pizza + döner', nameTr: 'Türk pizzası + döner', priceEur: 11.5 }
      ]
    },
    {
      id: 'menus',
      titleNl: "Menu's (gerechten)",
      titleTr: 'Menüler (yemekler)',
      items: [
        { id: 'menus__chicken-stew-menu', name: 'Chicken stew menu', nameNl: 'Kipstoofpot menu', nameTr: 'Tavuk yahnisi menü', priceEur: 21.0 },
        { id: 'menus__kofte-menu', name: 'Köfte menu', nameNl: 'Köfte menu', nameTr: 'Köfte menü', priceEur: 22.0, featured: true },
        { id: 'menus__chicken-fillet-menu', name: 'Chicken Fillet Menu', nameNl: 'Kipfilet menu', nameTr: 'Tavuk fileto menü', priceEur: 22.0 },
        { id: 'menus__chicken-carbonade-menu', name: 'Chicken Carbonade Menu', nameNl: 'Kip carbonade menu', nameTr: 'Tavuk pirzola menü', priceEur: 22.0 },
        { id: 'menus__doner-menu', name: 'Döner menu', nameNl: 'Döner menu', nameTr: 'Döner menü', priceEur: 21.0 },
        { id: 'menus__chicken-wings-menu', name: 'Chicken Wings Menu', nameNl: 'Kippenvleugels menu', nameTr: 'Tavuk kanat menü', priceEur: 21.0 }
      ]
    },
    {
      id: 'desserts',
      titleNl: 'Desserts',
      titleTr: 'Tatlılar',
      items: [
        { id: 'desserts__large-pancake', name: 'Large pancake', nameNl: 'Grote pannenkoek', nameTr: 'Büyük pankek', priceEur: 6.5, featured: true },
        { id: 'desserts__chocolate-pancake', name: 'Chocolate pancake', nameNl: 'Chocolade pannenkoek', nameTr: 'Çikolatalı pankek', priceEur: 8.5 },
        { id: 'desserts__kunefe', name: 'Künefe', nameNl: 'Künefe', nameTr: 'Künefe', priceEur: 9.5, featured: true }
      ]
    },
    {
      id: 'sauces',
      titleNl: 'Sauzen',
      titleTr: 'Soslar',
      items: [
        { id: 'sauces__sambal', name: 'Sambal', nameNl: 'Sambal', nameTr: 'Sambal', priceEur: 1.0 },
        { id: 'sauces__fried-sauce', name: 'Fried Sauce', nameNl: 'Fritessaus', nameTr: 'Patates sosu', priceEur: 1.0 },
        { id: 'sauces__andalouse', name: 'Andalouse', nameNl: 'Andalouse', nameTr: 'Andalouse sos', priceEur: 1.0 },
        { id: 'sauces__garlic-sauce', name: 'Garlic Sauce', nameNl: 'Knoflooksaus', nameTr: 'Sarımsaklı sos', priceEur: 1.0 },
        { id: 'sauces__samurai-saus', name: 'Samurai Saus', nameNl: 'Samurai saus', nameTr: 'Samurai sos', priceEur: 1.0 }
      ]
    },
    {
      id: 'drinks',
      titleNl: 'Dranken',
      titleTr: 'İçecekler',
      items: [
        { id: 'drinks__water-500ml', name: 'Water 500ml', nameNl: 'Water 500ml', nameTr: 'Su 500ml', priceEur: 2.1 },
        { id: 'drinks__ayran-200ml', name: 'Ayran 200ml', nameNl: 'Ayran 200ml', nameTr: 'Ayran 200ml', priceEur: 2.1 },
        { id: 'drinks__redbull-250ml', name: 'Redbull 250ml', nameNl: 'Red Bull 250ml', nameTr: 'Red Bull 250ml', priceEur: 4.25 },
        { id: 'drinks__redbull-light-250ml', name: 'Redbull light 250ml', nameNl: 'Red Bull light 250ml', nameTr: 'Red Bull light 250ml', priceEur: 4.25 },
        { id: 'drinks__coca-cola', name: 'Coca-Cola', nameNl: 'Coca-Cola', nameTr: 'Coca-Cola', priceEur: 3.2 },
        { id: 'drinks__coca-cola-zero', name: 'Coca-Cola Zero', nameNl: 'Coca-Cola Zero', nameTr: 'Coca-Cola Zero', priceEur: 3.75 },
        { id: 'drinks__fanta', name: 'Fanta', nameNl: 'Fanta', nameTr: 'Fanta', priceEur: 3.75 }
      ]
    }
  ] satisfies MenuCategory[]
};

export function formatPriceEurNl(priceEur: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(priceEur);
}
