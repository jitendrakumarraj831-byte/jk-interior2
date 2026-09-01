import { Phone, MessageCircle, Images } from "lucide-react"
import { Link, useLocation } from "wouter"
import { CALL_NUMBER, WA_NUMBER } from "@/lib/business-data"

const WA_MESSAGE = "Hi JK Interior, I found your website and need interior design help."

/**
 * Sticky glassmorphism quick-action bar for mobile visitors — the three
 * highest-intent actions (call, WhatsApp, browse work) always within thumb
 * reach, regardless of how far down the page they've scrolled. Hidden at the
 * `md` breakpoint, where the navbar's own CTAs already do this job, and on
 * `/admin` since that's an internal tool, not a marketing surface.
 */
export default function MobileQuickActions() {
  const [pathname] = useLocation()
  if (pathname.startsWith("/admin")) return null

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/40 bg-white/75 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-3">
        <a
          href={`tel:${CALL_NUMBER}`}
          aria-label="Call JK Interior now"
          className="flex flex-col items-center gap-1 py-2.5 text-charcoal-800 transition-colors active:bg-black/5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-900 text-white">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message JK Interior on WhatsApp"
          className="flex flex-col items-center gap-1 border-x border-gold-900/10 py-2.5 text-charcoal-800 transition-colors active:bg-black/5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F7A3D] text-white">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        <Link
          href="/gallery"
          aria-label="View JK Interior design gallery"
          className="flex flex-col items-center gap-1 py-2.5 text-charcoal-800 transition-colors active:bg-black/5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600 text-white">
            <Images className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-bold">View Designs</span>
        </Link>
      </div>
    </nav>
  )
}
