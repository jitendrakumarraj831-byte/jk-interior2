"use client"

import { MapPin, Navigation, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

const areas = [
  "Forbesganj", "Araria", "Jogbani", "Narpatganj", "Raniganj",
  "Kursakanta", "Purnia", "Chhatapur", "Tribeniganj", "Supaul",
]

const hubPositions = [
  { top: "10%", left: "50%", rotate: -2 },
  { top: "25%", left: "15%", rotate: 4 },
  { top: "25%", left: "85%", rotate: -3 },
  { top: "45%", left: "30%", rotate: 5 },
  { top: "45%", left: "70%", rotate: -4 },
  { top: "65%", left: "15%", rotate: 3 },
  { top: "65%", left: "85%", rotate: -5 },
  { top: "85%", left: "50%", rotate: 2 },
  { top: "75%", left: "35%", rotate: -3 },
  { top: "75%", left: "65%", rotate: 4 },
]

export default function ServiceAreas() {
  return (
    <section id="areas" className="relative overflow-hidden border-y border-amber-100 bg-gradient-to-br from-slate-50 via-white to-amber-50/40 py-20 md:py-28 scroll-mt-28">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-72 h-72 bg-amber-200/20 blur-[100px] rounded-full" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-14 text-center" variants={fadeSlideUp}>
          <p className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
            <Navigation className="h-3 w-3" /> Service Areas
          </p>
          <h3 className="text-slate-900 text-3xl md:text-5xl font-black mb-6">
            Hamari <span className="text-amber-600">Pahunch</span>
          </h3>
        </motion.div>

        {/* Responsive Layout: Mobile par Grid, Desktop par Hub Visualizer */}
        <div className="relative">
          {/* Desktop Visualizer (Hidden on small screens) */}
          <div className="hidden md:block relative mx-auto aspect-[16/9] w-full max-w-4xl">
             <div className="absolute inset-10 rounded-full border border-dashed border-amber-200/50 animate-[spin_60s_linear_infinite]" />
             
             {areas.map((area, index) => {
                const pos = hubPositions[index] || { top: "50%", left: "50%" };
                return (
                  <motion.div
                    key={area}
                    variants={fadeSlideUpItem}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: pos.top, left: pos.left, rotate: `${pos.rotate || 0}deg` }}
                  >
                    <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 shadow-lg hover:z-50 hover:scale-110 hover:border-amber-400 transition-all cursor-default">
                      <MapPin className="h-4 w-4 text-amber-600 group-hover:scale-125 transition-transform" />
                      <span className="text-sm font-bold text-slate-800">{area}</span>
                    </div>
                  </motion.div>
                )
             })}
          </div>

          {/* Mobile Grid (Visible only on small screens) */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {areas.map((area) => (
              <div key={area} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-slate-700">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div className="mt-16 text-center" variants={fadeSlideUp}>
          <div className="mx-auto inline-block rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
            <p className="text-lg font-bold text-slate-900">Araria, Supaul और Purnia में उपलब्ध</p>
            <a href="tel:+918651070831" className="mt-4 flex items-center justify-center gap-2 text-amber-600 font-black hover:scale-105 transition-transform">
              <Phone size={18} /> Check Availability
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
