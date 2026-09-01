 import { useEffect, useState, useCallback, useRef, useMemo, memo } from "react"
import { X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Play, Pause, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages, CATEGORY_SEO, seoAlt, buildGalleryJsonLd, type GalleryImage } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import KeywordChips from "@/components/ui/keyword-chips"
import DesignIdeasSearch from "@/components/design-search-modal"

const ALL = galleryImages

// Gallery cards only ever display a photo at ~300-420px, never its full
// resolution (up to 1600px) — that's reserved for the lightbox. Every photo
// has a pre-generated 800w-capped sibling for the card srcset so mobile
// devices aren't downloading a desktop-sized image for a thumbnail.
const CARD_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 82vw"
const cardAvif = (webpSrc: string) => webpSrc.replace(/\.webp$/, "-800w.avif")
const cardWebp = (webpSrc: string) => webpSrc.replace(/\.webp$/, "-800w.webp")

function groupByCategory(images: GalleryImage[]) {
  const order: string[] = []
  const map = new Map<string, GalleryImage[]>()
  for (const img of images) {
    const cat = img.category || "Other"
    if (!map.has(cat)) {
      map.set(cat, [])
      order.push(cat)
    }
    map.get(cat)!.push(img)
  }
  return order.map((cat) => ({ category: cat, images: map.get(cat)! }))
}

/* ─── Lightbox (direction-aware) ─── */
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

/* ─── Modern Ultra-Clean Category Card (Auto-Fit Aspect Ratio) ─── */
const CategoryCard = memo(function CategoryCard({ category, images, onOpen }: {
  category: string; images: GalleryImage[]
  onOpen(images: GalleryImage[], idx: number): void
  index: number
}) {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [playing, setPlaying] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = images.length
  const showDots = total > 1 && total <= 10

  const go = useCallback((n: 1 | -1) => {
    setDir(n)
    setCur(p => (p + n + total) % total)
  }, [total])

    useEffect(() => {
    if (!playing || total <= 1) return
    // Each card advances on its own randomised interval, so the whole wall never
    // flips at the same instant (which reads as a flicker).
    const randomTime = Math.floor(Math.random() * 2000) + 3500
    timer.current = setTimeout(() => go(1), randomTime)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [cur, playing, go, total])


  const id = `gallery-${slugify(category)}`
  const seo = CATEGORY_SEO[category]
  const activeAlt = seoAlt(images[cur])

  return (
    <motion.div
      id={id}
      itemScope
      itemType="https://schema.org/Service"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group relative mb-6 break-inside-avoid scroll-mt-36 overflow-hidden rounded-2xl border border-gold-900/10 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl"
    >
      <meta itemProp="areaServed" content="Forbesganj, Araria, Bihar" />
            {/* Slider area on a fixed aspect ratio — no layout shift as photos change */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.picture key={cur} itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            {/* Card-sized AVIF (best compression, right resolution for a thumbnail) */}
            <source srcSet={cardAvif(images[cur].src)} sizes={CARD_SIZES} type="image/avif" />
            {/* Card-sized WebP (fallback) */}
            <source srcSet={cardWebp(images[cur].src)} sizes={CARD_SIZES} type="image/webp" />
            <meta itemProp="contentUrl" content={images[cur].src} />
            {/* Fallback img tag */}
            <motion.img
              src={cardWebp(images[cur].src)}
              alt={activeAlt}
              title={activeAlt}
              itemProp="url"
              width={images[cur].width}
              height={images[cur].height}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 50 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -50 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={() => onOpen(images, cur)}
              loading="lazy"
              decoding="async"
            />
          </motion.picture>
        </AnimatePresence>

        {/* Gradient Overlay for Text Visibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Photo Count Glass Badge */}
        <div className="absolute left-3 top-3 z-20 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
          📷 {total} Photo{total !== 1 ? "s" : ""}
        </div>

        {total > 1 && (
          <>
            {/* Prev / Next Buttons */}
            <button
              onClick={e => { e.stopPropagation(); go(-1) }}
              aria-label={`Previous ${category} photo`}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); go(1) }}
              aria-label={`Next ${category} photo`}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={e => { e.stopPropagation(); setPlaying(p => !p) }}
              aria-label={playing ? `Pause ${category} slider` : `Play ${category} slider`}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-black/50 p-1.5 text-white backdrop-blur-md transition-all hover:bg-black/70"
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
            </button>

            {/* Top Progress Line */}
            {playing && (
              <div className="absolute top-0 left-0 right-0 z-20 h-1 overflow-hidden bg-white/20">
                <motion.div
                  key={`${cur}-prog`}
                  className="h-full bg-gold-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>
            )}
          </>
        )}

        {/* Category Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <h3 itemProp="name" className="text-lg font-extrabold text-white tracking-tight drop-shadow-md sm:text-xl">
            {category}
          </h3>
        </div>

        {/* Slider Dots */}
        {total > 1 && showDots && (
          /* Same reasoning as SwipeRail's dots: the button carries a real
             24px hit area and the span is the visible dot, so these are
             tappable on a phone instead of 6x6 px targets. */
          <div className="absolute bottom-1 right-2 z-20 flex">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setDir(i > cur ? 1 : -1); setCur(i) }}
                aria-label={`Show ${category} photo ${i + 1}`}
                aria-current={i === cur}
                className="flex h-6 min-w-6 items-center justify-center px-1"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === cur ? "w-5 bg-gold-400" : "w-1.5 bg-white/50"}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Caption — keyword-optimized description for search engines and visitors alike */}
      {seo && (
        <div className="bg-white p-4">
          <p itemProp="description" className="text-xs font-medium leading-relaxed text-gray-600">{seo.caption}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 p-3 pt-0 bg-white">
        <CallLink
          size="sm"
          ariaLabel={`Call for ${category} quote — ${seo?.keywordSuffix ?? category}`}
          className="flex-1 py-2 text-xs font-semibold rounded-xl"
        >
          Get Quote
        </CallLink>
        <WhatsAppLink
          size="sm"
          variant="outline"
          message={`Hello JK Interior, I am interested in your ${category} service. Please share details and rates.`}
          ariaLabel={`WhatsApp for ${category} — JK Interior Forbesganj`}
          className="flex-1 py-2 text-xs font-semibold rounded-xl border-gold-500/30 text-gold-700 hover:bg-gold-50"
        >
          WhatsApp
        </WhatsAppLink>
      </div>
    </motion.div>
  )
})

