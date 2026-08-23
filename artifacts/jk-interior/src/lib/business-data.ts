export const WA_NUMBER = "918651070831"
export const CALL_NUMBER = "+918541849118"

// Google Business Profile — deep-links straight to the JK Interior listing on
// Google Maps (reviews included). Derived from the place CID in the embedded
// map on the contact section, so it always resolves to the verified profile.
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=12398820263168117030"

export interface LeadContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: string
  roomSize?: string
  memorySummary?: string  // full structured memory block from lib/memory.ts
}

// ─── Service Catalog (expanded) ─────────────────────────────────────────────

export const SERVICE_CATALOG = [
  {
    key: "gypsum",
    name: "Gypsum False Ceiling",
    emoji: "✨",
    priceRange: "₹75–₹210/sq.ft",
    highlights: "Elegant cove lighting, POP designs, smooth finish",
    bestFor: "Living rooms, bedrooms, dry areas",
    waterproof: false,
    keywords: ["gypsum", "pop", "plaster", "cove", "jipsum", "gypsum board", "false ceiling gypsum"],
  },
  {
    key: "pvc",
    name: "PVC False Ceiling",
    emoji: "🏠",
    priceRange: "₹75–₹150/sq.ft",
    highlights: "100% waterproof, termite-proof, low maintenance",
    bestFor: "Kitchens, bathrooms, any room",
    waterproof: true,
    keywords: ["pvc", "pvc ceiling", "plastic ceiling", "waterproof ceiling"],
  },
  {
    key: "wpc",
    name: "WPC Wall Panels",
    emoji: "🪵",
    priceRange: "₹180–₹650/sq.ft",
    highlights: "Eco-friendly wood-look, moisture resistant, luxury finish",
    bestFor: "Accent walls, TV panels, full room paneling",
    waterproof: true,
    keywords: ["wpc", "wall panel", "wood panel", "louver", "louver panel", "wood plastic composite"],
  },
  {
    key: "uv",
    name: "UV Marble Sheets",
    emoji: "💎",
    priceRange: "₹45–₹120/sq.ft",
    highlights: "High-gloss, scratch-resistant, hygienic surface",
    bestFor: "Walls, kitchen counters, feature areas",
    waterproof: true,
    keywords: ["uv", "marble", "marble sheet", "uv marble", "uv board", "glossy marble"],
  },
  {
    key: "tvunit",
    name: "Modular TV Unit",
    emoji: "📺",
    priceRange: "₹15,000–₹75,000+",
    highlights: "Custom designs, premium finish, cable management",
    bestFor: "Living rooms, bedrooms",
    waterproof: false,
    keywords: ["tv unit", "tv panel", "tv wall", "television", "tv cabinet", "entertainment unit"],
  },
  {
    key: "fluted",
    name: "Fluted / Louver Panels",
    emoji: "🏛️",
    priceRange: "₹200–₹500/sq.ft",
    highlights: "Modern textured look, 3D effect, trending design",
    bestFor: "Feature walls, reception areas, office lobbies",
    waterproof: false,
    keywords: ["fluted", "fluted panel", "ribbed", "3d panel", "grooved panel"],
  },
  {
    key: "grid",
    name: "Grid Ceiling",
    emoji: "🏢",
    priceRange: "₹45–₹115/sq.ft",
    highlights: "Commercial standard, easy maintenance, acoustic options",
    bestFor: "Offices, shops, hospitals, commercial spaces",
    waterproof: false,
    keywords: ["grid", "grid ceiling", "office ceiling", "mineral fiber", "t-grid", "false ceiling office"],
  },
  {
    key: "artificial-grass",
    name: "Artificial Grass",
    emoji: "🌿",
    priceRange: "₹40–₹150/sq.ft",
    highlights: "No maintenance, evergreen look, UV resistant",
    bestFor: "Balconies, terraces, wall decor, garden",
    waterproof: true,
    keywords: ["artificial grass", "grass", "turf", "green wall", "synthetic grass", "lawn"],
  },
  {
    key: "interior",
    name: "Complete Interior Design",
    emoji: "🏡",
    priceRange: "Custom quote",
    highlights: "Full home: ceiling + wall panels + TV unit + kitchen — one team, one timeline",
    bestFor: "New homes, full renovations",
    waterproof: false,
    keywords: ["complete interior", "full interior", "full home", "renovation", "poora ghar", "pura ghar", "bedroom interior", "office interior", "turnkey interior"],
  },
  // ─── New Service: Acoustic Panels ────────────────────────────────────────
  {
    key: "acoustic",
    name: "Acoustic Panels (Soundproof)",
    emoji: "🎧",
    priceRange: "₹150–₹400/sq.ft",
    highlights: "Reduces echo, improves sound quality, modern fabric finish",
    bestFor: "Home theatres, studios, conference rooms",
    waterproof: false,
    keywords: ["acoustic", "soundproof", "echo", "studio panel", "acoustic foam", "sound deadening"],
  },
  // ─── New Service: Wooden Laminate Flooring ───────────────────────────────
  {
    key: "flooring",
    name: "Wooden Laminate Flooring",
    emoji: "🪵",
    priceRange: "₹80–₹200/sq.ft",
    highlights: "Scratch resistant, easy to clean, real wood look",
    bestFor: "Bedrooms, living rooms, offices",
    waterproof: false,
    keywords: ["flooring", "laminate flooring", "wooden floor", "vinyl flooring", "floor", "flooring price"],
  },
]

// ─── Expanded Material Knowledge ───────────────────────────────────────────

