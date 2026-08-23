// lib/knowledge-base.ts
// JK Interior AI Knowledge Base - Optimized for Gemini AI prompt injection
// Contains structured data for interior design consultancy

export interface Service {
  id: string;
  name: string;
  nameHi: string;
  category: 'ceiling' | 'wall' | 'kitchen' | 'furniture' | 'flooring' | 'complete';
  priceMin: number;
  priceMax: number;
  unit: 'sqft' | 'sqm' | 'running_ft' | 'item';
  waterproof: boolean;
  installationDays: number;
  warranty: string;
  emoji: string;
  keywords: string[];
  description: string;
  descriptionHi: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  imagePrompt?: string;
}

export interface Material {
  id: string;
  name: string;
  durability: string;
  maintenance: string;
  suitableFor: string[];
  notRecommendedFor: string[];
  ecoFriendly: boolean;
  fireResistant: boolean;
  texture: string[];
}

export interface RoomSuggestion {
  roomType: string;
  bestCeiling: string;
  bestWalls: string;
  budgetOption: string;
  premiumOption: string;
  notes: string[];
}

export interface FAQ {
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  tags: string[];
}

export interface RecommendationRule {
  condition: (query: string, context: any) => boolean;
  recommend: () => string;
}

// ============================================
// COMPANY INFORMATION
// ============================================

export const COMPANY = {
  name: "JK Interior",
  fullName: "JK Interior Consultants",
  tagline: "Bihar's Most Trusted Interior Contractor",
  founded: 2019,
  experienceYears: 7,
  projectsCompleted: 500,
  locations: {
    headquarters: "Forbesganj, Araria District, Bihar",
    serviceAreaRadius: "80 km",
  },
  contact: {
    primary: "+91 8541849118",
    secondary: "+91 8651070831",
    whatsapp: "+91 8651070831",
    email: "contact@jkinterior.online",
    website: "https://jkinterior.online",
  },
  social: {
    instagram: "@jkinterior",
    facebook: "JKInterior",
  },
  workingHours: "Monday–Saturday, 9 AM–7 PM IST",
  warranty: {
    standard: "1 year written warranty",
    extended: "Extended warranty available on request",
    coverage: "Installation defects, material defects, workmanship issues",
  },
  payment: {
    methods: ["Cash", "UPI (GPay/PhonePe/Paytm)", "Bank Transfer"],
    advance: "50% advance, balance on completion",
  },
  certifications: ["ISI-Certified Materials", "ISO 9001:2015 Compliant"],
  usps: [
    "Free site visit",
    "No hidden charges",
    "Written warranty",
    "ISI-certified branded materials",
    "7+ years experience",
    "500+ completed projects",
  ],
};

// ============================================
// SERVICES & PRICING (Detailed)
// ============================================

