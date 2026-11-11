# Feature 002 — Full redesign on the house design system

**Branch:** `002-redesign` · **Created:** 2026-11-11 · **Status:** approved by the user in chat

## Input (the user, 2026-11-11)

The live site has wrong products (there is no such thing as «فينيل مساجد») and wrong photos. Throw the design away
and rebuild the site cleanly, with a design system like the new «مفروشات العمودي» site built the day before —
the same work exactly.

Product range confirmed the same day: mosque carpet, office carpet, home carpet, wood parquet, SPC parquet,
parquet-look vinyl rolls, medical vinyl, gym rubber, bathroom rubber, foam and puzzle floors, artificial grass.
Removed: mosque vinyl, horse rubber (not sold), Turkish patterned carpet, the duplicate «أرضيات مكاتب» guide page.

## User stories

1. **P1 — A buyer lands from a Google or TikTok ad** on a product or hub page and sees the right product, the
   owner's starting price, real photos (or a clearly labelled catalogue picture or illustration), and a WhatsApp
   or call button that still counts as a conversion.
2. **P1 — A project buyer** (mosque, office, gym, clinic, home) finds the floor that fits the place in the home
   page's «حسب المشروع» tabs and the «لكل مكان أرضيته» accordion.
3. **P2 — A buyer compares** parquet types and rubber types on the two hub pages, in a table.
4. **P2 — A visitor wants to come to the shop:** the address in Haraj bin Qasim, hours, map link and both numbers.
5. **P3 — An AI assistant** reads `/llms.txt`, `/llms-full.txt` and one JSON-LD graph per page and can state what
   the shop sells, where, and from what price.

## Functional requirements

- **FR-001** Static Next.js 16 export behind `src/worker.ts` on Cloudflare Workers (ADR-0001); preview on a
  separate worker (`wrangler.preview.jsonc`), noindex, no tags.
- **FR-002** Tokens from `design-system/build-tokens.mjs` with the contrast gate (ADR-0002).
- **FR-003** Every live URL keeps working: `/`, `/products`, eleven `/products/<slug>` (slugs unchanged plus the new
  `foam-flooring`), `/products/category/parquet`, `/products/category/rubber-flooring`, `/guides/<slug>`,
  `/catalogs`, `/about`, `/contact`, `/faq`, `/privacy`, `/llms.txt`, `/llms-full.txt`. Retired URLs 301 in the worker.
- **FR-004** Home sections in order: header (ticker, finder, product chips), services strip, hero (unroll, sample fan,
  textured word), collections grid, «حسب المشروع» tabs, the shop, «لكل مكان أرضيته» accordion, «تختار إيه؟»
  rulers, four steps, FAQ, closing WhatsApp card, footer.
- **FR-005** Product page: breadcrumb, H1 = the searched phrase, quotable summary, starting price, gallery with the
  picture source labelled, sticky section nav, features, works (owner photos), kinds, samples, rooms, quantity
  calculator (tiles for office carpet), «جهّز هذا قبل طلب السعر», care, FAQ, buy box, related, closing card.
- **FR-006** Tracking carried over unchanged in behaviour: `contact_click`, the Ads conversions, TikTok `Contact`,
  the WhatsApp text naming the product and the ad source, and the second line on parquet, rubber and medical pages.
- **FR-007** No invented facts (constitution I); photo rules (constitution II).

## Success criteria

- **SC-001** `npm run tokens`, `lint`, `typecheck`, `build` and `check` pass.
- **SC-002** No sideways overflow at 360, 390, 768, 1024 and 1440 px.
- **SC-003** Every page: one `h1`, a canonical, one JSON-LD graph that parses.
- **SC-004** After launch: every URL that Google knew answers 200 or a 301 to a live page; tag-check passes on
  the ad landing pages.
