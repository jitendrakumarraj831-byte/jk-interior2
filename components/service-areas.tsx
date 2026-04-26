"use client"

import { MapPin, Navigation, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

// TypeScript Interface for Safety
interface HubPosition {
  top: string;
  left: string;
  rotate?: number;
}

const areas = [
  "Forbesganj", "Araria", "Jogbani", "Narpatganj", "Raniganj",
  "Kursakanta", "Purnia", "Chhatapur", "Tribeniganj", "Supaul",
]

const hubPositions: HubPosition[] = [
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
    <section id="areas" className="relative overflow-hidden py-20 md:py-28 scroll-mt-28">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-72 h-72 bg-amber-200/20 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100/20 blur-[100px] rounded-full" />

      {/* SEO Schema */}
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
            description: "Premium Interior & False Ceiling services in Forbesganj, Araria, and Bihar.",
          }),
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-14 text-center" variants={fadeSlideUp}>
          <p className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
            <Navigation className="h-3 w-3" /> Service Areas / सेवा क्षेत्र
          </p>
          <h3 className="text-slate-900 text-3xl md:text-5xl font-black mb-6">
            Hamari <span className="aurora-text">Pahunch</span>
          </h3>
          <p className="mx-auto max-w-xl font-semibold text-slate-700 leading-relaxed">
            बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा
          </p>
        </motion.div>

        {/* Visualizer Container */}
        <div className="relative min-h-[400px] md:min-h-[560px]">
          
          {/* Desktop Visualizer (Hidden on Mobile) */}
          <div className="hidden md:block relative mx-auto aspect-[16/10] w-full max-w-4xl">
             <div className="absolute inset-10 rounded-full border border-dashed border-amber-200/40 animate-[spin_100s_linear_infinite]" />
             <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/30 blur-3xl" />
             
             {areas.map((area, index) => {
                const pos = hubPositions[index] || { top: "50%", left: "50%" };
                return (
                  <motion.div
                    key={area}
                    variants={fadeSlideUpItem}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                        top: pos.top, 
                        left: pos.left, 
                        rotate: pos.rotate ? `${pos.rotate}deg` : '0deg' 
                    }}
                  >
                    <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-4 py-2.5 shadow-lg hover:z-50 hover:scale-110 hover:border-amber-400 transition-all cursor-default backdrop-blur-sm">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <MapPin className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm font-bold text-slate-800">{area}</span>
                    </div>
                  </motion.div>
                )
             })}
          </div>

          {/* Mobile Grid (Hidden on Desktop) */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {areas.map((area) => (
              <motion.div 
                key={area} 
                variants={fadeSlideUpItem}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <MapPin className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-slate-700">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Card */}
        <motion.div className="mt-16 text-center" variants={fadeSlideUp}>
          <div className="mx-auto inline-block max-w-2xl rounded-2xl border border-amber-100 bg-white/80 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm">
            <p className="text-base md:text-lg font-bold text-slate-900">
              Araria, Supaul और Purnia के सभी प्रमुख क्षेत्रों में उपलब्ध
            </p>
            <div className="mt-6 flex justify-center">
               <a href="tel:+918651070831" className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200">
                 <Phone size={16} /> Check Availability in Your Area
               </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
