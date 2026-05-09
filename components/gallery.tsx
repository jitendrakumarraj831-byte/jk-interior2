"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

interface GalleryImage {
  src: string
  alt: string
  category?: string
}

function groupByCategory(images: GalleryImage[]) {
  const map = new Map<string, GalleryImage[]>()
  images.forEach((img) => {
    const key = img.category || "Our Work"
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(img)
  })
  return Array.from(map.entries())
}

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
  if (!image) return null

  return createPortal(
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] bg-[#040d20]/97 backdrop-blur-xl flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Image: ${image.alt}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute top-0 inset-x-0 px-5 py-4 flex items-center justify-between text-white/90 z-10 bg-gradient-to-b from-black/60 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-blue-400/60">{activeIndex + 1} / {images.length}</span>
        </div>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 transition-colors touch-manipulation"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full hidden md:flex transition-colors touch-manipulation"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        <ChevronLeft size={40} aria-hidden="true" />
      </button>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full hidden md:flex transition-colors touch-manipulation"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        <ChevronRight size={40} aria-hidden="true" />
      </button>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl h-[75vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={image.src} alt={image.alt} fill className="object-contain" priority sizes="100vw" />
      </motion.div>

      <div
        className="absolute bottom-0 inset-x-0 pb-6 pt-10 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-1 md:hidden">
          {images.map((_, i) => (
            <span key={i} className={`rounded-full transition-all duration-300 h-1.5 ${i === activeIndex ? "bg-blue-400 w-5" : "bg-white/20 w-1.5"}`} aria-hidden="true" />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hello JK Interior! Mujhe is design ke baare me jaankari chahiye: "${image.alt}". Quote bhej dijiye.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="WhatsApp about this design"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold rounded-full transition-all shadow-lg active:scale-95 touch-manipulation"
          >
            <MessageCircle size={15} aria-hidden="true" /> इस Design पर WhatsApp
          </a>
          <a
            href="tel:+918651070831"
            onClick={(e) => e.stopPropagation()}
            aria-label="Call JK Interior"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all shadow-lg active:scale-95 touch-manipulation"
          >
            <Phone size={15} aria-hidden="true" /> Call करें
          </a>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/8 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold rounded-full transition-all active:scale-95 touch-manipulation"
          >
            <X size={15} aria-hidden="true" /> Close
          </button>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

function CardThumb({ img, index, onOpen }: { img: GalleryImage; index: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      onClick={() => onOpen(img)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(img)}
      aria-label={`View: ${img.alt}`}
      className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer border border-gray-200 hover:border-emerald-300 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(5,150,105,0.12)]"
    >
      <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div className="flex items-end justify-between w-full gap-1">
          <span className="text-white text-[11px] font-medium truncate drop-shadow pr-1">{img.alt}</span>
          <ZoomIn size={14} className="text-emerald-300 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedSection({ images, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  const [featured, ...rest] = images
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        onClick={() => onOpen(featured)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(featured)}
        aria-label={`View featured: ${featured.alt}`}
        className="col-span-2 group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer border border-gray-200 hover:border-emerald-300 transition-all duration-500"
      >
        <Image src={featured.src} alt={featured.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" sizes="(max-width: 768px) 100vw, 66vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-semibold text-sm drop-shadow">{featured.alt}</span>
        </div>
        <div className="absolute top-3 left-3 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 tracking-wider uppercase backdrop-blur-sm">
          <Sparkles className="inline h-3 w-3 mr-1" aria-hidden="true" />Featured
        </div>
      </motion.div>
      {rest.map((img, i) => (
        <CardThumb key={img.src} img={img} index={i + 1} onOpen={onOpen} />
      ))}
    </div>
  )
}

function GridSection({ images, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {images.map((img, i) => (
        <CardThumb key={img.src} img={img} index={i} onOpen={onOpen} />
      ))}
    </div>
  )
}

function StripSection({ images, onOpen }: { images: GalleryImage[]; sectionIndex: number; onOpen: (img: GalleryImage) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-luxury md:grid md:grid-cols-4 md:overflow-visible">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25) }}
          onClick={() => onOpen(img)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpen(img)}
          aria-label={`View: ${img.alt}`}
          className="group relative flex-shrink-0 w-[68vw] md:w-auto snap-start aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer border border-gray-200 hover:border-emerald-300 transition-all duration-400"
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 768px) 68vw, 25vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="flex items-end justify-between w-full">
              <span className="text-white text-xs font-medium truncate drop-shadow pr-1">{img.alt}</span>
              <ZoomIn size={14} className="text-emerald-300 shrink-0" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function MasonrySection({ images, onOpen }: { images: GalleryImage[]; onOpen: (img: GalleryImage) => void }) {
  return (
    <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
          onClick={() => onOpen(img)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpen(img)}
          aria-label={`View: ${img.alt}`}
          className={`group relative block w-full overflow-hidden rounded-xl cursor-pointer border border-gray-200 hover:border-emerald-300 mb-3 md:mb-4 break-inside-avoid transition-all duration-500 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" sizes="(max-width: 768px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ZoomIn size={22} className="text-emerald-300 drop-shadow" aria-hidden="true" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SectionHeader({ title, index }: { title: string; index: number }) {
  const accentColors = ["bg-emerald-500", "bg-amber-500", "bg-violet-500", "bg-cyan-500", "bg-blue-500"]
  const accent = accentColors[index % accentColors.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 mb-6"
    >
      <div className={`w-1 h-10 rounded-full ${accent}`} aria-hidden="true" />
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{title}</h3>
      <div className="flex-1 h-px bg-emerald-200 ml-2" aria-hidden="true" />
    </motion.div>
  )
}

/* Skeleton shown on server / before mount — avoids CLS */
function GallerySkeleton() {
  return (
    <section id="gallery" className="relative overflow-hidden min-h-[100dvh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
        <div className="absolute inset-0 grid-texture opacity-15" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-12">
        <div className="glass-card-bright rounded-3xl px-6 py-14 md:px-14 text-center mb-16">
          <div className="h-5 bg-emerald-100 rounded-full w-36 mx-auto mb-5 animate-pulse" />
          <div className="h-10 bg-emerald-50 rounded-xl w-72 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-emerald-50 rounded-full w-56 mx-auto animate-pulse" />
        </div>
        <div className="space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-gray-200 bg-white px-5 py-8 md:px-8 md:py-10 shadow-sm">
              <div className="h-6 bg-gray-100 rounded-full w-44 mb-6 animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="aspect-square bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Gallery({ layout }: { layout?: string }) {
  const [mounted, setMounted] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false
    const scrollToHash = () => {
      const hash = window.location.hash?.replace("#", "")
      if (!hash) return
      let attempts = 0
      const tryScroll = () => {
        if (cancelled) return
        const el = document.getElementById(hash)
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return }
        attempts += 1
        if (attempts < 20) setTimeout(tryScroll, 150)
      }
      tryScroll()
    }
    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => { cancelled = true; window.removeEventListener("hashchange", scrollToHash) }
  }, [])

  const sections = groupByCategory(galleryImages as GalleryImage[])

  const openLightbox = useCallback((sectionImages: GalleryImage[], img: GalleryImage) => {
    const idx = sectionImages.findIndex((i) => i.src === img.src)
    setLightboxImages(sectionImages)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [])

  const closeLightbox = useCallback(() => { setActiveIndex(null); setLightboxImages([]) }, [])
  const next = useCallback(() => { setActiveIndex((prev) => (prev !== null ? (prev + 1) % lightboxImages.length : null)) }, [lightboxImages.length])
  const prev = useCallback(() => { setActiveIndex((prev) => (prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null)) }, [lightboxImages.length])

  /* Render skeleton until hydrated — eliminates CLS */
  if (!mounted) return <GallerySkeleton />

  const LAYOUTS = ["featured", "grid", "strip", "masonry"] as const
  type LayoutType = typeof LAYOUTS[number]

  const renderSection = (images: GalleryImage[], sectionLayout: LayoutType, sectionIndex: number) => {
    const open = (img: GalleryImage) => openLightbox(images, img)
    switch (sectionLayout) {
      case "featured": return <FeaturedSection images={images} sectionIndex={sectionIndex} onOpen={open} />
      case "strip":    return <StripSection images={images} sectionIndex={sectionIndex} onOpen={open} />
      case "masonry":  return <MasonrySection images={images} onOpen={open} />
      default:         return <GridSection images={images} sectionIndex={sectionIndex} onOpen={open} />
    }
  }

  return (
    <section id="gallery" className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
        <div className="absolute inset-0 grid-texture opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="glass-card-bright rounded-3xl px-6 py-12 md:px-14 md:py-14 text-center mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Our Work Gallery</span>
          </div>
          <h2 className="text-gray-900 text-2xl md:text-4xl font-black mb-4 leading-tight">
            हमारे काम, <span className="hero-gradient-text">आपका विश्वास</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-6">
            JK Interior के द्वारा किए गए premium interior और false ceiling के शानदार projects देखें — Forbesganj, Araria, Bihar।
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-6" aria-hidden="true" />
          <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.15em] font-bold uppercase">
            REAL PROJECTS • REAL CLIENTS • REAL RESULTS
          </p>
        </motion.div>

        {/* Gallery Sections */}
        <div className="space-y-16">
          {sections.map(([category, images], sectionIndex) => {
            const sectionLayout: LayoutType = LAYOUTS[sectionIndex % LAYOUTS.length]
            return (
              <motion.div
                key={category}
                id={`cat-${slugify(category)}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white px-5 py-8 md:px-8 md:py-10 shadow-sm"
              >
                <SectionHeader title={category} index={sectionIndex} />
                {renderSection(images, sectionLayout, sectionIndex)}
              </motion.div>
            )
          })}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="glass-card-bright rounded-3xl px-6 py-12 md:px-14 md:py-14 text-center mt-16"
        >
          <p className="text-emerald-600 text-xs font-bold tracking-[0.25em] uppercase mb-4">JK Interior — Forbesganj, Araria</p>
          <h3 className="text-gray-900 text-2xl md:text-4xl font-black mb-4 leading-tight">
            आपका घर, <span className="hero-gradient-text">हमारी पहचान</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Budget आपका, ज़िम्मेदारी हमारी! पाइए <span className="text-amber-500 font-semibold">Premium Interior</span> और <span className="text-amber-500 font-semibold">False Ceiling</span> का काम सबसे कम समय और किफायती रेट पर।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+918651070831"
              aria-label="Call JK Interior"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(5,150,105,0.35)] active:scale-95 luxury-animated-shine touch-manipulation"
            >
              <Phone size={18} aria-hidden="true" /> अभी कॉल करें
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-emerald-300 bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-100 text-emerald-700 text-sm font-bold rounded-xl transition-all active:scale-95 touch-manipulation"
            >
              Free Quote लें
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.12em] font-bold uppercase">
              Trusted by 100+ families across <span className="text-gray-500">Araria • Forbesganj • Jogbani • Purnia</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && lightboxImages.length > 0 && (
        <Lightbox images={lightboxImages} activeIndex={activeIndex} onClose={closeLightbox} onNext={next} onPrev={prev} />
      )}
    </section>
  )
}
