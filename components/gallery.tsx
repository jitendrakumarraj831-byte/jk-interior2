"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// 50 images - replace with your actual paths
const galleryImages = [
  { src: "/images/gallery/gypsum-1.jpg", alt: "Gypsum false ceiling design living room Forbesganj", category: "Gypsum Ceiling" },
  { src: "/images/gallery/pvc-1.jpg", alt: "PVC ceiling panel bedroom Forbesganj Bihar", category: "PVC Ceiling" },
  { src: "/images/gallery/grid-1.jpg", alt: "Grid ceiling office commercial space Forbesganj", category: "Grid Ceiling" },
  { src: "/images/gallery/wpc-1.jpg", alt: "WPC louvers wall panel wooden finish", category: "WPC Louvers" },
  { src: "/images/gallery/fluted-1.jpg", alt: "Fluted wall panel modern interior design", category: "Fluted Panel" },
  { src: "/images/gallery/tvunit-1.jpg", alt: "Modern TV unit design living room Forbesganj", category: "TV Unit" },
  { src: "/images/gallery/uvmarble-1.jpg", alt: "UV marble sheet wall cladding luxury finish", category: "UV Marble" },
  { src: "/images/gallery/grass-1.jpg", alt: "Artificial grass wall balcony decoration", category: "Artificial Grass" },
  { src: "/images/gallery/partition-1.jpg", alt: "Gypsum partition wall office Forbesganj", category: "Partition Wall" },
  { src: "/images/gallery/gypsum-2.jpg", alt: "POP false ceiling design bedroom Forbesganj Bihar", category: "Gypsum Ceiling" },
  { src: "/images/gallery/pvc-2.jpg", alt: "PVC ceiling waterproof kitchen design", category: "PVC Ceiling" },
  { src: "/images/gallery/grid-2.jpg", alt: "T grid ceiling commercial project Forbesganj", category: "Grid Ceiling" },
  // ... add up to 50 images
  // Example placeholders:
  ...Array.from({ length: 38 }, (_, i) => ({
    src: `/images/gallery/project-${i + 13}.jpg`,
    alt: `JK Interior project Forbesganj Bihar false ceiling work ${i + 13}`,
    category: "Interior Design"
  }))
]

const INITIAL_VISIBLE = 12

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0))
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0))

  const showMore = () => setVisibleCount(galleryImages.length)

  // SEO Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "JK Interior Project Gallery - False Ceiling & Interior Work Forbesganj Bihar",
    "description": "50+ completed projects of gypsum false ceiling, PVC ceiling, grid ceiling, WPC louvers, fluted panels, TV unit design, UV marble sheet in Forbesganj Bihar",
    "provider": {
      "@type": "LocalBusiness",
      "name": "JK Interior",
      "areaServed": "Forbesganj, Bihar"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section ref={sectionRef} id="gallery" className="bg-background py-24" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4">
          <header className="reveal mb-16 text-center opacity-0">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
              Our Work / हमारा काम
            </span>
            <h2 id="gallery-heading" className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
              Project <span className="gold-text">Gallery</span> - Forbesganj Bihar
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground font-mono">
              Browse 50+ latest interior design and false ceiling projects by JK Interior — gypsum ceiling, PVC ceiling, WPC louvers, TV units, UV marble sheet and more in Forbesganj Bihar.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.slice(0, visibleCount).map((img, index) => (
              <button
                key={img.src}
                onClick={() => openLightbox(index)}
                className="reveal group relative aspect-square overflow-hidden rounded-xl border border-border opacity-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${(index % INITIAL_VISIBLE) * 0.08}s` }}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  title={`${img.category} - JK Interior Forbesganj`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading={index < 8 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-card/90 px-4 py-2 text-xs font-semibold text-primary shadow-md font-mono">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>

          {visibleCount < galleryImages.length && (
            <div className="mt-12 text-center">
              <button
                onClick={showMore}
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 font-mono"
                aria-label="Show more gallery images"
              >
                See More ({galleryImages.length - visibleCount} more photos)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-card p-2 text-foreground shadow-lg transition-colors hover:bg-surface-alt"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 z-10 rounded-full bg-card p-2 text-foreground shadow-lg transition-colors hover:bg-surface-alt"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 z-10 rounded-full bg-card p-2 text-foreground shadow-lg transition-colors hover:bg-surface-alt"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative h-[80vh] w-[90vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              title={`${galleryImages[lightboxIndex].category} - JK Interior`}
              fill
              sizes="90vw"
              className="rounded-xl object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
