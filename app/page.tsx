import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

const Services = dynamic(() => import("@/components/services"), {
  loading: () => <div className="min-h-[28rem]" aria-hidden />,
})

const ExperienceSection = dynamic(() => import("@/components/experience-section"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const ServiceAreas = dynamic(() => import("@/components/service-areas"), {
  loading: () => <div className="min-h-[20rem]" aria-hidden />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32" aria-hidden />,
})

// ✅ SEO Metadata (sirf add hua hai, niche code same hai)
export const metadata = {
title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
description:
"JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers, grid ceiling and home decor services in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj.",
keywords:
"interior designer Forbesganj, best interior designer near me, gypsum ceiling Forbesganj, false ceiling Bihar, POP ceiling design, PVC wall panel Bihar, WPC louvers design, grid ceiling work, home decor Forbesganj, interior designer Araria, JK Interior Bihar",
}

export default function Home() {
return (
<main className="min-h-screen">
<Navbar />
<Hero />
<Services />
<ExperienceSection />
<ServiceAreas />
<Contact />
<Footer />
</main>
)
}
