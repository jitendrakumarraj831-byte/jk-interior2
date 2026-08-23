export const SITE_URL = 'https://www.jkinterior.online'
export const SITE_NAME = 'JK Interior'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const BUSINESS = {
  name: 'JK Interior',
  nameHi: 'जेके इंटीरियर',
  tagline: "Bihar's Most Trusted Interior Contractor",
  // phone1 = primary business number (matches Google Business Profile)
  phone1: '+91-8541849118',
  // phone2 = secondary WhatsApp / website contact
  phone2: '+91-8651070831',
  whatsapp: '918651070831',
  email: 'jkinteriorofficial@gmail.com',
  address: {
    street: 'Damaria Rewahi',
    city: 'Forbesganj',
    district: 'Araria',
    state: 'Bihar',
    postalCode: '854318',
    country: 'IN',
  },
  geo: { lat: 26.3001, lng: 87.2533 },
  hours: 'Mon–Sat 8:00 AM – 8:00 PM',
  hoursSun: 'Sun 9:00 AM – 6:00 PM',
  priceRange: '₹₹',
  founded: '2019',
} as const

export const SERVICES_LIST = [
  'PVC False Ceiling',
  'Gypsum Ceiling',
  'WPC Wall Panel',
  'UV Marble Sheet',
  'Modular TV Unit',
  'Complete Interior Design',
  'Bedroom Interior',
  'Kitchen Interior',
  'Office Interior',
  'ACP Exterior',
  'Louvers Panel',
  'Charcoal Panel',
] as const

export interface CityData {
  slug: string
  name: string
  nameHi: string
  district: string
  state: string
  distance: string
  description: string
  uniqueContent: string
  keywords: string[]
  faqs: { q: string; a: string }[]
}

