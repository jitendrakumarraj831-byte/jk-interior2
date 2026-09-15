import { useEffect, useRef, useState } from "react"

/**
 * True only while the element is actually on screen *and* the tab is in the
 * foreground — i.e. only while an animation attached to it would be seen.
 *
 * Every section on this site is rendered twice: once in a `md:hidden` swipe rail
 * for phones and once in a `hidden md:block` desktop layout. CSS `display: none`
 * does not unmount a React component, so any `setInterval`/`setTimeout` carousel
 * inside them runs in *both* copies, forever, including the copy the visitor's
 * screen size means they will never see. With seven gallery categories that was
 * fourteen concurrent timers, each also driving a Framer Motion animation, on a
 * page that is mostly below the fold.
 *
 * A `display: none` element has no intersection rectangle, so it reports "not
 * visible" here and its timer simply never starts. The same check covers the
 * far more common case of a card that is on the right layout but 4000px down the
 * page, and `visibilitychange` covers a backgrounded tab.
 *
 * Returns a ref to attach to the element whose visibility should be tracked.
 */
export function useActiveOnScreen<T extends Element>(options?: { rootMargin?: string }) {
  const ref = useRef<T | null>(null)
  const [onScreen, setOnScreen] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const rootMargin = options?.rootMargin ?? "200px"

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (very old browsers): assume visible rather than
    // leaving a carousel permanently frozen.
    if (typeof IntersectionObserver === "undefined") {
      setOnScreen(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setOnScreen(entry.isIntersecting)
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState !== "hidden")
    sync()
    document.addEventListener("visibilitychange", sync)
    return () => document.removeEventListener("visibilitychange", sync)
  }, [])

  return { ref, active: onScreen && tabVisible }
}
