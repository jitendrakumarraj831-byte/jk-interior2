import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact JK Interior Forbesganj | Get Free Quote – PVC, Gypsum & False Ceiling Bihar",
  description:
    "Contact JK Interior for PVC wall paneling, gypsum ceiling, POP design, grid ceiling and interior work in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj Bihar. Call now for best price.",
  keywords: [
    "contact interior designer forbesganj",
    "jk interior contact number forbesganj",
    "pvc panel work contact bihar",
    "gypsum ceiling contractor araria contact",
    "false ceiling contact jogbani",
    "best interior designer contact near me bihar",
    "jk interior forbesganj phone number",
    "interior contractor contact bihar",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online/contact",
  },
  openGraph: {
    title: "Contact JK Interior Forbesganj | Get Free Quote – Bihar",
    description:
      "Contact JK Interior for PVC wall paneling, gypsum ceiling, POP design and interior work across Forbesganj, Araria, Bihar. Free site visit & quote.",
    url: "https://www.jkinterior.online/contact",
    siteName: "JK Interior",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact JK Interior Forbesganj | Get Free Quote – Bihar",
    description:
      "Contact JK Interior for PVC wall paneling, gypsum ceiling and interior work in Forbesganj, Araria, Bihar. Free site visit & quote.",
  },
}

export default function Page() {
  return (
    <>
      <Navbar />

      <h1 className="sr-only">
        Contact JK Interior in Forbesganj Bihar for PVC Panel, Gypsum &amp; False Ceiling Work
      </h1>

      <Contact />
      <Footer />
    </>
  )
}
