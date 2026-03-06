import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"
import ServiceAreas from "@/components/service-areas"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  )
}
