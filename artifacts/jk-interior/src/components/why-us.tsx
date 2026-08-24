import { ShieldCheck, Droplets, Clock, Sparkles, Award, HeartHandshake, BadgeCheck, Quote } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"

const easeLux = [0.22, 1, 0.36, 1] as const

const reasons = [
  {
    icon: ShieldCheck,
    title: "ISI-certified materials, never substituted",
    reasoning:
      "Every panel we fit carries ISI certification — no cheaper unbranded stock, ever. Ask to see the material tag on site.",
  },
  {
    icon: Droplets,
    title: "Specified for a four-month monsoon",
    reasoning:
      "PVC panels and UV marble sheets are waterproof by design — built for Araria's monsoon, not adapted from a drier climate.",
  },
  {
    icon: Clock,
    title: "A day-by-day schedule, not a vague estimate",
    reasoning:
      "You get a written timeline before we start — which day the ceiling goes up, which day we hand over. No open-ended delays.",
  },
  {
    icon: Sparkles,
    title: "Panel systems in place of wet plaster",
    reasoning:
      "Wherever possible, we clip panels in instead of wet plastering — far less dust in a home you're still living in.",
  },
  {
    icon: Award,
    title: "A signed warranty, not a verbal assurance",
    reasoning:
      "A written one-year warranty on materials and workmanship, handed to you the day we finish.",
  },
  {
    icon: HeartHandshake,
    title: "The site visit costs nothing, either way",
    reasoning:
      "We measure, quote and advise for free — no fee, no obligation, even if you take the quote elsewhere.",
  },
]

type Reason = (typeof reasons)[number]

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gold-900/10 bg-white p-5 shadow-[0_14px_36px_-28px_rgba(76,58,18,0.9)]">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-serif text-3xl font-black leading-none text-gold-900/15">
          {String(index + 1).padStart(2, "0")}
        </span>
        <reason.icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-base font-bold leading-snug text-gray-900">{reason.title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{reason.reasoning}</p>
    </div>
  )
}

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
      {/* Background — a ruled "notebook page", distinct from every other section */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 38px, rgba(201, 162, 39,0.07) 39px)",
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
          subtitle="A considered reason behind every choice we make on site."
          className="mb-12 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — brand narrative, pinned note card, sticky on desktop */}
          <motion.div {...animProps} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="relative -rotate-1 rounded-sm border border-black/5 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:p-8">
              <span className="absolute -top-3 left-8 h-6 w-16 -rotate-3 bg-amber-200/70 shadow-sm" aria-hidden="true" />
              <Quote className="mb-4 h-8 w-8 text-gold-300" aria-hidden="true" />
              <p className="mb-4 font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                Since 2019, one rule has never changed: we measure the room ourselves before we
                quote it.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                Araria's monsoon ruins anything that isn't genuinely waterproof — so PVC and UV
                marble go in wet rooms, gypsum stays in dry ones. No exceptions, even on request.
              </p>
              <p className="mb-5 rounded-lg border-l-2 border-gold-300 bg-gold-50/50 py-2 pl-3 pr-2 text-sm leading-relaxed text-gray-600">
                Based in Narpatganj, working daily across Forbesganj and Araria district. One team,
                one standard — bedroom or commercial floor.
              </p>
              <div className="flex items-center gap-3 border-t border-dashed border-gray-200 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-700 text-sm font-black text-white">
                  JK
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">JK Interior, established 2019</p>
                  <p className="text-xs text-gray-500">Narpatganj &amp; Forbesganj, Araria district, Bihar</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — reasoning list as marginalia on desktop */}
          <motion.div {...staggerContainer} className="hidden lg:col-span-7 lg:block">
            <div className="divide-y divide-dashed divide-gold-900/10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  {...staggerItem}
                  className="group flex gap-5 py-5 pl-1 sm:py-6"
                >
                  <span className="w-12 shrink-0 font-serif text-4xl font-black leading-none text-gold-900/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 border-l-2 border-transparent pl-5 transition-colors duration-300 group-hover:border-gold-400">
                    <div className="mb-1.5 flex items-center gap-2">
                      <reason.icon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{reason.reasoning}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE & TABLET: swipeable reason cards */}
      <div className="relative z-10 mt-10 lg:hidden">
        <SwipeRail
          ariaLabel="Why customers choose JK Interior"
          itemClassName="w-[80%] sm:w-[52%]"
          fadeColor="#f7f2e6"
          arrows={false}
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} />
          ))}
        </SwipeRail>
        <SwipeHint className="mt-3" />
      </div>

      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>JK Interior is the most trusted interior design company in Forbesganj and Araria, Bihar. We provide premium quality PVC false ceiling installation, gypsum ceiling design, WPC wall paneling, UV marble sheet, and modular TV unit design with 1-year written warranty and free site visits.</p>
      </div>
    </section>
  )
}
