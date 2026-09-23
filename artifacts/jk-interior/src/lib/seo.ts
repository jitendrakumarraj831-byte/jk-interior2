/**
 * The single source of truth for JK Interior's business identity (name,
 * address, phone, hours, Google Business Profile link), its service areas and
 * the city pages — plus the schema.org builders that turn them into JSON-LD.
 *
 * Every page, the footer, the contact block, the FAQ, the AI assistant's system
 * prompt (via business-data.ts / business-facts.ts) and every structured-data
 * block read from here. Change a detail once and it changes everywhere.
 *
 * NAP rule: the address, phone and hours below must match the live Google
 * Business Profile exactly. Change the profile first (or confirm it), then this
 * file — never the other way round.
 *
 * Kept free of React and of "@/" imports: api/chat.ts pulls this in through
 * business-data.ts from a serverless function.
 */

export const SITE_URL = 'https://www.jkinterior.online'
export const SITE_NAME = 'JK Interior'

/** The one canonical schema.org entity for the business — every other block references it by this @id. */
export const BUSINESS_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * The verified Google Business Profile listing. The place ID, the CID and the
 * embedded map (components/ui/map-embed.tsx) all resolve to the same listing:
 * place ID ChIJYcwFpsOj7zkRJgkNbFZ1Eaw encodes feature ID
 * 0x39efa3c3a605cc61:0xac1175566c0d0926, and 0xac1175566c0d0926 is CID
 * 12398820263168117030.
 */
export const GOOGLE_PLACE_ID = 'ChIJYcwFpsOj7zkRJgkNbFZ1Eaw'
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps?cid=12398820263168117030'

export interface OpeningHours {
  days: readonly string[]
  opens: string
  closes: string
}

export const BUSINESS = {
  name: 'JK Interior',
  description:
    'False ceiling contractor and interior finishing company in Forbesganj, Araria district, Bihar — gypsum, PVC and grid ceilings, partition walls, WPC wall panels, UV marble sheets, modular TV units and artificial grass.',
  // phone1 = primary business number (the Google Business Profile number and the
  // WhatsApp line). phone2 = the alternate line.
  phone1: '+91-8541849118',
  phone2: '+91-8651070831',
  email: 'jkinteriorofficial@gmail.com',
  // Registered workshop address — the location on the Google Business Profile.
  address: {
    street: 'Damaria Rewahi',
    city: 'Forbesganj',
    district: 'Araria',
    state: 'Bihar',
    postalCode: '854318',
    country: 'IN',
  },
  // Matches the pin on the embedded Google Maps iframe and the Business Profile.
  geo: { lat: 26.2920031, lng: 87.2034309 },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' },
    { days: ['Sunday'], opens: '09:00', closes: '18:00' },
  ] as readonly OpeningHours[],
  priceRange: '₹₹',
  founded: '2019',
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph.jpg`,
  social: {
    instagram: 'https://www.instagram.com/jk_interior_ceiling_designer',
    // A Facebook share link, not the page's canonical URL — linked visibly but
    // kept out of schema.org sameAs until the canonical page URL is confirmed.
    facebookShare: 'https://www.facebook.com/share/1GpAKHZZtb/',
  },
} as const

/** "Damaria Rewahi, Forbesganj, Bihar 854318" — the one display form of the address. */
export const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.postalCode}`

/** "Mon–Sat 8:00 AM – 8:00 PM" style labels, derived from BUSINESS.hours. */
function to12h(t: string): string {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}
function dayRange(days: readonly string[]): string {
  const short = (d: string) => d.slice(0, 3)
  return days.length > 1 ? `${short(days[0])}–${short(days[days.length - 1])}` : short(days[0])
}
export const HOURS_LINES: string[] = BUSINESS.hours.map((h) => `${dayRange(h.days)} ${to12h(h.opens)} – ${to12h(h.closes)}`)
/** Long form for sentences, e.g. "Monday to Saturday, 8:00 AM – 8:00 PM. Sunday, 9:00 AM – 6:00 PM." */
export const HOURS_SENTENCE = BUSINESS.hours
  .map((h) => `${h.days.length > 1 ? `${h.days[0]} to ${h.days[h.days.length - 1]}` : h.days[0]}, ${to12h(h.opens)} – ${to12h(h.closes)}`)
  .join('. ')

