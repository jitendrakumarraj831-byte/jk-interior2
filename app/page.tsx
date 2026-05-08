import type { Metadata } from "next"
import dynamic from "next/dynamic"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

const Services = dynamic(() => import("@/components/services"), {
  loading: () => <div className="min-h-[28rem]" aria-hidden />,
})

const Gallery = dynamic(() => import("@/components/gallery"), {
  loading: () => <div className="min-h-[30rem]" aria-hidden />,
})

const WhyUs = dynamic(() => import("@/components/why-us"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const ProcessTimeline = dynamic(() => import("@/components/process-timeline"), {
  loading: () => <div className="min-h-[20rem]" aria-hidden />,
})

const ServiceAreas = dynamic(() => import("@/components/service-areas"), {
  loading: () => <div className="min-h-[20rem]" aria-hidden />,
})

const FAQSection = dynamic(() => import("@/components/faq-section"), {
  loading: () => <div className="min-h-[20rem]" aria-hidden />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32" aria-hidden />,
})

export const metadata: Metadata = {
  title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
  description:
    "JK Interior provides gypsum ceiling, PVC ceiling, WPC wall paneling, UV marble sheet, TV unit design and modern interior services in Forbesganj, Araria and nearby Bihar areas.",
  keywords: [
    "interior designer Forbesganj",
    "gypsum ceiling Forbesganj",
    "PVC ceiling Bihar",
    "WPC wall panel Bihar",
    "UV marble sheet Forbesganj",
    "TV unit design Bihar",
    "false ceiling contractor Araria",
    "home interior Bihar",
    "JK Interior Bihar",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online",
  },
  openGraph: {
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "Premium gypsum ceiling, PVC ceiling, WPC wall panel and luxury interior services in Forbesganj & Araria Bihar.",
    url: "https://www.jkinterior.online",
    siteName: "JK Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.jkinterior.online/og-image.png",
        width: 1376,
        height: 677,
        alt: "JK Interior Forbesganj Bihar",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "Premium gypsum ceiling, PVC ceiling, WPC wall panel and luxury interior services in Bihar.",
    images: ["https://www.jkinterior.online/og-image.png"],
  },
}

const homeBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.jkinterior.online",
    },
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbJsonLd) }}
      />

      <h1 className="sr-only">
        Best Interior Designer and False Ceiling Contractor in Forbesganj,
        Araria Bihar – PVC Ceiling, Gypsum Ceiling, WPC Wall Panel,
        UV Marble Sheet and TV Unit Design by JK Interior
      </h1>

      <Navbar />
      <Hero />
      <Services />
      <ProcessTimeline />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <ServiceAreas />
      <FAQSection />
      <Contact />
      <Footer />
    </main>
  )
}
