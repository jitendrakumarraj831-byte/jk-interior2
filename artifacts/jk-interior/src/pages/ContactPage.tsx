import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"

export default function ContactPage() {
  return (
    <>
      <SeoHead
        title="Contact JK Interior – Free Quote for Interior Design in Forbesganj Bihar"
        description="Contact JK Interior for a free site visit and quote. Call +91 8651070831 or WhatsApp for PVC ceiling, gypsum ceiling, WPC wall panel and interior design services in Forbesganj, Araria, Bihar."
        canonical="/contact"
      />
      <Navbar />
      <h1 className="sr-only">
        Contact JK Interior – Get Free Quote for Interior Design in Forbesganj Bihar
      </h1>
      <div className="pt-28" />
      <Contact />
      <Footer />
    </>
  )
}