export const SERVICES: Service[] = [
  {
    id: "gypsum-ceiling",
    name: "Gypsum False Ceiling",
    nameHi: "जिप्सम फॉल्स सीलिंग",
    category: "ceiling",
    priceMin: 75,
    priceMax: 210,
    unit: "sqft",
    waterproof: false,
    installationDays: 3,
    warranty: "1 year",
    emoji: "✨",
    keywords: ["gypsum", "pop", "plaster", "cove", "jipsum", "gipsum", "false ceiling", "chhat"],
    description: "Gypsum board ceiling with smooth finish, ideal for cove lighting and POP designs. Best for living rooms and bedrooms.",
    descriptionHi: "लिविंग रूम और बेडरूम के लिए सबसे अच्छा - स्मूथ फिनिश, कोव लाइटिंग और POP डिजाइन के लिए परफेक्ट।",
    bestFor: ["Living Room", "Bedroom", "Drawing Room", "Office Cabin", "Dining Area"],
    pros: ["Elegant smooth finish", "Can create cove lighting", "Any shape/design possible", "Fire resistant", "Good sound insulation"],
    cons: ["Not waterproof", "Avoid bathrooms/kitchens", "Susceptible to moisture", "Repairs visible"],
    imagePrompt: "modern gypsum false ceiling with cove lighting and LED strips, elegant living room",
  },
  {
    id: "pvc-ceiling",
    name: "PVC False Ceiling",
    nameHi: "पीवीसी फॉल्स सीलिंग",
    category: "ceiling",
    priceMin: 75,
    priceMax: 150,
    unit: "sqft",
    waterproof: true,
    installationDays: 1,
    warranty: "1 year",
    emoji: "🏠",
    keywords: ["pvc", "pvc ceiling", "plastic ceiling", "waterproof ceiling", "pivisi"],
    description: "100% waterproof, termite-proof, zero maintenance false ceiling. Perfect for every room including bathrooms and kitchens.",
    descriptionHi: "100% वाटरप्रूफ, दीमक प्रूफ, जीरो मेंटेनेंस फॉल्स सीलिंग। बाथरूम और किचन सहित हर कमरे के लिए परफेक्ट।",
    bestFor: ["Bathroom", "Kitchen", "Balcony", "Shop", "Office", "Any Room"],
    pros: ["100% waterproof", "Termite-proof", "Zero maintenance", "Never needs repainting", "20+ year life", "Most affordable"],
    cons: ["Less premium than gypsum", "Cannot create complex shapes", "Limited design options"],
    imagePrompt: "PVC ceiling panels with wood texture, modern bathroom ceiling, waterproof",
  },
  {
    id: "wpc-panels",
    name: "WPC Wall Panels",
    nameHi: "डब्ल्यूपीसी वॉल पैनल",
    category: "wall",
    priceMin: 180,
    priceMax: 650,
    unit: "sqft",
    waterproof: true,
    installationDays: 2,
    warranty: "1 year",
    emoji: "🪵",
    keywords: ["wpc", "wood panel", "wall panel", "louver", "fluted", "wood composite", "accent wall"],
    description: "Wood Plastic Composite panels - luxury wood look at 60% less cost. Moisture resistant, no termite, no maintenance.",
    descriptionHi: "लक्जरी लकड़ी का लुक 60% कम लागत पर। नमी प्रतिरोधी, कोई दीमक नहीं, कोई रखरखाव नहीं।",
    bestFor: ["TV Wall", "Accent Wall", "Bedroom Headboard", "Reception", "Lobby"],
    pros: ["Premium wood look", "No termite/warping issues", "No polish needed", "Moisture resistant", "50+ colors/textures available"],
    cons: ["More expensive than UV marble", "Not for ceilings"],
    imagePrompt: "WPC fluted wall panels in a modern living room TV wall, wood texture, LED backlight",
  },
  {
    id: "uv-marble",
    name: "UV Marble Sheets",
    nameHi: "यूवी मार्बल शीट्स",
    category: "wall",
    priceMin: 45,
    priceMax: 120,
    unit: "sqft",
    waterproof: true,
    installationDays: 2,
    warranty: "1 year",
    emoji: "💎",
    keywords: ["uv", "marble sheet", "uv marble", "artificial marble", "high gloss"],
    description: "High-gloss, scratch-resistant marble-effect sheets. Give real marble look at 70% less cost.",
    descriptionHi: "हाई-ग्लॉस, स्क्रैच-रेजिस्टेंट मार्बल इफेक्ट शीट्स। असली मार्बल जैसा लुक 70% कम लागत पर।",
    bestFor: ["Bathroom Walls", "Kitchen Walls", "Pooja Room", "Feature Wall", "Countertops"],
    pros: ["Real marble look at 70% less cost", "100% waterproof", "Scratch resistant", "No grout lines", "Easy to clean", "Lightweight"],
    cons: ["Not heat resistant (avoid near stove)", "Can scratch with sharp objects"],
    imagePrompt: "UV marble sheet wall cladding in a modern bathroom, high-gloss finish, seamless look",
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen",
    nameHi: "मॉड्यूलर किचन",
    category: "kitchen",
    priceMin: 60000,
    priceMax: 200000,
    unit: "item",
    waterproof: true,
    installationDays: 7,
    warranty: "1 year",
    emoji: "🍳",
    keywords: ["modular kitchen", "kitchen interior", "radhoi", "rasoi", "kitchen cabinet"],
    description: "Custom-designed modular kitchen with premium plywood, soft-close drawers, and granite countertop.",
    descriptionHi: "प्रीमियम प्लाईवुड, सॉफ्ट-क्लोज दराज और ग्रेनाइट काउंटरटॉप के साथ कस्टम-डिज़ाइन मॉड्यूलर किचन।",
    bestFor: ["Small Kitchen", "Medium Kitchen", "Large Kitchen", "Open Kitchen"],
    pros: ["Maximizes space", "Soft-close mechanism", "Easy to clean", "Waterproof finish", "Customizable layout", "5 year warranty on hardware"],
    cons: ["Higher initial cost", "Requires professional installation"],
    imagePrompt: "modern modular kitchen with gloss finish, chimney, and island, Indian home",
  },
  {
    id: "tv-unit",
    name: "Modular TV Unit",
    nameHi: "मॉड्यूलर टीवी यूनिट",
    category: "furniture",
    priceMin: 15000,
    priceMax: 75000,
    unit: "item",
    waterproof: false,
    installationDays: 2,
    warranty: "1 year",
    emoji: "📺",
    keywords: ["tv unit", "tv panel", "tv cabinet", "tv wall", "entertainment unit"],
    description: "Custom-designed TV unit with cable management, storage, and optional LED backlighting.",
    descriptionHi: "केबल मैनेजमेंट, स्टोरेज और वैकल्पिक LED बैकलाइटिंग के साथ कस्टम-डिज़ाइन टीवी यूनिट।",
    bestFor: ["Living Room", "Bedroom", "Home Theater"],
    pros: ["Custom size", "Cable management", "LED lighting option", "Premium finish", "Built-in storage"],
    cons: ["Fixed design", "Cannot reposition easily"],
    imagePrompt: "modern modular TV unit with LED backlight, wood finish, home theater setup",
  },
  {
    id: "wallpaper",
    name: "Wallpaper & Wall Coverings",
    nameHi: "वॉलपेपर और वॉल कवरिंग",
    category: "wall",
    priceMin: 30,
    priceMax: 150,
    unit: "sqft",
    waterproof: false,
    installationDays: 1,
    warranty: "6 months",
    emoji: "🖼️",
    keywords: ["wallpaper", "wall covering", "deewar paper", "accent wall", "designer wall"],
    description: "Premium imported and domestic wallpapers in hundreds of patterns. Quick installation, transforms any room.",
    descriptionHi: "सैकड़ों पैटर्न में प्रीमियम आयातित और घरेलू वॉलपेपर। त्वरित स्थापना, किसी भी कमरे को बदल देता है।",
    bestFor: ["Bedroom Accent Wall", "Living Room Feature Wall", "Kids Room", "Office", "Restaurant"],
    pros: ["Hundreds of designs", "Quick installation", "Cost-effective transformation", "Easy to clean (vinyl)", "Removable"],
    cons: ["Not waterproof (unless vinyl)", "Can peel in humidity", "May need prep work"],
    imagePrompt: "elegant wallpaper in a bedroom accent wall with floral pattern, modern furniture",
  },
  {
    id: "office-interior",
    name: "Office Interior",
    nameHi: "ऑफिस इंटीरियर",
    category: "complete",
    priceMin: 80,
    priceMax: 200,
    unit: "sqft",
    waterproof: false,
    installationDays: 10,
    warranty: "1 year",
    emoji: "🏢",
    keywords: ["office interior", "office ceiling", "office partition", "cabin", "workspace"],
    description: "Complete office interiors including grid ceiling, partition walls, workstations, and cabin designs.",
    descriptionHi: "ग्रिड सीलिंग, पार्टीशन दीवारों, वर्कस्टेशन और केबिन डिजाइन सहित पूरा ऑफिस इंटीरियर।",
    bestFor: ["Corporate Office", "Startup Office", "Cabin", "Reception", "Conference Room"],
    pros: ["Grid ceiling for AC access", "Glass partitions for light", "Professional look", "Acoustic options", "Quick installation"],
    cons: ["Higher cost per sqft", "Requires planning"],
    imagePrompt: "modern office interior with grid ceiling, glass partitions, and workstations",
  },
  {
    id: "bedroom-design",
    name: "Bedroom Interior Design",
    nameHi: "बेडरूम इंटीरियर डिज़ाइन",
    category: "complete",
    priceMin: 120,
    priceMax: 250,
    unit: "sqft",
    waterproof: false,
    installationDays: 5,
    warranty: "1 year",
    emoji: "🛏️",
    keywords: ["bedroom", "bedroom design", "kamra design", "master bedroom"],
    description: "Complete bedroom interiors including ceiling, wardrobes, bed back panels, and accent walls.",
    descriptionHi: "सीलिंग, वार्डरोब, बेड बैक पैनल और एक्सेंट दीवारों सहित पूरा बेडरूम इंटीरियर।",
    bestFor: ["Master Bedroom", "Guest Bedroom", "Kids Bedroom"],
    pros: ["Complete solution", "Custom wardrobes", "Designer ceiling", "Accent wall options", "LED lighting"],
    cons: ["Requires size measurements"],
    imagePrompt: "luxury bedroom interior with gypsum ceiling cove lighting, WPC accent wall, wooden wardrobe",
  },
  {
    id: "complete-home",
    name: "Complete Home Interior",
    nameHi: "पूरा घर इंटीरियर",
    category: "complete",
    priceMin: 120,
    priceMax: 200,
    unit: "sqft",
    waterproof: false,
    installationDays: 20,
    warranty: "1 year",
    emoji: "🏡",
    keywords: ["complete interior", "full home", "poora ghar", "pura ghar", "full house"],
    description: "One-stop solution for entire home - ceiling, wall panels, TV unit, modular kitchen, wardrobes.",
    descriptionHi: "पूरे घर के लिए वन-स्टॉप समाधान - सीलिंग, वॉल पैनल, टीवी यूनिट, मॉड्यूलर किचन, वार्डरोब।",
    bestFor: ["New Home", "Full Renovation", "Apartment", "Villa", "Bungalow"],
    pros: ["Single point of contact", "Combo discount", "Unified design theme", "Faster execution", "Better coordination"],
    cons: ["Higher upfront cost", "Requires 2-4 weeks"],
    imagePrompt: "beautiful Indian home interior with modern ceiling, TV unit, and dining area",
  },
];

