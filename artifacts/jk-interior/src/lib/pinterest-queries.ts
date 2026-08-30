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

/**
 * Pinterest's own search-results URL for a query. Pinterest sends
 * `X-Frame-Options` on this page, so it can't be embedded in an iframe — it's
 * only used as an "open on Pinterest" link (new tab) and as the fallback
 * shown in the gallery modal for a service with no board configured below.
 */
export function pinterestSearchUrl(query: string): string {
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}&rs=typed`
}

/**
 * One Pinterest **board** URL per service slug, embedded in the gallery
 * modal via Pinterest's official board widget (`pinit.js` + a
 * `data-pin-do="embedBoard"` anchor — see `ServiceGalleryModal` in
 * `components/services.tsx`). Unlike a raw search-results page, a board
 * widget renders through `widgets.pinterest.com`, which Pinterest designed
 * to be iframed by other sites.
 *
 * A slug with no entry here (or no Pinterest board yet) falls back to the
 * "open search on Pinterest" link instead of a broken embed — fill in the
 * real board URL for a service once it has one, e.g.
 * `"gypsum-ceiling": "https://www.pinterest.com/jkinterior/gypsum-false-ceiling/"`.
 */
export const PINTEREST_BOARD_URL: Partial<Record<string, string>> = {
  "gypsum-ceiling": "https://pin.it/5JCzCNMBW",
  "pvc-false-ceiling": "https://pin.it/3KRJ2meL2",
  "grid-ceiling": "https://pin.it/3rYURFr83",
  "wpc-wall-panel": "https://pin.it/3O5HLydyX",
  "uv-marble-sheet": "https://pin.it/7wFk230ii",
  "partition-wall": "https://pin.it/1S0XsU8QI",
  "modular-tv-unit": "https://pin.it/49wkXzKZW",
  "artificial-grass": "https://pin.it/3Gm5tAi2W",
}
