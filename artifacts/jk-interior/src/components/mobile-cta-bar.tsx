import { Phone, MessageCircle } from "lucide-react"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
  WA_NUMBER,
} from "@/lib/business-data"

/**
 * Sticky mobile action bar.
 *
 * Both official JK Interior numbers stay one tap away on every page, alongside
 * WhatsApp. It is hidden on desktop (where the header carries the same numbers)
 * and hides itself while the chat assistant is open — see the
 * `body[data-chat-open] .mobile-cta-bar` rule in index.css. The footer reserves
 * matching bottom padding so this bar never covers page content.
 */
export default function MobileCtaBar() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hello JK Interior, I would like a free site visit and quotation.",
  )}`

  return (
    <div className="mobile-cta-bar md:hidden" role="region" aria-label="Contact JK Interior">
      <div className="flex items-stretch gap-2">
        <a
          href={`tel:${PHONE_PRIMARY}`}
          aria-label={`Call JK Interior on the primary line ${PHONE_PRIMARY_DISPLAY}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-700 px-3 py-2.5 text-white shadow-[0_4px_16px_rgba(201,162,39,0.35)] transition-transform active:scale-95"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-left leading-tight">
            <span className="block text-[8px] font-black uppercase tracking-[0.18em] text-gold-100">Call</span>
            <span className="block text-[11px] font-black tracking-tight">{PHONE_PRIMARY_DISPLAY}</span>
          </span>
        </a>

        <a
          href={`tel:${PHONE_SECONDARY}`}
          aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold-500/35 bg-gold-500/10 px-3 py-2.5 text-gold-700 transition-transform active:scale-95"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-left leading-tight">
            <span className="block text-[8px] font-black uppercase tracking-[0.18em] text-gold-600">Alt</span>
            <span className="block text-[11px] font-black tracking-tight">{PHONE_SECONDARY_DISPLAY}</span>
          </span>
        </a>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message JK Interior on WhatsApp"
          className="flex w-14 shrink-0 items-center justify-center rounded-xl bg-[#0F7A3D] text-white shadow-[0_4px_16px_rgba(15,122,61,0.3)] transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
