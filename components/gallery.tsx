"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ChevronUp, Sparkles, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

// ─── Utility: group images by category ───────────────────────────────────────
function groupByCategory(images: GalleryImage[]) {
  const map = new Map<string, GalleryImage[]>()
  images.forEach((img) => {
    const key = img.category || "Our Work"
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(img)
  })
  return Array.from(map.entries()) // [[ categoryName, images[] ], ...]
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[]
  activeIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { closeButtonRef.current?.focus() }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handler)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", handler)
    }
  }, [onClose, onNext, onPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 50 && dy < 80) { dx < 0 ? onNext() : onPrev() }
    touchStartX.current = null
    touchStartY.current = null
  }

  const image = images[activeIndex]

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[9999] bg-black/96 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 inset-x-0 px-5 py-4 flex items-center justify-between text-white/90 z-10 bg-gradient-to-b from-black/70 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm font-medium truncate max-w-[65%]">{image.alt}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/40">{activeIndex + 1} / {images.length}</span>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full hidden md:flex" onClick={(e) => { e.stopPropagation(); onPrev() }}>
          <ChevronLeft size={44} />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full hidden md:flex" onClick={(e) => { e.stopPropagation(); onNext() }}>
          <ChevronRight size={44} />
        </button>

        {/* Image */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-5xl h-[78vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={image.src} alt={image.alt} fill className="object-contain" priority sizes="100vw" />
        </motion.div>

        {/* Bottom */}
        <div
          className="absolute bottom-0 inset-x-0 pb-6 pt-10 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-1.5 md:hidden">
            {images.map((_, i) => (
              <span key={i} className={`rounded-full transition-all duration-300 h-1.5 ${i === activeIndex ? "bg-amber-400 w-4" : "bg-white/25 w-1.5"}`} />
            ))}
          </div>
          <button onClick={onClose} className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-full transition-all active:scale-95">
            <X size={15} /> Gallery Bandh Karein
          </button>
          <p className="text-white/25 text-xs md:hidden select-none">← Swipe to navigate →</p>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

// ─── Section layouts — 4 alternating styles ───────────────────────────────────

// Style 1 — Standard 2-col / 4-col grid
function GridSection({ images, sectionIndex, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {images.map((img, i) => (
        <CardThumb key={img.src} img={img} index={i} sectionIndex={sectionIndex} onOpen={onOpen} />
      ))}
    </div>
  )
}

// Style 2 — Featured first image (large) + remaining in small grid
function FeaturedSection({ images, sectionIndex, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  const [featured, ...rest] = images
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {/* Featured — takes 2 cols on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        onClick={() => onOpen(featured)}
        className="col-span-2 md:col-span-2 group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500"
      >
        <Image src={featured.src} alt={featured.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" sizes="(max-width: 768px) 100vw, 66vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-semibold text-sm drop-shadow">{featured.alt}</span>
        </div>
        <div className="absolute top-3 left-3 bg-amber-500 text-zinc-900 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">Featured</div>
      </motion.div>

      {/* Rest */}
      {rest.map((img, i) => (
        <CardThumb key={img.src} img={img} index={i + 1} sectionIndex={sectionIndex} onOpen={onOpen} />
      ))}
    </div>
  )
}

// Style 3 — Horizontal scroll strip (mobile friendly)
function StripSection({ images, sectionIndex, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-4 md:overflow-visible">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25) }}
          onClick={() => onOpen(img)}
          className="group relative flex-shrink-0 w-[68vw] md:w-auto snap-start aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-400"
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 768px) 68vw, 25vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="flex items-end justify-between w-full">
              <span className="text-white text-xs font-medium truncate drop-shadow pr-1">{img.alt}</span>
              <ZoomIn size={16} className="text-white/80 shrink-0" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Style 4 — Masonry-style 3 columns (CSS column trick)
function MasonrySection({ images, onOpen }: { images: GalleryImage[]; onOpen: (img: GalleryImage) => void }) {
  const cols: GalleryImage[][] = [[], [], []]
  images.forEach((img, i) => cols[i % 3].push(img))
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 items-start">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-3 md:gap-4">
          {col.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.3) }}
              onClick={() => onOpen(img)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 ${(ci + i) % 3 === 0 ? "aspect-[3/4]" : (ci + i) % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={22} className="text-white drop-shadow" />
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Shared thumbnail card ────────────────────────────────────────────────────
function CardThumb({ img, index, sectionIndex, onOpen }: { img: GalleryImage; index: number; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      onClick={() => onOpen(img)}
      className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <span className="text-white text-[11px] font-medium truncate drop-shadow">{img.alt}</span>
      </div>
    </motion.div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ title, count, index }: { title: string; count: number; index: number }) {
  const accents = ["bg-amber-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-violet-500"]
  const accent = accents[index % accents.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 mb-6"
    >
      <div className={`w-1 h-10 rounded-full ${accent}`} />
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 leading-tight">{title}</h3>
        <p className="text-xs text-zinc-400 mt-0.5">{count} photos</p>
      </div>
      <div className="flex-1 h-px bg-zinc-100 ml-2" />
    </motion.div>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery({ layout }: { layout?: string }) {
  const [mounted, setMounted] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const sections = groupByCategory(galleryImages as GalleryImage[])

  const openLightbox = useCallback((sectionImages: GalleryImage[], img: GalleryImage) => {
    const idx = sectionImages.findIndex((i) => i.src === img.src)
    setLightboxImages(sectionImages)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [])

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
    setLightboxImages([])
  }, [])

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % lightboxImages.length : null))
  }, [lightboxImages.length])

  const prev = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null
    )
  }, [lightboxImages.length])

  if (!mounted) return null

  // Assign a layout style to each section in rotation
  const LAYOUTS = ["featured", "grid", "strip", "masonry"] as const
  type LayoutType = typeof LAYOUTS[number]

  const renderSection = (images: GalleryImage[], layout: LayoutType, sectionIndex: number) => {
    const open = (img: GalleryImage) => openLightbox(images, img)
    switch (layout) {
      case "featured": return <FeaturedSection images={images} sectionIndex={sectionIndex} onOpen={open} />
      case "strip":    return <StripSection images={images} sectionIndex={sectionIndex} onOpen={open} />
      case "masonry":  return <MasonrySection images={images} onOpen={open} />
      default:         return <GridSection images={images} sectionIndex={sectionIndex} onOpen={open} />
    }
  }

  return (
    <section id="gallery" className="bg-white">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div ref={topRef} className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 pt-20 pb-16 px-4">
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            <Sparkles size={13} />
            हमारे बेहतरीन काम
            <Sparkles size={13} />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Our{" "}
            <span className="relative inline-block">
              <span className="text-amber-400">Masterpieces</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
            </span>
          </h2>
          <p className="text-amber-300/70 text-sm font-medium tracking-wider mb-4">हमारी शिल्पकारी का जीवंत प्रमाण</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base leading-relaxed">
            Bihar ke premium interior design projects — false ceiling se lekar modular kitchen tak, har project mein hamare craftsmen ka dil laga hai.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[{ n: "500+", l: "Projects Done" }, { n: "5+", l: "Years Experience" }, { n: "100%", l: "Client Satisfied" }].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-amber-400">{s.n}</p>
                <p className="text-zinc-500 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sections ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 space-y-20">

        {sections.map(([category, images], sectionIndex) => {
          const layout: LayoutType = LAYOUTS[sectionIndex % LAYOUTS.length]

          // Alternate background tint every other section for visual rhythm
          const isTinted = sectionIndex % 2 === 1

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl px-4 py-8 md:px-8 md:py-10 ${isTinted ? "bg-zinc-50" : "bg-white"}`}
            >
              <SectionHeader title={category} count={images.length} index={sectionIndex} />
              {renderSection(images, layout, sectionIndex)}
            </motion.div>
          )
        })}

        {/* ── Back to top ──────────────────────────────────────────────── */}
        <div className="text-center pt-4">
          <button
            onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-zinc-200 text-zinc-500 text-sm font-semibold rounded-full hover:border-zinc-400 hover:text-zinc-700 transition-all duration-200 active:scale-95"
          >
            <ChevronUp size={16} />
            Wapas Upar Jaayein
          </button>
        </div>

        {/* ── Closing CTA ───────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 px-6 py-12 md:px-14 md:py-16 text-center">
          <div className="pointer-events-none absolute top-0 left-1/4 w-48 h-48 bg-amber-500/15 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">JK Interior — Bihar</p>
            <h3 className="text-white text-2xl md:text-4xl font-extrabold mb-4 leading-snug">
              Aapka Ghar,{" "}
              <span className="text-amber-400">Hamaari Pehchaan</span>
            </h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
              Har photo ek sapne ki kahani hai jo humne saath milkar poora kiya. Apna naya project shuru karne ke liye aaj hi contact karein — free consultation available hai.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+91XXXXXXXXXX" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-900 text-sm font-bold rounded-full transition-all shadow-lg shadow-amber-500/25 active:scale-95">
                <Phone size={16} /> Abhi Call Karein
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/15 hover:border-white/30 text-white text-sm font-semibold rounded-full transition-all active:scale-95">
                Free Quote Lein
              </a>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-zinc-600 text-xs tracking-widest uppercase">
                Trusted by 500+ families across Araria · Forbesganj · Jogbani · Purnea
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {activeIndex !== null && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={next}
          onPrev={prev}
        />
      )}
    </section>
  )
}
