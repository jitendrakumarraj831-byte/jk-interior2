"use client"
import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { src: "/images/artificial-grass.jpg", alt: "Artificial Grass Installation in Forbesganj - JK Interior", category: "Artificial Grass" },
  { src: "/images/fluted-panels.jpg", alt: "Fluted Wall Panels Design Araria Bihar - JK Interior", category: "Fluted Panels" },
  { src: "/images/gallery-1.jpg", alt: "Modern Interior Design Work Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/gallery-2.jpg", alt: "Living Room Interior Forbesganj Bihar - JK Interior", category: "Interior" },
  { src: "/images/gallery-3.jpg", alt: "Home Interior Decoration Araria - JK Interior", category: "Interior" },
  { src: "/images/gallery-4.jpg", alt: "Bedroom Interior Design Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/grid-ceiling.jpg", alt: "Grid False Ceiling Installation Forbesganj - JK Interior", category: "Grid Ceiling" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum False Ceiling Design Araria Bihar - JK Interior", category: "Gypsum Ceiling" },
  { src: "/images/hero-interior.jpg", alt: "Luxury Interior Design Forbesganj - JK Interior Araria", category: "Interior" },
  { src: "/images/partition-wall.jpg", alt: "PVC Partition Wall Design Forbesganj - JK Interior", category: "Partition Wall" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC False Ceiling Work Araria Bihar - JK Interior", category: "PVC Ceiling" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV Unit Design Forbesganj - JK Interior", category: "TV Unit" },
  { src: "/images/uv-marble.jpg", alt: "UV Marble Sheet Wall Panel Forbesganj - JK Interior", category: "UV Marble" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC Louvers Panel Design Araria - JK Interior", category: "WPC Louvers" },
  { src: "/images/gallery-5.jpg", alt: "PVC Wall Panel Design Forbesganj - JK Interior Araria", category: "PVC Panel" },
  { src: "/images/gallery-6.jpg", alt: "False Ceiling Work Forbesganj Bihar - JK Interior", category: "False Ceiling" },
  { src: "/images/gallery-7.jpg", alt: "Interior Design Service Araria Bihar - JK Interior", category: "Interior" },
  { src: "/images/gallery-8.jpg", alt: "Home Decoration Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/gallery-9.jpg", alt: "WPC Panel Work Araria - JK Interior", category: "WPC Panel" },
  { src: "/images/gallery-10.jpg", alt: "UV Marble Design Forbesganj - JK Interior", category: "UV Marble" },
  { src: "/images/gallery-11.jpg", alt: "Fluted Panel Wall Forbesganj - JK Interior", category: "Fluted Panels" },
  { src: "/images/gallery-12.jpg", alt: "Gypsum Ceiling Forbesganj - JK Interior", category: "Gypsum Ceiling" },
  { src: "/images/gallery-13.jpg", alt: "TV Unit Interior Araria - JK Interior", category: "TV Unit" },
  { src: "/images/gallery-14.jpg", alt: "Partition Wall Design Araria - JK Interior", category: "Partition Wall" },
  { src: "/images/gallery-15.jpg", alt: "Grid Ceiling Work Forbesganj - JK Interior", category: "Grid Ceiling" },
  { src: "/images/gallery-16.jpg", alt: "Artificial Grass Decoration Araria - JK Interior", category: "Artificial Grass" },
  { src: "/images/gallery-17.jpg", alt: "Interior Work Forbesganj Bihar - JK Interior", category: "Interior" },
  { src: "/images/gallery-18.jpg", alt: "PVC Ceiling Design Araria - JK Interior", category: "PVC Ceiling" },
  { src: "/images/gallery-19.jpg", alt: "Modern Interior Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/gallery-20.jpg", alt: "Wall Panel Design Araria Bihar - JK Interior", category: "Wall Panel" },
  { src: "/images/gallery-21.jpg", alt: "False Ceiling Contractor Forbesganj - JK Interior", category: "False Ceiling" },
  { src: "/images/gallery-22.jpg", alt: "Interior Designer Araria - JK Interior", category: "Interior" },
  { src: "/images/gallery-23.jpg", alt: "Home Interior Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/gallery-24.jpg", alt: "WPC Louvers Forbesganj - JK Interior", category: "WPC Louvers" },
  { src: "/images/gallery-25.jpg", alt: "UV Marble Sheet Araria - JK Interior", category: "UV Marble" },
  { src: "/images/gallery-26.jpg", alt: "TV Unit Design Araria Bihar - JK Interior", category: "TV Unit" },
  { src: "/images/gallery-27.jpg", alt: "Fluted Wall Design Forbesganj - JK Interior", category: "Fluted Panels" },
  { src: "/images/gallery-28.jpg", alt: "Gypsum Work Forbesganj - JK Interior", category: "Gypsum Ceiling" },
  { src: "/images/gallery-29.jpg", alt: "PVC Panel Forbesganj Bihar - JK Interior", category: "PVC Panel" },
  { src: "/images/gallery-30.jpg", alt: "Interior Decoration Araria - JK Interior", category: "Interior" },
  { src: "/images/gallery-31.jpg", alt: "Partition Design Forbesganj - JK Interior", category: "Partition Wall" },
  { src: "/images/gallery-32.jpg", alt: "Grid False Ceiling Araria - JK Interior", category: "Grid Ceiling" },
  { src: "/images/gallery-33.jpg", alt: "Artificial Grass Work Forbesganj - JK Interior", category: "Artificial Grass" },
  { src: "/images/gallery-34.jpg", alt: "Modern Home Interior Araria - JK Interior", category: "Interior" },
  { src: "/images/gallery-35.jpg", alt: "PVC Ceiling Forbesganj - JK Interior", category: "PVC Ceiling" },
  { src: "/images/gallery-36.jpg", alt: "Wall Panel Work Araria - JK Interior", category: "Wall Panel" },
  { src: "/images/gallery-37.jpg", alt: "Interior Design Forbesganj Bihar - JK Interior", category: "Interior" },
  { src: "/images/gallery-38.jpg", alt: "WPC Panel Design Forbesganj - JK Interior", category: "WPC Panel" },
  { src: "/images/gallery-39.jpg", alt: "UV Marble Work Araria - JK Interior", category: "UV Marble" },
  { src: "/images/gallery-40.jpg", alt: "TV Unit Work Forbesganj - JK Interior", category: "TV Unit" },
  { src: "/images/gallery-41.jpg", alt: "Fluted Panel Araria Bihar - JK Interior", category: "Fluted Panels" },
  { src: "/images/gallery-42.jpg", alt: "Gypsum Ceiling Araria - JK Interior", category: "Gypsum Ceiling" },
  { src: "/images/gallery-43.jpg", alt: "PVC Panel Araria - JK Interior", category: "PVC Panel" },
  { src: "/images/gallery-44.jpg", alt: "Interior Service Forbesganj - JK Interior", category: "Interior" },
  { src: "/images/gallery-45.jpg", alt: "Partition Wall Forbesganj - JK Interior", category: "Partition Wall" },
  { src: "/images/gallery-46.jpg", alt: "Grid Ceiling Araria Bihar - JK Interior", category: "Grid Ceiling" },
  { src: "/images/gallery-47.jpg", alt: "Artificial Grass Forbesganj Bihar - JK Interior", category: "Artificial Grass" },
  { src: "/images/gallery-48.jpg", alt: "Home Interior Araria - JK Interior", category: "Interior" },
  { src: "/images/gallery-49.jpg", alt: "False Ceiling Design Forbesganj - JK Interior", category: "False Ceiling" },
  { src: "/images/gallery-50.jpg", alt: "Interior Work Araria Bihar - JK Interior", category: "Interior" },
]

const INITIAL_VISIBLE = 8

export default function GallerySection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const showMore = () => setVisibleCount(galleryImages.length)

  const prevImage = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    )
  }

  const nextImage = () => {
    setLightboxIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "JK Interior Work Gallery - Forbesganj Araria Bihar",
    "description": "JK Interior Forbesganj - PVC Ceiling, Gypsum False Ceiling, TV Unit, Fluted Panels, WPC Louvers, UV Marble Sheet installation photos in Araria Bihar.",
    "image": galleryImages.slice(0, 10).map(img => `https://jkinteriorforbesganj.com${img.src}`)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground font-mono">
            Our Work Gallery - JK Interior Forbesganj
          </h2>

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
                  title={`${img.alt} | JK Interior Forbesganj`}
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
            className="relative h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              title={`${galleryImages[lightboxIndex].alt} | JK Interior`}
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
