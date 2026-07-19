import { Link } from "wouter"
import { Helmet } from "react-helmet-async"
import { Compass, Home, LayoutGrid, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const quickLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Our Services", icon: LayoutGrid },
  { href: "/gallery", label: "Work Gallery", icon: Compass },
]

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | JK Interior</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f0fdf4]" />
          <div className="absolute inset-0 grid-texture opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-6">
          <p className="mb-4 text-7xl font-black tracking-tight text-emerald-600 sm:text-8xl">404</p>
          <h1 className="mb-4 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            यह पेज नहीं मिला — <span className="hero-gradient-text">Page Not Found</span>
          </h1>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
            जो पेज आप ढूंढ रहे हैं वो हट गया है या मिल नहीं रहा। हमारी सर्विस और गैलरी देखिए, या फ्री कोटेशन के लिए संपर्क कीजिए।
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/8 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/15"
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <CallLink shine>Free Quote के लिए कॉल करें</CallLink>
            <WhatsAppLink message="नमस्ते JK Interior, मैं एक खराब पेज पर पहुंच गया — मदद चाहिए।">WhatsApp करें</WhatsAppLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
