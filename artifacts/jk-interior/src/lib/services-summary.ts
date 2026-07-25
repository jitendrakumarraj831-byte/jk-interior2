/**
 * Lightweight service summary — just the fields the homepage "catalogue" teaser
 * (components/services.tsx) needs. Kept separate from services-content.ts (the
 * full bilingual guide with install steps, FAQs, materials, etc.) because that
 * file is ~150KB and services.tsx is rendered eagerly on the homepage; the full
 * detail is only needed on the lazy-loaded /services/:slug page. Values here
 * must stay in sync with the matching record in services-content.ts.
 */

/**
 * One scannable, high-conversion selling point on a service card. Each service
 * shows exactly four — Why It's Special, Transparent Pricing, Time & Warranty,
 * and Best Suited For — written in punchy bilingual sales copy that leads with
 * the customer's real pain point (damp walls, fake materials, endless upkeep).
 */
export interface ServiceHighlight {
  /** Which of the four fixed slots this is — drives the icon/accent in the UI. */
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
  /** The four scannable selling points shown on the catalogue card. */
  highlights: ServiceHighlight[]
}

export const SERVICES_SUMMARY: ServiceSummary[] = [
  {
    slug: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "The dry-room finish that turns a hall into a showpiece — built exactly to the design you bring us",
    taglineHi: "सूखे कमरे की ऐसी फिनिश, जो हॉल को शोपीस बना दे — आप जो भी डिज़ाइन दें, हम बिल्कुल वैसा ही बनाकर देते हैं",
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
        en: "Ditch the old, boring plain roofs! We create seamless, zero-shadow designer ceilings using original Saint-Gobain Gyproc boards and ultra-heavy rust-proof GI framing. Perfect for hiding ugly wires and running premium LED profile lights that make your home look like a 5-star resort.",
        hi: "पुरानी सादी छत को भूल जाइए! हम आपको बनाते हैं बिना किसी जोड़-दरार की खूबसूरत सीलिंग, जिस पर प्रीमियम LED लाइट लगाते हैं। घर का हॉल तुरंत फाइव-स्टार होटल जैसा दिखने लगता है। सब कीचड़ी वाय���िंग छुप जाती है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹70 to ₹150 / sq.ft — 100% final rate: includes premium materials + labour + FREE site measurement.",
        hi: "₹70 से ₹150 प्रति वर्ग फुट — यह आपका आखिरी दाम है। सब कुछ शामिल है—मटीरियल, मजदूरी और बिना कोई खर्च के साइट माप।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Complete transformation in just 2–3 days per room! Backed by a 1-Year Solid Written Warranty against any sagging or cracks.",
        hi: "सिर्फ 2-3 दिन में आपके कमरे की छत बन जाएगी। और हम 1 साल की पक्की लिखित गारंटी देते हैं कि छत लटकेगी नहीं या क्रैक नहीं आएगी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Master bedrooms, luxury living rooms, and main halls where you welcome guests.",
        hi: "आपके हॉल, ड्रॉइंग रूम और मास्टर बेडरूम में—जहाँ मेहमान आते हैं और सीलिंग देखते हैं।",
      },
    ],
  },
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    tagline: "The one we install in more Forbesganj kitchens and bathrooms than anything else",
    taglineHi: "फोर्बेसगंज के ज़्यादातर किचन-बाथरूम में सबसे पहले यही लगाते हैं",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 room in a day, full home in 3–4 days",
    whereUsedFirst: "Kitchens and bathrooms — this is the one ceiling material we never hesitate to recommend here",
    highlights: [
      {
        kind: "special",
        label: "The Ultimate Damp Proof Shield",
        labelHi: "क्यों है सबसे खास",
        en: "The permanent cure for Bihar's heavy dampness and roof leakage! Made with 100% waterproof, fire-retardant, and termite-proof interlocking heavy panels. It never fades, never peels off, and handles the worst monsoon in stride.",
        hi: "बिहार की नमी और छत की टपकन का हमेशा के लिए सलाज़ देते हैं! 100% वॉटरप्रूफ पैनल से बना है, तो कभी भी नमी नहीं आएगी। और दीमक भी नहीं खाएगी। मानसून में भी बिल्कुल सुरक्षित।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹75 to ₹150 / sq.ft — unbeatable wholesale rates across Araria district.",
        hi: "₹75 से ₹150 प्रति वर्ग फुट — पूरे अररिया जिले में सबसे सस्ता और सबसे अच्छा दाम।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Installed in just 1 single day! Zero mess, zero hassle, plus a 1-Year Leak-Proof Written Warranty.",
        hi: "सुबह काम शुरू, शाम तक पूरा हो जाए। सिर्फ 1 दिन में! और 1 साल की पक्की गारंटी कि कहीं लीक नहीं आएगा।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Kitchens, bathrooms, balconies, and any ceiling affected by severe moisture or dampness.",
        hi: "किचन, बाथरूम, बालकनी—यानी जहाँ भी पानी और नमी की समस्या है, वहाँ यही लगवाइए।",
      },
    ],
  },
  {
    slug: "grid-ceiling",
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    tagline: "The commercial standard for offices, shops, and clinics that need serviceable ceilings",
    taglineHi: "ऑफिस, दुकान और क्लिनिक में सबसे ज्यादा लगने वाली सीलिंग",
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
        en: "Give your business the sharp, ultra-professional corporate identity it deserves. Built with lightweight, fire-safe 2x2 mineral fiber tiles on a reinforced iron T-grid layout. It dramatically reduces noise and gives instant access to services above whenever repairs are needed.",
        hi: "अपने बिजनेस को दो प्रोफेशनल लुक दीजिए। 2x2 साइज की स्मार्ट टाइलों से बना है, तो किसी भी समय ऊपर की वायरिंग या AC तक आसानी से पहुँच जा सकते हैं। और शोर भी बहुत कम आता है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹45 to ₹115 / sq.ft — maximum commercial durability at the lowest setup cost.",
        hi: "₹45 से ₹115 प्रति वर्ग फुट — सबसे सस्ता और सबसे टिकाऊ कमर्शियल सीलिंग।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Express commercial execution—covers massive halls in 2–4 days! Includes a 1-Year Structural Warranty.",
        hi: "बड़े से बड़े ऑफिस हॉल में भी 2-4 दिन के अंदर सब काम खत्म। और 1 साल की पक्की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Modern corporate offices, retail showrooms, coaching institutes, hospitals, and clinics.",
        hi: "ऑफिस, दुकान, क्लिनिक, अस्पताल—जहाँ भी कमर्शियल माहौल चाहिए।",
      },
    ],
  },
  {
    slug: "partition-wall",
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    tagline: "Split one room into two without touching the slab or the floor",
    taglineHi: "बिना स्लैब या फर्श छेड़े, एक कमरे को दो हिस्सों में बांट दें",
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
        en: "Need a private office cabin or extra room today? Avoid the headache of brickwork, cement dust, and weeks of drying. We install heavy-duty, double-layered gypsum or sound-insulated glass panels that won't crack.",
        hi: "नया कमरा या प्राइवेट केबिन चाहिए? ईंट-गारे की गंदगी और हफ़्तों के इंतजार से बचिए। हम 2-4 दिन में खड़ी कर देते हैं, और साउंडप्रूफ भी होती है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹750 / sq.ft — fully customized around your choice of premium glass or gypsum framing.",
        hi: "₹100 से ₹750 प्रति वर्ग फुट — जिप्सम या ग्लास, जो आप चाहें। पूरी तरह आपके नाप पर।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Erected and ready to use in just 2–4 days flat! Guaranteed clean, laser-straight installation with a 1-year warranty.",
        hi: "सिर्फ 2-4 दिन में तैयार! बिल्कुल सीधी और साफ लाइन। 1 साल की गारंटी के साथ।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Creating manager cabins, separating billing counters, or setting up a quiet study/pooja space at home.",
        hi: "ऑफिस में केबिन, दुकान में बिलिंग काउंटर, या घर में बच्चों के लिए अलग पढ़ाई का कोना।",
      },
    ],
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
    price: "₹100–₹650/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1 day for a TV wall accent, 2–3 days for a full room",
    whereUsedFirst: "TV wall / accent wall in the living room",
    highlights: [
      {
        kind: "special",
        label: "The Ultra-Premium Wood Aesthetic",
        labelHi: "क्यों है सबसे खास",
        en: "Get the breathtaking, rich texture of expensive natural wooden louvers at 60% less cost! Engineered from high-density Wood-Plastic Composite, these designer panels are entirely waterproof, termite-proof, and won't warp or fade.",
        hi: "असली महँगी सागवान और अखरोट की लकड़ी जैसा लुक, लेकिन 60% कम दाम में। कभी गीली नहीं होगी, दीमक नहीं खाएगी, और 20 साल तक सब-कुछ सही रहेगा।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹650 / sq.ft — a rich, high-end look that completely revalues your property within budget.",
        hi: "₹100 से ₹650 प्रति वर्ग फुट — आपके घर की कीमत बढ़ाने वाली लग्जरी दीवार, आपके बजट में।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "A standard TV feature wall takes just 1 Day to complete! Includes a 1-Year Certified Warp-Proof Warranty.",
        hi: "बस 1 दिन में आपकी TV वॉल तैयार! बाकी के दिनों में TV लगवा सकते हैं। 1 साल की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Living room TV backdrops, main entrance accent walls, and bedroom bedback headers.",
        hi: "हॉल की TV वॉल, मुख्य द्वार, या बेडरूम का हेडबोर्ड—जहाँ सबको दिखे।",
      },
    ],
  },
  {
    slug: "uv-marble-sheet",
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    tagline: "The marble look for pooja rooms and bathroom walls, at a fraction of stone pricing",
    taglineHi: "पूजा घर और बाथरूम की दीवार के लिए मार्बल जैसा लुक, असली पत्थर से बहुत कम दाम में",
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
        en: "Experience the majestic royalty of Italian marble without the extreme weight, wall damage, or massive cost of real stone. Built on a stone-plastic core with a glass-like high-gloss UV-printed finish that never stains, never yellows.",
        hi: "असली मार्बल जैसी राजकीय सुंदरता, लेकिन बिना भारी पत्थर की तोड़-फोड़। शीशे की तरह चमकदार दीवार, जो कभी गंदी नहीं होगी और कभी पीली नहीं पड़ेगी।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹110 to ₹180 / sq.ft — 5-Star hotel elegance at a fraction of real stone pricing.",
        hi: "₹110 से ₹180 प्रति वर्ग फुट — होटल जैसी खूबसूरती, असली पत्थर से दस गुना सस्ती।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Complete luxury makeover in just 1 Day! Comes with a 1-Year Assured Stain-Free and Fade-Proof Warranty.",
        hi: "सुबह काम शुरू, शाम तक दीवार तैयार! सिर्फ 1 दिन, 1 साल की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Royal Pooja room backdrops, luxury dining spaces, executive lobby walls, and TV units.",
        hi: "पूजा घर, बाथरूम, डाइनिंग—जहाँ राजकीय लुक चाहिए।",
      },
    ],
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
    highlights: [
      {
        kind: "special",
        label: "The Elite Entertainment Hub",
        labelHi: "क्यों है सबसे खास",
        en: "Hide the clutter, show the class! Say goodbye to tangled, hanging wires. We custom-engineer sleek entertainment centers tailored to your exact TV, soundbar, and console sizes using wood veneers, premium hinges, and hidden LED backlighting.",
        hi: "लटकते हुए तारों और सेट-टॉप बॉक्स के कबाड़ को हमेशा के लिए छुपा दीजिए। हम आपकी TV के सही नाप पर एक शानदार यूनिट बनाते हैं, जिसमें सब कुछ छुप जाता है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹15,000 to ₹75,000+ per unit — 100% bespoke design shaped around your exact budget and space.",
        hi: "₹15,000 से ₹75,000 रुपये प्रति यूनिट — आपके बजट और दीवार के नाप पर, 100% कस्टम।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Precision engineering and installation in 3–5 days! Includes a 1-Year Warranty on all premium hydraulic hinges and woodwork.",
        hi: "3-5 दिन में तैयार और इंस्टॉल। हिंज और सब कुछ पर 1 साल की गारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "The main accent wall of your family living room or your master bedroom theater setup.",
        hi: "आपके हॉल की सबसे मुख्य सामने वाली दीवार या बेडरूम—जहाँ पूरा परिवार बैठे।",
      },
    ],
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
    highlights: [
      {
        kind: "special",
        label: "The Maintenance-Free Green Oasis",
        labelHi: "क्यों है सबसे खास",
        en: "Bring a refreshing touch of nature right inside your home! Enjoy a lush, high-density green lawn 365 days a year with absolutely zero watering, zero mowing, zero mud, and no insects. Perfect for monsoons and all year round.",
        hi: "साल भर हरी-भरी बालकनी। पानी देने की चिंता नहीं, घास काटने की चिंता नहीं, मानसून में भी बिल्कुल सुरक्षित। और कीड़े-मकोड़े भी नहीं।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹40 to ₹150 / sq.ft — premium heavy-density turf at the most transparent local rates.",
        hi: "₹40 से ₹150 प्रति वर्ग फुट — फोर्बेसगंज-अररिया में सबसे सस्ता प्रीमियम दाम।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Laid out beautifully in just a few hours (half to 1 day)! Backed by a 1-Year Fade-Proof & Shed-Proof Written Warranty.",
        hi: "कुछ ही घंटों में तैयार। 1 साल तक रंग नहीं फीका होगा, घास नहीं झड़ेगी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Balcony floors, open terrace lounges, courtyard seating zones, and creative indoor green features.",
        hi: "बालकनी, छत, सामने का आँगन—जहाँ हरियाली चाहिए बिना मेहनत के।",
      },
    ],
  },
]
