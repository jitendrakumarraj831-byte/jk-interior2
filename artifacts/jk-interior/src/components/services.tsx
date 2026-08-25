import { useMemo, useState } from "react"
import { ArrowUpRight, Ruler, IndianRupee, MapPin, Sparkles, Zap, ChevronDown, Clock, AlertTriangle, ChefHat, type LucideIcon } from "lucide-react"
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

const easeLux = [0.22, 1, 0.36, 1] as const

/** Swaps a "/images/foo.webp" path for one of its generated variants (see
 *  scripts/optimize-jk-interior-images.ts), e.g. "-800w.avif". */
const srcVariant = (webpSrc: string, suffix: string) => webpSrc.replace(/\.webp$/, suffix)

/** Desktop rows put the image in 5 of 12 columns of a 7xl container; phones get full bleed. */
const ROW_IMAGE_SIZES = "(min-width: 1024px) 520px, calc(100vw - 40px)"
/** Swipe cards are a fixed-ish rail item, never full viewport width. */
const CARD_IMAGE_SIZES = "(min-width: 640px) 340px, 80vw"

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
 */
function FeaturedWorkGrid() {
  return (
    <div className="relative z-10 mx-auto mt-16 max-w-6xl px-5 sm:px-6 lg:mt-20 lg:px-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gold-900/15" />
        <h3 className="text-center text-lg font-bold text-gray-800">Featured Work, By Service</h3>
        <div className="h-px flex-1 bg-gold-900/15" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {SERVICES_SUMMARY.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            aria-label={`${service.name} photos — ${service.seoKeyword}`}
            className="group relative block overflow-hidden rounded-xl border border-gold-900/10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
              <picture itemProp="image" itemScope itemType="https://schema.org/ImageObject">
                <source srcSet={srcVariant(service.heroImage, "-800w.avif")} sizes={ROW_IMAGE_SIZES} type="image/avif" />
                <source srcSet={srcVariant(service.heroImage, "-800w.webp")} sizes={ROW_IMAGE_SIZES} type="image/webp" />
                <meta itemProp="contentUrl" content={service.heroImage} />
                <img
                  src={service.heroImage}
                  alt={serviceSeoAlt(service)}
                  title={serviceSeoAlt(service)}
                  itemProp="url"
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-extrabold leading-tight text-white drop-shadow-md sm:text-sm">
                {service.name}
              </span>
            </div>
          </Link>
        ))}

        {/* Modular kitchen — custom, site-specific work outside the fixed rate list (see /contact), still targeted here for search. */}
        <Link
          href="/contact"
          aria-label="Modular kitchen design service — custom quote from JK Interior Forbesganj"
          className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-gold-500/40 bg-gold-50/60 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-gold-500/70 hover:bg-gold-100/60 hover:shadow-lg"
        >
          <ChefHat className="h-7 w-7 text-gold-700" aria-hidden="true" />
          <span className="text-xs font-extrabold leading-tight text-gold-900 sm:text-sm">
            Modular Kitchen Design Service
          </span>
          <span className="text-[10px] font-semibold text-gold-700/80">Custom on-site quote</span>
        </Link>
      </div>
    </div>
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
