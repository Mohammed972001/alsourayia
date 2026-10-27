---
description: "Task list for the SEO + GEO relaunch of mokeet-elsuarye.com"
---

# Tasks: SEO + GEO relaunch of mokeet-elsuarye.com

**Input**: `specs/001-seo-geo-relaunch/` (spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md)
**Tests**: no unit-test suite (constitution VII: verification = build + crawl script + live checks). Verification
tasks are listed explicitly.
**Order the owner asked for**: brand, icons, cards and photos first (US1), then SEO (US2), GEO (US3), owner
self-service (US4).

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

- [ ] T001 Record baselines in `docs/baseline-2026-10-27.md`: GSC 90 d by query and page (8 clicks / ~530 impressions), Ads landing-page rating per keyword (from `C:/Users/mohammed/.claude/scripts/ads/ads.mjs`, account 9768232646, `ad_group_criterion.quality_info.post_click_quality_score`), Lighthouse mobile per landing page, CrUX origin data
- [ ] T002 [P] Write the 20 tracked AI prompts (Arabic, Riyadh flooring intents: ربل جيم، موكيت مساجد، باركيه الرياض، فينيل طبي، brand) in `scripts/geo-prompts.md` and record the baseline answers in `docs/geo-tracking.md`
- [ ] T003 [P] Create `scripts/crawl-check.mjs`: for every sitemap URL (or a base URL) report status, H1 count, self canonical, JSON-LD parse, title length, and sideways overflow at 360/393 px via CDP (port the scratchpad `overflow3.mjs` logic)
- [ ] T004 [P] Create `scripts/photo-intake.mjs <zip|folder> <product-id|project-slug>`: extract into a new empty folder, WebP ≤1600 px q78 via sharp, md5 duplicate check against every image under `D:/work/*/public` (port `D:/tmp-el/newphotos/dup.cjs`), write a contact sheet for review, update `data/photo-register.ts`

---

## Phase 2: Foundational (blocks all stories)

- [ ] T005 Create `data/business.ts` per `contracts/business-facts.md` and make `lib/contact.ts` re-export from it; replace hard-coded phones/hours/address/legal line in `components/*`, `app/*`, `lib/chat/knowledge.ts`
- [ ] T006 Add a build check `scripts/facts-guard.mjs` (run in `npm run build` via `prebuild`) that fails if `0550101867`, `0559686290`, the legal name or the hours string appear outside `data/business.ts`
- [ ] T007 [P] Create `data/photo-register.ts` from the current folders: owner vs stock count per product (8 products stock-only today: parket, water-resistant-carpet, hospital-flooring, mokite, turky-mshager, artificial-grass, office-flooring, vinyl-mosque)

**Checkpoint**: one facts record, guard in place, crawl and photo scripts ready.

---

## Phase 3: User Story 1 — A visitor from an ad trusts the shop at first glance (P1) 🎯 MVP

**Goal**: vector logo, one SVG icon family, photo-led professional cards, owner photos first.
**Independent Test**: on 390 px and desktop, home + parquet hub + rubber hub + medical + brand pages show the vector
logo sharp at 1x/2x/3x, 0 lucide imports remain, every card follows the card rules, owner photos lead.

### A1 — Vector logo (owner gate)

- [ ] T008 [US1] Trace the «السريع» badge from `public/logo.png` into `design/brand/badge.svg` (S emblem with parquet inlay as flat brass/brown fills, wordmark as outlines, round marble frame simplified to a flat cream disc), plus `design/brand/emblem.svg` (S only, square) and `design/brand/mono.svg` (one colour, for dark backgrounds); optimise with SVGO
- [ ] T009 [US1] Render a side-by-side board (old raster vs new SVG at 32/64/256 px, on white and on ink) to `design/brand/compare.png` and send it to the owner — **stop until he approves**
- [ ] T010 [US1] After approval: `components/brand/Logo.tsx` (variants badge | emblem | mono, inline SVG, `aria-label`), use it in `components/Navigation.tsx` and `components/Footer.tsx`; regenerate `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-512.png`, `public/logo.png` and `public/brand/*.svg` from the masters with `design/brand/export.mjs`

### A2 — Icon family

