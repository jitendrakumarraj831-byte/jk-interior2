"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.png" alt={BUSINESS.name} width={40} height={40} className="rounded-lg" priority />
          <span className="font-serif text-lg font-bold text-foreground">{BUSINESS.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phone1}`}
            className="inline-flex items-center gap-2 rounded-xl gold-gradient px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" /> {BUSINESS.phone1}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border/60 bg-white px-4 py-3 space-y-1" aria-label="Primary mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${BUSINESS.phone1}`} className="block rounded-lg gold-gradient px-3 py-2.5 text-center text-sm font-bold text-white mt-2">
            Call {BUSINESS.phone1}
          </a>
        </nav>
      )}
    </header>
  );
}
