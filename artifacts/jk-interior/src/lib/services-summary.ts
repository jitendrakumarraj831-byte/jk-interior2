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
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    category: "Ceiling",
    tagline: "Designer gypsum ceilings with cove and LED lighting for halls and bedrooms",
    detail:
      "A seamless plaster-smooth ceiling that conceals wiring and carries recessed cove or LED lighting. The most requested finish for living rooms and bedrooms, and the only one that lets us shape multi-level designs, borders and light channels to your room.",
    badge: "Cove & LED Ready",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with a cove-lit border in a Forbesganj living room by JK Interior",
    price: "₹75–₹210 / sq.ft",
    installTime: "Ready in 2–3 days",
    whereUsedFirst: "Halls & bedrooms",
    avoid: "Not suited to bathrooms or kitchens — specify PVC for those rooms.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "A smooth, joint-free surface that hides wiring and carries concealed cove or LED lighting.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹75–₹210 per sq.ft, materials and labour included. Design complexity and lighting set the final rate.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Dry rooms — halls, bedrooms, drawing and dining areas, and office cabins.",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    category: "Ceiling",
    tagline: "Fully waterproof PVC ceilings for kitchens, bathrooms and humid rooms",
    detail:
      "Interlocking PVC panels that shrug off water, steam and monsoon humidity. Nothing swells, nothing needs repainting, and the surface wipes clean — which is why it is our standard specification for wet areas and shopfronts.",
    badge: "Fully Waterproof",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Wood-texture PVC false ceiling in a kitchen installed by JK Interior in Bihar",
    price: "₹75–₹150 / sq.ft",
    installTime: "Fitted in a single day",
    whereUsedFirst: "Kitchens & bathrooms",
    avoid: "Works anywhere, though halls usually look more refined in gypsum.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Sealed panels engineered for water, steam and damp — simply wipe them clean.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹75–₹150 per sq.ft, materials and labour included. Panel design and area set the rate.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Kitchens, bathrooms, balconies and retail shops.",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    category: "Ceiling",
    tagline: "Demountable grid ceilings for offices, shops and clinics with instant service access",
    detail:
      "A lay-in tile system on a light metal T-grid. Any tile lifts out in seconds, so wiring, ducting and AC lines above the ceiling stay serviceable — the commercial standard for offices, clinics and showrooms.",
    badge: "Easy Service Access",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral-fibre grid ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115 / sq.ft",
    installTime: "Ready in 1–2 days",
    whereUsedFirst: "Offices & shops",
    avoid: "Less refined in a home hall or bedroom — gypsum presents far better there.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Lift a single tile to reach the wiring or air-conditioning ducts running above.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹45–₹115 per sq.ft, materials and labour included. Tile grade sets the rate.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Offices, showrooms, clinics and retail shops.",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    category: "Partition",
    tagline: "Gypsum and glass partitions that divide a space without any brickwork",
    detail:
      "A dry-build partition on a metal stud frame, clad in gypsum board or toughened glass. It divides a room in days rather than weeks, with none of the demolition, curing time or debris of masonry work.",
    badge: "Dry Build, Low Mess",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750 / sq.ft",
    installTime: "Ready in 2–4 days",
    whereUsedFirst: "Office cabins & room division",
    avoid: "Not a load-bearing wall — do not use it to carry heavy fixtures or structure.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Gypsum or toughened-glass panels on a metal frame, finished straight, clean and rigid.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹100–₹750 per sq.ft. Gypsum sits at the lower end; glass at the premium end.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Office cabins, reception areas and dividing one room into two.",
      },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    category: "Wall",
    tagline: "Wood-look WPC panelling for television walls and feature walls",
    detail:
      "Wood-plastic composite panelling that reads as timber but resists moisture and termites entirely. It needs no polish or varnish, and the fluted profiles give a television or headboard wall genuine depth.",
    badge: "Wood-Look Finish",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel behind a TV, installed by JK Interior in Bihar",
    price: "₹180–₹650 / sq.ft",
    installTime: "Fitted in a single day",
    whereUsedFirst: "Television & feature walls",
    avoid: "Not intended for ceilings — specify PVC or gypsum overhead.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Warm wood-look panelling that resists moisture and termites — wipe clean, never polish.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹180–₹650 per sq.ft, materials and labour included. Profile and design set the rate.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Living-room television walls, bedroom headboard walls and office receptions.",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    category: "Wall",
    tagline: "High-gloss marble-look cladding for pooja rooms, bathrooms and feature walls",
    detail:
      "Large-format UV-coated sheets that deliver a marble surface with no grout lines and no stone weight, at roughly half the cost of natural marble. Waterproof, high-gloss and effortless to keep clean.",
    badge: "Marble-Look Finish",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a bathroom by JK Interior",
    price: "₹45–₹120 / sq.ft",
    installTime: "Ready in 1–2 days",
    whereUsedFirst: "Pooja rooms & bathrooms",
    avoid: "Keep it clear of gas hobs and other sustained high-heat surfaces.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "A seamless marble-look wall with no grout lines — waterproof and simple to wipe down.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹45–₹120 per sq.ft, materials and labour included — well below natural marble.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Pooja rooms, bathroom walls and interior feature walls.",
      },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    category: "Furniture",
    tagline: "Television units built to your wall, with cabling concealed throughout",
    detail:
      "Built to the measured dimensions of your wall rather than to a catalogue size, with cabling routed inside the carcass, storage where you actually need it, and optional LED backlighting behind the panel.",
    badge: "Concealed Cabling",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+",
    installTime: "Ready in 3–5 days",
    whereUsedFirst: "Living-room walls",
    avoid: "Never fitted directly onto a damp wall — waterproofing has to come first.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Built to your exact wall dimensions, with cabling routed inside and optional LED backlighting.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "From ₹15,000. Size, finish and storage determine the final figure.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Living-room and bedroom television walls.",
      },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    category: "Outdoor",
    tagline: "Evergreen artificial grass for balconies and terraces, with no upkeep",
    detail:
      "UV-stable synthetic turf laid over a prepared base. It stays green through summer and monsoon alike, drains rainwater straight through, and asks for no watering, mowing or seasonal replanting.",
    badge: "Zero Maintenance",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass laid on a balcony floor by JK Interior in Bihar",
    price: "₹40–₹150 / sq.ft",
    installTime: "Laid within hours",
    whereUsedFirst: "Balconies & terraces",
    avoid: "Not a substitute for indoor flooring — best kept to balconies, terraces and decor walls.",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        text: "Stays green with no watering or mowing, and monsoon rainwater drains straight through.",
      },
      {
        kind: "pricing",
        label: "Price",
        text: "₹40–₹150 per sq.ft, materials and labour included. Pile density sets the rate.",
      },
      {
        kind: "suited",
        label: "Best For",
        text: "Balconies, terraces and green feature walls.",
      },
    ],
  },
]
