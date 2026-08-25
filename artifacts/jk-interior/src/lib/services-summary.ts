export interface ServiceHighlight {
  kind: "special" | "pricing" | "suited"
  label: string
  text: string
}

export interface ServiceSummary {
  slug: string
  name: string
  category: string
  tagline: string
  /** One-paragraph explanation shown when a visitor expands the service card. */
  detail: string
  badge: string
  heroImage: string
  heroImageAlt: string
  price: string
  installTime: string
  whereUsedFirst: string
  /** Where this material should NOT be used — helps a customer choose correctly. */
  avoid: string
  highlights: ServiceHighlight[]
  /**
   * The exact Search Console query this service targets (see
   * `lib/seo-keywords.ts`) — appended to the hero image's alt/title and used
   * as the service's schema.org `keywords`, so every service card carries the
   * localized, material-specific phrase it's meant to rank for.
   */
  seoKeyword: string
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    category: "Ceiling",
    tagline: "Designer ceilings with cove and LED lighting for halls and bedrooms",
    detail:
      "A seamless, plaster-smooth ceiling that hides wiring and carries recessed cove or LED lighting — our most requested finish for living rooms and bedrooms.",
    badge: "Cove & LED Ready",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with a cove-lit border in a Forbesganj living room by JK Interior",
    price: "₹75–₹210 / sq.ft",
    installTime: "Ready in 2–3 days",
    whereUsedFirst: "Halls & bedrooms",
    avoid: "Not for bathrooms or kitchens — specify PVC there.",
    highlights: [
      { kind: "special", label: "Feature", text: "Joint-free surface that hides wiring and carries concealed LED lighting." },
      { kind: "pricing", label: "Price", text: "₹75–₹210/sq.ft, materials and labour included." },
      { kind: "suited", label: "Best For", text: "Halls, bedrooms, dining areas and office cabins." },
    ],
    seoKeyword: "gypsum false ceiling design with price",
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    category: "Ceiling",
    tagline: "Fully waterproof ceilings for kitchens, bathrooms and humid rooms",
    detail:
      "Interlocking PVC panels that shrug off water and humidity. Nothing swells, nothing needs repainting — our standard specification for wet areas.",
    badge: "Fully Waterproof",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Wood-texture PVC false ceiling in a kitchen installed by JK Interior in Bihar",
    price: "₹75–₹150 / sq.ft",
    installTime: "Fitted in a single day",
    whereUsedFirst: "Kitchens & bathrooms",
    avoid: "Works anywhere; halls usually look more refined in gypsum.",
    highlights: [
      { kind: "special", label: "Feature", text: "Sealed panels built for water and damp — simply wipe them clean." },
      { kind: "pricing", label: "Price", text: "₹75–₹150/sq.ft, materials and labour included." },
      { kind: "suited", label: "Best For", text: "Kitchens, bathrooms, balconies and retail shops." },
    ],
    seoKeyword: "pvc ceiling design for bedroom",
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    category: "Ceiling",
    tagline: "Demountable ceilings for offices and shops with instant service access",
    detail:
      "A lay-in tile system on a light metal grid. Any tile lifts out in seconds — the commercial standard for offices, clinics and showrooms.",
    badge: "Easy Service Access",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral-fibre grid ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115 / sq.ft",
    installTime: "Ready in 1–2 days",
    whereUsedFirst: "Offices & shops",
    avoid: "Gypsum presents far better in a home hall or bedroom.",
    highlights: [
      { kind: "special", label: "Feature", text: "Lift a single tile to reach wiring or AC ducts above." },
      { kind: "pricing", label: "Price", text: "₹45–₹115/sq.ft, materials and labour included." },
      { kind: "suited", label: "Best For", text: "Offices, showrooms, clinics and shops." },
    ],
    seoKeyword: "grid false ceiling installation",
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    category: "Partition",
    tagline: "Gypsum and glass partitions that divide a space, no brickwork",
    detail:
      "A dry-build partition on a metal frame, clad in gypsum or toughened glass. Divides a room in days, with none of the mess of masonry.",
    badge: "Dry Build, Low Mess",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750 / sq.ft",
    installTime: "Ready in 2–4 days",
    whereUsedFirst: "Office cabins & room division",
    avoid: "Not load-bearing — don't hang heavy fixtures on it.",
    highlights: [
      { kind: "special", label: "Feature", text: "Gypsum or toughened-glass panels, finished straight and rigid." },
      { kind: "pricing", label: "Price", text: "₹100–₹750/sq.ft — gypsum lower, glass premium." },
      { kind: "suited", label: "Best For", text: "Office cabins and dividing one room into two." },
    ],
    seoKeyword: "false ceiling contractor forbesganj",
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    category: "Wall",
    tagline: "Wood-look panelling for television walls and feature walls",
    detail:
      "Panelling that reads as timber but resists moisture and termites entirely. No polish, no varnish — fluted profiles give real depth.",
    badge: "Wood-Look Finish",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel behind a TV, installed by JK Interior in Bihar",
    price: "₹180–₹650 / sq.ft",
    installTime: "Fitted in a single day",
    whereUsedFirst: "Television & feature walls",
    avoid: "Not for ceilings — specify PVC or gypsum overhead.",
    highlights: [
      { kind: "special", label: "Feature", text: "Warm wood-look finish, moisture- and termite-proof." },
      { kind: "pricing", label: "Price", text: "₹180–₹650/sq.ft, materials and labour included." },
      { kind: "suited", label: "Best For", text: "TV walls, headboard walls and office receptions." },
    ],
    seoKeyword: "wpc louvers wall panelling",
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    category: "Wall",
    tagline: "High-gloss marble-look cladding for bathrooms and feature walls",
    detail:
      "Large-format sheets that give a marble surface with no grout lines, at roughly half the cost. Waterproof, glossy and easy to keep clean.",
    badge: "Marble-Look Finish",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a bathroom by JK Interior",
    price: "₹45–₹120 / sq.ft",
    installTime: "Ready in 1–2 days",
    whereUsedFirst: "Pooja rooms & bathrooms",
    avoid: "Keep clear of gas hobs and sustained high heat.",
    highlights: [
      { kind: "special", label: "Feature", text: "Seamless marble look, waterproof, simple to wipe down." },
      { kind: "pricing", label: "Price", text: "₹45–₹120/sq.ft — well below natural marble." },
      { kind: "suited", label: "Best For", text: "Pooja rooms, bathroom walls and feature walls." },
    ],
    seoKeyword: "uv marble sheet wall cladding",
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    category: "Furniture",
    tagline: "Television units built to your wall, cabling fully concealed",
    detail:
      "Built to your measured wall, not a catalogue size — cabling routed inside, storage where you need it, optional LED backlighting.",
    badge: "Concealed Cabling",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+",
    installTime: "Ready in 3–5 days",
    whereUsedFirst: "Living-room walls",
    avoid: "Never fitted onto a damp wall — waterproof first.",
    highlights: [
      { kind: "special", label: "Feature", text: "Built to your exact wall, cabling concealed inside." },
      { kind: "pricing", label: "Price", text: "From ₹15,000, depending on size and finish." },
      { kind: "suited", label: "Best For", text: "Living-room and bedroom television walls." },
    ],
    seoKeyword: "modern tv unit design for living room",
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    category: "Outdoor",
    tagline: "Evergreen grass for balconies and terraces, zero upkeep",
    detail:
      "UV-stable turf that stays green through the monsoon, drains rainwater straight through, and never needs watering or mowing.",
    badge: "Zero Maintenance",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass laid on a balcony floor by JK Interior in Bihar",
    price: "₹40–₹150 / sq.ft",
    installTime: "Laid within hours",
    whereUsedFirst: "Balconies & terraces",
    avoid: "Not a substitute for indoor flooring.",
    highlights: [
      { kind: "special", label: "Feature", text: "Stays green year-round; monsoon water drains straight through." },
      { kind: "pricing", label: "Price", text: "₹40–₹150/sq.ft, materials and labour included." },
      { kind: "suited", label: "Best For", text: "Balconies, terraces and green feature walls." },
    ],
    seoKeyword: "jk interior forbesganj",
  },
]

