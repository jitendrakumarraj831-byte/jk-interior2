export interface ServiceHighlight {
  kind: "special" | "pricing" | "suited"
  label: string
  labelHi: string
  en: string
  hi: string
}

export interface ServiceSummary {
  slug: string
  name: string
  nameHi: string
  category: string
  tagline: string
  taglineHi: string
  badge: string
  badgeHi: string
  heroImage: string
  heroImageAlt: string
  price: string
  installTime: string
  whereUsedFirst: string
  highlights: ServiceHighlight[]
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "Designer gypsum ceilings with cove and LED lighting for halls and bedrooms",
    taglineHi: "हॉल और बेडरूम के लिए Cove और LED लाइटिंग वाली डिज़ाइनर जिप्सम सीलिंग",
    badge: "Cove & LED Ready",
    badgeHi: "Cove और LED के लिए तैयार",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with a cove-lit border in a Forbesganj living room by JK Interior",
    price: "₹75–₹210 / sq.ft",
    installTime: "2-3 Days",
    whereUsedFirst: "Living Room & Hall",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Smooth, seamless finish that hides wiring and carries hidden cove or LED lighting.",
        hi: "बिना जोड़ की स्मूथ फिनिश, जो वायरिंग छुपाए और छिपी Cove या LED लाइट संभाले।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹75–₹210 / sq.ft (materials + labour). Design and lighting decide the final rate.",
        hi: "₹75–₹210 प्रति वर्ग फुट (मटीरियल + मजदूरी)। डिज़ाइन और लाइटिंग से असली रेट तय होता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Dry rooms — halls, bedrooms, dining areas and office cabins.",
        hi: "सूखे कमरे — हॉल, बेडरूम, डाइनिंग एरिया और ऑफिस केबिन।",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "Waterproof PVC ceiling for kitchens, bathrooms and damp areas",
    taglineHi: "किचन, बाथरूम और नमी वाली जगहों के लिए वॉटरप्रूफ PVC सीलिंग",
    badge: "💧 Waterproof",
    badgeHi: "💧 वॉटरप्रूफ",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Wood-texture PVC false ceiling in a kitchen installed by JK Interior in Bihar",
    price: "₹75–₹150 / sq.ft",
    installTime: "1 Day",
    whereUsedFirst: "Kitchen & Bathroom",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Sealed panels that handle water, steam and damp — just wipe them clean.",
        hi: "सील पैनल, जो पानी, भाप और सीलन झेलें — बस पोंछकर साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹75–₹150 / sq.ft (materials + labour). Panel design and area affect the rate.",
        hi: "₹75–₹150 प्रति वर्ग फुट (मटीरियल + मजदूरी)। पैनल डिज़ाइन और एरिया से रेट बदलता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Kitchens, bathrooms, balconies and shops.",
        hi: "किचन, बाथरूम, बालकनी और दुकान के लिए।",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "Removable grid ceiling for offices, shops and clinics with easy service access",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए ग्रिड सीलिंग — वायरिंग तक आसान पहुँच",
    badge: "⚡ Easy Service Access",
    badgeHi: "⚡ आसान सर्विस एक्सेस",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral-fibre grid ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115 / sq.ft",
    installTime: "1-2 Days",
    whereUsedFirst: "Offices & Shops",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Lift a single tile to reach the wiring or AC ducts running above.",
        hi: "एक टाइल उठाकर ऊपर की वायरिंग या AC डक्ट तक पहुँच।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹45–₹115 / sq.ft (materials + labour). Tile type decides the rate.",
        hi: "₹45–₹115 प्रति वर्ग फुट (मटीरियल + मजदूरी)। टाइल के प्रकार से रेट तय होता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Offices, showrooms, clinics and shops.",
        hi: "ऑफिस, शोरूम, क्लिनिक और दुकान के लिए।",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Gypsum and glass partitions to divide a space without brickwork",
    taglineHi: "बिना ईंट-सीमेंट के जगह बाँटने के लिए जिप्सम और ग्लास पार्टीशन",
    badge: "🧱 Dry, Low-Mess Work",
    badgeHi: "🧱 बिना तोड़-फोड़, कम धूल",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750 / sq.ft",
    installTime: "2-4 Days",
    whereUsedFirst: "Office Cabins",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Gypsum or toughened-glass panels on a metal frame, finished clean and straight.",
        hi: "मेटल फ्रेम पर जिप्सम या टफन्ड ग्लास पैनल, साफ और सीधी फिनिश।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹100–₹750 / sq.ft. Gypsum or glass choice decides the rate.",
        hi: "₹100–₹750 प्रति वर्ग फुट। जिप्सम या ग्लास की पसंद से रेट तय होता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Office cabins, reception areas and room dividers.",
        hi: "ऑफिस केबिन, रिसेप्शन और कमरा बाँटने के लिए।",
      },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    tagline: "Wood-look WPC panels for TV walls and feature walls",
    taglineHi: "TV वॉल और फीचर वॉल के लिए लकड़ी जैसे WPC पैनल",
    badge: "🪵 Wood-Look Finish",
    badgeHi: "🪵 वुड-लुक फिनिश",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel behind a TV, installed by JK Interior in Bihar",
    price: "₹180–₹650 / sq.ft",
    installTime: "1 Day",
    whereUsedFirst: "TV Accent Wall",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Warm wood-look panels that resist moisture and termites — wipe clean, no polish.",
        hi: "गर्म वुड-लुक पैनल, जो नमी और दीमक झेलें — पोंछकर साफ, पॉलिश नहीं।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹180–₹650 / sq.ft (materials + labour). Profile and design affect the rate.",
        hi: "₹180–₹650 प्रति वर्ग फुट (मटीरियल + मजदूरी)। प्रोफाइल और डिज़ाइन से रेट बदलता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room TV walls, accent walls and receptions.",
        hi: "हॉल की TV वॉल, एक्सेंट वॉल और रिसेप्शन के लिए।",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "Glossy marble-look sheets for pooja rooms, bathrooms and feature walls",
    taglineHi: "पूजा घर, बाथरूम और फीचर वॉल के लिए चमकदार मार्बल-लुक शीट",
    badge: "💎 Marble-Look Finish",
    badgeHi: "💎 मार्बल-लुक फिनिश",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a bathroom by JK Interior",
    price: "₹45–₹120 / sq.ft",
    installTime: "1-2 Days",
    whereUsedFirst: "Pooja Room & Bathrooms",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Seamless marble-look wall with no grout lines — waterproof and easy to wipe.",
        hi: "बिना ग्राउट लाइन की मार्बल-लुक दीवार — वॉटरप्रूफ और पोंछकर साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹45–₹120 / sq.ft (materials + labour). Print and thickness affect the rate.",
        hi: "₹45–₹120 प्रति वर्ग फुट (मटीरियल + मजदूरी)। प्रिंट और मोटाई से रेट बदलता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Pooja rooms, bathroom walls and feature walls.",
        hi: "पूजा घर, बाथरूम की दीवार और फीचर वॉल के लिए।",
      },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    tagline: "Custom TV units built to your wall with concealed cable management",
    taglineHi: "आपकी दीवार की नाप पर बनी TV यूनिट, छुपी केबल मैनेजमेंट के साथ",
    badge: "🔌 Concealed Wiring",
    badgeHi: "🔌 छुपी वायरिंग",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+",
    installTime: "3-5 Days",
    whereUsedFirst: "Living Room Wall",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Built to your exact wall size, with cables routed inside and optional LED backlight.",
        hi: "आपकी दीवार की सही नाप पर, तार अंदर से रूट और वैकल्पिक LED बैकलाइट के साथ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹15,000 onwards. Size, finish and storage decide the final price.",
        hi: "₹15,000 से शुरू। साइज़, फिनिश और स्टोरेज से कीमत तय होती है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room and bedroom TV walls.",
        hi: "हॉल और बेडरूम की TV वॉल के लिए।",
      },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    tagline: "Low-maintenance artificial grass for balconies and terraces",
    taglineHi: "बालकनी और टैरेस के लिए कम रख-रखाव वाली आर्टिफिशियल घास",
    badge: "🌿 Low Maintenance",
    badgeHi: "🌿 कम रख-रखाव",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass laid on a balcony floor by JK Interior in Bihar",
    price: "₹40–₹150 / sq.ft",
    installTime: "Few Hours",
    whereUsedFirst: "Balconies & Terraces",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Stays green with no watering or mowing, and monsoon water drains straight through.",
        hi: "बिना पानी या कटाई हरी रहे, और मानसून का पानी सीधे नीचे निकल जाए।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹40–₹150 / sq.ft (materials + labour). Pile density decides the rate.",
        hi: "₹40–₹150 प्रति वर्ग फुट (मटीरियल + मजदूरी)। पाइल डेंसिटी से रेट तय होता है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Balconies, terraces and green feature walls.",
        hi: "बालकनी, टैरेस और ग्रीन फीचर वॉल के लिए।",
      },
    ],
  },
]
