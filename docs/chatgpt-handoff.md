# KEYFO Website — ChatGPT Handoff Plan

Bu doküman, projenin sıfırdan devralan bir ChatGPT/geliştirici için tam bağlamını sunar. Amaç: yapılan her şeyi, neden öyle yapıldığını ve kalan işleri net olarak aktarmak.

Tarih: 2026-05-12
Branch: `main`
Repo durumu: 4 dosyada uncommitted değişiklik (footer arka plan görseli + popular/menu kilim band çerçevesi)

---

## 1) Projenin Özeti

**KEYFO Restaurant & Cafe** için tek sayfa (one-pager) + bir lokal SEO landing sayfası içeren Astro tabanlı, mobil-öncelikli, statik bir restoran web sitesi.

- Domain: `https://keyfo.nl/`
- İşletme: Türk grill & döner restoranı, Schiedam (NL)
- Adres: Broersveld 103, 3111 LE Schiedam
- Tel/WhatsApp: +31 6 41014926
- Açılış: Çar–Pzt 11:30–22:00; Salı kapalı
- Google: 4.9 / 23 yorum
- Stack: **Astro 6**, **Tailwind 4** (Vite plugin), vanilla JS, Vercel Analytics + Speed Insights
- Yok: CMS, backend, online ödeme, rezervasyon, sepet/checkout, chatbot, PDF menü

**İş modeli kuralı (kritik)**: KEYFO'nun kendi sitesinde online sipariş yok. Gel-al telefon/WhatsApp ile; teslimat sadece Thuisbezorgd (harici link). Site bunlar dışında bir sipariş akışı KURMAMALI.

---

## 2) Proje Yapısı

```
src/
  data/                 # business.ts, menu.ts, content.nl.ts, content.tr.ts
  layouts/BaseLayout.astro
  components/
    Header.astro
    Hero.astro
    InfoBar.astro
    PopularDishes.astro
    MenuSection.astro
    Gallery.astro
    Reviews.astro
    Location.astro
    FAQ.astro
    Footer.astro
  pages/
    index.astro                          # NL homepage (canonical /)
    tr/index.astro                       # TR homepage (/tr/)
    turks-restaurant-schiedam.astro      # NL lokal SEO landing
    tr/turks-restoran-schiedam.astro     # TR lokal SEO landing (kontrol et: sitemap'de var)
  styles/global.css     # tüm KEYFO tasarım sistemi burada (bordo/krem palet,
                        # bantlar: dark, cream, plaster, leather, kilim-band)

public/
  assets/keyfo/         # gerçek mekan fotoğrafları, .avif/.webp/.jpg varyantları
  business.json         # makinece okunabilir NAP
  menu.json             # makinece okunabilir menü (menu.ts ile senkron tut)
  llms.txt              # LLM erişimi için özet
  robots.txt
  sitemap.xml           # manuel; sadece 4 URL içermeli

docs/                   # tüm planlama, brief, SEO, ertelenmiş işler, design review
scripts/                # build-og-assets.mjs, optimize-images.mjs (uncommitted)
```

---

## 3) Tasarım Sistemi & Marka

- Palet: bordeaux (koyu kırmızı) + krem + altın/amber vurgu + plaster (sıva) doku
- Bantlar (CSS classları, `global.css`):
  - `keyfo-band-dark` — koyu bordeaux
  - `keyfo-band-cream` — krem
  - `keyfo-band-plaster` — sıva dokulu krem (gallery vb.)
  - `keyfo-band-dark--leather` — deri dokulu koyu (location vb.)
  - `keyfo-kilim-band` — kilim şeridi çerçevesi (yeni, henüz commitlenmemiş)