// ─── Service areas ──────────────────────────────────────────────────────────

export interface ServiceArea {
  name: string
  district: string
  /** Slug of the /cities/{slug} page. Every listed area has one. */
  slug: string
  /** True only for the town that holds the Google Business Profile address. */
  businessLocation: boolean
}

/**
 * The genuine service areas — the only list of towns used anywhere on the site
 * (schema.org areaServed, the homepage map, the footer, the FAQ, the assistant).
 * Only Forbesganj is a business location; everything else is a service area.
 */
export const SERVICE_AREAS: readonly ServiceArea[] = [
  { name: 'Forbesganj', district: 'Araria', slug: 'forbesganj', businessLocation: true },
  { name: 'Araria', district: 'Araria', slug: 'araria', businessLocation: false },
  { name: 'Jogbani', district: 'Araria', slug: 'jogbani', businessLocation: false },
  { name: 'Raniganj', district: 'Araria', slug: 'raniganj', businessLocation: false },
  { name: 'Narpatganj', district: 'Araria', slug: 'narpatganj', businessLocation: false },
  { name: 'Purnia', district: 'Purnia', slug: 'purnia', businessLocation: false },
  { name: 'Supaul', district: 'Supaul', slug: 'supaul', businessLocation: false },
]

/** "Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Purnia and Supaul" */
export const SERVICE_AREA_NAMES = (() => {
  const names = SERVICE_AREAS.map((a) => a.name)
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
})()

// ─── City pages ─────────────────────────────────────────────────────────────

export interface CityData {
  slug: string
  name: string
  district: string
  state: string
  /** <title> — written per city, not templated. */
  title: string
  /** Meta description, ≤155 characters. */
  metaDescription: string
  /** Short label under the H1. */
  role: string
  /** Opening paragraphs — what JK Interior actually does in this town. */
  intro: string[]
  /** Practical, town-specific notes for a customer planning work here. */
  localNotes: string[]
  /** How site visits and measurement work for this town. */
  visitInfo: string
  /** Service slugs most relevant here, in display order (links to /services/{slug}). */
  featuredServices: string[]
  faqs: { q: string; a: string }[]
}

