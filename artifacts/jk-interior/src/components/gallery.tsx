 import { useState, useCallback, useMemo, useEffect, useRef, memo } from "react"
import { Sparkles, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { galleryImages, CATEGORY_SEO, seoAlt, buildGalleryJsonLd, type GalleryImage } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import { useActiveOnScreen } from "@/lib/use-active-on-screen"
import { useHashScroll } from "@/lib/hash-scroll"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import KeywordChips from "@/components/ui/keyword-chips"
import DesignIdeasSearch from "@/components/design-search-modal"
import { Lightbox } from "@/components/ui/lightbox"

export { Lightbox }

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

/* ─── Modern Ultra-Clean Category Card (Auto-Fit Aspect Ratio) ─── */
const CategoryCard = memo(function CategoryCard({ category, images, onOpen, anchored = false }: {
  category: string; images: GalleryImage[]
  onOpen(images: GalleryImage[], idx: number): void
  index: number
  /** Only the copy in the layout that owns the `#gallery-<slug>` anchor id. */
  anchored?: boolean
}) {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [playing, setPlaying] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = images.length
  const showDots = total > 1 && total <= 10
  // Each category is rendered twice — once in the phone swipe rail, once in the
  // desktop masonry wall — and CSS `display: none` does not unmount the copy the
  // current breakpoint hides. Without this gate both copies of all seven cards
  // ran an autoplay timer and a Framer Motion progress animation forever, on
  // every device, mostly for cards nobody could see.
  const { ref: cardRef, active } = useActiveOnScreen<HTMLDivElement>()
  const autoplaying = playing && active && total > 1

  const go = useCallback((n: 1 | -1) => {
    setDir(n)
    setCur(p => (p + n + total) % total)
  }, [total])

  // Each card holds its slide for its own duration, so the whole wall never
  // flips at the same instant (which reads as a flicker). Held in a ref, not
  // recomputed inline, so the progress bar below can be given the *same*
  // duration — it used to be hardcoded to 4s against a random 3.5–5.5s timer,
  // so the bar visibly finished early and then sat full, waiting.
  const holdMs = useRef<number>(Math.floor(Math.random() * 2000) + 3500)

  useEffect(() => {
    if (!autoplaying) return
    timer.current = setTimeout(() => go(1), holdMs.current)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [cur, autoplaying, go])


  const slug = slugify(category)
  const id = `gallery-${slug}`
  const seo = CATEGORY_SEO[category]
  const activeAlt = seoAlt(images[cur])

  return (
    <motion.div
      ref={cardRef}
      // The anchor id goes on one copy only. Both layouts are in the DOM at all
      // times, so putting it on both produced two elements sharing an id, and
      // `getElementById` resolved to whichever came first in source order — the
      // desktop wall. On a phone that element is `display: none`, so every
      // `/gallery#gallery-<slug>` deep link (the "View All" links on the service
      // pages) scrolled precisely nowhere.
      id={anchored ? id : undefined}
      data-gallery-anchor={slug}
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

            {/* Top Progress Line — same duration as the slide it tracks. */}
            {autoplaying && (
              <div className="absolute top-0 left-0 right-0 z-20 h-1 overflow-hidden bg-white/20">
                <motion.div
                  key={`${cur}-prog`}
                  className="h-full bg-gold-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: holdMs.current / 1000, ease: "linear" }}
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

  // `/gallery#gallery-<category>` deep links, e.g. the "View All" link on every
  // service page. Resolving the target is shared with the home page's anchors —
  // see lib/hash-scroll.ts for why it can't be a plain getElementById.
  useHashScroll()

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
            <CategoryCard key={category} category={category} images={images} onOpen={open} index={index} anchored />
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