- Tipografi: serif başlık + sans gövde (CSS'te `--keyfo-font-serif`)
- Aksan motifi: diamond eyebrow (her section üstünde küçük rhombus)
- Buton hiyerarşisi:
  - Primary (amber): WhatsApp
  - Secondary: menu / call / route
  - Tertiary link: Thuisbezorgd ("delivery-link")
- Görsel kuralı: **sadece gerçek KEYFO fotoğrafları**; eksikse tasarım fallback (krem zemin + KEYFO yazı + amber aksan). AI/stok yemek fotoğrafı YASAK.

---

## 4) İçerik & Menü Kuralları

- Menü kaynağı: `src/data/menu.ts` (ana kaynak). Değişiklik olursa **önce** `menu.ts`, **sonra** `public/menu.json` senkronla. `lastUpdated` alanını güncelle.
- Fiyatlar: EUR, NL formatı (`€10,50`), `formatPriceEurNl` helper'ı kullanılıyor.
- Featured (öne çıkanlar): Lentil Soup, Kapsalon large, Manti, Döner sandwich, Dürüm döner, Köfte menu, Künefe (menu.ts'te `featured: true`).
- Halal: sadece "halal opties" / "helal seçenekler". "100% halal" veya "certified halal" YAZMA (doğrulanmamış iddia).
- Thuisbezorgd: süre/minimum/teslimat ücretini siteye YAZMA (platforma göre değişir). Sadece harici link.
- WhatsApp prefill mesajları `content.nl.ts` / `content.tr.ts` içinde sabitli.
- Allergen note (zorunlu, görünür yerde): "Alerjiniz varsa lütfen sipariş öncesi sorun."
- Price note (görünür): fiyatların değişebileceği, Thuisbezorgd koşullarının farklı olabileceği.

---

## 5) SEO & AEO Durumu

### Yapıldı
- ✅ NL `/` ve TR `/tr/` ayrı rotalar, çift yönlü hreflang (`nl-NL`, `tr-TR`, `x-default`)
- ✅ Canonical URL'ler doğru
- ✅ OG image (`public/assets/keyfo/og-keyfo.jpg`) + theme color + Twitter card
- ✅ `robots.txt` + `sitemap.xml` (sitemap manuel, 4 URL içermeli)
- ✅ `Restaurant` + `BreadcrumbList` + `FAQPage` JSON-LD
- ✅ Yasak schema alanları temizlendi: `aggregateRating`, `review`, `priceRange`, `acceptsReservations` YOK (commit 6a06035 ile)
- ✅ `openingHoursSpecification` doğru (Mon, Wed–Sun 11:30–22:00, Tue closed)
- ✅ `public/business.json` ve `public/menu.json` (makine okunur NAP/menü)
- ✅ `public/llms.txt` (LLM özet)
- ✅ Lokal SEO landing: `/turks-restaurant-schiedam/` + TR muadili
- ✅ Header navigation linkPrefix (sayfa-arası anchor)
- ✅ Analytics data-event hook'ları (`click_whatsapp`, `click_call`, `click_route`, `click_menu`, `click_thuisbezorgd`)
- ✅ Vercel Analytics + Speed Insights (commit b96b81a)

### Eklenmedi (bilinçli)
- ❌ `aggregateRating` schema — Google ToS riski (uydurma rating)
- ❌ Online ordering / payment schema
- ❌ React veya başka framework (gereksiz)

---

## 6) Erteleme/Açık İşler (kritik öncelik sırasıyla)

Detay: `docs/ertelenmis-isler.md` ve `docs/gsc-checklist.md`.

### 🔴 Bloklu — sahip aksiyonu bekliyor
1. **GBP (Google Business Profile) NAP senkron** — Geliştirici erişimi yok. Hanife'den manager izni iste veya checklist'i gönder (`ertelenmis-isler.md` içinde 15 dk'lık adım listesi var).
2. **Resmi GBP URL fallback swap** — GBP URL elde olunca `turks-restaurant-schiedam.astro` içindeki `mapsSearchUrl` tek satırlık değişiklikle gerçek URL ile değişecek.

### 🟡 Karar bekleniyor
3. **Hero görsel kararı** — Yeni profesyonel iç mekan çekimi olabilir; karar netleşince WebP+AVIF+`fetchpriority="high"` ile ekle. Alt text: `Interieur van KEYFO Restaurant & Cafe aan Broersveld in Schiedam`.
4. **Analytics provider seçimi (GA4 / Plausible)** — `data-event` attribute'ları hazır. Provider seçilince `BaseLayout.astro` head'ine 5 satırlık JS bridge eklenecek (örnek snippet `ertelenmis-isler.md`'de).
5. **Development notice kaldırma** — Hero'daki `.keyfo-dev-notice` launch öncesi kaldırılacak; veya footer'da agency credit'e dönüştürülecek.

### 🟢 Deploy sonrası operasyonel (GSC checklist)
6. **GSC property + sitemap submit** (Domain property; TXT verification gerekebilir)
7. **4 URL için Request Indexing** (`/`, `/tr/`, `/turks-restaurant-schiedam/`, `/tr/turks-restoran-schiedam/`)
8. **Rich Results Test** — 4 URL için; Breadcrumb + FAQ algılanmalı, Restaurant rich snippet zorunlu değil
9. **24-72 saat sonra Indexed kontrol**, **30 gün sonra Performance analizi** (cluster sayfa kararı eşikleri: 20+ impression/hafta, position 8-20, 4 hafta tutarlı)
10. **Bing Webmaster** (opsiyonel, 5 dk)
11. **Lighthouse mobil ölçümü** canlı URL'de; hedef LCP < 2.5s, CLS < 0.1, Performance ≥ 90
12. **Organik Google review akışı** — kasada QR kod, asla teşvik/ödül yok

### Cluster sayfa adayları (30 gün sonra veriye bakarak)
- `/doner-schiedam/` (NL+TR)
- `/afhalen-schiedam-centrum/` (NL)
- `/kapsalon-schiedam/` (NL)
- `/halal-opties-schiedam/` (yalnız menüde net halal opties varsa)

---

## 7) Tasarım Review Bulguları (2026-05-10) — Uygulama Durumu

Detay: `docs/design-review-2026-05-10.md`.

### Quick Wins
| # | Öneri | Durum |
|---|---|---|
| 1 | Menü sonunda CTA satırı ("Klaar om af te halen? WhatsApp") | Doğrulanmadı — kontrol et `MenuSection.astro` |
| 2 | Location ↔ FAQ park bilgisi tutarlılığı | Açık |
| 3 | Dev notice'ı launch'ta kaldır | Açık |
| 4 | Click-tracking data-event hook'ları | ✅ Yapıldı |
| 5 | Menü intro yazısı | ✅ Yapıldı (commit 2163fd6) |

### One-Day
- ✅ Menü kategori shortcut bar (2163fd6, sticky chips: 5c27443, active state: d5c2d0a)
- ✅ KEYFO menü cover frame + stamp (2100e80)
- ⏳ Analytics provider entegrasyonu (Vercel Analytics eklendi ama özel event tracking yok)
- ⏳ Menü içi WhatsApp bookmark
- ⏳ Hero/OG asset performance budget verifikasyonu (scripts/ klasöründe optimize-images.mjs var, commitlenmemiş)

---

## 8) Şu An Uncommitted Olan Değişiklikler

```
M src/components/Footer.astro    # footer-closing.webp arka plan + overlay eklendi
M src/pages/index.astro          # Popular + Menu sectionları "keyfo-kilim-band" çerçevesine sarıldı
M src/pages/tr/index.astro       # aynı kilim-band sarmalama TR'de
M src/styles/global.css          # +92 satır: kilim band, footer-bg, footer-overlay CSS
?? public/assets/keyfo/footer-closing.webp + mobile
?? public/assets/keyfo/menu-kilim-band.webp + mobile
?? public/assets/keyfo/gallery-texture.jpg
?? scripts/build-og-assets.mjs, optimize-images.mjs
```

**Karar verilecek**: Bu görsel zenginleştirme commit'lensin mi yoksa daha sade tutulsun mu? Footer arka plan görseli kontrast/okunabilirliği etkileyebilir — canlıda mobilde test edilmeli.

---

## 9) Komutlar

```bash
npm install
npm run dev              # localhost:4321
npm run build            # dist/
npm run preview
npm run astro -- check   # type check
```

Node ≥ 22.12.0 zorunlu (`package.json` engines).

---

## 10) Devralan İçin İlk Bakış Sırası

1. `docs/01-project-brief.md` — iş kuralları, izin verilen/yasak scope
2. `docs/02-content-and-menu.md` — copy ve menü kuralları
3. `docs/03-seo-aeo-requirements.md` — SEO/hreflang/schema kuralları
4. `docs/04-build-plan.md` — stack ve launch checklist
5. `docs/design-review-2026-05-10.md` — son tasarım analizi
6. `docs/ertelenmis-isler.md` — bekleyen işler (öncelik haritası)
7. `docs/gsc-checklist.md` — deploy sonrası operasyonel adımlar
8. `src/data/business.ts` ve `src/data/menu.ts` — gerçek veri
9. `src/styles/global.css` — tasarım sistemi
10. Commit history (`git log --oneline`) — ne sırada ne yapıldığı

---

## 11) Kritik "Yapma" Listesi

- Online sipariş/sepet/ödeme akışı KURMA.
- `aggregateRating` veya uydurma review schema EKLEME.
- "100% halal" / "halal gecertificeerd" YAZMA.
- AI/stok yemek fotoğrafı KULLANMA.
- Thuisbezorgd süre/minimum/teslimat ücreti SİTEYE YAZMA.
- React/CMS/backend EKLEME (scope dışı).
- NAP'ı bir yerde değiştirip diğer yerleri unutma — visible page + footer + JSON-LD + `business.json` hepsi aynı olmalı.
- Hero'daki dev notice'ı production'a alma.

---

## 12) Sonraki Sprint için Öneri (devralan kişi 1 günde ne yapsın)

1. Uncommitted değişikliklere karar ver (kilim band + footer image): commit veya revert.
2. `/menu` section sonuna "Klaar om af te halen?" CTA satırı ekle (Quick Win #1).
3. Location ve FAQ park kopyalarını eşitle (Quick Win #2).
4. Analytics provider seç → 5 satır JS bridge → `data-event` hook'ları çalışsın.
5. Production deploy + GSC checklist (1-5) — `docs/gsc-checklist.md` adım adım.
6. Rich Results Test 4 URL — hata varsa düzelt.
7. Lighthouse mobil ölçüm → varsa LCP/CLS regresyonlarını gider.

Bu listenin tamamı bir günlük iş; sonraki 30 günde GSC verisi birikecek ve cluster sayfa kararı verilecek.
