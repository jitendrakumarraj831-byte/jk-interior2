import { lazy, Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import BusinessSummary from "@/components/business-summary"
import ProcessTimeline from "@/components/process-timeline"
import Transformation from "@/components/transformation"
import CostEstimator from "@/components/cost-estimator"
import ServiceAreas from "@/components/service-areas"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { FAQS } from "@/lib/faq-data"
import { SITE_URL, buildFaqSchema, buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/seo"
import { SERVICES_SUMMARY } from "@/lib/services-summary"
import {
  GallerySkeleton,
  WhyUsSkeleton,
  FAQSkeleton,
} from "@/components/loading-skeleton"
import { useHashScroll } from "@/lib/hash-scroll"

const Gallery = lazy(() => import("@/components/gallery"))
const WhyUs = lazy(() => import("@/components/why-us"))
const FAQSection = lazy(() => import("@/components/faq-section"))

export default function HomePage() {
  // Deep-link support: /#areas, /#services and the like. Shared with the gallery
  // so both resolve an anchor the same way — see lib/hash-scroll.ts.
  useHashScroll()

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SeoHead
        title="JK Interior | False Ceiling & Interior Contractor, Forbesganj"
        description="Gypsum, PVC and grid false ceilings, partition walls, WPC wall panels, UV marble sheets and TV units in Forbesganj, Araria and nearby. Free site visit."
        canonical="/"
        jsonLd={[
          // The one complete LocalBusiness entity on the site. Every other
          // page refers to it by @id rather than repeating it.
          buildLocalBusinessSchema(SERVICES_SUMMARY.map(({ name, slug }) => ({ name, slug }))),
          buildWebSiteSchema(),
          { ...buildFaqSchema(FAQS), "@id": `${SITE_URL}/#faq` },
        ]}
      />
      <Navbar />
      <Hero />
      <BusinessSummary />
      <Services />
      <ProcessTimeline />
      <Transformation />
      <CostEstimator />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<WhyUsSkeleton />}>
        <WhyUs />
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
