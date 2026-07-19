
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

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#f7f2e6] py-20 sm:py-24 lg:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* Background — a ruled "notebook page" instead of the emerald gradients used elsewhere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 38px, rgba(5,150,105,0.07) 39px)",
          }}
        />
        <div className="hidden lg:block absolute left-[9%] top-0 bottom-0 w-px bg-amber-400/25" />
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
          {/* LEFT — brand narrative, sticky on desktop, styled like a pinned note card */}
          <motion.div {...animProps} className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="relative -rotate-1 rounded-sm border border-black/5 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:p-8">
              <span className="absolute -top-3 left-8 h-6 w-16 -rotate-3 bg-amber-200/70 shadow-sm" aria-hidden="true" />
              <Quote className="mb-4 h-8 w-8 text-emerald-300" aria-hidden="true" />
              <p className="mb-4 font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                We started JK Interior in Forbesganj in 2016 fitting PVC ceilings for a handful of
                neighbours. Eight years and 100+ homes later, the job hasn't changed — we still
                measure the room ourselves before we quote it.
              </p>
              <p className="mb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                What's changed is which materials we'll put our name behind. Araria's monsoon
                wrecks anything that isn't genuinely waterproof, so PVC and UV marble stay
                on the truck for wet rooms, and gypsum stays reserved for the dry ones — even
                when a customer asks for the "prettier" option in the wrong place.
              </p>
              <div className="flex items-center gap-3 border-t border-dashed border-gray-200 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white">
                  JK
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">JK Interior, since 2016</p>
                  <p className="text-xs text-gray-500">Forbesganj, Araria district, Bihar</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — reasoning list, set as marginalia rather than boxed cards */}
          <motion.div {...staggerContainer} className="lg:col-span-7">
            <div className="divide-y divide-dashed divide-emerald-900/10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  {...staggerItem}
                  className="group flex gap-5 py-5 pl-1 sm:py-6"
                >
                  <span className="w-10 shrink-0 font-serif text-3xl font-black leading-none text-emerald-900/15 sm:w-12 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 border-l-2 border-transparent pl-5 transition-colors duration-300 group-hover:border-emerald-400">
                    <div className="mb-1.5 flex items-center gap-2">
                      <reason.icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">{reason.title}</h3>
                    </div>
                    <p className="mb-2 text-xs font-medium text-emerald-700/80 sm:text-sm">{reason.titleHi}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{reason.reasoning}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>JK Interior is the most trusted interior design company in Forbesganj and Araria, Bihar. We provide premium quality PVC false ceiling installation, gypsum ceiling design, WPC wall paneling, UV marble sheet, and modular TV unit design with 1-year written warranty and free site visits.</p>
      </div>
    </section>
  )
}
