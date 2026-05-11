# Google Search Console — Final Checklist

Deploy sonrası tamamlanacak operasyonel adımlar. Tek seferlik (1-5) + tekrarlayan kontrol (6-7).

---

## 1. Search Console Property

- [ ] https://search.google.com/search-console aç
- [ ] Sol üst dropdown'dan `keyfo.nl` property var mı kontrol et
- [ ] **Yoksa**:
  - "Add property" → **"Domain"** seç (URL prefix değil)
  - `keyfo.nl` yaz
  - Google'ın verdiği TXT kaydını DNS'e ekle (Vercel domain ayarları veya domain registrar'da)
  - "Verify" tıkla — 5-10 dk sürebilir

**Neden Domain property?** Hem `https://`, hem `http://`, hem `www.`, hem `keyfo.nl/tr/` gibi alt yollar tek yerden takip edilir.

---

## 2. Sitemap Submit

- [ ] Canlı sitemap erişilebilir mi: https://keyfo.nl/sitemap.xml
- [ ] 4 URL göründüğünü doğrula:
  - `https://keyfo.nl/`
  - `https://keyfo.nl/tr/`
  - `https://keyfo.nl/turks-restaurant-schiedam/`
  - `https://keyfo.nl/tr/turks-restoran-schiedam/`
- [ ] GSC → **Sitemaps** menüsü
- [ ] "Add a new sitemap" alanına yaz: `sitemap.xml` (sadece bu, tam URL değil)
- [ ] **Submit** → Status "Success", Discovered URLs = 4

---

## 3. URL Inspection + Request Indexing

GSC üst arama çubuğuna sırayla şu URL'leri yapıştır, her biri için **Request Indexing**:

- [ ] `https://keyfo.nl/`
- [ ] `https://keyfo.nl/tr/`
- [ ] `https://keyfo.nl/turks-restaurant-schiedam/`
- [ ] `https://keyfo.nl/tr/turks-restoran-schiedam/`

Akış (her URL için):
1. URL Inspection otomatik çalışır
2. "URL is not on Google" görürsen → **Request indexing** butonu
3. 1-2 dakika bekle, "Indexing requested" mesajı çıkar

> Manual request günde **10-12 URL** ile sınırlı. 4 URL için sorun yok.

---

## 4. Rich Results Test (Schema Doğrulama)

- [ ] https://search.google.com/test/rich-results aç
- [ ] 4 URL'yi test et:
  - `https://keyfo.nl/`
  - `https://keyfo.nl/tr/`
  - `https://keyfo.nl/turks-restaurant-schiedam/`
  - `https://keyfo.nl/tr/turks-restoran-schiedam/`

Beklenti:
- ✅ Hata olmamalı
- ✅ **Breadcrumb** landing sayfalarda algılanmalı
- ✅ **FAQ** görünürse iyi
- ⚠️ **Restaurant** schema rich result olarak görünmeyebilir — bu tek başına problem değil (Google için yapılan structured data, kullanıcıya rich snippet zorunlu değil)

Hata/uyarı çıkarsa screenshot al, geliştiriciye ilet.

---

## 5. 24-72 Saat Sonra Kontrol

- [ ] GSC → **Pages** sekmesi (eski adı: Coverage)
- [ ] **Indexed** sekmesinde 4 URL'nin durumu:
  - "Indexed" → ✅ Google sayfayı eklemiş
  - "Discovered – currently not indexed" → ⏳ Sırada, bekle
  - "Crawled – currently not indexed" → ⏳ Bekle, normal
  - "Excluded" / "Error" → ❌ Sebep ne, geliştiriciye ilet
- [ ] **Sitemaps** sekmesinde "Submitted: 4 / Indexed: X" oranı zamanla artmalı

---

## 6. 30 Gün Sonra: Performance Analizi

- [ ] GSC → **Performance** sekmesi
- [ ] **Date range**: Last 28 days
- [ ] Filter: **Page** = `/turks-restaurant-schiedam/`
  - Queries (hangi sorgulardan geldi)
  - Impressions (gösterim sayısı)
  - Position (ortalama sıra)
  - CTR (tıklanma oranı)
- [ ] Aynı kontrolü tekrarla: Page = `/tr/turks-restoran-schiedam/`

### Cluster Sayfa Kararı Eşikleri

Bir keyword için yeni cluster sayfa açma kriterleri:
- **20+ impression / hafta**
- **Position 8-20 arası**
- **4 hafta tutarlı veri**

Eşik aşılırsa cluster sayfa açma sırası:
1. `/doner-schiedam/` (NL) + `/tr/doner-schiedam/` (TR)
2. `/afhalen-schiedam-centrum/` (NL only)
3. `/kapsalon-schiedam/` (NL only — Hollanda spesifik)
4. `/halal-opties-schiedam/` (sadece menüde net halal opties varsa)

---

## 7. Bing Webmaster Tools (Opsiyonel, 5 dk)

- [ ] https://www.bing.com/webmasters aç
- [ ] "Import from Google Search Console" → otomatik geçiş
- [ ] Sitemap zaten algılanır

Hollanda'da Bing payı düşük (%2-3) ama 5 dakikalık iş.

---

## Hızlı Özet

| Aşama | Süre | Frekans |
|---|---|---|
| Property + Sitemap submit | 5 dk | Tek sefer |
| 4 URL Request indexing | 5 dk | Tek sefer |
| Rich Results Test | 5 dk | Tek sefer |
| Indexed status kontrol | 2 dk | 24-72 saat sonra |
| Performance analizi | 10 dk | Her ay |
| Cluster karar | — | 30 gün sonra |

---

## Notlar

- Sayfanın Google'da görünmesi **2-7 gün** sürer
- Sıralama oluşması **2-4 hafta**
- "Turks restaurant Schiedam" gibi düşük rekabetli lokal aramada ilk sayfaya çıkmak **30-90 gün**
- Sıralama Google'ın algoritma kararı; her hafta küçük dalgalanma normal
