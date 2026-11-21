import { useState, type FormEvent } from "react"
import { Link } from "wouter"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  HardHat,
  HelpCircle,
  Home,
  IndianRupee,
  Layers,
  Lightbulb,
  Loader2,
  Lock,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import type { ServiceContent } from "@/lib/services-content"
import { GOOGLE_MAPS_URL } from "@/lib/seo"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"

const easeLux = [0.22, 1, 0.36, 1] as const

/** WhatsApp line requested for this booking page. */
const BOOKING_WA_NUMBER = PHONE_SECONDARY.replace(/\D/g, "")
const BOOKING_WA_DISPLAY = PHONE_SECONDARY_DISPLAY
const ALT_WA_NUMBER = PHONE_PRIMARY.replace(/\D/g, "")

const HERO_IMAGE_SIZES = "(min-width: 1024px) 46vw, calc(100vw - 40px)"
const DESIGN_IMAGE_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"

const TRUST_POINTS = [
  {
    icon: Ruler,
    title: "Free Site Measurement",
    description: "Exact estimate after measuring",
  },
  {
    icon: HardHat,
    title: "Direct Contractor Supervision",
    description: "Jitendra Kumar, personally",
  },
  {
    icon: Sparkles,
    title: "Clean & Timely Finish",
    description: "Site cleared before handover",
  },
] as const

interface GypsumDesign {
  name: string
  tag: string
  idealFor: string
  image: string
  alt: string
  highlights: readonly string[]
}

const DESIGNS: readonly GypsumDesign[] = [
  {
    name: "Modern Cove LED Ceiling",
    tag: "Cove Lighting",
    idealFor: "Drawing room · Living hall · Lounge",
    image: "/images/gypsum5.webp",
    alt: "Modern gypsum false ceiling with a warm-white LED cove border by JK Interior in Forbesganj",
    highlights: [
      "Hidden warm-white LED cove for a soft glow",
      "Seamless, crack-resistant joint finish",
      "Wiring and AC routes concealed above",
    ],
  },
  {
    name: "Minimalist Bedroom Tray Ceiling",
    tag: "Minimalist",
    idealFor: "Master bedroom · Children's bedroom",
    image: "/images/gypsum4.webp",
    alt: "Minimalist bedroom gypsum tray ceiling with soft cove lighting installed by JK Interior",
    highlights: [
      "Low-profile central tray with clean lines",
      "Glare-free light for restful evenings",
      "Calm, uncluttered look that suits any décor",
    ],
  },
  {
    name: "Living Room Coffered Design",
    tag: "Coffered",
    idealFor: "Formal living room · Family lounge",
    image: "/images/gypsum3.webp",
    alt: "Multi-level coffered gypsum false ceiling with cove lighting in a Bihar living room",
    highlights: [
      "Layered panels add architectural depth",
      "Designer focal point for the main lounge",
      "Integrates with chandeliers and downlights",
    ],
  },
  {
    name: "Office/Shop Commercial False Ceiling",
    tag: "Commercial",
    idealFor: "Office cabin · Showroom · Retail shop",
    image: "/images/gypsum6.webp",
    alt: "Commercial gypsum false ceiling with flush lighting in an office cabin by JK Interior",
    highlights: [
      "Flush, professional finish for customer-facing spaces",
      "Neat cutouts for downlights and AC grilles",
      "Low-maintenance surface that stays bright",
    ],
  },
  {
    name: "Hall Perimeter Profile Light Design",
    tag: "Profile Light",
    idealFor: "Banquet hall · Large hall · Reception",
    image: "/images/gypsum10.webp",
    alt: "Gypsum hall ceiling with a perimeter LED profile light designed and installed by JK Interior",
    highlights: [
      "Continuous perimeter LED profile line",
      "Even, shadow-free illumination around the room",
      "Clean border that frames the whole ceiling",
    ],
  },
  {
    name: "Classic Duplex Ceiling",
    tag: "Classic",
    idealFor: "Duplex lounge · Double-height living area",
    image: "/images/gypsum9.webp",
    alt: "Classic multi-level duplex gypsum ceiling with layered steps by JK Interior",
    highlights: [
      "Multi-level steps for a grand double-height look",
      "Chandelier-ready central composition",
      "Classic detailing with a modern finish",
    ],
  },
]

const PROCESS_STEPS = [
  {
    icon: ClipboardCheck,
    title: "Submit Online Booking / Select Design",
    description:
      "Pick a ceiling style and send the booking form, or message on WhatsApp. Jitendra Kumar confirms a convenient site-visit slot with you directly.",
  },
  {
    icon: Ruler,
    title: "Free On-Site Visit, Measurement & Exact Estimate",
    description:
      "A free visit at your address — the room is measured, ceiling height, wiring and AC points are checked, and you receive a clear written estimate.",
  },
  {
    icon: HardHat,
    title: "Material Setup & Clean Installation",
    description:
      "Branded board on rust-proof GI framing goes up, cove or profile lighting is built in, joints are finished smooth, and the site is cleaned before handover.",
  },
] as const

