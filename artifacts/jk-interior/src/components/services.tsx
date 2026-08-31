import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Ruler, IndianRupee, MapPin, Sparkles, Zap, ChevronDown, Clock, AlertTriangle, ChefHat, X, MessageCircle, Maximize2, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import KeywordChips from "@/components/ui/keyword-chips"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import {
  SERVICES_SUMMARY,
  serviceSeoAlt,
  buildServicesJsonLd,
  type ServiceHighlight,
  type ServiceSummary,
} from "@/lib/services-summary"
import { PINTEREST_QUERY, PINTEREST_BOARD_URL, pinterestSearchUrl } from "@/lib/pinterest-queries"
import { galleryImagesForService, mergeGalleryWithPins, seoAlt as gallerySeoAlt, type GalleryImage } from "@/lib/gallery-data"
import { usePinterestPins } from "@/lib/use-pinterest-pins"
import { Lightbox } from "@/components/gallery"

/** Direct-line WhatsApp CTA inside the Featured Work gallery modal — a fixed
 *  number by design, kept separate from the site-wide `WA_NUMBER`. */
const GALLERY_WHATSAPP_NUMBER = "918541849118"

const easeLux = [0.22, 1, 0.36, 1] as const

/** Swaps a "/images/foo.webp" path for one of its generated variants (see
 *  scripts/optimize-jk-interior-images.ts), e.g. "-800w.avif". */
const srcVariant = (webpSrc: string, suffix: string) => webpSrc.replace(/\.webp$/, suffix)

/** Desktop rows put the image in 5 of 12 columns of a 7xl container; phones get full bleed. */
const ROW_IMAGE_SIZES = "(min-width: 1024px) 520px, calc(100vw - 40px)"
/** Swipe cards are a fixed-ish rail item, never full viewport width. */
const CARD_IMAGE_SIZES = "(min-width: 640px) 340px, 80vw"
/** Featured Work grid tiles are 2/3/4 columns inside a max-w-6xl container — much narrower than a full row image. */
const GRID_IMAGE_SIZES = "(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
/** Design gallery modal tiles are 2/3 columns inside a max-w-3xl dialog. */
const GALLERY_GRID_SIZES = "(min-width: 640px) 230px, 45vw"

const HIGHLIGHT_STYLES: Record<ServiceHighlight["kind"], { icon: LucideIcon }> = {
  special: { icon: Sparkles },
  pricing: { icon: IndianRupee },
  suited: { icon: MapPin },
}

