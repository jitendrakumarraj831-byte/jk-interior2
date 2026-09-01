import { galleryImages, galleryImagesForService, type GalleryImage } from "@/lib/gallery-data"
import { PINTEREST_BOARD_URL } from "@/lib/pinterest-queries"

/**
 * Data layer for the "Search Design Ideas" modal (see
 * `components/design-search-modal.tsx`).
 *
 * Priority order for a given category/search:
 *   1. JK Interior's own Pinterest board for that category (fetched
 *      server-side via `/api/pinterest-feed` — see api/pinterest-feed.ts —
 *      since Pinterest's RSS has no CORS headers for a direct browser fetch).
 *      This is real, curated inspiration the business itself has pinned.
 *   2. Our own photographed project catalog (`gallery-data.ts`) — real,
 *      always-available, zero-latency inventory, and a guaranteed baseline
 *      even if the Pinterest fetch fails or a board hasn't been set up yet.
 *   3. Unsplash's public search API, only reached for when the above two are
 *      still thin (see `MIN_RESULTS_BEFORE_FALLBACK` in the modal) or for a
 *      free-text search that doesn't match any category — enriches rather
 *      than replaces, and needs `VITE_UNSPLASH_ACCESS_KEY` configured.
 *
 * Every step degrades gracefully: a missing key, an unreachable board, or a
 * network failure at any layer just means fewer results, never a crash.
 */

export interface DesignResult {
  src: string
  alt: string
  category?: string
  width: number
  height: number
  /** Where this photo came from — lets the UI credit Pinterest/Unsplash results. */
  source: "portfolio" | "pinterest" | "unsplash"
  /** Set for "pinterest" and "unsplash" results — who to credit and link to. */
  credit?: { name: string; profileUrl: string }
}

export interface DesignTag {
  id: string
  label: string
  /** Matched case-insensitively against a typed search query (to infer a tag from free text) and sent as the Unsplash search query. Portfolio filtering uses `id` directly via `galleryImagesForService` instead — see `searchPortfolio` — so these don't need to also cover every word that appears in that category's captions. */
  keywords: string[]
}

/**
 * One tag per official service category — `id` doubles as the key into
 * `PINTEREST_BOARD_URL` (from `pinterest-queries.ts`, the same map the rest
 * of the site uses to link to these boards), so a tag either has a matching
 * Pinterest board or it doesn't; there's no separate mapping to keep in sync.
 */
export const DESIGN_TAGS: DesignTag[] = [
  { id: "gypsum-ceiling", label: "Gypsum Ceiling", keywords: ["gypsum"] },
  { id: "pvc-false-ceiling", label: "PVC Ceiling", keywords: ["pvc"] },
  { id: "grid-ceiling", label: "Grid Ceiling", keywords: ["grid"] },
  { id: "wpc-wall-panel", label: "WPC Panel", keywords: ["wpc", "fluted", "louvre", "louver"] },
  { id: "uv-marble-sheet", label: "UV Marble", keywords: ["marble", "uv marble"] },
  { id: "partition-wall", label: "Partition", keywords: ["partition"] },
  { id: "modular-tv-unit", label: "TV Unit", keywords: ["tv unit", "tv wall", "tv cabinet"] },
  { id: "artificial-grass", label: "Artificial Grass", keywords: ["grass", "turf"] },
]

/**
 * The tag a search should use: the explicitly selected chip if there is one,
 * otherwise whichever tag's keywords/label the typed query matches — so
 * typing "gypsum ceiling" gets the same Pinterest-board priority as clicking
 * the "Gypsum Ceiling" chip, per "when a user opens a category or searches."
 */
export function inferDesignTag(activeTagId: string | null, query: string): DesignTag | undefined {
  if (activeTagId) return DESIGN_TAGS.find((t) => t.id === activeTagId)
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  return DESIGN_TAGS.find((t) => q.includes(t.label.toLowerCase()) || t.keywords.some((k) => q.includes(k)))
}

function toPortfolioResult(img: GalleryImage): DesignResult {
  return { src: img.src, alt: img.alt, category: img.category, width: img.width, height: img.height, source: "portfolio" }
}

/**
 * Every portfolio photo matching the given tag and/or free-text query (both
 * optional; no filters returns everything). A tag filters by its exact
 * service category via `galleryImagesForService` (the same slug -> category
 * mapping `services.tsx`'s Featured Work modal uses) rather than a keyword
 * substring match — a loose "gypsum" match, for example, would also catch
 * Partition Wall photos whose captions mention gypsum boarding, which isn't
 * what a visitor who tapped "Gypsum Ceiling" is asking to see.
 */
export function searchPortfolio(tagId: string | null, query: string): DesignResult[] {
  const needle = query.trim().toLowerCase()
  const base = tagId ? galleryImagesForService(tagId) : galleryImages

  return base
    .filter((img) => {
      if (!needle) return true
      const haystack = `${img.alt} ${img.category ?? ""}`.toLowerCase()
      return haystack.includes(needle)
    })
    .map(toPortfolioResult)
}

interface PinterestFeedItem {
  title: string
  link: string
  image: string
  width: number
  height: number
}

/** True when the given tag has one of JK Interior's own Pinterest boards mapped to it. */
export function hasPinterestBoard(tagId: string): boolean {
  return Boolean(PINTEREST_BOARD_URL[tagId])
}

/**
 * Pins from JK Interior's own Pinterest board for this category — the
 * priority source for a category search (see the module doc above). Fetched
 * through `/api/pinterest-feed`, a server-side proxy for the board's `.rss`
 * feed (see api/pinterest-feed.ts), since Pinterest sends no CORS headers a
 * browser fetch could use directly. Resolves to an empty array — never
 * throws — for a tag with no mapped board, a network failure, or a non-OK
 * response, so callers can always merge the result straight in.
 */
export async function fetchPinterestBoardResults(tagId: string, count = 12): Promise<DesignResult[]> {
  if (!hasPinterestBoard(tagId)) return []

  try {
    const res = await fetch(`/api/pinterest-feed?board=${encodeURIComponent(tagId)}`)
    if (!res.ok) return []

    const data: { ok: boolean; items?: PinterestFeedItem[] } = await res.json()
    if (!data.ok || !data.items) return []

    return data.items.slice(0, count).map((item) => ({
      src: item.image,
      alt: item.title,
      width: item.width,
      height: item.height,
      source: "pinterest" as const,
      credit: { name: "Pinterest — Jkinteriorfbg", profileUrl: item.link },
    }))
  } catch {
    return []
  }
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
