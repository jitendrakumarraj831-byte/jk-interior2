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
    tagline: "Give your living room a breathtaking palace-like royal finish",
    taglineHi: "हॉल को बनाएं ऐसा आलीशान, कि देखते ही लोग तारीफ करें",
    badge: "✨ 5-Star Luxury Look",
    badgeHi: "✨ VIP रॉयल लुक",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    price: "₹70–₹150 / sq.ft",
    installTime: "2-3 Days",
    whereUsedFirst: "Living Room & Hall",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Seamless designer ceiling with hidden LED profile lights.",
        hi: "छिपी हुई LED लाइट के साथ बिना जोड़ की खूबसूरत सीलिंग।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹70 - ₹150 / sq.ft (Materials + Labour included)",
        hi: "₹70 - ₹150 प्रति वर्ग फुट (मटीरियल और मजदूरी शामिल)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Master bedrooms and luxury halls.",
        hi: "बेडरूम और ड्रॉइंग रूम के लिए।",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "Permanent freedom from roof leakage, dampness, and humidity",
    taglineHi: "छत की सीलन और पानी टपकने की समस्या से हमेशा के लिए छुटकारा",
    badge: "💧 100% Waterproof",
    badgeHi: "💧 100% वॉटरप्रूफ",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    price: "₹75–₹150 / sq.ft",
    installTime: "1 Day",
    whereUsedFirst: "Kitchen & Bathroom",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "100% waterproof and termite-proof panels.",
        hi: "100% वॉटरप्रूफ और दीमक-मुक्त पैनल।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹75 - ₹150 / sq.ft (Best wholesale rate)",
        hi: "₹75 - ₹150 प्रति वर्ग फुट (सबसे किफायती दाम)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Kitchens, bathrooms, and balconies.",
        hi: "किचन, बाथरूम और बालकनी के लिए।",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "Professional business look with zero hassle maintenance",
    taglineHi: "ऑफिस और दुकान के लिए सबसे टिकाऊ और स्मार्ट सीलिंग",
    badge: "⚡ Easy Wiring Access",
    badgeHi: "⚡ आसान वायरिंग एक्सेस",
    heroImage: "/images/grid.webp",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115 / sq.ft",
    installTime: "1-2 Days",
    whereUsedFirst: "Offices & Shops",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Easy access to wiring and AC ducts above.",
        hi: "ऊपर की वायरिंग और AC तक आसान पहुँच।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹45 - ₹115 / sq.ft (Low commercial cost)",
        hi: "₹45 - ₹115 प्रति वर्ग फुट (कम खर्च में मजबूत)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Offices, showrooms, and clinics.",
        hi: "ऑफिस, दुकान और क्लिनिक के लिए।",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Create a brand new premium cabin in just hours without breaking walls",
    taglineHi: "बिना ईंट तोड़े, कुछ ही घंटों में नया केबिन या कमरा तैयार",
    badge: "🧱 Zero Mess Cabin",
    badgeHi: "🧱 बिना तोड़फोड़ नया केबिन",
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
        en: "Heavy-duty gypsum or glass panels.",
        hi: "मजबूत जिप्सम बोर्ड या ग्लास पैनल।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹100 - ₹750 / sq.ft (As per material choice)",
        hi: "₹100 - ₹750 प्रति वर्ग फुट (पसंद के अनुसार)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Office cabins and billing counters.",
        hi: "ऑफिस केबिन और काउंटर के लिए।",
      },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    tagline: "Turn boring plain walls into jaw-dropping designer wooden masterpieces",
    taglineHi: "सादी दीवारों को दें एकदम स्टाइलिश और मॉडर्न लकड़ी वाला लुक",
    badge: "🪵 Premium Wood Look",
    badgeHi: "🪵 शानदार वुडन लुक",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    price: "₹100–₹650 / sq.ft",
    installTime: "1 Day",
    whereUsedFirst: "TV Accent Wall",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "100% waterproof and termite-proof louvers.",
        hi: "100% वॉटरप्रूफ और दीमक-मुक्त डिजाइनर पैनल।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹100 - ₹650 / sq.ft (Budget luxury)",
        hi: "₹100 - ₹650 प्रति वर्ग फुट (बजट में लग्जरी)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room TV walls and entrances.",
        hi: "हॉल की TV वॉल और मुख्य दरवाजे के पास।",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "Get high-end Italian marble shine at a fraction of the cost",
    taglineHi: "कम खर्च में असली मार्बल जैसी चमक और शाही सजावट",
    badge: "💎 Glossy Marble Finish",
    badgeHi: "💎 चमकता मार्बल फिनिश",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    price: "₹110–₹180 / sq.ft",
    installTime: "1-2 Days",
    whereUsedFirst: "Pooja Room & Bathrooms",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "High-gloss mirror finish, stain-free.",
        hi: "शीशे जैसी चमक, दाग-मुक्त सतह।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹110 - ₹180 / sq.ft (Affordable stone look)",
        hi: "₹110 - ₹180 प्रति वर्ग फुट (कम खर्च में मार्बल लुक)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Pooja rooms and feature walls.",
        hi: "पूजा घर और स्पेशल दीवारों के लिए।",
      },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    tagline: "A stylish entertainment hub with zero messy hanging wires",
    taglineHi: "लटकते तारों के झंझट से आज़ाद, आपकी दीवार पर फिट शानदार यूनिट",
    badge: "🔌 Zero Tangled Wires",
    badgeHi: "🔌 तारों का झंझट खत्म",
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
        en: "Concealed wiring with customized LED lighting.",
        hi: "छुपे हुए तार और शानदार LED लाइटिंग।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹15,000+ onwards (As per design)",
        hi: "₹15,000 से शुरू (डिजाइन और साइज के अनुसार)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room and bedroom accent walls.",
        hi: "हॉल या बेडरूम की मुख्य दीवार के लिए।",
      },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    tagline: "Lush green natural garden feel on your balcony with zero watering",
    taglineHi: "बिना पानी दिए आपकी बालकनी हमेशा रहेगी हरी-भरी और ताजी",
    badge: "🌿 Zero Maintenance",
    badgeHi: "🌿 बिना रख-रखाव हमेशा हरी",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    price: "₹40–₹150 / sq.ft",
    installTime: "Few Hours",
    whereUsedFirst: "Balconies & Terraces",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Zero watering, zero mowing, mud-free.",
        hi: "न पानी देना है, न घास काटनी है, हमेशा साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹40 - ₹150 / sq.ft (Heavy density turf)",
        hi: "₹40 - ₹150 प्रति वर्ग फुट (घनी और मजबूत घास)",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Balconies and open terraces.",
        hi: "बालकनी और छत के फर्श के लिए।",
      },
    ],
  },
]

