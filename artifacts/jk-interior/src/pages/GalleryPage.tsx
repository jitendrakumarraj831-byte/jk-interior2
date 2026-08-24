import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import PageCta from "@/components/ui/page-cta"
import { Sparkles } from "lucide-react"

export default function GalleryPage() {
  return (
    <main>
      <SeoHead
        title="Interior Design Gallery – PVC Ceiling, WPC Panel, TV Unit Projects in Bihar"
        description="Browse JK Interior's gallery of 500+ completed interior design projects in Bihar. PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV unit work in Forbesganj and across Bihar."
        canonical="/gallery"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "@id": "https://www.jkinterior.online/gallery",
            name: "JK Interior – Project Gallery",
            description: "500+ completed interior design projects in Bihar – PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV units.",
            url: "https://www.jkinterior.online/gallery",
            author: {
              "@type": "LocalBusiness",
              "@id": "https://www.jkinterior.online/#business",
              name: "JK Interior"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jkinterior.online/" },
              { "@type": "ListItem", position: 2, name: "Gallery", item: "https://www.jkinterior.online/gallery" }
            ]
          }
        ]}
      />
      <Navbar />
      <PageHero
        icon={Sparkles}
        title={
          <>
            500+ Finished Rooms,{" "}
            <span className="hero-gradient-text">One Standard of Work</span>
          </>
        }
        subtitle="Real ceilings, panels and TV units from real homes across Narpatganj, Forbesganj and Araria — browse by service to see exactly what your room could look like."
        whatsappMessage="Hello JK Interior, I've been browsing your gallery and would like a quote for a similar design."
      />
      <Gallery />
      <PageCta
        eyebrow="Like What You See?"
        title="Let's Build the Same Finish in Your Home"
        subtitle="Send us a photo from the gallery and your room size — we'll quote it before your free site visit even happens."
        whatsappMessage="Hello JK Interior, I saw a design in your gallery I'd like a quote for."
      />
      <Footer />
    </main>
  )
}
