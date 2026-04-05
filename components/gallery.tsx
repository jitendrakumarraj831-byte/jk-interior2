"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
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
  // --- 38 naye photos add kiye gaye ---
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

// SEO Keywords - alag se rakha hai
const seoKeywords = [
  "interior designer Lauriya Nandangarh",
  "gypsum false ceiling Bihar",
  "PVC ceiling design Patna",
  "WPC louvers wall panel",
  "TV unit design Bihar",
  "modular kitchen Bettiah",
  "fluted wall panels",
  "UV marble sheet",
  "artificial grass balcony",
  "home interior designer Bihar",
  "office interior work Patna",
  "luxury living room design"
]
export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const VISIBLE_COUNT = 12
  // 'visibleImages' ही हमारा मुख्य डेटा सोर्स है, इसे ही हर जगह इस्तेमाल करेंगे
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, VISIBLE_COUNT)

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
  }, [showAll])

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

  // --- UPDATED LOGIC: अब यह 'visibleImages' की लेंथ के हिसाब से चलेगा ---
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

  // JSON-LD Schema for SEO (Google Image Search)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Interior Design & False Ceiling Projects - Bihar Patna",
    "description": "Portfolio of false ceiling, PVC panels, WPC louvers, TV unit, modular kitchen and bedroom interior design projects in Bihar and Patna.",
    "image": galleryImages.map(img => `https://jkinterior.online${img.src}`) // apna domain yahan daal dena
  }

  return (
    <>
      {/* SEO Schema - invisible but important for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            {visibleImages.map((img, index) => (
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

                    {/* See More Button - 12 ke baad */}
          {!showAll && galleryImages.length > VISIBLE_COUNT && (
            <div className="reveal mt-12 text-center opacity-0" style={{ animationDelay: '1s' }}>
              <button
                onClick={() => setShowAll(true)}
                className="rounded-full bg-primary/10 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground font-mono"
              >
                और देखें / See More ({galleryImages.length - VISIBLE_COUNT}+)
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
            {/* --- सुधार यहाँ किया गया है --- */}
            <Image
              src={visibleImages[lightboxIndex].src}
              alt={visibleImages[lightboxIndex].alt}
              fill
              priority
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
