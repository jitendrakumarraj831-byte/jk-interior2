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
        hi: "साधारण और पुरानी छत को भूल जाइए! हम आपके घर को देते हैं बिना किसी क्रैक या जॉइंट वाली फाइव-स्टार होटल जैसी सीमलेस फिनिश। असली सेंट-गोबैन (Saint-Gobain) जिप्सम बोर्ड और जंग-रहित हैवी फ्रेम का इस्तेमाल, जो कंसील्ड LED लाइट्स और फैंसी कोव डिज़ाइन्स को दे एक आलीशान लुक।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹70 to ₹150 / sq.ft — 100% final rate: includes premium materials + labour + FREE site measurement.",
        hi: "₹70 से ₹150 / sq.ft — मटीरियल + मजदूरी + फ्री नाप-जोख सब शामिल।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Complete transformation in just 2–3 days per room! Backed by a 1-Year Solid Written Warranty against any sagging or cracks.",
        hi: "सिर्फ 2 से 3 दिन में आपके कमरे की छत तैयार! सीलिंग लटकने या क्रैक आने पर 1 साल की पक्की लिखित वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Master bedrooms, luxury living rooms, and main halls where you welcome guests.",
        hi: "आपका लिविंग रूम, मुख्य हॉल और बेडरूम—जहाँ कदम रखते ही मेहमान बोल उठें “वाह!”",
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
        en: "The permanent cure for Bihar's heavy dampness and roof leakage! Made with 100% waterproof, fire-retardant, and termite-proof interlocking heavy panels. It never fades, never peels off, and completely eliminates the need for painting or plastering for a lifetime.",
        hi: "सीलन, पपड़ी और टपकती छतों का हमेशा के लिए खात्मा! 100% वॉटरप्रूफ, दीमक-रहित और फायर-रिटार्डेंट हैवी इंटरलॉकिंग पैनल्स, जिन्हें न कभी पेंट कराने का झंझट है और न ही मेंटेनेंस का रोना। सालों-साल चमकेगी बिल्कुल नए जैसी।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹75 to ₹150 / sq.ft — unbeatable wholesale rates across Araria district.",
        hi: "₹75 से ₹150 / sq.ft — पूरे अररिया जिले में सबसे किफायती और मजबूत डील।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Installed in just 1 single day! Zero mess, zero hassle, plus a 1-Year Leak-Proof Written Warranty.",
        hi: "सुबह काम शुरू, शाम तक काम खत्म—मात्र 1 दिन में! 1 साल की नो-टेंशन पक्की लिखित वारंटी के साथ।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Kitchens, bathrooms, balconies, and any ceiling affected by severe moisture or dampness.",
        hi: "आपका किचन, बाथरूम, बालकनी और घर की वो छतें जहाँ सीलन ने सब खराब कर रखा हो।",
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
        en: "Give your business the sharp, ultra-professional corporate identity it deserves. Built with lightweight, fire-safe 2x2 mineral fiber tiles on a reinforced iron T-grid layout. It dramatically cuts down room echo and allows your staff to access hidden wiring or AC vents in seconds.",
        hi: "आपके बिजनेस, दुकान या ऑफिस को दे एक इंटरनेशनल कॉरपोरेट लुक। 2x2 साइज के फायर-सेफ मिनरल फाइबर पैनल्स और मजबूत टी-ग्रिड फ्रेम से ऑफिस की गूंज (Echo) कम होती है और फॉल्ट होने पर वायरिंग की मरम्मत करना चुटकियों का काम बन जाता है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹45 to ₹115 / sq.ft — maximum commercial durability at the lowest setup cost.",
        hi: "₹45 से ₹115 / sq.ft — सबसे कम खर्च में सबसे टिकाऊ कमर्शियल छत।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Express commercial execution—covers massive halls in 2–4 days! Includes a 1-Year Structural Warranty.",
        hi: "बड़े से बड़े कमर्शियल हॉल में भी मात्र 2–4 दिन के भीतर सुपर-फास्ट फिटिंग! 1 साल की पक्की ढांचागत वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Modern corporate offices, retail showrooms, coaching institutes, hospitals, and clinics.",
        hi: "आधुनिक कॉर्पोरेट ऑफिस, दुकानें, बड़े शोरूम, कोचिंग संस्थान और मेडिकल क्लीनिक।",
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
        en: "Need a private office cabin or extra room today? Avoid the headache of brickwork, cement dust, and weeks of drying. We install heavy-duty, double-layered gypsum or sound-insulated glass partitions on ultra-rigid metal studs for rock-solid stability and total acoustic privacy.",
        hi: "बिना ईंट-गारे की गंदगी और बिना हफ़्तों के इंतजार के—तुरंत एक नया केबिन या कमरा तैयार! मजबूत मेटल फ्रेम पर दोनों तरफ हैवी जिप्सम या ग्लास का इस्तेमाल, जो आवाज को आर-पार जाने से रोकता है और दीवार को देता है चट्टान जैसी मजबूती।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹750 / sq.ft — fully customized around your choice of premium glass or gypsum framing.",
        hi: "₹100 से ₹750 / sq.ft — आपकी जरूरत और मटीरियल के हिसाब से बेस्ट कस्टमाइज्ड रेट।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Erected and ready to use in just 2–4 days flat! Guaranteed clean, laser-straight installation with a 1-year warranty.",
        hi: "मात्र 2 से 4 दिनों में चमचमाती सीधी दीवार खड़ी! 1 साल की पक्की वारंटी और फिनिशिंग के साथ।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Creating manager cabins, separating billing counters, or setting up a quiet study/pooja space at home.",
        hi: "पर्सनल ऑफिस केबिन, दुकान का बिलिंग काउंटर, या घर में बच्चों की पढ़ाई और पूजा का अलग कमरा बनाने के लिए।",
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
        en: "Get the breathtaking, rich texture of expensive natural wooden louvers at 60% less cost! Engineered from high-density Wood-Plastic Composite, these designer panels are entirely waterproof, scratch-resistant, and 100% immune to termites, warping, or bending.",
        hi: "60% कम खर्चे में असली महंगी सागवान या अखरोट की लकड़ी (Teak/Walnut) जैसा वीआईपी और मॉडर्न लुक! यह हाई-डेंसिटी डब्ल्यूपीसी (WPC) लूवर्स वाटरप्रूफ और स्क्रैच-प्रूफ होते हैं, जिनमें कभी दीमक लगने या बोर्ड के टेढ़े होने का डर नहीं रहता।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹100 to ₹650 / sq.ft — a rich, high-end look that completely revalues your property within budget.",
        hi: "₹100 से ₹650 / sq.ft — आपके घर की वैल्यू बढ़ाने वाला लग्जरी लुक, आपके बजट में।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "A standard TV feature wall takes just 1 Day to complete! Includes a 1-Year Certified Warp-Proof Warranty.",
        hi: "आपकी टीवी वाली दीवार सिर्फ 1 दिन में बन जाएगी घर का सबसे आकर्षक कोना! रंग उड़ने या पैनल टूटने पर 1 साल की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Living room TV backdrops, main entrance accent walls, and bedroom bedback headers.",
        hi: "मुख्य टीवी यूनिट की बैकग्राउंड दीवार, लिविंग रूम की सबसे खास वॉल या बेडरूम में बेड के पीछे का हिस्सा।",
      },
    ],
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
    price: "₹110–₹180/sq.ft (Forbesganj/Araria market rate)",
    installTime: "1–2 days per room",
    whereUsedFirst: "Bathroom walls — no grout lines to blacken with mould, unlike tiles",
    highlights: [
      {
        kind: "special",
        label: "The Royal Mirror-Gloss Finish",
        labelHi: "क्यों है सबसे खास",
        en: "Experience the majestic royalty of Italian marble without the extreme weight, wall damage, or massive cost of real stone. Built on a stone-plastic core with a glass-like high-gloss UV layer that shrugs off scratches, repels moisture, and brightens up the room by reflecting light.",
        hi: "बिना किसी भारी पत्थर, घर की तोड़-फोड़ या लाखों के फालतू खर्च के—दीवारों पर पाएं असली इटैलियन मार्बल का राजा-महाराजाओं जैसा लुक! इसका शीशे जैसा चमकदार (High-Gloss) रिफ्लेक्टिव कोट स्क्रैच-प्रूफ है और पूरे कमरे को रोशनी से भर देता है।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹110 to ₹180 / sq.ft — 5-Star hotel elegance at a fraction of real stone pricing.",
        hi: "₹110 से ₹180 / sq.ft — असली मार्बल से दस गुना कम दाम में पैलेस जैसी लग्जरी।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Complete luxury makeover in just 1 Day! Comes with a 1-Year Assured Stain-Free and Fade-Proof Warranty.",
        hi: "सुबह काम शुरू, शाम तक दीवार चमकते हुए शीशे में तब्दील! मात्र 1 दिन में इंस्टॉलेशन + 1 साल की पक्की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Royal Pooja room backdrops, luxury dining spaces, executive lobby walls, and TV units.",
        hi: "मंदिर (पूजा रूम) की दीवारें, हॉल का डाइनिंग एरिया, मुख्य लॉबी और रॉयल टीवी सेटिंग्स।",
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
        en: "Hide the clutter, show the class! Say goodbye to tangled, hanging wires. We custom-engineer sleek entertainment centers tailored to your exact TV, soundbar, and console sizes using water-resistant HDMR (Action TESA) boards and premium anti-scratch laminates for smart storage.",
        hi: "लटकते हुए भद्दे तारों और बिखरे हुए सेट-टॉप बॉक्स के कबाड़ से हमेशा के लिए मुक्ति! हम वाटर-रेसिस्टेंट HDMR बोर्ड और प्रीमियम एंटी-स्क्रैच सनमाइका का उपयोग करके आपके टीवी और साउंडबार के सटीक साइज का कस्टमाइज्ड कैबिनेट बनाते हैं, जो स्टोरेज भी दे और क्लास भी।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹15,000 to ₹75,000+ per unit — 100% bespoke design shaped around your exact budget and space.",
        hi: "₹15,000 से ₹75,000+ प्रति यूनिट — आपकी चॉइस और बजट के हिसाब से पूरी तरह कस्टमाइज्ड।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Precision engineering and installation in 3–5 days! Includes a 1-Year Warranty on all premium hydraulic hinges and woodwork.",
        hi: "3 से 5 दिनों में वर्ल्ड-क्लास मशीन फिनिशिंग के साथ फिटिंग! सभी चैनल, हाइड्रोलिक कब्जों और मटीरियल पर 1 साल की पक्की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "The main accent wall of your family living room or your master bedroom theater setup.",
        hi: "आपके लिविंग रूम (हॉल) की सबसे मुख्य सामने वाली दीवार या आपके बेडरूम का पर्सनल थिएटर स्पेस।",
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
        en: "Bring a refreshing touch of nature right inside your home! Enjoy a lush, high-density green lawn 365 days a year with absolutely zero watering, zero mowing, zero mud, and no insects. Made of premium UV-resistant PP/PE fibers that are incredibly soft to walk on and wash clean with just water.",
        hi: "अपने घर के भीतर ले आइए मखमली प्राकृतिक हरियाली! बिना पानी, बिना मिट्टी, बिना कीचड़ और बिना किसी कटाई के साल के 365 दिन हरी-भरी रहने वाली प्रीमियम डेंसिटी घास। बच्चों और पैरों के लिए बेहद सॉफ्ट, धूप से सुरक्षित (UV-Protected) और पानी से धोने में आसान।",
      },
      {
        kind: "pricing",
        label: "Transparent Pricing",
        labelHi: "हमारा बेस्ट रेट",
        en: "₹40 to ₹150 / sq.ft — premium heavy-density turf at the most transparent local rates.",
        hi: "₹40 से ₹150 / sq.ft — अररिया-फारबिसगंज में सबसे बेस्ट लोकल होलसेल दाम पर।",
      },
      {
        kind: "warranty",
        label: "Time & Iron Warranty",
        labelHi: "समय व पक्की गारंटी",
        en: "Laid out beautifully in just a few hours (half to 1 day)! Backed by a 1-Year Fade-Proof & Shed-Proof Written Warranty.",
        hi: "मात्र कुछ ही घंटों में (आधे से 1 दिन) आपका फर्श या दीवार मखमली गार्डन में तब्दील! घास के रेशे झड़ने या रंग उड़ने पर 1 साल की वारंटी।",
      },
      {
        kind: "suited",
        label: "Best Suited For",
        labelHi: "यहाँ सबसे ज्यादा खिलेगा",
        en: "Balcony floors, open terrace lounges, courtyard seating zones, and creative indoor green features.",
        hi: "घर की बालकनी का फर्श, खुली छत (टेरेस), इनडोर सिटिंग एरिया, या दीवारों पर वर्टिकल गार्डन लुक देने के लिए।",
      },
    ],
  },
]
