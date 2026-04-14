import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Interior Design Gallery Forbesganj | PVC Panel, Gypsum & False Ceiling Photos – JK Interior",
  description:
    "View JK Interior's gallery of PVC wall paneling, gypsum ceiling, POP designs, grid ceiling, WPC louvers and modern home interior work in Forbesganj, Araria, Narpatganj, Jogbani and across Bihar.",
  keywords: [
    "interior design gallery forbesganj",
    "pvc wall panel design forbesganj",
    "gypsum ceiling gallery araria",
    "pop design images bihar",
    "false ceiling gallery jogbani",
    "wpc louvers design forbesganj",
    "fluted panel design araria",
    "tv panel design bihar",
    "bedroom ceiling design bihar",
    "modern interior gallery narpatganj",
    "jk interior gallery forbesganj",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online/gallery",
  },
  openGraph: {
    title: "Interior Design Gallery Forbesganj | PVC, Gypsum & False Ceiling Photos – JK Interior",
    description:
      "Browse JK Interior's photo gallery of completed projects: gypsum ceiling, PVC panels, WPC louvers and home interior work across Bihar.",
    url: "https://www.jkinterior.online/gallery",
    siteName: "JK Interior",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Gallery Forbesganj | JK Interior Bihar",
    description:
      "Browse JK Interior's photo gallery of completed projects: gypsum ceiling, PVC panels, WPC louvers and home interior work across Bihar.",
  },
}

export default function Page() {
  return (
    <>
      <Navbar />

      <h1 className="sr-only">
        Interior Design Gallery in Forbesganj Bihar – PVC Panel, Gypsum, POP &amp; False Ceiling Designs
      </h1>

      <Gallery />
      <Footer />
    </>
  )
}
