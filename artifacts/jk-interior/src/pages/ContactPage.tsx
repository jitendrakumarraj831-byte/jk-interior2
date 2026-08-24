import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import { MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <main>
      <SeoHead
        title="Contact JK Interior – Free Quote for Interior Design in Forbesganj Bihar"
        description="Contact JK Interior for a free site visit and quote. Call +91 8541849118 or WhatsApp +91 8651070831 for PVC ceiling, gypsum ceiling, WPC wall panel and interior design in Forbesganj, Araria, Bihar."
        canonical="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": "https://www.jkinterior.online/contact",
          name: "Contact JK Interior",
          url: "https://www.jkinterior.online/contact",
          mainEntity: {
            "@type": "LocalBusiness",
            "@id": "https://www.jkinterior.online/#business",
            name: "JK Interior",
            telephone: ["+91-8541849118", "+91-8651070831"],
            email: "jkinteriorofficial@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Damaria Rewahi",
              addressLocality: "Forbesganj",
              addressRegion: "Bihar",
              postalCode: "854318",
              addressCountry: "IN"
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                opens: "08:00",
                closes: "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Sunday"],
                opens: "09:00",
                closes: "18:00"
              }
            ]
          }
        }}
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
      <Contact />
      <Footer />
    </main>
  )
}