export const CITIES: CityData[] = [
  {
    slug: 'forbesganj',
    name: 'Forbesganj',
    district: 'Araria',
    state: 'Bihar',
    title: 'False Ceiling & Interior Work in Forbesganj | JK Interior',
    metaDescription:
      'JK Interior is based at Damaria Rewahi, Forbesganj. Gypsum and PVC false ceilings, partition walls, WPC panels and TV units, with a free site visit.',
    role: 'Our workshop and Google Business Profile address',
    intro: [
      "JK Interior's workshop and registered address are at Damaria Rewahi, Forbesganj (Bihar 854318) — the location shown on our Google Business Profile. Forbesganj is where we work most often, so it is the easiest town for us to schedule a site visit.",
      'Here we install gypsum and PVC false ceilings, grid ceilings for shops and offices, gypsum and glass partition walls, WPC wall panelling, UV marble sheet walls, modular TV units and artificial grass for homes, shops and offices.',
    ],
    localNotes: [
      'Two of the projects described on our service pages are in Forbesganj: a cove-lit gypsum ceiling in a 180 sq.ft drawing room, and a 300 sq.ft rented office split into two private cabins with gypsum partitions and a frosted-glass reception.',
      'For kitchens, bathrooms and balconies we fit PVC rather than gypsum — gypsum is for dry rooms only. We explain this at the site visit before any design is fixed.',
    ],
    visitInfo:
      'Site visits in Forbesganj are free. We measure in person and give a written quotation based on those measurements; for a standard room the work itself usually takes one to three days.',
    featuredServices: ['gypsum-ceiling', 'pvc-false-ceiling', 'partition-wall', 'modular-tv-unit', 'wpc-wall-panel', 'grid-ceiling'],
    faqs: [
      {
        q: 'Where is JK Interior located in Forbesganj?',
        a: 'Our registered workshop is at Damaria Rewahi, Forbesganj, Bihar 854318. The exact pin is on our Google Business Profile — use the "View on Google Maps" link on this page for directions.',
      },
      {
        q: 'What does a PVC false ceiling cost in Forbesganj?',
        a: 'A PVC false ceiling in Forbesganj is usually ₹75–₹150 per sq.ft, depending on the panel design and lighting. The exact figure comes from the free site visit and measurement.',
      },
      {
        q: 'How many days does a gypsum ceiling take in Forbesganj?',
        a: 'A standard room usually takes two to three days, because every joint is taped and finished smooth. For larger or multi-level designs we confirm the timeline in writing before work starts.',
      },
    ],
  },
  {
    slug: 'araria',
    name: 'Araria',
    district: 'Araria',
    state: 'Bihar',
    title: 'False Ceiling Contractor in Araria, Bihar | JK Interior',
    metaDescription:
      'Gypsum, PVC and grid false ceilings, partition walls and WPC panels in Araria town, from JK Interior in Forbesganj. Free site visit and written quote.',
    role: 'District headquarters · served from Forbesganj',
    intro: [
      'Araria is the district headquarters and part of our regular working area from the Forbesganj workshop. We take on homes, clinics, offices and shops in Araria town and across the district.',
      'Work we do here includes gypsum and PVC false ceilings, grid ceilings for clinics and offices, gypsum and glass partition walls, WPC wall panels, UV marble sheets and modular TV units.',
    ],
    localNotes: [
      'Two projects on our service pages are in Araria: a wood-texture PVC ceiling over a kitchen and balcony, finished in one working day, and a 400 sq.ft diagnostic-centre waiting area in acoustic mineral-fibre grid tiles.',
      'For clinics and offices with AC ducts or wiring overhead, a grid ceiling keeps everything reachable — any tile lifts out without breaking the ceiling.',
    ],
    visitInfo:
      'We travel to Araria regularly. The site visit and measurement are free, and the quotation is prepared from those measurements.',
    featuredServices: ['grid-ceiling', 'pvc-false-ceiling', 'gypsum-ceiling', 'partition-wall', 'wpc-wall-panel', 'uv-marble-sheet'],
    faqs: [
      {
        q: 'Does JK Interior work in Araria town?',
        a: 'Yes. We work across Araria town and the wider district from our workshop in Forbesganj, and the site visit is free.',
      },
      {
        q: 'What does a gypsum ceiling cost in Araria?',
        a: 'A gypsum false ceiling in Araria is usually ₹75–₹210 per sq.ft. Cove lighting and multi-level designs sit at the upper end of that range.',
      },
      {
        q: 'Which ceiling suits a clinic or office in Araria?',
        a: 'A grid ceiling, if there is wiring, ducting or plumbing overhead — tiles lift out for maintenance. For a premium cabin or reception, gypsum gives a smoother finish.',
      },
    ],
  },
  {
    slug: 'jogbani',
    name: 'Jogbani',
    district: 'Araria',
    state: 'Bihar',
    title: 'False Ceiling & Wall Panels in Jogbani | JK Interior',
    metaDescription:
      'PVC and gypsum false ceilings, grid ceilings for shops and WPC wall panels in Jogbani, Araria district. Free site visit from JK Interior, Forbesganj.',
    role: 'Border town · Araria district',
    intro: [
      'Jogbani sits on the India–Nepal border in Araria district, close to our Forbesganj workshop. Much of the town is commercial, so alongside homes we fit out shops, showrooms and offices.',
      'Common work here: PVC and grid ceilings for shops, gypsum ceilings for homes, and WPC or fluted wall panels for TV walls and shop feature walls.',
    ],
    localNotes: [
      'One project on our WPC service page is in Jogbani: a 12 ft living-room TV wall in walnut-tone fluted WPC with a hidden LED strip, where the panels went up and the TV was mounted on the same day.',
      'For shops that stay open during the work, PVC and grid ceilings are the quickest to install and need no curing time.',
    ],
    visitInfo:
      'Jogbani is within our regular working area. Site visits and measurements are free, and we confirm the timeline in writing before starting.',
    featuredServices: ['wpc-wall-panel', 'pvc-false-ceiling', 'grid-ceiling', 'gypsum-ceiling', 'modular-tv-unit'],
    faqs: [
      {
        q: 'Does JK Interior do false ceiling work in Jogbani?',
        a: 'Yes — PVC, gypsum and grid ceilings, plus WPC wall panelling, for homes and shops in Jogbani. Call +91 8541849118 to book a free site visit.',
      },
      {
        q: 'What does a false ceiling cost in Jogbani?',
        a: 'PVC ceilings usually cost ₹75–₹150 per sq.ft and gypsum ceilings ₹75–₹210 per sq.ft. The exact rate depends on design and area, measured at the free site visit.',
      },
      {
        q: 'Which ceiling is suitable for a shop?',
        a: 'Grid ceilings are the most practical for shops with wiring or AC overhead; PVC suits shops that need a wipe-clean, moisture-proof finish. Gypsum is best kept for showrooms that want a premium look.',
      },
    ],
  },
  {
    slug: 'raniganj',
    name: 'Raniganj',
    district: 'Araria',
    state: 'Bihar',
    title: 'Interior & False Ceiling Work in Raniganj | JK Interior',
    metaDescription:
      'False ceilings, WPC wall panels and artificial grass in Raniganj, Araria district, by JK Interior of Forbesganj. Free site visit and written quotation.',
    role: 'Araria district · regular service area',
    intro: [
      'Raniganj is a block town in Araria district and part of our regular service area from Forbesganj. We work on homes and shops here.',
      'Services we provide in Raniganj include PVC and gypsum false ceilings, WPC wall panels, UV marble sheets, modular TV units and artificial grass for balconies and terraces.',
    ],
    localNotes: [
      'The artificial-grass project on our service page is in Raniganj: a 60 sq.ft balcony given a drained-base lawn with a potted-plant corner.',
      'Before laying artificial grass we always check that the balcony or terrace drains properly — a poorly draining base is what causes smell and mould in the monsoon.',
    ],
    visitInfo:
      'Raniganj is visited regularly; the site visit and measurement are free, and the quotation is written from those measurements.',
    featuredServices: ['artificial-grass', 'pvc-false-ceiling', 'gypsum-ceiling', 'wpc-wall-panel', 'uv-marble-sheet'],
    faqs: [
      {
        q: 'Does JK Interior do ceiling work in Raniganj?',
        a: 'Yes. We install PVC and gypsum false ceilings, WPC wall panels and artificial grass in Raniganj, with a free site visit.',
      },
      {
        q: 'What is the rate for ceiling work in Raniganj?',
        a: 'PVC ceilings usually cost ₹75–₹150 per sq.ft and gypsum ceilings ₹75–₹210 per sq.ft. Call +91 8541849118 for an exact estimate after measurement.',
      },
      {
        q: 'Can artificial grass be laid on a balcony in Raniganj?',
        a: 'Yes, as long as the base drains. A typical balcony takes half a day to a full day, and artificial grass usually costs ₹40–₹150 per sq.ft depending on pile height and density.',
      },
    ],
  },
  {
    slug: 'narpatganj',
    name: 'Narpatganj',
    district: 'Araria',
    state: 'Bihar',
    title: 'False Ceiling & Interior Work in Narpatganj | JK Interior',
    metaDescription:
      'PVC and gypsum false ceilings, WPC wall panels, UV marble sheets and TV units in Narpatganj, Araria district. Free site visit from JK Interior.',
    role: 'Araria district · regular service area',
    intro: [
      'Narpatganj is a block in Araria district that we cover regularly from our workshop in Forbesganj. We work on homes and shops in Narpatganj and the surrounding villages.',
      'Services here include PVC and gypsum false ceilings, WPC wall panelling, UV marble sheet walls for pooja rooms and bathrooms, and modular TV units.',
    ],
    localNotes: [
      'UV marble sheet is a practical choice for pooja rooms and bathroom walls: it is waterproof and has no grout lines to blacken, and a room is usually finished in one to two days.',
      'If you are building new, tell us at the site visit where lights, fans and AC points will go — ceiling cut-outs and wiring are planned before the boards go up.',
    ],
    visitInfo:
      'Site visits in Narpatganj and nearby villages are free. We measure in person and prepare the quotation from those measurements.',
    featuredServices: ['pvc-false-ceiling', 'gypsum-ceiling', 'uv-marble-sheet', 'wpc-wall-panel', 'modular-tv-unit'],
    faqs: [
      {
        q: 'Does JK Interior work in Narpatganj?',
        a: 'Yes. Narpatganj is part of our regular service area. Call +91 8541849118 or +91 8651070831 to book a free site visit.',
      },
      {
        q: 'What does a false ceiling cost in Narpatganj?',
        a: 'PVC ceilings usually cost ₹75–₹150 per sq.ft and gypsum ceilings ₹75–₹210 per sq.ft, depending on the design. The free site visit gives you an exact figure.',
      },
      {
        q: 'Where is JK Interior’s workshop?',
        a: 'Our registered workshop is at Damaria Rewahi, Forbesganj, Bihar 854318 — the address on our Google Business Profile.',
      },
    ],
  },
  {
    slug: 'purnia',
    name: 'Purnia',
    district: 'Purnia',
    state: 'Bihar',
    title: 'False Ceiling & Interior Work in Purnia, Bihar | JK Interior',
    metaDescription:
      'JK Interior of Forbesganj takes on gypsum and PVC false ceiling, UV marble and WPC panel work in Purnia. Site visits scheduled in advance, free of charge.',
    role: 'Purnia district · visits scheduled in advance',
    intro: [
      'Purnia is outside our home district — JK Interior is based in Forbesganj, Araria district — but we do take on work in Purnia, and we travel there for site visits and installation.',
      'In Purnia we take on gypsum and PVC false ceilings, WPC wall panelling, UV marble sheet walls, modular TV units and partition walls for homes and offices.',
    ],
    localNotes: [
      'The UV marble project on our service page is in Purnia: a small pooja room clad floor-to-ceiling in white-and-gold veined UV marble with a recessed LED niche for the idol, finished in a single day.',
      'Because Purnia is further from our workshop, we plan the visit and the installation days in advance and bring all materials for the job in one trip, so the work is not held up waiting for supplies.',
    ],
    visitInfo:
      'Purnia site visits are scheduled in advance by phone or WhatsApp and are free. Measurements are taken in person and the quotation is written from them.',
    featuredServices: ['uv-marble-sheet', 'gypsum-ceiling', 'pvc-false-ceiling', 'wpc-wall-panel', 'modular-tv-unit', 'partition-wall'],
    faqs: [
      {
        q: 'Does JK Interior work in Purnia?',
        a: 'Yes. We are based in Forbesganj and travel to Purnia for site visits and installation. Visits are scheduled in advance — call +91 8541849118 or WhatsApp the same number.',
      },
      {
        q: 'How long does PVC ceiling work take in Purnia?',
        a: 'A standard room usually takes one to two days on site. We fix the dates before we travel so the work runs without breaks.',
      },
      {
        q: 'Which services does JK Interior offer in Purnia?',
        a: 'Gypsum and PVC false ceilings, WPC wall panels, UV marble sheet walls, modular TV units and partition walls.',
      },
    ],
  },
  {
    slug: 'supaul',
    name: 'Supaul',
    district: 'Supaul',
    state: 'Bihar',
    title: 'False Ceiling & Interior Work in Supaul, Bihar | JK Interior',
    metaDescription:
      'PVC and gypsum false ceilings, WPC wall panels and UV marble sheets in Supaul district, including Tribeniganj and Chhatapur. Free site visit.',
    role: 'Supaul district · visits scheduled in advance',
    intro: [
      'Supaul is a neighbouring district to Araria. We travel from our Forbesganj workshop to Supaul town and its blocks — including Tribeniganj and Chhatapur — for site visits and installation.',
      'In Supaul we take on PVC and gypsum false ceilings, WPC wall panels, UV marble sheet walls, modular TV units and partition walls for homes and offices.',
    ],
    localNotes: [
      'For ceilings in kitchens, bathrooms and other damp rooms we fit PVC, which is fully waterproof; gypsum is recommended only for dry rooms such as halls and bedrooms.',
      'We schedule Supaul visits in advance and group the installation days so the work runs without breaks.',
    ],
    visitInfo:
      'Supaul site visits are free and arranged in advance by phone or WhatsApp. The quotation is prepared from the measurements taken on site.',
    featuredServices: ['pvc-false-ceiling', 'gypsum-ceiling', 'wpc-wall-panel', 'uv-marble-sheet', 'modular-tv-unit', 'partition-wall'],
    faqs: [
      {
        q: 'Does JK Interior travel to Supaul?',
        a: 'Yes. We work in Supaul town and its blocks, including Tribeniganj and Chhatapur. Visits are arranged in advance and are free.',
      },
      {
        q: 'What does a PVC ceiling cost in Supaul?',
        a: 'A PVC false ceiling usually costs ₹75–₹150 per sq.ft depending on panel design and lighting. Call +91 8541849118 to arrange a site visit and quotation.',
      },
      {
        q: 'Gypsum or PVC — which ceiling should I choose?',
        a: 'PVC for kitchens, bathrooms, balconies and shops that need a waterproof, wipe-clean ceiling; gypsum for halls and bedrooms where you want a smooth, painted finish and cove lighting.',
      },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}

// ─── schema.org builders ────────────────────────────────────────────────────

/** A reference to the one business entity — used by every page except the homepage. */
export function businessRef() {
  return { '@id': BUSINESS_ID }
}

export function businessAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  }
}

