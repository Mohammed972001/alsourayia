// Joins parts/*.html into index.html, parts/*.css into demos.css and parts/*.js into demos.js (in file-name
// order), so each group of options can be written on its own. Run: node design/options/build.mjs
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
process.chdir(fileURLToPath(new URL(".", import.meta.url)));
const files = (await readdir("parts")).sort();
const join = async (ext) => (await Promise.all(files.filter((f) => f.endsWith(ext)).map(async (f) => `/* ---- ${f} ---- */\n${await readFile(`parts/${f}`, "utf8")}`))).join("\n");
const html = (await Promise.all(files.filter((f) => f.endsWith(".html")).map((f) => readFile(`parts/${f}`, "utf8")))).join("\n");
await writeFile("index.html", html);
await writeFile("demos.css", await join(".css"));
await writeFile("demos.js", await join(".js"));
console.log("built from", files.length, "parts");
