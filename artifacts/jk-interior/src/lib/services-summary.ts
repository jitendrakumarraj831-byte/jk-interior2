import { SERVICES_CONTENT, type ServiceContent } from "@/lib/services-content"

/** Compact homepage cards derived from the canonical service records. */
export interface ServiceHighlight {
  kind: "special" | "pricing" | "warranty" | "suited"
  label: string
  labelHi: string
  en: string
  hi: string
}

export interface ServiceSummary {
  slug: string
  name: string
  nameHi: string
  category: string
  tagline: string
  taglineHi: string
  heroImage: string
  heroImageAlt: string
  price: string
  installTime: string
  whereUsedFirst: string
  highlights: ServiceHighlight[]
}

const highlight = (
  kind: ServiceHighlight["kind"],
  label: string,
  labelHi: string,
  en: string,
  hi: string,
): ServiceHighlight => ({ kind, label, labelHi, en, hi })

const toSummary = (service: ServiceContent): ServiceSummary => {
  const firstUse = service.whereUsed[0] ?? service.name
  const firstUseHi = service.whereUsedHi[0] ?? service.nameHi
  return {
    slug: service.slug,
    name: service.name,
    nameHi: service.nameHi,
    category: service.category,
    tagline: service.tagline,
    taglineHi: service.taglineHi,
    heroImage: service.heroImage,
    heroImageAlt: service.heroImageAlt,
    price: service.price,
    installTime: service.installTime,
    whereUsedFirst: firstUse,
    highlights: [
      highlight("special", "Why it works", "क्यों उपयोगी है", service.benefits[0] ?? service.whatItIs, service.benefitsHi[0] ?? service.whatItIsHi),
      highlight("pricing", "Price range", "कीमत", service.price, service.priceTiers[0]?.desc ?? "Final rate is confirmed after site measurement.",),
      highlight("warranty", "Time and care", "समय और देखभाल", `${service.installTime}. ${service.warranty}.`, `${service.installTime}। ${service.warranty}`),
      highlight("suited", "Best suited for", "किसके लिए सही", firstUse, firstUseHi),
    ],
  }
}

export const SERVICES_SUMMARY: ServiceSummary[] = SERVICES_CONTENT.map(toSummary)

export const getServiceSummaryBySlug = (slug: string) =>
  SERVICES_SUMMARY.find((service) => service.slug === slug)
