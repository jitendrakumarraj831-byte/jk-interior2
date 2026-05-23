import type { Metadata } from "next"
import dynamic from "next/dynamic"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

const Services = dynamic(() => import("@/components/services"), {
  loading: () => <div className="min-h-[28rem] bg-gradient-to-b from-white to-gray-50" aria-hidden />,
  ssr: true,
})

const Gallery = dynamic(() => import("@/components/gallery"), {
  loading: () => <div className="min-h-[30rem] bg-gradient-to-b from-gray-50 to-white" aria-hidden />,
  ssr: true,
})

const WhyUs = dynamic(() => import("@/components/why-us"), {
  loading: () => <div className="min-h-[24rem] bg-white" aria-hidden />,
  ssr: true,
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <div className="min-h-[24rem] bg-gradient-to-b from-white to-gray-50" aria-hidden />,
  ssr: true,
})

const ProcessTimeline = dynamic(() => import("@/components/process-timeline"), {
  loading: () => <div className="min-h-[20rem] bg-white" aria-hidden />,
  ssr: true,
})

const ServiceAreas = dynamic(() => import("@/components/service-areas"), {
  loading: () => <div className="min-h-[20rem] bg-gray-50" aria-hidden />,
  ssr: true,
})

const FAQSection = dynamic(() => import("@/components/faq-section"), {
  loading: () => <div className="min-h-[20rem] bg-white" aria-hidden />,
  ssr: true,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="min-h-[24rem] bg-gradient-to-b from-gray-50 to-white" aria-hidden />,
  ssr: true,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32 bg-gray-900" aria-hidden />,
  ssr: true,
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

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "JK Interior कौन-कौन सी services provide करती है?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JK Interior provides PVC False Ceiling, Gypsum Ceiling, WPC Wall Paneling, UV Marble Sheet, Modular TV Unit, Charcoal Panel, Louvers Panel, ACP Exterior, Complete Interior Design, Bedroom Interior, Office Interior, and Kitchen Interior services across Forbesganj, Araria, Purnia and surrounding Bihar areas.",
      },
    },
    {
      "@type": "Question",
      name: "PVC false ceiling की cost क्या होती है Forbesganj में?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PVC ceiling cost Araria/Forbesganj में typically 70-120 rupees per sq.ft होती है, जो panel quality, design और lighting के अनुसार vary करती है। Free site visit और detailed quotation के लिए +91 8651070831 पर call करें।",
      },
    },
    {
      "@type": "Question",
      name: "क्या आप free site visit provide करते हैं?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "हां, JK Interior free expert site visit और detailed quotation provide करती है — बिना किसी obligation के। हम Forbesganj, Araria और surrounding Bihar areas में free site visit देते हैं।",
      },
    },
    {
      "@type": "Question",
      name: "Installation कितने दिनों में complete होती है?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Room size और service के according, एक standard room की installation 1-3 days में complete होती है। हम on-time delivery guarantee करते हैं और project timeline पहले ही share करते हैं।",
      },
    },
    {
      "@type": "Question",
      name: "क्या materials waterproof हैं?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "हां, हमारे सभी products — PVC panels, WPC boards, और UV marble sheets — 100% waterproof हैं। ये Bihar के monsoon season को आसानी से withstand करते हैं। ISI-certified और branded materials use होते हैं।",
      },
    },
    {
      "@type": "Question",
      name: "Warranty कितनी मिलती है?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JK Interior हर project पर 5 साल की written warranty provide करती है। यह warranty materials और workmanship दोनों को cover करती है। Written document दिया जाता है।",
      },
    },
    {
      "@type": "Question",
      name: "आप कौन-कौन से areas में service करते हैं?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "हम Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul और Purnia में service provide करते हैं — Araria, Supaul और Purnia districts को cover करते हैं।",
      },
    },
    {
      "@type": "Question",
      name: "Payment के कौन-से options available हैं?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "हम Cash, UPI (GPay, PhonePe, Paytm), और Bank Transfer accept करते हैं। कोई hidden charges नहीं — transparent pricing हमेशा। Payment schedule project start से पहले discuss होता है।",
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
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
