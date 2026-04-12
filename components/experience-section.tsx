"use client"

import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-gold/10 scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[20%] top-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-gold/10 blur-[80px]" />
        <div className="absolute -right-[15%] bottom-[5%] h-[min(65vw,480px)] w-[min(65vw,480px)] rounded-full bg-gold/8 blur-[90px]" />
      </div>

      <div className="relative z-10">
        <WhyUs layout="experience" />
        <Gallery layout="experience" />
      </div>
    </section>
  )
}
