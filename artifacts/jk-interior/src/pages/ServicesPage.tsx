import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { MapPin } from "lucide-react"
import { CITIES } from "@/lib/seo"
import { SERVICE_CITY_SERVICES } from "@/lib/service-city-data"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

export default function ServicesPage() {
  return (
    <main>
      <SeoHead
        title="False Ceiling & Interior Design Services in Forbesganj, Araria Bihar"
        description="JK Interior offers PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, modular TV unit, bedroom interior and office interior services in Forbesganj, Araria, Bihar. Starting ₹45/sq.ft. Free site visit."
        canonical="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "JK Interior Services",
          description: "Interior design and false ceiling services in Bihar",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "PVC False Ceiling", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 2, name: "Gypsum Ceiling", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 3, name: "WPC Wall Panel", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 4, name: "UV Marble Sheet", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 5, name: "Modular TV Unit", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 6, name: "Bedroom Interior", url: "https://www.jkinterior.online/services" },
            { "@type": "ListItem", position: 7, name: "Office Interior", url: "https://www.jkinterior.online/services" }
          ]
        }}
      />
      <Navbar />
      <h1 className="sr-only">
        False Ceiling Contractor &amp; Interior Design Services in Forbesganj, Araria Bihar – Gypsum, PVC, WPC, TV Unit by JK Interior
      </h1>
      <div className="pt-28" />
      <Services />

          
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            Services by City
          </h2>
          <p className="mb-8 text-sm text-gray-500 max-w-2xl">
            Explore detailed pricing, photos, and FAQs for each service in your city.
          </p>
          <div className="space-y-6">
            {SERVICE_CITY_SERVICES.map((service) => (
              <div key={service.slug}>
                <div className="mb-2.5 flex items-center gap-2">
                  <service.icon className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-gray-800">{service.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <MapPin className="h-3 w-3" />
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      <section className="py-16 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#071126] to-[#0d1f3c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.1),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 space-y-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-400 text-base">
            Get a free quote for any of our services. We serve{" "}
            <Link href="/#areas" className="underline decoration-emerald-500 underline-offset-4 text-emerald-400 hover:text-emerald-300 transition-colors">
              Forbesganj, Araria, Narpatganj, Jogbani
            </Link>{" "}
            and all across Bihar. You can also{" "}
            <Link href="/gallery" className="underline decoration-emerald-500 underline-offset-4 text-emerald-400 hover:text-emerald-300 transition-colors">
              browse our recent false ceiling &amp; interior projects
            </Link>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink shine className="px-8 py-4 text-sm">Get Free Quote</CallLink>
            <WhatsAppLink message="Hi JK Interior, I need a free quotation" className="px-8 py-4 text-sm shadow-[0_4px_24px_rgba(37,205,102,0.3)]">
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
