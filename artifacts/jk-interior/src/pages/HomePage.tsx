import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import ProcessTimeline from "@/components/process-timeline"
import ServiceAreas from "@/components/service-areas"
import FAQSection from "@/components/faq-section"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <h1 className="sr-only">
        Best Interior Designer and False Ceiling Contractor in Forbesganj,
        Araria Bihar – PVC Ceiling, Gypsum Ceiling, WPC Wall Panel,
        UV Marble Sheet and TV Unit Design by JK Interior
      </h1>
      <Navbar />
      <Hero />
      <Services />
      <ProcessTimeline />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <ServiceAreas />
      <FAQSection />
      <Contact />
      <Footer />
    </main>
  )
}
