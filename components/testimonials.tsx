"use client"

import { Star, Quote, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const easeLux = [0.22, 1, 0.36, 1] as const

const testimonials = [
  {
    name: "Rahul Kumar",
    location: "Forbesganj",
    rating: 5,
    text: "JK Interior ने हमारे घर का PVC false ceiling बेहद खूबसूरती से लगाया। काम की quality और speed दोनों exceptional थी। पूरे Forbesganj में best interior work!",
    service: "PVC False Ceiling",
    initials: "RK",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Priya Sharma",
    location: "Araria",
    rating: 5,
    text: "Gypsum ceiling के लिए JK Interior को hire किया। Result देखकर neighbors भी impressed हो गए। Professional team, clean work, और 5 साल की warranty। Highly recommended!",
    service: "Gypsum Ceiling",
    initials: "PS",
    color: "from-violet-500 to-violet-700",
  },
  {
    name: "Amit Singh",
    location: "Jogbani",
    rating: 5,
    text: "WPC wall paneling का काम बहुत अच्छा किया। Termite-proof और waterproof panels लगाए। TV unit design भी बहुत stylish आया। Forbesganj का सबसे trusted interior contractor!",
    service: "WPC Wall Panel",
    initials: "AS",
    color: "from-amber-500 to-amber-700",
  },
  {
    name: "Sunita Devi",
    location: "Narpatganj",
    rating: 5,
    text: "UV marble sheet लगवाई पूरे bedroom में। Marble जैसा ही look आया but cost बहुत कम था। Dust-free installation और quick delivery। बहुत खुश हूं JK Interior से!",
    service: "UV Marble Sheet",
    initials: "SD",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Deepak Gupta",
    location: "Purnia",
    rating: 5,
    text: "Complete home interior का काम JK Interior को दिया। Ceiling से lekr TV unit तक सब कुछ perfect। On-time delivery और zero hidden charges। Bihar का best interior designer!",
    service: "Complete Interior",
    initials: "DG",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    name: "Meena Yadav",
    location: "Raniganj",
    rating: 5,
    text: "Free site visit के लिए आए, detailed quotation दिया, और काम शुरू किया। हर step professional था। 5 साल की warranty और quality material। Raniganj में JK Interior best है!",
    service: "PVC False Ceiling",
    initials: "MY",
    color: "from-blue-600 to-blue-800",
  },
]

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

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
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
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#071126] to-[#0a1630]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.06),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div {...animProps} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5">
            <Star className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Client Reviews</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            100+ Satisfied <span className="hero-gradient-text">Customers</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            हमारे customers की real reviews — Bihar भर में 100+ successful projects
          </p>
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 h-px w-32 origin-center bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          />
        </motion.div>

        {/* Rating Summary */}
        <motion.div {...animProps} className="mb-10 flex justify-center">
          <div className="glass-card px-8 py-5 flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-amber-400">5.0</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-blue-500/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">100+</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Reviews</div>
            </div>
            <div className="h-12 w-px bg-blue-500/20" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">Bihar</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Wide Service</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              {...staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0d1f3c]/80 to-[#071126]/90 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-[0_20px_60px_rgba(0,0,20,0.6)] sm:rounded-3xl"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-500/15" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="mb-5 text-sm leading-relaxed text-slate-300 sm:text-base">{t.text}</p>

              {/* Service Badge */}
              <div className="mb-4 inline-flex items-center gap-1 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-400">
                {t.service}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-blue-500/10 pt-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-white text-xs font-black shadow-lg`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3 text-blue-400" />
                    {t.location}, Bihar
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...animProps} className="mt-14 text-center">
          <p className="mb-5 text-base text-slate-400">अपने घर को भी दें premium interior का look</p>
          <a
            href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20want%20to%20get%20interior%20work%20done."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_4px_24px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_4px_32px_rgba(37,99,235,0.55)] active:scale-95"
          >
            Get Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
