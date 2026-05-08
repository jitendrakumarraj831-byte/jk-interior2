"use client"

import { ShieldCheck, Droplets, Clock, Sparkles, Award, HeartHandshake, Gem, BadgeCheck } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const easeLux = [0.22, 1, 0.36, 1] as const

const reasons = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Materials",
    titleHi: "प्रीमियम क्वालिटी मटेरियल",
    desc: "We use only ISI-certified, branded materials for every installation. No compromises on quality — your home deserves the best.",
    descHi: "हर इंस्टॉलेशन में सिर्फ ISI-प्रमाणित, ब्रांडेड मटेरियल। क्वालिटी पर कोई समझौता नहीं।",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(37,99,235,0.3)",
    number: "01",
  },
  {
    icon: Droplets,
    title: "100% Waterproof Solutions",
    titleHi: "100% वॉटरप्रूफ समाधान",
    desc: "Every product we install is fully waterproof — PVC panels, WPC boards, and UV marble sheets built to withstand Bihar's monsoon.",
    descHi: "हमारा हर प्रोडक्ट पूरी तरह वॉटरप्रूफ है — बिहार की बारिश को सहने के लिए बना।",
    color: "from-cyan-500 to-cyan-700",
    glow: "rgba(6,182,212,0.3)",
    number: "02",
  },
  {
    icon: Clock,
    title: "Fast & On-Time Delivery",
    titleHi: "तेज़ और समय पर डिलीवरी",
    desc: "We respect your time. Our team completes projects on schedule with zero delays — from site visit to final finish.",
    descHi: "हम आपके समय का सम्मान करते हैं। साइट विज़िट से फाइनल फिनिश तक — शेड्यूल पर।",
    color: "from-amber-500 to-amber-700",
    glow: "rgba(245,158,11,0.3)",
    number: "03",
  },
  {
    icon: Sparkles,
    title: "Dust-Free Installation",
    titleHi: "डस्ट-फ्री इंस्टॉलेशन",
    desc: "Our clean installation process keeps your home spotless. No mess, no dust — just a beautiful new interior.",
    descHi: "हमारी साफ़ प्रक्रिया आपके घर को साफ़ रखती है। कोई गंदगी नहीं, सिर्फ़ खूबसूरती।",
    color: "from-emerald-500 to-emerald-700",
    glow: "rgba(16,185,129,0.3)",
    number: "04",
  },
  {
    icon: Award,
    title: "5 Year Written Warranty",
    titleHi: "5 साल की लिखित वारंटी",
    desc: "Every project comes with a written 5-year warranty. We stand behind our work — that's the JK Interior guarantee.",
    descHi: "हर प्रोजेक्ट के साथ 5 साल की लिखित वारंटी। हम अपने काम के पीछे खड़े हैं।",
    color: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.3)",
    number: "05",
  },
  {
    icon: HeartHandshake,
    title: "Free Site Visit & Quote",
    titleHi: "मुफ़्त साइट विज़िट और कोट",
    desc: "Get a free expert site visit and detailed quotation — no obligation, no hidden charges. Transparent pricing always.",
    descHi: "मुफ़्त एक्सपर्ट साइट विज़िट और विस्तृत कोटेशन — कोई छुपा हुआ खर्चा नहीं।",
    color: "from-blue-600 to-blue-800",
    glow: "rgba(37,99,235,0.3)",
    number: "06",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JK Interior",
  description: "Best interior designer in Forbesganj, Araria, Bihar. Specializing in PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV unit installation.",
  url: "https://www.jkinterior.online",
  telephone: "+918651070831",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Forbesganj",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "100",
  },
}

export default function WhyUs() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
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
          visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeLux } },
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#0d1f3c] to-[#0a1630]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,rgba(37,99,235,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(37,99,235,0.06),transparent)]" />
        <div className="absolute inset-0 grid-texture opacity-20" />
        {!shouldReduce && (
          <>
            <motion.div
              className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-500/6 blur-3xl"
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div {...animProps} className="mb-14 text-center sm:mb-16 lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 sm:text-xs">Why Choose Us</span>
          </div>

          <h2
            id="why-us-heading"
            className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Why JK Interior is{" "}
            <span className="hero-gradient-text">the Best Choice</span>
          </h2>

          <p className="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-400 sm:text-lg">
            फारबिसगंज और अररिया में इंटीरियर के लिए JK Interior सबसे भरोसेमंद
          </p>
          <p className="mx-auto max-w-xl text-sm text-slate-500 sm:text-base">
            Premium materials, expert craftsmanship, and a commitment to excellence — that's what sets us apart.
          </p>

          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
            className="mx-auto mt-6 h-px w-32 origin-center rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              {...staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0d1f3c]/80 to-[#071126]/90 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-[0_20px_60px_rgba(0,0,20,0.6)] sm:rounded-3xl sm:p-6 lg:p-7"
            >
              {/* Number */}
              <span className="absolute right-4 top-4 text-4xl font-black text-slate-800/60 transition-colors duration-300 group-hover:text-slate-700/70 sm:right-5 sm:top-5 sm:text-5xl">
                {reason.number}
              </span>

              {/* Icon */}
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${reason.color} shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}
                style={{ boxShadow: `0 4px 20px ${reason.glow}` }}
              >
                <reason.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-1 text-lg font-bold text-white sm:text-xl">{reason.title}</h3>
              <p className="mb-3 text-xs font-medium text-blue-400/70 sm:text-sm">{reason.titleHi}</p>
              <p className="mb-2 text-sm leading-relaxed text-slate-400 sm:text-base">{reason.desc}</p>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{reason.descHi}</p>

              {/* Hover glow border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
                style={{ boxShadow: `inset 0 0 0 1px ${reason.glow}` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          {...animProps}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 sm:mt-14 sm:gap-6 sm:text-base lg:mt-16"
        >
          <div className="flex items-center gap-2">
            <Gem className="h-4 w-4 text-amber-400" />
            <span>Trusted by 100+ Homeowners</span>
          </div>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-blue-400" />
            <span>ISI-Certified Materials</span>
          </div>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>5-Year Written Warranty</span>
          </div>
        </motion.div>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>JK Interior is the most trusted interior design company in Forbesganj and Araria, Bihar. We provide premium quality PVC false ceiling installation, gypsum ceiling design, WPC wall paneling, UV marble sheet, and modular TV unit design with 5-year written warranty and free site visits.</p>
      </div>
    </section>
  )
}