// ============================================
// MATERIALS DATABASE
// ============================================

export const MATERIALS: Material[] = [
  {
    id: "gypsum-board",
    name: "Gypsum Board",
    durability: "10-15 years in dry areas",
    maintenance: "Low - dust occasionally, repaint every 5-7 years",
    suitableFor: ["Living Room", "Bedroom", "Dining Room", "Office Cabin", "Hall"],
    notRecommendedFor: ["Bathroom", "Kitchen", "Balcony", "Outdoor"],
    ecoFriendly: true,
    fireResistant: true,
    texture: ["Smooth", "Matte", "Can be painted any color"],
  },
  {
    id: "pvc-panel",
    name: "PVC Panel",
    durability: "20+ years",
    maintenance: "Zero - just wipe with damp cloth",
    suitableFor: ["Bathroom", "Kitchen", "Balcony", "Shop", "Office", "Any Room"],
    notRecommendedFor: ["None - works everywhere"],
    ecoFriendly: false,
    fireResistant: false,
    texture: ["Wood", "Marble", "Glossy", "Matte", "3D Printed"],
  },
  {
    id: "wpc",
    name: "WPC (Wood Plastic Composite)",
    durability: "15-20 years",
    maintenance: "Zero - no polish, no varnish needed",
    suitableFor: ["TV Wall", "Accent Wall", "Bedroom Headboard", "Lobby", "Reception"],
    notRecommendedFor: ["Ceiling", "Wet areas without waterproof backing"],
    ecoFriendly: true,
    fireResistant: true,
    texture: ["Wood grain", "Fluted", "Grooved", "Plain", "3D"],
  },
  {
    id: "uv-marble",
    name: "UV Marble Sheet",
    durability: "15+ years",
    maintenance: "Low - wipe with damp cloth, no polish needed",
    suitableFor: ["Bathroom Walls", "Kitchen Walls", "Pooja Room", "Feature Wall", "Countertops"],
    notRecommendedFor: ["Near gas stove/high heat", "Outdoor direct sunlight"],
    ecoFriendly: false,
    fireResistant: false,
    texture: ["High-gloss marble", "Granite", "Stone", "Plain"],
  },
];