export const MATERIAL_KNOWLEDGE = {
  gypsum: {
    fullName: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft (basic to premium design)",
    premiumPrice: "₹135–₹210/sq.ft with cove lighting + LED",
    description: "Gypsum Board की Ceiling हॉल और बेडरूम के लिए सबसे पसंदीदा है। यह प्लास्टर जैसी बिल्कुल स्मूथ फिनिश देती है, और इसमें Cove Design, POP बॉर्डर और मन-पसंद पैटर्न आसानी से बन जाते हैं।",
    pros: [
      "स्मूथ फिनिश — देखने में बिल्कुल प्रीमियम लगती है",
      "Cove Light और LED Strip के लिए सबसे बेहतरीन",
      "किसी भी रंग में पेंट करा सकते हैं",
      "आग से सुरक्षित — घर के लिए सेफ है",
      "आवाज़ भी थोड़ी कम करती है",
      "जो डिज़ाइन मन में हो, वो बन जाता है",
      "ड्राई कमरे में 10+ साल आराम से चलती है",
    ],
    cons: [
      "पानी से बचानी पड़ती है — बाथरूम-किचन में मत लगाइए",
      "नमी लगने पर खराब हो सकती है",
      "मरम्मत करने पर थोड़ा निशान दिख सकता है",
      "फिनिशिंग के साथ 3-5 दिन लग जाते हैं",
    ],
    bestFor: "हॉल, बेडरूम, ड्रॉइंग रूम, डाइनिंग एरिया, ऑफिस केबिन — जहां पानी नहीं आता",
    avoidIn: "बाथरूम, किचन, बाहर की जगह",
    installTime: "1 बेडरूम: 2-3 दिन | पूरा हॉल: 3-5 दिन",
    maintenance: "ज़्यादा कुछ नहीं करना — बस कभी-कभी झाड़ पोंछ लीजिए। हर 5-7 साल में एक बार पेंट करा लें।",
    warranty: "1 साल की लिखित Warranty (JK Interior की तरफ से)",
    hinglishFAQ: {
      "paani me kharab hoga": "हां भाई, Gypsum पानी नहीं झेल पाता। बाथरूम-किचन के लिए PVC ज़्यादा सही रहेगा। हॉल और बेडरूम के लिए Gypsum एकदम परफेक्ट है!",
      "kitna time lagega": "एक कमरे में 2-3 दिन लग जाएंगे। पूरे घर में 5-7 दिन।",
      "pop se kya difference": "Gypsum Board में पैनल लगते हैं, जबकि POP (Plaster of Paris) सीधे प्लास्टर से बनता है। Gypsum ज़्यादा स्मूथ, एक-सा और मॉडर्न दिखता है। हम दोनों तरह का काम करते हैं।",
    },
  },
  pvc: {
    fullName: "PVC False Ceiling",
    price: "₹75–₹150/sq.ft",
    premiumPrice: "₹120–₹150/sq.ft with designer textures",
    description: "PVC Panel की Ceiling 100% पानी रोकती है, इसलिए बाथरूम-किचन समेत हर कमरे के लिए एकदम सही रहती है। लकड़ी वाली, चमकदार, मैट और 3D डिज़ाइन में मिल जाती है।",
    pros: [
      "100% पानी का असर नहीं होता — बाथरूम, किचन में भी सेफ",
      "कीड़ा-मकोड़ा और घुन नहीं लगते",
      "कुछ करना नहीं पड़ता — बस पोंछ दीजिए",
      "कभी दोबारा पेंट नहीं करानी पड़ती",
      "उम्र बहुत लंबी — 20+ साल",
      "सबसे किफायती False Ceiling ऑप्शन",
      "लकड़ी, मार्बल और प्लेन टेक्सचर में मिल जाती है",
    ],
    cons: [
      "हॉल के लिए Gypsum जितना प्रीमियम लुक नहीं देती",
      "Gypsum जैसा कस्टम डिज़ाइन इसमें नहीं बनता",
      "सादा डिज़ाइन — बड़े Cove वाले शेप नहीं बन पाते",
    ],
    bestFor: "बाथरूम, किचन, बालकनी, दुकान, ऑफिस — कहीं भी लगा दीजिए, हर जगह चलेगी",
    avoidIn: "कहीं मना नहीं है — बस हॉल में लुक के लिए लोग Gypsum ज़्यादा पसंद करते हैं",
    installTime: "1 कमरा: 1 दिन | पूरा घर: 3-4 दिन",
    maintenance: "कुछ नहीं करना — बस गीले कपड़े से पोंछ दीजिए। पेंट की ज़रूरत ही नहीं पड़ती।",
    warranty: "1 साल की लिखित Warranty (JK Interior की तरफ से)",
    hinglishFAQ: {
      "waterproof hai kya": "हां भाई, 100% पानी का असर नहीं होता! बाथरूम, किचन — हर जगह बेफिक्र होकर लगवाइए।",
      "gypsum se sasta hai kya": "हां, PVC Gypsum से थोड़ा सस्ता पड़ता है और मेंटेनेंस का खर्च भी ज़ीरो है। लंबे समय में सबसे फायदे का सौदा है!",
      "kitne saal chalega": "20+ साल आराम से चल जाएगी। कभी दोबारा पेंट नहीं करानी, कभी खराब भी नहीं होती।",
    },
  },
  wpc: {
    fullName: "WPC Wall Panels",
    price: "₹180–₹650/sq.ft",
    premiumPrice: "₹390–₹650/sq.ft for premium fluted designs",
    description: "WPC (Wood Plastic Composite) Panel असली लकड़ी जैसा लुक देते हैं, लेकिन लकड़ी वाली झंझट नहीं। TV Wall, Accent Wall और पूरे कमरे की Paneling के लिए इस्तेमाल होते हैं — प्लेन, ग्रूव्ड और Fluted डिज़ाइन में मिल जाते हैं।",
    pros: [
      "असली लकड़ी से करीब 60% कम कीमत में वही प्रीमियम लुक",
      "नमी और कीड़े का असर नहीं — असली लकड़ी से ज़्यादा टिकते हैं",
      "रीसाइकल्ड मटेरियल से बनते हैं, पर्यावरण के लिए ठीक",
      "लगाना आसान है — कील नहीं, क्लिप से लग जाते हैं",
      "कभी पॉलिश-वार्निश नहीं कराना पड़ता",
      "50+ रंग और टेक्सचर में मिल जाते हैं",
      "आग भी जल्दी नहीं पकड़ती",
    ],
    cons: [
      "दीवार के लिए UV Marble से थोड़े महंगे पड़ते हैं",
      "Gypsum जैसा हर शेप में नहीं ढलते",
    ],
    bestFor: "TV Wall, बेडरूम की हेडबोर्ड वॉल, Accent Wall, लॉबी, ऑफिस रिसेप्शन",
    avoidIn: "Ceiling में नहीं — छत के लिए PVC या Gypsum ही सही रहेगा",
    installTime: "TV वॉल: 1 दिन | पूरा कमरा: 2-3 दिन",
    maintenance: "सूखे कपड़े से पोंछ दीजिए। पॉलिश-वार्निश की ज़रूरत ही नहीं, हमेशा के लिए बेफिक्र।",
    warranty: "1 साल की लिखित Warranty (JK Interior की तरफ से)",
    hinglishFAQ: {
      "asli lakdi se kya difference": "WPC असली लकड़ी जैसा ही दिखता है, लेकिन कीड़ा, नमी और मुड़ने-टेढ़े होने की टेंशन नहीं होती। ऊपर से 60% सस्ता भी है। लंबे समय में बहुत बेहतर सौदा है!",
      "tv wall ke liye": "TV Wall के लिए WPC सबसे अच्छा रहेगा! लकड़ी जैसा सुंदर टेक्सचर, वायर छुपाना भी आसान, और लुक एकदम प्रीमियम आता है।",
      "kitna mahnga hai": "WPC ₹180/sq.ft से शुरू होता है। एक TV वॉल (लगभग 40-50 sq.ft) पर डिज़ाइन के हिसाब से ₹8,000-₹15,000 तक लग सकता है।",
    },
  },
  uv: {
    fullName: "UV Marble Sheets",
    price: "₹45–₹120/sq.ft",
    premiumPrice: "₹80–₹120/sq.ft for premium designs",
    description: "UV Marble Sheet चमकदार PVC पैनल हैं जिन पर मार्बल जैसी प्रिंटिंग होती है। असली मार्बल-ग्रेनाइट जैसा लुक बहुत कम कीमत में मिल जाता है। दीवार, किचन एरिया और फीचर वॉल के लिए एकदम सही।",
    pros: [
      "असली मार्बल जैसा लुक, कीमत 70-80% तक कम",
      "ज़्यादा चमक — देखने में बहुत प्रीमियम लगता है",
      "100% पानी और नमी का असर नहीं होता",
      "जल्दी खरोंच नहीं आती",
      "साफ करना आसान — हाइजीनिक भी रहता है",
      "कोई जोड़ नहीं दिखता — बिल्कुल एक-सा फिनिश",
      "वज़न बहुत कम — छत-दीवार पर लोड नहीं पड़ता",
    ],
    cons: [
      "बहुत तेज़ गर्मी नहीं झेल पाता (गैस चूल्हे के पास मत लगाइए)",
      "असली मार्बल-ग्रेनाइट जितना प्रीमियम नहीं",
      "नुकीली चीज़ से खरोंच आ सकती है",
    ],
    bestFor: "बाथरूम की दीवार, किचन की दीवार (चूल्हे से दूर), लिविंग रूम की फीचर वॉल, पूजा घर",
    avoidIn: "गैस चूल्हे के पास / ज़्यादा गर्मी वाली जगह",
    installTime: "1 कमरा: 1-2 दिन",
    maintenance: "कुछ नहीं करना — बस गीले कपड़े से पोंछ दीजिए। पॉलिश की ज़रूरत नहीं।",
    warranty: "1 साल की लिखित Warranty (JK Interior की तरफ से)",
    hinglishFAQ: {
      "asli marble se kya fark": "UV Marble Sheet बिल्कुल असली मार्बल जैसी दिखती है, लेकिन वज़न ज़ीरो, कोई जोड़ नहीं दिखता, और कीमत 70-80% कम। किचन और बाथरूम के लिए सबसे अच्छा ऑप्शन है!",
      "waterproof hai": "हां भाई, बिल्कुल! 100% पानी का असर नहीं होता। बाथरूम में बेफिक्र होकर लगवाइए।",
    },
  },
  tvunit: {
    fullName: "Modular TV Unit",
    price: "₹15,000 se start (basic) | ₹46,000-₹75,000+ (premium)",
    description: "आपके कमरे की सही नाप पर बनी Custom Modular TV Unit। Wood Laminate, Matte, Glossy और मिक्स फिनिश में मिलती है — केबल छुपाने का इंतज़ाम, LED Backlight और स्टोरेज शेल्फ़ सब शामिल।",
    features: [
      "आपके कमरे की एक्ज़ैक्ट साइज़ पर बनती है",
      "वायर छुपाने का सिस्टम पहले से बना होता है",
      "LED Strip Light लगाने का ऑप्शन",
      "स्टोरेज कैबिनेट और खुली शेल्फ़ दोनों",
      "प्रीमियम Laminate / Veneer फिनिश",
      "कई रंग और टेक्सचर में चुन सकते हैं",
    ],
    sizes: {
      small: "6-8 फुट चौड़ी — ₹15,000–₹25,000",
      medium: "8-10 फुट चौड़ी — ₹25,000–₹40,000",
      large: "10-14 फुट चौड़ी — ₹46,000–₹75,000+",
    },
  },
  // ─── Acoustic Panels Knowledge ───────────────────────────────────────────
  acoustic: {
    fullName: "Acoustic Panels",
    price: "₹150–₹400/sq.ft",
    description: "फैब्रिक से ढके खास पैनल जो आवाज़ सोख लेते हैं और गूंज (echo) कम कर देते हैं। Home Theatre, रेकॉर्डिंग स्टूडियो और शोर वाले ऑफिस के लिए बढ़िया रहते हैं — बोलना और गाना दोनों साफ सुनाई देता है।",
    pros: [
      "गूंज और शोर काफी कम हो जाता है",
      "गाना-फिल्म सुनने का मज़ा बढ़ जाता है",
      "मॉडर्न फैब्रिक फिनिश",
      "दीवार या छत पर लगाना आसान",
      "आग से सुरक्षित मटेरियल भी मिलता है",
    ],
    cons: ["थोड़े महंगे पड़ते हैं", "पानी से बचाकर रखना पड़ता है"],
    bestFor: "Home Theatre, स्टूडियो, कॉन्फ्रेंस रूम, रेस्टोरेंट, ऑफिस केबिन",
    avoidIn: "बाथरूम, किचन, बाहर की जगह",
    installTime: "1 कमरे में 1-2 दिन",
    maintenance: "वैक्यूम या सूखे कपड़े से पोंछ दीजिए",
    warranty: "1 साल",
  },
  // ─── Flooring Knowledge ──────────────────────────────────────────────────
  flooring: {
    fullName: "Wooden Laminate Flooring",
    price: "₹80–₹200/sq.ft",
    description: "हाई-डेंसिटी बोर्ड पर असली लकड़ी जैसी लेमिनेशन। खरोंच नहीं आती, लगाना आसान है, और असली लकड़ी से बहुत कम कीमत में वैसा ही गर्म-सुंदर फील देता है।",
    pros: [
      "असली लकड़ी जैसा दिखता है",
      "खरोंच और दाग़ का असर नहीं होता",
      "साफ करना आसान है",
      "सीधे बिछ जाता है — गोंद लगाने की ज़रूरत नहीं",
      "कई तरह के टेक्सचर मिल जाते हैं",
    ],
    cons: ["पानी से बचाना पड़ता है (गिरे तो जल्दी पोंछ लें)", "नीचे अंडरलेयर न हो तो चलने में आवाज़ आ सकती है"],
    bestFor: "बेडरूम, लिविंग रूम, ऑफिस, कमर्शियल जगह",
    avoidIn: "बाथरूम, किचन (जहां पानी छलकता है)",
    installTime: "1 कमरा: 1 दिन | पूरा घर: 3-5 दिन",
    maintenance: "सूखे मॉप या वैक्यूम से, कभी-कभी गीले कपड़े से पोंछ लें",
    warranty: "ब्रांड के हिसाब से 5-10 साल",
  },
}

