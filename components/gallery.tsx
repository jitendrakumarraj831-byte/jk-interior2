"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Eye,
  BadgeCheck,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const easeLux = [0.22, 1, 0.36, 1] as const;

type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

const galleryImages: GalleryItem[] = [
  // ── Gypsum False Ceiling (11 Images) ──
  { src: "/images/gypsum.jpg", alt: "Gypsum ceiling design", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum1.jpg", alt: "Modern gypsum work", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum2.jpg", alt: "Gypsum hall design", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum3.jpg", alt: "Luxury gypsum decor", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum4.jpg", alt: "Gypsum bedroom finish", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum5.jpg", alt: "Gypsum cove lighting", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum6.jpg", alt: "Gypsum office ceiling", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum7.jpg", alt: "Premium gypsum board", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum8.jpg", alt: "Gypsum arch design", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum9.jpg", alt: "Gypsum designer work", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  { src: "/images/gypsum10.jpg", alt: "Latest gypsum false ceiling finish", category: "Gypsum False Ceiling", width: 1080, height: 1080 },
  // ── PVC Ceiling (10 Images) ──
  { src: "/images/pvc.jpg", alt: "PVC ceiling panel", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc1.jpg", alt: "PVC bedroom design", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc2.jpg", alt: "PVC kitchen ceiling", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc3.jpg", alt: "Waterproof PVC work", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc4.jpg", alt: "Modern PVC texture", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc5.jpg", alt: "PVC panel fitting", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc6.jpg", alt: "PVC shop ceiling", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc7.jpg", alt: "Commercial PVC work", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc8.jpg", alt: "PVC glossy finish", category: "PVC Ceiling", width: 1080, height: 1080 },
  { src: "/images/pvc9.jpg", alt: "PVC wooden texture", category: "PVC Ceiling", width: 1080, height: 1080 },
  // ── Grid Ceiling (4 Images) ──
  { src: "/images/grid.jpg", alt: "Office grid ceiling", category: "Grid Ceiling", width: 1080, height: 1080 },
  { src: "/images/grid1.jpg", alt: "Commercial grid work", category: "Grid Ceiling", width: 1080, height: 1080 },
  { src: "/images/grid2.jpg", alt: "Hospital grid panels", category: "Grid Ceiling", width: 1080, height: 1080 },
  { src: "/images/grid3.jpg", alt: "Mineral fiber grid", category: "Grid Ceiling", width: 1080, height: 1080 },
  { src: "/images/grid4.jpg", alt: "Acoustic grid ceiling", category: "Grid Ceiling", width: 1080, height: 1080 },
  // ── WPC fluted panels & UV marble Sheet (14 Images) ──
  { src: "/images/wpc.jpg", alt: "WPC louvers wall", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc1.jpg", alt: "Fluted wall panel", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc2.jpg", alt: "UV marble sheet design", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc3.jpg", alt: "TV wall wood panel", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc4.jpg", alt: "Bedroom fluted panel", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc5.jpg", alt: "Luxury UV marble finish", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc6.jpg", alt: "Exterior WPC louvers", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc7.jpg", alt: "Interior wall cladding", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc8.jpg", alt: "Charcoal wall panel", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc9.jpg", alt: "Decorative wall sheet", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc10.jpg", alt: "Designer fluted panel finish", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc11.jpg", alt: "Premium wall texture work", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc12.jpg", alt: "Modern fluted interior decor", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  { src: "/images/wpc13.jpg", alt: "Stylish WPC wall design", category: "WPC fluted panels & uv marble Sheet", width: 1080, height: 1080 },
  // ── TV Unit Design (5 Images) ──
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit", category: "TV Unit Design", width: 1080, height: 1080 },
  { src: "/images/tv-unit1.jpg", alt: "TV cabinet design", category: "TV Unit Design", width: 1080, height: 1080 },
  { src: "/images/tv-unit2.jpg", alt: "LED panel TV unit", category: "TV Unit Design", width: 1080, height: 1080 },
  { src: "/images/tv-unit3.jpg", alt: "Luxury hall TV unit", category: "TV Unit Design", width: 1080, height: 1080 },
  { src: "/images/tv-unit4.jpg", alt: "Wooden TV unit finish", category: "TV Unit Design", width: 1080, height: 1080 },
  // ── Artificial Grass (6 Images) ──
  { src: "/images/A.jpg", alt: "Artificial grass balcony", category: "Artificial Grass", width: 1080, height: 1080 },
  { src: "/images/A1.jpg", alt: "Wall grass decor", category: "Artificial Grass", width: 1080, height: 1080 },
  { src: "/images/A2.jpg", alt: "Green turf installation", category: "Artificial Grass", width: 1080, height: 1080 },
  { src: "/images/A3.jpg", alt: "Terrace grass garden", category: "Artificial Grass", width: 1080, height: 1080 },
  { src: "/images/A4.jpg", alt: "Premium artificial turf", category: "Artificial Grass", width: 1080, height: 1080 },
  { src: "/images/A5.jpg", alt: "Landscape artificial grass", category: "Artificial Grass", width: 1080, height: 1080 },
];

function buildGalleryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "JK Interior Gallery - Bihar",
    description:
      "Professional Gypsum, PVC, Grid Ceiling and Wall Panel projects in Bihar.",
    image: galleryImages.map(
      (img) => `https://www.jkinterior.online${img.src}`
    ),
  };
}

