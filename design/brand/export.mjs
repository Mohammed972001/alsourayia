// Generates every logo file the site serves from the vector masters in design/brand/.
// The traced SVGs are 90–130 KB compressed, too heavy to load on every page, so pages use small rasters rendered
// from them; the SVG masters are published under /brand/ for print and partners.
// Run: node design/brand/export.mjs
import sharp from 'sharp';
import { copyFileSync, writeFileSync } from 'node:fs';

const D = 'design/brand', P = 'public';
const render = (svg, size) => sharp(`${D}/${svg}.svg`, { density: Math.max(72, Math.ceil((72 * size) / 300) * 2) }).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

// Header emblem (shown at 46 px; 144 px covers 3x screens).
await render('emblem', 144).webp({ quality: 82, alphaQuality: 90 }).toFile(`${P}/brand/emblem.webp`);
// Footer badge, white on ink.
await render('mono', 320).webp({ quality: 90, alphaQuality: 100 }).toFile(`${P}/brand/badge-white.webp`);
// Full-colour badge for pages that show the whole logo.
await render('badge', 640).webp({ quality: 90 }).toFile(`${P}/brand/badge.webp`);
// Logo Google reads from the JSON-LD, and the 512 icon (must be raster).
await render('badge', 512).png({ compressionLevel: 9 }).toFile(`${P}/logo.png`);
await render('badge', 512).png({ compressionLevel: 9 }).toFile(`${P}/icon-512.png`);
// Apple touch icon: emblem on the cream disc colour, no transparency (iOS fills it black otherwise).
await render('emblem', 150).extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#F7F3EC' }).flatten({ background: '#F7F3EC' }).png().toFile(`${P}/apple-touch-icon.png`);

// favicon.ico with 16, 32 and 48 px PNG entries.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => render('emblem', s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync(`${P}/favicon.ico`, Buffer.concat([header, ...pngs]));

// Masters for print and partners.
for (const f of ['badge', 'emblem', 'mono']) copyFileSync(`${D}/${f}.svg`, `${P}/brand/${f}.svg`);
console.log('brand assets written');
