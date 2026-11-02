#!/usr/bin/env node
// Crawl check (spec 001 T003, contracts/page-contract.md). Usage:
//   node scripts/crawl-check.mjs http://localhost:3107
//   node scripts/crawl-check.mjs                          (live site)
// For every sitemap URL: status 200, exactly one H1, a self canonical, JSON-LD that parses and a
// title of at most 60 characters. Exits 1 on any failure. Long titles only warn: several were
// locked at that length on purpose (docs/seo-2026-10-27.md).
// Sideways overflow at 360/393 px needs a real browser and is not checked here.
const SITE = 'https://www.mokeet-elsuarye.com';
const base = (process.argv[2] || SITE).replace(/\/$/, '');

const sitemap = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) {
    console.error('crawl-check: no URLs in the sitemap');
    process.exit(1);
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
let failures = 0;

for (const url of urls) {
    const path = url.replace(SITE, '') || '/';
    const errors = [];
    const warnings = [];
    const res = await fetch(`${base}${path}`, { redirect: 'manual' });
    if (res.status !== 200) errors.push(`status ${res.status}`);
    const html = await res.text();

    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
    if (h1s !== 1) errors.push(`${h1s} H1`);

    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
    if (decode(canonical ?? '').replace(/\/$/, '') !== url.replace(/\/$/, '')) errors.push(`canonical ${canonical ?? 'missing'}`);

    const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '');
    if (!title) errors.push('no title');
    else if (title.length > 60) warnings.push(`title ${title.length} chars`);

    const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
    if (blocks.length === 0) errors.push('no JSON-LD');
    for (const [, json] of blocks) {
        try {
            JSON.parse(json);
        } catch {
            errors.push('JSON-LD does not parse');
        }
    }

    if (errors.length) failures++;
    const notes = [...errors, ...warnings.map((w) => `warning: ${w}`)].join('; ');
    console.log(`${errors.length ? 'FAIL' : 'ok  '} ${path}${notes ? `  ${notes}` : ''}`);
}

console.log(`crawl-check: ${urls.length} URLs, ${failures} failed`);
process.exit(failures ? 1 : 0);
