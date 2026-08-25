import { Layers, PanelTop, Tv, Grid3x3, DoorClosed, Gem, Trees } from "lucide-react"

export interface ServiceCityInfo {
  slug: string
  name: string
  icon: typeof Layers
  galleryCategory: string
  price: string
  premiumPrice: string
  description: string
  pros: string[]
  bestFor: string
  installTime: string
  maintenance: string
  warranty: string
  faqs: { q: string; a: string }[]
}

export const SERVICE_CITY_SERVICES: ServiceCityInfo[] = [
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    icon: Layers,
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft",
    premiumPrice: "₹120–₹150/sq.ft with designer wood/marble-print textures",
    description:
      "PVC (Polyvinyl Chloride) ceiling panels are 100% waterproof, termite-proof, and low-maintenance — making them the most versatile false ceiling option for bathrooms, kitchens, shops, and every room of the home.",
    pros: [
      "Waterproof — safe for bathroom and kitchen",
      "Termite-proof and insect-resistant",
      "Low maintenance — just wipe clean",
      "No repainting needed; long service life",
    ],
    bestFor: "Bathroom, kitchen, balcony, shop, office — any room",
    installTime: "1 room in a day, full home in 3–4 days",
    maintenance: "Very low — just wipe with a damp cloth",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Is a PVC ceiling genuinely waterproof?", a: "Yes — it is fully waterproof. In a bathroom, a kitchen or any humid room, the panels never swell, warp or deteriorate." },
      { q: "How long does a PVC ceiling take to install?", a: "A single room is completed in one day. A full home typically takes three to four days." },
    ],
  },
  {
    slug: "gypsum-ceiling",
    name: "Gypsum Ceiling",
    icon: Layers,
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft",
    premiumPrice: "₹135–₹210/sq.ft with cove lighting + LED and multi-level design",
    description:
      "Gypsum board ceiling is the most popular choice for living rooms and bedrooms — a smooth, plaster-like finish that can be shaped into elegant cove designs, POP borders, and artistic patterns with integrated LED lighting.",
    pros: [
      "Elegant smooth finish — premium, luxury look",
      "Perfect for cove lighting and LED strips",
      "Can be painted in any colour",
      "Fire resistant and sound-insulating",
    ],
    bestFor: "Hall, bedroom, drawing room, dining area, office cabin",
    installTime: "1 bedroom in 2–3 days, full hall in 3–5 days",
    maintenance: "Minimal — occasional dusting, repaint every 5–7 years",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Will a gypsum ceiling be damaged by water?", a: "In wet rooms such as bathrooms and kitchens we specify PVC instead of gypsum. For dry rooms — halls, bedrooms, drawing rooms — gypsum is the ideal choice." },
      { q: "How long does a gypsum ceiling take?", a: "A single room takes two to three days and a full home five to seven, depending on how intricate the design is." },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    icon: PanelTop,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹650/sq.ft",
    premiumPrice: "₹390–₹650/sq.ft for premium fluted/louvre designs with LED backlight",
    description:
      "WPC (Wood Plastic Composite) panels give the luxury look of real wood without the maintenance headaches — termite-proof, moisture-resistant, and eco-friendly. Popular for TV walls, accent walls, and full room paneling.",
    pros: [
      "Wood look at a much lower cost than solid wood",
      "Moisture- and termite-resistant — lasts longer than real wood in humidity",
      "Low maintenance — no polish or varnish needed",
      "Available in many colours and fluted textures",
    ],
    bestFor: "TV wall, bedroom headboard wall, accent wall, office reception",
    installTime: "TV wall accent in 1 day, full room in 2–3 days",
    maintenance: "Wipe with a dry cloth — very low maintenance",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Does a WPC panel really look like solid wood?", a: "It does. WPC reproduces the look of natural timber without any risk of termites, moisture damage or warping — and it typically costs around 60% less." },
      { q: "Is WPC a good choice for a television wall?", a: "It is our first recommendation for television walls: a convincing wood texture, straightforward cable management, and a genuinely premium finish." },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    icon: Tv,
    galleryCategory: "TV Unit Design",
    price: "From ₹15,000 (basic)",
    premiumPrice: "₹46,000–₹75,000+ (premium designs)",
    description:
      "Custom-designed modular TV units built to fit your exact room dimensions — with built-in cable management, LED backlighting, and storage shelves, in wood laminate, matte, glossy, or combination finishes.",
    pros: [
      "Custom designed for your exact room size",
      "Built-in cable management system",
      "LED strip lighting option available",
      "Storage cabinets and open shelves included",
    ],
    bestFor: "Living rooms, bedrooms",
    installTime: "3–5 days depending on size and design",
    maintenance: "Wipe with a dry cloth — no special care needed",
    warranty: "1 year written warranty",
    faqs: [
      { q: "What does a modular TV unit cost?", a: "A basic unit starts at ₹15,000. A premium design with LED lighting and extensive storage runs from ₹46,000 to ₹75,000 and above, depending on size." },
      { q: "How many days does a TV unit take to build?", a: "Three to five days, depending on size and design. We confirm a firm timeline once the measurements are taken." },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    icon: Grid3x3,
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹115/sq.ft",
    premiumPrice: "₹76–₹115/sq.ft for acoustic-rated or edge-lit tiles on a heavier grid",
    description:
      "Grid ceiling is a 2×2 lay-in tile system on a light metal grid — the commercial standard for offices, shops and clinics. Any tile lifts out in seconds to reach wiring or AC ducts above, with no breaking and no mess.",
    pros: [
      "Lift a single tile anytime to reach wiring or AC ducts",
      "Fastest and most economical ceiling for large floors",
      "Acoustic tile options cut office echo",
      "Fire-safe tiles backed by a 1-year warranty",
    ],
    bestFor: "Offices, shops, showrooms, clinics",
    installTime: "1–2 days for a room, 3–4 days for a larger floor",
    maintenance: "Very low — dust now and then; a stained tile is swapped on its own",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Why pick grid over gypsum for my office?", a: "If ducting, conduits or plumbing run overhead, grid lets an electrician lift one tile and get in without touching the rest. Gypsum looks premium but has to be cut open for that same access." },
      { q: "Are the tiles waterproof?", a: "Standard mineral-fibre tiles are not — they sag when wet. For washrooms or damp areas we drop PVC lay-in tiles into the very same grid instead." },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    icon: DoorClosed,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹750/sq.ft",
    premiumPrice: "₹460–₹750/sq.ft for frosted or fluted glass in aluminium framing",
    description:
      "Partition wall splits any space into a private cabin or extra room without the dust and weeks of brickwork — a rock-solid gypsum or elegant toughened-glass wall that gives privacy, sound control and a clean modern look, fast.",
    pros: [
      "No brickwork or cement dust — ready in 2–4 days",
      "Rock-solid gypsum or elegant toughened glass",
      "Real sound privacy with rockwool insulation",
      "Fully removable and reworked later if your layout changes",
    ],
    bestFor: "Office cabins, room division, reception areas",
    installTime: "2–4 days by length and whether it's gypsum or glass",
    maintenance: "Gypsum face: an occasional dust. Glass face: a wipe with glass cleaner.",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Can a partition hold a wall-mounted TV or shelves?", a: "Yes — as long as we know in advance. We build solid backing into the frame at the mounting height so the screws grip that, not just the board. Just flag it at the site-visit stage." },
      { q: "Is a glass partition safe with kids around?", a: "We fit toughened glass as standard, which shatters into small blunt granules rather than sharp shards. For homes with young children we also recommend a safety-laminated film — just ask for it in the quote." },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    icon: Gem,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹45–₹120/sq.ft",
    premiumPrice: "₹90–₹120/sq.ft for premium granite or exotic prints with an anti-fingerprint coat",
    description:
      "UV marble sheet gives a glossy, seamless marble-look wall for a pooja room or bathroom — fully waterproof, with no grout lines to blacken, at a fraction of real marble's price.",
    pros: [
      "Premium marble look at a fraction of natural stone's cost",
      "Waterproof with no grout lines to blacken",
      "Lightweight, scratch-resistant, wipes clean in seconds",
      "Fresh wall makeover finished in a single day",
    ],
    bestFor: "Pooja rooms, bathroom walls, feature walls",
    installTime: "1–2 days per room",
    maintenance: "None to speak of — a damp cloth keeps it shining, no polishing",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Can UV marble go on the wall behind the stove?", a: "We keep it off the strip right behind the flame — direct heat can affect the PVC base. For that patch we suggest ceramic tile or a metal splashback and run UV marble across the rest of the wall." },
      { q: "Does it need grout like tiles?", a: "No — sheets meet edge-to-edge with the pattern aligned, so there's no grout line at all. That means no joint that turns black with mould over the years." },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    icon: Trees,
    galleryCategory: "Artificial Grass",
    price: "₹40–₹150/sq.ft",
    premiumPrice: "₹90–₹150/sq.ft for 40–50mm premium-density pile with the longest-lasting colour and UV",
    description:
      "Artificial grass is soft, premium UV-protected turf that turns a balcony, terrace or wall into a fresh green space all year — no watering, no mowing, no insects — and it drains the monsoon straight through.",
    pros: [
      "Lush green 365 days a year — no watering or mowing",
      "Soft and safe for kids and pets",
      "Drains the monsoon straight through — no mud or pooling",
      "UV-protected colour that won't fade for years",
    ],
    bestFor: "Balconies, terraces, green feature walls",
    installTime: "Half a day to a full day for a typical balcony or wall",
    maintenance: "An occasional rinse and a light brush — never any mowing or watering",
    warranty: "1 year written warranty",
    faqs: [
      { q: "Will it smell or grow mould in the monsoon?", a: "Not if the base drains properly — that's the one thing we always insist on checking. If your balcony doesn't drain well, we sort the drainage before a single roll goes down." },
      { q: "How long does it last outdoors?", a: "Good UV-stabilised turf keeps its colour and pile for about 5–8 years of regular sun before it noticeably fades. Our 1-year warranty covers the installation; the material itself lasts well beyond that." },
    ],
  },
]

export function getServiceCityInfoBySlug(slug: string): ServiceCityInfo | undefined {
  return SERVICE_CITY_SERVICES.find((s) => s.slug === slug)
}
