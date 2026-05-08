"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Phone, Menu, X, MapPin, MessageCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import JKChat from "./jk-chat"

const navLinks = [
  { href: "/", label: "Home", labelHi: "होम" },
  { href: "/services", label: "Services", labelHi: "सेवाएं" },
  { href: "/gallery", label: "Gallery", labelHi: "गैलरी" },
  { href: "/about", label: "About", labelHi: "हमारे बारे में" },
  { href: "/contact", label: "Contact", labelHi: "संपर्क" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
              ? "border-blue-500/30 shadow-[0_8px_40px_rgba(7,17,38,0.8),0_0_0_1px_rgba(37,99,235,0.15)] bg-[rgba(7,17,38,0.92)] backdrop-blur-xl"
              : "border-blue-500/20 shadow-[0_4px_24px_rgba(7,17,38,0.6)] bg-[rgba(7,17,38,0.75)] backdrop-blur-xl"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="relative group shrink-0">
              <div className="absolute -inset-2 rounded-xl bg-blue-600/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo.png"
                alt="JK Interior – False Ceiling Contractor & Interior Designer in Forbesganj, Araria Bihar"
                width={160}
                height={52}
                className="relative h-9 w-auto sm:h-10 object-contain brightness-200 saturate-0"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg",
                      isActive
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-blue-400"
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <a
                href="tel:+918651070831"
                className="flex items-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 px-3.5 py-2 text-[11px] font-bold text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">+91 8651070831</span>
                <span className="xl:hidden">Call</span>
              </a>
              <a
                href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20interior%20design%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_4px_24px_rgba(37,99,235,0.55)] transition-all duration-200 luxury-animated-shine"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/20 transition-all"
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
                className="lg:hidden overflow-hidden border-t border-blue-500/15 mt-3 pt-4"
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
                              ? "bg-blue-500/15 text-blue-300 border border-blue-500/25"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <div>
                            <span className="block text-base font-bold">{link.label}</span>
                            <span className="block text-xs text-blue-400/60">{link.labelHi}</span>
                          </div>
                          {isActive && <div className="h-2 w-2 rounded-full bg-blue-400" />}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href="tel:+918651070831"
                      className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-bold text-blue-300"
                    >
                      <Phone className="h-4 w-4" />
                      +91 8651070831
                    </a>
                    <a
                      href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20interior%20design%20help."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-base font-black text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] luxury-animated-shine"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 py-2">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    Forbesganj • Araria • Bihar
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <JKChat />
    </>
  )
}
