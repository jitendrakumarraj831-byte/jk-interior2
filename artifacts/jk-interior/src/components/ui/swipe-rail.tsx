import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * SwipeRail — the shared horizontal swipe carousel used by every home-page
 * section.
 *
 * It is built on native CSS scroll-snap rather than a JS drag emulation, which
 * is what makes it feel right on a phone: the browser's own momentum scrolling
 * and rubber-banding are preserved, it never fights a vertical page scroll, and
 * it keeps working with a keyboard, a trackpad and assistive technology.
 *
 * Each direct child becomes one slide. The rail exposes optional arrow controls
 * (pointer devices only) and dot indicators, plus soft edge fades that hint
 * there is more content to the side.
 */

export interface SwipeRailProps {
  children: ReactNode
  /** Accessible label describing what the rail contains. */
  ariaLabel: string
  /** Tailwind width classes applied to every slide. */
  itemClassName?: string
  className?: string
  /** Gap utility between slides. */
  gapClassName?: string
  /** Horizontal padding so the first/last slide align with the page gutter. */
  edgePaddingClassName?: string
  /** Show the prev/next buttons on pointer devices. Defaults to true. */
  arrows?: boolean
  /** Show the dot indicators below the rail. Defaults to true. */
  dots?: boolean
  /** Paint the edge fades using this CSS colour. Omit for no fade. */
  fadeColor?: string
  /** Render the dots in a light-on-dark palette. */
  dark?: boolean
}

export default function SwipeRail({
  children,
  ariaLabel,
  itemClassName = "w-[82%] xs:w-[74%] sm:w-[54%] lg:w-[32%]",
  className,
  gapClassName = "gap-4 sm:gap-5",
  edgePaddingClassName = "px-5 sm:px-6 lg:px-12",
  arrows = true,
  dots = true,
  fadeColor,
  dark = false,
}: SwipeRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const slides = Children.toArray(children)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // Track which slide is centred so the dots and arrow states stay truthful,
  // whether the visitor swiped, used the arrows, or tabbed through the slides.
  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, clientWidth, scrollWidth } = el
    setAtStart(scrollLeft <= 4)
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4)

    const children = Array.from(el.children) as HTMLElement[]
    if (!children.length) return
    const centre = scrollLeft + clientWidth / 2
    let best = 0
    let bestDistance = Number.POSITIVE_INFINITY
    children.forEach((child, i) => {
      const childCentre = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(childCentre - centre)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    sync()

    // The scroll handler reads layout (offsetLeft/offsetWidth) on every
    // call, which forces a reflow — running that on every single "scroll"
    // event (native momentum scrolling can fire it dozens of times a
    // second) causes jank on low-end phones. Coalesce to at most once per
    // animation frame instead.
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        sync()
      })
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [sync, slides.length])

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    })
  }, [])

  const step = useCallback(
    (direction: 1 | -1) => {
      const next = Math.min(Math.max(active + direction, 0), slides.length - 1)
      scrollToIndex(next)
    },
    [active, slides.length, scrollToIndex],
  )

  const fadeStyle = (side: "left" | "right") =>
    fadeColor
      ? { backgroundImage: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${fadeColor}, transparent)` }
      : undefined

  return (
    <div className={cn("relative", className)}>
      {fadeColor && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-20 w-8 transition-opacity duration-300 sm:w-14",
              atStart && "opacity-0",
            )}
            style={fadeStyle("left")}
          />
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-20 w-8 transition-opacity duration-300 sm:w-14",
              atEnd && "opacity-0",
            )}
            style={fadeStyle("right")}
          />
        </>
      )}

      <div
        ref={scrollerRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "swipe-rail flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-2",
          gapClassName,
          edgePaddingClassName,
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn("snap-center shrink-0", itemClassName)}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {arrows && slides.length > 1 && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 hidden items-center justify-between lg:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={`Previous — ${ariaLabel}`}
            className={cn(
              "pointer-events-auto ml-1 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all",
              dark
                ? "border-white/20 bg-black/40 text-white hover:bg-black/70"
                : "border-gold-200 bg-white/90 text-gold-700 hover:bg-white",
              atStart && "pointer-events-none opacity-0",
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={`Next — ${ariaLabel}`}
            className={cn(
              "pointer-events-auto mr-1 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all",
              dark
                ? "border-white/20 bg-black/40 text-white hover:bg-black/70"
                : "border-gold-200 bg-white/90 text-gold-700 hover:bg-white",
              atEnd && "pointer-events-none opacity-0",
            )}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}

      {dots && slides.length > 1 && (
        // The button is the hit area, the span is the dot. They used to be the
        // same element, which made every indicator a 6x6 px tap target on a
        // phone — unusable, and well under the 24x24 minimum. The dots look
        // identical; there is just something to actually hit around them now.
        <div className="mt-5 flex items-center justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
              aria-current={i === active}
              className="flex h-6 min-w-6 items-center justify-center px-1"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? cn("w-6", dark ? "bg-gold-300" : "bg-gold-600")
                    : cn("w-1.5", dark ? "bg-white/30" : "bg-gold-900/20"),
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * A one-line "swipe to explore" affordance. Shown under a rail on touch
 * layouts so first-time visitors know the row is horizontally scrollable.
 */
export function SwipeHint({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] lg:hidden",
        dark ? "text-slate-400" : "text-gray-400",
        className,
      )}
    >
      <ChevronLeft className="h-3 w-3" aria-hidden="true" />
      Swipe to explore
      <ChevronRight className="h-3 w-3" aria-hidden="true" />
    </p>
  )
}
