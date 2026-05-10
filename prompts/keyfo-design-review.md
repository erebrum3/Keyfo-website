# KEYFO Design Review Brief — v3

> Mode: planning + writing. First produce a 5-line execution plan, then execute. Do not wait for approval because this task only writes one review document.

---

## Context

You are reviewing the KEYFO Restaurant & Cafe website.

**Project type**
- Astro project
- Tailwind / CSS styling
- Two languages: Dutch as primary market, Turkish as secondary market
- Main pages: Dutch homepage and Turkish homepage

**Business**
- KEYFO Restaurant & Cafe (also known as Keyfo kip&grill)
- Address: Broersveld 103, 3111 LE Schiedam
- Local Turkish grill/doner restaurant in Schiedam Centrum
- Main business goal: pickup / afhalen via WhatsApp or phone
- Secondary actions: menu viewing, route, Google reviews, Thuisbezorgd as external delivery option

**Brand feeling**
- Warm local Turkish restaurant
- Clean, careful, reliable, friendly
- Premium enough to feel professional, but not luxury / fine dining
- Not agency-generic, not SaaS, not nightclub, not fantasy
- Female owner and clean / careful service are trust signals
- Mixed local audience: Dutch, Turkish, Moroccan / Muslim-background customers, local workers, families and Google searchers

---

## Files To Read First

Do not rely on screenshots alone. Read the current implementation before reviewing.

**Read these first:**
- `src/pages/index.astro`
- `src/pages/tr/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/Hero.astro`
- `src/components/Header.astro`
- `src/components/InfoBar.astro`
- `src/components/PopularDishes.astro`
- `src/components/MenuSection.astro`
- `src/components/Gallery.astro`
- `src/components/Reviews.astro`
- `src/components/Location.astro`
- `src/components/FAQ.astro`
- `src/components/Footer.astro`
- `src/data/business.ts`
- `src/data/content.nl.ts`
- `src/data/content.tr.ts`
- `src/data/menu.ts`
- `src/styles/global.css`

If file names differ, locate equivalents with `rg --files`.

**Inspect asset names only (do not open binary contents):**
- `public/assets/keyfo/`

**Do NOT read:**
- `node_modules/`
- `.astro/`
- `dist/`
- Binary image contents (`.avif`, `.webp`, `.jpg`, `.png`) — file names and inventory are enough
- Lockfiles

**Token budget:** keep total file reads under ~15k tokens. If you approach the limit, summarize remaining files instead of reading them in full.

---

## Role

Act as a senior conversion-focused web design consultant for local restaurants in the Netherlands.

You understand:
- Dutch local restaurant users
- Turkish grill/doner market positioning
- Mobile-first conversion
- Local SEO and Google Business Profile behavior
- Restaurant trust signals
- Visual hierarchy, accessibility and performance

Do not flatter the design. If something is weak, say it clearly. Avoid vague design advice.

---

## Strict Brand and Claim Rules

**Never suggest:**
- Fake reviews, customer names, menu items, prices, photos
- "100% halal", "certified halal"
- "best in Schiedam"
- "homemade", "daily fresh"
- "charcoal grill", "kömür ateşi", "ocakbaşı"
- Unverified reservation claims
- Unverified delivery claims outside Thuisbezorgd
- Unverified parking guarantees

**Safe wording:**
- "Halal opties"
- "Vraag gerust naar de mogelijkheden"
- "Afhalen via WhatsApp of telefoon"
- "Bezorging via Thuisbezorgd als externe optie"
- "Schoon en zorgvuldig"
- "Vrouwelijke eigenaar" (only if verified by business owner)
- "Garage Nieuwe Passage is dichtbij. Controleer actuele parkeervoorwaarden."

---

## Primary Goals (priority order)

1. Increase WhatsApp / phone pickup conversion.
2. Make menu access fast and obvious.
3. Build local trust for Schiedam Centrum users.
4. Improve SEO / LLM entity clarity without keyword stuffing.
5. Make the visual design feel warm, clean, local and professional.
6. Preserve performance, mobile usability and accessibility.

---

## Decision Points On This Site

When applying social proof / CTA placement rules, treat these as the conversion-critical moments:

1. **Hero CTA cluster** — WhatsApp / Bel / Menu buttons.
2. **End of MenuSection** — after the user has browsed dishes and is deciding.
3. **Location section** — commitment to physically visit / pick up.

Reviews and trust signals should appear at or just before these points.

---

## Test Viewports

- **Primary mobile:** 390 × 844 (iPhone 14)
- **Secondary mobile:** 360 × 800 (Android median)
- **Desktop:** 1440 × 900

Do not optimize for tablet specifically.

---

## Review Framework

Use these lenses:
- **Fitts's Law** — CTA size, thumb reach, distance.
- **Von Restorff effect** — one primary action should stand out.
- **Hick's Law** — avoid too many equal choices at the decision point.
- **F-pattern / mobile scanning** — important content easy to scan.
- **Social proof placement** — ratings/reviews at or near decision points.
- **Cognitive load** — instantly clear: what is KEYFO, where, how to order.
- **Local trust** — address, hours, route, real photos, clean service, halal options, female owner.
- **Claim safety** — no legal/ethical SEO risk.

---

## Explicitly Preserve (do not propose changing)

- Bordeaux + cream palette
- Existing real KEYFO photos (do not propose replacements unless quality issue is concrete)
- Two-language structure (NL primary, TR secondary)
- Thuisbezorgd as the only delivery mention
- Female-owner trust signal placement (if currently used)
- Pickup-first business model (no reservation system)

---

