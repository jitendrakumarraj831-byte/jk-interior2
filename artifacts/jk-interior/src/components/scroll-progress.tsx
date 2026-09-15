import { useEffect, useRef } from "react"

/**
 * The thin reading-progress bar pinned to the top of every page.
 *
 * Deliberately not built on framer-motion's `useScroll`/`useSpring` any more.
 * That combination ran a spring integrator on an animation frame for as long as
 * the value was still settling — on every scroll, on every page, for a 3px
 * decoration. This writes the scale straight onto the node instead, coalesced to
 * one write per frame, which is the cheapest thing that can possibly work and
 * costs nothing at all while the page is still.
 *
 * `scaleX` on a `transform-origin: left` element is compositor-only, so the
 * write never triggers layout or paint.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    let frame = 0
    let lastScale = -1

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      // Rounded so a sub-pixel scroll doesn't rewrite the style on every frame.
      const scale = Math.round(Math.min(1, Math.max(0, progress)) * 1000) / 1000
      if (scale === lastScale) return
      lastScale = scale
      el.style.transform = `scaleX(${scale})`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={barRef} className="scroll-progress-bar" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
}