export const CITIES: CityData[] = [
  {
    slug: 'forbesganj',
    name: 'Forbesganj',
    nameHi: 'फोर्बेसगंज',
    district: 'Araria',
    state: 'Bihar',
    distance: 'Main Office',
    description:
      'JK Interior is headquartered in Forbesganj. We are the most trusted interior design and false ceiling contractor for homes, shops, and offices in Forbesganj, Araria.',
    uniqueContent:
      "Forbesganj is the heart of JK Interior's operations. As the primary base of our business, we serve every neighbourhood in Forbesganj with the fastest response time and most competitive pricing. Whether you need a modern PVC false ceiling for your living room, a gypsum ceiling with cove lighting, WPC wall panels for your TV unit, or a complete home interior makeover — JK Interior delivers premium results at budget-friendly prices right here in Forbesganj.",
    keywords: [
      'interior designer Forbesganj',
      'false ceiling contractor Forbesganj',
      'PVC ceiling Forbesganj',
      'gypsum ceiling Forbesganj',
      'WPC wall panel Forbesganj',
      'TV unit design Forbesganj',
      'interior design Forbesganj Bihar',
      'best interior designer Forbesganj',
      'JK Interior Forbesganj',
      'false ceiling near me Forbesganj',
      'interior designer Dumariya',
      'false ceiling Dumariya Forbesganj',
      'JK Interior Dumariya',
    ],
    faqs: [
      {
        q: 'फोर्बेसगंज में PVC फॉल्स सीलिंग का क्या रेट है?',
        a: 'फोर्बेसगंज में PVC फॉल्स सीलिंग ₹75–₹150 प्रति sq.ft से शुरू होती है, डिज़ाइन और लाइटिंग के हिसाब से रेट बदलता है। सही रेट जानने के लिए +91 8541849118 पर कॉल करें, फ्री कोटेशन देंगे।',
      },
      {
        q: 'क्या JK Interior फोर्बेसगंज में फ्री साइट विज़िट देती है?',
        a: 'हाँ भाई, फोर्बेसगंज में हम फ्री साइट विज़िट देते हैं। हमारी टीम खुद आपके घर या दुकान आकर सही माप लेती है और उसी हिसाब से अनुमान बताती है।',
      },
      {
        q: 'फोर्बेसगंज में जिप्सम सीलिंग कितने दिन में तैयार होती है?',
        a: 'एक सामान्य कमरे की जिप्सम सीलिंग फोर्बेसगंज में 1–3 दिन में तैयार हो जाती है। बड़े काम के लिए हम पहले ही सही टाइमलाइन बता देते हैं।',
      },
    ],
  },
  {
    slug: 'araria',
    name: 'Araria',
    nameHi: 'अरारिया',
    district: 'Araria',
    state: 'Bihar',
    distance: '22 km from Forbesganj',
    description:
      "JK Interior provides premium false ceiling, PVC wall paneling, and interior design services in Araria. We are Araria district's top-rated interior contractor.",
    uniqueContent:
      "Araria is the district headquarters and a growing hub for modern interior design. JK Interior serves all areas of Araria city — from residential apartments to commercial showrooms and offices. Our team travels regularly to Araria and maintains quick turnaround times. Whether it's a gypsum ceiling for your drawing room, PVC panels for your shop, or a full office interior — we handle it all with professional expertise in Araria.",
    keywords: [
      'interior designer Araria',
      'false ceiling contractor Araria',
      'PVC ceiling Araria Bihar',
      'gypsum ceiling Araria',
      'interior design Araria district',
      'best interior designer Araria',
      'JK Interior Araria',
      'false ceiling near me Araria',
      'WPC wall panel Araria',
    ],
    faqs: [
      {
        q: 'अरारिया में सबसे अच्छा इंटीरियर डिज़ाइनर कौन है?',
        a: 'हम JK Interior हैं, अरारिया ज़िला में सबसे भरोसेमंद नाम। 500+ प्रोजेक्ट पूरे कर चुके हैं और 1 साल की लिखित वारंटी देते हैं, तो अरारिया में इंटीरियर डिज़ाइन और फॉल्स सीलिंग का काम बेफिक्र होकर हमें दे सकते हैं।',
      },
      {
        q: 'अरारिया में जिप्सम सीलिंग की कीमत क्या है?',
        a: 'अरारिया में जिप्सम फॉल्स सीलिंग ₹75–₹210 प्रति sq.ft से शुरू होती है। Cove Lighting और मल्टी-लेवल डिज़ाइन चाहिए तो प्रीमियम रेंज में आएगा। फ्री साइट विज़िट के लिए +91 8541849118 पर कॉल करें।',
      },
      {
        q: 'क्या JK Interior अरारिया शहर में काम करती है?',
        a: 'हाँ, हम अरारिया शहर और पूरे ज़िले में काम करते हैं। हमारी टीम अरारिया में लगातार आती-जाती रहती है, तो काम में देरी नहीं होती।',
      },
    ],
  },
  {
    slug: 'purnia',
    name: 'Purnia',
    nameHi: 'पूर्णिया',
    district: 'Purnia',
    state: 'Bihar',
    distance: '65 km from Forbesganj',
    description:
      'JK Interior serves Purnia with premium gypsum ceiling, PVC false ceiling, WPC wall panel and complete interior design solutions at competitive prices.',
    uniqueContent:
      "Purnia is one of North Bihar's largest cities, and JK Interior is proud to serve its residents and businesses. From modern apartment false ceilings to commercial showroom interiors, our skilled team brings Forbesganj-quality craftsmanship to Purnia. We specialise in gypsum ceiling, PVC ceiling, WPC louvers, UV marble sheet cladding, and complete interior design projects for homes, offices, and shops across Purnia.",
    keywords: [
      'interior designer Purnia',
      'false ceiling contractor Purnia',
      'PVC ceiling Purnia Bihar',
      'gypsum ceiling Purnia',
      'interior design Purnia',
      'best interior designer Purnia Bihar',
      'WPC panel Purnia',
      'TV unit design Purnia',
      'false ceiling near me Purnia',
    ],
    faqs: [
      {
        q: 'पूर्णिया में इंटीरियर डिज़ाइनर कैसे संपर्क करें?',
        a: 'हमें +91 8541849118 पर कॉल करें या +91 8651070831 पर WhatsApp कर दें। पूर्णिया में हम फ्री साइट विज़िट करते हैं और पूरा कोटेशन बना कर देते हैं।',
      },
      {
        q: 'पूर्णिया में PVC सीलिंग का काम कितने दिन में होता है?',
        a: 'पूर्णिया में एक सामान्य कमरे का PVC सीलिंग काम 1–2 दिन में हो जाता है। हम पूर्णिया में नियमित आते हैं, इसलिए समय पर काम पूरा होने की गारंटी देते हैं।',
      },
      {
        q: 'पूर्णिया में JK Interior की सेवाएं क्या हैं?',
        a: 'पूर्णिया में हम PVC फॉल्स सीलिंग, जिप्सम सीलिंग, WPC वॉल पैनल, UV मार्बल शीट, TV यूनिट डिज़ाइन, बेडरूम इंटीरियर, ऑफिस इंटीरियर से लेकर पूरा इंटीरियर डिज़ाइन तक सब कुछ करते हैं।',
      },
    ],
  },
  {
    slug: 'jogbani',
    name: 'Jogbani',
    nameHi: 'जोगबनी',
    district: 'Araria',
    state: 'Bihar',
    distance: '35 km from Forbesganj',
    description:
      'JK Interior provides modern interior design, false ceiling, PVC wall paneling and WPC louver installation services in Jogbani, Araria district.',
    uniqueContent:
      'Jogbani, located at the India–Nepal border, is a bustling commercial town with growing demand for modern interior design. JK Interior serves residential homes, shops, hotels, and offices in Jogbani with premium false ceiling and wall paneling services. Our expertise in PVC ceiling, gypsum ceiling, WPC louvers, and fluted panels makes us the ideal choice for any interior project in Jogbani.',
    keywords: [
      'interior designer Jogbani',
      'false ceiling Jogbani',
      'PVC ceiling Jogbani Araria',
      'gypsum ceiling Jogbani',
      'WPC louvers Jogbani',
      'interior design Jogbani Bihar',
      'best interior contractor Jogbani',
      'false ceiling near me Jogbani',
    ],
    faqs: [
      {
        q: 'जोगबनी में फॉल्स सीलिंग का काम कौन करता है?',
        a: 'जोगबनी और अरारिया ज़िले में फॉल्स सीलिंग के लिए हम सबसे भरोसेमंद नाम हैं। PVC सीलिंग, जिप्सम सीलिंग या WPC वॉल पैनल — जो भी चाहिए, +91 8541849118 पर कॉल कर दें।',
      },
      {
        q: 'जोगबनी में इंटीरियर डिज़ाइन की कीमत क्या है?',
        a: 'जोगबनी में हमारे रेट जेब पर भारी नहीं पड़ते — PVC सीलिंग ₹75 प्रति sq.ft से और जिप्सम सीलिंग भी ₹75 से शुरू होती है। सही रेट जानने के लिए फ्री साइट विज़िट करवा लें।',
      },
      {
        q: 'क्या JK Interior जोगबनी में होम इंटीरियर सेवाएं देती है?',
        a: 'हाँ, जोगबनी में हम पूरा होम इंटीरियर, बेडरूम इंटीरियर, किचन इंटीरियर, फॉल्स सीलिंग और वॉल पैनलिंग — सब कुछ करते हैं।',
      },
    ],
  },
  {
    slug: 'supaul',
    name: 'Supaul',
    nameHi: 'सुपौल',
    district: 'Supaul',
    state: 'Bihar',
    distance: '55 km from Forbesganj',
    description:
      'JK Interior offers false ceiling, PVC wall paneling, gypsum ceiling and interior design services in Supaul district, Bihar at affordable prices.',
    uniqueContent:
      'Supaul district has seen rapid growth in construction and home improvement projects. JK Interior extends its services to Supaul city and surrounding areas, bringing modern interior design to this region. Our services include PVC false ceiling, gypsum ceiling with LED cove lighting, WPC wall panels, UV marble sheet cladding, modular TV units, and complete bedroom and office interiors in Supaul.',
    keywords: [
      'interior designer Supaul',
      'false ceiling Supaul Bihar',
      'PVC ceiling Supaul',
      'gypsum ceiling Supaul district',
      'interior design Supaul',
      'false ceiling contractor Supaul',
      'WPC wall panel Supaul',
      'best interior designer Supaul Bihar',
    ],
    faqs: [
      {
        q: 'सुपौल में फॉल्स सीलिंग के लिए सबसे अच्छा ठेकेदार कौन है?',
        a: 'सुपौल ज़िले में फॉल्स सीलिंग और इंटीरियर डिज़ाइन के लिए हम भरोसेमंद नाम हैं। अब तक 500+ प्रोजेक्ट पूरे कर चुके हैं और PVC, जिप्सम, WPC — तीनों का काम करते हैं।',
      },
      {
        q: 'सुपौल में PVC सीलिंग की कीमत क्या है?',
        a: 'सुपौल में PVC फॉल्स सीलिंग ₹75–₹150 प्रति sq.ft से शुरू होती है। फ्री साइट विज़िट और कोटेशन के लिए +91 8541849118 पर बात कर लें।',
      },
      {
        q: 'क्या JK Interior सुपौल में आती है?',
        a: 'हाँ, हम सुपौल शहर और ज़िले के हर ब्लॉक में काम करते हैं — त्रिवेणीगंज, छतापुर समेत। फ्री साइट विज़िट भी करवा देते हैं।',
      },
    ],
  },
  {
    slug: 'narpatganj',
    name: 'Narpatganj',
    nameHi: 'नरपतगंज',
    district: 'Araria',
    state: 'Bihar',
    distance: '28 km from Forbesganj',
    description:
      'JK Interior provides expert false ceiling, PVC ceiling, gypsum ceiling and interior design services in Narpatganj, Araria district.',
    uniqueContent:
      'Narpatganj is one of the prominent blocks in Araria district, and JK Interior regularly serves its growing residential and commercial clients. Our team handles false ceiling installation, PVC and gypsum ceiling work, WPC wall paneling, UV marble sheet, and TV unit design in Narpatganj. We offer prompt service and free site visits in Narpatganj and nearby areas.',
    keywords: [
      'interior designer Narpatganj',
      'false ceiling Narpatganj',
      'PVC ceiling Narpatganj Araria',
      'gypsum ceiling Narpatganj',
      'interior design Narpatganj Bihar',
      'false ceiling contractor Narpatganj',
      'WPC wall panel Narpatganj',
      'best interior designer Narpatganj',
    ],
    faqs: [
      {
        q: 'नरपतगंज में इंटीरियर डिज़ाइन सेवाएं कौन देता है?',
        a: 'नरपतगंज में हम PVC सीलिंग, जिप्सम सीलिंग, WPC वॉल पैनल, UV मार्बल शीट से लेकर पूरा इंटीरियर डिज़ाइन तक करते हैं। कॉल करें: +91 8541849118।',
      },
      {
        q: 'नरपतगंज में फॉल्स सीलिंग की कीमत क्या है?',
        a: 'नरपतगंज में PVC सीलिंग ₹75 प्रति sq.ft से और जिप्सम सीलिंग भी ₹75 से शुरू होती है। सही अनुमान के लिए फ्री साइट विज़िट करवा लें।',
      },
      {
        q: 'JK Interior का ऑफिस नरपतगंज से कितने दूर है?',
        a: 'हमारा मुख्य ऑफिस फोर्बेसगंज में है, जो नरपतगंज से करीब 28 km दूर है। पर हम नरपतगंज में नियमित आते-जाते हैं, तो दूरी की चिंता न करें।',
      },
    ],
  },
  {
    slug: 'raniganj',
    name: 'Raniganj',
    nameHi: 'रानीगंज',
    district: 'Araria',
    state: 'Bihar',
    distance: '18 km from Forbesganj',
    description:
      'JK Interior serves Raniganj, Araria with modern interior design, false ceiling, PVC wall paneling and gypsum ceiling services at the best price.',
    uniqueContent:
      "Raniganj, a growing town in Araria district, is well within JK Interior's primary service zone. Being just 18 km from our Forbesganj office, we provide the fastest response and most competitive pricing for Raniganj clients. Our services include PVC false ceiling, gypsum ceiling design, WPC louvers, fluted wall panels, UV marble sheet cladding, modular TV units, and complete home interior solutions in Raniganj.",
    keywords: [
      'interior designer Raniganj',
      'false ceiling Raniganj Araria',
      'PVC ceiling Raniganj',
      'gypsum ceiling Raniganj Bihar',
      'interior design Raniganj',
      'false ceiling contractor Raniganj',
      'WPC panel Raniganj Araria',
      'best interior designer Raniganj Bihar',
    ],
    faqs: [
      {
        q: 'रानीगंज में फॉल्स सीलिंग का काम JK Interior करती है?',
        a: 'हाँ, रानीगंज में हम PVC फॉल्स सीलिंग, जिप्सम सीलिंग, WPC वॉल पैनल और पूरा इंटीरियर डिज़ाइन का काम करते हैं। फ्री साइट विज़िट भी करवा देते हैं।',
      },
      {
        q: 'रानीगंज में सीलिंग काम का रेट क्या है?',
        a: 'रानीगंज में PVC सीलिंग ₹75/sq.ft और जिप्सम सीलिंग भी ₹75/sq.ft से शुरू होती है। सही अनुमान चाहिए तो +91 8541849118 पर कॉल कर दें।',
      },
      {
        q: 'JK Interior रानीगंज में कितने समय में आ सकती है?',
        a: 'रानीगंज तो फोर्बेसगंज से बस 18 km दूर है, इसलिए हमारी टीम ज्यादातर 24 घंटे के अंदर वहां साइट विज़िट पर पहुंच जाती है।',
      },
    ],
  },
  {
    slug: 'tribeniganj',
    name: 'Tribeniganj',
    nameHi: 'त्रिवेणीगंज',
    district: 'Supaul',
    state: 'Bihar',
    distance: '48 km from Forbesganj',
    description:
      'JK Interior offers interior design, PVC ceiling, gypsum ceiling and wall paneling services in Tribeniganj, Supaul district at affordable prices.',
    uniqueContent:
      'Tribeniganj in Supaul district is an important commercial centre that JK Interior serves with dedicated interior design and ceiling solutions. Our skilled craftsmen handle PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, charcoal panels, and complete interior work for homes and commercial establishments in Tribeniganj.',
    keywords: [
      'interior designer Tribeniganj',
      'false ceiling Tribeniganj Supaul',
      'PVC ceiling Tribeniganj',
      'gypsum ceiling Tribeniganj',
      'interior design Tribeniganj Bihar',
      'false ceiling contractor Tribeniganj',
      'best interior designer Tribeniganj',
    ],
    faqs: [
      {
        q: 'त्रिवेणीगंज में इंटीरियर डिज़ाइनर कहाँ मिलेगा?',
        a: 'त्रिवेणीगंज में इंटीरियर डिज़ाइन के लिए हम भरोसेमंद नाम हैं। PVC सीलिंग, जिप्सम सीलिंग, WPC वॉल पैनल या पूरा इंटीरियर — जो भी काम हो, +91 8541849118 पर कॉल करें।',
      },
      {
        q: 'त्रिवेणीगंज में फॉल्स सीलिंग कितने में होगी?',
        a: 'त्रिवेणीगंज में PVC फॉल्स सीलिंग ₹75/sq.ft से और जिप्सम सीलिंग भी ₹75/sq.ft से शुरू होती है। फ्री साइट विज़िट करवा कर सही अनुमान ले सकते हैं।',
      },
      {
        q: 'क्या JK Interior त्रिवेणीगंज में सेवा देती है?',
        a: 'हाँ, सुपौल ज़िले के त्रिवेणीगंज में हम नियमित इंटीरियर डिज़ाइन और फॉल्स सीलिंग का काम करते हैं। फ्री साइट विज़िट के लिए आज ही कॉल कर दें।',
      },
    ],
  },
  {
    slug: 'kursakanta',
    name: 'Kursakanta',
    nameHi: 'कुर्साकाँटा',
    district: 'Araria',
    state: 'Bihar',
    distance: '32 km from Forbesganj',
    description:
      'JK Interior provides PVC false ceiling, gypsum ceiling, WPC wall panel and interior design services in Kursakanta, Araria district.',
    uniqueContent:
      'Kursakanta is a well-connected block in Araria district where JK Interior actively provides interior design and ceiling services. We serve residential homes, shops, and office spaces in Kursakanta with PVC false ceiling, gypsum ceiling, WPC wall panels, fluted panels, and complete interior solutions. Our team ensures quality workmanship with ISI-certified materials and a 1-year written warranty.',
    keywords: [
      'interior designer Kursakanta',
      'false ceiling Kursakanta Araria',
      'PVC ceiling Kursakanta',
      'gypsum ceiling Kursakanta Bihar',
      'interior design Kursakanta',
      'false ceiling contractor Kursakanta',
      'WPC wall panel Kursakanta',
    ],
    faqs: [
      {
        q: 'कुर्साकाँटा में फॉल्स सीलिंग ठेकेदार कौन है?',
        a: 'कुर्साकाँटा में फॉल्स सीलिंग के लिए हम सबसे अच्छा विकल्प हैं। PVC सीलिंग, जिप्सम सीलिंग, WPC पैनल या इंटीरियर डिज़ाइन — कॉल करें: +91 8541849118।',
      },
      {
        q: 'कुर्साकाँटा में इंटीरियर डिज़ाइन का काम JK Interior करती है?',
        a: 'हाँ, कुर्साकाँटा में हम PVC फॉल्स सीलिंग, जिप्सम सीलिंग, WPC वॉल पैनल, UV मार्बल शीट और TV यूनिट डिज़ाइन — सब कुछ करते हैं।',
      },
      {
        q: 'कुर्साकाँटा में PVC सीलिंग की कीमत क्या है?',
        a: 'कुर्साकाँटा में PVC फॉल्स सीलिंग ₹75/sq.ft से शुरू होती है। फ्री माप और अनुमान के लिए +91 8541849118 पर कॉल कर दें।',
      },
    ],
  },
  {
    slug: 'chhatapur',
    name: 'Chhatapur',
    nameHi: 'छतापुर',
    district: 'Supaul',
    state: 'Bihar',
    distance: '52 km from Forbesganj',
    description:
      'JK Interior provides false ceiling, PVC ceiling, gypsum ceiling and interior design services in Chhatapur, Supaul district at competitive prices.',
    uniqueContent:
      'Chhatapur in Supaul district is a growing town where JK Interior delivers modern interior design and false ceiling services. Our team handles PVC false ceiling, gypsum ceiling design, WPC wall panels, UV marble sheet, and complete bedroom and office interior projects in Chhatapur. We ensure high-quality craftsmanship, branded materials, and a 1-year warranty on all projects.',
    keywords: [
      'interior designer Chhatapur',
      'false ceiling Chhatapur Supaul',
      'PVC ceiling Chhatapur',
      'gypsum ceiling Chhatapur Bihar',
      'interior design Chhatapur',
      'false ceiling contractor Chhatapur',
      'WPC wall panel Chhatapur Supaul',
    ],
    faqs: [
      {
        q: 'छतापुर में इंटीरियर डिज़ाइनर कौन है?',
        a: 'छतापुर और सुपौल ज़िले में इंटीरियर के काम के लिए हम भरोसेमंद नाम हैं। PVC सीलिंग, जिप्सम सीलिंग या वॉल पैनल के लिए कॉल करें: +91 8541849118।',
      },
      {
        q: 'छतापुर में फॉल्स सीलिंग की कीमत क्या है?',
        a: 'छतापुर में PVC सीलिंग ₹75/sq.ft और जिप्सम सीलिंग भी ₹75/sq.ft से शुरू होती है। फ्री साइट विज़िट के लिए आज ही संपर्क कर लें।',
      },
      {
        q: 'क्या JK Interior छतापुर में सेवा देती है?',
        a: 'हाँ, सुपौल ज़िले के छतापुर में हम फॉल्स सीलिंग, वॉल पैनलिंग और इंटीरियर डिज़ाइन का काम करते हैं।',
      },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
