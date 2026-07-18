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
  price: string
  premiumPrice: string
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

export const SERVICES_CONTENT: ServiceContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gypsum-ceiling",
    icon: Layers,
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "Ceiling",
    categoryHi: "सीलिंग",
    tagline: "The dry-room finish that turns a hall into a showpiece",
    taglineHi: "हॉल को शोपीस बना देने वाली ड्राई-रूम फिनिश",
    heroImage: "/images/gypsum5.jpg",
    heroImageAlt: "Gypsum false ceiling with cove lighting in a Forbesganj living room by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    price: "₹80–₹140/sq.ft",
    premiumPrice: "₹120–₹200/sq.ft with LED cove lighting and POP detailing",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    maintenance: "Dust occasionally with a dry cloth; repaint every 5–7 years",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Gypsum false ceiling is a suspended ceiling built from 12.5mm gypsum boards screwed onto a GI metal frame fixed a few inches below your actual slab. Once the joints are taped and finished, it looks like one continuous smooth plaster surface — not a panel with visible seams. That smooth surface is what lets us cut cove channels, stepped borders, and curved profiles into it, and hide LED strip lighting inside those recesses.",
    whatItIsHi:
      "जिप्सम फॉल्स सीलिंग असली स्लैब से कुछ इंच नीचे लगाई गई एक सीलिंग है — GI मेटल फ्रेम पर 12.5mm जिप्सम बोर्ड स्क्रू से लगाए जाते हैं। जोड़ों पर टेप और फिनिशिंग के बाद यह एक smooth, बिना जोड़ वाली प्लास्टर सतह जैसी दिखती है। इसी smooth सतह की वजह से इसमें cove डिज़ाइन, स्टेप बॉर्डर और घुमावदार शेप काटे जा सकते हैं, और LED स्ट्रिप लाइट अंदर छुपाई जा सकती है।",
    whereUsed: [
      "Living room / hall — the room every guest sees first",
      "Bedrooms — soft cove lighting for a calmer, warmer feel",
      "Dining and drawing rooms",
      "Office cabins and reception areas that stay dry",
    ],
    whereUsedHi: [
      "हॉल / लिविंग रूम — जो सबसे पहले मेहमान की नज़र में आता है",
      "बेडरूम — soft cove lighting से कमरा ज़्यादा शांत और गर्म लगता है",
      "डाइनिंग और ड्रॉइंग रूम",
      "ऑफिस केबिन और रिसेप्शन, जहाँ नमी नहीं आती",
    ],
    whereNotUsed: [
      "Bathrooms — steam and standing moisture will stain and soften the board over time",
      "Kitchens — cooking steam has the same effect as bathroom humidity",
      "Open balconies, terraces, or any area exposed to direct rain",
      "Any room that floods or has a chronic leak from the floor above — fix the leak first",
    ],
    whereNotUsedHi: [
      "बाथरूम — भाप और नमी से बोर्ड धीरे-धीरे खराब हो जाता है",
      "किचन — खाना बनाते समय भाप भी वही असर करती है",
      "खुली बालकनी, टैरेस या बारिश सीधे आने वाली जगह",
      "ऊपर वाले फ्लोर से लीकेज वाला कोई भी कमरा — पहले लीकेज ठीक करवाएं",
    ],
    benefits: [
      "Perfectly smooth, seamless finish — the most premium look among all ceiling options",
      "Any shape or profile possible: cove, step, curved, tray ceiling",
      "Takes cove/LED strip lighting better than any other material",
      "Can be painted any colour, and repainted later without replacing the ceiling",
      "Fire-resistant board, and it dampens sound between floors better than PVC",
    ],
    benefitsHi: [
      "बिल्कुल smooth, बिना जोड़ वाली फिनिश — सबसे प्रीमियम लुक",
      "कोई भी शेप संभव: cove, step, curved, tray ceiling",
      "Cove/LED स्ट्रिप लाइटिंग के लिए सबसे बेहतर मटेरियल",
      "किसी भी रंग में पेंट हो सकती है, और बाद में दोबारा पेंट भी हो सकती है",
      "Fire-resistant बोर्ड, और PVC से ज़्यादा अच्छी sound insulation",
    ],
    limitations: [
      "Not waterproof — the one hard rule we don't bend, even when a customer insists",
      "Takes longer to finish than PVC because of taping, sanding, and two coats of putty/paint",
      "A ceiling leak (from a slab crack above) will show as a stain that needs board replacement, not just a wipe",
      "Slightly higher skilled-labour cost than PVC for the same complexity of design",
    ],
    limitationsHi: [
      "वॉटरप्रूफ नहीं है — यह एक नियम है जो हम किसी की ज़िद पर भी नहीं तोड़ते",
      "टेपिंग, सैंडिंग और पुट्टी-पेंट की वजह से PVC से थोड़ा ज़्यादा समय लगता है",
      "ऊपर से लीकेज हो तो सिर्फ पोंछने से ठीक नहीं होगा, बोर्ड बदलना पड़ेगा",
      "समान डिज़ाइन में PVC से थोड़ा ज़्यादा labour खर्च आता है",
    ],
    materials: [
      { name: "Gypsum board (12.5mm)", nameHi: "जिप्सम बोर्ड (12.5mm)", detail: "Branded boards (Saint-Gobain / USG / India Gypsum grade) — never unbranded stock", detailHi: "ब्रांडेड बोर्ड (Saint-Gobain / USG / India Gypsum ग्रेड) — कभी अनब्रांडेड स्टॉक नहीं" },
      { name: "GI metal channel frame", nameHi: "GI मेटल चैनल फ्रेम", detail: "Perimeter angle + intermediate/ceiling channels — galvanised, doesn't rust or sag over years", detailHi: "पेरीमीटर एंगल + इंटरमीडिएट/सीलिंग चैनल — गैल्वनाइज़्ड, सालों तक जंग नहीं लगता, झुकता नहीं" },
      { name: "Joint tape & jointing compound", nameHi: "जॉइंट टेप और जॉइंटिंग कंपाउंड", detail: "Seals every board joint so the finished surface reads as one continuous plane", detailHi: "हर बोर्ड जोड़ को सील करता है ताकि पूरी सतह एक जैसी smooth दिखे" },
      { name: "LED cove profile + strip", nameHi: "LED कोव प्रोफाइल + स्ट्रिप", detail: "Aluminium channel recessed into the cove step, warm-white (3000K) for living areas", detailHi: "कोव स्टेप में लगा एल्युमिनियम चैनल, लिविंग एरिया के लिए warm-white (3000K)" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "We mark a laser/spirit-level line around the room at the drop height agreed with you.", descHi: "आपसे तय की गई ड्रॉप-हाइट पर पूरे कमरे में laser/spirit-level से लाइन मार्क करते हैं।" },
      { title: "Frame fixing", titleHi: "फ्रेम फिक्सिंग", desc: "Perimeter angle goes up on the wall line, then ceiling channels are anchor-fixed to the slab at set spacing.", descHi: "दीवार पर पेरीमीटर एंगल लगता है, फिर स्लैब में तय दूरी पर सीलिंग चैनल एंकर से फिक्स होते हैं।" },
      { title: "Board fixing", titleHi: "बोर्ड फिक्सिंग", desc: "Gypsum boards are screwed onto the frame with staggered joints so no seam lines run continuously.", descHi: "जिप्सम बोर्ड स्टैगर्ड जॉइंट में स्क्रू से फ्रेम पर लगाए जाते हैं ताकि कोई सीधी सीम लाइन न दिखे।" },
      { title: "Cove framing (if in design)", titleHi: "कोव फ्रेमिंग (अगर डिज़ाइन में है)", desc: "A recessed step is framed at the border for the LED strip before the boards on that section close.", descHi: "LED स्ट्रिप के लिए बॉर्डर पर एक recessed step बनाया जाता है, उस हिस्से के बोर्ड बंद होने से पहले।" },
      { title: "Taping & jointing", titleHi: "टेपिंग और जॉइंटिंग", desc: "Paper tape and jointing compound cover every screw head and board joint, then get sanded flat.", descHi: "हर स्क्रू और जोड़ पर पेपर टेप और जॉइंटिंग कंपाउंड लगता है, फिर सैंड करके smooth किया जाता है।" },
      { title: "Electrical cutouts", titleHi: "इलेक्ट्रिकल कटआउट", desc: "Openings for downlights, AC vents, and the cove wiring are cut and wired before the final coat.", descHi: "डाउनलाइट, AC वेंट और कोव वायरिंग के कटआउट, फाइनल कोट से पहले काटे और वायर किए जाते हैं।" },
      { title: "Primer & finish coat", titleHi: "प्राइमर और फिनिश कोट", desc: "Two coats of putty and paint in your chosen colour complete the seamless surface.", descHi: "आपकी पसंद के रंग में पुट्टी और पेंट के दो कोट से सीलिंग तैयार होती है।" },
      { title: "Handover", titleHi: "हैंडओवर", desc: "Final walk-through, lights switched on to check the cove line, written warranty handed over.", descHi: "फाइनल जांच, कोव लाइन चेक करने के लिए लाइट ऑन की जाती है, लिखित वारंटी दी जाती है।" },
    ],
    realProject: {
      title: "Cove-lit hall ceiling, Forbesganj",
      titleHi: "कोव-लिट हॉल सीलिंग, फारबिसगंज",
      desc: "A 180 sq.ft drawing room finished with a stepped gypsum border and warm-white LED cove — one of the projects our team most often shows on-site to explain what cove lighting actually looks like once installed.",
      descHi: "180 वर्ग फुट के ड्रॉइंग रूम में stepped जिप्सम बॉर्डर और warm-white LED cove लगाई गई — यही प्रोजेक्ट हमारी टीम अक्सर साइट पर दिखाती है ताकि ग्राहक cove लाइटिंग का असली लुक समझ सकें।",
      photos: 16,
    },
    faqs: [
      { q: "Will gypsum ceiling get damaged if it accidentally gets wet once?", qHi: "अगर गलती से एक बार गीला हो जाए तो gypsum ceiling खराब हो जाएगी?", a: "A one-off splash that's wiped up quickly is usually fine. What damages gypsum is standing moisture or repeated steam — that's why we simply don't install it in bathrooms or kitchens, regardless of how the room looks otherwise.", aHi: "एक बार का छींटा जो जल्दी पोंछ दिया जाए, आमतौर पर ठीक रहता है। असली नुकसान तब होता है जब लगातार नमी या भाप लगती रहे — इसी वजह से हम इसे बाथरूम या किचन में नहीं लगाते, चाहे कमरा कितना भी अच्छा क्यों न लगे।" },
      { q: "Can I get gypsum ceiling and cove lighting done on a tight budget?", qHi: "कम बजट में भी gypsum ceiling और cove lighting हो सकती है?", a: "Yes — a plain gypsum ceiling without cove detailing starts at the base ₹80/sq.ft rate. Cove lighting adds roughly ₹40–80 per running foot of the border, not the whole ceiling area, so you can add it to just the main wall and skip it elsewhere.", aHi: "हां — बिना cove के प्लेन gypsum ceiling ₹80/sq.ft से शुरू होती है। Cove lighting पूरी सीलिंग पर नहीं, सिर्फ बॉर्डर की running फुट पर ₹40–80 अतिरिक्त लगती है, तो आप सिर्फ मुख्य दीवार पर लगवा कर बाकी जगह छोड़ सकते हैं।" },
      { q: "How is gypsum different from POP (Plaster of Paris)?", qHi: "Gypsum, POP से कैसे अलग है?", a: "POP is wet plaster applied directly by hand, so its finish depends heavily on the mason's skill and it takes longer to dry and cure. Gypsum board is a factory-made panel screwed onto a frame — the finish is more uniform, installation is faster, and it's easier to later remove a section for repair without redoing the whole ceiling.", aHi: "POP सीधे हाथ से लगाया गया गीला प्लास्टर होता है, इसकी फिनिश मिस्त्री के हुनर पर निर्भर करती है और सूखने में समय लगता है। जिप्सम बोर्ड फैक्ट्री में बना पैनल है जो फ्रेम पर स्क्रू होता है — फिनिश ज़्यादा uniform होती है, इंस्टॉलेशन तेज़ होता है, और बाद में सिर्फ एक हिस्सा निकालकर रिपेयर करना भी आसान होता है।" },
      { q: "Does gypsum ceiling reduce room height noticeably?", qHi: "क्या gypsum ceiling से कमरे की ऊंचाई कम हो जाती है?", a: "A flat gypsum ceiling typically drops the height by 3–4 inches for the frame and board. If your room already has low ceilings, tell us before the site visit — we'll suggest a shallower frame or recommend PVC instead, which needs less drop.", aHi: "एक flat gypsum ceiling आमतौर पर फ्रेम और बोर्ड की वजह से 3–4 इंच ऊंचाई कम करती है। अगर आपके कमरे की ऊंचाई पहले से कम है, तो साइट विज़िट से पहले बताएं — हम कम drop वाला फ्रेम या PVC सुझाएंगे, जिसमें कम जगह चाहिए।" },
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
    taglineHi: "फारबिसगंज के सबसे ज़्यादा किचन-बाथरूम में यही लगती है",
    heroImage: "/images/pvc-ceiling.jpg",
    heroImageAlt: "Waterproof PVC false ceiling installation in a Bihar kitchen by JK Interior",
    galleryCategory: "PVC Ceiling",
    price: "₹80–₹140/sq.ft",
    premiumPrice: "₹90–₹150/sq.ft for designer wood/marble-print textures",
    installTime: "1 room in a day, full home in 3–4 days",
    maintenance: "Zero — wipe with a damp cloth, never needs repainting",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "PVC (Polyvinyl Chloride) false ceiling is built from hollow, interlocking plastic panels that clip into a wooden or GI batten grid fixed a few inches below your slab. The panels are 100% sealed plastic through and through, so unlike gypsum there's no board core that can absorb moisture — the material itself doesn't care whether the room is wet or dry.",
    whatItIsHi:
      "PVC (Polyविनाइल क्लोराइड) फॉल्स सीलिंग खोखले, आपस में इंटरलॉक होने वाले प्लास्टिक पैनल से बनती है, जो स्लैब से कुछ इंच नीचे लकड़ी या GI बैटन ग्रिड में क्लिप होते हैं। पैनल पूरी तरह सील्ड प्लास्टिक होते हैं, तो जिप्सम की तरह इसमें कोई ऐसा कोर नहीं है जो नमी सोख ले — मटेरियल को फर्क नहीं पड़ता कि कमरा गीला है या सूखा।",
    whereUsed: [
      "Kitchens and bathrooms — this is the one ceiling material we never hesitate to recommend here",
      "Balconies and any semi-open area exposed to rain",
      "Shops, workshops, and small offices where budget and durability both matter",
      "Any room at all, honestly — it's the most versatile option on this list",
    ],
    whereUsedHi: [
      "किचन और बाथरूम — यही एक ऐसी सीलिंग है जिसकी हम बिना झिझक सलाह देते हैं",
      "बालकनी और बारिश आने वाली कोई भी अर्ध-खुली जगह",
      "दुकान, वर्कशॉप और छोटे ऑफिस जहां बजट और मजबूती दोनों ज़रूरी हैं",
      "सच कहें तो कोई भी कमरा — यह सबसे versatile विकल्प है",
    ],
    whereNotUsed: [
      "Nowhere, structurally — but living rooms that want a complex cove/POP profile suit gypsum better",
      "Rooms where you specifically want a paintable ceiling you'll recolour every few years",
    ],
    whereNotUsedHi: [
      "मजबूती के लिहाज से कहीं मना नहीं — पर जिन हॉल में कोव/POP जैसा जटिल डिज़ाइन चाहिए, वहां gypsum बेहतर रहेगी",
      "जहां आप हर कुछ साल में सीलिंग का रंग बदलना चाहते हों — वहां paintable gypsum बेहतर विकल्प है",
    ],
    benefits: [
      "100% waterproof — safe for bathroom, kitchen, and balcony without any caveats",
      "Termite-proof and insect-resistant by nature of being plastic",
      "Zero maintenance — a damp cloth is the entire care routine",
      "Never needs repainting, and holds its finish for 20+ years",
      "Fastest ceiling to install and the most affordable per sq.ft on our list",
    ],
    benefitsHi: [
      "100% वॉटरप्रूफ — बाथरूम, किचन, बालकनी में बिना किसी चिंता के लगती है",
      "प्लास्टिक होने की वजह से टर्माइट और कीड़ों से पूरी तरह सुरक्षित",
      "ज़ीरो मेंटेनेंस — बस गीले कपड़े से पोंछना ही काफी है",
      "कभी रंग-रोगन की ज़रूरत नहीं, 20+ साल तक फिनिश वैसी ही रहती है",
      "सबसे तेज़ इंस्टॉलेशन और हमारी लिस्ट में सबसे किफायती सीलिंग",
    ],
    limitations: [
      "Simpler design vocabulary — no complex cove or curved profiles like gypsum can do",
      "Cannot be repainted; the colour/texture you choose is what you'll have for its life",
      "A cracked panel needs replacement, not just a patch — though matching panels are easy to source",
      "Slightly less 'premium' visual read in a formal drawing room compared to a finished gypsum ceiling",
    ],
    limitationsHi: [
      "डिज़ाइन के विकल्प gypsum जितने नहीं — जटिल cove या घुमावदार शेप नहीं बन सकते",
      "दोबारा पेंट नहीं हो सकती; जो रंग/टेक्सचर चुनेंगे वही जीवनभर रहेगा",
      "टूटा हुआ पैनल सिर्फ पैच नहीं होता, बदलना पड़ता है — हालांकि मिलता-जुलता पैनल आसानी से मिल जाता है",
      "फॉर्मल ड्रॉइंग रूम में gypsum जितना premium लुक नहीं देता",
    ],
    materials: [
      { name: "PVC ceiling panels", nameHi: "PVC सीलिंग पैनल", detail: "Tongue-and-groove interlocking panels, available in plain white, wood-grain, marble-print and glossy finishes", detailHi: "आपस में इंटरलॉक होने वाले पैनल, सफेद, वुड-ग्रेन, मार्बल-प्रिंट और ग्लॉसी फिनिश में उपलब्ध" },
      { name: "GI/wooden batten frame", nameHi: "GI/लकड़ी की बैटन फ्रेम", detail: "Perimeter and support battens the panels clip or screw onto", detailHi: "पेरीमीटर और सपोर्ट बैटन जिनमें पैनल क्लिप या स्क्रू होते हैं" },
      { name: "Corner beading & trims", nameHi: "कॉर्नर बीडिंग और ट्रिम्स", detail: "PVC edge profiles that give a clean, finished border where the ceiling meets the wall", detailHi: "PVC एज प्रोफाइल जो दीवार से मिलने वाले किनारे को साफ और फिनिश्ड लुक देते हैं" },
    ],
    installSteps: [
      { title: "Measurement & marking", titleHi: "माप और मार्किंग", desc: "Room dimensions confirmed, drop-height line marked on all four walls.", descHi: "कमरे की नाप कन्फर्म होती है, चारों दीवारों पर ड्रॉप-हाइट लाइन मार्क होती है।" },
      { title: "Perimeter batten fixing", titleHi: "पेरीमीटर बैटन फिक्सिंग", desc: "A wooden or GI batten is fixed along the wall at the marked line to carry the panel edges.", descHi: "मार्क की गई लाइन पर दीवार में लकड़ी या GI बैटन लगाई जाती है जो पैनल के किनारों को सहारा देती है।" },
      { title: "Support grid fixing", titleHi: "सपोर्ट ग्रिड फिक्सिंग", desc: "Center support channels are anchored to the slab so panels don't sag over a large span.", descHi: "बड़े स्पैन में पैनल न झुकें, इसके लिए सेंटर सपोर्ट चैनल स्लैब में एंकर किए जाते हैं।" },
      { title: "Panel fixing", titleHi: "पैनल फिक्सिंग", desc: "Panels are cut to length and clipped into the grid one by one, tongue-and-groove interlocked.", descHi: "पैनल को नाप के हिसाब से काटकर एक-एक करके ग्रिड में क्लिप किया जाता है, tongue-and-groove से जुड़ते हैं।" },
      { title: "Beading & corner finish", titleHi: "बीडिंग और कॉर्नर फिनिश", desc: "Edge beading is fixed all around so the join with the wall looks clean from any angle.", descHi: "दीवार से जुड़ाव साफ दिखे इसके लिए चारों तरफ एज बीडिंग लगाई जाती है।" },
      { title: "Light cutouts", titleHi: "लाइट कटआउट", desc: "Openings for downlights or exhaust fans are cut and fittings wired in.", descHi: "डाउनलाइट या एग्जॉस्ट फैन के लिए कटआउट काटे जाते हैं और फिटिंग वायर की जाती है।" },
      { title: "Final wipe & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "No paint stage needed — the panels are wiped clean and the ceiling is ready to use immediately.", descHi: "पेंट का कोई स्टेज नहीं — पैनल पोंछकर सीलिंग तुरंत इस्तेमाल के लिए तैयार हो जाती है।" },
    ],
    realProject: {
      title: "Wood-texture PVC ceiling, Araria kitchen",
      titleHi: "वुड-टेक्सचर PVC सीलिंग, अररिया किचन",
      desc: "A full kitchen-and-adjoining-balcony PVC ceiling finished in a single day, wood-texture panels chosen specifically so it wouldn't look 'plastic' from the dining table.",
      descHi: "पूरी किचन और सटी बालकनी की PVC सीलिंग एक ही दिन में पूरी हुई — वुड-टेक्सचर पैनल खासतौर पर इसलिए चुने गए ताकि डाइनिंग टेबल से देखने पर 'प्लास्टिक जैसा' न लगे।",
      photos: 13,
    },
    faqs: [
      { q: "Is PVC ceiling actually 100% waterproof, or just water-resistant?", qHi: "क्या PVC ceiling सच में 100% waterproof है, या सिर्फ पानी से थोड़ा बचाती है?", a: "It's genuinely 100% waterproof — the panel itself is solid PVC, so there's no absorbent core to soak up moisture the way a gypsum board would. Direct splashing, steam, or humidity doesn't affect the panel material at all.", aHi: "यह सच में 100% waterproof है — पैनल खुद ठोस PVC है, इसमें जिप्सम बोर्ड जैसा कोई absorbent कोर नहीं जो नमी सोख ले। सीधा पानी लगना, भाप या नमी — पैनल के मटेरियल पर कोई असर नहीं करते।" },
      { q: "Will PVC ceiling look cheap compared to gypsum in my hall?", qHi: "क्या हॉल में PVC ceiling gypsum के मुकाबले सस्ती दिखेगी?", a: "In a formal hall where you want cove lighting and a fully custom profile, gypsum reads more premium — that's honestly why we still recommend it there. But for kitchens, bathrooms, bedrooms, and most rooms, our better wood/marble-texture PVC panels look genuinely upscale and most customers can't tell the difference from three feet away.", aHi: "जहां हॉल में cove lighting और पूरी तरह कस्टम प्रोफाइल चाहिए, वहां gypsum ज़्यादा premium दिखती है — इसीलिए हम वहां gypsum ही सुझाते हैं। लेकिन किचन, बाथरूम, बेडरूम और ज़्यादातर कमरों में हमारे अच्छे वुड/मार्बल-टेक्सचर PVC पैनल सच में महंगे दिखते हैं, और ज़्यादातर ग्राहक तीन फुट की दूरी से फर्क नहीं बता पाते।" },
      { q: "Can termites or borewell water seepage damage PVC ceiling?", qHi: "क्या termite या borewell सीपेज से PVC ceiling खराब हो सकती है?", a: "No — termites don't eat plastic, and seepage simply runs off the panel surface rather than being absorbed. The one thing to watch is the wooden batten frame behind the panels if untreated wood is used; we use treated battens or GI channel specifically to rule that out.", aHi: "नहीं — termite प्लास्टिक नहीं खाते, और सीपेज पैनल की सतह से बह जाता है, सोखा नहीं जाता। एक चीज़ जो ध्यान रखनी है वो है पीछे की लकड़ी की बैटन, अगर वो untreated हो — इसीलिए हम treated बैटन या GI चैनल इस्तेमाल करते हैं ताकि यह समस्या ही न आए।" },
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
    taglineHi: "ऑफिस, दुकान और क्लिनिक के लिए commercial standard सीलिंग",
    heroImage: "/images/grid.jpg",
    heroImageAlt: "T-grid mineral fibre false ceiling installed in a commercial office by JK Interior",
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹90/sq.ft",
    premiumPrice: "₹70–₹110/sq.ft with acoustic-rated or edge-lit tiles",
    installTime: "1–2 days for a standard room, 3–4 days for a larger office/shop floor",
    maintenance: "Very low — occasional dusting; a stained tile can be swapped individually",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Grid ceiling (also called T-grid or lay-in ceiling) is a suspended metal grid of main runners and cross-tees, hung from the slab on GI wires, into which lightweight tiles — mineral fibre, PVC, or gypsum — simply drop in from below. Nothing is glued or screwed to the tiles themselves, which is exactly what makes it the standard choice wherever wiring or AC ductwork above the ceiling needs future access.",
    whatItIsHi:
      "ग्रिड सीलिंग (T-grid या lay-in सीलिंग भी कहते हैं) एक मेटल ग्रिड है — मेन रनर और क्रॉस-टी — जो GI वायर से स्लैब में लटकाया जाता है, और इसमें हल्के टाइल (मिनरल फाइबर, PVC या जिप्सम) नीचे से बस रखे जाते हैं। टाइल में कुछ भी चिपकाया या स्क्रू नहीं होता — इसी वजह से जहां ऊपर वायरिंग या AC डक्ट में भविष्य में एक्सेस चाहिए, वहां यह सबसे standard विकल्प है।",
    whereUsed: [
      "Offices, corporate cabins, and coworking spaces",
      "Shops, showrooms, and retail counters",
      "Clinics, diagnostic centres, and small hospitals — mineral fibre tiles are easy to sanitise and replace",
      "Godowns, workshops, and any space with AC ducting or wiring that needs periodic access",
    ],
    whereUsedHi: [
      "ऑफिस, कॉर्पोरेट केबिन और coworking स्पेस",
      "दुकान, शोरूम और रिटेल काउंटर",
      "क्लिनिक, डायग्नोस्टिक सेंटर और छोटे अस्पताल — मिनरल फाइबर टाइल साफ करना और बदलना आसान",
      "गोदाम, वर्कशॉप और वो कोई भी जगह जहां AC डक्टिंग या वायरिंग तक बार-बार पहुंचना पड़े",
    ],
    whereNotUsed: [
      "Formal living rooms or bedrooms where a seamless, premium look matters more than serviceability",
      "Bathrooms or areas with continuous moisture — standard mineral fibre tiles absorb damp and sag",
      "Very low-height rooms — the grid + tile combination needs a few inches more drop than PVC",
    ],
    whereNotUsedHi: [
      "फॉर्मल लिविंग रूम या बेडरूम जहां seamless, प्रीमियम लुक ज़्यादा मायने रखता है",
      "बाथरूम या लगातार नमी वाली जगह — आम मिनरल फाइबर टाइल नमी सोखकर झुक जाती है",
      "बहुत कम ऊंचाई वाले कमरे — ग्रिड + टाइल के लिए PVC से थोड़ी ज़्यादा ड्रॉप-हाइट चाहिए",
    ],
    benefits: [
      "Any single tile can be lifted out and replaced in minutes — no other ceiling type services this easily",
      "Excellent for spaces with AC ducting, sprinklers, or wiring that needs periodic access above the ceiling",
      "Acoustic-rated tiles are available where echo/noise control matters (open offices, waiting areas)",
      "Fastest ceiling type to install per sq.ft on a large open floor",
      "Most economical option for large commercial areas",
    ],
    benefitsHi: [
      "कोई भी टाइल मिनटों में निकालकर बदली जा सकती है — किसी और सीलिंग में इतनी आसान सर्विसिंग नहीं",
      "AC डक्टिंग, स्प्रिंकलर या वायरिंग तक बार-बार पहुंचने वाली जगहों के लिए बेहतरीन",
      "Acoustic-rated टाइल भी मिलते हैं जहां शोर/गूंज कम करनी हो (खुले ऑफिस, वेटिंग एरिया)",
      "बड़े खुले फ्लोर पर प्रति वर्ग फुट सबसे तेज़ इंस्टॉलेशन",
      "बड़े कमर्शियल एरिया के लिए सबसे किफायती विकल्प",
    ],
    limitations: [
      "Visible grid lines — this is a practical, not a decorative ceiling, and it looks it",
      "Standard mineral fibre tiles aren't waterproof and will sag if they get wet",
      "Needs slightly more ceiling drop than PVC, which matters in already-low rooms",
      "Less design flexibility — no cove lighting, no curved profiles",
    ],
    limitationsHi: [
      "ग्रिड की लाइनें दिखती हैं — यह एक practical सीलिंग है, decorative नहीं, और वैसी ही दिखती है",
      "आम मिनरल फाइबर टाइल वॉटरप्रूफ नहीं होती, गीली होने पर झुक जाती है",
      "PVC से थोड़ी ज़्यादा ड्रॉप-हाइट चाहिए, जो पहले से कम ऊंचाई वाले कमरों में समस्या बन सकती है",
      "डिज़ाइन के विकल्प कम — cove lighting या घुमावदार शेप संभव नहीं",
    ],
    materials: [
      { name: "GI T-grid runners & cross-tees", nameHi: "GI T-ग्रिड रनर और क्रॉस-टी", detail: "Galvanised steel grid, suspended from the slab on adjustable GI hanger wires", detailHi: "गैल्वनाइज़्ड स्टील ग्रिड, स्लैब से एडजस्टेबल GI हैंगर वायर पर लटकाया जाता है" },
      { name: "Mineral fibre / PVC / gypsum tiles", nameHi: "मिनरल फाइबर / PVC / जिप्सम टाइल", detail: "Standard 2x2 ft lay-in tiles — mineral fibre for offices/clinics, PVC where some moisture resistance is needed", detailHi: "स्टैंडर्ड 2x2 फुट टाइल — ऑफिस/क्लिनिक के लिए मिनरल फाइबर, थोड़ी नमी वाली जगह के लिए PVC" },
      { name: "Perimeter wall angle", nameHi: "पेरीमीटर वॉल एंगल", detail: "L-shaped angle fixed along the wall at ceiling height that the grid rests on at the edges", detailHi: "दीवार पर ceiling height पर लगा L-आकार का एंगल, जिस पर किनारों पर ग्रिड टिकता है" },
    ],
    installSteps: [
      { title: "Level marking", titleHi: "लेवल मार्किंग", desc: "Ceiling drop height marked on the walls all around the room or floor.", descHi: "कमरे या फ्लोर के चारों ओर दीवारों पर ceiling drop height मार्क की जाती है।" },
      { title: "Wall angle fixing", titleHi: "वॉल एंगल फिक्सिंग", desc: "The perimeter L-angle is screwed to the wall along the marked line.", descHi: "मार्क की गई लाइन पर दीवार में पेरीमीटर L-एंगल स्क्रू किया जाता है।" },
      { title: "Grid suspension", titleHi: "ग्रिड सस्पेंशन", desc: "Main T-runners are hung from the slab on GI wires at standard spacing, then cross-tees click into place to form the grid squares.", descHi: "मेन T-रनर तय दूरी पर GI वायर से स्लैब में लटकाए जाते हैं, फिर क्रॉस-टी उनमें क्लिक होकर ग्रिड के चौकोर खाने बनाते हैं।" },
      { title: "Grid levelling", titleHi: "ग्रिड लेवलिंग", desc: "Every wire is fine-adjusted so the whole grid sits dead level before any tile goes in.", descHi: "टाइल लगाने से पहले हर वायर को fine-adjust करके पूरे ग्रिड को बिल्कुल level किया जाता है।" },
      { title: "Tile placement", titleHi: "टाइल प्लेसमेंट", desc: "Tiles are lifted and dropped into each grid square from below.", descHi: "टाइल को नीचे से उठाकर हर ग्रिड खाने में रखा जाता है।" },
      { title: "Fixtures & diffusers", titleHi: "फिक्स्चर और डिफ्यूज़र", desc: "Light fittings, AC diffusers, and sprinkler heads are positioned within grid modules — this is the step grid ceiling makes easiest of all ceiling types.", descHi: "लाइट फिटिंग, AC डिफ्यूज़र और स्प्रिंकलर हेड ग्रिड के खानों में लगाए जाते हैं — यह काम ग्रिड सीलिंग में सबसे आसान होता है।" },
      { title: "Final check & handover", titleHi: "फाइनल जांच और हैंडओवर", desc: "Every tile checked for a snug, level fit before handover.", descHi: "हैंडओवर से पहले हर टाइल को अच्छे से फिट और level चेक किया जाता है।" },
    ],
    realProject: {
      title: "Clinic waiting-area ceiling, Araria",
      titleHi: "क्लिनिक वेटिंग-एरिया सीलिंग, अररिया",
      desc: "A 400 sq.ft diagnostic centre floor fitted with acoustic mineral-fibre grid ceiling — tiles were chosen specifically so any future AC or wiring work wouldn't mean breaking open the ceiling.",
      descHi: "400 वर्ग फुट के डायग्नोस्टिक सेंटर फ्लोर में acoustic मिनरल-फाइबर ग्रिड सीलिंग लगाई गई — टाइल खासतौर पर इसलिए चुनी गई ताकि भविष्य में AC या वायरिंग के काम के लिए सीलिंग तोड़नी न पड़े।",
      photos: 7,
    },
    faqs: [
      { q: "Why would I choose grid ceiling over gypsum for my office?", qHi: "ऑफिस के लिए gypsum की जगह grid ceiling क्यों चुनें?", a: "If your office has AC ducting, electrical conduits, or plumbing running above the ceiling that might need servicing later, grid ceiling lets an electrician lift one tile and get in without touching the rest of the ceiling. Gypsum looks more premium but means cutting into the board for any future access.", aHi: "अगर आपके ऑफिस में AC डक्टिंग, इलेक्ट्रिकल कंड्यूट या प्लंबिंग सीलिंग के ऊपर से गुज़रती है जिसे बाद में सर्विस करना पड़ सकता है, तो grid ceiling में इलेक्ट्रीशियन सिर्फ एक टाइल उठाकर बाकी सीलिंग को छुए बिना काम कर सकता है। Gypsum ज़्यादा प्रीमियम दिखती है लेकिन भविष्य में एक्सेस के लिए बोर्ड काटना पड़ता है।" },
      { q: "Are grid ceiling tiles waterproof?", qHi: "क्या grid ceiling की टाइल waterproof होती है?", a: "Standard mineral fibre tiles are not — they'll sag if they stay wet. If your space has any moisture exposure, we'll fit PVC lay-in tiles into the same grid instead, which handle damp without a problem.", aHi: "स्टैंडर्ड मिनरल फाइबर टाइल waterproof नहीं होती — लगातार गीली रहने पर झुक जाती है। अगर आपकी जगह में नमी की संभावना है, तो हम उसी ग्रिड में PVC lay-in टाइल लगा देते हैं, जो नमी में भी ठीक रहती है।" },
      { q: "Can grid ceiling be used in a home, or is it only for offices?", qHi: "क्या grid ceiling घर में भी लगती है, या सिर्फ ऑफिस के लिए है?", a: "It's mostly chosen for commercial spaces because of the visible grid lines, but a few customers do use it in a home store-room, garage workspace, or a rented shop-cum-home setup where budget and easy future access matter more than a decorative finish.", aHi: "आमतौर पर इसे कमर्शियल जगहों के लिए चुना जाता है क्योंकि ग्रिड लाइनें दिखती हैं, लेकिन कुछ ग्राहक इसे घर के स्टोर-रूम, गैरेज वर्कस्पेस या किराए की दुकान-सह-घर वाली सेटअप में भी लगाते हैं, जहां बजट और भविष्य में आसान एक्सेस, दिखावटी फिनिश से ज़्यादा ज़रूरी हो।" },
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
    taglineHi: "स्लैब या फर्श छुए बिना एक कमरे को दो हिस्सों में बांटें",
    heroImage: "/images/partition-wall.jpg",
    heroImageAlt: "Gypsum board partition wall dividing an office cabin, installed by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹110–₹180/sq.ft (gypsum board partition) · ₹380–₹650/sq.ft (framed glass partition)",
    premiumPrice: "₹550–₹750/sq.ft for frosted/fluted-film glass partitions with a flush door",
    installTime: "2–4 days depending on wall length and whether it's gypsum or glass",
    maintenance: "Gypsum side: repaint every 5–7 years. Glass side: wipe with glass cleaner.",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A partition wall creates a new dividing wall inside an existing room without any masonry work on the floor or slab. We build it one of two ways: a gypsum board partition — metal stud framing floor-to-ceiling with gypsum board fixed on both faces, finished like a normal wall — or a glass partition, an aluminium-framed toughened-glass screen that divides space while keeping light and sightlines open.",
    whatItIsHi:
      "पार्टीशन वॉल किसी मौजूदा कमरे के अंदर, बिना फर्श या स्लैब में मेसनरी (ईंट-गारा) का काम किए, एक नई विभाजक दीवार बनाती है। हम इसे दो तरीकों से बनाते हैं: gypsum board partition — फर्श से छत तक मेटल स्टड फ्रेमिंग जिसके दोनों तरफ जिप्सम बोर्ड लगाकर एक सामान्य दीवार जैसा फिनिश किया जाता है — या glass partition — एल्युमिनियम फ्रेम में toughened glass की स्क्रीन, जो जगह बांटती है पर रोशनी और नज़र को खुला रखती है।",
    whereUsed: [
      "Office cabins carved out of one open floor",
      "Reception areas separated from the working floor with glass",
      "A large bedroom split to make a study nook or a walk-in wardrobe (gypsum partition)",
      "Shops that need a stockroom or billing counter separated from the sales floor",
    ],
    whereUsedHi: [
      "एक खुले ऑफिस फ्लोर से अलग किए गए केबिन",
      "ग्लास से वर्किंग फ्लोर से अलग किया गया रिसेप्शन एरिया",
      "बड़े बेडरूम को स्टडी नुक या वॉक-इन वार्डरोब बनाने के लिए बांटना (gypsum partition)",
      "दुकान में सेल्स फ्लोर से अलग स्टॉकरूम या बिलिंग काउंटर बनाना",
    ],
    whereNotUsed: [
      "Load-bearing situations where the partition is expected to support structural weight — these are non-structural walls only",
      "Full-height glass partitions in a home with small children without safety film — we'll fit safety-laminated glass instead",
      "Wet-area boundaries (bathroom walls) — use a masonry wall or PVC panel system there, not a dry partition",
    ],
    whereNotUsedHi: [
      "ऐसी जगह जहां partition को structural वज़न सहना पड़े — यह सिर्फ non-structural दीवार है",
      "छोटे बच्चों वाले घर में बिना safety film के फुल-हाइट ग्लास पार्टीशन — वहां हम safety-laminated ग्लास लगाते हैं",
      "गीली जगह की बाउंड्री (बाथरूम की दीवार) — वहां मेसनरी दीवार या PVC पैनल सिस्टम इस्तेमाल करें, dry पार्टीशन नहीं",
    ],
    benefits: [
      "No masonry, no wet work, no long curing time — a room can be split in days, not weeks",
      "Gypsum partitions take paint, wallpaper, or wall-mounted units exactly like a normal wall",
      "Glass partitions keep a room feeling open and let daylight travel between spaces",
      "Both types are removable — easier to reconfigure later than a brick wall if your layout needs change",
      "Acoustic infill (rockwool) can be added inside a gypsum partition for real sound reduction between cabins",
    ],
    benefitsHi: [
      "कोई मेसनरी नहीं, गीला काम नहीं, लंबा curing time नहीं — कमरा हफ्तों नहीं, दिनों में बंट जाता है",
      "Gypsum partition पर पेंट, वॉलपेपर या दीवार पर लगने वाली चीज़ें बिल्कुल सामान्य दीवार जैसे लगती हैं",
      "Glass partition कमरे को खुला रखती है और रोशनी को एक जगह से दूसरी जगह जाने देती है",
      "दोनों प्रकार हटाए जा सकते हैं — भविष्य में लेआउट बदलना हो तो ईंट की दीवार से आसान",
      "Gypsum partition के अंदर acoustic infill (rockwool) डालकर केबिनों के बीच सच में शोर कम किया जा सकता है",
    ],
    limitations: [
      "Not a structural wall — cannot bear building loads",
      "Gypsum side is not waterproof, same rule as gypsum ceiling — keep it out of wet zones",
      "Glass partitions cost noticeably more than gypsum for the same wall area",
      "Sound isolation on a plain (non-acoustic) gypsum partition is moderate, not soundproof-grade",
    ],
    limitationsHi: [
      "यह structural दीवार नहीं है — इमारत का वज़न नहीं सह सकती",
      "Gypsum साइड वॉटरप्रूफ नहीं है, gypsum ceiling जैसा ही नियम — गीली जगह में न लगाएं",
      "समान दीवार क्षेत्र के लिए glass partition, gypsum से काफी महंगा पड़ता है",
      "साधारण (non-acoustic) gypsum partition में sound isolation moderate होती है, पूरी तरह soundproof नहीं",
    ],
    materials: [
      { name: "Metal stud framing", nameHi: "मेटल स्टड फ्रेमिंग", detail: "Floor and ceiling track with vertical studs at standard spacing — the skeleton of a gypsum partition", detailHi: "फर्श और छत की ट्रैक के साथ तय दूरी पर वर्टिकल स्टड — gypsum partition का ढांचा" },
      { name: "Gypsum board (both faces)", nameHi: "जिप्सम बोर्ड (दोनों तरफ)", detail: "12.5mm boards fixed on each side of the frame, taped and finished like a wall", detailHi: "फ्रेम के दोनों तरफ 12.5mm बोर्ड लगाकर टेप और फिनिश किया जाता है, सामान्य दीवार की तरह" },
      { name: "Rockwool acoustic infill (optional)", nameHi: "रॉकवूल एकॉस्टिक इनफिल (वैकल्पिक)", detail: "Sound-absorbing insulation packed inside the stud cavity when noise reduction matters", detailHi: "जब noise कम करना ज़रूरी हो, तो स्टड के बीच खाली जगह में साउंड-सोखने वाला insulation भरा जाता है" },
      { name: "Toughened glass + aluminium frame", nameHi: "टफन्ड ग्लास + एल्युमिनियम फ्रेम", detail: "8–12mm toughened glass in an aluminium channel frame, plain, frosted, or with a fluted film finish", detailHi: "एल्युमिनियम चैनल फ्रेम में 8–12mm टफन्ड ग्लास, plain, frosted या fluted फिल्म फिनिश में" },
    ],
    installSteps: [
      { title: "Layout marking", titleHi: "लेआउट मार्किंग", desc: "The exact partition line is marked on the floor and ceiling, including any door opening.", descHi: "फर्श और छत पर पार्टीशन की सही लाइन मार्क की जाती है, दरवाज़े की जगह समेत।" },
      { title: "Track & stud fixing (gypsum) / channel fixing (glass)", titleHi: "ट्रैक और स्टड फिक्सिंग (gypsum) / चैनल फिक्सिंग (glass)", desc: "For gypsum: floor/ceiling tracks go up first, then vertical studs at set spacing. For glass: aluminium U-channels are fixed floor to ceiling.", descHi: "Gypsum के लिए: पहले फर्श/छत की ट्रैक लगती है, फिर तय दूरी पर वर्टिकल स्टड। Glass के लिए: फर्श से छत तक एल्युमिनियम U-चैनल फिक्स होते हैं।" },
      { title: "Acoustic infill (if specified)", titleHi: "एकॉस्टिक इनफिल (अगर तय हो)", desc: "Rockwool is packed into the stud cavity before the second face closes, for real sound reduction between cabins.", descHi: "दूसरा फेस बंद होने से पहले स्टड के बीच रॉकवूल भरा जाता है, ताकि केबिनों के बीच सच में शोर कम हो।" },
      { title: "Board fixing / glass fitting", titleHi: "बोर्ड फिक्सिंग / ग्लास फिटिंग", desc: "Gypsum boards are screwed onto both faces of the frame, or glass panels are lowered into the aluminium channel.", descHi: "फ्रेम के दोनों तरफ जिप्सम बोर्ड स्क्रू होते हैं, या ग्लास पैनल को एल्युमिनियम चैनल में नीचे उतारा जाता है।" },
      { title: "Door frame fitting (if included)", titleHi: "दरवाज़े का फ्रेम फिटिंग (अगर शामिल हो)", desc: "A door frame and hardware are fitted into the marked opening.", descHi: "मार्क की गई जगह पर दरवाज़े का फ्रेम और हार्डवेयर फिट किया जाता है।" },
      { title: "Jointing/sealing & finishing", titleHi: "जॉइंटिंग/सीलिंग और फिनिशिंग", desc: "Gypsum: joints taped and puttied, then painted. Glass: joints silicone-sealed for a clean edge.", descHi: "Gypsum: जोड़ों पर टेप-पुट्टी लगाकर पेंट किया जाता है। Glass: साफ किनारे के लिए जोड़ों पर सिलिकॉन सील लगाई जाती है।" },
      { title: "Final clean & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "Surface cleaned, door checked for smooth operation, warranty document handed over.", descHi: "सतह साफ की जाती है, दरवाज़ा ठीक से खुलता-बंद होता है यह जांचा जाता है, वारंटी दी जाती है।" },
    ],
    realProject: {
      title: "Two-cabin office split, Forbesganj",
      titleHi: "दो-केबिन ऑफिस विभाजन, फारबिसगंज",
      desc: "A single 300 sq.ft rented office floor split into two private cabins and a shared reception using a rockwool-filled gypsum partition for the cabins and a frosted-film glass screen for the reception, keeping the front area feeling open.",
      descHi: "300 वर्ग फुट के किराए के ऑफिस फ्लोर को rockwool भरे gypsum partition से दो प्राइवेट केबिन और frosted-film glass स्क्रीन से एक साझा रिसेप्शन में बांटा गया, ताकि सामने का हिस्सा खुला-खुला महसूस हो।",
      photos: 20,
    },
    faqs: [
      { q: "Can a partition wall support a wall-mounted TV or shelves?", qHi: "क्या पार्टीशन वॉल पर TV या शेल्फ लगाई जा सकती है?", a: "Yes, if we know in advance — we add extra wooden/metal backing blocking inside the frame at the exact height you'll mount things, so the screws bite into solid backing rather than just the board. Tell us this at the site-visit stage.", aHi: "हां, अगर पहले से पता हो — हम फ्रेम के अंदर उसी ऊंचाई पर लकड़ी/मेटल की extra backing लगा देते हैं जहां आप चीज़ें लगाना चाहते हैं, ताकि स्क्रू सिर्फ बोर्ड में नहीं, ठोस backing में लगे। यह बात साइट-विज़िट के समय ही बता दें।" },
      { q: "How much sound does a gypsum partition actually block?", qHi: "Gypsum partition असल में कितना शोर रोकती है?", a: "A plain double-layer gypsum partition cuts down normal conversation noise noticeably but isn't soundproof. Adding rockwool infill inside the cavity improves it meaningfully — enough for adjacent office cabins, not enough for a recording studio.", aHi: "साधारण डबल-लेयर gypsum partition सामान्य बातचीत का शोर काफी हद तक कम कर देती है, पर पूरी तरह soundproof नहीं होती। खाली जगह में rockwool डालने से यह काफी बेहतर हो जाता है — बगल के ऑफिस केबिन के लिए काफी, पर रिकॉर्डिंग स्टूडियो के लिए नहीं।" },
      { q: "Is glass partition safe with kids around?", qHi: "क्या घर में बच्चे हों तो glass partition सुरक्षित है?", a: "We use toughened glass as standard, which breaks into small blunt pieces rather than sharp shards if it ever cracks. For homes with young children we additionally recommend a safety-laminated film on the glass — ask for it specifically when we quote.", aHi: "हम स्टैंडर्ड में toughened glass इस्तेमाल करते हैं, जो टूटने पर तेज़ धार वाले टुकड़ों की जगह छोटे-कुंद टुकड़ों में टूटता है। छोटे बच्चों वाले घरों के लिए हम अतिरिक्त safety-laminated फिल्म की भी सलाह देते हैं — quote लेते समय इसके लिए खासतौर पर पूछें।" },
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
    taglineHi: "असली लकड़ी जैसा लुक, टिम्बर पैनलिंग से करीब 60% कम कीमत में",
    heroImage: "/images/wpc.jpg",
    heroImageAlt: "WPC fluted wall panel TV wall installation in Bihar by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹450/sq.ft",
    premiumPrice: "₹350–₹600/sq.ft for premium fluted/louvre designs with LED backlight",
    installTime: "1 day for a TV wall accent, 2–3 days for a full room",
    maintenance: "Wipe with a dry cloth — no polish or varnish, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "WPC (Wood Plastic Composite) wall panels are made from recycled wood fibre bonded with polymer resin, then finished with a wood-grain, fluted, or grooved surface. They clip onto vertical battens fixed to the wall — no nails visible on the face — and because the core is part-plastic, they don't warp, swell, or attract termites the way solid wood does in a humid Bihar climate.",
    whatItIsHi:
      "WPC (वुड प्लास्टिक कम्पोजिट) वॉल पैनल रीसाइकल्ड लकड़ी के रेशों को पॉलिमर रेज़िन से जोड़कर बनते हैं, फिर वुड-ग्रेन, फ्लूटेड या ग्रूव्ड सतह में फिनिश किए जाते हैं। ये दीवार पर लगी वर्टिकल बैटन में क्लिप होते हैं — सामने कोई कील नहीं दिखती — और कोर आधा-प्लास्टिक होने की वजह से, बिहार की नमी वाली जलवायु में ये असली लकड़ी की तरह न मुड़ते हैं, न फूलते हैं, न इनमें दीमक लगती है।",
    whereUsed: [
      "TV wall / accent wall in the living room",
      "Bedroom headboard wall",
      "Office reception and cabin walls",
      "Hotel lobby and restaurant feature walls",
    ],
    whereUsedHi: [
      "लिविंग रूम की TV वॉल / एक्सेंट वॉल",
      "बेडरूम की हेडबोर्ड दीवार",
      "ऑफिस रिसेप्शन और केबिन की दीवार",
      "होटल लॉबी और रेस्टोरेंट की फीचर वॉल",
    ],
    whereNotUsed: [
      "Ceilings — WPC is a wall product; use PVC or gypsum overhead instead",
      "Fully submerged or constantly-wet surfaces — it's moisture-resistant, not built for standing water",
      "Load-bearing or structural applications — it's a cladding finish, not a wall itself",
    ],
    whereNotUsedHi: [
      "सीलिंग — WPC दीवार का प्रोडक्ट है; ऊपर के लिए PVC या gypsum इस्तेमाल करें",
      "पूरी तरह डूबी रहने वाली या लगातार गीली सतह — यह moisture-resistant है, खड़े पानी के लिए नहीं",
      "Load-bearing या structural इस्तेमाल — यह क्लैडिंग फिनिश है, खुद दीवार नहीं",
    ],
    benefits: [
      "Premium wood look at roughly 60% of the cost of real timber panelling",
      "Moisture and termite resistant — genuinely outlasts real wood in a monsoon climate",
      "Zero maintenance — no polish, no varnish, ever needed",
      "Clip-fix installation with no visible nails or screws on the face",
      "Available in 50+ colours and textures, including trending fluted/louvre profiles",
    ],
    benefitsHi: [
      "असली टिम्बर पैनलिंग से करीब 60% कम कीमत में प्रीमियम लकड़ी जैसा लुक",
      "नमी और दीमक प्रतिरोधी — मानसून वाली जलवायु में असली लकड़ी से ज़्यादा टिकाऊ",
      "ज़ीरो मेंटेनेंस — कभी पॉलिश या वार्निश की ज़रूरत नहीं",
      "क्लिप-फिक्स इंस्टॉलेशन, सामने कोई कील या स्क्रू नहीं दिखता",
      "50+ रंग और टेक्सचर उपलब्ध, ट्रेंडिंग fluted/louvre प्रोफाइल समेत",
    ],
    limitations: [
      "Costs more per sq.ft than UV marble sheet for a comparable wall area",
      "Limited custom shaping compared to gypsum — it's a flat/fluted panel system, not a mouldable surface",
      "A deeply gouged panel needs replacement of that section, not a touch-up repair",
    ],
    limitationsHi: [
      "समान दीवार क्षेत्र के लिए UV मार्बल शीट से प्रति वर्ग फुट ज़्यादा महंगा",
      "Gypsum के मुकाबले कस्टम शेपिंग सीमित — यह flat/fluted पैनल सिस्टम है, ढलने वाली सतह नहीं",
      "गहरा खरोंच या चोट लगे पैनल को touch-up से नहीं, उस हिस्से को बदलकर ठीक किया जाता है",
    ],
    materials: [
      { name: "WPC panel board", nameHi: "WPC पैनल बोर्ड", detail: "Wood-fibre + polymer composite core, in plain, wood-grain, fluted, or 3D-textured surface finishes", detailHi: "वुड-फाइबर + पॉलिमर कम्पोजिट कोर, plain, वुड-ग्रेन, fluted या 3D टेक्सचर सतह फिनिश में" },
      { name: "Vertical batten/clip system", nameHi: "वर्टिकल बैटन/क्लिप सिस्टम", detail: "Battens fixed to the wall at set spacing; panels clip in without face-fixing", detailHi: "दीवार पर तय दूरी पर लगी बैटन; पैनल बिना सामने से fix किए क्लिप हो जाते हैं" },
      { name: "Edge/corner trims", nameHi: "एज/कॉर्नर ट्रिम्स", detail: "Matching-finish trims that close off panel edges and internal/external corners cleanly", detailHi: "मैचिंग फिनिश वाले ट्रिम्स जो पैनल के किनारों और कोनों को साफ-सुथरा बंद करते हैं" },
    ],
    installSteps: [
      { title: "Wall check", titleHi: "दीवार की जांच", desc: "The wall is checked for dryness and any plaster cracks are filled before framing starts.", descHi: "फ्रेमिंग शुरू करने से पहले दीवार सूखी है या नहीं जांचा जाता, और प्लास्टर की दरारें भरी जाती हैं।" },
      { title: "Batten fixing", titleHi: "बैटन फिक्सिंग", desc: "Vertical (or horizontal, per design) battens are fixed to the wall at standard spacing.", descHi: "डिज़ाइन के अनुसार वर्टिकल (या हॉरिज़ॉन्टल) बैटन तय दूरी पर दीवार में फिक्स होती हैं।" },
      { title: "Panel cutting & clipping", titleHi: "पैनल कटिंग और क्लिपिंग", desc: "Panels are cut to size and clip-fixed onto the battens one after another, tongue-and-groove aligned.", descHi: "पैनल को नाप के हिसाब से काटकर बैटन में एक-एक करके क्लिप किया जाता है, tongue-and-groove से मिलाकर।" },
      { title: "LED backlight wiring (if in design)", titleHi: "LED बैकलाइट वायरिंग (अगर डिज़ाइन में हो)", desc: "Wiring for backlit panels is routed behind the panel before the last section closes.", descHi: "बैकलिट पैनल की वायरिंग आखिरी हिस्सा बंद होने से पहले पैनल के पीछे से निकाली जाती है।" },
      { title: "Corner & edge trims", titleHi: "कॉर्नर और एज ट्रिम्स", desc: "Matching trims close off every exposed edge for a factory-finished look.", descHi: "हर खुले किनारे पर मैचिंग ट्रिम लगाकर फैक्ट्री-फिनिश जैसा लुक दिया जाता है।" },
      { title: "Final wipe & handover", titleHi: "फाइनल सफाई और हैंडओवर", desc: "Panels wiped clean; no drying or curing time needed before the wall is ready to use.", descHi: "पैनल पोंछकर साफ किए जाते हैं; इस्तेमाल से पहले सूखने या curing का कोई इंतज़ार नहीं करना पड़ता।" },
    ],
    realProject: {
      title: "Fluted TV wall with LED backlight, Jogbani",
      titleHi: "LED बैकलाइट के साथ Fluted TV वॉल, जोगबनी",
      desc: "A 12 ft living-room TV wall in walnut-tone fluted WPC panelling with a hidden LED strip along the top edge — finished and ready to mount the TV the same day.",
      descHi: "लिविंग रूम की 12 फुट TV वॉल walnut-टोन fluted WPC पैनलिंग में, ऊपरी किनारे पर छुपी LED स्ट्रिप के साथ — उसी दिन तैयार, TV लगाने के लिए रेडी।",
      photos: 20,
    },
    faqs: [
      { q: "Does WPC panelling really look like real wood, or is it obviously plastic?", qHi: "क्या WPC पैनलिंग सच में असली लकड़ी जैसी दिखती है, या साफ प्लास्टिक जैसी लगती है?", a: "The better wood-grain and fluted textures we install genuinely read as real wood from normal viewing distance — most customers who touch it before buying are surprised it isn't timber. We always show a physical sample at the site visit so you can judge it yourself, not just from a photo.", aHi: "हम जो बेहतर वुड-ग्रेन और fluted टेक्सचर लगाते हैं, वे सामान्य दूरी से देखने पर सच में असली लकड़ी जैसे लगते हैं — खरीदने से पहले छूकर देखने वाले ज़्यादातर ग्राहक हैरान होते हैं कि यह टिम्बर नहीं है। हम साइट विज़िट पर हमेशा असली सैंपल दिखाते हैं ताकि आप सिर्फ फोटो से नहीं, खुद देखकर तय कर सकें।" },
      { q: "How much would a standard TV wall cost?", qHi: "एक सामान्य TV वॉल में कितना खर्च आएगा?", a: "A typical 10x10 ft TV wall (100 sq.ft) in mid-range fluted WPC panelling works out to roughly ₹18,000–₹30,000 including battens, trims, and basic LED backlight wiring — the exact figure depends on the texture you pick.", aHi: "एक सामान्य 10x10 फुट (100 वर्ग फुट) की TV वॉल, मिड-रेंज fluted WPC पैनलिंग में लगभग ₹18,000–₹30,000 में बन जाती है, जिसमें बैटन, ट्रिम्स और बेसिक LED बैकलाइट वायरिंग शामिल है — सटीक आंकड़ा चुने गए टेक्सचर पर निर्भर करता है।" },
      { q: "Can WPC panels be installed over an existing tiled or painted wall?", qHi: "क्या पहले से लगी टाइल या पेंट वाली दीवार पर भी WPC पैनल लग सकते हैं?", a: "Yes — since the panels clip onto battens rather than bonding directly to the wall surface, we can fix battens straight over sound tile or paint. We only need the underlying wall to be structurally solid, not perfectly smooth.", aHi: "हां — क्योंकि पैनल दीवार की सतह से सीधे चिपकने की बजाय बैटन में क्लिप होते हैं, हम मज़बूत टाइल या पेंट के ऊपर सीधे बैटन लगा सकते हैं। बस अंदर की दीवार मज़बूत होनी चाहिए, बिल्कुल smooth होना ज़रूरी नहीं।" },
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
    taglineHi: "पूजा घर और बाथरूम की दीवार के लिए मार्बल जैसा लुक, असली पत्थर से बहुत कम कीमत में",
    heroImage: "/images/uv-marble.jpg",
    heroImageAlt: "UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹50–₹95/sq.ft",
    premiumPrice: "₹80–₹120/sq.ft for premium veining/granite-print designs",
    installTime: "1–2 days per room",
    maintenance: "Zero — wipe with a damp cloth, no polishing ever needed",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "UV marble sheet is a high-gloss PVC-based panel with a marble or granite pattern printed and UV-cured onto the surface, then sealed under a scratch-resistant coating. It's bonded or clip-fixed directly onto a prepared wall, giving a seamless stone-like surface with no grout lines to blacken over time — at a fraction of what actual marble slab and installation would cost.",
    whatItIsHi:
      "UV मार्बल शीट एक हाई-ग्लॉस PVC-आधारित पैनल है, जिसकी सतह पर मार्बल या ग्रेनाइट का पैटर्न प्रिंट करके UV-क्योर किया जाता है, फिर स्क्रैच-रेजिस्टेंट कोटिंग से सील किया जाता है। इसे तैयार दीवार पर सीधे बॉन्ड या क्लिप-फिक्स किया जाता है, जिससे एक seamless पत्थर जैसी सतह मिलती है — जिसमें समय के साथ काली पड़ने वाली कोई ग्राउट लाइन नहीं, और असली मार्बल स्लैब व इंस्टॉलेशन से बहुत कम कीमत में।",
    whereUsed: [
      "Bathroom walls — no grout lines to blacken with mould, unlike tiles",
      "Kitchen walls away from direct flame (backsplash, side walls)",
      "Pooja room walls — the marble-print finish suits the traditional look most families want here",
      "Living room feature walls where a stone look is wanted without stone's weight or cost",
    ],
    whereUsedHi: [
      "बाथरूम की दीवार — टाइल की तरह काली पड़ने वाली ग्राउट लाइन नहीं",
      "सीधी आंच से दूर किचन की दीवार (बैकस्प्लैश, साइड वॉल)",
      "पूजा घर की दीवार — मार्बल-प्रिंट फिनिश ज़्यादातर परिवारों की पसंद वाले पारंपरिक लुक से मेल खाती है",
      "लिविंग रूम की फीचर वॉल जहां पत्थर के वज़न या कीमत के बिना पत्थर जैसा लुक चाहिए",
    ],
    whereNotUsed: [
      "Directly behind a gas stove or any high-heat surface — the PVC base isn't heat-rated",
      "Outdoor walls exposed to direct, harsh sunlight for years — UV print can fade faster than genuine stone outdoors",
      "Floors — this is a wall-cladding product, not a flooring material",
    ],
    whereNotUsedHi: [
      "सीधे गैस चूल्हे के पीछे या किसी भी तेज़ गर्मी वाली सतह पर — PVC बेस गर्मी सहने के लिए नहीं बना",
      "सालों तक सीधी तेज़ धूप वाली बाहरी दीवार — बाहर UV प्रिंट असली पत्थर से जल्दी फीका पड़ सकता है",
      "फर्श — यह दीवार पर लगाने का प्रोडक्ट है, फ्लोरिंग मटेरियल नहीं",
    ],
    benefits: [
      "Real marble/granite look at roughly 70–80% less cost than actual stone",
      "100% waterproof and moisture resistant — ideal for bathroom and kitchen walls",
      "No grout lines — a seamless look that stays clean far longer than tile",
      "Lightweight — no structural load added to the wall, unlike stone slab",
      "Scratch-resistant, hygienic, easy-clean surface",
    ],
    benefitsHi: [
      "असली मार्बल/ग्रेनाइट से करीब 70–80% कम कीमत में वही लुक",
      "100% वॉटरप्रूफ और नमी प्रतिरोधी — बाथरूम और किचन की दीवार के लिए आदर्श",
      "कोई ग्राउट लाइन नहीं — टाइल से कहीं ज़्यादा देर तक साफ-सुथरा दिखने वाला seamless लुक",
      "हल्का वज़न — पत्थर की स्लैब जैसे दीवार पर कोई structural भार नहीं",
      "स्क्रैच-रेजिस्टेंट, hygienic, आसानी से साफ होने वाली सतह",
    ],
    limitations: [
      "Not heat-resistant — keep it away from direct stove flame or very hot surfaces",
      "A deep scratch from a sharp object will show, unlike polished stone which can be re-ground",
      "Less premium resale perception than genuine natural stone, if that specifically matters to you",
    ],
    limitationsHi: [
      "गर्मी सहने वाला नहीं — सीधे चूल्हे की आंच या बहुत गर्म सतह से दूर रखें",
      "किसी नुकीली चीज़ से गहरी खरोंच लग जाए तो दिखती है, जबकि पॉलिश्ड पत्थर को दोबारा घिसा जा सकता है",
      "अगर resale में असली पत्थर वाला प्रीमियम टैग खास मायने रखता हो, तो यह उतना premium महसूस नहीं होता",
    ],
    materials: [
      { name: "UV-printed PVC marble sheet", nameHi: "UV-प्रिंटेड PVC मार्बल शीट", detail: "High-gloss sheet with marble/granite pattern UV-cured onto the surface and sealed", detailHi: "हाई-ग्लॉस शीट जिसकी सतह पर मार्बल/ग्रेनाइट पैटर्न UV-क्योर करके सील किया गया है" },
      { name: "Marine-grade adhesive / clip channel", nameHi: "मरीन-ग्रेड चिपकाने वाला / क्लिप चैनल", detail: "Bonds or clip-fixes the sheet to a prepared wall depending on the surface", detailHi: "सतह के हिसाब से शीट को तैयार दीवार पर चिपकाता या क्लिप-फिक्स करता है" },
      { name: "Edge/corner beading", nameHi: "एज/कॉर्नर बीडिंग", detail: "Matching trims finish exposed edges and internal corners for a seamless read", detailHi: "मैचिंग ट्रिम खुले किनारों और अंदरूनी कोनों को seamless लुक देते हैं" },
    ],
    installSteps: [
      { title: "Wall preparation", titleHi: "दीवार की तैयारी", desc: "The wall is cleaned, cracks filled, and levelled so the sheet bonds flat with no bubbling.", descHi: "दीवार साफ की जाती है, दरारें भरी जाती हैं और level की जाती है ताकि शीट बिना उभार के flat चिपके।" },
      { title: "Layout & cutting", titleHi: "लेआउट और कटिंग", desc: "Sheets are measured against the wall and cut so the pattern lines up cleanly at joints.", descHi: "दीवार के हिसाब से शीट नापी और काटी जाती है ताकि जोड़ों पर पैटर्न साफ-साफ मिले।" },
      { title: "Bonding / clip-fixing", titleHi: "बॉन्डिंग / क्लिप-फिक्सिंग", desc: "Sheets are adhered with marine-grade adhesive or clipped onto a channel system, per the wall type.", descHi: "दीवार के प्रकार के अनुसार शीट को मरीन-ग्रेड चिपकाने वाले से चिपकाया जाता है या चैनल सिस्टम में क्लिप किया जाता है।" },
      { title: "Joint alignment", titleHi: "जोड़ मिलान", desc: "Adjacent sheets are pressed and aligned so the marble veining reads as continuous, not obviously tiled.", descHi: "पास-पास की शीट को दबाकर इस तरह मिलाया जाता है कि मार्बल की नसें continuous दिखें, टाइल जैसी अलग-अलग नहीं।" },
      { title: "Edge beading", titleHi: "एज बीडिंग", desc: "Corners and exposed edges get a finishing bead so nothing looks unfinished.", descHi: "कोनों और खुले किनारों पर फिनिशिंग बीड लगाई जाती है ताकि कहीं अधूरा न लगे।" },
      { title: "Final polish & handover", titleHi: "फाइनल पॉलिश और हैंडओवर", desc: "A final wipe-down brings up the gloss; the wall is ready to use immediately, no curing wait.", descHi: "आखिरी बार पोंछने से ग्लॉस निखर आता है; दीवार तुरंत इस्तेमाल के लिए तैयार होती है, curing का इंतज़ार नहीं करना पड़ता।" },
    ],
    realProject: {
      title: "Pooja room marble-finish wall, Purnia",
      titleHi: "पूजा घर मार्बल-फिनिश दीवार, पूर्णिया",
      desc: "A small pooja room finished floor-to-ceiling in white-and-gold veined UV marble sheet with a recessed LED niche for the idol — completed in a single day with zero dust from cutting stone on-site.",
      descHi: "एक छोटा पूजा घर फर्श से छत तक सफेद-सुनहरी नसों वाली UV मार्बल शीट में फिनिश किया गया, मूर्ति के लिए एक recessed LED niche के साथ — एक ही दिन में पूरा, साइट पर पत्थर काटने की कोई धूल नहीं।",
      photos: 20,
    },
    faqs: [
      { q: "Can UV marble sheet be used on the wall right behind the kitchen stove?", qHi: "क्या रसोई के चूल्हे के ठीक पीछे UV मार्बल शीट लगाई जा सकती है?", a: "We avoid the wall immediately behind the flame — direct heat over time can affect the PVC base. For that specific strip we recommend ceramic tile or a metal splashback, and UV marble on the rest of the kitchen walls.", aHi: "हम आंच के ठीक पीछे की दीवार पर नहीं लगाते — लगातार सीधी गर्मी से PVC बेस पर असर पड़ सकता है। उस खास हिस्से के लिए हम ceramic टाइल या मेटल स्प्लैशबैक सुझाते हैं, और रसोई की बाकी दीवारों पर UV मार्बल।" },
      { q: "Does UV marble sheet need grout like tiles do?", qHi: "क्या टाइल की तरह UV मार्बल शीट में भी ग्राउट लगती है?", a: "No — sheets are fitted edge-to-edge with the pattern aligned, so there's no grout line at all. That's actually one of its biggest advantages over tile: no grout means no line that turns black with mould over the years.", aHi: "नहीं — शीट को किनारे से किनारे तक पैटर्न मिलाकर लगाया जाता है, इसमें कोई ग्राउट लाइन ही नहीं होती। यही इसका टाइल पर सबसे बड़ा फायदा है: कोई ग्राउट नहीं तो सालों में काली पड़ने वाली कोई लाइन भी नहीं।" },
      { q: "How does UV marble sheet compare to WPC panels for a wall?", qHi: "दीवार के लिए UV मार्बल शीट, WPC पैनल से कैसे अलग है?", a: "UV marble gives a stone/marble look and is fully waterproof at a lower price; WPC gives a wood look and is moisture-resistant (not fully submersible) at a higher price. For a bathroom or pooja wall we lean UV marble; for a TV wall or bedroom accent, WPC.", aHi: "UV मार्बल पत्थर/मार्बल जैसा लुक देती है और कम कीमत में पूरी तरह वॉटरप्रूफ है; WPC लकड़ी जैसा लुक देती है और थोड़ी ज़्यादा कीमत में moisture-resistant (पूरी तरह डूबने लायक नहीं) है। बाथरूम या पूजा दीवार के लिए हम UV मार्बल सुझाते हैं; TV वॉल या बेडरूम एक्सेंट के लिए WPC।" },
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
    taglineHi: "आपकी दीवार की सही नाप पर बना — कैटलॉग टेम्पलेट से काटकर नहीं",
    heroImage: "/images/tv-unit.jpg",
    heroImageAlt: "Custom modular TV unit with LED backlight installed by JK Interior in Bihar",
    galleryCategory: "TV Unit Design",
    price: "₹15,000 onwards (basic)",
    premiumPrice: "₹30,000–₹60,000+ for premium designs with LED backlight and extended storage",
    installTime: "3–5 days depending on size and design complexity",
    maintenance: "Wipe with a dry cloth; avoid placing hot items directly on the surface",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A modular TV unit is a custom-built cabinet system — carcass, shutters, open shelves, and laminate or veneer finish — fabricated to your exact wall width and TV size rather than assembled from a fixed-size showroom piece. Cable routing is built into the panel from the design stage, so wires from the TV, set-top box, and speakers disappear behind the unit instead of hanging in view.",
    whatItIsHi:
      "मॉड्यूलर TV यूनिट एक कस्टम-निर्मित कैबिनेट सिस्टम है — carcass, शटर, खुली शेल्फ और लैमिनेट या वीनियर फिनिश — जो आपकी दीवार की सही चौड़ाई और TV के साइज़ के हिसाब से बनाया जाता है, न कि किसी fixed-size शोरूम पीस से। केबल रूटिंग डिज़ाइन स्टेज से ही पैनल में शामिल की जाती है, ताकि TV, सेट-टॉप बॉक्स और स्पीकर के तार यूनिट के पीछे छुप जाएं, सामने लटकते न दिखें।",
    whereUsed: [
      "Living rooms — the focal wall opposite the main seating",
      "Bedrooms — a compact unit facing the bed",
      "Home theatre / media rooms with extra storage for AV equipment",
    ],
    whereUsedHi: [
      "लिविंग रूम — मुख्य बैठने की जगह के सामने वाली दीवार",
      "बेडरूम — बिस्तर के सामने एक compact यूनिट",
      "होम थिएटर / मीडिया रूम, जहां AV उपकरण के लिए अतिरिक्त स्टोरेज चाहिए",
    ],
    whereNotUsed: [
      "Damp or splash-prone walls (near a window that leaks, or an outdoor-facing balcony wall) — laminate/veneer finishes aren't built for standing moisture",
      "Walls you plan to reconfigure again soon — since it's custom-built to that exact wall, it isn't easily relocated to a different width",
    ],
    whereNotUsedHi: [
      "नमी या छींटे वाली दीवार (लीक करने वाली खिड़की के पास, या खुली बालकनी की दीवार) — लैमिनेट/वीनियर फिनिश खड़े पानी के लिए नहीं बनी",
      "जिस दीवार का लेआउट आप जल्द बदलने वाले हों — क्योंकि यह उसी दीवार की सही नाप पर बनी होती है, दूसरी चौड़ाई में आसानी से शिफ्ट नहीं होती",
    ],
    benefits: [
      "Fits your exact wall width — no gap on the sides like a bought-off-the-shelf unit",
      "Cable management built into the design — no visible wiring clutter",
      "Optional LED strip lighting for a premium, showroom-style look",
      "Mix of closed cabinets and open shelves, sized around what you actually need to store",
      "Finish, colour, and hardware are all chosen by you, not fixed by a catalogue",
    ],
    benefitsHi: [
      "आपकी दीवार की सही चौड़ाई में फिट — शोरूम से खरीदी यूनिट जैसा साइड में गैप नहीं",
      "डिज़ाइन में ही केबल मैनेजमेंट शामिल — तारों की कोई गड़बड़ी सामने नहीं दिखती",
      "प्रीमियम, शोरूम-जैसे लुक के लिए वैकल्पिक LED स्ट्रिप लाइटिंग",
      "बंद कैबिनेट और खुली शेल्फ का मिश्रण, आपकी असली स्टोरेज ज़रूरत के हिसाब से",
      "फिनिश, रंग और हार्डवेयर सब आप खुद चुनते हैं, कैटलॉग से तय नहीं होते",
    ],
    limitations: [
      "Fixed design — repositioning it to a different wall later usually isn't practical",
      "Takes longer to deliver than a ready-made unit since it's fabricated to order",
      "Higher cost than a basic showroom unit of similar size, for the customisation and cable management",
    ],
    limitationsHi: [
      "फिक्स्ड डिज़ाइन — बाद में इसे दूसरी दीवार पर शिफ्ट करना आमतौर पर व्यावहारिक नहीं",
      "ऑर्डर पर बनने की वजह से रेडीमेड यूनिट से डिलीवरी में ज़्यादा समय लगता है",
      "कस्टमाइज़ेशन और केबल मैनेजमेंट की वजह से समान साइज़ की बेसिक शोरूम यूनिट से ज़्यादा कीमत",
    ],
    materials: [
      { name: "Plywood/MDF carcass", nameHi: "प्लाईवुड/MDF कारकास", detail: "The structural box of the unit — plywood for higher load areas, MDF where a smoother laminate finish is wanted", detailHi: "यूनिट का ढांचा — ज़्यादा वज़न वाली जगह के लिए प्लाईवुड, smooth लैमिनेट फिनिश के लिए MDF" },
      { name: "Laminate / veneer finish", nameHi: "लैमिनेट / वीनियर फिनिश", detail: "Surface finish in matte, glossy, or wood-veneer options across dozens of colours", detailHi: "मैट, ग्लॉसी या वुड-वीनियर फिनिश, दर्जनों रंगों में उपलब्ध" },
      { name: "Soft-close hardware", nameHi: "सॉफ्ट-क्लोज़ हार्डवेयर", detail: "Hinges and drawer channels that close silently and don't slam over years of use", detailHi: "टिका और दराज़ चैनल जो चुपचाप बंद होते हैं, सालों इस्तेमाल के बाद भी पटकते नहीं" },
      { name: "LED strip + driver (optional)", nameHi: "LED स्ट्रिप + ड्राइवर (वैकल्पिक)", detail: "Backlight fitted along shelf edges or the back panel for a floating, showroom effect", detailHi: "शेल्फ के किनारों या पीछे के पैनल पर लगी बैकलाइट, floating शोरूम जैसा असर देती है" },
    ],
    installSteps: [
      { title: "Site measurement", titleHi: "साइट माप", desc: "Exact wall width, height, TV size, and existing socket/switch positions are measured.", descHi: "दीवार की सही चौड़ाई, ऊंचाई, TV का साइज़ और मौजूदा सॉकेट/स्विच की जगह नापी जाती है।" },
      { title: "Design finalisation", titleHi: "डिज़ाइन फाइनल करना", desc: "Layout, finish, colour, and LED options are agreed with you before fabrication starts.", descHi: "फैब्रिकेशन शुरू होने से पहले लेआउट, फिनिश, रंग और LED के विकल्प आपके साथ तय किए जाते हैं।" },
      { title: "Module fabrication", titleHi: "मॉड्यूल फैब्रिकेशन", desc: "Carcass panels are cut, edge-banded, and laminated to the agreed finish, either at our workshop or on-site.", descHi: "carcass पैनल काटे जाते हैं, एज-बैंड किए जाते हैं और तय फिनिश में लैमिनेट किए जाते हैं, हमारी वर्कशॉप या साइट पर।" },
      { title: "Wall bracket/batten fixing", titleHi: "वॉल ब्रैकेट/बैटन फिक्सिंग", desc: "Mounting battens are fixed to the wall at the correct height for the unit to hang or rest on.", descHi: "यूनिट टिकाने या लटकाने के लिए सही ऊंचाई पर दीवार में माउंटिंग बैटन फिक्स की जाती है।" },
      { title: "Module installation", titleHi: "मॉड्यूल इंस्टॉलेशन", desc: "Modules are installed and levelled, with the cable-management channel routed behind the panel.", descHi: "मॉड्यूल को इंस्टॉल और level किया जाता है, केबल-मैनेजमेंट चैनल पैनल के पीछे से निकाली जाती है।" },
      { title: "Hardware & LED fitting", titleHi: "हार्डवेयर और LED फिटिंग", desc: "Hinges, drawer channels, and any LED backlight wiring are fitted and tested.", descHi: "टिका, दराज़ चैनल और कोई भी LED बैकलाइट वायरिंग फिट करके टेस्ट की जाती है।" },
      { title: "Final polish & handover", titleHi: "फाइनल पॉलिश और हैंडओवर", desc: "Surfaces polished, shutters checked for smooth operation, warranty document handed over.", descHi: "सतहें पॉलिश की जाती हैं, शटर ठीक से खुलते-बंद होते हैं यह जांचा जाता है, वारंटी दी जाती है।" },
    ],
    realProject: {
      title: "10 ft floating LED TV unit, Forbesganj",
      titleHi: "10 फुट फ्लोटिंग LED TV यूनिट, फारबिसगंज",
      desc: "A wall-mounted 10 ft unit with a floating centre shelf, hidden LED strip, and closed side cabinets sized specifically to store an existing set-top box and router out of sight.",
      descHi: "10 फुट की दीवार पर लगी यूनिट, बीच में floating शेल्फ, छुपी LED स्ट्रिप, और साइड में बंद कैबिनेट खासतौर पर मौजूदा सेट-टॉप बॉक्स और राउटर को नज़र से छुपाने के लिए बनाई गई।",
      photos: 8,
    },
    faqs: [
      { q: "How long before the TV unit is ready after I confirm the design?", qHi: "डिज़ाइन कन्फर्म करने के बाद TV यूनिट कितने दिन में तैयार होगी?", a: "Once the design and finish are locked in, fabrication and installation together typically take 3–5 days depending on size — a simple 6–8 ft unit is faster, a large unit with extensive LED work and storage takes closer to 5 days.", aHi: "डिज़ाइन और फिनिश तय होने के बाद, साइज़ के अनुसार फैब्रिकेशन और इंस्टॉलेशन मिलाकर आमतौर पर 3–5 दिन लगते हैं — साधारण 6–8 फुट यूनिट जल्दी बन जाती है, बड़ी यूनिट जिसमें ज़्यादा LED वर्क और स्टोरेज हो, उसमें करीब 5 दिन लगते हैं।" },
      { q: "Can the TV unit be designed to hide the router, set-top box, and cables completely?", qHi: "क्या TV यूनिट में राउटर, सेट-टॉप बॉक्स और तार पूरी तरह छुपाए जा सकते हैं?", a: "Yes, that's exactly what the cable-management channel is for. We route a hollow channel behind the panel from the wall socket up to a vented compartment, so the router and set-top box sit inside the unit with just the remote sensor left visible.", aHi: "हां, केबल-मैनेजमेंट चैनल इसी काम के लिए है। हम दीवार के सॉकेट से एक vented कम्पार्टमेंट तक पैनल के पीछे एक खोखली चैनल निकालते हैं, ताकि राउटर और सेट-टॉप बॉक्स यूनिट के अंदर रहें और सिर्फ रिमोट सेंसर बाहर दिखे।" },
      { q: "What size TV unit is right for a 10x12 ft living room?", qHi: "10x12 फुट के लिविंग रूम के लिए कौन सा साइज़ TV यूनिट सही रहेगा?", a: "For a room that size, an 8–10 ft wide unit usually balances proportions well without overwhelming the wall. We confirm the exact size on-site against your actual wall and seating distance, not just the room's floor area.", aHi: "इतने साइज़ के कमरे के लिए 8–10 फुट चौड़ी यूनिट आमतौर पर सही अनुपात में रहती है, दीवार पर भारी नहीं लगती। हम सिर्फ कमरे के फ्लोर एरिया से नहीं, आपकी असली दीवार और बैठने की दूरी के हिसाब से साइट पर सही साइज़ तय करते हैं।" },
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
    taglineHi: "हमेशा हरी-भरी बालकनी और फीचर वॉल, जिसमें पानी देने की ज़रूरत नहीं",
    heroImage: "/images/artificial-grass.jpg",
    heroImageAlt: "Artificial grass balcony installation in Bihar by JK Interior",
    galleryCategory: "Artificial Grass",
    price: "₹40–₹120/sq.ft",
    premiumPrice: "₹90–₹150/sq.ft for higher pile-height, denser premium-grade turf",
    installTime: "Half a day to 1 day for a typical balcony or accent wall",
    maintenance: "Occasional rinse with water and a light brush of the fibres — no mowing, no watering, ever",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Artificial grass here is UV-stabilised synthetic turf, rolled out over a prepared, well-drained base for floor use, or mounted as pre-cut panels onto a batten frame for a green feature wall. The fibres are woven into a permeable backing so rainwater drains straight through rather than pooling, and the colour is UV-treated so it doesn't bleach out in direct North Bihar sun the way cheaper turf does within a season.",
    whatItIsHi:
      "यहां इस्तेमाल होने वाली आर्टिफिशियल घास UV-स्टेबलाइज़्ड सिंथेटिक टर्फ होती है, जिसे फर्श के लिए एक तैयार, अच्छी ड्रेनेज वाली बेस पर बिछाया जाता है, या ग्रीन फीचर वॉल के लिए पहले से कटे पैनल के रूप में बैटन फ्रेम पर लगाया जाता है। रेशे एक permeable बैकिंग में बुने जाते हैं ताकि बारिश का पानी जमा होने की बजाय सीधे निकल जाए, और रंग UV-ट्रीटेड होता है ताकि सस्ती टर्फ की तरह एक ही सीज़न में उत्तर बिहार की सीधी धूप में फीका न पड़े।",
    whereUsed: [
      "Balconies and terraces — an evergreen look with zero watering or mowing",
      "Feature walls in a living room or office reception for a green accent",
      "Small home gardens or rooftop seating corners",
      "Pet-friendly outdoor spaces where a real lawn is hard to maintain",
    ],
    whereUsedHi: [
      "बालकनी और टैरेस — बिना पानी दिए या काटे हमेशा हरा-भरा लुक",
      "लिविंग रूम या ऑफिस रिसेप्शन में ग्रीन एक्सेंट के लिए फीचर वॉल",
      "छोटे घर के गार्डन या छत पर बैठने की जगह",
      "पालतू जानवरों वाली आउटडोर जगह जहां असली लॉन बनाए रखना मुश्किल हो",
    ],
    whereNotUsed: [
      "Areas with poor or no drainage underneath — water will pool below the turf and smell over time; we fix drainage first or don't install there",
      "Directly under intense reflected heat (glass-facade reflections concentrated on one spot) — can soften the backing faster than normal sun exposure",
      "Indoor carpeted-floor replacement expecting a soft, cushioned feel — turf reads and feels different from carpet underfoot",
    ],
    whereNotUsedHi: [
      "जहां नीचे ड्रेनेज ठीक न हो या हो ही न — पानी टर्फ के नीचे जमा होकर समय के साथ बदबू कर सकता है; हम पहले ड्रेनेज ठीक करते हैं, वरना वहां नहीं लगाते",
      "सीधे तेज़ रिफ्लेक्टेड गर्मी में (जहां ग्लास-फेसाड की धूप एक ही जगह केंद्रित होती हो) — सामान्य धूप से ज़्यादा तेज़ी से बैकिंग को नरम कर सकता है",
      "इनडोर कारपेट की जगह नरम, cushioned एहसास की उम्मीद में — टर्फ पैरों के नीचे कारपेट से अलग महसूस होता है",
    ],
    benefits: [
      "Always green — no seasonal browning, no dependence on watering schedules",
      "Drains through rather than pooling, so it handles Bihar's monsoon downpours without turning to mud",
      "UV-resistant colour holds up under direct sun far longer than untreated turf",
      "Zero mowing, zero fertiliser, zero pest spraying",
      "Pet-friendly and comfortable underfoot compared to bare tile or concrete",
    ],
    benefitsHi: [
      "हमेशा हरा — मौसम के साथ पीला नहीं पड़ता, पानी देने के शेड्यूल पर निर्भर नहीं",
      "पानी जमा होने की बजाय सीधे निकल जाता है, इसलिए बिहार की मानसून बारिश में भी कीचड़ नहीं बनता",
      "UV-रेजिस्टेंट रंग untreated टर्फ से कहीं ज़्यादा देर तक सीधी धूप में टिकता है",
      "कोई कटाई नहीं, कोई खाद नहीं, कोई कीट स्प्रे नहीं",
      "पालतू जानवरों के लिए अनुकूल, नंगे टाइल या कंक्रीट से पैरों में ज़्यादा आरामदायक",
    ],
    limitations: [
      "Needs a properly drained base underneath — installing over poor drainage causes odour over time",
      "Can heat up noticeably underfoot in direct peak-afternoon summer sun, more than natural grass would",
      "Doesn't feel identical to a real, watered lawn — a fair trade for zero maintenance, but worth knowing upfront",
    ],
    limitationsHi: [
      "नीचे सही ड्रेनेज ज़रूरी है — खराब ड्रेनेज पर लगाने से समय के साथ बदबू आ सकती है",
      "गर्मी की दोपहर की सीधी धूप में यह असली घास से ज़्यादा गर्म हो सकती है",
      "असली, पानी दी गई घास जैसा बिल्कुल एहसास नहीं देती — ज़ीरो मेंटेनेंस के बदले एक उचित समझौता, पर पहले से जान लेना ठीक रहेगा",
    ],
    materials: [
      { name: "UV-stabilised synthetic turf", nameHi: "UV-स्टेबलाइज़्ड सिंथेटिक टर्फ", detail: "Polyethylene/polypropylene grass fibres tufted onto a permeable backing, in multiple pile heights", detailHi: "पॉलीएथिलीन/पॉलीप्रोपाइलीन घास के रेशे एक permeable बैकिंग में बुने गए, कई पाइल-हाइट में उपलब्ध" },
      { name: "Drainage underlay", nameHi: "ड्रेनेज अंडरले", detail: "A sand/gravel or perforated base layer laid beneath floor turf so rainwater passes through instead of pooling", detailHi: "फर्श वाली टर्फ के नीचे बिछाई गई रेत/बजरी या perforated बेस लेयर, ताकि बारिश का पानी जमा होने की बजाय निकल जाए" },
      { name: "Jointing tape / seam adhesive", nameHi: "जॉइंटिंग टेप / सीम एडहेसिव", detail: "Joins adjacent turf rolls invisibly so the lawn reads as one continuous surface", detailHi: "पास-पास बिछाई गई टर्फ रोल को इस तरह जोड़ता है कि पूरा लॉन एक जैसा continuous दिखे" },
    ],
    installSteps: [
      { title: "Surface & drainage check", titleHi: "सतह और ड्रेनेज जांच", desc: "The base is cleaned and checked for slope/drainage; a wall gets battens checked instead.", descHi: "बेस साफ करके ढलान/ड्रेनेज जांची जाती है; दीवार के लिए इसकी जगह बैटन चेक की जाती है।" },
      { title: "Underlay/base preparation", titleHi: "अंडरले/बेस तैयारी", desc: "For floors, a drainage underlay is laid down first; for walls, a batten frame is fixed.", descHi: "फर्श के लिए पहले ड्रेनेज अंडरले बिछाई जाती है; दीवार के लिए बैटन फ्रेम फिक्स की जाती है।" },
      { title: "Turf rolling / panel fixing", titleHi: "टर्फ रोलिंग / पैनल फिक्सिंग", desc: "Turf rolls are laid and cut to the exact boundary, or pre-cut panels are fixed to the wall frame.", descHi: "टर्फ रोल बिछाकर सही बाउंड्री पर काटी जाती है, या पहले से कटे पैनल दीवार के फ्रेम में फिक्स किए जाते हैं।" },
      { title: "Seam joining", titleHi: "सीम जोड़ना", desc: "Adjacent pieces are joined with tape/adhesive so the joint disappears into the pile.", descHi: "पास-पास के टुकड़ों को टेप/एडहेसिव से जोड़ा जाता है ताकि जोड़ घास के रेशों में छुप जाए।" },
      { title: "Edge fixing", titleHi: "एज फिक्सिंग", desc: "Edges are secured with U-pins, adhesive, or a border beading so they don't lift over time.", descHi: "किनारों को U-पिन, एडहेसिव या बॉर्डर बीडिंग से फिक्स किया जाता है ताकि समय के साथ न उठें।" },
      { title: "Final grooming & handover", titleHi: "फाइनल ग्रूमिंग और हैंडओवर", desc: "Fibres are brushed upright for a full, fresh-lawn look before handover.", descHi: "हैंडओवर से पहले रेशों को ब्रश करके सीधा खड़ा किया जाता है ताकि ताज़े लॉन जैसा भरा-भरा लुक मिले।" },
    ],
    realProject: {
      title: "Balcony lawn corner, Raniganj",
      titleHi: "बालकनी लॉन कॉर्नर, रानीगंज",
      desc: "A 60 sq.ft balcony fitted with a drained-base artificial lawn and a small potted-plant corner — the family's answer to wanting a garden feel without a floor-level flat to maintain one in.",
      descHi: "60 वर्ग फुट की बालकनी में drained-base आर्टिफिशियल लॉन और गमलों का एक छोटा कोना बनाया गया — फ्लोर-लेवल फ्लैट में बगीचे जैसा एहसास चाहने वाले परिवार का समाधान, बिना असली बगीचा बनाए रखने की मेहनत के।",
      photos: 7,
    },
    faqs: [
      { q: "Will artificial grass smell or grow mould in Bihar's monsoon?", qHi: "क्या बिहार के मानसून में आर्टिफिशियल घास से बदबू या फफूंद आएगी?", a: "Not if the base drains properly — that's the one thing we insist on checking before installation. Water needs a clear path to run off underneath; if your balcony floor doesn't already drain well, we fix or add drainage before laying the turf, not after.", aHi: "अगर बेस सही से drain करता हो तो नहीं — इंस्टॉलेशन से पहले हम यही एक चीज़ ज़रूर जांचते हैं। पानी को नीचे से निकलने का साफ रास्ता चाहिए; अगर आपकी बालकनी का फर्श पहले से अच्छी तरह drain नहीं करता, तो हम टर्फ बिछाने से पहले ड्रेनेज ठीक करते हैं, बाद में नहीं।" },
      { q: "How long does artificial grass actually last outdoors?", qHi: "आर्टिफिशियल घास बाहर असल में कितने साल चलती है?", a: "Good UV-stabilised turf typically holds its colour and pile for 5–8 years under regular sun exposure before it noticeably flattens or fades, depending on foot traffic. It's covered by our 1-year installation warranty; the material's own life runs well beyond that.", aHi: "अच्छी UV-स्टेबलाइज़्ड टर्फ सामान्य धूप में आमतौर पर 5–8 साल तक अपना रंग और उभार बनाए रखती है, इसके बाद चलने-फिरने की मात्रा के हिसाब से हल्की चपटी या फीकी पड़ सकती है। हमारी 1 साल की इंस्टॉलेशन वारंटी इसे कवर करती है; मटेरियल की अपनी उम्र उससे कहीं ज़्यादा होती है।" },
      { q: "Can artificial grass be used on a wall, not just the floor?", qHi: "क्या आर्टिफिशियल घास सिर्फ फर्श पर नहीं, दीवार पर भी लगाई जा सकती है?", a: "Yes — for a green feature wall we fix pre-cut turf panels onto a batten frame the same way we'd fix a WPC panel, so there's no drainage concern at all since it's vertical and dry.", aHi: "हां — ग्रीन फीचर वॉल के लिए हम पहले से कटे टर्फ पैनल को बैटन फ्रेम पर उसी तरह फिक्स करते हैं जैसे WPC पैनल लगाते हैं, इसमें ड्रेनेज की कोई चिंता ही नहीं होती क्योंकि यह वर्टिकल और सूखी जगह है।" },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "uv-marble-sheet"],
  },
]

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
