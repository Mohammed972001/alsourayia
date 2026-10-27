// Refined trace of the badge: emblem and lettering traced separately at 4x with smoothing, so edges are clean and
// the letters crisp. Writes badge-a2.svg (full badge), emblem-a2.svg (S emblem only, square) and mono-a2.svg.
import sharp from 'sharp';
import ImageTracer from 'imagetracerjs';
import { optimize } from 'svgo';
import { writeFileSync, readFileSync } from 'node:fs';

const src = 'D:/work/Luxury Arabic Corporate Website/public/heroBG.jpeg';
const K = 4;

async function trace(box, opts, bgTest) {
  const img = sharp(src).extract(box).resize(box.width * K, box.height * K, { kernel: 'lanczos3' }).median(5);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) if (bgTest(data[i], data[i + 1], data[i + 2])) data[i + 3] = 0;
  const svg = ImageTracer.imagedataToSVG({ width: info.width, height: info.height, data }, { strokewidth: 0, roundcoords: 1, viewbox: true, scale: 1 / K, ...opts });
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/<path[^>]*opacity="0"[^>]*\/>/g, '');
}
const light = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx > 205 && mx - mn < 34; };

const emblemBox = { left: 150, top: 330, width: 300, height: 370 };
const swooshBox = { left: 330, top: 330, width: 450, height: 110 };
const textBox = { left: 440, top: 425, width: 440, height: 275 };

const emblem = await trace(emblemBox, { numberofcolors: 18, ltres: 1, qtres: 1, pathomit: 80, blurradius: 2, blurdelta: 40, colorquantcycles: 5 }, light);
const swoosh = await trace(swooshBox, { numberofcolors: 6, ltres: 1, qtres: 1, pathomit: 60, blurradius: 2 }, (r, g, b) => light(r, g, b) || (r > 190 && g > 180 && b > 165));
const text = await trace(textBox, { numberofcolors: 6, ltres: 0.5, qtres: 0.5, pathomit: 40, blurradius: 1, colorquantcycles: 6 }, light);

const disc = `<circle cx="512" cy="512" r="496" fill="#EAE0CC"/><circle cx="512" cy="512" r="470" fill="#F7F3EC" stroke="#D8C8A6" stroke-width="6"/>`;
const at = (b, inner) => `<g transform="translate(${b.left} ${b.top})">${inner}</g>`;
const opt = (s) => optimize(s, { multipass: true, plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] }).data;

const body = `${at(swooshBox, swoosh)}${at(emblemBox, emblem)}${at(textBox, text)}`;
writeFileSync('badge-a2.svg', opt(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="السريع للأرضيات والمفروشات">${disc}${body}</svg>`));
// Emblem-only square for the header and favicons (crop around the S).
writeFileSync('emblem-a2.svg', opt(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${emblemBox.left - 10} ${emblemBox.top + 20} 330 330" role="img" aria-label="السريع">${at(emblemBox, emblem)}</svg>`));
// One colour for dark backgrounds.
writeFileSync('mono-a2.svg', opt(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="السريع للأرضيات والمفروشات">${body.replace(/fill="rgb\([^)]*\)"/g, 'fill="#FFFFFF"')}</svg>`));
for (const f of ['badge-a2', 'emblem-a2', 'mono-a2']) console.log(f, (readFileSync(`${f}.svg`).length / 1024).toFixed(1), 'KB');
