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
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.jkinterior.online/og-image.png",
        width: 1376,
        height: 677,
        alt: "JK Interior Project Gallery – PVC, Gypsum & False Ceiling Photos",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Gallery Forbesganj | JK Interior Bihar",
    description:
      "Browse JK Interior's photo gallery of completed projects: gypsum ceiling, PVC panels, WPC louvers and home interior work across Bihar.",
    images: ["https://www.jkinterior.online/og-image.png"],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jkinterior.online" },
    { "@type": "ListItem", position: 2, name: "Gallery", item: "https://www.jkinterior.online/gallery" },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <h1 className="sr-only">
        False Ceiling, PVC Panel & Interior Design Gallery – JK Interior Forbesganj, Araria Bihar
      </h1>

      <Gallery />
      <Footer />
    </>
  )
}
