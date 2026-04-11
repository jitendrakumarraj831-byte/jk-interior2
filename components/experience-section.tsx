"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"

/**
 * Single “portfolio experience” band: both JSON-LD blocks render via WhyUs + Gallery
 * (WhyUsJsonLdScript + GalleryJsonLdScript). Anchor ids #why-us and #gallery preserved.
 */
export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.35, 0.55, 0.5, 0.35])

  return (
    <section
      ref={ref}
      id="experience"
      className="relative overflow-hidden border-y border-gold/10 bg-[#0A0A0B] scroll-mt-24"
    >
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <motion.div
          style={{ y: y1 }}
          className="absolute -left-[20%] top-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-gold/15 blur-[100px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -right-[15%] bottom-[5%] h-[min(65vw,480px)] w-[min(65vw,480px)] rounded-full bg-gold/10 blur-[110px]"
        />
      </motion.div>

      <div className="relative z-10">
        <WhyUs layout="experience" />
        <Gallery layout="experience" />
      </div>
    </section>
  )
}