const categoryList = [
  { id: "all", label: "All Projects", labelHi: "सभी" },
  { id: "Gypsum False Ceiling", label: "Gypsum Ceiling", labelHi: "जिप्सम सीलिंग" },
  { id: "PVC Ceiling", label: "PVC Ceiling", labelHi: "PVC सीलिंग" },
  { id: "Grid Ceiling", label: "Grid Ceiling", labelHi: "ग्रिड सीलिंग" },
  { id: "WPC fluted panels & uv marble Sheet", label: "WPC & UV Marble", labelHi: "WPC पैनल" },
  { id: "TV Unit Design", label: "TV Unit", labelHi: "TV यूनिट" },
  { id: "Artificial Grass", label: "Artificial Grass", labelHi: "आर्टिफिशियल ग्रास" },
];

const categoryCounts: Record<string, number> = {};
galleryImages.forEach((img) => {
  categoryCounts[img.category] = (categoryCounts[img.category] || 0) + 1;
});

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.15, 0.35, 0.15],
        scale: [0.9, 1.05, 0.9],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 14,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Gallery() {
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filtered.length) % filtered.length
    );
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: easeLux },
      };

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.05 },
          },
        },
      };

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 16, scale: 0.97 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease: easeLux },
          },
        },
      };

  const jsonLd = buildGalleryJsonLd();

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="gallery-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.04),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_100%,rgba(245,158,11,0.03),transparent)]" />
        <FloatingOrb
          className="absolute -top-20 right-1/3 h-64 w-64 rounded-full bg-blue-400/5 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-amber-400/4 blur-3xl"
          delay={4}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          {...animProps}
          className="mb-12 text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-4 py-1.5 backdrop-blur-sm">
            <Eye className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 sm:text-xs">
              Our Portfolio
            </span>
          </div>

          <h2
            id="gallery-heading"
            className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Our <span className="hero-gradient-text">Work Gallery</span>
          </h2>

          <p className="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-500 sm:text-lg md:text-xl">
            हमारे बेहतरीन इंटीरियर वर्क की झलक
          </p>
          <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
            Real projects, real homes, real transformations. See the JK Interior
            difference.
          </p>

          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
            className="mx-auto mt-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          {...animProps}
          className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3"
        >
          {categoryList.map((cat) => {
            const count =
              cat.id === "all"
                ? galleryImages.length
                : categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  activeCategory === cat.id
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
                aria-pressed={activeCategory === cat.id}
                aria-label={`Filter by ${cat.label}`}
              >
                {cat.label}
                <span className="text-[10px] opacity-60 sm:text-xs">
                  {cat.labelHi}
                </span>
                <span
                  className={`ml-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold sm:h-5 sm:text-[10px] ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={activeCategory}
          {...staggerContainer}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={`${item.src}-${idx}`}
                {...staggerItem}
                layout
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-blue-500/5 sm:rounded-2xl lg:rounded-3xl"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openLightbox(idx);
                }}
                aria-label={`View ${item.alt}`}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-blue-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm sm:top-3 sm:left-3 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[10px]">
                    <BadgeCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {item.category.length > 18
                      ? item.category.substring(0, 16) + "..."
                      : item.category}
                  </div>

                  {/* Expand icon */}
                  <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:bottom-3 sm:right-3 sm:h-9 sm:w-9 sm:rounded-xl">
                    <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>

                  {/* Alt text on hover */}
                  <div className="absolute bottom-2 left-2 right-10 sm:bottom-3 sm:left-3 sm:right-12">
                    <p className="truncate text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                      {item.alt}
                    </p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-2xl lg:rounded-3xl"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(37,99,235,0.12), 0 0 30px -5px rgba(37,99,235,0.06)",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          {...animProps}
          className="mt-12 flex flex-col items-center gap-4 text-center sm:mt-14 lg:mt-16"
        >
          <p className="text-base font-medium text-slate-500 sm:text-lg">
            अपने घर का भी ऐसा बदलाव चाहिए?
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="tel:+918651070831"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:rounded-2xl sm:px-8 sm:py-3.5 sm:text-base"
              aria-label="Call for inquiry"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20saw%20your%20gallery%20and%20want%20a%20similar%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 sm:rounded-2xl sm:px-8 sm:py-3.5 sm:text-base"
              aria-label="WhatsApp for similar design"
            >
              <MessageCircle className="h-4 w-4" />
              Get Similar Design
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 sm:top-6 sm:right-6 sm:h-12 sm:w-12"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeLux }}
              className="relative mx-4 flex max-h-[85dvh] w-full max-w-4xl flex-col items-center sm:mx-8"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  width={filtered[lightboxIndex].width}
                  height={filtered[lightboxIndex].height}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Info bar */}
              <div className="mt-4 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {filtered[lightboxIndex].alt}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {filtered[lightboxIndex].category}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <a
                    href="tel:+918651070831"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-blue-700 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
                    aria-label="Call about this project"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Inquire
                  </a>
                  <a
                    href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20liked%20the%20${encodeURIComponent(filtered[lightboxIndex].alt)}%20project`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-700 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
                    aria-label="WhatsApp about this project"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Counter */}
              <div className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
                {lightboxIndex + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden SEO text */}
      <div className="sr-only" aria-hidden="true">
        <h2>Interior Design Gallery - JK Interior Forbesganj</h2>
        <p>
          Browse our gallery of completed interior design projects in Forbesganj,
          Araria, and Bihar. See real examples of gypsum false ceiling designs,
          PVC ceiling installations, grid ceiling work, WPC fluted panels, UV
          marble sheet installations, modular TV unit designs, and artificial
          grass setups. Every project showcases our premium quality materials,
          waterproof solutions, and expert craftsmanship.
        </p>
      </div>
    </section>
  );
      }
      
