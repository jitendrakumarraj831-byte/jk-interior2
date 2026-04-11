"use client"

import { useEffect, useRef } from "react"
import { Check, Info, Layout, Layers, Box, Maximize, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"

const services = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    useCase: "लिविंग रूम, बेडरूम और डाइनिंग हॉल के लिए बेस्ट।",
    specialty: "स्मूथ फिनिश और क्रिएटिव लाइटिंग डिजाइन।",
    benefit: "गर्मी से राहत (Heat Insulation) और लग्जरी लुक।",
    desc: "Gypsum false ceiling gives a modern and elegant look to your home.",
    image: "/images/gypsum-ceiling.jpg",
    alt: "Gypsum false ceiling design in Forbesganj Bihar",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: "PVC Ceiling",
    titleHi: "PVC सीलिंग",
    useCase: "किचन, बाथरूम, बालकनी और नमी वाली जगहों के लिए।",
    specialty: "100% वाटरप्रूफ और दीमक-रहित (Termite Proof)।",
    benefit: "कम मेंटेनेंस और पेंट करवाने की जरूरत नहीं।",
    desc: "PVC ceiling is waterproof, durable and low maintenance.",
    image: "/images/pvc-ceiling.jpg",
    alt: "PVC ceiling panel installation Forbesganj",
    icon: <Box className="w-5 h-5" />,
  },
  {
    title: "WPC Louvers",
    titleHi: "WPC लूवर्स",
    useCase: "टीवी यूनिट, मेन गेट वॉल और एक्सटीरियर डिजाइन में।",
    specialty: "असली लकड़ी जैसा प्रीमियम वुडेन लुक।",
    benefit: "धूप और पानी से खराब नहीं होता, सालों साल नया रहता है।",
    desc: "WPC louvers give a premium wooden finish to walls.",
    image: "/images/wpc-louvers.jpg",
    alt: "WPC louvers wall panel design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    useCase: "बाथरूम, किचन बैक-स्प्लैश और हाईलाइट दीवारों पर।",
    specialty: "असली इटालियन मार्बल जैसी हाई-ग्लॉस फिनिश।",
    benefit: "मार्बल से बहुत सस्ता और इंस्टॉलेशन में बहुत आसान।",
    desc: "UV marble sheets provide a luxurious marble finish.",
    image: "/images/uv-marble.jpg",
    alt: "UV marble sheet wall cladding Bihar",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Fluted Panels",
    titleHi: "फ्लूटेड पैनल",
    useCase: "बेडरूम बेड-बैक और ड्राइंग रूम की दीवारों के लिए।",
    specialty: "दीवारों को आधुनिक 3D टेक्सचर और गहराई देता है।",
    benefit: "साधारण दीवार को भी तुरंत लग्जरी लुक में बदल देता है।",
    desc: "Fluted panels are modern decorative wall panels.",
    image: "/images/fluted-panels.jpg",
    alt: "Fluted wall panels interior design",
    icon: <Maximize className="w-5 h-5" />,
  },
  {
    title: "TV Unit Design",
    titleHi: "TV यूनिट डिजाइन",
    useCase: "लिविंग रूम और मास्टर बेडरूम को सजाने के लिए।",
    specialty: "कस्टमाइज्ड स्टोरेज और हिडन वायरिंग मैनेजमेंट।",
    benefit: "आपका टीवी एरिया व्यवस्थित, साफ़ और सुंदर दिखता है।",
    desc: "We design and install modern TV units.",
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
  }
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal-card")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
  ref={sectionRef}
  id="services"
  className="bg-background py-32 overflow-hidden relative"
>
  {/* subtle glow */}
  <div className="absolute -top-32 -left-32 h-96 w-96 bg-gold/10 blur-3xl rounded-full animate-soft-glow" />
  <div className="absolute bottom-0 right-0 h-96 w-96 bg-gold/10 blur-3xl rounded-full animate-soft-glow" />

  <div className="mx-auto max-w-7xl px-6">
    
    {/* Header */}
    <header className="mb-20 text-center space-y-4">
      <div className="flex justify-center">
        <span className="px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-bold">
          Our Expertise / हमारी विशेषज्ञता
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-black text-foreground">
        Premium <span className="text-gold">Interior</span> Services
      </h2>

      <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-lg">
        JK Interior Forbesganj आपके सपनों के घर के लिए सबसे बेहतरीन और मज़बूत सोल्यूशन्स प्रदान करता है।
      </p>
    </header>

    {/* Grid */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.title}
          className="reveal-card group relative bg-card/70 backdrop-blur-xl border border-border/50 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-gold/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10 opacity-0 translate-y-10"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Icon */}
            <div className="absolute top-6 left-6 p-3 bg-background/60 backdrop-blur-xl border border-border rounded-2xl text-gold shadow-lg">
              {service.icon}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors">
                {service.title}
              </h3>

              <p className="text-gold-light/70 text-xs font-bold uppercase tracking-widest italic">
                {service.titleHi}
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="flex gap-3">
                <div className="mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  <span className="text-foreground">उपयोग:</span> {service.useCase}
                </p>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <Info className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  <span className="text-foreground">खासियत:</span> {service.specialty}
                </p>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <Check className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  <span className="text-foreground">फायदा:</span> {service.benefit}
                </p>
              </div>

            </div>

            {/* Glow */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </article>
      ))}
    </div>
      </div>

      <style jsx>{`
        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}
