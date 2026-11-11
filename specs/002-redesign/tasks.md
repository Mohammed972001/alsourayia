# Tasks — 002 Full redesign

## Done 2026-11-11
- [x] T001 Worktree on branch `002-redesign`; old app, components, data and stock photos removed.
- [x] T002 Skeleton from the sister build: static export, worker, tokens, styles, components, scripts.
- [x] T003 Identity from the «السريع» badge: teal, copper, bronze, cream; El Messiri + IBM Plex Sans Arabic.
- [x] T004 Owner photos sorted (82 kept), catalogue pictures (15), four illustrations.
- [x] T005 Facts file, tracking, tags, redirects, preview worker config.
- [x] T006 Content: eleven products, two hubs, home, guides, catalogues.
- [x] T007 Pages: home, products, hubs, product, guides, catalogues, about, contact, FAQ, privacy, 404, sitemap,
  robots, llms.txt, llms-full.txt.

## Open
- [ ] T008 Preview deploy and the user's review; round-2 picker for anything he wants changed.
- [ ] T009 Owner photos for parquet, SPC, home carpet, medical vinyl, grass and foam (`docs/owner-checklist.md`).
- [ ] T010 Launch: merge to main (GitHub Actions deploys with `SITE_LIVE=1`), live checks, sitemap resubmit,
  tag-check on the ad landing pages.

## Round 3 (2026-11-12) — from the user's picks in design/options

Picks: colours د, Lalezar, header ب (transparent over dark heroes), hero ب on home, tapes strip أ, showcase
ب + د (tabs over a draggable rail), product card د (glass) with ج and ب used elsewhere, projects ج (big slider),
steps ب (WhatsApp chat) + ج (drawn path), contact band ج (dark AI card), motion د (tile flip), footer ب (light
with the shop photo), Tabby/Tamara section (style still to be picked). The other heroes return as sections:
أ room floor swap on product pages, ج 3D slab and د collage on home, هـ cinema on «المحل», و ring on /products.

- [x] R3-01 Foundation: tokens, Lalezar, flip motion, AI media folder, textures (commit a85047c)
- [ ] R3-02 Shell: header ب, footer ب, CTA ج, about cinema, general pages (branch r3-shell)
- [ ] R3-03 Home: hero ب, tapes, tabs + rail, 3D slab, projects slider, chat steps, Tabby/Tamara, collage (branch r3-home)
- [ ] R3-04 Products: glass card, two-photo and sample-tag cards, room floor swap, ring listing, path steps,
      instalment line (branch r3-product)
- [ ] R3-05 Merge, full checks (lint, typecheck, build, site-check, widths 360–1440), preview deploy with the picker
