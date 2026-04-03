import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Footer from "@/components/footer"

// 🔥 SEO Metadata (Trust + Local Ranking)
export const metadata = {
  title:
    "Why Choose JK Interior Forbesganj | Best Interior Designer in Bihar",

  description:
    "JK Interior is a trusted interior designer in Forbesganj offering PVC wall paneling, gypsum ceiling, POP design, grid ceiling and modern home interior services in Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj Bihar.",

  keywords:
    "best interior designer forbesganj, why choose jk interior, interior contractor araria bihar, pvc panel expert forbesganj, gypsum ceiling specialist narpatganj, pop design expert jogbani, false ceiling contractor raniganj kursakanta, home interior service chhatapur tribeniganj, trusted interior designer near me bihar, jk interior review forbesganj"
}

export default function Page() {
  return (
    <>
      <Navbar />

      {/* 🔥 Hidden SEO Heading */}
      <h1 style={{ display: "none" }}>
        Best Interior Designer in Forbesganj Bihar – JK Interior Services & Expertise
      </h1>

      <WhyUs />
      <Footer />
    </>
  )
}
