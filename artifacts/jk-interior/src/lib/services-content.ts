import { Layers, PanelTop, Tv, Grid3x3, Gem, Trees, DoorClosed, type LucideIcon } from "lucide-react"

/**
 * Full, service-specific guide content — one record per service. Backs the
 * /services/:slug "Read Full Guide" detail pages. Written fresh for each
 * service in plain, natural Hindi + English so a Forbesganj/Araria customer
 * understands the exact material, price, design choices, and warranty before
 * they call. Every field is unique to the service — no shared boilerplate.
 * Rates and specs stay in sync with business-data.ts / service-city-data.ts /
 * the homepage Services section.
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

/** A design/style choice a customer can pick for this specific service. */
export interface DesignOption {
  name: string
  nameHi: string
  desc: string
  descHi: string
}

/** One row of the head-to-head comparison against this service's main alternative. */
export interface ComparisonRow {
  point: string
  pointHi: string
  /** How this service performs on the point. */
  self: string
  selfHi: string
  /** How the alternative performs on the same point. */
  other: string
  otherHi: string
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
  /** Style/design choices offered for this service, shown as a picker grid. */
  designOptions: DesignOption[]
  /** What JK Interior's quoted price actually covers — shown as a clear checklist next to what's not. */
  whatsIncluded: string[]
  whatsIncludedHi: string[]
  /** Work/material explicitly outside JK Interior's scope for this service. */
  whatsNotIncluded: string[]
  whatsNotIncludedHi: string[]
  materials: ServiceMaterial[]
  installSteps: InstallStep[]
  /** Name of the material customers most often weigh this service against. */
  comparisonWith: string
  comparisonWithHi: string
  comparison: ComparisonRow[]
  /** One practical, on-site recommendation. */
  expertTip: string
  expertTipHi: string
  realProject: { title: string; titleHi: string; desc: string; descHi: string; photos: number }
  faqs: ServiceFaqItem[]
  relatedSlugs: string[]
}

/** Shown on every service page directly under the price tiers — the one non-negotiable disclaimer. */
export const PRICE_DISCLAIMER =
  "Every rate on this page is a live Forbesganj / Araria market estimate, not a locked quote. Your final figure is set at the free site visit and moves with your design, the material grade you pick, and the total area. Combine jobs — ceiling, wall, and TV unit together — and the per-sq.ft rate drops."

export const PRICE_DISCLAIMER_HI =
  "इस पेज का हर रेट फारबिसगंज/अररिया मार्केट का ताज़ा अनुमान है, फिक्स कोटेशन नहीं। असली कीमत फ्री Site Visit पर तय होती है और आपके डिज़ाइन, चुने गए मटेरियल ग्रेड और कुल एरिया पर बदलती है। सीलिंग, वॉल और TV यूनिट एक साथ करवाएं — तो प्रति वर्ग फुट रेट कम हो जाता है।"

export const SERVICE_AREA_NOTE =
  "JK Interior works out of Forbesganj and travels roughly 80 km around it — Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur. One quick call or WhatsApp confirms whether your village or mohalla is on the route before you book."

export const SERVICE_AREA_NOTE_HI =
  "JK Interior की टीम फारबिसगंज से चलती है और करीब 80 किमी के दायरे में — फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर — जाती है। बुकिंग से पहले एक कॉल या WhatsApp पर अपने गांव/मोहल्ले का कवरेज कन्फर्म कर लें।"

