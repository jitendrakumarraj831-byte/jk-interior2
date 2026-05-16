/**
 * Knowledge Base
 * Material info, services, FAQs structured for fast lookups
 */

export interface MaterialInfo {
  name: string
  priceRange: string
  priceLow: number
  priceHigh: number
  unit: "sqft" | "unit"
  description: string
  bestFor: string[]
  avoidIn: string[]
  installTime: string
  warranty: string
}

export interface ServiceInfo {
  name: string
  category: string
  description: string
  priceRange: string
  materials?: string[]
}

export const MATERIALS: Record<string, MaterialInfo> = {
  pvc: {
    name: "PVC Ceiling",
    priceRange: "₹60–120/sq.ft",
    priceLow: 60,
    priceHigh: 120,
    unit: "sqft",
    description:
      "Lightweight, waterproof false ceiling. Zero maintenance, quick installation.",
    bestFor: [
      "Kitchens",
      "Bathrooms",
      "Balconies",
      "Budget projects",
    ],
    avoidIn: ["High-temperature areas", "Direct sunlight"],
    installTime: "3–7 days",
    warranty: "5 years",
  },
  gypsum: {
    name: "Gypsum Ceiling",
    priceRange: "₹80–140/sq.ft",
    priceLow: 80,
    priceHigh: 140,
    unit: "sqft",
    description:
      "Premium finish, best for LED lighting and cove designs. Fire-resistant.",
    bestFor: ["Living rooms", "Bedrooms", "Premium look"],
    avoidIn: ["Bathrooms", "Kitchens", "Wet areas"],
    installTime: "4–8 days",
    warranty: "10 years",
  },
  wpc: {
    name: "WPC Wall Panels",
    priceRange: "₹180–450/sq.ft",
    priceLow: 180,
    priceHigh: 450,
    unit: "sqft",
    description:
      "Waterproof wood-plastic composite. Rich wooden texture, eco-friendly.",
    bestFor: [
      "TV unit backdrop",
      "Accent walls",
      "Bedroom feature walls",
    ],
    avoidIn: ["Direct rain exposure"],
    installTime: "2–5 days",
    warranty: "7 years",
  },
  uv: {
    name: "UV Marble Sheets",
    priceRange: "₹50–95/sq.ft",
    priceLow: 50,
    priceHigh: 95,
    unit: "sqft",
    description:
      "Glossy luxury finish with marble texture. Stain-resistant and easy to clean.",
    bestFor: [
      "Walls",
      "Kitchen backsplash",
      "Bathroom",
      "Modern look",
    ],
    avoidIn: [],
    installTime: "1–3 days",
    warranty: "5 years",
  },
  tvunit: {
    name: "Modular TV Unit",
    priceRange: "₹15,000+",
    priceLow: 15000,
    priceHigh: 100000,
    unit: "unit",
    description:
      "Custom-designed modular TV storage. Integrated shelving, cable management.",
    bestFor: ["Living rooms", "Entertainment areas"],
    avoidIn: [],
    installTime: "3–7 days",
    warranty: "7 years",
  },
}

/**
 * Get material info by keyword
 */
export function getMaterialByKeyword(
  keyword: string
): MaterialInfo | null {
  const key = keyword.toLowerCase()

  if (key.includes("pvc")) return MATERIALS.pvc
  if (key.includes("gypsum") || key.includes("pop"))
    return MATERIALS.gypsum
  if (key.includes("wpc") || key.includes("wood"))
    return MATERIALS.wpc
  if (key.includes("uv") || key.includes("marble"))
    return MATERIALS.uv
  if (key.includes("tv unit")) return MATERIALS.tvunit

  return null
}

/**
 * Format material info as readable text
 */
export function formatMaterialInfo(
  material: MaterialInfo
): string {
  return `
✨ **${material.name}** – ${material.priceRange}

${material.description}

✅ Best for: ${material.bestFor.join(", ")}
${material.avoidIn.length > 0 ? `❌ Avoid: ${material.avoidIn.join(", ")}\n` : ""}⏱ Install time: ${material.installTime}
🛡 Warranty: ${material.warranty}
`.trim()
}

/**
 * Compare two materials
 */
export function compareMaterials(
  material1Key: string,
  material2Key: string
): string {
  const m1 = getMaterialByKeyword(material1Key)
  const m2 = getMaterialByKeyword(material2Key)

  if (!m1 || !m2)
    return "Material not found in our database."

  return `
**${m1.name}** vs **${m2.name}**

Price: ${m1.priceRange} vs ${m2.priceRange}
Install: ${m1.installTime} vs ${m2.installTime}
Warranty: ${m1.warranty} vs ${m2.warranty}

${m1.name} is better for: ${m1.bestFor.join(", ")}
${m2.name} is better for: ${m2.bestFor.join(", ")}
`.trim()
}
