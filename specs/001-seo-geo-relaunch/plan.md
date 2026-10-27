# Implementation Plan: SEO + GEO relaunch of mokeet-elsuarye.com

**Branch**: `001-seo-geo-relaunch` | **Date**: 2026-10-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-seo-geo-relaunch/spec.md`

## Summary

Relaunch the carpet site in four phases, in the order the owner asked: **A** brand and visual assets (vector logo,
one professional SVG icon family, photo-led cards in the manner of hamasat-beity and funun-aladiyat, owner photos
first), **B** technical SEO (redirects for every old URL Google still reports, metadata, sitemap, structured data,
field Core Web Vitals), **C** content architecture (one page per keyword cluster, Q&A content, a projects section
from real installations, a small guides section), **D** local + GEO (one facts record feeding pages, schema and
listings, `llms.txt`, AI-crawler access, Google Business Profile, Saudi directories, monthly tracking of Search
Console, AI-assistant mentions and Ads landing-page ratings). The method is the sister site's 001-seo-rescue
(47 clicks/28 d after its rescue vs 8 clicks/90 d here).

## Technical Context

**Language/Version**: TypeScript 5, Next.js 16.4 App Router, React 19
**Primary Dependencies**: Tailwind CSS v4 (CSS-first `@theme`), `next/font` (Cairo, Reem Kufi), `next/image`,
OpenNext for Cloudflare Workers; icon source per research R2 (Hugeicons free set + custom glyphs); `sharp` for
photos; SVGO for SVG
**Storage**: files in the repo (`data/*.ts`, `public/*`); no database
**Testing**: build + type-check; local `next start` crawl script (status, H1, canonical, JSON-LD, overflow);
headless-Chrome tag check; Lighthouse lab runs; Search Console + CrUX for field data
**Target Platform**: Cloudflare Workers via GitHub Actions on push to `main`
**Project Type**: web application (single Next.js project)
**Performance Goals**: mobile p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on every landing page
**Constraints**: owner-confirmed facts only; RTL; no sideways overflow; titles locked 21 days after a change; Ads
tracking must not break; Workers asset limits
**Scale/Scope**: ~22 URLs today → ~40 after projects and guides; 14 products, 2 hubs; ~30 icons

## Constitution Check

| Principle | Gate for this plan | Status |
|---|---|---|
| I. No fact without the owner | Projects, guides, FAQs and listings use only confirmed facts; project entries need owner-confirmed place type and date | PASS |
| II. Real and own assets | Logo redraw is approval-gated; photos duplicate-checked; stock stays labelled | PASS |
| III. SEO on the server | All new sections are server components; FAQ via `<details>` | PASS |
| IV. Performance | SVG icons inline (no icon font, no extra requests); photo-led cards lazy below the fold | PASS |
| V. Arabic/RTL/a11y | Decorative icons `aria-hidden`; icon-only buttons get Arabic labels | PASS |
| VI. Tracking | Every phase ends with the live tag check | PASS |
| VII. Verify output | Every phase ends with crawl + live check | PASS |

Post-design re-check: PASS — no violation needs justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-seo-geo-relaunch/
├── spec.md
├── plan.md              # this file
├── research.md          # decisions R1–R9
├── data-model.md        # entities and validation rules
├── quickstart.md        # how to run, verify and track
├── contracts/
│   ├── icon-set.md      # icon names, grid, stroke, usage rules
│   ├── business-facts.md# the single facts record and where it is used
│   └── page-contract.md # what every landing page must contain
├── checklists/requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
app/                     # products/[id], products/category/[slug], projects/ (new), guides/ (new),
                         # llms.txt/route.ts (new), sitemap.ts, robots.ts, layout.tsx
components/
├── icons/               # NEW: one SVG icon family (Icon.tsx + glyph map)
├── brand/               # NEW: Logo.tsx (vector badge, emblem, mono)
├── cards/               # NEW: SectorCard, OfferCard, StepCard, ProjectCard, ContactRow
├── product/ProductCard.tsx (exists)
├── projects/            # NEW: ProjectGallery (native <dialog>), ProjectFacts
└── existing sections
data/
├── business.ts          # NEW: single facts record (lib/contact.ts re-exports)
├── projects.ts          # NEW
├── guides.ts            # NEW
├── photo-register.ts    # NEW
└── products.ts, offers.ts
design/brand/            # NEW: logo masters (SVG) + export script
public/brand/            # generated: logo.svg, emblem.svg, mono.svg, favicons
scripts/
├── crawl-check.mjs      # NEW
├── photo-intake.mjs     # NEW
└── geo-prompts.md       # NEW: the 20 tracked prompts
docs/seo-2026-10-27.md (exists), docs/seo-clusters.md, docs/geo-tracking.md (new)
```

**Structure Decision**: keep the single Next.js app and add the folders above. No new runtime dependency except the
icon source chosen in R2.

## Phase plan and order

| Phase | Ships | Owner gate | Measured by |
|---|---|---|---|
| A1 | Vector logo (badge, emblem, mono) as SVG, favicons generated from it | approve the redraw | side-by-side image |
| A2 | Icon family + replacement of all 34 icon uses | approve one icon board | 0 lucide imports left |
| A3 | New cards (sector, offer, step, contact, project), photo-led | approve mockup images | phone/desktop screenshots |
| A4 | Photo intake pipeline + register; owner photos lead | photos for 6 products | register count |
| B | Redirects, metadata audit, sitemap, schema graph, CWV fixes | — | crawl script, Search Console |
| C | Cluster pages tightened, projects section, 4–6 guides | confirm project facts | GSC per cluster |
| D | Facts record, llms.txt, AI-crawler robots, GBP text, directories, tracking | GBP + directory logins | monthly report |

Rollout: A1+A2 in one deploy, A3 next, B in parallel with A3, C after A4 has photos, D after B. Every deploy:
build → local crawl → push → watch Actions → live crawl + tag check.

## Complexity Tracking

None — no principle is violated.
