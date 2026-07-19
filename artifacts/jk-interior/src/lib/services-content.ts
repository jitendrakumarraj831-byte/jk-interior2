import { Layers, PanelTop, Tv, Grid3x3, Gem, Trees, DoorClosed, type LucideIcon } from "lucide-react"

/**
 * Full-detail bilingual service content — one record per service, independent of city.
 * Backs the /services/:slug detail pages. Numbers here must stay consistent with the
 * pricing already quoted in business-data.ts / service-city-data.ts / the homepage
 * Services section — this is the same catalogue, just written out in full.
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
  materials: ServiceMaterial[]
  installSteps: InstallStep[]
  realProject: { title: string; titleHi: string; desc: string; descHi: string; photos: number }
  faqs: ServiceFaqItem[]
  relatedSlugs: string[]
}

/** Shown on every service page directly under the price tiers — the one non-negotiable disclaimer. */
export const PRICE_DISCLAIMER =
  "Every range above is a local Forbesganj / Araria district market estimate, not a fixed quote. The exact price for your job depends on the free site visit and measurement, your chosen design, the material quality tier, room access, and total project size — larger orders and combo bookings (ceiling + wall + TV unit together) usually work out cheaper per sq.ft than a single small job."

export const PRICE_DISCLAIMER_HI =
  "ऊपर दिए गए सभी रेट फारबिसगंज/अररिया ज़िले के लोकल मार्केट के अनुमानित रेट हैं, फिक्स्ड कोटेशन नहीं। आपके काम की असली कीमत फ्री Site Visit और माप, आपके चुने गए डिज़ाइन, मटेरियल क्वालिटी टियर, कमरे तक पहुंच, और कुल प्रोजेक्ट साइज़ पर निर्भर करती है — बड़ा ऑर्डर या कॉम्बो बुकिंग (सीलिंग + वॉल + TV यूनिट एक साथ) करवाएं तो आमतौर पर प्रति वर्ग फुट सस्ता पड़ता है।"

export const SERVICE_AREA_NOTE =
  "JK Interior's team is based in Forbesganj and travels for site visits and installation across Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur — roughly an 80 km radius. Call or WhatsApp to confirm your exact village/mohalla is covered before booking."

export const SERVICE_AREA_NOTE_HI =
  "हमारी टीम फारबिसगंज में बेस्ड है और साइट विज़िट व इंस्टॉलेशन के लिए फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर — लगभग 80 किमी के दायरे में हम खुद जाते हैं। बुकिंग से पहले अपने गांव या मोहल्ले का कवरेज कन्फर्म करने के लिए कॉल या WhatsApp कर लें।"

