import { galleryImages, type GalleryImage } from "@/lib/gallery-data"

/**
 * Data layer for the "Search Design Ideas" modal (see
 * `components/design-search-modal.tsx`). Every tag below is matched against
 * our own photographed project catalog (`gallery-data.ts`) first — that's
 * real, always-available, zero-latency inventory. When a visitor's browser
 * has a live Unsplash access key configured (`VITE_UNSPLASH_ACCESS_KEY`),
 * results are enriched with matching architecture/interior photos from
 * Unsplash's public search API so the gallery keeps growing without another
 * photoshoot. Without a key the modal still works end-to-end on portfolio
 * photos alone — there is no hard dependency on a third-party key.
 */

export interface DesignResult {
  src: string
  alt: string
  category?: string
  width: number
  height: number
  /** Where this photo came from — lets the UI credit Unsplash results. */
  source: "portfolio" | "unsplash"
  /** Only set for "unsplash" results — the photographer to credit and link. */
  credit?: { name: string; profileUrl: string }
}

export interface DesignTag {
  id: string
  label: string
  /** Matched case-insensitively against each photo's alt text + category, and sent as the Unsplash search query. */
  keywords: string[]
}

export const DESIGN_TAGS: DesignTag[] = [
  { id: "bedroom", label: "Bedroom", keywords: ["bedroom"] },
  { id: "living-room", label: "Living Room", keywords: ["living room", "living-room", "living area", "hall"] },
  { id: "modern-lighting", label: "Modern Lighting", keywords: ["lighting", "led", "cove", "downlight"] },
  { id: "kitchen", label: "Kitchen", keywords: ["kitchen"] },
  { id: "office", label: "Office", keywords: ["office", "cabin", "commercial", "shop", "clinic"] },
  { id: "false-ceiling", label: "False Ceiling", keywords: ["ceiling"] },
  { id: "wall-panelling", label: "Wall Panelling", keywords: ["wall panel", "wpc", "marble", "cladding", "fluted"] },
  { id: "tv-unit", label: "TV Unit", keywords: ["tv unit", "tv wall"] },
]

function toPortfolioResult(img: GalleryImage): DesignResult {
  return { src: img.src, alt: img.alt, category: img.category, width: img.width, height: img.height, source: "portfolio" }
}

/** Every portfolio photo matching the given tag and/or free-text query (both optional; no filters returns everything). */
export function searchPortfolio(tagId: string | null, query: string): DesignResult[] {
  const tag = tagId ? DESIGN_TAGS.find((t) => t.id === tagId) : undefined
  const needle = query.trim().toLowerCase()

  return galleryImages
    .filter((img) => {
      const haystack = `${img.alt} ${img.category ?? ""}`.toLowerCase()
      const matchesTag = !tag || tag.keywords.some((k) => haystack.includes(k))
      const matchesQuery = !needle || haystack.includes(needle)
      return matchesTag && matchesQuery
    })
    .map(toPortfolioResult)
}

/** True when a live Unsplash access key is configured for this build. */
export function hasUnsplashKey(): boolean {
  return Boolean(import.meta.env.VITE_UNSPLASH_ACCESS_KEY)
}

interface UnsplashApiPhoto {
  id: string
  alt_description: string | null
  description: string | null
  width: number
  height: number
  urls: { regular: string; small: string }
  user: { name: string; links: { html: string } }
}

/**
 * Live search against Unsplash's public Search Photos endpoint, scoped to
 * interior/architecture results. Resolves to an empty array — never throws —
 * on a missing key, a network failure, or a non-OK response, so callers can
 * always merge the result straight into the portfolio list without a
 * try/catch of their own.
 */
export async function fetchUnsplashResults(query: string, count = 10): Promise<DesignResult[]> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!accessKey) return []

  try {
    const url = new URL("https://api.unsplash.com/search/photos")
    url.searchParams.set("query", `${query} interior design`)
    url.searchParams.set("per_page", String(count))
    url.searchParams.set("orientation", "squarish")

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${accessKey}` },
    })
    if (!res.ok) return []

    const data: { results: UnsplashApiPhoto[] } = await res.json()
    return data.results.map((photo) => ({
      src: photo.urls.regular,
      alt: photo.alt_description ?? photo.description ?? `${query} interior design idea`,
      width: photo.width,
      height: photo.height,
      source: "unsplash" as const,
      credit: { name: photo.user.name, profileUrl: photo.user.links.html },
    }))
  } catch {
    return []
  }
}
