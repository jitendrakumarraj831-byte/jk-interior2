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
 * into the page underneath. A keyboard or screen-reader user ended up "typing
 * into" a page they could not see, with no way back to the close button.
 *
 * `enabled` exists because these dialogs stack: the lightbox opens *on top of*
 * the design-search and Featured Work modals, and two traps fighting over Tab
 * would pin focus. The lower dialog stands its trap down while the upper one is
 * open.
 *
 * Note which effect owns what. The keydown listener follows `enabled`, but the
 * focus restore is deliberately mount/unmount only. Tying the restore to
 * `enabled` as well meant that opening the lightbox from inside a modal ran the
 * "closing" path: focus was thrown to the trigger *behind* the modal — scrolling
 * the background page and stealing it from the dialog that had just opened — and
 * the real opener was then overwritten, so closing for real restored focus to the
 * wrong element.
 *
 * Returns a ref for the dialog container.
 */
export function useFocusTrap<T extends HTMLElement>(enabled = true) {
  const containerRef = useRef<T | null>(null)

  // Whatever opened the dialog — a gallery tile, the sticky bar button — gets
  // focus back when it closes, so a keyboard user does not land at the top of
  // the document. Runs once per dialog, never on an `enabled` toggle.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const container = containerRef.current
    return () => {
      if (!opener || !opener.isConnected) return
      const active = document.activeElement
      // After a dialog unmounts the browser usually parks focus on <body>; the
      // container is detached by then, so "focus is still inside" has to count
      // the detached subtree too. Either case means the visitor did not choose
      // where focus went, so restoring is right. If focus is on some other real
      // element, they moved it themselves — leave it alone.
      const focusMovedDeliberately =
        active !== null && active !== document.body && !(container?.contains(active) ?? false)
      if (!focusMovedDeliberately) opener.focus?.()
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    if (!container) return

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
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [enabled])

  return containerRef
}
