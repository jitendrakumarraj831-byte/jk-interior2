import { useEffect, useState, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

const ALL_IMAGES = galleryImages as GalleryImage[]
const CATEGORIES = ["सभी", ...Array.from(new Set(ALL_IMAGES.map((i) => i.category || "Other")))]

/* ── Fullscreen Carousel Lightbox ── */
function Lightbox({ images, activeIndex, onClose, onNext, onPrev }: {
  images: GalleryImage[]; activeIndex: number
  onClose: () => void; onNext: () => void; onPrev: () => void
}) {
  const touchStartX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { closeRef.current?.focus() }, [])
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", h)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h) }
  }, [onClose, onNext, onPrev])

  const img = images[activeIndex]
  if (!img) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col"
      role="dialog" aria-modal="true" aria-label={img.alt}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (!touchStartX.current) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev()
        touchStartX.current = null
      }}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-5 py-4 bg-black/80 z-10">
        <div className="flex items-center gap-3">
          {img.category && <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">{img.category}</span>}
          <span className="text-white/40 text-xs">{activeIndex + 1} / {images.length}</span>
        </div>
        <button ref={closeRef} onClick={onClose} aria-label="Close"
          className="p-2.5 rounded-full bg-white/8 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/10">
          <X size={18} />
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <button onClick={onPrev} aria-label="Previous"
          className="absolute left-2 md:left-5 z-10 p-3 rounded-full bg-white/8 hover:bg-white/18 text-white/70 hover:text-white border border-white/10 transition-all hidden md:flex">
          <ChevronLeft size={28} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={img.src} alt={img.alt}
            initial={{ opacity: 0, x: 50, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-h-full max-w-full object-contain px-2 md:px-20"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          />
        </AnimatePresence>

        <button onClick={onNext} aria-label="Next"
          className="absolute right-2 md:right-5 z-10 p-3 rounded-full bg-white/8 hover:bg-white/18 text-white/70 hover:text-white border border-white/10 transition-all hidden md:flex">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom */}
      <div className="bg-black/90 px-5 pt-4 pb-6 flex flex-col items-center gap-3">
        <p className="text-white/70 text-sm text-center font-medium">{img.alt}</p>
        {/* Mobile dots */}
        <div className="flex gap-1 md:hidden">
          {images.slice(Math.max(0, activeIndex - 3), activeIndex + 4).map((_, i) => {
            const ri = Math.max(0, activeIndex - 3) + i
            return <span key={ri} className={`rounded-full h-1.5 transition-all ${ri === activeIndex ? "bg-emerald-400 w-5" : "bg-white/20 w-1.5"}`} />
          })}
        </div>
        {/* Mobile nav */}
        <div className="flex gap-2 md:hidden">
          <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/70 text-sm border border-white/10">
            <ChevronLeft size={15}/> Prev
          </button>
          <button onClick={onNext} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/70 text-sm border border-white/10">
            Next <ChevronRight size={15}/>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          <a href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hello JK Interior! Is design ka quote chahiye: "${img.alt}"`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-full transition-all active:scale-95">
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href="tel:+918651070831"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all active:scale-95">
            <Phone size={14} /> Call
          </a>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

/* ── Mixed-size grid card ── */
function PhotoCard({ img, index, onOpen, size = "normal" }: {
  img: GalleryImage; index: number; onOpen: (img: GalleryImage) => void; size?: "hero" | "tall" | "normal"
}) {
  const aspectClass = size === "hero" ? "aspect-[16/9]" : size === "tall" ? "aspect-[3/4]" : "aspect-square"
  const spanClass   = size === "hero" ? "col-span-2 row-span-2" : size === "tall" ? "row-span-2" : ""

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      onClick={() => onOpen(img)}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(img)}
      aria-label={img.alt}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${aspectClass} ${spanClass} bg-gray-900`}
    >
      <img
        src={img.src} alt={img.alt} loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient overlay always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-medium truncate drop-shadow leading-snug">{img.alt}</p>
      </div>
      {/* Zoom icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Gallery ── */
export default function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("सभी")
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const filtered = activeCategory === "सभी" ? ALL_IMAGES : ALL_IMAGES.filter((i) => i.category === activeCategory)

  const openLightbox = useCallback((img: GalleryImage) => {
    const list = filtered
    const idx = list.findIndex((i) => i.src === img.src)
    setLightboxImages(list)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [filtered])

  const closeLightbox = useCallback(() => { setActiveIndex(null); setLightboxImages([]) }, [])
  const next = useCallback(() => setActiveIndex((p) => p !== null ? (p + 1) % lightboxImages.length : null), [lightboxImages.length])
  const prev = useCallback(() => setActiveIndex((p) => p !== null ? (p - 1 + lightboxImages.length) % lightboxImages.length : null), [lightboxImages.length])

  if (!mounted) return (
    <section className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-5 pt-28 pb-12">
        <div className="h-9 bg-white/5 rounded-xl w-56 mx-auto mb-10 animate-pulse" />
        <div className="flex gap-2 mb-8 overflow-hidden">
          {[1,2,3,4,5,6].map(i=><div key={i} className="h-9 w-28 shrink-0 bg-white/5 rounded-full animate-pulse"/>)}
        </div>
        <div className="grid grid-cols-3 gap-2 auto-rows-[130px]">
          {Array.from({length:9}).map((_,i)=><div key={i} className={`bg-white/5 rounded-2xl animate-pulse ${i===0?"col-span-2 row-span-2":""}`}/>)}
        </div>
      </div>
    </section>
  )

  return (
    <section id="gallery" className="relative bg-gray-950 min-h-screen">

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #059669 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0d9488 0%, transparent 50%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Our Work Gallery</span>
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-black mb-3 leading-tight">
            हमारे काम, <span className="text-emerald-400">आपका विश्वास</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
            {ALL_IMAGES.length}+ premium interior projects — Forbesganj, Araria, Bihar
          </p>
        </motion.div>

        {/* Filter Tabs — horizontal scroll */}
        <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const count = cat === "सभी" ? ALL_IMAGES.length : ALL_IMAGES.filter(i => i.category === cat).length
            const active = activeCategory === cat
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`snap-start shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                  active
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-emerald-500/50 hover:text-white hover:bg-white/10"
                }`}>
                {cat}
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${active ? "bg-white/20 text-white" : "bg-white/8 text-white/40"}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Mixed-size Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[120px] md:auto-rows-[140px]"
          >
            {filtered.map((img, i) => {
              const size = i === 0 ? "hero" : (i % 7 === 3 || i % 7 === 6) ? "tall" : "normal"
              return <PhotoCard key={img.src} img={img} index={i} onOpen={openLightbox} size={size} />
            })}
          </motion.div>
        </AnimatePresence>

        {/* Count bar */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex-1 h-px bg-white/8" />
          <p className="text-white/30 text-xs font-medium whitespace-nowrap">{filtered.length} photos</p>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm px-6 py-12 md:px-14 text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Free Site Visit</span>
          </div>
          <h3 className="text-white text-2xl md:text-4xl font-black mb-3">
            आपका घर, <span className="text-emerald-400">हमारी पहचान</span>
          </h3>
          <p className="text-white/40 max-w-lg mx-auto text-sm mb-8">
            Budget आपका, ज़िम्मेदारी हमारी! Premium interior और false ceiling — किफायती रेट पर।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+918651070831"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-xl shadow-[0_4px_24px_rgba(16,185,129,0.35)] transition-all active:scale-95">
              <Phone size={16} /> अभी कॉल करें
            </a>
            <a href="https://wa.me/918651070831" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95">
              <MessageCircle size={16} /> WhatsApp करें
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && lightboxImages.length > 0 && (
          <Lightbox images={lightboxImages} activeIndex={activeIndex} onClose={closeLightbox} onNext={next} onPrev={prev} />
        )}
      </AnimatePresence>
    </section>
  )
}
