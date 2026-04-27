import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Interior Design Services in Forbesganj | Gypsum, POP, PVC & WPC – JK Interior Bihar",
  description:
    "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers, grid ceiling and modern home decor services in Forbesganj, Araria, Narpatganj, Jogbani and across Bihar at affordable prices.",
  keywords: [
    "interior designer near me",
    "best interior designer in Forbesganj",
    "gypsum ceiling near me",
    "false ceiling near me",
    "POP ceiling design",
    "PVC wall panel near me",
    "grid ceiling work",
    "home decor near me",
    "interior designer Forbesganj Bihar",
    "gypsum ceiling Forbesganj",
    "false ceiling Araria",
    "PVC panel Narpatganj",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online/services",
  },
  openGraph: {
    title: "Interior Design Services in Forbesganj | Gypsum, POP, PVC & WPC – JK Interior",
    description:
      "Explore JK Interior's premium services: gypsum ceiling, POP design, PVC wall paneling, WPC louvers and grid ceiling in Forbesganj, Bihar.",
    url: "https://www.jkinterior.online/services",
    siteName: "JK Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.jkinterior.online/og-image.png",
        width: 1376,
        height: 677,
        alt: "JK Interior Services – Gypsum, POP, PVC & WPC in Forbesganj, Bihar",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Services in Forbesganj | JK Interior Bihar",
    description:
      "Gypsum ceiling, POP design, PVC wall paneling, WPC louvers and grid ceiling services in Forbesganj, Araria, Bihar.",
    images: ["https://www.jkinterior.online/og-image.png"],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jkinterior.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.jkinterior.online/services" },
  ],
}

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Interior & False Ceiling Services in Araria, Forbesganj Bihar",
  itemListElement: [
    "False Ceiling Contractor in Araria",
    "PVC Ceiling in Araria",
    "Gypsum Ceiling Services in Forbesganj",
    "Best Interior Designer in Forbesganj",
    "Wall Paneling Forbesganj",
    "WPC Louvers Installation Bihar",
    "TV Unit Design Araria",
    "False Ceiling in Jogbani, Raniganj, Narpatganj",
  ].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name,
      provider: { "@type": "LocalBusiness", name: "JK Interior" },
      areaServed: "Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Bihar",
    },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Navbar />

      <h1 className="sr-only">
        False Ceiling Contractor & Interior Design Services in Forbesganj, Araria Bihar – Gypsum, PVC, WPC, TV Unit by JK Interior
      </h1>

      <Services />

      <section className="py-16 text-center bg-blue-50/60">
        <div className="mx-auto max-w-2xl px-6 space-y-5">
          <h2 className="text-2xl font-black text-blue-950 md:text-3xl">
            Ready to Transform Your Space?
          </h2>
          <p className="text-muted-foreground">
            Get a free quote for any of our services. We serve{" "}
            <Link href="/#areas" className="underline decoration-blue-300 underline-offset-2 hover:text-blue-700" title="JK Interior service areas in Araria district">
              Forbesganj, Araria, Narpatganj, Jogbani
            </Link>{" "}
            and all across Bihar. You can also{" "}
            <Link href="/gallery" className="underline decoration-blue-300 underline-offset-2 hover:text-blue-700" title="View our false ceiling and interior design gallery in Araria">
              browse our recent false ceiling &amp; interior projects
            </Link>
            .
          </p>
          <Link
            href="/contact"
            title="Contact JK Interior Forbesganj for a free interior design quote"
            className="inline-flex items-center gap-2 rounded-full gold-gradient text-primary-foreground font-bold px-8 py-4 btn-luxury-glow luxury-animated-shine text-sm uppercase tracking-wide transition-all active:scale-95"
          >
            Get Free Quote →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
