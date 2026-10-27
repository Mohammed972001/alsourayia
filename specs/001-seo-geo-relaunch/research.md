# Research: SEO + GEO relaunch

## R1 — Vector version of the brand logo
- **Decision**: Redraw the existing «السريع» badge as SVG by hand-tracing the S emblem (curves + parquet inlay as
  flat brass/brown fills) and setting the wordmark from a matching Arabic display face converted to outlines; produce
  three masters (full badge, emblem only, one-colour). Export favicons/apple icon/512 icon from the SVG.
- **Rationale**: The current badge is an AI raster with a cropped watermark; tracing keeps the identity the owner
  just asked to restore while making it sharp at every size and recolourable.
- **Alternatives**: auto-trace (potrace/vectorizer) — noisy paths, gradients lost, heavy files; brand-new logo — a
  new identity the owner did not ask for; commissioning a designer — best quality, slower; offered as fallback if
  the owner rejects the redraw.

## R2 — Icon family
- **Decision**: One stroke family at 1.5 px on a 24 grid with rounded joins — Hugeicons (free set, as on
  hamasat-beity) for generic glyphs, plus 6–8 custom-drawn glyphs in the same grid for this trade (mosque arch,
  carpet roll, carpet tile, parquet planks, rubber roll, gym mat, sample swatch, measuring tape). Rendered as inline
  SVG components (tree-shaken), `currentColor`, `aria-hidden` when decorative.
- **Rationale**: matches the reference site's quality; inline SVG costs no extra request; custom glyphs give the
  trade-specific look generic sets lack.
- **Alternatives**: keep lucide (owner rejects the look); funun's Iconsax exports (static files, two colours each,
  awkward to theme); icon font (accessibility and FOIT problems).

## R3 — Photo-led cards
- **Decision**: Sector, project and product cards lead with an owner photo (4:3 or 1:1) with a gradient scrim and
  a mint chip; offer and step cards keep an icon tile but in the new family with a layered frame (as funun's mosque
  cards rising over a photo edge). Cards share radius 14, 1 px line border, hover lift on pointer devices only.
- **Rationale**: the reference sites sell with pictures; text-only boxes read generic.
- **Alternatives**: illustrations (would be AI-looking again); icons only (rejected by the owner).

## R4 — Old URLs still in Search Console
- **Decision**: Pull all page URLs with impressions in the last 16 months and every 404 from the crawl report;
  308 each to its live equivalent (existing merged-category map extended); catch-all for unknown `/products/category/*`
  to `/products`.
- **Rationale**: 7 of the 11 URLs with impressions are old category URLs.

## R5 — Structured data graph
- **Decision**: One `@graph` in the layout: `HomeAndConstructionBusiness` (with `parentOrganization` = the legal
  establishment, address = national address, geo, hours, phones, `areaServed` = SA), `WebSite`, `Organization`
  (legalName, vatID, identifier, logo = vector-derived PNG); per page `BreadcrumbList`, `FAQPage`, `Service`/
  `OfferCatalog` for products, `CollectionPage` for hubs, `ImageGallery` for projects. No `aggregateRating`, no
  `Offer` with price.
- **Rationale**: complete entity description is what both Google and AI assistants resolve the business from.

## R6 — GEO (AI assistants)
- **Decision**: (a) `/llms.txt` + `/llms-full.txt` generated from the facts record, products and FAQs; (b) robots
  allow GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended on public
  pages; (c) each landing page opens with a 2–3 sentence factual summary (who, what, where, contact) and ends with
  Q&A; (d) consistent NAP on Google Business Profile, Bing Places, Apple Business Connect and Saudi directories
  (e.g. Yellow Pages KSA, daleel-style business directories) — exact list confirmed in tasks; (e) monthly 20-prompt
  test logged in `docs/geo-tracking.md`; Ahrefs Brand Radar if available.
- **Rationale**: assistants cite pages with plain facts, consistent entities and third-party corroboration.

## R7 — Field Core Web Vitals
- **Decision**: Track CrUX per origin and URL monthly; lab target ≥ 85 mobile on landing pages. Known levers left:
  gtag weight (keep afterInteractive per lesson), TikTok pixel (lazyOnload), home DOM size (~1,200 elements → trim
  the products grid on home to 8 + link), below-fold images lazy.

## R8 — Projects section
- **Decision**: `/projects` hub + `/projects/[slug]` pages built from owner photos; each: place type (مسجد، صالة
  رياضية، مكتب), product, district/city only if the owner confirms, month/year, 6–12 photos, links to product.
  Mosque and office sets received 2026-10-27 seed the first entries.
- **Rationale**: real installations are the strongest trust and GEO signal and give new long-tail pages.

## R9 — Measurement
- **Decision**: Baselines recorded before A ships: GSC 90 d (8 clicks / ~530 impressions), Ads landing-page
  ratings per keyword, Lighthouse lab per page, 20-prompt AI mentions. Report at weeks 2, 4, 8, 16.
