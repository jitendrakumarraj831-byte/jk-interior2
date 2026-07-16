import { useEffect, useState, useCallback, useRef, useMemo } from "react"
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Sparkles, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"

interface GalleryImage { src: string; alt: string; category?: string }

const ALL = galleryImages as GalleryImage[]

function groupByCategory(images: GalleryImage[]) {
  const order: string[] = []
  const map = new Map<string, GalleryImage[]>()
  for (const img of images) {
    const cat = img.category || "Other"
    if (!map.has(cat)) {
      map.set(cat, [])
      order.push(cat)
    }
    map.get(cat)!.push(img)
  }
  return order.map((cat) => ({ category: cat, images: map.get(cat)! }))
}

/* ─── Lightbox (direction-aware) ─── */
function Lightbox({ images, idx, onClose, onNext, onPrev }: {
  images: GalleryImage[]; idx: number
  onClose(): void; onNext(): void; onPrev(): void
}) {
  const tx = useRef<number | null>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState<1 | -1>(1)   // 1=right→left  -1=left→right
  const prevIdx = useRef(idx)

  useEffect(() => {
    if (idx !== prevIdx.current) {
      // detect wrap-around
      const n = images.length
      const forward =
        (idx === (prevIdx.current + 1) % n) ||
        (prevIdx.current === n - 1 && idx === 0)
      setDir(forward ? 1 : -1)
      prevIdx.current = idx
    }
  }, [idx, images.length])

  useEffect(() => { btn.current?.focus() }, [])
  useEffect(() => {
    const p = document.body.style.overflow; document.body.style.overflow = "hidden"
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") { setDir(1); onNext() }
      if (e.key === "ArrowLeft")  { setDir(-1); onPrev() }
    }
    window.addEventListener("keydown", h)
    return () => { document.body.style.overflow = p; window.removeEventListener("keydown", h) }
  }, [onClose, onNext, onPrev])

  const img = images[idx]; if (!img) return null

  return createPortal(
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col" role="dialog" aria-modal
      onTouchStart={e => { tx.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (!tx.current) return
        const d = e.changedTouches[0].clientX - tx.current
        if (Math.abs(d) > 50) { if (d < 0) { setDir(1); onNext() } else { setDir(-1); onPrev() } }
        tx.current = null
      }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black/80">
        {img.category && <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">{img.category}</span>}
        <span className="text-white/40 text-xs ml-auto mr-4">{idx+1} / {images.length}</span>
        <button ref={btn} onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"><X size={18}/></button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <button onClick={() => { setDir(-1); onPrev() }}
          className="absolute left-3 md:left-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronLeft size={28}/>
        </button>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx} src={img.src} alt={img.alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity:0, x: d * 80, scale:.97 }),
              center: { opacity:1, x:0, scale:1 },
              exit:  (d: number) => ({ opacity:0, x: d * -80, scale:.97 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration:.25, ease:"easeOut" }}
            className="max-w-full object-contain px-2 md:px-24"
            style={{ maxHeight:"calc(100vh - 180px)" }}
          />
        </AnimatePresence>

        <button onClick={() => { setDir(1); onNext() }}
          className="absolute right-3 md:right-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronRight size={28}/>
        </button>
      </div>

      {/* Bottom */}
      <div className="bg-black/90 px-5 pt-3 pb-5 flex flex-col items-center gap-3">
        <p className="text-white/60 text-sm text-center">{img.alt}</p>
        <div className="flex gap-2 md:hidden">
          <button onClick={() => { setDir(-1); onPrev() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10"><ChevronLeft size={14}/> Prev</button>
          <button onClick={() => { setDir(1); onNext() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10">Next <ChevronRight size={14}/></button>
        </div>
        <div className="flex gap-2">
          <a href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hello JK Interior! Is design ka quote chahiye: "${img.alt}"`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-full transition-all active:scale-95">
            <MessageCircle size={14}/> WhatsApp
          </a>
          <a href="tel:+918541849118"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all active:scale-95">
            <Phone size={14}/> Call
          </a>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

/* ─── Per-Service Category Card (own auto slider) ─── */
function CategoryCard({ category, images, onOpen }: {
  category: string; images: GalleryImage[]
  onOpen(images: GalleryImage[], idx: number): void
}) {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [playing, setPlaying] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = images.length
  const showDots = total > 1 && total <= 10

  const go = useCallback((n: 1 | -1) => {
    setDir(n)
    setCur(p => (p + n + total) % total)
  }, [total])

  useEffect(() => {
    if (!playing || total <= 1) return
    timer.current = setTimeout(() => go(1), 4000)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [cur, playing, go, total])

  const id = `gallery-${slugify(category)}`

  return (
    <motion.div
      id={id}
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }} transition={{ duration:.5 }}
      className="group relative scroll-mt-28 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_8px_40px_rgba(5,150,105,0.12)] sm:rounded-3xl"
    >
      {/* Slider area */}
      <div className="relative h-56 overflow-hidden sm:h-64 md:h-72">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={cur} src={images[cur].src} alt={images[cur].alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity:0, x: d * 60 }),
              center: { opacity:1, x:0 },
              exit:  (d: number) => ({ opacity:0, x: d * -60 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration:.5, ease:"easeInOut" }}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            onClick={() => onOpen(images, cur)}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

        {/* Photo count badge */}
        <div className="absolute left-3 top-3 z-20 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:rounded-xl sm:text-xs">
          {total} Photo{total !== 1 ? "s" : ""}
        </div>

        {total > 1 && (
          <>
            {/* Prev / Next */}
            <button onClick={e => { e.stopPropagation(); go(-1) }} aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100 md:p-2.5">
              <ChevronLeft size={18}/>
            </button>
            <button onClick={e => { e.stopPropagation(); go(1) }} aria-label="Next photo"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100 md:p-2.5">
              <ChevronRight size={18}/>
            </button>

            {/* Play/Pause */}
            <button onClick={e => { e.stopPropagation(); setPlaying(p => !p) }} aria-label={playing ? "Pause slider" : "Play slider"}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-black/35 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/60">
              {playing ? <Pause size={12}/> : <Play size={12}/>}
            </button>

            {/* Progress bar */}
            {playing && (
              <div className="absolute top-0 left-0 right-0 z-20 h-0.5 overflow-hidden bg-white/10">
                <motion.div key={`${cur}-prog`} className="h-full bg-emerald-400"
                  initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:4, ease:"linear" }}/>
              </div>
            )}
          </>
        )}

        {/* Category title */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <h3 className="text-lg font-black text-white drop-shadow sm:text-xl">{category}</h3>
        </div>

        {/* Dots or fraction counter */}
        {total > 1 && (
          showDots ? (
            <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setDir(i > cur ? 1 : -1); setCur(i) }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i===cur ? "w-6 bg-emerald-400" : "w-1.5 bg-white/40 hover:bg-white/70"}`}/>
              ))}
            </div>
          ) : (
            <div className="absolute bottom-3 right-3 z-20 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              {cur + 1} / {total}
            </div>
          )
        )}
      </div>

      {/* CTA */}
      <div className="flex gap-2 p-3 sm:p-4">
        <a
          href="tel:+918541849118"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_4px_16px_rgba(5,150,105,0.4)] active:scale-95 sm:text-sm touch-manipulation"
          aria-label={`Call for ${category} quote`}
        >
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          Get Quote
        </a>
        <a
          href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20am%20interested%20in%20${encodeURIComponent(category)}%20service%20in%20Forbesganj.%20Please%20share%20details.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2.5 text-xs font-bold text-[#128C7E] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/60 active:scale-95 sm:text-sm touch-manipulation"
          aria-label={`WhatsApp for ${category}`}
        >
          <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </motion.div>
  )
}

