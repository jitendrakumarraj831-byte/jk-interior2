/**
 * Pricing Calculator & Estimator
 * Handles dimension-based estimates and budget analysis
 */

export interface DimensionData {
  length: number
  width: number
  area: number
  rawMatch: string
}

export interface EstimateResult {
  area: number
  material: string
  pricePerSqFt: { low: number; high: number }
  totalEstimate: { low: number; high: number }
  message: string
}

/**
 * Extract dimensions from text (10x12, 10 by 12, etc.)
 */
export function extractDimensions(
  text: string
): DimensionData | null {
  const patterns = [
    /(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:feet|ft)?\s*by\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:length|lg|len)[^\d]*(\d+(?:\.\d+)?)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      let length = parseFloat(match[1])
      let width = parseFloat(match[2])

      if (!isNaN(length) && !isNaN(width) && length > 0 && width > 0) {
        // Normalize to length >= width
        if (length < width) {
          ;[length, width] = [width, length]
        }

        return {
          length,
          width,
          area: length * width,
          rawMatch: match[0],
        }
      }
    }
  }

  return null
}

/**
 * Calculate estimate for specific material
 */
export function calculateEstimate(
  dimensions: DimensionData,
  material: string
): EstimateResult | null {
  const { area } = dimensions
  const matLower = material.toLowerCase()

  let materialName = ""
  let priceLow = 0
  let priceHigh = 0

  if (matLower.includes("pvc")) {
    materialName = "PVC Ceiling"
    priceLow = 60
    priceHigh = 120
  } else if (
    matLower.includes("gypsum") ||
    matLower.includes("pop")
  ) {
    materialName = "Gypsum False Ceiling"
    priceLow = 80
    priceHigh = 140
  } else if (matLower.includes("wpc") || matLower.includes("wood")) {
    materialName = "WPC Wall Panels"
    priceLow = 180
    priceHigh = 450
  } else if (matLower.includes("uv") || matLower.includes("marble")) {
    materialName = "UV Marble Sheets"
    priceLow = 50
    priceHigh = 95
  } else {
    return null
  }

  const totalLow = Math.round(area * priceLow)
  const totalHigh = Math.round(area * priceHigh)

  const message = `
📐 **Room: ${dimensions.length}' × ${dimensions.width}' (${area} sq.ft)**

💰 **${materialName}**
Price Range: ₹${priceLow}–₹${priceHigh}/sq.ft
**Total Estimate: ₹${totalLow.toLocaleString("en-IN")} – ₹${totalHigh.toLocaleString("en-IN")}**

⏱ Install time: 3–7 days
✨ Premium quality assured
`.trim()

  return {
    area,
    material: materialName,
    pricePerSqFt: { low: priceLow, high: priceHigh },
    totalEstimate: { low: totalLow, high: totalHigh },
    message,
  }
}

/**
 * Get budget-based recommendation
 */
export function getBudgetRecommendation(
  budgetAmount: number
): string {
  if (budgetAmount < 30000) {
    return "With ₹30k budget: 1 room with PVC ceiling (₹60–120/sq.ft)\n\nShare room size for exact quote!"
  }

  if (budgetAmount < 80000) {
    return "With ₹80k budget: 1–2 rooms with ceiling work possible\n\nBest combo: Gypsum (hall) + PVC (kitchen/bath)"
  }

  if (budgetAmount < 150000) {
    return "With ₹150k budget: 2BHK ceiling + 1 accent wall with WPC panels\n\nLuxury finish possible!"
  }

  return "With this budget: Premium 2BHK interior possible!\n\nGypsum cove lighting + WPC feature wall + UV marble details\n\n📞 Free consultation: +91 8651070831"
}

/**
 * Extract budget amount from text
 */
export function extractBudgetAmount(text: string): number | null {
  const t = text.toLowerCase().replace(/,/g, "")

  // Lakh pattern
  const lakhMatch = t.match(
    /(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b)/
  )
  if (lakhMatch) {
    return parseFloat(lakhMatch[1]) * 100000
  }

  // Hazar pattern
  const hazarMatch = t.match(
    /(\d+(?:\.\d+)?)\s*(?:hazar|hajar|thousand|k\b)/
  )
  if (hazarMatch) {
    return parseFloat(hazarMatch[1]) * 1000
  }

  // Direct rupee pattern
  const rupeeMatch = t.match(/₹\s*(\d+(?:\.\d+)?)/)
  if (rupeeMatch) {
    const val = parseFloat(rupeeMatch[1])
    if (val > 1000) return val
  }

  return null
}

/**
 * Format price in Indian numerals
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

/**
 * Get premium advice based on room size and material
 */
export function getPremiumAdvice(
  area: number,
  material: string
): string {
  if (area > 250) {
    return "For this spacious area, try cove lighting with premium Gypsum or WPC panels for luxury feel!"
  }

  if (area > 150) {
    return "Great size! Add LED strips around perimeter for modern, high-end atmosphere."
  }

  if (material.includes("WPC")) {
    return "WPC panels offer rich wooden texture – perfect for TV wall or accent feature."
  }

  if (material.includes("PVC")) {
    return "PVC is lightweight & waterproof – ideal for kitchens/balconies with zero maintenance."
  }

  return "Customize with subtle indirect lighting to elevate the look!"
}
