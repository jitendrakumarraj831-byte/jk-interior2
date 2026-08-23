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
  /** Hindi timeline shown on the homepage service section. */
  installTimeHi: string
  whereUsedFirst: string
  /** Hindi "where it fits best" shown on the homepage service section. */
  whereUsedFirstHi: string
  /** Hindi "where NOT to use it" — helps the customer pick the right service. */
  avoidHi: string
  highlights: ServiceHighlight[]
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "Designer gypsum ceilings with cove and LED lighting for halls and bedrooms",
    taglineHi: "हॉल और बेडरूम की छत को शानदार लुक — छुपी LED और Cove लाइट के साथ डिज़ाइनर जिप्सम सीलिंग।",
    badge: "Cove & LED Ready",
    badgeHi: "छुपी LED लाइट के लिए तैयार",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with a cove-lit border in a Forbesganj living room by JK Interior",
    price: "₹75–₹210 / sq.ft",
    installTime: "2-3 Days",
    installTimeHi: "2-3 दिन में तैयार",
    whereUsedFirst: "Living Room & Hall",
    whereUsedFirstHi: "हॉल और बेडरूम",
    avoidHi: "बाथरूम-किचन में नहीं — वहाँ PVC सीलिंग ज़्यादा सही रहती है।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Smooth, seamless finish that hides wiring and carries hidden cove or LED lighting.",
        hi: "बिना जोड़ की एकदम स्मूथ छत — वायरिंग छुप जाए और छुपी LED/Cove लाइट का शानदार लुक मिले।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹75–₹210 / sq.ft (materials + labour). Design and lighting decide the final rate.",
        hi: "₹75–₹210 प्रति वर्ग फुट — मटीरियल और मजदूरी दोनों शामिल, कोई छुपा खर्च नहीं।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Dry rooms — halls, bedrooms, dining areas and office cabins.",
        hi: "सूखी जगहों के लिए बेस्ट — हॉल, बेडरूम, ड्रॉइंग रूम, डाइनिंग और ऑफिस केबिन।",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "Waterproof PVC ceiling for kitchens, bathrooms and damp areas",
    taglineHi: "किचन, बाथरूम और नमी वाली जगहों के लिए 100% वॉटरप्रूफ PVC सीलिंग — बस पोंछो और नई जैसी।",
    badge: "💧 Waterproof",
    badgeHi: "💧 पूरी तरह वॉटरप्रूफ",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Wood-texture PVC false ceiling in a kitchen installed by JK Interior in Bihar",
    price: "₹75–₹150 / sq.ft",
    installTime: "1 Day",
    installTimeHi: "सिर्फ़ 1 दिन में",
    whereUsedFirst: "Kitchen & Bathroom",
    whereUsedFirstHi: "किचन और बाथरूम",
    avoidHi: "कहीं भी चलेगी — बस हॉल के प्रीमियम लुक के लिए लोग जिप्सम भी चुनते हैं।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Sealed panels that handle water, steam and damp — just wipe them clean.",
        hi: "सील पैनल जो पानी, भाप और सीलन झेलें — कभी फूलें नहीं, बस पोंछकर साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹75–₹150 / sq.ft (materials + labour). Panel design and area affect the rate.",
        hi: "₹75–₹150 प्रति वर्ग फुट — मटीरियल और मजदूरी शामिल। सबसे किफ़ायती सीलिंग विकल्प।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Kitchens, bathrooms, balconies and shops.",
        hi: "किचन, बाथरूम, बालकनी और दुकान — हर नमी वाली जगह के लिए परफेक्ट।",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "Removable grid ceiling for offices, shops and clinics with easy service access",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए ग्रिड सीलिंग — वायरिंग-AC तक झट से पहुँच।",
    badge: "⚡ Easy Service Access",
    badgeHi: "⚡ आसान सर्विस एक्सेस",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral-fibre grid ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115 / sq.ft",
    installTime: "1-2 Days",
    installTimeHi: "1-2 दिन में",
    whereUsedFirst: "Offices & Shops",
    whereUsedFirstHi: "ऑफिस और दुकान",
    avoidHi: "घर के हॉल-बेडरूम में लुक के लिहाज़ से कम — वहाँ जिप्सम बेहतर दिखती है।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Lift a single tile to reach the wiring or AC ducts running above.",
        hi: "एक टाइल उठाओ और ऊपर की वायरिंग या AC डक्ट तक सीधी पहुँच — रिपेयर में झंझट नहीं।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹45–₹115 / sq.ft (materials + labour). Tile type decides the rate.",
        hi: "₹45–₹115 प्रति वर्ग फुट — मटीरियल और मजदूरी शामिल। टाइल की क्वालिटी से रेट तय।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Offices, showrooms, clinics and shops.",
        hi: "ऑफिस, शोरूम, क्लिनिक और दुकान — कमर्शियल जगहों के लिए बेस्ट।",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Gypsum and glass partitions to divide a space without brickwork",
    taglineHi: "बिना ईंट-सीमेंट, बिना तोड़-फोड़ के जगह को दो हिस्सों में बाँटें — जिप्सम या ग्लास पार्टीशन।",
    badge: "🧱 Dry, Low-Mess Work",
    badgeHi: "🧱 बिना तोड़-फोड़, कम धूल",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750 / sq.ft",
    installTime: "2-4 Days",
    installTimeHi: "2-4 दिन में",
    whereUsedFirst: "Office Cabins",
    whereUsedFirstHi: "ऑफिस केबिन और कमरा बँटवारा",
    avoidHi: "भारी सामान टाँगने वाली मुख्य दीवार के लिए नहीं — यह हल्की दीवार है।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Gypsum or toughened-glass panels on a metal frame, finished clean and straight.",
        hi: "मेटल फ्रेम पर जिप्सम या टफन्ड ग्लास पैनल — एकदम साफ, सीधी और मज़बूत फिनिश।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹100–₹750 / sq.ft. Gypsum or glass choice decides the rate.",
        hi: "₹100–₹750 प्रति वर्ग फुट — जिप्सम सस्ता, ग्लास प्रीमियम। आपकी पसंद से रेट तय।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Office cabins, reception areas and room dividers.",
        hi: "ऑफिस केबिन, रिसेप्शन और एक कमरे को दो में बाँटने के लिए।",
      },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    tagline: "Wood-look WPC panels for TV walls and feature walls",
    taglineHi: "TV वॉल और फीचर वॉल के लिए लकड़ी जैसे शानदार WPC पैनल — दीमक और नमी से पूरी सुरक्षा।",
    badge: "🪵 Wood-Look Finish",
    badgeHi: "🪵 असली लकड़ी जैसा लुक",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel behind a TV, installed by JK Interior in Bihar",
    price: "₹180–₹650 / sq.ft",
    installTime: "1 Day",
    installTimeHi: "सिर्फ़ 1 दिन में",
    whereUsedFirst: "TV Accent Wall",
    whereUsedFirstHi: "TV और फीचर वॉल",
    avoidHi: "छत पर नहीं — छत के लिए PVC या जिप्सम सीलिंग लगवाएँ।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Warm wood-look panels that resist moisture and termites — wipe clean, no polish.",
        hi: "गर्म वुड-लुक पैनल जो नमी और दीमक झेलें — न पॉलिश की झंझट, बस पोंछकर साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹180–₹650 / sq.ft (materials + labour). Profile and design affect the rate.",
        hi: "₹180–₹650 प्रति वर्ग फुट — मटीरियल और मजदूरी शामिल। प्रोफाइल और डिज़ाइन से रेट तय।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room TV walls, accent walls and receptions.",
        hi: "हॉल की TV वॉल, बेडरूम की हेडबोर्ड वॉल और ऑफिस रिसेप्शन के लिए।",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "Glossy marble-look sheets for pooja rooms, bathrooms and feature walls",
    taglineHi: "पूजा घर, बाथरूम और फीचर वॉल के लिए चमकदार मार्बल-लुक शीट — असली मार्बल से आधी कीमत में।",
    badge: "💎 Marble-Look Finish",
    badgeHi: "💎 चमकदार मार्बल लुक",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a bathroom by JK Interior",
    price: "₹45–₹120 / sq.ft",
    installTime: "1-2 Days",
    installTimeHi: "1-2 दिन में",
    whereUsedFirst: "Pooja Room & Bathrooms",
    whereUsedFirstHi: "पूजा घर और बाथरूम",
    avoidHi: "गैस चूल्हे के पास या ज़्यादा गर्मी वाली जगह पर नहीं।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Seamless marble-look wall with no grout lines — waterproof and easy to wipe.",
        hi: "बिना जोड़ की मार्बल-लुक दीवार — वॉटरप्रूफ, चमकदार और पोंछकर साफ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹45–₹120 / sq.ft (materials + labour). Print and thickness affect the rate.",
        hi: "₹45–₹120 प्रति वर्ग फुट — मटीरियल और मजदूरी शामिल। असली मार्बल से कहीं सस्ता।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Pooja rooms, bathroom walls and feature walls.",
        hi: "पूजा घर, बाथरूम की दीवार और घर की फीचर वॉल के लिए।",
      },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    tagline: "Custom TV units built to your wall with concealed cable management",
    taglineHi: "आपकी दीवार की नाप पर बनी कस्टम TV यूनिट — तार छुपे हुए और LED बैकलाइट का लुक।",
    badge: "🔌 Concealed Wiring",
    badgeHi: "🔌 छुपी हुई वायरिंग",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+",
    installTime: "3-5 Days",
    installTimeHi: "3-5 दिन में",
    whereUsedFirst: "Living Room Wall",
    whereUsedFirstHi: "लिविंग रूम की दीवार",
    avoidHi: "सीलन वाली दीवार पर सीधे नहीं — पहले वॉटरप्रूफिंग ज़रूरी।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Built to your exact wall size, with cables routed inside and optional LED backlight.",
        hi: "आपकी दीवार की सही नाप पर बनी — तार अंदर छुपे और शानदार LED बैकलाइट के साथ।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹15,000 onwards. Size, finish and storage decide the final price.",
        hi: "₹15,000 से शुरू — साइज़, फिनिश और स्टोरेज के हिसाब से कीमत तय होती है।",
      },
      {
        kind: "suited",
        label: "Best For",
        labelHi: "कहाँ लगेगा",
        en: "Living room and bedroom TV walls.",
        hi: "हॉल और बेडरूम की TV वॉल के लिए बेस्ट।",
      },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    tagline: "Low-maintenance artificial grass for balconies and terraces",
    taglineHi: "बालकनी और टैरेस के लिए हमेशा हरी रहने वाली घास — न पानी, न कटाई, न रख-रखाव।",
    badge: "🌿 Low Maintenance",
    badgeHi: "🌿 ज़ीरो रख-रखाव",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass laid on a balcony floor by JK Interior in Bihar",
    price: "₹40–₹150 / sq.ft",
    installTime: "Few Hours",
    installTimeHi: "कुछ ही घंटों में",
    whereUsedFirst: "Balconies & Terraces",
    whereUsedFirstHi: "बालकनी और टैरेस",
    avoidHi: "घर के अंदर मुख्य फर्श के लिए नहीं — बालकनी, टैरेस और डेकोर के लिए बेस्ट।",
    highlights: [
      {
        kind: "special",
        label: "Feature",
        labelHi: "खासियत",
        en: "Stays green with no watering or mowing, and monsoon water drains straight through.",
        hi: "बिना पानी और कटाई हमेशा हरी — मानसून का पानी सीधे नीचे निकल जाए।",
      },
      {
        kind: "pricing",
        label: "Price",
        labelHi: "रेट",
        en: "₹40–₹150 / sq.ft (materials + labour). Pile density decides the rate.",
        hi: "₹40–₹150 प्रति वर्ग फुट — मटीरियल और मजदूरी शामिल। घास की मोटाई से रेट तय।",
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
