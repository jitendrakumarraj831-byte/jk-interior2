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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Services in Forbesganj | JK Interior Bihar",
    description:
      "Gypsum ceiling, POP design, PVC wall paneling, WPC louvers and grid ceiling services in Forbesganj, Araria, Bihar.",
  },
}

export default function Page() {
  return (
    <>
      <Navbar />

      <h1 className="sr-only">
        Interior Design Services in Forbesganj Bihar – Gypsum, POP, PVC & WPC by JK Interior
      </h1>

      <Services />

      <section className="py-16 text-center bg-blue-50/60">
        <div className="mx-auto max-w-2xl px-6 space-y-5">
          <h2 className="text-2xl font-black text-blue-950 md:text-3xl">
            Ready to Transform Your Space?
          </h2>
          <p className="text-muted-foreground">
            Get a free quote for any of our services. We serve Forbesganj, Araria, Narpatganj, Jogbani and all across Bihar.
          </p>
          <Link
            href="/contact"
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
