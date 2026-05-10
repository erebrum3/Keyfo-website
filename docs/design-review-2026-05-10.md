# KEYFO Design Review — 2026-05-10

Execution plan:
1. Treat the current dirty working tree as the live review target.
2. Read only the approved Astro/data/CSS files and inspect asset names only.
3. Diagnose conversion, trust, local SEO, mobile usability, and brand fit.
4. Convert the diagnosis into scoped recommendations without implementation.
5. Keep all recommendations grounded in current files, content, or asset inventory.

## Pass 1 — Diagnosis

### General Diagnosis
KEYFO now reads as a serious local Turkish restaurant site rather than a generic restaurant template. Evidence: the hero in `src/components/Hero.astro` combines KEYFO, Turkish grill/doner positioning, Google rating, address/hours, and WhatsApp-first CTAs within the first screen. The bordeaux + cream palette is consistent and worth preserving, especially across `src/styles/global.css` dark, cream, plaster, and leather bands. The site is strongest where it shows practical Dutch-market trust signals: visible prices, address, parking, route, Google reviews, real interior photos, and phone/WhatsApp actions. The main weakness is not visual quality but decision-point continuity: the user gets strong signals in hero and reviews, but the end of the menu does not yet convert that browsing intent into a clear next step. The menu is crawlable and attractive, but it feels like a standalone paper sheet rather than the central ordering tool. Analytics/tracking appears absent, so WhatsApp conversion cannot be measured yet.

### Strong Points
| # | Area | What works | Why it should be preserved |
|---|---|---|---|
| 1 | Hero | KEYFO, cuisine, rating, address/hours, and WhatsApp CTA are visible early. Evidence: `Hero.astro`, `CONTENT_NL.heroOps`, `index.astro`. | It answers what/where/how-to-order quickly, reducing cognitive load. |
| 2 | Conversion hierarchy | WhatsApp uses amber primary styling while menu, call, route, and delivery are secondary. Evidence: `keyfo-btn-primary`, `keyfo-btn-secondary`, `keyfo-delivery-link`. | Supports Von Restorff effect without hiding useful secondary actions. |
| 3 | Real trust proof | Gallery uses real KEYFO photos and light plaster band. Evidence: `CONTENT_NL.galleryItems`, `Gallery.astro`, `.keyfo-band-plaster`. | Real photos are stronger than decorative stock or AI food for local trust. |
| 4 | Reviews | Inline summary bar puts `4,9 / 5 · 23 Google reviews` before carousel. Evidence: `Reviews.astro`, `.keyfo-reviews-summary-bar`. | Social proof is now visible before card reading effort. |
| 5 | Local entity copy | Dutch hero intro names Broersveld 103, Schiedam Centrum, menu categories, and pickup. Evidence: `CONTENT_NL.heroIntro`. | Good visible SEO/LLM context without stuffing. |

### Weak Points
| # | Area | Problem | Impact | Urgency (1-5) | Evidence |
|---|---|---|---|---:|---|
| 1 | End of menu | After reading the full menu, there is no decision-point CTA or ordering bridge. | Users who choose a dish must scroll or use sticky mobile bar instead of seeing the next action in context. | 5 | `MenuSection.astro` ends with notes only. |
| 2 | Menu navigation | The menu has many categories but no category shortcuts. | Mobile users on 390x844 / 360x800 must scan a long list manually. | 4 | `MENU.categories` has 9 categories; `MenuSection.astro` renders one long grid/list. |
| 3 | Menu visual framing | The menu paper is attractive but isolated in cream whitespace. | It feels less like a KEYFO-owned menu object and more like a floating page. | 3 | `.keyfo-menu` is only a cream paper card; surrounding section is plain `.keyfo-band-cream`. |
| 4 | Analytics | No GA/Plausible/Umami/pixel or click-event code found. | WhatsApp, call, menu, route, and review clicks cannot be measured. | 4 | `rg` found links and carousel click handlers, but no analytics/tracking scripts. |
| 5 | Temporary notice | Development notice appears in both NL and TR hero. | Acceptable before client handoff, but it dilutes restaurant-first attention if left live. | 3 | `index.astro` and `tr/index.astro` include `.keyfo-dev-notice`. |

