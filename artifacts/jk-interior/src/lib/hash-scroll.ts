import { useEffect } from "react"

/**
 * Deep-link scrolling for in-page anchors (`/#areas`, `/gallery#gallery-pvc-ceiling`).
 *
 * Two things make this less trivial than `element.scrollIntoView()`:
 *
 * 1. Sections load late. Gallery, WhyUs and the FAQ are lazy chunks, so the
 *    target usually does not exist yet on the frame the route mounts — hence the
 *    bounded retry rather than a single attempt.
 *
 * 2. Sections exist twice. Every major section renders a phone swipe rail *and*
 *    a desktop layout, with CSS choosing between them. Only one is displayed, so
 *    resolving an anchor by id alone can land on a `display: none` element and
 *    scroll nowhere at all. `findHashTarget` prefers whichever copy is actually
 *    rendered.
 */

const SCROLL_RETRY_MS = 150
const SCROLL_MAX_ATTEMPTS = 12

/** Is this element actually laid out, or is it the `display: none` half of a responsive pair? */
function isRendered(el: HTMLElement): boolean {
  return el.getClientRects().length > 0
}

/** The element a hash should scroll to, preferring a rendered copy over a hidden one. */
export function findHashTarget(rawHash: string): HTMLElement | null {
  const id = decodeURIComponent(rawHash.replace(/^#/, ""))
  if (!id) return null

  const candidates: HTMLElement[] = []
  const byId = document.getElementById(id)
  if (byId) candidates.push(byId)

  // Gallery categories carry `data-gallery-anchor` on every copy, while the id
  // itself sits on one — see the comment in components/gallery.tsx.
  const galleryPrefix = "gallery-"
  if (id.startsWith(galleryPrefix)) {
    const slug = id.slice(galleryPrefix.length)
    const selector = `[data-gallery-anchor="${CSS.escape(slug)}"]`
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(selector))) {
      if (!candidates.includes(el)) candidates.push(el)
    }
  }

  return candidates.find(isRendered) ?? candidates[0] ?? null
}

/**
 * Scrolls to `hash`, retrying while a lazy section is still on the wire.
 * Returns a cancel function.
 */
export function scrollToHash(hash: string): () => void {
  if (!hash) return () => {}
  let attempts = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  const attempt = () => {
    const el = findHashTarget(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    if (attempts++ < SCROLL_MAX_ATTEMPTS) timer = setTimeout(attempt, SCROLL_RETRY_MS)
  }

  timer = setTimeout(attempt, 100)
  return () => {
    if (timer) clearTimeout(timer)
  }
}

/**
 * Honours the hash in the URL when a page mounts, and again whenever it changes
 * (browser back/forward between anchors, or a native `<a href="#…">`).
 *
 * Note that a wouter `<Link href="/#areas">` clicked while already on `/` does
 * *not* reach this: wouter navigates with `history.pushState`, which fires no
 * `hashchange` and does not change wouter's own path, so nothing re-renders.
 * Those links call `scrollToHash` from their own click handler — see the footer.
 */
export function useHashScroll() {
  useEffect(() => {
    let cancel = scrollToHash(window.location.hash)
    const onHashChange = () => {
      cancel()
      cancel = scrollToHash(window.location.hash)
    }
    window.addEventListener("hashchange", onHashChange)
    return () => {
      cancel()
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])
}