export const SERVICES_CONTENT: ServiceContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gypsum-ceiling",
    icon: Layers,
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "Turn a plain roof into a premium ceiling — seamless, cove-lit, and built to any design you imagine",
    taglineHi: "सादी छत को फाइव-स्टार सीलिंग बनाएं — बिना जोड़, Cove लाइट वाली, आपके सोचे हर डिज़ाइन पर",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Designer gypsum false ceiling with hidden cove lighting in a Forbesganj drawing room by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft (Forbesganj/Araria market estimate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "One flat, single-level plane in 12.5mm board — clean, plain, no cove step.", descHi: "12.5mm बोर्ड में एक सादी सिंगल-लेवल छत — साफ, प्लेन, बिना Cove स्टेप।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹130/sq.ft", desc: "A stepped perimeter border with a cove channel ready for LED (strip billed apart).", descHi: "एक स्टेप बॉर्डर और LED के लिए तैयार Cove चैनल (स्ट्रिप का बिल अलग)।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹135–₹210/sq.ft", desc: "Multi-level trays, curves or islands with built-in cove lighting throughout.", descHi: "मल्टी-लेवल ट्रे, घुमाव या आइलैंड, पूरी छत में बिल्ट-इन Cove लाइट के साथ।" },
    ],
    sizesThickness: "12.5mm boards in 4×8 ft and 4×6 ft sheets, scored and cut on-site; a thinner 8mm board is used only where the design curves.",
    sizesThicknessHi: "12.5mm बोर्ड, 4×8 फुट और 4×6 फुट शीट में, साइट पर नाप कर काटा जाता है; घुमावदार हिस्से में ही सिर्फ पतला 8mm बोर्ड।",
    labourCost: "Framing, board fixing and taping labour runs about ₹30–45/sq.ft and is already inside the rate above; cove and multi-level work sits at the top of that band.",
    labourCostHi: "फ्रेमिंग, बोर्ड फिक्सिंग और टेपिंग की लेबर करीब ₹30–45/sq.ft, ऊपर के रेट में पहले से शामिल; Cove और मल्टी-लेवल में यह बैंड के ऊपरी सिरे पर।",
    labourCostShort: "₹30–45/sq.ft",
    brandNote: "We fit ISI-marked branded gypsum board on galvanised GI framing, bought from authorised Purnia/Forbesganj dealers — never loose unbranded stock. You see the actual board and brand at the free site visit.",
    brandNoteHi: "हम ISI-मार्क्ड ब्रांडेड Gypsum Board, गैल्वनाइज़्ड GI फ्रेम पर लगाते हैं, पूर्णिया/फारबिसगंज के अधिकृत डीलरों से — खुला अनब्रांडेड स्टॉक कभी नहीं। असली बोर्ड और ब्रांड फ्री Site Visit पर दिखा देते हैं।",
    availability: "Fitted right across our service area. The cove and multi-level designs are booked most in Forbesganj and Araria town, where drawing-room ceilings are the biggest ask.",
    availabilityHi: "हमारे पूरे सर्विस एरिया में लगती है। Cove और मल्टी-लेवल डिज़ाइन फारबिसगंज और अररिया टाउन में सबसे ज़्यादा बुक होते हैं, जहाँ ड्रॉइंग-रूम की छत की सबसे ज़्यादा माँग है।",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    maintenance: "An occasional wipe with a dry cloth is all it ever needs",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A seamless designer ceiling in premium gypsum on a rust-proof metal frame — the smooth, crack-free finish that makes a hall look straight out of a luxury hotel, with hidden cove and LED lighting built right in.",
    whatItIsHi:
      "प्रीमियम जिप्सम और जंग-रहित मेटल फ्रेम की बिना-जोड़ डिज़ाइनर सीलिंग — वो स्मूथ, बिना-दरार फिनिश जो हॉल को लग्जरी होटल जैसा दिखाए, छुपी Cove और LED लाइट के साथ।",
    whereUsed: [
      "Drawing room and main hall — the first ceiling every guest looks up at",
      "Master and children's bedrooms for soft, glare-free cove light",
      "Dining spaces where a tray design frames the table",
      "Dry office cabins, showrooms and reception lobbies",
    ],
    whereUsedHi: [
      "ड्रॉइंग रूम और मुख्य हॉल में — मेहमान की पहली नज़र यहीं जाती है",
      "मास्टर और बच्चों के बेडरूम में, सॉफ्ट बिना-चौंध Cove लाइट के लिए",
      "डाइनिंग में, जहाँ Tray डिज़ाइन टेबल को फ्रेम करे",
      "सूखे ऑफिस केबिन, शोरूम और रिसेप्शन लॉबी में",
    ],
    whereNotUsed: [
      "Bathrooms — trapped steam swells and stains the board",
      "Cooking kitchens — the same steam problem, every day",
      "Open balconies, terraces or anywhere rain can reach",
      "Any room with an active leak overhead — seal the slab first",
    ],
    whereNotUsedHi: [
      "बाथरूम में नहीं — फँसी भाप बोर्ड को फुला और दागी कर देती है",
      "खाना पकने वाले किचन में नहीं — रोज़ वही भाप की दिक्कत",
      "खुली बालकनी, टैरेस या जहाँ बारिश पहुँचे, वहाँ नहीं",
      "ऊपर से लीकेज वाले कमरे में नहीं — पहले स्लैब सील कराएं",
    ],
    benefits: [
      "Seamless, crack-free finish that instantly gives your hall a luxury-hotel look",
      "Any design you dream — cove, curves, steps, islands — built exactly to your sketch",
      "Hides ugly wiring and shows off premium cove/LED lighting like no other ceiling",
      "Fire-resistant, softens noise between floors, and stays flawless for years",
      "Backed by a solid 1-year written warranty against sagging or cracks",
    ],
    benefitsHi: [
      "बिना-जोड़, बिना-दरार फिनिश जो हॉल को तुरंत लग्जरी-होटल जैसा लुक दे",
      "जो डिज़ाइन सोचें — Cove, घुमाव, स्टेप, आइलैंड — बिल्कुल आपके स्केच पर",
      "भद्दी वायरिंग छुपाए और प्रीमियम Cove/LED लाइट किसी और छत से बेहतर दिखाए",
      "आग-रोधी, फ्लोरों के बीच शोर कम करे, और सालों बेदाग रहे",
      "छत लटकने या दरार पर 1 साल की पक्की लिखित वारंटी",
    ],
    limitations: [
      "Not waterproof — the one line we never cross for you",
      "Taping and sanding make it a touch slower to finish than PVC",
      "A leak from above means replacing board, not just wiping it",
      "For the same layout its labour runs a little higher than PVC",
    ],
    limitationsHi: [
      "वॉटरप्रूफ नहीं — यह लाइन हम आपके लिए कभी पार नहीं करते",
      "टेपिंग-सैंडिंग की वजह से PVC से थोड़ी धीमी बनती है",
      "ऊपर से लीकेज मतलब बोर्ड बदलना, सिर्फ पोंछना नहीं",
      "समान लेआउट में इसकी लेबर PVC से थोड़ी ज़्यादा",
    ],
    designOptions: [
      { name: "Single-level flat", nameHi: "सिंगल-लेवल फ्लैट", desc: "One clean plane — the quiet, budget-friendly base every room can carry.", descHi: "एक साफ प्लेन — शांत, बजट-फ्रेंडली बेस, जो हर कमरे में जँचे।" },
      { name: "Stepped cove border", nameHi: "स्टेप Cove बॉर्डर", desc: "A recessed step around the edge hides an LED strip for a soft glow ring.", descHi: "किनारे पर एक रिसेस्ड स्टेप, जिसमें LED स्ट्रिप छुपती है — सॉफ्ट ग्लो रिंग।" },
      { name: "Central tray / island", nameHi: "सेंट्रल Tray / आइलैंड", desc: "A dropped centre panel that frames a fan or chandelier as the focal point.", descHi: "बीच में गिरा हुआ पैनल, जो पंखे या झूमर को फोकल पॉइंट बनाता है।" },
      { name: "Curved / multi-level designer", nameHi: "घुमावदार / मल्टी-लेवल डिज़ाइनर", desc: "Layered curves and multiple heights for a full statement drawing-room ceiling.", descHi: "परतदार घुमाव और कई ऊँचाइयाँ — पूरा स्टेटमेंट ड्रॉइंग-रूम सीलिंग।" },
    ],
    whatsIncluded: [
      "GI metal frame set at the drop height you choose",
      "Gypsum boards fixed with staggered, screwed joints — no long straight seams",
      "Cove and step framing wherever your design calls for it",
      "Full taping, jointing and sanding to a paint-ready surface",
      "Neat cutouts for downlights, AC grilles and cove wiring",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "आपकी चुनी ड्रॉप-हाइट पर GI मेटल फ्रेम",
      "स्टैगर्ड, स्क्रू-फिक्स्ड जोड़ों में बोर्ड — कोई लंबी सीधी सीम नहीं",
      "जहाँ डिज़ाइन कहे, वहाँ Cove और Step फ्रेमिंग",
      "पूरी टेपिंग, जॉइंटिंग, सैंडिंग — पेंट के लिए तैयार सतह",
      "डाउनलाइट, AC ग्रिल और Cove वायरिंग के साफ कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "LED cove strip and driver — quoted separately per running foot",
      "Main wiring, switches, downlights and fixtures — your electrician's scope",
      "Paint and putty over the ceiling — a separate finishing job",
      "Sealing a leaking or damp slab above — must be sorted before we start",
    ],
    whatsNotIncludedHi: [
      "LED Cove स्ट्रिप और ड्राइवर — रनिंग फुट पर अलग से बिल",
      "मुख्य वायरिंग, स्विच, डाउनलाइट और फिक्स्चर — इलेक्ट्रीशियन का काम",
      "छत पर पुट्टी और पेंट — अलग फिनिशिंग काम",
      "ऊपर की लीक/नम स्लैब सील करना — काम शुरू होने से पहले ज़रूरी",
    ],
    materials: [
      { name: "Gypsum board (12.5mm)", nameHi: "जिप्सम बोर्ड (12.5mm)", detail: "Branded, ISI-marked panels with a firm gypsum core and paper facing", detailHi: "ब्रांडेड, ISI-मार्क्ड पैनल, मज़बूत जिप्सम कोर और पेपर फेस के साथ" },
      { name: "GI metal channel frame", nameHi: "GI मेटल चैनल फ्रेम", detail: "Galvanised sections that resist rust and won't sag with the years", detailHi: "गैल्वनाइज़्ड सेक्शन, जंग नहीं लगती और सालों झुकते नहीं" },
      { name: "Joint tape & jointing compound", nameHi: "जॉइंट टेप और कंपाउंड", detail: "Bridges and fills every seam so the surface finishes dead flat", detailHi: "हर सीम को भरता-जोड़ता है, सतह बिल्कुल फ्लैट बनती है" },
      { name: "Aluminium cove profile + LED", nameHi: "एल्युमिनियम Cove प्रोफाइल + LED", detail: "Recessed channel carrying a warm-white (3000K) strip for indirect light", detailHi: "रिसेस्ड चैनल, वार्म-व्हाइट (3000K) स्ट्रिप के साथ, अप्रत्यक्ष रोशनी के लिए" },
    ],
    installSteps: [
      { title: "Mark the level", titleHi: "लेवल मार्किंग", desc: "A dead-level line is snapped around all four walls at your chosen drop.", descHi: "आपकी तय ड्रॉप पर चारों दीवारों पर बिल्कुल लेवल लाइन लगाते हैं।" },
      { title: "Anchor the frame", titleHi: "फ्रेम एंकर करना", desc: "Perimeter angle and intermediate GI channels are fixed to the slab.", descHi: "पेरीमीटर एंगल और बीच के GI चैनल स्लैब में फिक्स करते हैं।" },
      { title: "Screw the boards", titleHi: "बोर्ड स्क्रू करना", desc: "Boards go up with staggered joints so no seam runs edge to edge.", descHi: "बोर्ड स्टैगर्ड जोड़ में लगते हैं ताकि कोई सीम किनारे तक न जाए।" },
      { title: "Build the cove", titleHi: "Cove बनाना", desc: "If it's in the design, a recessed step is framed around the border for the LED.", descHi: "अगर डिज़ाइन में हो, तो बॉर्डर पर LED के लिए रिसेस्ड स्टेप बनाते हैं।" },
      { title: "Tape & sand smooth", titleHi: "टेप और सैंडिंग", desc: "Every joint and screw head is taped and sanded until it disappears.", descHi: "हर जोड़ और स्क्रू सिर को टेप-सैंड कर गायब कर देते हैं।" },
      { title: "Cutouts & handover", titleHi: "कटआउट और हैंडओवर", desc: "Light and AC openings are cut, the cove line is checked, and the warranty is handed over.", descHi: "लाइट-AC के कटआउट, Cove लाइन चेक, और Warranty के साथ हैंडओवर।" },
    ],
    comparisonWith: "POP Ceiling",
    comparisonWithHi: "POP सीलिंग",
    comparison: [
      { point: "How it's made", pointHi: "कैसे बनती है", self: "Factory board on a GI frame — dry, precise, uniform", selfHi: "GI फ्रेम पर फैक्ट्री बोर्ड — सूखा, सटीक, एक-सा", other: "Wet plaster mixed and applied by hand on site", otherHi: "साइट पर हाथ से मिलाया-लगाया गीला प्लास्टर" },
      { point: "Finish quality", pointHi: "फिनिश क्वालिटी", self: "Even, crack-resistant, mason-independent", selfHi: "एक-सी, दरार-रोधी, मिस्त्री पर कम निर्भर", other: "Depends heavily on the mason's hand", otherHi: "मिस्त्री के हाथ पर बहुत निर्भर" },
      { point: "Site mess & drying", pointHi: "गंदगी और सुखना", self: "Little debris, no long drying wait", selfHi: "कम मलबा, लंबा सूखना नहीं", other: "More wet debris and curing time", otherHi: "ज़्यादा गीली गंदगी, सूखने में समय" },
      { point: "Later repair", pointHi: "बाद में रिपेयर", self: "One board section can be opened and reset", selfHi: "एक बोर्ड हिस्सा खोलकर दोबारा सेट होता है", other: "Patch repairs often show", otherHi: "पैच रिपेयर अक्सर दिखता है" },
    ],
    expertTip:
      "If cove lighting is even a maybe, lock it at the design stage. Adding a cove after the boards are closed means opening part of a finished ceiling — deciding early costs nothing extra.",
    expertTipHi:
      "Cove लाइटिंग का ज़रा भी मन हो तो डिज़ाइन के समय ही तय कर दें। बोर्ड बंद होने के बाद Cove जोड़ना मतलब बनी-बनाई छत का हिस्सा खोलना — पहले तय करने में कोई अतिरिक्त खर्च नहीं।",
    realProject: {
      title: "Cove-lit hall ceiling, Forbesganj",
      titleHi: "कोव-लिट हॉल सीलिंग, फारबिसगंज",
      desc: "A 180 sq.ft drawing room where a stepped border wraps a warm-white LED cove around a flat centre — the project we most often walk clients through on-site to explain how a cove actually reads.",
      descHi: "180 वर्ग फुट का ड्रॉइंग रूम, जहाँ एक स्टेप बॉर्डर वार्म-व्हाइट LED Cove को फ्लैट सेंटर के चारों ओर लपेटता है — यही प्रोजेक्ट हम अक्सर साइट पर दिखाकर समझाते हैं कि Cove असल में कैसा दिखता है।",
      photos: 16,
    },
    faqs: [
      { q: "If gypsum gets splashed once, is it ruined?", qHi: "एक बार छींटा पड़ जाए तो जिप्सम खराब हो जाती है?", a: "A quick splash you wipe up is fine. What harms it is standing moisture and daily steam — that's exactly why we keep it out of bathrooms and cooking kitchens.", aHi: "जल्दी पोंछ दिया गया छींटा कुछ नहीं बिगाड़ता। नुकसान खड़ी नमी और रोज़ की भाप से होता है — इसीलिए इसे बाथरूम और किचन से दूर रखते हैं।" },
      { q: "How much room height does a gypsum ceiling eat?", qHi: "जिप्सम सीलिंग कितनी ऊँचाई खाती है?", a: "A flat design drops the ceiling by roughly 3–4 inches. If your room is already low, tell us and we'll frame a shallower drop or suggest PVC instead.", aHi: "फ्लैट डिज़ाइन में करीब 3–4 इंच ऊँचाई कम होती है। कमरा पहले से कम ऊँचा हो तो बताएं — कम ड्रॉप का फ्रेम बनाते हैं या PVC सुझा देते हैं।" },
      { q: "Can you copy a ceiling design from a photo I saved?", qHi: "क्या मेरे सेव किए फोटो वाला डिज़ाइन बना देंगे?", a: "Yes — that's the whole point of gypsum. Show us the photo at the site visit; we'll tell you honestly what's buildable in your room's height and quote it.", aHi: "हाँ — जिप्सम का पूरा फायदा यही है। Site Visit पर फोटो दिखाएं; हम साफ बता देंगे कि आपकी छत की ऊँचाई में क्या बन सकता है और उसका रेट दे देंगे।" },
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
    tagline: "The water-resistant for suitable wet-area applications ceiling that ends kitchen and bathroom dampness with proper installation and care",
    taglineHi: "100% वॉटरप्रूफ छत, जो किचन-बाथरूम की सीलन हमेशा के लिए खत्म कर दे",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof wood-texture PVC false ceiling in a Bihar kitchen installed by JK Interior",
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "Plain white or matte panels on a basic batten grid, 5mm gauge.", descHi: "बेसिक बैटन ग्रिड पर प्लेन सफेद या मैट पैनल, 5mm गेज।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹115/sq.ft", desc: "Wood-grain or marble-print panels in a 6–7mm gauge for less sag.", descHi: "वुड-ग्रेन या मार्बल-प्रिंट पैनल, कम झुकाव के लिए 6–7mm गेज।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹120–₹150/sq.ft", desc: "Designer 3D, embossed or high-gloss panels in a rigid 8mm gauge.", descHi: "डिज़ाइनर 3D, एम्बॉस्ड या हाई-ग्लॉस पैनल, मज़बूत 8mm गेज।" },
    ],
    sizesThickness: "Panels come 200mm and 250mm wide and are cut to run up to ~12 ft without a joint. Gauge steps 5mm → 8mm by tier; the thicker the panel, the flatter it stays across a wide span.",
    sizesThicknessHi: "पैनल 200mm और 250mm चौड़े, ~12 फुट तक बिना जोड़ काटे जाते हैं। गेज टियर के साथ 5mm → 8mm; पैनल जितना मोटा, बड़े स्पैन में उतना फ्लैट रहता है।",
    labourCost: "Grid, panel fixing and beading labour is about ₹20–30/sq.ft, already in the rate — this is the fastest ceiling on our list to fit.",
    labourCostHi: "ग्रिड, पैनल फिक्सिंग और बीडिंग की लेबर करीब ₹20–30/sq.ft, रेट में शामिल — हमारी लिस्ट में सबसे तेज़ लगने वाली छत यही है।",
    labourCostShort: "₹20–30/sq.ft",
    brandNote: "ISI-compliant branded PVC from authorised Forbesganj/Purnia suppliers — never the flimsy unbranded imports that yellow and bow. We show you the panel sample and its batch marking before you commit.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड PVC, फारबिसगंज/पूर्णिया के अधिकृत सप्लायर से — कभी नहीं वो पतला अनब्रांडेड इम्पोर्ट, जो पीला पड़कर मुड़ जाता है। तय करने से पहले पैनल सैंपल और उसकी बैच मार्किंग दिखाते हैं।",
    availability: "Stocked across the whole service area. It's our highest-volume ceiling, so the common whites and wood-grains are usually on hand with no waiting.",
    availabilityHi: "पूरे सर्विस एरिया में स्टॉक में। यह हमारी सबसे ज़्यादा लगने वाली छत है, तो आम सफेद और वुड-ग्रेन बिना इंतज़ार तैयार रहते हैं।",
    installTime: "One room in a day, a full home in 3–4 days",
    maintenance: "Practically none — a damp cloth wipes it clean",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Sealed, interlocking waterproof panels that never let steam, leakage or damp win again — the maintenance-free ceiling that stays bright and new for long service life with normal care without a single coat of paint.",
    whatItIsHi:
      "सील्ड, इंटरलॉकिंग वॉटरप्रूफ पैनल, जो भाप, लीकेज और सीलन को दोबारा जीतने न दें — बिना मेंटेनेंस वाली छत, जो 20+ साल बिना एक बार भी पेंट कराए नई-सी चमके।",
    whereUsed: [
      "Kitchens and bathrooms — our first and firmest recommendation",
      "Balconies and semi-open spots that catch the rain",
      "Shops, workshops and small offices on a tight budget",
      "Honestly, almost any room — it's the most flexible ceiling we fit",
    ],
    whereUsedHi: [
      "किचन और बाथरूम में — हमारी पहली और पक्की सलाह",
      "बालकनी और अर्ध-खुली जगह में, जहाँ बारिश पहुँचे",
      "टाइट बजट वाली दुकान, वर्कशॉप और छोटे ऑफिस में",
      "सच कहें तो लगभग किसी भी कमरे में — सबसे लचीली छत यही",
    ],
    whereNotUsed: [
      "Formal halls set on complex cove or curved profiles — gypsum owns that look",
      "Rooms where you expect to repaint the ceiling a new colour every few years",
    ],
    whereNotUsedHi: [
      "जटिल Cove या घुमावदार लुक वाले फॉर्मल हॉल में नहीं — वो लुक Gypsum का",
      "जहाँ हर कुछ साल में छत का नया रंग करवाना हो, वहाँ नहीं",
    ],
    benefits: [
      "water-resistant for suitable wet-area applications — kill kitchen, bathroom and balcony dampness permanently",
      "Never needs paint or plaster again — looks new for long service life with normal care",
      "Termite-proof, fire-retardant and wipes clean in seconds",
      "Fastest ceiling we fit — a whole room done in a single day",
      "The friendliest price per sq.ft, backed by a 1-year leak-proof warranty",
    ],
    benefitsHi: [
      "100% वॉटरप्रूफ — किचन, बाथरूम, बालकनी की सीलन हमेशा के लिए खत्म",
      "दोबारा कभी पेंट या प्लास्टर नहीं — 20+ साल नई-सी दिखे",
      "दीमक-रोधी, फायर-रिटार्डेंट, और सेकंडों में पोंछकर साफ",
      "सबसे तेज़ लगने वाली छत — पूरा कमरा एक ही दिन में",
      "प्रति वर्ग फुट सबसे किफायती, 1 साल की लीक-प्रूफ वारंटी के साथ",
    ],
    limitations: [
      "Design stays simple — no true cove or curved profiles",
      "The colour and texture you pick is locked for its whole life",
      "A cracked plank is swapped, not patched (matching one is easy though)",
      "In a formal drawing room it reads a notch below gypsum's finish",
    ],
    limitationsHi: [
      "डिज़ाइन सादा रहता है — असली Cove या घुमाव नहीं",
      "जो रंग-टेक्सचर चुना, वही जीवनभर पक्का",
      "टूटा तख्ता बदला जाता है, पैच नहीं (मिलता-जुलता आसानी से मिलता है)",
      "फॉर्मल ड्रॉइंग रूम में Gypsum की फिनिश से एक पायदान नीचे दिखता है",
    ],
    designOptions: [
      { name: "Plain white / matte", nameHi: "प्लेन सफेद / मैट", desc: "The clean, bright, budget classic — brightens a kitchen or bath instantly.", descHi: "साफ, चमकदार, बजट क्लासिक — किचन-बाथ को तुरंत उजला कर देता है।" },
      { name: "Wood-grain", nameHi: "वुड-ग्रेन", desc: "Warm timber-look planks so a balcony or dining ceiling doesn't read 'plastic'.", descHi: "गर्म लकड़ी जैसे तख्ते, ताकि बालकनी या डाइनिंग की छत 'प्लास्टिक' न लगे।" },
      { name: "Marble-print", nameHi: "मार्बल-प्रिंट", desc: "Stone-pattern panels that pair neatly with a UV-marble wall.", descHi: "पत्थर-पैटर्न पैनल, जो UV-मार्बल दीवार के साथ सुंदर मेल खाते हैं।" },
      { name: "3D embossed / high-gloss", nameHi: "3D एम्बॉस्ड / हाई-ग्लॉस", desc: "Textured or mirror-gloss designer panels for a richer feature ceiling.", descHi: "टेक्सचर्ड या मिरर-ग्लॉस डिज़ाइनर पैनल, ज़्यादा रिच फीचर सीलिंग के लिए।" },
    ],
    whatsIncluded: [
      "Batten grid fixed to the slab and the perimeter walls",
      "Panels measured, cut and interlocked plank by plank",
      "Corner beading and clean edge trims all round",
      "Cutouts for downlights or an exhaust fan",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "स्लैब और पेरीमीटर दीवारों में बैटन ग्रिड",
      "पैनल नापकर, काटकर, तख्ता-दर-तख्ता जोड़ना",
      "चारों ओर कॉर्नर बीडिंग और साफ एज ट्रिम्स",
      "डाउनलाइट या एग्ज़ॉस्ट फैन के कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Main wiring, switches or the light/exhaust fixtures themselves — electrician's scope",
      "AC ducting or plumbing that runs above the ceiling",
      "Swapping a plank cracked by later impact — billed separately if it comes up",
    ],
    whatsNotIncludedHi: [
      "मुख्य वायरिंग, स्विच या लाइट/एग्ज़ॉस्ट फिक्स्चर खुद — इलेक्ट्रीशियन का काम",
      "छत के ऊपर से जाती AC डक्टिंग या प्लंबिंग",
      "बाद में चोट से टूटा तख्ता बदलना — ज़रूरत पड़ने पर अलग बिल",
    ],
    materials: [
      { name: "PVC ceiling planks", nameHi: "PVC सीलिंग तख्ते", detail: "Interlocking planks in white, wood-grain, marble-print and glossy finishes", detailHi: "इंटरलॉक तख्ते — सफेद, वुड-ग्रेन, मार्बल-प्रिंट और ग्लॉसी फिनिश में" },
      { name: "GI / treated wooden battens", nameHi: "GI / ट्रीटेड लकड़ी के बैटन", detail: "Perimeter and support battens the planks clip onto and hang from", detailHi: "पेरीमीटर और सपोर्ट बैटन, जिनमें तख्ते क्लिप-लटकते हैं" },
      { name: "Corner beading & trims", nameHi: "कॉर्नर बीडिंग और ट्रिम्स", detail: "Finishes the line where ceiling meets wall so no raw edge shows", detailHi: "छत-दीवार के मिलान को फिनिश करता है, कोई कच्चा किनारा नहीं दिखता" },
    ],
    installSteps: [
      { title: "Measure & mark", titleHi: "माप और मार्किंग", desc: "The room is measured and a drop-height line marked on every wall.", descHi: "कमरा नापकर हर दीवार पर ड्रॉप-हाइट लाइन मार्क करते हैं।" },
      { title: "Fix the battens", titleHi: "बैटन फिक्सिंग", desc: "Perimeter and support battens are set to carry the planks.", descHi: "तख्तों को सहारा देने वाले पेरीमीटर और सपोर्ट बैटन लगाते हैं।" },
      { title: "Clip the planks", titleHi: "तख्ते क्लिप करना", desc: "Planks are cut and tongue-and-groove clipped in, one after another.", descHi: "तख्ते काटकर टंग-एंड-ग्रूव में एक-एक क्लिप करते हैं।" },
      { title: "Bead the edges", titleHi: "एज बीडिंग", desc: "Corner and edge beading is run all around for a clean join.", descHi: "साफ जुड़ाव के लिए चारों ओर कॉर्नर-एज बीडिंग लगाते हैं।" },
      { title: "Cut the lights in", titleHi: "लाइट कटआउट", desc: "Openings for downlights or an exhaust fan are cut and wired.", descHi: "डाउनलाइट या एग्ज़ॉस्ट फैन के कटआउट काटकर वायर करते हैं।" },
      { title: "Wipe & hand over", titleHi: "सफाई और हैंडओवर", desc: "One wipe and the ceiling is ready to use the same minute.", descHi: "एक बार पोंछते ही छत उसी क्षण इस्तेमाल के लिए तैयार।" },
    ],
    comparisonWith: "Gypsum Ceiling",
    comparisonWithHi: "जिप्सम सीलिंग",
    comparison: [
      { point: "Water & steam", pointHi: "पानी और भाप", self: "water-resistant for suitable wet-area applications — made for wet rooms", selfHi: "100% वॉटरप्रूफ — गीले कमरों के लिए बना", other: "Not waterproof — dry rooms only", otherHi: "वॉटरप्रूफ नहीं — सिर्फ सूखे कमरे" },
      { point: "Fitting speed", pointHi: "लगने की रफ़्तार", self: "Often a single day per room", selfHi: "अक्सर एक कमरा एक दिन में", other: "2–3 days with taping and drying", otherHi: "टेपिंग-सुखने के साथ 2–3 दिन" },
      { point: "Design range", pointHi: "डिज़ाइन रेंज", self: "Flat, textured, printed — but simple", selfHi: "फ्लैट, टेक्सचर्ड, प्रिंटेड — पर सादा", other: "Cove, curves, multi-level — anything", otherHi: "Cove, घुमाव, मल्टी-लेवल — कुछ भी" },
      { point: "Upkeep", pointHi: "देखभाल", self: "Wipe clean, no paint ever", selfHi: "पोंछ लें, कभी पेंट नहीं", other: "Needs putty and periodic paint", otherHi: "पुट्टी और समय-समय पर पेंट चाहिए" },
    ],
    expertTip:
      "Since the panel colour is fixed for life, carry a photo of your existing kitchen or bathroom tiles to the site visit. We'll hold samples against it and match a shade that actually sits well with what's already on your walls.",
    expertTipHi:
      "पैनल का रंग जीवनभर वही रहेगा, इसलिए Site Visit पर अपने मौजूदा किचन/बाथरूम टाइल की फोटो लाएं। हम सैंपल उसके सामने रखकर ऐसा शेड मिलाते हैं जो आपकी दीवार से सच में जँचे।",
    realProject: {
      title: "Wood-texture PVC ceiling, Araria kitchen",
      titleHi: "वुड-टेक्सचर PVC सीलिंग, अररिया किचन",
      desc: "A kitchen-plus-balcony ceiling finished in one working day, in wood-texture planks chosen so it reads warm from the dining table rather than plastic overhead.",
      descHi: "किचन और बालकनी की छत एक ही कार्य-दिवस में तैयार, वुड-टेक्सचर तख्तों में, ताकि डाइनिंग टेबल से यह गर्म-सी दिखे, ऊपर से प्लास्टिक नहीं।",
      photos: 13,
    },
    faqs: [
      { q: "Is PVC ceiling genuinely water-resistant for suitable wet-area applications?", qHi: "क्या PVC सीलिंग सचमुच 100% वॉटरप्रूफ है?", a: "Yes. The plank is solid PVC with no soak-in core, so splashing, steam and humidity have nowhere to go — they just roll off the surface.", aHi: "हाँ। तख्ता ठोस PVC है, कोई सोखने वाला कोर नहीं, तो पानी, भाप और नमी को कहीं जाना नहीं — बस सतह से बह जाती है।" },
      { q: "Will PVC look cheap next to gypsum in my hall?", qHi: "हॉल में PVC, जिप्सम के आगे सस्ती दिखेगी?", a: "In a formal cove-lit hall, gypsum reads more premium — no argument. But in kitchens, bathrooms and everyday rooms our wood and marble-texture PVC looks genuinely smart.", aHi: "Cove वाले फॉर्मल हॉल में Gypsum ज़्यादा प्रीमियम दिखती है — इसमें कोई बहस नहीं। पर किचन, बाथरूम और रोज़मर्रा कमरों में हमारी वुड-मार्बल टेक्सचर PVC सच में स्मार्ट लगती है।" },
      { q: "Can seepage or termites ruin a PVC ceiling?", qHi: "क्या सीपेज या टर्माइट PVC को खराब करेंगे?", a: "No — termites can't eat plastic and seepage runs off it. To protect the frame behind as well, we hang the planks on treated battens or GI channel.", aHi: "नहीं — टर्माइट प्लास्टिक नहीं खाते और सीपेज बह जाता है। पीछे का फ्रेम भी बचा रहे, इसलिए तख्ते ट्रीटेड बैटन या GI चैनल पर लटकाते हैं।" },
    ],
    relatedSlugs: ["gypsum-ceiling", "uv-marble-sheet", "grid-ceiling"],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "grid-ceiling",
    icon: Grid3x3,
    name: "Grid Ceiling",
    nameHi: "ग्रिड सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "The sharp corporate ceiling for offices, shops and clinics — professional, fast, and easy to service",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए स्मार्ट कॉरपोरेट सीलिंग — प्रोफेशनल, तेज़, सर्विस में आसान",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral fibre T-grid false ceiling in a commercial office by JK Interior",
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹55/sq.ft", desc: "Basic mineral-fibre tile dropped into a standard T-grid.", descHi: "स्टैंडर्ड T-Grid में बेसिक मिनरल-फाइबर टाइल।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹56–₹75/sq.ft", desc: "Better mineral-fibre or PVC tile with some moisture resistance.", descHi: "थोड़ी नमी-रोधी, बेहतर मिनरल-फाइबर या PVC टाइल।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹76–₹115/sq.ft", desc: "Acoustic-rated or edge-lit tiles carried on a heavier grid.", descHi: "भारी ग्रिड पर एकॉस्टिक-रेटेड या एज-लिट टाइल।" },
    ],
    sizesThickness: "Standard 2×2 ft (600×600mm) lay-in tiles, 15–19mm thick by tier, resting on a 24mm-face T-section grid — the sizes stocked everywhere locally.",
    sizesThicknessHi: "स्टैंडर्ड 2×2 फुट (600×600mm) ले-इन टाइल, टियर के साथ 15–19mm मोटी, 24mm-फेस T-सेक्शन ग्रिड पर — लोकल में हर जगह स्टॉक साइज़।",
    labourCost: "Wall-angle, grid, levelling and tile-drop labour is about ₹15–25/sq.ft, included above — on a big open floor nothing goes up quicker.",
    labourCostHi: "वॉल-एंगल, ग्रिड, लेवलिंग और टाइल की लेबर करीब ₹15–25/sq.ft, रेट में शामिल — बड़े खुले फ्लोर पर इससे तेज़ कुछ नहीं लगता।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI/BIS-compliant branded grid and tiles from our regular Purnia suppliers. The exact tile make — plain, acoustic or moisture-grade — is confirmed with you at the site visit.",
    brandNoteHi: "ISI/BIS-अनुरूप ब्रांडेड ग्रिड और टाइल, हमारे नियमित पूर्णिया सप्लायर से। सही टाइल मेक — प्लेन, एकॉस्टिक या नमी-ग्रेड — साइट विज़िट पर आपके साथ तय होता है।",
    availability: "Common across offices and shops in Forbesganj, Araria and Purnia. Acoustic and edge-lit tiles may need 2–3 days' lead time in outlying blocks.",
    availabilityHi: "फारबिसगंज, अररिया और पूर्णिया के ऑफिस-दुकानों में आम। एकॉस्टिक और एज-लिट टाइल दूर के इलाकों में 2–3 दिन ज़्यादा ले सकती हैं।",
    installTime: "1–2 days for a room, 3–4 days for a larger floor",
    maintenance: "Very low — dust now and then; a stained tile is swapped on its own",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A clean 2x2 tile ceiling on a strong metal grid that gives your business an instant corporate look, cuts room echo, and lets you reach wiring or AC above in seconds — no breaking, no mess.",
    whatItIsHi:
      "मज़बूत मेटल ग्रिड पर साफ 2x2 टाइल छत, जो बिजनेस को तुरंत कॉरपोरेट लुक दे, कमरे की गूँज कम करे, और ऊपर की वायरिंग या AC सेकंडों में एक्सेस करने दे — न तोड़-फोड़, न गंदगी।",
    whereUsed: [
      "Offices, cabins and coworking floors",
      "Shops, showrooms and retail counters",
      "Clinics and diagnostic centres — easy to sanitise and swap out",
      "Godowns and workshops where the services above need access",
    ],
    whereUsedHi: [
      "ऑफिस, केबिन और कोवर्किंग फ्लोर में",
      "दुकान, शोरूम और रिटेल काउंटर में",
      "क्लिनिक और डायग्नोस्टिक सेंटर में — साफ करना और बदलना आसान",
      "गोदाम-वर्कशॉप में, जहाँ ऊपर की सर्विसेज़ तक पहुँच चाहिए",
    ],
    whereNotUsed: [
      "Formal living rooms or bedrooms chasing a seamless premium ceiling",
      "Bathrooms or damp rooms — standard mineral tiles sag once wet",
      "Very low rooms — it needs a little more drop than PVC",
    ],
    whereNotUsedHi: [
      "बिना-जोड़ प्रीमियम लुक वाले फॉर्मल लिविंग रूम या बेडरूम में नहीं",
      "बाथरूम या नम कमरे में नहीं — आम मिनरल टाइल गीली होकर झुक जाती है",
      "बहुत कम ऊँचे कमरे में नहीं — PVC से थोड़ी ज़्यादा ड्रॉप चाहिए",
    ],
    benefits: [
      "Instant professional, corporate look for any office, shop or clinic",
      "Lift one tile to reach wiring, AC or plumbing — repairs done in minutes",
      "Acoustic tile options cut office echo for a calmer, sharper space",
      "Fastest and most economical way to cover a large floor",
      "Fire-safe tiles backed by a 1-year structural warranty",
    ],
    benefitsHi: [
      "किसी भी ऑफिस, दुकान या क्लिनिक के लिए तुरंत प्रोफेशनल कॉरपोरेट लुक",
      "एक टाइल उठाकर वायरिंग, AC या प्लंबिंग तक पहुँच — मरम्मत मिनटों में",
      "एकॉस्टिक टाइल से ऑफिस की गूँज कम, माहौल शांत और स्मार्ट",
      "बड़े फ्लोर को ढकने का सबसे तेज़ और सबसे किफायती तरीका",
      "फायर-सेफ टाइल, 1 साल की ढांचागत वारंटी के साथ",
    ],
    limitations: [
      "The grid lines stay visible — this is a working ceiling, not a decorative one",
      "Standard mineral tiles aren't waterproof and sag if they get wet",
      "It wants a touch more drop height than PVC",
      "No cove lighting or curved profiles are possible",
    ],
    limitationsHi: [
      "ग्रिड की लाइनें दिखती रहती हैं — यह काम की छत है, सजावटी नहीं",
      "आम मिनरल टाइल वॉटरप्रूफ नहीं, गीली होकर झुकती है",
      "PVC से थोड़ी ज़्यादा ड्रॉप-हाइट माँगती है",
      "Cove लाइट या घुमावदार शेप संभव नहीं",
    ],
    designOptions: [
      { name: "Plain white tile", nameHi: "प्लेन सफेद टाइल", desc: "The neutral office standard — bright, tidy, easy on the budget.", descHi: "न्यूट्रल ऑफिस स्टैंडर्ड — उजला, साफ-सुथरा, बजट में।" },
      { name: "Acoustic tile", nameHi: "एकॉस्टिक टाइल", desc: "Sound-absorbing tiles that tame echo in halls, clinics and coaching rooms.", descHi: "आवाज़-सोखने वाली टाइल, जो हॉल, क्लिनिक और कोचिंग में गूँज कम करे।" },
      { name: "Moisture-resistant PVC tile", nameHi: "नमी-रोधी PVC टाइल", desc: "The same grid, but with wipe-clean PVC tiles for washrooms and pantries.", descHi: "वही ग्रिड, पर वॉशरूम-पैंट्री के लिए पोंछकर साफ होने वाली PVC टाइल।" },
      { name: "Edge-lit / backlit tile", nameHi: "एज-लिट / बैकलिट टाइल", desc: "Glowing panels set into the grid for a modern, premium retail look.", descHi: "ग्रिड में लगे चमकते पैनल, मॉडर्न-प्रीमियम रिटेल लुक के लिए।" },
    ],
    whatsIncluded: [
      "Perimeter wall-angle fixed all the way around",
      "GI T-grid hung on hanger wires and levelled dead flat",
      "Tiles laid in — mineral fibre, PVC or gypsum, as agreed",
      "Cutouts for lights, AC diffusers and sprinkler heads",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "पूरे कमरे में चारों ओर पेरीमीटर वॉल-एंगल",
      "हैंगर वायर पर GI T-Grid, बिल्कुल फ्लैट लेवल",
      "तय टाइल लगाना — मिनरल फाइबर, PVC या Gypsum",
      "लाइट, AC डिफ्यूज़र और स्प्रिंकलर के कटआउट",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "The wiring, AC ductwork or sprinkler piping itself — each trade's own job",
      "Replacing a tile marked after handover, say by a later leak",
      "Upgrading to acoustic or edge-lit tiles once the order is locked",
    ],
    whatsNotIncludedHi: [
      "वायरिंग, AC डक्टवर्क या स्प्रिंकलर पाइपिंग खुद — हर ट्रेड का अपना काम",
      "हैंडओवर के बाद दागी हुई टाइल बदलना, जैसे बाद की लीक से",
      "ऑर्डर तय होने के बाद एकॉस्टिक या एज-लिट टाइल में अपग्रेड",
    ],
    materials: [
      { name: "GI T-grid runners & cross-tees", nameHi: "GI T-ग्रिड रनर और क्रॉस-टी", detail: "Galvanised steel grid hung on adjustable GI hanger wires", detailHi: "गैल्वनाइज़्ड स्टील ग्रिड, एडजस्टेबल GI हैंगर वायर पर" },
      { name: "Lay-in tiles", nameHi: "ले-इन टाइल", detail: "2×2 ft mineral-fibre for offices, PVC for damp areas, gypsum for a flush look", detailHi: "2×2 फुट मिनरल-फाइबर ऑफिस के लिए, नमी वाली जगह PVC, फ्लश लुक के लिए Gypsum" },
      { name: "Perimeter wall angle", nameHi: "पेरीमीटर वॉल एंगल", detail: "The L-angle on the wall that the grid edges rest into", detailHi: "दीवार पर L-एंगल, जिसमें ग्रिड के किनारे टिकते हैं" },
    ],
    installSteps: [
      { title: "Mark the level", titleHi: "लेवल मार्किंग", desc: "The drop height is marked around every wall in the room.", descHi: "कमरे की हर दीवार पर ड्रॉप-हाइट मार्क करते हैं।" },
      { title: "Fix the wall angle", titleHi: "वॉल एंगल फिक्सिंग", desc: "The perimeter L-angle is screwed to the walls on that line.", descHi: "उसी लाइन पर दीवारों में पेरीमीटर L-एंगल स्क्रू करते हैं।" },
      { title: "Hang the grid", titleHi: "ग्रिड लटकाना", desc: "T-runners hang on GI wires and cross-tees click in to form the squares.", descHi: "T-रनर GI वायर पर लटकते हैं, क्रॉस-टी क्लिक कर चौकोर खाने बनते हैं।" },
      { title: "Level the grid", titleHi: "ग्रिड लेवलिंग", desc: "Each wire is tuned until the whole grid sits perfectly level.", descHi: "हर वायर अड्जस्ट कर पूरे ग्रिड को बिल्कुल लेवल करते हैं।" },
      { title: "Drop the tiles", titleHi: "टाइल रखना", desc: "Tiles are set into every square from underneath.", descHi: "टाइल नीचे से हर खाने में रख देते हैं।" },
      { title: "Fixtures & handover", titleHi: "फिक्स्चर और हैंडओवर", desc: "Lights, diffusers and sprinklers are seated, each tile checked, warranty handed over.", descHi: "लाइट, डिफ्यूज़र, स्प्रिंकलर सेट कर हर टाइल चेक, Warranty के साथ हैंडओवर।" },
    ],
    comparisonWith: "Gypsum Ceiling",
    comparisonWithHi: "जिप्सम सीलिंग",
    comparison: [
      { point: "Access above", pointHi: "ऊपर तक पहुँच", self: "Lift one tile, reach the services", selfHi: "एक टाइल उठाओ, सर्विस तक पहुँच", other: "Must cut into the ceiling", otherHi: "छत काटनी पड़ती है" },
      { point: "Look", pointHi: "लुक", self: "Practical, grid lines show", selfHi: "व्यावहारिक, ग्रिड लाइनें दिखती हैं", other: "Seamless and premium", otherHi: "बिना-जोड़ और प्रीमियम" },
      { point: "Best for", pointHi: "किसके लिए बेस्ट", self: "Offices, shops, clinics", selfHi: "ऑफिस, दुकान, क्लिनिक", other: "Homes and formal halls", otherHi: "घर और फॉर्मल हॉल" },
      { point: "Cost on big floors", pointHi: "बड़े फ्लोर पर खर्च", self: "Lowest per sq.ft", selfHi: "प्रति वर्ग फुट सबसे कम", other: "Higher labour and finishing", otherHi: "ज़्यादा लेबर और फिनिशिंग" },
    ],
    expertTip:
      "Have your electrician and AC contractor lock every fixture position before we hang the grid. Move a light point after the grid is levelled and part of the layout has to be reset — a five-minute conversation upfront saves that.",
    expertTipHi:
      "ग्रिड लटकाने से पहले अपने इलेक्ट्रीशियन और AC वाले से हर फिक्स्चर की जगह तय करवा लें। ग्रिड लेवल होने के बाद लाइट पॉइंट हिलाना मतलब लेआउट का हिस्सा दोबारा सेट करना — शुरू की पाँच मिनट की बात यह बचा देती है।",
    realProject: {
      title: "Clinic waiting-area ceiling, Araria",
      titleHi: "क्लिनिक वेटिंग-एरिया सीलिंग, अररिया",
      desc: "A 400 sq.ft diagnostic-centre floor in acoustic mineral-fibre tiles, laid so any future AC or wiring work needs nothing more than lifting a tile — no breaking, no dust.",
      descHi: "400 वर्ग फुट डायग्नोस्टिक-सेंटर फ्लोर, एकॉस्टिक मिनरल-फाइबर टाइल में, ऐसे लगा कि भविष्य में AC या वायरिंग के लिए बस एक टाइल उठानी हो — न तोड़-फोड़, न धूल।",
      photos: 7,
    },
    faqs: [
      { q: "Why pick grid over gypsum for my office?", qHi: "ऑफिस के लिए जिप्सम की जगह ग्रिड क्यों?", a: "If ducting, conduits or plumbing run overhead, grid lets an electrician lift one tile and get in without touching the rest. Gypsum looks premium but has to be cut open for that same access.", aHi: "ऊपर डक्टिंग, कंड्यूट या प्लंबिंग हो तो ग्रिड में एक टाइल उठाकर काम हो जाता है, ाकी छुए बिना। Gypsum प्रीमियम दिखती है पर उसी एक्सेस के लिए काटनी पड़ती है।" },
      { q: "Are the tiles waterproof?", qHi: "क्या ग्रिड टाइल वॉटरप्रूफ होती है?", a: "Standard mineral-fibre tiles are not — they sag when wet. For washrooms or damp areas we drop PVC lay-in tiles into the very same grid instead.", aHi: "स्टैंडर्ड मिनरल-फाइबर टाइल नहीं — गीली होकर झुकती है। वॉशरूम या नम जगह में उसी ग्रिड में PVC टाइल रख देते हैं।" },
      { q: "Can I use grid ceiling at home?", qHi: "क्या ग्रिड सीलिंग घर में लगा सकते हैं?", a: "It's mostly a commercial choice because the grid lines show, but plenty of people use it in a store-room, garage or shop-cum-home where budget and easy access matter more than the look.", aHi: "आमतौर पर यह कमर्शियल चॉइस है क्योंकि लाइनें दिखती हैं, पर कई लोग स्टोर-रूम, गैरेज या दुकान-सह-घर में लगाते हैं, जहाँ बजट और एक्सेस लुक से ज़्यादा मायने रखते हैं।" },
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
    tagline: "A brand-new room or private cabin in days — no bricks, no cement, no mess",
    taglineHi: "दिनों में नया कमरा या प्राइवेट केबिन — न ईंट, न सीमेंट, न गंदगी",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum and glass partition wall dividing an office cabin, installed by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹100–₹130/sq.ft", desc: "Single-layer gypsum wall on one row of metal studs.", descHi: "एक स्टड रो पर सिंगल-लेयर Gypsum दीवार।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹135–₹200/sq.ft (gypsum) · ₹380–₹450/sq.ft (glass)", desc: "Double-layer gypsum with rockwool sound infill, or entry toughened glass.", descHi: "रॉकवूल साउंड इनफिल वाली डबल-लेयर Gypsum, या एंट्री टफन्ड ग्लास।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹460–₹750/sq.ft", desc: "Frosted or fluted glass in aluminium framing with a flush door.", descHi: "एल्युमिनियम फ्रेम में फ्रॉस्टेड या फ्लूटेड ग्लास, फ्लश दरवाज़े के साथ।" },
    ],
    sizesThickness: "Gypsum: 12.5mm board (single or double layer) on 50mm/75mm metal studs. Glass: 8–12mm toughened safety glass set in aluminium channel framing.",
    sizesThicknessHi: "Gypsum: 50mm/75mm मेटल स्टड पर 12.5mm बोर्ड (सिंगल या डबल लेयर)। ग्लास: एल्युमिनियम चैनल फ्रेम में 8–12mm टफन्ड सेफ्टी ग्लास।",
    labourCost: "Labour is roughly ₹25–40/sq.ft for gypsum and ₹60–100/sq.ft for glass, included above — glass costs more because it demands careful handling and exact alignment.",
    labourCostHi: "लेबर Gypsum में करीब ₹25–40/sq.ft, ग्लास में ₹60–100/sq.ft, रेट में शामिल — ग्लास में सावधान हैंडलिंग और सटीक अलाइनमेंट की वजह से ज़्यादा।",
    labourCostShort: "₹25–40/sq.ft (gypsum) · ₹60–100/sq.ft (glass)",
    brandNote: "Metal framing, gypsum board and toughened glass all come from ISI/BIS-compliant authorised Purnia/Forbesganj dealers. The glass is typically genuine toughened safety glass — plain sheet is never used on a partition.",
    brandNoteHi: "मेटल फ्रेमिंग, Gypsum Board और टफन्ड ग्लास — सब ISI/BIS-अनुरूप अधिकृत पूर्णिया/फारबिसगंज डीलरों से। ग्लास हमेशा असली टफन्ड सेफ्टी ग्लास, पार्टीशन पर प्लेन शीट कभी नहीं।",
    availability: "Gypsum partitions go up right across the service area. Glass partitions are booked most in Forbesganj and Araria offices; other towns add 2–4 days since the glass is cut in Purnia.",
    availabilityHi: "Gypsum पार्टीशन पूरे सर्विस एरिया में बनते हैं। ग्लास पार्टीशन फारबिसगंज-अररिया ऑफिस में सबसे ज़्यादा; बाकी शहरों में 2–4 दिन ज़्यादा, क्योंकि ग्लास पूर्णिया में कटती है।",
    installTime: "2–4 days by length and whether it's gypsum or glass",
    maintenance: "Gypsum face: an occasional dust. Glass face: a wipe with glass cleaner.",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Split any space into a private cabin or extra room without the dust and weeks of brickwork — a rock-solid gypsum or elegant glass partition that gives you privacy, sound control and a clean modern look, fast.",
    whatItIsHi:
      "बिना धूल और हफ़्तों की ईंट-मजदूरी के किसी भी जगह को प्राइवेट केबिन या नया कमरा बनाएं — चट्टान जैसी मज़बूत जिप्सम या शानदार ग्लास पार्टीशन, जो जल्दी दे प्राइवेसी, साउंड कंट्रोल और साफ मॉडर्न लुक।",
    whereUsed: [
      "Cabins carved out of one open office floor",
      "A glass-walled reception kept separate yet open to the working area",
      "A large bedroom split off into a study or walk-in wardrobe (gypsum)",
      "Shops needing a stockroom or a billing counter walled off",
    ],
    whereUsedHi: [
      "एक खुले ऑफिस फ्लोर से बने केबिन में",
      "ग्लास से अलग, फिर भी वर्किंग एरिया से खुले रिसेप्शन में",
      "बड़े बेडरूम से अलग किए स्टडी या वॉक-इन वार्डरोब में (Gypsum)",
      "दुकान में अलग किए स्टॉकरूम या बिलिंग काउंटर के लिए",
    ],
    whereNotUsed: [
      "Anywhere load-bearing — these are non-structural walls only",
      "Full-height glass around small children without a safety film",
      "As a wet-area boundary like a bathroom wall — use masonry or PVC there",
    ],
    whereNotUsedHi: [
      "किसी लोड-बेयरिंग जगह में नहीं — ये सिर्फ नॉन-स्ट्रक्चरल दीवार हैं",
      "छोटे बच्चों के आसपास बिना सेफ्टी फिल्म फुल-हाइट ग्लास नहीं",
      "बाथरूम जैसी गीली-जगह की बाउंड्री में नहीं — वहाँ मेसनरी या PVC",
    ],
    benefits: [
      "A new cabin or room ready in just 2–4 days — no brickwork, no cement dust",
      "Rock-solid gypsum or elegant glass, finished laser-straight and clean",
      "Real sound privacy between cabins with rockwool insulation",
      "Glass keeps the space open and bright; gypsum holds TVs and shelves",
      "Fully removable later — reworked in days if your layout changes",
    ],
    benefitsHi: [
      "नया केबिन या कमरा सिर्फ 2–4 दिन में तैयार — न ईंट का काम, न सीमेंट की धूल",
      "चट्टान जैसी मज़बूत जिप्सम या शानदार ग्लास, बिल्कुल सीधी-साफ फिनिश",
      "रॉकवूल इंसुलेशन से केबिनों के बीच सच्ची साउंड प्राइवेसी",
      "ग्लास जगह को खुला-उजला रखे; जिप्सम पर TV और शेल्फ लगें",
      "बाद में पूरी हटाई जा सके — लेआउट बदले तो दिनों में दोबारा",
    ],
    limitations: [
      "It is not a structural wall — it can't carry building loads",
      "The gypsum face isn't waterproof — keep it away from wet zones",
      "Glass costs noticeably more than gypsum for the same wall area",
      "A plain gypsum partition reduces sound; it isn't a soundproof studio wall",
    ],
    limitationsHi: [
      "यह स्ट्रक्चरल दीवार नहीं — इमारत का वज़न नहीं सहती",
      "Gypsum फेस वॉटरप्रूफ नहीं — गीली जगह से दूर रखें",
      "समान दीवार एरिया में ग्लास, Gypsum से काफ़ी महँगा",
      "साधारण Gypsum पार्टीशन शोर कम करती है; स्टूडियो जैसी साउंडप्रूफ नहीं",
    ],
    designOptions: [
      { name: "Solid gypsum cabin", nameHi: "सॉलिड Gypsum केबिन", desc: "Board both sides, finished and painted like a permanent room wall.", descHi: "दोनों तरफ बोर्ड, स्थायी दीवार जैसी फिनिश और पेंट।" },
      { name: "Half-gypsum, half-glass", nameHi: "आधा Gypsum, आधा ग्लास", desc: "A solid lower half with a glazed upper — privacy below, light above.", descHi: "नीचे सॉलिड आधा, ऊपर ग्लास — नीचे प्राइवेसी, ऊपर रोशनी।" },
      { name: "Full frosted / fluted glass", nameHi: "फुल फ्रॉस्टेड / फ्लूटेड ग्लास", desc: "Frameless-look glazing that divides yet keeps the reception bright and modern.", descHi: "फ्रेमलेस-लुक ग्लेज़िंग, जो बाँटे फिर भी रिसेप्शन को उजला-मॉडर्न रखे।" },
      { name: "Partition with sliding door", nameHi: "स्लाइडिंग दरवाज़े वाला पार्टीशन", desc: "Gypsum or glass with a built-in sliding or flush door for a proper cabin.", descHi: "Gypsum या ग्लास में बिल्ट-इन स्लाइडिंग/फ्लश दरवाज़ा, पूरे केबिन के लिए।" },
    ],
    whatsIncluded: [
      "Metal stud framing (gypsum) or aluminium channel framing (glass)",
      "Board fixed on both faces, or the glass panels fitted",
      "Rockwool acoustic infill wherever it's specified",
      "Door frame and hardware, if included in your quote",
      "Jointing and finishing (gypsum) or silicone sealing (glass)",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "मेटल स्टड फ्रेमिंग (Gypsum) या एल्युमिनियम चैनल फ्रेमिंग (ग्लास)",
      "दोनों फेस पर बोर्ड, या ग्लास पैनल फिटिंग",
      "जहाँ तय हो, वहाँ रॉकवूल एकॉस्टिक इनफिल",
      "अगर कोटेशन में हो तो दरवाज़े का फ्रेम और हार्डवेयर",
      "जॉइंटिंग-फिनिशिंग (Gypsum) या सिलिकॉन सीलिंग (ग्लास)",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Wiring, switches or sockets on the new wall — electrician's scope",
      "Any structural or load-bearing change to the building",
      "Safety-laminated film on the glass, unless you ask for it and it's quoted upfront",
    ],
    whatsNotIncludedHi: [
      "नई दीवार पर वायरिंग, स्विच या सॉकेट — इलेक्ट्रीशियन का काम",
      "इारत में कोई स्ट्रक्चरल या लोड-बेयरिंग बदलाव",
      "ग्लास पर सेफ्टी-लैमिनेटेड फिल्म, जब तक शुरू ें न माँगी-कोट की हो",
    ],
    materials: [
      { name: "Metal stud framing", nameHi: "मेटल स्टड फ्रेमिंग", detail: "Floor and ceiling track with vertical studs — the gypsum partition's skeleton", detailHi: "फर्श-छत ट्रैक और वर्टिकल स्टड — Gypsum पार्टीशन का ढाँचा" },
      { name: "Gypsum board, both faces", nameHi: "जिप्सम बोर्ड, दोनों फेस", detail: "12.5mm boards on each side, taped and finished exactly like a wall", detailHi: "दोनों तरफ 12.5mm बोर्ड, दीवार जैसी टेप-फिनिश" },
      { name: "Rockwool acoustic infill", nameHi: "रॉकवूल एकॉस्टिक इनफिल", detail: "Sound-absorbing wool packed inside the stud cavity (optional)", detailHi: "स्टड के बीच भरा साउंड-सोखने वाला वूल (वैकल्पिक)" },
      { name: "Toughened glass + aluminium frame", nameHi: "टफन्ड ग्लास + एल्युमिनियम फ्रेम", detail: "8–12mm toughened glass — plain, frosted or fluted-film", detailHi: "8–12mm टफन्ड ग्लास — प्लेन, फ्रॉस्टेड या फ्लूटेड-फिल्म" },
    ],
    installSteps: [
      { title: "Mark the layout", titleHi: "लेआउट मार्किंग", desc: "The partition line and door opening are marked on floor and ceiling.", descHi: "फर्श और छत पर पार्टीशन लाइन र दरवाज़ा मार्क करते हैं।" },
      { title: "Frame it up", titleHi: "फ्रेमिंग", desc: "Gypsum gets tracks and studs; glass gets floor-to-ceiling aluminium U-channels.", descHi: "Gypsum में ट्रैक-स्टड; ग्लास में फर्श से छत तक एल्युमिनियम U-चैनल।" },
      { title: "Pack the acoustic infill", titleHi: "एकॉस्टिक इनफिल", desc: "If specified, rockwool is packed in before the second face closes.", descHi: "अगर तय हो, दूसरा फेस बंद होने से पहले रॉकवूल भरते हैं।" },
      { title: "Fit board or glass", titleHi: "बोर्ड या ग्लास फिटिंग", desc: "Boards are screwed to both faces, or the glass is lowered into its channel.", descHi: "दोनों फेस पर बोर्ड स्क्रू, या ग्लास को चैनल में उतारते हैं।" },
      { title: "Door & finish", titleHi: "दरवाज़ा और फिनिश", desc: "The door is fitted; gypsum joints are finished or glass joints silicone-sealed.", descHi: "दरवाज़ा फिट; Gypsum जोड़ फिनिश या ग्लास जोड़ सिलिकॉन-सील।" },
      { title: "Clean & hand over", titleHi: "सफाई और हैंडओवर", desc: "The face is cleaned, the door checked, and the warranty handed over.", descHi: "फेस साफ, दरवाज़ा चेक, Warranty के साथ हैंडओवर।" },
    ],
    comparisonWith: "Brick Wall",
    comparisonWithHi: "ईंट की दीवार",
    comparison: [
      { point: "Build time", pointHi: "बनने का समय", self: "2–4 days, dry and clean", selfHi: "2–4 दिन, सूखा और साफ", other: "1–2 weeks with curing", otherHi: "क्योरिंग के साथ 1–2 हफ़्ते" },
      { point: "Mess", pointHi: "गंदगी", self: "Almost no debris or dust", selfHi: "लगभग कोई मलबा-धूल नहीं", other: "Heavy cement dust and rubble", otherHi: "भारी सीमेंट धूल और मलबा" },
      { point: "Reversible?", pointHi: "हटाई जा सकती है?", self: "Yes — remove and rework later", selfHi: "हाँ — बाद में हटाकर दोबारा", other: "No — permanent, must be demolished", otherHi: "नहीं — स्थायी, तोड़नी पड़ती है" },
      { point: "Load on slab", pointHi: "स्लैब पर वज़न", self: "Light, no structural stress", selfHi: "हल्की, कोई स्ट्रक्चरल दबाव नहीं", other: "Heavy — not for every floor", otherHi: "भारी — हर फ्लोर के लिए नहीं" },
    ],
    expertTip:
      "Planning to hang a TV, shelf or unit on the partition? Say so at the site visit and we'll build solid backing into the frame at that exact height, so the screws bite wood and not just board. For glass around kids, ask for the safety-laminated film upfront.",
    expertTipHi:
      "पार्टीशन पर TV, शेल्फ या यूनिट लगानी है? Site Visit पर बताएं, हम उसी ऊँचाई पर फ्रेम में ठोस बैकिंग बना देंगे, ताकि स्क्रू लकड़ी में बैठे, सिर्फ बोर्ड में नहीं। बच्चों वाले घर में ग्लास पर सेफ्टी-लैमिनेटेड फिल्म शुरू में ही माँग लें।",
    realProject: {
      title: "Two-cabin office split, Forbesganj",
      titleHi: "दो-केबिन ऑफिस विभाजन, फारबिसगंज",
      desc: "A 300 sq.ft rented office turned into two private cabins with rockwool-filled gypsum partitions and a frosted-glass reception, so the front counter stayed open and lit.",
      descHi: "300 वर्ग फुट किराए का ऑफिस, रॉकवूल-भरे Gypsum पार्टीशन से दो प्राइवेट केबिन और फ्रॉस्टेड-ग्लास रिसेप्शन में बदला, ताकि सामने का काउंटर खुला और रोशन रहे।",
      photos: 20,
    },
    faqs: [
      { q: "Can a partition hold a wall-mounted TV or shelves?", qHi: "क्या पार्टीशन पर TV या शेल्फ लग सकती है?", a: "Yes — as long as we know in advance. We build solid backing into the frame at the mounting height so the screws grip that, not just the board. Just flag it at the site-visit stage.", aHi: "हाँ — बशर्ते हमें पहले पता हो। माउंटिंग ऊँचाई पर फ्रेम में ठोस बैकिंग बनाते हैं ताकि स्क्रू उसे पकड़े, सिर्फ बोर्ड को नहीं। बस Site Visit पर बता दें।" },
      { q: "How much sound does a gypsum partition stop?", qHi: "जिप्सम पार्टीशन कितना शोर रोकती है?", a: "A plain double-layer wall clearly cuts everyday conversation but isn't soundproof. Adding rockwool improves it enough for private office cabins — not for a recording studio.", aHi: "साधारण डबल-लेयर दीवार रोज़ की बातचीत साफ़ कम करती है पर साउंडप्रूफ नहीं। रॉकवूल इसे ऑफिस केबिन जितना बेहतर करता है — रिकॉर्डिंग स्टूडियो जितना नहीं।" },
      { q: "Is a glass partition safe with kids around?", qHi: "बच्चे हों तो ग्लास पार्टीशन सुरक्षित है?", a: "We fit toughened glass as standard, which shatters into small blunt granules rather than sharp shards. For homes with young children we also recommend a safety-laminated film — just ask for it in the quote.", aHi: "हम स्टैंडर्ड में टफन्ड ग्लास लगाते हैं, जो तेज़ टुकड़ों की जगह छोटे-कुंद दानों में टूटता है। छोटे बच्चों वाले घर में सेफ्टी-लैमिनेटेड फिल्म भी सुझाते हैं — Quotation में माँग लें।" },
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
    tagline: "Rich teak-and-walnut wooden walls at at a lower cost than many natural-wood options — waterproof, termite-proof, and stunning",
    taglineHi: "असली सागवान-अखरोट जैसी लकड़ी वाली दीवार 60% कम में — वॉटरप्रूफ, दीमक-रोधी, शानदार",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "Fluted WPC wall panel TV feature wall with LED backlight in Bihar by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹650/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹180–₹250/sq.ft", desc: "Plain or solid-colour panel on a basic clip system, 8mm profile.", descHi: "बेसिक क्लिप सिस्टम पर प्लेन या सॉलिड-कलर पैनल, 8mm प्रोफाइल।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹260–₹380/sq.ft", desc: "Wood-grain or grooved texture panels in a 12–15mm profile.", descHi: "वुड-ग्रेन या ग्रूव्ड टेक्सचर पैनल, 12–15mm प्रोफाइल।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹390–₹650/sq.ft", desc: "Deep fluted or louvre panels with an LED backlight channel, 18–25mm.", descHi: "LED बैकलाइट चैनल वाले गहरे Fluted या Louver पैनल, 18–25mm।" },
    ],
    sizesThickness: "Panels run 250mm–600mm wide in 8 ft and 10 ft lengths, cut to your wall on-site. Profile depth steps from 8mm on plain up to 18–25mm on fluted and louvre designs.",
    sizesThicknessHi: "पैनल 250mm–600mm चौड़े, 8 फुट और 10 फुट लंबाई में, दीवार पर साइट पर कटते हैं। प्रोफाइल डेप्थ प्लेन के 8mm से Fluted-Louver में 18–25mm तक।",
    labourCost: "Batten fixing, clipping, trims and any LED wiring together run about ₹25–45/sq.ft, included above — fluted and louvre profiles take longer than plain panels.",
    labourCostHi: "बैटन फिक्सिंग, क्लिपिंग, ट्रिम्स और LED वायरिंग मिलाकर करीब ₹25–45/sq.ft, रेट में शामिल — Fluted और Louver प्रोफाइल प्लेन से ज़्यादा समय लेते हैं।",
    labourCostShort: "₹25–45/sq.ft",
    brandNote: "ISI-compliant branded composite WPC from authorised dealers — not the thin, loose unbranded WPC sold in the local bazaar, which bows within a season. We put the actual brand and texture sample in your hand at the site visit.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड कम्पोजिट WPC, अधिकृत डीलरों से — लोकल बाज़ार में खुला बिकने वाला पतला अनब्रांडेड नहीं, जो एक सीज़न में मुड़ जाता है। असली ब्रांड और टेक्सचर सैंपल Site Visit पर हाथ में देते हैं।",
    availability: "Fitted across the whole service area. The TV-wall panel is our most-asked WPC job in Forbesganj and Araria homes.",
    availabilityHi: "पूरे सर्विस एरिया में लगती है। TV-वॉल पैनल फारबिसगंज-अररिया घरों में हमारा सबसे माँगा जाने वाला WPC काम।",
    installTime: "One day for a TV wall, 2–3 days for a full room",
    maintenance: "A dry-cloth wipe — never any polish or varnish",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Designer wood-look panels that give your TV or feature wall the premium warmth of expensive natural timber — but fully waterproof, scratch-resistant and 100% safe from termites and warping in Bihar's climate.",
    whatItIsHi:
      "डिज़ाइनर वुड-लुक पैनल, जो आपकी TV या फीचर वॉल को महँगी असली लकड़ी जैसी प्रीमियम गर्माहट दें — पर पूरी तरह वॉटरप्रूफ, स्क्रैच-रोधी और बिहार की जलवायु में दीमक-मुड़ाव से 100% सुरक्षित।",
    whereUsed: [
      "The TV wall or accent wall in the living room",
      "The headboard wall behind a bed",
      "Office reception and cabin feature walls",
      "Hotel lobby and restaurant statement walls",
    ],
    whereUsedHi: [
      "लिविंग रूम की TV वॉल या एक्सेंट वॉल पर",
      "बिस्तर के पीछे हेडबोर्ड दीवार पर",
      "ऑफिस रिसेप्शन और केबिन की फीचर वॉल पर",
      "होटल लॉबी और रेस्टोरेंट की स्टेटमेंट वॉल पर",
    ],
    whereNotUsed: [
      "On ceilings — WPC is a wall product; use PVC or gypsum overhead",
      "On constantly-wet surfaces — it resists moisture, not standing water",
      "As a load-bearing wall — it's a cladding finish, not the wall itself",
    ],
    whereNotUsedHi: [
      "सीलिंग पर नहीं — यह दीवार का प्रोडक्ट है; ऊपर PVC या Gypsum",
      "लगातार गीली सतह पर नहीं — नमी झेलता है, खड़ा पानी नहीं",
      "लोड-बेयरिंग दीवार के रूप में नहीं — यह क्लैडिंग है, दीवार खुद नहीं",
    ],
    benefits: [
      "The rich look of teak/walnut timber at roughly at a lower cost than many natural-wood options cost",
      "water-resistant for suitable wet-area applications and termite-proof — never warps, swells or rots",
      "Zero maintenance — no polish or varnish, just wipe and it shines",
      "50+ premium textures, including trending fluted and LED louvre",
      "Adds VIP value to your home with a feature wall done in a day",
    ],
    benefitsHi: [
      "सागवान/अखरोट जैसी रिच लकड़ी का लुक, करीब 60% कम कीमत में",
      "100% वॉटरप्रूफ और दीमक-रोधी — न मुड़े, न फूले, न सड़े",
      "ज़ीरो देखभाल — पॉलिश-वार्निश नहीं, बस पोंछें और चमक",
      "50+ प्रीमियम टेक्सचर, ट्रेंडिंग Fluted और LED Louver समेत",
      "एक दिन में फीचर वॉल से घर की VIP वैल्यू बढ़ाए",
    ],
    limitations: [
      "Costs more per sq.ft than a UV marble sheet on the same wall",
      "Less free-form shaping than gypsum — it's a flat and fluted panel system",
      "A deeply gouged panel needs that section replaced, not touched up",
    ],
    limitationsHi: [
      "समान दीवार पर UV मार्बल शीट से प्रति वर्ग फुट ज़्यादा",
      "Gypsum जितनी फ्री-शेपिंग नहीं — यह फ्लैट और Fluted पैनल सिस्टम है",
      "गहरा खरोंच लगे पैनल को उस हिस्से में बदलना पड़ता है, टच-अप नहीं",
    ],
    designOptions: [
      { name: "Plain / solid colour", nameHi: "प्लेन / सॉलिड रंग", desc: "Flat panels in a single tone for a clean, understated backdrop.", descHi: "एक टोन में फ्लैट पैनल, साफ-शांत बैकड्रॉप के लिए।" },
      { name: "Wood-grain finish", nameHi: "वुड-ग्रेन फििश", desc: "Teak, walnut and oak looks that read as real seasoned timber.", descHi: "सागवान, अखरोट और ओक लुक, जो असली सीज़न्ड लकड़ी जैसे दिखें।" },
      { name: "Vertical fluted", nameHi: "वर्टिकल Fluted", desc: "Ridged vertical lines that add depth and make a wall feel taller.", descHi: "उभरी वर्टिकल लाइनें, जो गहराई दें और दीवार ऊँची लगाएँ।" },
      { name: "Louvre with LED backlight", nameHi: "LED बैकलाइट वाला Louver", desc: "Deep slats with a hidden strip glowing behind — the showpiece TV wall.", descHi: "गहरी स्लैट्स, पीछे छुपी ग्लो करती स्ट्रिप — शोपीस TV वॉल।" },
    ],
    whatsIncluded: [
      "Battens fixed to the wall, vertical or horizontal to suit the design",
      "Panels cut and clip-fixed, tongue-and-groove aligned",
      "Matching edge and corner trims for a factory-finished look",
      "LED backlight wiring behind the panel, if it's in your design",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "डिज़ाइन अनुसार दीवार पर वर्टिकल या हॉरिज़ॉन्टल बैटन",
      "पैनल कटिंग और क्लिप-फिक्सिंग, टंग-एंड-ग्रूव अलाइन",
      "फैक्ट्री-फिनिश लुक के लिए मैचिंग एज-कॉर्नर ट्रिम्स",
      "अगर डिज़ाइन में हो तो पैनल के पीछे LED बैकलाइट वायरिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Running the LED driver wiring back to the main switchboard — electrician's scope",
      "Plastering or repairing a badly damaged wall first — masonry work",
      "Replacing a deeply gouged panel after the warranty — billed separately if needed",
    ],
    whatsNotIncludedHi: [
      "LED ड्राइवर की मुख्य स्विचबोर्ड तक वायरिंग — इलेक्ट्रीशियन का काम",
      "बुरी तरह खराब दीवार का प्लास्टर या मरम्मत पहले — मेसनरी का काम",
      "Warranty के बाद गहरा खरोंच लगा पैनल बदलना — ज़रूरत पर अलग बिल",
    ],
    materials: [
      { name: "WPC panel board", nameHi: "WPC पैनल बोर्ड", detail: "Wood-fibre and polymer core in plain, wood-grain, fluted or 3D faces", detailHi: "वुड-फाइबर और पॉलिमर कोर, प्लेन, वुड-ग्रेन, Fluted या 3D फेस में" },
      { name: "Batten & clip system", nameHi: "बैटन और क्लिप सिस्टम", detail: "Battens on the wall; panels clip in with no face-fixing on show", detailHi: "दीवार पर बैटन; पैनल बिना सामने से फिक्स हुए क्लिप होते हैं" },
      { name: "Edge & corner trims", nameHi: "एज और कॉर्नर ट्रिम्स", detail: "Matching profiles that close every panel edge and corner cleanly", detailHi: "मैचिंग प्रोफाइल, हर पैनल किनारा-कोना साफ बंद करते हैं" },
    ],
    installSteps: [
      { title: "Check the wall", titleHi: "दीवार जांच", desc: "The wall is checked for dryness and any cracks are filled before framing.", descHi: "फ्रेमिंग से पहले दीवार का सूखापन जाँचकर दरारें भरते हैं।" },
      { title: "Fix the battens", titleHi: "बैटन फिक्सिंग", desc: "Battens are set at standard spacing across the wall.", descHi: "दीवार पर तय दूरी पर बैटन लगाते हैं।" },
      { title: "Cut & clip the panels", titleHi: "पैनल कटिंग-क्लिपिंग", desc: "Panels are cut to size and clip-fixed onto the battens.", descHi: "पैनल नाप में काटकर बैटन में क्लिप करते हैं।" },
      { title: "Route the LED", titleHi: "LED वायरिंग", desc: "If the design has backlight, wiring is run behind before the last panel closes.", descHi: "अगर डिज़ाइन में बैकलाइट हो, आखिरी पैनल बंद होने से पहले पीछे वायरिंग निकालते हैं।" },
      { title: "Trim the edges", titleHi: "एज ट्रिम्स", desc: "Matching trims close off every exposed edge and corner.", descHi: "हर खुले किनारे-कोने पर मैचिंग ट्रिम लगाते हैं।" },
      { title: "Wipe & hand over", titleHi: "सफाई और हैंडओवर", desc: "A wipe-down and the wall is ready — no curing wait, mount the TV the same day.", descHi: "पोंछते ही दीवार तैयार — कोई क्योरिंग नहीं, उसी दिन TV लगाएं।" },
    ],
    comparisonWith: "Natural Wood Panelling",
    comparisonWithHi: "असली लकड़ी पैनलिंग",
    comparison: [
      { point: "Cost", pointHi: "कीमत", self: "About 60% of solid timber", selfHi: "सॉलिड टिम्बर का करीब 60%", other: "The full premium timber price", otherHi: "पूरी प्रीमियम टिम्बर कीमत" },
      { point: "Damp & termites", pointHi: "नमी और दीमक", self: "Resists both — built for humidity", selfHi: "दोनों झेलता है — नम के लिए बना", other: "Can warp, swell or get eaten", otherHi: "मुड़, फूल या दीमक लग सकता है" },
      { point: "Upkeep", pointHi: "देखभाल", self: "Just wipe — no polish ever", selfHi: "बस पोंछें — कभी पॉलिश नहीं", other: "Needs periodic polish/varnish", otherHi: "समय-समय पर पॉलिश-वार्निश" },
      { point: "Look", pointHi: "लुक", self: "Very close to real wood", selfHi: "असली लकड़ी के बहुत करीब", other: "Genuine natural grain", otherHi: "असली प्राकृतिक ग्रेन" },
    ],
    expertTip:
      "Decide on LED backlighting before we begin — the strip and its wiring live behind the panel. Bring your TV's exact size and its wall-mount bracket to the site visit too, so the layout and a solid TV backing are planned from the very first panel.",
    expertTipHi:
      "LED बैकलाइट काम शुरू होने से पहले तय करें — स्ट्रिप और उसकी वायरिंग पैनल के पीछे रहती है। Site Visit पर TV का सही साइज़ और वॉल-माउंट ब्रैकेट भी लाएं, ताकि लेआउट और ठोस TV बैकिंग पहले पैनल से ही प्लान हो।",
    realProject: {
      title: "Fluted TV wall with LED backlight, Jogbani",
      titleHi: "LED बैकलाइट के साथ फ्लूटेड TV वॉल, जोगबनी",
      desc: "A 12 ft living-room TV wall in walnut-tone fluted WPC with a hidden LED strip washing down from the top edge — the panels went up and the TV mounted on the same day.",
      descHi: "12 फुट लिविंग-रूम TV वॉल, वॉलनट-टोन Fluted WPC में, ऊपरी किनारे से नीचे बहती छुपी LED स्ट्रिप के साथ — पैनल लगे और TV उसी दिन माउंट हुआ।",
      photos: 20,
    },
    faqs: [
      { q: "Does WPC really pass for real wood?", qHi: "क्या WPC सचमुच असली लकड़ी जैसी लगती है?", a: "From normal room distance the better wood-grain and fluted textures read as real timber — most customers are genuinely surprised it isn't. We hand you a physical sample at the site visit so you can judge for yourself.", aHi: "सामान्य कमरे की दूरी से बेहतर वुड-ग्रेन और Fluted टेक्सचर असली लकड़ी जैसे लगते हैं — ज़्यादातर ग्राहक सच में हैरान होते हैं। Site Visit पर असली सैंपल हाथ में देते हैं ताकि आप खुद परखें।" },
      { q: "What would a standard TV wall cost?", qHi: "एक सामान्य TV वॉल में कितना खर्च?", a: "A typical 10×10 ft (100 sq.ft) TV wall in mid-range fluted WPC comes to roughly ₹18,000–₹30,000, including battens, trims and basic LED wiring.", aHi: "एक सामान्य 10×10 फुट (100 वर्ग फुट) TV वॉल, मिड-रेंज Fluted WPC में करीब ₹18,000–₹30,000 — बैटन, ट्रिम्स और बेसिक LED वायरिंग समेत।" },
      { q: "Can WPC go over a tiled or painted wall?", qHi: "क्या टाइल या पेंट वाली दीवार पर WPC लगेगी?", a: "Yes — the panels clip onto battens, so we fix the battens straight over sound tile or an existing painted surface. The wall only has to be structurally solid, not perfectly smooth.", aHi: "हाँ — पैनल बैटन में क्लिप होते हैं, तो मज़बूत टाइल या मौजूदा पेंटेड सतह पर सीधे बैटन लगा देते हैं। दीवार बस मज़बूत हो, बिल्कुल स्मूथ ज़रूरी नहीं।" },
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
    tagline: "Royal Italian-marble walls without the weight, mess or huge cost of real stone",
    taglineHi: "बिना भारी पत्थर, तोड़-फोड़ और लाखों खर्च के — दीवारों पर रॉयल इटैलियन मार्बल लुक",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹110–₹180/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹60/sq.ft", desc: "Basic marble-print sheet with standard gloss, 3mm thick.", descHi: "स्टैंडर्ड ग्लॉस वाली बेसिक मार्बल-प्रिंट शीट, 3mm मोटी।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹65–₹85/sq.ft", desc: "Finer veining and a higher-gloss finish, 4mm thick.", descHi: "बेहतर वेनिंग और ज़्यादा-ग्लॉस फिनिश, 4mm मोटी।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹120/sq.ft", desc: "Premium granite or exotic print, 5–6mm, with an anti-fingerprint coat.", descHi: "प्रीमियम ग्रेनाइट या विदेशी प्रिंट, 5–6mm, एंटी-फिंगरप्रिंट कोट के साथ।" },
    ],
    sizesThickness: "Standard 8×4 ft (2440×1220mm) sheets in 3–6mm thicknesses by tier — a thicker sheet takes knocks and scratches better on a busy kitchen or bathroom wall.",
    sizesThicknessHi: "स्टैंडर्ड 8×4 फुट (2440×1220mm) शीट, टियर के साथ 3–6mm मोटाई — मोटी शीट व्यस्त किचन-बाथरूम दीवार पर ठोकर-खरोंच बेहतर झेलती है।",
    labourCost: "Surface prep, adhesive or clip fixing and edge beading run about ₹15–25/sq.ft, already inside the rate above.",
    labourCostHi: "सतह की तैयारी, एडहेसिव/क्लिप फिक्सिंग और एज बीडिंग करीब ₹15–25/sq.ft, ऊपर के रेट में शामिल।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI-compliant branded PVC-based sheets from authorised Purnia/Forbesganj dealers. We open the full sample book on-site so you see the real sheen and veining across a whole sheet before you order.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड PVC-आधारित शीट, अधिकृत पूर्णिया/फारबिसगंज डीलरों से। ऑर्डर से पहले साइट पर पूरी सैंपल बुक खोलते हैं ताकि आप पूरी शीट पर असली शीन और वेनिंग देखें।",
    availability: "Fitted across the whole service area. Bathroom and pooja-room UV marble is the most common request in Forbesganj, Araria and Jogbani.",
    availabilityHi: "पूरे सर्विस एरिया में लगती है। बाथरूम और पूजा-घर की UV मार्बल फारबिसगंज, अररिया और जोगबनी में सबसे आम माँग।",
    installTime: "1–2 days per room",
    maintenance: "None to speak of — a damp cloth keeps it shining, no polishing",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A glass-gloss, seamless marble-look wall that brings palace-like luxury to your pooja room or bathroom — water-resistant for suitable wet-area applications, with no grout lines to blacken, at a fraction of real marble's price.",
    whatItIsHi:
      "शीशे जैसी चमकदार, बिना-जोड़ मार्बल दीवार, जो आपके पूजा घर या बाथरूम में पैलेस जैसी लग्जरी लाए — 100% वॉटरप्रूफ, काली पड़ने वाली ग्राउट लाइन नहीं, असली मार्बल से बहुत कम कीमत में।",
    whereUsed: [
      "Bathroom walls — no grout lines to blacken like tiles do",
      "Kitchen walls away from the direct flame (backsplash, side runs)",
      "Pooja-room walls — the exact marble look most families want",
      "Living-room feature walls after a stone finish",
    ],
    whereUsedHi: [
      "बारूम की दीवार पर — टाइल जैसी काली पड़ने वाली ग्राउट लाइन नहीं",
      "सीधी आँच से दूर किचन की दीवार पर (बैकस्प्लैश, साइड)",
      "पूजा-घर की दीवार पर — ज़्यादातर परिवारों की चाही मार्बल लुक",
      "स्टोन फिनिश वाली लिविंग-रूम फीचर वॉल पर",
    ],
    whereNotUsed: [
      "Right behind a gas stove or any high-heat surface — the PVC base isn't heat-rated",
      "On outdoor walls under years of harsh sun — the UV print can fade faster than stone",
      "On floors — this is wall cladding, not flooring",
    ],
    whereNotUsedHi: [
      "गैस चूल्हे के ठीक पीछे या तेज़ गर्मी वाली सतह पर नहीं — PVC बेस गर्मी-रेटेड नहीं",
      "सालों तेज़ धूप वाली बाहरी दीवार पर नहीं — UV प्रिंट पत्थर से जल्दी फीका पड़ सकता है",
      "फर्श पर नहीं — यह दीवार क्लैडिंग है, फ्लोरिंग नहीं",
    ],
    benefits: [
      "Royal Italian-marble look at 70–80% less than real stone",
      "Mirror-gloss finish that brightens the whole room with reflected light",
      "water-resistant for suitable wet-area applications with no grout lines — stays spotless for years",
      "Lightweight, scratch-resistant and wipes clean in seconds",
      "A full luxury makeover finished in a single, dust-free day",
    ],
    benefitsHi: [
      "असली पत्थर से 70–80% कम में रॉयल इटैलियन-मार्बल लुक",
      "शीशे जैसी ग्लॉस फिनिश, जो रोशनी परावर्तित कर पूरा कमरा उजला करे",
      "100% वॉटरप्रूफ, कोई ग्राउट लाइन नहीं — सालों बेदाग",
      "हल्की, स्क्रैच-रोधी और सेकंडों में पोंछकर साफ",
      "एक ही दिन में, बिना धूल, पूरी लग्जरी मेकओवर",
    ],
    limitations: [
      "Not heat-resistant — keep it clear of open flame and hot surfaces",
      "A deep scratch shows and can't be re-ground the way polished stone can",
      "Carries less resale prestige than a genuine natural-stone wall",
    ],
    limitationsHi: [
      "गर्मी-रोधी नहीं — खुली आँच और गर्म सतह से दूर रखें",
      "गहरी खरोंच दिखती है, पॉलिश्ड पत्थर की तरह दोबारा घिस नहीं सकते",
      "असली प्राकृतिक-पत्थर दीवार जितनी रीसेल साख नहीं",
    ],
    designOptions: [
      { name: "White / Italian veined", nameHi: "सफेद / इटैलियन वेन", desc: "Soft grey-gold veins on white — the classic bright, calm pooja and bath look.", descHi: "सफेद पर हल्की ग्रे-गोल्ड नसें — क्लासिक उजला, शांत पूजा-बाथ लुक।" },
      { name: "Black / granite", nameHi: "काला / ग्रेनाइट", desc: "Deep dark stone patterns for a bold feature or dado band.", descHi: "गहरे-गाढ़े पत्थर पैटर्न, बोल्ड फीचर या डेडो बैंड के लिए।" },
      { name: "Coloured / exotic print", nameHi: "रंगीन / विदेशी प्रिंट", desc: "Onyx, beige and exotic prints when you want a richer, warmer wall.", descHi: "ओनिक्स, बेज और विदेशी प्रिंट, जब ज़्यादा रिच-गर्म दीवार चाहिए।" },
      { name: "Book-matched panels", nameHi: "बुक-मैच्ड पैनल", desc: "Two sheets mirrored so the veining flows symmetrically — a true slab effect.", descHi: "दो शीट मिरर की गईं ताकि नसें सममित बहें — असली स्लैब जैसा असर।" },
    ],
    whatsIncluded: [
      "Wall prep — cleaning, filling cracks and levelling the surface",
      "Sheet cutting and layout so the veining lines up at joints",
      "Bonding or clip-fixing onto the prepared wall",
      "Edge and corner beading for a seamless finish",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "दीवार की तैयारी — सफाई, दरार भरना, सतह लेवल करना",
      "शीट कटिंग और लेआउट, ताकि जोड़ों पर नसें मिलें",
      "तैयार दीवार पर बॉन्डिंग या क्लिप-फिक्सिंग",
      "बिना-जोड़ फिनिश के लिए एज और कॉर्नर बीडिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Heavy plaster repair or waterproofing of the wall base — masonry work done first and separately",
      "Moving plumbing or electrical fixtures behind the wall",
      "Replacing a sheet cracked or scratched after handover — billed separately if needed",
    ],
    whatsNotIncludedHi: [
      "दीवार बेस का भारी प्लास्टर रिपेयर या वॉटरप्रूफिंग — मेसनरी का काम, पहले अलग से",
      "दीवार के पीछे प्लंबिंग या इलेक्ट्रिकल फिक्स्चर शिफ्ट करना",
      "हैंडओवर के बाद टूटी या खरोंची शीट बदलना — ज़रूरत पर अलग बिल",
    ],
    materials: [
      { name: "UV-printed PVC marble sheet", nameHi: "UV-प्रिंटेड PVC मार्बल शीट", detail: "High-gloss sheet with a marble/granite pattern UV-cured and sealed on", detailHi: "हाई-ग्लॉस शीट, मार्बल/ग्रेनाइट पैटर्न UV-क्योर कर सील किया" },
      { name: "Marine-grade adhesive / clip channel", nameHi: "मरीन-ग्रेड एडहेसिव / क्लिप चैनल", detail: "Bonds or clip-fixes the sheet to a prepared wall depending on the surface", detailHi: "सतह के अनुसार शीट को दीवार पर बॉन्ड या क्लिप करता है" },
      { name: "Edge & corner beading", nameHi: "एज और कॉर्नर बीडिंग", detail: "Matching trims that finish exposed edges and corners cleanly", detailHi: "मैचिंग ट्रिम, खुले किनारे-कोनों को साफ फिनिश देते हैं" },
    ],
    installSteps: [
      { title: "Prepare the wall", titleHi: "दीवार की तैयारी", desc: "The wall is cleaned, cracks are filled, and it's levelled so the sheet bonds dead flat.", descHi: "दीवार साफ, दरारें भरकर लेवल करते हैं ताकि शीट बिल्कुल फ्लैट चिपके।" },
      { title: "Lay out & cut", titleHi: "लेआउट और कटिंग", desc: "Sheets are measured and cut so the pattern lines up across the joints.", descHi: "शीट नापकर काटते हैं ताकि जोड़ों के आर-पार पैटर्न मिले।" },
      { title: "Bond / clip on", titleHi: "बॉन्ड / क्लिप करना", desc: "Sheets are adhered or clipped on, chosen to suit the wall type.", descHi: "दीवार के प्रकार अनुसार शीट बॉन्ड या क्लिप करते हैं।" },
      { title: "Align the veining", titleHi: "वेनिंग मिलान", desc: "Neighbouring sheets are set so the veins read as one continuous flow.", descHi: "पास-पास शीट ऐसे सेट करते हैं कि नसें एक लगातार बहाव जैसी दिखें।" },
      { title: "Bead the edges", titleHi: "एज बीडिंग", desc: "Corners and edges get a finishing bead.", descHi: "कोनों और किनारों पर फिनिशिंग बीड लगाते हैं।" },
      { title: "Polish & hand over", titleHi: "पॉलिश और हैंडओवर", desc: "A final buff brings the gloss up and it's ready to use straight away.", descHi: "आखिरी बफ़ से ग्लॉस निखरता है, तुरंत इस्तेमाल के लिए तैयार।" },
    ],
    comparisonWith: "Ceramic Wall Tiles",
    comparisonWithHi: "सेरेमिक वॉल टाइल",
    comparison: [
      { point: "Grout lines", pointHi: "ग्राउट लाइन", self: "None — one seamless surface", selfHi: "कोई नहीं — एक बिना-जोड़ सतह", other: "Many lines that blacken over time", otherHi: "कई लाइनें, जो समय के साथ काली पड़तीं" },
      { point: "Look", pointHi: "लुक", self: "Large-slab marble effect", selfHi: "बड़े-स्लैब मार्बल जैसा असर", other: "Repeating tile grid", otherHi: "दोहराता टाइल ग्रिड" },
      { point: "Fitting speed", pointHi: "लगने की रफ़्तार", self: "1–2 days, dry work", selfHi: "1–2 दिन, सूखा काम", other: "Slower, wet cement work", otherHi: "धीमा, गीला सीमेंट काम" },
      { point: "Cleaning", pointHi: "सफाई", self: "Wipe the whole wall flat", selfHi: "पूरी दीवार सपाट पोंछें", other: "Scrubbing grout joints", otherHi: "ग्राउट जोड़ रगड़ने पड़ते हैं" },
    ],
    expertTip:
      "Ask to see the veining on a full sheet at the site visit, not just a small chip. Marble pattern reads completely differently across a whole wall than on a palm-sized sample — judging it big is how you avoid a surprise.",
    expertTipHi:
      "Site Visit पर छोटे चिप नहीं, पूरी शीट पर नसों का पैटर्न देखकर तय करें। मार्बल पैटर्न पूरी दीवार पर हथेली-भर सैंपल से बिल्कुल अलग दिखता है — बड़ा देखकर परखना ही सरप्राइज़ से बचाता है।",
    realProject: {
      title: "Pooja-room marble-finish wall, Purnia",
      titleHi: "पूजा-घर मार्बल-फिनिश दीवार, पूर्णिया",
      desc: "A small pooja room clad floor-to-ceiling in white-and-gold veined UV marble with a recessed LED niche for the idol — finished in a single day with none of the dust real stone-cutting throws up.",
      descHi: "छोटा पूजा-घर, फर्श से छत तक सफेद-सुनहरी नसों वाली UV मार्बल में, मूर्ति के लिए रिसेस्ड LED आले के साथ — एक ही दिन में, बिना उस धूल के जो असली पत्थर काटने से उड़ती है।",
      photos: 20,
    },
    faqs: [
      { q: "Can UV marble go on the wall behind the stove?", qHi: "क्या चूल्हे के पीछे की दीवार पर UV मार्बल लगे?", a: "We keep it off the strip right behind the flame — direct heat can affect the PVC base. For that patch we suggest ceramic tile or a metal splashback and run UV marble across the rest of the wall.", aHi: "आँच के ठीक पीछे की पट्टी पर हम नहीं लगाते — सीधी गर्मी PVC बेस पर असर डाल सकती है। उस हिस्से में सेरेमिक टाइल या मेटल स्प्लैशबैक, बाकी पूरी दीवार पर UV मार्बल।" },
      { q: "Does it need grout like tiles?", qHi: "क्या टाइल की तरह इसमें ग्राउट लगती है?", a: "No — sheets meet edge-to-edge with the pattern aligned, so there's no grout line at all. That means no joint that turns black with mould over the years.", aHi: "नहीं — शीट किनारे-से-किनारे पैटर्न मिलाकर मिलती हैं, कोई ग्राउट लाइन नहीं। यानी सालों में फफूँद से काला पड़ने वाला कोई जोड़ नहीं।" },
      { q: "UV marble sheet or WPC panel for my wall?", qHi: "दीवार के लिए UV मार्बल य WPC?", a: "UV marble gives a stone look, is fully waterproof and costs less; WPC gives a wood look, resists moisture and costs more. So bathroom and pooja rooms lean UV marble, while a TV wall or bedroom leans WPC.", aHi: "UV मार्बल पत्थर लक देती है, पूरी वॉटरप्रूफ और सस्ती; WPC लकड़ी लुक देती है, नमी-रोधी और महँगी। तो बाथरूम-पूजा घर UV मार्बल की तरफ, TV वॉल या बेडरूम WPC की तरफ।" },
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
    tagline: "A showroom-class TV unit built to your exact wall — hidden wires, smart storage, pure class",
    taglineHi: "आपकी दीवार की सही नाप पर शोरूम-क्लास TV यूनिट — छुपे तार, स्मार्ट स्टोरेज, पूरी क्लास",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with hidden LED backlight and cable management by JK Interior in Bihar",
    galleryCategory: "TV Unit Design",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹15,000–₹25,000", desc: "6–8 ft unit in laminate finish with basic hinges, no LED.", descHi: "6–8 फुट ूनिट, लैमिनेट फिनिश, बेसिक हिंज, बिना LED।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹26,000–₹45,000", desc: "8–10 ft unit, better finish, soft-close hardware, LED optional.", descHi: "8–10 फुट यूनिट, बेहतर फिनिश, सॉफ्ट-क्लोज़ हार्डवेयर, वैकल्पिक LED।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹46,000–₹75,000+", desc: "10–14 ft unit, premium veneer or gloss, LED backlight, extra storage.", descHi: "10–14 फुट यूनिट, प्रीमियम वीनियर या ग्लॉस, LED बैकलाइट, ज़्यादा स्टोरेज।" },
    ],
    sizesThickness: "Built to your wall's exact width, usually 6–14 ft. Carcass in 18mm plywood or MDF, 6mm back panel, ~1mm laminate face — shutter and shelf thicknesses vary with the design.",
    sizesThicknessHi: "आपकी दीवार की सही चौड़ाई, आमतौर पर 6–14 फुट, पर बनती है। कारकास 18mm प्लाईवुड या MDF, 6mm बैक पैनल, ~1mm लैमिनेट फेस — शटर-शेल्फ मोटाई डिज़ाइन के साथ बदलती है।",
    labourCost: "Fabrication and installation labour is bundled into the unit price — usually 25–35% of the total, and a little more where there's heavy LED work or several floating shelves.",
    labourCostHi: "फैब्रिकेशन और इंस्ॉलेशन की लेबर यूनिट कीमत में शामिल — आमतौर पर कुल का 25–35%, और भारी LED या कई फ्लोटिंग शेल्फ पर थोड़ा ज़्यादा।",
    labourCostShort: "25–35% of unit price",
    brandNote: "BWP/BWR-grade plywood or MDF from ISI-compliant branded stock, dressed in branded laminate or veneer with soft-close hardware. All the brand options are laid out for you at the design stage before anything is cut.",
    brandNoteHi: "ISI-अनुरूप ब्रांडेड BWP/BWR-ग्रेड प्लाईवुड या MDF, ब्रांडेड लैमिनेट या वीनियर और सॉफ्ट-क्लोज़ हार्डवेयर के साथ। कुछ भी कटने से पहले सभी ब्रांड विकल्प डिज़ाइन स्टेज पर आपके सामने रखते हैं।",
    availability: "Fabricated and installed across the whole service area. Large premium units of 10 ft and up need about 5–7 days to build, a little longer for outlying blocks.",
    availabilityHi: "पूरे सर्विस एरिया में बनकर इंस्टॉल होती है। 10 फुट और उससे बड़ी प्रीमियम यूनिट बनने में करीब 5–7 दिन, दूर के इलाकों में थोड़ा ज़्यादा।",
    installTime: "3–5 days by size and design",
    maintenance: "Wipe with a dry cloth; keep hot vessels off the surface",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A custom entertainment centre engineered to your exact wall and TV — no dangling wires, no clutter — with sleek storage, a premium anti-scratch finish and optional LED that makes your hall look straight out of a showroom.",
    whatItIsHi:
      "आपकी दीवार और TV की सही नाप पर बनी कस्टम एंटरटेनमेंट यूनिट — न लटकते तार, न बिखराव — स्लीक स्टोरेज, प्रीमियम एंटी-स्क्रैच फिनिश और वैकल्पिक LED के साथ, जो आपके हॉल को शोरूम जैसा दिखाए।",
    whereUsed: [
      "Living rooms — the focal wall facing the seating",
      "Bedrooms — a compact unit across from the bed",
      "Home-theatre and media rooms that need AV storage",
    ],
    whereUsedHi: [
      "लिविंग रूम में — बैठने की जगह के सामने वाली दीवार पर",
      "बेडरूम में — बिस्तर के सामने कॉम्पैक्ट यूनिट",
      "होम-थिएटर और मीडिया रूम में, AV स्टोरेज के साथ",
    ],
    whereNotUsed: [
      "Damp or splash-prone walls — laminate and veneer aren't built for standing moisture",
      "Walls you plan to reconfigure soon — it's custom-built to that exact width",
    ],
    whereNotUsedHi: [
      "नम या छींटे वाली दीवार पर नहीं — लैमिनेट-वीनियर खड़े पानी के लिए नहीं",
      "जल्द बदलने वाली दीवार पर नहीं — यह उसी सही चौड़ाई पर बनती है",
    ],
    benefits: [
      "Fits your exact wall — no ugly side gaps like a ready-made unit",
      "All wires and boxes hidden inside — clean, clutter-free class",
      "Optional LED backlight for a floating, premium showroom glow",
      "Smart storage sized to exactly what you keep",
      "Finish, colour and hardware fully your choice, with a 1-year warranty",
    ],
    benefitsHi: [
      "आपकी दीवार की सही फिट — रेडीमेड जैसी भद्दी साइड-गैप नहीं",
      "सारे तार-बॉक्स अंदर छुपे — साफ, बिना-बिखराव क्लास",
      "वैकल्पिक LED बैकलाइट, फ्लोटिंग प्रीमियम शोरूम ग्लो के लिए",
      "स्मार्ट स्टोरेज, ठीक उतना जितना आप रखते हैं",
      "फिनिश, रंग, हार्डवेयर पूरी आपकी पसंद, 1 साल की वारंटी के साथ",
    ],
    limitations: [
      "It's a fixed build — moving it to another wall later isn't practical",
      "Being made to order, it takes longer than lifting a ready-made unit off a floor",
      "That customisation costs more than a plain showroom piece",
    ],
    limitationsHi: [
      "यह फिक्स्ड बिल्ड है — बाद में दूसरी दीवार पर शिफ्ट करना व्यावहारिक नहीं",
      "ऑर्डर पर बनने से रेडीमेड यूनिट उठा लेने से ज़्यादा समय लगता है",
      "वो कस्टमाइज़ेशन सादे शोरूम पीस से ज़्यादा कीमत माँगता है",
    ],
    designOptions: [
      { name: "Wall-mounted floating", nameHi: "वॉल-माउंटेड फ्लोटिंग", desc: "A hung unit with clear floor below — light, modern, easy to clean under.", descHi: "टँगी यूनिट, नीचे खुला फर्श — हल्की, मॉडर्न, नीचे सफाई आसान।" },
      { name: "Full-wall with panelling", nameHi: "पैनलिंग वाली फुल-वॉल", desc: "The unit merges into a WPC or laminate back wall for one big statement.", descHi: "यूनिट WPC या लैमिनेट बैक-वॉल में मिलती है, एक बड़ा स्टेटमेंट।" },
      { name: "Storage-heavy cabinet", nameHi: "ज़्यादा-स्टोरेज कैबिनेट", desc: "Extra closed shutters and drawers when you need the unit to hide a lot.", descHi: "ज़्यादा बंद शटर और दराज़, जब यूनिट में बहुत कुछ छुपाना हो।" },
      { name: "Open-shelf minimal", nameHi: "ओपन-शेल्फ मिनिमल", desc: "Slim floating shelves and a clean panel for a pared-back, airy look.", descHi: "पतली फ्लोटिंग शेल्फ और साफ पैनल, सिंपल-हवादार लुक के लिए।" },
    ],
    whatsIncluded: [
      "On-site measurement and finalising the custom design with you",
      "Carcass fabrication in the laminate or veneer you choose",
      "Soft-close hinges and drawer hardware",
      "A cable-management channel built into the panel",
      "LED backlight wiring, if it's in your design",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "साइट पर माप और आपके साथ कस्टम डिज़ाइन फाइनल करना",
      "आपकी चुनी लैमिनेट या वीनियर में कारकास फैब्रिकेशन",
      "सॉफ्ट-क्लोज़ हिंज और दराज़ हार्डवेयर",
      "पैनल में बिल्ट-इन केबल-मैनेजमें चैनल",
      "अगर डि़ाइन में हो तो LED बैकलाइट वायरिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "The TV wall-mount bracket or the TV itself — unless added into your quote",
      "A fresh electrical point for the unit's LED — electrician's scope if none exists",
      "Relocating the finished unit to a different wall later on",
    ],
    whatsNotIncludedHi: [
      "TV का वॉल-माउंट ब्रैकेट या TV खुद — जब तक कोटेशन में न जोड़ा हो",
      "यूनिट की LED के लिए नया इलेक्ट्रिकल पॉइंट — पहले से न हो तो इलेक्ट्रीशियन का काम",
      "बनी हुई यूनिट को बाद में दूसरी दीवार पर शिफ्ट करना",
    ],
    materials: [
      { name: "Plywood / MDF carcass", nameHi: "प्लाईवुड / MDF कारकास", detail: "Plywood where it bears load, MDF where a smooth laminate face is wanted", detailHi: "जहाँ वज़न पड़े वहाँ प्लाईवुड, स्मूथ लैमिनेट फेस के लिए MDF" },
      { name: "Laminate / veneer finish", nameHi: "लैमिनेट / वीनियर फिनिश", detail: "Matte, gloss or wood-veneer options across dozens of shades", detailHi: "मैट, ग्लॉस या वुड-वीनियर विकल्प, दर्जनों शेड में" },
      { name: "Soft-close hardware", nameHi: "सॉफ्ट-क्लोज़ हार्डवेयर", detail: "Hinges and channels that shut silently and don't slam over the years", detailHi: "हिंज और चैनल, जो चुपचाप बंद हों और सालों पटकें नहीं" },
      { name: "LED strip + driver (optional)", nameHi: "LED स्ट्रिप + ड्राइवर (वैकल्पिक)", detail: "Backlight along shelf edges for a floating, showroom effect", detailHi: "शेल्फ किनारों पर बैकलाइट, फ्लोटिंग शोरूम जैसा असर" },
    ],
    installSteps: [
      { title: "Measure on-site", titleHi: "साइट माप", desc: "Exact wall width, height, TV size and socket positions are recorded.", descHi: "दीवार की सही चौड़ाई, ऊँचाई, TV साइज़ और सॉकेट की जगह दर्ज करते हैं।" },
      { title: "Finalise the design", titleHi: "डिज़ाइन फाइनल", desc: "Layout, finish, colour and LED options are locked before anything is cut.", descHi: "कुछ भी कटने से पहले लेआउट, फिनिश, रंग और LED तय करते हैं।" },
      { title: "Fabricate the modules", titleHi: "मॉड्यूल फैब्रिकेशन", desc: "Carcass panels are cut, edge-banded and laminated to the agreed finish.", descHi: "कारकास पैनल काटकर एज-बैंड कर तय फिनिश में लैमिनेट करते हैं।" },
      { title: "Fix the wall bracket", titleHi: "वॉल ब्रैकेट फिक्सिंग", desc: "Mounting battens are fixed to the wall at the right height.", descHi: "सही ऊँचाई पर दीवार में माउंटिंग बैटन फिक्स करते हैं।" },
      { title: "Install the modules", titleHi: "मॉड्यूल इंस्टॉल", desc: "Modules go up and are levelled with the cable channel routed behind.", descHi: "मॉड्यूल लगाकर लेवल करते हैं, केबल चैनल पीछे से निकालते हैं।" },
      { title: "Hardware, LED & handover", titleHi: "हार्डवेयर, LED और हैंडओवर", desc: "Hinges, channels and LED are fitted and tested, shutters checked, warranty handed over.", descHi: "हिंज, चैनल और LED फि कर टेस्ट, शटर चेक, Warranty के साथ हैंडओवर।" },
    ],
    comparisonWith: "Ready-made TV Unit",
    comparisonWithHi: "रेडीमेड TV यूनिट",
    comparison: [
      { point: "Fit to wall", pointHi: "दीवार में फिट", self: "Exact width, no side gaps", selfHi: "सही चौड़ाई, कोई साइड-गैप नहीं", other: "Fixed size, gaps or overflow", otherHi: "फिक्स साइज़, गैप या ओवरफ्लो" },
      { point: "Cable hiding", pointHi: "तार छुपाना", self: "Channel built in — wires vanish", selfHi: "चैनल बिल्ट-इन — तार गायब", other: "Wires usually left hanging", otherHi: "तार अक्सर लटके रह जाते हैं" },
      { point: "Storage", pointHi: "स्टोरेज", self: "Sized to what you actually keep", selfHi: "जो आप रखते हैं उसके नाप पर", other: "Whatever the model offers", otherHi: "जो मॉडल में मिले, बस वही" },
      { point: "Lead time", pointHi: "समय", self: "3–5 days made to order", selfHi: "3–5 दिन, ऑर्डर पर बनी", other: "Carry it home the same day", otherHi: "उसी दिन घर ले जाएं" },
    ],
    expertTip:
      "Before we lock the design, bring your TV's exact size and count every box you want tucked out of sight — set-top box, router, gaming console. The cable channel and the compartments are sized around that list, so nothing ends up sitting on top later.",
    expertTipHi:
      "डिज़ाइन तय करने से पहले TV का सही साइज़ लाएं और नज़र से दूर रखने वाले हर बॉक्स को गिनें — सेट-टॉप बॉक्स, राउटर, गेमिंग कंसोल। केबल चैनल और कम्पार्टमेंट इसी लिस्ट के नाप पर बनते हैं, ताकि बाद में कुछ ऊपर रखा न रह जाए।",
    realProject: {
      title: "10 ft floating LED TV unit, Forbesganj",
      titleHi: "10 फुट फ्लोटिंग LED TV यूनिट, फारबिसगंज",
      desc: "A wall-hung 10 ft unit with a floating centre shelf, a hidden LED wash, and closed side cabinets sized precisely to swallow a set-top box and router out of sight.",
      descHi: "दीवार पर टँगी 10 फुट यूनिट — फ्लोटिंग सेंटर शेल्फ, छुपी LED वॉश, और साइड कैबिनेट, जो सेट-टॉप बॉक्स और राउटर को नज़र से दूर निगलने के नाप पर बने।",
      photos: 8,
    },
    faqs: [
      { q: "How soon after I confirm the design is it ready?", qHi: "डिज़ाइन कन्फर्म के कितने दिन बाद तैयार?", a: "Once design and finish are locked, building and installing together take 3–5 days by size — a simple 6–8 ft unit is quicker, a large LED unit closer to five days.", aHi: "डिज़ाइन और फिनिश तय होते ही, साइज़ अनुसार बनना और लगना मिलाकर 3–5 दिन — साधारण 6–8 फुट जल्दी, बड़ी LED यूनिट करीब पाँच दिन।" },
      { q: "Will it really hide the router, set-top box and cables?", qHi: "क्या यह सच में राउटर, सेट-टॉप बॉक्स और तार छुपाएगी?", a: "Yes — that's exactly what the cable channel is for. We run a hollow channel from the wall socket to a vented compartment, so the devices sit inside with only the remote sensor peeking out.", aHi: "हाँ — केबल चैनल इसी के लिए है। सॉकेट से हवादार कम्पार्टमेंट तक खोखली चैनल निकालते हैं, ताकि डिवाइस अंदर बैठें और सिर्फ रिमोट सेंसर बाहर झाँके।" },
      { q: "What size unit suits a 10×12 ft living room?", qHi: "10×12 फुट लिविंग रूम के लिए कौन सा साइज़?", a: "An 8–10 ft wide unit usually balances that wall nicely. We confirm the exact size on-site against your real wall and how far back the seating sits.", aHi: "8–10 फुट चौड़ी यूनिट आमतौर पर उस दीवार को अच्छा बैलेंस करती है। सही साइज़ Site Visit पर आपकी असली दीवार और बैठने की दूरी देखकर तय करते हैं।" },
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
    tagline: "A lush green lawn 365 days a year — zero watering, zero mowing, zero mud",
    taglineHi: "साल के 365 दिन हरी-भरी घास — न पानी, न कटाई, न कीचड़",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "UV-stabilised artificial grass balcony lawn installation in Bihar by JK Interior",
    galleryCategory: "Artificial Grass",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹40–₹55/sq.ft", desc: "25–30mm pile at standard density — fine for a small balcony.", descHi: "25–30mm पाइल, स्टैंडर्ड डेंसिटी — छोटी बालकनी के लिए ठीक।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹60–₹85/sq.ft", desc: "35–40mm denser pile with better UV treatment.", descHi: "35–40mm ज़्यादा घनी पाइल, बेहतर UV ट्रीटमेंट के साथ।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹150/sq.ft", desc: "40–50mm premium-density pile with the longest-lasting colour and UV.", descHi: "40–50mm प्रीमियम-डेंसिटी पाइल, सबसे लंबे टिकने वाला रंग और UV।" },
    ],
    sizesThickness: "Rolls come in standard 2m and 4m widths and are seam-taped together for wider areas. Pile height steps 25mm → 50mm by tier — taller pile reads lusher underfoot.",
    sizesThicknessHi: "रोल स्टैंडर्ड 2m और 4m चौड़ाई में, बड़ी जगह के लिए सीम-टेप से जोड़े जाते हैं। पाइल हाइट टियर के साथ 25mm → 50mm — ऊँची पाइल पैरों तले ज़्यादा घनी दिखती है।",
    labourCost: "Base/drainage prep, laying, seam joining and edge fixing run about ₹8–15/sq.ft on floors and ₹15–25/sq.ft on wall panels, included in the rate above.",
    labourCostHi: "बेस/ड्रेनेज तैयारी, बिछाना, सीम जोड़ना और एज फिक्सिंग की लेबर फर्श पर करीब ₹8–15/sq.ft, दीवार पैनल पर ₹15–25/sq.ft, ऊपर के रेट में शामिल।",
    labourCostShort: "₹8–15/sq.ft (floor) · ₹15–25/sq.ft (wall)",
    brandNote: "UV-stabilised synthetic turf from our regular Purnia suppliers. We check the UV treatment and pile density before ordering, because untreated turf bleaches within a single season under North Bihar's sun.",
    brandNoteHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ, हमारे नियमित पूर्णिया सप्लायर से। ऑर्डर से पहले UV ट्रीटमेंट और पाइल डेंसिटी जाँचते हैं, क्योंकि अनट्रीटेड टर्फ उत्तर बिहार की धूप में एक ही सीज़न में फीकी पड़ जाती है।",
    availability: "Fitted across the whole service area. Balcony and terrace turf is most requested in Forbesganj, Araria and Raniganj; premium rolls need a couple of extra days in outlying blocks.",
    availabilityHi: "पूरे सर्विस एरिया में लगती है। बालकनी और टैरेस टर्फ फारबिसगंज, अररिया और रानीगंज में सबसे ज़्यादा; प्रीमियम रोल दूर के इलाकों में कुछ दिन ज़्यादा लेते हैं।",
    installTime: "Half a day to a full day for a typical balcony or wall",
    maintenance: "An occasional rinse and a light brush — never any mowing or watering",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Soft, premium UV-protected turf that turns any balcony, terrace or wall into a fresh green oasis all year — no watering, no mowing, no insects — and it drains the monsoon straight through.",
    whatItIsHi:
      "नरम, प्रीमियम UV-प्रोटेक्टेड घास, जो किसी भी बालकनी, टैरेस या दीवार को साल भर ताज़ा हरा-भरा बना दे — न पानी, न कटाई, न कीड़े — और मानसून का पानी सीधे निकाल दे।",
    whereUsed: [
      "Balconies and terraces — evergreen with no watering or mowing",
      "A green feature wall in a living room or office",
      "Small home gardens and rooftop seating corners",
      "Pet-friendly outdoor spots where a real lawn is hard to keep",
    ],
    whereUsedHi: [
      "बालकनी और टैरेस पर — बिना पानी या कटाई हमेशा हरी",
      "लिविंग रूम या ऑफिस में ग्रीन फीचर वॉल पर",
      "छोटे घर-गार्डन और छत पर बैठने के कोने में",
      "पालतू-अनुकूल आउटडोर जगह में, जहाँ असली लॉन रखना मुश्किल",
    ],
    whereNotUsed: [
      "Over poor drainage — water pools and starts to smell; we fix the drainage first",
      "Under intense reflected heat — it can soften the backing faster than normal sun",
      "As an indoor soft-carpet replacement — turf feels quite different underfoot",
    ],
    whereNotUsedHi: [
      "खराब ड्रेनेज पर नहीं — पानी जमा होकर बदबू करता है; पहले ड्रेनेज ठीक करते हैं",
      "तेज़ रिफ्लेक्टेड गर्मी में नहीं — बैकिंग सामान्य धूप से जल्दी नरम हो सकती है",
      "इनडोर नरम-कारपेट की जगह नहीं — टर्फ पैरों तले काफ़ी अलग लगती है",
    ],
    benefits: [
      "Lush green 365 days a year — never any watering or mowing",
      "Soft and safe for kids and pets, comfortable underfoot",
      "Drains the monsoon straight through — no mud, no pooling, no smell",
      "UV-protected colour that won't fade for years in the sun",
      "Ready in hours, backed by a 1-year fade-proof warranty",
    ],
    benefitsHi: [
      "365 दिन हरी-भरी — कभी पानी या कटाई नहीं",
      "बच्चों और पालतुओं के लिए नरम-सुरक्षित, पैरों तले आरामदेह",
      "मानसून का पानी सीधे निकाले — न कीचड़, न जमाव, न बदबू",
      "UV-प्रोटेक्टेड रंग, धूप में सालों फीका न पड़े",
      "घंटों में तैयार, 1 साल की फेड-प्रूफ वारंटी के साथ",
    ],
    limitations: [
      "It needs a properly drained base — poor drainage brings odour over time",
      "It can heat up underfoot in direct peak-afternoon sun",
      "It won't feel exactly like a real, watered lawn",
    ],
    limitationsHi: [
      "इसे ठीक से ड्रेन होती बेस चाहिए — खराब ड्रेनेज समय के साथ बदबू लाती है",
      "दोपहर की सीधी धूप में पैरों तले गर्म हो सकती है",
      "असली, पानी दी गई घास जैसा बिल्कुल एहसास नहीं देती",
    ],
    designOptions: [
      { name: "Balcony / terrace floor lawn", nameHi: "बालकनी / टैरेस फर्श लॉन", desc: "Wall-to-wall turf over a drained base for an instant green floor.", descHi: "ड्रेन्ड बेस पर दीवार-से-दीवार टर्फ, तुरंत हरा फर्श।" },
      { name: "Vertical green wall", nameHi: "वर्टिकल ग्रीन वॉल", desc: "Pre-cut panels on a batten frame for a living-look feature wall indoors or out.", descHi: "बैटन फ्रेम पर पहले से कटे पैनल, अंदर-बाहर जीवंत फीचर वॉल।" },
      { name: "Turf with pebble / deck border", nameHi: "पेबल / डेक बॉर्डर वाली टर्फ", desc: "Grass paired with a pebble strip or wood deck for a landscaped corner.", descHi: "घास के साथ पेबल पट्टी या वुड डेक, लैंडस्केप्ड कोने के लिए।" },
      { name: "Play / seating area", nameHi: "खेल / बैठने का एरिया", desc: "Denser, softer pile sized for a kids' play spot or a rooftop lounge.", descHi: "बच्चों के खेल या छत लाउंज के नाप पर घनी, नरम पाइल।" },
    ],
    whatsIncluded: [
      "A surface and drainage check, plus base or batten prep",
      "Turf rolled or panels fixed, cut to your exact boundary",
      "Seam joining and edge fixing so nothing lifts at the corners",
      "A final grooming for a full, fresh-lawn finish",
      "1-year written warranty",
    ],
    whatsIncludedHi: [
      "सतह और ड्रेनेज जाँच, साथ में बेस या बैटन तैयरी",
      "टर्फ रोलिंग या पनल फिक्सिंग, आपकी सही बाउंड्री पर काटकर",
      "सीम जोड़ना और एज फिक्सिंग, ताकि कोनों से कुछ न उठे",
      "भरे-भरे, ताज़े-लॉन फिनिश के लिए फाइनल ग्रूमिंग",
      "1 साल की लिखित Warranty",
    ],
    whatsNotIncluded: [
      "Fixing pre-existing poor drainage or waterproofing the floor/terrace — civil work quoted separately first",
      "Potted plants, planters or any landscaping beyond the turf itself",
      "Replacing turf damaged by fire, sharp objects or pet chewing after handover",
    ],
    whatsNotIncludedHi: [
      "पहले से खराब ड्रेनेज ठीक करना या फ्लोर/टैरेस वॉटरप्रूफिंग — सिविल काम, पहले अलग से",
      "गमले, प्लांटर या टर्फ के अलावा कोई लैंडस्केपिंग",
      "हैंडओवर के बाद आग, नुकीली चीज़ या पालतू के काटने से खराब टर्फ बदलना",
    ],
    materials: [
      { name: "UV-stabilised synthetic turf", nameHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ", detail: "PE/PP grass fibres on a permeable backing, in several pile heights", detailHi: "PE/PP घास रेशे, पारगम्य बैकिंग पर, कई पाइल-हाइट में" },
      { name: "Drainage underlay", nameHi: "ड्रेनेज अंडरले", detail: "Sand, gravel or a perforated base that lets rainwater pass straight through", detailHi: "रेत, बजरी या छिद्रित बेस, जो बारिश का पानी सीधे निकाल दे" },
      { name: "Jointing tape / seam adhesive", nameHi: "जॉइंटिंग टेप / सीम एडहेसिव", detail: "Joins rolls invisibly so the lawn reads as one continuous surface", detailHi: "रोल को अदृश्य जोड़ता है, लॉन एक लगातार सतह जैसा दिखे" },
    ],
    installSteps: [
      { title: "Check surface & drainage", titleHi: "सतह-ड्रेनेज जाँच", desc: "The base is cleaned and checked for slope and drainage; a wall has its battens checked.", descHi: "बेस साफ कर ढलान-ड्रेनेज जाँचते हैं; दीवार के लिए बैटन चेक करते हैं।" },
      { title: "Prepare the base", titleHi: "बेस तैयारी", desc: "Floors get a drainage underlay; walls get a batten frame fixed up.", descHi: "फर्श पर ड्रेनेज अंडरले; दीवार पर बैटन फ्रेम फिक्स करते हैं।" },
      { title: "Lay turf / fix panels", titleHi: "टर्फ बिछाना / पैनल फिक्सिंग", desc: "Turf is rolled and cut to the boundary, or panels are fixed to the wall frame.", descHi: "टर्फ बिछाकर बाउंड्री पर काटते हैं, या पैनल दीवार फ्रेम में फिक्स करते हैं।" },
      { title: "Join the seams", titleHi: "सीम जोड़ना", desc: "Neighbouring pieces are joined so the seam vanishes into the pile.", descHi: "पास-पास टुकड़े जोड़ते हैं ताकि सीम पाइल में छुप जाए।" },
      { title: "Fix the edges", titleHi: "एज फिक्सिंग", desc: "Edges are secured with U-pins, adhesive or beading so they can't lift.", descHi: "किनारों को U-पिन, एडहेसिव या बीडिंग से फिक्स करते हैं ताकि उठ न सकें।" },
      { title: "Groom & hand over", titleHi: "ग्रूमिंग और हैंडओवर", desc: "The fibres are brushed upright for a full, fresh-lawn look and it's handed over.", descHi: "रेशों को ब्रश कर सीधा खड़ा करते हैं, ताज़े-लॉन लुक के साथ हैंडओवर।" },
    ],
    comparisonWith: "Natural Grass Lawn",
    comparisonWithHi: "असली घास का लॉन",
    comparison: [
      { point: "Watering", pointHi: "पानी देना", self: "None — never needs water", selfHi: "कुछ नहीं — कभी पानी नहीं", other: "Daily watering in summer", otherHi: "गर्मी में रोज़ पानी" },
      { point: "Mowing & care", pointHi: "कटाई और देखभाल", self: "No mowing, no fertiliser", selfHi: "न कटाई, न खाद", other: "Regular mowing and feeding", otherHi: "नियमित कटाई और खाद" },
      { point: "Monsoon", pointHi: "मानसून", self: "Drains through, stays usable", selfHi: "पानी निकल जाता, इस्तेमाल लायक रहती", other: "Turns muddy and patchy", otherHi: "कीचड़ और गंजी हो जाती है" },
      { point: "Year-round look", pointHi: "साल भर लुक", self: "Green every single day", selfHi: "हर दिन हरी", other: "Browns off in dry months", otherHi: "सूखे महीनों में पीली पड़ती" },
    ],
    expertTip:
      "Tell us honestly how the space will actually be used — a quiet sitting corner is a very different job from a daily kids' play area. We size the drainage prep and pick the pile density around real use, not a guess.",
    expertTipHi:
      "जगह असल में किस काम आएगी, साफ बताएं — शांत बैठने का कोना और बच्चों के रोज़ खेलने का एरिया बिल्कुल अलग काम हैं। ड्रेनेज तैयारी और पाइल डेंसिटी हम असली इस्तेमाल के हिसाब से तय करते हैं, अंदाज़े से नहीं।",
    realProject: {
      title: "Balcony lawn corner, Raniganj",
      titleHi: "बालकनी लॉन कॉर्नर, रानीगंज",
      desc: "A 60 sq.ft balcony given a drained-base artificial lawn with a small potted-plant corner — a garden feel for a family without a ground-floor plot to keep one.",
      descHi: "60 वर्ग फुट बालकनी को ड्रेन्ड-बेस आर्टिफिशियल लॉन और गमलों के छोटे कोने के साथ दिया — उस परिवार के लिए बगीचे जैसा एहसास, जिनके पास ग्राउंड-फ्लोर प्लॉट नहीं।",
      photos: 7,
    },
    faqs: [
      { q: "Will it smell or grow mould in the monsoon?", qHi: "क्या मानसून में इससे बदबू या फफूँद आएगी?", a: "Not if the base drains properly — that's the one thing we typically insist on checking. If your balcony doesn't drain well, we sort the drainage before a single roll goes down.", aHi: "अगर बेस से पानी ठीक निकले तो नहीं — यही एक चीज़ हम हमेशा ज़रूर जाँचते हैं। बालकनी ठीक से न निकलती हो तो एक भी रोल बिछाने से पहले ड्रेनेज ठीक करते हैं।" },
      { q: "How long does it last outdoors?", qHi: "यह बाहर कितने साल चलती है?", a: "Good UV-stabilised turf keeps its colour and pile for about 5–8 years of regular sun before it noticeably fades. Our 1-year warranty covers the installation; the material itself lasts well beyond that.", aHi: "अच्छी UV-स्टेबलाइज़्ड टर्फ सामान्य धूप में करीब 5–8 साल रंग और पाइल बनाए रखती है, फिर साफ़ फीकी पड़ती है। 1 साल की Warranty इंस्टॉलेशन कवर करती है; मटेरियल उससे कहीं आगे चलता है।" },
      { q: "Can it go on a wall as well?", qHi: "क्या यह दीवार पर भी लग सकती है?", a: "Yes — for a green feature wall we fix pre-cut turf panels onto a batten frame just like a WPC panel, with no drainage worry since it's vertical and stays dry.", aHi: "हाँ — ग्रीन फीचर वॉल के लिए पहले से कटे टर्फ पैनल WPC की तरह बैटन फ्रेम पर लगाते हैं, वर्टिकल और सूखी जगह होने से ड्रेनेज की चिंता नहीं।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "uv-marble-sheet"],
  },
]

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
