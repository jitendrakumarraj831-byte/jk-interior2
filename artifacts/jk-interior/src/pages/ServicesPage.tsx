import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import PageCta from "@/components/ui/page-cta"
import { Layers } from "lucide-react"

export default function ServicesPage() {
  return (
    <main>
      <SeoHead
        title="False Ceiling & Interior Design Services in Forbesganj, Araria Bihar"
        description="JK Interior offers PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, modular TV unit, bedroom interior and office interior services in Forbesganj, Araria, Bihar. Starting ₹45/sq.ft. Free site visit."
        canonical="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "JK Interior Services",
          description: "Interior design and false ceiling services in Bihar",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "PVC False Ceiling", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 2, name: "Gypsum Ceiling", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 3, name: "WPC Wall Panel", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 4, name: "UV Marble Sheet", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 5, name: "Modular TV Unit", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 6, name: "Bedroom Interior", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 7, name: "Office Interior", url: "https://www.jkinterior.online/services" }
          ]
        }}
      />
      <Navbar />
      <PageHero
        icon={Layers}
        title={
          <>
            False Ceiling &amp; Interior Design,{" "}
            <span className="hero-gradient-text">Done Right the First Time</span>
          </>
        }
        subtitle="Gypsum, PVC, WPC panelling, UV marble, TV units and more — nine services, transparent rates, one accountable team across Narpatganj, Forbesganj and Araria district."
        whatsappMessage="Hello JK Interior, I'd like to know more about your services and current rates."
      />
      <Services />
      <PageCta
        eyebrow="Ready to Transform Your Space?"
        title="Get a Free Consultation & Instant Quote"
        subtitle="Tell us which service you need and your room size — we'll call back with an honest rate the same day."
        whatsappMessage="Hello JK Interior, I'd like a free quotation for a service on your website."
      />
      <Footer />
    </main>
  )
}
