import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { MapPin } from "lucide-react"
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
      

            {/* 🌟 New Cyberpunk & Glowing CTA Banner */}
      <section className="py-20 text-center relative overflow-hidden border-t border-gold-500/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#060c18] via-[#0b172a] to-[#050b14]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212, 175, 55,0.18),transparent_65%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 space-y-6">
          {/* Glowing Animated Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/40 px-4 py-1.5 text-xs font-semibold text-gold-300 shadow-[0_0_20px_rgba(212, 175, 55,0.2)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            Ready to Transform Your Space?
          </div>

          {/* Glowing Title */}
          <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Get Free Consultation &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
              Instant Quote Today
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get a free quote for any of our services. We serve{" "}
            <Link href="/#areas" className="font-semibold text-gold-400 hover:text-gold-300 underline decoration-gold-500/50 underline-offset-4 transition-colors">
              Forbesganj, Araria, Narpatganj, Jogbani
            </Link>{" "}
            and all across Bihar. You can also{" "}
            <Link href="/gallery" className="font-semibold text-gold-400 hover:text-gold-300 underline decoration-gold-500/50 underline-offset-4 transition-colors">
              browse our recent false ceiling &amp; interior projects
            </Link>.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-200">
            <span className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 backdrop-blur-sm">
              ✨ Free Site Visit
            </span>
            <span className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 backdrop-blur-sm">
              💰 Rates Starting ₹45/sq.ft.
            </span>
            <span className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 backdrop-blur-sm">
              🛠️ 100% Quality Finish
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <CallLink shine className="px-8 py-4 text-sm font-bold shadow-[0_0_25px_rgba(212, 175, 55,0.25)]">
              Get Free Quote
            </CallLink>
            <WhatsAppLink message="Hi JK Interior, I need a free quotation" className="px-8 py-4 text-sm font-bold shadow-[0_4px_24px_rgba(37,205,102,0.35)]">
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
