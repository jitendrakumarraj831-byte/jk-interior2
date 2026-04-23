"use client"

import { MapPin, Navigation } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

const areas = [
  "Forbesganj",
  "Araria",
  "Jogbani",
  "Narpatganj",
  "Raniganj",
  "Kursakanta",
  "Purnia",
  "Chhatapur",
  "Tribeniganj",
  "Supaul",
]

/** Geometric offsets for "region hub" layout */
const hubPositions: { top: string; left: string; rotate?: number }[] = [
  { top: "6%", left: "48%", rotate: -6 },
  { top: "18%", left: "12%", rotate: 4 },
  { top: "20%", left: "72%", rotate: -3 },
  { top: "38%", left: "32%", rotate: 8 },
  { top: "42%", left: "62%", rotate: -5 },
  { top: "58%", left: "18%", rotate: 3 },
  { top: "55%", left: "78%", rotate: -7 },
  { top: "72%", left: "44%", rotate: 5 },
  { top: "78%", left: "12%", rotate: -4 },
  { top: "82%", left: "68%", rotate: 6 },
]

export default function ServiceAreas() {
  return (
    <section
      id="areas"
      className="relative overflow-hidden border-y border-amber-100 bg-gradient-to-br from-slate-50 via-white to-amber-50/40 py-28 scroll-mt-28 shadow-xl shadow-slate-200/50"
    >
      {/* Background Glow Effects (Glow Circles) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Blue Glow */}
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />
        {/* Soft Amber Glow */}
        <div className="absolute -right-[10%] -bottom-[10%] h-[500px] w-[500px] rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JK Interior",
            areaServed: areas.map((area) => ({
              "@type": "City",
              name: area,
              addressRegion: "Bihar",
            })),
            description:
              "Premium Interior & False Ceiling services in Forbesganj, Araria, and surrounding Bihar regions.",
          }),
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-14 text-center" variants={fadeSlideUp}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/60 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold shadow-sm backdrop-blur-md">
            <Navigation className="h-3 w-3" />
            Service Areas / सेवा क्षेत्र
          </div>
          <h3 className="mb-4 text-balance font-sans text-3xl font-bold text-slate-900 md:text-5xl">
            <span className="mb-2 block text-center text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gold/70">
              Where We Serve
            </span>
            Region <span className="text-gold">Hub</span>
          </h3>
          <p className="mx-auto max-w-xl font-medium text-slate-600">
            Providing premium interior & false ceiling services across Bihar.
            <br />
            <span className="text-gold/80 font-semibold">
              बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा
            </span>
          </p>
        </motion.div>

        {/* Hub Visualizer */}
        <motion.div
          variants={staggerContainer}
          className="relative mx-auto aspect-[4/3] max-h-[min(72vh,560px)] w-full max-w-3xl md:aspect-[16/10]"
        >
          {/* Decorative Rings */}
          <div className="absolute inset-8 rounded-[40%] border border-gold/10 md:inset-10" />
          <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-dashed border-gold/20" />
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 bg-white/40 shadow-[0_0_60px_-12px_rgba(251,191,36,0.2)] backdrop-blur-[2px]" />

          {areas.map((area, index) => {
            const pos = hubPositions[index] ?? { top: "50%", left: "50%" }
            return (
              <motion.div
                key={area}
                variants={fadeSlideUpItem}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: pos.top,
                  left: pos.left,
                  rotate: pos.rotate ?? 0,
                }}
              >
                <div className="flex items-center gap-2 rounded-2xl border border-gold/30 bg-white/80 px-4 py-2.5 shadow-lg shadow-gold/5 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-gold/20">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold tracking-tight text-slate-800 sm:text-sm">
                    {area}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Info Card */}
        <motion.div className="mt-16 text-center" variants={fadeSlideUp}>
          <div className="mx-auto inline-block max-w-2xl rounded-2xl border border-amber-100 bg-white/70 p-6 shadow-md backdrop-blur-md">
            <p className="text-base font-semibold text-slate-900">
              {"Serving all surrounding locations in Araria, Supaul & Purnia districts"}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              अररिया, सुपौल और पूर्णिया जिले के सभी प्रमुख क्षेत्रों में हमारी सेवाएं
              उपलब्ध हैं।
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
