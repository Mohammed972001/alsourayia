// Copies the picker into out/options/ (paths to ../../public/ become site-root paths) so it ships with the
// preview worker. Run from the repo root after `node design/options/build.mjs`, then:
//   npx wrangler deploy -c wrangler.preview.jsonc
// The next `npm run build` empties out/, so the picker never reaches the live site.
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const from = "design/options";
const to = "out/options";
await rm(to, { recursive: true, force: true });
await mkdir(to, { recursive: true });
for (const dir of ["ai", "fonts"]) await cp(`${from}/${dir}`, `${to}/${dir}`, { recursive: true, filter: (p) => !p.endsWith(".mjs") });
for (const file of ["index.html", "picker.css", "picker.js", "demos.css", "demos.js"]) {
  const text = await readFile(`${from}/${file}`, "utf8");
  await writeFile(`${to}/${file}`, text.replaceAll("../../public/", "/"));
}
console.log("picker copied to", to);
