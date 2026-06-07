import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"

export default function AboutPage() {
  return (
    <>
      <SeoHead
        title="About JK Interior – Best False Ceiling Contractor in Forbesganj, Araria Bihar"
        description="Learn about JK Interior – Bihar's most trusted interior contractor since 2016. 500+ projects, ISI-certified materials, 1-year written warranty. Serving Forbesganj, Araria, Purnia, Supaul and all of Bihar."
        canonical="/about"
      />
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
