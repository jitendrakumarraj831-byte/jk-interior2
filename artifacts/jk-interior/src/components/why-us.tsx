
import { ShieldCheck, Droplets, Clock, Sparkles, Award, HeartHandshake, BadgeCheck, Quote } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"

const easeLux = [0.22, 1, 0.36, 1] as const

const reasons = [
  {
    icon: ShieldCheck,
    title: "ISI-certified materials, no substitutions",
    titleHi: "ISI-प्रमाणित मटेरियल, कोई मिलावट नहीं",
    reasoning: "Every panel and board carries ISI certification. We don't switch to cheaper unbranded stock to protect margin — customers can ask to see the material tag on-site.",
  },
  {
    icon: Droplets,
    title: "Built for a four-month monsoon",
    titleHi: "चार महीने की बरसात के लिए बना",
    reasoning: "PVC panels and UV marble sheets are fully waterproof by design, not adapted from a drier-climate product line — this is what Araria's rainfall actually demands.",
  },
  {
    icon: Clock,
    title: "A day-by-day schedule, not 'a few days'",
    titleHi: "दिन-वार शेड्यूल, सिर्फ अंदाज़ा नहीं",
    reasoning: "Before we start, you get a written install timeline — which day the ceiling goes up, which day the finishing happens. No open-ended delays.",
  },
  {
    icon: Sparkles,
    title: "Panel systems over wet plaster",
    titleHi: "गीले प्लास्टर की जगह पैनल सिस्टम",
    reasoning: "Where the design allows it, we use clip-and-panel installation instead of wet plaster work — meaningfully less dust in a home you're still living in.",
  },
  {
    icon: Award,
    title: "A signed warranty, not a verbal promise",
    titleHi: "लिखित वारंटी, ज़ुबानी वादा नहीं",
    reasoning: "Every project is handed over with a written 1-year warranty document — materials and workmanship both covered, in your hand at completion.",
  },
  {
    icon: HeartHandshake,
    title: "The site visit costs nothing either way",
    titleHi: "साइट विज़िट का कोई शुल्क नहीं",
    reasoning: "We measure, quote, and explain the options for free — whether you book us or use the quote to compare elsewhere.",
  },
]

export default function WhyUs() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, x: -24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeLux } },
        },
      }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JK Interior",
    description: "Best interior designer in Forbesganj, Araria, Bihar. Specializing in PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV unit installation.",
    url: "https://www.jkinterior.online",
    telephone: "+918541849118",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Damaria",
      addressLocality: "Rewahi",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "100",
    },
  }

  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f0fdf4]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,rgba(5,150,105,0.06),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={BadgeCheck}
          badge="How We Work"
          headingId="why-us-heading"
          title={<>Six Decisions Behind <span className="hero-gradient-text">Every Job</span></>}
          subtitle="हर फैसले के पीछे एक वजह है"
          className="mb-12 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — brand narrative, sticky on desktop */}
          <motion.div {...animProps} className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="relative rounded-3xl border border-emerald-200 bg-white/70 p-7 shadow-sm sm:p-8">
              <Quote className="mb-4 h-8 w-8 text-emerald-300" aria-hidden="true" />
              <p className="mb-4 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                We started JK Interior in Forbesganj in 2016 fitting PVC ceilings for a handful of
                neighbours. Nine years and 100+ homes later, the job hasn't changed — we still
                measure the room ourselves before we quote it.
              </p>
              <p className="mb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                What's changed is which materials we'll put our name behind. Araria's monsoon
                wrecks anything that isn't genuinely waterproof, so PVC and UV marble stay
                on the truck for wet rooms, and gypsum stays reserved for the dry ones — even
                when a customer asks for the "prettier" option in the wrong place.
              </p>
              <div className="flex items-center gap-3 border-t border-emerald-100 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                  JK
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">JK Interior, since 2016</p>
                  <p className="text-xs text-gray-500">Forbesganj, Araria district, Bihar</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — reasoning list */}
          <motion.div {...staggerContainer} className="lg:col-span-7">
            <div className="divide-y divide-gray-100 rounded-3xl border border-gray-200 bg-white">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  {...staggerItem}
                  className="group flex gap-4 p-5 transition-colors duration-300 hover:bg-emerald-50/50 sm:gap-5 sm:p-6"
                >
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white sm:h-12 sm:w-12">
                      <reason.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                    </span>
                    <span className="mt-1 text-[10px] font-bold text-gray-300">0{i + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-0.5 text-base font-bold text-gray-900 sm:text-lg">{reason.title}</h3>
                    <p className="mb-2 text-xs font-medium text-emerald-600/80 sm:text-sm">{reason.titleHi}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{reason.reasoning}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>JK Interior is the most trusted interior design company in Forbesganj and Araria, Bihar. We provide premium quality PVC false ceiling installation, gypsum ceiling design, WPC wall paneling, UV marble sheet, and modular TV unit design with 1-year written warranty and free site visits.</p>
      </div>
    </section>
  )
}
