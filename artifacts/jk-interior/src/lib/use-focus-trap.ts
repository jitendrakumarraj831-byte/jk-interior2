import { useEffect, useRef } from "react"

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

/**
 * Keeps Tab inside a modal, and puts focus back where it came from on close.
 *
 * Every dialog on this site — the photo lightbox, the design-search modal, the
 * per-service Featured Work modal — portals to `document.body` and sits over the
 * page with `aria-modal`, but nothing stopped Tab from walking straight out of it
 * into the page underneath. A keyboard or screen-reader user ended up
 * "typing into" a page they could not see, with no way back to the close button.
 *
 * Returns a ref for the dialog container.
 */
export function useFocusTrap<T extends HTMLElement>(enabled = true) {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    if (!container) return

    // Whatever opened the dialog — the gallery tile, the sticky bar button —
    // should get focus back when it closes, not the top of the document.
    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || !container.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !container.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      // Only restore focus if it is still somewhere inside the dialog we are
      // tearing down; if the visitor has already clicked elsewhere, leave them be.
      if (previouslyFocused && container.contains(document.activeElement)) {
        previouslyFocused.focus?.()
      }
    }
  }, [enabled])

  return containerRef
}
