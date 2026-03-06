"use client"

import { useState } from "react"
import { Phone, Mail, Menu, X, MapPin } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { href: "#home", label: "Home", labelHi: "होम" },
  { href: "#services", label: "Services", labelHi: "सेवाएं" },
  { href: "#why-us", label: "Why Us", labelHi: "क्यों चुनें" },
  { href: "#gallery", label: "Gallery", labelHi: "गैलरी" },
  { href: "#areas", label: "Areas", labelHi: "सेवा क्षेत्र" },
  { href: "#contact", label: "Contact", labelHi: "संपर्क" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="bg-surface-alt border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2 text-xs font-mono">
          <div className="flex items-center gap-4">
            <a
              href="tel:+918651070831"
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-3 w-3" />
              <span>+91 8651070831</span>
            </a>
            <a
              href="mailto:jkinteriorofficial@gmail.com"
              className="hidden items-center gap-1 text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              <Mail className="h-3 w-3" />
              <span>jkinteriorofficial@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Forbesganj, Bihar</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="gold-gradient flex h-10 w-10 items-center justify-center rounded-lg shadow-md">
              <span className="text-lg font-bold text-primary-foreground font-sans">JK</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground font-sans">
                JK Interior
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-primary font-mono">
                Modern Interior & Ceiling
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground font-mono"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://wa.me/918651070831"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:opacity-90 font-mono"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background px-4 pb-6 pt-4 lg:hidden animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground font-mono"
                >
                  {link.label} / {link.labelHi}
                </a>
              ))}
              <a
                href="https://wa.me/918651070831"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient mt-2 rounded-lg px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md font-mono"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
