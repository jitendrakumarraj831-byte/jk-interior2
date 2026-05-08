"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, ShieldCheck, CircleCheck as CheckCircle2, Droplets, Sparkles, Clock, MessageCircle, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const easeLux = [0.22, 1, 0.36, 1] as const;

const words = [
  "PVC False Ceiling",
  "WPC Wall Paneling",
  "UV Marble Sheet",
  "Modular TV Unit",
  "Gypsum Ceiling",
];

const stats = [
  { value: "5000+", label: "Sqft Installed" },
  { value: "100+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction" },
];

const trustBadges = [
  { icon: Star, label: "5-Star Rated", accent: "amber" },
  { icon: MapPin, label: "Forbesganj \u2022 Araria", accent: "blue" },
  { icon: ShieldCheck, label: "Premium Quality", accent: "emerald" },
  { icon: Droplets, label: "Waterproof", accent: "cyan" },
  { icon: Sparkles, label: "Dust-Free Install", accent: "violet" },
  { icon: Clock, label: "Fast Installation", accent: "orange" },
];

const featureCards = [
  {
    icon: Layers,
    title: "False Ceiling",
    color: "from-blue-600 to-blue-700",
    desc: "PVC & Gypsum Experts",
  },
  {
    icon: PanelTop,
    title: "Wall Paneling",
    color: "from-amber-500 to-amber-600",
    desc: "WPC & UV Marble",
  },
  {
    icon: Tv,
    title: "Modular Units",
    color: "from-slate-700 to-slate-800",
    desc: "Luxury TV Units",
  },
];

