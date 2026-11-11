// Serves the static export in out/ for local review (like Workers static assets: /path -> /path.html).
//
//   node scripts/serve.mjs [port]

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(fileURLToPath(import.meta.url), "../../out");
const port = Number(process.env.PORT ?? process.argv[2] ?? 3061);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".json": "application/json",
};

// Same mapping as src/worker.ts: the client asks for __next.<a>.<b>.__PAGE__.txt, the export writes __next.<a>/<b>/__PAGE__.txt.
const SEGMENT_PREFETCH = /\/__next\.([^/]+)\.__PAGE__\.txt$/;

createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const segment = SEGMENT_PREFETCH.exec(pathname);
  if (segment) pathname = pathname.slice(0, segment.index) + `/__next.${segment[1].replaceAll(".", "/")}/__PAGE__.txt`;
  const path = normalize(pathname).replace(/^([\\/])+/, "");
  const candidates = [path, `${path}.html`, join(path, "index.html")].map((p) => join(out, p));
  const file = candidates.find((f) => f.startsWith(out) && existsSync(f) && statSync(f).isFile());
  if (!file) {
    res.writeHead(404, { "Content-Type": types[".html"] });
    createReadStream(join(out, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Serving out/ on http://127.0.0.1:${port}`));