### Section-by-Section Diagnosis
| Section | What users likely understand | What may confuse or slow them | Risk |
|---|---|---|---|
| Header | Navigation, language switch, WhatsApp/order action. | Desktop nav is clear; mobile relies on bottom CTA and no visible nav links. | Low |
| Hero | KEYFO is a Turkish grill/doner restaurant in Schiedam; WhatsApp pickup is primary. | Development notice can compete with restaurant messaging while pre-launch. | Medium |
| InfoBar | Female owner, clean/careful, parking nearby, halal options. | "Garage Nieuwe Passage · 3 min lopen" is stronger than later cautious parking copy, so wording should stay consistent. | Low |
| Popular dishes | A quick price/sample scan. | It does not strongly connect to the full menu or WhatsApp decision. | Medium |
| Menu | Full prices and categories are available. | Long mobile scan; no category shortcuts; no CTA after browsing. | High |
| Reviews | Google social proof and real review text. | Carousel cards clamp long reviews; acceptable, but "all reviews" CTA should remain visible. | Low |
| Gallery | Real KEYFO interior proof. | Current alt text is useful; no major confusion. | Low |
| Location | Address, hours, parking caution, map, actions. | Parking copy is cautious but less specific than FAQ's first-hour-free statement. | Medium |
| FAQ | Operational answers. | It mixes local SEO questions with operational questions; still useful. | Low |
| Footer | NAP, actions, social links. | No agency/development credit here; if notice becomes long-term, footer is better. | Low |

### Claim / Trust Risks
| Item | Risk | File / section | Fix urgency |
|---|---|---|---|
| Parking wording mismatch | FAQ says first hour is free and 3 minutes walking; location says check current conditions. This is not a direct contradiction, but specificity differs. | `content.nl.ts`, `content.tr.ts`, `index.astro`, `tr/index.astro` | Medium |
| Google rating/count | `4.9 / 23` is used in hero and reviews; if it changes, visible content becomes stale. | `business.ts`, `Hero.astro`, `Reviews.astro` | Medium |
| Development notice | Correct as a temporary pre-launch disclaimer, but harmful as permanent first-screen content. | `index.astro`, `tr/index.astro` | Medium |
| Flame icon availability | `InfoBar.astro` still supports a flame icon even though current items do not use it. | `InfoBar.astro` | Low |

### Analytics / Tracking State
No analytics implementation was found in the read files. Evidence: search for `gtag`, `GoogleAnalytics`, `plausible`, `analytics`, `dataLayer`, `fbq`, `umami`, and click event tracking found only direct `wa.me`, `tel:`, `mailto:` links and review carousel click handlers. There is no visible tracking for WhatsApp, phone, menu, route, Thuisbezorgd, or Google review clicks. This should be treated as unknown conversion baseline, not as evidence of poor conversion.

### Assumptions
- Assumption: Dutch mobile visitors are the highest-conversion audience because `/` is the primary SEO page and the business goal is local pickup.
- Assumption: Menu browsing is a key decision point because users need dish/price confidence before WhatsApp pickup.
- Assumption: The current dirty working tree represents the design state to review, because `git status` showed multiple uncommitted changes.
- Assumption: The development notice is temporary because its copy and CSS comment say it is in development/remove on launch.

### Pass 1 complete. Top 3 issues to address in Pass 2: [end-of-menu conversion bridge, menu navigation/framing, analytics/tracking gap]. Proceeding...

## Pass 2 — Prescription

### Strategic Direction
The site should become a practical digital restaurant counter: warm, local, clear, and fast to act on. Preserve the current bordeaux + cream identity, real photos, WhatsApp-first model, bilingual structure, and visible menu. Do not redesign from scratch; tighten the moments where a visitor decides to order, visit, or trust the business. The next improvements should make the menu feel like KEYFO's own ordering surface and make conversion measurable.

