import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { existsSync, statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'public/assets/keyfo');

const galleryJpgs = [
  'interior-wide.jpg',
  'hero-interior.jpg',
  'interior-wall-art.jpg',
  'family-corner.jpg',
  'drinks-corner.jpg',
  'table-detail.jpg',
  'menu-board.jpg'
];

const fmt = (n) => (n / 1024).toFixed(1) + 'KB';

async function optimizeJpg(name) {
  const src = resolve(assetsDir, name);
  if (!existsSync(src)) return null;
  const stem = name.replace(/\.jpe?g$/i, '');
  const webpOut = resolve(assetsDir, `${stem}.webp`);
  const avifOut = resolve(assetsDir, `${stem}.avif`);

  const srcSize = statSync(src).size;

  await sharp(src).webp({ quality: 78, effort: 5 }).toFile(webpOut);
  await sharp(src).avif({ quality: 55, effort: 5 }).toFile(avifOut);

  const wSize = statSync(webpOut).size;
  const aSize = statSync(avifOut).size;
  console.log(
    `${name.padEnd(28)} jpg ${fmt(srcSize).padStart(8)} → webp ${fmt(wSize).padStart(8)} | avif ${fmt(aSize).padStart(8)}`
  );
  return { name, jpg: srcSize, webp: wSize, avif: aSize };
}

console.log('--- Gallery / hero JPG → WebP + AVIF ---');
for (const f of galleryJpgs) {
  await optimizeJpg(f);
}

const menuBgSrc = resolve(assetsDir, 'menu-paper-bg.png');
if (existsSync(menuBgSrc)) {
  const menuBgWebp = resolve(assetsDir, 'menu-paper-bg.webp');
  const srcSize = statSync(menuBgSrc).size;
  await sharp(menuBgSrc).webp({ quality: 75, effort: 6 }).toFile(menuBgWebp);
  const wSize = statSync(menuBgWebp).size;
  console.log(
    `\nmenu-paper-bg.png            png ${fmt(srcSize).padStart(8)} → webp ${fmt(wSize).padStart(8)}`
  );
}

console.log('\nDone.');
