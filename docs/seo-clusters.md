# Keyword clusters (spec 001 T025, T026, FR-011)

One target URL per cluster. Secondary pages link to the target and do not compete for its main term.
Baseline: Search Console, 2026-10-04 to 2026-10-31 (28 days). Almost nothing outside the brand has data yet,
so most lines are «no data»; read them again at weeks 4 and 8.

| Cluster | Terms | Target URL | Baseline | Secondary pages |
|---|---|---|---|---|
| Brand | موكيت السريع، السريع للموكيت | `/` | السريع للموكيت 50.4 (9 impressions) | `/about`, `/contact` |
| Parquet | باركيه ارضيات، باركيه الرياض، تركيب باركيه | `/products/category/parquet` | no data | `/products/parket` |
| Water-resistant parquet | باركيه ضد الماء، باركيه SPC | `/products/water-resistant-carpet` | no data | `/guides/spc-vs-vinyl-parquet` |
| Rubber | ارضيات مطاط، ربل، ربل جيم، ربل حمامات | `/products/category/rubber-flooring` | page 6.6 (7 impressions) | `/products/rabal-gem`, `/products/non-slip-rubber` |
| Medical vinyl | فينيل طبي، فينيل مستشفيات، ارضيات المستشفيات | `/products/hospital-flooring` | no data | none |
| Vinyl look | مشمع باركيه، بديل الباركيه | `/products/vinyl-roll` | page 3.7 (9 impressions) | `/guides/spc-vs-vinyl-parquet` |
| Mosque | موكيت مساجد، سجاد مساجد | `/products/mosque-carpets` | page 14.2 (10 impressions) | `/products/vinyl-mosque` |
| Office | موكيت مكاتب، بلاط موكيت | `/products/office-carpet` | page 52.6 (7 impressions) | `/products/office-flooring` |
| Home carpet | موكيت غرف ومجالس، موكيت تركي | `/products/mokite` | page 7.3 (10 impressions) | `/products/turky-mshager` |

`spec.md` FR-011 counts eight clusters; water-resistant parquet has its own line here because it has its own
page and its own terms. Foam stays with the sister site (brief section 3), so «فوم اطفال» has no target here.

## Old URLs with impressions (16 months, checked live on 2026-11-02)

Every URL Search Console has shown is a live page or a 308 to its target:

| Old URL | Answer | Target |
|---|---|---|
| `/products/category/vinyl` | 308 | `/products/vinyl-roll` |
| `/products/category/carpet` | 308 | `/products/mokite` |
| `/products/category/hospital-flooring` | 308 | `/products/hospital-flooring` |
| `/products/category/non-slip-rubber` | 308 | `/products/category/rubber-flooring` |
| `/products/category/office-carpet` | 308 | `/products/office-carpet` |
| `/products/category/turkish-carpet` | 308 | `/products/turky-mshager` |

**Not built on purpose:** T025's catch-all from unknown `/products/category/:slug` to `/products`. Nothing with
impressions needs it, and sending unknown URLs to a list page is a soft 404. Unknown slugs stay real 404s.
