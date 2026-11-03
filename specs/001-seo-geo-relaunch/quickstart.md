# Quickstart: build, verify, track

```bash
npm run build
npx next start -p 3040
node scripts/crawl-check.mjs http://localhost:3040     # status, H1, canonical, JSON-LD
node scripts/phone-check.mjs http://localhost:3040     # sideways overflow at 360/393, visible WhatsApp link
```

Deploy = push to `main` (GitHub Actions → Cloudflare Workers). Then:

```bash
gh run watch <id> --exit-status
node scripts/crawl-check.mjs https://www.mokeet-elsuarye.com
node scripts/phone-check.mjs https://www.mokeet-elsuarye.com
```

Live tag check: `node scripts/tag-check.mjs` (from Git Bash: `MSYS_NO_PATHCONV=1` when passing page paths), analytics hits blocked,
`?gclid=TEST123`.

Photos: `node scripts/photo-intake.mjs <zip> <product-id>` → WebP ≤1600 px, duplicate check against other client
repos, register update.

Tracking (weeks 2, 4, 8, 16): Search Console per cluster (`gsc.mjs`), Ads keyword landing-page ratings, CrUX,
the 20 prompts in `scripts/geo-prompts.md` logged to `docs/geo-tracking.md`.
