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

/** Geometric offsets for "region hub" layout (percent of container) */
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
      className="relative overflow-hidden border-y border-gold/10 py-28 scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_55%)] blur-3xl" />
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-panel border-gold/25 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold">
            <Navigation className="h-3 w-3" />
            Service Areas / सेवा क्षेत्र
          </div>
          <h3 className="mb-4 text-balance font-sans text-3xl font-bold text-foreground md:text-5xl">
            <span className="mb-2 block text-center text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gold/70">
              Where We Serve
            </span>
            Region <span className="gold-text">Hub</span>
          </h3>
          <p className="mx-auto max-w-xl font-medium text-muted-foreground">
            Providing premium interior & false ceiling services across Bihar.
            <br />
            <span className="text-gold/80">
              बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="relative mx-auto aspect-[4/3] max-h-[min(72vh,560px)] w-full max-w-3xl md:aspect-[16/10]"
        >
          <div className="absolute inset-8 rounded-[40%] border border-gold/15 md:inset-10" />
          <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-dashed border-gold/20" />
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25 bg-gold/[0.04] blur-[1px] shadow-[0_0_60px_-12px_rgba(37,99,235,0.35)]" />

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
                <div className="flex items-center gap-2 rounded-2xl border border-gold/30 glass-panel px-4 py-2.5 shadow-[0_0_24px_-6px_rgba(37,99,235,0.25)] transition-transform duration-200 hover:scale-105 hover:border-gold/50">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold ring-1 ring-gold/35">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold tracking-tight text-foreground sm:text-sm">
                    {area}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div className="mt-16 text-center" variants={fadeSlideUp}>
          <div className="mx-auto inline-block max-w-2xl rounded-2xl border border-gold/20 glass-card p-6">
            <p className="text-base font-semibold text-foreground">
              {"Serving all surrounding locations in Araria, Supaul & Purnia districts"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              अररिया, सुपौल और पूर्णिया जिले के सभी प्रमुख क्षेत्रों में हमारी सेवाएं
              उपलब्ध हैं।
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
