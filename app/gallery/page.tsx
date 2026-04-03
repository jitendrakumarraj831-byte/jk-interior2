import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

// 🔥 HIGH POWER SEO Metadata
export const metadata = {
  title:
    "Interior Design Gallery in Forbesganj | PVC Panel, Gypsum, POP & False Ceiling Designs Bihar",

  description:
    "View JK Interior gallery of PVC wall paneling, gypsum ceiling, POP designs, grid ceiling, WPC louvers and modern home interior work in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj Bihar.",

  keywords:
    "interior design gallery forbesganj, pvc wall panel design forbesganj, gypsum ceiling gallery araria, pop design images bihar, false ceiling gallery jogbani, grid ceiling photos raniganj, wpc louvers design forbesganj, fluted panel design araria, tv panel design bihar, bedroom ceiling design bihar, modern interior gallery narpatganj, home interior photos jogbani, ceiling design raniganj kursakanta, interior work images chhatapur tribeniganj, best interior gallery bihar, pvc panel work near me, false ceiling work near me bihar, interior design ideas forbesganj bihar, jk interior gallery forbesganj"
}

export default function Page() {
  return (
    <>
      <Navbar />

      {/* 🔥 SEO H1 (hidden - design safe) */}
      <h1 style={{ display: "none" }}>
        Interior Design Gallery in Forbesganj Bihar – PVC Panel, Gypsum, POP & False Ceiling Designs
      </h1>

      <Gallery />
      <Footer />
    </>
  )
}
