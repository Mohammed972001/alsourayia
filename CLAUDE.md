@AGENTS.md

# موكيت ومفروشات السريع — www.mokeet-elsuarye.com

Arabic (RTL) site of a flooring shop in Haraj bin Qasim, Riyadh («مؤسسة فنون العاديات لديكورات والارضيات العالميه»).
Repo `Mohammed972001/alsourayia`. Never use another client's photos or text; never `vercel deploy` from the Khali repo.

## Status (keep current)

- 2026-11-11 — Spec 002 (`specs/002-redesign/`): full redesign on the house design system of the sister build
  «مفروشات العمودي» (`D:\work\mafroshat-alamoudi`), with this shop's identity (ADR-0002). Static export on Workers
  (ADR-0001). Eleven products; mosque vinyl, horse rubber, Turkish patterned carpet and the office-flooring guide
  removed and 301-redirected. Built on branch `002-redesign`; preview on the separate worker before launch.

## Sources of truth

- Constitution: `.specify/memory/constitution.md`. Decisions: `docs/adr/`. Specs: `specs/NNN-slug/`.
- Facts: `src/content/site.ts`. Copy: `src/content/`. Owner gaps: `docs/owner-checklist.md`.
- Tokens: `design-system/build-tokens.mjs` → `npm run tokens` (contrast gate). Components use semantic variables.
- Pictures: `media-src/owner/` (owner), `media-src/catalog/` (supplier catalogues), `media-src/art/`
  (`node scripts/art.mjs`) → `npm run media`.
- Tracking: `src/lib/tracking.ts`, `src/components/Tags.tsx` (live build only). Redirects: `src/worker.ts`.

## Commands

`npm run dev` · `npm run build` (runs `media` first) · `npm run lint` · `npm run typecheck` · `npm run check` ·
`node scripts/serve.mjs 3061` · `npm run tokens`.
Preview: `npm run build && npx wrangler deploy -c wrangler.preview.jsonc` (no SITE_LIVE).
Live: push to main; GitHub Actions builds with `SITE_LIVE=1` and deploys `wrangler.jsonc`.
After a live deploy: `node scripts/tag-check.mjs` and `node scripts/phone-check.mjs`.

## Gotchas

- Do not run `npm run build` while `next dev` runs (both use `.next`).
- Git Bash rewrites a lone `/` argument into a Windows path: prefix `MSYS_NO_PATHCONV=1`.
- The header is fixed over `.header-space`; never let a header part change the page height on scroll.
- Commits: Conventional Commits ending with the `Assisted-by:` trailer from the global CLAUDE.md; never `Co-Authored-By`.
