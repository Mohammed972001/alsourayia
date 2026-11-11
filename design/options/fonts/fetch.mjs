// Self-hosts the picker's Google Fonts (Arabic + basic Latin subsets only), so the page works offline and under
// the preview worker's font-src 'self'. Run once from this folder: node fetch.mjs
import { writeFile } from "node:fs/promises";
const families = "family=El+Messiri:wght@500;700&family=Reem+Kufi:wght@500;700&family=Lalezar&family=Readex+Pro:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;700";
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const css = await (await fetch(`https://fonts.googleapis.com/css2?${families}&display=swap`, { headers: { "User-Agent": ua } })).text();
const blocks = css.split("/* ").slice(1).map((b) => ({ subset: b.slice(0, b.indexOf(" */")), body: b.slice(b.indexOf("@font-face")) }));
let out = "/* Self-hosted by fetch.mjs from Google Fonts (OFL). */\n";
let n = 0;
for (const { subset, body } of blocks) {
  if (subset !== "arabic" && subset !== "latin") continue;
  const url = body.match(/url\((https:[^)]+)\)/)[1];
  const fam = body.match(/font-family: '([^']+)'/)[1].replace(/\s+/g, "");
  const w = body.match(/font-weight: (\d+)/)[1];
  const file = `${fam}-${w}-${subset}.woff2`;
  await writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  out += body.replace(url, file).trim() + "\n";
  n++;
}
await writeFile("fonts.css", out);
console.log(n, "files");