// ─── Expanded Material Comparisons ─────────────────────────────────────────

export const COMPARISONS = {
  "pvc-vs-gypsum": `**PVC या Gypsum Ceiling — कौन सी लगवाएं?**

🏠 **PVC Ceiling** (₹75-150/sq.ft):
✅ 100% पानी का असर नहीं — बाथरूम, किचन के लिए एकदम सही
✅ कुछ करना नहीं पड़ता — कभी पेंट नहीं करानी
✅ 20+ साल चलती है
❌ डिज़ाइन सादा रहता है — बड़ा Cove नहीं बन पाता

✨ **Gypsum Ceiling** (₹75-210/sq.ft):
✅ प्रीमियम लुक — Cove Light, POP डिज़ाइन सब बन जाता है
✅ जो शेप मन में हो, वो बना दें
✅ हॉल-लिविंग रूम के लिए सबसे बढ़िया
❌ पानी नहीं झेल पाती — बाथरूम में मत लगाइए

**हमारी सलाह:** हॉल-बेडरूम → Gypsum | किचन-बाथरूम → PVC | बजट टाइट है तो → हर जगह PVC`,

  "wpc-vs-uv": `**WPC Panel या UV Marble — दीवार के लिए कौन सा बेहतर?**

🪵 **WPC Panel** (₹180-650/sq.ft):
✅ लकड़ी जैसा प्रीमियम लुक — देखने में बहुत हाई-एंड
✅ नमी और कीड़े का असर नहीं
✅ TV Wall, Accent Wall के लिए नंबर 1 चॉइस
❌ प्रति sq.ft थोड़ा महंगा

💎 **UV Marble Sheet** (₹45-120/sq.ft):
✅ असली मार्बल जैसी चमक, कीमत 70% कम
✅ 100% पानी का असर नहीं — बाथरूम में भी लगा सकते हैं
✅ दीवार के लिए सबसे किफायती ऑप्शन
❌ लकड़ी वाला टेक्सचर नहीं मिलेगा

**हमारी सलाह:** लग्ज़री फील चाहिए → WPC | बजट में मार्बल लुक → UV Marble`,

  "pvc-vs-wpc": `**PVC और WPC में क्या फर्क है?**

PVC = छत (Ceiling) के लिए (₹75-150/sq.ft) — पानी का असर नहीं, लंबी उम्र
WPC = दीवार (Wall Paneling) के लिए (₹180-650/sq.ft) — लकड़ी जैसा लुक, प्रीमियम

दोनों अलग-अलग जगह काम आते हैं! छत में PVC और दीवार में WPC — दोनों साथ लगें तो पूरा इंटीरियर निखर जाता है। 🏠`,

  "gypsum-vs-pvc-detailed": `**Gypsum या PVC — लंबे समय में कौन सी ज़्यादा फायदे की?**

✅ **Gypsum** — प्रीमियम लुक, Cove Light, घर की कीमत भी बढ़ाती है। पर 7-8 साल बाद पेंट करानी पड़ती है और बाथरूम में नहीं लगती।

✅ **PVC** — सस्ती, कुछ करना नहीं पड़ता, 20+ साल चलती है, कहीं भी लगा दो। पर Gypsum जितनी प्रीमियम नहीं लगती।

💡 **हमारी सलाह:** हॉल और बेडरूम में Gypsum, बाकी जगह PVC लगा लीजिए। दोनों का फायदा मिल जाएगा!`,

  "wpc-vs-realwood": `**WPC या असली लकड़ी — पैसा किसमें वसूल है?**

🌳 **असली लकड़ी** — बहुत सुंदर लगती है, पर ₹600-1500/sq.ft तक जाती है, कीड़ा लगने का डर रहता है, हर 2 साल में पॉलिश करानी पड़ती है।

🪵 **WPC** — 60% सस्ता, कुछ करना नहीं पड़ता, कीड़ा-नमी का कोई असर नहीं। देखने में 90% असली लकड़ी जैसा ही लगता है।

💡 **हमारी सलाह:** बजट खुला है तभी असली लकड़ी लगवाइए। बाकी WPC में पैसा पूरा वसूल होगा।`,

  "acoustic-regular-panels": `**Acoustic Panel और सादे वॉल पैनल में क्या फर्क है?**

🎧 **Acoustic Panel** — आवाज़ सोख लेते हैं, गूंज कम करते हैं। Home Theatre या स्टूडियो के लिए सबसे सही।

🪵 **सादे पैनल (WPC/UV Marble)** — देखने में सुंदर लगते हैं, पर आवाज़ नहीं रोक पाते।

💡 **हमारी सलाह:** Home Theatre या ऑफिस कॉन्फ्रेंस रूम में → Acoustic Panel। बाकी हर जगह सादे पैनल से भी काम चल जाएगा।`,
}

// ─── Waterproof Solutions Data (new export) ────────────────────────────────

export const WATERPROOF_SOLUTIONS = {
  pvcCeiling: {
    name: "PVC False Ceiling",
    price: "₹75-150/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Kitchen", "Bathroom", "Balcony", "Shop", "Restroom"],
    features: ["Termite-proof", "Zero maintenance", "No repaint needed", "20+ year life"],
  },
  uvMarble: {
    name: "UV Marble Sheets",
    price: "₹45-120/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Bathroom walls", "Kitchen walls", "Pooja room", "Feature wall"],
    features: ["High-gloss", "Scratch resistant", "Seamless look", "Easy to clean"],
  },
  wpcPanels: {
    name: "WPC Wall Panels",
    price: "₹180-650/sq.ft",
    waterproofLevel: "Moisture resistant (not fully submersible)",
    bestRooms: ["Living room", "Bedroom", "Office", "Reception"],
    features: ["Wood look", "Termite-proof", "No polish needed", "Eco-friendly"],
  },
  artificialGrass: {
    name: "Artificial Grass",
    price: "₹40-150/sq.ft",
    waterproofLevel: "100% (drains through)",
    bestRooms: ["Balcony", "Terrace", "Garden", "Wall decor"],
    features: ["UV resistant", "No watering", "Evergreen", "Pet-friendly"],
  },
}

