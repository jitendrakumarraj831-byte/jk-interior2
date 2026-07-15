import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { QuoteForm } from "@/components/quote-form";
import { BUSINESS } from "@/lib/constants";
import { getDistricts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact JK Interior for a free site visit and quotation — call, WhatsApp, or send a quick quote request.",
};

export default async function ContactPage() {
  const districts = await getDistricts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Get in Touch" title="Contact JK Interior" description="Free site visit, no obligation. We usually respond within a few hours." center={false} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="glass-card space-y-4 p-6">
              <a href={`tel:${BUSINESS.phone1}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                <Phone className="h-5 w-5 shrink-0 text-primary" /> {BUSINESS.phone1}
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#25D366]" /> WhatsApp: +{BUSINESS.whatsapp}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                <Mail className="h-5 w-5 shrink-0 text-primary" /> {BUSINESS.email}
              </a>
              <p className="flex items-center gap-3 text-foreground">
                <Clock className="h-5 w-5 shrink-0 text-primary" /> {BUSINESS.hours} · {BUSINESS.hoursSun}
              </p>
              <p className="flex items-start gap-3 text-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.district}, {BUSINESS.address.state} {BUSINESS.address.postalCode}
              </p>
            </div>

            <div className="glass-card overflow-hidden p-2">
              <iframe
                title="JK Interior office location"
                src={`https://www.google.com/maps?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=13&output=embed`}
                className="h-72 w-full rounded-2xl border-0"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-foreground">Service Area</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {districts.map((d) => (
                  <span key={d.slug} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