export const SERVICES_CONTENT: ServiceContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gypsum-ceiling",
    icon: Layers,
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "The dry-room finish that turns a hall into a showpiece — built exactly to the design you bring us",
    taglineHi: "सूखे कमरों की वो फिनिश जो पूरे हॉल को शोपीस जैसा लुक दे देती है — आप जो भी डिज़ाइन दें, हम बिल्कुल वैसा ही बनाकर देते हैं",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "Flat, single-level ceiling built to a simple design — standard 12.5mm board, no cove. Colour/paint finish is not included; that's arranged separately with your own painter.", descHi: "सीधी-सादी फ्लैट सीलिंग, एक ही लेवल में — स्टैंडर्ड 12.5mm Gypsum Board लगता है, इसमें Cove नहीं होता। रंग/पेंट फिनिश इसमें शामिल नहीं है, वो आप अपने पेंटर से अलग से करवा सकते हैं।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹130/sq.ft", desc: "One stepped border with a basic cove channel (LED strip billed separately), built exactly to the design you bring us.", descHi: "एक सीढ़ीदार बॉर्डर के साथ बेसिक Cove चैनल बनता है (LED Strip का खर्च अलग से लगेगा) — जो डिज़ाइन आप बताएं, ठीक वैसा ही बना देते हैं।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹135–₹210/sq.ft", desc: "Multi-level or curved tray design with integrated LED cove lighting — built to any custom shape or reference photo you bring, no fixed template.", descHi: "मल्टी-लेवल या घुमावदार ट्रे डिज़ाइन, अंदर बिल्ट-इन LED Cove Light लगती है — आप जो भी शेप या रेफरेंस फोटो दिखाएं, हम बिल्कुल वैसा ही बना देते हैं, कोई फिक्स टेम्पलेट नहीं।" },
    ],
    sizesThickness: "Gypsum boards are standard 12.5mm thick, in 1200×2400mm (4×8 ft) and 1200×1800mm (4×6 ft) sheets, cut to size on-site. Thinner 8mm board is used only for curved/false-drop sections.",
    sizesThicknessHi: "Gypsum Board आमतौर पर 12.5mm मोटा आता है, 1200×2400mm (4×8 फुट) और 1200×1800mm (4×6 फुट) शीट में — साइट पर ही सही नाप में काटा जाता है। सिर्फ घुमावदार या फॉल्स-ड्रॉप वाले हिस्सों में हल्का 8mm बोर्ड लगाते हैं।",
    labourCost: "Labour (framing, board fixing, taping) is already included in the rates above and typically makes up roughly ₹30–45/sq.ft of the total — cove and multi-level designs sit at the higher end because of the extra framing and finishing work. Paint/colour is not part of this rate — once taping is done, the ceiling is ready for any painter you choose to finish it in whatever colour or design you like.",
    labourCostHi: "फ्रेमिंग, बोर्ड फिक्सिंग और टेपिंग की पूरी लेबर ऊपर के रेट में ही शामिल है — कुल रेट का करीब ₹30–45/sq.ft हिस्सा लेबर पर जाता है। Cove और मल्टी-लेवल डिज़ाइन में ज़्यादा फ्रेमिंग-फिनिशिंग करनी पड़ती है, इसलिए वहां यह हिस्सा थोड़ा ज़्यादा हो जाता है। पेंट/रंग इस रेट में शामिल नहीं है — टेपिंग होते ही सीलिंग आपके किसी भी पेंटर से, आपकी पसंद के रंग या डिज़ाइन में फिनिश कराने के लिए तैयार हो जाती है।",
    labourCostShort: "₹30–45/sq.ft",
    brandNote: "We install ISI-marked, branded gypsum board and GI framing sourced from authorised dealers in Purnia and Forbesganj — never unbranded or duplicate stock. The exact board brand in stock at the time of your order is shown to you during the free site visit, matched to the quality tier you choose.",
    brandNoteHi: "भाई, हम हमेशा ISI-मार्क्ड, ब्रांडेड Gypsum Board और GI फ्रेमिंग ही लगाते हैं — पूर्णिया और फारबिसगंज के अधिकृत डीलरों से मंगाते हैं, अनब्रांडेड या डुप्लीकेट स्टॉक हम कभी इस्तेमाल नहीं करते। इससे भरोसा रहता है कि लगा हुआ बोर्ड सालों चलेगा। ऑर्डर के वक़्त जो ब्रांड स्टॉक में मिलेगा, वो फ्री Site Visit में आपको दिखा दिया जाता है, आपके चुने गए क्वालिटी टियर के हिसाब से।",
    availability: "Available across our full service area — Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur. Cove-lighting and multi-level designs are our most-requested option in Forbesganj and Araria town; standard flat ceilings are the common choice further out.",
    availabilityHi: "यह हम अपने पूरे सर्विस एरिया में लगाते हैं — फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर, सब जगह। फारबिसगंज और अररिया टाउन में लोग सबसे ज़्यादा Cove Lighting और मल्टी-लेवल डिज़ाइन मांगते हैं; बाकी इलाकों में ज़्यादातर स्टैंडर्ड फ्लैट सीलिंग ही पसंद की जाती है।",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    maintenance: "Dust occasionally with a dry cloth; repaint whenever you like, in any colour your painter suggests",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Gypsum false ceiling is a suspended ceiling built from 12.5mm gypsum boards screwed onto a GI metal frame fixed a few inches below your actual slab. Once the joints are taped and finished, it looks like one continuous smooth plaster surface — not a panel with visible seams. That smooth surface is what lets us cut cove channels, stepped borders, and curved profiles into it, and hide LED strip lighting inside those recesses.",
    whatItIsHi:
      "देखिए, जिप्सम फॉल्स सीलिंग असल में एक नई सीलिंग है जो आपकी असली स्लैब से कुछ इंच नीचे बनाई जाती है — GI मेटल फ्रेम खड़ा करके उस पर 12.5mm Gypsum Board स्क्रू से कस दिए जाते हैं। जोड़ों पर टेप और फिनिशिंग होने के बाद यह एक बिल्कुल स्मूथ, बिना जोड़ वाली प्लास्टर जैसी सतह बन जाती है। इसी स्मूथ सतह की वजह से इसमें Cove डिज़ाइन, स्टेप बॉर्डर और घुमावदार शेप आसानी से बन जाते हैं, और LED Strip अंदर छुपाई जा सकती है — फारबिसगंज-अररिया के ज़्यादातर ड्रॉइंग रूम में यही सबसे ज़्यादा मांगा जाता है।",
    whereUsed: [
      "Living room / hall — the room every guest sees first",
      "Bedrooms — soft cove lighting for a calmer, warmer feel",
      "Dining and drawing rooms",
      "Office cabins and reception areas that stay dry",
    ],
    whereUsedHi: [
      "हॉल / लिविंग रूम में — मेहमान की नज़र सबसे पहले यहीं जाती है",
      "बेडरूम में — सॉफ्ट Cove Light से कमरा शांत और गर्म-सा लगता है",
      "डाइनिंग और ड्रॉइंग रूम में",
      "ऑफिस केबिन और रिसेप्शन में, जहां नमी नहीं आती",
    ],
    whereNotUsed: [
      "Bathrooms — steam and standing moisture will stain and soften the board over time",
      "Kitchens — cooking steam has the same effect as bathroom humidity",
      "Open balconies, terraces, or any area exposed to direct rain",
      "Any room that floods or has a chronic leak from the floor above — fix the leak first",
    ],
    whereNotUsedHi: [
      "बाथरूम में नहीं — भाप और नमी से बोर्ड धीरे-धीरे खराब होने लगता है",
      "किचन में भी नहीं — खाना बनाते वक़्त की भाप का भी वही असर होता है",
      "खुली बालकनी, टैरेस या जहां बारिश सीधे आती हो",
      "ऊपर के फ्लोर से लीकेज वाले कमरे में — भाई, पहले लीकेज ठीक कराइए, सीलिंग बाद में",
    ],
    benefits: [
      "Every design is custom — bring a sketch, a photo, or just an idea, and we build exactly that, not a fixed catalogue model",
      "Perfectly smooth, seamless finish — the most premium look among all ceiling options",
      "Any shape or profile possible: cove, step, curved, tray ceiling",
      "Takes cove/LED strip lighting better than any other material",
      "Ready for any colour your painter chooses, now or years later, without replacing the ceiling",
      "Fire-resistant board, and it dampens sound between floors better than PVC",
    ],
    benefitsHi: [
      "हर डिज़ाइन कस्टम बनता है — आप स्केच, फोटो या सिर्फ आइडिया दें, हम बिल्कुल वैसा ही बनाते हैं, कोई फिक्स कैटलॉग मॉडल नहीं",
      "बिल्कुल स्मूथ, बिना जोड़ वाली फिनिश — सबसे प्रीमियम लुक इसी में मिलता है",
      "जो शेप चाहें बन जाता है: Cove, Step, घुमावदार या Tray Ceiling",
      "Cove Light और LED Strip के लिए सबसे बढ़िया मटेरियल",
      "अपने पेंटर से जब चाहें, जो भी रंग चाहें, करवा सकते हैं — सीलिंग बदलने की ज़रूरत नहीं",
      "आग से बचाव करता है, और PVC से ज़्यादा अच्छी आवाज़ रोकता है",
    ],
    limitations: [
      "Not waterproof — the one hard rule we don't bend, even when a customer insists",
      "Takes longer to finish than PVC because of the taping and sanding needed for a seamless base",
      "A ceiling leak (from a slab crack above) will show as a stain that needs board replacement, not just a wipe",
      "Slightly higher skilled-labour cost than PVC for the same complexity of design",
    ],
    limitationsHi: [
      "इस पर पानी का असर होता है — यह एक नियम है जो हम किसी की भी ज़िद पर नहीं तोड़ते",
      "टेपिंग और सैंडिंग की वजह से PVC से थोड़ा ज़्यादा समय लगता है, ताकि सतह एकदम स्मूथ बने",
      "अगर ऊपर से लीकेज हुआ तो सिर्फ पोंछने से काम नहीं चलेगा, बोर्ड ही बदलना पड़ेगा",
      "समान डिज़ाइन में PVC से थोड़ा ज़्यादा लेबर खर्च बैठता है",
    ],
    materials: [
      { name: "Gypsum board (12.5mm)", nameHi: "जिप्सम बोर्ड (12.5mm)", detail: "Branded boards (Saint-Gobain / USG / India Gypsum grade) — never unbranded stock", detailHi: "ब्रांडेड बोर्ड लगाते हैं (Saint-Gobain / USG / India Gypsum ग्रेड) — अनब्रांडेड स्टॉक हम कभी नहीं लगाते" },
      { name: "GI metal channel frame", nameHi: "GI मेटल चैनल फ्रेम", detail: "Perimeter angle + intermediate/ceiling channels — galvanised, doesn't rust or sag over years", detailHi: "पेरीमीटर एंगल और इंटरमीडिएट/सीलिंग चैनल — गैल्वनाइज़्ड होता है, सालों तक जंग नहीं लगती और झुकता भी नहीं" },
      { name: "Joint tape & jointing compound", nameHi: "जॉइंट टेप और जॉइंटिंग कंपाउंड", detail: "Seals every board joint so the finished surface reads as one continuous plane", detailHi: "हर बोर्ड के जोड़ को सील कर देता है, जिससे पूरी सतह एक जैसी स्मूथ दिखती है" },
      { name: "LED cove profile + strip", nameHi: "LED कोव प्रोफाइल + स्ट्रिप", detail: "Aluminium channel recessed into the cove step, warm-white (3000K) for living areas", detailHi: "Cove के स्टेप में लगा एल्युमिनियम चैनल, लिविंग एरिया के लिए वार्म-व्हाइट (3000K) रखते हैं" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "We mark a laser/spirit-level line around the room at the drop height agreed with you.", descHi: "पहले आपसे तय ड्रॉप-हाइट पर लेज़र या स्पिरिट-लेवल से पूरे कमरे में लाइन मार्क करते हैं।" },
      { title: "Frame fixing", titleHi: "फ्रेम फिक्सिंग", desc: "Perimeter angle goes up on the wall line, then ceiling channels are anchor-fixed to the slab at set spacing.", descHi: "पहले दीवार पर पेरीमीटर एंगल लगाते हैं, फिर तय दूरी पर स्लैब में सीलिंग चैनल एंकर से फिक्स करते हैं।" },
      { title: "Board fixing", titleHi: "बोर्ड फिक्सिंग", desc: "Gypsum boards are screwed onto the frame with staggered joints so no seam lines run continuously.", descHi: "Gypsum Board को स्टैगर्ड जॉइंट में स्क्रू से फ्रेम पर लगाते हैं, ताकि कोई सीधी सीम लाइन दिखे ही न।" },
      { title: "Cove framing (if in design)", titleHi: "कोव फ्रेमिंग (अगर डिज़ाइन में है)", desc: "A recessed step is framed at the border for the LED strip before the boards on that section close.", descHi: "उस हिस्से का बोर्ड बंद होने से पहले, बॉर्डर पर LED Strip के लिए एक रिसेस्ड स्टेप बना देते हैं।" },
      { title: "Taping & jointing", titleHi: "टेपिंग और जॉइंटिंग", desc: "Paper tape and jointing compound cover every screw head and board joint, then get sanded flat.", descHi: "हर स्क्रू और जोड़ पर पेपर टेप और Joint Compound लगाते हैं, फिर सैंड करके पूरी तरह स्मूथ कर देते हैं।" },
      { title: "Electrical cutouts", titleHi: "इलेक्ट्रिकल कटआउट", desc: "Openings for downlights, AC vents, and the cove wiring are cut and wired before handover.", descHi: "हैंडओवर से पहले डाउनलाइट, AC वेंट और Cove वायरिंग के कटआउट काटकर वायरिंग कर देते हैं।" },
      { title: "Handover", titleHi: "हैंडओवर", desc: "Final walk-through, lights switched on to check the cove line, ceiling handed over smooth and ready for your painter to finish in whatever colour or design you choose, written warranty handed over.", descHi: "आखिर में फाइनल चेक करते हैं, Cove की लाइन देखने के लिए लाइट ऑन करते हैं, सीलिंग को स्मूथ करके सौंप देते हैं ताकि आपका पेंटर अपनी पसंद के रंग या डिज़ाइन में उसे फिनिश कर सके, और आपको लिखित Warranty दे देते हैं।" },
    ],
    realProject: {
      title: "Cove-lit hall ceiling, Forbesganj",
      titleHi: "कोव-लिट हॉल सीलिंग, फारबिसगंज",
      desc: "A 180 sq.ft drawing room finished with a stepped gypsum border and warm-white LED cove — one of the projects our team most often shows on-site to explain what cove lighting actually looks like once installed.",
      descHi: "यह फारबिसगंज का एक 180 वर्ग फुट का ड्रॉइंग रूम है, जिसमें हमने सीढ़ीदार Gypsum Board बॉर्डर और वार्म-व्हाइट LED Cove Light लगाई। यही प्रोजेक्ट हम अक्सर साइट पर ग्राहकों को दिखाते हैं, ताकि उन्हें असल में पता चले कि Cove Light लगने के बाद कमरा कैसा दिखता है।",
      photos: 16,
    },
    faqs: [
      { q: "Will gypsum ceiling get damaged if it accidentally gets wet once?", qHi: "अगर गलती से एक बार गीला हो जाए तो जिप्सम सीलिंग खराब हो जाएगी?", a: "A one-off splash that's wiped up quickly is usually fine. What damages gypsum is standing moisture or repeated steam — that's why we simply don't install it in bathrooms or kitchens, regardless of how the room looks otherwise.", aHi: "भाई, एक बार गीला होकर जल्दी पोंछ दिया जाए तो कुछ नहीं होता। असली नुकसान तब होता है जब लगातार नमी या भाप लगती रहे — इसी वजह से हम इसे बाथरूम या किचन में कभी नहीं लगाते, चाहे कमरा कितना भी अच्छा क्यों न दिखे।" },
      { q: "Can I get gypsum ceiling and cove lighting done on a tight budget?", qHi: "कम बजट में भी जिप्सम सीलिंग और कोव लाइटिंग हो सकती है?", a: "Yes — a plain gypsum ceiling without cove detailing starts at the base ₹80/sq.ft rate. Cove lighting adds roughly ₹40–80 per running foot of the border, not the whole ceiling area, so you can add it to just the main wall and skip it elsewhere.", aHi: "हां बिल्कुल — बिना Cove Light वाली प्लेन Gypsum Ceiling ₹80/sq.ft से शुरू होती है। Cove Light का चार्ज पूरी सीलिंग पर नहीं, सिर्फ बॉर्डर की रनिंग फुट पर ₹40–80 अतिरिक्त लगता है — तो चाहें तो सिर्फ मुख्य दीवार पर लगवा लें, बाकी जगह छोड़ दें।" },
      { q: "How is gypsum different from POP (Plaster of Paris)?", qHi: "जिप्सम, POP से कैसे अलग है?", a: "POP is wet plaster applied directly by hand, so its finish depends heavily on the mason's skill and it takes longer to dry and cure. Gypsum board is a factory-made panel screwed onto a frame — the finish is more uniform, installation is faster, and it's easier to later remove a section for repair without redoing the whole ceiling.", aHi: "POP सीधे हाथ से लगाया गया गीला प्लास्टर होता है, तो इसकी फिनिश पूरी तरह मिस्त्री के हुनर पर टिकी होती है और सूखने में भी समय लगता है। Gypsum Board फैक्ट्री में बना पैनल है जो Frame पर स्क्रू होता है — फिनिश ज़्यादा एक जैसी रहती है, काम तेज़ होता है, और बाद में कोई हिस्सा खराब हो तो सिर्फ वही निकालकर रिपेयर हो जाता है, पूरी सीलिंग तोड़नी नहीं पड़ती।" },
      { q: "Does gypsum ceiling reduce room height noticeably?", qHi: "क्या जिप्सम सीलिंग से कमरे की ऊंचाई कम हो जाती है?", a: "A flat gypsum ceiling typically drops the height by 3–4 inches for the frame and board. If your room already has low ceilings, tell us before the site visit — we'll suggest a shallower frame or recommend PVC instead, which needs less drop.", aHi: "एक फ्लैट Gypsum Ceiling में Frame और Board की वजह से आमतौर पर 3–4 इंच ऊंचाई कम हो जाती है। अगर आपके कमरे की ऊंचाई पहले से कम है, तो साइट विज़िट से पहले ही बता दें — हम कम ड्रॉप वाला Frame या PVC सुझा देंगे, जिसमें उतनी जगह नहीं चाहिए।" },
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
    tagline: "The one we install in more Forbesganj kitchens and bathrooms than anything else",
    taglineHi: "फारबिसगंज के ज़्यादातर किचन-बाथरूम में हम यही लगाते हैं",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹75–₹90/sq.ft", desc: "Plain white or matte panels, 5mm gauge, basic batten grid.", descHi: "इसमें प्लेन सफेद या मैट पैनल लगते हैं, 5mm गेज, बेसिक बैटन ग्रिड के साथ।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹95–₹115/sq.ft", desc: "Wood-texture or marble-print panels, 6–7mm gauge for a sturdier feel.", descHi: "वुड-टेक्सचर या मार्बल-प्रिंट वाले पैनल, ज़्यादा मज़बूती के लिए 6–7mm गेज इस्तेमाल होता है।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹120–₹150/sq.ft", desc: "Designer 3D/embossed or high-gloss panels, 8mm gauge, heavier-duty grid for larger spans.", descHi: "डिज़ाइनर 3D/एम्बॉस्ड या हाई-ग्लॉस पैनल, 8mm गेज के साथ बड़े स्पैन के लिए ज़्यादा मज़बूत ग्रिड लगता है।" },
    ],
    sizesThickness: "Panels come in standard 200mm and 250mm widths, cut to room length on-site (up to roughly 12 ft spans without a joint), thickness 5–8mm depending on tier — thicker panels sag less over a wide kitchen or hall span.",
    sizesThicknessHi: "पैनल आमतौर पर 200mm और 250mm चौड़ाई में आते हैं, कमरे की लंबाई पर साइट पर ही काटे जाते हैं (करीब 12 फुट तक बिना जोड़ के)। मोटाई टियर के हिसाब से 5mm से 8mm तक होती है — मोटा पैनल बड़े किचन या हॉल के स्पैन में कम झुकता है।",
    labourCost: "Labour (batten grid, panel fixing, beading) is included in the rate above, roughly ₹20–30/sq.ft of the total — the fastest labour cost per sq.ft of anything we install.",
    labourCostHi: "बैटन ग्रिड, पैनल फिक्सिंग और बीडिंग की लेबर रेट में शामिल है, कुल का करीब ₹20–30/sq.ft हिस्सा लेबर पर जाता है — हमारे सभी कामों में सबसे कम समय और लेबर इसी में लगता है।",
    labourCostShort: "₹20–30/sq.ft",
    brandNote: "Panels are ISI-compliant branded PVC stock from authorised Forbesganj/Purnia suppliers, not the cheaper unbranded imports some smaller contractors use — we'll show you the panel sample and its batch marking on-site.",
    brandNoteHi: "हमारे PVC Panel फारबिसगंज/पूर्णिया के अधिकृत सप्लायर से ISI-अनुरूप ब्रांडेड स्टॉक होते हैं — कुछ छोटे ठेकेदार जो सस्ता अनब्रांडेड इम्पोर्ट लगाते हैं, हम वो कभी इस्तेमाल नहीं करते। साइट पर हम पैनल का सैंपल और उसकी बैच मार्किंग दिखाकर ही आगे बढ़ते हैं, ताकि आपको पूरा भरोसा रहे।",
    availability: "Available across Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur. This is our highest-volume install — panel stock for common colours is normally in hand without an ordering delay.",
    availabilityHi: "यह हम फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर — सब जगह लगाते हैं। यह हमारा सबसे ज़्यादा लगने वाला काम है, तो आम रंगों का Panel स्टॉक हमेशा तैयार रहता है, कोई देरी नहीं होती।",
    installTime: "1 room in a day, full home in 3–4 days",
    maintenance: "Zero — wipe with a damp cloth, never needs repainting",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "PVC (Polyvinyl Chloride) false ceiling is built from hollow, interlocking plastic panels that clip into a wooden or GI batten grid fixed a few inches below your slab. The panels are 100% sealed plastic through and through, so unlike gypsum there's no board core that can absorb moisture — the material itself doesn't care whether the room is wet or dry.",
    whatItIsHi:
      "PVC (पॉलीविनाइल क्लोराइड) फॉल्स सीलिंग खोखले, आपस में इंटरलॉक होने वाले प्लास्टिक Panel से बनती है, जो स्लैब से कुछ इंच नीचे लकड़ी या GI Channel की बैटन ग्रिड में क्लिप हो जाते हैं। ये पैनल पूरी तरह सील्ड प्लास्टिक होते हैं, तो Gypsum की तरह इसमें कोई ऐसा कोर नहीं है जो नमी सोख ले — मटेरियल को फर्क नहीं पड़ता कि कमरा गीला है या सूखा, इसीलिए फारबिसगंज के ज़्यादातर किचन-बाथरूम में हम बेफिक्र होकर यही लगाते हैं।",
    whereUsed: [
      "Kitchens and bathrooms — this is the one ceiling material we never hesitate to recommend here",
      "Balconies and any semi-open area exposed to rain",
      "Shops, workshops, and small offices where budget and durability both matter",
      "Any room at all, honestly — it's the most versatile option on this list",
    ],
    whereUsedHi: [
      "किचन और बाथरूम में — यही एक चीज़ है जो हम बिना झिझक सलाह देते हैं",
      "बालकनी और जहां बारिश आती हो, ऐसी अर्ध-खुली जगहों में",
      "दुकान, वर्कशॉप और छोटे ऑफिस में, जहां बजट और मजबूती दोनों चाहिए",
      "सच कहें तो कहीं भी लगा दें — यह सबसे बहुउपयोगी विकल्प है",
    ],
    whereNotUsed: [
      "Nowhere, structurally — but living rooms that want a complex cove/POP profile suit gypsum better",
      "Rooms where you specifically want a paintable ceiling you'll recolour every few years",
    ],
    whereNotUsedHi: [
      "मजबूती के लिहाज से इसे कहीं भी मना नहीं करेंगे — पर जिस हॉल में Cove/POP जैसा जटिल डिज़ाइन चाहिए, वहां Gypsum ज़्यादा अच्छी रहेगी",
      "अगर आप हर कुछ साल में सीलिंग का रंग बदलना चाहते हों — तो पेंट होने वाली Gypsum Ceiling बेहतर विकल्प रहेगी",
    ],
    benefits: [
      "100% waterproof — safe for bathroom, kitchen, and balcony without any caveats",
      "Termite-proof and insect-resistant by nature of being plastic",
      "Zero maintenance — a damp cloth is the entire care routine",
      "Never needs repainting, and holds its finish for 20+ years",
      "Fastest ceiling to install and the most affordable per sq.ft on our list",
    ],
    benefitsHi: [
      "इस पर पानी का कोई असर नहीं होता — बाथरूम, किचन, बालकनी में बेफिक्र लगा सकते हैं",
      "प्लास्टिक होने की वजह से टर्माइट और कीड़ों का कोई डर नहीं",
      "ज़ीरो मेंटेनेंस — बस गीले कपड़े से पोंछ दें, इतना ही काफी है",
      "कभी रंग-रोगन की ज़रूरत नहीं, 20+ साल तक फिनिश वैसी ही बनी रहती है",
      "सबसे तेज़ लगने वाली और हमारी लिस्ट में सबसे किफायती सीलिंग",
    ],
    limitations: [
      "Simpler design vocabulary — no complex cove or curved profiles like gypsum can do",
      "Cannot be repainted; the colour/texture you choose is what you'll have for its life",
      "A cracked panel needs replacement, not just a patch — though matching panels are easy to source",
      "Slightly less 'premium' visual read in a formal drawing room compared to a finished gypsum ceiling",
    ],
    limitationsHi: [
      "डिज़ाइन के विकल्प Gypsum जितने नहीं — इसमें जटिल Cove या घुमावदार शेप नहीं बन सकते",
      "दोबारा पेंट नहीं हो सकती; जो रंग या टेक्सचर एक बार चुन लिया, वही जीवनभर रहेगा",
      "टूटा हुआ पैनल सिर्फ पैच नहीं होता, बदलना पड़ता है — हालांकि मिलता-जुलता पैनल आसानी से मिल जाता है",
      "फॉर्मल ड्रॉइंग रूम में Gypsum जितना प्रीमियम लुक नहीं दे पाती",
    ],
    materials: [
      { name: "PVC ceiling panels", nameHi: "PVC सीलिंग पैनल", detail: "Tongue-and-groove interlocking panels, available in plain white, wood-grain, marble-print and glossy finishes", detailHi: "आपस में इंटरलॉक होने वाले Panel, सफेद, वुड-ग्रेन, मार्बल-प्रिंट और ग्लॉसी फिनिश में मिलते हैं" },
      { name: "GI/wooden batten frame", nameHi: "GI/लकड़ी की बैटन फ्रेम", detail: "Perimeter and support battens the panels clip or screw onto", detailHi: "पेरीमीटर और सपोर्ट बैटन, जिनमें पैनल क्लिप या स्क्रू हो जाते हैं" },
      { name: "Corner beading & trims", nameHi: "कॉर्नर बीडिंग और ट्रिम्स", detail: "PVC edge profiles that give a clean, finished border where the ceiling meets the wall", detailHi: "PVC एज प्रोफाइल, जो दीवार से मिलने वाले किनारे को साफ-सुथरा फिनिश्ड लुक देते हैं" },
    ],
    installSteps: [
      { title: "Measurement & marking", titleHi: "माप और मार्किंग", desc: "Room dimensions confirmed, drop-height line marked on all four walls.", descHi: "पहले कमरे की नाप कन्फर्म करते हैं, फिर चारों दीवारों पर ड्रॉप-हाइट लाइन मार्क करते हैं।" },
      { title: "Perimeter batten fixing", titleHi: "पेरीमीटर बैटन फिक्सिंग", desc: "A wooden or GI batten is fixed along the wall at the marked line to carry the panel edges.", descHi: "मार्क की गई लाइन पर दीवार में लकड़ी या GI Channel की बैटन लगाते हैं, जो पैनल के किनारों को सहारा देती है।" },
      { title: "Support grid fixing", titleHi: "सपोर्ट ग्रिड फिक्सिंग", desc: "Center support channels are anchored to the slab so panels don't sag over a large span.", descHi: "बड़े स्पैन में पैनल झुके नहीं, इसके लिए सेंटर सपोर्ट चैनल स्लैब में एंकर करते हैं।" },
      { title: "Panel fixing", titleHi: "पैनल फिक्सिंग", desc: "Panels are cut to length and clipped into the grid one by one, tongue-and-groove interlocked.", descHi: "पैनल को नाप के हिसाब से काटकर एक-एक करके ग्रिड में क्लिप करते हैं, टंग-एंड-ग्रूव से आपस में जोड़ते हुए।" },
      { title: "Beading & corner finish", titleHi: "बीडिंग और कॉर्नर फिनिश", desc: "Edge beading is fixed all around so the join with the wall looks clean from any angle.", descHi: "दीवार से जुड़ाव साफ-सुथरा दिखे, इसके लिए चारों तरफ एज बीडिंग लगा देते हैं।" },
      { title: "Light cutouts", titleHi: "लाइट कटआउट", desc: "Openings for downlights or exhaust fans are cut and fittings wired in.", descHi: "डाउनलाइट या एग्जॉस्ट फैन के लिए कटआउट काटकर फिटिंग वायर कर देते हैं।" },
      { title: "Final wipe & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "No paint stage needed — the panels are wiped clean and the ceiling is ready to use immediately.", descHi: "पेंट का कोई स्टेज इसमें नहीं होता — पैनल पोंछते ही सीलिंग तुरंत इस्तेमाल के लिए तैयार हो जाती है।" },
    ],
    realProject: {
      title: "Wood-texture PVC ceiling, Araria kitchen",
      titleHi: "वुड-टेक्सचर PVC सीलिंग, अररिया किचन",
      desc: "A full kitchen-and-adjoining-balcony PVC ceiling finished in a single day, wood-texture panels chosen specifically so it wouldn't look 'plastic' from the dining table.",
      descHi: "यह अररिया की एक किचन और उससे सटी बालकनी का काम है — पूरी PVC Ceiling एक ही दिन में तैयार हो गई। वुड-टेक्सचर वाले Panel खासतौर पर इसलिए चुने गए ताकि डाइनिंग टेबल से देखने पर 'प्लास्टिक जैसा' न लगे।",
      photos: 13,
    },
    faqs: [
      { q: "Is PVC ceiling actually 100% waterproof, or just water-resistant?", qHi: "क्या PVC सीलिंग सच में 100% वॉटरप्रूफ है, या सिर्फ पानी से थोड़ा बचाती है?", a: "It's genuinely 100% waterproof — the panel itself is solid PVC, so there's no absorbent core to soak up moisture the way a gypsum board would. Direct splashing, steam, or humidity doesn't affect the panel material at all.", aHi: "यह सच में 100% वॉटरप्रूफ है — Panel खुद ठोस PVC का बना है, इसमें Gypsum Board जैसा कोई सोखने वाला कोर नहीं जो नमी सोख ले। सीधा पानी लगना, भाप या नमी — इससे मटेरियल पर कोई असर नहीं पड़ता, यह गारंटी से कह सकते हैं।" },
      { q: "Will PVC ceiling look cheap compared to gypsum in my hall?", qHi: "क्या हॉल में PVC सीलिंग जिप्सम के मुकाबले सस्ती दिखेगी?", a: "In a formal hall where you want cove lighting and a fully custom profile, gypsum reads more premium — that's honestly why we still recommend it there. But for kitchens, bathrooms, bedrooms, and most rooms, our better wood/marble-texture PVC panels look genuinely upscale and most customers can't tell the difference from three feet away.", aHi: "जिस हॉल में Cove Light और पूरी तरह कस्टम प्रोफाइल चाहिए, वहां Gypsum ज़्यादा प्रीमियम दिखती है — इसीलिए हम वहां Gypsum ही सुझाते हैं। लेकिन किचन, बाथरूम, बेडरूम और ज़्यादातर कमरों में हमारे अच्छे वुड/मार्बल-टेक्सचर PVC Panel सच में महंगे दिखते हैं — ज़्यादातर ग्राहक तीन फुट की दूरी से फर्क बता ही नहीं पाते।" },
      { q: "Can termites or borewell water seepage damage PVC ceiling?", qHi: "क्या टर्माइट या बोरवेल सीपेज से PVC सीलिंग खराब हो सकती है?", a: "No — termites don't eat plastic, and seepage simply runs off the panel surface rather than being absorbed. The one thing to watch is the wooden batten frame behind the panels if untreated wood is used; we use treated battens or GI channel specifically to rule that out.", aHi: "नहीं — टर्माइट प्लास्टिक नहीं खाते, और सीपेज Panel की सतह से बह जाता है, सोखता नहीं। एक चीज़ ध्यान रखनी है — पीछे की लकड़ी की बैटन अगर अनट्रीटेड हो तो उसमें दिक्कत आ सकती है, इसीलिए हम ट्रीटेड बैटन या GI Channel ही इस्तेमाल करते हैं, ताकि यह समस्या कभी आए ही न।" },
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
    tagline: "The commercial standard for offices, shops, and clinics that need serviceable ceilings",
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए हमारी कमर्शियल स्टैंडर्ड सीलिंग",
    heroImage: "/images/grid.webp",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹55/sq.ft", desc: "Basic mineral-fibre tile on a standard powder-coated T-grid.", descHi: "स्टैंडर्ड पाउडर-कोटेड T-Grid पर बेसिक मिनरल-फाइबर टाइल लगती है।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹56–₹75/sq.ft", desc: "Better mineral-fibre or PVC lay-in tile with some moisture resistance.", descHi: "थोड़ी नमी-रोधी, बेहतर मिनरल-फाइबर या PVC वाली ले-इन टाइल लगाते हैं।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹76–₹115/sq.ft", desc: "Acoustic-rated or edge-lit tiles on a heavier-gauge grid.", descHi: "भारी-गेज ग्रिड पर एकॉस्टिक-रेटेड या एज-लिट टाइल लगाई जाती है।" },
    ],
    sizesThickness: "Tiles are the industry-standard 2×2 ft (600×600mm) lay-in size, 15–19mm thick depending on tier (acoustic tiles run thicker). Grid runners are the standard 24mm-face T-section.",
    sizesThicknessHi: "टाइल आमतौर पर इंडस्ट्री-स्टैंडर्ड 2×2 फुट (600×600mm) ले-इन साइज़ में आती है, मोटाई टियर के हिसाब से 15mm से 19mm तक होती है (एकॉस्टिक टाइल थोड़ी मोटी होती है)। ग्रिड रनर स्टैंडर्ड 24mm-फेस T-सेक्शन के होते हैं।",
    labourCost: "Labour (wall-angle, grid suspension, levelling, tile placement) is included above, typically ₹15–25/sq.ft — the quickest ceiling type to labour-price per sq.ft on a large open floor.",
    labourCostHi: "वॉल-एंगल, ग्रिड सस्पेंशन, लेवलिंग और टाइल प्लेसमेंट की लेबर रेट में शामिल है, आमतौर पर ₹15–25/sq.ft — बड़े खुले फ्लोर पर हमारे सभी कामों में यह सबसे कम लेबर-कॉस्ट वाली सीलिंग है।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "Grid components and tiles are ISI/BIS-compliant branded stock from our regular Purnia-market suppliers — exact make shown and confirmed with you at the site visit before ordering.",
    brandNoteHi: "ग्रिड कंपोनेंट और टाइल हम अपने नियमित पूर्णिया-मार्केट सप्लायर से ही मंगाते हैं, ISI/BIS-अनुरूप ब्रांडेड स्टॉक — ऑर्डर से पहले साइट विज़िट में सही मेक दिखाकर आपसे कन्फर्म कर लेते हैं।",
    availability: "Common in offices and shops across Forbesganj, Araria, and Purnia; also installed in Jogbani, Raniganj, Narpatganj, Supaul, and nearby blocks. Acoustic/edge-lit tiles may need 2–3 days' lead time in outlying areas as they're sourced via Purnia.",
    availabilityHi: "फारबिसगंज, अररिया और पूर्णिया के ऑफिस-दुकानों में हम इसे सबसे ज़्यादा लगाते हैं; जोगबनी, रानीगंज, नरपतगंज, सुपौल और आस-पास के ब्लॉक में भी लगती है। एकॉस्टिक या एज-लिट टाइल दूर के इलाकों में 2–3 दिन ज़्यादा लग सकते हैं, क्योंकि वो पूर्णिया से मंगानी पड़ती है।",
    installTime: "1–2 days for a standard room, 3–4 days for a larger office/shop floor",
    maintenance: "Very low — occasional dusting; a stained tile can be swapped individually",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Grid ceiling (also called T-grid or lay-in ceiling) is a suspended metal grid of main runners and cross-tees, hung from the slab on GI wires, into which lightweight tiles — mineral fibre, PVC, or gypsum — simply drop in from below. Nothing is glued or screwed to the tiles themselves, which is exactly what makes it the standard choice wherever wiring or AC ductwork above the ceiling needs future access.",
    whatItIsHi:
      "देखिए, ग्रिड सीलिंग को लोग T-Grid या ले-इन सीलिंग भी कहते हैं। इसमें मेन रनर और क्रॉस-टी का एक मेटल ग्रिड GI वायर से स्लैब में लटकाया जाता है, और उसमें हल्के टाइल — मिनरल फाइबर, PVC या Gypsum — नीचे से बस रख दिए जाते हैं। टाइल में कुछ भी चिपकाया या स्क्रू नहीं होता, इसका फायदा यह है कि जहां ऊपर वायरिंग या AC डक्ट में भविष्य में एक्सेस चाहिए, वहां यह सबसे स्टैंडर्ड और भरोसेमंद विकल्प है — फारबिसगंज-पूर्णिया के ज़्यादातर ऑफिस और दुकानों में यही लगती है।",
    whereUsed: [
      "Offices, corporate cabins, and coworking spaces",
      "Shops, showrooms, and retail counters",
      "Clinics, diagnostic centres, and small hospitals — mineral fibre tiles are easy to sanitise and replace",
      "Godowns, workshops, and any space with AC ducting or wiring that needs periodic access",
    ],
    whereUsedHi: [
      "ऑफिस, कॉर्पोरेट केबिन और कोवर्किंग स्पेस में",
      "दुकान, शोरूम और रिटेल काउंटर में",
      "क्लिनिक, डायग्नोस्टिक सेंटर और छोटे अस्पताल में — मिनरल फाइबर टाइल साफ करना और बदलना आसान होता है",
      "गोदाम, वर्कशॉप और ऐसी किसी भी जगह में जहां AC डक्टिंग या वायरिंग तक बार-बार पहुंचना पड़े",
    ],
    whereNotUsed: [
      "Formal living rooms or bedrooms where a seamless, premium look matters more than serviceability",
      "Bathrooms or areas with continuous moisture — standard mineral fibre tiles absorb damp and sag",
      "Very low-height rooms — the grid + tile combination needs a few inches more drop than PVC",
    ],
    whereNotUsedHi: [
      "फॉर्मल लिविंग रूम या बेडरूम में नहीं — वहां बिना जोड़ वाला प्रीमियम लुक ज़्यादा मायने रखता है",
      "बाथरूम या लगातार नमी वाली जगह में नहीं — आम मिनरल फाइबर टाइल नमी सोखकर झुक जाती है",
      "बहुत कम ऊंचाई वाले कमरों में भी मुश्किल है — Grid + टाइल के लिए PVC से थोड़ी ज़्यादा ड्रॉप-हाइट चाहिए",
    ],
    benefits: [
      "Any single tile can be lifted out and replaced in minutes — no other ceiling type services this easily",
      "Excellent for spaces with AC ducting, sprinklers, or wiring that needs periodic access above the ceiling",
      "Acoustic-rated tiles are available where echo/noise control matters (open offices, waiting areas)",
      "Fastest ceiling type to install per sq.ft on a large open floor",
      "Most economical option for large commercial areas",
    ],
    benefitsHi: [
      "कोई भी टाइल मिनटों में निकालकर बदल सकते हैं — किसी और सीलिंग में इतनी आसान सर्विसिंग नहीं मिलती",
      "AC डक्टिंग, स्प्रिंकलर या वायरिंग तक बार-बार पहुंचने वाली जगहों के लिए यह सबसे बेहतरीन है",
      "एकॉस्टिक-रेटेड टाइल भी मिलते हैं, जहां शोर या गूंज कम करनी हो (खुले ऑफिस, वेटिंग एरिया)",
      "बड़े खुले फ्लोर पर प्रति वर्ग फुट सबसे तेज़ इंस्टॉलेशन होती है",
      "बड़े कमर्शियल एरिया के लिए हमारा सबसे किफायती विकल्प",
    ],
    limitations: [
      "Visible grid lines — this is a practical, not a decorative ceiling, and it looks it",
      "Standard mineral fibre tiles aren't waterproof and will sag if they get wet",
      "Needs slightly more ceiling drop than PVC, which matters in already-low rooms",
      "Less design flexibility — no cove lighting, no curved profiles",
    ],
    limitationsHi: [
      "ग्रिड की लाइनें साफ दिखती हैं — यह एक व्यावहारिक सीलिंग है, सजावटी नहीं, और वैसी ही दिखती भी है",
      "आम मिनरल फाइबर टाइल पर पानी का असर होता है, गीली होने पर झुक जाती है",
      "PVC से थोड़ी ज़्यादा ड्रॉप-हाइट चाहिए, जो पहले से कम ऊंचाई वाले कमरों में समस्या बन सकती है",
      "डिज़ाइन के विकल्प कम हैं — Cove Light या घुमावदार शेप इसमें संभव नहीं",
    ],
    materials: [
      { name: "GI T-grid runners & cross-tees", nameHi: "GI T-ग्रिड रनर और क्रॉस-टी", detail: "Galvanised steel grid, suspended from the slab on adjustable GI hanger wires", detailHi: "गैल्वनाइज़्ड स्टील ग्रिड, जिसे स्लैब से एडजस्टेबल GI हैंगर वायर पर लटकाया जाता है" },
      { name: "Mineral fibre / PVC / gypsum tiles", nameHi: "मिनरल फाइबर / PVC / जिप्सम टाइल", detail: "Standard 2x2 ft lay-in tiles — mineral fibre for offices/clinics, PVC where some moisture resistance is needed", detailHi: "स्टैंडर्ड 2x2 फुट टाइल — ऑफिस/क्लिनिक के लिए मिनरल फाइबर, थोड़ी नमी वाली जगह के लिए PVC लगाते हैं" },
      { name: "Perimeter wall angle", nameHi: "पेरीमीटर वॉल एंगल", detail: "L-shaped angle fixed along the wall at ceiling height that the grid rests on at the edges", detailHi: "दीवार पर सीलिंग हाइट पर लगा L-आकार का एंगल, जिस पर किनारों से ग्रिड टिकता है" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "Ceiling drop height marked on the walls all around the room or floor.", descHi: "पहले कमरे या फ्लोर के चारों ओर दीवारों पर सीलिंग ड्रॉप-हाइट मार्क करते हैं।" },
      { title: "Wall angle fixing", titleHi: "वॉल एंगल फिक्सिंग", desc: "The perimeter L-angle is screwed to the wall along the marked line.", descHi: "मार्क की गई लाइन पर दीवार में पेरीमीटर L-एंगल स्क्रू कर देते हैं।" },
      { title: "Grid suspension", titleHi: "ग्रिड सस्पेंशन", desc: "Main T-runners are hung from the slab on GI wires at standard spacing, then cross-tees click into place to form the grid squares.", descHi: "मेन T-रनर तय दूरी पर GI वायर से स्लैब में लटकाते हैं, फिर क्रॉस-टी उनमें क्लिक करके ग्रिड के चौकोर खाने बना देते हैं।" },
      { title: "Grid levelling", titleHi: "ग्रिड लेवलिंग", desc: "Every wire is fine-adjusted so the whole grid sits dead level before any tile goes in.", descHi: "टाइल लगाने से पहले हर वायर को फाइन-अड्जस्ट करके पूरे ग्रिड को बिल्कुल लेवल कर देते हैं।" },
      { title: "Tile placement", titleHi: "टाइल प्लेसमेंट", desc: "Tiles are lifted and dropped into each grid square from below.", descHi: "टाइल को नीचे से उठाकर हर ग्रिड खाने में रख देते हैं।" },
      { title: "Fixtures & diffusers", titleHi: "फिक्स्चर और डिफ्यूज़र", desc: "Light fittings, AC diffusers, and sprinkler heads are positioned within grid modules — this is the step grid ceiling makes easiest of all ceiling types.", descHi: "लाइट फिटिंग, AC डिफ्यूज़र और स्प्रिंकलर हेड ग्रिड के खानों में लगा देते हैं — यह काम Grid Ceiling में सबसे आसान होता है।" },
      { title: "Final check & handover", titleHi: "फाइनल जांच और हैंडओवर", desc: "Every tile checked for a snug, level fit before handover.", descHi: "हैंडओवर से पहले हर टाइल को अच्छे से फिट और लेवल चेक कर लेते हैं।" },
    ],
    realProject: {
      title: "Clinic waiting-area ceiling, Araria",
      titleHi: "क्लिनिक वेटिंग-एरिया सीलिंग, अररिया",
      desc: "A 400 sq.ft diagnostic centre floor fitted with acoustic mineral-fibre grid ceiling — tiles were chosen specifically so any future AC or wiring work wouldn't mean breaking open the ceiling.",
      descHi: "यह अररिया के एक 400 वर्ग फुट डायग्नोस्टिक सेंटर का काम है, जहां हमने एकॉस्टिक मिनरल-फाइबर Grid Ceiling लगाई। टाइल खासतौर पर इसलिए चुनी गई ताकि भविष्य में AC या वायरिंग के काम के लिए सीलिंग तोड़नी न पड़े।",
      photos: 7,
    },
    faqs: [
      { q: "Why would I choose grid ceiling over gypsum for my office?", qHi: "ऑफिस के लिए जिप्सम की जगह ग्रिड सीलिंग क्यों चुनें?", a: "If your office has AC ducting, electrical conduits, or plumbing running above the ceiling that might need servicing later, grid ceiling lets an electrician lift one tile and get in without touching the rest of the ceiling. Gypsum looks more premium but means cutting into the board for any future access.", aHi: "अगर आपके ऑफिस में AC डक्टिंग, इलेक्ट्रिकल कंड्यूट या प्लंबिंग सीलिंग के ऊपर से गुज़रती है, जिसे बाद में सर्विस करना पड़ सकता है, तो Grid Ceiling में इलेक्ट्रीशियन सिर्फ एक टाइल उठाकर बाकी सीलिंग को छुए बिना काम कर लेता है। Gypsum ज़्यादा प्रीमियम दिखती है, लेकिन भविष्य में एक्सेस के लिए उसमें बोर्ड काटना पड़ता है।" },
      { q: "Are grid ceiling tiles waterproof?", qHi: "क्या ग्रिड सीलिंग की टाइल वॉटरप्रूफ होती है?", a: "Standard mineral fibre tiles are not — they'll sag if they stay wet. If your space has any moisture exposure, we'll fit PVC lay-in tiles into the same grid instead, which handle damp without a problem.", aHi: "स्टैंडर्ड मिनरल फाइबर टाइल पर पानी का असर होता है — लगातार गीली रहने पर झुक जाती है। अगर आपकी जगह में नमी की संभावना है, तो हम उसी ग्रिड में PVC वाली ले-इन टाइल लगा देते हैं, जो नमी में भी ठीक बनी रहती है।" },
      { q: "Can grid ceiling be used in a home, or is it only for offices?", qHi: "क्या ग्रिड सीलिंग घर में भी लगती है, या सिर्फ ऑफिस के लिए है?", a: "It's mostly chosen for commercial spaces because of the visible grid lines, but a few customers do use it in a home store-room, garage workspace, or a rented shop-cum-home setup where budget and easy future access matter more than a decorative finish.", aHi: "आमतौर पर इसे कमर्शियल जगहों के लिए ही चुना जाता है, क्योंकि ग्रिड की लाइनें दिखती हैं। पर कुछ ग्राहक इसे घर के स्टोर-रूम, गैरेज वर्कस्पेस या किराए की दुकान-सह-घर सेटअप में भी लगाते हैं, जहां बजट और भविष्य में आसान एक्सेस, दिखावटी फिनिश से ज़्यादा ज़रूरी होता है।" },
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
    tagline: "Split one room into two without touching the slab or the floor",
    taglineHi: "बिना स्लैब या फर्श छुए, हम एक कमरे को दो हिस्सों में बांट देते हैं",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹100–₹130/sq.ft", desc: "Single-layer gypsum board partition, single stud row, plain paint finish.", descHi: "सिंगल-लेयर Gypsum Board पार्टीशन लगती है, एक ही स्टड रो में, प्लेन पेंट फिनिश के साथ।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹135–₹200/sq.ft (gypsum) · ₹380–₹450/sq.ft (entry glass)", desc: "Double-layer gypsum with rockwool acoustic infill, or an entry-level plain toughened-glass screen.", descHi: "रॉकवूल एकॉस्टिक इनफिल वाली डबल-लेयर Gypsum, या एंट्री-लेवल प्लेन टफन्ड ग्लास स्क्रीन लगा सकते हैं।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹460–₹750/sq.ft", desc: "Frosted or fluted-film glass partition with aluminium framing and a flush door, or a fully finished acoustic gypsum partition with premium paint.", descHi: "एल्युमिनियम फ्रेमिंग और फ्लश दरवाज़े के साथ फ्रॉस्टेड/फ्लूटेड-फिल्म ग्लास पार्टीशन, या प्रीमियम पेंट वाली पूरी एकॉस्टिक Gypsum पार्टीशन बनवा सकते हैं।" },
    ],
    sizesThickness: "Gypsum partition uses 12.5mm board (single or double layer) on 50mm/75mm metal stud framing. Glass partition uses 8–12mm toughened safety glass in aluminium channel framing.",
    sizesThicknessHi: "Gypsum पार्टीशन में 50mm/75mm मेटल स्टड फ्रेमिंग पर 12.5mm बोर्ड लगता है (सिंगल या डबल लेयर)। ग्लास पार्टीशन में एल्युमिनियम चैनल फ्रेमिंग के अंदर 8mm से 12mm टफन्ड सेफ्टी ग्लास लगता है।",
    labourCost: "Labour (stud framing, board/glass fixing, finishing, door fitting if included) is roughly ₹25–40/sq.ft for gypsum and ₹60–100/sq.ft for glass, already included in the ranges above — glass costs more in labour due to handling and precise channel alignment.",
    labourCostHi: "स्टड फ्रेमिंग, बोर्ड/ग्लास फिक्सिंग, फिनिशिंग और दरवाज़ा फिटिंग (अगर हो) की लेबर Gypsum में करीब ₹25–40/sq.ft और ग्लास में ₹60–100/sq.ft है, ऊपर के रेट में शामिल — ग्लास में हैंडलिंग और सटीक चैनल अलाइनमेंट की वजह से लेबर ज़्यादा लगता है।",
    labourCostShort: "₹25–40/sq.ft (gypsum) · ₹60–100/sq.ft (glass)",
    brandNote: "Metal framing, gypsum board, and toughened glass are sourced from ISI/BIS-compliant authorised dealers in Purnia and Forbesganj — glass is toughened safety glass as standard, never plain annealed sheet.",
    brandNoteHi: "मेटल फ्रेमिंग, Gypsum Board और टफन्ड ग्लास हम पूर्णिया और फारबिसगंज के ISI/BIS-अनुरूप अधिकृत डीलरों से ही लेते हैं — ग्लास हमेशा टफन्ड सेफ्टी ग्लास लगाते हैं, प्लेन एनील्ड शीट कभी नहीं।",
    availability: "Gypsum partitions are installed across our full service area. Glass partitions are most requested in Forbesganj and Araria town offices; for other towns allow 2–4 extra days lead time as glass panels are cut to size and transported from Purnia.",
    availabilityHi: "Gypsum पार्टीशन हम पूरे सर्विस एरिया में लगाते हैं। ग्लास पार्टीशन सबसे ज़्यादा फारबिसगंज और अररिया टाउन के ऑफिस में मांगी जाती है; बाकी शहरों में 2–4 दिन ज़्यादा लग सकते हैं, क्योंकि ग्लास पूर्णिया से काटकर लाई जाती है।",
    installTime: "2–4 days depending on wall length and whether it's gypsum or glass",
    maintenance: "Gypsum side: repaint every 5–7 years. Glass side: wipe with glass cleaner.",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A partition wall creates a new dividing wall inside an existing room without any masonry work on the floor or slab. We build it one of two ways: a gypsum board partition — metal stud framing floor-to-ceiling with gypsum board fixed on both faces, finished like a normal wall — or a glass partition, an aluminium-framed toughened-glass screen that divides space while keeping light and sightlines open.",
    whatItIsHi:
      "देखिए, पार्टीशन वॉल का मतलब है — किसी मौजूदा कमरे के अंदर, बिना फर्श या स्लैब में ईंट-गारे का काम किए, एक नई विभाजक दीवार बना देना। हम इसे दो तरीकों से बनाते हैं: पहला, Gypsum Board पार्टीशन — फर्श से छत तक मेटल स्टड Frame खड़ा करके उसके दोनों तरफ Gypsum Board लगाते हैं, जो एक सामान्य दीवार जैसा ही फिनिश देता है। दूसरा, ग्लास पार्टीशन — एल्युमिनियम Frame में टफन्ड ग्लास की स्क्रीन, जो जगह तो बांटती है पर रोशनी और नज़र को खुला रखती है। फारबिसगंज-अररिया के ऑफिस में हम दोनों तरह के पार्टीशन आमतौर पर लगाते हैं।",
    whereUsed: [
      "Office cabins carved out of one open floor",
      "Reception areas separated from the working floor with glass",
      "A large bedroom split to make a study nook or a walk-in wardrobe (gypsum partition)",
      "Shops that need a stockroom or billing counter separated from the sales floor",
    ],
    whereUsedHi: [
      "खुले ऑफिस फ्लोर से अलग किए गए केबिन में",
      "ग्लास से वर्किंग फ्लोर से अलग किए गए रिसेप्शन एरिया में",
      "बड़े बेडरूम में स्टडी नुक या वॉक-इन वार्डरोब बनाने के लिए (Gypsum पार्टीशन से)",
      "दुकान में सेल्स फ्लोर से अलग स्टॉकरूम या बिलिंग काउंटर बनाने के लिए",
    ],
    whereNotUsed: [
      "Load-bearing situations where the partition is expected to support structural weight — these are non-structural walls only",
      "Full-height glass partitions in a home with small children without safety film — we'll fit safety-laminated glass instead",
      "Wet-area boundaries (bathroom walls) — use a masonry wall or PVC panel system there, not a dry partition",
    ],
    whereNotUsedHi: [
      "जहां पार्टीशन को इमारत का वज़न सहना पड़े, वहां नहीं — यह सिर्फ गैर-स्ट्रक्चरल दीवार है",
      "छोटे बच्चों वाले घर में बिना सेफ्टी फिल्म के फुल-हाइट ग्लास पार्टीशन नहीं — वहां हम सेफ्टी-लैमिनेटेड ग्लास ही लगाते हैं",
      "गीली जगह की बाउंड्री (बाथरूम की दीवार) में नहीं — वहां मेसनरी दीवार या PVC Panel सिस्टम इस्तेमाल करें, ड्राई पार्टीशन नहीं",
    ],
    benefits: [
      "No masonry, no wet work, no long curing time — a room can be split in days, not weeks",
      "Gypsum partitions take paint, wallpaper, or wall-mounted units exactly like a normal wall",
      "Glass partitions keep a room feeling open and let daylight travel between spaces",
      "Both types are removable — easier to reconfigure later than a brick wall if your layout needs change",
      "Acoustic infill (rockwool) can be added inside a gypsum partition for real sound reduction between cabins",
    ],
    benefitsHi: [
      "कोई मेसनरी नहीं, गीला काम नहीं, लंबा इंतज़ार नहीं — कमरा हफ्तों की बजाय दिनों में बंट जाता है",
      "Gypsum पार्टीशन पर पेंट, वॉलपेपर या दीवार पर लगने वाली चीज़ें बिल्कुल सामान्य दीवार जैसी ही लगती हैं",
      "ग्लास पार्टीशन कमरे को खुला रखती है और रोशनी को एक जगह से दूसरी जगह जाने देती है",
      "दोनों तरह के पार्टीशन हटाए जा सकते हैं — भविष्य में लेआउट बदलना हो तो ईंट की दीवार से कहीं आसान",
      "Gypsum पार्टीशन के अंदर रॉकवूल का एकॉस्टिक इनफिल डालकर केबिनों के बीच सच में शोर कम किया जा सकता है",
    ],
    limitations: [
      "Not a structural wall — cannot bear building loads",
      "Gypsum side is not waterproof, same rule as gypsum ceiling — keep it out of wet zones",
      "Glass partitions cost noticeably more than gypsum for the same wall area",
      "Sound isolation on a plain (non-acoustic) gypsum partition is moderate, not soundproof-grade",
    ],
    limitationsHi: [
      "यह स्ट्रक्चरल दीवार नहीं है — इमारत का वज़न इस पर नहीं डाल सकते",
      "Gypsum साइड पर पानी का असर होता है — Gypsum Ceiling जैसा ही नियम, गीली जगह में इसे न लगाएं",
      "समान दीवार क्षेत्र के लिए ग्लास पार्टीशन, Gypsum से काफी महंगा पड़ता है",
      "साधारण (गैर-एकॉस्टिक) Gypsum पार्टीशन में साउंड आइसोलेशन मध्यम रहती है, पूरी तरह साउंडप्रूफ नहीं",
    ],
    materials: [
      { name: "Metal stud framing", nameHi: "मेटल स्टड फ्रेमिंग", detail: "Floor and ceiling track with vertical studs at standard spacing — the skeleton of a gypsum partition", detailHi: "फर्श और छत की ट्रैक के साथ तय दूरी पर वर्टिकल स्टड लगते हैं — यही Gypsum पार्टीशन का ढांचा बनता है" },
      { name: "Gypsum board (both faces)", nameHi: "जिप्सम बोर्ड (दोनों तरफ)", detail: "12.5mm boards fixed on each side of the frame, taped and finished like a wall", detailHi: "Frame के दोनों तरफ 12.5mm बोर्ड लगाकर टेप और फिनिश करते हैं, बिल्कुल सामान्य दीवार की तरह" },
      { name: "Rockwool acoustic infill (optional)", nameHi: "रॉकवूल एकॉस्टिक इनफिल (वैकल्पिक)", detail: "Sound-absorbing insulation packed inside the stud cavity when noise reduction matters", detailHi: "जब शोर कम करना ज़रूरी हो, तो स्टड के बीच खाली जगह में साउंड-सोखने वाला इंसुलेशन भर देते हैं" },
      { name: "Toughened glass + aluminium frame", nameHi: "टफन्ड ग्लास + एल्युमिनियम फ्रेम", detail: "8–12mm toughened glass in an aluminium channel frame, plain, frosted, or with a fluted film finish", detailHi: "एल्युमिनियम चैनल Frame में 8mm से 12mm टफन्ड ग्लास, प्लेन, फ्रॉस्टेड या फ्लूटेड फिल्म फिनिश में लगता है" },
    ],
    installSteps: [
      { title: "Layout marking", titleHi: "लेआउट मार्किंग", desc: "The exact partition line is marked on the floor and ceiling, including any door opening.", descHi: "पहले फर्श और छत पर पार्टीशन की सही लाइन मार्क करते हैं, दरवाज़े की जगह समेत।" },
      { title: "Track & stud fixing (gypsum) / channel fixing (glass)", titleHi: "ट्रैक और स्टड फिक्सिंग (जिप्सम) / चैनल फिक्सिंग (ग्लास)", desc: "For gypsum: floor/ceiling tracks go up first, then vertical studs at set spacing. For glass: aluminium U-channels are fixed floor to ceiling.", descHi: "Gypsum के लिए पहले फर्श और छत की ट्रैक लगाते हैं, फिर तय दूरी पर वर्टिकल स्टड खड़े करते हैं। ग्लास के लिए फर्श से छत तक एल्युमिनियम U-चैनल फिक्स कर देते हैं।" },
      { title: "Acoustic infill (if specified)", titleHi: "एकॉस्टिक इनफिल (अगर तय हो)", desc: "Rockwool is packed into the stud cavity before the second face closes, for real sound reduction between cabins.", descHi: "दूसरा फेस बंद होने से पहले स्टड के बीच रॉकवूल भर देते हैं, ताकि केबिनों के बीच सच में शोर कम हो जाए।" },
      { title: "Board fixing / glass fitting", titleHi: "बोर्ड फिक्सिंग / ग्लास फिटिंग", desc: "Gypsum boards are screwed onto both faces of the frame, or glass panels are lowered into the aluminium channel.", descHi: "Frame के दोनों तरफ Gypsum Board स्क्रू करते हैं, या ग्लास Panel को एल्युमिनियम चैनल में नीचे उतार देते हैं।" },
      { title: "Door frame fitting (if included)", titleHi: "दरवाज़े का फ्रेम फिटिंग (अगर शामिल हो)", desc: "A door frame and hardware are fitted into the marked opening.", descHi: "मार्क की गई जगह पर दरवाज़े का Frame और हार्डवेयर फिट कर देते हैं।" },
      { title: "Jointing/sealing & finishing", titleHi: "जॉइंटिंग/सीलिंग और फिनिशिंग", desc: "Gypsum: joints taped and puttied, then painted. Glass: joints silicone-sealed for a clean edge.", descHi: "Gypsum में जोड़ों पर टेप-Putty लगाकर पेंट करते हैं। ग्लास में साफ किनारे के लिए जोड़ों पर सिलिकॉन सील लगाते हैं।" },
      { title: "Final clean & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "Surface cleaned, door checked for smooth operation, warranty document handed over.", descHi: "सतह साफ करते हैं, दरवाज़ा ठीक से खुल-बंद हो रहा है यह जांचते हैं, और आपको Warranty दे देते हैं।" },
    ],
    realProject: {
      title: "Two-cabin office split, Forbesganj",
      titleHi: "दो-केबिन ऑफिस विभाजन, फारबिसगंज",
      desc: "A single 300 sq.ft rented office floor split into two private cabins and a shared reception using a rockwool-filled gypsum partition for the cabins and a frosted-film glass screen for the reception, keeping the front area feeling open.",
      descHi: "यह फारबिसगंज के एक 300 वर्ग फुट किराए के ऑफिस फ्लोर का काम है — रॉकवूल भरी Gypsum पार्टीशन से हमने दो प्राइवेट केबिन बनाए, और फ्रॉस्टेड-फिल्म ग्लास स्क्रीन से एक साझा रिसेप्शन अलग किया, ताकि सामने का हिस्सा खुला-खुला महसूस हो।",
      photos: 20,
    },
    faqs: [
      { q: "Can a partition wall support a wall-mounted TV or shelves?", qHi: "क्या पार्टीशन वॉल पर TV या शेल्फ लगाई जा सकती है?", a: "Yes, if we know in advance — we add extra wooden/metal backing blocking inside the frame at the exact height you'll mount things, so the screws bite into solid backing rather than just the board. Tell us this at the site-visit stage.", aHi: "हां, बशर्ते पहले से बता दें — हम Frame के अंदर उसी ऊंचाई पर लकड़ी या मेटल की अतिरिक्त बैकिंग लगा देते हैं जहां आप TV या शेल्फ लगाना चाहते हों, ताकि स्क्रू सिर्फ बोर्ड में नहीं, ठोस बैकिंग में जाकर बैठे। यह बात Site Visit के समय ही बता दें, भाई।" },
      { q: "How much sound does a gypsum partition actually block?", qHi: "जिप्सम पार्टीशन असल में कितना शोर रोकती है?", a: "A plain double-layer gypsum partition cuts down normal conversation noise noticeably but isn't soundproof. Adding rockwool infill inside the cavity improves it meaningfully — enough for adjacent office cabins, not enough for a recording studio.", aHi: "साधारण डबल-लेयर Gypsum पार्टीशन सामान्य बातचीत का शोर काफी हद तक कम कर देती है, पर पूरी तरह साउंडप्रूफ नहीं होती। खाली जगह में रॉकवूल डाल दें तो यह काफी बेहतर हो जाता है — बगल के ऑफिस केबिन के लिए काफी है, पर रिकॉर्डिंग स्टूडियो के लिए काफी नहीं।" },
      { q: "Is glass partition safe with kids around?", qHi: "क्या घर में बच्चे हों तो ग्लास पार्टीशन सुरक्षित है?", a: "We use toughened glass as standard, which breaks into small blunt pieces rather than sharp shards if it ever cracks. For homes with young children we additionally recommend a safety-laminated film on the glass — ask for it specifically when we quote.", aHi: "हम स्टैंडर्ड में टफन्ड ग्लास ही लगाते हैं, जो टूटने पर तेज़ धार वाले टुकड़ों की जगह छोटे-कुंद टुकड़ों में टूटता है। छोटे बच्चों वाले घरों के लिए हम अतिरिक्त सेफ्टी-लैमिनेटेड फिल्म की भी सलाह देते हैं — Quotation लेते वक़्त इसके लिए खासतौर पर पूछ लें।" },
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
    tagline: "Real-wood look for a TV wall at roughly 60% of what timber panelling costs",
    taglineHi: "असली लकड़ी जैसा लुक, पर टिम्बर पैनलिंग से करीब 60% कम कीमत में",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹650/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹180–₹250/sq.ft", desc: "Plain/solid-colour WPC panel, basic clip system, 8mm profile.", descHi: "प्लेन या सॉलिड-कलर WPC Panel लगता है, बेसिक क्लिप सिस्टम के साथ, 8mm प्रोफाइल में।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹260–₹380/sq.ft", desc: "Wood-grain or grooved texture, 12–15mm profile.", descHi: "वुड-ग्रेन या ग्रूव्ड टेक्सचर वाला पैनल, 12mm से 15mm प्रोफाइल में मिलता है।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹390–₹650/sq.ft", desc: "Fluted/louvre premium textures with an LED backlight channel, 18–25mm profile depth.", descHi: "LED बैकलाइट चैनल के साथ Fluted/Louver वाला प्रीमियम टेक्सचर, 18mm से 25mm प्रोफाइल डेप्थ में।" },
    ],
    sizesThickness: "Panels come in standard widths of 250mm–600mm and lengths of 8ft/10ft, cut to your wall size on-site. Panel thickness/profile depth runs 8mm (plain) up to 18–25mm for fluted/louvre designs.",
    sizesThicknessHi: "पैनल आमतौर पर 250mm से 600mm चौड़ाई और 8ft/10ft लंबाई में आते हैं, आपकी दीवार के साइज़ पर साइट पर ही काटे जाते हैं। मोटाई या प्रोफाइल डेप्थ प्लेन में 8mm से लेकर Fluted/Louver डिज़ाइन में 18mm–25mm तक जाती है।",
    labourCost: "Labour (batten fixing, panel clipping, trims, LED wiring if included) is roughly ₹25–45/sq.ft, included in the rates above — fluted/louvre designs take longer per sq.ft than a plain panel.",
    labourCostHi: "बैटन फिक्सिंग, पैनल क्लिपिंग, ट्रिम्स और LED वायरिंग (अगर हो) की लेबर करीब ₹25–45/sq.ft है, रेट में शामिल — Fluted/Louver डिज़ाइन में प्लेन पैनल से ज़्यादा समय लगता है।",
    labourCostShort: "₹25–45/sq.ft",
    brandNote: "WPC boards are ISI-compliant branded composite stock from authorised dealers — not the thinner unbranded WPC sold loose in some local markets, which warps faster. Exact brand and texture sample shown at the site visit.",
    brandNoteHi: "हमारा WPC बोर्ड अधिकृत डीलरों से ISI-अनुरूप ब्रांडेड कम्पोजिट स्टॉक होता है — लोकल मार्केट में खुले बिकने वाला पतला अनब्रांडेड WPC हम नहीं लगाते, वो जल्दी मुड़ जाता है। Site Visit में हम सही ब्रांड और टेक्सचर का सैंपल दिखाकर ही तय करते हैं।",
    availability: "Available across Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia, Supaul, Tribeniganj, Kursakanta, and Chhatapur. TV-wall panelling is our most-requested WPC job in Forbesganj and Araria.",
    availabilityHi: "यह हम फारबिसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, पूर्णिया, सुपौल, त्रिवेणीगंज, कुर्साकांटा और छातापुर — सब जगह लगाते हैं। TV Unit की दीवार पर पैनलिंग फारबिसगंज और अररिया में हमारा सबसे ज़्यादा मांगा जाने वाला WPC काम है।",
    installTime: "1 day for a TV wall accent, 2–3 days for a full room",
    maintenance: "Wipe with a dry cloth — no polish or varnish, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "WPC (Wood Plastic Composite) wall panels are made from recycled wood fibre bonded with polymer resin, then finished with a wood-grain, fluted, or grooved surface. They clip onto vertical battens fixed to the wall — no nails visible on the face — and because the core is part-plastic, they don't warp, swell, or attract termites the way solid wood does in a humid Bihar climate.",
    whatItIsHi:
      "देखिए, WPC यानी वुड प्लास्टिक कम्पोजिट वॉल पैनल रीसाइकल्ड लकड़ी के रेशों को पॉलिमर रेज़िन से जोड़कर बनाए जाते हैं, फिर वुड-ग्रेन, Fluted या ग्रूव्ड सतह में फिनिश किए जाते हैं। ये दीवार पर लगी वर्टिकल बैटन में क्लिप हो जाते हैं — सामने कोई कील नहीं दिखती। कोर आधा-प्लास्टिक होने की वजह से, बिहार की नमी वाली जलवायु में ये असली लकड़ी की तरह न मुड़ते हैं, न फूलते हैं, न इनमें दीमक लगती है — इसीलिए फारबिसगंज-अररिया में TV Wall के लिए यही हमारी पहली सलाह होती है।",
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
      "Ceilings — WPC is a wall product; use PVC or gypsum overhead instead",
      "Fully submerged or constantly-wet surfaces — it's moisture-resistant, not built for standing water",
      "Load-bearing or structural applications — it's a cladding finish, not a wall itself",
    ],
    whereNotUsedHi: [
      "सीलिंग में नहीं — WPC दीवार का प्रोडक्ट है, ऊपर के लिए PVC या Gypsum इस्तेमाल करें",
      "पूरी तरह डूबी रहने वाली या लगातार गीली सतह पर नहीं — यह नमी-रोधी है, खड़े पानी के लिए नहीं बना",
      "लोड-बेयरिंग या स्ट्रक्चरल इस्तेमाल में नहीं — यह क्लैडिंग फिनिश है, खुद दीवार नहीं",
    ],
    benefits: [
      "Premium wood look at roughly 60% of the cost of real timber panelling",
      "Moisture and termite resistant — genuinely outlasts real wood in a monsoon climate",
      "Zero maintenance — no polish, no varnish, ever needed",
      "Clip-fix installation with no visible nails or screws on the face",
      "Available in 50+ colours and textures, including trending fluted/louvre profiles",
    ],
    benefitsHi: [
      "असली टिम्बर पैनलिंग से करीब 60% कम कीमत में प्रीमियम लकड़ी जैसा लुक मिल जाता है",
      "नमी और दीमक से सुरक्षित — मानसून वाली जलवायु में असली लकड़ी से ज़्यादा टिकाऊ",
      "ज़ीरो मेंटेनेंस — कभी पॉलिश या वार्निश की ज़रूरत नहीं पड़ती",
      "क्लिप-फिक्स इंस्टॉलेशन, सामने कोई कील या स्क्रू नहीं दिखता",
      "50+ रंग और टेक्सचर में मिलता है, ट्रेंडिंग Fluted/Louver प्रोफाइल समेत",
    ],
    limitations: [
      "Costs more per sq.ft than UV marble sheet for a comparable wall area",
      "Limited custom shaping compared to gypsum — it's a flat/fluted panel system, not a mouldable surface",
      "A deeply gouged panel needs replacement of that section, not a touch-up repair",
    ],
    limitationsHi: [
      "समान दीवार क्षेत्र के लिए UV Marble Sheet से प्रति वर्ग फुट ज़्यादा महंगा पड़ता है",
      "Gypsum के मुकाबले कस्टम शेपिंग सीमित है — यह फ्लैट/Fluted पैनल सिस्टम है, ढलने वाली सतह नहीं",
      "गहरा खरोंच या चोट लगे पैनल को टच-अप से ठीक नहीं किया जा सकता, उस हिस्से को बदलना ही पड़ता है",
    ],
    materials: [
      { name: "WPC panel board", nameHi: "WPC पैनल बोर्ड", detail: "Wood-fibre + polymer composite core, in plain, wood-grain, fluted, or 3D-textured surface finishes", detailHi: "वुड-फाइबर और पॉलिमर कम्पोजिट कोर, प्लेन, वुड-ग्रेन, Fluted या 3D टेक्सचर सतह फिनिश में मिलता है" },
      { name: "Vertical batten/clip system", nameHi: "वर्टिकल बैटन/क्लिप सिस्टम", detail: "Battens fixed to the wall at set spacing; panels clip in without face-fixing", detailHi: "दीवार पर तय दूरी पर लगी बैटन; पैनल बिना सामने से फिक्स किए सीधे क्लिप हो जाते हैं" },
      { name: "Edge/corner trims", nameHi: "एज/कॉर्नर ट्रिम्स", detail: "Matching-finish trims that close off panel edges and internal/external corners cleanly", detailHi: "मैचिंग फिनिश वाले ट्रिम्स, जो पैनल के किनारों और कोनों को साफ-सुथरा बंद कर देते हैं" },
    ],
    installSteps: [
      { title: "Wall check", titleHi: "दीवार की जांच", desc: "The wall is checked for dryness and any plaster cracks are filled before framing starts.", descHi: "फ्रेमिंग शुरू करने से पहले हम देखते हैं कि दीवार सूखी है या नहीं, और प्लास्टर की दरारें भर देते हैं।" },
      { title: "Batten fixing", titleHi: "बैटन फिक्सिंग", desc: "Vertical (or horizontal, per design) battens are fixed to the wall at standard spacing.", descHi: "डिज़ाइन के अनुसार वर्टिकल या हॉरिज़ॉन्टल बैटन तय दूरी पर दीवार में फिक्स करते हैं।" },
      { title: "Panel cutting & clipping", titleHi: "पैनल कटिंग और क्लिपिंग", desc: "Panels are cut to size and clip-fixed onto the battens one after another, tongue-and-groove aligned.", descHi: "पैनल को नाप के हिसाब से काटकर बैटन में एक-एक करके क्लिप करते हैं, टंग-एंड-ग्रूव से मिलाते हुए।" },
      { title: "LED backlight wiring (if in design)", titleHi: "LED बैकलाइट वायरिंग (अगर डिज़ाइन में हो)", desc: "Wiring for backlit panels is routed behind the panel before the last section closes.", descHi: "बैकलिट पैनल की वायरिंग आखिरी हिस्सा बंद होने से पहले पैनल के पीछे से निकाल देते हैं।" },
      { title: "Corner & edge trims", titleHi: "कॉर्नर और एज ट्रिम्स", desc: "Matching trims close off every exposed edge for a factory-finished look.", descHi: "हर खुले किनारे पर मैचिंग ट्रिम लगाकर फैक्ट्री-फिनिश जैसा लुक दे देते हैं।" },
      { title: "Final wipe & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "Panels wiped clean; no drying or curing time needed before the wall is ready to use.", descHi: "पैनल पोंछकर साफ कर देते हैं; इस्तेमाल से पहले सूखने या क्योरिंग का कोई इंतज़ार नहीं करना पड़ता।" },
    ],
    realProject: {
      title: "Fluted TV wall with LED backlight, Jogbani",
      titleHi: "LED बैकलाइट के साथ फ्लूटेड TV वॉल, जोगबनी",
      desc: "A 12 ft living-room TV wall in walnut-tone fluted WPC panelling with a hidden LED strip along the top edge — finished and ready to mount the TV the same day.",
      descHi: "यह जोगबनी की एक लिविंग रूम का काम है — 12 फुट की TV Wall वॉलनट-टोन Fluted WPC पैनलिंग में तैयार की, ऊपरी किनारे पर छुपी LED Strip के साथ। उसी दिन तैयार हो गई, TV लगाने के लिए रेडी।",
      photos: 20,
    },
    faqs: [
      { q: "Does WPC panelling really look like real wood, or is it obviously plastic?", qHi: "क्या WPC पैनलिंग सच में असली लकड़ी जैसी दिखती है, या साफ प्लास्टिक जैसी लगती है?", a: "The better wood-grain and fluted textures we install genuinely read as real wood from normal viewing distance — most customers who touch it before buying are surprised it isn't timber. We always show a physical sample at the site visit so you can judge it yourself, not just from a photo.", aHi: "हम जो बेहतर वुड-ग्रेन और Fluted टेक्सचर लगाते हैं, वो सामान्य दूरी से देखने पर सच में असली लकड़ी जैसे ही लगते हैं — खरीदने से पहले छूकर देखने वाले ज़्यादातर ग्राहक हैरान हो जाते हैं कि यह टिम्बर नहीं है। हम Site Visit पर हमेशा असली सैंपल दिखाते हैं, ताकि आप सिर्फ फोटो से नहीं, खुद हाथ से छूकर तय कर सकें।" },
      { q: "How much would a standard TV wall cost?", qHi: "एक सामान्य TV वॉल में कितना खर्च आएगा?", a: "A typical 10x10 ft TV wall (100 sq.ft) in mid-range fluted WPC panelling works out to roughly ₹18,000–₹30,000 including battens, trims, and basic LED backlight wiring — the exact figure depends on the texture you pick.", aHi: "एक सामान्य 10x10 फुट (100 वर्ग फुट) की TV Wall, मिड-रेंज Fluted WPC पैनलिंग में लगभग ₹18,000–₹30,000 में बन जाती है — इसमें बैटन, ट्रिम्स और बेसिक LED बैकलाइट वायरिंग शामिल है। सटीक आंकड़ा आपके चुने गए टेक्सचर पर निर्भर करता है।" },
      { q: "Can WPC panels be installed over an existing tiled or painted wall?", qHi: "क्या पहले से लगी टाइल या पेंट वाली दीवार पर भी WPC पैनल लग सकते हैं?", a: "Yes — since the panels clip onto battens rather than bonding directly to the wall surface, we can fix battens straight over sound tile or paint. We only need the underlying wall to be structurally solid, not perfectly smooth.", aHi: "हां — क्योंकि पैनल दीवार की सतह से सीधे चिपकने की बजाय बैटन में क्लिप होते हैं, हम मज़बूत टाइल या पेंट के ऊपर सीधे बैटन लगा सकते हैं। हमें बस अंदर की दीवार मज़बूत होनी चाहिए, बिल्कुल स्मूथ होना ज़रूरी नहीं।" },
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
    tagline: "The marble look for pooja rooms and bathroom walls, at a fraction of stone pricing",
    taglineHi: "पूजा घर और बाथरूम की दीवार के लिए मार्बल जैसा लुक, असली पत्थर से बहुत कम कीमत में मिल जाता है",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹45–₹120/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹45–₹60/sq.ft", desc: "Basic marble-print sheet, standard gloss, 3mm thickness.", descHi: "बेसिक मार्बल-प्रिंट शीट लगती है, स्टैंडर्ड ग्लॉस में, 3mm मोटाई।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹65–₹85/sq.ft", desc: "Better veining pattern, higher-gloss finish, 4mm thickness.", descHi: "बेहतर वेनिंग पैटर्न और ज़्यादा ग्लॉस फिनिश, 4mm मोटाई में मिलती है।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹120/sq.ft", desc: "Premium granite/exotic marble print, 5–6mm thickness, anti-fingerprint coating.", descHi: "प्रीमियम ग्रेनाइट या विदेशी मार्बल प्रिंट, 5mm–6mm मोटाई, एंटी-फिंगरप्रिंट कोटिंग के साथ।" },
    ],
    sizesThickness: "Sheets come in the standard 8×4 ft (2440×1220mm) size, thickness 3mm to 6mm depending on tier — thicker sheets resist scratching better and are worth the upgrade in a busy kitchen.",
    sizesThicknessHi: "शीट आमतौर पर 8×4 फुट (2440×1220mm) साइज़ में आती है, मोटाई टियर के हिसाब से 3mm से 6mm तक होती है — मोटी शीट खरोंच से ज़्यादा बचाती है, व्यस्त किचन में यह अपग्रेड लेने लायक है।",
    labourCost: "Labour (surface prep, adhesive/clip fixing, edge beading) is roughly ₹15–25/sq.ft, included above.",
    labourCostHi: "सतह तैयार करना, एडहेसिव/क्लिप फिक्सिंग और एज बीडिंग की लेबर करीब ₹15–25/sq.ft है, ऊपर के रेट में शामिल है।",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "UV marble sheets are ISI-compliant branded PVC-based stock sourced from authorised Purnia/Forbesganj dealers — sample book shown on-site so you see the actual sheen and veining before ordering.",
    brandNoteHi: "हमारी UV Marble Sheet पूर्णिया/फारबिसगंज के अधिकृत डीलरों से ISI-अनुरूप ब्रांडेड PVC-आधारित स्टॉक होती है — ऑर्डर से पहले हम साइट पर सैंपल बुक दिखाते हैं, ताकि आप असली शाइन और वेनिंग खुद देख सकें।",
    availability: "Available across our full service area. Bathroom and pooja-room UV marble is the most common request in Forbesganj, Araria, and Jogbani.",
    availabilityHi: "यह हम पूरे सर्विस एरिया में लगाते हैं। बाथरूम और पूजा-घर की UV Marble फारबिसगंज, अररिया और जोगबनी में हमारी सबसे ज़्यादा मांगी जाने वाली चीज़ है।",
    installTime: "1–2 days per room",
    maintenance: "Zero — wipe with a damp cloth, no polishing ever needed",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "UV marble sheet is a high-gloss PVC-based panel with a marble or granite pattern printed and UV-cured onto the surface, then sealed under a scratch-resistant coating. It's bonded or clip-fixed directly onto a prepared wall, giving a seamless stone-like surface with no grout lines to blacken over time — at a fraction of what actual marble slab and installation would cost.",
    whatItIsHi:
      "देखिए, UV Marble Sheet एक हाई-ग्लॉस PVC-आधारित पैनल है, जिसकी सतह पर मार्बल या ग्रेनाइट का पैटर्न प्रिंट करके UV-क्योर किया जाता है, फिर स्क्रैच-रेजिस्टेंट कोटिंग से सील कर दिया जाता है। इसे तैयार दीवार पर सीधे बॉन्ड या क्लिप-फिक्स करते हैं, जिससे एक बिना जोड़ वाली पत्थर जैसी सतह मिलती है — समय के साथ काली पड़ने वाली कोई ग्राउट लाइन इसमें नहीं होती, और यह असली मार्बल स्लैब व इंस्टॉलेशन से बहुत कम कीमत में आ जाती है। पूजा घर और बाथरूम के लिए फारबिसगंज-अररिया में सबसे ज़्यादा यही मांगी जाती है।",
    whereUsed: [
      "Bathroom walls — no grout lines to blacken with mould, unlike tiles",
      "Kitchen walls away from direct flame (backsplash, side walls)",
      "Pooja room walls — the marble-print finish suits the traditional look most families want here",
      "Living room feature walls where a stone look is wanted without stone's weight or cost",
    ],
    whereUsedHi: [
      "बाथरूम की दीवार पर — टाइल की तरह काली पड़ने वाली ग्राउट लाइन इसमें नहीं होती",
      "सीधी आंच से दूर किचन की दीवार पर (बैकस्प्लैश, साइड वॉल)",
      "पूजा घर की दीवार पर — मार्बल-प्रिंट फिनिश ज़्यादातर परिवारों की पसंद वाले पारंपरिक लुक से मेल खाती है",
      "लिविंग रूम की फीचर वॉल पर, जहां पत्थर के वज़न या कीमत के बिना पत्थर जैसा लुक चाहिए",
    ],
    whereNotUsed: [
      "Directly behind a gas stove or any high-heat surface — the PVC base isn't heat-rated",
      "Outdoor walls exposed to direct, harsh sunlight for years — UV print can fade faster than genuine stone outdoors",
      "Floors — this is a wall-cladding product, not a flooring material",
    ],
    whereNotUsedHi: [
      "सीधे गैस चूल्हे के पीछे या किसी भी तेज़ गर्मी वाली सतह पर नहीं — PVC बेस गर्मी सहने के लिए नहीं बना",
      "सालों तक सीधी तेज़ धूप वाली बाहरी दीवार पर नहीं — वहां UV प्रिंट असली पत्थर से जल्दी फीका पड़ सकता है",
      "फर्श पर नहीं — यह दीवार पर लगाने का प्रोडक्ट है, फ्लोरिंग मटेरियल नहीं",
    ],
    benefits: [
      "Real marble/granite look at roughly 70–80% less cost than actual stone",
      "100% waterproof and moisture resistant — ideal for bathroom and kitchen walls",
      "No grout lines — a seamless look that stays clean far longer than tile",
      "Lightweight — no structural load added to the wall, unlike stone slab",
      "Scratch-resistant, hygienic, easy-clean surface",
    ],
    benefitsHi: [
      "असली मार्बल/ग्रेनाइट से करीब 70–80% कम कीमत में वही लुक मिल जाता है",
      "इस पर पानी का कोई असर नहीं होता, नमी में भी सुरक्षित रहती है — बाथरूम और किचन की दीवार के लिए आदर्श",
      "कोई ग्राउट लाइन नहीं — टाइल से कहीं ज़्यादा देर तक साफ-सुथरा दिखने वाला बिना जोड़ वाला लुक",
      "हल्का वज़न — पत्थर की स्लैब के उलट, दीवार पर कोई स्ट्रक्चरल भार नहीं पड़ता",
      "स्क्रैच-रेजिस्टेंट, स्वच्छ और आसानी से साफ होने वाली सतह",
    ],
    limitations: [
      "Not heat-resistant — keep it away from direct stove flame or very hot surfaces",
      "A deep scratch from a sharp object will show, unlike polished stone which can be re-ground",
      "Less premium resale perception than genuine natural stone, if that specifically matters to you",
    ],
    limitationsHi: [
      "गर्मी सहने वाला नहीं है — इसे सीधे चूल्हे की आंच या बहुत गर्म सतह से दूर रखें",
      "किसी नुकीली चीज़ से गहरी खरोंच लग जाए तो दिखती है, जबकि पॉलिश्ड पत्थर को दोबारा घिसकर ठीक किया जा सकता है",
      "अगर रीसेल में असली पत्थर वाला प्रीमियम टैग खास मायने रखता हो, तो यह उतना प्रीमियम महसूस नहीं देता",
    ],
    materials: [
      { name: "UV-printed PVC marble sheet", nameHi: "UV-प्रिंटेड PVC मार्बल शीट", detail: "High-gloss sheet with marble/granite pattern UV-cured onto the surface and sealed", detailHi: "हाई-ग्लॉस शीट, जिसकी सतह पर मार्बल या ग्रेनाइट का पैटर्न UV-क्योर करके सील किया गया होता है" },
      { name: "Marine-grade adhesive / clip channel", nameHi: "मरीन-ग्रेड चिपकाने वाला / क्लिप चैनल", detail: "Bonds or clip-fixes the sheet to a prepared wall depending on the surface", detailHi: "सतह के हिसाब से शीट को तैयार दीवार पर चिपका देते हैं, या क्लिप-फिक्स कर देते हैं" },
      { name: "Edge/corner beading", nameHi: "एज/कॉर्नर बीडिंग", detail: "Matching trims finish exposed edges and internal corners for a seamless read", detailHi: "मैचिंग ट्रिम, जो खुले किनारों और अंदरूनी कोनों को बिना जोड़ वाला लुक दे देते हैं" },
    ],
    installSteps: [
      { title: "Wall preparation", titleHi: "दीवार की तैयारी", desc: "The wall is cleaned, cracks filled, and levelled so the sheet bonds flat with no bubbling.", descHi: "पहले दीवार साफ करते हैं, दरारें भरते हैं और लेवल करते हैं, ताकि शीट बिना उभार के फ्लैट चिपके।" },
      { title: "Layout & cutting", titleHi: "लेआउट और कटिंग", desc: "Sheets are measured against the wall and cut so the pattern lines up cleanly at joints.", descHi: "दीवार के हिसाब से शीट नापकर काटते हैं, ताकि जोड़ों पर पैटर्न साफ-साफ मिल जाए।" },
      { title: "Bonding / clip-fixing", titleHi: "बॉन्डिंग / क्लिप-फिक्सिंग", desc: "Sheets are adhered with marine-grade adhesive or clipped onto a channel system, per the wall type.", descHi: "दीवार के प्रकार के अनुसार शीट को मरीन-ग्रेड चिपकाने वाले से चिपकाते हैं, या चैनल सिस्टम में क्लिप कर देते हैं।" },
      { title: "Joint alignment", titleHi: "जोड़ मिलान", desc: "Adjacent sheets are pressed and aligned so the marble veining reads as continuous, not obviously tiled.", descHi: "पास-पास की शीट को दबाकर इस तरह मिलाते हैं कि मार्बल की नसें लगातार दिखें, टाइल जैसी अलग-अलग नहीं।" },
      { title: "Edge beading", titleHi: "एज बीडिंग", desc: "Corners and exposed edges get a finishing bead so nothing looks unfinished.", descHi: "कोनों और खुले किनारों पर फिनिशिंग बीड लगा देते हैं, ताकि कहीं अधूरा न लगे।" },
      { title: "Final polish & handover", titleHi: "फाइनल पॉलिश और हैंडओवर", desc: "A final wipe-down brings up the gloss; the wall is ready to use immediately, no curing wait.", descHi: "आखिरी बार पोंछते हैं तो ग्लॉस और निखर आता है; दीवार तुरंत इस्तेमाल के लिए तैयार हो जाती है, क्योरिंग का इंतज़ार नहीं करना पड़ता।" },
    ],
    realProject: {
      title: "Pooja room marble-finish wall, Purnia",
      titleHi: "पूजा घर मार्बल-फिनिश दीवार, पूर्णिया",
      desc: "A small pooja room finished floor-to-ceiling in white-and-gold veined UV marble sheet with a recessed LED niche for the idol — completed in a single day with zero dust from cutting stone on-site.",
      descHi: "यह पूर्णिया के एक छोटे पूजा घर का काम है — फर्श से छत तक सफेद-सुनहरी नसों वाली UV Marble Sheet में फिनिश किया, मूर्ति के लिए एक रिसेस्ड LED आला भी बनाया। एक ही दिन में पूरा काम हुआ, साइट पर पत्थर काटने की कोई धूल भी नहीं।",
      photos: 20,
    },
    faqs: [
      { q: "Can UV marble sheet be used on the wall right behind the kitchen stove?", qHi: "क्या रसोई के चूल्हे के ठीक पीछे UV मार्बल शीट लगाई जा सकती है?", a: "We avoid the wall immediately behind the flame — direct heat over time can affect the PVC base. For that specific strip we recommend ceramic tile or a metal splashback, and UV marble on the rest of the kitchen walls.", aHi: "भाई, हम आंच के ठीक पीछे की दीवार पर इसे नहीं लगाते — लगातार सीधी गर्मी से PVC बेस पर असर पड़ सकता है। उस खास हिस्से के लिए हम सेरेमिक टाइल या मेटल स्प्लैशबैक सुझाते हैं, और रसोई की बाकी दीवारों पर UV Marble Sheet लगा देते हैं।" },
      { q: "Does UV marble sheet need grout like tiles do?", qHi: "क्या टाइल की तरह UV मार्बल शीट में भी ग्राउट लगती है?", a: "No — sheets are fitted edge-to-edge with the pattern aligned, so there's no grout line at all. That's actually one of its biggest advantages over tile: no grout means no line that turns black with mould over the years.", aHi: "नहीं — शीट को किनारे से किनारे तक पैटर्न मिलाकर लगाते हैं, इसमें कोई ग्राउट लाइन ही नहीं होती। यही इसका टाइल पर सबसे बड़ा फायदा है: कोई ग्राउट नहीं तो सालों में काली पड़ने वाली कोई लाइन भी नहीं आती।" },
      { q: "How does UV marble sheet compare to WPC panels for a wall?", qHi: "दीवार के लिए UV मार्बल शीट, WPC पैनल से कैसे अलग है?", a: "UV marble gives a stone/marble look and is fully waterproof at a lower price; WPC gives a wood look and is moisture-resistant (not fully submersible) at a higher price. For a bathroom or pooja wall we lean UV marble; for a TV wall or bedroom accent, WPC.", aHi: "UV Marble पत्थर जैसा लुक देती है और कम कीमत में पूरी तरह वॉटरप्रूफ है; WPC लकड़ी जैसा लुक देती है और थोड़ी ज़्यादा कीमत में नमी-रोधी होती है (पूरी तरह डूबने लायक नहीं)। बाथरूम या पूजा दीवार के लिए हम UV Marble सुझाते हैं; TV Wall या बेडरूम एक्सेंट के लिए WPC बेहतर रहेगा।" },
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
    tagline: "Built to your wall's exact width — not cut down from a catalogue template",
    taglineHi: "हम इसे आपकी दीवार की सही नाप पर बनाते हैं — कैटलॉग टेम्पलेट से काटकर नहीं",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    galleryCategory: "TV Unit Design",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹15,000–₹25,000", desc: "6–8 ft unit, laminate finish, basic hinges, no LED.", descHi: "6–8 फुट की यूनिट, लैमिनेट फिनिश में, बेसिक हिंज के साथ — इसमें LED नहीं होती।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹26,000–₹45,000", desc: "8–10 ft unit, better laminate/veneer finish, soft-close hardware, optional LED strip.", descHi: "8–10 फुट की यूनिट, बेहतर लैमिनेट/वीनियर फिनिश, सॉफ्ट-क्लोज़ हार्डवेयर के साथ — चाहें तो LED Strip भी लगवा सकते हैं।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹46,000–₹75,000+", desc: "10–14 ft unit, premium veneer/high-gloss finish, integrated LED backlight, extended storage and floating shelves.", descHi: "10–14 फुट की यूनिट, प्रीमियम वीनियर/हाई-ग्लॉस फिनिश, बिल्ट-इन LED बैकलाइट, बड़ा स्टोरेज और फ्लोटिंग शेल्फ के साथ।" },
    ],
    sizesThickness: "Units are custom-built to your wall's exact width (typically 6–14 ft) rather than a fixed size. Carcass is 18mm plywood/MDF, back panel 6mm, laminate face sheet approx. 1mm — shutter and shelf thickness vary by design.",
    sizesThicknessHi: "यूनिट फिक्स्ड साइज़ में नहीं आती, हम इसे आपकी दीवार की सही चौड़ाई (आमतौर पर 6–14 फुट) पर कस्टम बनाते हैं। कारकास 18mm प्लाईवुड/MDF का होता है, बैक पैनल 6mm, लैमिनेट फेस शीट करीब 1mm — शटर और शेल्फ की मोटाई डिज़ाइन के अनुसार बदलती है।",
    labourCost: "Fabrication and installation labour is bundled into the unit price above rather than billed separately — it typically makes up 25–35% of the total, more for units with extensive LED work or floating shelves.",
    labourCostHi: "फैब्रिकेशन और इंस्टॉलेशन की लेबर ऊपर की यूनिट कीमत में ही शामिल है, अलग से बिल नहीं करते — यह आमतौर पर कुल का 25–35% हिस्सा होती है, ज़्यादा LED वर्क या फ्लोटिंग शेल्फ वाली यूनिट में यह हिस्सा थोड़ा ज़्यादा रहता है।",
    labourCostShort: "25–35% of unit price",
    brandNote: "Carcass material is BWP/BWR-grade plywood or MDF from ISI-compliant branded stock, with branded laminate/veneer sheets and soft-close hinge/channel hardware — exact brand options shown at the design stage so you can pick within your budget.",
    brandNoteHi: "कारकास मटेरियल में हम ISI-अनुरूप ब्रांडेड स्टॉक का BWP/BWR-ग्रेड प्लाईवुड या MDF ही लगाते हैं, ब्रांडेड लैमिनेट/वीनियर शीट और सॉफ्ट-क्लोज़ हिंज/चैनल हार्डवेयर के साथ — डिज़ाइन स्टेज पर हम सही ब्रांड के विकल्प दिखा देते हैं, ताकि आप अपने बजट में चुन सकें।",
    availability: "Delivered and installed across our full service area. Large premium units (10ft+) may need 5–7 days for fabrication in addition to installation time, longer for outlying blocks beyond Araria district.",
    availabilityHi: "यह हम पूरे सर्विस एरिया में डिलीवर और इंस्टॉल करते हैं। बड़ी प्रीमियम यूनिट (10 फुट+) के लिए इंस्टॉलेशन के अलावा 5–7 दिन फैब्रिकेशन में लग सकते हैं, अररिया ज़िले के बाहर के इलाकों में इससे थोड़ा ज़्यादा वक़्त लग सकता है।",
    installTime: "3–5 days depending on size and design complexity",
    maintenance: "Wipe with a dry cloth; avoid placing hot items directly on the surface",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A modular TV unit is a custom-built cabinet system — carcass, shutters, open shelves, and laminate or veneer finish — fabricated to your exact wall width and TV size rather than assembled from a fixed-size showroom piece. Cable routing is built into the panel from the design stage, so wires from the TV, set-top box, and speakers disappear behind the unit instead of hanging in view.",
    whatItIsHi:
      "देखिए, मॉड्यूलर TV यूनिट एक कस्टम-निर्मित कैबिनेट सिस्टम है — कारकास, शटर, खुली शेल्फ और लैमिनेट या वीनियर फिनिश — जो आपकी दीवार की सही चौड़ाई और TV के साइज़ के हिसाब से हम बनाते हैं, किसी फिक्स्ड-साइज़ शोरूम पीस से नहीं। केबल रूटिंग हम डिज़ाइन स्टेज से ही पैनल में शामिल कर देते हैं, ताकि TV, सेट-टॉप बॉक्स और स्पीकर के तार यूनिट के पीछे छुप जाएं, सामने लटकते न दिखें।",
    whereUsed: [
      "Living rooms — the focal wall opposite the main seating",
      "Bedrooms — a compact unit facing the bed",
      "Home theatre / media rooms with extra storage for AV equipment",
    ],
    whereUsedHi: [
      "लिविंग रूम में — मुख्य बैठने की जगह के सामने वाली दीवार पर",
      "बेडरूम में — बिस्तर के सामने एक कॉम्पैक्ट यूनिट",
      "होम थिएटर या मीडिया रूम में, जहां AV उपकरण के लिए अतिरिक्त स्टोरेज चाहिए",
    ],
    whereNotUsed: [
      "Damp or splash-prone walls (near a window that leaks, or an outdoor-facing balcony wall) — laminate/veneer finishes aren't built for standing moisture",
      "Walls you plan to reconfigure again soon — since it's custom-built to that exact wall, it isn't easily relocated to a different width",
    ],
    whereNotUsedHi: [
      "नमी या छींटे वाली दीवार पर नहीं (लीक करने वाली खिड़की के पास, या खुली बालकनी की दीवार) — लैमिनेट/वीनियर फिनिश खड़े पानी के लिए नहीं बनी",
      "जिस दीवार का लेआउट आप जल्द बदलने वाले हों, वहां न लगवाएं — क्योंकि यह उसी दीवार की सही नाप पर बनती है, दूसरी चौड़ाई में आसानी से शिफ्ट नहीं होती",
    ],
    benefits: [
      "Fits your exact wall width — no gap on the sides like a bought-off-the-shelf unit",
      "Cable management built into the design — no visible wiring clutter",
      "Optional LED strip lighting for a premium, showroom-style look",
      "Mix of closed cabinets and open shelves, sized around what you actually need to store",
      "Finish, colour, and hardware are all chosen by you, not fixed by a catalogue",
    ],
    benefitsHi: [
      "आपकी दीवार की सही चौड़ाई में फिट होती है — शोरूम से खरीदी यूनिट जैसा साइड में गैप नहीं रहता",
      "डिज़ाइन में ही केबल मैनेजमेंट शामिल रहता है — तारों की कोई गड़बड़ी सामने नहीं दिखती",
      "चाहें तो प्रीमियम, शोरूम-जैसे लुक के लिए LED Strip लाइटिंग भी लगवा सकते हैं",
      "बंद कैबिनेट और खुली शेल्फ का मिश्रण, आपकी असली स्टोरेज ज़रूरत के हिसाब से बनता है",
      "फिनिश, रंग और हार्डवेयर सब आप खुद चुनते हैं, कैटलॉग से तय नहीं होता",
    ],
    limitations: [
      "Fixed design — repositioning it to a different wall later usually isn't practical",
      "Takes longer to deliver than a ready-made unit since it's fabricated to order",
      "Higher cost than a basic showroom unit of similar size, for the customisation and cable management",
    ],
    limitationsHi: [
      "फिक्स्ड डिज़ाइन होता है — बाद में इसे दूसरी दीवार पर शिफ्ट करना आमतौर पर व्यावहारिक नहीं",
      "ऑर्डर पर बनने की वजह से रेडीमेड यूनिट के मुकाबले डिलीवरी में थोड़ा ज़्यादा समय लगता है",
      "कस्टमाइज़ेशन और केबल मैनेजमेंट की वजह से समान साइज़ की बेसिक शोरूम यूनिट से कीमत थोड़ी ज़्यादा पड़ती है",
    ],
    materials: [
      { name: "Plywood/MDF carcass", nameHi: "प्लाईवुड/MDF कारकास", detail: "The structural box of the unit — plywood for higher load areas, MDF where a smoother laminate finish is wanted", detailHi: "यूनिट का ढांचा — ज़्यादा वज़न वाली जगह के लिए प्लाईवुड लगाते हैं, स्मूथ लैमिनेट फिनिश के लिए MDF" },
      { name: "Laminate / veneer finish", nameHi: "लैमिनेट / वीनियर फिनिश", detail: "Surface finish in matte, glossy, or wood-veneer options across dozens of colours", detailHi: "मैट, ग्लॉसी या वुड-वीनियर फिनिश में, दर्जनों रंगों में मिलता है" },
      { name: "Soft-close hardware", nameHi: "सॉफ्ट-क्लोज़ हार्डवेयर", detail: "Hinges and drawer channels that close silently and don't slam over years of use", detailHi: "टिका और दराज़ चैनल, जो चुपचाप बंद होते हैं, सालों इस्तेमाल के बाद भी पटकते नहीं" },
      { name: "LED strip + driver (optional)", nameHi: "LED स्ट्रिप + ड्राइवर (वैकल्पिक)", detail: "Backlight fitted along shelf edges or the back panel for a floating, showroom effect", detailHi: "शेल्फ के किनारों या पीछे के पैनल पर लगी बैकलाइट, जो फ्लोटिंग शोरूम जैसा असर देती है" },
    ],
    installSteps: [
      { title: "Site measurement", titleHi: "साइट माप", desc: "Exact wall width, height, TV size, and existing socket/switch positions are measured.", descHi: "पहले दीवार की सही चौड़ाई, ऊंचाई, TV का साइज़ और मौजूदा सॉकेट/स्विच की जगह नापते हैं।" },
      { title: "Design finalisation", titleHi: "डिज़ाइन फाइनल करना", desc: "Layout, finish, colour, and LED options are agreed with you before fabrication starts.", descHi: "फैब्रिकेशन शुरू होने से पहले लेआउट, फिनिश, रंग और LED के विकल्प आपके साथ तय कर लेते हैं।" },
      { title: "Module fabrication", titleHi: "मॉड्यूल फैब्रिकेशन", desc: "Carcass panels are cut, edge-banded, and laminated to the agreed finish, either at our workshop or on-site.", descHi: "कारकास पैनल काटते हैं, एज-बैंड करते हैं और तय फिनिश में लैमिनेट करते हैं — यह काम हमारी वर्कशॉप में या साइट पर होता है।" },
      { title: "Wall bracket/batten fixing", titleHi: "वॉल ब्रैकेट/बैटन फिक्सिंग", desc: "Mounting battens are fixed to the wall at the correct height for the unit to hang or rest on.", descHi: "यूनिट टिकाने या लटकाने के लिए सही ऊंचाई पर दीवार में माउंटिंग बैटन फिक्स करते हैं।" },
      { title: "Module installation", titleHi: "मॉड्यूल इंस्टॉलेशन", desc: "Modules are installed and levelled, with the cable-management channel routed behind the panel.", descHi: "मॉड्यूल इंस्टॉल करके लेवल करते हैं, केबल-मैनेजमेंट चैनल पैनल के पीछे से निकाल देते हैं।" },
      { title: "Hardware & LED fitting", titleHi: "हार्डवेयर और LED फिटिंग", desc: "Hinges, drawer channels, and any LED backlight wiring are fitted and tested.", descHi: "टिका, दराज़ चैनल और कोई भी LED बैकलाइट वायरिंग फिट करके टेस्ट कर लेते हैं।" },
      { title: "Final polish & handover", titleHi: "फाइनल पॉलिश और हैंडओवर", desc: "Surfaces polished, shutters checked for smooth operation, warranty document handed over.", descHi: "सतहें पॉलिश करते हैं, शटर ठीक से खुल-बंद हो रहे हैं यह जांचते हैं, और आपको Warranty दे देते हैं।" },
    ],
    realProject: {
      title: "10 ft floating LED TV unit, Forbesganj",
      titleHi: "10 फुट फ्लोटिंग LED TV यूनिट, फारबिसगंज",
      desc: "A wall-mounted 10 ft unit with a floating centre shelf, hidden LED strip, and closed side cabinets sized specifically to store an existing set-top box and router out of sight.",
      descHi: "यह फारबिसगंज की एक दीवार पर लगी 10 फुट की यूनिट है — बीच में फ्लोटिंग शेल्फ, छुपी LED Strip, और साइड में बंद कैबिनेट खासतौर पर मौजूदा सेट-टॉप बॉक्स और राउटर को नज़र से छुपाने के लिए बनाए गए।",
      photos: 8,
    },
    faqs: [
      { q: "How long before the TV unit is ready after I confirm the design?", qHi: "डिज़ाइन कन्फर्म करने के बाद TV यूनिट कितने दिन में तैयार होगी?", a: "Once the design and finish are locked in, fabrication and installation together typically take 3–5 days depending on size — a simple 6–8 ft unit is faster, a large unit with extensive LED work and storage takes closer to 5 days.", aHi: "डिज़ाइन और फिनिश तय होने के बाद, साइज़ के अनुसार फैब्रिकेशन और इंस्टॉलेशन मिलाकर आमतौर पर 3–5 दिन लग जाते हैं — साधारण 6–8 फुट की यूनिट जल्दी बन जाती है, और बड़ी यूनिट जिसमें ज़्यादा LED वर्क और स्टोरेज हो, उसमें करीब 5 दिन लगते हैं।" },
      { q: "Can the TV unit be designed to hide the router, set-top box, and cables completely?", qHi: "क्या TV यूनिट में राउटर, सेट-टॉप बॉक्स और तार पूरी तरह छुपाए जा सकते हैं?", a: "Yes, that's exactly what the cable-management channel is for. We route a hollow channel behind the panel from the wall socket up to a vented compartment, so the router and set-top box sit inside the unit with just the remote sensor left visible.", aHi: "हां, केबल-मैनेजमेंट चैनल बिल्कुल इसी काम के लिए है। हम दीवार के सॉकेट से एक हवादार कम्पार्टमेंट तक पैनल के पीछे से एक खोखली चैनल निकाल देते हैं, ताकि राउटर और सेट-टॉप बॉक्स यूनिट के अंदर छुपे रहें और सिर्फ रिमोट सेंसर बाहर दिखे।" },
      { q: "What size TV unit is right for a 10x12 ft living room?", qHi: "10x12 फुट के लिविंग रूम के लिए कौन सा साइज़ TV यूनिट सही रहेगा?", a: "For a room that size, an 8–10 ft wide unit usually balances proportions well without overwhelming the wall. We confirm the exact size on-site against your actual wall and seating distance, not just the room's floor area.", aHi: "इतने साइज़ के कमरे के लिए 8–10 फुट चौड़ी यूनिट आमतौर पर सही अनुपात में रहती है, दीवार पर भारी नहीं लगती। हम सिर्फ कमरे के फ्लोर एरिया से नहीं, आपकी असली दीवार और बैठने की दूरी के हिसाब से Site Visit में सही साइज़ तय करते हैं।" },
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
    tagline: "Evergreen balconies and feature walls, with nothing left to water",
    taglineHi: "हमेशा हरी-भरी बालकनी और फीचर वॉल — पानी देने की कोई ज़रूरत नहीं",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    galleryCategory: "Artificial Grass",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", tierHi: "इकोनॉमी", range: "₹40–₹55/sq.ft", desc: "25–30mm pile height, standard density — fine for a small balcony corner.", descHi: "25mm से 30mm पाइल हाइट, स्टैंडर्ड डेंसिटी — छोटी बालकनी के लिए बिल्कुल ठीक रहती है।" },
      { tier: "Standard", tierHi: "स्टैंडर्ड", range: "₹60–₹85/sq.ft", desc: "35–40mm pile height, denser turf, better UV treatment.", descHi: "35mm से 40mm पाइल हाइट, ज़्यादा घनी टर्फ, बेहतर UV ट्रीटमेंट के साथ।" },
      { tier: "Premium", tierHi: "प्रीमियम", range: "₹90–₹150/sq.ft", desc: "40–50mm pile height, premium density, longest-lasting colour/UV warranty.", descHi: "40mm से 50mm पाइल हाइट, प्रीमियम डेंसिटी — रंग और UV सबसे लंबे समय तक टिकते हैं।" },
    ],
    sizesThickness: "Turf comes in standard roll widths of 2m and 4m, joined with seam tape for wider areas. Pile height ranges 25mm to 50mm depending on the tier you choose.",
    sizesThicknessHi: "टर्फ आमतौर पर 2m और 4m चौड़ाई के रोल में आती है, बड़ी जगह के लिए सीम टेप से जोड़ देते हैं। पाइल हाइट आपके चुने गए टियर के हिसाब से 25mm से 50mm तक होती है।",
    labourCost: "Labour (base/drainage prep, laying, seam joining, edge fixing) is roughly ₹8–15/sq.ft for floor use and ₹15–25/sq.ft for wall panels, included in the rates above.",
    labourCostHi: "बेस/ड्रेनेज तैयारी, बिछाना, सीम जोड़ना और एज फिक्सिंग की लेबर फर्श के लिए करीब ₹8–15/sq.ft और दीवार पैनल के लिए ₹15–25/sq.ft है, ऊपर के रेट में शामिल है।",
    labourCostShort: "₹8–15/sq.ft (floor) · ₹15–25/sq.ft (wall)",
    brandNote: "Turf is UV-stabilised synthetic grass sourced through our regular Purnia-market suppliers — we check UV treatment and density before ordering rather than buying the cheapest roll available, since untreated turf fades within a season in North Bihar's sun.",
    brandNoteHi: "हमारी टर्फ पूर्णिया-मार्केट के नियमित सप्लायर से UV-स्टेबलाइज़्ड सिंथेटिक घास होती है — सबसे सस्ता रोल उठाने की बजाय हम पहले UV ट्रीटमेंट और डेंसिटी जांचते हैं, क्योंकि अनट्रीटेड टर्फ उत्तर बिहार की धूप में एक ही सीज़न में फीकी पड़ जाती है।",
    availability: "Available across our full service area. Balcony/terrace turf is most requested in Forbesganj, Araria, and Raniganj; allow a couple of extra days for premium-grade rolls in outlying blocks as they're ordered in via Purnia.",
    availabilityHi: "यह हम पूरे सर्विस एरिया में लगाते हैं। बालकनी या टैरेस की टर्फ फारबिसगंज, अररिया और रानीगंज में हमारी सबसे ज़्यादा मांगी जाने वाली चीज़ है; दूर के ब्लॉक में प्रीमियम-ग्रेड रोल के लिए कुछ दिन ज़्यादा लग सकते हैं, क्योंकि यह पूर्णिया से मंगानी पड़ती है।",
    installTime: "Half a day to 1 day for a typical balcony or accent wall",
    maintenance: "Occasional rinse with water and a light brush of the fibres — no mowing, no watering, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Artificial grass here is UV-stabilised synthetic turf, rolled out over a prepared, well-drained base for floor use, or mounted as pre-cut panels onto a batten frame for a green feature wall. The fibres are woven into a permeable backing so rainwater drains straight through rather than pooling, and the colour is UV-treated so it doesn't bleach out in direct North Bihar sun the way cheaper turf does within a season.",
    whatItIsHi:
      "देखिए, यहां हम जो आर्टिफिशियल घास लगाते हैं वो UV-स्टेबलाइज़्ड सिंथेटिक टर्फ होती है, जिसे फर्श के लिए एक तैयार, अच्छी ड्रेनेज वाली बेस पर बिछाते हैं, या ग्रीन फीचर वॉल के लिए पहले से कटे पैनल के रूप में बैटन फ्रेम पर लगाते हैं। रेशे एक पारगम्य बैकिंग में बुने होते हैं, ताकि बारिश का पानी जमा होने की बजाय सीधे निकल जाए। रंग भी UV-ट्रीटेड रहता है, ताकि सस्ती टर्फ की तरह उत्तर बिहार की सीधी धूप में एक ही सीज़न में फीका न पड़े।",
    whereUsed: [
      "Balconies and terraces — an evergreen look with zero watering or mowing",
      "Feature walls in a living room or office reception for a green accent",
      "Small home gardens or rooftop seating corners",
      "Pet-friendly outdoor spaces where a real lawn is hard to maintain",
    ],
    whereUsedHi: [
      "बालकनी और टैरेस पर — बिना पानी दिए या काटे हमेशा हरा-भरा लुक मिलता है",
      "लिविंग रूम या ऑफिस रिसेप्शन में ग्रीन एक्सेंट के लिए फीचर वॉल पर",
      "छोटे घर के गार्डन या छत पर बैठने की जगह में",
      "पालतू जानवरों वाली आउटडोर जगह में, जहां असली लॉन बनाए रखना मुश्किल हो",
    ],
    whereNotUsed: [
      "Areas with poor or no drainage underneath — water will pool below the turf and smell over time; we fix drainage first or don't install there",
      "Directly under intense reflected heat (glass-facade reflections concentrated on one spot) — can soften the backing faster than normal sun exposure",
      "Indoor carpeted-floor replacement expecting a soft, cushioned feel — turf reads and feels different from carpet underfoot",
    ],
    whereNotUsedHi: [
      "जहां नीचे ड्रेनेज ठीक न हो या हो ही न — वहां पानी टर्फ के नीचे जमा होकर समय के साथ बदबू कर सकता है; हम पहले ड्रेनेज ठीक करते हैं, वरना वहां लगाते ही नहीं",
      "सीधे तेज़ रिफ्लेक्टेड गर्मी में नहीं (जहां ग्लास-फेसाड की धूप एक ही जगह केंद्रित होती हो) — यह सामान्य धूप से ज़्यादा तेज़ी से बैकिंग को नरम कर सकता है",
      "इनडोर कारपेट की जगह नरम, गद्देदार एहसास की उम्मीद में इसे न लगवाएं — टर्फ पैरों के नीचे कारपेट से अलग महसूस होता है",
    ],
    benefits: [
      "Always green — no seasonal browning, no dependence on watering schedules",
      "Drains through rather than pooling, so it handles Bihar's monsoon downpours without turning to mud",
      "UV-resistant colour holds up under direct sun far longer than untreated turf",
      "Zero mowing, zero fertiliser, zero pest spraying",
      "Pet-friendly and comfortable underfoot compared to bare tile or concrete",
    ],
    benefitsHi: [
      "हमेशा हरा रहता है — मौसम के साथ पीला नहीं पड़ता, पानी देने के शेड्यूल पर निर्भर नहीं",
      "पानी जमा होने की बजाय सीधे निकल जाता है, इसलिए बिहार की मानसून बारिश में भी कीचड़ नहीं बनता",
      "UV-रेजिस्टेंट रंग अनट्रीटेड टर्फ से कहीं ज़्यादा देर तक सीधी धूप में टिका रहता है",
      "कोई कटाई नहीं, कोई खाद नहीं, कोई कीट स्प्रे नहीं — कुछ भी नहीं करना पड़ता",
      "पालतू जानवरों के लिए अनुकूल है, नंगे टाइल या कंक्रीट से पैरों में ज़्यादा आरामदायक लगता है",
    ],
    limitations: [
      "Needs a properly drained base underneath — installing over poor drainage causes odour over time",
      "Can heat up noticeably underfoot in direct peak-afternoon summer sun, more than natural grass would",
      "Doesn't feel identical to a real, watered lawn — a fair trade for zero maintenance, but worth knowing upfront",
    ],
    limitationsHi: [
      "नीचे सही ड्रेनेज ज़रूरी है — खराब ड्रेनेज पर लगाएंगे तो समय के साथ बदबू आ सकती है",
      "गर्मी की दोपहर की सीधी धूप में यह असली घास से ज़्यादा गर्म हो सकती है, पैर रखते ही महसूस हो जाता है",
      "असली, पानी दी गई घास जैसा बिल्कुल एहसास नहीं देती — ज़ीरो मेंटेनेंस के बदले यह एक उचित समझौता है, पर यह बात पहले से जान लें",
    ],
    materials: [
      { name: "UV-stabilised synthetic turf", nameHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ", detail: "Polyethylene/polypropylene grass fibres tufted onto a permeable backing, in multiple pile heights", detailHi: "पॉलीएथिलीन/पॉलीप्रोपाइलीन घास के रेशे एक पारगम्य बैकिंग में बुने होते हैं, कई पाइल-हाइट में मिलते हैं" },
      { name: "Drainage underlay", nameHi: "ड्रेनेज अंडरले", detail: "A sand/gravel or perforated base layer laid beneath floor turf so rainwater passes through instead of pooling", detailHi: "फर्श वाली टर्फ के नीचे रेत/बजरी या छिद्रित बेस लेयर बिछा देते हैं, ताकि बारिश का पानी जमा होने की बजाय निकल जाए" },
      { name: "Jointing tape / seam adhesive", nameHi: "जॉइंटिंग टेप / सीम एडहेसिव", detail: "Joins adjacent turf rolls invisibly so the lawn reads as one continuous surface", detailHi: "पास-पास बिछाई गई टर्फ रोल को इस तरह जोड़ते हैं कि पूरा लॉन एक जैसा लगातार दिखे" },
    ],
    installSteps: [
      { title: "Surface & drainage check", titleHi: "सतह और ड्रेनेज जांच", desc: "The base is cleaned and checked for slope/drainage; a wall gets battens checked instead.", descHi: "पहले बेस साफ करके ढलान/ड्रेनेज जांचते हैं; दीवार के लिए इसकी जगह बैटन चेक करते हैं।" },
      { title: "Underlay/base preparation", titleHi: "अंडरले/बेस तैयारी", desc: "For floors, a drainage underlay is laid down first; for walls, a batten frame is fixed.", descHi: "फर्श के लिए पहले ड्रेनेज अंडरले बिछाते हैं; दीवार के लिए बैटन फ्रेम फिक्स करते हैं।" },
      { title: "Turf rolling / panel fixing", titleHi: "टर्फ रोलिंग / पैनल फिक्सिंग", desc: "Turf rolls are laid and cut to the exact boundary, or pre-cut panels are fixed to the wall frame.", descHi: "टर्फ रोल बिछाकर सही बाउंड्री पर काटते हैं, या पहले से कटे पैनल दीवार के फ्रेम में फिक्स कर देते हैं।" },
      { title: "Seam joining", titleHi: "सीम जोड़ना", desc: "Adjacent pieces are joined with tape/adhesive so the joint disappears into the pile.", descHi: "पास-पास के टुकड़ों को टेप/एडहेसिव से जोड़ते हैं, ताकि जोड़ घास के रेशों में छुप जाए।" },
      { title: "Edge fixing", titleHi: "एज फिक्सिंग", desc: "Edges are secured with U-pins, adhesive, or a border beading so they don't lift over time.", descHi: "किनारों को U-पिन, एडहेसिव या बॉर्डर बीडिंग से फिक्स कर देते हैं, ताकि समय के साथ न उठें।" },
      { title: "Final grooming & handover", titleHi: "फाइनल ग्रूमिंग और हैंडओवर", desc: "Fibres are brushed upright for a full, fresh-lawn look before handover.", descHi: "हैंडओवर से पहले रेशों को ब्रश करके सीधा खड़ा कर देते हैं, ताकि ताज़े लॉन जैसा भरा-भरा लुक मिले।" },
    ],
    realProject: {
      title: "Balcony lawn corner, Raniganj",
      titleHi: "बालकनी लॉन कॉर्नर, रानीगंज",
      desc: "A 60 sq.ft balcony fitted with a drained-base artificial lawn and a small potted-plant corner — the family's answer to wanting a garden feel without a floor-level flat to maintain one in.",
      descHi: "यह रानीगंज की एक 60 वर्ग फुट बालकनी का काम है — यहां हमने ड्रेन्ड-बेस आर्टिफिशियल लॉन बिछाया और गमलों का एक छोटा कोना भी बनाया। फ्लोर-लेवल फ्लैट में बगीचे जैसा एहसास चाहने वाले इस परिवार को असली बगीचा बनाए रखने की मेहनत के बिना यह समाधान मिल गया।",
      photos: 7,
    },
    faqs: [
      { q: "Will artificial grass smell or grow mould in Bihar's monsoon?", qHi: "क्या बिहार के मानसून में आर्टिफिशियल घास से बदबू या फफूंद आएगी?", a: "Not if the base drains properly — that's the one thing we insist on checking before installation. Water needs a clear path to run off underneath; if your balcony floor doesn't already drain well, we fix or add drainage before laying the turf, not after.", aHi: "अगर बेस से पानी अच्छी तरह निकलता हो तो नहीं होगी — इंस्टॉलेशन से पहले हम यही एक चीज़ ज़रूर जांचते हैं। पानी को नीचे से निकलने का साफ रास्ता चाहिए; अगर आपकी बालकनी का फर्श पहले से अच्छी तरह नहीं निकलता, तो हम टर्फ बिछाने से पहले ही ड्रेनेज ठीक कर देते हैं, बाद में नहीं।" },
      { q: "How long does artificial grass actually last outdoors?", qHi: "आर्टिफिशियल घास बाहर असल में कितने साल चलती है?", a: "Good UV-stabilised turf typically holds its colour and pile for 5–8 years under regular sun exposure before it noticeably flattens or fades, depending on foot traffic. It's covered by our 1-year installation warranty; the material's own life runs well beyond that.", aHi: "अच्छी UV-स्टेबलाइज़्ड टर्फ सामान्य धूप में आमतौर पर 5–8 साल तक अपना रंग और उभार बनाए रखती है, इसके बाद चलने-फिरने की मात्रा के हिसाब से हल्की चपटी या फीकी पड़ सकती है। हमारी 1 साल की Warranty इंस्टॉलेशन को कवर करती है; मटेरियल की अपनी उम्र उससे कहीं ज़्यादा होती है।" },
      { q: "Can artificial grass be used on a wall, not just the floor?", qHi: "क्या आर्टिफिशियल घास सिर्फ फर्श पर नहीं, दीवार पर भी लगाई जा सकती है?", a: "Yes — for a green feature wall we fix pre-cut turf panels onto a batten frame the same way we'd fix a WPC panel, so there's no drainage concern at all since it's vertical and dry.", aHi: "हां — ग्रीन फीचर वॉल के लिए हम पहले से कटे टर्फ पैनल को बैटन फ्रेम पर उसी तरह फिक्स करते हैं, जैसे WPC Panel लगाते हैं। इसमें ड्रेनेज की कोई चिंता ही नहीं होती, क्योंकि यह वर्टिकल और सूखी जगह होती है।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "uv-marble-sheet"],
  },
]

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
