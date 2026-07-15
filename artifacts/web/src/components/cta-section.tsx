import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function CtaSection({
  title = "Ready to start your project?",
  description = "Get a free site visit and detailed quotation — no obligation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="glass-card gold-gradient relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12">
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-3 text-white/90">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${BUSINESS.phone1}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:opacity-90"
          >
            <Phone className="h-4 w-4" /> Call {BUSINESS.phone1}
          </a>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
