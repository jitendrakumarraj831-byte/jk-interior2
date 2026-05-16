/**
 * Estimate Generation & Management
 * Creates personalized quotes based on dimensions and materials
 */

export interface QuoteDetails {
  roomSize: string
  material: string
  area: number
  customerName?: string
  city?: string
  estimateLow: number
  estimateHigh: number
  advice: string
  estimateId: string
  createdAt: Date
}

/**
 * Generate quote ID
 */
function generateQuoteId(): string {
  return `EST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create estimate from dimensions and material
 */
export function createEstimate(
  dimensions: { length: number; width: number; area: number },
  material: string,
  customerName?: string,
  city?: string
): QuoteDetails | null {
  const { length, width, area } = dimensions

  let matName = ""
  let priceLow = 0
  let priceHigh = 0

  const matLower = material.toLowerCase()

  if (matLower.includes("pvc")) {
    matName = "PVC Ceiling"
    priceLow = 60
    priceHigh = 120
  } else if (
    matLower.includes("gypsum") ||
    matLower.includes("pop")
  ) {
    matName = "Gypsum False Ceiling"
    priceLow = 80
    priceHigh = 140
  } else if (matLower.includes("wpc")) {
    matName = "WPC Wall Panels"
    priceLow = 180
    priceHigh = 450
  } else if (matLower.includes("uv") || matLower.includes("marble")) {
    matName = "UV Marble Sheets"
    priceLow = 50
    priceHigh = 95
  } else {
    return null
  }

  const estLow = Math.round(area * priceLow)
  const estHigh = Math.round(area * priceHigh)

  let advice = ""
  if (area > 250) {
    advice =
      "For this spacious area, consider cove lighting with premium Gypsum for luxury ambiance!"
  } else if (area > 150) {
    advice =
      "Great size! LED strips around perimeter will add modern, premium feel."
  } else if (matName.includes("WPC")) {
    advice =
      "WPC panels bring rich wooden texture – ideal for feature walls!"
  } else if (matName.includes("PVC")) {
    advice =
      "PVC is waterproof and low-maintenance – perfect for kitchens!"
  } else {
    advice = "Professional installation included for perfect finish."
  }

  return {
    roomSize: `${length}' × ${width}'`,
    material: matName,
    area,
    customerName,
    city,
    estimateLow: estLow,
    estimateHigh: estHigh,
    advice,
    estimateId: generateQuoteId(),
    createdAt: new Date(),
  }
}

/**
 * Format estimate as readable message
 */
export function formatEstimate(quote: QuoteDetails): string {
  const greeting = quote.customerName
    ? `${quote.customerName} ji, `
    : ""

  return `
${greeting}according to your **${quote.roomSize}** room (${quote.area} sq.ft), the estimate for **${quote.material}** is:

💰 **₹${quote.estimateLow.toLocaleString("en-IN")} – ₹${quote.estimateHigh.toLocaleString("en-IN")}**

✨ ${quote.advice}

**Next steps:**
📅 Book a free site visit for exact measurements
📞 Call/WhatsApp: +91 8651070831

📊 Quote ID: ${quote.estimateId}
`.trim()
}

/**
 * Store estimate (localStorage for client-side)
 */
export function storeEstimate(quote: QuoteDetails): void {
  try {
    const key = "jk_recent_estimates"
    const raw = localStorage.getItem(key) || "[]"
    const estimates: QuoteDetails[] = JSON.parse(raw)

    // Add new estimate at beginning
    estimates.unshift(quote)

    // Keep only last 10 estimates
    localStorage.setItem(
      key,
      JSON.stringify(estimates.slice(0, 10))
    )
  } catch (error) {
    console.error("[v0] Failed to store estimate:", error)
  }
}

/**
 * Get recent estimates
 */
export function getRecentEstimates(): QuoteDetails[] {
  try {
    const raw = localStorage.getItem("jk_recent_estimates") || "[]"
    return JSON.parse(raw)
  } catch {
    return []
  }
}

/**
 * Generate compare-estimates message
 */
export function getComparisonAdvice(
  estimate: QuoteDetails,
  alternativeMaterial?: string
): string {
  if (!alternativeMaterial) {
    return `Want to compare with another material? Ask about PVC, Gypsum, WPC, or UV Marble!`
  }

  // This would require calculating another estimate
  return `Great choice to compare! Let me know the dimensions for the alternative material too.`
}

/**
 * Check if estimate is recent (within 24 hours)
 */
export function isEstimateRecent(quote: QuoteDetails): boolean {
  const now = new Date()
  const diff = now.getTime() - quote.createdAt.getTime()
  const hoursAgo = diff / (1000 * 60 * 60)
  return hoursAgo < 24
}

/**
 * Get estimate summary for lead tracking
 */
export function getEstimateSummary(quote: QuoteDetails): string {
  return `${quote.material} for ${quote.roomSize} = ₹${quote.estimateLow.toLocaleString("en-IN")}–₹${quote.estimateHigh.toLocaleString("en-IN")}`
}