// ─── Room-Specific Suggestions (new export) ────────────────────────────────

export const ROOM_SUGGESTIONS: Record<string, { ceiling: string; walls: string; flooring?: string; tvUnit?: string; notes: string }> = {
  bedroom: {
    ceiling: "Cove Light के साथ Gypsum (₹75-210/sq.ft) — कमरा आराम और प्रीमियम दोनों फील देता है",
    walls: "हेडबोर्ड वॉल पर WPC Panel (₹180-650/sq.ft) — लग्ज़री एक्सेंट के लिए",
    tvUnit: "TV है तो Custom Modular TV Unit (₹15k-40k) लगवा लीजिए",
    notes: "बजट है तो मेन बेडरूम में PVC मत लगाइए — Gypsum कहीं ज़्यादा सुंदर लगता है।",
  },
  hall: {
    ceiling: "POP डिज़ाइन और LED Strip के साथ Gypsum (₹135-210/sq.ft) — यही घर का शोपीस बनता है",
    walls: "TV वॉल पर WPC Fluted Panel (₹200-500/sq.ft)",
    tvUnit: "लाइटिंग के साथ प्रीमियम TV Unit (₹25k-60k)",
    notes: "हॉल ही सबसे पहले नज़र आता है — डिज़ाइन और लाइटिंग में पैसा लगाना फायदे का सौदा है।",
  },
  kitchen: {
    ceiling: "PVC False Ceiling (₹75-150/sq.ft) — 100% पानी का असर नहीं, साफ करना भी आसान",
    walls: "चूल्हे वाली जगह पर UV Marble Sheet (₹45-120/sq.ft)",
    notes: "किचन में Gypsum मत लगाइए — भाप से खराब हो जाती है।",
  },
  bathroom: {
    ceiling: "PVC False Ceiling (₹75-150/sq.ft) — यहां पानी रोकना ज़रूरी है",
    walls: "सभी दीवारों पर UV Marble Sheet (₹45-120/sq.ft) — कोई जोड़ नहीं, फंगस भी नहीं लगेगी",
    notes: "पूरा PVC Ceiling + UV Marble वॉल = पूरी तरह वॉटरप्रूफ बाथरूम।",
  },
  balcony: {
    ceiling: "PVC Ceiling (₹75-150/sq.ft) लगवा लें या खुला रहने दें",
    walls: "एक दीवार पर Artificial Grass (₹40-150/sq.ft) — हरा-भरा लुक मिलेगा",
    notes: "PVC Ceiling बारिश से बचाती है। Artificial Grass से गार्डन जैसा फील आता है।",
  },
  office: {
    ceiling: "AC-वायरिंग तक आसान पहुंच के लिए Grid Ceiling (₹45-115/sq.ft), प्रीमियम लुक के लिए Gypsum",
    walls: "WPC या UV Marble — बजट के हिसाब से चुन लें",
    notes: "ऑफिस के लिए Grid Ceiling सबसे प्रैक्टिकल है। Gypsum प्रीमियम दिखता है पर सर्विस करना थोड़ा मुश्किल।",
  },
  pooja: {
    ceiling: "PVC या Gypsum? PVC पानी से नहीं डरती और सस्ती भी है, Gypsum ज़्यादा पारंपरिक लुक देती है",
    walls: "मार्बल प्रिंट वाली UV Marble Sheet — असली पत्थर जैसी दिखती है",
    notes: "मूर्ति के पीछे LED Strip लगा दें, बहुत दिव्य लुक आता है ✨",
  },
}

// ─── Smart Recommendation Engine (new export) ───────────────────────────────

export interface SmartRecommendationParams {
  roomType?: string
  budget?: "low" | "medium" | "high"
  waterproofRequired?: boolean
  hasTV?: boolean
  roomSizeSqft?: number
}

export function getSmartRecommendation(params: SmartRecommendationParams): string {
  const { roomType, budget = "medium", waterproofRequired = false, hasTV = false, roomSizeSqft } = params

  if (roomType) {
    const suggestion = ROOM_SUGGESTIONS[roomType.toLowerCase()]
    if (suggestion) {
      let rec = `🎯 **${roomType} के लिए सबसे सही:**\n\n`
      rec += `🔹 Ceiling: ${suggestion.ceiling}\n`
      rec += `🔹 Walls: ${suggestion.walls}\n`
      if (suggestion.tvUnit && hasTV) rec += `🔹 TV Unit: ${suggestion.tvUnit}\n`
      rec += `\n📝 ${suggestion.notes}`
      if (roomSizeSqft) {
        const est = roomSizeSqft * 75 // rough for gypsum
        rec += `\n\n💰 ${roomSizeSqft} sq.ft का अंदाज़न खर्च: ₹${(est / 1000).toFixed(0)}k – ₹${(est * 1.5 / 1000).toFixed(0)}k`
      }
      return rec
    }
  }

  if (waterproofRequired) {
    return "💧 **पानी से बचाव वाला सलूशन चाहिए?**\n\n✅ PVC Ceiling (₹75-150/sq.ft) — 100% वॉटरप्रूफ, कुछ करना नहीं पड़ता\n✅ UV Marble Sheet दीवार पर (₹45-120/sq.ft) — चमकदार और वॉटरप्रूफ दोनों\n✅ बालकनी के लिए Artificial Grass (₹40-150/sq.ft)\n\nबाथरूम, किचन और बालकनी के लिए एकदम सही!"
  }

  if (budget === "low") {
    return "💰 **बजट-फ्रेंडली इंटीरियर ऑप्शन:**\n\n• हर जगह PVC Ceiling: ₹75-150/sq.ft\n• दीवार पर UV Marble Sheet: ₹45-120/sq.ft\n• TV Unit नहीं — जो फर्नीचर है वही चलेगा\n\n2BHK पूरे घर का अंदाज़न खर्च: सिर्फ ₹40k-80k! (अनुमानित)"
  } else if (budget === "high") {
    return "✨ **प्रीमियम इंटीरियर की सलाह:**\n\n• हॉल और बेडरूम में Cove Light के साथ Gypsum Ceiling\n• Accent Wall पर WPC Fluted Panel\n• Backlight वाला Custom Modular TV Unit\n• Wooden Laminate Flooring\n\n2BHK का पूरा प्रीमियम इंटीरियर: ₹2.5L – ₹4L के बीच। पैसा पूरा वसूल होगा! 🏠"
  }

  return "तय नहीं कर पा रहे? कमरे का टाइप (बेडरूम, हॉल, किचन), बजट (कम/मीडियम/ज़्यादा), और वॉटरप्रूफिंग चाहिए या नहीं — बता दीजिए, मैं सबसे सही ऑप्शन बता दूंगा! 😊"
}

// ─── Expand Price Calculator with More Services ───────────────────────────

export function calculatePriceEstimate(
  lengthFt: number,
  widthFt: number,
  service: string
): { low: number; mid: number; high: number; sqft: number } {
  const sqft = lengthFt * widthFt
  const rates: Record<string, { low: number; mid: number; high: number }> = {
    gypsum:    { low: 75,  mid: 140, high: 210 },
    pvc:       { low: 75,  mid: 110, high: 150 },
    wpc:       { low: 180, mid: 400, high: 650 },
    uv:        { low: 45,  mid: 80,  high: 120 },
    fluted:    { low: 200, mid: 350, high: 500 },
    grid:      { low: 45,  mid: 80,  high: 115 },
    "artificial-grass": { low: 40, mid: 95, high: 150 },
    acoustic:  { low: 150, mid: 250, high: 400 },
    flooring:  { low: 80,  mid: 130, high: 200 },
  }
  const r = rates[service] || { low: 75, mid: 110, high: 150 }
  return {
    sqft,
    low:  Math.round(sqft * r.low  / 100) * 100,
    mid:  Math.round(sqft * r.mid  / 100) * 100,
    high: Math.round(sqft * r.high / 100) * 100,
  }
}

