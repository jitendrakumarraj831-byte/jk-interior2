"use client";

import {
  ShieldCheck,
  Droplets,
  Clock,
  Sparkles,
  Award,
  HeartHandshake,
  Gem,
  BadgeCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const easeLux = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Materials",
    titleHi: "प्रीमियम क्वालिटी मटेरियल",
    desc: "We use only ISI-certified, branded materials for every installation. No compromises on quality — your home deserves the best.",
    descHi: "हर इंस्टॉलेशन में सिर्फ ISI-प्रमाणित, ब्रांडेड मटेरियल। क्वालिटी पर कोई समझौता नहीं।",
    color: "from-blue-600 to-blue-700",
    iconColor: "text-blue-600",
    number: "01",
  },
  {
    icon: Droplets,
    title: "100% Waterproof Solutions",
    titleHi: "100% वॉटरप्रूफ समाधान",
    desc: "Every product we install is fully waterproof — PVC panels, WPC boards, and UV marble sheets built to withstand Bihar's monsoon.",
    descHi: "हमारा हर प्रोडक्ट पूरी तरह वॉटरप्रूफ है — बिहार की बारिश को सहने के लिए बना।",
    color: "from-cyan-500 to-cyan-600",
    iconColor: "text-cyan-600",
    number: "02",
  },
  {
    icon: Clock,
    title: "Fast & On-Time Delivery",
    titleHi: "तेज़ और समय पर डिलीवरी",
    desc: "We respect your time. Our team completes projects on schedule with zero delays — from site visit to final finish.",
    descHi: "हम आपके समय का सम्मान करते हैं। साइट विज़िट से फाइनल फिनिश तक — शेड्यूल पर।",
    color: "from-amber-500 to-amber-600",
    iconColor: "text-amber-600",
    number: "03",
  },
  {
    icon: Sparkles,
    title: "Dust-Free Installation",
    titleHi: "डस्ट-फ्री इंस्टॉलेशन",
    desc: "Our clean installation process keeps your home spotless. No mess, no dust — just a beautiful new interior.",
    descHi: "हमारी साफ़ प्रक्रिया आपके घर को साफ़ रखती है। कोई गंदगी नहीं, सिर्फ़ खूबसूरती।",
    color: "from-emerald-500 to-emerald-600",
    iconColor: "text-emerald-600",
    number: "04",
  },
  {
    icon: Award,
    title: "5 Year Written Warranty",
    titleHi: "5 साल की लिखित वारंटी",
    desc: "Every project comes with a written 5-year warranty. We stand behind our work — that's the JK Interior guarantee.",
    descHi: "हर प्रोजेक्ट के साथ 5 साल की लिखित वारंटी। हम अपने काम के पीछे खड़े हैं।",
    color: "from-slate-600 to-slate-700",
    iconColor: "text-slate-600",
    number: "05",
  },
  {
    icon: HeartHandshake,
    title: "Free Site Visit & Quote",
    titleHi: "मुफ़्त साइट विज़िट और कोट",
    desc: "Get a free expert site visit and detailed quotation — no obligation, no hidden charges. Transparent pricing always.",
    descHi: "मुफ़्त एक्सपर्ट साइट विज़िट और विस्तृत कोटेशन — कोई छुपा हुआ खर्चा नहीं।",
    color: "from-blue-700 to-blue-800",
    iconColor: "text-blue-700",
    number: "06",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JK Interior",
  description:
    "Best interior designer in Forbesganj, Araria, Bihar. Specializing in PVC false ceiling, gypsum ceiling, WPC wall paneling, UV marble sheet, and modular TV unit installation.",
  url: "https://jkinterior.in",
  telephone: "+918651070831",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Forbesganj",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Forbesganj" },
    { "@type": "City", name: "Araria" },
    { "@type": "State", name: "Bihar" },
  ],
  serviceType: [
    "PVC False Ceiling Installation",
    "Gypsum Ceiling Design",
    "WPC Wall Paneling",
    "UV Marble Sheet Installation",
    "Modular TV Unit Design",
    "Interior Design",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "100",
  },
};

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.15, 0.4, 0.15],
        scale: [0.9, 1.05, 0.9],
        y: [0, -12, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function WhyUs() {
  const shouldReduce = useReducedMotion();

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: easeLux },
      };

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        },
      };

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeLux },
          },
        },
      };

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-24 lg:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(245,158,11,0.05),transparent)]" />
        <FloatingOrb
          className="absolute -top-16 left-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-500/4 blur-3xl"
          delay={3}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          {...animProps}
          className="mb-14 text-center sm:mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 sm:text-xs">
              Why Choose Us
            </span>
          </div>

          <h2
            id="why-us-heading"
            className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Why JK Interior is{" "}
            <span className="bg-gradient-to-r from-blue-400 via-amber-400 to-blue-400 bg-clip-text text-transparent">
              the Best Choice
            </span>
          </h2>

          <p className="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-300 sm:text-lg md:text-xl">
            फारबिसगंज और आररिया में इंटीरियर के लिए JK Interior सबसे भरोसेमंद
          </p>
          <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
            Premium materials, expert craftsmanship, and a commitment to
            excellence — that's what sets us apart.
          </p>

          {/* Animated underline */}
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
            className="mx-auto mt-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-blue-400 via-amber-400 to-blue-400"
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              {...staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-slate-600/60 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-blue-500/5 sm:rounded-3xl sm:p-6 lg:p-7"
            >
              {/* Number */}
              <span className="absolute top-4 right-4 text-4xl font-black text-slate-700/40 transition-colors duration-300 group-hover:text-slate-600/50 sm:top-5 sm:right-5 sm:text-5xl">
                {reason.number}
              </span>

              {/* Icon */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${reason.color} shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}
              >
                <reason.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-1.5 text-lg font-bold text-white sm:text-xl">
                {reason.title}
              </h3>
              <p className="mb-3 text-sm font-medium text-slate-400 sm:text-base">
                {reason.titleHi}
              </p>
              <p className="mb-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                {reason.desc}
              </p>
              <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                {reason.descHi}
              </p>

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(37,99,235,0.1), 0 0 40px -10px rgba(37,99,235,0.06)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          {...animProps}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 sm:mt-14 sm:gap-6 sm:text-base lg:mt-16"
        >
          <div className="flex items-center gap-2">
            <Gem className="h-4 w-4 text-amber-400" />
            <span>Trusted by 100+ Homeowners</span>
          </div>
          <span className="hidden text-slate-600 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-blue-400" />
            <span>ISI-Certified Materials</span>
          </div>
          <span className="hidden text-slate-600 sm:inline">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>5-Year Written Warranty</span>
          </div>
        </motion.div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden SEO text */}
      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>
          JK Interior is the most trusted interior design company in Forbesganj
          and Araria, Bihar. We provide premium quality PVC false ceiling
          installation, gypsum ceiling design, WPC wall paneling, UV marble
          sheet, and modular TV unit design. Our services are 100% waterproof,
          dust-free, and come with a 5-year written warranty. We are the top
          false ceiling contractor in Bihar offering free site visits and
          transparent pricing.
        </p>
      </div>
    </section>
  );
                  }
