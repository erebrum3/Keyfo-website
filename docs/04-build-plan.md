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

If a photo is missing, use a graceful designed fallback. Do not show broken images.

## Quality Targets
- Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 100
- Mobile-first layout
- No broken links/images