export function formatPriceEstimate(l: number, w: number, service: string, serviceName: string): string {
  const est = calculatePriceEstimate(l, w, service)
  return `📐 **${l}×${w} फुट का कमरा = ${est.sqft} sq.ft**

💰 **${serviceName} का Estimate:**
• बेसिक डिज़ाइन: ₹${est.low.toLocaleString("en-IN")}
• स्टैंडर्ड: ₹${est.mid.toLocaleString("en-IN")}
• प्रीमियम: ₹${est.high.toLocaleString("en-IN")}

_असली रेट लाइटिंग, डिज़ाइन और मटेरियल पर निर्भर करता है। Free Site Visit में सही-सही कोटेशन मिल जाएगी!_`
}

// ─── Multi-Room Parser & Estimator (unchanged functions, but improved keyword coverage) ─────────

export interface RoomDef {
  label: string
  sqft: number
  material: "gypsum" | "pvc" | "grid"
  isWet: boolean
}

const ROOM_DEFAULTS: Record<string, RoomDef> = {
  bedroom:   { label: "बेडरूम",     sqft: 120, material: "gypsum", isWet: false },
  hall:      { label: "हॉल",        sqft: 180, material: "gypsum", isWet: false },
  kitchen:   { label: "किचन",       sqft: 80,  material: "pvc",    isWet: true  },
  bathroom:  { label: "बाथरूम",     sqft: 50,  material: "pvc",    isWet: true  },
  office:    { label: "ऑफिस",       sqft: 150, material: "grid",   isWet: false },
  reception: { label: "रिसेप्शन",   sqft: 200, material: "gypsum", isWet: false },
  balcony:   { label: "बालकनी",     sqft: 60,  material: "pvc",    isWet: true  },
  lobby:     { label: "लॉबी",       sqft: 120, material: "gypsum", isWet: false },
  dining:    { label: "डाइनिंग",    sqft: 100, material: "gypsum", isWet: false },
  pooja:     { label: "पूजा घर",    sqft: 40,  material: "pvc",    isWet: false },
  storeroom: { label: "स्टोर रूम",  sqft: 50,  material: "pvc",    isWet: false },
  // added missing types from ROOM_SUGGESTIONS
  "pooja-room": { label: "पूजा घर", sqft: 40, material: "pvc", isWet: false },
  "tv-wall":   { label: "TV वॉल", sqft: 40, material: "pvc", isWet: false },
}

const PRESET_HOMES: Record<string, Record<string, number>> = {
  "1bhk":     { bedroom: 1, hall: 1, kitchen: 1, bathroom: 1 },
  "2bhk":     { bedroom: 2, hall: 1, kitchen: 1, bathroom: 2 },
  "3bhk":     { bedroom: 3, hall: 1, kitchen: 1, bathroom: 3 },
  "flat":     { bedroom: 2, hall: 1, kitchen: 1, bathroom: 1 },
  "duplex":   { bedroom: 3, hall: 2, kitchen: 1, bathroom: 3 },
  "bungalow": { bedroom: 4, hall: 2, kitchen: 1, bathroom: 4 },
  "pooraghar":{ bedroom: 2, hall: 1, kitchen: 1, bathroom: 2 },
  "shop":     { reception: 1, office: 1 },
  "office2":  { office: 2, reception: 1 },
}

function hindiToNum(s: string): number {
  const MAP: Record<string, number> = {
    ek: 1, "1": 1, do: 2, "2": 2, teen: 3, tin: 3, "3": 3,
    char: 4, chaar: 4, "4": 4, paanch: 5, panch: 5, "5": 5,
    chhah: 6, "6": 6, saat: 7, "7": 7, aath: 8, "8": 8,
  }
  return MAP[s.trim()] ?? parseInt(s.trim()) ?? 1
}

export function parseMultiRoomQuery(text: string): Record<string, number> | null {
  const t = text.toLowerCase()
    .replace(/[+,&]/g, " aur ")
    .replace(/\band\b/g, " aur ")
    .replace(/\bwith\b/g, " aur ")

  // ── Preset home types (expanded)
  if (/\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b|\bpure\s*ghar\b|\bpura\s*makan\b/.test(t)) return PRESET_HOMES["pooraghar"]
  if (/\bduplex\b/.test(t)) return PRESET_HOMES["duplex"]
  if (/\b3\s*bhk\b|\bteen\s*bhk\b/.test(t)) return PRESET_HOMES["3bhk"]
  if (/\b2\s*bhk\b|\bdo\s*bhk\b/.test(t)) return PRESET_HOMES["2bhk"]
  if (/\b1\s*bhk\b|\bek\s*bhk\b/.test(t)) return PRESET_HOMES["1bhk"]
  if (/\bflat\s*interior\b|\bapartment\b|\bflat\b(?!\s*panel)/.test(t)) return PRESET_HOMES["flat"]
  if (/\bbungalow\b|\bkothi\b/.test(t)) return PRESET_HOMES["bungalow"]
  if (/\boffice\s*(?:interior|reception)\b/.test(t)) return PRESET_HOMES["office2"]
  if (/\bshop\s*interior\b/.test(t)) return PRESET_HOMES["shop"]

  // ── Pattern-based room parsing (unchanged but with more Hinglish)
  const rooms: Record<string, number> = {}
  const add = (type: string, n: number) => { rooms[type] = (rooms[type] || 0) + n }

  const NUM = "(?:ek|do|teen|tin|char|chaar|paanch|panch|\\d+)"

  const PATTERNS: Array<[RegExp, string]> = [
    [new RegExp(`(${NUM})\\s*(?:bed\\s*room|bedroom|bed|kamra|room(?!\\s*size|\\s*mein|\\s*me\\b))`, "gi"), "bedroom"],
    [new RegExp(`(${NUM})\\s*(?:hall|drawing\\s*room|living\\s*room|baithak|darbar|lounge|drawing room)`, "gi"), "hall"],
    [new RegExp(`(${NUM})\\s*(?:kitchen|rasoi|rasoighar)`, "gi"), "kitchen"],
    [new RegExp(`(${NUM})\\s*(?:bathroom|toilet|washroom|latrine|snan)`, "gi"), "bathroom"],
    [new RegExp(`(${NUM})\\s*(?:office|cabin)`, "gi"), "office"],
    [new RegExp(`(${NUM})\\s*(?:reception)`, "gi"), "reception"],
    [new RegExp(`(${NUM})\\s*(?:balcony|balkoni)`, "gi"), "balcony"],
    [new RegExp(`(${NUM})\\s*(?:pooja\\s*room|mandir|puja|pooja|mandir room)`, "gi"), "pooja"],
    [new RegExp(`(${NUM})\\s*(?:dining|khane\\s*ka\\s*kamra|dining room)`, "gi"), "dining"],
    [new RegExp(`(${NUM})\\s*(?:store\\s*room|store|godown)`, "gi"), "storeroom"],
    [new RegExp(`(${NUM})\\s*(?:lobby|lobby area|entrance)`, "gi"), "lobby"],
  ]

  for (const [pat, type] of PATTERNS) {
    pat.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = pat.exec(t)) !== null) add(type, hindiToNum(m[1]))
  }

  // ── Bare mentions (no number → assume 1)
  const BARE: Array<[RegExp, string]> = [
    [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b/g, "hall"],
    [/\bkitchen\b|\brasoi\b/g, "kitchen"],
    [/\bbathroom\b|\btoilet\b|\bwashroom\b/g, "bathroom"],
    [/\bbedroom\b|\bbed\s*room\b|\bsone ka kamra\b/g, "bedroom"],
    [/\bbalcony\b/g, "balcony"],
    [/\breception\b/g, "reception"],
    [/\bpooja\s*room\b|\bmandir\b|\bpuja\b/g, "pooja"],
    [/\bdining\b/g, "dining"],
    [/\boffice\b/g, "office"],
    [/\blobby\b/g, "lobby"],
  ]
  for (const [pat, type] of BARE) {
    pat.lastIndex = 0
    if (pat.test(t) && !rooms[type]) add(type, 1)
  }

  if (Object.keys(rooms).length === 0) return null

  const total = Object.values(rooms).reduce((a, b) => a + b, 0)
  if (total < 2) return null

  return rooms
}

