import { Layers, PanelTop, Tv } from "lucide-react"

export interface ServiceCityInfo {
  slug: string
  name: string
  nameHi: string
  icon: typeof Layers
  galleryCategory: string
  price: string
  premiumPrice: string
  description: string
  pros: string[]
  bestFor: string
  installTime: string
  maintenance: string
  warranty: string
  faqs: { q: string; a: string }[]
}

export const SERVICE_CITY_SERVICES: ServiceCityInfo[] = [
  {
    slug: "pvc-false-ceiling",
    name: "PVC False Ceiling",
    nameHi: "PVC फॉल्स सीलिंग",
    icon: Layers,
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft",
    premiumPrice: "₹120–₹150/sq.ft with designer wood/marble-print textures",
    description:
      "PVC (Polyvinyl Chloride) ceiling panels are 100% waterproof, termite-proof, and low-maintenance — making them the most versatile false ceiling option for bathrooms, kitchens, shops, and every room of the home.",
    pros: [
      "100% waterproof — safe for bathroom and kitchen",
      "Termite-proof and insect-resistant",
      "Zero maintenance — just wipe clean",
      "Never needs repainting, 20+ year lifespan",
    ],
    bestFor: "Bathroom, kitchen, balcony, shop, office — any room",
    installTime: "1 room in a day, full home in 3–4 days",
    maintenance: "Zero — just wipe with a damp cloth",
    warranty: "1 year written warranty",
    faqs: [
      { q: "क्या PVC सीलिंग वॉटरप्रूफ है?", a: "हाँ, 100% वॉटरप्रूफ है। बाथरूम, किचन — हर जगह सुरक्षित रहता है, कभी फूलता या खराब नहीं होता।" },
      { q: "PVC सीलिंग कितने दिन में लग जाती है?", a: "एक कमरे की PVC फॉल्स सीलिंग 1 दिन में लग जाती है। पूरे घर के लिए 3–4 दिन लगते हैं।" },
    ],
  },
  {
    slug: "gypsum-ceiling",
    name: "Gypsum Ceiling",
    nameHi: "जिप्सम सीलिंग",
    icon: Layers,
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft",
    premiumPrice: "₹135–₹210/sq.ft with cove lighting + LED and multi-level design",
    description:
      "Gypsum board ceiling is the most popular choice for living rooms and bedrooms — a smooth, plaster-like finish that can be shaped into elegant cove designs, POP borders, and artistic patterns with integrated LED lighting.",
    pros: [
      "Elegant smooth finish — premium, luxury look",
      "Perfect for cove lighting and LED strips",
      "Can be painted in any colour",
      "Fire resistant and sound-insulating",
    ],
    bestFor: "Hall, bedroom, drawing room, dining area, office cabin",
    installTime: "1 bedroom in 2–3 days, full hall in 3–5 days",
    maintenance: "Minimal — occasional dusting, repaint every 5–7 years",
    warranty: "1 year written warranty",
    faqs: [
      { q: "जिप्सम सीलिंग पानी में खराब होगी?", a: "गीले एरिया (बाथरूम/किचन) में जिप्सम की जगह PVC लगवाना बेहतर है। हॉल और बेडरूम जैसे ड्राई एरिया में जिप्सम परफेक्ट है।" },
      { q: "जिप्सम सीलिंग में कितना समय लगता है?", a: "एक कमरे में 2–3 दिन, पूरे घर में 5–7 दिन लगते हैं — डिज़ाइन की जटिलता पर निर्भर करता है।" },
    ],
  },
  {
    slug: "wpc-wall-panel",
    name: "WPC Wall Panel",
    nameHi: "WPC वॉल पैनल",
    icon: PanelTop,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹650/sq.ft",
    premiumPrice: "₹390–₹650/sq.ft for premium fluted/louvre designs with LED backlight",
    description:
      "WPC (Wood Plastic Composite) panels give the luxury look of real wood without the maintenance headaches — termite-proof, moisture-resistant, and eco-friendly. Popular for TV walls, accent walls, and full room paneling.",
    pros: [
      "Premium wood look at 60% less cost than real wood",
      "Moisture and termite resistant — outlasts real wood",
      "Zero maintenance — no polish or varnish ever needed",
      "Available in 50+ colours and fluted textures",
    ],
    bestFor: "TV wall, bedroom headboard wall, accent wall, office reception",
    installTime: "TV wall accent in 1 day, full room in 2–3 days",
    maintenance: "Wipe with a dry cloth — lifetime maintenance-free",
    warranty: "1 year written warranty",
    faqs: [
      { q: "WPC पैनल असली लकड़ी जैसा दिखता है?", a: "बिल्कुल! WPC असली लकड़ी जैसा लुक देता है लेकिन टर्माइट, नमी और वार्पिंग की समस्या नहीं होती — 60% सस्ता भी है।" },
      { q: "TV वॉल के लिए WPC कैसा रहेगा?", a: "TV वॉल के लिए WPC सबसे अच्छा विकल्प है — खूबसूरत लकड़ी टेक्सचर, आसान केबल मैनेजमेंट, और बहुत प्रीमियम लुक आता है।" },
    ],
  },
  {
    slug: "modular-tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर TV यूनिट",
    icon: Tv,
    galleryCategory: "TV Unit Design",
    price: "₹15,000 से शुरू (बेसिक)",
    premiumPrice: "₹46,000–₹75,000+ (premium designs)",
    description:
      "Custom-designed modular TV units built to fit your exact room dimensions — with built-in cable management, LED backlighting, and storage shelves, in wood laminate, matte, glossy, or combination finishes.",
    pros: [
      "Custom designed for your exact room size",
      "Built-in cable management system",
      "LED strip lighting option available",
      "Storage cabinets and open shelves included",
    ],
    bestFor: "Living rooms, bedrooms",
    installTime: "3–5 days depending on size and design",
    maintenance: "Wipe with a dry cloth — no special care needed",
    warranty: "1 year written warranty",
    faqs: [
      { q: "TV यूनिट की कीमत कितनी है?", a: "बेसिक TV यूनिट ₹15,000 से शुरू होती है। प्रीमियम डिज़ाइन (LED लाइटिंग, बड़ा स्टोरेज) के साथ ₹46,000–₹75,000+ तक जा सकती है, साइज़ पर निर्भर करता है।" },
      { q: "TV यूनिट बनाने में कितने दिन लगते हैं?", a: "साइज़ और डिज़ाइन के अनुसार 3–5 दिन में तैयार हो जाती है। कस्टम माप के बाद सटीक टाइमलाइन बताई जाती है।" },
    ],
  },
]

export function getServiceCityInfoBySlug(slug: string): ServiceCityInfo | undefined {
  return SERVICE_CITY_SERVICES.find((s) => s.slug === slug)
}
