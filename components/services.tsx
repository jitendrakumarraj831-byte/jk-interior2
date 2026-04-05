"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const services = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    desc: "Gypsum false ceiling gives a modern and elegant look to your home. It allows creative lighting designs and improves the overall interior appearance.",
    descHi: "जिप्सम फॉल्स सीलिंग आपके घर को मॉडर्न और आकर्षक लुक देती है। इसमें आप सुंदर लाइटिंग डिजाइन लगाकर पूरे कमरे को शानदार बना सकते हैं।",
    image: "/images/gypsum-ceiling.jpg",
    alt: "Gypsum false ceiling design in Forbesganj Bihar | जिप्सम फॉल्स सीलिंग",
    keywords: "gypsum false ceiling, jipsam ceiling, pop false ceiling design Forbesganj Bihar",
  },
  {
    title: "PVC Ceiling",
    titleHi: "PVC सीलिंग",
    desc: "PVC ceiling is waterproof, durable and low maintenance. It is perfect for modern interiors and long-lasting ceiling designs.",
    descHi: "PVC सीलिंग पानी से सुरक्षित, मजबूत और कम मेंटेनेंस वाली होती है। यह आधुनिक इंटीरियर के लिए बहुत अच्छा विकल्प है।",
    image: "/images/pvc-ceiling.jpg",
    alt: "PVC ceiling panel installation Forbesganj | waterproof ceiling",
    keywords: "PVC ceiling, plastic ceiling panel, waterproof ceiling Bihar",
  },
  {
    title: "Grid Ceiling",
    titleHi: "ग्रिड सीलिंग",
    desc: "Grid ceiling is widely used in offices and commercial spaces. It provides easy maintenance and a clean professional look.",
    descHi: "ग्रिड सीलिंग ऑफिस और कमर्शियल जगहों में ज्यादा इस्तेमाल होती है। यह साफ-सुथरा और प्रोफेशनल लुक देती है।",
    image: "/images/grid-ceiling.jpg",
    alt: "Grid ceiling for office Forbesganj | T-grid ceiling",
    keywords: "grid ceiling, T grid ceiling, office false ceiling Forbesganj",
  },
  {
    title: "WPC Louvers",
    titleHi: "WPC लूवर्स",
    desc: "WPC louvers give a premium wooden finish to walls and ceilings and enhance interior beauty.",
    descHi: "WPC लूवर्स दीवारों और सीलिंग को लकड़ी जैसा प्रीमियम लुक देते हैं और इंटीरियर को शानदार बनाते हैं।",
    image: "/images/wpc-louvers.jpg",
    alt: "WPC louvers wall panel design | wooden finish panel",
    keywords: "WPC louvers, WPC panel, wooden wall panel Forbesganj",
  },
  {
    title: "Fluted Panels",
    titleHi: "फ्लूटेड पैनल",
    desc: "Fluted panels are modern decorative wall panels used to create stylish interiors.",
    descHi: "फ्लूटेड पैनल आधुनिक डेकोरेटिव वॉल पैनल होते हैं जो कमरे को स्टाइलिश बनाते हैं।",
    image: "/images/fluted-panels.jpg",
    alt: "Fluted wall panels for interior design | decorative wall",
    keywords: "fluted panels, fluted wall panel, 3D wall panel Bihar",
  },
  {
    title: "TV Unit Design",
    titleHi: "TV यूनिट डिजाइन",
    desc: "We design and install modern TV units that make your living room organized and attractive.",
    descHi: "हम मॉडर्न TV यूनिट डिजाइन और इंस्टॉल करते हैं जिससे आपका लिविंग रूम सुंदर और व्यवस्थित दिखता है।",
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj | living room interior",
    keywords: "TV unit design, TV cabinet, living room interior Forbesganj",
  },
  {
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    desc: "UV marble sheets provide a luxurious marble finish on walls with easy installation.",
    descHi: "UV मार्बल शीट दीवारों पर मार्बल जैसा शानदार लुक देती है और आसानी से लगाई जा सकती है।",
    image: "/images/uv-marble.jpg",
    alt: "UV marble sheet wall cladding | marble finish sheet",
    keywords: "UV marble sheet, marble sheet for wall, PVC marble sheet Bihar",
  },
  {
    title: "Artificial Grass",
    titleHi: "आर्टिफिशियल ग्रास",
    desc: "Artificial grass is perfect for balconies, walls and outdoor decoration.",
    descHi: "आर्टिफिशियल ग्रास बालकनी, दीवार और आउटडोर सजावट के लिए बहुत अच्छा विकल्प है।",
    image: "/images/artificial-grass.jpg",
    alt: "Artificial grass for balcony and wall decoration",
    keywords: "artificial grass, synthetic grass wall, balcony grass decoration",
  },
  {
    title: "Partition Wall",
    titleHi: "पार्टिशन वॉल",
    desc: "We create PVC and gypsum partition walls for offices and homes to divide spaces smartly.",
    descHi: "हम ऑफिस और घरों के लिए PVC और जिप्सम से पार्टिशन वॉल बनाते हैं जिससे जगह को अच्छे से अलग किया जा सके।",
    image: "/images/partition-wall.jpg",
    alt: "PVC gypsum partition wall for office and home Forbesganj",
    keywords: "partition wall, gypsum partition, PVC partition Forbesganj Bihar",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // JSON-LD Schema for SEO (Service List)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "JK Interior Services - False Ceiling & Interior Work Forbesganj Bihar",
    "description": "Gypsum false ceiling, PVC ceiling, grid ceiling, WPC louvers, fluted panels, TV unit, UV marble sheet, artificial grass, partition wall in Forbesganj Bihar",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "alternateName": service.titleHi,
      "description": service.desc,
      "areaServed": "Forbesganj, Bihar, India",
      "provider": {
        "@type": "LocalBusiness",
        "name": "JK Interior"
      }
    }))
  }

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section ref={sectionRef} id="services" className="bg-background py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4">

          {/* Section header */}
          <header className="reveal mb-16 text-center opacity-0">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
              Our Services / हमारी सेवाएं
            </span>

            <h2 id="services-heading" className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
              Best Interior & False Ceiling Services in Forbesganj Bihar
            </h2>

            <p className="mx-auto max-w-2xl text-muted-foreground font-mono text-sm md:text-base">
              JK Interior is a leading interior designer in Forbesganj Bihar offering complete interior and false ceiling solutions including gypsum false ceiling design, PVC ceiling installation, grid ceiling for offices, WPC louvers, fluted wall panels, TV unit design, UV marble sheets, artificial grass decoration and PVC & gypsum partition walls.
            </p>
          </header>

          {/* Services grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="reveal group cursor-pointer overflow-hidden rounded-xl border border-border bg-card opacity-0 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    title={`${service.title} - JK Interior Forbesganj`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-foreground font-sans">
                    {service.title}
                  </h3>

                  <p className="mb-3 text-xs font-semibold text-primary font-mono">
                    {service.titleHi}
                  </p>

                  <p className="mb-2 text-sm leading-relaxed text-foreground/80 font-mono">
                    {service.desc}
                  </p>

                  <p className="sr-only">{service.keywords}</p>

                  <p className="text-xs leading-relaxed text-muted-foreground font-mono">
                    {service.descHi}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  )
                }