## KEYFO-Specific Anti-Patterns

Do not recommend any of the following:
- Fabricated "story / family heritage" section
- Video backgrounds (performance + brand mismatch)
- Reservation system (business is pickup-first)
- English version (market is NL primary, TR secondary)
- Dark mode toggle
- AI chatbot
- Loyalty program UI without backend
- New photoshoots before exhausting existing assets

---

## Turkish Page Priority

Turkish page is **secondary**. Do not propose work that doubles effort across both locales unless it's a shared component.

If a recommendation only applies to `/tr/`, prefix it with **[TR-only]**.
If shared, prefix with **[shared]**.
If NL-only, no prefix needed.

---

## Asset Inventory Rule

Before recommending any new image, list which assets in `public/assets/keyfo/` are already available but unused or underused. Prefer reusing existing assets over requesting new shoots.

---

## Analytics State

Analytics state is **unknown**. As part of Pass 1, diagnose whether tracking exists in code (e.g., GA, Plausible, Meta Pixel, WhatsApp click events). If missing, flag it as a Pass 2 recommendation — do not assume conversion baselines.

---

## Available Commands

- `npm run dev` — local preview
- `npm run build` — production build (must pass)
- `npm run astro check` — type check
- No test suite currently — flag if a recommendation requires one.

---

## Length Budget

- **Pass 1:** max 1500 words.
- **Pass 2:** max 2500 words.
- If approaching the limit, prioritize highest-urgency items and append `*(truncated for brevity)*`.

---

## Work In Two Passes

### Pass 1: Diagnosis Only

Analyze the current site. Do not propose solutions yet.

```
## Pass 1 — Diagnosis

### General Diagnosis
[5-8 direct sentences about the current site.]

### Strong Points
| # | Area | What works | Why it should be preserved |
|---|---|---|---|

### Weak Points
| # | Area | Problem | Impact | Urgency (1-5) | Evidence |
|---|---|---|---|---:|-|

### Section-by-Section Diagnosis
| Section | What users likely understand | What may confuse or slow them | Risk |
|---|---|---|---|

### Claim / Trust Risks
| Item | Risk | File / section | Fix urgency |
|---|---|---|---|

### Analytics / Tracking State
[What tracking, if any, exists in code. File references required.]

### Assumptions
List every statement that is an assumption rather than directly visible in the code or assets.
```

**Pass 1 rules:**
- No roadmap.
- No new design ideas.
- No "make it more modern" advice.
- Every criticism must reference a file, component, visible content, or asset.
- Assumptions are allowed but **must be tagged**. Pure speculation without grounding is not.

---

### Pass 1 → Pass 2 Gate

After Pass 1, before starting Pass 2, output:

```
### Pass 1 complete. Top 3 issues to address in Pass 2: [list]. Proceeding...
```

Then start Pass 2.

---

### Pass 2: Prescription and Roadmap

```
## Pass 2 — Prescription

### Strategic Direction
[3-5 sentences: what the site should become and what should not change.]

### Quick Wins (<2 Hours)
| # | Recommendation | Why it matters | Files/sections | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|

### One-Day Improvements
| # | Recommendation | Why it matters | Files/sections | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|

### Medium-Term Improvements
| # | Recommendation | Why it matters | Dependencies | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|

### Do Not Do
| # | Tempting idea | Why not |
|---|---|---|

### Section Touches
For each section, give:
- One small fast improvement
- One stronger medium-term improvement
- What to preserve

### Mobile-Specific Improvements
[Concrete mobile changes only, referencing the test viewports above.]

### SEO / LLM Entity Improvements
[Concrete content/schema/internal linking changes only; no keyword stuffing.]

### Visual Direction
[Palette, spacing, images, buttons, typography and motion guidance.]

### Verification Plan
How to verify each important recommendation:
- Build/test command (use the Available Commands list)
- Browser/mobile viewport check (use the Test Viewports)
- Accessibility check
- Performance risk check
- Conversion / event tracking check

### First Thing I Would Do
[One concrete paragraph naming the exact first change and why.]
```

---

## Scoring Rules

For every recommendation:
- **Conversion (1-5):** likely effect on WhatsApp/phone/menu/route action.
- **Cost (1-5):** 1 = trivial, 5 = multi-day or requires new assets.
- **Brand risk (1-5):** 1 = safe, 5 = makes KEYFO feel fake, luxury, generic, or legally risky.

---

## Evidence Rules

Every claim must be tagged:
- **Evidence:** directly visible in code/content/assets.
- **Source:** based on official docs or reliable external source.
- **Assumption:** reasoned judgment.

Do not present assumptions as facts.

---

## Bad vs Good Advice

**Bad (do not write):**
- "Make the hero more attractive."
- "Use a modern design."
- "Improve UX."
- "Add more SEO keywords."
- "Make the page pop."

**Good (target this style):**
- "Move the WhatsApp CTA above secondary CTAs on mobile because it is the primary conversion action and currently competes with three equal actions. Files: `Hero.astro`, `global.css`."
- "Use one primary amber button and keep phone/route as outline buttons to preserve action hierarchy. Evidence: current header already uses amber as the conversion color."

---

## Output Location

Save the final review as:

```
docs/design-review-2026-05-10.md
```

If the `docs/` folder does not exist, create it.

**Save fallback:** if write permission fails, output the full review to stdout with a clear `=== BEGIN REVIEW ===` / `=== END REVIEW ===` separator.

**Scope lock:** do not modify any other file. This is a read + write-one-document task only.

---

## Final Note

The final review should be practical enough for a developer to implement without another strategy meeting.
