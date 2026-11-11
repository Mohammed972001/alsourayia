# موكيت ومفروشات السريع — Constitution

> Highest reference for www.mokeet-elsuarye.com. Any spec, plan, task or line of code that breaks a principle here
> is rejected and redone. Lessons behind each rule: `C:\Users\mohammed\.claude\scripts\SITE-LESSONS.md`.

## Core Principles

### I. No fact without the owner (NON-NEGOTIABLE)
Every business fact a visitor or a search engine sees (phones, address, hours, services, promises, prices, ratings,
years, client counts, cities served) comes from the owner in writing and lives in one data file. Confirmed today:
free inspection and measurement, free sample before ordering, supply and installation, delivery to every city of
the Kingdom, hours every day 9:00–22:00, and starting prices per square metre (2026-11-03 and 2026-11-11: mosque
carpet 40, office carpet 45, home carpet 15, wood parquet 65, SPC 75, parquet-look vinyl 19, medical vinyl 60, gym
rubber 65, bathroom rubber 90, artificial grass 10). Products sold (user, 2026-11-11): those lines plus foam and
puzzle floors. Not sold: mosque vinyl, horse rubber. No discount, percentage, warranty, rating or «الأفضل/الأرخص»
without written confirmation. Facts live in `src/content/site.ts`; an unknown fact stays `null`.
**Why:** the Google Ads account was suspended once (Oct 2026) partly for identity and claim problems.

### II. Real and own visual assets
The owner's photos first. Where a product has none yet: pictures cut from the suppliers' catalogues the owner
published (labelled «صور من كتالوج المورّد»), or flat drawn illustrations (labelled «رسم توضيحي»). Never stock
photos, never another client's photo, never a watermarked photo, never a person (no women at all; anyone not
clearly identifiable is left out too). Every new photo is checked for byte-identical copies in the other
client repos before it ships. The owner's logo is never replaced without his explicit approval.

### III. SEO is rendered on the server
Indexable content is in the server HTML; one `<h1>` per page; real `<a href>` links; per-route title, description
and self canonical; JSON-LD only for visible content (one graph per page); sitemap with real content dates; retired URLs 301 to live
ones in `src/worker.ts`; live slugs never change.
Title changes are logged and locked for 21 days.

### IV. Performance budget
Mobile p75: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Static export (ADR-0001): photos are pre-sized WebP widths from
`scripts/media.mjs` rendered by `src/components/Photo.tsx`; only the LCP image is eager; fonts via `next/font`;
client components are the exception (menus, tabs, gallery, calculator, motion). The only third-party scripts are
the Google tag and the TikTok pixel, on the live build only. Motion respects `prefers-reduced-motion` and never
widens the page sideways.

### V. Arabic first, RTL native, accessible
`lang="ar" dir="rtl"`, logical properties, Arabic alt text for meaningful images, AA contrast measured by
`npm run tokens` (fails below target), visible focus, touch targets ≥ 44 px.

### VI. Tracking never breaks
WhatsApp and call taps fire `contact_click` + the Ads conversion through the delegated tracker; the ad-source
marker and the second-number pages (parquet, rubber, medical) keep working. Re-verified on the live site after
every deploy that touches pages.

### VII. Verify the real output
Done means: build passes, the built pages were crawled locally (200, one H1, canonical, valid JSON-LD, no sideways
overflow at 360/393 px), then checked live after the GitHub Actions deploy to Cloudflare. Never `vercel deploy` from
the Khali repo for this site. Previews deploy to the separate worker in `wrangler.preview.jsonc`, never to the
live domain. Previews deploy to the separate worker in `wrangler.preview.jsonc`, never to the
live domain.

## Brand and design system
Since 2026-11-11 (spec 002, ADR-0002): the same design-system method as the sister build «مفروشات العمودي», with
this shop's own identity taken from its badge — deep teal `#214953` for ink and dark sections, burnt copper for
actions and accents, bronze rules, cream marble grounds. Display type El Messiri, text IBM Plex Sans Arabic. Source
of truth `design-system/build-tokens.mjs`; components use semantic variables only. Logo: the owner's «السريع» badge;
the horizontal lockup is cut from it, never redrawn.

## Workflow
Spec → plan → tasks in `specs/`. Owner approval gates: logo redraw, card mockups, any new promise or price. Code,
commits and docs in English; owner-facing reports in Egyptian Arabic. Commits end with
`Assisted-by: Claude (Anthropic) — review, planning & commit message (not code authorship)`.

## Governance
This constitution overrides other guidance for this repo. Amendments are dated and need the owner's agreement when
they touch facts, brand or budget.

**Version**: 2.0.0 | **Ratified**: 2026-10-27 | **Last Amended**: 2026-11-11 (redesign, spec 002)