// ============================================
// ROOM SUGGESTIONS & RECOMMENDATIONS
// ============================================

export const ROOM_SUGGESTIONS: RoomSuggestion[] = [
  {
    roomType: "Living Room / Hall",
    bestCeiling: "Gypsum with cove lighting",
    bestWalls: "WPC panels on TV wall + paint on others",
    budgetOption: "PVC ceiling with wood texture",
    premiumOption: "Double-height gypsum with LED strips and POP design",
    notes: ["Cove lighting makes the room look bigger", "TV wall should be the focal point", "Use warm white LEDs for cozy feel"],
  },
  {
    roomType: "Bedroom",
    bestCeiling: "Gypsum with soft cove lighting",
    bestWalls: "WPC headboard panel + wallpaper on accent wall",
    budgetOption: "PVC ceiling with marble texture",
    premiumOption: "Fluted WPC panels + LED strip behind bed + designer ceiling",
    notes: ["Keep lighting dimmable", "Headboard wall adds luxury feel", "Wardrobe should match ceiling design"],
  },
  {
    roomType: "Kitchen",
    bestCeiling: "PVC ceiling - waterproof",
    bestWalls: "UV marble sheets on backsplash + paint on others",
    budgetOption: "PVC ceiling + glossy tiles on wall",
    premiumOption: "PVC ceiling + full UV marble walls + modular cabinets",
    notes: ["PVC is mandatory for waterproofing", "Avoid gypsum at all costs", "Lighting should be bright white"],
  },
  {
    roomType: "Bathroom",
    bestCeiling: "PVC ceiling only",
    bestWalls: "UV marble sheets or ceramic tiles",
    budgetOption: "PVC ceiling + ceramic tiles",
    premiumOption: "PVC ceiling + full UV marble walls + LED mirror",
    notes: ["100% waterproof materials only", "PVC is non-negotiable for bathroom ceiling", "Use anti-skid flooring"],
  },
  {
    roomType: "Office",
    bestCeiling: "Grid ceiling for AC access",
    bestWalls: "Glass partitions or gypsum partitions",
    budgetOption: "Grid ceiling + paint walls",
    premiumOption: "Gypsum ceiling with rafts + acoustic WPC panels",
    notes: ["Grid ceiling allows easy AC/electrical access", "Glass partitions create open feeling", "Acoustic panels reduce noise"],
  },
  {
    roomType: "Balcony",
    bestCeiling: "PVC ceiling (waterproof)",
    bestWalls: "UV marble sheets or artificial grass",
    budgetOption: "PVC ceiling + paint",
    premiumOption: "PVC ceiling + artificial grass wall + wooden deck flooring",
    notes: ["Exposed to rain - PVC only", "Artificial grass looks great and requires no watering"],
  },
];

