import { Phone } from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

interface PageCtaProps {
  eyebrow: string
  title: string
  subtitle: string
  whatsappMessage: string
}

/**
 * The dark closing band used just above the footer on pages that don't
 * already end in a CTA of their own (Gallery, FAQ). Mirrors the ServiceDetailPage
 * / CityPage handover section so every page closes the same way: a clear next
 * step, both numbers, one tap away.
 */
export default function PageCta({ eyebrow, title, subtitle, whatsappMessage }: PageCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-gold-500/10 py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-[#0b172a] to-charcoal-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.16),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl space-y-5 px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-300">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </span>

        <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
          {title}
        </h2>

        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{subtitle}</p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <CallLink shine ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`} className="text-sm">
            {`Call ${PHONE_PRIMARY_DISPLAY}`}
          </CallLink>
          <a
            href={`tel:${PHONE_SECONDARY}`}
            aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 active:scale-95"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {`Call ${PHONE_SECONDARY_DISPLAY}`}
          </a>
          <WhatsAppLink message={whatsappMessage} className="text-sm">
            Message on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  )
}
