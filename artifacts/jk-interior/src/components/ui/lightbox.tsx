import { useEffect, useState, useRef } from "react"
import { X, ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { CATEGORY_SEO, seoAlt, type GalleryImage } from "@/lib/gallery-data"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

/**
 * Full-screen, direction-aware photo viewer — shared by the main Gallery
 * section, the per-service Featured Work modal, and the design-search modal.
 *
 * Deliberately its own module rather than living inside `gallery.tsx`: the
 * design-search modal is mounted once at the app root (`App.tsx`) so it's
 * always available, and `gallery.tsx` itself is a lazy-loaded chunk. If this
 * component lived in `gallery.tsx`, mounting the search modal at the root
 * would statically pull that whole (otherwise lazy) chunk into the main
 * bundle just to reach this one component.
 */
export function Lightbox({ images, idx, onClose, onNext, onPrev }: {
  images: GalleryImage[]; idx: number
  onClose(): void; onNext(): void; onPrev(): void
}) {
  const tx = useRef<number | null>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState<1 | -1>(1)
  const prevIdx = useRef(idx)

  useEffect(() => {
    if (idx !== prevIdx.current) {
      const n = images.length
      const forward =
        (idx === (prevIdx.current + 1) % n) ||
        (prevIdx.current === n - 1 && idx === 0)
      setDir(forward ? 1 : -1)
      prevIdx.current = idx
    }
  }, [idx, images.length])

  useEffect(() => { btn.current?.focus() }, [])
  useEffect(() => {
    const p = document.body.style.overflow; document.body.style.overflow = "hidden"
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") { setDir(1); onNext() }
      if (e.key === "ArrowLeft")  { setDir(-1); onPrev() }
    }
    window.addEventListener("keydown", h)
    return () => { document.body.style.overflow = p; window.removeEventListener("keydown", h) }
  }, [onClose, onNext, onPrev])

  const img = images[idx]; if (!img) return null
  const alt = seoAlt(img)
  const seo = img.category ? CATEGORY_SEO[img.category] : undefined

  return createPortal(
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col" role="dialog" aria-modal
      aria-label={`${img.category ?? "JK Interior"} photo viewer`}
      onTouchStart={e => { tx.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (!tx.current) return
        const d = e.changedTouches[0].clientX - tx.current
        if (Math.abs(d) > 50) { if (d < 0) { setDir(1); onNext() } else { setDir(-1); onPrev() } }
        tx.current = null
      }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black/80">
        {img.category && <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full">{img.category}</span>}
        <span className="text-white/40 text-xs ml-auto mr-4">{idx+1} / {images.length}</span>
        <button ref={btn} onClick={onClose} aria-label="Close photo viewer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"><X size={18}/></button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <button onClick={() => { setDir(-1); onPrev() }} aria-label="Previous photo"
          className="absolute left-3 md:left-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronLeft size={28}/>
        </button>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.picture key={idx} itemScope itemType="https://schema.org/ImageObject">
            {/* AVIF format (best compression) */}
            <source srcSet={img.src.replace(/\.webp$/, '.avif')} type="image/avif" />
            {/* WebP format (fallback) */}
            <source srcSet={img.src} type="image/webp" />
            <meta itemProp="contentUrl" content={img.src} />
            <meta itemProp="description" content={seo?.caption ?? alt} />
            {/* Fallback img tag */}
            <motion.img
              src={img.src} alt={alt} title={alt} itemProp="url"
              width={img.width} height={img.height}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity:0, x: d * 80, scale:.97 }),
                center: { opacity:1, x:0, scale:1 },
                exit:  (d: number) => ({ opacity:0, x: d * -80, scale:.97 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration:.25, ease:"easeOut" }}
              className="max-w-full object-contain px-2 md:px-24"
              style={{ maxHeight:"calc(100vh - 180px)" }}
              loading="eager"
              decoding="sync"
            />
          </motion.picture>
        </AnimatePresence>

        <button onClick={() => { setDir(1); onNext() }} aria-label="Next photo"
          className="absolute right-3 md:right-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronRight size={28}/>
        </button>
      </div>

      {/* Bottom */}
      <div className="bg-black/90 px-5 pt-3 pb-5 flex flex-col items-center gap-1.5">
        <p className="text-white/60 text-sm text-center">{img.alt}</p>
        {seo && <p className="text-gold-400/70 text-[11px] text-center tracking-wide">{seo.keywordSuffix}</p>}
        <div className="flex gap-2 md:hidden mt-1.5">
          <button onClick={() => { setDir(-1); onPrev() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10"><ChevronLeft size={14}/> Prev</button>
          <button onClick={() => { setDir(1); onNext() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10">Next <ChevronRight size={14}/></button>
        </div>
        <div className="flex gap-2 mt-1.5">
          <WhatsAppLink
            message={`Hello JK Interior, I would like a quotation for this design: "${img.alt}"`}
            icon={false}
            className="rounded-full px-5 py-2.5 text-sm shadow-none hover:bg-gold-500 hover:shadow-none"
          >
            <MessageCircle size={14} aria-hidden="true" /> WhatsApp
          </WhatsAppLink>
          <CallLink
            icon={false}
            className="rounded-full bg-charcoal-600 px-5 py-2.5 text-sm shadow-none hover:bg-charcoal-500 hover:shadow-none"
          >
            <Phone size={14} aria-hidden="true" /> Call
          </CallLink>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}