const SERVICE_AREAS = [
  "Forbesganj",
  "Araria",
  "Narpatganj",
  "Jogbani",
  "Raniganj",
  "Kursakanta",
  "Chhatapur",
  "Tribeniganj",
  "Supaul",
  "Purnia",
] as const

const FAQS = [
  {
    q: "If gypsum gets splashed once, is it ruined?",
    a: "A quick splash you wipe up is fine — what harms gypsum is standing moisture and daily steam, which is exactly why it stays out of bathrooms and daily-steam cooking areas. For durability, branded 12.5mm board is fixed on a rust-proof GI frame with staggered screwed joints, and JK Interior backs the work with a 1-year written warranty. An occasional dry wipe is all the maintenance it needs.",
  },
  {
    q: "How much room height does a gypsum ceiling eat?",
    a: "A flat design drops the ceiling by roughly 3–4 inches. If your room is already low, tell us at the free visit and Jitendra Kumar will frame a shallower drop or suggest PVC instead.",
  },
  {
    q: "Can you copy a ceiling design from a photo I saved?",
    a: "Yes. Show the photo at the site visit; Jitendra Kumar will tell you honestly what is buildable in your room's height and quote it exactly.",
  },
  {
    q: "How long does installation take, and how does the free site measurement work?",
    a: "One standard room usually takes 2–3 days; a full hall takes 3–5 days. Submit the booking form or message on WhatsApp and Jitendra Kumar visits at a time you choose, measures the room, checks height, wiring and AC points, then gives a written estimate. The visit is free across our service area, with no obligation.",
  },
  {
    q: "Can you fit LED cove or profile lighting in the gypsum ceiling?",
    a: "Yes. Cove and perimeter profile lighting are framed into the ceiling at the design stage, so the LED strip sits hidden and glows evenly. The cove/profile framing is included in the ceiling work; the LED strip, driver and electrical wiring are quoted separately and fitted by your electrician.",
  },
] as const

const ROOM_TYPES = [
  "Drawing room",
  "Living room / Hall",
  "Bedroom",
  "Dining room",
  "Office / Shop",
  "Other room",
] as const

const DESIGN_OPTIONS = DESIGNS.map((design) => design.name)

function srcVariant(webpSrc: string, suffix: string) {
  return webpSrc.replace(/\.webp$/, suffix)
}

function waHref(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

function formatPhone(digits: string) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

function formatVisitDate(iso: string) {
  if (!iso) return ""
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1)
  return digits
}

interface GypsumCeilingPageProps {
  service: ServiceContent
  jsonLd: Record<string, unknown>[]
}

