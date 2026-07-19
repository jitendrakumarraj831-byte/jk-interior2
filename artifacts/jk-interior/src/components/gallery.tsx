import { useEffect, useState, useCallback, useRef, useMemo } from "react"
import { X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Play, Pause, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import SectionHeader from "@/components/ui/section-header"

interface GalleryImage { src: string; alt: string; category?: string }

const ALL = galleryImages as GalleryImage[]

const CATEGORY_DESCRIPTIONS: Record<string, { en: string; hi: string }> = {
  "Gypsum False Ceiling": {
    en: "Elegant gypsum ceiling designs with smooth finish and creative lighting integration — ideal for luxury interiors.",
    hi: "स्मूथ फिनिश और क्रिएटिव लाइटिंग के साथ एलिगेंट जिप्सम सीलिंग डिज़ाइन।",
  },
  "PVC Ceiling": {
    en: "Waterproof PVC false ceiling panels with modern designs and a long-lasting, dust-free finish.",
    hi: "वॉटरप्रूफ पैनल और मॉडर्न डिज़ाइन के साथ लंबे समय तक चलने वाली PVC फॉल्स सीलिंग।",
  },
  "Grid Ceiling": {
    en: "Durable mineral-fiber grid ceilings for offices, shops, and hospitals — clean, acoustic, and easy to maintain.",
    hi: "ऑफिस, दुकान और अस्पताल के लिए मजबूत ग्रिड सीलिंग — साफ, शांत और आसान मेंटेनेंस।",
  },
  "WPC fluted panels & uv marble Sheet": {
    en: "Termite-proof WPC fluted wall panels and real-marble-look UV marble sheets for a premium wall finish.",
    hi: "टर्माइट-प्रूफ WPC फ्लूटेड पैनल और रियल मार्बल जैसी UV मार्बल शीट — प्रीमियम वॉल फिनिश।",
  },
  "TV Unit Design": {
    en: "Custom modular TV units with modern storage solutions, cable management, and premium finishes.",
    hi: "मॉडर्न स्टोरेज और प्रीमियम फिनिश के साथ कस्टम मॉड्यूलर TV यूनिट डिज़ाइन।",
  },
  "Artificial Grass": {
    en: "Premium artificial grass for balconies, terraces, and gardens — always green, zero maintenance.",
    hi: "बालकनी, टैरेस और गार्डन के लिए प्रीमियम आर्टिफिशियल घास — हमेशा हरा-भरा, ज़ीरो मेंटेनेंस।",
  },
}

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
function Lightbox({ images, idx, onClose, onNext, onPrev }: {
  images: GalleryImage[]; idx: number
  onClose(): void; onNext(): void; onPrev(): void
}) {
  const tx = useRef<number | null>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState<1 | -1>(1)   // 1=right→left  -1=left→right
  const prevIdx = useRef(idx)

  useEffect(() => {
    if (idx !== prevIdx.current) {
      // detect wrap-around
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

  return createPortal(
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col" role="dialog" aria-modal
      onTouchStart={e => { tx.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (!tx.current) return
        const d = e.changedTouches[0].clientX - tx.current
        if (Math.abs(d) > 50) { if (d < 0) { setDir(1); onNext() } else { setDir(-1); onPrev() } }
        tx.current = null
      }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black/80">
        {img.category && <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">{img.category}</span>}
        <span className="text-white/40 text-xs ml-auto mr-4">{idx+1} / {images.length}</span>
        <button ref={btn} onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"><X size={18}/></button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <button onClick={() => { setDir(-1); onPrev() }}
          className="absolute left-3 md:left-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronLeft size={28}/>
        </button>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx} src={img.src} alt={img.alt}
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
          />
        </AnimatePresence>

        <button onClick={() => { setDir(1); onNext() }}
          className="absolute right-3 md:right-6 z-10 p-3 rounded-full bg-white/8 hover:bg-white/20 text-white border border-white/10 transition-all hidden md:flex">
          <ChevronRight size={28}/>
        </button>
      </div>

      {/* Bottom */}
      <div className="bg-black/90 px-5 pt-3 pb-5 flex flex-col items-center gap-3">
        <p className="text-white/60 text-sm text-center">{img.alt}</p>
        <div className="flex gap-2 md:hidden">
          <button onClick={() => { setDir(-1); onPrev() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10"><ChevronLeft size={14}/> Prev</button>
          <button onClick={() => { setDir(1); onNext() }} className="flex items-center gap-1 px-4 py-2 bg-white/8 rounded-full text-white/60 text-sm border border-white/10">Next <ChevronRight size={14}/></button>
        </div>
        <div className="flex gap-2">
          <WhatsAppLink
            message={`Hello JK Interior! Is design ka quote chahiye: "${img.alt}"`}
            icon={false}
            className="rounded-full px-5 py-2.5 text-sm shadow-none hover:bg-green-500 hover:shadow-none"
          >
            <MessageCircle size={14} aria-hidden="true" /> WhatsApp
          </WhatsAppLink>
          <CallLink
            icon={false}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm shadow-none hover:bg-blue-500 hover:shadow-none"
          >
            <Phone size={14} aria-hidden="true" /> Call
          </CallLink>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

/* ─── Per-Service Category Card (own auto slider) ─── */
function CategoryCard({ category, images, onOpen, index }: {
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
    timer.current = setTimeout(() => go(1), 4000)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [cur, playing, go, total])

  const id = `gallery-${slugify(category)}`
  const description = CATEGORY_DESCRIPTIONS[category]
  // Alternating tilt gives the wall a hand-pinned, candid feel instead of a uniform grid.
  const tilt = index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-0" : "rotate-1"

  return (
    <motion.div
      id={id}
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }} transition={{ duration:.5 }}
      className={`group relative mb-5 break-inside-avoid scroll-mt-28 overflow-hidden rounded-sm border-8 border-white bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_16px_44px_rgba(0,0,0,0.18)] sm:mb-6 sm:border-[10px] ${tilt}`}
    >
      {/* Slider area */}
      <div className="relative h-56 overflow-hidden sm:h-64 md:h-72">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={cur} src={images[cur].src} alt={images[cur].alt}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity:0, x: d * 60 }),
              center: { opacity:1, x:0 },
              exit:  (d: number) => ({ opacity:0, x: d * -60 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration:.5, ease:"easeInOut" }}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            onClick={() => onOpen(images, cur)}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

        {/* Photo count badge */}
        <div className="absolute left-3 top-3 z-20 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:rounded-xl sm:text-xs">
          {total} Photo{total !== 1 ? "s" : ""}
        </div>

        {total > 1 && (
          <>
            {/* Prev / Next */}
            <button onClick={e => { e.stopPropagation(); go(-1) }} aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100 md:p-2.5">
              <ChevronLeft size={18}/>
            </button>
            <button onClick={e => { e.stopPropagation(); go(1) }} aria-label="Next photo"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100 md:p-2.5">
              <ChevronRight size={18}/>
            </button>

            {/* Play/Pause */}
            <button onClick={e => { e.stopPropagation(); setPlaying(p => !p) }} aria-label={playing ? "Pause slider" : "Play slider"}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-black/35 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/60">
              {playing ? <Pause size={12}/> : <Play size={12}/>}
            </button>

            {/* Progress bar */}
            {playing && (
              <div className="absolute top-0 left-0 right-0 z-20 h-0.5 overflow-hidden bg-white/10">
                <motion.div key={`${cur}-prog`} className="h-full bg-emerald-400"
                  initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:4, ease:"linear" }}/>
              </div>
            )}
          </>
        )}

        {/* Category title */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <h3 className="text-lg font-black text-white drop-shadow sm:text-xl">{category}</h3>
        </div>

        {/* Dots or fraction counter */}
        {total > 1 && (
          showDots ? (
            <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setDir(i > cur ? 1 : -1); setCur(i) }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i===cur ? "w-6 bg-emerald-400" : "w-1.5 bg-white/40 hover:bg-white/70"}`}/>
              ))}
            </div>
          ) : (
            <div className="absolute bottom-3 right-3 z-20 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              {cur + 1} / {total}
            </div>
          )
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="px-3 pt-3 sm:px-4 sm:pt-4">
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{description.en}</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">{description.hi}</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-2 p-3 sm:p-4">
        <CallLink
          size="sm"
          ariaLabel={`Call for ${category} quote`}
          className="flex-1 px-3 py-2.5 text-xs sm:text-sm"
        >
          Get Quote
        </CallLink>
        <WhatsAppLink
          size="sm"
          variant="outline"
          message={`Hi JK Interior, I am interested in ${category} service in Forbesganj. Please share details.`}
          ariaLabel={`WhatsApp for ${category}`}
          className="flex-1 px-3 py-2.5 text-xs sm:text-sm"
        >
          WhatsApp
        </WhatsAppLink>
      </div>
    </motion.div>
  )
}

/* ─── Main Gallery ─── */
export default function Gallery() {
  const [mounted, setMounted] = useState(false)
  const [lbImgs, setLbImgs] = useState<GalleryImage[]>([])
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  const categories = useMemo(() => groupByCategory(ALL), [])

  const open = useCallback((images: GalleryImage[], idx: number) => {
    setLbImgs(images); setLbIdx(idx)
  }, [])

  const close = useCallback(() => { setLbIdx(null); setLbImgs([]) }, [])
  const next = useCallback(() => setLbIdx(p => p !== null ? (p+1) % lbImgs.length : null), [lbImgs.length])
  const prev = useCallback(() => setLbIdx(p => p !== null ? (p-1+lbImgs.length) % lbImgs.length : null), [lbImgs.length])

  // Deep-link support: /gallery#gallery-<category-slug> scrolls to the matching service card
  useEffect(() => {
    if (!mounted) return
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
  }, [mounted])

  if (!mounted) return (
    <section className="min-h-screen bg-[#efece3] pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-64 mx-auto rounded-full bg-white/60 animate-pulse mb-10"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({length:4}).map((_,i)=><div key={i} className="h-64 bg-white/60 animate-pulse"/>)}
        </div>
      </div>
    </section>
  )

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#efece3]">
      {/* A pinboard/wall backdrop — warm plaster tone with a faint cork-board dot grain,
          deliberately distinct from the emerald gradients used in every other section. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 dot-pattern opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,0,0,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-16">

        {/* ── Header ── */}
        <SectionHeader
          icon={Sparkles}
          badge="Our Work Gallery"
          tone="amber"
          headingSize="md"
          className="mb-10"
          title={<>हमारे काम, <span className="hero-gradient-text">आपका विश्वास</span></>}
          subtitle={`${ALL.length}+ premium interior projects — Forbesganj, Araria, Bihar`}
        />

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-emerald-500 rounded-full"/>
          <h3 className="text-gray-800 font-bold text-lg">सर्विस के हिसाब से प्रोजेक्ट्स</h3>
          <div className="flex-1 h-px bg-emerald-900/15"/>
          <span className="text-gray-500 text-xs">{categories.length} services</span>
        </div>

        {/* ── Portfolio wall — CSS-column masonry of "pinned photo" cards ── */}
        <div className="columns-1 sm:columns-2 gap-5 sm:gap-6">
          {categories.map(({ category, images }, index) => (
            <CategoryCard key={category} category={category} images={images} onOpen={open} index={index} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
          className="glass-card-bright rounded-3xl px-6 py-12 md:px-14 text-center mt-14">
          <h3 className="text-gray-900 text-2xl md:text-4xl font-black mb-3">
            आपका घर, <span className="hero-gradient-text">हमारी पहचान</span>
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto text-sm mb-8">
            बजट आपका, ज़िम्मेदारी हमारी! प्रीमियम इंटीरियर और फॉल्स सीलिंग — किफायती रेट पर।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CallLink className="px-8 py-4 shadow-[0_4px_20px_rgba(5,150,105,0.35)]">अभी कॉल करें</CallLink>
            <WhatsAppLink className="px-8 py-4 shadow-none hover:bg-green-500 hover:shadow-none">WhatsApp करें</WhatsAppLink>
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
