import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Play, Video, MapPin } from "lucide-react"
import { videoTestimonials } from "@/lib/video-testimonials-data"

const easeLux = [0.22, 1, 0.36, 1] as const

function VideoCard({ item }: { item: (typeof videoTestimonials)[number] }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-[9/16] max-h-[420px] w-full bg-gradient-to-br from-emerald-900 to-emerald-700">
        {item.youtubeId ? (
          playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              title={`Video testimonial from ${item.customerName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={`Play video testimonial from ${item.customerName}`}
            >
              <img
                src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 fill-emerald-700 text-emerald-700" />
              </div>
            </button>
          )
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <Video className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-bold text-white">Video Review Coming Soon</p>
            <p className="text-xs text-emerald-100/80">
              {item.customerName} ने {item.service} लिया — video जल्द add होगी
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-bold text-gray-900">{item.customerName}</p>
          <p className="flex items-center gap-1 text-[11px] text-gray-400">
            <MapPin className="h-3 w-3" /> {item.location}
          </p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          {item.service}
        </span>
      </div>
    </div>
  )
}

export default function VideoTestimonials() {
  const shouldReduce = useReducedMotion()
  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  return (
    <section id="video-reviews" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f0fdf4]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5">
            <Video className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Video Reviews</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Customers की <span className="hero-gradient-text">Real Awaaz</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            हमारे clients अपने experience के बारे में क्या कहते हैं — उन्हीं की जुबानी
          </p>
        </motion.div>

        <motion.div {...animProps} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {videoTestimonials.map((v) => (
            <VideoCard key={v.customerName} item={v} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
