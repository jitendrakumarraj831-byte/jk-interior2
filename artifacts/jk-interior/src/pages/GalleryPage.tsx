import Navbar from "@/components/navbar"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import PageCta from "@/components/ui/page-cta"
import { Sparkles } from "lucide-react"
import { useHashScroll } from "@/lib/hash-scroll"
import { buildBreadcrumbSchema } from "@/lib/seo"
import { buildGalleryJsonLd } from "@/lib/gallery-data"

export default function GalleryPage() {
  // `/gallery#gallery-<category>` deep links — the "View All" link on every
  // service page. Owned by the route, not by <Gallery />: Gallery is also
  // rendered by HomePage, which runs this itself, so having the component call it
  // too gave the home route two retry chains and two hashchange listeners
  // racing over the same anchor.
  useHashScroll()

  return (
    <main>
      <SeoHead
        title="Project Gallery: Ceilings, Panels & TV Units | JK Interior"
        description="Photos of gypsum, PVC and grid ceilings, partitions, WPC panels, UV marble walls, TV units and artificial grass installed by JK Interior near Forbesganj."
        canonical="/gallery"
        pageType="CollectionPage"
        jsonLd={[
          buildGalleryJsonLd(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />
      <Navbar />
      <PageHero
        icon={Sparkles}
        title={
          <>
            Our Work,{" "}
            <span className="hero-gradient-text">Photographed On Site</span>
          </>
        }
        subtitle="Ceilings, wall panels and TV units from homes and businesses around Forbesganj and Araria district — browse by service to see what your room could look like."
        whatsappMessage="Hello JK Interior, I've been browsing your gallery and would like a quote for a similar design."
      />
      <Gallery />
      <PageCta
        eyebrow="Like What You See?"
        title="Let's Build the Same Finish in Your Home"
        subtitle="Send us a photo from the gallery and your room size — we'll quote it before your free site visit even happens."
        whatsappMessage="Hello JK Interior, I saw a design in your gallery I'd like a quote for."
      />
      <Footer />
    </main>
  )
}
