"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export const galleryImages = [
  { src: "/images/hero-interior.jpg", alt: "Luxury living room interior design Bihar" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design Patna" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling installation Lauriya" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel Bihar" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design Patna" },
  { src: "/images/gallery-1.jpg", alt: "Designer bedroom interior Bettiah" },
  { src: "/images/gallery-2.jpg", alt: "Modular kitchen interior Bihar" },
  { src: "/images/gallery-3.jpg", alt: "Professional office interior Patna" },
  { src: "/images/gallery-4.jpg", alt: "Luxury drawing room false ceiling" },
  { src: "/images/fluted-panels.jpg", alt: "Fluted wall panels TV unit" },
  { src: "/images/uv-marble.jpg", alt: "UV marble sheet wall design" },
  { src: "/images/artificial-grass.jpg", alt: "Artificial grass balcony decoration" },
  { src: "/images/gallery-5.jpg", alt: "Gypsum ceiling design for bedroom Lauriya" },
  { src: "/images/gallery-6.jpg", alt: "PVC ceiling panels modern home Bihar" },
  { src: "/images/gallery-7.jpg", alt: "WPC louvers living room wall design" },
  { src: "/images/gallery-8.jpg", alt: "Luxury TV unit with LED panel Patna" },
  { src: "/images/gallery-9.jpg", alt: "Modular kitchen interior design Bihar" },
  { src: "/images/gallery-10.jpg", alt: "Office false ceiling gypsum work" },
  { src: "/images/gallery-11.jpg", alt: "Fluted panels bedroom headboard design" },
  { src: "/images/gallery-12.jpg", alt: "UV marble sheet TV wall Lauriya" },
  { src: "/images/gallery-13.jpg", alt: "Artificial grass balcony decoration" },
  { src: "/images/gallery-14.jpg", alt: "Designer drawing room ceiling" },
  { src: "/images/gallery-15.jpg", alt: "PVC wall paneling for shop" },
  { src: "/images/gallery-16.jpg", alt: "WPC ceiling outdoor area" },
  { src: "/images/gallery-17.jpg", alt: "Gypsum partition wall design" },
  { src: "/images/gallery-18.jpg", alt: "Modern bedroom interior Bihar" },
  { src: "/images/gallery-19.jpg", alt: "Luxury kitchen with island" },
  { src: "/images/gallery-20.jpg", alt: "Office cabin interior design" },
  { src: "/images/gallery-21.jpg", alt: "Living room false ceiling with cove light" },
  { src: "/images/gallery-22.jpg", alt: "PVC louvers exterior design" },
  { src: "/images/gallery-23.jpg", alt: "TV cabinet with fluted panels" },
  { src: "/images/gallery-24.jpg", alt: "Restaurant interior ceiling work" },
  { src: "/images/gallery-25.jpg", alt: "Bedroom PVC ceiling design" },
  { src: "/images/gallery-26.jpg", alt: "Hall gypsum design Lauriya Nandangarh" },
  { src: "/images/gallery-27.jpg", alt: "WPC deck flooring balcony" },
  { src: "/images/gallery-28.jpg", alt: "Modular wardrobe design" },
  { src: "/images/gallery-29.jpg", alt: "UV board kitchen shutters" },
  { src: "/images/gallery-30.jpg", alt: "False ceiling for shop Bihar" },
  { src: "/images/gallery-31.jpg", alt: "3D wall panel living room" },
  { src: "/images/gallery-32.jpg", alt: "Gypsum ceiling with fan design" },
  { src: "/images/gallery-33.jpg", alt: "PVC ceiling bathroom waterproof" },
  { src: "/images/gallery-34.jpg", alt: "Office reception interior" },
  { src: "/images/gallery-35.jpg", alt: "Bedroom wall WPC louvers" },
  { src: "/images/gallery-36.jpg", alt: "TV unit with marble finish" },
  { src: "/images/gallery-37.jpg", alt: "Kitchen ceiling PVC panels" },
  { src: "/images/gallery-38.jpg", alt: "Living room interior Lauriya" },
  { src: "/images/gallery-39.jpg", alt: "Gypsum arch design" },
  { src: "/images/gallery-40.jpg", alt: "Fluted panel pooja room" },
  { src: "/images/gallery-41.jpg", alt: "Artificial grass wall decor" },
  { src: "/images/gallery-42.jpg", alt: "Complete home interior Bihar" },
]

export function buildGalleryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Interior Design & False Ceiling Projects - Bihar Patna",
    description:
      "Portfolio of false ceiling, PVC panels, WPC louvers, TV unit, modular kitchen and bedroom interior design projects in Bihar and Patna.",
    image: galleryImages.map((img) => `https://jkinterior.online${img.src}`),
  }
}

export function GalleryJsonLdScript() {
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
            <motion.div
              className="columns-2 gap-4 md:columns-3 lg:columns-4 space-y-4"
              variants={staggerContainer}
            >
              {visibleImages.map((img, index) => (
                <motion.button
                  key={img.src}
                  type="button"
                  variants={fadeSlideUpItem}
                  onClick={() => openLightbox(index)}
                  className="relative mb-4 inline-block w-full overflow-hidden rounded-xl glass-panel border-gold/15 shadow-lg transition-all duration-300 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10"
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={700}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={index < 4 ? 65 : 55}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full glass-panel border-gold/30 px-4 py-2 text-xs font-semibold text-gold shadow-md font-mono">
                      View
                    </span>
                  </div>
                </motion.button>
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
