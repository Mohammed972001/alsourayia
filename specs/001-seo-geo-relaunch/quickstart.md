# Quickstart: build, verify, track

```bash
npm run build
npx next start -p 3040
node scripts/crawl-check.mjs http://localhost:3040     # status, H1, canonical, JSON-LD, overflow 360/393
```

Deploy = push to `main` (GitHub Actions → Cloudflare Workers). Then:

```bash
gh run watch <id> --exit-status
node scripts/crawl-check.mjs https://www.mokeet-elsuarye.com
```

Live tag check: the CDP script pattern in the session scratchpad (`tag-check-live.mjs`), analytics hits blocked,
`?gclid=TEST123`.

Photos: `node scripts/photo-intake.mjs <zip> <product-id>` → WebP ≤1600 px, duplicate check against other client
repos, register update.

Tracking (weeks 2, 4, 8, 16): Search Console per cluster (`gsc.mjs`), Ads keyword landing-page ratings, CrUX,
the 20 prompts in `scripts/geo-prompts.md` logged to `docs/geo-tracking.md`.
