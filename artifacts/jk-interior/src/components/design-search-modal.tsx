import { useEffect, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Sparkles, MessageCircle, ExternalLink } from "lucide-react"
import {
  DESIGN_TAGS,
  searchPortfolio,
  fetchUnsplashResults,
  type DesignResult,
} from "@/lib/design-search"
import { WhatsAppLink } from "@/components/ui/cta-links"
import { Lightbox } from "@/components/gallery"

const easeLux = [0.22, 1, 0.36, 1] as const
const RESULT_SIZES = "(min-width: 640px) 220px, 44vw"
/** Keeps the skeleton on screen just long enough to read as a real search rather than a flicker, whether or not a live Unsplash fetch is actually happening. */
const MIN_LOADING_MS = 350

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Self-contained "Search Design Ideas" launcher + modal. Drop `<DesignIdeasSearch />`
 * anywhere; it owns its own open state so no parent wiring is needed.
 *
 * Every search runs against our own photographed project catalog instantly
 * (see `lib/design-search.ts`), then merges in live Unsplash results when a
 * key is configured — so the grid always has something to show, and gets
 * richer as the site owner adds inspiration-photo capability later.
 */
export default function DesignIdeasSearch({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={
          triggerClassName ??
          "inline-flex items-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-5 py-3 text-sm font-bold text-gold-800 transition-all hover:border-gold-500/50 hover:bg-gold-500/15"
        }
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search Design Ideas
      </button>

      <AnimatePresence>{open && <SearchModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<DesignResult[]>(() => searchPortfolio(null, ""))
  const [loading, setLoading] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  useEffect(() => {
    closeBtnRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    if (lightboxIdx !== null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose, lightboxIdx])

  // Re-runs on every tag/query change. Portfolio matches are synchronous, so
  // they're computed up front; the (optional) Unsplash call and the minimum
  // skeleton delay race in parallel, and whichever result set is current when
  // both settle wins — a fast typist never sees a stale response overwrite a
  // newer one.
  useEffect(() => {
    let cancelled = false
    const tag = DESIGN_TAGS.find((t) => t.id === activeTag)
    const searchTerm = query.trim() || tag?.label || "interior design"

    setLoading(true)
    const portfolioResults = searchPortfolio(activeTag, query)

    Promise.all([fetchUnsplashResults(searchTerm), delay(MIN_LOADING_MS)]).then(([unsplashResults]) => {
      if (cancelled) return
      setResults([...portfolioResults, ...unsplashResults])
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [activeTag, query])

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), [])

  // Lightbox's `GalleryImage` type mirrors the local portfolio catalog, where
  // every photo has a category — Unsplash results don't, so they fall back to
  // an empty string rather than widening that type to `string | undefined`.
  const lightboxImages = results.map((r) => ({ src: r.src, alt: r.alt, category: r.category ?? "", width: r.width, height: r.height }))

  return createPortal(
    <motion.div
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-charcoal-950/75 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search design ideas"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: easeLux }}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-charcoal-900/70 shadow-2xl backdrop-blur-2xl sm:max-h-[80vh] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex flex-none flex-col gap-3 border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold-400/90">Design Ideas</p>
              <h3 className="truncate text-lg font-black text-white sm:text-xl">Search Interior Designs</h3>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close design search"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-90"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'gypsum ceiling', 'wall panel'…"
              aria-label="Search design ideas by keyword"
              className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm font-medium text-white placeholder:text-white/40 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
            />
          </div>

          {/* Filter tags */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-0.5 scrollbar-luxury">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
              className={`flex-none rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeTag === null ? "bg-gold-500 text-charcoal-950" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              All
            </button>
            {DESIGN_TAGS.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag((cur) => (cur === tag.id ? null : tag.id))}
                aria-pressed={activeTag === tag.id}
                className={`flex-none rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeTag === tag.id ? "bg-gold-500 text-charcoal-950" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="relative min-h-0 w-full max-w-full flex-1 overflow-y-auto bg-white scrollbar-luxury">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-xl bg-charcoal-200" aria-hidden="true" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
              {results.map((result, i) => (
                <ResultTile key={`${result.source}-${result.src}`} result={result} onOpen={() => openLightbox(i)} />
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <Sparkles className="h-8 w-8 text-gold-500" aria-hidden="true" />
              <p className="text-sm font-bold text-charcoal-700">No designs matched that search</p>
              <p className="text-xs text-charcoal-500">Try a different tag, or ask us directly on WhatsApp.</p>
            </div>
          )}
        </div>

        {/* Sticky CTA bar */}
        <div className="flex flex-none items-center gap-3 border-t border-white/10 bg-charcoal-900/95 px-5 py-4 backdrop-blur-xl">
          <WhatsAppLink
            message={`Hello JK Interior, I was browsing designs for "${query.trim() || DESIGN_TAGS.find((t) => t.id === activeTag)?.label || "interior ideas"}" and would like a quote.`}
            icon={false}
            className="flex-1 justify-center rounded-xl py-3.5 text-sm font-black shadow-[0_4px_24px_rgba(15,122,61,0.4)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Get This Look — WhatsApp Us
          </WhatsAppLink>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={lightboxImages}
            idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNext={() => setLightboxIdx((p) => (p === null ? null : (p + 1) % lightboxImages.length))}
            onPrev={() => setLightboxIdx((p) => (p === null ? null : (p - 1 + lightboxImages.length) % lightboxImages.length))}
          />
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

function ResultTile({ result, onOpen }: { result: DesignResult; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-charcoal-100">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View full-size photo — ${result.alt}`}
        className="absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      >
        {!loaded && <div className="absolute inset-0 animate-pulse bg-charcoal-200" aria-hidden="true" />}
        <img
          src={result.src}
          alt={result.alt}
          title={result.alt}
          sizes={RESULT_SIZES}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </button>

      {result.source === "unsplash" && result.credit && (
        <a
          href={result.credit.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-semibold text-white/90 backdrop-blur-sm transition-opacity hover:bg-black/75"
        >
          {result.credit.name} <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
