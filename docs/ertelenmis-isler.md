# Ertelenmiş İşler

Erişim, doğrulama veya işletme verisi beklediğimiz için şimdi yapamadığımız işler.

---

## 🔴 GBP NAP senkron + landing URL ekleme

**Engel**: Geliştiricinin Google Business Profile (GBP) erişimi yok.

**Aksiyon**:
- Hanife'den GBP "Manager" erişimi iste (panelden "Add manager" → geliştiricinin Gmail'i)
- Veya checklist'i Hanife'ye gönder, kendisi yapsın

**GBP'de yapılacaklar (15 dk iş)**:
1. https://business.google.com → KEYFO profili
2. **Info** sekmesi (birebir aynı NAP):
   - Name: `KEYFO Restaurant & Cafe`
   - Address: `Broersveld 103, 3111 LE Schiedam`
   - Phone: `+31 6 41014926`
   - Website: `https://keyfo.nl/`
   - Hours: Mon, Wed–Sun 11:30–22:00, Tuesday closed
3. **Categories**:
   - Primary: `Turkish restaurant`
   - Secondary: `Restaurant`, `Mediterranean restaurant`, `Cafe`
4. **Description** (NL):
   > KEYFO Restaurant & Cafe ligt aan Broersveld 103 in Schiedam Centrum. Op de kaart staan döner, grillgerechten, Turkse pizza, broodjes, salades, desserts en drankjes. Halal opties beschikbaar. Afhalen via WhatsApp of telefoon. Bezorging via Thuisbezorgd. Meer info: https://keyfo.nl/turks-restaurant-schiedam/
5. **Services**: Takeout ✓, Delivery ✓, Dine-in ✓
6. **Menu link**: `https://keyfo.nl/#menu`
7. **Photos**: Sitedeki gerçek iç mekan fotoğraflarını yükle (tutarlılık)

**Etki**: Lokal SEO sıralamasında yüksek etki (+0.4 puan, "Turks restaurant Schiedam" aramasında harita panelinde öne çıkma).

---

## 🟡 Resmi GBP URL — fallback swap

**Engel**: GBP profil URL'i henüz elde değil (yukarıdaki erişim çözülünce gelir).

**Aksiyon**: GBP URL elde olunca `src/pages/turks-restaurant-schiedam.astro` içindeki `mapsSearchUrl` fallback'ını gerçek GBP URL'i ile değiştir. 1 satırlık edit.

**Şu anki fallback**:
```
https://www.google.com/maps/search/?api=1&query=KEYFO+Broersveld+103+Schiedam
```

---

## 🟡 Hero görsel kararı (gerçek iç mekan fotoğrafı)

**Engel**: Tasarım tarafından kesin karar bekleniyor; ayrıca yeni profesyonel iç mekan çekimi olabilir.

**Aksiyon**:
- Tasarım hero görseli kararını verince landing page'e ekle
- Gerçek iç mekan fotoğrafı ise alt text: `Interieur van KEYFO Restaurant & Cafe aan Broersveld in Schiedam`
- Soyut/dekoratif ise: `alt=""` + `aria-hidden="true"`
- WebP + AVIF + `fetchpriority="high"`

---

## 🟡 GA4 / Plausible analytics provider

**Engel**: Henüz analytics hesabı/sağlayıcı seçimi yok.

**Aksiyon**: Provider seçilince script'i `BaseLayout.astro` head'ine ekle. Event hooks (`data-event` attribute'ları) zaten landing page'de hazır:
- `click_whatsapp`, `click_call`, `click_route`, `click_menu`, `click_thuisbezorgd`

Sadece bir küçük JS gerekecek:
```js
document.querySelectorAll('[data-event]').forEach(el => {
  el.addEventListener('click', () => {
    // gtag('event', el.dataset.event) veya plausible(el.dataset.event)
  });
});
```

---

## 🟡 Lighthouse mobil ölçümü

**Engel**: Henüz production deploy yapılmadı veya canlı URL üzerinden ölçüm alınmadı.

**Aksiyon**: Deploy sonrası `https://keyfo.nl/turks-restaurant-schiedam/` üzerinde Chrome DevTools → Lighthouse → Mobile çalıştır. Hedefler:
- LCP < 2.5s
- CLS < 0.1
- Performance score ≥ 90

Sonuçları bu dosyaya tarihli not olarak ekle.

---

## 🟢 Google Search Console submit

**Engel**: Yok — deploy sonrası yapılır.

**Aksiyon** (deploy sonrası):
1. https://search.google.com/search-console
2. Property: keyfo.nl (zaten ekli mi kontrol)
3. URL Inspection → `https://keyfo.nl/turks-restaurant-schiedam/` → "Request indexing"
4. Sitemap → `https://keyfo.nl/sitemap.xml` (zaten ekli olmalı)

---

## 🟢 Bing Webmaster Tools (opsiyonel)

**Engel**: Yok.

**Aksiyon**: https://www.bing.com/webmasters → keyfo.nl ekle, sitemap submit. Hollanda'da Bing payı düşük ama 5 dakikalık iş.

---

## 🟢 Rich Results Test doğrulama

**Engel**: Yok — deploy sonrası.

**Aksiyon**: Deploy sonrası 3 sayfa için test et:
- https://search.google.com/test/rich-results
- `https://keyfo.nl/`
- `https://keyfo.nl/tr/`
- `https://keyfo.nl/turks-restaurant-schiedam/`

Beklenen rich result tipleri: `Restaurant`, `Breadcrumb`, `FAQ`. Hata/uyarı çıkarsa bu dosyaya not düş.

---

## 🟢 30 gün sonra: GSC veri analizi → cluster sayfa kararı

**Engel**: Veri birikmesi gerekiyor (en az 30 gün GSC datası).

**Aksiyon** (~30 gün sonra, deploy tarihinden sayarak):
1. Search Console → Performance
2. `/turks-restaurant-schiedam/` için sorgu listesi
3. Eşik: bir keyword **20+ impression/hafta**, position 8-20, 4 hafta tutarlı
4. Eşik aşılırsa cluster sayfa aç. Sıra:
   - `/doner-schiedam/`
   - `/afhalen-schiedam-centrum/`
   - `/kapsalon-schiedam/`
   - `/halal-opties-schiedam/` (sadece menüde net halal opties varsa)

---

## 🟢 Google review akışı (organik)

**Engel**: Yok ama sürekli iş.

**Aksiyon**:
- Afhalen sırasında müşteriden nazikçe Google review iste
- Asla teşvik / ödül vermeden
- Kasada QR kod (Google review direct link)
- Gelen review'lara her zaman Hollandaca cevap ver
- Sahte review yasak (manuel ceza riski)

---

## ✅ Tamamlanan (referans için)

- ✅ `/turks-restaurant-schiedam/` landing page
- ✅ Restaurant + BreadcrumbList + FAQPage schema
- ✅ openingHoursSpecification (Mon, Wed-Sun 11:30-22:00)
- ✅ Yasak schema alanları temizlendi (priceRange, aggregateRating, review, acceptsReservations)
- ✅ Cross-page anchor nav (Header linkPrefix)
- ✅ Homepage'den 3 internal link
- ✅ Sitemap güncellendi
- ✅ Analytics data-event hook'ları
- ✅ .claude/ ignore
