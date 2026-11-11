// Checks the static export in out/ (constitution I, II, VII). Run after `npm run build`.
//
//   node scripts/site-check.mjs
//
// Every page: one <h1>, a canonical, a title and description, JSON-LD that parses, no emoji,
// internal links that resolve. With SITE_LIVE=1 it also fails on missing owner facts and on any
// temporary photo (media-src/tmp) still in use.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const out = join(root, "out");
const live = process.env.SITE_LIVE === "1";
const errors = [];
const warnings = [];

if (!existsSync(out)) {
  console.error("out/ is missing: run `npm run build` first.");
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_next" || name === "media") continue;
      walk(full);
    } else if (name.endsWith(".html")) pages.push(full);
  }
})(out);

const exists = (path) => {
  const clean = decodeURIComponent(path.split(/[?#]/)[0]);
  if (clean === "/" || clean === "") return true;
  return [clean, `${clean}.html`, join(clean, "index.html")].some((p) => existsSync(join(out, p)));
};

const media = JSON.parse(readFileSync(join(root, "src/content/media.json"), "utf8"));
const tempNames = new Set(Object.entries(media).filter(([, m]) => m.temp).map(([n]) => n));
const usedTemp = new Set();
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;

for (const file of pages) {
  const rel = "/" + relative(out, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const is404 = rel.includes("404") || rel.includes("_not-found");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${rel}: ${h1} <h1> elements (want 1)`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${rel}: missing or short <title>`);
  if (!is404) {
    if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) errors.push(`${rel}: missing absolute canonical`);
    if (!/<meta name="description" content="[^"]{50,}"/.test(html)) errors.push(`${rel}: missing or short description`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (ld.length !== 1) errors.push(`${rel}: ${ld.length} JSON-LD blocks (want 1)`);
    for (const [, json] of ld) {
      try {
        JSON.parse(json);
      } catch {
        errors.push(`${rel}: JSON-LD does not parse`);
      }
    }
  }
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  if (emoji.test(text)) errors.push(`${rel}: contains emoji`);
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith("/_next/") || href.startsWith("/media/")) continue;
    if (!exists(href)) errors.push(`${rel}: broken internal link ${href}`);
  }
  for (const [, name] of html.matchAll(/\/media\/([a-z0-9-]+?)-\d+\.webp/g)) if (tempNames.has(name)) usedTemp.add(name);
  if (!live && !/<meta name="robots" content="noindex/.test(html) && !is404) errors.push(`${rel}: preview build must be noindex`);
}

const site = readFileSync(join(root, "src/content/site.ts"), "utf8");
const missing = ["phone", "whatsapp", "address", "mapUrl", "hours"].filter((k) => new RegExp(`\\b${k}: null`).test(site));
const facts = `owner facts still null: ${missing.join(", ") || "none"}`;
const photos = `temporary photos in use: ${usedTemp.size}`;
if (live) {
  if (missing.length) errors.push(facts);
  if (usedTemp.size) errors.push(`${photos} (${[...usedTemp].join(", ")})`);
} else {
  if (missing.length) warnings.push(facts);
  if (usedTemp.size) warnings.push(`${photos} — replace before launch`);
}

console.log(`Checked ${pages.length} pages (${live ? "LIVE" : "preview"}).`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  FAIL  ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log("All checks pass.");
