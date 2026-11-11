// Draws the flat material illustrations used where the shop has no photo yet (home carpet, artificial
// grass, foam tiles, medical vinyl). They are labelled «رسم توضيحي» on the site and never pass for photos.
//
//   node scripts/art.mjs   ->  media-src/art/art-*.png

import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "media-src/art");
mkdirSync(out, { recursive: true });
const W = 1600;
const H = 1200;

// Deterministic pseudo-random numbers, so the art does not change between runs.
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const svg = (body, bg) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`);

// Home carpet: soft rows of tufts in warm beige, with a light falling across them.
function carpet() {
  let s = "<defs><radialGradient id='l' cx='0.3' cy='0.2' r='0.9'><stop offset='0' stop-color='#fff' stop-opacity='0.35'/><stop offset='1' stop-color='#000' stop-opacity='0.12'/></radialGradient></defs>";
  for (let y = 0; y < H; y += 9) for (let x = (y / 9) % 2 ? 0 : 5; x < W; x += 10) {
    const t = 200 + Math.floor(rnd() * 26);
    s += `<circle cx="${x}" cy="${y}" r="${5 + rnd() * 2}" fill="rgb(${t},${t - 18},${t - 44})"/>`;
  }
  return svg(s + `<rect width="${W}" height="${H}" fill="url(#l)"/>`, "#CBB797");
}

// Artificial grass: dense blades in several greens, darker at the root.
function grass() {
  let s = "";
  for (let i = 0; i < 9000; i++) {
    const x = rnd() * W, y = rnd() * (H + 80), h = 40 + rnd() * 70, lean = (rnd() - 0.5) * 30;
    const g = [["#3F7F2E"], ["#5C9B3A"], ["#76B044"], ["#2F6B27"], ["#8BC24F"]][Math.floor(rnd() * 5)][0];
    s += `<path d="M${x} ${y} q${lean / 2} ${-h / 2} ${lean} ${-h}" stroke="${g}" stroke-width="${2 + rnd() * 2.5}" stroke-linecap="round" fill="none"/>`;
  }
  return svg(s, "#2C5A22");
}

// Foam puzzle tiles: interlocking squares in soft colours, seen from above.
function foam() {
  const colours = ["#5BA4D9", "#F2C14E", "#E57A6B", "#7CC48A", "#9C8AD6", "#F2994A"];
  const size = 200;
  let s = "";
  for (let r = -1; r < H / size + 1; r++) for (let c = -1; c < W / size + 1; c++) {
    const x = c * size, y = r * size, k = 26;
    const col = colours[(r * 7 + c * 3 + 60) % colours.length];
    // Square with two tabs out (right, bottom) and two sockets in (left, top).
    const d = `M${x} ${y} h${size / 2 - k} l${k / 2} ${k} h${k} l${k / 2} ${-k} h${size / 2 - k} v${size / 2 - k} l${k} ${k / 2} v${k} l${-k} ${k / 2} v${size / 2 - k} h${-(size / 2 - k)} l${-k / 2} ${k} h${-k} l${-k / 2} ${-k} h${-(size / 2 - k)} v${-(size / 2 - k)} l${k} ${-k / 2} v${-k} l${-k} ${-k / 2} z`;
    s += `<path d="${d}" fill="${col}" stroke="#ffffff" stroke-opacity="0.55" stroke-width="3"/>`;
    for (let i = 0; i < 60; i++) s += `<circle cx="${x + rnd() * size}" cy="${y + rnd() * size}" r="1.6" fill="#000" opacity="0.07"/>`;
  }
  return svg(s, "#EEE");
}

// Medical vinyl: a light speckled sheet with one welded seam.
function medical() {
  let s = "";
  const chips = ["#B9C7D1", "#DDE4E8", "#9FB2C0", "#F4F6F7", "#C8D3CF"];
  for (let i = 0; i < 6500; i++) {
    const x = rnd() * W, y = rnd() * H, r = 2 + rnd() * 9;
    s += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * (0.4 + rnd() * 0.6)}" transform="rotate(${rnd() * 180} ${x} ${y})" fill="${chips[Math.floor(rnd() * chips.length)]}"/>`;
  }
  s += `<rect x="${W * 0.62}" y="0" width="3" height="${H}" fill="#8EA3B1" opacity="0.6"/>`;
  return svg(s, "#E9EEF1");
}

for (const [name, draw] of [["art-carpet", carpet], ["art-grass", grass], ["art-foam", foam], ["art-medical", medical]]) {
  await sharp(draw()).png().toFile(join(out, `${name}.png`));
  console.log(name);
}
