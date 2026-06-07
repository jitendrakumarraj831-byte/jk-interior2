import { lazy, Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import ProcessTimeline from "@/components/process-timeline"
import ServiceAreas from "@/components/service-areas"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import {
  GallerySkeleton,
  WhyUsSkeleton,
  TestimonialSkeleton,
  FAQSkeleton,
} from "@/components/loading-skeleton"

const Gallery = lazy(() => import("@/components/gallery"))
const WhyUs = lazy(() => import("@/components/why-us"))
const Testimonials = lazy(() => import("@/components/testimonials"))
const FAQSection = lazy(() => import("@/components/faq-section"))

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <SeoHead
        title="JK Interior – Best False Ceiling & Interior Designer in Forbesganj, Araria Bihar"
        description="JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet and modular TV unit installation in Forbesganj, Araria, Narpatganj, Jogbani, Purnia and across Bihar. Call +91 8651070831 for free site visit."
        canonical="/"
      />
      <h1 className="sr-only">
        Best Interior Designer and False Ceiling Contractor in Forbesganj,
        Araria Bihar – PVC Ceiling, Gypsum Ceiling, WPC Wall Panel,
        UV Marble Sheet and TV Unit Design by JK Interior
      </h1>
      <Navbar />
      <Hero />
      <Services />
      <ProcessTimeline />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<WhyUsSkeleton />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<TestimonialSkeleton />}>
        <Testimonials />
      </Suspense>
      <ServiceAreas />
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  )
}