export function areaServedSchema() {
  return SERVICE_AREAS.map((a) => ({ '@type': 'City', name: a.name }))
}

export function openingHoursSchema() {
  return BUSINESS.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...h.days],
    opens: h.opens,
    closes: h.closes,
  }))
}

/**
 * The complete, canonical LocalBusiness entity. Emitted once, on the homepage.
 * HomeAndConstructionBusiness is a schema.org LocalBusiness subtype covering
 * contractors that work on homes and buildings.
 */
export function buildLocalBusinessSchema(services: { name: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: `${SITE_URL}/`,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    telephone: BUSINESS.phone1,
    email: BUSINESS.email,
    foundingDate: BUSINESS.founded,
    priceRange: BUSINESS.priceRange,
    address: businessAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: openingHoursSchema(),
    areaServed: areaServedSchema(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone1,
        contactType: 'customer service',
        areaServed: 'IN-BR',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone2,
        contactType: 'sales',
        areaServed: 'IN-BR',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'JK Interior services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${SITE_URL}/services/${s.slug}` },
      })),
    },
    // Real reviews live on the Google Business Profile — no self-serving
    // review/rating markup here.
    sameAs: [GOOGLE_MAPS_URL, BUSINESS.social.instagram],
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'en-IN',
    publisher: businessRef(),
  }
}

export interface Crumb {
  name: string
  path: string
}

export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '/' : c.path}`,
    })),
  }
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