/** The rendered `alt`/`title` for one service's hero photo — its own description plus the exact target keyword it's meant to rank for. */
export function serviceSeoAlt(service: Pick<ServiceSummary, "heroImageAlt" | "seoKeyword">): string {
  return `${service.heroImageAlt} — ${service.seoKeyword}`
}

/** Reads "₹75–₹210 / sq.ft" or "₹15,000–₹75,000+" into a numeric min/max — schema.org `Offer.price` wants a number, not a display string. */
function parsePriceRange(price: string): { min: number; max: number } | null {
  const numbers = price.match(/₹\s*([\d,]+)/g)
  if (!numbers || numbers.length === 0) return null
  const values = numbers.map((n) => Number(n.replace(/[₹,\s]/g, ""))).filter((n) => Number.isFinite(n) && n > 0)
  if (values.length === 0) return null
  return { min: values[0], max: values.length > 1 ? values[values.length - 1] : values[0] }
}

/**
 * schema.org `Service` entries for every row in the Services section, priced
 * and imaged from the same data the page renders — so Search Console reads
 * exactly what a visitor sees, plus the local + material keyword each
 * service targets.
 */
export function buildServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JK Interior Services — Forbesganj, Araria, Bihar",
    description:
      "False ceiling, wall panelling and interior design services by JK Interior, the false ceiling contractor Forbesganj and interior designer in Araria Bihar homeowners call first.",
    itemListElement: SERVICES_SUMMARY.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `https://www.jkinterior.online/services/${service.slug}`,
        name: service.name,
        url: `https://www.jkinterior.online/services/${service.slug}`,
        description: service.detail,
        image: `https://www.jkinterior.online${service.heroImage}`,
        keywords: service.seoKeyword,
        areaServed: [
          { "@type": "City", name: "Forbesganj" },
          { "@type": "City", name: "Araria" },
          { "@type": "City", name: "Narpatganj" },
        ],
        provider: {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          "@id": "https://www.jkinterior.online/#business",
          name: "JK Interior",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          ...(parsePriceRange(service.price)
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  minPrice: parsePriceRange(service.price)!.min,
                  maxPrice: parsePriceRange(service.price)!.max,
                },
              }
            : { price: service.price }),
        },
      },
    })),
  }
}
