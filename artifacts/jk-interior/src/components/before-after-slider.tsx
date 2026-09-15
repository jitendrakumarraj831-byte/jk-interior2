import { useCallback, useRef, useState } from "react"
import { ChevronsLeftRight } from "lucide-react"

/**
 * Draggable split-image comparison. The "after" photo fills the frame; the
 * "before" photo sits on top, clipped to the handle's position, so dragging
 * (mouse, touch or arrow keys) reveals more of one side or the other.
 *
 * Pointer events unify mouse and touch handling — no separate touch listeners
 * needed. The handle is also a real `role="slider"` so it's keyboard- and
 * screen-reader-operable, not just a visual toy.
 */
/** The frame is a 4/3 box inside a max-w-4xl column, so it never needs more than ~900px. */
const COMPARISON_SIZES = "(min-width: 896px) 860px, calc(100vw - 40px)"

const srcVariant = (src: string, suffix: string) =>
  src.endsWith(".webp") ? src.replace(/\.webp$/, suffix) : src

/**
 * One half of the comparison. Both photos used to be plain `<img src>` pointing
 * at the full-resolution original with no AVIF source at all — the only place on
 * the site that skipped the generated variants — so this section alone fetched
 * two desktop-sized originals on a phone, both of them above the fold-and-a-half.
 */
function ComparisonImage({ src, alt }: { src: string; alt: string }) {
  return (
    <picture>
      <source srcSet={srcVariant(src, "-800w.avif")} sizes={COMPARISON_SIZES} type="image/avif" />
      <source srcSet={srcVariant(src, "-800w.webp")} sizes={COMPARISON_SIZES} type="image/webp" />
      <img
        src={src}
        alt={alt}
        title={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}) {
  const [percent, setPercent] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  // Measured once when the drag starts rather than on every pointermove.
  // `getBoundingClientRect()` forces a synchronous layout, and a drag fires at
  // the display's refresh rate — on a phone that was 60-120 forced reflows per
  // second of dragging, against a box that cannot move while you hold it.
  const rect = useRef<{ left: number; width: number } | null>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const bounds = rect.current
    if (!bounds || bounds.width === 0) return
    const pct = ((clientX - bounds.left) / bounds.width) * 100
    setPercent(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current
    if (!el) return
    const bounds = el.getBoundingClientRect()
    rect.current = { left: bounds.left, width: bounds.width }
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false
    rect.current = null
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5))
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5))
    if (e.key === "Home") setPercent(0)
    if (e.key === "End") setPercent(100)
  }

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl bg-charcoal-900 ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After — full frame, bottom layer */}
      <ComparisonImage src={afterSrc} alt={afterAlt} />

      {/* Before — clipped to the handle position, top layer */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}>
        <ComparisonImage src={beforeSrc} alt={beforeAlt} />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-gold-500/90 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-charcoal-950 backdrop-blur-md">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_12px_rgba(0,0,0,0.5)]" style={{ left: `${percent}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Comparison slider between ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-gold-500 text-charcoal-950 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 group-hover:scale-110"
        style={{ left: `${percent}%` }}
      >
        <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  )
}
