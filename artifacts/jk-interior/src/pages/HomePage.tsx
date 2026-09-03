import { lazy, Suspense, useEffect } from "react"
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
import { BUSINESS, BUSINESS_SCHEMA_TYPES, CORE_SERVICES, SITE_URL, businessAddress, businessContactPoints, businessGeo } from "@/lib/seo"
import {
  GallerySkeleton,
  WhyUsSkeleton,
  FAQSkeleton,
} from "@/components/loading-skeleton"

const Gallery = lazy(() => import("@/components/gallery"))
const WhyUs = lazy(() => import("@/components/why-us"))
const FAQSection = lazy(() => import("@/components/faq-section"))

export default function HomePage() {
  // Deep-link support: /#areas (and similar in-page anchors) scroll to the matching section
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    let attempts = 0
    let t: ReturnType<typeof setTimeout>
    const tryScroll = () => {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else if (attempts < 10) {
        attempts++
        t = setTimeout(tryScroll, 150)
      }
    }
    t = setTimeout(tryScroll, 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SeoHead
        title="JK Interior | Best False Ceiling & Interior Designer in Forbesganj, Araria"
        description="Bihar's trusted interior contractor for Gypsum false ceiling, PVC & WPC louvers, UV marble sheets, and modular TV units. Call +91 8541849118 for free site visits."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": [...BUSINESS_SCHEMA_TYPES],
            "@id": `${SITE_URL}/#business`,
            name: BUSINESS.name,
            slogan: BUSINESS.tagline,
            description: "Bihar's trusted interior contractor for Gypsum false ceiling, PVC & WPC louvers, UV marble sheets, and modular TV units. Serving Forbesganj, Araria and Bihar since 2019.",
            url: SITE_URL,
            logo: `${SITE_URL}/jk-interior-navbar-logo.webp`,
            image: `${SITE_URL}/opengraph.jpg`,
            telephone: [BUSINESS.phone1, BUSINESS.phone2],
            email: BUSINESS.email,
            foundingDate: BUSINESS.founded,
            priceRange: BUSINESS.priceRange,
            contactPoint: businessContactPoints(),
            address: businessAddress(),
            geo: businessGeo(),
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                opens: "08:00",
                closes: "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Sunday"],
                opens: "09:00",
                closes: "18:00"
              }
            ],
            areaServed: [
              { "@type": "City", name: "Forbesganj" },
              { "@type": "City", name: "Araria" },
              { "@type": "City", name: "Purnia" },
              { "@type": "City", name: "Narpatganj" },
              { "@type": "City", name: "Jogbani" },
              { "@type": "City", name: "Supaul" },
              { "@type": "City", name: "Raniganj" },
              { "@type": "City", name: "Madhubani" },
              { "@type": "City", name: "Pratapganj" },
              { "@type": "City", name: "Triveniganj" },
              { "@type": "City", name: "Simrahi Bazar" },
              { "@type": "City", name: "Sarsi" },
              { "@type": "City", name: "Jadia" }
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "JK Interior Services",
              itemListElement: CORE_SERVICES.map((name) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
              })),
            },
            // No aggregateRating here on purpose. The ratings it used to assert
            // were not collected by this site, and Google's structured-data
            // policy treats self-serving review markup on your own business as
            // a manual-action risk. Real reviews live on the Google Business
            // Profile linked from sameAs below, where Google sources them
            // itself.
            sameAs: [
              "https://www.google.com/maps?cid=12398820263168117030",
              "https://wa.me/918541849118",
              "https://www.facebook.com/share/1GpAKHZZtb/",
              "https://www.instagram.com/jk_interior_ceiling_designer"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.jkinterior.online/#website",
            name: "JK Interior",
            url: "https://www.jkinterior.online",
            inLanguage: ["en-IN", "hi-IN"],
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.jkinterior.online/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://www.jkinterior.online/#faq",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a
              }
            }))
          }
        ]}
      />
      {/*
        The Hero renders the page's single visible <h1>. This block keeps the
        keyword-rich English summary crawlable without introducing a second H1
        (two H1s on one page is an SEO anti-pattern).
      */}
      <p className="sr-only">
        Best Interior Designer and False Ceiling Contractor in Forbesganj,
        Araria Bihar – PVC Ceiling, Gypsum Ceiling, WPC Wall Panel,
        UV Marble Sheet and TV Unit Design by JK Interior
      </p>
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
