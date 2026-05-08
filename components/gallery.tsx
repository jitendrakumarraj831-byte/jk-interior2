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
  Sparkles,
  Eye,
  BadgeCheck,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const easeLux = [0.22, 1, 0.36, 1] as const;

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  titleHi: string;
  category: string;
  location: string;
  tag: string;
};

const categories = [
  { id: "all", label: "All Projects", labelHi: "सभी" },
  { id: "pvc-ceiling", label: "PVC Ceiling", labelHi: "PVC सीलिंग" },
  { id: "gypsum-ceiling", label: "Gypsum Ceiling", labelHi: "जिप्सम सीलिंग" },
  { id: "wpc-panel", label: "WPC Panel", labelHi: "WPC पैनल" },
  { id: "tv-unit", label: "TV Unit", labelHi: "TV यूनिट" },
  { id: "uv-marble", label: "UV Marble", labelHi: "UV मार्बल" },
];

const galleryItems: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "PVC false ceiling design in Forbesganj by JK Interior",
    title: "Modern PVC Ceiling",
    titleHi: "मॉडर्न PVC सीलिंग",
    category: "pvc-ceiling",
    location: "Forbesganj",
    tag: "Completed",
  },
  {
    src: "https://images.pexels.com/photos/6969872/pexels-photo-6969872.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Gypsum ceiling design with lighting in Araria",
    title: "Elegant Gypsum Ceiling",
    titleHi: "एलिगेंट जिप्सम सीलिंग",
    category: "gypsum-ceiling",
    location: "Araria",
    tag: "Premium",
  },
  {
    src: "https://images.pexels.com/photos/6969460/pexels-photo-6969460.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "WPC wall paneling installation in Bihar",
    title: "WPC Wall Panel",
    titleHi: "WPC वॉल पैनल",
    category: "wpc-panel",
    location: "Forbesganj",
    tag: "Best Seller",
  },
  {
    src: "https://images.pexels.com/photos/6969864/pexels-photo-6969864.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Modular TV unit design in Forbesganj",
    title: "Luxury TV Unit",
    titleHi: "लक्ज़री TV यूनिट",
    category: "tv-unit",
    location: "Araria",
    tag: "Trending",
  },
  {
    src: "https://images.pexels.com/photos/6969464/pexels-photo-6969464.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "UV marble sheet wall design in Bihar",
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    category: "uv-marble",
    location: "Forbesganj",
    tag: "New",
  },
  {
    src: "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "PVC ceiling with LED lighting in Forbesganj",
    title: "LED PVC Ceiling",
    titleHi: "LED PVC सीलिंग",
    category: "pvc-ceiling",
    location: "Araria",
    tag: "Completed",
  },
  {
    src: "https://images.pexels.com/photos/6969872/pexels-photo-6969872.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Designer gypsum ceiling in Araria Bihar",
    title: "Designer Gypsum",
    titleHi: "डिज़ाइनर जिप्सम",
    category: "gypsum-ceiling",
    location: "Forbesganj",
    tag: "Premium",
  },
  {
    src: "https://images.pexels.com/photos/6969460/pexels-photo-6969460.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "WPC panel bedroom wall in Bihar",
    title: "Bedroom WPC Panel",
    titleHi: "बेडरूम WPC पैनल",
    category: "wpc-panel",
    location: "Araria",
    tag: "Completed",
  },
  {
    src: "https://images.pexels.com/photos/6969864/pexels-photo-6969864.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Modern TV unit with storage in Forbesganj",
    title: "Storage TV Unit",
    titleHi: "स्टोरेज TV यूनिट",
    category: "tv-unit",
    location: "Forbesganj",
    tag: "Best Seller",
  },
];

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
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
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
            transition: { staggerChildren: 0.06, delayChildren: 0.1 },
          },
        },
      };

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 20, scale: 0.97 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: easeLux },
          },
        },
      };

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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
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
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={activeCategory}
          {...staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={`${item.title}-${idx}`}
                {...staggerItem}
                layout
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-blue-500/5 sm:rounded-3xl"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openLightbox(idx);
                }}
                aria-label={`View ${item.title} - ${item.alt}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Tag badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-lg bg-blue-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm sm:top-4 sm:left-4 sm:rounded-xl sm:px-2.5 sm:text-xs">
                    <BadgeCheck className="h-3 w-3" />
                    {item.tag}
                  </div>

                  {/* Location */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 backdrop-blur-sm sm:top-4 sm:right-4 sm:rounded-xl sm:px-2.5 sm:text-xs">
                    <MapPin className="h-2.5 w-2.5 text-blue-600 sm:h-3 sm:w-3" />
                    {item.location}
                  </div>

                  {/* Expand icon */}
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:h-10 sm:w-10 sm:rounded-xl">
                    <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-white/70 sm:text-sm">
                      {item.titleHi}
                    </p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
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
              className="relative mx-4 flex max-h-[80dvh] w-full max-w-4xl flex-col items-center sm:mx-8"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Info bar */}
              <div className="mt-4 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {filtered[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {filtered[lightboxIndex].titleHi} &bull;{" "}
                    {filtered[lightboxIndex].location}
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
                    href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20liked%20the%20${encodeURIComponent(filtered[lightboxIndex].title)}%20project`}
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

      {/* Hidden SEO text */}
      <div className="sr-only" aria-hidden="true">
        <h2>Interior Design Gallery - JK Interior Forbesganj</h2>
        <p>
          Browse our gallery of completed interior design projects in Forbesganj,
          Araria, and Bihar. See real examples of PVC false ceiling designs,
          gypsum ceiling installations, WPC wall paneling, UV marble sheet work,
          and modular TV unit designs. Every project showcases our premium
          quality materials, waterproof solutions, and expert craftsmanship.
        </p>
      </div>
    </section>
  );
}
