// Turns the photos in media-src/ into WebP widths in public/media/ and writes the manifest
// src/content/media.json (name -> width, height, widths, temp). Photos are cropped and resized only.
//
//   node scripts/media.mjs
//
// media-src/owner/    the owner's photos (committed, ship on the live site)
// media-src/catalog/  pictures cut from the suppliers' catalogues the owner published (labelled on the site)
// media-src/art/      flat material illustrations from scripts/art.mjs (labelled «رسم توضيحي»)
// media-src/tmp/      temporary preview photos from other projects (git-ignored, blocked when live)

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// 160 serves the round thumbnails in the header's category row.
const WIDTHS = [160, 480, 828, 1200, 1920];
const out = join(root, "public/media");
mkdirSync(out, { recursive: true });

const manifest = {};
for (const [folder, temp] of [["owner", false], ["catalog", false], ["art", false], ["tmp", true]]) {
  const dir = join(root, "media-src", folder);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
    const name = file.slice(0, -extname(file).length);
    const source = sharp(join(dir, file)).rotate();
    const { width, height } = await source.metadata();
    const widths = WIDTHS.filter((w) => w < width);
    const top = Math.min(width, 1920);
    if (!widths.includes(top) && (widths.length === 0 || top - widths.at(-1) > 120)) widths.push(top);
    for (const w of widths) {
      const target = join(out, `${name}-${w}.webp`);
      if (!existsSync(target)) {
        await sharp(join(dir, file)).rotate().resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(target);
      }
    }
    const h = Math.round((height * Math.min(width, 1920)) / width);
    manifest[name] = { width: Math.min(width, 1920), height: h, widths, temp, source: folder };
  }
}

writeFileSync(join(root, "src/content/media.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`${Object.keys(manifest).length} photos -> public/media (${Object.values(manifest).filter((m) => m.temp).length} temporary)`);