// Filter categories
const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "ceiling", label: "False Ceilings" },
  { id: "wall", label: "Wall Panelling" },
  { id: "decor", label: "Interiors & Decor" },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState("all")
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(new Set())
  const shouldReduce = useReducedMotion()
  const servicesJsonLd = useMemo(() => buildServicesJsonLd(), [])

  // Toggle the accordion detail panel for a given service
  const toggleDetails = (slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  // Filter logic based on service slug or category
  const filteredServices = SERVICES_SUMMARY.filter((service) => {
    if (activeTab === "all") return true
    if (activeTab === "ceiling") {
      return (
        service.slug.includes("ceiling") ||
        service.slug.includes("gypsum") ||
        service.slug.includes("grid")
      )
    }
    if (activeTab === "wall") {
      return (
        service.slug.includes("panel") ||
        service.slug.includes("marble") ||
        service.slug.includes("uv") ||
        service.slug.includes("wpc") ||
        service.slug.includes("wall")
      )
    }
    if (activeTab === "decor") {
      return (
        service.slug.includes("tv-unit") ||
        service.slug.includes("grass") ||
        service.slug.includes("decor")
      )
    }
    return true
  })

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fbfaf5] py-20 sm:py-24 lg:py-28"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      {/* Structured data — every service's price, image and target keyword, wherever this section renders. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <meta itemProp="name" content="JK Interior Services — Forbesganj, Araria, Bihar" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201, 162, 39,0.06),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Ruler}
          badge="Our Services"
          headingId="services-heading"
          title={<>Every Interior Service <span className="hero-gradient-text">Your Space Needs</span></>}
          subtitle="Transparent rates, honest guidance. Tap any service for pricing, timeline and best use."
        />

        <KeywordChips className="mb-8 justify-center" />

        {/* Filter category tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              aria-pressed={activeTab === cat.id}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:px-5 sm:py-3 sm:text-sm ${
                activeTab === cat.id
                  ? "bg-gold-700 text-white shadow-md shadow-gold-900/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-gold-50 border border-gold-900/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MOBILE & TABLET: touch-friendly swipe carousel ── */}
      <div className="relative z-10 lg:hidden">
        <SwipeRail
          key={activeTab}
          ariaLabel="JK Interior services"
          itemClassName="w-[84%] sm:w-[58%]"
          fadeColor="#fbfaf5"
          arrows={false}
        >
          {filteredServices.map((service, i) => (
            <ServiceSwipeCard key={service.slug} service={service} index={i} />
          ))}
        </SwipeRail>
        <SwipeHint className="mt-3" />
      </div>

      {/* ── DESKTOP: alternating editorial index ── */}
      <div className="relative z-10 mx-auto hidden max-w-6xl px-5 sm:px-6 lg:block lg:px-12">
        <div className="divide-y divide-gold-900/[0.08]">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, i) => {
              const isReversed = i % 2 === 1
              const isOpen = openSlugs.has(service.slug)
              return (
                <motion.article
                  key={service.slug}
                  layout
                  itemScope
                  itemType="https://schema.org/Service"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 gap-6 py-10 first:pt-0 last:pb-0 sm:gap-8 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12"
                >
                  <meta itemProp="areaServed" content="Forbesganj, Araria, Narpatganj, Bihar" />
                  <meta itemProp="keywords" content={service.seoKeyword} />
                  {/* Image */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`${service.name} — ${service.seoKeyword}`}
                      className="group relative block overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
                    >
                      <picture itemProp="image" itemScope itemType="https://schema.org/ImageObject">
                        <source srcSet={srcVariant(service.heroImage, "-800w.avif")} sizes={ROW_IMAGE_SIZES} type="image/avif" />
                        <source srcSet={srcVariant(service.heroImage, "-800w.webp")} sizes={ROW_IMAGE_SIZES} type="image/webp" />
                        <meta itemProp="contentUrl" content={service.heroImage} />
                        <img
                          src={service.heroImage}
                          alt={serviceSeoAlt(service)}
                          title={serviceSeoAlt(service)}
                          itemProp="url"
                          loading="lazy"
                          decoding="async"
                          className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-64 lg:h-80"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <span className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gold-700 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
                        <span className="rounded-md bg-gold-600/90 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white backdrop-blur-md">
                          {service.price}
                        </span>
                        <span className="rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-md">
                          {service.installTime}
                        </span>
                      </div>
                    </Link>

                    <p className="mt-2.5 pl-1 text-[11px] font-extrabold uppercase tracking-widest text-gold-800/60">
                      Fig. {String(i + 1).padStart(2, "0")} — {service.category} · {service.seoKeyword}
                    </p>
                  </div>

                  {/* Copy & Highlights */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="mb-2 block font-serif text-5xl font-black leading-none text-gold-900/10 sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 itemProp="name" className="mb-1 text-2xl font-black text-gray-900 sm:text-3xl">
                      <Link href={`/services/${service.slug}`} className="transition-colors hover:text-gold-700">
                        {service.name}
                      </Link>
                    </h3>
                    <p itemProp="description" className="mb-5 text-sm font-bold text-gold-700 sm:text-base">{service.tagline}</p>

                    <ul className="mb-6 space-y-3.5">
                      {service.highlights.map((h) => {
                        const Icon = HIGHLIGHT_STYLES[h.kind].icon
                        return (
                          <li key={h.kind} className="flex gap-3">
                            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gold-500/10 text-gold-700">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-black uppercase tracking-wide text-gold-900 sm:text-sm">
                                {h.label}
                              </p>
                              <p className="mt-0.5 text-sm font-medium leading-snug text-gray-700">{h.text}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Expand/collapse detail */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => toggleDetails(service.slug)}
                        aria-expanded={isOpen}
                        aria-controls={`service-details-${service.slug}`}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-gold-900/10 bg-gold-50/60 px-4 py-3 text-left text-sm font-extrabold text-gold-900 transition-colors hover:bg-gold-100/70"
                      >
                        <span className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-gold-700" aria-hidden="true" />
                          {isOpen ? "Hide details" : "View full details — rate, timeline and best use"}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 flex-none text-gold-700 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`service-details-${service.slug}`}
                            key="details"
                            initial={shouldReduce ? undefined : { height: 0, opacity: 0 }}
                            animate={shouldReduce ? undefined : { height: "auto", opacity: 1 }}
                            exit={shouldReduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: easeLux }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 rounded-xl border border-gold-900/10 bg-white p-4 sm:p-5">
                              <p className="mb-4 text-sm leading-relaxed text-gray-700">{service.detail}</p>

                              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="flex items-start gap-2.5 rounded-lg bg-gold-50/70 p-3">
                                  <IndianRupee className="mt-0.5 h-4 w-4 flex-none text-gold-700" aria-hidden="true" />
                                  <div>
                                    <dt className="text-[11px] font-black uppercase tracking-wide text-gold-800/70">Rate</dt>
                                    <dd className="text-sm font-bold text-gray-900">{service.price}</dd>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2.5 rounded-lg bg-gold-50/70 p-3">
                                  <Clock className="mt-0.5 h-4 w-4 flex-none text-gold-700" aria-hidden="true" />
                                  <div>
                                    <dt className="text-[11px] font-black uppercase tracking-wide text-gold-800/70">Timeline</dt>
                                    <dd className="text-sm font-bold text-gray-900">{service.installTime}</dd>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2.5 rounded-lg bg-gold-50/70 p-3">
                                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold-700" aria-hidden="true" />
                                  <div>
                                    <dt className="text-[11px] font-black uppercase tracking-wide text-gold-800/70">Best Placed In</dt>
                                    <dd className="text-sm font-bold text-gray-900">{service.whereUsedFirst}</dd>
                                  </div>
                                </div>
                              </dl>

                              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5">
                                <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-amber-500" aria-hidden="true" />
                                <div>
                                  <p className="text-[11px] font-black uppercase tracking-wide text-amber-800/80">Where Not To Use It</p>
                                  <p className="text-xs font-semibold leading-snug text-amber-900 sm:text-sm">{service.avoid}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 font-serif text-sm font-bold text-gold-800 underline decoration-gold-400 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
                      >
                        Read the full guide
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      <span className="text-gray-300" aria-hidden="true">|</span>
                      <CallLink size="sm" variant="outline" ariaLabel={`Call for a ${service.name} quotation — ${service.seoKeyword}`}>
                        Get a free rate
                      </CallLink>
                      <WhatsAppLink
                        size="sm"
                        variant="outline"
                        message={`Hello JK Interior, please share rates and design photographs for ${service.name}.`}
                        ariaLabel={`WhatsApp about ${service.name} — JK Interior Forbesganj`}
                      >
                        WhatsApp
                      </WhatsAppLink>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <FeaturedWorkGrid />

      {/* Bottom Conversion Box */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mt-16 flex flex-col items-center gap-5 rounded-2xl border border-gold-900/10 bg-white p-8 text-center shadow-xs lg:mt-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>Free Site Visit &amp; Consultation</span>
          </div>
          <p className="max-w-2xl text-lg font-bold text-gray-900 sm:text-xl">
            Not sure what suits your room? Tell us the space and budget — we'll recommend the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <CallLink size="lg" shine ariaLabel="Call to book a free site visit" className="text-base">
              Book a Free Site Visit
            </CallLink>
            <Link
              href="/services"
              className="flex items-center gap-2 rounded-xl border border-gold-600/30 bg-gold-50/80 px-6 py-4 text-sm font-bold text-gold-800 transition-all hover:border-gold-600/50 hover:bg-gold-100 active:scale-95 sm:px-7 sm:text-base"
            >
              Browse All {SERVICES_SUMMARY.length} Services
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Responsive grid-based gallery, sitting directly alongside the services list
 * — one tile per service (`<picture>` AVIF/WebP variants, zero layout shift
 * via a fixed aspect box) plus a closing tile for custom, site-specific work
 * like a modular kitchen design service that doesn't have a fixed rate card.
 * Tapping a tile opens its Pinterest gallery in an in-page modal rather than
 * navigating away — see `ServiceGalleryModal` below.
 */
function FeaturedWorkGrid() {
  const [activeService, setActiveService] = useState<ServiceSummary | null>(null)

  return (
    <div className="relative z-10 mx-auto mt-16 max-w-6xl px-5 sm:px-6 lg:mt-20 lg:px-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gold-900/15" />
        <h3 className="text-center text-lg font-bold text-gray-800">Featured Work, By Service</h3>
        <div className="h-px flex-1 bg-gold-900/15" />
      </div>
      <p className="mx-auto -mt-2 mb-6 max-w-lg text-center text-xs font-medium text-gray-500 sm:text-sm">
        Tap any service to browse its design gallery — right here on the page.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {SERVICES_SUMMARY.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => setActiveService(service)}
            aria-haspopup="dialog"
            aria-label={`Open ${service.name} design gallery — ${service.seoKeyword}`}
            itemScope
            itemType="https://schema.org/Service"
            className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-gold-900/10 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold-400/60 hover:shadow-[0_16px_40px_-12px_rgba(201,162,39,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <meta itemProp="url" content={`https://www.jkinterior.online/services/${service.slug}`} />
            <meta itemProp="keywords" content={service.seoKeyword} />
            <div className="absolute inset-0 bg-slate-900">
              <picture itemProp="image" itemScope itemType="https://schema.org/ImageObject">
                <source srcSet={srcVariant(service.heroImage, "-800w.avif")} sizes={GRID_IMAGE_SIZES} type="image/avif" />
                <source srcSet={srcVariant(service.heroImage, "-800w.webp")} sizes={GRID_IMAGE_SIZES} type="image/webp" />
                <meta itemProp="contentUrl" content={service.heroImage} />
                <img
                  src={service.heroImage}
                  alt={serviceSeoAlt(service)}
                  title={serviceSeoAlt(service)}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </picture>
            </div>

            {/* Bottom gradient — keeps the label legible over any photo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

            {/* Glowing border ring on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-gold-400/60" />

            <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white opacity-90 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:bg-gold-600/90 sm:text-[10px]">
              Explore Catalog ↗
            </span>

            <span itemProp="name" className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-extrabold leading-tight text-white drop-shadow-md sm:text-sm">
              {service.name}
            </span>
          </button>
        ))}

        {/* Modular kitchen — custom, site-specific work outside the fixed rate list (see /contact), still targeted here for search. */}
        <Link
          href="/contact"
          aria-label="Modular kitchen design service — custom quote from JK Interior Forbesganj"
          className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-gold-500/40 bg-gold-50/60 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold-500/70 hover:bg-gold-100/60 hover:shadow-[0_16px_40px_-12px_rgba(201,162,39,0.5)]"
        >
          <ChefHat className="h-7 w-7 text-gold-700" aria-hidden="true" />
          <span className="text-xs font-extrabold leading-tight text-gold-900 sm:text-sm">
            Modular Kitchen Design Service
          </span>
          <span className="text-[10px] font-semibold text-gold-700/80">Custom on-site quote</span>
        </Link>
      </div>

      <AnimatePresence>
        {activeService && (
          <ServiceGalleryModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Glassmorphism modal opened by a Featured Work tile — renders that
 * service's own installed-project photos (from `gallery-data.ts`) in a fast
 * native grid, with a sticky WhatsApp CTA. Portals to `document.body` so it
 * always sits above the section's own `overflow-hidden`, and mirrors the
 * escape/scroll-lock/focus handling the gallery lightbox already uses (see
 * `Lightbox` in `components/gallery.tsx`).
 *
 * This used to embed the service's Pinterest board via Pinterest's widget
 * SDK, which took several seconds to load and rendered into a fixed-height
 * iframe that left most of the modal blank on mobile. Local photos load
 * instantly and fill the modal edge-to-edge, so the grid is the primary
 * view; "Open on Pinterest" stays as an external link for browsing further.
 *
 * Tapping a tile opens the full-resolution photo in the shared `Lightbox`,
 * which stacks above this modal and takes over Escape while it's open.
 */
function ServiceGalleryModal({ service, onClose }: { service: ServiceSummary; onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const lightboxOpen = lightboxIdx !== null

  useEffect(() => {
    closeBtnRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // The lightbox runs its own Escape handler, so this one stands down while
  // it's open — otherwise one keypress would close both layers at once.
  useEffect(() => {
    if (lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose, lightboxOpen])

  // Local project photos render on the first frame; the board's Pinterest pins
  // are appended a moment later, once /api/pinterest answers. Until then (and
  // forever, if the feed is unreachable) this is just the local gallery.
  const localImages = useMemo(() => galleryImagesForService(service.slug), [service.slug])
  const pins = usePinterestPins(service.slug)

  // A pin can be deleted from Pinterest's CDN between the feed being cached and
  // a visitor opening the modal. Dropping it from `images` — rather than just
  // hiding its tile — is what keeps the Lightbox honest: its "n / total"
  // counter and its arrow-key navigation both walk this exact array, so a pin
  // that is merely hidden in the grid would still be reachable as a broken frame.
  const [deadPins, setDeadPins] = useState<ReadonlySet<string>>(() => new Set())
  const notePinFailed = useCallback((src: string) => {
    setDeadPins((prev) => (prev.has(src) ? prev : new Set(prev).add(src)))
  }, [])

  const images = useMemo(
    () => mergeGalleryWithPins(localImages, pins).filter((img) => !deadPins.has(img.src)),
    [localImages, pins, deadPins]
  )

  // Dead pins only ever drop off the end (local photos come first and never
  // fail this way), but if one does so while the Lightbox is open on it, step
  // back to the last surviving photo rather than rendering an empty slot.
  useEffect(() => {
    setLightboxIdx((prev) => {
      if (prev === null || prev < images.length) return prev
      return images.length > 0 ? images.length - 1 : null
    })
  }, [images.length])
  const query = PINTEREST_QUERY[service.slug] ?? `${service.name} design`
  const searchUrl = pinterestSearchUrl(query)
  const boardUrl = PINTEREST_BOARD_URL[service.slug]
  const externalUrl = boardUrl ?? searchUrl
  const waHref = `https://wa.me/${GALLERY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello JK Interior, I was browsing the ${service.name} design gallery and would like an instant quote.`
  )}`

  return createPortal(
    <motion.div
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-charcoal-950/75 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${service.name} design gallery`}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: easeLux }}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-charcoal-900/70 shadow-2xl backdrop-blur-2xl sm:max-h-[75vh] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex flex-none items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-gold-400/90">Design Gallery</p>
            <h3 className="truncate text-lg font-black text-white sm:text-xl">{service.name}</h3>
          </div>
          <div className="flex flex-none items-center gap-2">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${service.name} gallery on Pinterest in a new tab`}
              title="Open on Pinterest"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90"
            >
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Design gallery — local project photos, no third-party script on the critical path */}
        <div className="relative min-h-0 w-full max-w-full flex-1 overflow-y-auto bg-white scrollbar-luxury">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
              {images.map((img, i) => (
                <GalleryGridImage key={img.src} img={img} onOpen={() => setLightboxIdx(i)} onFail={notePinFailed} />
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <Sparkles className="h-8 w-8 text-gold-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-charcoal-700">The {service.name} gallery is being curated</p>
                <p className="mt-1 text-xs text-charcoal-500">Browse live design ideas on Pinterest in the meantime.</p>
              </div>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/30 bg-gold-500/8 px-5 py-2.5 text-sm font-bold text-gold-700 transition-all hover:border-gold-500/50 hover:bg-gold-500/15"
              >
                Browse on Pinterest <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>

        {/* Sticky CTA bar */}
        <div className="flex flex-none items-center gap-3 border-t border-white/10 bg-charcoal-900/95 px-5 py-4 backdrop-blur-xl">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get an instant WhatsApp quote for ${service.name}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F7A3D] px-5 py-3.5 text-sm font-black text-white shadow-[0_4px_24px_rgba(15,122,61,0.4)] transition-all hover:bg-[#0c6b35] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Get Instant Quote on WhatsApp
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onImageError={notePinFailed}
            onNext={() => setLightboxIdx((p) => (p === null ? null : (p + 1) % images.length))}
            onPrev={() => setLightboxIdx((p) => (p === null ? null : (p - 1 + images.length) % images.length))}
          />
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

/** Gallery grid tile — 800w AVIF/WebP variant (all local photos have one),
 *  falling back to the original file for the handful that don't (`p1.jpg`
 *  … `p5.jpg`, the Partition Wall photos) and for Pinterest pins, which are
 *  served from `i.pinimg.com` and have no variants of ours to point at.
 *  Fades in on load so the grid shows a skeleton, never a blank square, while
 *  an image is still fetching. */
function GalleryGridImage({
  img,
  onOpen,
  onFail,
}: {
  img: GalleryImage
  onOpen: () => void
  /** Reports a pin whose image won't load, so the parent can drop it from the list. */
  onFail: (src: string) => void
}) {
  const [loaded, setLoaded] = useState(false)
  // A remote pin must never go down the variant path: `-800w.avif` next to a
  // pinimg URL is a guaranteed 404, and declaring a JPEG as `type="image/avif"`
  // hands the browser a source it was told to expect in another format.
  const hasVariants = !img.remote && img.src.endsWith(".webp")
  const alt = gallerySeoAlt(img)

  // Only pins are reported: a missing local file still renders exactly as it
  // always has, rather than silently vanishing and hiding an asset regression.
  const onImageError = img.remote ? () => onFail(img.src) : undefined

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View full-size photo — ${alt}`}
      className="group relative aspect-square w-full overflow-hidden rounded-xl bg-charcoal-100 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-charcoal-200" aria-hidden="true" />}
      {hasVariants ? (
        <picture>
          <source srcSet={srcVariant(img.src, "-800w.avif")} sizes={GALLERY_GRID_SIZES} type="image/avif" />
          <source srcSet={srcVariant(img.src, "-800w.webp")} sizes={GALLERY_GRID_SIZES} type="image/webp" />
          <img
            src={srcVariant(img.src, "-800w.webp")}
            alt={alt}
            title={alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={onImageError}
            className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </picture>
      ) : (
        <img
          src={img.src}
          alt={alt}
          title={alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={onImageError}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
        <Maximize2 className="h-5 w-5 text-white drop-shadow-md" aria-hidden="true" />
      </span>
    </button>
  )
}

/* ── One service, rendered as a self-contained swipe card for touch layouts ── */
function ServiceSwipeCard({ service, index }: { service: ServiceSummary; index: number }) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <article itemScope itemType="https://schema.org/Service" className="flex h-full flex-col overflow-hidden rounded-3xl border border-gold-900/10 bg-white shadow-[0_18px_45px_-30px_rgba(76,58,18,0.7)]">
      <meta itemProp="areaServed" content="Forbesganj, Araria, Narpatganj, Bihar" />
      <meta itemProp="keywords" content={service.seoKeyword} />
      <Link href={`/services/${service.slug}`} aria-label={`${service.name} — ${service.seoKeyword}`} className="relative block">
        <picture itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <source srcSet={srcVariant(service.heroImage, "-800w.avif")} sizes={CARD_IMAGE_SIZES} type="image/avif" />
          <source srcSet={srcVariant(service.heroImage, "-800w.webp")} sizes={CARD_IMAGE_SIZES} type="image/webp" />
          <meta itemProp="contentUrl" content={service.heroImage} />
          <img
            src={service.heroImage}
            alt={serviceSeoAlt(service)}
            title={serviceSeoAlt(service)}
            itemProp="url"
            loading="lazy"
            decoding="async"
            className="h-48 w-full object-cover sm:h-56"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} · {service.category}
        </span>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 itemProp="name" className="text-lg font-black leading-tight text-white drop-shadow-md">{service.name}</h3>
          <p className="mt-1 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-gold-600/90 px-2 py-0.5 text-[10px] font-extrabold text-white">{service.price}</span>
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">{service.installTime}</span>
          </p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p itemProp="description" className="mb-3 text-sm font-semibold leading-snug text-gray-800">{service.tagline}</p>

        <dl className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-gold-50/80 p-2.5">
            <dt className="text-[9px] font-black uppercase tracking-widest text-gold-800/70">Best Placed In</dt>
            <dd className="text-xs font-bold text-gray-900">{service.whereUsedFirst}</dd>
          </div>
          <div className="rounded-lg bg-gold-50/80 p-2.5">
            <dt className="text-[9px] font-black uppercase tracking-widest text-gold-800/70">Badge</dt>
            <dd className="text-xs font-bold text-gray-900">{service.badge}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => setShowDetail((v) => !v)}
          aria-expanded={showDetail}
          aria-controls={`swipe-detail-${service.slug}`}
          className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-gold-900/10 bg-gold-50/60 px-3.5 py-2.5 text-left text-xs font-extrabold text-gold-900"
        >
          {showDetail ? "Hide details" : "View full details"}
          <ChevronDown className={`h-4 w-4 flex-none transition-transform duration-300 ${showDetail ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        <AnimatePresence initial={false}>
          {showDetail && (
            <motion.div
              id={`swipe-detail-${service.slug}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeLux }}
              className="overflow-hidden"
            >
              <p className="mb-3 text-xs leading-relaxed text-gray-600">{service.detail}</p>
              <ul className="mb-3 space-y-2">
                {service.highlights.map((h) => {
                  const Icon = HIGHLIGHT_STYLES[h.kind].icon
                  return (
                    <li key={h.kind} className="flex gap-2">
                      <Icon className="mt-0.5 h-3.5 w-3.5 flex-none text-gold-700" aria-hidden="true" />
                      <span className="text-xs leading-snug text-gray-700">
                        <span className="font-black uppercase tracking-wide text-gold-900">{h.label}: </span>
                        {h.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <p className="mb-3 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-semibold leading-snug text-amber-900">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-500" aria-hidden="true" />
                {service.avoid}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex gap-2">
          <CallLink size="sm" ariaLabel={`Call for a ${service.name} quotation — ${service.seoKeyword}`} className="flex-1 justify-center">
            Free Rate
          </CallLink>
          <WhatsAppLink
            size="sm"
            variant="outline"
            message={`Hello JK Interior, please share rates and design photographs for ${service.name}.`}
            ariaLabel={`WhatsApp about ${service.name} — JK Interior Forbesganj`}
            className="flex-1 justify-center"
          >
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  )
}
