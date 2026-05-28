import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

export default function GalleryPage() {
  return (
    <>
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
