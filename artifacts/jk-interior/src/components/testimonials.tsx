import { Star, Quote, MapPin, ExternalLink } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { WhatsAppLink } from "@/components/ui/cta-links"
import { GOOGLE_REVIEWS_URL } from "@/lib/business-data"

const easeLux = [0.22, 1, 0.36, 1] as const

const featured = {
  name: "Deepak Gupta",
  location: "Purnia",
  service: "Complete Interior",
  color: "from-gold-700 to-gold-900",
  initials: "DG",
  text: "We handed the entire home interior to JK Interior — from the ceilings through to the television unit. Every element was finished exactly as promised, delivered on schedule, with no charges beyond the quotation. Genuinely the best interior team we have worked with in Bihar.",
}

const testimonials = [
  {
    name: "Rahul Kumar",
    location: "Forbesganj",
    rating: 5,
    text: "JK Interior installed the PVC false ceiling throughout our home. The quality of the finish and the speed of the work were both outstanding.",
    service: "PVC False Ceiling",
    initials: "RK",
    color: "from-gold-700 to-gold-900",
  },
  {
    name: "Priya Sharma",
    location: "Araria",
    rating: 5,
    text: "We appointed JK Interior for a gypsum ceiling. A professional team, a clean site at the end of each day, and a written one-year warranty on handover.",
    service: "Gypsum Ceiling",
    initials: "PS",
    color: "from-charcoal-700 to-charcoal-900",
  },
  {
    name: "Amit Singh",
    location: "Jogbani",
    rating: 5,
    text: "Excellent WPC wall panelling work — termite-proof and waterproof panels throughout. The television unit design turned out remarkably stylish as well.",
    service: "WPC Wall Panel",
    initials: "AS",
    color: "from-amber-700 to-amber-900",
  },
  {
    name: "Sunita Devi",
    location: "Narpatganj",
    rating: 5,
    text: "We had UV marble sheets fitted across the whole bedroom. It reads exactly like natural marble, at a fraction of the cost.",
    service: "UV Marble Sheet",
    initials: "SD",
    color: "from-charcoal-700 to-charcoal-900",
  },
  {
    name: "Meena Yadav",
    location: "Raniganj",
    rating: 5,
    text: "They came out for the free site visit, provided a detailed written quotation, and started on the agreed date. Every stage was handled professionally.",
    service: "PVC False Ceiling",
    initials: "MY",
    color: "from-charcoal-700 to-charcoal-900",
  },
]

type Testimonial = (typeof testimonials)[number]

function ReviewCard({ t, decorative = false }: { t: Testimonial; decorative?: boolean }) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {[...Array(t.rating)].map((_, si) => (
            <Star key={si} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          ))}
        </div>
        <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-0.5 text-[10px] font-semibold text-gold-300">
          {t.service}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-200">{t.text}</p>
      <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 pt-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-[10px] font-black text-white`}
          aria-hidden="true"
        >
          {t.initials}
        </div>
        <div>
          <div className="text-xs font-bold text-white">{t.name}</div>
          <div className="text-[10px] text-slate-400">{t.location}, Bihar</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background — a dark "stage", distinct from the navy of Process and the cream of Why Us */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#141c26] via-[#1f2a37] to-[#141c26]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(212, 175, 55,0.16),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={Star}
          badge="Client Reviews"
          tone="amber"
          headingSize="md"
          dark
          title={<>What Bihar Says <span className="hero-gradient-text">After We Leave</span></>}
          subtitle="From the first site visit to the day we hand over — in our customers' own words."
          className="mb-12"
        />

        {/* Featured pull-quote, spotlight-style */}
        <motion.div {...animProps} className="relative mx-auto mb-16 max-w-4xl">
          <Quote className="mx-auto mb-4 h-10 w-10 text-amber-300" aria-hidden="true" />
          <blockquote className="mb-6 text-center font-serif text-lg font-bold leading-snug text-white sm:text-2xl md:text-3xl">
            &ldquo;{featured.text}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${featured.color} text-sm font-black text-white shadow-lg`} aria-hidden="true">
              {featured.initials}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{featured.name}</span>
                <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gold-200/70">
                <MapPin className="h-3 w-3 text-gold-300" aria-hidden="true" />
                {featured.location}, Bihar · {featured.service}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE & TABLET: swipeable reviews — the visitor controls the pace */}
      <div className="relative z-10 lg:hidden">
        <SwipeRail
          ariaLabel="Customer reviews of JK Interior"
          itemClassName="w-[82%] sm:w-[54%]"
          fadeColor="#1a2430"
          dark
          arrows={false}
        >
          {testimonials.map((t) => (
            <ReviewCard key={t.name} t={t} />
          ))}
        </SwipeRail>
        <SwipeHint dark className="mt-3" />
      </div>

      {/* DESKTOP: continuous review marquee */}
      <motion.div {...animProps} className="relative z-10 hidden overflow-hidden lg:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#1a2430] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#1a2430] to-transparent" aria-hidden />

        <div className="marquee-track flex w-max gap-4 px-12">
          {marqueeItems.map((t, i) => (
            <div key={`${t.name}-${i}`} className="w-80 shrink-0">
              <ReviewCard t={t} decorative={i >= testimonials.length} />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Rating summary + CTA */}
        <motion.div {...animProps} className="mt-14 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-5 text-sm text-slate-300 sm:gap-6">
            <span className="flex items-center gap-1.5 font-bold text-white">
              4.9 <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            </span>
            <span className="text-slate-500">|</span>
            <span>100+ reviews across Bihar</span>
          </div>

          {/* Link out to the verified Google Business profile */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read all JK Interior reviews on Google"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-amber-300/40 hover:bg-white/10"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            Read every review on Google
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          </a>

          <p className="text-base text-slate-300">Give your own home the same premium finish.</p>
          <WhatsAppLink
            size="lg"
            icon={false}
            ariaLabel="WhatsApp JK Interior for a free consultation"
            message="Hello JK Interior, I would like to discuss interior work for my home. Please share details."
            className="bg-gold-700 text-base shadow-[0_4px_24px_rgba(201, 162, 39,0.35)] hover:bg-gold-600 hover:shadow-[0_4px_32px_rgba(201, 162, 39,0.5)]"
          >
            Get a Free Consultation
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  )
}
