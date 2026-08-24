import { Layers, PanelTop, Tv } from "lucide-react"

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
]

export function getServiceCityInfoBySlug(slug: string): ServiceCityInfo | undefined {
  return SERVICE_CITY_SERVICES.find((s) => s.slug === slug)
}
