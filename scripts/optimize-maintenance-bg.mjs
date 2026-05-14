import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, statSync, unlinkSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'public/assets/keyfo');
const src = resolve(assetsDir, 'maintenance-bg.png');

if (!existsSync(src)) {
  console.error('Source not found:', src);
  process.exit(1);
}

const fmt = (n) => (n / 1024).toFixed(1) + 'KB';
const widths = [480, 768, 1280, 1920];

const meta = await sharp(src).metadata();
console.log(`Source: ${meta.width}x${meta.height} (${meta.format}) ${fmt(statSync(src).size)}\n`);

const results = [];
for (const w of widths) {
  const webpOut = resolve(assetsDir, `maintenance-bg-${w}.webp`);
  const avifOut = resolve(assetsDir, `maintenance-bg-${w}.avif`);

  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(webpOut);
  await sharp(src).resize({ width: w, withoutEnlargement: true }).avif({ quality: 50, effort: 5 }).toFile(avifOut);

  results.push({ w, webp: statSync(webpOut).size, avif: statSync(avifOut).size });
}

const jpgOut = resolve(assetsDir, 'maintenance-bg-1280.jpg');
await sharp(src).resize({ width: 1280, withoutEnlargement: true }).jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(jpgOut);
const jpgSize = statSync(jpgOut).size;

console.log('Generated:');
for (const r of results) {
  console.log(`  maintenance-bg-${r.w}.webp  ${fmt(r.webp).padStart(8)}    maintenance-bg-${r.w}.avif  ${fmt(r.avif).padStart(8)}`);
}
console.log(`  maintenance-bg-1280.jpg  ${fmt(jpgSize).padStart(8)}  (fallback)`);

// Remove the heavy PNG original — only optimized variants ship.
unlinkSync(src);
console.log('\nRemoved source PNG. Done.');
