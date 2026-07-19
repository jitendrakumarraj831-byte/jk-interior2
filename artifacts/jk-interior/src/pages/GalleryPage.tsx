import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"

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
      <h1 className="sr-only">
        Interior Design Gallery – JK Interior Forbesganj Bihar
      </h1>
      <div className="pt-28" />
      <Gallery />
      <Footer />
    </main>
  )
}
