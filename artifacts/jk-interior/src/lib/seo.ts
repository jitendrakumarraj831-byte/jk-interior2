export const SITE_URL = 'https://www.jkinterior.online'
export const SITE_NAME = 'JK Interior'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const BUSINESS = {
  name: 'JK Interior',
  tagline: "Bihar's Most Trusted Interior Contractor",
  // Narpatganj is the day-to-day operating base; the Forbesganj address below is
  // the registered workshop used in every schema.org block and on Google Business.
  operatingBase: 'Narpatganj',
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
    district: 'Araria',
    state: 'Bihar',
    distance: 'Registered Workshop',
    description:
      'JK Interior\'s registered workshop is in Forbesganj. We are the most trusted interior design and false ceiling contractor for homes, shops and offices across Forbesganj and Araria district.',
    uniqueContent:
      "Forbesganj holds JK Interior's registered workshop and material store, and it remains the town we work in most. We serve every neighbourhood here with quick response times and competitive, transparent pricing. Whether you need a modern PVC false ceiling for a living room, a gypsum ceiling with cove lighting, WPC wall panelling behind a television unit, or a complete home interior — JK Interior delivers a premium result at an honest rate right here in Forbesganj.",
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
        q: 'What does a PVC false ceiling cost in Forbesganj?',
        a: 'A PVC false ceiling in Forbesganj starts from ₹75–₹150 per sq.ft, with the rate varying by design and lighting. Call +91 8541849118 or +91 8651070831 for an exact figure and a free quotation.',
      },
      {
        q: 'Does JK Interior offer a free site visit in Forbesganj?',
        a: 'Yes. We provide a free site visit throughout Forbesganj. Our team attends your home or shop in person, takes accurate measurements and prepares the estimate from those measurements.',
      },
      {
        q: 'How many days does a gypsum ceiling take in Forbesganj?',
        a: 'A standard room in Forbesganj is completed in one to three days. For larger projects we confirm a precise timeline before any work begins.',
      },
    ],
  },
  {
    slug: 'araria',
    name: 'Araria',
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
        q: 'Who is the best interior designer in Araria?',
        a: 'JK Interior is among the most trusted names in Araria district. With more than 500 completed projects and a written one-year warranty on every job, you can hand over interior design and false ceiling work with confidence.',
      },
      {
        q: 'What does a gypsum ceiling cost in Araria?',
        a: 'A gypsum false ceiling in Araria starts from ₹75–₹210 per sq.ft. Cove lighting and multi-level designs sit at the premium end of that band. Call +91 8541849118 to arrange a free site visit.',
      },
      {
        q: 'Does JK Interior work in Araria town?',
        a: 'Yes. We work across Araria town and the wider district. Our team travels there continuously, so projects are never held up by distance.',
      },
    ],
  },
  {
    slug: 'purnia',
    name: 'Purnia',
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
        q: 'How do I contact an interior designer in Purnia?',
        a: 'Call +91 8541849118 or send a message to +91 8651070831 on WhatsApp. We carry out free site visits across Purnia and prepare a complete written quotation.',
      },
      {
        q: 'How long does PVC ceiling work take in Purnia?',
        a: 'A standard room in Purnia is completed in one to two days. We travel to Purnia regularly, which is how we hold to the agreed completion dates.',
      },
      {
        q: 'Which services does JK Interior offer in Purnia?',
        a: 'In Purnia we handle PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet, television unit design, bedroom interiors, office interiors and complete interior design.',
      },
    ],
  },
  {
    slug: 'jogbani',
    name: 'Jogbani',
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
        q: 'Who carries out false ceiling work in Jogbani?',
        a: 'JK Interior is among the most trusted names for false ceiling work in Jogbani and across Araria district. Whether you need a PVC ceiling, a gypsum ceiling or WPC wall panelling, call +91 8541849118.',
      },
      {
        q: 'What does interior design cost in Jogbani?',
        a: 'Our rates in Jogbani remain accessible — PVC ceilings start from ₹75 per sq.ft and gypsum ceilings also begin at ₹75 per sq.ft. Book a free site visit for an exact figure.',
      },
      {
        q: 'Does JK Interior provide home interior services in Jogbani?',
        a: 'Yes. In Jogbani we deliver complete home interiors, bedroom interiors, kitchen interiors, false ceilings and wall panelling.',
      },
    ],
  },
  {
    slug: 'supaul',
    name: 'Supaul',
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
        q: 'Who is the best false ceiling contractor in Supaul?',
        a: 'JK Interior is a trusted name for false ceiling and interior design work across Supaul district. We have completed more than 500 projects and work in PVC, gypsum and WPC alike.',
      },
      {
        q: 'What does a PVC ceiling cost in Supaul?',
        a: 'A PVC false ceiling in Supaul starts from ₹75–₹150 per sq.ft. Call +91 8541849118 to arrange a free site visit and quotation.',
      },
      {
        q: 'Does JK Interior travel to Supaul?',
        a: 'Yes. We work in Supaul town and in every block of the district, including Tribeniganj and Chhatapur, and we provide a free site visit throughout.',
      },
    ],
  },
  {
    slug: 'narpatganj',
    name: 'Narpatganj',
    district: 'Araria',
    state: 'Bihar',
    distance: 'Our Operating Base',
    description:
      'Narpatganj is JK Interior\'s day-to-day operating base. We provide expert false ceiling, PVC ceiling, gypsum ceiling and complete interior design services here and throughout Araria district.',
    uniqueContent:
      'Narpatganj is where JK Interior operates from, which makes it the area we reach fastest of all. Our team handles false ceiling installation, PVC and gypsum ceiling work, WPC wall panelling, UV marble sheets and television unit design for the block\'s growing residential and commercial clients. Free site visits in Narpatganj and the surrounding villages are usually arranged within a day.',
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
        q: 'Who provides interior design services in Narpatganj?',
        a: 'Narpatganj is JK Interior\'s operating base, so our team is close at hand. We deliver PVC ceilings, gypsum ceilings, WPC wall panels, UV marble sheets and complete interior design here. Call +91 8541849118 or +91 8651070831.',
      },
      {
        q: 'What does a false ceiling cost in Narpatganj?',
        a: 'In Narpatganj, PVC ceilings start from ₹75 per sq.ft and gypsum ceilings also begin at ₹75 per sq.ft. Book a free site visit for an accurate estimate.',
      },
      {
        q: 'How far is JK Interior\'s workshop from Narpatganj?',
        a: 'Our team operates out of Narpatganj itself, and our registered workshop address is in Forbesganj, roughly 28 km away. Response times in and around Narpatganj are the quickest we offer.',
      },
    ],
  },
  {
    slug: 'raniganj',
    name: 'Raniganj',
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
        q: 'Does JK Interior carry out false ceiling work in Raniganj?',
        a: 'Yes. In Raniganj we install PVC false ceilings, gypsum ceilings, WPC wall panels and complete interior design, with a free site visit included.',
      },
      {
        q: 'What is the rate for ceiling work in Raniganj?',
        a: 'In Raniganj, PVC ceilings start at ₹75 per sq.ft and gypsum ceilings also begin at ₹75 per sq.ft. Call +91 8541849118 for an accurate estimate.',
      },
      {
        q: 'How quickly can JK Interior reach Raniganj?',
        a: 'Raniganj is only 18 km from Forbesganj, so our team usually attends a site visit there within 24 hours.',
      },
    ],
  },
  {
    slug: 'tribeniganj',
    name: 'Tribeniganj',
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
        q: 'Where can I find an interior designer in Tribeniganj?',
        a: 'JK Interior is a trusted name for interior design in Tribeniganj. For PVC ceilings, gypsum ceilings, WPC wall panelling or a complete interior, call +91 8541849118.',
      },
      {
        q: 'What does a false ceiling cost in Tribeniganj?',
        a: 'In Tribeniganj, PVC false ceilings start at ₹75 per sq.ft and gypsum ceilings also begin at ₹75 per sq.ft. Book a free site visit for an accurate estimate.',
      },
      {
        q: 'Does JK Interior serve Tribeniganj?',
        a: 'Yes. We carry out interior design and false ceiling work regularly in Tribeniganj, Supaul district. Call today to book a free site visit.',
      },
    ],
  },
  {
    slug: 'kursakanta',
    name: 'Kursakanta',
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
        q: 'Who is the false ceiling contractor for Kursakanta?',
        a: 'JK Interior is a leading choice for false ceiling work in Kursakanta. For PVC ceilings, gypsum ceilings, WPC panels or interior design, call +91 8541849118.',
      },
      {
        q: 'Does JK Interior handle interior design work in Kursakanta?',
        a: 'Yes. In Kursakanta we deliver PVC false ceilings, gypsum ceilings, WPC wall panels, UV marble sheets and television unit design.',
      },
      {
        q: 'What does a PVC ceiling cost in Kursakanta?',
        a: 'A PVC false ceiling in Kursakanta starts from ₹75 per sq.ft. Call +91 8541849118 for free measurements and an estimate.',
      },
    ],
  },
  {
    slug: 'chhatapur',
    name: 'Chhatapur',
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
        q: 'Who is the interior designer for Chhatapur?',
        a: 'JK Interior is a trusted name for interior work in Chhatapur and across Supaul district. For PVC ceilings, gypsum ceilings or wall panelling, call +91 8541849118.',
      },
      {
        q: 'What does a false ceiling cost in Chhatapur?',
        a: 'In Chhatapur, PVC ceilings start at ₹75 per sq.ft and gypsum ceilings also begin at ₹75 per sq.ft. Get in touch today to book a free site visit.',
      },
      {
        q: 'Does JK Interior serve Chhatapur?',
        a: 'Yes. We carry out false ceiling, wall panelling and interior design work in Chhatapur, Supaul district.',
      },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