// ============================================
// WATERPROOF SOLUTIONS REFERENCE
// ============================================

export const WATERPROOF_SOLUTIONS = {
  ceiling: {
    best: "PVC Ceiling",
    alternative: "None - only PVC is 100% waterproof for ceilings",
    price: "₹75-150/sq.ft",
    features: ["Termite-proof", "Zero maintenance", "20+ year life", "Never repaint"],
  },
  walls: {
    best: "UV Marble Sheets",
    alternative: "WPC Panels (moisture-resistant, but more expensive)",
    price: "₹45-120/sq.ft (UV), ₹180-650/sq.ft (WPC)",
    features: ["100% waterproof", "Easy to clean", "Mold/mildew resistant", "Scratch resistant"],
  },
  kitchens: {
    recommendation: "PVC ceiling + UV marble backsplash + modular kitchen",
    note: "Avoid wood in wet areas of kitchen",
  },
  bathrooms: {
    recommendation: "PVC ceiling + UV marble walls + anti-skid flooring",
    note: "No gypsum anywhere in bathroom",
  },
};

// ============================================
// PROJECT TYPES & ESTIMATES
// ============================================

export interface ProjectTemplate {
  id: string;
  name: string;
  rooms: { type: string; size: string; sqft: number }[];
  materialMix: string;
  estimatedLow: number;
  estimatedHigh: number;
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "1bhk",
    name: "1 BHK Complete",
    rooms: [
      { type: "Hall", size: "12x14", sqft: 168 },
      { type: "Bedroom", size: "10x12", sqft: 120 },
      { type: "Kitchen", size: "8x10", sqft: 80 },
      { type: "Bathroom", size: "5x8", sqft: 40 },
    ],
    materialMix: "Hall & Bedroom: Gypsum | Kitchen & Bathroom: PVC",
    estimatedLow: 35000,
    estimatedHigh: 55000,
  },
  {
    id: "2bhk",
    name: "2 BHK Complete",
    rooms: [
      { type: "Hall", size: "14x16", sqft: 224 },
      { type: "Bedroom 1", size: "12x12", sqft: 144 },
      { type: "Bedroom 2", size: "10x12", sqft: 120 },
      { type: "Kitchen", size: "8x10", sqft: 80 },
      { type: "Bathroom 1", size: "5x8", sqft: 40 },
      { type: "Bathroom 2", size: "5x8", sqft: 40 },
    ],
    materialMix: "Hall & Bedrooms: Gypsum | Kitchen & Bathrooms: PVC",
    estimatedLow: 65000,
    estimatedHigh: 100000,
  },
  {
    id: "3bhk",
    name: "3 BHK Complete",
    rooms: [
      { type: "Hall", size: "16x18", sqft: 288 },
      { type: "Bedroom 1", size: "12x14", sqft: 168 },
      { type: "Bedroom 2", size: "12x12", sqft: 144 },
      { type: "Bedroom 3", size: "10x12", sqft: 120 },
      { type: "Kitchen", size: "9x10", sqft: 90 },
      { type: "Bathroom 1", size: "6x8", sqft: 48 },
      { type: "Bathroom 2", size: "5x8", sqft: 40 },
      { type: "Bathroom 3", size: "5x8", sqft: 40 },
    ],
    materialMix: "Hall & Bedrooms: Gypsum + TV wall WPC | Kitchen & Bathrooms: PVC",
    estimatedLow: 100000,
    estimatedHigh: 160000,
  },
  {
    id: "office-500",
    name: "Office (500 sq.ft)",
    rooms: [
      { type: "Reception", size: "15x10", sqft: 150 },
      { type: "Work Area", size: "20x15", sqft: 300 },
      { type: "Cabin", size: "10x10", sqft: 100 },
    ],
    materialMix: "Grid ceiling everywhere + glass partitions",
    estimatedLow: 45000,
    estimatedHigh: 80000,
  },
];

// ============================================
// FAQs (Bilingual - Hindi + English)
// ============================================

