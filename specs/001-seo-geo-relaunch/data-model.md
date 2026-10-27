# Data model: SEO + GEO relaunch

All data lives in TypeScript files in the repo; pages, structured data, `llms.txt` and listing texts read from them.

## BusinessFacts (`data/business.ts`) — single source
| Field | Rule |
|---|---|
| brandName, legalName, unifiedNumber, vatNumber, nationalAddress | from CR / VAT certificate; identical everywhere |
| addressText, mapsUrl, geo {lat, lng} | owner-confirmed |
| phones [{display, tel, whatsapp?, role}] | 0550101867 main; 0559686290 second line (parquet/rubber/medical) |
| hours [{days, opens, closes}] | every day 09:00–22:00 |
| services [string] | confirmed promises only (Principle I) |
| areaServed | Riyadh for inspection/installation; Kingdom for delivery |
`lib/contact.ts` keeps its exports and re-exports from here.

## Product (`data/products.ts`, existing — fields added)
`cluster` (enum of FR-011 clusters), `targetKeywords[]`, `summary` (2–3 quotable sentences, GEO), `photos` derived
from folder + `images` lead, `stockOnly` (computed), `projects[]` (slugs).
Validation: one product per cluster is the target page; others link to it.

## Project (`data/projects.ts`, new)
`slug`, `title`, `placeType` (mosque | gym | office | hospital | home), `productIds[]`, `city?`, `district?`
(owner-confirmed only), `monthYear`, `photos[]` (owner, duplicate-checked, faces-free), `summary`.
State: draft → owner-confirmed → published (only published entries render).

## Guide (`data/guides.ts`, new)
`slug`, `title`, `question`, `answerSummary`, `sections[]`, `productIds[]`, `updatedAt`.

## Photo register (`data/photo-register.ts`, new)
Per product: `owner` count, `stock` count, `needed` (bool), `lastReceived`. Drives FR-005 and SC-002.

## Icon (`components/icons`, new)
`name` (kebab), `source` (hugeicons | custom), `paths`; see contracts/icon-set.md.

## KeywordCluster (`docs/seo-clusters.md`)
`name`, `terms[]`, `targetUrl`, `baselinePosition`, `latestPosition`, `impressions28d`.
