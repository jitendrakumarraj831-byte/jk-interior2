"use client"

import { MapPin, Navigation, Phone, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

const areas = [
  { name: "Forbesganj", desc: "Main Hub", highlight: true },
  { name: "Araria", desc: "District HQ", highlight: true },
  { name: "Jogbani", desc: "Border Town" },
  { name: "Narpatganj", desc: "Nearby" },
  { name: "Raniganj", desc: "Served Area" },
  { name: "Kursakanta", desc: "Covered" },
  { name: "Purnia", desc: "Major City" },
  { name: "Chhatapur", desc: "Covered" },
  { name: "Tribeniganj", desc: "Covered" },
  { name: "Supaul", desc: "Served Area" },
]

const hubPositions = [
  { top: "8%", left: "50%", rotate: -2 },
  { top: "24%", left: "15%", rotate: 4 },
  { top: "24%", left: "85%", rotate: -3 },
  { top: "44%", left: "30%", rotate: 5 },
  { top: "44%", left: "70%", rotate: -4 },
  { top: "64%", left: "15%", rotate: 3 },
  { top: "64%", left: "85%", rotate: -5 },
  { top: "84%", left: "50%", rotate: 2 },
  { top: "74%", left: "35%", rotate: -3 },
  { top: "74%", left: "65%", rotate: 4 },
]

export default function ServiceAreas() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        },
      }

  return (
    <section id="areas" className="relative overflow-hidden py-20 md:py-28 scroll-mt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JK Interior",
            areaServed: areas.map((area) => ({
              "@type": "City",
              name: area.name,
              addressRegion: "Bihar",
            })),
          }),
        }}
      />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#071126] via-[#0a1630] to-[#071126]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.06),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5">
            <Navigation className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 sm:text-xs">Service Areas</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            हमारी <span className="hero-gradient-text">पहुंच</span>
          </h2>
          <p className="mx-auto max-w-xl text-base font-semibold text-slate-400">
            बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा — Araria, Supaul और Purnia जिलों में
          </p>
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-5 h-px w-32 origin-center rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>

        {/* Desktop Hub Map */}
        <div className="hidden md:block relative mx-auto mb-16 aspect-[16/10] w-full max-w-4xl">
          {!shouldReduce && (
            <>
              <motion.div
                className="absolute inset-12 rounded-full border border-dashed border-blue-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-24 rounded-full border border-dashed border-blue-400/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/6 blur-3xl" />

          <motion.div {...staggerContainer} className="absolute inset-0">
            {areas.map((area, index) => {
              const pos = hubPositions[index] || { top: "50%", left: "50%" }
              return (
                <motion.div
                  key={area.name}
                  {...staggerItem}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className={`group flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-lg transition-all duration-300 cursor-default backdrop-blur-sm hover:scale-110 hover:z-50 ${
                    area.highlight
                      ? "border-blue-400/40 bg-blue-600/20 shadow-[0_4px_20px_rgba(37,99,235,0.25)]"
                      : "border-blue-500/20 bg-[rgba(13,31,60,0.85)]"
                  }`}>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      area.highlight
                        ? "bg-blue-500 text-white"
                        : "bg-blue-500/15 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
                    }`}>
                      <MapPin className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className={`block text-sm font-bold ${area.highlight ? "text-blue-300" : "text-white"}`}>{area.name}</span>
                      <span className="block text-[9px] font-medium text-slate-500">{area.desc}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile Grid */}
        <motion.div {...staggerContainer} className="grid grid-cols-2 gap-3 md:hidden mb-12">
          {areas.map((area) => (
            <motion.div
              key={area.name}
              {...staggerItem}
              className={`flex items-center gap-2 rounded-xl border p-3.5 ${
                area.highlight
                  ? "border-blue-400/35 bg-blue-600/15"
                  : "border-blue-500/15 bg-[rgba(13,31,60,0.7)]"
              }`}
            >
              <MapPin className={`h-4 w-4 shrink-0 ${area.highlight ? "text-blue-400" : "text-slate-500"}`} />
              <div>
                <span className="block text-sm font-bold text-white">{area.name}</span>
                <span className="block text-[9px] text-slate-600">{area.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div {...animProps} className="text-center">
          <div className="mx-auto inline-block max-w-2xl w-full rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#0d1f3c]/80 to-[#071126]/90 p-8 shadow-[0_8px_40px_rgba(0,0,20,0.4)] backdrop-blur-sm">
            <p className="mb-2 text-base font-bold text-white md:text-lg">
              Araria, Supaul और Purnia के सभी प्रमुख क्षेत्रों में उपलब्ध
            </p>
            <p className="mb-6 text-sm text-slate-500">कहीं भी हो आपका घर — हम पहुंचेंगे</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+918651070831"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all hover:bg-blue-500 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Check Availability
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 px-6 py-3.5 text-sm font-bold text-blue-300 transition-all hover:border-blue-400/50 hover:bg-blue-500/20 active:scale-95"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
