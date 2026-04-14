"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"
import { galleryImages, buildGalleryJsonLd } from "@/lib/gallery-data"

function GalleryJsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGalleryJsonLd()) }}
    />
  )
}

const VISIBLE_COUNT = 12

type GalleryProps = {
  layout?: "default" | "experience"
}


export default function Gallery({ layout = "default" }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, VISIBLE_COUNT)

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxIndex])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % visibleImages.length : null
    )

  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + visibleImages.length) % visibleImages.length
        : null
    )

  const lightbox = (
    <AnimatePresence mode="wait">
      {lightboxIndex !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/92 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/15 border border-white/30 p-2 text-white shadow-lg transition-colors hover:bg-white/25 backdrop-blur-md"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 z-10 rounded-full bg-white/15 border border-white/30 p-2 text-white shadow-lg transition-colors hover:bg-white/25 backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 z-10 rounded-full bg-white/15 border border-white/30 p-2 text-white shadow-lg transition-colors hover:bg-white/25 backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-[90vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={visibleImages[lightboxIndex].src}
              alt={visibleImages[lightboxIndex].alt}
              fill
              priority
              quality={80}
              sizes="(max-width: 1200px) 100vw, 1200px"
              decoding="async"
              className="rounded-xl object-contain"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const header = (
    <motion.div className="mb-10 text-center px-4" variants={fadeSlideUp}>
      <span className="mb-4 inline-block rounded-full glass-panel border-gold/25 px-4 py-1.5 text-xs uppercase tracking-widest text-gold font-mono">
        Our Work / हमारा काम
      </span>
      <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
        Project <span className="gold-text">Gallery</span>
      </h3>
      <p className="mx-auto max-w-xl text-muted-foreground font-mono">
        Browse our latest interior design and ceiling projects
      </p>
    </motion.div>
  )

  const seeMore =
    !showAll && galleryImages.length > VISIBLE_COUNT ? (
      <motion.div className="flex justify-center mt-10 px-4" variants={fadeSlideUp}>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="group relative flex items-center gap-3 px-10 py-4 gold-gradient text-primary-foreground font-bold rounded-full btn-luxury-glow luxury-animated-shine transition-all duration-300 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10">
            और देखें / See More ({galleryImages.length - VISIBLE_COUNT}+)
          </span>
          <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    ) : null

  if (layout === "experience") {
    return (
      <>
        <GalleryJsonLdScript />
        <div id="gallery" className="relative scroll-mt-28 pt-8 pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={staggerContainer}
          >
            {header}
            <motion.div
              className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-luxury [-webkit-overflow-scrolling:touch]"
              variants={staggerContainer}
            >
              {visibleImages.map((img, index) => (
                <motion.button
                  key={img.src}
                  type="button"
                  variants={fadeSlideUpItem}
                  onClick={() => openLightbox(index)}
                  className="group relative h-[min(52vh,420px)] w-[min(78vw,340px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/20 glass-panel shadow-xl"
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="340px"
                    quality={index < 3 ? 62 : 52}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f0f7ff]/70 to-transparent opacity-80" />
                </motion.button>
              ))}
            </motion.div>
            {seeMore}
          </motion.div>
        </div>
        {lightbox}
      </>
    )
  }

  return (
    <>
      <GalleryJsonLdScript />
      <section id="gallery" className="py-24 relative scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
          >
            {header}
            {/* Pinterest-style CSS columns masonry layout */}
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-4"
              variants={staggerContainer}
            >
              {visibleImages.map((img, index) => (
                <motion.div
                  key={img.src}
                  variants={fadeSlideUpItem}
                  className="break-inside-avoid mb-4"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group relative block w-full overflow-hidden rounded-xl glass-panel border border-gold/15 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gold/40"
                    aria-label={`View ${img.alt}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={index < 4 ? 58 : 50}
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-auto block transition-all duration-300 group-hover:scale-105 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20 rounded-xl" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full glass-panel border-gold/30 px-4 py-2 text-xs font-semibold text-gold shadow-md font-mono">
                        View
                      </span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
            {seeMore}
          </motion.div>
        </div>
      </section>
      {lightbox}
    </>
  )
}