export const FAQS: FAQ[] = [
  {
    question: "What is the price of gypsum false ceiling?",
    questionHi: "जिप्सम फॉल्स सीलिंग की कीमत क्या है?",
    answer: "Gypsum false ceiling costs ₹75-210 per sq.ft. Basic design starts at ₹75/sq.ft, premium with cove lighting goes up to ₹135-210/sq.ft. A standard 12x12 ft room (144 sq.ft) costs ₹10,800-30,200.",
    answerHi: "जिप्सम फॉल्स सीलिंग ₹75-210 प्रति वर्ग फुट है। बेसिक डिज़ाइन ₹75/वर्ग फुट से शुरू होता है, कोव लाइटिंग के साथ प्रीमियम ₹135-210/वर्ग फुट तक जाता है। एक मानक 12x12 फुट कमरे (144 वर्ग फुट) की कीमत ₹10,800-30,200 है।",
    tags: ["pricing", "gypsum", "ceiling"],
  },
  {
    question: "Is PVC ceiling waterproof?",
    questionHi: "क्या पीवीसी सीलिंग वाटरप्रूफ है?",
    answer: "Yes! PVC ceiling is 100% waterproof, termite-proof, and maintenance-free. It's perfect for bathrooms, kitchens, and balconies. Price: ₹75-150 per sq.ft.",
    answerHi: "हाँ! पीवीसी सीलिंग 100% वाटरप्रूफ, दीमक प्रूफ और मेंटेनेंस-फ्री है। यह बाथरूम, किचन और बालकनी के लिए परफेक्ट है। कीमत: ₹75-150 प्रति वर्ग फुट।",
    tags: ["waterproof", "pvc", "bathroom"],
  },
  {
    question: "What is the difference between PVC and Gypsum ceiling?",
    questionHi: "पीवीसी और जिप्सम सीलिंग में क्या अंतर है?",
    answer: "PVC: 100% waterproof, zero maintenance, 20+ year life, ₹75-150/sq.ft - best for bathrooms/kitchens. Gypsum: premium look with cove lighting, not waterproof, ₹75-210/sq.ft - best for halls/bedrooms.",
    answerHi: "पीवीसी: 100% वाटरप्रूफ, जीरो मेंटेनेंस, 20+ साल लाइफ, ₹75-150/वर्ग फुट - बाथरूम/किचन के लिए सबसे अच्छा। जिप्सम: कोव लाइटिंग के साथ प्रीमियम लुक, वाटरप्रूफ नहीं, ₹75-210/वर्ग फुट - हॉल/बेडरूम के लिए सबसे अच्छा।",
    tags: ["comparison", "gypsum", "pvc"],
  },
  {
    question: "Do you provide free site visit?",
    questionHi: "क्या आप मुफ्त साइट विजिट प्रदान करते हैं?",
    answer: "Yes! Site visit is completely FREE. Our expert will visit, take measurements, show design options, and provide a written quotation. No obligation to book. Call +91 8541849118 to schedule.",
    answerHi: "हाँ! साइट विजिट पूरी तरह से मुफ्त है। हमारा विशेषज्ञ आएगा, माप लेगा, डिज़ाइन विकल्प दिखाएगा और एक लिखित कोटेशन देगा। बुक करने की कोई बाध्यता नहीं। शेड्यूल करने के लिए +91 8541849118 पर कॉल करें।",
    tags: ["booking", "free", "visit"],
  },
  {
    question: "How long does installation take?",
    questionHi: "इंस्टॉलेशन में कितना समय लगता है?",
    answer: "PVC ceiling: 1 day per room. Gypsum ceiling: 2-3 days per room. Complete 2BHK home: 5-7 days. We provide a clear timeline before starting.",
    answerHi: "पीवीसी सीलिंग: 1 दिन प्रति कमरा। जिप्सम सीलिंग: 2-3 दिन प्रति कमरा। पूरा 2BHK घर: 5-7 दिन। हम शुरू करने से पहले एक स्पष्ट टाइमलाइन प्रदान करते हैं।",
    tags: ["installation", "time", "duration"],
  },
  {
    question: "What is the warranty on your work?",
    questionHi: "आपके काम पर क्या वारंटी है?",
    answer: "We provide 1 year written warranty on all installations. If any issue arises (peeling, cracking, installation defects), we repair it for free. ISI-certified branded materials only.",
    answerHi: "हम सभी इंस्टॉलेशन पर 1 साल की लिखित वारंटी प्रदान करते हैं। कोई भी समस्या आती है (पीलिंग, क्रैकिंग, इंस्टॉलेशन दोष), हम मुफ्त में मरम्मत करते हैं। केवल ISI-प्रमाणित ब्रांडेड सामग्री।",
    tags: ["warranty", "quality", "guarantee"],
  },
  {
    question: "Which areas do you serve?",
    questionHi: "आप किन क्षेत्रों में सेवा देते हैं?",
    answer: "We serve Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia, and all areas within 80 km radius of Forbesganj.",
    answerHi: "हम फोर्बेसगंज, अररिया, जोगबनी, रानीगंज, नरपतगंज, कुर्साकांटा, त्रिबेनीगंज, छतापुर, सुपौल, पूर्णिया और फोर्बेसगंज के 80 किमी दायरे के सभी क्षेत्रों में सेवा देते हैं।",
    tags: ["area", "location", "service"],
  },
  {
    question: "What is the cost of WPC wall panels?",
    questionHi: "डब्ल्यूपीसी वॉल पैनल की कीमत क्या है?",
    answer: "WPC panels cost ₹180-650 per sq.ft. A standard TV wall (8 ft x 7 ft = 56 sq.ft) costs ₹10,000-36,000 depending on design. Fluted/ribbed designs cost more.",
    answerHi: "डब्ल्यूपीसी पैनल की कीमत ₹180-650 प्रति वर्ग फुट है। एक मानक टीवी वॉल (8 फुट x 7 फुट = 56 वर्ग फुट) की कीमत डिज़ाइन के अनुसार ₹10,000-36,000 है। फ्लूटेड/रिब्ड डिज़ाइन अधिक महंगे हैं।",
    tags: ["pricing", "wpc", "wall"],
  },
  {
    question: "Do you do modular kitchens?",
    questionHi: "क्या आप मॉड्यूलर किचन करते हैं?",
    answer: "Yes! We design and install complete modular kitchens starting ₹60,000. Includes BWP plywood, soft-close drawers, granite countertop, and chimney installation.",
    answerHi: "हाँ! हम ₹60,000 से शुरू होने वाले पूर्ण मॉड्यूलर किचन डिज़ाइन और इंस्टॉल करते हैं। इसमें BWP प्लाईवुड, सॉफ्ट-क्लोज दराज, ग्रेनाइट काउंटरटॉप और चिमनी इंस्टॉलेशन शामिल है।",
    tags: ["kitchen", "modular", "service"],
  },
  {
    question: "Can you match a design I saw on Pinterest?",
    questionHi: "क्या आप Pinterest पर देखे गए डिज़ाइन से मिलान कर सकते हैं?",
    answer: "Absolutely! Share the photo on WhatsApp at +91 8651070831. Our designer will create a similar design within your budget and provide an estimate.",
    answerHi: "बिल्कुल! WhatsApp पर +91 8651070831 पर फोटो शेयर करें। हमारा डिज़ाइनर आपके बजट के भीतर समान डिज़ाइन तैयार करेगा और अनुमान प्रदान करेगा।",
    tags: ["design", "reference", "image"],
  },
];

