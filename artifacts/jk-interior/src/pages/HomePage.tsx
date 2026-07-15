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
const BeforeAfter = lazy(() => import("@/components/before-after"))
const MaterialBrands = lazy(() => import("@/components/material-brands"))
const PriceCalculator = lazy(() => import("@/components/price-calculator"))
const VideoTestimonials = lazy(() => import("@/components/video-testimonials"))
const EmiFinance = lazy(() => import("@/components/emi-finance"))

function SectionFallback() {
  return <div className="h-40 w-full" aria-hidden="true" />
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <SeoHead
        title="JK Interior – Best False Ceiling & Interior Designer in Forbesganj, Araria Bihar"
        description="JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet and modular TV unit installation in Forbesganj, Araria, Narpatganj, Jogbani, Purnia and across Bihar. Call +91 8541849118 for free site visit."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.jkinterior.online/#business",
            name: "JK Interior",
            description: "Bihar's most trusted interior contractor – PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet, modular TV unit and complete interior design since 2016.",
            url: "https://www.jkinterior.online",
            logo: "https://www.jkinterior.online/logo.png",
            image: "https://www.jkinterior.online/og-image.png",
            telephone: ["+91-8541849118", "+91-8651070831"],
            email: "jkinteriorofficial@gmail.com",
            foundingDate: "2016",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Dumariya",
              addressLocality: "Forbesganj",
              addressRegion: "Bihar",
              postalCode: "854318",
              addressCountry: "IN"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 26.3001,
              longitude: 87.2533
            },
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
              { "@type": "City", name: "Jogbani" },
              { "@type": "City", name: "Supaul" },
              { "@type": "City", name: "Narpatganj" },
              { "@type": "City", name: "Raniganj" },
              { "@type": "City", name: "Dumariya" }
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Interior Design Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "PVC False Ceiling" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gypsum Ceiling" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "WPC Wall Panel" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "UV Marble Sheet" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modular TV Unit" } }
              ]
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "100",
              bestRating: "5"
            },
            sameAs: [
              "https://wa.me/918651070831",
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
          }
        ]}
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
      <Suspense fallback={<SectionFallback />}>
        <BeforeAfter />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MaterialBrands />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PriceCalculator />
      </Suspense>
      <Suspense fallback={<WhyUsSkeleton />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<TestimonialSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <VideoTestimonials />
      </Suspense>
      <ServiceAreas />
      <Suspense fallback={<SectionFallback />}>
        <EmiFinance />
      </Suspense>
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  )
}
