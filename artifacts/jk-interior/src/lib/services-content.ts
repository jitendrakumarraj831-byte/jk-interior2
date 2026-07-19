import { Layers, PanelTop, Tv, Grid3x3, Gem, Trees, DoorClosed, type LucideIcon } from "lucide-react"

/**
 * Short, practical, customer-friendly service content — one record per service.
 * Backs the /services/:slug detail pages. Written in simple Hindi + English so a
 * customer can understand the service quickly. Numbers match business-data.ts /
 * service-city-data.ts / the homepage Services section.
 */

export interface ServiceMaterial {
  name: string
  nameHi: string
  detail: string
  detailHi: string
}

export interface InstallStep {
  title: string
  titleHi: string
  desc: string
  descHi: string
}

export interface ServiceFaqItem {
  q: string
  qHi: string
  a: string
  aHi: string
}

/** One quality tier's local-market price band for Forbesganj / Araria district. */
export interface PriceTier {
  tier: "Economy" | "Standard" | "Premium"
  tierHi: string
  range: string
  desc: string
  descHi: string
}

export interface ServiceContent {
  slug: string
  icon: LucideIcon
  name: string
  nameHi: string
  category: string
  categoryHi: string
  tagline: string
  taglineHi: string
  heroImage: string
  heroImageAlt: string
  galleryCategory: string
  /** Overall headline range shown in hero chips/homepage — spans Economy low to Premium high. */
  price: string
  /** Economy / Standard / Premium local-market price bands with what changes at each tier. */
  priceTiers: PriceTier[]
  /** Standard panel/board sizes and thickness available in the local market. */
  sizesThickness: string
  sizesThicknessHi: string
  /** Rough estimated labour-only component, already included within the price range above. */
  labourCost: string
  labourCostHi: string
  /** Short version for the compact stat tile, e.g. "₹20–30/sq.ft". */
  labourCostShort: string
  /** What JK Interior sources/installs, described honestly without naming unconfirmed brands. */
  brandNote: string
  brandNoteHi: string
  /** Coverage across the service area, with any material-specific caveat. */
  availability: string
  availabilityHi: string
  installTime: string
  maintenance: string
  warranty: string
  whatItIs: string
  whatItIsHi: string
  whereUsed: string[]
  whereUsedHi: string[]
  whereNotUsed: string[]
  whereNotUsedHi: string[]
  benefits: string[]
  benefitsHi: string[]
  limitations: string[]
  limitationsHi: string[]
  /** What JK Interior's quoted price actually covers — shown as a clear checklist next to what's not. */
  whatsIncluded: string[]
  whatsIncludedHi: string[]
  /** Work/material explicitly outside JK Interior's scope for this service. */
  whatsNotIncluded: string[]
  whatsNotIncludedHi: string[]
  materials: ServiceMaterial[]
  installSteps: InstallStep[]
  /** One practical, on-site recommendation. */
  expertTip: string
  expertTipHi: string
  realProject: { title: string; titleHi: string; desc: string; descHi: string; photos: number }
  faqs: ServiceFaqItem[]
  relatedSlugs: string[]
}

/** Shown on every service page directly under the price tiers — the one non-negotiable disclaimer. */
export const PRICE_DISCLAIMER =
  "All rates above are local Forbesganj / Araria market estimates, not a fixed quote. Your exact price depends on the free site visit, your design, material quality, and total size. Bigger and combo orders (ceiling + wall + TV unit together) cost less per sq.ft."

export const PRICE_DISCLAIMER_HI =
  "ऊपर दिए रेट फारबिसगंज/अररिया के लोकल मार्केट के अनुमानित रेट हैं, फिक्स्ड कोटेशन नहीं। असली कीमत फ्री Site Visit, आपके डिज़ाइन, मटेरियल क्वालिटी और साइज़ पर तय होती है। बड़ा या कॉम्बो ऑर्डर (सीलिंग + वॉल + TV यूनिट एक साथ) प्रति वर्ग फुट सस्ता पड़ता है।"

export const SERVICE_AREA_NOTE =
  "JK Interior is based in Forbesganj and covers Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur — about an 80 km radius. Call or WhatsApp to confirm your village/mohalla before booking."

export const SERVICE_AREA_NOTE_HI =
  "हमारी टीम फारबिसगंज में है और फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर — करीब 80 किमी के दायरे में जाती है। बुकिंग से पहले अपने गांव/मोहल्ले का कवरेज कॉल या WhatsApp पर कन्फर्म कर लें।"

