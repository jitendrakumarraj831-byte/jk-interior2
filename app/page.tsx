import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"
import ServiceAreas from "@/components/service-areas"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

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
<main>
<Navbar />
<Hero />
<Services />
<WhyUs />
<Gallery />
<ServiceAreas />
<Contact />
<Footer />
</main>
)
}