const floatingCards = [
  { label: "Waterproof", icon: Droplets, color: "text-cyan-500" },
  { label: "Modern Design", icon: Sparkles, color: "text-amber-500" },
  { label: "Premium Finish", icon: ShieldCheck, color: "text-emerald-500" },
  { label: "5 Year Warranty", icon: CheckCircle2, color: "text-blue-500" },
];

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
        opacity: [0.3, 0.6, 0.3],
        scale: [0.9, 1.1, 0.9],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: easeLux },
      };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
      aria-label="JK Interior - Premium Interior Design in Forbesganj"
    >
      {/* Background Layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(245,158,11,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(14,165,233,0.05),transparent)]" />

        {/* Floating orbs */}
        <FloatingOrb
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-amber-400/8 blur-3xl"
          delay={2}
        />
        <FloatingOrb
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/6 blur-3xl"
          delay={4}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-start justify-center px-5 pt-20 pb-16 sm:px-6 lg:px-12 lg:pt-24 lg:pb-12">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">
            {/* Trust Badges */}
            <motion.div
              {...animProps}
              className="mb-6 flex flex-wrap gap-2 sm:gap-3"
              style={shouldReduce ? {} : { transitionDelay: "0.1s" }}
            >
              {trustBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 ${
                    badge.accent === "amber"
                      ? "border-amber-200/80 bg-amber-50/70"
                      : badge.accent === "blue"
                      ? "border-blue-200/80 bg-blue-50/60"
                      : badge.accent === "emerald"
                      ? "border-emerald-200/80 bg-emerald-50/60"
                      : badge.accent === "cyan"
                      ? "border-cyan-200/80 bg-cyan-50/60"
                      : "border-slate-200/80 bg-slate-50/60"
                  }`}
                >
                  <badge.icon
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      badge.accent === "amber"
                        ? "text-amber-500"
                        : badge.accent === "blue"
                        ? "text-blue-600"
                        : badge.accent === "emerald"
                        ? "text-emerald-600"
                        : badge.accent === "cyan"
                        ? "text-cyan-600"
                        : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${
                      badge.accent === "amber"
                        ? "text-amber-800"
                        : badge.accent === "blue"
                        ? "text-blue-700"
                        : badge.accent === "emerald"
                        ? "text-emerald-700"
                        : badge.accent === "cyan"
                        ? "text-cyan-700"
                        : "text-slate-600"
                    }`}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Main Heading */}
            <motion.div
              {...animProps}
              className="relative mb-6"
              style={shouldReduce ? {} : { transitionDelay: "0.2s" }}
            >
              <h1 className="font-black leading-[0.88] tracking-tighter text-slate-900">
                <span
                  className="block"
                  style={{ fontSize: "clamp(3.2rem, 11vw, 7rem)" }}
                >
                  JK
                </span>
                <span
                  className="hero-gradient-text block"
                  style={{
                    fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
                    letterSpacing: "0.14em",
                  }}
                >
                  INTERIOR
                </span>
              </h1>
              <motion.div
                initial={shouldReduce ? {} : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: easeLux }}
                className="mt-4 h-1.5 w-28 origin-left rounded-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600"
              />
            </motion.div>

            {/* Sliding Sub-headline */}
            <motion.div
              {...animProps}
              className="mb-6 h-12 sm:h-14 md:h-16"
              style={shouldReduce ? {} : { transitionDelay: "0.3s" }}
            >
              <h2 className="text-xl font-bold text-slate-500 sm:text-2xl md:text-3xl lg:text-4xl">
                Specialist in{" "}
                <span className="relative inline-block overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={shouldReduce ? {} : { y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={shouldReduce ? {} : { y: -30, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeLux }}
                      className="block font-black hero-gradient-text"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </motion.div>

            {/* Hindi Marketing Text */}
            <motion.div
              {...animProps}
              className="mb-8 max-w-xl"
              style={shouldReduce ? {} : { transitionDelay: "0.4s" }}
            >
              <h3 className="mb-3 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                साधारण दीवारों को दें
                <br />
                <span className="mt-2 inline-block skew-x-[-3deg] bg-slate-900 px-3 py-1 text-white">
                  एक शाही पहचान
                </span>
              </h3>
              <p className="text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                हम लेकर आए हैं फारबिसगंज में इंटीरियर का{" "}
                <span className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4">
                  Next-Level Experience
                </span>
                । मजबूती और खूबसूरती का बेजोड़ संगम।
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...animProps}
              className="flex flex-wrap gap-3 sm:gap-4"
              style={shouldReduce ? {} : { transitionDelay: "0.5s" }}
            >
              <Button
                asChild
                size="lg"
                className="group relative h-14 overflow-hidden rounded-xl bg-blue-600 px-7 text-base font-bold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:h-16 sm:rounded-2xl sm:px-10 sm:text-lg"
              >
                <a
                  href="tel:+918651070831"
                  className="flex items-center gap-2 sm:gap-3"
                  aria-label="Call for free quotation"
                >
                  <Phone className="h-4 w-4 animate-pulse sm:h-5 sm:w-5" />
                  फ्री कोटेशन लें
                  {!shouldReduce && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                        repeatDelay: 1.5,
                      }}
                      style={{ skewX: -20, width: "30%" }}
                    />
                  )}
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="group relative h-14 overflow-hidden rounded-xl bg-emerald-600 px-7 text-base font-bold shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 sm:h-16 sm:rounded-2xl sm:px-10 sm:text-lg"
              >
                <a
                  href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3"
                  aria-label="WhatsApp us now"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  WhatsApp Now
                  {!shouldReduce && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                        repeatDelay: 1.5,
                        delay: 0.5,
                      }}
                      style={{ skewX: -20, width: "30%" }}
                    />
                  )}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-xl border-2 border-slate-200 bg-white px-6 text-base font-bold transition-all hover:border-blue-600 hover:text-blue-600 sm:h-16 sm:rounded-2xl sm:px-8 sm:text-lg"
              >
                <Link
                  href="#services"
                  className="flex items-center gap-2"
                  aria-label="View our services"
                >
                  सेवाएँ देखें
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Extra trust line */}
            <motion.div
              {...animProps}
              className="mt-5 flex items-center gap-2 text-sm text-slate-500"
              style={shouldReduce ? {} : { transitionDelay: "0.6s" }}
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Free Site Visit Available</span>
              <span className="mx-1 text-slate-300">|</span>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>5 Year Warranty</span>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Feature Cards */}
            <motion.div
              {...animProps}
              className="grid grid-cols-1 gap-3 sm:gap-4"
              style={shouldReduce ? {} : { transitionDelay: "0.3s" }}
            >
              {featureCards.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-200 hover:shadow-lg hover:shadow-blue-500/5 sm:gap-5 sm:p-6"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:rounded-2xl`}
                  >
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                  <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-6 sm:w-6" />
                </div>
              ))}
            </motion.div>

            {/* Floating capability cards */}
            <motion.div
              {...animProps}
              className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3"
              style={shouldReduce ? {} : { transitionDelay: "0.5s" }}
            >
              {floatingCards.map((card) => (
                <div
                  key={card.label}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white/70 px-3 py-2.5 backdrop-blur-sm transition-all duration-200 hover:border-slate-200 hover:shadow-sm sm:rounded-xl sm:px-4 sm:py-3"
                >
                  <card.icon className={`h-4 w-4 shrink-0 ${card.color}`} />
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    {card.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              {...animProps}
              className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-900 p-5 shadow-xl sm:mt-8 sm:grid-cols-4 sm:rounded-3xl sm:p-6 lg:grid-cols-4"
              style={shouldReduce ? {} : { transitionDelay: "0.6s" }}
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black text-blue-400 sm:text-2xl lg:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex gap-3">
          <a
            href="tel:+918651070831"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md active:bg-blue-700"
            aria-label="Call now"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md active:bg-emerald-700"
            aria-label="WhatsApp now"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Hidden SEO Rich Text */}
      <div className="sr-only" aria-hidden="true">
        <h1>JK Interior - Best Interior Designer in Forbesganj, Araria, Bihar</h1>
        <p>
          JK Interior is the leading interior design company in Forbesganj and
          Araria, Bihar. We specialize in PVC False Ceiling, Gypsum Ceiling, WPC
          Wall Paneling, UV Marble Sheet installation, and Modular TV Unit
          design. Our expert team delivers premium quality interior solutions
          with waterproof materials, dust-free installation, and 5-year warranty.
          Get free site visit and quotation for your home or office interior in
          Forbesganj, Araria, and nearby areas in Bihar.
        </p>
        <p>
   
