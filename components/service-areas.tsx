"use client"

import { MapPin, Navigation, Phone } from "lucide-react"
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
      {/* सॉफ्ट बैकग्राउंड ग्लो (Matching your CTA) */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-72 h-72 bg-amber-200/20 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100/20 blur-[100px] rounded-full" />

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
          <p className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
            <Navigation className="h-3 w-3" />
            Service Areas / सेवा क्षेत्र
          </p>
          
          <h3 className="text-slate-900 text-3xl md:text-5xl font-black mb-6 leading-tight">
            Hamari <span className="text-amber-600">Pahunch</span>
          </h3>
          
          <p className="mx-auto max-w-xl font-semibold text-slate-700 leading-relaxed">
            Providing premium interior & false ceiling services across Bihar.
            <br />
            <span className="text-amber-600/90">
              बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा
            </span>
          </p>
        </motion.div>

        {/* Hub Visualizer */}
        <motion.div
          variants={staggerContainer}
          className="relative mx-auto aspect-[4/3] max-h-[min(72vh,560px)] w-full max-w-3xl md:aspect-[16/10]"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-8 rounded-[40%] border border-amber-200/30 md:inset-10" />
          <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-dashed border-slate-200" />
          
          {/* Central Glow Circle */}
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100 bg-white/40 shadow-[0_0_60px_-12px_rgba(245,158,11,0.2)] backdrop-blur-[2px]" />

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
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 shadow-lg shadow-slate-200/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:shadow-amber-200/50 group">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-colors">
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

        {/* Bottom Info Card - Matching CTA Style */}
        <motion.div className="mt-16 text-center" variants={fadeSlideUp}>
          <div className="mx-auto inline-block max-w-2xl rounded-2xl border border-amber-100 bg-white/80 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm">
            <p className="text-base md:text-lg font-bold text-slate-900">
              Araria, Supaul और Purnia जिले के सभी प्रमुख क्षेत्रों में उपलब्ध
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-600">
              हम आपके शहर में बेहतरीन <span className="text-amber-600">Interior Solutions</span> पहुँचाने के लिए प्रतिबद्ध हैं।
            </p>
            
            <div className="mt-6 flex justify-center">
               <a href="tel:+918651070831" className="flex items-center gap-2 text-amber-600 font-black text-sm hover:underline">
                 <Phone size={16} /> Check Availability in Your Area
               </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
