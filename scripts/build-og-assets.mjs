import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const signSrc = resolve(root, 'public/assets/keyfo/sign.jpg');
const ogOut = resolve(root, 'public/assets/keyfo/og-keyfo.jpg');
const appleOut = resolve(root, 'public/apple-touch-icon.png');

const W = 1200, H = 630;
const SIGN_W = 540;

const signMeta = await sharp(signSrc).metadata();
const sw = signMeta.width;
const sh = signMeta.height;

const sqSize = Math.min(sw, sh);
const sqLeft = Math.round((sw - sqSize) / 2);
const sqTop = Math.max(0, Math.round((sh - sqSize) / 2 - sh * 0.08));

const signCrop = await sharp(signSrc)
  .extract({ left: sqLeft, top: sqTop, width: sqSize, height: sqSize })
  .resize(SIGN_W, H, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 1.05 })
  .toBuffer();

const fadeSvg = Buffer.from(`<svg width="${SIGN_W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c0806" stop-opacity="0"/>
      <stop offset="55%" stop-color="#0c0806" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0c0806" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${SIGN_W}" height="${H}" fill="url(#fade)"/>
</svg>`);

const bgSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0e08"/>
      <stop offset="100%" stop-color="#0c0806"/>
    </linearGradient>
    <radialGradient id="warm" cx="0.78" cy="0.40" r="0.55">
      <stop offset="0%" stop-color="#3c1912" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0c0806" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
</svg>`);

const signWithFade = await sharp(signCrop)
  .composite([{ input: fadeSvg, top: 0, left: 0 }])
  .toBuffer();

const TEXT_X = 600;
const textSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .brand  { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; fill: #fff7e9; letter-spacing: 4px; }
    .sub    { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 500; fill: #fff7e9; opacity: 0.92; letter-spacing: 1.5px; }
    .meta   { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 400; fill: #fff7e9; opacity: 0.78; }
    .accent { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600; fill: #f2b02b; letter-spacing: 4px; text-transform: uppercase; }
  </style>
  <text x="${TEXT_X}" y="240" font-size="84" class="brand">KEYFO</text>
  <text x="${TEXT_X}" y="290" font-size="28" class="sub">Restaurant &amp; Cafe</text>
  <rect x="${TEXT_X}" y="320" width="60" height="2" fill="#bc201a"/>
  <text x="${TEXT_X}" y="385" font-size="26" class="meta">Broersveld 103, Schiedam</text>
  <text x="${TEXT_X}" y="450" font-size="18" class="accent">Turkse grill · döner</text>
</svg>`);

await sharp(bgSvg)
  .composite([
    { input: signWithFade, top: 0, left: 0 },
    { input: textSvg, top: 0, left: 0 }
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(ogOut);

console.log('OG image written:', ogOut);

await sharp(signSrc)
  .extract({ left: sqLeft, top: sqTop, width: sqSize, height: sqSize })
  .resize(180, 180)
  .png({ quality: 92 })
  .toFile(appleOut);

console.log('Apple touch icon written:', appleOut);
