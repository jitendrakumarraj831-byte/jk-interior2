/**
 * One Pinterest search query per service slug, shown in the "Featured Work"
 * modal gallery (see `FeaturedWorkGrid` in `components/services.tsx`). Keyed
 * by `ServiceSummary.slug` from `services-summary.ts` — every slug there must
 * have an entry here.
 */
export const PINTEREST_QUERY: Record<string, string> = {
  "gypsum-ceiling": "Gypsum False Ceiling Design",
  "pvc-false-ceiling": "PVC False Ceiling Design",
  "grid-ceiling": "Grid Ceiling Design",
  "partition-wall": "Gypsum Partition Wall Design",
  "wpc-wall-panel": "WPC Wall Paneling Design",
  "uv-marble-sheet": "UV Marble Sheet Design",
  "modular-tv-unit": "Modular TV Unit Design",
  "artificial-grass": "Artificial Grass Design",
}

/** Pinterest's own search-results URL for a query — embeddable as a same-page iframe. */
export function pinterestSearchUrl(query: string): string {
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}&rs=typed`
}
