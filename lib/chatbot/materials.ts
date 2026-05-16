/**
 * Material Detection & Responses
 * Identify materials from user input and provide detailed info
 */

export type MaterialType =
  | "pvc"
  | "gypsum"
  | "wpc"
  | "uv"
  | "tvunit"
  | "kitchen"
  | "wardrobe"
  | "unknown"

export interface MaterialResponse {
  type: MaterialType
  name: string
  description: string
}

/**
 * Detect material type from message
 */
export function detectMaterial(text: string): MaterialType {
  const t = text.toLowerCase()

  if (t.includes("pvc")) return "pvc"
  if (t.includes("gypsum") || t.includes("pop"))
    return "gypsum"
  if (t.includes("wpc") || t.includes("wood panel"))
    return "wpc"
  if (t.includes("uv") || t.includes("marble"))
    return "uv"
  if (t.includes("tv unit") || t.includes("tv panel"))
    return "tvunit"
  if (t.includes("kitchen"))
    return "kitchen"
  if (
    t.includes("wardrobe") ||
    t.includes("almirah") ||
    t.includes("cupboard")
  )
    return "wardrobe"

  return "unknown"
}

/**
 * Get material response
 */
export function getMaterialResponse(
  materialType: MaterialType
): MaterialResponse {
  const responses: Record<MaterialType, MaterialResponse> = {
    pvc: {
      type: "pvc",
      name: "PVC False Ceiling",
      description: `
🏠 **PVC False Ceiling** – ₹60–120/sq.ft

Lightweight, waterproof, zero-maintenance solution. Perfect for kitchens, balconies, and wet areas.

✅ **Best for:** Kitchens, bathrooms, balconies, budget projects
❌ **Avoid:** Direct sunlight, high heat areas
⏱ **Install time:** 3–7 days
🛡 **Warranty:** 5 years

Tell me your room dimensions (like 12×14) for an exact quote!
`.trim(),
    },
    gypsum: {
      type: "gypsum",
      name: "Gypsum False Ceiling",
      description: `
✨ **Gypsum False Ceiling** – ₹80–140/sq.ft

Premium finish with excellent LED lighting integration. Fire-resistant, modern design capability.

✅ **Best for:** Living rooms, bedrooms, luxury projects
❌ **Avoid:** Bathrooms, kitchens, wet areas (not waterproof)
⏱ **Install time:** 4–8 days
🛡 **Warranty:** 10 years

Try: Cove lighting design for premium ambiance!

Share room size for pricing: (e.g., 14×18)
`.trim(),
    },
    wpc: {
      type: "wpc",
      name: "WPC Wall Panels",
      description: `
🪵 **WPC Wall Panels** – ₹180–450/sq.ft

Water-proof, wood-plastic composite with gorgeous wooden texture. Eco-friendly and durable.

✅ **Best for:** TV unit backdrop, accent walls, feature walls
⏱ **Install time:** 2–5 days
🛡 **Warranty:** 7 years

Perfect for bedroom accent wall or TV wall — adds luxury instantly!

What's your wall dimensions? (height × width)
`.trim(),
    },
    uv: {
      type: "uv",
      name: "UV Marble Sheets",
      description: `
💎 **UV Marble Sheets** – ₹50–95/sq.ft

Glossy luxury finish with authentic marble look. Stain-resistant, easy maintenance.

✅ **Best for:** Walls, kitchen backsplash, bathroom, modern design
⏱ **Install time:** 1–3 days
🛡 **Warranty:** 5 years

Gives premium look at affordable price!

Share area for exact estimate: (e.g., 10×8)
`.trim(),
    },
    tvunit: {
      type: "tvunit",
      name: "Modular TV Unit",
      description: `
📺 **Modular TV Unit** – ₹15,000+

Custom-designed with integrated storage, shelving, LED backlighting. Fully modular.

💰 **Pricing:**
• 6–8 ft: ₹20,000–₹45,000
• 8–10 ft: ₹35,000–₹75,000
• 10–14 ft: ₹60,000–₹1,20,000

⏱ **Install:** 3–7 days
🛡 **Warranty:** 7 years

LED strip backlighting adds premium touch!

What's your available wall width?
`.trim(),
    },
    kitchen: {
      type: "kitchen",
      name: "Modular Kitchen",
      description: `
🍳 **Modular Kitchen** – ₹60,000–₹2,00,000

L-shape, U-shape, or parallel layouts. Soft-close hinges, pull-out storage, premium laminates.

💰 **Depends on:**
• Layout type
• Cabinet size
• Material finish
• Appliance integration

✅ Fully customizable
✅ Space-efficient storage
✅ Modern design options

Share kitchen dimensions (length × width) for exact pricing!
`.trim(),
    },
    wardrobe: {
      type: "wardrobe",
      name: "Custom Wardrobe",
      description: `
🚪 **Custom Wardrobe** – ₹800–₹2,000/sq.ft

Floor-to-ceiling storage with sliding/hinged doors. LED inside, custom shelves & drawers.

✅ **Features:**
• Sliding or hinged doors
• Interior LED lighting option
• Fully customized compartments
• Premium finishes

⏱ **Install:** 4–6 days
🛡 **Warranty:** 7 years

Share wardrobe dimensions (height × width) for estimate!
`.trim(),
    },
    unknown: {
      type: "unknown",
      name: "Service",
      description: `
I'm here to help! I specialize in:

✨ **Ceilings:** PVC, Gypsum, Grid
🪵 **Wall Panels:** WPC, Fluted, UV Marble
📺 **Furniture:** Modular TV Units, Kitchens, Wardrobes
🏠 **Complete Interiors:** Full room design & execution

**What are you interested in?**
`.trim(),
    },
  }

  return (
    responses[materialType] || responses.unknown
  )
}

/**
 * Compare two materials
 */
export function compareMaterials(
  mat1: MaterialType,
  mat2: MaterialType
): string {
  const r1 = getMaterialResponse(mat1)
  const r2 = getMaterialResponse(mat2)

  return `
**${r1.name}** vs **${r2.name}**

Both are great options! Here's how they differ:

**${r1.name}:**
${r1.description.split("\n").slice(2, 7).join("\n")}

**${r2.name}:**
${r2.description.split("\n").slice(2, 7).join("\n")}

Want to know which is better for your specific room? Share details!
`.trim()
}

/**
 * Check if message is asking about a specific material
 */
export function isMaterialQuery(text: string): boolean {
  return detectMaterial(text) !== "unknown"
}
