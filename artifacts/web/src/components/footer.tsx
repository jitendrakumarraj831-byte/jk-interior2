import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { getDistricts, getServices } from "@/lib/queries";

export async function Footer() {
  const [districts, services] = await Promise.all([getDistricts(), getServices()]);

  return (
    <footer className="mt-24 border-t border-border/60 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-serif text-lg font-bold">{BUSINESS.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{BUSINESS.tagline}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.district}, {BUSINESS.address.state} {BUSINESS.address.postalCode}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${BUSINESS.phone1}`} className="hover:text-primary">
                  {BUSINESS.phone1}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                {BUSINESS.hours}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">Services</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-primary">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-medium text-primary">
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">Areas We Serve</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {districts.map((d) => (
                <li key={d.slug}>
                  <Link href={`/areas-we-serve/${d.slug}`} className="hover:text-primary">
                    {d.name} District
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary">
                  Tools & Calculators
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-primary">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10" />
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
