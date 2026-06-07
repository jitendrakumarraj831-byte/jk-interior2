import { useEffect, useState, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Sparkles, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

const CATEGORIES = ["All", ...Array.from(new Set(galleryImages.map((i) => i.category || "Other")))]

function Lightbox({
  images, activeIndex, onClose, onNext, onPrev,
}: {
  images: GalleryImage[]
  activeIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const touchStartX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { closeRef.current?.focus() }, [])
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", h)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h) }
  }, [onClose, onNext, onPrev])

  const img = images[activeIndex]
  if (!img) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/96 backdrop-blur-xl flex items-center justify-center"
      role="dialog" aria-modal="true"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev()
        touchStartX.current = null
      }}
    >
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 px-5 py-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/70 to-transparent" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/50 text-xs font-mono">{activeIndex + 1} / {images.length}</span>
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Prev */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full hidden md:flex transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous"
      ><ChevronLeft size={36} /></button>

      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-5xl h-[76vh] mx-14"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.src} alt={img.alt} className="object-contain w-full h-full drop-shadow-2xl" />
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full hidden md:flex transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next"
      ><ChevronRight size={36} /></button>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 pb-5 pt-10 flex flex-col items-center gap-3 bg-gradient-to-t from-black/80 to-transparent" onClick={(e) => e.stopPropagation()}>
        <p className="text-white/80 text-sm font-medium text-center px-4">{img.alt}</p>
        {/* Mobile swipe dots */}
        <div className="flex gap-1 md:hidden">
          {images.slice(Math.max(0, activeIndex - 4), activeIndex + 5).map((_, i) => {
            const realIdx = Math.max(0, activeIndex - 4) + i
            return <span key={realIdx} className={`rounded-full h-1.5 transition-all ${realIdx === activeIndex ? "bg-emerald-400 w-5" : "bg-white/25 w-1.5"}`} />
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          <a
            href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hello JK Interior! Mujhe is design ka quote chahiye: "${img.alt}"`)}`}
            target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-full shadow-lg transition-all active:scale-95"
          ><MessageCircle size={15} /> इस Design पर WhatsApp</a>
          <a href="tel:+918651070831" onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full shadow-lg transition-all active:scale-95"
          ><Phone size={15} /> Call करें</a>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

export default function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  const filtered = activeCategory === "All"
    ? (galleryImages as GalleryImage[])
    : (galleryImages as GalleryImage[]).filter((i) => i.category === activeCategory)

  const openLightbox = useCallback((img: GalleryImage, list: GalleryImage[]) => {
    const idx = list.findIndex((i) => i.src === img.src)
    setLightboxImages(list)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [])

  const closeLightbox = useCallback(() => { setActiveIndex(null); setLightboxImages([]) }, [])
  const next = useCallback(() => setActiveIndex((p) => p !== null ? (p + 1) % lightboxImages.length : null), [lightboxImages.length])
  const prev = useCallback(() => setActiveIndex((p) => p !== null ? (p - 1 + lightboxImages.length) % lightboxImages.length : null), [lightboxImages.length])

  if (!mounted) return (
    <section className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-white">
      <div className="max-w-7xl mx-auto px-5 pt-24 pb-12">
        <div className="h-10 bg-emerald-50 rounded-xl w-64 mx-auto mb-8 animate-pulse" />
        <div className="flex gap-2 justify-center mb-8">{[1,2,3,4].map(i=><div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse"/>)}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({length:12}).map((_,i)=><div key={i} className="aspect-square bg-gray-50 rounded-xl animate-pulse"/>)}
        </div>
      </div>
    </section>
  )

  return (
    <section id="gallery" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Our Work Gallery</span>
          </div>
          <h2 className="text-gray-900 text-2xl md:text-4xl font-black mb-3 leading-tight">
            हमारे काम, <span className="hero-gradient-text">आपका विश्वास</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            JK Interior के premium interior और false ceiling projects — Forbesganj, Araria, Bihar
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              {cat}{activeCategory === cat ? ` (${filtered.length})` : ""}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.2) }}
                onClick={() => openLightbox(img, filtered)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(img, filtered)}
                aria-label={`View: ${img.alt}`}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={img.src} alt={img.alt}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div className="flex items-end justify-between w-full gap-1">
                    <span className="text-white text-[11px] font-medium truncate drop-shadow">{img.alt}</span>
                    <ZoomIn size={14} className="text-emerald-300 shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-gray-400 text-xs mt-5 font-medium">
          {filtered.length} photos · {activeCategory}
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="rounded-3xl border border-emerald-100 bg-white px-6 py-10 md:px-14 text-center mt-14 shadow-sm"
        >
          <h3 className="text-gray-900 text-2xl md:text-3xl font-black mb-3">
            आपका घर, <span className="hero-gradient-text">हमारी पहचान</span>
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm mb-6">
            Budget आपका, ज़िम्मेदारी हमारी! Premium interior और false ceiling सबसे कम समय और किफायती रेट पर।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+918651070831" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95">
              <Phone size={16} /> अभी कॉल करें
            </a>
            <a href="/contact" className="flex items-center justify-center gap-2 px-7 py-3.5 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold rounded-xl transition-all active:scale-95">
              Free Quote लें
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Carousel */}
      <AnimatePresence>
        {activeIndex !== null && lightboxImages.length > 0 && (
          <Lightbox images={lightboxImages} activeIndex={activeIndex} onClose={closeLightbox} onNext={next} onPrev={prev} />
        )}
      </AnimatePresence>
    </section>
  )
}
