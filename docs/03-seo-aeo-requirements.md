# SEO and AI Visibility Requirements

## Routes
- Dutch: https://keyfo.nl/
- Turkish: https://keyfo.nl/tr/

## Canonical and Hreflang
Dutch page:
canonical: https://keyfo.nl/
hreflang nl-NL: https://keyfo.nl/
hreflang tr-TR: https://keyfo.nl/tr/
hreflang x-default: https://keyfo.nl/

Turkish page:
canonical: https://keyfo.nl/tr/
hreflang nl-NL: https://keyfo.nl/
hreflang tr-TR: https://keyfo.nl/tr/
hreflang x-default: https://keyfo.nl/

## Required SEO
- Static HTML content
- Semantic HTML
- Descriptive title and meta description
- Canonical URL
- hreflang:
  - nl-NL -> https://keyfo.nl/
  - tr-TR -> https://keyfo.nl/tr/
- Open Graph tags
- Twitter card tags
- favicon/app icons
- robots.txt
- sitemap.xml
- accessible image alt text

## Sitemap
Include only:
- https://keyfo.nl/
- https://keyfo.nl/tr/

Use build date as lastmod if generated automatically.

## Robots.txt
Use:
User-agent: *
Allow: /

Sitemap: https://keyfo.nl/sitemap.xml

## Open Graph Image
Use a 1200x630 image:
public/assets/keyfo/og-image.jpg

If missing, create a designed fallback using KEYFO brand colors.

## Structured Data
Add:
- Restaurant JSON-LD
- FAQPage JSON-LD

Do not add:
- aggregateRating JSON-LD
- fake reviews
- online ordering schema
- payment schema
- reservation schema

## Restaurant Schema Fields
Use:
- @type Restaurant
- name
- url
- image
- telephone
- email
- address
- openingHoursSpecification
- priceRange
- servesCuisine: Turkish
- menu
- sameAs: Instagram, Facebook, Thuisbezorgd
- acceptsReservations: false

## Schema Menu Rule
For Restaurant JSON-LD, set menu to:
https://keyfo.nl/#menu

Do not attempt complex MenuItem schema unless it stays maintainable and uses the same menu source.

## AI Visibility
Add:
- /llms.txt
- /business.json
- /menu.json

## FAQ Topics
- What is KEYFO?
- Where is KEYFO located?
- What are the opening hours?
- Is pickup possible?
- Is delivery possible?
- Are halal options available?
- How can I contact KEYFO?
- Where can I find allergen information?

## Important Legal/Safety Notes
- Use "Halal opties", not "certified halal".
- Add allergen note.
- State that prices and availability can change.
- State that Thuisbezorgd prices/conditions may differ.
- Do not invent reviews, parking, founding year, family story, certifications or cooking methods.
