export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  titleHi: string
  excerpt: string
  coverImage: string
  category: string
  publishedAt: string
  readMinutes: number
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "pvc-vs-gypsum-false-ceiling",
    title: "PVC vs Gypsum False Ceiling: Which One Should You Choose?",
    titleHi: "PVC या Gypsum फॉल्स सीलिंग — कौन सा चुनें?",
    excerpt:
      "Both PVC and gypsum ceilings cost roughly the same per sq.ft, but they suit very different rooms. Here's how to decide for your home in Forbesganj or Araria.",
    coverImage: "/images/gypsum-ceiling.jpg",
    category: "Ceiling",
    publishedAt: "2026-03-10",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "One of the most common questions we get at JK Interior is: should I choose PVC or gypsum for my false ceiling? Both materials fall in a similar price range of ₹80–₹140 per sq.ft, so the real decision comes down to the room, not the budget.",
        ],
      },
      {
        heading: "Waterproofing is the deciding factor",
        paragraphs: [
          "PVC ceiling panels are 100% waterproof and termite-proof, which makes them the right choice for kitchens, bathrooms, and balconies. Gypsum boards, on the other hand, are not waterproof — moisture exposure over time can cause sagging or staining.",
          "For dry areas like halls, bedrooms, and drawing rooms, gypsum is usually the better-looking option because it can be shaped into cove designs and painted to match your wall colour.",
        ],
      },
      {
        heading: "Our recommendation",
        paragraphs: [
          "For most 2BHK and 3BHK homes we work on in Forbesganj and Araria, we recommend a mixed approach: gypsum with cove lighting in the hall and bedrooms, and PVC in the kitchen and bathrooms. This combination gives you the best look where guests see it, and the best durability where moisture is a concern.",
          "Still unsure? Book a free site visit and our team will recommend the right material for each room based on your layout and budget.",
        ],
      },
    ],
  },
  {
    slug: "wpc-wall-panel-maintenance-guide",
    title: "WPC Wall Panel Maintenance: A Complete Guide",
    titleHi: "WPC वॉल पैनल की देखभाल कैसे करें",
    excerpt:
      "WPC wall panels are marketed as zero-maintenance — but a little care goes a long way in keeping them looking new for 15+ years.",
    coverImage: "/images/wpc3.jpg",
    category: "Wall Panels",
    publishedAt: "2026-02-18",
    readMinutes: 3,
    sections: [
      {
        paragraphs: [
          "WPC (Wood Plastic Composite) panels have become the go-to choice for TV walls and accent walls because they give a real-wood look without the maintenance headaches of natural wood.",
        ],
      },
      {
        heading: "Daily and weekly care",
        paragraphs: [
          "Simply dust the panels with a dry microfiber cloth once a week. For fingerprints or light stains, a barely-damp cloth is enough — WPC does not absorb moisture the way real wood does.",
          "Avoid abrasive scrubbers, steel wool, or strong chemical cleaners, as these can dull the surface texture over time.",
        ],
      },
      {
        heading: "What makes WPC different from real wood",
        paragraphs: [
          "Unlike real wood, WPC panels never need polishing, varnishing, or termite treatment. They are also more stable in humidity, so they won't warp or crack during Bihar's monsoon season.",
        ],
      },
    ],
  },
  {
    slug: "false-ceiling-cost-guide-bihar",
    title: "False Ceiling Cost Guide 2026: What to Expect in Bihar",
    titleHi: "फॉल्स सीलिंग की कीमत — पूरी जानकारी 2026",
    excerpt:
      "A transparent breakdown of what false ceiling installation actually costs per sq.ft, what changes the price, and how to avoid overpaying.",
    coverImage: "/images/gypsum5.jpg",
    category: "Pricing",
    publishedAt: "2026-01-22",
    readMinutes: 5,
    sections: [
      {
        paragraphs: [
          "False ceiling pricing confuses a lot of first-time homeowners because quotes can range anywhere from ₹45 to ₹500 per sq.ft depending on the material and design. Here's what actually drives the cost.",
        ],
      },
      {
        heading: "Base material rates",
        paragraphs: [
          "Gypsum and PVC ceilings typically start around ₹80/sq.ft for a basic flat design. Grid ceilings for offices and shops are cheaper, starting around ₹45/sq.ft. Fluted and WPC panelling for feature walls runs higher, from ₹180–₹500/sq.ft, because of the material and finishing work involved.",
        ],
      },
      {
        heading: "What pushes the price up",
        paragraphs: [
          "Cove lighting, multi-level (stepped) designs, curved profiles, and premium textured finishes all add to labour and material cost. A simple flat ceiling is the most economical; a designer cove ceiling with LED strips can run 30–50% higher per sq.ft.",
        ],
      },
      {
        heading: "How to get an accurate number",
        paragraphs: [
          "Because so many factors affect the final price, the only reliable way to get an accurate quote is a free, in-person site visit — which JK Interior provides at no cost across Forbesganj, Araria, and nearby districts. You can also use our online price calculator for a rough starting estimate before the visit.",
        ],
      },
    ],
  },
  {
    slug: "uv-marble-sheet-vs-real-marble",
    title: "UV Marble Sheets vs Real Marble: Is the Look-Alike Worth It?",
    titleHi: "UV मार्बल शीट vs असली मार्बल — क्या फर्क है?",
    excerpt:
      "Real marble looks stunning but comes with a heavy price tag and maintenance burden. Here's how UV marble sheets compare on cost, durability, and appearance.",
    coverImage: "/images/uv-marble.jpg",
    category: "Wall Panels",
    publishedAt: "2025-12-05",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "UV marble sheets are high-gloss PVC-based panels printed with a marble pattern, sealed under a UV-cured coating. They are increasingly popular for kitchen backsplashes, bathroom walls, and living room feature walls.",
        ],
      },
      {
        heading: "Cost comparison",
        paragraphs: [
          "Real marble slabs, including cutting and polishing labour, commonly cost ₹250–₹600+ per sq.ft depending on the grade. UV marble sheets cost ₹50–₹95 per sq.ft installed — roughly 70-80% less for a very similar visual effect from a normal viewing distance.",
        ],
      },
      {
        heading: "Where each one wins",
        paragraphs: [
          "Real marble has more depth and natural veining variation and adds long-term resale value to a home. UV marble sheets win on weight (no structural load), zero grout lines, scratch resistance, and dramatically lower cost — making them ideal for rental properties, budget renovations, or anyone who wants the marble look without the marble price.",
        ],
      },
    ],
  },
  {
    slug: "2026-interior-design-trends-bihar-homes",
    title: "2026 Interior Design Trends for Bihar Homes",
    titleHi: "2026 के लिए इंटीरियर डिज़ाइन ट्रेंड्स",
    excerpt:
      "From fluted panel feature walls to warm cove lighting, here are the interior trends we're seeing the most requests for this year.",
    coverImage: "/images/fluted-panels.jpg",
    category: "Design Trends",
    publishedAt: "2026-04-02",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Every year brings new interior styles, and 2026 is no different. Based on the projects we're being asked to quote most often, here are the trends worth knowing about.",
        ],
      },
      {
        heading: "Fluted and ribbed panels",
        paragraphs: [
          "Fluted (grooved) wall panels continue to dominate feature-wall requests — especially for TV walls and office reception areas. The vertical lines add texture and a sense of height to a room.",
        ],
      },
      {
        heading: "Warm cove lighting over cold spotlights",
        paragraphs: [
          "Homeowners are moving away from harsh ceiling spotlights toward hidden LED cove lighting in warm white (3000K), which creates a softer, more premium ambience — especially popular in hall and bedroom ceilings.",
        ],
      },
      {
        heading: "Two-tone walls",
        paragraphs: [
          "Pairing a textured lower half (wood-look WPC or fluted panel) with a plain painted upper half is a simple way to add depth to a room without paneling the entire wall — and it costs less too.",
        ],
      },
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
