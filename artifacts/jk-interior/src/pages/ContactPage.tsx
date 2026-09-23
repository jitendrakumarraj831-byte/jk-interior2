import Navbar from "@/components/navbar"
import BusinessSummary from "@/components/business-summary"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import { MessageCircle } from "lucide-react"
import { BUSINESS, PHONE1_DISPLAY, buildBreadcrumbSchema } from "@/lib/seo"

export default function ContactPage() {
  return (
    <main>
      <SeoHead
        title="Contact JK Interior – Free Site Visit in Forbesganj"
        description={`Call or WhatsApp ${PHONE1_DISPLAY} for a free site visit. Workshop at ${BUSINESS.address.street}, ${BUSINESS.address.city}; we cover Araria district, Purnia and Supaul.`}
        canonical="/contact"
        pageType="ContactPage"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Navbar />
      <PageHero
        icon={MessageCircle}
        title={
          <>
            Let&rsquo;s Talk About{" "}
            <span className="hero-gradient-text">Your Space</span>
          </>
        }
        subtitle="Call either line, message us on WhatsApp, or fill the form below — a real person from our team replies within two hours, not a bot."
        whatsappMessage="Hello JK Interior, I would like to discuss an interior project."
        whatsappLabel="Chat on WhatsApp"
      />
      <BusinessSummary />
      <Contact />
      <Footer />
    </main>
  )
}