- [ ] T011 [P] [US1] Add the icon source per research R2 (Hugeicons free set) and create `components/icons/Icon.tsx` with a typed name map per `contracts/icon-set.md` (24 grid, 1.5 stroke, currentColor, aria-hidden by default, RTL mirroring for arrows only)
- [ ] T012 [P] [US1] Draw the custom glyphs in the same grid in `components/icons/custom.tsx`: mosque, carpet-roll, carpet-tile, parquet, rubber-roll, gym, tape-measure, swatch
- [ ] T013 [US1] Render an icon board (all names, 24 and 32 px, ink and mint-deep) to `design/icons/board.png` and send it to the owner — **stop until he approves**
- [ ] T014 [US1] Replace every `lucide-react` import (34 files: Navigation, Hero, Spaces, Offers, HowWeWork, Contact, Footer, ProductDetail, product/*, SEOContent, ServiceAreas, FloatingButtons, ChatLauncher, ChatWidget, app/products/category/[slug]/page.tsx, app/contact/page.tsx …) with `<Icon>`; remove `lucide-react` from `package.json` and `next.config.ts` `optimizePackageImports`
- [ ] T015 [US1] Add `scripts/icon-inventory.mjs` that fails when any non-`Icon` SVG glyph library import is found; run it

### A3 — Cards (owner gate)

- [ ] T016 [US1] Build mockups in the manner of hamasat-beity (`D:/work/hamasat-beity/src/components/home/*`) and funun-aladiyat (`D:/work/funun-aladiyat/src/components/home/Mosques.tsx`, `Gym.tsx`, `Spaces.tsx`): photo-led sector cards with scrim and mint chip, offer cards with a layered icon frame, step cards with a drawn connector, contact rows, project card; render phone + desktop images to `design/cards/` with the D:/tmp-el/mock pattern and send to the owner — **stop until he approves**
- [ ] T017 [P] [US1] `components/cards/SectorCard.tsx` and use it in `components/Spaces.tsx` (owner photo per sector: mosque from `public/msaged`, gym from `public/Rabal-GEM`, office from `public/mokeet makteb`; hospital and home keep icon-led until owner photos arrive)
- [ ] T018 [P] [US1] `components/cards/OfferCard.tsx` and use it in `components/Offers.tsx`
- [ ] T019 [P] [US1] `components/cards/StepCard.tsx` and use it in `components/HowWeWork.tsx`
- [ ] T020 [P] [US1] `components/cards/ContactRow.tsx` and use it in `components/Contact.tsx`, `app/contact/page.tsx`, the hub first screen in `app/products/category/[slug]/page.tsx`
- [ ] T021 [US1] Align `components/product/ProductCard.tsx` with the approved card rules (radius 14, 1 px line, hover lift on pointer devices only, badge, owner photo first)

### A4 — Real photos

- [ ] T022 [US1] Ask the owner (WhatsApp list generated from `data/photo-register.ts`) for photos of: parquet installed, water-resistant parquet, medical vinyl in a clinic/hospital, home carpet in a majlis, Turkish carpet, artificial grass, office vinyl, mosque vinyl
- [ ] T023 [US1] For each set received: run `scripts/photo-intake.mjs`, review the contact sheet (no faces, no other shop's signs, no supplier watermarks), prepend the chosen files to the product's `images` in `data/products.ts`, keep stock labelled until replaced
- [ ] T024 [US1] Verify US1: `npm run build`, `node scripts/crawl-check.mjs http://localhost:3040`, phone/desktop screenshots of the five landing pages, push, watch Actions, live crawl + live tag check (WhatsApp/call conversion, second number on parquet/rubber/medical)

**Checkpoint**: MVP — the site looks like a real showroom; Ads landing-page rating starts to move.

---

## Phase 4: User Story 2 — Google ranks the site for Riyadh searches (P1)

**Goal**: every old URL redirected, one target page per cluster, complete metadata and schema, good field CWV.
**Independent Test**: crawl-check passes on all URLs; GSC shows impressions per cluster page at weeks 2/4/8.

- [ ] T025 [US2] Pull every page URL with impressions in 16 months and every crawl 404 from GSC (`C:/Users/mohammed/.claude/scripts/gsc.mjs`), list them in `docs/seo-clusters.md`, and add a 308 for each to `next.config.ts` (extend `lib/merged-categories.ts`); catch-all `/products/category/:slug` → `/products` for unknown slugs
- [ ] T026 [US2] Write `docs/seo-clusters.md`: the 8 clusters from FR-011 → one target URL each, baseline positions; mark secondary pages that must link to the target
- [ ] T027 [P] [US2] Home: title/meta for the brand cluster («موكيت السريع | موكيت ومفروشات السريع – حراج بن قاسم الرياض» style, ≤60 chars), check the H1 and summary; log in `docs/seo-2026-10-27.md` (21-day lock)
- [ ] T028 [P] [US2] Schema graph in `app/layout.tsx` from `data/business.ts` per research R5 (HomeAndConstructionBusiness + parentOrganization + WebSite + Organization with the vector-derived logo); validate every page's JSON-LD in crawl-check
- [ ] T029 [P] [US2] `app/sitemap.ts`: lastModified from per-page content dates (add `updatedAt` to products, projects, guides), images in the sitemap for owner photos
- [ ] T030 [US2] Field CWV: trim the home products grid to 8 cards + «كل المنتجات» link in `components/ProductGallery.tsx` (DOM ~1,200 → <900), confirm lazy below-fold images, re-run Lighthouse; record CrUX monthly in `docs/baseline-2026-10-27.md`
- [ ] T031 [US2] Internal links: each product links to its hub and ≥2 siblings; hubs link to all products and to the matching guides/projects (data in `data/products.ts` `related`, hub page component)
- [ ] T032 [US2] Search Console: submit the sitemap and request indexing for home, two hubs and the top 6 products (≤10/day) via `gsc.mjs`; note dates in `docs/seo-2026-10-27.md`

---

## Phase 5: User Story 3 — AI assistants recommend the shop (P2)

**Goal**: plain, consistent, quotable facts; AI crawler access; corroborating listings; projects and guides.
**Independent Test**: the 20 prompts, re-run monthly, mention the shop in ≥4 answers by week 8.

- [ ] T033 [P] [US3] `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts` generated from `data/business.ts`, `data/products.ts` summaries and FAQs (Arabic, plain text, links)
- [ ] T034 [P] [US3] `app/robots.ts`: explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended on public pages; keep `/api/` disallowed
- [ ] T035 [US3] Add a `summary` (2–3 quotable sentences: who, what, where, contact) to every product in `data/products.ts` and render it under the H1 in `components/ProductDetail.tsx` and the hub page
- [ ] T036 [US3] `data/projects.ts` + `app/projects/page.tsx` + `app/projects/[slug]/page.tsx` + `components/cards/ProjectCard.tsx` + `components/projects/ProjectGallery.tsx` (native `<dialog>`, RTL arrows, swipe) — seed with the mosque and office installation sets received 2026-10-27; place type/city/date only after the owner confirms (constitution I); ImageGallery + BreadcrumbList schema; link from product pages
- [ ] T037 [US3] `data/guides.ts` + `app/guides/[slug]/page.tsx`: 4 guides from cluster questions (الفرق بين باركيه SPC ومشمع الباركيه؛ ربل جيم رول ولا بلاط مطاط؛ إزاي تختار موكيت مسجد؛ فينيل طبي للعيادات: إيه المهم) — facts only from product data, FAQPage schema, each links to its product
- [ ] T038 [US3] `docs/listing-text.md`: Google Business Profile description, categories, services, Q&A seeds and photo list; Bing Places and Apple Business Connect texts; a list of Saudi/Arabic directories to claim — all generated from `data/business.ts`; hand to the owner (his logins)
- [ ] T039 [US3] Monthly routine in `docs/geo-tracking.md`: re-run the 20 prompts in ChatGPT and Gemini (and Ahrefs Brand Radar if available), log mentions/citations and wrong facts to fix

---

## Phase 6: User Story 4 — The owner updates photos and offers without a developer (P3)

**Goal**: one place per update, same-day.
**Independent Test**: adding a photo folder or an offer entry changes the live page after one deploy with no other edit.

- [ ] T040 [US4] Document in `docs/owner-updates.md` (Arabic, short): send photos on WhatsApp → `photo-intake.mjs` → push; dated offers in `data/offers.ts` with startsAt/endsAt (prices only in writing)
- [ ] T041 [US4] Show a «صور مطلوبة» list in `docs/owner-updates.md` generated from `data/photo-register.ts` on each build

---

## Phase 7: Polish & cross-cutting

- [ ] T042 [P] Delete dead code and assets listed in the 2026-10-27 audit: `components/ui/*` (48 unused shadcn files), unused deps (@radix-ui/*, cmdk, embla, recharts, sonner, vaul, next-themes, motion, input-otp, react-hook-form, react-resizable-panels), `public/home/*.svg`, `public/NavBar/*.svg`, the unused mp4, `public/brand/mark.png` — ask the owner before deleting files (deletions were classifier-blocked before)
- [ ] T043 [P] Accessibility pass with axe on the five landing pages (focus, labels on icon-only buttons, contrast of mint text)
- [ ] T044 Run `quickstart.md` end to end on the live site; update `C:/Users/mohammed/.claude/scripts/SITE-LESSONS.md` with new lessons
- [ ] T045 Reports to the owner at weeks 2, 4, 8, 16: GSC per cluster, Ads landing-page ratings, CWV, AI mentions, contacts vs spend

---

## Dependencies & execution order

- Setup (T001–T004) → Foundational (T005–T007) → US1 → US2/US3 → US4 → Polish.
- Owner gates: T009 (logo), T013 (icons), T016 (cards), T022 (photos), T036 project facts, T038 listings.
- US2 can start in parallel with US1's A3/A4 once T005 is done (different files), except T028 needs the logo from T010.
- US3 T036 needs owner photos (T023) and the ProjectCard from T016 approval.

## Parallel examples

```text
US1 after T013 approval:  T017 SectorCard | T018 OfferCard | T019 StepCard | T020 ContactRow
US2:                      T027 home title | T028 schema graph | T029 sitemap
US3:                      T033 llms.txt   | T034 robots
```

## Implementation strategy

1. MVP = Setup + Foundational + US1 (A1–A3, A4 as photos arrive) → deploy → watch the Ads landing-page rating.
2. Then US2 (organic), US3 (GEO), US4 (self-service), each deployed and verified on its own.
3. Measure at weeks 2, 4, 8, 16 against SC-001…SC-008.