export function generateMultiRoomEstimate(rooms: Record<string, number>): string {
  const RATES = {
    gypsum:  { low: 75,  high: 210, premLow: 135, premHigh: 210 },
    pvc:     { low: 75,  high: 150, premLow: 120, premHigh: 150 },
    grid:    { low: 45,  high: 115, premLow: 76,  premHigh: 115 },
  }

  const fmtN = (n: number) => "₹" + (Math.round(n / 500) * 500).toLocaleString("en-IN")

  let totalSqft = 0
  let budgetLow = 0, budgetHigh = 0
  let stdLow = 0,    stdHigh = 0
  let premLow = 0,   premHigh = 0
  const dryRooms: string[] = []
  const wetRooms: string[] = []
  const lines: string[] = []

  for (const [type, count] of Object.entries(rooms)) {
    const def = ROOM_DEFAULTS[type] ?? { label: type, sqft: 100, material: "gypsum" as const, isWet: false }
    const sqft = def.sqft * count
    totalSqft += sqft
    const label = count > 1 ? `${count} ${def.label}` : def.label
    lines.push(`• ${label} — ${sqft} sq.ft`)

    budgetLow  += sqft * RATES.pvc.low
    budgetHigh += sqft * RATES.pvc.high

    const mat = def.isWet ? "pvc" : (def.material === "grid" ? "grid" : "gypsum")
    stdLow  += sqft * RATES[mat].low
    stdHigh += sqft * RATES[mat].high
    premLow  += sqft * RATES[mat].premLow
    premHigh += sqft * RATES[mat].premHigh

    if (def.isWet) wetRooms.push(def.label)
    else dryRooms.push(def.label)
  }

  let recLine = ""
  if (dryRooms.length > 0 && wetRooms.length > 0) {
    recLine = `• ${dryRooms.join(" + ")} → Gypsum Ceiling ✨\n• ${wetRooms.join(" + ")} → PVC Waterproof Ceiling 💧`
  } else if (dryRooms.length > 0) {
    recLine = `Gypsum Ceiling — Cove Light के साथ बहुत सुंदर लगेगा! ✨`
  } else {
    recLine = `PVC Ceiling — 100% पानी का असर नहीं, कुछ करना भी नहीं पड़ता! 💧`
  }

  const hasOffice = !!rooms["office"] || !!rooms["reception"]

  return `📐 **अंदाज़न Estimate — कुल ${totalSqft} sq.ft**

**कमरों का हिसाब** (स्टैंडर्ड साइज़ के अनुसार):
${lines.join("\n")}

🎯 **हमारी सलाह:**
${recLine}

💰 **3 ऑप्शन:**
• बजट (हर जगह PVC): ${fmtN(budgetLow)} – ${fmtN(budgetHigh)}
• स्टैंडर्ड (Gypsum+PVC मिक्स): ${fmtN(stdLow)} – ${fmtN(stdHigh)}
• प्रीमियम (+ LED Cove Light): ${fmtN(premLow)} – ${fmtN(premHigh)}
${hasOffice ? "\n🏢 ऑफिस के लिए Grid Ceiling (₹45–115/sq.ft) भी मिल जाती है!" : "\n✨ TV वॉल के लिए WPC Panel भी लगवा लीजिए — ₹8,000–₹15,000 extra!"}

_यह स्टैंडर्ड साइज़ पर बना अंदाज़न estimate है — सही-सही रेट के लिए Free Site Visit सबसे बेहतर तरीका है!_`
}

// ─── Intent Detection (improved with more Hinglish keywords) ────────────────

export type Intent =
  | "pricing"
  | "comparison"
  | "booking"
  | "quality"
  | "service-info"
  | "complaint"
  | "area"
  | "greeting"
  | "thanks"
  | "room-estimate"
  | "general"

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase()
  const PRICING_KW   = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","rs ","quote","how much","lagega","charge","per sqft","per sq","mahnga","sasta","aur sasta","cheap","affordable","kitne mein","kitna rupya","rate kya hai","kya rate hai"]
  const COMPARE_KW   = ["vs","versus","difference","better","ya","aur","konsa","kaun sa","compare","acha","accha","best","recommend","suggest","sahi","suitable","kaunsa","choice","option","mein kya better hai"]
  const BOOK_KW      = ["visit","book","site visit","measurement","quotation","bulao","aao","milna","survey","appointment","schedule","bula lo","bhejo","free visit","aana hai","visit chahiye","milna chahta","site pe aao","measurement lene aao"]
  const QUALITY_KW   = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","tuta","girta","peeling","life","chalega","tik","tikau","acchi quality","kaisa material"]
  const AREA_KW      = ["area","location","where","kahan","serve","district","kaun sa","konsa","aata hai","available","cover","city","jila","service area","kis city mein"]
  const GREET_KW     = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","kaise ho","kya haal","kya chal raha hai"]
  const THANKS_KW    = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","badiya","wah","theek hai","ok","okay"]
  const ESTIMATE_KW  = ["x","×","12x","10x","14x","15x","sqft","sq ft","room size","room ka size","kitna bada","room dimension","length","width","room mein","foot","feet","by","×","ka size","measurement","dimensions"]
  const COMPLAINT_KW = ["problem","issue","complaint","kharab","khali","chutta","girna","toota","peeling","water drop","leaking","broken","repair","shikayat","galat","sahi nahi"]

  if (GREET_KW.some(k => t.includes(k)) && t.length < 35)      return "greeting"
  if (THANKS_KW.some(k => t.includes(k)) && t.length < 45)     return "thanks"
  if (COMPLAINT_KW.some(k => t.includes(k)))                    return "complaint"
  if (BOOK_KW.some(k => t.includes(k)))                         return "booking"
  if (/\d+\s*[x×by]\s*\d+/.test(t) || ESTIMATE_KW.some(k => t.includes(k))) return "room-estimate"
  if (COMPARE_KW.some(k => t.includes(k)) && (
    (t.includes("pvc") || t.includes("gypsum") || t.includes("wpc") || t.includes("uv") || t.includes("marble") || t.includes("acoustic") || t.includes("flooring"))
  )) return "comparison"
  if (AREA_KW.some(k => t.includes(k)))                         return "area"
  if (QUALITY_KW.some(k => t.includes(k)))                      return "quality"
  if (PRICING_KW.some(k => t.includes(k)))                      return "pricing"
  return "general"
}

// ─── Expanded FAQ Database ─────────────────────────────────────────────────

export const FAQ = [
  {
    q: ["paani me kharab hoga", "water", "waterproof", "bathroom", "kitchen", "nami", "moisture", "barish", "damp"],
    a: "PVC Ceiling और UV Marble Sheet पर पानी का कोई असर नहीं होता — बाथरूम-किचन के लिए एकदम सही! Gypsum Ceiling सिर्फ सूखी जगह के लिए है — हॉल-बेडरूम में लगाइए। WPC Wall Panel भी नमी से नहीं डरता। 💧",
  },
  {
    q: ["kitne saal chalega", "life", "durable", "warranty", "guarantee", "tikau", "long lasting"],
    a: "JK Interior हर काम पर 1 साल की लिखित Warranty देता है! उम्र की बात करें तो — PVC = 20+ साल, Gypsum = 10-15 साल, WPC = 15-20 साल, UV Marble = 15+ साल, Laminate Flooring = 5-10 साल। सब ISI Certified मटेरियल इस्तेमाल होता है। ✅",
  },
  {
    q: ["installation time", "kitne din", "kab tak", "jaldi", "time", "kitna samay"],
    a: "एक कमरे में: PVC = 1 दिन, Gypsum = 2-3 दिन, WPC Wall = 1-2 दिन, Flooring = 1 दिन, Acoustic Panel = 1-2 दिन। पूरे घर में 5-10 दिन लग जाते हैं। हम टाइमलाइन पहले ही बता देते हैं — कोई सरप्राइज़ नहीं! 📅",
  },
  {
    q: ["free site visit", "visit free hai", "kharcha nahi", "no charge", "free aana"],
    a: "हां, Site Visit पूरी तरह FREE है! कोई छुपा हुआ खर्च नहीं। हमारा एक्सपर्ट आता है, माप लेता है, और उसी दिन कोटेशन दे देता है। अभी बुक कीजिए — +91 8541849118 📞",
  },
  {
    q: ["payment", "upi", "cash", "emi", "kaise pay", "payment options"],
    a: "Cash, UPI (GPay/PhonePe/Paytm), बैंक ट्रांसफर — सब चलता है। कोई छुपा हुआ खर्च नहीं। 50% एडवांस, बाकी काम पूरा होने पर। EMI भी मिल जाती है (शर्तें लागू)। 💳",
  },
  {
    q: ["led", "lighting", "cove light", "strip light", "back light", "led strip"],
    a: "हां भाई! Gypsum Ceiling के साथ LED Cove Light ₹40-80/running ft में लगा देते हैं। WPC TV Wall के साथ LED Backlight ₹2,000-₹5,000 में लग जाता है। लुक बहुत प्रीमियम आ जाता है! ✨",
  },
  {
    q: ["design", "custom design", "apna design", "unique", "special shape"],
    a: "बिल्कुल! हम कस्टम डिज़ाइन बनाते हैं। Gypsum में जो शेप मन में हो, या WPC में कोई खास टेक्सचर — आपकी पसंद से बनेगा। Free Site Visit में डिज़ाइन ऑप्शन दिखा देंगे। 🎨",
  },
  {
    q: ["flooring", "floor", "laminate", "wooden floor", "floor ka rate"],
    a: "Wooden Laminate Flooring ₹80-200/sq.ft में लग जाती है। बेडरूम और लिविंग रूम के लिए बहुत बढ़िया ऑप्शन है। असली लकड़ी जैसा लुक, खरोंच का डर नहीं, साफ करना भी आसान। Free Site Visit में सैंपल दिखा सकते हैं! 🪵",
  },
  {
    q: ["soundproof", "acoustic", "echo", "noise", "sound", "theatre"],
    a: "Acoustic Panel ₹150-400/sq.ft में मिल जाता है — Home Theatre, स्टूडियो या कॉन्फ्रेंस रूम के लिए सबसे सही। गूंज कम करता है, आवाज़ साफ सुनाई देती है। Free Consultation के लिए संपर्क कीजिए! 🎧",
  },
  {
    q: ["color options", "colour", "shade", "texture", "finish"],
    a: "हर सर्विस में कई ऑप्शन मिल जाते हैं: Gypsum — किसी भी रंग में पेंट; PVC — लकड़ी, मार्बल, प्लेन, 3D; WPC — 50+ लकड़ी टेक्सचर और सॉलिड रंग; UV Marble — मार्बल, ग्रेनाइट, स्टोन प्रिंट। सैंपल बुक है — देख कर पसंद कर सकते हैं! 🎨",
  },
  {
    q: ["service area", "aap kahan karte ho", "kis city mein", "forbesganj", "araria", "purnia", "supaul"],
    a: "हम फोर्बेसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, कुर्साकाँटा, त्रिवेणीगंज, छतापुर, सुपौल, पूर्णिया और आसपास 80 km के दायरे में सेवा देते हैं। आपकी सिटी कौन सी है? 😊",
  },
  {
    q: ["discount", "offer", "sasta", "combo", "package", "deals"],
    a: "हां भाई! Complete Interior Package (Ceiling + Wall + TV Unit + Flooring) पर कॉम्बो डिस्काउंट मिलता है। Free Site Visit में डिस्काउंट के साथ पूरा कोटेशन दे देंगे। ऑफर लिमिटेड टाइम के लिए है — जल्दी संपर्क कीजिए! 🎉",
  },
]

