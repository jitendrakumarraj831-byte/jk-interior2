
import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden scroll-mt-24"
    >
      <div className="relative z-10">
        <WhyUs />
        <Gallery />
      </div>
    </section>
  )
}
