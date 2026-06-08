import { useEffect, useState, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Sparkles, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"

interface GalleryImage { src: string; alt: string; category?: string }

const ALL = galleryImages as GalleryImage[]
const CATS = ["सभी", ...Array.from(new Set(ALL.map(i => i.category || "Other")))]

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
          <a href="tel:+918651070831"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all active:scale-95">
            <Phone size={14}/> Call
          </a>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

/* ─── Hero Auto Slider (direction-aware) ─── */
function HeroSlider({ images, onOpen }: { images: GalleryImage[]; onOpen(i: GalleryImage): void }) {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [playing, setPlaying] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = Math.min(8, images.length)
  const slides = images.slice(0, total)

  const go = useCallback((n: 1 | -1) => {
    setDir(n)
    setCur(p => (p + n + total) % total)
  }, [total])

  useEffect(() => {
    if (!playing) return
    timer.current = setTimeout(() => go(1), 3500)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [cur, playing, go])

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl mb-3 group"
      style={{ height: "min(55vw, 500px)", minHeight: 220 }}>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={cur} custom={dir}
          variants={{
            enter: (d: number) => ({ opacity:0, x: d * 60 }),
            center: { opacity:1, x:0 },
            exit:  (d: number) => ({ opacity:0, x: d * -60 }),
          }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration:.55, ease:"easeInOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onOpen(slides[cur])}>
          <img src={slides[cur].src} alt={slides[cur].alt} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"/>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button onClick={e => { e.stopPropagation(); go(-1) }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-black/35 hover:bg-black/60 text-white border border-white/15 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft size={20}/>
      </button>
      <button onClick={e => { e.stopPropagation(); go(1) }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-black/35 hover:bg-black/60 text-white border border-white/15 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight size={20}/>
      </button>

      {/* Play/Pause */}
      <button onClick={e => { e.stopPropagation(); setPlaying(p => !p) }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/35 hover:bg-black/60 text-white border border-white/15 backdrop-blur-sm transition-all">
        {playing ? <Pause size={13}/> : <Play size={13}/>}
      </button>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-5 pt-12 bg-gradient-to-t from-black/65 to-transparent pointer-events-none">
        <p className="text-white font-semibold text-sm md:text-base drop-shadow">{slides[cur].alt}</p>
        {slides[cur].category && (
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-400/20 px-2.5 py-0.5 rounded-full">
            {slides[cur].category}
          </span>
        )}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-5 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setDir(i > cur ? 1 : -1); setCur(i) }}
            className={`rounded-full transition-all duration-300 h-1.5 ${i===cur ? "bg-emerald-400 w-6" : "bg-white/30 w-1.5 hover:bg-white/60"}`}/>
        ))}
      </div>

      {/* Progress bar */}
      {playing && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-white/10 overflow-hidden">
          <motion.div key={`${cur}-prog`}
            className="h-full bg-emerald-400"
            initial={{ width:"0%" }} animate={{ width:"100%" }}
            transition={{ duration:3.5, ease:"linear" }}/>
        </div>
      )}
    </div>
  )
}