/* ─── Main Gallery ─── */
export default function Gallery() {
  const [lbImgs, setLbImgs] = useState<GalleryImage[]>([])
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  const categories = useMemo(() => groupByCategory(ALL), [])
  const galleryJsonLd = useMemo(() => buildGalleryJsonLd(), [])

  const open = useCallback((images: GalleryImage[], idx: number) => {
    setLbImgs(images); setLbIdx(idx)
  }, [])

  const close = useCallback(() => { setLbIdx(null); setLbImgs([]) }, [])
  const next = useCallback(() => setLbIdx(p => p !== null ? (p+1) % lbImgs.length : null), [lbImgs.length])
  const prev = useCallback(() => setLbIdx(p => p !== null ? (p-1+lbImgs.length) % lbImgs.length : null), [lbImgs.length])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    let attempts = 0
    let t: ReturnType<typeof setTimeout>
    const tryScroll = () => {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else if (attempts < 10) {
        attempts++
        t = setTimeout(tryScroll, 150)
      }
    }
    t = setTimeout(tryScroll, 100)
    return () => clearTimeout(t)
  }, [])

  // No `mounted` gate here any more. This component rendered a full-viewport
  // skeleton on its very first pass and only swapped in the real gallery from
  // an effect — which, since main.tsx mounts with createRoot (not hydrateRoot),
  // bought nothing: there is no hydration to mismatch. All it did was guarantee
  // a screen-height skeleton flash and the layout shift that comes with it,
  // on top of the Suspense fallback the homepage already shows while this
  // chunk loads. Nothing below touches window/document during render.
  return (
    <section id="gallery" className="relative overflow-hidden bg-[#efece3]" itemScope itemType="https://schema.org/ImageGallery">
      {/* Structured data — lets Google Search Console crawl every photo's caption, keywords
          and the local-service context directly, wherever this section is rendered. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
      <meta itemProp="name" content="JK Interior Gallery - Bihar" />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 dot-pattern opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,0,0,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-6 sm:px-6 sm:pt-24 md:pb-16 lg:px-8">

        {/* ── Header ── */}
        <SectionHeader
          icon={Sparkles}
          badge="Our Work Gallery"
          tone="amber"
          headingSize="md"
          className="mb-10"
          title={<>Our Work, <span className="hero-gradient-text">Your Confidence</span></>}
          // ALL.length counts photographs, not projects. Reading it as
          // "76+ completed interior projects" both understated the work and
          // contradicted the 500+ figure stated everywhere else on the site —
          // and it moved every time a photo was added. Say what the number is.
          subtitle={`${ALL.length} photographs of finished ceilings, wall panelling and units from homes and businesses across Narpatganj, Forbesganj and Araria district, Bihar.`}
        />

        <KeywordChips className="mb-8" />

        <div className="mb-8 flex justify-center">
          <DesignIdeasSearch />
        </div>

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-gold-500 rounded-full"/>
          <h3 className="text-lg font-bold text-gray-800">Projects by service</h3>
          <div className="h-px flex-1 bg-gold-900/15"/>
          <span className="text-xs text-gray-500">{categories.length} services</span>
        </div>

        {/* ── Portfolio wall — masonry on desktop ── */}
        <div className="hidden gap-5 sm:columns-2 sm:gap-6 md:block lg:columns-3">
          {categories.map(({ category, images }, index) => (
            <CategoryCard key={category} category={category} images={images} onOpen={open} index={index} />
          ))}
        </div>
      </div>

      {/* ── MOBILE: swipeable category rail ── */}
      <div className="relative z-10 pb-4 md:hidden">
        <SwipeRail
          ariaLabel="JK Interior project gallery by service"
          itemClassName="w-[84%]"
          fadeColor="#efece3"
          arrows={false}
        >
          {categories.map(({ category, images }, index) => (
            <CategoryCard key={category} category={category} images={images} onOpen={open} index={index} />
          ))}
        </SwipeRail>
        <SwipeHint className="mt-1" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
          className="glass-card-bright rounded-3xl px-6 py-12 md:px-14 text-center mt-14">
          <h3 className="mb-3 text-2xl font-black text-gray-900 md:text-4xl">
            Your Home, <span className="hero-gradient-text">Our Signature</span>
          </h3>
          <p className="mx-auto mb-8 max-w-lg text-sm text-gray-500">
            You set the budget; we take responsibility for the result. Premium interiors and false
            ceilings, priced honestly.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <CallLink className="px-8 py-4 shadow-[0_4px_20px_rgba(201,162,39,0.35)]">Call Us Now</CallLink>
            <WhatsAppLink
              message="Hello JK Interior, I would like a quotation for interior work."
              className="px-8 py-4 shadow-none hover:bg-gold-500 hover:shadow-none"
            >
              Message on WhatsApp
            </WhatsAppLink>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lbIdx !== null && lbImgs.length > 0 && (
          <Lightbox images={lbImgs} idx={lbIdx} onClose={close} onNext={next} onPrev={prev}/>
        )}
      </AnimatePresence>
    </section>
  )
    }
