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

/** How long to keep looking for a target that a lazy chunk has not mounted yet. */
const SCROLL_RETRY_MS = 150
const SCROLL_MAX_ATTEMPTS = 12
/** Gap between settle checks. */
const SCROLL_SETTLE_MS = 200
/** Give up correcting after this many passes rather than fighting the page forever. */
const SCROLL_MAX_CORRECTIONS = 16
/** Close enough to the intended resting place to stop. */
const SCROLL_TOLERANCE_PX = 4
/** Scroll movement below this between two checks counts as "the page has stopped". */
const SCROLL_STILL_PX = 2

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
 * Scrolls to `hash`, then keeps correcting until the target actually comes to
 * rest where it should. Returns a cancel function.
 *
 * One `scrollIntoView` is not enough on this page, and stopping after it was a
 * real bug: a cold load of `/#areas` on a desktop viewport landed 274px short,
 * leaving the *previous* section filling the screen. Two things move the target
 * out from under an in-flight scroll:
 *
 *   • Lazy sections (Gallery, WhyUs, FAQ) mount after the first paint and push
 *     everything below them down.
 *   • `content-visibility: auto` sections report their `contain-intrinsic-size`
 *     placeholder height (900px) until they are rendered, then snap to their real
 *     height as the scroll passes them.
 *
 * So the first pass scrolls smoothly, and later passes correct instantly (by then
 * the visitor is already looking at roughly the right content, and a second
 * animation would read as a wobble). Two rules keep it quiet: a correction only
 * happens once the page has actually stopped moving — otherwise the check reads a
 * mid-animation position and cuts the smooth scroll short — and only if the target
 * is more than a few pixels from its resting place.
 *
 * The vertical move is `window.scrollTo` against a position worked out from the
 * element's own `scroll-margin-top`, *not* `scrollIntoView`. A gallery category
 * card lives inside the horizontal scroll-snap rail used on phones, and
 * `scrollIntoView` resolves its block alignment against that nearest scroll
 * container — so the card ended up flush with the very top of the viewport,
 * tucked behind the fixed navbar, and no number of retries could move it (it was
 * already "in view" as far as the browser was concerned). Computing the page
 * offset directly is immune to nested scrollers; the rail is brought to the right
 * card separately, by its own inline alignment.
 */
export function scrollToHash(hash: string): () => void {
  if (!hash) return () => {}
  let cancelled = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let attempts = 0
  let corrections = 0
  let lastScrollY = Number.NaN

  /** Where the element's top should come to rest, in viewport pixels. */
  const restingTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0

  /** Page offset that puts the element at its resting place. */
  const targetScrollY = (el: HTMLElement) =>
    Math.max(0, Math.round(window.scrollY + el.getBoundingClientRect().top - restingTop(el)))

  const step = () => {
    if (cancelled) return

    const el = findHashTarget(hash)
    if (!el) {
      // Target not mounted yet — keep waiting for its chunk.
      if (attempts++ < SCROLL_MAX_ATTEMPTS) timer = setTimeout(step, SCROLL_RETRY_MS)
      return
    }

    const scrollY = window.scrollY
    const moving = Number.isFinite(lastScrollY) && Math.abs(scrollY - lastScrollY) > SCROLL_STILL_PX
    lastScrollY = scrollY

    if (corrections > 0) {
      // Still gliding — let the scroll finish before judging where it landed.
      if (moving) {
        timer = setTimeout(step, SCROLL_SETTLE_MS)
        return
      }
      const drift = Math.abs(el.getBoundingClientRect().top - restingTop(el))
      if (drift <= SCROLL_TOLERANCE_PX) return
    }

    if (corrections >= SCROLL_MAX_CORRECTIONS) return

    if (corrections === 0) {
      // Bring a rail-mounted target to the right card sideways. `block: "nearest"`
      // keeps this from hijacking the page's vertical scroll, which the next line owns.
      el.scrollIntoView({ block: "nearest", inline: "center" })
    }
    window.scrollTo({ top: targetScrollY(el), behavior: corrections === 0 ? "smooth" : "auto" })
    corrections++
    timer = setTimeout(step, SCROLL_SETTLE_MS)
  }

  timer = setTimeout(step, 100)
  return () => {
    cancelled = true
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
