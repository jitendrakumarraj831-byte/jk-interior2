"use client"

import { Phone, ClipboardList, Hammer, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

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
    glow: "rgba(37,99,235,0.3)",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Free Site Visit",
    titleHi: "मुफ़्त साइट विज़िट",
    desc: "Our expert visits your site, measures dimensions, and provides a detailed written quotation — absolutely free.",
    descHi: "हमारे एक्सपर्ट आपके घर आएंगे, measurement लेंगे, और लिखित quotation देंगे — बिल्कुल मुफ्त।",
    color: "from-amber-500 to-amber-700",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Dust-Free Work",
    titleHi: "साफ़ इंस्टॉलेशन",
    desc: "Our skilled team starts installation with premium materials. Clean, fast, and professional work with zero mess.",
    descHi: "हमारी skilled team premium materials के साथ installation शुरू करती है। साफ़, तेज़ और professional काम।",
    color: "from-emerald-500 to-emerald-700",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "5 Year Warranty",
    titleHi: "5 साल की वारंटी",
    desc: "Project handed over with a written 5-year warranty. Your investment is fully protected with JK Interior.",
    descHi: "लिखित 5 साल की warranty के साथ project हैंडओवर। आपका investment पूरी तरह protected।",
    color: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.3)",
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#071126] to-[#0a1630]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.05),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div {...animProps} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Our Process</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            How It <span className="hero-gradient-text">Works</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-slate-400">
            Simple, transparent, and hassle-free — 4 easy steps to your dream interior
          </p>
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>

        {/* Steps */}
        <motion.div {...staggerContainer} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.step} {...staggerItem} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+3.5rem)] top-14 hidden h-0.5 w-[calc(100%-1rem)] bg-gradient-to-r from-blue-500/30 to-transparent lg:block z-20" />
              )}

              <div className="group relative overflow-hidden rounded-2xl border border-blue-500/15 bg-gradient-to-b from-[#0d1f3c]/80 to-[#071126]/90 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:shadow-[0_20px_60px_rgba(0,0,20,0.5)] sm:rounded-3xl">
                {/* Step number bg */}
                <div className="absolute -top-4 -right-2 text-7xl font-black text-slate-800/40 select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 4px 24px ${step.glow}` }}
                >
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                {/* Step badge */}
                <div className="mb-3 inline-flex items-center justify-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
                  <span className="text-[10px] font-black text-blue-400 tracking-widest">STEP {step.step}</span>
                </div>

                <h3 className="mb-1 text-lg font-bold text-white">{step.title}</h3>
                <p className="mb-3 text-xs font-semibold text-blue-400/60">{step.titleHi}</p>
                <p className="mb-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                <p className="text-xs leading-relaxed text-slate-600">{step.descHi}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...animProps} className="mt-14 text-center">
          <a
            href="tel:+918651070831"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_4px_24px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_4px_32px_rgba(37,99,235,0.55)] active:scale-95 luxury-animated-shine"
          >
            <Phone className="h-5 w-5" />
            Start Your Project Today
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
