import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
  description:
    "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers, grid ceiling and home decor services in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj.",
  keywords: [
    "interior designer Forbesganj",
    "best interior designer near me",
    "gypsum ceiling Forbesganj",
    "false ceiling Bihar",
    "POP ceiling design",
    "PVC wall panel Bihar",
    "WPC louvers design",
    "grid ceiling work",
    "home decor Forbesganj",
    "interior designer Araria",
    "JK Interior Bihar",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online",
  },
  openGraph: {
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers and home decor services in Forbesganj, Araria, Bihar.",
    url: "https://www.jkinterior.online",
    siteName: "JK Interior",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers and home decor services in Forbesganj, Araria, Bihar.",
  },
}

const homeBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jkinterior.online" },
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Preload LCP hero image early – it lives inside a client AnimatePresence
          so Next.js can't auto-detect it for priority preloading. */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-interior.jpg"
        // @ts-expect-error – fetchpriority is valid HTML, not yet in React types
        fetchpriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbJsonLd) }}
      />
      {/* Visually-hidden, SEO-only H1 (does not change UI) */}
      <h1 className="sr-only">
        Best Interior Designer & False Ceiling Contractor in Forbesganj, Araria Bihar – PVC Ceiling, Gypsum Ceiling, WPC Louvers & TV Unit by JK Interior
      </h1>
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