// ============================================
// LOCATIONS COVERED
// ============================================

export const LOCATIONS = {
  headquarters: "Forbesganj, Araria, Bihar",
  cities: [
    "Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj",
    "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia",
    "Katihar", "Kishanganj", "Bhargama", "Palasi",
  ],
  radiusKm: 80,
  getCoverageMessage: (city?: string) => {
    if (city && LOCATIONS.cities.some(c => c.toLowerCase() === city.toLowerCase())) {
      return `Yes, we serve ${city}! Free site visit available.`;
    }
    return `We serve ${LOCATIONS.cities.join(", ")} and surrounding areas within ${LOCATIONS.radiusKm} km of Forbesganj.`;
  },
};

// ============================================
// RECOMMENDATION ENGINE RULES
// ============================================

export interface RecommendationResult {
  service: Service;
  reason: string;
  reasonHi: string;
  estimatedPrice: string;
}

export function getRecommendation(
  roomType?: string,
  isWetArea?: boolean,
  budget?: "low" | "mid" | "high",
  wantWaterproof?: boolean
): RecommendationResult | null {
  // Waterproof required
  const priceOf = (s: Service) => `₹${s.priceMin}-${s.priceMax} per sq.ft`;

  if (wantWaterproof || isWetArea) {
    const pvc = SERVICES.find(s => s.id === "pvc-ceiling")!;
    return {
      service: pvc,
      reason: "100% waterproof, zero maintenance, perfect for bathrooms and kitchens",
      reasonHi: "100% वाटरप्रूफ, जीरो मेंटेनेंस, बाथरूम और किचन के लिए परफेक्ट",
      estimatedPrice: priceOf(pvc),
    };
  }

  // Room-specific recommendations
  if (roomType?.toLowerCase().includes("hall") || roomType?.toLowerCase().includes("living")) {
    if (budget === "low") {
      const pvc = SERVICES.find(s => s.id === "pvc-ceiling")!;
      return {
        service: pvc,
        reason: "Budget-friendly, waterproof, zero maintenance",
        reasonHi: "बजट-फ्रेंडली, वाटरप्रूफ, जीरो मेंटेनेंस",
        estimatedPrice: priceOf(pvc),
      };
    }
    const gypsum = SERVICES.find(s => s.id === "gypsum-ceiling")!;
    return {
      service: gypsum,
      reason: "Premium cove lighting and POP designs - best for living room",
      reasonHi: "प्रीमियम कोव लाइटिंग और POP डिज़ाइन - लिविंग रूम के लिए सबसे अच्छा",
      estimatedPrice: priceOf(gypsum),
    };
  }

  if (roomType?.toLowerCase().includes("bedroom")) {
    const gypsum = SERVICES.find(s => s.id === "gypsum-ceiling")!;
    return {
      service: gypsum,
      reason: "Smooth finish with soft cove lighting - creates cozy ambiance",
      reasonHi: "सॉफ्ट कोव लाइटिंग के साथ स्मूथ फिनिश - आरामदायक माहौल बनाता है",
      estimatedPrice: priceOf(gypsum),
    };
  }

  if (roomType?.toLowerCase().includes("kitchen") || roomType?.toLowerCase().includes("bathroom")) {
    const pvc = SERVICES.find(s => s.id === "pvc-ceiling")!;
    return {
      service: pvc,
      reason: "100% waterproof - essential for wet areas",
      reasonHi: "100% वाटरप्रूफ - गीले क्षेत्रों के लिए आवश्यक",
      estimatedPrice: priceOf(pvc),
    };
  }

  // Default
  const defaultService = budget === "low"
    ? SERVICES.find(s => s.id === "pvc-ceiling")!
    : SERVICES.find(s => s.id === "gypsum-ceiling")!;
  return {
    service: defaultService,
    reason: "Versatile and popular choice for most rooms",
    reasonHi: "अधिकांश कमरों के लिए बहुमुखी और लोकप्रिय विकल्प",
    estimatedPrice: priceOf(defaultService),
  };
}

