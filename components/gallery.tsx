"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { src: "/images/hero-interior.jpg", alt: "Luxury living room interior" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling installation" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design" },
  { src: "/images/gallery-1.jpg", alt: "Designer bedroom interior" },
  { src: "/images/gallery-2.jpg", alt: "Modern kitchen interior" },
  { src: "/images/gallery-3.jpg", alt: "Professional office interior" },
  { src: "/images/gallery-4.jpg", alt: "Luxury drawing room" },
  { src: "/images/fluted-panels.jpg", alt: "Fluted wall panels" },
  { src: "/images/uv-marble.jpg", alt: "UV marble sheet wall" },
  { src: "/images/artificial-grass.jpg", alt: "Artificial grass balcony" },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
      prev !== null ? (prev + 1) % galleryImages.length : null
    )
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    )

  return (
    <>
      <section ref={sectionRef} id="gallery" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="reveal mb-16 text-center opacity-0">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
              Our Work / हमारा काम
            </span>
            <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
              Project <span className="gold-text">Gallery</span>
            </h3>
            <p className="mx-auto max-w-xl text-muted-foreground font-mono">
              Browse our latest interior design and ceiling projects
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img, index) => (
              <button
                key={img.src}
                onClick={() => openLightbox(index)}
                className="reveal group relative aspect-square overflow-hidden rounded-xl border border-border opacity-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 0.08}s` }}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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
              fill
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
