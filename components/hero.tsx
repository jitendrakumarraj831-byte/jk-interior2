"use client"

import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const easeLux = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: "500+", label: "Projects Done" },
  { value: "8+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
]

const highlights = [
  { icon: Layers, text: "PVC & Gypsum False Ceiling" },
  { icon: PanelTop, text: "WPC Louvers & Wall Paneling" },
  { icon: Tv, text: "Modern TV Unit Design" },
  { icon: Sparkles, text: "Complete Interior Solutions" },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden bg-[#f0f7ff]">
      {/* Layered background: gradients + soft grid pattern */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundImage: "radial-gradient(at 0% 0%,rgba(37,99,235,0.10) 0px,transparent 55%),radial-gradient(at 100% 100%,rgba(29,78,216,0.08) 0px,transparent 55%)" }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -right-24 top-1/4 z-0 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 z-0 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-start justify-center gap-0 px-4 pt-24 pb-12 sm:pt-28 lg:px-8">

        {/* Top trust bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Forbesganj • Araria • Bihar
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50/80 px-3 py-1.5 backdrop-blur-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-800">
              5★ Rated
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Trusted Brand
            </span>
          </div>
        </motion.div>

        {/* Brand name with accent underline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: easeLux }}
          className="relative"
        >
          <div
            role="heading"
            aria-level={2}
            className="font-black leading-[0.9] tracking-tighter text-blue-950"
            style={{ fontSize: "clamp(3.2rem,10vw,6.5rem)" }}
          >
            JK
            <span className="ml-3 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(1.6rem,5vw,3rem)", letterSpacing: "0.12em" }}
            >
              INTERIOR
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: easeLux }}
            className="mt-1 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
          />
        </motion.div>

        {/* Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: easeLux }}
          className="mt-5 max-w-2xl space-y-3"
        >
          <h2 className="text-xl font-black leading-snug tracking-tight text-blue-950 md:text-3xl">
            डिज़ाइन जो{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">दिल जीत ले</span>,{" "}
            <br className="hidden sm:block" />
            फिनिशिंग जो{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">सालों चले</span>।
          </h2>
          <p className="text-base font-medium italic text-gray-700 md:text-lg">
            &quot;छत आपकी,{" "}
            <span className="text-blue-600 underline decoration-blue-200 underline-offset-2">
              पहचान हमारी
            </span>
            &quot;
          </p>
          <p className="border-l-4 border-blue-500 pl-4 text-sm leading-relaxed text-gray-600 md:text-base">
            घर, दुकान, ऑफिस और शोरूम के लिए प्रीमियम{" "}
            <span className="font-bold text-blue-900">
              PVC, जिप्सम, WPC पैनल, UV मार्बल शीट
            </span>{" "}
            और ग्रिड सीलिंग।
            <span className="mt-1 block font-semibold text-blue-950">
              बिहार का No.1 भरोसेमंद इंटीरियर ब्रांड।
            </span>
          </p>
        </motion.div>

        {/* Service highlights – premium icon cards */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: easeLux }}
          className="mt-7 grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {highlights.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="group flex items-center gap-3 rounded-xl border border-blue-100 bg-white/70 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-100"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm transition-transform group-hover:scale-110">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-blue-950">{text}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: easeLux }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-13 relative overflow-hidden rounded-full bg-blue-600 px-8 text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 luxury-animated-shine"
          >
            <a href="tel:+918651070831" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              प्रीमियम कोटेशन
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-13 relative overflow-hidden rounded-full border-blue-200 px-8 hover:bg-blue-50 luxury-animated-shine luxury-animated-shine--subtle"
          >
            <Link href="#services" className="flex items-center gap-2">
              हमारी सेवाएँ <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: easeLux }}
          className="mt-8 flex w-full max-w-2xl flex-wrap items-center gap-6 border-t border-blue-100 pt-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-xl font-black text-transparent md:text-2xl">
                {s.value}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
