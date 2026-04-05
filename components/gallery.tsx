"use client"
import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Yahan 50 photos ka array hai — apne file names ke hisaab se update kar lena
const galleryImages = [
  { src: "/images/artificial-grass.jpg", alt: "Artificial Grass Work", category: "Artificial Grass" },
  { src: "/images/fluted-panels.jpg", alt: "Fluted Panels Design", category: "Fluted Panels" },
  { src: "/images/gallery-1.jpg", alt: "Interior Work Gallery 1", category: "Interior" },
  { src: "/images/gallery-2.jpg", alt: "Interior Work Gallery 2", category: "Interior" },
  { src: "/images/gallery-3.jpg", alt: "Interior Work Gallery 3", category: "Interior" },
  { src: "/images/gallery-4.jpg", alt: "Interior Work Gallery 4", category: "Interior" },
  { src: "/images/grid-ceiling.jpg", alt: "Grid Ceiling Design", category: "Grid Ceiling" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum Ceiling Work", category: "Gypsum Ceiling" },
  { src: "/images/hero-interior.jpg", alt: "Hero Interior Design", category: "Interior" },
  { src: "/images/partition-wall.jpg", alt: "Partition Wall Design", category: "Partition Wall" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC Ceiling Work", category: "PVC Ceiling" },
  { src: "/images/tv-unit.jpg", alt: "TV Unit Design", category: "TV Unit" },
  { src: "/images/uv-marble.jpg", alt: "UV Marble Sheet", category: "UV Marble" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC Louvers Panel", category: "WPC Louvers" },
  
  // --- Baaki 36 photos (jab upload karo to naam change kar dena) ---
  { src: "/images/gallery-5.jpg", alt: "Interior Work Gallery 5", category: "Interior" },
  { src: "/images/gallery-6.jpg", alt: "Interior Work Gallery 6", category: "Interior" },
  { src: "/images/gallery-7.jpg", alt: "Interior Work Gallery 7", category: "Interior" },
  { src: "/images/gallery-8.jpg", alt: "Interior Work Gallery 8", category: "Interior" },
  { src: "/images/gallery-9.jpg", alt: "Interior Work Gallery 9", category: "Interior" },
  { src: "/images/gallery-10.jpg", alt: "Interior Work Gallery 10", category: "Interior" },
  { src: "/images/gallery-11.jpg", alt: "Interior Work Gallery 11", category: "Interior" },
  { src: "/images/gallery-12.jpg", alt: "Interior Work Gallery 12", category: "Interior" },
  { src: "/images/gallery-13.jpg", alt: "Interior Work Gallery 13", category: "Interior" },
  { src: "/images/gallery-14.jpg", alt: "Interior Work Gallery 14", category: "Interior" },
  { src: "/images/gallery-15.jpg", alt: "Interior Work Gallery 15", category: "Interior" },
  { src: "/images/gallery-16.jpg", alt: "Interior Work Gallery 16", category: "Interior" },
  { src: "/images/gallery-17.jpg", alt: "Interior Work Gallery 17", category: "Interior" },
  { src: "/images/gallery-18.jpg", alt: "Interior Work Gallery 18", category: "Interior" },
  { src: "/images/gallery-19.jpg", alt: "Interior Work Gallery 19", category: "Interior" },
  { src: "/images/gallery-20.jpg", alt: "Interior Work Gallery 20", category: "Interior" },
  { src: "/images/gallery-21.jpg", alt: "Interior Work Gallery 21", category: "Interior" },
  { src: "/images/gallery-22.jpg", alt: "Interior Work Gallery 22", category: "Interior" },
  { src: "/images/gallery-23.jpg", alt: "Interior Work Gallery 23", category: "Interior" },
  { src: "/images/gallery-24.jpg", alt: "Interior Work Gallery 24", category: "Interior" },
  { src: "/images/gallery-25.jpg", alt: "Interior Work Gallery 25", category: "Interior" },
  { src: "/images/gallery-26.jpg", alt: "Interior Work Gallery 26", category: "Interior" },
  { src: "/images/gallery-27.jpg", alt: "Interior Work Gallery 27", category: "Interior" },
  { src: "/images/gallery-28.jpg", alt: "Interior Work Gallery 28", category: "Interior" },
  { src: "/images/gallery-29.jpg", alt: "Interior Work Gallery 29", category: "Interior" },
  { src: "/images/gallery-30.jpg", alt: "Interior Work Gallery 30", category: "Interior" },
  { src: "/images/gallery-31.jpg", alt: "Interior Work Gallery 31", category: "Interior" },
  { src: "/images/gallery-32.jpg", alt: "Interior Work Gallery 32", category: "Interior" },
  { src: "/images/gallery-33.jpg", alt: "Interior Work Gallery 33", category: "Interior" },
  { src: "/images/gallery-34.jpg", alt: "Interior Work Gallery 34", category: "Interior" },
  { src: "/images/gallery-35.jpg", alt: "Interior Work Gallery 35", category: "Interior" },
  { src: "/images/gallery-36.jpg", alt: "Interior Work Gallery 36", category: "Interior" },
  { src: "/images/gallery-37.jpg", alt: "Interior Work Gallery 37", category: "Interior" },
  { src: "/images/gallery-38.jpg", alt: "Interior Work Gallery 38", category: "Interior" },
  { src: "/images/gallery-39.jpg", alt: "Interior Work Gallery 39", category: "Interior" },
  { src: "/images/gallery-40.jpg", alt: "Interior Work Gallery 40", category: "Interior" },
  { src: "/images/gallery-41.jpg", alt: "Interior Work Gallery 41", category: "Interior" },
  { src: "/images/gallery-42.jpg", alt: "Interior Work Gallery 42", category: "Interior" },
  { src: "/images/gallery-43.jpg", alt: "Interior Work Gallery 43", category: "Interior" },
  { src: "/images/gallery-44.jpg", alt: "Interior Work Gallery 44", category: "Interior" },
  { src: "/images/gallery-45.jpg", alt: "Interior Work Gallery 45", category: "Interior" },
  { src: "/images/gallery-46.jpg", alt: "Interior Work Gallery 46", category: "Interior" },
  { src: "/images/gallery-47.jpg", alt: "Interior Work Gallery 47", category: "Interior" },
  { src: "/images/gallery-48.jpg", alt: "Interior Work Gallery 48", category: "Interior" },
  { src: "/images/gallery-49.jpg", alt: "Interior Work Gallery 49", category: "Interior" },
  { src: "/images/gallery-50.jpg", alt: "Interior Work Gallery 50", category: "Interior" },
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

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground font-mono">
            Our Work Gallery
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
