// Turns the AI drafts (PNG from Figma's image generator, 2026-11-12) into the WebP files the picker uses.
// Product shots keep their flat cream studio backdrop: the picker lays them on a slightly darker sand
// with mix-blend-mode: darken, so the backdrop vanishes and the soft contact shadows stay.
// Run from the repo root: node design/options/ai-src/prepare.mjs
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

sharp.cache(false);
const src = "design/options/ai-src";
const out = "design/options/ai";
await mkdir(out, { recursive: true });

const files = [
  ["tex-mosque", 900], ["tex-parquet", 900], ["tex-rubber", 900], ["tex-vinyl", 900], ["tex-office", 900],
  ["room", 1600], ["float-dark", 1600], ["slab", 1200],
  ["cut-carpet", 760], ["cut-planks", 760], ["cut-rubber", 760], ["cut-vinyl", 760],
];
// Light map of the empty room: grey 128 where the concrete floor is average, brighter in the sun patch and
// reflections, darker in the corners. Laid over the swapped floor textures with mix-blend-mode: soft-light.
{
  const room = sharp(`${src}/room.png`).resize({ width: 1600 }).greyscale();
  const { data, info } = await room.raw().toBuffer({ resolveWithObject: true });
  let sum = 0; let n = 0;
  for (let y = Math.round(info.height * 0.78); y < info.height; y++) for (let x = Math.round(info.width * 0.2); x < info.width * 0.8; x++) { sum += data[y * info.width + x]; n++; }
  const avg = sum / n;
  for (let i = 0; i < data.length; i++) data[i] = Math.max(0, Math.min(255, Math.round(128 + (data[i] - avg) * 1.6)));
  await sharp(data, { raw: info }).webp({ quality: 70 }).toFile(`${out}/room-light.webp`);
}

for (const [name, width] of files) {
  await sharp(`${src}/${name}.png`).resize({ width }).webp({ quality: 80 }).toFile(`${out}/${name}.webp`);
  const { data, info } = await sharp(`${src}/${name}.png`).raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => [...data.subarray((y * info.width + x) * info.channels, (y * info.width + x) * info.channels + 3)];
  console.log(name, [at(4, 4), at(info.width - 5, 4), at(4, info.height - 5), at(info.width - 5, info.height - 5)].map((c) => c.join(",")).join(" | "));
}
