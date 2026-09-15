import { useState } from "react"
import { MapPin, Play, ExternalLink } from "lucide-react"
import { GOOGLE_REVIEWS_URL } from "@/lib/business-data"

/** The embed URL for the verified JK Interior pin — same place CID as GOOGLE_REVIEWS_URL. */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.064681149018!2d87.2034309!3d26.2920031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39efa3c3a605cc61%3A0xac1175566c0d0926!2sJk%20interior!5e0!3m2!1sen!2sin!4v1784167435421!5m2!1sen!2sin"

/**
 * Click-to-load facade for the Google Maps embed.
 *
 * The embed itself pulls roughly a megabyte of third-party JavaScript, a chunk of
 * it on the main thread. `loading="lazy"` deferred that until the iframe neared
 * the viewport, which on the home page means "as soon as anyone scrolls to the
 * contact section" — so in practice almost every visitor paid for it, on a phone,
 * to look at a small static-looking map they mostly do not interact with.
 *
 * The facade renders the address as real text (which is more use to a visitor and
 * to a crawler than an iframe, which neither can read) and swaps in the live,
 * fully interactive embed on the first tap. "Open in Google Maps" is there for
 * the far more common intent — getting directions in the Maps app.
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        src={MAP_EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="JK Interior location on Google Maps — Damaria Rewahi, Forbesganj, Bihar"
        className={className}
      />
    )
  }

  return (
    <div className={`relative h-full w-full bg-charcoal-800 ${className}`}>
      {/* A faint street-grid suggestion, drawn in CSS — no image request. */}
      <div
        className="absolute inset-0 opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,162,39,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,39,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600 text-white">
          <MapPin className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-xs font-bold leading-snug text-white">
          Damaria Rewahi, Forbesganj, Bihar 854318
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-500/15 px-3 py-1.5 text-[11px] font-bold text-gold-200 transition-colors hover:bg-gold-500/25"
          >
            <Play className="h-3 w-3" aria-hidden="true" />
            Load map
          </button>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-white/20"
          >
            Open in Google Maps
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
