import { useState } from "react"
import { Wand2 } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import BeforeAfterSlider from "@/components/before-after-slider"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

interface TransformPair {
  id: string
  tabLabel: string
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  caption: string
}

/**
 * Real progress photos from our own projects — a bare-frame stage next to the
 * finished result. Both photos are genuine site photography, not a matched
 * before/after diptych of the exact same camera angle, so the caption on each
 * pair says what it's showing rather than implying otherwise.
 */
const PAIRS: TransformPair[] = [
  {
    id: "partition",
    tabLabel: "Partition Wall",
    beforeSrc: "/images/p2.webp",
    afterSrc: "/images/partition-wall.webp",
    beforeAlt: "Metal stud frame for a room partition, with gypsum boards going up alongside",
    afterAlt: "Framed glass partition forming office cabins on a carpeted floor",
    caption: "From a bare metal-stud frame to a finished glass-and-gypsum office partition — days, not weeks.",
  },
  {
    id: "wall-panel",
    tabLabel: "Wall Panelling",
    beforeSrc: "/images/p1.webp",
    afterSrc: "/images/wpc1.webp",
    beforeAlt: "Gypsum partition wall part-boarded over its metal stud frame in an empty hall",
    afterAlt: "Fluted WPC wall panel in a living room",
    caption: "A raw, part-boarded wall next to a fluted WPC panel finish — the same transformation we bring to feature walls.",
  },
]

export default function Transformation() {
  const [activeId, setActiveId] = useState(PAIRS[0].id)
  const active = PAIRS.find((p) => p.id === activeId) ?? PAIRS[0]

  return (
    <section id="transformation" className="relative overflow-hidden bg-[#fbfaf5] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,162,39,0.06),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Wand2}
          badge="Real Transformations"
          title={<>Drag The Slider, <span className="hero-gradient-text">See The Difference</span></>}
          subtitle="Genuine site photography from JK Interior projects — the raw structure next to the finished result."
        />

        <div className="mb-6 flex justify-center gap-2">
          {PAIRS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => setActiveId(pair.id)}
              aria-pressed={activeId === pair.id}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:px-5 sm:py-3 sm:text-sm ${
                activeId === pair.id
                  ? "bg-gold-700 text-white shadow-md shadow-gold-900/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-gold-50 border border-gold-900/10"
              }`}
            >
              {pair.tabLabel}
            </button>
          ))}
        </div>

        <BeforeAfterSlider
          key={active.id}
          beforeSrc={active.beforeSrc}
          afterSrc={active.afterSrc}
          beforeAlt={active.beforeAlt}
          afterAlt={active.afterAlt}
          className="shadow-xl"
        />

        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-gray-600">{active.caption}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CallLink ariaLabel="Call to discuss your own transformation">Discuss Your Project</CallLink>
          <WhatsAppLink
            variant="outline"
            message="Hello JK Interior, I saw the before/after slider on your site and would like a quote for my own space."
          >
            WhatsApp a Photo of Your Space
          </WhatsAppLink>
        </div>
      </div>
    </section>
  )
}
