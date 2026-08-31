import { useEffect, useState } from "react"
import type { PinterestPin } from "@/lib/pinterest-rss"

/**
 * Pinterest board pins for one service slug, fetched from `/api/pinterest`.
 *
 * The browser cannot read pinterest.com's RSS directly — no CORS headers — so
 * this goes through our own serverless route, which fetches and parses the feed
 * server-side (see `api/pinterest.ts`).
 *
 * Returns `[]` until the pins arrive, and `[]` forever if they never do. Every
 * caller renders local project photos first and merges these in on top
 * (`mergeGalleryWithPins`), so an empty result is the normal quiet fallback
 * rather than something the UI has to report: no spinner, no error state, no
 * layout that depends on the request having finished.
 */
export function usePinterestPins(slug: string | null | undefined): PinterestPin[] {
  const [pins, setPins] = useState<PinterestPin[]>(() => (slug ? (cache.get(slug) ?? []) : []))

  useEffect(() => {
    if (!slug) {
      setPins([])
      return
    }

    const cached = cache.get(slug)
    if (cached) {
      setPins(cached)
      return
    }

    // Reopening the modal for a slug whose fetch failed shouldn't re-hit the
    // network every time; one attempt per slug per page view is enough.
    if (failed.has(slug)) {
      setPins([])
      return
    }

    const controller = new AbortController()
    let active = true

    fetch(`/api/pinterest?slug=${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return
        const next = Array.isArray(data?.pins) ? (data.pins as PinterestPin[]).filter(isRenderablePin) : []
        if (next.length) cache.set(slug, next)
        else failed.add(slug)
        setPins(next)
      })
      .catch((err) => {
        // An abort is just the modal closing mid-flight, not a failure.
        if (!active || controller.signal.aborted) return
        console.error(`[JK Gallery] /api/pinterest?slug=${slug} failed; showing local photos only.`, err)
        failed.add(slug)
        setPins([])
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [slug])

  return pins
}

/**
 * Survives modal open/close for the life of the page, so a visitor comparing
 * two services doesn't re-fetch a board they already looked at. The route
 * itself is CDN-cached for hours; this just avoids the round trip.
 */
const cache = new Map<string, PinterestPin[]>()

/** Slugs whose fetch came back empty or errored — not retried this page view. */
const failed = new Set<string>()

/**
 * The route already restricts pin URLs to `i.pinimg.com` over https, but this
 * data crosses a network boundary before reaching an `<img src>`, so the same
 * check is repeated here rather than trusted from the other side.
 */
function isRenderablePin(pin: unknown): pin is PinterestPin {
  if (!pin || typeof pin !== "object") return false
  const { src } = pin as { src?: unknown }
  if (typeof src !== "string") return false
  try {
    const url = new URL(src)
    return url.protocol === "https:" && url.hostname.toLowerCase() === "i.pinimg.com"
  } catch {
    return false
  }
}
