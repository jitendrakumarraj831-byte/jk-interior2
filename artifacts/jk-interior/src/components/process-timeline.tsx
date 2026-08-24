import { ClipboardList, Hammer, CircleCheck as CheckCircle2, ArrowRight, Sparkles, Phone } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { CallLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Call or WhatsApp",
    subtitle: "Tell us about the space",
    desc: "Share the rooms, the finish you have in mind and your timeline. We book a free site visit at a time that suits you — no charge, no obligation.",
    color: "from-charcoal-500 to-charcoal-700",
    glow: "rgba(37,99,235,0.25)",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Free Site Visit",
    subtitle: "Measured, then quoted",
    desc: "Our supervisor measures every room, checks the ceiling height and moisture conditions, and hands you a written, itemised quotation — entirely free.",
    color: "from-amber-500 to-amber-700",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Panel-System Installation",
    subtitle: "Room by room, to schedule",
    desc: "Our crew works to the exact schedule you were quoted. Wherever the design permits we use clip-and-panel systems rather than wet plaster, so a home you are still living in stays far cleaner.",
    color: "from-gold-500 to-gold-700",
    glow: "rgba(201, 162, 39,0.25)",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Handover & Warranty",
    subtitle: "One year, in writing",
    desc: "The site is cleared and the project handed over with a written one-year warranty covering both materials and workmanship. Your investment stays protected.",
    color: "from-charcoal-500 to-charcoal-700",
    glow: "rgba(139,92,246,0.25)",
  },
]

type Step = (typeof steps)[number]

function StepCard({ step, showConnector }: { step: Step; showConnector?: boolean }) {
  return (
    <div className="relative h-full">
      {showConnector && (
        <div className="absolute left-[calc(50%+3.5rem)] top-14 hidden h-0.5 w-[calc(100%-1rem)] bg-gradient-to-r from-gold-400/40 to-transparent lg:block z-20" />
      )}

      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/30 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(212, 175, 55,0.15)] sm:rounded-3xl">
        {/* Step number watermark */}
        <div className="absolute -top-4 -right-2 select-none text-7xl font-black text-white/5" aria-hidden="true">
          {step.step}
        </div>

        {/* Icon */}
        <div
          className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
          style={{ boxShadow: `0 4px 24px ${step.glow}` }}
        >
          <step.icon className="h-7 w-7 text-white" aria-hidden="true" />
        </div>

        {/* Step badge */}
        <div className="mb-3 inline-flex items-center justify-center gap-1 self-center rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1">
          <span className="text-[10px] font-black tracking-widest text-gold-300">STEP {step.step}</span>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white">{step.title}</h3>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-300/70">{step.subtitle}</p>
        <p className="text-sm leading-relaxed text-slate-300">{step.desc}</p>
      </div>
    </div>
  )
}

export default function ProcessTimeline() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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

  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#071126] via-[#0a1830] to-[#0d1f3c]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(212, 175, 55,0.12),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={Sparkles}
          badge="Our Process"
          headingSize="md"
          dark
          title={<>How We <span className="hero-gradient-text">Work</span></>}
          subtitle="From your first WhatsApp message to a signed warranty in hand — four steps, none of them skipped."
        />
      </div>

      {/* MOBILE & TABLET: swipeable step rail */}
      <div className="relative z-10 lg:hidden">
        <SwipeRail
          ariaLabel="How JK Interior works, step by step"
          itemClassName="w-[80%] sm:w-[55%]"
          fadeColor="#0a1830"
          dark
          arrows={false}
        >
          {steps.map((step) => (
            <StepCard key={step.step} step={step} />
          ))}
        </SwipeRail>
        <SwipeHint dark className="mt-3" />
      </div>

      {/* DESKTOP: connected four-across timeline */}
      <div className="relative z-10 mx-auto hidden max-w-7xl px-5 sm:px-6 lg:block lg:px-12">
        <motion.div {...staggerContainer} className="grid grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.step} {...staggerItem}>
              <StepCard step={step} showConnector={i < steps.length - 1} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mt-14 text-center">
          <CallLink shine ariaLabel="Start your project today – call JK Interior" className="px-8 py-4 text-base font-bold">
            Start Your Project Today
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </CallLink>
        </motion.div>
      </div>
    </section>
  )
}