/* ─── Thumbnail strip ─── */
function ThumbStrip({ images, active, onSet }: { images: GalleryImage[]; active: number; onSet(i:number): void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-8">
      {images.slice(0, Math.min(8, images.length)).map((img, i) => (
        <button key={img.src} onClick={() => onSet(i)}
          className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
            i===active ? "border-emerald-500 scale-105 shadow-md" : "border-gray-200 hover:border-emerald-400"
          }`}>
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover"/>
        </button>
      ))}
    </div>
  )
}

/* ─── Masonry card ─── */
function Card({ img, i, onOpen }: { img: GalleryImage; i: number; onOpen(img: GalleryImage): void }) {
  const pat = i % 10
  const cls = pat===0 ? "col-span-2 row-span-2" : pat===4 ? "row-span-2" : pat===7 ? "col-span-2" : ""
  const asp = pat===0 ? "aspect-[4/3]" : pat===4 ? "aspect-[2/3]" : pat===7 ? "aspect-[2/1]" : "aspect-square"

  return (
    <motion.div
      initial={{ opacity:0, scale:.95 }} whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true, margin:"-20px" }} transition={{ duration:.35, delay: Math.min(i*.03,.25) }}
      onClick={() => onOpen(img)} role="button" tabIndex={0} onKeyDown={e => e.key==="Enter" && onOpen(img)}
      aria-label={img.alt}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-100 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg ${cls} ${asp}`}>
      <img src={img.src} alt={img.alt} loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"/>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-[11px] font-medium truncate drop-shadow">{img.alt}</p>
      </div>
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/25 backdrop-blur-sm rounded-full p-1.5 border border-white/30">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Gallery ─── */
export default function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [cat, setCat] = useState("सभी")
  const [lbImgs, setLbImgs] = useState<GalleryImage[]>([])
  const [lbIdx, setLbIdx] = useState<number | null>(null)
  const [sliderCur, setSliderCur] = useState(0)

  useEffect(() => setMounted(true), [])

  const filtered = cat === "सभी" ? ALL : ALL.filter(i => i.category === cat)

  const open = useCallback((img: GalleryImage) => {
    const i = filtered.findIndex(x => x.src === img.src)
    setLbImgs(filtered); setLbIdx(i >= 0 ? i : 0)
  }, [filtered])

  const close = useCallback(() => { setLbIdx(null); setLbImgs([]) }, [])
  const next = useCallback(() => setLbIdx(p => p !== null ? (p+1) % lbImgs.length : null), [lbImgs.length])
  const prev = useCallback(() => setLbIdx(p => p !== null ? (p-1+lbImgs.length) % lbImgs.length : null), [lbImgs.length])

  useEffect(() => { setSliderCur(0) }, [cat])

  if (!mounted) return (
    <section className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-[45vw] max-h-[440px] rounded-3xl bg-emerald-50 animate-pulse mb-3"/>
        <div className="flex gap-2 mb-8">{[1,2,3].map(i=><div key={i} className="h-14 w-14 rounded-xl bg-emerald-50 animate-pulse"/>)}</div>
        <div className="grid grid-cols-3 gap-2 auto-rows-[110px]">{Array.from({length:9}).map((_,i)=><div key={i} className={`bg-emerald-50 rounded-2xl animate-pulse ${i===0?"col-span-2 row-span-2":""}`}/>)}</div>
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

        {/* ── Filter Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none snap-x">
          {CATS.map(c => {
            const cnt = c === "सभी" ? ALL.length : ALL.filter(i => i.category === c).length
            const on = cat === c
            return (
              <button key={c} onClick={() => setCat(c)}
                className={`snap-start shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                  on ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                     : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700"}`}>
                {c}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${on ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>{cnt}</span>
              </button>
            )
          })}
        </div>

        {/* ── Hero Slider ── */}
        <AnimatePresence mode="wait">
          <motion.div key={cat}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.35 }}>
            <HeroSlider images={filtered} onOpen={open}/>
            <ThumbStrip images={filtered} active={sliderCur} onSet={setSliderCur}/>
          </motion.div>
        </AnimatePresence>

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-1 h-8 bg-emerald-500 rounded-full"/>
          <h3 className="text-gray-800 font-bold text-lg">सभी Projects</h3>
          <div className="flex-1 h-px bg-emerald-200"/>
          <span className="text-gray-400 text-xs">{filtered.length} photos</span>
        </div>

        {/* ── Masonry Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div key={`grid-${cat}`}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.3 }}
            className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[130px]">
            {filtered.map((img, i) => <Card key={img.src} img={img} i={i} onOpen={open}/>)}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 h-px bg-emerald-100"/>
          <p className="text-gray-400 text-xs whitespace-nowrap">{filtered.length} photos · {cat}</p>
          <div className="flex-1 h-px bg-emerald-100"/>
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
            <a href="tel:+918651070831" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-[0_4px_20px_rgba(5,150,105,0.35)] transition-all active:scale-95">
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
