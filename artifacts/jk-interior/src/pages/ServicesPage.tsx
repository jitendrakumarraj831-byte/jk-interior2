import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import PageCta from "@/components/ui/page-cta"
import { Layers } from "lucide-react"
import { buildBreadcrumbSchema } from "@/lib/seo"
import { buildServicesJsonLd } from "@/lib/services-summary"

export default function ServicesPage() {
  return (
    <main>
      <SeoHead
        title="Our Services: Ceilings, Partitions & Panels | JK Interior"
        description="Eight services with published rates: gypsum, PVC and grid ceilings, partition walls, WPC panels, UV marble, TV units and artificial grass. Free site visit."
        canonical="/services"
        pageType="CollectionPage"
        jsonLd={[
          buildServicesJsonLd(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
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
        subtitle="Gypsum, PVC, WPC panelling, UV marble, TV units and more — eight services, published rates and one accountable team, working from Forbesganj across Araria district and nearby."
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