// ============================================
// BOOKING & SITE VISIT
// ============================================

export const BOOKING_INFO = {
  isFree: true,
  process: [
    "Call or WhatsApp +91 8651070831",
    "Share your name, city, and preferred date",
    "Our expert visits at scheduled time",
    "Measurements taken on site",
    "Design consultation and material samples shown",
    "Written quotation provided within 24 hours",
  ],
  noObligation: true,
  whatToExpect: [
    "Exact room measurements",
    "Design options based on your preference",
    "Material samples (PVC, gypsum, WPC, UV marble)",
    "Transparent pricing with no hidden charges",
    "Timeline commitment",
  ],
  contactMethods: [
    { type: "Call", number: "+91 8541849118", timing: "9 AM - 7 PM, Mon-Sat" },
    { type: "WhatsApp", number: "+91 8651070831", timing: "24/7" },
    { type: "Email", email: "contact@jkinterior.online", timing: "Response within 24 hours" },
  ],
};

// ============================================
// CONSTANTS FOR PRICING CALCULATIONS
// ============================================

export const RATES_PER_SQFT = {
  gypsum: { low: 80, mid: 110, high: 140, premium: 200 },
  pvc: { low: 80, mid: 110, high: 140, premium: 170 },
  wpc: { low: 180, mid: 300, high: 450, premium: 600 },
  uv: { low: 50, mid: 70, high: 95, premium: 120 },
  fluted: { low: 200, mid: 350, high: 500, premium: 700 },
  grid: { low: 45, mid: 65, high: 90, premium: 110 },
  wallpaper: { low: 30, mid: 70, high: 150, premium: 250 },
  artificialGrass: { low: 40, mid: 80, high: 120, premium: 180 },
};

export const STANDARD_ROOM_SIZES = {
  smallBedroom: { length: 10, width: 12, sqft: 120 },
  mediumBedroom: { length: 12, width: 12, sqft: 144 },
  largeBedroom: { length: 12, width: 14, sqft: 168 },
  smallHall: { length: 12, width: 14, sqft: 168 },
  mediumHall: { length: 14, width: 16, sqft: 224 },
  largeHall: { length: 16, width: 18, sqft: 288 },
  kitchen: { length: 8, width: 10, sqft: 80 },
  bathroom: { length: 5, width: 8, sqft: 40 },
};

// ============================================
// QUICK REPLY SUGGESTIONS (for UI)
// ============================================

export const QUICK_REPLIES = {
  initial: [
    "PVC Ceiling Rate",
    "Gypsum Ceiling Price",
    "Book Free Site Visit",
    "WPC Panel Cost",
    "Waterproof Solutions",
  ],
  pricing: [
    "Gypsum ceiling price per sqft",
    "PVC ceiling rate",
    "WPC panel cost",
    "Complete home interior cost",
    "Modular TV unit price",
  ],
  booking: [
    "Book free site visit",
    "Call me back",
    "WhatsApp number",
    "Schedule appointment",
  ],
  comparison: [
    "PVC vs Gypsum comparison",
    "WPC vs UV marble difference",
    "Which is better for bedroom?",
    "Best material for bathroom",
  ],
};

// ============================================
// EXPORT ALL
// ============================================

export const KNOWLEDGE_BASE = {
  company: COMPANY,
  services: SERVICES,
  materials: MATERIALS,
  roomSuggestions: ROOM_SUGGESTIONS,
  waterproofSolutions: WATERPROOF_SOLUTIONS,
  projectTemplates: PROJECT_TEMPLATES,
  faqs: FAQS,
  locations: LOCATIONS,
  bookingInfo: BOOKING_INFO,
  rates: RATES_PER_SQFT,
  standardRoomSizes: STANDARD_ROOM_SIZES,
  quickReplies: QUICK_REPLIES,
  getRecommendation,
};

export default KNOWLEDGE_BASE;