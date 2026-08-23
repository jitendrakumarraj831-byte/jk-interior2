
import { useState, useEffect } from "react"
import { Menu, X, MapPin } from "lucide-react"
import { Link, useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const navLinks = [
  { href: "/", label: "Home", labelHi: "होम" },
  { href: "/services", label: "Services", labelHi: "सेवाएं" },
  { href: "/gallery", label: "Gallery", labelHi: "गैलरी" },
  { href: "/about", label: "About", labelHi: "हमारे बारे में" },
  { href: "/faq", label: "FAQ", labelHi: "सवाल-जवाब" },
  { href: "/contact", label: "Contact", labelHi: "संपर्क" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pathname] = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300",
          scrolled ? "top-2 sm:top-3" : "top-4 sm:top-5",
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto w-full max-w-6xl rounded-2xl border px-3 py-2.5 sm:px-5 sm:py-3 transition-all duration-300",
            scrolled
              ? "border-emerald-500/25 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(5,150,105,0.12)] bg-white/95 backdrop-blur-xl"
              : "border-emerald-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/85 backdrop-blur-xl"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="relative group shrink-0" aria-label="JK Interior – Home">
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-amber-400/15 via-emerald-500/10 to-amber-400/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="/logo.png"
                alt="JK Interior – False Ceiling Contractor & Interior Designer in Forbesganj, Araria Bihar"
                width={220}
                height={56}
                className="relative h-11 w-auto sm:h-14 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg",
                      isActive
                        ? "text-emerald-700 bg-emerald-500/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-600"
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <CallLink size="sm" variant="outline" className="gap-2" ariaLabel="Call JK Interior +91 8541849118">
                <span className="hidden xl:inline">+91 8541849118</span>
                <span className="xl:hidden">Call</span>
              </CallLink>
              <WhatsAppLink
                size="sm"
                shine
                message="नमस्ते JK Interior, मुझे इंटीरियर डिज़ाइन में मदद चाहिए।"
                className="gap-2 bg-emerald-700 font-black uppercase tracking-wide shadow-[0_4px_16px_rgba(5,150,105,0.35)] hover:bg-emerald-600 hover:shadow-[0_4px_24px_rgba(5,150,105,0.5)]"
              >
                WhatsApp
              </WhatsAppLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 text-emerald-700 hover:border-emerald-500/40 hover:bg-emerald-500/15 transition-all"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden border-t border-emerald-500/15 mt-3 pt-4"
              >
                <div className="flex flex-col gap-1 pb-3">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                            isActive
                              ? "bg-emerald-500/12 text-emerald-700 border border-emerald-500/25"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          <div>
                            <span className="block text-base font-bold">{link.label}</span>
                            <span className="block text-xs text-emerald-600/70">{link.labelHi}</span>
                          </div>
                          {isActive && <div className="h-2 w-2 rounded-full bg-emerald-600" />}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <div className="mt-3 flex flex-col gap-2">
                    <CallLink variant="outline" className="px-5 py-3">
                      +91 8541849118
                    </CallLink>
                    <WhatsAppLink
                      shine
                      message="नमस्ते JK Interior, मुझे इंटीरियर डिज़ाइन में मदद चाहिए।"
                      className="bg-emerald-700 px-5 py-3.5 text-base font-black shadow-[0_4px_20px_rgba(5,150,105,0.35)] hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(5,150,105,0.35)]"
                    >
                      Chat on WhatsApp
                    </WhatsAppLink>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 py-2">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    Forbesganj • Araria • Bihar
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

    </>
  )
}
