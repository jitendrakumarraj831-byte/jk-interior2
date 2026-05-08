"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, PanelTop, Tv, Sparkles, Phone, MessageCircle, ArrowRight, ShieldCheck, Droplets, Clock, CircleCheck as CheckCircle2, Gem, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const easeLux = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: Layers,
    title: "PVC False Ceiling",
    titleHi: "PVC फॉल्स सीलिंग",
    desc: "Premium PVC false ceiling installation with waterproof panels, modern designs, and long-lasting finish. Perfect for homes and offices in Forbesganj.",
    descHi: "वॉटरप्रूफ पैनल, मॉडर्न डिज़ाइन और लंबे समय तक चलने वाली फिनिश के साथ प्रीमियम PVC फॉल्स सीलिंग।",
    color: "from-blue-600 to-blue-700",
    accent: "blue",
    badge: "Most Popular",
    features: ["Waterproof", "Dust-Free", "Fast Install"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Layers,
    title: "Gypsum Ceiling",
    titleHi: "जिप्सम सीलिंग",
    desc: "Elegant gypsum ceiling designs with smooth finish and creative lighting integration. Ideal for luxury interiors in Araria.",
    descHi: "स्मूथ फिनिश और क्रिएटिव लाइटिंग के साथ एलिगेंट जिप्सम सीलिंग डिज़ाइन।",
    color: "from-slate-600 to-slate-700",
    accent: "slate",
    badge: "Premium",
    features: ["Smooth Finish", "Light Ready", "Durable"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: PanelTop,
    title: "WPC Wall Paneling",
    titleHi: "WPC वॉल पैनलिंग",
    desc: "High-quality WPC wall panels that are termite-proof, waterproof, and maintenance-free. Best wall paneling solution in Bihar.",
    descHi: "टर्माइट-प्रूफ, वॉटरप्रूफ और मेंटेनेंस-फ्री हाई-क्वालिटी WPC वॉल पैनल।",
    color: "from-amber-500 to-amber-600",
    accent: "amber",
    badge: "Best Seller",
    features: ["Termite-Proof", "Waterproof", "Zero Maintain"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: PanelTop,
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    desc: "Luxurious UV marble sheets that give the look of real marble at a fraction of the cost. Premium finish for walls in Forbesganj.",
    descHi: "रियल मार्बल जैसा लुक कम कीमत में - प्रीमियम UV मार्बल शीट।",
    color: "from-emerald-500 to-emerald-600",
    accent: "emerald",
    badge: "New",
    features: ["Marble Look", "Scratch-Free", "Easy Clean"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Tv,
    title: "Modular TV Unit",
    titleHi: "मॉड्यूलर TV यूनिट",
    desc: "Custom modular TV units with modern storage solutions and premium finishes. Expert TV unit design in Forbesganj.",
    descHi: "मॉडर्न स्टोरेज और प्रीमियम फिनिश के साथ कस्टम मॉड्यूलर TV यूनिट।",
    color: "from-blue-700 to-blue-800",
    accent: "blue",
    badge: "Trending",
    features: ["Custom Design", "Storage", "Cable Hide"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Sparkles,
    title: "Complete Interior",
    titleHi: "पूर्ण इंटीरियर",
    desc: "End-to-end interior design solutions from ceiling to flooring. The best interior designer in Bihar for your dream home.",
    descHi: "सीलिंग से फ्लोरिंग तक पूर्ण इंटीरियर डिज़ाइन समाधान।",
    color: "from-slate-700 to-slate-800",
    accent: "slate",
    badge: "Complete",
    features: ["Full Design", "Execution", "Warranty"],
    image:
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    label: "Premium Quality",
    sublabel: "Best Materials",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Droplets,
    label: "100% Waterproof",
    sublabel: "Water Resistant",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: Clock,
    label: "Fast Installation",
    sublabel: "On-Time Delivery",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Zap,
    label: "Dust-Free Work",
    sublabel: "Clean Process",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Gem,
    label: "5 Year Warranty",
    sublabel: "Guaranteed",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-100",
  },
  {
    icon: CheckCircle2,
    label: "Free Site Visit",
    sublabel: "No Cost",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
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
        opacity: [0.2, 0.5, 0.2],
        scale: [0.9, 1.05, 0.9],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Services() {
  const shouldReduce = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeLux },
          },
        },
      };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(37,99,235,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(245,158,11,0.04),transparent)]" />
        <FloatingOrb
          className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-blue-400/6 blur-3xl"
          delay={1}
        />
        <FloatingOrb
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber-400/5 blur-3xl"
          delay={3}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div {...animProps} className="mb-14 text-center sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 sm:text-xs">
              Our Services
            </span>
          </div>

          <h2
            id="services-heading"
            className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Premium Interior{" "}
            <span className="hero-gradient-text">Solutions</span>
          </h2>

          <p className="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-500 sm:text-lg md:text-xl">
            हम लेकर आए हैं फारबिसगंज में इंटीरियर का बेस्ट कलेक्शन
          </p>
          <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
            From PVC ceilings to modular TV units — every service crafted with
            precision, waterproof materials, and premium finish.
          </p>

          {/* Animated underline */}
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
            className="mx-auto mt-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600"
          />
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          {...staggerContainer}
          className="mb-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-6 md:gap-4 lg:mb-20"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.label}
              {...staggerItem}
              className={`group flex flex-col items-center gap-1.5 rounded-xl border ${item.border} ${item.bg} p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:gap-2 sm:rounded-2xl sm:p-4`}
            >
              <item.icon className={`h-5 w-5 ${item.color} sm:h-6 sm:w-6`} />
              <span className="text-center text-[10px] font-bold text-slate-700 sm:text-xs">
                {item.label}
              </span>
              <span className="text-[9px] text-slate-400 sm:text-[10px]">
                {item.sublabel}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              {...staggerItem}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:border-slate-200 hover:shadow-xl hover:shadow-blue-500/5 sm:rounded-3xl"
            >
              {/* Image area */}
              <div className="relative h-44 overflow-hidden sm:h-52 lg:h-56">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                {/* Badge */}
                <div
                  className={`absolute top-3 left-3 flex items-center gap-1 rounded-lg bg-gradient-to-r ${service.color} px-2.5 py-1 text-[10px] font-bold text-white shadow-md sm:top-4 sm:left-4 sm:rounded-xl sm:px-3 sm:text-xs`}
                >
                  <Sparkles className="h-3 w-3" />
                  {service.badge}
                </div>

                {/* Icon overlay */}
                <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <service.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>

                {/* Title on image */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <h3 className="text-lg font-black text-white sm:text-xl lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-white/70 sm:text-sm">
                    {service.titleHi}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <p className="mb-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {service.desc}
                </p>
                <p className="mb-4 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {service.descHi}
                </p>

                {/* Feature tags */}
                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 sm:rounded-lg sm:px-2.5 sm:text-xs"
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 sm:h-3 sm:w-3" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+918651070831"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-all hover:bg-blue-700 hover:shadow-md sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                    aria-label={`Call for ${service.title}`}
                  >
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Get Quote
                  </a>
                  <a
                    href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-md sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                    aria-label={`WhatsApp for ${service.title}`}
                  >
                    <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Hover glow border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(37,99,235,0.15), 0 0 30px -5px rgba(37,99,235,0.08)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          {...animProps}
          className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16 lg:mt-20"
        >
          <p className="text-base font-medium text-slate-500 sm:text-lg">
            अपने घर को बनाएं एक शाही महल
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="group relative h-14 overflow-hidden rounded-xl bg-blue-600 px-8 text-base font-bold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:h-16 sm:rounded-2xl sm:px-10 sm:text-lg"
            >
              <a
                href="tel:+918651070831"
                className="flex items-center gap-2 sm:gap-3"
                aria-label="Call for free site visit"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Free Site Visit
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
              className="group relative h-14 overflow-hidden rounded-xl bg-emerald-600 px-8 text-base font-bold shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 sm:h-16 sm:rounded-2xl sm:px-10 sm:text-lg"
            >
              <a
                href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3"
                aria-label="WhatsApp for free quotation"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Get Free Quotation
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
          </div>
        </motion.div>

        {/* Hidden SEO text */}
        <div className="sr-only" aria-hidden="true">
          <h2>
            Best Interior Design Services in Forbesganj, Araria, Bihar
          </h2>
          <p>
            JK Interior offers premium PVC False Ceiling in Forbesganj, Gypsum
            Ceiling in Araria, WPC Wall Paneling in Bihar, UV Marble Sheet
            installation, Modular TV Unit design in Forbesganj, and complete
            interior design solutions. Our services are 100% waterproof,
            dust-free, and come with 5-year warranty. We are the top interior
            designer in Bihar providing free site visits and quotations.
          </p>
        </div>
      </div>
    </section>
  );
    }
