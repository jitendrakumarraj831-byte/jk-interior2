import { ArrowRight, Star, Droplets, Sparkles, PhoneCall } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { GOOGLE_REVIEWS_URL } from "@/lib/business-data"

const easeLux = [0.16, 1, 0.3, 1] as const

const trustBadges = [
  { icon: Star, label: "Reviews on Google", color: "text-amber-700 border-amber-300/60 bg-amber-50" },
  { icon: Droplets, label: "Waterproof PVC & UV Marble", color: "text-gold-700 border-gold-300/60 bg-gold-50" },
  { icon: Sparkles, label: "Low-Dust Panel Installation", color: "text-charcoal-700 border-charcoal-300/60 bg-charcoal-50" },
]

export default function Hero() {
  const shouldReduce = useReducedMotion()

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[100dvh] w-full overflow-hidden bg-[#faf7f0] flex flex-col justify-center"
      aria-label="JK Interior – false ceiling and interior contractor in Forbesganj and Araria district, Bihar"
    >
      {/* Preload hints for this section's own LCP image — scoped to the home
          route via react-helmet-async (Hero is not rendered anywhere else),
          so other routes never compete with an image they don't use. See the
          note in index.html for why this moved out of the static shell. */}
      <Helmet>
        <link
          rel="preload"
          href="/images/hero-interior-960w.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
          imageSrcSet="/images/hero-interior-960w.avif 960w, /images/hero-interior.avif 1376w"
          imageSizes="(min-width: 1024px) 45vw, (min-width: 448px) 448px, calc(100vw - 32px)"
        />
        <link
          rel="preload"
          href="/images/hero-interior-960w.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          imageSrcSet="/images/hero-interior-960w.webp 960w, /images/hero-interior.webp 1376w"
          imageSizes="(min-width: 1024px) 45vw, (min-width: 448px) 448px, calc(100vw - 32px)"
        />
      </Helmet>
      {/* Soft luxury backdrop — warm cream with gold glows */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf6] via-[#faf7f0] to-[#f3ecdd]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_15%,rgba(212,160,23,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_5%_90%,rgba(201,162,39,0.10),transparent)]" />
        {/* fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(120,100,60,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,100,60,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pt-36 pb-14 sm:px-6 lg:px-12 lg:pt-40 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* LEFT — copy & CTAs */}
          <div className="max-w-2xl">
            {/* Top trust badges — three only, so the offer above the fold stays clear */}
            <motion.div {...anim(0.1)} className="mb-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs shadow-xs transition-all ${badge.color}`}
                >
                  <badge.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-wider sm:text-[11px]">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Main Heading & Subtitle */}
            <motion.div {...anim(0.2)} className="mb-7">
              <h1 className="mb-4 font-serif text-3xl font-black leading-[1.12] tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
                Forbesganj &amp; Araria&rsquo;s
                <br />
                <span className="hero-gradient-text">False Ceiling &amp; Interior Contractor</span>
              </h1>
              <p className="max-w-xl text-sm font-normal leading-relaxed text-stone-600 sm:text-base md:text-lg">
                False ceilings, wall panelling and modular interiors for homes and offices across
                Forbesganj, Araria district and nearby towns — with a free site visit and a written
                quotation.
              </p>
            </motion.div>

            {/* Two primary actions only: call or WhatsApp */}
            <motion.div {...anim(0.3)} className="flex flex-wrap items-center gap-3">
              <CallLink size="lg" shine icon={false} ariaLabel="Call JK Interior for a free rate list and site visit">
                <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                Call for a Free Quotation
              </CallLink>

              <WhatsAppLink
                size="lg"
                ariaLabel="Message JK Interior on WhatsApp for design photographs and rates"
                message="Hello JK Interior, please share design photographs and current rates for interior work."
              >
                Get Designs &amp; Rates on WhatsApp
              </WhatsAppLink>
            </motion.div>
          </div>

          {/* RIGHT — framed luxury showcase image */}
          <motion.div
            {...(shouldReduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 0.9, ease: easeLux, delay: 0.25 },
                })}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* gold gradient frame */}
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-amber-200/70 via-white to-gold-100/60 p-2 shadow-[0_30px_70px_-20px_rgba(120,90,20,0.35)] ring-1 ring-amber-300/40">
              <div className="overflow-hidden rounded-[1.4rem]">
                <picture>
                  <source
                    srcSet="/images/hero-interior-960w.avif 960w, /images/hero-interior.avif 1376w"
                    sizes="(min-width: 1024px) 45vw, (min-width: 448px) 448px, calc(100vw - 32px)"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/hero-interior-960w.webp 960w, /images/hero-interior.webp 1376w"
                    sizes="(min-width: 1024px) 45vw, (min-width: 448px) 448px, calc(100vw - 32px)"
                    type="image/webp"
                  />
                  <motion.img
                    src="/images/hero-interior.webp"
                    alt="False Ceiling Contractor and Interior Designer in Forbesganj Araria Bihar by JK Interior"
                    className="h-64 w-full object-cover object-center sm:h-80 lg:h-[30rem]"
                    // @ts-ignore
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                    initial={shouldReduce ? {} : { scale: 1.08 }}
                    animate={shouldReduce ? {} : { scale: 1 }}
                    transition={{ duration: 12, ease: "easeOut" }}
                  />
                </picture>
              </div>
            </div>

            {/* Floating reviews chip — links to the Google Business Profile, where
                the reviews live. No rating number is hard-coded here: it would go
                stale, and only Google's own figure is authoritative. */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read JK Interior reviews on Google — opens the Google Business Profile"
              className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-sm transition-colors hover:border-amber-300 hover:bg-white sm:-left-5"
            >
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-sm font-black text-stone-900">
                  Reviews
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                    ))}
                  </span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500">On Google</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Quiet link to the gallery — not a third CTA, just a way to browse work */}
        <motion.div {...anim(0.4)} className="mt-10 lg:mt-12">
          <Link
            href="/gallery"
            aria-label="View the JK Interior project gallery"
            className="group inline-flex items-center gap-2 text-sm font-bold text-gold-800 underline decoration-gold-400 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
          >
            View completed work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
