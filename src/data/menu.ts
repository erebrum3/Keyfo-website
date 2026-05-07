export type MenuItem = {
  name: string;
  priceEur: number;
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  titleNl: string;
  titleTr: string;
  items: MenuItem[];
};

export const MENU = {
  lastUpdated: '2026-05-06',
  categories: [
    {
      id: 'starters-sides',
      titleNl: 'Starters & bijgerechten',
      titleTr: 'Başlangıçlar & yan ürünler',
      items: [
        { name: 'Lentil Soup', priceEur: 7.0, featured: true },
        { name: 'Manti', priceEur: 11.0, featured: true },
        { name: 'Rice', priceEur: 7.0 },
        { name: 'Pasta', priceEur: 5.0 },
        { name: 'Chips', priceEur: 5.0 },
        { name: 'Vegetable mix', priceEur: 7.0 },
        { name: 'Salad', priceEur: 4.0 }
      ]
    },
    {
      id: 'doner',
      titleNl: 'Döner',
      titleTr: 'Döner',
      items: [
        { name: 'Döner sandwich', priceEur: 8.5, featured: true },
        { name: 'Dürüm döner (wrap)', priceEur: 11.5, featured: true },
        { name: 'Keyfo special döner sandwich', priceEur: 10.0 },
        { name: 'Dürüm döner Keyfo special', priceEur: 12.5 },
        { name: 'Kapsalon large', priceEur: 13.5, featured: true }
      ]
    },
    {
      id: 'bbq-grill',
      titleNl: 'BBQ Grill',
      titleTr: 'BBQ Grill',
      items: [
        { name: 'Chicken Breast', priceEur: 6.5 },
        { name: 'Wings (6x)', priceEur: 9.75 },
        { name: 'Chicken Fillet (3x)', priceEur: 9.75 },
        { name: 'Köfte (3x)', priceEur: 9.75 },
        { name: 'Chicken Carbonade (2x)', priceEur: 10.0 }
      ]
    },
    {
      id: 'grill-sandwiches',
      titleNl: 'Grill sandwiches',
      titleTr: 'Grill sandviçler',
      items: [
        { name: 'Kofta Sandwich', priceEur: 11.5 },
        { name: 'Chicken sandwich', priceEur: 11.5 }
      ]
    },
    {
      id: 'turkish-pizza',
      titleNl: 'Turkse pizza',
      titleTr: 'Türk pizzası',
      items: [
        { name: 'Turkish pizza', priceEur: 4.75 },
        { name: 'Turkish pizza + döner', priceEur: 11.5 }
      ]
    },
    {
      id: 'menus',
      titleNl: "Menu's (gerechten)",
      titleTr: 'Menüler (yemekler)',
      items: [
        { name: 'Chicken stew menu', priceEur: 21.0 },
        { name: 'Köfte menu', priceEur: 22.0, featured: true },
        { name: 'Chicken Fillet Menu', priceEur: 22.0 },
        { name: 'Chicken Carbonade Menu', priceEur: 22.0 },
        { name: 'Döner menu', priceEur: 21.0 },
        { name: 'Chicken Wings Menu', priceEur: 21.0 }
      ]
    },
    {
      id: 'desserts',
      titleNl: 'Desserts',
      titleTr: 'Tatlılar',
      items: [
        { name: 'Large pancake', priceEur: 6.5 },
        { name: 'Chocolate pancake', priceEur: 8.5 },
        { name: 'Künefe', priceEur: 9.5, featured: true }
      ]
    },
    {
      id: 'sauces',
      titleNl: 'Sauzen',
      titleTr: 'Soslar',
      items: [
        { name: 'Sambal', priceEur: 1.0 },
        { name: 'Fried Sauce', priceEur: 1.0 },
        { name: 'Andalouse', priceEur: 1.0 },
        { name: 'Garlic Sauce', priceEur: 1.0 },
        { name: 'Samurai Saus', priceEur: 1.0 }
      ]
    },
    {
      id: 'drinks',
      titleNl: 'Dranken',
      titleTr: 'İçecekler',
      items: [
        { name: 'Water 500ml', priceEur: 2.1 },
        { name: 'Ayran 200ml', priceEur: 2.1 },
        { name: 'Redbull 250ml', priceEur: 4.25 },
        { name: 'Redbull light 250ml', priceEur: 4.25 },
        { name: 'Coca-Cola', priceEur: 3.2 },
        { name: 'Coca-Cola Zero', priceEur: 3.75 },
        { name: 'Fanta', priceEur: 3.75 }
      ]
    }
  ] satisfies MenuCategory[]
} as const;

export function formatPriceEurNl(priceEur: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(priceEur);
}

