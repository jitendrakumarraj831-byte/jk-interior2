
import { ClipboardList, Hammer, CircleCheck as CheckCircle2, ArrowRight, Sparkles, Phone } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { CallLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Call / WhatsApp",
    titleHi: "संपर्क करें",
    desc: "Call or WhatsApp us to discuss your requirements. We'll schedule a free site visit at your convenience.",
    descHi: "Call या WhatsApp पर अपनी ज़रूरत बताएं। हम free site visit के लिए समय तय करेंगे।",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(37,99,235,0.25)",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Free Site Visit",
    titleHi: "मुफ़्त साइट विज़िट",
    desc: "Our expert visits your site, measures dimensions, and provides a detailed written quotation — absolutely free.",
    descHi: "हमारे एक्सपर्ट आपके घर आएंगे, measurement लेंगे, और लिखित quotation देंगे — बिल्कुल मुफ्त।",
    color: "from-amber-500 to-amber-700",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Panel-System Install",
    titleHi: "पैनल-सिस्टम इंस्टॉलेशन",
    desc: "Our crew works room by room on the schedule you were quoted — clip-and-panel wherever the design allows, so there's far less dust than a wet-plaster job.",
    descHi: "जो शेड्यूल बताया गया, उसी पर टीम कमरा-दर-कमरा काम करती है — जहाँ मुमकिन हो, गीले प्लास्टर की जगह पैनल सिस्टम, यानी कम धूल।",
    color: "from-emerald-500 to-emerald-700",
    glow: "rgba(5,150,105,0.25)",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "1 Year Warranty",
    titleHi: "1 साल की वारंटी",
    desc: "Project handed over with a written 1-year warranty. Your investment is fully protected with JK Interior.",
    descHi: "लिखित 1 साल की warranty के साथ project हैंडओवर। आपका investment पूरी तरह protected।",
    color: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.25)",
  },
]

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={Sparkles}
          badge="Our Process"
          headingSize="md"
          dark
          title={<>How It <span className="hero-gradient-text">Works</span></>}
          subtitle="From your first WhatsApp message to a signed warranty in hand — four steps, nothing skipped"
        />

        {/* Steps */}
        <motion.div {...staggerContainer} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.step} {...staggerItem} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+3.5rem)] top-14 hidden h-0.5 w-[calc(100%-1rem)] bg-gradient-to-r from-emerald-400/40 to-transparent lg:block z-20" />
              )}

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] sm:rounded-3xl">
                {/* Step number bg */}
                <div className="absolute -top-4 -right-2 text-7xl font-black text-white/5 select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 4px 24px ${step.glow}` }}
                >
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                {/* Step badge */}
                <div className="mb-3 inline-flex items-center justify-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
                  <span className="text-[10px] font-black text-emerald-300 tracking-widest">STEP {step.step}</span>
                </div>

                <h3 className="mb-1 text-lg font-bold text-white">{step.title}</h3>
                <p className="mb-3 text-xs font-semibold text-emerald-300/70">{step.titleHi}</p>
                <p className="mb-2 text-sm leading-relaxed text-slate-300">{step.desc}</p>
                <p className="text-xs leading-relaxed text-slate-500">{step.descHi}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...animProps} className="mt-14 text-center">
          <CallLink shine className="px-8 py-4 text-base font-bold">
            Start Your Project Today
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </CallLink>
        </motion.div>
      </div>
    </section>
  )
}