export const SERVICES_CONTENT: ServiceContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gypsum-ceiling",
    icon: Layers,
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "The premium ceiling for dry rooms — built to any design you bring us",
    taglineHi: "सूखे कमरों की प्रीमियम सीलिंग — जो डिज़ाइन दें, वही बनाकर देते हैं",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "Flat single-level ceiling, simple design, 12.5mm board, no cove.", descHi: "फ्लैट सिंगल-लेवल सीलिंग, सादा डिज़ाइन, 12.5mm बोर्ड, बिना Cove।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹130/sq.ft", desc: "One stepped border with a cove channel (LED billed separately).", descHi: "एक स्टेप बॉर्डर और Cove चैनल (LED का खर्च अलग)।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹135–₹210/sq.ft", desc: "Multi-level or curved tray design with built-in LED cove lighting.", descHi: "मल्टी-लेवल या घुमावदार ट्रे डिज़ाइन, बिल्ट-इन LED Cove लाइट के साथ।" },
    ],
    sizesThickness: "Standard 12.5mm boards in 4×8 ft and 4×6 ft sheets, cut on-site. Thin 8mm board only for curved sections.",
    sizesThicknessHi: "स्टैंडर्ड 12.5mm बोर्ड, 4×8 फुट और 4×6 फुट शीट में, साइट पर काटा जाता है। घुमावदार हिस्सों में सिर्फ 8mm बोर्ड।",
    labourCost: "Labour (framing, board fixing, taping) is included — roughly ₹30–45/sq.ft of the total. Cove and multi-level designs sit at the higher end.",
    labourCostHi: "फ्रेमिंग, बोर्ड फिक्सिंग और टेपिंग की लेबर रेट में शामिल — कुल का करीब ₹30–45/sq.ft। Cove और मल्टी-लेवल डिज़ाइन में थोड़ा ज़्यादा।",
    labourCostShort: "₹30–45/sq.ft",
    brandNote: "We use ISI-marked, branded gypsum board and GI framing from authorised Purnia/Forbesganj dealers — never unbranded stock. The exact brand is shown at the free site visit.",
    brandNoteHi: "हम ISI-मार्क्ड, ब्रांडेड Gypsum Board और GI फ्रेमिंग ही लगाते हैं, पूर्णिया/फारबिसगंज के अधिकृत डीलरों से — अनब्रांडेड स्टॉक कभी नहीं। ब्रांड फ्री Site Visit में दिखा देते हैं।",
    availability: "Available across our full service area. Cove and multi-level designs are most requested in Forbesganj and Araria town.",
    availabilityHi: "हमारे पूरे सर्विस एरिया में उपलब्ध। फारबिसगंज और अररिया टाउन में Cove और मल्टी-लेवल डिज़ाइन सबसे ज़्यादा मांगे जाते हैं।",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    maintenance: "Dust with a dry cloth occasionally — no other upkeep",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A suspended ceiling made from 12.5mm gypsum boards screwed onto a GI metal frame, fixed a few inches below your slab. After taping, it becomes one smooth, seamless surface — perfect for cove channels, stepped borders, curved shapes, and hidden LED lighting.",
    whatItIsHi:
      "जिप्सम फॉल्स सीलिंग एक नई सीलिंग है, जो आपकी स्लैब से कुछ इंच नीचे GI मेटल फ्रेम पर 12.5mm Gypsum Board कसकर बनती है। टेपिंग के बाद यह एकदम स्मूथ, बिना जोड़ वाली सतह बन जाती है — Cove, स्टेप बॉर्डर, घुमावदार शेप और छुपी LED लाइट के लिए बेस्ट।",
    whereUsed: [
      "Living room / hall — the room every guest sees first",
      "Bedrooms — soft cove lighting for a warm feel",
      "Dining and drawing rooms",
      "Dry office cabins and reception areas",
    ],
    whereUsedHi: [
      "हॉल / लिविंग रूम में — मेहमान की पहली नज़र यहीं जाती है",
      "बेडरूम में — सॉफ्ट Cove लाइट से गर्म-सा माहौल",
      "डाइनिंग और ड्रॉइंग रूम में",
      "सूखे ऑफिस केबिन और रिसेप्शन में",
    ],
    whereNotUsed: [
      "Bathrooms — steam and moisture damage the board",
      "Kitchens — cooking steam has the same effect",
      "Open balconies, terraces, or rain-exposed areas",
      "Rooms with a leak from the floor above — fix the leak first",
    ],
    whereNotUsedHi: [
      "बाथरूम में नहीं — भाप और नमी से बोर्ड खराब होता है",
      "किचन में नहीं — खाना बनाने की भाप का भी वही असर",
      "खुली बालकनी, टैरेस या बारिश वाली जगह में नहीं",
      "ऊपर से लीकेज वाले कमरे में नहीं — पहले लीकेज ठीक कराएं",
    ],
    benefits: [
      "Every design is custom — bring a sketch or photo, we build exactly that",
      "Smooth, seamless finish — the most premium ceiling look",
      "Any shape possible: cove, step, curved, tray",
      "Takes cove/LED strip lighting better than any other material",
      "Fire-resistant board that also dampens sound between floors",
    ],
    benefitsHi: [
      "हर डिज़ाइन कस्टम — स्केच या फोटो दें, बिल्कुल वैसा बनाते हैं",
      "स्मूथ, बिना जोड़ वाली फिनिश — सबसे प्रीमियम लुक",
      "कोई भी शेप: Cove, Step, घुमावदार, Tray",
      "Cove और LED Strip के लिए सबसे बढ़िया मटेरियल",
      "आग से बचाव, और फ्लोर के बीच आवाज़ भी रोकता है",
    ],
    limitations: [
      "Not waterproof — the one rule we never bend",
      "Takes a bit longer than PVC due to taping and sanding",
      "A leak from above needs board replacement, not just a wipe",
      "Slightly higher labour cost than PVC for the same design",
    ],
    limitationsHi: [
      "वॉटरप्रूफ नहीं — यह नियम हम कभी नहीं तोड़ते",
      "टेपिंग-सैंडिंग की वजह से PVC से थोड़ा ज़्यादा समय",
      "ऊपर से लीकेज हो तो बोर्ड बदलना पड़ता है",
      "समान डिज़ाइन में PVC से थोड़ा ज़्यादा लेबर खर्च",
    ],
    whatsIncluded: [
      "GI metal frame fixed at your chosen drop height",
      "Gypsum board fixing with staggered, screw-fixed joints",
      "Cove/step framing if part of your design",
      "Taping, jointing, and sanding to a smooth surface",
      "Cutouts for downlights, AC vents, and cove wiring",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "आपकी तय ड्रॉप-हाइट पर GI मेटल फ्रेम फिक्स करना",
      "स्टैगर्ड, स्क्रू-फिक्स्ड जोड़ों के साथ बोर्ड लगाना",
      "अगर डिज़ाइन में हो तो Cove/Step फ्रेमिंग",
      "टेपिंग, जॉइंटिंग और सैंडिंग से स्मूथ सतह",
      "डाउनलाइट, AC वेंट और Cove वायरिंग के कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "LED cove strip and driver — billed separately per running foot",
      "Main electrical wiring, switches, or light fixtures — electrician's scope",
      "Fixing a leaking slab or dampness above — must be resolved before we start",
    ],
    whatsNotIncludedHi: [
      "LED Cove Strip और ड्राइवर — रनिंग फुट पर अलग से बिल",
      "मुख्य वायरिंग, स्विच या लाइट फिक्स्चर — इलेक्ट्रीशियन का काम",
      "स्लैब की लीकेज या ऊपर की नमी ठीक करना — काम शुरू करने से पहले ज़रूरी",
    ],
    materials: [
      { name: "Gypsum board (12.5mm)", nameHi: "जिप्सम बोर्ड (12.5mm)", detail: "Branded boards (Saint-Gobain / USG / India Gypsum grade)", detailHi: "ब्रांडेड बोर्ड (Saint-Gobain / USG / India Gypsum ग्रेड)" },
      { name: "GI metal channel frame", nameHi: "GI मेटल चैनल फ्रेम", detail: "Galvanised — doesn't rust or sag over the years", detailHi: "गैल्वनाइज़्ड — सालों तक जंग नहीं, झुकता भी नहीं" },
      { name: "Joint tape & compound", nameHi: "जॉइंट टेप और कंपाउंड", detail: "Seals every joint so the surface reads as one plane", detailHi: "हर जोड़ सील करता है, पूरी सतह एक जैसी दिखती है" },
      { name: "LED cove profile + strip", nameHi: "LED कोव प्रोफाइल + स्ट्रिप", detail: "Aluminium channel with warm-white (3000K) strip", detailHi: "एल्युमिनियम चैनल, वार्म-व्हाइट (3000K) स्ट्रिप" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "A level line is marked around the room at your drop height.", descHi: "तय ड्रॉप-हाइट पर कमरे में लेवल लाइन मार्क करते हैं।" },
      { title: "Frame fixing", titleHi: "फ्रेम फिक्सिंग", desc: "Perimeter angle and ceiling channels are anchored to the slab.", descHi: "पेरीमीटर एंगल और सीलिंग चैनल स्लैब में फिक्स करते हैं।" },
      { title: "Board fixing", titleHi: "बोर्ड फिक्सिंग", desc: "Boards are screwed on with staggered joints — no continuous seams.", descHi: "बोर्ड को स्टैगर्ड जॉइंट में स्क्रू करते हैं, कोई सीधी सीम नहीं।" },
      { title: "Cove framing (if in design)", titleHi: "कोव फ्रेमिंग (अगर हो)", desc: "A recessed step is framed at the border for the LED strip.", descHi: "बॉर्डर पर LED के लिए रिसेस्ड स्टेप बनाते हैं।" },
      { title: "Taping & jointing", titleHi: "टेपिंग और जॉइंटिंग", desc: "Every joint and screw is taped and sanded flat and smooth.", descHi: "हर जोड़ और स्क्रू पर टेप लगाकर सैंड कर स्मूथ करते हैं।" },
      { title: "Cutouts & handover", titleHi: "कटआउट और हैंडओवर", desc: "Downlight/AC cutouts done, cove line checked, ceiling handed over with warranty.", descHi: "डाउनलाइट/AC कटआउट, Cove लाइन चेक कर, Warranty के साथ हैंडओवर।" },
    ],
    expertTip:
      "If cove lighting is even a maybe, decide it at the design stage — adding it after the boards are closed means opening part of the ceiling again.",
    expertTipHi:
      "Cove Lighting का थोड़ा भी मन हो, तो डिज़ाइन के वक़्त ही बता दें — बोर्ड बंद होने के बाद जोड़ने पर सीलिंग का हिस्सा दोबारा खोलना पड़ता है।",
    realProject: {
      title: "Cove-lit hall ceiling, Forbesganj",
      titleHi: "कोव-लिट हॉल सीलिंग, फारबिसगंज",
      desc: "A 180 sq.ft drawing room with a stepped gypsum border and warm-white LED cove — a project we often show on-site to explain the cove look.",
      descHi: "180 वर्ग फुट का ड्रॉइंग रूम, सीढ़ीदार बॉर्डर और वार्म-व्हाइट LED Cove के साथ — यह प्रोजेक्ट हम अक्सर साइट पर दिखाते हैं।",
      photos: 16,
    },
    faqs: [
      { q: "Will gypsum ceiling get damaged if it gets wet once?", qHi: "एक बार गीला हो जाए तो जिप्सम खराब होगा?", a: "A one-off splash wiped up quickly is fine. Standing moisture and repeated steam are what damage it — that's why we never install it in bathrooms or kitchens.", aHi: "एक बार गीला होकर जल्दी पोंछ दें तो कुछ नहीं होता। नुकसान लगातार नमी या भाप से होता है — इसीलिए बाथरूम-किचन में हम कभी नहीं लगाते।" },
      { q: "How is gypsum different from POP?", qHi: "जिप्सम, POP से कैसे अलग है?", a: "POP is wet plaster applied by hand and depends on the mason's skill. Gypsum board is a factory-made panel — more uniform finish, faster work, and easy to repair one section later.", aHi: "POP हाथ से लगा गीला प्लास्टर है, मिस्त्री के हुनर पर निर्भर। Gypsum फैक्ट्री का पैनल है — एक जैसी फिनिश, तेज़ काम, और बाद में एक हिस्सा आसानी से रिपेयर।" },
      { q: "Does gypsum ceiling reduce room height a lot?", qHi: "क्या इससे कमरे की ऊंचाई बहुत कम होती है?", a: "A flat gypsum ceiling drops the height by about 3–4 inches. If your room is already low, tell us — we'll suggest a shallower frame or recommend PVC.", aHi: "फ्लैट सीलिंग में करीब 3–4 इंच ऊंचाई कम होती है। कमरा पहले से कम ऊंचा हो तो बता दें — कम ड्रॉप वाला फ्रेम या PVC सुझा देंगे।" },
    ],
    relatedSlugs: ["pvc-false-ceiling", "grid-ceiling", "wpc-wall-panel"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "pvc-false-ceiling",
    icon: Layers,
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "100% waterproof — our first choice for kitchens and bathrooms",
    taglineHi: "100% वॉटरप्रूफ — किचन-बाथरूम के लिए हमारी पहली पसंद",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "Plain white or matte panels, 5mm gauge, basic grid.", descHi: "प्लेन सफेद या मैट पैनल, 5mm गेज, बेसिक ग्रिड।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹115/sq.ft", desc: "Wood-texture or marble-print panels, 6–7mm gauge.", descHi: "वुड-टेक्सचर या मार्बल-प्रिंट पैनल, 6–7mm गेज।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹120–₹150/sq.ft", desc: "Designer 3D/embossed or high-gloss panels, 8mm gauge.", descHi: "डिज़ाइनर 3D/एम्बॉस्ड या हाई-ग्लॉस पैनल, 8mm गेज।" },
    ],
    sizesThickness: "Panels in 200mm and 250mm widths, cut to length on-site (up to ~12 ft without a joint). Thickness 5–8mm by tier — thicker panels sag less on wide spans.",
    sizesThicknessHi: "पैनल 200mm और 250mm चौड़ाई में, साइट पर लंबाई में काटे जाते हैं (~12 फुट तक बिना जोड़)। मोटाई 5–8mm — मोटा पैनल बड़े स्पैन में कम झुकता है।",
    labourCost: "Labour (grid, panel fixing, beading) is included — roughly ₹20–30/sq.ft. The fastest ceiling we install.",
    labourCostHi: "ग्रिड, पैनल फिक्सिंग और बीडिंग की लेबर शामिल — करीब ₹20–30/sq.ft। सबसे तेज़ लगने वाली सीलिंग।",
    labourCostShort: "₹20–30/sq.ft",
    brandNote: "ISI-compliant branded PVC from authorised Forbesganj/Purnia suppliers — not cheap unbranded imports. We show the panel sample and batch marking on-site.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड PVC, फारबिसगंज/पूर्णिया के अधिकृत सप्लायर से — सस्ता अनब्रांडेड इम्पोर्ट नहीं। साइट पर सैंपल और बैच मार्किंग दिखाते हैं।",
    availability: "Available across our full service area. Our highest-volume install — common colours are usually in stock without delay.",
    availabilityHi: "पूरे सर्विस एरिया में उपलब्ध। हमारा सबसे ज़्यादा लगने वाला काम — आम रंगों का स्टॉक तैयार रहता है।",
    installTime: "1 room in a day, full home in 3–4 days",
    maintenance: "Zero — just wipe with a damp cloth",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "PVC false ceiling uses hollow, interlocking plastic panels that clip into a batten grid below your slab. The panels are 100% sealed plastic, so moisture, steam, and splashing don't affect them at all — ideal for wet rooms.",
    whatItIsHi:
      "PVC फॉल्स सीलिंग खोखले, इंटरलॉक होने वाले प्लास्टिक पैनल से बनती है, जो स्लैब के नीचे बैटन ग्रिड में क्लिप होते हैं। पैनल पूरी तरह सील्ड प्लास्टिक हैं, तो नमी, भाप या पानी का कोई असर नहीं — गीले कमरों के लिए बेस्ट।",
    whereUsed: [
      "Kitchens and bathrooms — our top recommendation",
      "Balconies and semi-open, rain-exposed areas",
      "Shops, workshops, and small offices",
      "Almost any room — the most versatile option",
    ],
    whereUsedHi: [
      "किचन और बाथरूम में — हमारी टॉप सलाह",
      "बालकनी और अर्ध-खुली, बारिश वाली जगह में",
      "दुकान, वर्कशॉप और छोटे ऑफिस में",
      "लगभग किसी भी कमरे में — सबसे बहुउपयोगी",
    ],
    whereNotUsed: [
      "Formal halls that want complex cove/POP profiles — gypsum suits better",
      "Rooms where you want to change the ceiling colour every few years",
    ],
    whereNotUsedHi: [
      "जटिल Cove/POP वाले फॉर्मल हॉल में — वहां Gypsum बेहतर",
      "जहां हर कुछ साल में सीलिंग का रंग बदलना हो",
    ],
    benefits: [
      "100% waterproof — safe for bathroom, kitchen, and balcony",
      "Termite-proof and insect-resistant",
      "Zero maintenance — a damp cloth is all it needs",
      "Holds its finish for 20+ years",
      "Fastest to install and most affordable per sq.ft",
    ],
    benefitsHi: [
      "100% वॉटरप्रूफ — बाथरूम, किचन, बालकनी में बेफिक्र",
      "टर्माइट और कीड़ों से सुरक्षित",
      "ज़ीरो मेंटेनेंस — बस गीले कपड़े से पोंछें",
      "20+ साल तक फिनिश वैसी ही",
      "सबसे तेज़ और सबसे किफायती",
    ],
    limitations: [
      "Simpler designs — no complex cove or curved profiles",
      "The colour/texture you choose is fixed for its life",
      "A cracked panel needs replacement, not a patch (easy to match)",
      "Slightly less premium look in a formal drawing room vs gypsum",
    ],
    limitationsHi: [
      "डिज़ाइन सीमित — जटिल Cove या घुमावदार शेप नहीं",
      "जो रंग/टेक्सचर चुना, वही जीवनभर रहेगा",
      "टूटा पैनल बदलना पड़ता है (मिलता-जुलता आसानी से मिलता है)",
      "फॉर्मल ड्रॉइंग रूम में Gypsum जितना प्रीमियम नहीं",
    ],
    whatsIncluded: [
      "Batten grid fixed to the slab and perimeter wall",
      "Panels cut to length and interlocked",
      "Corner beading and edge trims",
      "Cutouts for downlights or exhaust fans",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "स्लैब और दीवार में बैटन ग्रिड फिक्स करना",
      "पैनल नाप में काटकर आपस में जोड़ना",
      "कॉर्नर बीडिंग और एज ट्रिम्स",
      "डाउनलाइट या एग्ज़ॉस्ट फैन के कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Main electrical wiring, switches, or light/exhaust fixtures — electrician's scope",
      "AC ducting or plumbing routed above the ceiling",
      "Replacing a cracked panel after warranty — billed separately if needed",
    ],
    whatsNotIncludedHi: [
      "मुख्य वायरिंग, स्विच या लाइट/एग्ज़ॉस्ट फिक्स्चर — इलेक्ट्रीशियन का काम",
      "सीलिंग के ऊपर AC डक्टिंग या प्लंबिंग",
      "Warranty के बाद टूटा पैनल बदलना — ज़रूरत पड़ने पर अलग से बिल",
    ],
    materials: [
      { name: "PVC ceiling panels", nameHi: "PVC सीलिंग पैनल", detail: "Interlocking panels in white, wood-grain, marble-print and glossy finishes", detailHi: "इंटरलॉक पैनल — सफेद, वुड-ग्रेन, मार्बल-प्रिंट और ग्लॉसी फिनिश में" },
      { name: "GI/wooden batten frame", nameHi: "GI/लकड़ी की बैटन फ्रेम", detail: "Perimeter and support battens the panels clip onto", detailHi: "पेरीमीटर और सपोर्ट बैटन, जिनमें पैनल क्लिप होते हैं" },
      { name: "Corner beading & trims", nameHi: "कॉर्नर बीडिंग और ट्रिम्स", detail: "Clean, finished border where ceiling meets wall", detailHi: "दीवार से मिलने वाले किनारे को साफ फिनिश देते हैं" },
    ],
    installSteps: [
      { title: "Measurement & marking", titleHi: "माप और मार्किंग", desc: "Room measured, drop-height line marked on all walls.", descHi: "कमरा नापकर सभी दीवारों पर ड्रॉप-हाइट लाइन मार्क करते हैं।" },
      { title: "Batten fixing", titleHi: "बैटन फिक्सिंग", desc: "Perimeter and support battens are fixed to carry the panels.", descHi: "पैनल को सहारा देने के लिए पेरीमीटर और सपोर्ट बैटन लगाते हैं।" },
      { title: "Panel fixing", titleHi: "पैनल फिक्सिंग", desc: "Panels are cut and clipped into the grid, one by one.", descHi: "पैनल काटकर एक-एक करके ग्रिड में क्लिप करते हैं।" },
      { title: "Beading & corner finish", titleHi: "बीडिंग और कॉर्नर फिनिश", desc: "Edge beading is fixed all around for a clean join.", descHi: "साफ जुड़ाव के लिए चारों तरफ एज बीडिंग लगाते हैं।" },
      { title: "Light cutouts", titleHi: "लाइट कटआउट", desc: "Openings for downlights or exhaust fans are cut and wired.", descHi: "डाउनलाइट या एग्जॉस्ट फैन के कटआउट काटकर वायर करते हैं।" },
      { title: "Wipe & handover", titleHi: "सफाई और हैंडओवर", desc: "Panels wiped clean — ready to use immediately.", descHi: "पैनल पोंछते ही सीलिंग तुरंत इस्तेमाल के लिए तैयार।" },
    ],
    expertTip:
      "The panel colour is fixed for life, so bring a photo of your kitchen or bathroom tiles to the site visit — we'll match the shade against what's already there.",
    expertTipHi:
      "पैनल का रंग जीवनभर वही रहता है, तो Site Visit पर अपने किचन/बाथरूम की टाइल की फोटो लाएं — हम शेड मिलाकर दिखा देंगे।",
    realProject: {
      title: "Wood-texture PVC ceiling, Araria kitchen",
      titleHi: "वुड-टेक्सचर PVC सीलिंग, अररिया किचन",
      desc: "A full kitchen-and-balcony PVC ceiling finished in a single day, wood-texture panels chosen so it wouldn't look 'plastic' from the dining table.",
      descHi: "किचन और बालकनी की पूरी PVC सीलिंग एक ही दिन में तैयार, वुड-टेक्सचर पैनल ताकि डाइनिंग टेबल से 'प्लास्टिक जैसा' न लगे।",
      photos: 13,
    },
    faqs: [
      { q: "Is PVC ceiling really 100% waterproof?", qHi: "क्या PVC सीलिंग सच में 100% वॉटरप्रूफ है?", a: "Yes — the panel is solid PVC with no absorbent core. Splashing, steam, or humidity don't affect it at all.", aHi: "हां — पैनल ठोस PVC है, कोई सोखने वाला कोर नहीं। पानी, भाप या नमी का कोई असर नहीं।" },
      { q: "Will PVC look cheap compared to gypsum in my hall?", qHi: "हॉल में PVC जिप्सम से सस्ती दिखेगी?", a: "In a formal hall with cove lighting, gypsum reads more premium. But our wood/marble-texture PVC looks genuinely upscale in kitchens, bathrooms, and most rooms.", aHi: "Cove वाले फॉर्मल हॉल में Gypsum ज़्यादा प्रीमियम दिखती है। पर हमारे वुड/मार्बल-टेक्सचर PVC किचन, बाथरूम और ज़्यादातर कमरों में सच में महंगे दिखते हैं।" },
      { q: "Can termites or seepage damage PVC ceiling?", qHi: "क्या टर्माइट या सीपेज से PVC खराब होगी?", a: "No — termites don't eat plastic and seepage runs off. We use treated battens or GI channel so the frame behind stays safe too.", aHi: "नहीं — टर्माइट प्लास्टिक नहीं खाते, सीपेज बह जाता है। पीछे का फ्रेम भी सुरक्षित रहे, इसलिए ट्रीटेड बैटन या GI चैनल लगाते हैं।" },
    ],
    relatedSlugs: ["gypsum-ceiling", "uv-marble-sheet", "grid-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "grid-ceiling",
    icon: Grid3x3,
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "The commercial standard for offices, shops, and clinics",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए कमर्शियल स्टैंडर्ड सीलिंग",
    heroImage: "/images/grid.webp",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹55/sq.ft", desc: "Basic mineral-fibre tile on a standard T-grid.", descHi: "स्टैंडर्ड T-Grid पर बेसिक मिनरल-फाइबर टाइल।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹56–₹75/sq.ft", desc: "Better mineral-fibre or PVC tile with some moisture resistance.", descHi: "थोड़ी नमी-रोधी, बेहतर मिनरल-फाइबर या PVC टाइल।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹76–₹115/sq.ft", desc: "Acoustic-rated or edge-lit tiles on a heavier grid.", descHi: "भारी ग्रिड पर एकॉस्टिक-रेटेड या एज-लिट टाइल।" },
    ],
    sizesThickness: "Standard 2×2 ft (600×600mm) lay-in tiles, 15–19mm thick by tier. Grid runners are the standard 24mm-face T-section.",
    sizesThicknessHi: "स्टैंडर्ड 2×2 फुट (600×600mm) ले-इन टाइल, मोटाई 15–19mm। ग्रिड रनर स्टैंडर्ड 24mm-फेस T-सेक्शन।",
    labourCost: "Labour (wall-angle, grid, levelling, tile placement) is included — roughly ₹15–25/sq.ft. The quickest ceiling on a large floor.",
    labourCostHi: "वॉल-एंगल, ग्रिड, लेवलिंग और टाइल की लेबर शामिल — करीब ₹15–25/sq.ft। बड़े फ्लोर पर सबसे तेज़।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI/BIS-compliant branded grid and tiles from our regular Purnia suppliers — exact make confirmed with you at the site visit.",
    brandNoteHi: "ISI/BIS-अनुरूप ब्रांडेड ग्रिड और टाइल, नियमित पूर्णिया सप्लायर से — सही मेक साइट विज़िट में कन्फर्म करते हैं।",
    availability: "Common in offices and shops across Forbesganj, Araria, and Purnia. Acoustic/edge-lit tiles may need 2–3 days' lead time in outlying areas.",
    availabilityHi: "फारबिसगंज, अररिया और पूर्णिया के ऑफिस-दुकानों में आम। एकॉस्टिक/एज-लिट टाइल दूर के इलाकों में 2–3 दिन ज़्यादा लग सकते हैं।",
    installTime: "1–2 days for a room, 3–4 days for a larger floor",
    maintenance: "Very low — occasional dusting; a stained tile is swapped individually",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A suspended metal grid of runners and cross-tees hung from the slab, into which lightweight tiles simply drop in from below. Nothing is glued to the tiles — perfect wherever wiring or AC ductwork above needs future access.",
    whatItIsHi:
      "मेन रनर और क्रॉस-टी का मेटल ग्रिड स्लैब से लटकाया जाता है, जिसमें हल्की टाइल नीचे से बस रख दी जाती हैं। टाइल में कुछ चिपकाया नहीं जाता — जहां ऊपर वायरिंग या AC डक्ट में एक्सेस चाहिए, वहां बेस्ट।",
    whereUsed: [
      "Offices, cabins, and coworking spaces",
      "Shops, showrooms, and retail counters",
      "Clinics and diagnostic centres — easy to sanitise and replace",
      "Godowns and workshops with wiring/ducting needing access",
    ],
    whereUsedHi: [
      "ऑफिस, केबिन और कोवर्किंग स्पेस में",
      "दुकान, शोरूम और रिटेल काउंटर में",
      "क्लिनिक और डायग्नोस्टिक सेंटर में — साफ करना और बदलना आसान",
      "गोदाम-वर्कशॉप में, जहां वायरिंग/डक्टिंग तक पहुंच चाहिए",
    ],
    whereNotUsed: [
      "Formal living rooms or bedrooms wanting a seamless premium look",
      "Bathrooms or moist areas — standard mineral fibre tiles sag when wet",
      "Very low-height rooms — needs a few inches more drop than PVC",
    ],
    whereNotUsedHi: [
      "बिना जोड़ प्रीमियम लुक वाले फॉर्मल लिविंग रूम या बेडरूम में नहीं",
      "बाथरूम या नमी वाली जगह में नहीं — आम टाइल गीली होकर झुक जाती है",
      "बहुत कम ऊंचाई वाले कमरों में नहीं — PVC से ज़्यादा ड्रॉप चाहिए",
    ],
    benefits: [
      "Any tile lifts out and swaps in minutes — easiest servicing of all ceilings",
      "Best for spaces with AC ducting, sprinklers, or wiring needing access",
      "Acoustic-rated tiles available for noise control",
      "Fastest ceiling to install on a large open floor",
      "Most economical option for large commercial areas",
    ],
    benefitsHi: [
      "कोई भी टाइल मिनटों में निकालकर बदल सकते हैं — सबसे आसान सर्विसिंग",
      "AC डक्टिंग, स्प्रिंकलर या वायरिंग वाली जगह के लिए बेस्ट",
      "शोर कम करने के लिए एकॉस्टिक-रेटेड टाइल भी मिलती हैं",
      "बड़े खुले फ्लोर पर सबसे तेज़ इंस्टॉलेशन",
      "बड़े कमर्शियल एरिया के लिए सबसे किफायती",
    ],
    limitations: [
      "Visible grid lines — practical, not decorative",
      "Standard mineral fibre tiles aren't waterproof and sag if wet",
      "Needs slightly more drop than PVC",
      "No cove lighting or curved profiles",
    ],
    limitationsHi: [
      "ग्रिड की लाइनें दिखती हैं — व्यावहारिक है, सजावटी नहीं",
      "आम मिनरल फाइबर टाइल वॉटरप्रूफ नहीं, गीली होकर झुकती है",
      "PVC से थोड़ी ज़्यादा ड्रॉप-हाइट चाहिए",
      "Cove लाइट या घुमावदार शेप संभव नहीं",
    ],
    whatsIncluded: [
      "Perimeter wall-angle fixing all around",
      "GI T-grid hung on hanger wires and fully levelled",
      "Tile placement — mineral fibre, PVC, or gypsum, as agreed",
      "Cutouts for lights, AC diffusers, and sprinkler heads",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "पूरे कमरे के चारों ओर पेरीमीटर वॉल-एंगल फिक्स करना",
      "हैंगर वायर पर GI T-Grid लटकाना और पूरी तरह लेवल करना",
      "तय टाइल लगाना — मिनरल फाइबर, PVC या Gypsum",
      "लाइट, AC डिफ्यूज़र और स्प्रिंकलर की जगह के कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "The electrical wiring, AC ductwork, or sprinkler piping itself — respective trades' work",
      "Replacing a tile damaged after handover (e.g. stained by a later leak)",
      "Upgrading to acoustic or edge-lit tiles after the order is placed",
    ],
    whatsNotIncludedHi: [
      "वायरिंग, AC डक्टिंग या स्प्रिंकलर पाइपिंग खुद — संबंधित ट्रेड का काम",
      "हैंडओवर के बाद खराब हुई टाइल बदलना (जैसे बाद में लीकेज से दागी)",
      "ऑर्डर के बाद एकॉस्टिक या एज-लिट टाइल में अपग्रेड",
    ],
    materials: [
      { name: "GI T-grid runners & cross-tees", nameHi: "GI T-ग्रिड रनर और क्रॉस-टी", detail: "Galvanised steel grid on adjustable GI hanger wires", detailHi: "गैल्वनाइज़्ड स्टील ग्रिड, एडजस्टेबल GI हैंगर वायर पर" },
      { name: "Mineral fibre / PVC / gypsum tiles", nameHi: "मिनरल फाइबर / PVC / जिप्सम टाइल", detail: "2×2 ft lay-in tiles — mineral fibre for offices, PVC for moist areas", detailHi: "2×2 फुट टाइल — ऑफिस के लिए मिनरल फाइबर, नमी वाली जगह के लिए PVC" },
      { name: "Perimeter wall angle", nameHi: "पेरीमीटर वॉल एंगल", detail: "L-angle on the wall that the grid rests on at the edges", detailHi: "दीवार पर लगा L-एंगल, जिस पर किनारों से ग्रिड टिकता है" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "Ceiling drop height marked on the walls all around.", descHi: "कमरे के चारों ओर दीवारों पर ड्रॉप-हाइट मार्क करते हैं।" },
      { title: "Wall angle fixing", titleHi: "वॉल एंगल फिक्सिंग", desc: "The perimeter L-angle is screwed to the wall.", descHi: "दीवार पर पेरीमीटर L-एंगल स्क्रू करते हैं।" },
      { title: "Grid suspension", titleHi: "ग्रिड सस्पेंशन", desc: "T-runners are hung on GI wires; cross-tees click in to form squares.", descHi: "T-रनर GI वायर से लटकाकर क्रॉस-टी से चौकोर खाने बनाते हैं।" },
      { title: "Grid levelling", titleHi: "ग्रिड लेवलिंग", desc: "Every wire is adjusted so the whole grid sits dead level.", descHi: "हर वायर अड्जस्ट कर पूरे ग्रिड को बिल्कुल लेवल करते हैं।" },
      { title: "Tile placement", titleHi: "टाइल प्लेसमेंट", desc: "Tiles are dropped into each grid square from below.", descHi: "टाइल को नीचे से हर ग्रिड खाने में रख देते हैं।" },
      { title: "Fixtures & handover", titleHi: "फिक्स्चर और हैंडओवर", desc: "Lights, diffusers, and sprinklers positioned; every tile checked for fit.", descHi: "लाइट, डिफ्यूज़र, स्प्रिंकलर लगाकर हर टाइल का फिट चेक करते हैं।" },
    ],
    expertTip:
      "Get your electrician and AC contractor to finalise fixture positions before we hang the grid — moving a light point after levelling means redoing part of the layout.",
    expertTipHi:
      "ग्रिड लटकाने से पहले इलेक्ट्रीशियन और AC वाले से लाइट-डिफ्यूज़र की जगह तय करवा लें — लेवल होने के बाद बदलना मतलब लेआउट दोबारा करना।",
    realProject: {
      title: "Clinic waiting-area ceiling, Araria",
      titleHi: "क्लिनिक वेटिंग-एरिया सीलिंग, अररिया",
      desc: "A 400 sq.ft diagnostic centre floor with acoustic mineral-fibre grid ceiling — tiles chosen so future AC or wiring work needs no breaking open.",
      descHi: "400 वर्ग फुट डायग्नोस्टिक सेंटर, एकॉस्टिक मिनरल-फाइबर ग्रिड सीलिंग के साथ — ताकि भविष्य में AC/वायरिंग के लिए सीलिंग तोड़नी न पड़े।",
      photos: 7,
    },
    faqs: [
      { q: "Why choose grid ceiling over gypsum for my office?", qHi: "ऑफिस के लिए जिप्सम की जगह ग्रिड क्यों?", a: "If AC ducting, conduits, or plumbing run above the ceiling, grid lets an electrician lift one tile and get in without touching the rest. Gypsum looks premium but means cutting into it for access.", aHi: "अगर ऊपर AC डक्टिंग, कंड्यूट या प्लंबिंग है, तो ग्रिड में एक टाइल उठाकर काम हो जाता है। Gypsum प्रीमियम दिखती है, पर एक्सेस के लिए काटनी पड़ती है।" },
      { q: "Are grid ceiling tiles waterproof?", qHi: "क्या ग्रिड टाइल वॉटरप्रूफ होती है?", a: "Standard mineral fibre tiles are not — they sag if wet. For moist areas we fit PVC lay-in tiles into the same grid instead.", aHi: "स्टैंडर्ड मिनरल फाइबर टाइल वॉटरप्रूफ नहीं — गीली होकर झुकती है। नमी वाली जगह में उसी ग्रिड में PVC टाइल लगा देते हैं।" },
      { q: "Can grid ceiling be used at home?", qHi: "क्या ग्रिड सीलिंग घर में लग सकती है?", a: "It's mostly for commercial spaces due to visible grid lines, but some use it in a store-room, garage, or shop-cum-home where budget and easy access matter more than looks.", aHi: "आमतौर पर कमर्शियल के लिए, क्योंकि लाइनें दिखती हैं। पर कुछ लोग स्टोर-रूम, गैरेज या दुकान-सह-घर में लगाते हैं, जहां बजट और एक्सेस ज़्यादा ज़रूरी।" },
    ],
    relatedSlugs: ["pvc-false-ceiling", "partition-wall", "gypsum-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "partition-wall",
    icon: DoorClosed,
    name: "Partition Wall",
    nameHi: "पार्टीशन वॉल",
    category: "Partition",
    categoryHi: "पार्टीशन",
    tagline: "Split one room into two — no masonry, no touching the slab",
    taglineHi: "एक कमरे को दो हिस्सों में बांटें — बिना ईंट-गारा, बिना स्लैब छुए",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹100–₹130/sq.ft", desc: "Single-layer gypsum partition, single stud row.", descHi: "सिंगल-लेयर Gypsum पार्टीशन, एक स्टड रो में।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹135–₹200/sq.ft (gypsum) · ₹380–₹450/sq.ft (glass)", desc: "Double-layer gypsum with rockwool infill, or entry-level toughened glass.", descHi: "रॉकवूल इनफिल वाली डबल-लेयर Gypsum, या एंट्री टफन्ड ग्लास।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹460–₹750/sq.ft", desc: "Frosted/fluted glass partition with aluminium frame and flush door.", descHi: "एल्युमिनियम फ्रेम और फ्लश दरवाज़े के साथ फ्रॉस्टेड/फ्लूटेड ग्लास पार्टीशन।" },
    ],
    sizesThickness: "Gypsum: 12.5mm board (single/double layer) on 50mm/75mm metal studs. Glass: 8–12mm toughened safety glass in aluminium channel framing.",
    sizesThicknessHi: "Gypsum: 50mm/75mm मेटल स्टड पर 12.5mm बोर्ड (सिंगल/डबल लेयर)। ग्लास: एल्युमिनियम चैनल में 8–12mm टफन्ड सेफ्टी ग्लास।",
    labourCost: "Labour is roughly ₹25–40/sq.ft for gypsum and ₹60–100/sq.ft for glass, included above — glass costs more due to careful handling and alignment.",
    labourCostHi: "लेबर Gypsum में करीब ₹25–40/sq.ft, ग्लास में ₹60–100/sq.ft, रेट में शामिल — ग्लास में हैंडलिंग और अलाइनमेंट की वजह से ज़्यादा।",
    labourCostShort: "₹25–40/sq.ft (gypsum) · ₹60–100/sq.ft (glass)",
    brandNote: "Metal framing, gypsum board, and toughened glass from ISI/BIS-compliant authorised Purnia/Forbesganj dealers — glass is always toughened safety glass, never plain sheet.",
    brandNoteHi: "मेटल फ्रेमिंग, Gypsum Board और टफन्ड ग्लास — ISI/BIS-अनुरूप अधिकृत डीलरों से। ग्लास हमेशा टफन्ड सेफ्टी ग्लास, प्लेन शीट कभी नहीं।",
    availability: "Gypsum partitions across our full service area. Glass partitions most requested in Forbesganj/Araria offices; other towns need 2–4 extra days as glass is cut in Purnia.",
    availabilityHi: "Gypsum पार्टीशन पूरे सर्विस एरिया में। ग्लास पार्टीशन ज़्यादातर फारबिसगंज/अररिया ऑफिस में; बाकी शहरों में 2–4 दिन ज़्यादा, क्योंकि ग्लास पूर्णिया से कटती है।",
    installTime: "2–4 days depending on length and gypsum vs glass",
    maintenance: "Gypsum side: dust occasionally. Glass side: wipe with glass cleaner.",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A new dividing wall inside an existing room without floor or slab masonry. Two options: a gypsum partition (metal studs with board on both faces, finished like a normal wall) or a glass partition (aluminium-framed toughened glass that divides space while keeping light open).",
    whatItIsHi:
      "मौजूदा कमरे के अंदर, बिना ईंट-गारे के, एक नई विभाजक दीवार। दो विकल्प: Gypsum पार्टीशन (मेटल स्टड पर दोनों तरफ बोर्ड, सामान्य दीवार जैसी फिनिश) या ग्लास पार्टीशन (एल्युमिनियम फ्रेम में टफन्ड ग्लास, जो जगह बांटती है पर रोशनी खुली रखती है)।",
    whereUsed: [
      "Office cabins carved from one open floor",
      "Reception separated from the working floor with glass",
      "A large bedroom split into a study or wardrobe (gypsum)",
      "Shops needing a stockroom or billing counter",
    ],
    whereUsedHi: [
      "खुले ऑफिस फ्लोर से बने केबिन में",
      "ग्लास से अलग किए रिसेप्शन एरिया में",
      "बड़े बेडरूम में स्टडी या वार्डरोब बनाने के लिए (Gypsum)",
      "दुकान में स्टॉकरूम या बिलिंग काउंटर के लिए",
    ],
    whereNotUsed: [
      "Load-bearing use — these are non-structural walls only",
      "Full-height glass near small children without safety film",
      "Wet-area boundaries (bathroom walls) — use masonry or PVC instead",
    ],
    whereNotUsedHi: [
      "लोड-बेयरिंग में नहीं — ये सिर्फ नॉन-स्ट्रक्चरल दीवार हैं",
      "छोटे बच्चों वाले घर में बिना सेफ्टी फिल्म फुल-हाइट ग्लास नहीं",
      "गीली जगह की बाउंड्री में नहीं — वहां मेसनरी या PVC लगाएं",
    ],
    benefits: [
      "No masonry, no wet work — a room splits in days, not weeks",
      "Gypsum takes wall-mounted units like a normal wall",
      "Glass keeps a room open and lets daylight travel",
      "Both types are removable if your layout changes later",
      "Rockwool infill adds real sound reduction between cabins",
    ],
    benefitsHi: [
      "कोई मेसनरी या गीला काम नहीं — कमरा दिनों में बंटता है",
      "Gypsum पर दीवार जैसी चीज़ें लगाई जा सकती हैं",
      "ग्लास कमरे को खुला रखती है, रोशनी आने देती है",
      "दोनों हटाए जा सकते हैं, लेआउट बदलना आसान",
      "रॉकवूल इनफिल से केबिनों के बीच सच में शोर कम",
    ],
    limitations: [
      "Not a structural wall — cannot bear building loads",
      "Gypsum side isn't waterproof — keep out of wet zones",
      "Glass costs noticeably more than gypsum for the same area",
      "Plain gypsum partition is sound-reducing, not soundproof",
    ],
    limitationsHi: [
      "स्ट्रक्चरल दीवार नहीं — इमारत का वज़न नहीं सहती",
      "Gypsum साइड वॉटरप्रूफ नहीं — गीली जगह में न लगाएं",
      "समान एरिया में ग्लास, Gypsum से काफी महंगा",
      "साधारण Gypsum पार्टीशन शोर कम करती है, पूरी तरह साउंडप्रूफ नहीं",
    ],
    whatsIncluded: [
      "Metal stud framing (gypsum) or aluminium channel framing (glass)",
      "Board fixing on both faces, or glass panel fitting",
      "Rockwool acoustic infill, if specified",
      "Door frame and hardware, if included in the quote",
      "Jointing and finishing (gypsum) / silicone sealing (glass)",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "मेटल स्टड फ्रेमिंग (Gypsum) या एल्युमिनियम चैनल फ्रेमिंग (ग्लास)",
      "दोनों तरफ बोर्ड फिक्सिंग, या ग्लास पैनल फिटिंग",
      "अगर तय हो तो रॉकवूल एकॉस्टिक इनफिल",
      "अगर कोटेशन में हो तो दरवाज़े का फ्रेम और हार्डवेयर",
      "जॉइंटिंग और फिनिशिंग (Gypsum) / सिलिकॉन सीलिंग (ग्लास)",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Electrical wiring, switches, or sockets on the new wall — electrician's scope",
      "Any structural or load-bearing modification",
      "Safety-laminated film for glass, unless requested and quoted upfront",
    ],
    whatsNotIncludedHi: [
      "नई दीवार पर वायरिंग, स्विच या सॉकेट — इलेक्ट्रीशियन का काम",
      "कोई स्ट्रक्चरल या लोड-बेयरिंग बदलाव",
      "ग्लास के लिए सेफ्टी-लैमिनेटेड फिल्म, जब तक शुरू में न मांगी हो",
    ],
    materials: [
      { name: "Metal stud framing", nameHi: "मेटल स्टड फ्रेमिंग", detail: "Floor/ceiling track with vertical studs — the gypsum partition skeleton", detailHi: "फर्श/छत ट्रैक और वर्टिकल स्टड — Gypsum पार्टीशन का ढांचा" },
      { name: "Gypsum board (both faces)", nameHi: "जिप्सम बोर्ड (दोनों तरफ)", detail: "12.5mm boards fixed on each side, taped and finished like a wall", detailHi: "दोनों तरफ 12.5mm बोर्ड, दीवार जैसा टेप और फिनिश" },
      { name: "Rockwool infill (optional)", nameHi: "रॉकवूल इनफिल (वैकल्पिक)", detail: "Sound-absorbing insulation inside the stud cavity", detailHi: "स्टड के बीच साउंड-सोखने वाला इंसुलेशन" },
      { name: "Toughened glass + aluminium frame", nameHi: "टफन्ड ग्लास + एल्युमिनियम फ्रेम", detail: "8–12mm toughened glass, plain, frosted, or fluted-film", detailHi: "8–12mm टफन्ड ग्लास, प्लेन, फ्रॉस्टेड या फ्लूटेड-फिल्म" },
    ],
    installSteps: [
      { title: "Layout marking", titleHi: "लेआउट मार्किंग", desc: "The partition line, including the door opening, is marked on floor and ceiling.", descHi: "फर्श और छत पर पार्टीशन की लाइन, दरवाज़े समेत, मार्क करते हैं।" },
      { title: "Framing", titleHi: "फ्रेमिंग", desc: "Gypsum: tracks and studs. Glass: aluminium U-channels floor to ceiling.", descHi: "Gypsum: ट्रैक और स्टड। ग्लास: फर्श से छत तक एल्युमिनियम U-चैनल।" },
      { title: "Acoustic infill (if specified)", titleHi: "एकॉस्टिक इनफिल (अगर तय हो)", desc: "Rockwool is packed in before the second face closes.", descHi: "दूसरा फेस बंद होने से पहले रॉकवूल भरते हैं।" },
      { title: "Board / glass fitting", titleHi: "बोर्ड / ग्लास फिटिंग", desc: "Boards are screwed on both faces, or glass is lowered into the channel.", descHi: "दोनों तरफ बोर्ड स्क्रू, या ग्लास को चैनल में उतारते हैं।" },
      { title: "Door & finishing", titleHi: "दरवाज़ा और फिनिशिंग", desc: "Door fitted; gypsum joints finished / glass joints silicone-sealed.", descHi: "दरवाज़ा फिट; Gypsum जोड़ फिनिश / ग्लास जोड़ सिलिकॉन-सील।" },
      { title: "Clean & handover", titleHi: "सफाई और हैंडओवर", desc: "Surface cleaned, door checked, warranty handed over.", descHi: "सतह साफ, दरवाज़ा चेक, Warranty के साथ हैंडओवर।" },
    ],
    expertTip:
      "If you'll hang a TV, shelf, or unit on the partition, tell us at the site visit — we'll add solid backing inside the frame at that height. For glass near kids, ask for safety-laminated film upfront.",
    expertTipHi:
      "पार्टीशन पर TV, शेल्फ या यूनिट लगानी हो तो Site Visit पर बताएं — उसी ऊंचाई पर फ्रेम में ठोस बैकिंग लगा देंगे। बच्चों वाले घर में ग्लास पर सेफ्टी-लैमिनेटेड फिल्म शुरू में ही मांग लें।",
    realProject: {
      title: "Two-cabin office split, Forbesganj",
      titleHi: "दो-केबिन ऑफिस विभाजन, फारबिसगंज",
      desc: "A 300 sq.ft rented office split into two private cabins with rockwool gypsum partitions and a frosted-glass reception, keeping the front open.",
      descHi: "300 वर्ग फुट किराए का ऑफिस — रॉकवूल Gypsum पार्टीशन से दो केबिन और फ्रॉस्टेड ग्लास से रिसेप्शन, सामने का हिस्सा खुला।",
      photos: 20,
    },
    faqs: [
      { q: "Can a partition wall hold a wall-mounted TV or shelves?", qHi: "क्या पार्टीशन पर TV या शेल्फ लग सकती है?", a: "Yes, if we know in advance — we add solid backing inside the frame at the mounting height so screws bite into it, not just the board. Tell us at the site-visit stage.", aHi: "हां, बशर्ते पहले बताएं — उसी ऊंचाई पर फ्रेम में ठोस बैकिंग लगा देते हैं ताकि स्क्रू उसमें बैठे। यह Site Visit पर बता दें।" },
      { q: "How much sound does a gypsum partition block?", qHi: "जिप्सम पार्टीशन कितना शोर रोकती है?", a: "A plain double-layer partition cuts normal conversation noise noticeably but isn't soundproof. Rockwool infill improves it — enough for office cabins, not a studio.", aHi: "साधारण डबल-लेयर पार्टीशन सामान्य बातचीत का शोर काफी कम करती है, पर साउंडप्रूफ नहीं। रॉकवूल से बेहतर — ऑफिस केबिन के लिए काफी, स्टूडियो के लिए नहीं।" },
      { q: "Is glass partition safe with kids around?", qHi: "बच्चे हों तो ग्लास पार्टीशन सुरक्षित है?", a: "We use toughened glass as standard, which breaks into small blunt pieces. For homes with young kids we also recommend a safety-laminated film — ask for it when we quote.", aHi: "हम स्टैंडर्ड में टफन्ड ग्लास लगाते हैं, जो छोटे-कुंद टुकड़ों में टूटता है। छोटे बच्चों के लिए सेफ्टी-लैमिनेटेड फिल्म भी सुझाते हैं — Quotation में मांग लें।" },
    ],
    relatedSlugs: ["grid-ceiling", "wpc-wall-panel", "gypsum-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "wpc-wall-panel",
    icon: PanelTop,
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    category: "Wall",
    categoryHi: "वॉल",
    tagline: "Real-wood look for a TV wall at ~60% of timber's cost",
    taglineHi: "असली लकड़ी जैसा लुक, टिम्बर से ~60% कम कीमत में",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹650/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹180–₹250/sq.ft", desc: "Plain/solid-colour panel, basic clip system, 8mm profile.", descHi: "प्लेन/सॉलिड-कलर पैनल, बेसिक क्लिप सिस्टम, 8mm प्रोफाइल।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹260–₹380/sq.ft", desc: "Wood-grain or grooved texture, 12–15mm profile.", descHi: "वुड-ग्रेन या ग्रूव्ड टेक्सचर, 12–15mm प्रोफाइल।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹390–₹650/sq.ft", desc: "Fluted/louvre textures with an LED backlight channel, 18–25mm depth.", descHi: "LED बैकलाइट चैनल के साथ Fluted/Louver टेक्सचर, 18–25mm डेप्थ।" },
    ],
    sizesThickness: "Widths 250mm–600mm, lengths 8ft/10ft, cut to your wall on-site. Profile depth 8mm (plain) up to 18–25mm for fluted/louvre designs.",
    sizesThicknessHi: "चौड़ाई 250mm–600mm, लंबाई 8ft/10ft, दीवार के साइज़ पर काटे जाते हैं। प्रोफाइल डेप्थ प्लेन में 8mm से Fluted/Louver में 18–25mm तक।",
    labourCost: "Labour (batten fixing, clipping, trims, LED wiring if included) is roughly ₹25–45/sq.ft, included above — fluted/louvre takes longer than plain panels.",
    labourCostHi: "बैटन फिक्सिंग, क्लिपिंग, ट्रिम्स और LED वायरिंग (अगर हो) की लेबर करीब ₹25–45/sq.ft, रेट में शामिल — Fluted/Louver में ज़्यादा समय।",
    labourCostShort: "₹25–45/sq.ft",
    brandNote: "ISI-compliant branded composite WPC from authorised dealers — not the thin unbranded WPC sold loose locally, which warps faster. Brand and texture sample shown at the site visit.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड कम्पोजिट WPC, अधिकृत डीलरों से — लोकल में खुला बिकने वाला पतला अनब्रांडेड नहीं, जो जल्दी मुड़ता है। सैंपल Site Visit में दिखाते हैं।",
    availability: "Available across our full service area. TV-wall panelling is our most-requested WPC job in Forbesganj and Araria.",
    availabilityHi: "पूरे सर्विस एरिया में उपलब्ध। TV Wall पैनलिंग फारबिसगंज-अररिया में हमारा सबसे मांगा जाने वाला WPC काम।",
    installTime: "1 day for a TV wall, 2–3 days for a full room",
    maintenance: "Wipe with a dry cloth — no polish or varnish, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "WPC (Wood Plastic Composite) panels are recycled wood fibre bonded with polymer, finished in wood-grain, fluted, or grooved surfaces. They clip onto wall battens — no visible nails — and because the core is part-plastic, they don't warp, swell, or attract termites in Bihar's humid climate.",
    whatItIsHi:
      "WPC वॉल पैनल रीसाइकल्ड लकड़ी के रेशों को पॉलिमर से जोड़कर बनते हैं, वुड-ग्रेन, Fluted या ग्रूव्ड फिनिश में। ये दीवार की बैटन में क्लिप होते हैं — कोई कील नहीं दिखती। कोर आधा-प्लास्टिक होने से बिहार की नमी में न मुड़ते, न फूलते, न दीमक लगती है।",
    whereUsed: [
      "TV wall / accent wall in the living room",
      "Bedroom headboard wall",
      "Office reception and cabin walls",
      "Hotel lobby and restaurant feature walls",
    ],
    whereUsedHi: [
      "लिविंग रूम की TV Wall या एक्सेंट वॉल पर",
      "बेडरूम की हेडबोर्ड दीवार पर",
      "ऑफिस रिसेप्शन और केबिन की दीवार पर",
      "होटल लॉबी और रेस्टोरेंट की फीचर वॉल पर",
    ],
    whereNotUsed: [
      "Ceilings — WPC is a wall product; use PVC or gypsum overhead",
      "Constantly-wet surfaces — it's moisture-resistant, not for standing water",
      "Load-bearing use — it's a cladding finish, not a wall",
    ],
    whereNotUsedHi: [
      "सीलिंग में नहीं — यह दीवार का प्रोडक्ट है, ऊपर PVC/Gypsum लगाएं",
      "लगातार गीली सतह पर नहीं — नमी-रोधी है, खड़े पानी के लिए नहीं",
      "लोड-बेयरिंग में नहीं — यह क्लैडिंग है, खुद दीवार नहीं",
    ],
    benefits: [
      "Premium wood look at ~60% of real timber panelling cost",
      "Moisture and termite resistant — outlasts real wood in monsoon climate",
      "Zero maintenance — no polish or varnish ever",
      "Clip-fix install with no visible nails or screws",
      "50+ colours and textures, including trending fluted/louvre",
    ],
    benefitsHi: [
      "असली टिम्बर से ~60% कम कीमत में प्रीमियम लकड़ी जैसा लुक",
      "नमी और दीमक से सुरक्षित — मानसून में असली लकड़ी से टिकाऊ",
      "ज़ीरो मेंटेनेंस — कभी पॉलिश या वार्निश नहीं",
      "क्लिप-फिक्स इंस्टॉल, सामने कोई कील/स्क्रू नहीं",
      "50+ रंग-टेक्सचर, ट्रेंडिंग Fluted/Louver समेत",
    ],
    limitations: [
      "Costs more per sq.ft than UV marble sheet for the same wall",
      "Limited custom shaping vs gypsum — it's a flat/fluted panel system",
      "A deeply gouged panel needs that section replaced, not touched up",
    ],
    limitationsHi: [
      "समान दीवार के लिए UV Marble Sheet से ज़्यादा महंगा",
      "Gypsum के मुकाबले कस्टम शेपिंग सीमित — फ्लैट/Fluted पैनल सिस्टम",
      "गहरा खरोंच लगे पैनल को उस हिस्से में बदलना पड़ता है",
    ],
    whatsIncluded: [
      "Batten fixing to the wall (vertical or horizontal)",
      "Panel cutting and clip-fixing, tongue-and-groove aligned",
      "Edge and corner trims for a factory-finished look",
      "LED backlight wiring behind the panel, if in your design",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "दीवार पर बैटन फिक्सिंग (वर्टिकल या हॉरिज़ॉन्टल)",
      "पैनल कटिंग और क्लिप-फिक्सिंग, टंग-एंड-ग्रूव से मिलान",
      "फैक्ट्री-फिनिश लुक के लिए एज और कॉर्नर ट्रिम्स",
      "अगर डिज़ाइन में हो तो पैनल के पीछे LED बैकलाइट वायरिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "LED driver wiring back to the main switchboard — electrician's scope",
      "Plastering or repairing a badly damaged wall first — masonry work",
      "Replacing a deeply gouged panel after warranty — billed separately if needed",
    ],
    whatsNotIncludedHi: [
      "LED ड्राइवर की मुख्य स्विचबोर्ड तक वायरिंग — इलेक्ट्रीशियन का काम",
      "बुरी तरह खराब दीवार का प्लास्टर/मरम्मत पहले — मेसनरी का काम",
      "Warranty के बाद गहरा खरोंच लगा पैनल बदलना — ज़रूरत पर अलग बिल",
    ],
    materials: [
      { name: "WPC panel board", nameHi: "WPC पैनल बोर्ड", detail: "Wood-fibre + polymer core in plain, wood-grain, fluted, or 3D finishes", detailHi: "वुड-फाइबर + पॉलिमर कोर, प्लेन, वुड-ग्रेन, Fluted या 3D फिनिश में" },
      { name: "Batten/clip system", nameHi: "बैटन/क्लिप सिस्टम", detail: "Battens on the wall; panels clip in without face-fixing", detailHi: "दीवार पर बैटन; पैनल बिना सामने से फिक्स किए क्लिप होते हैं" },
      { name: "Edge/corner trims", nameHi: "एज/कॉर्नर ट्रिम्स", detail: "Matching trims that close panel edges and corners cleanly", detailHi: "मैचिंग ट्रिम, जो किनारे और कोने साफ बंद करते हैं" },
    ],
    installSteps: [
      { title: "Wall check", titleHi: "दीवार की जांच", desc: "The wall is checked for dryness and cracks are filled before framing.", descHi: "फ्रेमिंग से पहले दीवार की सूखापन जांचकर दरारें भरते हैं।" },
      { title: "Batten fixing", titleHi: "बैटन फिक्सिंग", desc: "Battens are fixed to the wall at standard spacing.", descHi: "दीवार में तय दूरी पर बैटन फिक्स करते हैं।" },
      { title: "Panel cutting & clipping", titleHi: "पैनल कटिंग और क्लिपिंग", desc: "Panels are cut to size and clip-fixed onto the battens.", descHi: "पैनल नाप में काटकर बैटन में क्लिप करते हैं।" },
      { title: "LED wiring (if in design)", titleHi: "LED वायरिंग (अगर हो)", desc: "Backlight wiring is routed behind the panel before the last section closes.", descHi: "आखिरी हिस्सा बंद होने से पहले बैकलाइट वायरिंग पीछे से निकालते हैं।" },
      { title: "Corner & edge trims", titleHi: "कॉर्नर और एज ट्रिम्स", desc: "Matching trims close off every exposed edge.", descHi: "हर खुले किनारे पर मैचिंग ट्रिम लगाते हैं।" },
      { title: "Wipe & handover", titleHi: "सफाई और हैंडओवर", desc: "Panels wiped clean — no curing time before the wall is ready.", descHi: "पैनल पोंछते ही दीवार तैयार, कोई क्योरिंग नहीं।" },
    ],
    expertTip:
      "Decide on LED backlighting before we start — the wiring runs behind the panel. Bring your TV's size and wall-mount bracket to the site visit so the layout and TV backing are planned from day one.",
    expertTipHi:
      "LED बैकलाइट काम शुरू होने से पहले तय करें — वायरिंग पैनल के पीछे जाती है। Site Visit पर TV का साइज़ और वॉल-माउंट ब्रैकेट लाएं ताकि लेआउट और TV बैकिंग शुरू से प्लान हो।",
    realProject: {
      title: "Fluted TV wall with LED backlight, Jogbani",
      titleHi: "LED बैकलाइट के साथ फ्लूटेड TV वॉल, जोगबनी",
      desc: "A 12 ft living-room TV wall in walnut-tone fluted WPC with a hidden LED strip along the top edge — ready to mount the TV the same day.",
      descHi: "12 फुट की TV Wall, वॉलनट-टोन Fluted WPC में, ऊपरी किनारे पर छुपी LED Strip के साथ — उसी दिन TV लगाने के लिए तैयार।",
      photos: 20,
    },
    faqs: [
      { q: "Does WPC really look like real wood?", qHi: "क्या WPC सच में असली लकड़ी जैसी दिखती है?", a: "The better wood-grain and fluted textures read as real wood from normal distance — most customers are surprised it isn't timber. We show a physical sample at the site visit.", aHi: "बेहतर वुड-ग्रेन और Fluted टेक्सचर सामान्य दूरी से असली लकड़ी जैसे लगते हैं — ज़्यादातर ग्राहक हैरान होते हैं। Site Visit पर असली सैंपल दिखाते हैं।" },
      { q: "How much would a standard TV wall cost?", qHi: "एक सामान्य TV वॉल में कितना खर्च?", a: "A typical 10×10 ft TV wall (100 sq.ft) in mid-range fluted WPC works out to roughly ₹18,000–₹30,000 including battens, trims, and basic LED wiring.", aHi: "एक सामान्य 10×10 फुट (100 वर्ग फुट) TV Wall, मिड-रेंज Fluted WPC में लगभग ₹18,000–₹30,000 — बैटन, ट्रिम्स और बेसिक LED वायरिंग समेत।" },
      { q: "Can WPC be installed over a tiled or painted wall?", qHi: "क्या टाइल या पेंट वाली दीवार पर WPC लग सकती है?", a: "Yes — panels clip onto battens, so we fix battens straight over sound tile or an existing surface. The wall only needs to be structurally solid, not perfectly smooth.", aHi: "हां — पैनल बैटन में क्लिप होते हैं, तो मज़बूत टाइल या मौजूदा सतह के ऊपर सीधे बैटन लगा देते हैं। दीवार बस मज़बूत हो, बिल्कुल स्मूथ ज़रूरी नहीं।" },
    ],
    relatedSlugs: ["uv-marble-sheet", "modular-tv-unit", "partition-wall"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "uv-marble-sheet",
    icon: Gem,
    name: "UV Marble Sheet",
    nameHi: "UV मार्बल शीट",
    category: "Wall",
    categoryHi: "वॉल",
    tagline: "Marble look for pooja rooms and bathrooms, at a fraction of stone cost",
    taglineHi: "पूजा घर और बाथरूम के लिए मार्बल जैसा लुक, पत्थर से बहुत कम कीमत में",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹45–₹120/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹60/sq.ft", desc: "Basic marble-print sheet, standard gloss, 3mm thickness.", descHi: "बेसिक मार्बल-प्रिंट शीट, स्टैंडर्ड ग्लॉस, 3mm मोटाई।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹65–₹85/sq.ft", desc: "Better veining, higher-gloss finish, 4mm thickness.", descHi: "बेहतर वेनिंग, ज़्यादा ग्लॉस फिनिश, 4mm मोटाई।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹120/sq.ft", desc: "Premium granite/exotic print, 5–6mm, anti-fingerprint coating.", descHi: "प्रीमियम ग्रेनाइट/विदेशी प्रिंट, 5–6mm, एंटी-फिंगरप्रिंट कोटिंग।" },
    ],
    sizesThickness: "Standard 8×4 ft (2440×1220mm) sheets, 3–6mm thick by tier — thicker sheets resist scratching better in a busy kitchen.",
    sizesThicknessHi: "स्टैंडर्ड 8×4 फुट (2440×1220mm) शीट, मोटाई 3–6mm — मोटी शीट व्यस्त किचन में खरोंच से ज़्यादा बचाती है।",
    labourCost: "Labour (surface prep, adhesive/clip fixing, edge beading) is roughly ₹15–25/sq.ft, included above.",
    labourCostHi: "सतह की तैयारी, एडहेसिव/क्लिप फिक्सिंग और एज बीडिंग की लेबर करीब ₹15–25/sq.ft, रेट में शामिल।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI-compliant branded PVC-based sheets from authorised Purnia/Forbesganj dealers — sample book shown on-site so you see the real sheen and veining before ordering.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड PVC-आधारित शीट, अधिकृत पूर्णिया/फारबिसगंज डीलरों से — ऑर्डर से पहले साइट पर सैंपल बुक दिखाते हैं।",
    availability: "Available across our full service area. Bathroom and pooja-room UV marble is the most common request in Forbesganj, Araria, and Jogbani.",
    availabilityHi: "पूरे सर्विस एरिया में उपलब्ध। बाथरूम और पूजा-घर की UV Marble फारबिसगंज, अररिया, जोगबनी में सबसे ज़्यादा मांगी जाती है।",
    installTime: "1–2 days per room",
    maintenance: "Zero — wipe with a damp cloth, no polishing needed",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A high-gloss PVC-based panel with a marble or granite pattern UV-cured onto the surface and sealed under a scratch-resistant coating. Bonded or clip-fixed to a prepared wall for a seamless stone look — no grout lines to blacken — at a fraction of real marble's cost.",
    whatItIsHi:
      "UV Marble Sheet एक हाई-ग्लॉस PVC-आधारित पैनल है, जिसकी सतह पर मार्बल/ग्रेनाइट पैटर्न UV-क्योर करके स्क्रैच-रेजिस्टेंट कोटिंग से सील किया जाता है। तैयार दीवार पर सीधे बॉन्ड/क्लिप होकर बिना जोड़, पत्थर जैसा लुक देती है — काली पड़ने वाली ग्राउट लाइन नहीं — असली मार्बल से बहुत कम कीमत में।",
    whereUsed: [
      "Bathroom walls — no grout lines to blacken, unlike tiles",
      "Kitchen walls away from direct flame (backsplash, side walls)",
      "Pooja room walls — the marble-print look most families want",
      "Living room feature walls wanting a stone look",
    ],
    whereUsedHi: [
      "बाथरूम की दीवार पर — टाइल जैसी काली ग्राउट लाइन नहीं",
      "सीधी आंच से दूर किचन की दीवार पर (बैकस्प्लैश, साइड)",
      "पूजा घर की दीवार पर — ज़्यादातर परिवारों की पसंद का मार्बल लुक",
      "लिविंग रूम की फीचर वॉल पर, जहां पत्थर जैसा लुक चाहिए",
    ],
    whereNotUsed: [
      "Directly behind a gas stove or high-heat surface — the PVC base isn't heat-rated",
      "Outdoor walls in years of harsh sun — UV print can fade faster than stone",
      "Floors — this is wall cladding, not flooring",
    ],
    whereNotUsedHi: [
      "सीधे गैस चूल्हे के पीछे या तेज़ गर्मी वाली सतह पर नहीं — PVC बेस गर्मी के लिए नहीं",
      "सालों तक तेज़ धूप वाली बाहरी दीवार पर नहीं — UV प्रिंट जल्दी फीका पड़ सकता है",
      "फर्श पर नहीं — यह दीवार क्लैडिंग है, फ्लोरिंग नहीं",
    ],
    benefits: [
      "Real marble/granite look at ~70–80% less than actual stone",
      "100% waterproof — ideal for bathroom and kitchen walls",
      "No grout lines — stays clean far longer than tile",
      "Lightweight — no structural load on the wall",
      "Scratch-resistant, hygienic, easy to clean",
    ],
    benefitsHi: [
      "असली मार्बल/ग्रेनाइट से ~70–80% कम कीमत में वही लुक",
      "100% वॉटरप्रूफ — बाथरूम और किचन की दीवार के लिए आदर्श",
      "कोई ग्राउट लाइन नहीं — टाइल से ज़्यादा देर साफ रहती है",
      "हल्का वज़न — दीवार पर कोई स्ट्रक्चरल भार नहीं",
      "स्क्रैच-रेजिस्टेंट, स्वच्छ, आसानी से साफ",
    ],
    limitations: [
      "Not heat-resistant — keep away from direct flame or hot surfaces",
      "A deep scratch shows and can't be re-ground like polished stone",
      "Less premium resale perception than genuine natural stone",
    ],
    limitationsHi: [
      "गर्मी सहने वाली नहीं — सीधी आंच या गर्म सतह से दूर रखें",
      "गहरी खरोंच दिखती है, पॉलिश्ड पत्थर की तरह दोबारा घिस नहीं सकते",
      "असली पत्थर जैसा प्रीमियम रीसेल टैग नहीं",
    ],
    whatsIncluded: [
      "Wall prep — cleaning, crack filling, and levelling",
      "Sheet cutting and layout so veining aligns at joints",
      "Bonding or clip-fixing onto the prepared wall",
      "Edge and corner beading for a seamless finish",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "दीवार की तैयारी — सफाई, दरार भरना, लेवलिंग",
      "शीट कटिंग और लेआउट, ताकि जोड़ों पर नसें मिलें",
      "तैयार दीवार पर बॉन्डिंग या क्लिप-फिक्सिंग",
      "सीमलेस फिनिश के लिए एज और कॉर्नर बीडिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Heavy plaster repair or waterproofing of the wall base — masonry work, done separately first",
      "Plumbing or electrical fixture relocation behind the wall",
      "Replacing a sheet cracked or scratched after handover — billed separately if needed",
    ],
    whatsNotIncludedHi: [
      "दीवार बेस का भारी प्लास्टर रिपेयर या वॉटरप्रूफिंग — मेसनरी का काम, पहले अलग से",
      "दीवार के पीछे प्लंबिंग या इलेक्ट्रिकल फिक्स्चर शिफ्ट करना",
      "हैंडओवर के बाद टूटी/खरोंची शीट बदलना — ज़रूरत पर अलग बिल",
    ],
    materials: [
      { name: "UV-printed PVC marble sheet", nameHi: "UV-प्रिंटेड PVC मार्बल शीट", detail: "High-gloss sheet with marble/granite pattern UV-cured and sealed", detailHi: "हाई-ग्लॉस शीट, मार्बल/ग्रेनाइट पैटर्न UV-क्योर करके सील किया" },
      { name: "Marine-grade adhesive / clip channel", nameHi: "मरीन-ग्रेड एडहेसिव / क्लिप चैनल", detail: "Bonds or clip-fixes the sheet to a prepared wall", detailHi: "सतह के हिसाब से शीट को दीवार पर चिपकाते या क्लिप करते हैं" },
      { name: "Edge/corner beading", nameHi: "एज/कॉर्नर बीडिंग", detail: "Matching trims finish exposed edges and corners", detailHi: "मैचिंग ट्रिम, खुले किनारे और कोनों को फिनिश देते हैं" },
    ],
    installSteps: [
      { title: "Wall preparation", titleHi: "दीवार की तैयारी", desc: "The wall is cleaned, cracks filled, and levelled so the sheet bonds flat.", descHi: "दीवार साफ, दरारें भरकर लेवल करते हैं ताकि शीट फ्लैट चिपके।" },
      { title: "Layout & cutting", titleHi: "लेआउट और कटिंग", desc: "Sheets are measured and cut so the pattern lines up at joints.", descHi: "शीट नापकर काटते हैं, ताकि जोड़ों पर पैटर्न मिले।" },
      { title: "Bonding / clip-fixing", titleHi: "बॉन्डिंग / क्लिप-फिक्सिंग", desc: "Sheets are adhered or clipped on, per the wall type.", descHi: "दीवार के अनुसार शीट को चिपकाते या क्लिप करते हैं।" },
      { title: "Joint alignment", titleHi: "जोड़ मिलान", desc: "Adjacent sheets are aligned so the veining reads as continuous.", descHi: "पास-पास शीट मिलाते हैं ताकि नसें लगातार दिखें।" },
      { title: "Edge beading", titleHi: "एज बीडिंग", desc: "Corners and edges get a finishing bead.", descHi: "कोनों और किनारों पर फिनिशिंग बीड लगाते हैं।" },
      { title: "Polish & handover", titleHi: "पॉलिश और हैंडओवर", desc: "A final wipe brings up the gloss — ready to use immediately.", descHi: "आखिरी पोंछे से ग्लॉस निखरता है — तुरंत इस्तेमाल के लिए तैयार।" },
    ],
    expertTip:
      "Ask to see the veining on a full physical sheet at the site visit, not just a small chip — the pattern reads very differently across a whole wall.",
    expertTipHi:
      "Site Visit पर छोटे चिप नहीं, पूरी शीट पर नसों का पैटर्न देखकर तय करें — पूरी दीवार पर पैटर्न अलग दिखता है।",
    realProject: {
      title: "Pooja room marble-finish wall, Purnia",
      titleHi: "पूजा घर मार्बल-फिनिश दीवार, पूर्णिया",
      desc: "A small pooja room finished floor-to-ceiling in white-and-gold veined UV marble with a recessed LED niche — completed in a single day with no stone-cutting dust.",
      descHi: "छोटा पूजा घर, फर्श से छत तक सफेद-सुनहरी नसों वाली UV Marble में, मूर्ति के लिए LED आले के साथ — एक ही दिन में, बिना पत्थर काटने की धूल।",
      photos: 20,
    },
    faqs: [
      { q: "Can UV marble go on the wall behind the kitchen stove?", qHi: "क्या चूल्हे के पीछे की दीवार पर UV मार्बल लगे?", a: "We avoid the wall right behind the flame — direct heat can affect the PVC base. For that strip we suggest ceramic tile or a metal splashback, and UV marble on the rest.", aHi: "आंच के ठीक पीछे की दीवार पर हम नहीं लगाते — सीधी गर्मी से PVC बेस पर असर पड़ सकता है। उस हिस्से में सेरेमिक टाइल या मेटल स्प्लैशबैक, बाकी दीवारों पर UV Marble।" },
      { q: "Does UV marble sheet need grout like tiles?", qHi: "क्या टाइल की तरह UV मार्बल में ग्राउट लगती है?", a: "No — sheets fit edge-to-edge with the pattern aligned, so there's no grout line. That means no line that turns black with mould over the years.", aHi: "नहीं — शीट किनारे से किनारे तक पैटर्न मिलाकर लगती हैं, कोई ग्राउट लाइन नहीं। यानी सालों में काली पड़ने वाली कोई लाइन नहीं।" },
      { q: "UV marble sheet or WPC panel for a wall?", qHi: "दीवार के लिए UV मार्बल या WPC?", a: "UV marble gives a stone look and is fully waterproof at a lower price; WPC gives a wood look and is moisture-resistant at a higher price. Bathroom/pooja → UV marble; TV wall/bedroom → WPC.", aHi: "UV Marble पत्थर जैसा लुक और कम कीमत में पूरी वॉटरप्रूफ; WPC लकड़ी जैसा लुक, ज़्यादा कीमत में नमी-रोधी। बाथरूम/पूजा → UV Marble; TV Wall/बेडरूम → WPC।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "modular-tv-unit"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "modular-tv-unit",
    icon: Tv,
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    category: "Furniture",
    categoryHi: "फर्नीचर",
    tagline: "Built to your wall's exact width — not a catalogue template",
    taglineHi: "आपकी दीवार की सही नाप पर बनी — कैटलॉग टेम्पलेट नहीं",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    galleryCategory: "TV Unit Design",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹15,000–₹25,000", desc: "6–8 ft unit, laminate finish, basic hinges, no LED.", descHi: "6–8 फुट यूनिट, लैमिनेट फिनिश, बेसिक हिंज, बिना LED।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹26,000–₹45,000", desc: "8–10 ft unit, better finish, soft-close hardware, optional LED.", descHi: "8–10 फुट यूनिट, बेहतर फिनिश, सॉफ्ट-क्लोज़ हार्डवेयर, वैकल्पिक LED।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹46,000–₹75,000+", desc: "10–14 ft unit, premium veneer/gloss, LED backlight, extra storage.", descHi: "10–14 फुट यूनिट, प्रीमियम वीनियर/ग्लॉस, LED बैकलाइट, ज़्यादा स्टोरेज।" },
    ],
    sizesThickness: "Custom-built to your wall's exact width (typically 6–14 ft). Carcass 18mm plywood/MDF, back panel 6mm, laminate face ~1mm — shutter/shelf thickness vary by design.",
    sizesThicknessHi: "आपकी दीवार की सही चौड़ाई (आमतौर पर 6–14 फुट) पर कस्टम। कारकास 18mm प्लाईवुड/MDF, बैक पैनल 6mm, लैमिनेट फेस ~1mm — शटर/शेल्फ डिज़ाइन अनुसार।",
    labourCost: "Fabrication and installation labour is bundled into the unit price — typically 25–35% of the total, more for extensive LED work or floating shelves.",
    labourCostHi: "फैब्रिकेशन और इंस्टॉलेशन की लेबर यूनिट कीमत में शामिल — आमतौर पर कुल का 25–35%, ज़्यादा LED या फ्लोटिंग शेल्फ वाली यूनिट में थोड़ा ज़्यादा।",
    labourCostShort: "25–35% of unit price",
    brandNote: "BWP/BWR-grade plywood or MDF from ISI-compliant branded stock, with branded laminate/veneer and soft-close hardware — brand options shown at the design stage.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड BWP/BWR-ग्रेड प्लाईवुड या MDF, ब्रांडेड लैमिनेट/वीनियर और सॉफ्ट-क्लोज़ हार्डवेयर के साथ — ब्रांड विकल्प डिज़ाइन स्टेज पर दिखाते हैं।",
    availability: "Delivered and installed across our full service area. Large premium units (10ft+) may need 5–7 days for fabrication, longer for outlying blocks.",
    availabilityHi: "पूरे सर्विस एरिया में डिलीवर और इंस्टॉल। बड़ी प्रीमियम यूनिट (10 फुट+) के लिए 5–7 दिन फैब्रिकेशन, दूर के इलाकों में थोड़ा ज़्यादा।",
    installTime: "3–5 days depending on size and design",
    maintenance: "Wipe with a dry cloth; avoid placing hot items directly on it",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A custom-built cabinet system — carcass, shutters, open shelves, and laminate or veneer finish — made to your exact wall width and TV size, not a fixed showroom piece. Cable routing is built in from the design stage, so TV, set-top box, and speaker wires stay hidden behind the unit.",
    whatItIsHi:
      "एक कस्टम कैबिनेट सिस्टम — कारकास, शटर, खुली शेल्फ, लैमिनेट/वीनियर फिनिश — आपकी दीवार की सही चौड़ाई और TV साइज़ पर बना, फिक्स्ड शोरूम पीस नहीं। केबल रूटिंग डिज़ाइन से ही शामिल, ताकि TV, सेट-टॉप बॉक्स और स्पीकर के तार यूनिट के पीछे छुपें।",
    whereUsed: [
      "Living rooms — the focal wall opposite the seating",
      "Bedrooms — a compact unit facing the bed",
      "Home theatre / media rooms with AV storage",
    ],
    whereUsedHi: [
      "लिविंग रूम में — बैठने की जगह के सामने वाली दीवार पर",
      "बेडरूम में — बिस्तर के सामने कॉम्पैक्ट यूनिट",
      "होम थिएटर/मीडिया रूम में, AV स्टोरेज के साथ",
    ],
    whereNotUsed: [
      "Damp or splash-prone walls — laminate/veneer isn't built for standing moisture",
      "Walls you plan to reconfigure soon — it's custom-built to that exact width",
    ],
    whereNotUsedHi: [
      "नमी या छींटे वाली दीवार पर नहीं — लैमिनेट/वीनियर खड़े पानी के लिए नहीं",
      "जल्द बदलने वाली दीवार पर नहीं — यह उसी चौड़ाई पर बनती है",
    ],
    benefits: [
      "Fits your exact wall width — no side gaps like an off-the-shelf unit",
      "Cable management built in — no visible wiring clutter",
      "Optional LED strip for a premium, showroom look",
      "Mix of closed cabinets and open shelves, sized to your needs",
      "Finish, colour, and hardware all chosen by you",
    ],
    benefitsHi: [
      "आपकी दीवार की सही चौड़ाई में फिट — साइड में गैप नहीं",
      "केबल मैनेजमेंट शामिल — तारों की गड़बड़ी नहीं दिखती",
      "प्रीमियम शोरूम लुक के लिए वैकल्पिक LED Strip",
      "बंद कैबिनेट और खुली शेल्फ का मिश्रण, ज़रूरत अनुसार",
      "फिनिश, रंग और हार्डवेयर सब आप चुनते हैं",
    ],
    limitations: [
      "Fixed design — moving it to another wall later isn't practical",
      "Takes longer than a ready-made unit since it's made to order",
      "Higher cost than a basic showroom unit for the customisation",
    ],
    limitationsHi: [
      "फिक्स्ड डिज़ाइन — बाद में दूसरी दीवार पर शिफ्ट करना व्यावहारिक नहीं",
      "ऑर्डर पर बनने से रेडीमेड यूनिट से ज़्यादा समय",
      "कस्टमाइज़ेशन की वजह से बेसिक शोरूम यूनिट से ज़्यादा कीमत",
    ],
    whatsIncluded: [
      "Site measurement and custom design finalisation with you",
      "Carcass fabrication with your chosen laminate or veneer",
      "Soft-close hinge and drawer hardware",
      "Cable-management channel built into the panel",
      "LED backlight wiring, if in your design",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "साइट माप और आपके साथ कस्टम डिज़ाइन फाइनल करना",
      "आपकी चुनी लैमिनेट/वीनियर में कारकास फैब्रिकेशन",
      "सॉफ्ट-क्लोज़ हिंज और दराज़ हार्डवेयर",
      "पैनल में बिल्ट-इन केबल-मैनेजमेंट चैनल",
      "अगर डिज़ाइन में हो तो LED बैकलाइट वायरिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "The TV wall-mount bracket or the TV itself — unless added to your quote",
      "A new electrical point/socket for the unit's LED — electrician's scope if none exists",
      "Relocating the finished unit to a different wall later",
    ],
    whatsNotIncludedHi: [
      "TV का वॉल-माउंट ब्रैकेट या TV खुद — जब तक कोटेशन में न हो",
      "यूनिट की LED के लिए नया इलेक्ट्रिकल पॉइंट — पहले से न हो तो इलेक्ट्रीशियन का काम",
      "बनी हुई यूनिट को बाद में दूसरी दीवार पर शिफ्ट करना",
    ],
    materials: [
      { name: "Plywood/MDF carcass", nameHi: "प्लाईवुड/MDF कारकास", detail: "Plywood for load areas, MDF where a smooth laminate finish is wanted", detailHi: "वज़न वाली जगह प्लाईवुड, स्मूथ लैमिनेट फिनिश के लिए MDF" },
      { name: "Laminate / veneer finish", nameHi: "लैमिनेट / वीनियर फिनिश", detail: "Matte, glossy, or wood-veneer options in dozens of colours", detailHi: "मैट, ग्लॉसी या वुड-वीनियर, दर्जनों रंगों में" },
      { name: "Soft-close hardware", nameHi: "सॉफ्ट-क्लोज़ हार्डवेयर", detail: "Hinges and channels that close silently, don't slam over years", detailHi: "टिका और चैनल, जो चुपचाप बंद होते हैं, पटकते नहीं" },
      { name: "LED strip + driver (optional)", nameHi: "LED स्ट्रिप + ड्राइवर (वैकल्पिक)", detail: "Backlight along shelf edges for a floating, showroom effect", detailHi: "शेल्फ किनारों पर बैकलाइट, फ्लोटिंग शोरूम जैसा असर" },
    ],
    installSteps: [
      { title: "Site measurement", titleHi: "साइट माप", desc: "Exact wall width, height, TV size, and socket positions are measured.", descHi: "दीवार की चौड़ाई, ऊंचाई, TV साइज़ और सॉकेट की जगह नापते हैं।" },
      { title: "Design finalisation", titleHi: "डिज़ाइन फाइनल करना", desc: "Layout, finish, colour, and LED options are agreed before fabrication.", descHi: "फैब्रिकेशन से पहले लेआउट, फिनिश, रंग और LED तय करते हैं।" },
      { title: "Module fabrication", titleHi: "मॉड्यूल फैब्रिकेशन", desc: "Carcass panels are cut, edge-banded, and laminated to the agreed finish.", descHi: "कारकास पैनल काटकर एज-बैंड कर तय फिनिश में लैमिनेट करते हैं।" },
      { title: "Wall bracket fixing", titleHi: "वॉल ब्रैकेट फिक्सिंग", desc: "Mounting battens are fixed to the wall at the correct height.", descHi: "सही ऊंचाई पर दीवार में माउंटिंग बैटन फिक्स करते हैं।" },
      { title: "Module installation", titleHi: "मॉड्यूल इंस्टॉलेशन", desc: "Modules are installed and levelled with the cable channel routed behind.", descHi: "मॉड्यूल इंस्टॉल कर लेवल करते हैं, केबल चैनल पीछे से निकालते हैं।" },
      { title: "Hardware, LED & handover", titleHi: "हार्डवेयर, LED और हैंडओवर", desc: "Hinges, channels, and LED fitted and tested; shutters checked; warranty handed over.", descHi: "हिंज, चैनल और LED फिट कर टेस्ट; शटर चेक; Warranty के साथ हैंडओवर।" },
    ],
    expertTip:
      "Bring your TV's exact size and count every box you want hidden inside — set-top box, router, console — before we finalise the design. The channel and compartments are built around that list.",
    expertTipHi:
      "डिज़ाइन फाइनल करने से पहले TV का सही साइज़ और अंदर छुपाने वाले सभी बॉक्स गिन लें — सेट-टॉप बॉक्स, राउटर, कंसोल। चैनल और कम्पार्टमेंट इसी लिस्ट पर बनते हैं।",
    realProject: {
      title: "10 ft floating LED TV unit, Forbesganj",
      titleHi: "10 फुट फ्लोटिंग LED TV यूनिट, फारबिसगंज",
      desc: "A wall-mounted 10 ft unit with a floating centre shelf, hidden LED strip, and closed side cabinets sized to store a set-top box and router out of sight.",
      descHi: "दीवार पर लगी 10 फुट यूनिट — फ्लोटिंग शेल्फ, छुपी LED Strip, और साइड कैबिनेट, जो सेट-टॉप बॉक्स और राउटर छुपाने के लिए बने।",
      photos: 8,
    },
    faqs: [
      { q: "How long after I confirm the design is the unit ready?", qHi: "डिज़ाइन कन्फर्म के बाद यूनिट कितने दिन में तैयार?", a: "Once design and finish are locked, fabrication and installation together take 3–5 days by size — a simple 6–8 ft unit is faster, a large LED unit closer to 5 days.", aHi: "डिज़ाइन और फिनिश तय होने के बाद, साइज़ अनुसार 3–5 दिन — साधारण 6–8 फुट जल्दी, बड़ी LED यूनिट करीब 5 दिन।" },
      { q: "Can the unit hide the router, set-top box, and cables?", qHi: "क्या यूनिट में राउटर, सेट-टॉप बॉक्स और तार छुपाए जा सकते हैं?", a: "Yes — that's what the cable channel is for. We route a hollow channel from the wall socket to a vented compartment, so devices sit inside with just the remote sensor visible.", aHi: "हां — केबल चैनल इसी के लिए है। सॉकेट से हवादार कम्पार्टमेंट तक खोखली चैनल निकालते हैं, ताकि डिवाइस अंदर छुपें, सिर्फ रिमोट सेंसर दिखे।" },
      { q: "What size unit suits a 10×12 ft living room?", qHi: "10×12 फुट लिविंग रूम के लिए कौन सा साइज़?", a: "An 8–10 ft wide unit usually balances the wall well. We confirm the exact size on-site against your actual wall and seating distance.", aHi: "8–10 फुट चौड़ी यूनिट आमतौर पर सही रहती है। सही साइज़ Site Visit में आपकी दीवार और बैठने की दूरी के हिसाब से तय करते हैं।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "gypsum-ceiling", "uv-marble-sheet"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "artificial-grass",
    icon: Trees,
    name: "Artificial Grass",
    nameHi: "आर्टिफिशियल घास",
    category: "Outdoor",
    categoryHi: "आउटडोर",
    tagline: "Evergreen balconies and feature walls — nothing to water",
    taglineHi: "हमेशा हरी बालकनी और फीचर वॉल — पानी देने की ज़रूरत नहीं",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    galleryCategory: "Artificial Grass",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹40–₹55/sq.ft", desc: "25–30mm pile, standard density — fine for a small balcony.", descHi: "25–30mm पाइल, स्टैंडर्ड डेंसिटी — छोटी बालकनी के लिए ठीक।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹60–₹85/sq.ft", desc: "35–40mm pile, denser turf, better UV treatment.", descHi: "35–40mm पाइल, ज़्यादा घनी टर्फ, बेहतर UV ट्रीटमेंट।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹150/sq.ft", desc: "40–50mm pile, premium density, longest-lasting colour/UV.", descHi: "40–50mm पाइल, प्रीमियम डेंसिटी, सबसे लंबे समय टिकने वाला रंग/UV।" },
    ],
    sizesThickness: "Standard roll widths of 2m and 4m, joined with seam tape for wider areas. Pile height 25–50mm by tier.",
    sizesThicknessHi: "स्टैंडर्ड 2m और 4m चौड़ाई के रोल, बड़ी जगह के लिए सीम टेप से जुड़ते हैं। पाइल हाइट 25–50mm।",
    labourCost: "Labour (base/drainage prep, laying, seam joining, edge fixing) is roughly ₹8–15/sq.ft for floors and ₹15–25/sq.ft for wall panels, included above.",
    labourCostHi: "बेस/ड्रेनेज तैयारी, बिछाना, सीम जोड़ना और एज फिक्सिंग की लेबर फर्श के लिए ₹8–15/sq.ft, दीवार पैनल के लिए ₹15–25/sq.ft, रेट में शामिल।",
    labourCostShort: "₹8–15/sq.ft (floor) · ₹15–25/sq.ft (wall)",
    brandNote: "UV-stabilised synthetic turf from our regular Purnia suppliers — we check UV treatment and density before ordering, since untreated turf fades within a season in North Bihar's sun.",
    brandNoteHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ, नियमित पूर्णिया सप्लायर से — ऑर्डर से पहले UV ट्रीटमेंट और डेंसिटी जांचते हैं, क्योंकि अनट्रीटेड टर्फ धूप में एक सीज़न में फीकी पड़ जाती है।",
    availability: "Available across our full service area. Balcony/terrace turf is most requested in Forbesganj, Araria, and Raniganj; premium rolls need a couple of extra days in outlying blocks.",
    availabilityHi: "पूरे सर्विस एरिया में उपलब्ध। बालकनी/टैरेस टर्फ फारबिसगंज, अररिया, रानीगंज में सबसे ज़्यादा; प्रीमियम रोल दूर के इलाकों में कुछ दिन ज़्यादा लेते हैं।",
    installTime: "Half a day to 1 day for a typical balcony or wall",
    maintenance: "Occasional rinse and a light brush — no mowing or watering, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "UV-stabilised synthetic turf, rolled over a drained base for floor use, or mounted as pre-cut panels on a batten frame for a green feature wall. The permeable backing drains rainwater straight through, and the UV-treated colour doesn't bleach in direct North Bihar sun the way cheap turf does.",
    whatItIsHi:
      "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ, फर्श के लिए अच्छी ड्रेनेज वाली बेस पर बिछाई जाती है, या ग्रीन फीचर वॉल के लिए बैटन फ्रेम पर पैनल के रूप में लगती है। पारगम्य बैकिंग बारिश का पानी सीधे निकाल देती है, और UV-ट्रीटेड रंग उत्तर बिहार की धूप में सस्ती टर्फ जैसा फीका नहीं पड़ता।",
    whereUsed: [
      "Balconies and terraces — evergreen with zero watering or mowing",
      "Feature walls in a living room or office for a green accent",
      "Small home gardens or rooftop seating corners",
      "Pet-friendly outdoor spaces where a real lawn is hard to keep",
    ],
    whereUsedHi: [
      "बालकनी और टैरेस पर — बिना पानी या कटाई हमेशा हरा",
      "लिविंग रूम या ऑफिस में ग्रीन एक्सेंट फीचर वॉल पर",
      "छोटे घर के गार्डन या छत पर बैठने की जगह में",
      "पालतू जानवरों वाली आउटडोर जगह में",
    ],
    whereNotUsed: [
      "Areas with poor drainage underneath — water pools and smells; we fix drainage first",
      "Under intense reflected heat — can soften the backing faster than normal sun",
      "As a soft carpet replacement indoors — turf feels different underfoot",
    ],
    whereNotUsedHi: [
      "खराब ड्रेनेज वाली जगह में नहीं — पानी जमा होकर बदबू करता है; पहले ड्रेनेज ठीक करते हैं",
      "तेज़ रिफ्लेक्टेड गर्मी में नहीं — बैकिंग जल्दी नरम हो सकती है",
      "इनडोर नरम कारपेट की जगह नहीं — टर्फ पैरों में अलग लगता है",
    ],
    benefits: [
      "Always green — no seasonal browning, no watering schedule",
      "Drains through rather than pooling — handles Bihar's monsoon",
      "UV-resistant colour lasts far longer than untreated turf",
      "Zero mowing, fertiliser, or pest spraying",
      "Pet-friendly and comfortable underfoot vs bare tile",
    ],
    benefitsHi: [
      "हमेशा हरा — मौसम से पीला नहीं, पानी के शेड्यूल पर निर्भर नहीं",
      "पानी जमा नहीं होता, सीधे निकलता है — बिहार के मानसून के लिए",
      "UV-रेजिस्टेंट रंग अनट्रीटेड टर्फ से ज़्यादा टिकता है",
      "कोई कटाई, खाद या कीट स्प्रे नहीं",
      "पालतू जानवरों के लिए अनुकूल, नंगे टाइल से आरामदायक",
    ],
    limitations: [
      "Needs a properly drained base — poor drainage causes odour over time",
      "Can heat up underfoot in direct peak-afternoon sun",
      "Doesn't feel identical to a real watered lawn",
    ],
    limitationsHi: [
      "सही ड्रेनेज ज़रूरी — खराब ड्रेनेज पर समय के साथ बदबू",
      "दोपहर की सीधी धूप में पैरों के नीचे गर्म हो सकती है",
      "असली, पानी दी गई घास जैसा एहसास नहीं देती",
    ],
    whatsIncluded: [
      "Surface and drainage check, plus base or batten prep",
      "Turf rolling or panel fixing, cut to your exact boundary",
      "Seam joining and edge fixing so nothing lifts",
      "Final grooming for a full, fresh-lawn look",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "सतह और ड्रेनेज जांच, बेस या बैटन तैयारी",
      "टर्फ रोलिंग या पैनल फिक्सिंग, सही बाउंड्री पर काटकर",
      "सीम जोड़ना और एज फिक्सिंग, ताकि न उठे",
      "भरे-भरे, ताज़े लॉन लुक के लिए फाइनल ग्रूमिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Fixing pre-existing poor drainage or waterproofing the floor/terrace — civil work, quoted separately first",
      "Potted plants, planters, or any landscaping beyond the turf",
      "Replacing turf damaged by fire, sharp objects, or pet chewing after handover",
    ],
    whatsNotIncludedHi: [
      "पहले से खराब ड्रेनेज ठीक करना या फ्लोर/टैरेस वॉटरप्रूफिंग — सिविल काम, पहले अलग से",
      "गमले, पौधे या टर्फ के अलावा कोई लैंडस्केपिंग",
      "हैंडओवर के बाद आग, नुकीली चीज़ या पालतू के काटने से खराब टर्फ बदलना",
    ],
    materials: [
      { name: "UV-stabilised synthetic turf", nameHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ", detail: "PE/PP grass fibres on a permeable backing, in multiple pile heights", detailHi: "PE/PP घास के रेशे, पारगम्य बैकिंग पर, कई पाइल-हाइट में" },
      { name: "Drainage underlay", nameHi: "ड्रेनेज अंडरले", detail: "Sand/gravel or perforated base so rainwater passes through", detailHi: "रेत/बजरी या छिद्रित बेस, ताकि बारिश का पानी निकल जाए" },
      { name: "Jointing tape / seam adhesive", nameHi: "जॉइंटिंग टेप / सीम एडहेसिव", detail: "Joins rolls invisibly so the lawn reads as one surface", detailHi: "रोल को अदृश्य रूप से जोड़ता है, लॉन एक जैसा दिखता है" },
    ],
    installSteps: [
      { title: "Surface & drainage check", titleHi: "सतह और ड्रेनेज जांच", desc: "The base is cleaned and checked for slope/drainage; a wall gets battens checked.", descHi: "बेस साफ कर ढलान/ड्रेनेज जांचते हैं; दीवार के लिए बैटन चेक करते हैं।" },
      { title: "Base preparation", titleHi: "बेस तैयारी", desc: "For floors, a drainage underlay is laid; for walls, a batten frame is fixed.", descHi: "फर्श के लिए ड्रेनेज अंडरले; दीवार के लिए बैटन फ्रेम फिक्स करते हैं।" },
      { title: "Turf laying / panel fixing", titleHi: "टर्फ बिछाना / पैनल फिक्सिंग", desc: "Turf is laid and cut to the boundary, or panels are fixed to the wall frame.", descHi: "टर्फ बिछाकर बाउंड्री पर काटते हैं, या पैनल दीवार फ्रेम में फिक्स करते हैं।" },
      { title: "Seam joining", titleHi: "सीम जोड़ना", desc: "Adjacent pieces are joined so the joint disappears into the pile.", descHi: "पास-पास टुकड़े जोड़ते हैं ताकि जोड़ रेशों में छुप जाए।" },
      { title: "Edge fixing", titleHi: "एज फिक्सिंग", desc: "Edges are secured with U-pins, adhesive, or beading so they don't lift.", descHi: "किनारों को U-पिन, एडहेसिव या बीडिंग से फिक्स करते हैं।" },
      { title: "Grooming & handover", titleHi: "ग्रूमिंग और हैंडओवर", desc: "Fibres are brushed upright for a full, fresh-lawn look.", descHi: "रेशों को ब्रश कर सीधा खड़ा करते हैं, ताज़े लॉन जैसा लुक।" },
    ],
    expertTip:
      "Tell us honestly how the space will be used — a sitting corner is very different from a daily play area. We size the drainage prep and pile density accordingly.",
    expertTipHi:
      "जगह असल में किस लिए इस्तेमाल होगी, साफ बताएं — बैठने की बालकनी और रोज़ खेलने का एरिया अलग बात है। इसी हिसाब से ड्रेनेज और पाइल डेंसिटी तय करते हैं।",
    realProject: {
      title: "Balcony lawn corner, Raniganj",
      titleHi: "बालकनी लॉन कॉर्नर, रानीगंज",
      desc: "A 60 sq.ft balcony with a drained-base artificial lawn and a small potted-plant corner — a garden feel without a floor-level flat to maintain one.",
      descHi: "60 वर्ग फुट बालकनी, ड्रेन्ड-बेस आर्टिफिशियल लॉन और गमलों का छोटा कोना — बिना मेहनत बगीचे जैसा एहसास।",
      photos: 7,
    },
    faqs: [
      { q: "Will artificial grass smell or grow mould in the monsoon?", qHi: "क्या मानसून में आर्टिफिशियल घास से बदबू या फफूंद आएगी?", a: "Not if the base drains properly — that's the one thing we insist on checking. If your balcony doesn't drain well, we fix drainage before laying the turf.", aHi: "अगर बेस से पानी अच्छी तरह निकले तो नहीं — यही एक चीज़ हम ज़रूर जांचते हैं। बालकनी ठीक से न निकलती हो तो पहले ड्रेनेज ठीक करते हैं।" },
      { q: "How long does artificial grass last outdoors?", qHi: "आर्टिफिशियल घास बाहर कितने साल चलती है?", a: "Good UV-stabilised turf holds its colour and pile for 5–8 years under regular sun before it noticeably fades. Our 1-year warranty covers installation; the material lasts well beyond.", aHi: "अच्छी UV टर्फ सामान्य धूप में 5–8 साल रंग-उभार बनाए रखती है। 1 साल की Warranty इंस्टॉलेशन को कवर करती है; मटेरियल की उम्र उससे ज़्यादा।" },
      { q: "Can artificial grass be used on a wall too?", qHi: "क्या घास दीवार पर भी लग सकती है?", a: "Yes — for a green feature wall we fix pre-cut turf panels onto a batten frame like a WPC panel, with no drainage concern since it's vertical and dry.", aHi: "हां — ग्रीन फीचर वॉल के लिए पहले से कटे पैनल WPC की तरह बैटन फ्रेम पर लगाते हैं, वर्टिकल और सूखी जगह होने से ड्रेनेज की चिंता नहीं।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "uv-marble-sheet"],
  },
]

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
