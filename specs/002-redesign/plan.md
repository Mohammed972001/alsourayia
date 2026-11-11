# Plan — 002 Full redesign

- **Method:** the sister build `D:\work\mafroshat-alamoudi` (spec 001 there): its skeleton, token generator,
  component set, motion and photo pipeline were copied and re-skinned; no text, fact or photo was copied.
- **Stack:** ADR-0001. **Identity:** ADR-0002.
- **Content:** `src/content/site.ts` (facts), `products.ts` (eleven lines, rooms, hubs), `home.ts`, `guides.ts` and
  `catalogs.ts` (carried over from the old site, same client), `media.json` (generated).
- **Pictures:** `media-src/owner/` (owner photos, chosen by hand: no people, no supplier renders, no watermarks),
  `media-src/catalog/` (cut from the owner's published supplier catalogues), `media-src/art/` (drawn by
  `scripts/art.mjs`). `npm run media` builds `public/media/`.
- **Tracking:** `src/lib/tracking.ts` + `src/components/Tags.tsx` (live build only).
- **Redirects:** `src/worker.ts`.
- **Gates:** tokens, lint, typecheck, build, `npm run check`, browser at 390 and 1440 px, then preview deploy.
