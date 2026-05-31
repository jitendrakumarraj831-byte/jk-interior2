import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <h1 className="sr-only">
        Best Interior Designer &amp; False Ceiling Contractor in Forbesganj, Araria Bihar – About JK Interior
      </h1>
      <div className="pt-28" />
      <WhyUs />
      <Testimonials />
      <Footer />
    </>
  )
}