/* ─── Main Gallery ─── */
export default function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [lbImgs, setLbImgs] = useState<GalleryImage[]>([])
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  const categories = useMemo(() => groupByCategory(ALL), [])

  const open = useCallback((images: GalleryImage[], idx: number) => {
    setLbImgs(images); setLbIdx(idx)
  }, [])

  const close = useCallback(() => { setLbIdx(null); setLbImgs([]) }, [])
  const next = useCallback(() => setLbIdx(p => p !== null ? (p+1) % lbImgs.length : null), [lbImgs.length])
  const prev = useCallback(() => setLbIdx(p => p !== null ? (p-1+lbImgs.length) % lbImgs.length : null), [lbImgs.length])

  // Deep-link support: /gallery#gallery-<category-slug> scrolls to the matching service card
  useEffect(() => {
    if (!mounted) return
    const hash = window.location.hash
    if (!hash) return
    let attempts = 0
    let t: ReturnType<typeof setTimeout>
    const tryScroll = () => {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else if (attempts < 10) {
        attempts++
        t = setTimeout(tryScroll, 150)
      }
    }
    t = setTimeout(tryScroll, 100)
    return () => clearTimeout(t)
  }, [mounted])

  if (!mounted) return (
    <section className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-64 mx-auto rounded-full bg-emerald-50 animate-pulse mb-10"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({length:4}).map((_,i)=><div key={i} className="h-64 rounded-3xl bg-emerald-50 animate-pulse"/>)}
        </div>
      </div>
    </section>
  )

  return (
    <section id="gallery" className="relative overflow-hidden">
      {/* Same light background as rest of site */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-16">

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
          className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-500"/>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Our Work Gallery</span>
          </div>
          <h2 className="text-gray-900 text-3xl md:text-5xl font-black mb-3">
            हमारे काम, <span className="hero-gradient-text">आपका विश्वास</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            {ALL.length}+ premium interior projects — Forbesganj, Araria, Bihar
          </p>
        </motion.div>

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-emerald-500 rounded-full"/>
          <h3 className="text-gray-800 font-bold text-lg">Service के हिसाब से Projects</h3>
          <div className="flex-1 h-px bg-emerald-200"/>
          <span className="text-gray-400 text-xs">{categories.length} services</span>
        </div>

        {/* ── Category Slider Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categories.map(({ category, images }) => (
            <CategoryCard key={category} category={category} images={images} onOpen={open}/>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
          className="glass-card-bright rounded-3xl px-6 py-12 md:px-14 text-center mt-14">
          <h3 className="text-gray-900 text-2xl md:text-4xl font-black mb-3">
            आपका घर, <span className="hero-gradient-text">हमारी पहचान</span>
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto text-sm mb-8">
            Budget आपका, ज़िम्मेदारी हमारी! Premium interior और false ceiling — किफायती रेट पर।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+918541849118" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-[0_4px_20px_rgba(5,150,105,0.35)] transition-all active:scale-95">
              <Phone size={16}/> अभी कॉल करें
            </a>
            <a href="https://wa.me/918651070831" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95">
              <MessageCircle size={16}/> WhatsApp करें
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lbIdx !== null && lbImgs.length > 0 && (
          <Lightbox images={lbImgs} idx={lbIdx} onClose={close} onNext={next} onPrev={prev}/>
        )}
      </AnimatePresence>
    </section>
  )
}
