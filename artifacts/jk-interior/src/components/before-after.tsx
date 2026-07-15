import { useCallback, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeftRight, Sparkles, Phone, MessageCircle } from "lucide-react"
import { beforeAfterItems, type BeforeAfterItem } from "@/lib/before-after-data"

const easeLux = [0.22, 1, 0.36, 1] as const

function BeforePlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-gray-400" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
        <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 17c1.2-1.6 2.6-2.4 4-2.4s2.8.8 4 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <p className="max-w-[70%] text-center text-[11px] font-semibold text-gray-500">{label}</p>
    </div>
  )
}

function Slider({ item }: { item: BeforeAfterItem }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(98, Math.max(2, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label={`Before and after comparison for ${item.title}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 5))
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 5))
        }}
      >
        {/* After (base layer, full) */}
        <img
          src={item.afterSrc}
          alt={item.afterAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          After
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          {item.beforeSrc ? (
            <img
              src={item.beforeSrc}
              alt={item.beforeAlt}
              loading="lazy"
              className="h-full object-cover"
              style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
              draggable={false}
            />
          ) : (
            <BeforePlaceholder label={item.beforeAlt} />
          )}
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-gray-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900">{item.title}</p>
          <p className="text-[11px] text-gray-500">{item.titleHi}</p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          {item.category}
        </span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const shouldReduce = useReducedMotion()
  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  return (
    <section id="before-after" className="relative overflow-hidden py-20 sm:py-24 lg:py-28 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5">
            <ArrowLeftRight className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Before &amp; After</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            देखिए <span className="hero-gradient-text">Transformation</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            Slider को drag करें और देखें — साधारण दीवारों से लग्जरी इंटीरियर तक का सफर
          </p>
        </motion.div>

        <motion.div
          {...animProps}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {beforeAfterItems.map((item) => (
            <Slider key={item.title} item={item} />
          ))}
        </motion.div>

        <motion.div {...animProps} className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Illustrative before views — real project photos added as we complete more site visits
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+918541849118"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(5,150,105,0.3)] transition-all hover:bg-emerald-500 active:scale-95"
            >
              <Phone className="h-4 w-4" /> अपना घर बदलवाएं
            </a>
            <a
              href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20mujhe%20apne%20ghar%20ka%20before-after%20transformation%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#20c05c] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp करें
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
