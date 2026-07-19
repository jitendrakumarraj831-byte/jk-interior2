import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"

export default function AboutPage() {
  return (
    <main>
      <SeoHead
        title="About JK Interior – Best False Ceiling Contractor in Forbesganj, Araria Bihar"
        description="Learn about JK Interior – Bihar's most trusted interior contractor since 2016. 500+ projects, ISI-certified materials, 1-year written warranty. Serving Forbesganj, Araria, Purnia, Supaul and all of Bihar."
        canonical="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.jkinterior.online/#organization",
          name: "JK Interior",
          url: "https://www.jkinterior.online",
          logo: "https://www.jkinterior.online/logo.png",
          foundingDate: "2016",
          description: "Bihar's most trusted interior contractor – PVC false ceiling, gypsum ceiling, WPC wall panel and complete interior design since 2016.",
          telephone: ["+91-8541849118", "+91-8651070831"],
          email: "jkinteriorofficial@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Damaria",
            addressLocality: "Rewahi",
            addressRegion: "Bihar",
            postalCode: "854318",
            addressCountry: "IN"
          },
          sameAs: [
            "https://wa.me/918651070831",
            "https://www.facebook.com/share/1GpAKHZZtb/",
            "https://www.instagram.com/jk_interior_ceiling_designer"
          ],
          numberOfEmployees: { "@type": "QuantitativeValue", value: 10 }
        }}
      />
      <Navbar />
      <h1 className="sr-only">
        Best Interior Designer &amp; False Ceiling Contractor in Forbesganj, Araria Bihar – About JK Interior
      </h1>
      <div className="pt-28" />
      <WhyUs />
      <Testimonials />
      <Footer />
    </main>
  )
}
