import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3">
  <Image
    src="/logo.png"
    alt="JK Interior Logo"
    width={140}
    height={50}
    className="object-contain h-10 w-auto"
  />
</div>

<p className="text-[10px] uppercase tracking-widest text-primary font-mono">
  Modern Interior & Ceiling
</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground font-mono">
              Premium interior design and ceiling solutions in Bihar.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground font-mono">
              बिहार में प्रीमियम इंटीरियर डिजाइन और सीलिंग सॉल्यूशन।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary font-mono">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "#home", label: "Home" },
                { href: "#services", label: "Services" },
                { href: "#why-us", label: "Why Us" },
                { href: "#gallery", label: "Gallery" },
                { href: "#areas", label: "Service Areas" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary font-mono"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary font-mono">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+918651070831"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary font-mono"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                +91 8651070831
              </a>
              <a
                href="tel:+918541849118"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary font-mono"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                +91 8541849118
              </a>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary font-mono"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                jkinteriorofficial@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground font-mono">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>Forbesganj Dumariya, Bihar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground font-mono">
            {`© ${new Date().getFullYear()} JK Interior. All rights reserved.`}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Designed with care for your dream interiors.
          </p>
        </div>
      </div>
    </footer>
  )
}
