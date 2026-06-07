import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"

export default function GalleryPage() {
  return (
    <>
      <SeoHead
        title="Interior Design Gallery – PVC Ceiling, WPC Panel, TV Unit Projects in Bihar"
        description="Browse JK Interior's gallery of 500+ completed interior design projects in Bihar. PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV unit work in Forbesganj and across Bihar."
        canonical="/gallery"
      />
      <Navbar />
      <h1 className="sr-only">
        Interior Design Gallery – JK Interior Forbesganj Bihar
      </h1>
      <div className="pt-28" />
      <Gallery />
      <Footer />
    </>
  )
}
