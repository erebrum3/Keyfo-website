# Build Plan

## Stack
- latest stable Astro
- Tailwind CSS
- Vanilla JS only for small interactions
- No React unless explicitly needed later

## File Structure Suggestion
src/
  data/
    business.ts
    menu.ts
    content.nl.ts
    content.tr.ts
  layouts/
    BaseLayout.astro
  components/
    Header.astro
    Hero.astro
    TrustStrip.astro
    PopularDishes.astro
    MenuSection.astro
    Gallery.astro
    Location.astro
    FAQ.astro
    Footer.astro
  pages/
    index.astro
    tr/index.astro

public/
  assets/keyfo/
  business.json
  menu.json
  llms.txt
  robots.txt

## Visual Assets
Use real KEYFO photos:
- hero-interior.jpg
- sign.jpg
- menu-board.jpg
- interior-wide.jpg
- table-detail.jpg
- drinks-corner.jpg

## Image Optimization Rules
- Prefer WebP or AVIF for production images.
- Keep JPG fallback acceptable if needed.
- Hero image max width: 1600px.
- Gallery images max width: 1200px.
- Set width and height attributes where possible.
- Use loading="lazy" for non-hero images.
- Use loading="eager" only for hero/above-the-fold image.
- Do not show broken images.

## Fallback Image Rule
If real photo is missing, use a designed fallback:
- warm cream/charcoal background
- KEYFO text
- subtle red/amber accent
- no fake restaurant photo

## Quality Targets
- Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 100
- Mobile-first layout
- No broken links/images

## Launch Checklist
- NAP is consistent across visible page, footer, JSON-LD, business.json.
- WhatsApp/tel/mail/maps/Thuisbezorgd links work.
- / and /tr/ exist.
- Canonical and hreflang are correct.
- sitemap.xml and robots.txt exist.
- Restaurant schema exists and has no aggregateRating.
- FAQPage schema exists.
- Menu is crawlable HTML.
- public/menu.json and public/business.json exist.
- llms.txt exists.
- Images are optimized or have graceful fallback.
- No broken images.
- No internal ordering/payment/reservation/CMS/backend.
- Dutch and Turkish pages have equivalent claims.
