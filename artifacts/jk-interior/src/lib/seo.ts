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
    street: 'Damaria',
    city: 'Rewahi',
    district: 'Araria',
    state: 'Bihar',
    postalCode: '854318',
    country: 'IN',
  },
  geo: { lat: 26.3001, lng: 87.2533 },
  hours: 'Mon–Sat 8:00 AM – 8:00 PM',
  hoursSun: 'Sun 9:00 AM – 6:00 PM',
  priceRange: '₹₹',
  founded: '2016',
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
        q: 'Forbesganj में PVC false ceiling का क्या रेट है?',
        a: 'Forbesganj में PVC false ceiling की cost ₹70–₹120 per sq.ft से शुरू होती है। Design और lighting के अनुसार rate vary करता है। Free quotation के लिए call करें: +91 8541849118।',
      },
      {
        q: 'क्या JK Interior Forbesganj में free site visit देती है?',
        a: 'हाँ, JK Interior Forbesganj में free expert site visit provide करती है। हमारी team आपके घर/दुकान आकर exact measurements और estimate देती है।',
      },
      {
        q: 'Forbesganj में gypsum ceiling कितने दिन में ready होती है?',
        a: 'एक standard room की gypsum ceiling Forbesganj में 1–3 days में complete होती है। Larger projects के लिए detailed timeline पहले share की जाती है।',
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
        q: 'Araria में best interior designer कौन है?',
        a: 'JK Interior, Araria district का सबसे trusted interior contractor है। 500+ completed projects और 5 साल की warranty के साथ हम Araria में premium interior design और false ceiling services provide करते हैं।',
      },
      {
        q: 'Araria में gypsum ceiling की cost क्या है?',
        a: 'Araria में gypsum false ceiling ₹80–₹150 per sq.ft से शुरू होती है। Cove lighting और pop design extra charge के साथ available हैं। Free site visit के लिए: +91 8541849118।',
      },
      {
        q: 'क्या JK Interior Araria city में काम करती है?',
        a: 'हाँ, JK Interior Araria city और district के सभी areas में service provide करती है। हमारी team Araria में नियमित रूप से काम करती है।',
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
        q: 'Purnia में interior designer कैसे contact करें?',
        a: 'JK Interior को +91 8541849118 पर call या WhatsApp +91 8651070831 करें। हम Purnia में free site visit provide करते हैं और detailed quotation देते हैं।',
      },
      {
        q: 'Purnia में PVC ceiling का काम कितने दिन में होता है?',
        a: 'Purnia में एक standard room का PVC ceiling work 1–2 days में complete होता है। हम Purnia में regular visit करते हैं और on-time delivery guarantee करते हैं।',
      },
      {
        q: 'Purnia में JK Interior के services क्या हैं?',
        a: 'JK Interior Purnia में PVC False Ceiling, Gypsum Ceiling, WPC Wall Panel, UV Marble Sheet, TV Unit Design, Bedroom Interior, Office Interior और Complete Interior Design services provide करती है।',
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
        q: 'Jogbani में false ceiling का काम कौन करता है?',
        a: 'JK Interior Jogbani और Araria district में best false ceiling contractor है। PVC ceiling, gypsum ceiling और WPC wall panel के लिए +91 8541849118 पर call करें।',
      },
      {
        q: 'Jogbani में interior design की cost क्या है?',
        a: 'Jogbani में JK Interior affordable pricing offer करती है — PVC ceiling ₹70 से, Gypsum ceiling ₹80 से per sq.ft। Exact quotation के लिए free site visit available है।',
      },
      {
        q: 'क्या JK Interior Jogbani में home interior services देती है?',
        a: 'हाँ, JK Interior Jogbani में complete home interior, bedroom interior, kitchen interior, false ceiling और wall paneling services provide करती है।',
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
        q: 'Supaul में false ceiling के लिए best contractor कौन है?',
        a: 'JK Interior Supaul district में trusted false ceiling और interior design contractor है। 500+ completed projects के साथ हम PVC, gypsum और WPC services provide करते हैं।',
      },
      {
        q: 'Supaul में PVC ceiling की cost क्या है?',
        a: 'Supaul में PVC false ceiling ₹70–₹120 per sq.ft से शुरू होती है। Free site visit और quotation के लिए +91 8541849118 पर संपर्क करें।',
      },
      {
        q: 'क्या JK Interior Supaul में आती है?',
        a: 'हाँ, JK Interior Supaul city और district के सभी blocks में service provide करती है — Tribeniganj, Chhatapur समेत। Free site visit available है।',
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
        q: 'Narpatganj में interior design services कौन देता है?',
        a: 'JK Interior Narpatganj में PVC ceiling, gypsum ceiling, WPC wall panel, UV marble sheet और complete interior design services provide करती है। Call: +91 8541849118।',
      },
      {
        q: 'Narpatganj में false ceiling की cost क्या है?',
        a: 'JK Interior Narpatganj में ₹70 per sq.ft से PVC ceiling और ₹80 से gypsum ceiling offer करती है। Free estimate के लिए site visit available है।',
      },
      {
        q: 'JK Interior का office Narpatganj से कितने दूर है?',
        a: 'JK Interior का main office Forbesganj में है, जो Narpatganj से approximately 28 km दूर है। हम Narpatganj में regular service trips करते हैं।',
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
        q: 'Raniganj में false ceiling का काम JK Interior करती है?',
        a: 'हाँ, JK Interior Raniganj में PVC false ceiling, gypsum ceiling, WPC wall panel और interior design services provide करती है। Free site visit उपलब्ध है।',
      },
      {
        q: 'Raniganj में ceiling work का rate क्या है?',
        a: 'Raniganj में JK Interior PVC ceiling ₹70/sq.ft और gypsum ceiling ₹80/sq.ft से start करती है। Exact estimate के लिए call करें: +91 8541849118।',
      },
      {
        q: 'JK Interior Raniganj में कितने समय में आ सकती है?',
        a: 'Raniganj, Forbesganj से सिर्फ 18 km दूर है। JK Interior की team usually 24 hours के अंदर Raniganj में site visit दे सकती है।',
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
        q: 'Tribeniganj में interior designer कहाँ मिलेगा?',
        a: 'JK Interior Tribeniganj में trusted interior designer है। PVC ceiling, gypsum ceiling, WPC wall panel और complete interior के लिए +91 8541849118 पर call करें।',
      },
      {
        q: 'Tribeniganj में false ceiling कितने में होगी?',
        a: 'Tribeniganj में JK Interior PVC false ceiling ₹70/sq.ft से और gypsum ceiling ₹85/sq.ft से offer करती है। Free estimate के लिए site visit available है।',
      },
      {
        q: 'क्या JK Interior Tribeniganj में service देती है?',
        a: 'हाँ, JK Interior Supaul district के Tribeniganj में regular interior design और false ceiling services provide करती है। Free site visit के लिए आज ही call करें।',
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
        q: 'Kursakanta में false ceiling contractor कौन है?',
        a: 'JK Interior Kursakanta में best false ceiling contractor है। PVC ceiling, gypsum ceiling, WPC panel और interior design services के लिए call करें: +91 8541849118।',
      },
      {
        q: 'Kursakanta में interior design का काम JK Interior करती है?',
        a: 'हाँ, JK Interior Kursakanta में PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet और TV unit design services provide करती है।',
      },
      {
        q: 'Kursakanta में PVC ceiling की कीमत क्या है?',
        a: 'Kursakanta में JK Interior PVC false ceiling ₹70/sq.ft से start करती है। Free measurement और estimate के लिए +91 8541849118 पर call करें।',
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
        q: 'Chhatapur में interior designer कौन है?',
        a: 'JK Interior Chhatapur और Supaul district में trusted interior contractor है। PVC ceiling, gypsum ceiling और wall panel के लिए call करें: +91 8541849118।',
      },
      {
        q: 'Chhatapur में false ceiling की cost क्या है?',
        a: 'Chhatapur में JK Interior PVC ceiling ₹70/sq.ft और gypsum ceiling ₹85/sq.ft से offer करती है। Free site visit के लिए आज ही संपर्क करें।',
      },
      {
        q: 'क्या JK Interior Chhatapur में service देती है?',
        a: 'हाँ, JK Interior Supaul district के Chhatapur में false ceiling, wall paneling और interior design services provide करती है।',
      },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