export default function GypsumCeilingPage({ service, jsonLd }: GypsumCeilingPageProps) {
  const shouldReduce = useReducedMotion()
  const [selectedDesign, setSelectedDesign] = useState("")

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  const inView = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.65, ease: easeLux, delay },
        }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeLux } },
        },
      }

  const scrollToBooking = () => {
    const section = document.getElementById("booking-form")
    if (!section) return
    section.focus({ preventScroll: true })
    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const selectAndBook = (designName: string) => {
    setSelectedDesign(designName)
    requestAnimationFrame(scrollToBooking)
  }

  const priceHeadline = service.price.split(" (")[0]
  const heroWhatsApp = waHref(
    BOOKING_WA_NUMBER,
    "Hello JK Interior, I want to book a free site visit for a gypsum false ceiling. Please share the next available slot.",
  )

  return (
    <main>
      <SeoHead
        title={service.seoTitle}
        description={service.metaDescription}
        canonical={`/services/${service.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* ── 1. Booking hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f0] via-white to-[#f2f6fb]" />
          <div className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-gold-200/35 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-charcoal-200/40 blur-3xl" />
          <div className="absolute inset-0 dot-pattern opacity-[0.28]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.nav
            {...anim(0)}
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-gold-700"
          >
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <span className="text-gray-700">{service.name}</span>
          </motion.nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            <div>
              <motion.div
                {...anim(0.05)}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-md"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 sm:text-xs">
                  Gypsum False Ceiling · Forbesganj, Araria
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="mb-4 text-3xl font-black leading-[1.1] text-gray-900 sm:text-4xl lg:text-[3.2rem]"
              >
                Gypsum False Ceiling in{" "}
                <span className="hero-gradient-text">Forbesganj, Araria</span> &amp; Nearby Bihar Districts
              </motion.h1>

              <motion.p
                {...anim(0.15)}
                className="mb-5 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg"
              >
                Seamless, cove-lit ceilings planned, measured and installed under the direct
                supervision of Jitendra Kumar. Book a free site visit, get an exact written
                estimate, and choose the finish you actually want.
              </motion.p>

              <motion.div {...anim(0.2)} className="mb-5 flex flex-wrap gap-2">
                {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2.5 rounded-2xl border border-gold-200/80 bg-white/75 px-3.5 py-2.5 shadow-xs backdrop-blur-md"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-black leading-tight text-gray-900">{title}</span>
                      <span className="block text-[10px] font-medium leading-tight text-gray-500">{description}</span>
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div {...anim(0.25)} className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="luxury-animated-shine inline-flex items-center justify-center gap-2 rounded-xl bg-gold-700 px-6 py-3.5 text-sm font-black text-white shadow-[0_4px_24px_rgba(201,162,39,0.4)] transition-all hover:bg-gold-600 hover:shadow-[0_4px_32px_rgba(201,162,39,0.55)] active:scale-95"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Book Free Site Visit
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href={heroWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp JK Interior on ${BOOKING_WA_DISPLAY} about a gypsum false ceiling`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-sm font-bold text-[#0e6b60] backdrop-blur-md transition-all hover:border-[#25D366]/60 hover:bg-[#25D366]/20 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp {BOOKING_WA_DISPLAY}
                </a>
              </motion.div>

              <motion.div {...anim(0.3)} className="flex flex-wrap gap-2">
                {[
                  { icon: IndianRupee, label: priceHeadline },
                  { icon: ShieldCheck, label: "1-year written warranty" },
                  { icon: Clock, label: "2–3 days per room" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-xs backdrop-blur-sm"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              {...(shouldReduce
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.96, y: 20 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    transition: { duration: 0.9, ease: easeLux, delay: 0.15 },
                  })}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-gold-200/60 via-white to-charcoal-200/50 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-2 shadow-[0_24px_70px_rgba(31,42,55,0.16)] backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.55rem]">
                  <picture>
                    <source
                      srcSet={`${srcVariant(service.heroImage, "-800w.avif")} 800w, ${srcVariant(service.heroImage, ".avif")} 1600w`}
                      sizes={HERO_IMAGE_SIZES}
                      type="image/avif"
                    />
                    <source
                      srcSet={`${srcVariant(service.heroImage, "-800w.webp")} 800w, ${service.heroImage} 1600w`}
                      sizes={HERO_IMAGE_SIZES}
                      type="image/webp"
                    />
                    <img
                      src={service.heroImage}
                      alt={service.heroImageAlt}
                      width={800}
                      height={800}
                      className="h-72 w-full object-cover sm:h-[400px] lg:h-[440px]"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/65 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-white/15 p-3.5 text-white backdrop-blur-md">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-gold-200">
                          Direct contractor supervision
                        </p>
                        <p className="mt-0.5 text-sm font-semibold leading-snug text-white">
                          Measured, planned and checked personally by Jitendra Kumar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Design catalogue ───────────────────────────────────────────── */}
      <section id="designs" className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfaf5] to-white" />
          <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-gold-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div {...inView(0)} className="mx-auto mb-8 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold-700">
              <Palette className="h-3.5 w-3.5" aria-hidden="true" />
              Design Catalogue
            </span>
            <h2 className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Choose Your Gypsum Ceiling Style
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Six real design directions for homes, offices and halls. Select a style to fill it
              straight into the booking form — Jitendra Kumar will confirm what suits your room
              height and budget at the free visit.
            </p>
            <p
              role="status"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold text-gray-600 shadow-xs backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
              {selectedDesign ? `Selected: ${selectedDesign}` : "Tap any design to auto-fill the booking form."}
            </p>
          </motion.div>

          <motion.div {...staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESIGNS.map((design) => {
              const isSelected = selectedDesign === design.name
              return (
                <motion.article
                  key={design.name}
                  {...staggerItem}
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white/85 shadow-[0_8px_32px_rgba(31,42,55,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(31,42,55,0.14)] ${
                    isSelected ? "border-gold-400 ring-2 ring-gold-300/60" : "border-gold-200/70"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <picture>
                      <source
                        srcSet={`${srcVariant(design.image, "-800w.avif")} 800w, ${srcVariant(design.image, ".avif")} 1600w`}
                        sizes={DESIGN_IMAGE_SIZES}
                        type="image/avif"
                      />
                      <source
                        srcSet={`${srcVariant(design.image, "-800w.webp")} 800w, ${design.image} 1600w`}
                        sizes={DESIGN_IMAGE_SIZES}
                        type="image/webp"
                      />
                      <img
                        src={design.image}
                        alt={design.alt}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                      {design.tag}
                    </span>
                    {isSelected && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Selected
                      </span>
                    )}
                    <p className="absolute inset-x-3 bottom-3 flex items-start gap-1.5 text-[11px] font-semibold leading-snug text-white/95">
                      <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" aria-hidden="true" />
                      {design.idealFor}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-black leading-snug text-gray-900">{design.name}</h3>
                    <ul className="mt-3 space-y-2">
                      {design.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2 text-xs leading-snug text-gray-600">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => selectAndBook(design.name)}
                      aria-label={`Select ${design.name} and book this design`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-xs font-black text-gold-800 transition-all hover:border-gold-400 hover:bg-gold-100 active:scale-[0.98]"
                    >
                      Select &amp; Book This Design
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3. How booking works ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f2f6fa] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-texture opacity-[0.35]" />
          <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div {...inView(0)} className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-charcoal-200 bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-charcoal-700">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Simple, Transparent Booking
            </span>
            <h2 className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              How Booking Works
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              From your first message to the final clean-up, you always know the next step — and
              who is responsible for it.
            </p>
          </motion.div>

          <motion.ol {...staggerContainer} className="relative grid gap-5 md:grid-cols-3">
            <div
              className="absolute left-[16.6%] right-[16.6%] top-10 hidden h-px bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 md:block"
              aria-hidden="true"
            />
            {PROCESS_STEPS.map(({ icon: Icon, title, description }, index) => (
              <motion.li key={title} {...staggerItem} className="relative">
                <div className="flex h-full flex-col rounded-[1.75rem] border border-white/90 bg-white/90 p-6 shadow-[0_10px_36px_rgba(31,42,55,0.08)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal-900 text-gold-300 shadow-[0_6px_20px_rgba(20,28,38,0.25)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-4xl font-black leading-none text-gold-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-black leading-snug text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gold-700">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {index === 0
                      ? "Takes under 2 minutes"
                      : index === 1
                        ? "Free · No obligation"
                        : "Clean site at handover"}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ── 4. Why JK Interior + business info ────────────────────────────── */}
      <section id="why-jk" className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfaf5] to-white" />
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-gold-100/50 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div {...inView(0)} className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold-700">
              <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
              Proprietor-Led Work
            </span>
            <h2 className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Why Choose JK Interior
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              You are not handing your ceiling to an unknown crew. Jitendra Kumar plans, measures
              and supervises the work personally — from the first site visit to the final clean-up.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...inView(0.05)}
              className="rounded-[2rem] border border-gold-200/80 bg-white/85 p-6 shadow-[0_12px_40px_rgba(31,42,55,0.08)] backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-600 text-white shadow-[0_8px_24px_rgba(201,162,39,0.35)]">
                  <Layers className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold-700">
                    Personal craftsmanship, not a sales office
                  </p>
                  <h3 className="mt-1 text-xl font-black leading-snug text-gray-900">
                    One craftsman. One point of accountability.
                  </h3>
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "Direct contractor supervision on every site",
                  "Free site measurement before any price is fixed",
                  "Exact written estimate based on your room and design",
                  "Branded gypsum board on rust-proof GI framing",
                  "Clean, timely installation with daily site clean-up",
                  "1-year written warranty on material and workmanship",
                ].map((point) => (
                  <li key={point} className="flex gap-2.5 rounded-xl bg-gold-50/60 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <span className="text-xs font-semibold leading-snug text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3 rounded-2xl border border-charcoal-200/70 bg-[#f2f6fa] p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-charcoal-700" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-charcoal-700">
                  Have a design saved from Instagram or a friend's house? Show it at the free visit.
                  Jitendra Kumar will tell you honestly what is buildable in your room height and
                  what it will cost before you commit.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...inView(0.1)}
              className="relative overflow-hidden rounded-[2rem] border border-charcoal-700/50 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 p-6 text-white shadow-[0_20px_60px_rgba(20,28,38,0.28)] sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-300">
                  Business Information
                </p>
                <h3 className="mt-1 text-2xl font-black text-white">JK Interior</h3>
                <p className="mt-1 text-sm font-semibold text-gold-100">
                  Proprietor-led gypsum ceiling work
                </p>

                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proprietor</dt>
                      <dd className="font-bold text-white">Jitendra Kumar</dd>
                      <dd className="text-xs text-slate-300">Site supervisor &amp; craftsman</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</dt>
                      <dd className="font-semibold leading-relaxed text-slate-200">
                        Dumariya, Forbesganj, Araria, Bihar 854318
                      </dd>
                      <dd className="mt-1">
                        <a
                          href={GOOGLE_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-gold-300 underline-offset-2 hover:underline"
                        >
                          View on Google Maps
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Contact</dt>
                      <dd className="mt-1.5 space-y-2.5">
                        {[
                          { display: BOOKING_WA_DISPLAY, tel: PHONE_SECONDARY, wa: BOOKING_WA_NUMBER },
                          { display: PHONE_PRIMARY_DISPLAY, tel: PHONE_PRIMARY, wa: ALT_WA_NUMBER },
                        ].map((phone) => (
                          <span key={phone.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-bold text-white">{phone.display}</span>
                            <a href={`tel:${phone.tel}`} className="text-xs font-bold text-gold-300 hover:underline">
                              Call
                            </a>
                            <span className="text-slate-600" aria-hidden="true">·</span>
                            <a
                              href={waHref(
                                phone.wa,
                                "Hello JK Interior, I want to book a free site visit for a gypsum false ceiling.",
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-[#7ee2a8] hover:underline"
                            >
                              WhatsApp
                            </a>
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-300">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Service Coverage
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {SERVICE_AREAS.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-slate-200"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                    Free site visits across these towns in Araria, Supaul and Purnia districts.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={scrollToBooking}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-600 px-4 py-3 text-xs font-black text-white transition-colors hover:bg-gold-500 active:scale-[0.98]"
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Book Free Site Visit
                  </button>
                  <a
                    href={waHref(
                      BOOKING_WA_NUMBER,
                      "Hello JK Interior, please share gypsum false ceiling designs and a free site visit slot.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black text-white transition-colors hover:bg-white/20 active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Booking form ───────────────────────────────────────────────── */}
      <section
        id="booking-form"
        tabIndex={-1}
        className="relative scroll-mt-32 overflow-hidden py-16 outline-none sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#eef3f8] via-[#f8fafc] to-[#faf7f0]" />
          <div className="absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gold-100/50 blur-3xl" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div {...inView(0)} className="mx-auto mb-8 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white/85 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold-700 shadow-xs backdrop-blur-sm">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Online Booking · Free Site Visit
            </span>
            <h2
              id="booking-form-heading"
              className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl"
            >
              Book Your Gypsum Ceiling Site Visit
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Fill in your details and Jitendra Kumar will call to confirm a convenient time. Free
              measurement, exact written estimate, no obligation.
            </p>
          </motion.div>

          <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.aside
              {...inView(0.05)}
              className="order-2 overflow-hidden rounded-[2rem] border border-charcoal-700/40 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 p-6 text-white shadow-[0_18px_50px_rgba(20,28,38,0.24)] lg:order-1"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-300">
                What Happens Next
              </p>
              <h3 className="mt-1 text-xl font-black text-white">A clear, personal booking</h3>

              <ol className="mt-5 space-y-4">
                {[
                  "Jitendra Kumar calls or messages you to confirm the site-visit time.",
                  "He measures the room on-site and gives you an exact written estimate.",
                  "You approve the design and the installation date — then the work starts.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-[11px] font-black text-gold-300 ring-1 ring-gold-400/30">
                      {index + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-300">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Prefer to talk?
                </p>
                <div className="space-y-2">
                  {[
                    { display: BOOKING_WA_DISPLAY, tel: PHONE_SECONDARY, wa: BOOKING_WA_NUMBER },
                    { display: PHONE_PRIMARY_DISPLAY, tel: PHONE_PRIMARY, wa: ALT_WA_NUMBER },
                  ].map((phone) => (
                    <div key={phone.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href={`tel:${phone.tel}`} className="text-sm font-black text-white hover:text-gold-200">
                        {phone.display}
                      </a>
                      <a
                        href={waHref(phone.wa, "Hello JK Interior, I want to book a gypsum ceiling site visit.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#7ee2a8] hover:underline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
                  Usually replies within two hours during working hours.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Free site visit", "No obligation", "1-year written warranty"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.aside>

            <motion.div {...inView(0.1)} className="order-1 lg:order-2">
              <BookingForm selectedDesign={selectedDesign} onDesignChange={setSelectedDesign} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Service-specific FAQs ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfaf5] to-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <motion.div {...inView(0)} className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold-700">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Gypsum False Ceiling FAQs
            </span>
            <h2 className="mb-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
              Questions Before You Book
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600">
              Straight answers on installation time, lighting, measurement and durability.
            </p>
          </motion.div>

          <motion.div {...staggerContainer} className="space-y-3">
            {FAQS.map(({ q, a }, index) => (
              <motion.details
                key={q}
                {...staggerItem}
                className="group rounded-2xl border border-gray-200 bg-white/90 shadow-xs backdrop-blur-sm transition-colors open:border-gold-300 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-50 text-[10px] font-black text-gold-700">
                      {index + 1}
                    </span>
                    <span className="text-sm font-black leading-snug text-gray-900 group-open:text-gold-800 sm:text-base">
                      {q}
                    </span>
                  </span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-gray-600">{a}</p>
              </motion.details>
            ))}
          </motion.div>

          <motion.div
            {...inView(0.05)}
            className="mt-8 overflow-hidden rounded-[1.75rem] border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-[#f2f6fa] p-6 text-center shadow-sm sm:p-8"
          >
            <h3 className="text-lg font-black text-gray-900 sm:text-xl">
              Not sure which design suits your room?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
              Send a photo of your room on WhatsApp, or book the free visit and decide on-site with
              Jitendra Kumar.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToBooking}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-700 px-6 py-3.5 text-sm font-black text-white shadow-[0_4px_24px_rgba(201,162,39,0.35)] transition-all hover:bg-gold-600 active:scale-95"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Book Free Site Visit
              </button>
              <a
                href={waHref(
                  BOOKING_WA_NUMBER,
                  "Hello JK Interior, I want help choosing a gypsum false ceiling design for my room.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-sm font-bold text-[#0e6b60] transition-all hover:border-[#25D366]/60 hover:bg-[#25D366]/20 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {BOOKING_WA_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ── Booking form ─────────────────────────────────────────────────────────── */

interface BookingFormProps {
  selectedDesign: string
  onDesignChange: (design: string) => void
}

interface BookingSnapshot {
  name: string
  phone: string
  city: string
  design: string
  roomType: string
  area: string
  visitDate: string
  notes: string
}

type FieldErrors = Partial<Record<"name" | "phone" | "city", string>>

function BookingForm({ selectedDesign, onDesignChange }: BookingFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [roomType, setRoomType] = useState("")
  const [area, setArea] = useState("")
  const [visitDate, setVisitDate] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<BookingSnapshot | null>(null)
  const [saveStatus, setSaveStatus] = useState<"saved" | "failed">("saved")

  const today = new Date().toISOString().slice(0, 10)

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const normalized =
      digits.length > 10 && digits.startsWith("91")
        ? digits.slice(2)
        : digits.length === 11 && digits.startsWith("0")
          ? digits.slice(1)
          : digits
    setPhone(normalized.slice(0, 10))
    clearError("phone")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = name.replace(/\s+/g, " ").trim()
    const cleanCity = city.replace(/\s+/g, " ").trim()
    const cleanPhone = normalizePhone(phone)
    const nextErrors: FieldErrors = {}

    if (cleanName.length < 2) nextErrors.name = "Please enter your full name."
    if (!/^\d{10}$/.test(cleanPhone)) nextErrors.phone = "Enter a valid 10-digit mobile / WhatsApp number."
    if (!cleanCity) nextErrors.city = "Please enter your city, village or block."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstInvalid = (["name", "phone", "city"] as const).find((field) => nextErrors[field])
      if (firstInvalid) document.getElementById(`gypsum-${firstInvalid}`)?.focus()
      return
    }

    const snapshot: BookingSnapshot = {
      name: cleanName,
      phone: cleanPhone,
      city: cleanCity,
      design: selectedDesign,
      roomType,
      area: area.trim(),
      visitDate,
      notes: notes.replace(/\s+/g, " ").trim().slice(0, 500),
    }

    const detailLines = [
      `Design: ${selectedDesign || "Not sure — recommend a design"}`,
      roomType ? `Room type: ${roomType}` : "",
      area ? `Approx. area: ${area} sq.ft` : "",
      visitDate ? `Preferred visit: ${formatVisitDate(visitDate)}` : "",
      snapshot.notes ? `Notes: ${snapshot.notes}` : "",
    ].filter(Boolean)

    setIsSubmitting(true)
    let saved = false

    try {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 8000)
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: snapshot.name,
          phone: snapshot.phone,
          city: snapshot.city,
          service: "Gypsum False Ceiling",
          estimate: area ? `${area} sq.ft` : undefined,
          preferred_time: visitDate ? formatVisitDate(visitDate) : "To be confirmed",
          chat_summary: `Gypsum booking page — ${detailLines.join(" | ")}`.slice(0, 800),
        }),
        keepalive: true,
        signal: controller.signal,
      })
      window.clearTimeout(timeout)
      saved = response.ok
    } catch {
      saved = false
    } finally {
      setSaveStatus(saved ? "saved" : "failed")
      setSubmitted(snapshot)
      setIsSubmitting(false)
      window.setTimeout(() => {
        document.getElementById("booking-confirmation")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 80)
    }
  }

  const editDetails = () => {
    setSubmitted(null)
    window.setTimeout(() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60)
  }

  if (submitted) {
    const bookingMessage = [
      "Hello JK Interior, I would like to book a free site visit for a Gypsum False Ceiling.",
      "",
      `Name: ${submitted.name}`,
      `Mobile / WhatsApp: ${formatPhone(submitted.phone)}`,
      `City / Village / Block: ${submitted.city}`,
      `Design: ${submitted.design || "Not sure — recommend a design"}`,
      submitted.roomType ? `Room Type: ${submitted.roomType}` : "",
      submitted.area ? `Approx. Area: ${submitted.area} sq.ft` : "",
      submitted.visitDate ? `Preferred Site Visit Date: ${formatVisitDate(submitted.visitDate)}` : "",
      submitted.notes ? `Notes: ${submitted.notes}` : "",
      "",
      "Please confirm my booking.",
    ]
      .filter((line, index) => line !== "" || index === 1)
      .join("\n")

    const whatsappUrl = waHref(BOOKING_WA_NUMBER, bookingMessage)

    return (
      <div
        id="booking-confirmation"
        aria-live="polite"
        className="overflow-hidden rounded-[2rem] border border-gold-300 bg-white/95 shadow-[0_20px_60px_rgba(31,42,55,0.14)] backdrop-blur-xl"
      >
        <div className="bg-gradient-to-r from-gold-700 to-gold-600 px-6 py-5 text-white sm:px-8">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
              <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold-100">
                {saveStatus === "saved" ? "Booking request received" : "Your booking is ready"}
              </p>
              <h3 className="mt-0.5 text-xl font-black leading-snug text-white sm:text-2xl">
                {saveStatus === "saved"
                  ? `Thank you, ${submitted.name.split(" ")[0]}.`
                  : `Almost done, ${submitted.name.split(" ")[0]}.`}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-gray-600">
            {saveStatus === "saved"
              ? `Your request is saved. Jitendra Kumar will call you on ${formatPhone(submitted.phone)} to confirm a convenient free site-visit time.`
              : "The online save did not go through, so please tap the WhatsApp button below to send your details directly. That is the fastest way to confirm your free site visit."}
          </p>

          <dl className="mt-5 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 text-sm">
            {[
              ["Service", "Gypsum False Ceiling"],
              ["Design", submitted.design || "Not sure — recommend a design"],
              ["Name", submitted.name],
              ["Mobile / WhatsApp", formatPhone(submitted.phone)],
              ["City / Village / Block", submitted.city],
              submitted.roomType ? ["Room Type", submitted.roomType] : null,
              submitted.area ? ["Approx. Area", `${submitted.area} sq.ft`] : null,
              submitted.visitDate ? ["Preferred Visit", formatVisitDate(submitted.visitDate)] : null,
              submitted.notes ? ["Notes", submitted.notes] : null,
            ]
              .filter((row): row is [string, string] => row !== null)
              .map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                  <dt className="shrink-0 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {label}
                  </dt>
                  <dd className="min-w-0 break-words text-right text-xs font-semibold leading-relaxed text-gray-800 sm:text-sm">
                    {value}
                  </dd>
                </div>
              ))}
          </dl>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F7A3D] px-6 py-4 text-sm font-black text-white shadow-[0_6px_24px_rgba(15,122,61,0.3)] transition-all hover:bg-[#0c6b35] active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Send Booking Details on WhatsApp
          </a>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] leading-relaxed text-gray-500">
              Opens WhatsApp on {BOOKING_WA_DISPLAY} with all your details pre-filled.
            </p>
            <button
              type="button"
              onClick={editDetails}
              className="text-xs font-bold text-gold-700 underline-offset-2 hover:underline"
            >
              Edit booking details
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-gold-200 bg-gold-50/70 px-4 py-3">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-gold-800">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              No payment is taken online. The site visit and estimate are free, with no obligation.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-gold-200/80 bg-white/95 shadow-[0_20px_60px_rgba(31,42,55,0.12)] backdrop-blur-xl">
      <div className="border-b border-gold-100 bg-gradient-to-r from-gold-50 via-white to-[#f2f6fa] px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-700 text-white shadow-[0_4px_16px_rgba(201,162,39,0.35)]">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-black text-gray-900 sm:text-xl">Booking Details</h3>
            <p className="text-xs text-gray-500">Takes under 2 minutes · all fields marked * are required</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-8">
        {selectedDesign && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <p className="text-xs font-semibold leading-relaxed text-gold-800">
              <span className="font-black">Design selected:</span> {selectedDesign}. It is already
              filled in below — just complete your contact details.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="gypsum-service" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Service Type
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600"
                aria-hidden="true"
              />
              <input
                id="gypsum-service"
                name="service"
                value="Gypsum False Ceiling"
                readOnly
                aria-readonly="true"
                className="w-full cursor-not-allowed rounded-xl border border-gold-200 bg-gold-50/70 py-3.5 pl-10 pr-4 text-sm font-bold text-gray-800 outline-none"
              />
            </div>
            <p className="ml-1 text-[10px] text-gray-500">Locked for this booking page.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-design" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Selected Design Style
            </label>
            <select
              id="gypsum-design"
              name="design"
              value={selectedDesign}
              onChange={(event) => onDesignChange(event.target.value)}
              className="glass-input w-full cursor-pointer appearance-none rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-800 outline-none"
            >
              <option value="">Not sure — recommend a design</option>
              {DESIGN_OPTIONS.map((design) => (
                <option key={design} value={design}>
                  {design}
                </option>
              ))}
            </select>
            <p className="ml-1 text-[10px] text-gray-500">Pick a card above or choose here.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-name" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="gypsum-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                clearError("name")
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "gypsum-name-error" : undefined}
              placeholder="Your full name"
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            {errors.name && (
              <p id="gypsum-name-error" role="alert" className="ml-1 text-[11px] font-semibold text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-phone" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Mobile / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              id="gypsum-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={phone}
              onChange={(event) => handlePhoneChange(event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "gypsum-phone-error" : "gypsum-phone-hint"}
              placeholder="10-digit mobile number"
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm tracking-wide text-gray-800 outline-none placeholder:text-gray-400"
            />
            {errors.phone ? (
              <p id="gypsum-phone-error" role="alert" className="ml-1 text-[11px] font-semibold text-red-600">
                {errors.phone}
              </p>
            ) : (
              <p id="gypsum-phone-hint" className="ml-1 text-[10px] text-gray-500">
                10 digits, without +91.
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="gypsum-city" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              City / Village / Block <span className="text-red-500">*</span>
            </label>
            <input
              id="gypsum-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              maxLength={80}
              value={city}
              onChange={(event) => {
                setCity(event.target.value)
                clearError("city")
              }}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "gypsum-city-error" : "gypsum-city-hint"}
              placeholder="For example: Forbesganj, Araria or Narpatganj"
              list="gypsum-city-options"
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <datalist id="gypsum-city-options">
              {SERVICE_AREAS.map((area) => (
                <option key={area} value={area} />
              ))}
            </datalist>
            {errors.city ? (
              <p id="gypsum-city-error" role="alert" className="ml-1 text-[11px] font-semibold text-red-600">
                {errors.city}
              </p>
            ) : (
              <p id="gypsum-city-hint" className="ml-1 text-[10px] text-gray-500">
                We visit Forbesganj, Araria, Narpatganj, Jogbani and nearby blocks.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-room" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Room Type <span className="font-semibold normal-case tracking-normal text-gray-400">(optional)</span>
            </label>
            <select
              id="gypsum-room"
              name="roomType"
              value={roomType}
              onChange={(event) => setRoomType(event.target.value)}
              className="glass-input w-full cursor-pointer appearance-none rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none"
            >
              <option value="">Select a room type</option>
              {ROOM_TYPES.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-area" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Approx. Area in sq.ft <span className="font-semibold normal-case tracking-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="gypsum-area"
              name="area"
              type="number"
              inputMode="numeric"
              min={1}
              max={10000}
              value={area}
              onChange={(event) => setArea(event.target.value)}
              placeholder="e.g. 180"
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gypsum-visit-date" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Preferred Site Visit Date <span className="font-semibold normal-case tracking-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="gypsum-visit-date"
              name="visitDate"
              type="date"
              min={today}
              value={visitDate}
              onChange={(event) => setVisitDate(event.target.value)}
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm text-gray-800 outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="gypsum-notes" className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Notes or Design Reference <span className="font-semibold normal-case tracking-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              id="gypsum-notes"
              name="notes"
              rows={3}
              maxLength={500}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Ceiling height, LED lighting plan, a design photo you like, or anything we should know."
              className="glass-input w-full resize-none rounded-xl px-4 py-3.5 text-sm leading-relaxed text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="luxury-animated-shine flex w-full items-center justify-center gap-2 rounded-xl bg-gold-700 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(201,162,39,0.35)] transition-all hover:bg-gold-600 hover:shadow-[0_4px_32px_rgba(201,162,39,0.5)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving Your Booking…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Confirm Free Site Visit
            </>
          )}
        </button>

        <div className="flex items-start gap-2 rounded-xl bg-[#f2f6fa] px-4 py-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-600" aria-hidden="true" />
          <p className="text-[10px] leading-relaxed text-gray-500">
            No charges and no obligation. Your number is used only to confirm this site visit. After
            submitting, you can also send the same details on WhatsApp in one tap.
          </p>
        </div>
      </form>
    </div>
  )
}
