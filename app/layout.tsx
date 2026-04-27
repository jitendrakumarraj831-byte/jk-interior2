import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import AnimatedAura from '@/components/animated-aura'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  // ✅ VERY IMPORTANT (OG image fix ke liye)
  metadataBase: new URL('https://www.jkinterior.online'),

  // 🎯 Title & Description (SEO optimized)
  title: 'JK Interior – PVC Wall Paneling & False Ceiling | Forbesganj, Bihar',
  description:
    'JK Interior offers expert PVC wall paneling, false ceiling, WPC louvers, and fluted panel installation in Forbesganj, Narpatganj, Jogbani, and Araria Bihar. Affordable price, modern designs & professional service. Call +91 8651070831.',

  // 🔥 Powerful Local + Ranking Keywords
  keywords: [
    'PVC wall paneling Forbesganj',
    'False ceiling contractor Forbesganj',
    'Interior designer Forbesganj Bihar',
    'Best interior designer in Forbesganj',
    'PVC ceiling work Narpatganj',
    'False ceiling work Jogbani',
    'Interior contractor Araria Bihar',
    'PVC wall panel price in Forbesganj Bihar',
    'False ceiling design for hall in Bihar',
    'Gypsum ceiling contractor near me Bihar',
    'WPC louvers installation in Forbesganj',
    'Fluted panel design for TV wall Bihar',
    'Modern TV unit design in Araria',
    'Bedroom false ceiling design Bihar',
    'cheap PVC panel installation near me',
    'best false ceiling price in Bihar',
    'low cost interior design in Forbesganj',
    'interior work contact number Forbesganj',
    'JK Interior Forbesganj',
    'JK Interior Bihar',
    'PVC paneling Narpatganj Bihar',
    'Interior designer Jogbani Bihar',
    'False ceiling Araria district'
  ].join(', '),

  // 3. Canonical URL (Duplicate issue se bachne ke liye)
  alternates: {
    canonical: 'https://www.jkinterior.online',
  },

  // 4. Robots (Google Indexing ke liye)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 5. OpenGraph (Social Media sharing ke liye)
  openGraph: {
    title: 'JK Interior – Modern Interior & Ceiling Work Experts',
    description:
      'Premium interior design, WPC louvers, and PVC wall paneling solutions in Forbesganj, Narpatganj and across Bihar.',
    url: 'https://www.jkinterior.online',
    siteName: 'JK Interior',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.jkinterior.online/og-image.png',
        width: 1376,
        height: 677,
        alt: 'JK Interior – PVC Wall Paneling & False Ceiling in Forbesganj, Bihar',
        type: 'image/png',
      },
    ],
    type: 'website',
  },

  // 5b. Twitter Card (X / WhatsApp preview ke liye)
  twitter: {
    card: 'summary_large_image',
    title: 'JK Interior – Modern Interior & Ceiling Work Experts',
    description:
      'Premium interior design, WPC louvers, and PVC wall paneling in Forbesganj, Narpatganj and across Bihar.',
    images: ['https://www.jkinterior.online/og-image.png'],
  },

  // 6. Icons (Aapka "Gol Chakkar" wala logo fix karne ke liye)
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },

  // 6b. PWA manifest (mobile SEO bonus)
  manifest: '/manifest.webmanifest',

  // 6c. Apple / Microsoft mobile app metadata
  appleWebApp: {
    capable: true,
    title: 'JK Interior',
    statusBarStyle: 'default',
  },

  // 6d. Verification tags – Google Search Console (HTML file already present at /googled6c219631efc2528.html)
  verification: {
    google: 'd6c219631efc2528',
  },

  // 7. Geo / Local SEO meta tags (helps "near me" and local map ranking)
  other: {
    'geo.region': 'IN-BR',
    'geo.placename': 'Forbesganj, Araria, Bihar',
    'geo.position': '26.300100;87.253300',
    ICBM: '26.300100, 87.253300',
    'business:contact_data:locality': 'Forbesganj',
    'business:contact_data:region': 'Bihar',
    'business:contact_data:country_name': 'India',
    'business:contact_data:postal_code': '854318',
    'business:contact_data:phone_number': '+91-8651070831',
    // Phone numbers ko mobile pe auto-detect honay dena (call links work karein)
    'format-detection': 'telephone=yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#dbeafe',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      {/* बॉडी क्लास में ग्रेडिएंट और स्मूथ फॉन्ट जोड़ा गया है */}
      <body className="font-inter min-h-screen text-slate-900 mesh-aurora selection:bg-blue-200 selection:text-blue-950 antialiased">

        <AnimatedAura />

        <div className="relative z-10 min-h-screen">
          
    {/* SEO Schema (Google ke liye) – Enriched LocalBusiness + WebSite + FAQ */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
              "@id": "https://www.jkinterior.online/#business",
              name: "JK Interior",
              alternateName: ["JK Interior Forbesganj", "JK Interior Araria"],
              url: "https://www.jkinterior.online",
              logo: "https://www.jkinterior.online/logo.png",
              image: "https://www.jkinterior.online/og-image.png",
              telephone: ["+91-8651070831", "+91-8541849118"],
              email: "jkinteriorofficial@gmail.com",
              priceRange: "₹₹",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, UPI, Bank Transfer",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Forbesganj Dumariya",
                addressLocality: "Forbesganj",
                addressRegion: "Bihar",
                postalCode: "854318",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 26.3001,
                longitude: 87.2533,
              },
              hasMap: "https://maps.google.com/?cid=12399064569680169254",
              areaServed: [
                { "@type": "City", name: "Forbesganj", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Araria", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Jogbani", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Raniganj", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Narpatganj", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Kursakanta", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Tribeniganj", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Chhatapur", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Supaul", addressRegion: "Bihar", addressCountry: "IN" },
                { "@type": "City", name: "Purnia", addressRegion: "Bihar", addressCountry: "IN" },
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: { "@type": "GeoCoordinates", latitude: 26.3001, longitude: 87.2533 },
                geoRadius: "80000",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "08:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              makesOffer: [
                "False Ceiling Contractor in Araria",
                "PVC Ceiling in Araria",
                "Gypsum Ceiling Services in Forbesganj",
                "Best Interior Designer in Forbesganj",
                "Wall Paneling Forbesganj",
                "WPC Louvers Installation Bihar",
                "TV Unit Design Araria",
                "False Ceiling in Jogbani, Raniganj, Narpatganj",
              ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Interior & Ceiling Services – Araria, Forbesganj, Bihar",
                itemListElement: [
                  "False Ceiling (Gypsum & PVC)",
                  "PVC Wall Paneling",
                  "Gypsum Ceiling Design",
                  "Interior Design",
                  "Wall Paneling",
                  "WPC Louvers",
                  "TV Unit Design",
                  "UV Marble Sheet",
                  "Fluted Panels",
                  "Modular Kitchen",
                ].map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s, areaServed: "Araria, Forbesganj, Bihar" },
                })),
              },
              sameAs: [
                "https://www.facebook.com/jkinterior",
                "https://www.instagram.com/jkinterior",
              ],
              description:
                "JK Interior is a trusted false ceiling contractor and interior designer in Forbesganj, Araria (Bihar). We provide PVC ceiling, gypsum ceiling, wall paneling, WPC louvers and TV unit design services across Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia.",
            },
            {
              "@type": "WebSite",
              "@id": "https://www.jkinterior.online/#website",
              url: "https://www.jkinterior.online",
              name: "JK Interior",
              publisher: { "@id": "https://www.jkinterior.online/#business" },
              inLanguage: "en-IN",
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.jkinterior.online/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Who is the best false ceiling contractor in Araria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "JK Interior is a leading false ceiling contractor in Araria, Bihar with 8+ years of experience and 500+ completed projects across Forbesganj, Araria, Jogbani, Raniganj and Narpatganj. We provide PVC and gypsum ceiling at affordable prices with free site visits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the cost of PVC ceiling in Araria, Bihar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PVC ceiling cost in Araria typically starts from ₹70-₹120 per sq.ft depending on panel quality, design and lighting. Contact JK Interior on +91 8651070831 for a free quote in Forbesganj, Araria, Jogbani or nearby areas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you provide gypsum ceiling services in Forbesganj?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. JK Interior provides gypsum false ceiling, POP design, cove lighting and modern living-room ceiling work throughout Forbesganj and Araria district with on-time delivery and warranty.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which areas does JK Interior serve?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We serve Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia – covering all of Araria, Supaul and Purnia districts of Bihar.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer free consultation and site visit?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, JK Interior offers free consultation and on-site visits anywhere in Araria district and surrounding areas before starting any false ceiling, PVC paneling or interior design project.",
                  },
                },
              ],
            },
          ],
        }),
      }}
    />

    {children}

    <Analytics />
    </div>
  </body>
</html>
  )
}
