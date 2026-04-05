"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

// अपडेटेड डेटा: उपयोग, खासियत और फायदे के साथ
const services = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    useCase: "लिविंग रूम, बेडरूम और डाइनिंग हॉल के लिए बेस्ट।",
    specialty: "स्मूथ फिनिश और क्रिएटिव लाइटिंग डिजाइन।",
    benefit: "गर्मी से राहत (Heat Insulation) और लग्जरी लुक।",
    desc: "Gypsum false ceiling gives a modern and elegant look to your home. It allows creative lighting designs.",
    descHi: "जिप्सम फॉल्स सीलिंग आपके घर को मॉडर्न और आकर्षक लुक देती है। इसमें आप सुंदर लाइटिंग डिजाइन लगा सकते हैं।",
    image: "/images/gypsum-ceiling.jpg",
    alt: "Gypsum false ceiling design in Forbesganj Bihar",
    keywords: "gypsum false ceiling, jipsam ceiling, pop false ceiling design Forbesganj Bihar",
  },
  {
    title: "PVC Ceiling",
    titleHi: "PVC सीलिंग",
    useCase: "किचन, बाथरूम, बालकनी और नमी वाली जगहों के लिए।",
    specialty: "100% वाटरप्रूफ और दीमक-रहित (Termite Proof)।",
    benefit: "कम मेंटेनेंस और पेंट करवाने की जरूरत नहीं।",
    desc: "PVC ceiling is waterproof, durable and low maintenance. Perfect for long-lasting ceiling designs.",
    descHi: "PVC सीलिंग पानी से सुरक्षित और मजबूत होती है। यह कम मेंटेनेंस वाला सबसे अच्छा विकल्प है।",
    image: "/images/pvc-ceiling.jpg",
    alt: "PVC ceiling panel installation Forbesganj",
    keywords: "PVC ceiling, plastic ceiling panel, waterproof ceiling Bihar",
  },
  {
    title: "WPC Louvers",
    titleHi: "WPC लूवर्स",
    useCase: "टीवी यूनिट, मेन गेट वॉल और एक्सटीरियर डिजाइन में।",
    specialty: "असली लकड़ी जैसा प्रीमियम वुडेन लुक।",
    benefit: "धूप और पानी से खराब नहीं होता, सालों साल नया रहता है।",
    desc: "WPC louvers give a premium wooden finish to walls and ceilings and enhance interior beauty.",
    descHi: "WPC लूवर्स दीवारों को लकड़ी जैसा प्रीमियम लुक देते हैं और इंटीरियर को शानदार बनाते हैं।",
    image: "/images/wpc-louvers.jpg",
    alt: "WPC louvers wall panel design Forbesganj",
    keywords: "WPC louvers, WPC panel, wooden wall panel Forbesganj",
  },
  {
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    useCase: "बाथरूम, किचन बैक-स्प्लैश और हाईलाइट दीवारों पर।",
    specialty: "असली इटालियन मार्बल जैसी हाई-ग्लॉस फिनिश।",
    benefit: "मार्बल से बहुत सस्ता और इंस्टॉलेशन में बहुत आसान।",
    desc: "UV marble sheets provide a luxurious marble finish on walls with easy installation.",
    descHi: "UV मार्बल शीट दीवारों पर मार्बल जैसा शानदार लुक देती है और जल्दी इंस्टॉल हो जाती है।",
    image: "/images/uv-marble.jpg",
    alt: "UV marble sheet wall cladding Bihar",
    keywords: "UV marble sheet, marble sheet for wall, PVC marble sheet Bihar",
  },
  {
    title: "Fluted Panels",
    titleHi: "फ्लूटेड पैनल",
    useCase: "बेडरूम बेड-बैक और ड्राइंग रूम की दीवारों के लिए।",
    specialty: "दीवारों को आधुनिक 3D टेक्सचर और गहराई देता है।",
    benefit: "साधारण दीवार को भी तुरंत लग्जरी लुक में बदल देता है।",
    desc: "Fluted panels are modern decorative wall panels used to create stylish interiors.",
    descHi: "फ्लूटेड पैनल आधुनिक डेकोरेटिव पैनल हैं जो कमरे को स्टाइलिश बनाते हैं।",
    image: "/images/fluted-panels.jpg",
    alt: "Fluted wall panels interior design",
    keywords: "fluted panels, fluted wall panel, 3D wall panel Bihar",
  },
  {
    title: "TV Unit Design",
    titleHi: "TV यूनिट डिजाइन",
    useCase: "लिविंग रूम और मास्टर बेडरूम को सजाने के लिए।",
    specialty: "कस्टमाइज्ड स्टोरेज और हिडन वायरिंग मैनेजमेंट।",
    benefit: "आपका टीवी एरिया व्यवस्थित, साफ़ और सुंदर दिखता है।",
    desc: "We design and install modern TV units that make your living room organized.",
    descHi: "हम मॉडर्न TV यूनिट डिजाइन करते हैं जिससे आपका रूम व्यवस्थित दिखता है।",
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj",
    keywords: "TV unit design, TV cabinet, living room interior Forbesganj",
  },
  {
    title: "Artificial Grass",
    titleHi: "आर्टिफिशियल ग्रास",
    useCase: "बालकनी, छत, और दीवारों की सजावट के लिए।",
    specialty: "हर मौसम में हरा-भरा और सॉफ्ट टच।",
    benefit: "बिना पानी और बिना खाद के प्रकृति का एहसास।",
    desc: "Artificial grass is perfect for balconies, walls and outdoor decoration.",
    descHi: "आर्टिफिशियल ग्रास बालकनी और दीवारों के लिए बेहतरीन सजावट है।",
    image: "/images/artificial-grass.jpg",
    alt: "Artificial grass decoration Forbesganj",
    keywords: "artificial grass, synthetic grass wall, balcony grass decoration",
  },
  {
    title: "Partition Wall",
    titleHi: "पार्टिशन वॉल",
    useCase: "ऑफिस केबिन या घर में स्पेस डिवाइडर के रूप में।",
    specialty: "हल्का वजन और मजबूत स्ट्रक्चर (PVC/Gypsum)।",
    benefit: "ईंट की दीवार से सस्ता और जरूरत पड़ने पर हटाने योग्य।",
    desc: "We create PVC and gypsum partition walls to divide spaces smartly.",
    descHi: "हम ऑफिस और घरों के लिए स्मार्ट पार्टिशन वॉल बनाते हैं।",
    image: "/images/partition-wall.jpg",
    alt: "PVC gypsum partition wall Forbesganj",
    keywords: "partition wall, gypsum partition, PVC partition Forbesganj",
  },
  {
    title: "Grid Ceiling",
    titleHi: "ग्रिड सीलिंग",
    useCase: "ऑफिस, हॉस्पिटल, और कमर्शियल शोरूम के लिए।",
    specialty: "वायरिंग और AC डक्ट्स को आसानी से कवर करता है।",
    benefit: "मेंटेनेंस में आसान और प्रोफेशनल ऑफिस लुक।",
    desc: "Grid ceiling is widely used in commercial spaces for professional look.",
    descHi: "ग्रिड सीलिंग ऑफिस और कमर्शियल जगहों के लिए बेस्ट है।",
    image: "/images/grid-ceiling.jpg",
    alt: "Grid ceiling for office Forbesganj",
    keywords: "grid ceiling, T grid ceiling, office false ceiling Forbesganj",
  }
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "JK Interior Services - False Ceiling & Interior Work Forbesganj Bihar",
    "description": "Gypsum false ceiling, PVC ceiling, grid ceiling, WPC louvers, TV unit, UV marble sheet in Forbesganj Bihar",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "alternateName": service.titleHi,
      "description": service.desc,
      "areaServed": "Forbesganj, Bihar, India",
      "provider": { "@type": "LocalBusiness", "name": "JK Interior" }
    }))
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section ref={sectionRef} id="services" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4">
          <header className="reveal mb-16 text-center opacity-0">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
              Our Services / हमारी सेवाएं
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans">
              Best Interior & False Ceiling Services in Forbesganj Bihar
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground font-mono text-sm md:text-base">
              JK Interior (Forbesganj) आपके घर और ऑफिस के लिए बेस्ट इंटीरियर और फॉल्स सीलिंग सोल्यूशन्स प्रदान करता है।
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="reveal group overflow-hidden rounded-xl border border-border bg-card opacity-0 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-lg">{service.title}</p>
                    <p className="text-primary-foreground/90 text-xs font-medium">{service.titleHi}</p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* कहाँ इस्तेमाल करें */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">📍 कहाँ इस्तेमाल करें:</p>
                    <p className="text-sm text-foreground/90 font-medium">{service.useCase}</p>
                  </div>

                  {/* खासियत */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">✨ खासियत:</p>
                    <p className="text-sm text-foreground/90 font-medium">{service.specialty}</p>
                  </div>

                  {/* फायदा */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">✅ फायदा:</p>
                    <p className="text-sm text-foreground/90 font-medium">{service.benefit}</p>
                  </div>
                  
                  <p className="sr-only">{service.keywords}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