### Quick Wins (<2 Hours)
| # | Recommendation | Why it matters | Files/sections | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|
| 1 | [shared] Add an end-of-menu CTA row: "Klaar om af te halen? Stuur je bestelling via WhatsApp" with WhatsApp primary and call secondary. | Captures intent at decision point #2 after dish browsing. | `MenuSection.astro`, `index.astro`, `tr/index.astro`, `global.css` | 5 | 2 | 1 |
| 2 | Align parking specificity across Location and FAQ. Use one cautious-but-useful wording style. | Prevents trust friction between "first hour free" and "check current conditions". | `content.nl.ts`, `content.tr.ts`, pages location props | 3 | 1 | 2 |
| 3 | Move/remove development notice at launch, or hide it behind a single easy-to-delete block. | Keeps hero restaurant-first for real customers. | `index.astro`, `tr/index.astro`, `.keyfo-dev-notice` | 3 | 1 | 1 |
| 4 | [shared] Add explicit click-tracking hooks as attributes/classes even before analytics provider choice. | Makes later WhatsApp/call/menu/route tracking safer and consistent. | CTAs in `Header`, `Hero`, `Location`, mobile CTA | 4 | 2 | 1 |
| 5 | Add a compact menu intro above categories if not already added to menu area. | Reinforces local entity at the exact browsing point. | `MenuSection.astro`, content files | 3 | 1 | 1 |

### One-Day Improvements
| # | Recommendation | Why it matters | Files/sections | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|
| 1 | [shared] Add a category shortcut bar for the menu. Keep all menu content visible; shortcuts only jump to sections. | Reduces mobile scanning cost without weakening SEO. | `MenuSection.astro`, `global.css` | 4 | 3 | 1 |
| 2 | [shared] Create a subtle "KEYFO menu cover" frame around the current paper: dark bordeaux outer mat, cream paper inside, small KEYFO stamp, no fake objects. | Makes menu feel intentional and branded, not isolated. | `MenuSection.astro`, `global.css` | 3 | 3 | 2 |
| 3 | [shared] Add lightweight analytics provider or event-ready integration for WhatsApp/call/menu/route/reviews. | Converts design work into measurable learning. | `BaseLayout.astro`, CTA components | 5 | 3 | 1 |
| 4 | [shared] Add a menu-side "Afhalen via WhatsApp" bookmark on desktop and a non-sticky CTA after notes on mobile. | Keeps the primary action near dish choice. | `MenuSection.astro`, `global.css` | 4 | 3 | 2 |
| 5 | [shared] Verify generated hero and OG assets with file-size/performance budget. | Hero background is preloaded; overlarge assets affect LCP. | `BaseLayout.astro`, `Hero.astro`, assets | 3 | 2 | 1 |

### Medium-Term Improvements
| # | Recommendation | Why it matters | Dependencies | Conversion (1-5) | Cost (1-5) | Brand risk (1-5) |
|---|---|---|---|---:|---:|---:|
| 1 | [shared] Build a measured menu UX with scrollspy/category active state. | Best long-menu usability on mobile, but more implementation/QA. | Stable menu ids and browser QA | 4 | 4 | 2 |
| 2 | [shared] Replace temporary development notice with footer agency credit or remove fully. | Restores first-screen restaurant focus after client handoff. | Launch decision | 3 | 1 | 1 |
| 3 | [shared] Run performance pass on image formats and preloads. | Several AVIF/WebP variants now exist; loading strategy should be intentional. | Lighthouse/browser QA | 3 | 3 | 1 |
| 4 | [shared] Add GBP/citation content checklist outside the site. | LLM/entity discovery depends on external consistency, not just on-page design. | Owner access to profiles | 3 | 3 | 1 |

### Do Not Do
| # | Tempting idea | Why not |
|---|---|---|
| 1 | Add fire/flame hero imagery | It can imply charcoal/open-flame cooking if unverified. Use abstract warm ambience only. |
| 2 | Add a reservation system | The business is pickup-first and there is no backend. |
| 3 | Add fake food photos | Real KEYFO assets are stronger and safer. |
| 4 | Add English version | NL is primary and TR is secondary; English doubles maintenance without clear local benefit. |
| 5 | Hide menu categories in accordions for desktop SEO cleanliness | The crawlable visible menu is a core strength. |

