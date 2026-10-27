# موكيت ومفروشات السريع — Constitution

> Highest reference for www.mokeet-elsuarye.com. Any spec, plan, task or line of code that breaks a principle here
> is rejected and redone. Lessons behind each rule: `C:\Users\mohammed\.claude\scripts\SITE-LESSONS.md`.

## Core Principles

### I. No fact without the owner (NON-NEGOTIABLE)
Every business fact a visitor or a search engine sees (phones, address, hours, services, promises, prices, ratings,
years, client counts, cities served) comes from the owner in writing and lives in one data file. Confirmed today:
free inspection and measurement, free sample before ordering, supply and installation, delivery to every city of
the Kingdom, hours every day 9:00–22:00. No price, discount, percentage, warranty, rating or «الأفضل/الأرخص»
without written confirmation. Missing facts are marked `TODO(owner)` and block launch.
**Why:** the Google Ads account was suspended once (Oct 2026) partly for identity and claim problems.

### II. Real and own visual assets
Only the owner's photos or licensed stock clearly labelled «صورة توضيحية». Never another client's photo, never a
watermarked photo, never a recognisable face. Every new photo is checked for byte-identical copies in the other
client repos before it ships. The owner's logo is never replaced without his explicit approval.

### III. SEO is rendered on the server
Indexable content is in the server HTML; one `<h1>` per page; real `<a href>` links; per-route title, description
and self canonical; JSON-LD only for visible content; sitemap with real content dates; old URLs 308 to live ones.
Title changes are logged and locked for 21 days.

### IV. Performance budget
Mobile p75: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Images through `next/image` with correct `sizes`; only the LCP
image gets priority; fonts via `next/font` with `display: optional`; client components are the exception and are
justified; no new third-party script without a written reason. Motion is CSS only (opacity, translate, scale,
clip-path), behind `html.js` and `prefers-reduced-motion: no-preference`, and never widens the page sideways.

### V. Arabic first, RTL native, accessible
`lang="ar" dir="rtl"`, logical properties, Arabic alt text for meaningful images, AA contrast (mint-deep #3B7B56
is the lightest green allowed for text), visible focus, touch targets ≥ 44 px.

### VI. Tracking never breaks
WhatsApp and call taps fire `contact_click` + the Ads conversion through the delegated tracker; the ad-source
marker and the second-number pages (parquet, rubber, medical) keep working. Re-verified on the live site after
every deploy that touches pages.

### VII. Verify the real output
Done means: build passes, the built pages were crawled locally (200, one H1, canonical, valid JSON-LD, no sideways
overflow at 360/393 px), then checked live after the GitHub Actions deploy to Cloudflare. Never `vercel deploy` from
the Khali repo for this site.

## Brand and design system
Palette: ink #141414, brass #B8924F (rules and accents), mint #86C79C / mint-deep #3B7B56 / mint-soft #F0F8F2 /
mint-line #DCF0E2 (owner-approved 2026-10-27). Type: Cairo (body), Reem Kufi (headings). One icon family for the
whole site. Logo: the «السريع» badge and its S emblem.

## Workflow
Spec → plan → tasks in `specs/`. Owner approval gates: logo redraw, card mockups, any new promise or price. Code,
commits and docs in English; owner-facing reports in Egyptian Arabic. Commits end with
`Assisted-by: Claude (Anthropic) — review, planning & commit message (not code authorship)`.

## Governance
This constitution overrides other guidance for this repo. Amendments are dated and need the owner's agreement when
they touch facts, brand or budget.

**Version**: 1.0.0 | **Ratified**: 2026-10-27 | **Last Amended**: 2026-10-27
