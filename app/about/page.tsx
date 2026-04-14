import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About JK Interior Forbesganj | Trusted Interior Designer in Bihar",
  description:
    "JK Interior is a trusted interior designer in Forbesganj offering PVC wall paneling, gypsum ceiling, POP design, grid ceiling and modern home interior services in Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj Bihar.",
  keywords: [
    "best interior designer forbesganj",
    "why choose jk interior",
    "interior contractor araria bihar",
    "pvc panel expert forbesganj",
    "gypsum ceiling specialist narpatganj",
    "pop design expert jogbani",
    "trusted interior designer near me bihar",
    "jk interior review forbesganj",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online/about",
  },
  openGraph: {
    title: "About JK Interior Forbesganj | Trusted Interior Designer in Bihar",
    description:
      "Learn why JK Interior is Bihar's most trusted interior design company in Forbesganj, Araria, and surrounding districts.",
    url: "https://www.jkinterior.online/about",
    siteName: "JK Interior",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About JK Interior Forbesganj | Trusted Interior Designer in Bihar",
    description:
      "Learn why JK Interior is Bihar's most trusted interior design company in Forbesganj, Araria, and surrounding districts.",
  },
}

export default function Page() {
  return (
    <>
      <Navbar />

      <h1 className="sr-only">
        Best Interior Designer in Forbesganj Bihar – JK Interior Services &amp; Expertise
      </h1>

      <WhyUs />
      <Footer />
    </>
  )
}
