/**
 * Lightweight service summary — just the fields the homepage "catalogue" teaser
 * (components/services.tsx) needs. Kept separate from services-content.ts (the
 * full bilingual guide with install steps, FAQs, materials, etc.) because that
 * file is ~150KB and services.tsx is rendered eagerly on the homepage; the full
 * detail is only needed on the lazy-loaded /services/:slug page. Values here
 * must stay in sync with the matching record in services-content.ts.
 */

export interface ServiceSummary {
  slug: string
  name: string
  nameHi: string
  category: string
  tagline: string
  taglineHi: string
  heroImage: string
  heroImageAlt: string
  price: string
  installTime: string
  whereUsedFirst: string
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "The dry-room finish that turns a hall into a showpiece",
    taglineHi: "हॉल को शोपीस बना देने वाली ड्राई-रूम फिनिश",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    price: "₹75–₹210/sq.ft (Forbesganj/Araria market rate)",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    whereUsedFirst: "Living room / hall — the room every guest sees first",
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "The one we install in more Forbesganj kitchens and bathrooms than anything else",
    taglineHi: "फारबिसगंज के ज़्यादातर किचन-बाथरूम में यही लगती है",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 room in a day, full home in 3–4 days",
    whereUsedFirst: "Kitchens and bathrooms — this is the one ceiling material we never hesitate to recommend here",
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "The commercial standard for offices, shops, and clinics that need serviceable ceilings",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए कमर्शियल स्टैंडर्ड सीलिंग",
    heroImage: "/images/grid.webp",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1–2 days for a standard room, 3–4 days for a larger office/shop floor",
    whereUsedFirst: "Offices, corporate cabins, and coworking spaces",
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Split one room into two without touching the slab or the floor",
    taglineHi: "स्लैब या फर्श छुए बिना एक कमरे को दो हिस्सों में बांटें",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    installTime: "2–4 days depending on wall length and whether it's gypsum or glass",
    whereUsedFirst: "Office cabins carved out of one open floor",
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    tagline: "Real-wood look for a TV wall at roughly 60% of what timber panelling costs",
    taglineHi: "असली लकड़ी जैसा लुक, टिम्बर पैनलिंग से करीब 60% कम कीमत में",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    price: "₹180–₹650/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 day for a TV wall accent, 2–3 days for a full room",
    whereUsedFirst: "TV wall / accent wall in the living room",
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "The marble look for pooja rooms and bathroom walls, at a fraction of stone pricing",
    taglineHi: "पूजा घर और बाथरूम की दीवार के लिए मार्बल जैसा लुक, असली पत्थर से बहुत कम कीमत में",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    price: "₹45–₹120/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1–2 days per room",
    whereUsedFirst: "Bathroom walls — no grout lines to blacken with mould, unlike tiles",
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    tagline: "Built to your wall's exact width — not cut down from a catalogue template",
    taglineHi: "आपकी दीवार की सही नाप पर बनी — कैटलॉग टेम्पलेट से काटकर नहीं",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    installTime: "3–5 days depending on size and design complexity",
    whereUsedFirst: "Living rooms — the focal wall opposite the main seating",
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    tagline: "Evergreen balconies and feature walls, with nothing left to water",
    taglineHi: "हमेशा हरी-भरी बालकनी और फीचर वॉल, जिसमें पानी देने की ज़रूरत नहीं",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "Half a day to 1 day for a typical balcony or accent wall",
    whereUsedFirst: "Balconies and terraces — an evergreen look with zero watering or mowing",
  },
]
