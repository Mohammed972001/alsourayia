# ADR-0001 — Static Next.js export on Cloudflare Workers

**Status:** accepted, 2026-11-11 (replaces the OpenNext setup of 2026-10-17)

## Context

The old site ran Next.js through OpenNext on Workers with an image binding, a Gemini chat route and Workers AI.
The redesign follows the house stack of the sister build: no server features are needed.

## Decision

- Next.js 16 App Router, `output: "export"`, React Compiler on, plain CSS from generated tokens.
- Photos are pre-sized WebP widths from `scripts/media.mjs`, rendered by `src/components/Photo.tsx`.
- `src/worker.ts` runs first: canonical host over https, 301s for retired URLs, security headers, immutable cache
  for `/_next/static/` and `/media/`, and the RSC prefetch path mapping.
- Production: `wrangler.jsonc` (worker `mokeet-elsuarye`, custom domains), deployed by GitHub Actions on push to
  main with `SITE_LIVE=1`. Preview: `wrangler.preview.jsonc` (worker `mokeet-elsuarye-preview`, workers.dev only).
- Third-party scripts: the Google tag (Ads + GA4) and the TikTok pixel only, on the live build.
- The chat assistant is dropped: it needs a server route, and leads come through WhatsApp and calls.

## Consequences

Every page is HTML on the CDN. Any future form or API needs a Worker route and an ADR.
