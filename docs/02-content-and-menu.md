# KEYFO Content and Menu

## CTA Priority
Primary:
- Menu bekijken / Menüyü Gör
- WhatsApp voor afhalen / WhatsApp ile Gel-Al
- Bel direct / Hemen Ara
- Route bekijken / Yol Tarifi

Secondary:
- Bestel via Thuisbezorgd / Thuisbezorgd üzerinden sipariş ver

## WhatsApp Prefill Messages
NL:
Hallo KEYFO, ik wil graag een bestelling plaatsen voor afhalen.

TR:
Merhaba KEYFO, gel-al sipariş vermek istiyorum.

## Service Copy
NL:
Binnen eten, afhalen via telefoon of WhatsApp, en bezorgen via Thuisbezorgd.

TR:
İçeride servis, telefon/WhatsApp ile gel-al ve Thuisbezorgd üzerinden adrese teslim.

## Price Note
NL:
Menuprijzen en beschikbaarheid kunnen wijzigen. Voor afhalen via telefoon of WhatsApp kun je ons direct bereiken. Bezorging loopt via Thuisbezorgd; prijzen en voorwaarden kunnen daar afwijken.

TR:
Menü fiyatları ve ürün uygunluğu değişebilir. Gel-al sipariş için telefon veya WhatsApp ile bize doğrudan ulaşabilirsiniz. Adrese teslim Thuisbezorgd üzerinden yapılır; fiyatlar ve koşullar orada farklı olabilir.

## Allergen Note
NL:
Heeft u een allergie? Vraag ons gerust naar allergeneninformatie voordat u bestelt.

TR:
Alerjiniz varsa sipariş vermeden önce alerjen bilgisi için lütfen bize sorun.

## Halal Wording
Use:
- Halal opties
- Helal seçenekler

Do not use:
- 100% halal
- Halal gecertificeerd
- Certified halal

## Featured / Popular Dishes
Use these as featured items:
- Lentil Soup
- Kapsalon large
- Manti
- Döner sandwich
- Dürüm döner (wrap)
- Köfte menu
- Künefe

In menu data, mark them with featured: true.

## Menu Source
Use current visible Thuisbezorgd menu screenshots for now.

## Menu Update Rule
src/data/menu.ts is the main menu source.
When prices or products change, update menu.ts first, then sync public/menu.json.
Add a lastUpdated field to menu data.

## Menu

### Starters & Sides
- Lentil Soup - €7,00
- Manti - €11,00
- Rice - €7,00
- Pasta - €5,00
- Chips - €5,00
- Vegetable mix - €7,00
- Salad - €4,00

### Döner
- Döner sandwich - €8,50
- Dürüm döner (wrap) - €11,50
- Keyfo special döner sandwich - €10,00
- Dürüm döner Keyfo special - €12,50
- Kapsalon large - €13,50

### BBQ Grill
- Chicken Breast - €6,50
- Wings (6x) - €9,75
- Chicken Fillet (3x) - €9,75
- Köfte (3x) - €9,75
- Chicken Carbonade (2x) - €10,00

### Grill Sandwiches
- Kofta Sandwich - €11,50
- Chicken sandwich - €11,50

### Turkish Pizza
- Turkish pizza - €4,75
- Turkish pizza + döner - €11,50

### Menu's (Dishes)
- Chicken stew menu - €21,00
- Köfte menu - €22,00
- Chicken Fillet Menu - €22,00
- Chicken Carbonade Menu - €22,00
- Döner menu - €21,00
- Chicken Wings Menu - €21,00

### Desserts
- Large pancake - €6,50
- Chocolate pancake - €8,50
- Künefe - €9,50

### Sauces
- Sambal - €1,00
- Fried Sauce - €1,00
- Andalouse - €1,00
- Garlic Sauce - €1,00
- Samurai Saus - €1,00

### Drinks
- Water 500ml - €2,10
- Ayran 200ml - €2,10
- Redbull 250ml - €4,25
- Redbull light 250ml - €4,25
- Coca-Cola - €3,20
- Coca-Cola Zero - €3,75
- Fanta - €3,75

## Thuisbezorgd Note
Do not show Thuisbezorgd delivery time, minimum order amount or delivery fee on the website because these can vary by location and platform conditions.
Only link to Thuisbezorgd as an external delivery option.
Keep WhatsApp and phone pickup as the primary conversion path.
