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
      "Every panel and board we fit carries ISI certification. We do not switch to cheaper unbranded stock to protect a margin, and you are welcome to inspect the material tag on site before installation begins.",
  },
  {
    icon: Droplets,
    title: "Specified for a four-month monsoon",
    reasoning:
      "PVC panels and UV marble sheets are waterproof by design rather than adapted from a drier-climate product line. That is precisely what rainfall across Araria district demands of a ceiling.",
  },
  {
    icon: Clock,
    title: "A day-by-day schedule, not a vague estimate",
    reasoning:
      "Before work starts you receive a written installation timeline — which day the ceiling goes up, which day the finishing happens, which day we hand over. No open-ended delays.",
  },
  {
    icon: Sparkles,
    title: "Panel systems in place of wet plaster",
    reasoning:
      "Wherever the design allows, we install clip-and-panel systems instead of wet plaster work. In a home you are still living in, that means meaningfully less dust and disruption.",
  },
  {
    icon: Award,
    title: "A signed warranty, not a verbal assurance",
    reasoning:
      "Every project is handed over with a written one-year warranty document covering materials and workmanship alike — in your hand on the day we finish.",
  },
  {
    icon: HeartHandshake,
    title: "The site visit costs nothing, either way",
    reasoning:
      "We measure, quote and explain the options free of charge — whether you appoint us or use the quotation to compare rates elsewhere. There is no fee and no obligation.",
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
          subtitle="There is a considered reason behind every choice we make on site — here are the six that matter most to you."
          className="mb-12 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — brand narrative, pinned note card, sticky on desktop */}
          <motion.div {...animProps} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="relative -rotate-1 rounded-sm border border-black/5 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:p-8">
              <span className="absolute -top-3 left-8 h-6 w-16 -rotate-3 bg-amber-200/70 shadow-sm" aria-hidden="true" />
              <Quote className="mb-4 h-8 w-8 text-gold-300" aria-hidden="true" />
              <p className="mb-4 font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                JK Interior began in 2019, fitting PVC ceilings for a handful of neighbours around
                Forbesganj. Several years and more than a hundred homes later, the discipline has not
                changed — we still measure the room ourselves before we quote it.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                What has changed is which materials we will put our name behind. The monsoon across
                Araria district ruins anything that is not genuinely waterproof, so PVC and UV marble
                are what we specify for wet rooms, and gypsum stays reserved for dry ones — even when
                a customer asks for the prettier option in the wrong place.
              </p>
              <p className="mb-5 rounded-lg border-l-2 border-gold-300 bg-gold-50/50 py-2 pl-3 pr-2 text-sm leading-relaxed text-gray-600">
                Our team operates out of Narpatganj and works daily across Forbesganj and the wider
                Araria district. Two officially listed numbers, one accountable team, and the same
                standard of finish on a single bedroom as on a full commercial floor.
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
