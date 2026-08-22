export interface ServiceHighlight {
  kind: "special" | "pricing" | "warranty" | "suited"
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
    tagline: "The dry-room finish that turns a hall into a showpiece — built exactly to the design you bring us",
    taglineHi: "सूखे कमरे की ऐसी फिनिश, जो हॉल को शोपीस बना दे",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    price: "₹70–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    whereUsedFirst: "Living room / hall — the room every guest sees first",
    highlights: [
      {
        kind: "special",
        label: "The Luxury Upgrade",
        labelHi: "क्यों है सबसे खास",
        en: "Seamless designer ceilings using original Saint-Gobain boards and rust-proof GI framing. Perfect for hidden LED profile lights.",
        hi: "बिना जोड़-दरार की खूबसूरत सीलिंग, प्रीमियम LED लाइट के साथ जो हॉल को फाइव-स्टार लुक दे।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹70 to ₹150 / sq.ft — includes premium materials, labour, and free measurement.",
        hi: "₹70 से ₹150 प्रति वर्ग फुट — मटीरियल और मजदूरी सब शामिल।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Completed in 2–3 days per room with a 1-year written warranty against sagging or cracks.",
        hi: "सिर्फ 2-3 दिन में तैयार। 1 साल की पक्की लिखित गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Master bedrooms, luxury living rooms, and main halls.",
        hi: "ड्रॉइंग रूम और मास्टर बेडरूम जहाँ मेहमान आते हैं।",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "The one we install in more Forbesganj kitchens and bathrooms than anything else",
    taglineHi: "फोर्बेसगंज के किचन-बाथरूम के लिए सबसे बेस्ट",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 room in a day, full home in 3–4 days",
    whereUsedFirst: "Kitchens and bathrooms",
    highlights: [
      {
        kind: "special",
        label: "The Ultimate Damp Proof Shield",
        labelHi: "क्यों है सबसे खास",
        en: "100% waterproof, fire-retardant, and termite-proof interlocking panels. Perfect for monsoon dampness.",
        hi: "100% वॉटरप्रूफ और दीमक-मुक्त पैनल। नमी और टपकन का पक्का समाधान।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹75 to ₹150 / sq.ft — best wholesale rates across Araria district.",
        hi: "₹75 से ₹150 प्रति वर्ग फुट — अररिया जिले में सबसे किफायती दाम।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Installed in just 1 single day with a 1-year leak-proof written warranty.",
        hi: "सिर्फ 1 दिन में फिटिंग! 1 साल की लीकेज-प्रूफ गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Kitchens, bathrooms, and moisture-prone balconies.",
        hi: "किचन, बाथरूम और नमी वाली जगहों के लिए।",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "The commercial standard for offices, shops, and clinics that need serviceable ceilings",
    taglineHi: "ऑफिस और दुकानों के लिए स्मार्ट ग्रिड सीलिंग",
    heroImage: "/images/grid.webp",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1–2 days for a standard room, 3–4 days for a larger office/shop floor",
    whereUsedFirst: "Offices, corporate cabins, and coworking spaces",
    highlights: [
      {
        kind: "special",
        label: "The Corporate Elite Standard",
        labelHi: "क्यों है सबसे खास",
        en: "Lightweight, fire-safe 2x2 mineral fiber tiles with instant access to wiring and services above.",
        hi: "2x2 साइज की स्मार्ट टाइलें, जिससे ऊपर की वायरिंग या AC तक पहुँचना बेहद आसान हो।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹45 to ₹115 / sq.ft — maximum commercial durability at the lowest setup cost.",
        hi: "₹45 से ₹115 प्रति वर्ग फुट — कम खर्चे में सबसे मजबूत कमर्शियल सीलिंग।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Covers massive commercial halls in 2–4 days with a 1-year structural warranty.",
        hi: "बड़े हॉल का काम 2-4 दिन में पूरा। 1 साल की स्ट्रक्चरल गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Modern corporate offices, retail showrooms, and clinics.",
        hi: "ऑफिस, दुकान, क्लिनिक और कमर्शियल स्पेस के लिए।",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Split one room into two without touching the slab or the floor",
    taglineHi: "बिना तोड़फोड़, एक कमरे को दो हिस्सों में बांटें",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    installTime: "2–4 days depending on wall length and whether it's gypsum or glass",
    whereUsedFirst: "Office cabins carved out of one open floor",
    highlights: [
      {
        kind: "special",
        label: "Instant Room Creation",
        labelHi: "क्यों है सबसे खास",
        en: "Heavy-duty double-layered gypsum or sound-insulated glass panels without brickwork mess.",
        hi: "ईंट-गारे की गंदगी के बिना, मजबूत जिप्सम या साउंडप्रूफ ग्लास से तुरंत नया केबिन तैयार।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹750 / sq.ft — fully customized around your choice of glass or gypsum.",
        hi: "₹100 से ₹750 प्रति वर्ग फुट — आपकी पसंद और नाप के अनुसार।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Erected in just 2–4 days with clean laser-straight finish and 1-year warranty.",
        hi: "सिर्फ 2-4 दिन में तैयार। बिल्कुल सीधी फिनिश और 1 साल की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Manager cabins, billing counters, or home study spaces.",
        hi: "ऑफिस केबिन, काउंटर या घर में स्टडी रूम बनाने के लिए।",
      },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    tagline: "Real-wood look for a TV wall at roughly 60% of what timber panelling costs",
    taglineHi: "असली लकड़ी जैसा लुक, बहुत कम कीमत में",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    price: "₹100–₹650/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 day for a TV wall accent, 2–3 days for a full room",
    whereUsedFirst: "TV wall / accent wall in the living room",
    highlights: [
      {
        kind: "special",
        label: "The Ultra-Premium Wood Aesthetic",
        labelHi: "क्यों है सबसे खास",
        en: "Rich wooden louver texture at 60% less cost. 100% waterproof, termite-proof, and fade-proof.",
        hi: "महंगी लकड़ी जैसा खूबसूरत लुक, 60% कम दाम में। वॉटरप्रूफ और दीमक-मुक्त।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹650 / sq.ft — high-end luxury look that fits right into your budget.",
        hi: "₹100 से ₹650 प्रति वर्ग फुट — बजट में शानदार लग्जरी दीवार।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Standard TV feature wall completed in just 1 day with 1-year warp-proof warranty.",
        hi: "सिर्फ 1 दिन में TV वॉल तैयार। 1 साल की पक्की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Living room TV backdrops, main entrance walls, and bedback headers.",
        hi: "हॉल की TV वॉल, मुख्य द्वार और बेडरूम के हेडबोर्ड के लिए।",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "The marble look for pooja rooms and bathroom walls, at a fraction of stone pricing",
    taglineHi: "पूजा घर और बाथरूम के लिए मार्बल जैसा लुक",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    price: "₹110–₹180/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1–2 days per room",
    whereUsedFirst: "Bathroom walls — no grout lines to blacken with mould, unlike tiles",
    highlights: [
      {
        kind: "special",
        label: "The Royal Mirror-Gloss Finish",
        labelHi: "क्यों है सबसे खास",
        en: "Italian marble look without heavy stone weight. Glass-like high-gloss finish that never stains.",
        hi: "असली मार्बल जैसी चमक, बिना भारी पत्थर के वजन के। कभी दाग नहीं लगते।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹110 to ₹180 / sq.ft — 5-star elegance at a fraction of real stone cost.",
        hi: "₹110 से ₹180 प्रति वर्ग फुट — असली पत्थर से बहुत कम खर्च में होटल जैसा लुक।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Complete luxury makeover in 1 day with 1-year stain and fade-proof warranty.",
        hi: "सिर्फ 1 दिन में शानदार मेकओवर। 1 साल की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Pooja room backdrops, luxury dining spaces, and bathroom walls.",
        hi: "पूजा घर, बाथरूम और डाइनिंग एरिया की दीवारों के लिए।",
      },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    tagline: "Built to your wall's exact width — not cut down from a catalogue template",
    taglineHi: "आपकी दीवार की सही नाप पर कस्टमाइज्ड यूनिट",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    installTime: "3–5 days depending on size and design complexity",
    whereUsedFirst: "Living rooms — the focal wall opposite the main seating",
    highlights: [
      {
        kind: "special",
        label: "The Elite Entertainment Hub",
        labelHi: "क्यों है सबसे खास",
        en: "Hide tangled wires completely. Custom-built entertainment center tailored to your TV and soundbar sizes.",
        hi: "लटकते तारों का झंझट खत्म। आपकी TV और साउंडबार के नाप पर बनी शानदार यूनिट।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹15,000 to ₹75,000+ per unit — 100% bespoke design shaped around your budget.",
        hi: "₹15,000 से ₹75,000+ प्रति यूनिट — आपके बजट और स्पेस के अनुसार।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Installed in 3–5 days with a 1-year warranty on premium hinges and woodwork.",
        hi: "3-5 दिन में फिटिंग पूरी। हिंज और लकड़ी पर 1 साल की पक्की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Living room main accent wall or master bedroom theater setup.",
        hi: "हॉल की मुख्य दीवार या बेडरूम के लिए।",
      },
    ],
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    tagline: "Evergreen balconies and feature walls, with nothing left to water",
    taglineHi: "हमेशा हरी-भरी बालकनी, बिना पानी दिए",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "Half a day to 1 day for a typical balcony or accent wall",
    whereUsedFirst: "Balconies and terraces — an evergreen look with zero watering or mowing",
    highlights: [
      {
        kind: "special",
        label: "The Maintenance-Free Green Oasis",
        labelHi: "क्यों है सबसे खास",
        en: "Lush green lawn 365 days a year with zero watering, zero mowing, and no mud.",
        hi: "साल भर हरी-भरी घास। न पानी देने का झंझट, न कीचड़, हमेशा साफ-सुथरी।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹40 to ₹150 / sq.ft — premium heavy-density turf at transparent local rates.",
        hi: "₹40 से ₹150 प्रति वर्ग फुट — सबसे किफायती और बेहतरीन क्वालिटी।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Installed in just a few hours with a 1-year fade-proof and shed-proof warranty.",
        hi: "चंद घंटों में तैयार। 1 साल तक रंग फीका नहीं होगा और घास नहीं निकलेगी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Balcony floors, terrace lounges, and indoor green features.",
        hi: "बालकनी, छत और घर के अंदर हरियाली के लिए।",
      },
    ],
  },
]

