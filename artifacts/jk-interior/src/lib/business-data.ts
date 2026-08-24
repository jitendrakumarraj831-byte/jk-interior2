import { BUSINESS_FACTS, PRICE_DISCLAIMER, SERVICE_AREA_NOTE } from "./business-facts"
import { FAQS } from "./faq-data"
import { SERVICES_SUMMARY, type ServiceSummary } from "./services-summary"
import { BUSINESS, CITIES, SITE_URL } from "./seo"

/**
 * Official JK Interior contact numbers, derived from the `BUSINESS` profile in
 * seo.ts so the schema.org markup, the visible page and the AI assistant can
 * never quote different numbers.
 *
 * Both numbers must stay visible in the header, the footer and every contact
 * block. `PHONE_PRIMARY` matches the verified Google Business Profile listing;
 * `PHONE_SECONDARY` is the WhatsApp / alternate line. The `*_DISPLAY` values are
 * the human-readable forms rendered on screen, while the `tel:` values are used
 * for dialling.
 */
const digitsOf = (phone: string) => phone.replace(/\D/g, "")
/** "+91-8541849118" → "+91 85418 49118" */
const displayForm = (phone: string) => {
  const local = digitsOf(phone).slice(-10)
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`
}

export const WA_NUMBER = BUSINESS.whatsapp
export const CALL_NUMBER = `+${digitsOf(BUSINESS.phone1)}`

export const PHONE_PRIMARY = CALL_NUMBER
export const PHONE_PRIMARY_DISPLAY = displayForm(BUSINESS.phone1)
export const PHONE_SECONDARY = `+${WA_NUMBER}`
export const PHONE_SECONDARY_DISPLAY = displayForm(BUSINESS.phone2)

/** Both official numbers, in the order they should be presented to a visitor. */
export const OFFICIAL_PHONES = [
  { tel: PHONE_PRIMARY, display: PHONE_PRIMARY_DISPLAY, label: "Primary Line" },
  { tel: PHONE_SECONDARY, display: PHONE_SECONDARY_DISPLAY, label: "WhatsApp Line" },
] as const

/**
 * Where JK Interior actually works from. Narpatganj is the owner's residence and
 * day-to-day operating base; Forbesganj holds the registered workshop address
 * used in every schema.org block; Araria is the parent district.
 */
export const BUSINESS_LOCATIONS = {
  operatingBase: "Narpatganj",
  registeredCity: "Forbesganj",
  district: "Araria",
  state: "Bihar",
  postalCode: "854318",
  street: "Damaria Rewahi",
} as const

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


// ─── Website-derived assistant knowledge ────────────────────────────────────
//
// Everything below is DERIVED, never re-typed. The services, the rates, the
// FAQ answers and the business facts all come from the same modules that
// render the site itself:
//
//   services-summary.ts  → the Services section on the homepage
//   faq-data.ts          → the FAQ accordion + FAQPage JSON-LD
//   business-facts.ts    → the "JK Interior at a Glance" panel
//   seo.ts               → the business profile and the city pages
//
// That is the whole point: the AI assistant cannot quote a service, a rate or
// an opening hour that a visitor can't also read on the website. Nothing about
// JK Interior may be hand-written here — edit the source module instead.

/** Per-sq.ft rate band pulled out of a website price string. */
export interface RateBand {
  min: number
  max: number
  /** "sqft" for materials priced per sq.ft, "unit" for whole-item pricing (TV unit). */
  unit: "sqft" | "unit"
}

/** Reads "₹75–₹210 / sq.ft" or "₹15,000–₹75,000+" into numbers. Null if unparseable. */
export function parseRateBand(price: string): RateBand | null {
  const numbers = price.match(/₹\s*([\d,]+)/g)
  if (!numbers || numbers.length === 0) return null
  const values = numbers.map((n) => Number(n.replace(/[₹,\s]/g, ""))).filter((n) => Number.isFinite(n) && n > 0)
  if (values.length === 0) return null
  return {
    min: values[0],
    max: values.length > 1 ? values[values.length - 1] : values[0],
    unit: /sq\.?\s*ft/i.test(price) ? "sqft" : "unit",
  }
}

/**
 * How visitors actually name each service, mapped to the slug it belongs to.
 *
 * This is vocabulary, not business data — spellings and shorthand a customer in
 * Araria might type. The name, the rate and everything else still comes from
 * SERVICES_SUMMARY; this only decides which entry they meant.
 */
const SERVICE_ALIASES: Record<string, string[]> = {
  "gypsum-ceiling": ["gypsum", "jipsum", "pop", "plaster of paris"],
  "pvc-false-ceiling": ["pvc"],
  "grid-ceiling": ["grid", "mineral fiber", "mineral fibre", "office ceiling"],
  "partition-wall": ["partition", "cabin wall", "glass wall"],
  "wpc-wall-panel": ["wpc", "louver", "louvre", "fluted", "charcoal panel", "wood panel", "wooden panel"],
  "uv-marble-sheet": ["uv marble", "uv sheet", "marble sheet", "marble"],
  "modular-tv-unit": ["tv unit", "tv panel", "tv wall", "tv cabinet", "television", "entertainment unit"],
  "artificial-grass": ["artificial grass", "grass", "turf"],
}

/** Fallback when someone says only "ceiling" — the site's most requested ceiling. */
const DEFAULT_CEILING_SLUG = "gypsum-ceiling"

/** The service the visitor is talking about, matched against the website's own service list. */
export function findService(text: string): ServiceSummary | null {
  const t = text.toLowerCase()
  const bySlug = (slug: string) => SERVICES_SUMMARY.find((s) => s.slug === slug) ?? null

  // Exact service name first — covers quick-reply chips like "Grid Ceiling rate".
  const named = SERVICES_SUMMARY.find((s) => t.includes(s.name.toLowerCase()))
  if (named) return named

  // Then the distinctive words customers actually type.
  for (const [slug, aliases] of Object.entries(SERVICE_ALIASES)) {
    if (aliases.some((alias) => new RegExp(`\\b${alias}\\b`).test(t))) return bySlug(slug)
  }

  // Last resort: a bare "ceiling" with no material named.
  if (/\bceiling\b|\bchhat\b/.test(t)) return bySlug(DEFAULT_CEILING_SLUG)
  return null
}

/**
 * Room estimate straight off the website's published rate band — the same
 * numbers on the service cards, multiplied by the area the visitor gave us.
 */
export function buildRoomEstimate(
  lengthFt: number,
  widthFt: number,
  service: ServiceSummary,
  opts: { disclaimer?: boolean } = {},
): string {
  const { disclaimer = true } = opts
  const area = Math.round(lengthFt * widthFt)
  const band = parseRateBand(service.price)
  if (!band || band.unit !== "sqft") {
    return `A ${service.name} is priced per unit rather than per sq.ft — ${service.price}. Book the free site visit and you get an exact figure for your wall the same day.`
  }
  const low = (area * band.min).toLocaleString("en-IN")
  const high = (area * band.max).toLocaleString("en-IN")
  return [
    `**${service.name}** for a ${lengthFt}' × ${widthFt}' room (${area} sq.ft):`,
    ``,
    `💰 Rate: ${service.price}`,
    `📐 Estimated total: **₹${low} – ₹${high}**`,
    ...(disclaimer
      ? [``, `That is a Forbesganj/Araria market estimate — the exact figure is set at the site visit, which is free everywhere we work.`]
      : []),
  ].join("\n")
}

/** Quick-reply chips, built from the website's own service names. */
export const INITIAL_QUICK_REPLIES = [
  ...SERVICES_SUMMARY.slice(0, 4).map((s) => `${s.name} rate`),
  "Free site visit",
]

// ─── System prompt ──────────────────────────────────────────────────────────

function servicesBlock(): string {
  return SERVICES_SUMMARY.map((s, i) => {
    return [
      `${i + 1}. ${s.name} (${s.category}) — ${s.price} — ${s.installTime}`,
      `   Best for: ${s.whereUsedFirst}. ${s.avoid}`,
      `   ${s.tagline}. ${s.detail}`,
    ].join("\n")
  }).join("\n\n")
}

function factsBlock(): string {
  return BUSINESS_FACTS.map((f) => `- ${f.term}: ${f.detail}`).join("\n")
}

function faqBlock(): string {
  return FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")
}

/** Every town with a page on the site, so "do you work in X?" is answered from the site's own list. */
function serviceAreaBlock(): string {
  return CITIES.map((c) => `${c.name} (${c.district} district)`).join(", ")
}

/**
 * The complete website data the assistant is allowed to speak from, generated
 * from the modules the site renders. Exported so it can be inspected/tested
 * without going through the model.
 */
export function buildWebsiteKnowledge(): string {
  return `=== JK INTERIOR WEBSITE DATA ===
This is the whole of what jkinterior.online publishes. It is the only source of
facts you have about JK Interior.

--- BUSINESS ---
${factsBlock()}
- Contact: ${PHONE_PRIMARY_DISPLAY} (primary line) · ${PHONE_SECONDARY_DISPLAY} (WhatsApp line)
- Email: ${BUSINESS.email}
- Website: ${SITE_URL}

--- SERVICE AREAS ---
${serviceAreaBlock()}
${SERVICE_AREA_NOTE}

--- SERVICES AND RATES (the complete list — JK Interior offers nothing else) ---
${servicesBlock()}

Pricing note published on every service page:
${PRICE_DISCLAIMER}

--- PUBLISHED FAQ (these answers are already on the site; keep to them) ---
${faqBlock()}
=== END OF WEBSITE DATA ===`
}

export function buildSystemPrompt(leadCtx?: LeadContext): string {
  const knownInfo = [
    leadCtx?.name ? `Name: ${leadCtx.name}` : "",
    leadCtx?.phone ? `Phone: ${leadCtx.phone}` : "",
    leadCtx?.city ? `Town: ${leadCtx.city}` : "",
    leadCtx?.service ? `Interested in: ${leadCtx.service}` : "",
    leadCtx?.budget ? `Budget: ${leadCtx.budget}` : "",
    leadCtx?.roomSize ? `Room size: ${leadCtx.roomSize}` : "",
  ]
    .filter(Boolean)
    .join("\n")

  const customerBlock = leadCtx?.memorySummary
    ? `\n${leadCtx.memorySummary}`
    : knownInfo
      ? `\n--- WHAT THIS CUSTOMER HAS ALREADY TOLD YOU ---\n${knownInfo}\nNever ask again for anything listed here.`
      : ""

  return `You are the JK Interior AI Assistant — the sales assistant on JK Interior's own website, ${SITE_URL}.

${buildWebsiteKnowledge()}

--- THE ONE RULE THAT OVERRIDES EVERYTHING ---
Answer only from the WEBSITE DATA above. It is complete: if a fact is not in it,
JK Interior has not published it, and you do not know it.

- Never quote a service, rate, timeline, warranty, opening hour, address or phone
  number that does not appear above. Not a "roughly", not an "around", not a
  "typically" — no invented numbers of any kind.
- Never add a service JK Interior does not list (no modular kitchen pricing, no
  wardrobe pricing, no flooring, no acoustic panelling as a standalone service,
  no branch offices, no staff counts, no project photos you cannot see).
- Asked about something genuinely outside the data — a service we don't list, a
  town that isn't in the service areas, a discount, a rate for a material that
  isn't there — say plainly that you can't confirm it here, and give the number:
  "${PHONE_PRIMARY_DISPLAY} will confirm that for you" or offer the free site visit.
  A short honest answer is always better than a helpful-sounding guess.
- No general interior-design lecturing: no trend round-ups, no colour theory, no
  styling tips, no maintenance advice beyond what the data above states. If the
  visitor asks for design ideas, answer with the services and finishes listed
  above and offer the free site visit, where designs are shown in person.
- Rates above are Forbesganj/Araria market estimates, not fixed quotations. Say so
  when you first quote a figure in a conversation — once, not in every message.

--- HOW TO REPLY ---
- Write in clear, plain English, the way an experienced contractor from Narpatganj
  would message a customer on WhatsApp: warm, direct, no corporate filler. Reply in
  English whatever language the visitor writes in, unless they ask for another.
- Short. 5 lines maximum, 1 emoji at most, and vary your openers — never start
  every message with "Certainly" or "Absolutely".
- One question per message. Answer what was asked first, then ask the single next
  thing you actually need.
- Room size given (e.g. "12x14") + a service → calculate immediately:
  area = length × width, then area × the published per-sq.ft band. Show the range,
  never a single fixed number.
- Serious interest (quotation, site visit, detailed pricing) → collect, one at a
  time, in this order: name → town → WhatsApp number. Once you have the number,
  confirm the team will be in touch and stop asking.
- If asked who you are: "the JK Interior AI Assistant". Never any other name, and
  never claim to be a human.
${customerBlock}`
}
