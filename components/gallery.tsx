"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  // Original 12 Images - SEO Optimized Alt
  { src: "/images/hero-interior.jpg", alt: "False ceiling design for luxury living room in Bihar - PVC gypsum ceiling with LED lights Patna" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum board false ceiling design with cove lighting for home interior Bihar" },
  { src: "/images/pvc-ceiling.jpg", alt: "Waterproof PVC ceiling panel installation for kitchen and bathroom Patna Bihar" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel design for TV unit background - wooden finish interior Bihar" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design with fluted panels and LED backlight - living room interior Patna" },
  { src: "/images/gallery-1.jpg", alt: "Designer bedroom interior with modular wardrobe and false ceiling design Bihar" },
  { src: "/images/gallery-2.jpg", alt: "Modular kitchen interior design with PVC ceiling and cabinets Patna Bihar" },
  { src: "/images/gallery-3.jpg", alt: "Office interior design with gypsum ceiling and glass partition Patna Bihar" },
  { src: "/images/gallery-4.jpg", alt: "Luxury drawing room interior design with sofa and false ceiling Bihar" },
  { src: "/images/gallery-5.jpg", alt: "Fluted wall panels design for bedroom accent wall - WPC interior Patna" },
  { src: "/images/uv-marble.jpg", alt: "UV marble sheet wall design for living room - glossy waterproof panels Bihar" },
  { src: "/images/artificial-grass.jpg", alt: "Artificial grass wall decoration for balcony and terrace Patna Bihar" },

  // 38 New Images - SEO Keywords Added
  { src: "/images/gallery-6.jpg", alt: "POP false ceiling design for hall with fan box and spot lights Bihar" },
  { src: "/images/gallery-7.jpg", alt: "Gypsum ceiling design for bedroom with cove light - interior contractor Patna" },
  { src: "/images/gallery-8.jpg", alt: "PVC wall panel design for living room - termite proof wall cladding Bihar" },
  { src: "/images/gallery-9.jpg", alt: "WPC exterior louvers for balcony - weather resistant cladding Patna Bihar" },
  { src: "/images/gallery-10.jpg", alt: "Modular kitchen with acrylic finish and PVC ceiling design Patna" },
  { src: "/images/gallery-11.jpg", alt: "Bedroom wardrobe sliding door design with mirror - interior work Bihar" },
  { src: "/images/gallery-12.jpg", alt: "False ceiling design for shop and showroom - commercial interior Patna" },
  { src: "/images/gallery-13.jpg", alt: "TV unit design with UV marble sheet and wooden panels Bihar" },
  { src: "/images/gallery-14.jpg", alt: "Fluted panels for wall decoration - living room interior Patna Bihar" },
  { src: "/images/gallery-15.jpg", alt: "Gypsum partition wall for office - soundproof interior design Bihar" },
  { src: "/images/gallery-16.jpg", alt: "PVC false ceiling for bathroom - waterproof ceiling solution Patna" },
  { src: "/images/gallery-17.jpg", alt: "Wooden flooring with false ceiling - bedroom interior design Bihar" },
  { src: "/images/gallery-18.jpg", alt: "Charcoal louvers wall panel for TV background - modern interior Patna" },
  { src: "/images/gallery-19.jpg", alt: "Kitchen ceiling design with PVC panels and LED lights Bihar" },
  { src: "/images/gallery-20.jpg", alt: "Hall POP false ceiling design with center light and corner work Patna" },
  { src: "/images/gallery-21.jpg", alt: "WPC louvers for house exterior elevation - front design Bihar" },
  { src: "/images/gallery-22.jpg", alt: "Bedroom interior with fluted panels and wardrobe - Patna interior designer" },
  { src: "/images/gallery-23.jpg", alt: "Office reception false ceiling design with lighting Bihar" },
  { src: "/images/gallery-24.jpg", alt: "UV marble sheet for kitchen backsplash - glossy wall panels Patna" },
  { src: "/images/gallery-25.jpg", alt: "PVC wall and ceiling for bedroom - budget interior design Bihar" },
  { src: "/images/gallery-26.jpg", alt: "False ceiling design with chandelier - drawing room interior Patna" },
  { src: "/images/gallery-27.jpg", alt: "Modular wardrobe with loft - bedroom interior work Bihar" },
  { src: "/images/gallery-28.jpg", alt: "TV unit with storage cabinets and LED profile light design Patna" },
  { src: "/images/gallery-29.jpg", alt: "Gypsum false ceiling for restaurant and cafe interior Bihar" },
  { src: "/images/gallery-30.jpg", alt: "WPC louvers for garden area and outdoor seating design Patna" },
  { src: "/images/gallery-31.jpg", alt: "Bedroom false ceiling with cove and spot lights - interior Bihar" },
  { src: "/images/gallery-32.jpg", alt: "PVC panels for bathroom wall waterproofing Patna Bihar" },
  { src: "/images/gallery-33.jpg", alt: "Fluted panels with mirror work - luxury interior design Bihar" },
  { src: "/images/gallery-34.jpg", alt: "Hall interior with false ceiling and wall panels Patna Bihar" },
  { src: "/images/gallery-35.jpg", alt: "Modular kitchen cabinets and ceiling design - Patna contractor" },
  { src: "/images/gallery-36.jpg", alt: "Office cabin glass partition and gypsum ceiling Bihar" },
  { src: "/images/gallery-37.jpg", alt: "UV marble sheet for pillar cladding - interior decor Patna" },
  { src: "/images/gallery-38.jpg", alt: "Artificial grass wall with wooden frame - balcony decoration Bihar" },
  { src: "/images/gallery-39.jpg", alt: "POP design for ceiling border - traditional false ceiling Patna" },
  { src: "/images/gallery-40.jpg", alt: "WPC louvers for staircase wall - interior elevation Bihar" },
  { src: "/images/gallery-41.jpg", alt: "Bedroom study table with false ceiling design Patna Bihar" },
  { src: "/images/gallery-42.jpg", alt: "PVC ceiling hall design with wooden beam effect Bihar" },
  { src: "/images/gallery-43.jpg", alt: "TV unit open shelves design with backlight - living room Patna" },
  { src: "/images/gallery-44.jpg", alt: "Gypsum board ceiling center design - luxury home Bihar" },
  { src: "/images/gallery-45.jpg", alt: "Fluted wall panels with TV unit - modern interior Patna Bihar" },
  { src: "/images/gallery-46.jpg", alt: "Modular kitchen with chimney and PVC ceiling - Patna project" },
  { src: "/images/gallery-47.jpg", alt: "Office grid false ceiling with LED lights - commercial interior Bihar" },
  { src: "/images/gallery-48.jpg", alt: "UV marble sheet bathroom wall - waterproof interior Patna" },
  { src: "/images/gallery-49.jpg", alt: "WPC louvers ceiling for balcony and terrace Bihar" },
  { src: "/images/gallery-50.jpg", alt: "Complete home interior design with false ceiling and wall panels Patna Bihar" },
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

  // JSON-LD Schema for SEO (Google Image Search)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Interior Design & False Ceiling Projects - Bihar Patna",
    "description": "Portfolio of false ceiling, PVC panels, WPC louvers, TV unit, modular kitchen and bedroom interior design projects in Bihar and Patna.",
    "image": galleryImages.map(img => `https://jkinterior.online${img.src}`) // अपना domain डाल देना
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