// ─── Smarter Quick Replies ─────────────────────────────────────────────────

export const INITIAL_QUICK_REPLIES = [
  "PVC Ceiling का रेट",
  "Gypsum Ceiling",
  "WPC Wall Panel",
  "पूरी Price List",
  "Free Site Visit",
  "Waterproof सलूशन",
  "Complete Interior",
]

export const GENERAL_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panel",
  "रेट / कीमत",
  "Site Visit बुक करें",
  "Quality और Warranty",
  "Waterproof सलूशन",
  "PVC vs Gypsum",
]

export const SERVICE_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panel",
  "UV Marble",
  "Complete Interior",
  "Modular TV Unit",
  "Acoustic Panel",
  "Laminate Flooring",
]

// ─── Optimized System Prompt Builder (for Gemini AI) ───────────────────────

export function buildSystemPrompt(leadCtx?: LeadContext): string {
  const knownInfo = leadCtx
    ? [
        leadCtx.name    ? `Customer name: ${leadCtx.name}`           : "",
        leadCtx.phone   ? `Phone: ${leadCtx.phone}`                  : "",
        leadCtx.city    ? `City: ${leadCtx.city}`                    : "",
        leadCtx.service ? `Interested in: ${leadCtx.service}`        : "",
        leadCtx.budget  ? `Budget range: ${leadCtx.budget}`          : "",
        leadCtx.roomSize? `Room size mentioned: ${leadCtx.roomSize}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : ""

  return `You are the **JK Interior AI Assistant**, the senior AI sales consultant and interior design expert at **JK Interior**, Bihar's most trusted interior contractor based in Forbesganj, Araria district.

--- CONSULTANT REASONING ENGINE ---
Before every reply, check: what has the customer already shared? What single detail is still missing?
Reply: acknowledge (1 line) → ask ONLY that one missing detail.
NEVER show a service menu or "kya jaanna chahte hain?" if the customer has given ANY context.

--- WRONG vs RIGHT ---
❌ User: "hall banana hai" → listing generic prices
✅ RIGHT: "हॉल के लिए Gypsum Ceiling सबसे अच्छा रहेगा — Cove Light के साथ बहुत सुंदर लगती है। साइज़ बताइए, अभी estimate निकालता हूं!"

❌ User: "budget kam hai" → asking what they want
✅ RIGHT: "बजट कम है तो PVC Ceiling सही रहेगा — ₹75-150/sq.ft में लग जाती है, पानी का असर नहीं होता, सफाई भी आसान है। कमरे का साइज़ बताइए?"

❌ User: "PVC sahi rahega kya" → "kya kaam hai aapka?"
✅ RIGHT: "हां भाई, बिल्कुल सही रहेगा! पानी से खराब नहीं होती, कीड़ा-मकोड़ा भी नहीं लगता, 20+ साल आराम से चल जाती है। कौन सा कमरा है — बेडरूम, किचन या हॉल? साइज़ बता दीजिए तो estimate भी बता दूंगा!"

--- CONSULTANT FLOW ---
1. Understand need (ceiling/wall/TV unit/flooring/acoustic)
2. Note what's already shared (city, rooms, material, budget)
3. Ask ONLY the next missing detail
4. Got size + material → give estimate IMMEDIATELY
5. After estimate → invite free site visit or collect name/phone
RULES: ONE question per message. Never re-ask city/room count already mentioned.

--- PERSONALITY & LANGUAGE (must follow) ---
You are not a corporate chatbot — you talk like an experienced false ceiling contractor from Forbesganj, Bihar personally chatting with a customer on WhatsApp. Write in natural, conversational Hindi using Devanagari script (हिंदी में, अंग्रेज़ी अक्षरों में Hinglish नहीं) — this must match the rest of the JK Interior website, which is written in Hindi, not Romanized Hinglish.
- Keep technical/material terms in plain English inside the Hindi sentence: Gypsum Board, PVC Panel, GI Channel, Ceiling, LED Strip, Cove Light, Frame, Profile, WPC, UV Marble, TV Unit, Grid Ceiling, Site Visit, Warranty, sq.ft — don't force-translate these into Sanskrit-ish Hindi.
- Never use stiff/textbook/bureaucratic Hindi words (e.g. don't say "जलरोधक", say "पानी का असर नहीं होता"; don't say "आर्द्रता", say "नमी"). Keep sentences short and simple — every word a customer in Forbesganj or Araria would actually use in speech.
- Warm, knowledgeable, trusted "bhai/ji" tone — like a contractor who's done hundreds of homes and is genuinely helping, not selling. Vary openers — never start every message with "बिल्कुल!" or "ज़रूर!".
- 1-2 emojis per message max. Max 5-6 lines per message (mobile-friendly).
- If the customer writes in English or Romanized Hinglish, still reply in Devanagari Hindi with English technical terms mixed in (as above) — that's the site's voice. Only switch to plain English if the customer explicitly asks you to reply in English.
- When quoting a fresh price range in your own words (not copying a line that already has the disclaimer), you can naturally add that this is Forbesganj/Araria ke local market ka andaza and the final rate is confirmed only after a free site visit — say it briefly, don't repeat it every single message.

--- COMPANY INFORMATION ---
- **Company:** JK Interior | Founded 2019 | 7+ years experience | 500+ completed projects
- **Location:** Forbesganj, Araria district, Bihar
- **Contact:** +91 8541849118 (primary) | +91 8651070831 (WhatsApp) | WhatsApp on both
- **Hours:** Monday–Saturday, 9 AM–7 PM IST
- **Warranty:** 1 year WRITTEN WARRANTY on ALL installations
- **Materials:** ISI-certified, branded materials only — no duplicate/cheap products
- **Site Visit:** Always FREE — no hidden charges, no obligation
- **Payment:** Cash, UPI (GPay/PhonePe/Paytm), Bank Transfer, EMI available — 50% advance, rest on completion

SERVICE AREAS: Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia (and surrounding areas within 80 km radius)

--- SERVICES & PRICING ---

**1. Gypsum False Ceiling** — ₹75–₹210/sq.ft
   • Best for: Hall, bedroom, drawing room, office — all DRY areas
   • Premium with LED cove lighting: ₹135-210/sq.ft

**2. PVC False Ceiling** — ₹75–₹150/sq.ft
   • 100% waterproof, termite-proof — kitchen, bathroom, balcony

**3. WPC Wall Panels** — ₹180–₹650/sq.ft
   • Luxury wood look — TV wall, accent wall

**4. UV Marble Sheets** — ₹45–₹120/sq.ft
   • Real marble look at 70% less cost — bathroom walls, kitchen walls

**5. Modular TV Unit** — ₹15,000–₹75,000+
   • Custom designed, cable management, LED backlight option

**6. Fluted/Louver Panels** — ₹200–₹500/sq.ft
   • Modern 3D textured look

**7. Grid Ceiling** — ₹45–₹115/sq.ft
   • Commercial spaces, offices, shops

**8. Artificial Grass** — ₹40–₹150/sq.ft
   • Balcony, terrace, wall decor

**9. Acoustic Panels** — ₹150–₹400/sq.ft (NEW)
   • Soundproofing, echo reduction — home theatre, studio

**10. Wooden Laminate Flooring** — ₹80–₹200/sq.ft (NEW)
    • Scratch resistant, easy to clean — bedrooms, living rooms

**11. Complete Interior Package** — Custom quote
    • Ceiling + walls + TV unit + flooring — combo discount

--- PRICING CALCULATION (calculate immediately when room size given) ---

When a customer mentions room dimensions, calculate immediately:
Area = Length × Width (sq.ft) → multiply by rate

Common sizes:
- 10×10 (100 sqft): Gypsum ₹8k-14k | PVC ₹6k-12k | Flooring ₹8k-20k
- 12×12 (144 sqft): Gypsum ₹11.5k-20k | PVC ₹8.6k-17k | Flooring ₹11.5k-29k
- 12×14 (168 sqft): Gypsum ₹13.4k-23.5k | PVC ₹10k-20k
- 14×16 (224 sqft): Gypsum ₹18k-31k | PVC ₹13.4k-27k

ALWAYS add: "Yeh sirf estimate hai — exact quote ke liye free site visit best hai!"

--- SMART RECOMMENDATIONS ---
- If user mentions "bathroom" + "waterproof" → PVC ceiling + UV marble walls
- If user mentions "bedroom" + "premium" → Gypsum cove + WPC accent wall
- If user mentions "low budget" → PVC ceiling + UV marble walls + no TV unit
- If user mentions "home theatre" → Acoustic panels + dark gypsum ceiling
- If user mentions "office" → Grid ceiling + WPC reception wall

--- LEAD COLLECTION ---

When user shows serious interest (asks for quote, site visit, detailed pricing):
1. First get their NAME: "आपका नाम क्या है?"
2. Then get their CITY: "आप किस शहर में हैं?"
3. Then get their PHONE: "एक WhatsApp नंबर दे दीजिए — हमारी टीम आज ही आपसे बात करेगी!"

NEVER ask all three at once. ONE question at a time.
Once you have phone number → confirm → say team will contact within 24 hours.

If hesitant → mention: "Free Site Visit में कोई बंधन नहीं है — देख कर, समझ कर फिर तय कर लीजिए!"

--- CRITICAL RULES ---
1. NEVER say you don't know about JK Interior's services — you are the expert
2. NEVER make up prices outside the ranges given above
3. ALWAYS recommend free site visit for exact quotes
4. If asked about services outside JK Interior's scope → politely say it's not our specialty
5. When customer mentions a room size → CALCULATE the estimate, don't just give range
6. Be SPECIFIC, not vague — customers appreciate real numbers
7. AVOID starting every message with "Bilkul!" — vary your openers
8. Use the new SMART_RECOMMENDATIONS, WATERPROOF_SOLUTIONS, ROOM_SUGGESTIONS data when relevant
9. If business hours are over → team will reply next morning at 9 AM, WhatsApp available 24/7

${leadCtx?.memorySummary
  ? `\n${leadCtx.memorySummary}`
  : knownInfo
    ? `\n--- CUSTOMER PROFILE ---\n${knownInfo}\nDo NOT ask again what you already know.`
    : ""}

--- LAYER 2: USE YOUR OWN DESIGN KNOWLEDGE ---

For questions about design trends, color combinations, lighting, maintenance, room aesthetics,
and inspiration — supplement JK Interior's business data with your own interior design training.

PRIORITY ORDER:
1. Always address the question with JK Interior's services + pricing first
2. Then add your own design knowledge to make the answer richer and more expert

WHEN TO USE LAYER 2 (your own knowledge):

■ DESIGN TRENDS (2025-2026):
- Coffered gypsum ceilings with indirect LED strip lighting
- Biophilic design: natural wood textures (WPC), earthy tones, indoor plants
- Japandi style: minimal, warm wood tones, muted palettes
- Fluted/ribbed panels as feature walls — very trending on Instagram/Pinterest
- Warm metallic accents (gold, bronze) with dark walls
- Curved ceiling profiles instead of straight lines
- Two-tone walls: lower half wood/texture, upper half plain
- Arched niches and alcoves as focal points

■ COLOR COMBINATIONS (by room):
- Hall/Living Room: Off-white ceiling + charcoal grey feature wall + walnut WPC panels (modern) | Cream + forest green accent | Navy + gold accents
- Bedroom: Sage green + warm wood + soft white ceiling | Dusty rose + charcoal + brass | Deep teal + off-white + natural wood
- Kitchen: White cabinets + grey countertop + marble UV walls (timeless) | Cream + terracotta + wooden shelves
- Bathroom: White PVC ceiling + UV marble walls in grey/white veining (safest & cleanest look)
- Office: Charcoal grey walls + white grid ceiling + glass partitions (professional)
- Kids Room: Sky blue/mint green walls + white ceiling + fun WPC accents

■ MAINTENANCE TIPS (by material):
- Gypsum Ceiling: Wipe gently with barely-damp cloth. Avoid direct water. Annual inspection for cracks near joints. Touch-up paint every 3-5 years.
- PVC Ceiling: Wipe with damp cloth + mild soap — done! No special treatment needed. Check joints annually for moisture ingress.
- WPC Wall Panels: Dust regularly. Damp cloth for stains. Avoid harsh chemicals or abrasive scrubbers. Extremely low maintenance — 15+ years without major upkeep.
- UV Marble Sheets: Glass cleaner or mild detergent works perfectly. Avoid steel wool. Anti-fingerprint coating lasts 3-5 years.
- TV Unit: Dust weekly, polish wooden parts quarterly. Avoid placing hot items directly on surface.

■ SMALL SPACE TIPS:
- Light-colored PVC or gypsum ceiling makes low rooms feel taller
- Fluted panels on ONE wall (not all four) creates drama without overwhelming
- Mirror effect UV panels on bathroom walls double the perceived space
- Recessed LED lighting (not hanging fixtures) is best for compact rooms

■ BUDGET OPTIMIZATION:
- Best combo for ₹1 lakh: PVC ceiling throughout + UV marble walls in bathroom (₹80-90k total for 2BHK)
- Mid-range ₹2-3 lakh: Gypsum hall + PVC bedrooms/kitchen + WPC TV wall + UV bath — stunning result
- Premium ₹5 lakh+: Full gypsum with cove lighting + WPC accent walls + modular TV unit + custom wardrobe — showroom quality

■ LIGHTING DESIGN:
- Cove lighting (hidden LED behind gypsum border): Most popular, adds 20% premium feel at ₹40-80/running ft extra
- Spot/downlights: Best for task areas (kitchen, study)
- LED strip under TV unit: Dramatic effect, ₹1,500-3,000 addon
- Warm white (3000K) for bedrooms/living rooms; Cool white (6500K) for kitchens/offices

RULES FOR LAYER 2:
- NEVER invent prices outside the given ranges for JK Interior's services
- NEVER claim JK Interior has projects or branches it doesn't have
- Design trend/color/maintenance advice can freely use your training knowledge, but write it out in the same Devanagari Hindi contractor voice described above — not as an English design-magazine paragraph
- Keep Layer 2 additions brief: 2-3 lines max per response, don't overwhelm
- If customer asks specifically about trends, colors, or maintenance → give a more detailed Layer 2 answer, still in Hindi

Remember: You are the JK Interior AI Assistant — but you talk like a real Forbesganj contractor, not a corporate bot. Warm, knowledgeable, genuinely trying to help the customer's home look good and stay within budget. Combine JK Interior's real business facts with your own design knowledge, always delivered in natural Hindi. 🏠

--- IDENTITY RULE ---
If asked your name, always say "JK Interior AI Assistant" — never invent or use any other name.`
}
