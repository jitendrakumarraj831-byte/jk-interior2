import { useState, useEffect } from "react"
import { Menu, X, MapPin, Phone } from "lucide-react"
import { Link, useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"

const navLinks = [
  { href: "/", label: "Home", caption: "Start here" },
  { href: "/services", label: "Services", caption: "Ceilings, panels & interiors" },
  { href: "/gallery", label: "Gallery", caption: "Completed projects" },
  { href: "/about", label: "About", caption: "Our story & standards" },
  { href: "/faq", label: "FAQ", caption: "Answers before you call" },
  { href: "/contact", label: "Contact", caption: "Book a free site visit" },
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
      {/* Utility strip — both official numbers stay visible above the fold on
          every page, on every screen size. */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-gold-500/15 bg-charcoal-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-1.5 sm:px-5">
          <p className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-200/90 sm:flex">
            <MapPin className="h-3 w-3 text-gold-400" aria-hidden="true" />
            Narpatganj · Forbesganj · Araria District, Bihar
          </p>
          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end sm:gap-4">
            <a
              href={`tel:${PHONE_PRIMARY}`}
              aria-label={`Call JK Interior on the primary line ${PHONE_PRIMARY_DISPLAY}`}
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-tight text-white transition-colors hover:text-gold-300 sm:text-xs"
            >
              <Phone className="h-3 w-3 text-gold-400" aria-hidden="true" />
              {PHONE_PRIMARY_DISPLAY}
            </a>
            <span className="text-gold-500/40" aria-hidden="true">|</span>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-tight text-white transition-colors hover:text-gold-300 sm:text-xs"
            >
              <Phone className="h-3 w-3 text-gold-400" aria-hidden="true" />
              {PHONE_SECONDARY_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "pointer-events-none fixed left-0 right-0 z-50 flex justify-center px-3 transition-all duration-300 sm:px-4",
          scrolled ? "top-9 sm:top-10" : "top-11 sm:top-12",
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto w-full max-w-6xl rounded-2xl border px-3 py-2.5 sm:px-5 sm:py-3 transition-all duration-300",
            scrolled
              ? "border-gold-500/25 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(201, 162, 39,0.12)] bg-white/95 backdrop-blur-xl"
              : "border-gold-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/85 backdrop-blur-xl"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="relative group shrink-0" aria-label="JK Interior – Home">
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-amber-400/15 via-gold-500/10 to-amber-400/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="/jk-interior-navbar-logo.webp"
                alt="JK Interior – False Ceiling Contractor & Interior Designer in Forbesganj, Araria Bihar"
                width={220}
                height={71}
                className="relative h-10 w-auto lg:h-11 xl:h-14 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
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
                        ? "text-gold-700 bg-gold-500/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-600"
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <CallLink size="sm" variant="outline" className="gap-2" ariaLabel={`Call JK Interior ${PHONE_PRIMARY_DISPLAY}`}>
                <span className="hidden xl:inline">{PHONE_PRIMARY_DISPLAY}</span>
                <span className="xl:hidden">Call</span>
              </CallLink>
              <WhatsAppLink
                size="sm"
                shine
                message="Hello JK Interior, I would like guidance on an interior design project."
                className="gap-2 bg-gold-700 font-black uppercase tracking-wide shadow-[0_4px_16px_rgba(201, 162, 39,0.35)] hover:bg-gold-600 hover:shadow-[0_4px_24px_rgba(201, 162, 39,0.5)]"
              >
                WhatsApp
              </WhatsAppLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl border border-gold-500/25 bg-gold-500/8 text-gold-700 hover:border-gold-500/40 hover:bg-gold-500/15 transition-all"
              aria-label="Toggle navigation menu"
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
                className="md:hidden overflow-hidden border-t border-gold-500/15 mt-3 pt-4"
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
                              ? "bg-gold-500/12 text-gold-700 border border-gold-500/25"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          <div>
                            <span className="block text-base font-bold">{link.label}</span>
                            <span className="block text-xs text-gold-600/70">{link.caption}</span>
                          </div>
                          {isActive && <div className="h-2 w-2 rounded-full bg-gold-600" />}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href={`tel:${PHONE_PRIMARY}`}
                      aria-label={`Call JK Interior on the primary line ${PHONE_PRIMARY_DISPLAY}`}
                      className="flex items-center justify-between rounded-xl border border-gold-500/30 bg-gold-500/8 px-5 py-3 text-gold-700 transition-colors hover:bg-gold-500/15"
                    >
                      <span className="flex items-center gap-2 text-sm font-black">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {PHONE_PRIMARY_DISPLAY}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gold-600/70">Primary</span>
                    </a>
                    <a
                      href={`tel:${PHONE_SECONDARY}`}
                      aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
                      className="flex items-center justify-between rounded-xl border border-gold-500/30 bg-gold-500/8 px-5 py-3 text-gold-700 transition-colors hover:bg-gold-500/15"
                    >
                      <span className="flex items-center gap-2 text-sm font-black">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {PHONE_SECONDARY_DISPLAY}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gold-600/70">Alternate</span>
                    </a>
                    <WhatsAppLink
                      shine
                      message="Hello JK Interior, I would like guidance on an interior design project."
                      className="bg-gold-700 px-5 py-3.5 text-base font-black shadow-[0_4px_20px_rgba(201, 162, 39,0.35)] hover:bg-gold-600 hover:shadow-[0_4px_20px_rgba(201, 162, 39,0.35)]"
                    >
                      Chat on WhatsApp
                    </WhatsAppLink>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 py-2">
                    <MapPin className="h-3 w-3 text-gold-600" />
                    Narpatganj • Forbesganj • Araria, Bihar
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
