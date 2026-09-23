# JK Interior — SEO & Keyword Strategy

One page per search intent. Each keyword below has exactly **one** target URL; no
other page is written to rank for it. Use the words naturally (title, H1, intro,
headings, image alt where the photo really shows it, internal link anchors). Never
repeat a phrase for its own sake, never hide text, never list keywords.

## Where the data lives

| What | Source of truth |
|---|---|
| Business name, address, phones, hours, geo, Google Maps link | `src/lib/seo.ts` → `BUSINESS`, `ADDRESS_LINE`, `HOURS_*`, `GOOGLE_MAPS_URL` |
| Service areas (the only town list on the site) | `src/lib/seo.ts` → `SERVICE_AREAS` |
| City page content | `src/lib/seo.ts` → `CITIES` |
| Service page titles, descriptions, real projects | `src/lib/services-content.ts` |
| The one LocalBusiness entity (`/#business`) | `buildLocalBusinessSchema()` in `seo.ts`, emitted on `/` only |
| Crawlable routes → sitemap + prerender | `scripts/routes.ts` |

**NAP rule:** the address, phone and hours in `BUSINESS` must match the live Google
Business Profile exactly. Update the profile (or confirm it) first, then `seo.ts`.

## Keyword → page map

| Intent | Primary phrasing | Target page |
|---|---|---|
| Brand / who we are | JK Interior, JK Interior Forbesganj | `/` |
| Contractor, local | false ceiling contractor Forbesganj, interior designer Forbesganj | `/`, `/cities/forbesganj` |
| Gypsum | gypsum false ceiling (price, design) | `/services/gypsum-ceiling` |
| PVC | PVC false ceiling / PVC ceiling price | `/services/pvc-false-ceiling` |
| Grid | grid ceiling for office / shop | `/services/grid-ceiling` |
| Partition | gypsum partition wall, glass partition | `/services/partition-wall` |
| WPC | WPC wall panel, WPC louvers, fluted panel | `/services/wpc-wall-panel` |
| UV marble | UV marble sheet | `/services/uv-marble-sheet` |
| TV unit | modular TV unit / TV unit design | `/services/modular-tv-unit` |
| Artificial grass | artificial grass for balcony | `/services/artificial-grass` |
| Town + trade | false ceiling / interior work in {Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul} | `/cities/{town}` |
| Questions (cost, gypsum vs PVC, time, areas) | "how much does…", "which ceiling…" | `/faq` (and the matching service page) |

## Rules

- **No service × town pages.** The 80 templated `/services/{service}/{town}` pages were
  retired and 301 to their service page. Do not recreate them.
- **A town page exists only with genuine local content**: real projects done there,
  practical notes for that town, how visits work. Never create one by swapping a name.
  (Kursakanta, Tribeniganj and Chhatapur were consolidated into Araria/Supaul.)
- **Only Forbesganj is a business location.** Every other town is a service area.
- **No self-serving review or rating markup**, no unverifiable superlatives
  ("best", "most trusted"), no project counts that can't be shown.
- **Structured data describes visible content only.** There is no "AI Overview"
  schema; AI search features use the same crawlable, factual content as normal Search.
- **Titles** ≤ ~60 characters, **meta descriptions** ≤ 155, unique per page.