### Section Touches
- Header: fast improvement: add event/tracking-ready attributes to WhatsApp and phone links. Medium-term: test whether mobile should expose "Menu" in the header or rely on bottom CTA. Preserve compact fixed header and amber order button.
- Hero: fast improvement: keep development notice temporary and easy to remove. Medium-term: verify hero background crop at 390x844 and 360x800. Preserve big KEYFO typography, rating, ops line, and CTA hierarchy.
- InfoBar: fast improvement: keep wording cautious and consistent with Location/FAQ. Medium-term: consider order testing with "Halal opties" and parking before female-owner signal if mobile scanning shows drop-off. Preserve the trust-strip form.
- Popular dishes: fast improvement: make the full-menu CTA more assertive or connect it to ordering. Medium-term: allow category links into menu. Preserve photo-less cards and real prices.
- Menu: fast improvement: add end CTA. Medium-term: menu cover frame + category shortcuts. Preserve visible full menu, price leaders, cream paper texture.
- Reviews: fast improvement: keep inline summary; avoid rebuilding. Medium-term: test card line-clamp on mobile. Preserve Google source labels and no Review schema.
- Gallery: fast improvement: keep light plaster band. Medium-term: switch `<picture>` sources to use optimized variants while preserving fallback. Preserve real photos and mosaic.
- Location: fast improvement: align parking wording. Medium-term: test map loading/performance and CTA visibility. Preserve embedded route usefulness.
- FAQ: fast improvement: ensure local-intent questions remain near top. Medium-term: reduce purely operational questions if page feels long on mobile. Preserve CSS counters instead of visible numbered DOM text.
- Footer: fast improvement: use footer for permanent agency credit if needed. Medium-term: add concise local tagline. Preserve NAP and action links.

### Mobile-Specific Improvements
At 390x844 and 360x800, the highest-risk area is menu length. Add category jump chips that wrap in one or two rows, with anchor targets on each category heading. Keep the bottom mobile CTA, but add a contextual WhatsApp CTA after menu notes because users may not associate the bottom bar with the dish they just chose. Check `.keyfo-dev-notice__body` on 360px because it uses `overflow-wrap:anywhere`, which prevents overflow but can create choppy email wrapping. Verify the hero background crop does not reduce KEYFO text contrast on the right/center due to the warm asset.

### SEO / LLM Entity Improvements
Keep the Dutch hero entity paragraph; it is the best current LLM signal. Add a menu-section intro that repeats factual categories already present in `menu.ts`: doner, grillgerechten, Turkse pizza, desserts, drankjes, afhalen via WhatsApp/telefoon. Avoid new claims like "best", "homemade", or "charcoal". Consider adding `hasMenu` in Restaurant JSON-LD later, but do not prioritize it above visible conversion fixes. Add no aggregateRating or Review schema unless the policy/verification stance changes.

### Visual Direction
The current palette is correct: bordeaux/espresso for warmth and authority, cream/plaster for readability and real-photo trust. The next visual move should be physicality, not decoration: make the menu feel like a branded menu cover with subtle dark outer frame, cream inner paper, fine amber line, and maybe a small KEYFO stamp. Keep border radii at 8px or existing system values. Avoid glassmorphism, video, dramatic fire, or luxury hotel cues. Motion should remain light hover/scroll behavior only.

### Verification Plan
- Build/type: run `npm run build`. `npm run astro check` is listed in the brief, but `package.json` currently has no `astro check` script; either run `npm run astro -- check` or add a script in a separate approved phase.
- Browser/mobile: inspect 390x844, 360x800, and 1440x900. Check hero, menu category shortcuts, end-of-menu CTA, reviews summary, and location map.
- Accessibility: keyboard focus on header CTAs, menu shortcut anchors, review carousel arrows, mobile CTA, and map CTA. Ensure button/link text describes action.
- Performance: check hero preload, map iframe lazy load, WebP/AVIF gallery variants, and background image sizes. Avoid adding new heavy decorative images.
- Conversion tracking: after provider choice, verify WhatsApp, tel, menu, route, reviews, and Thuisbezorgd click events fire once and have readable event names.

### First Thing I Would Do
I would add a scoped end-of-menu conversion bridge first: a small branded row after the menu notes with "Klaar om af te halen?" plus WhatsApp primary and call secondary actions, using existing content and button classes. This touches the most important decision point after browsing, costs little, does not invent any claim, and makes the current excellent crawlable menu work harder for real pickup orders.
