import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { Phone, MessageCircle } from "lucide-react"

export default function ServicesPage() {
  return (
    <>
      <SeoHead
        title="False Ceiling & Interior Design Services in Forbesganj, Araria Bihar"
        description="JK Interior offers PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, modular TV unit, bedroom interior and office interior services in Forbesganj, Araria, Bihar. Starting ₹70/sq.ft. Free site visit."
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
      <section className="py-16 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#071126] to-[#0d1f3c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 space-y-6">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-400 text-base">
            Get a free quote for any of our services. We serve{" "}
            <Link href="/#areas" className="underline decoration-blue-500 underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">
              Forbesganj, Araria, Narpatganj, Jogbani
            </Link>{" "}
            and all across Bihar. You can also{" "}
            <Link href="/gallery" className="underline decoration-blue-500 underline-offset-4 text-blue-400 hover:text-blue-300 transition-colors">
              browse our recent false ceiling &amp; interior projects
            </Link>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+918541849118"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-bold px-8 py-4 text-sm shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all active:scale-95 luxury-animated-shine"
            >
              <Phone className="h-4 w-4" />
              Get Free Quote
            </a>
            <a
              href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] text-white font-bold px-8 py-4 text-sm shadow-[0_4px_24px_rgba(37,205,102,0.3)] hover:bg-green-500 transition-all active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
