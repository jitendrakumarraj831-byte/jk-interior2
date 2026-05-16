import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Chatbot from '@/components/chatbot'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jkinterior.online'),
  title: 'JK Interior – PVC Wall Paneling & False Ceiling | Forbesganj, Bihar',
  description:
    'JK Interior offers expert PVC wall paneling, false ceiling, WPC louvers, and fluted panel installation in Forbesganj, Narpatganj, Jogbani, and Araria Bihar. Affordable price, modern designs & professional service. Call +91 8651070831.',
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
    'best false ceiling price in Bihar',
    'low cost interior design in Forbesganj',
    'JK Interior Forbesganj',
    'JK Interior Bihar',
    'Interior designer Jogbani Bihar',
    'False ceiling Araria district',
    'interior designer in Araria',
    'interior designer in Purnia',
    'PVC ceiling in Forbesganj',
    'Gypsum ceiling in Araria',
    'WPC panel in Bihar',
    'UV marble sheet in Purnia',
    'false ceiling contractor in Bihar',
    'modular TV unit in Bihar',
    'waterproof wall panel Bihar',
    'best interior designer near me Bihar',
  ].join(', '),
  alternates: {
    canonical: 'https://www.jkinterior.online',
  },
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
  openGraph: {
    title: 'JK Interior – Premium Interior & Ceiling Experts in Bihar',
    description:
      'Premium interior design, WPC louvers, PVC wall paneling and false ceiling solutions in Forbesganj, Araria, Purnia and across Bihar.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'JK Interior – Premium Interior & Ceiling Experts in Bihar',
    description:
      'Premium interior design, WPC louvers, PVC wall paneling in Forbesganj, Narpatganj and across Bihar.',
    images: ['https://www.jkinterior.online/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'JK Interior',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    google: 'd6c219631efc2528',
  },
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
    'format-detection': 'telephone=yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#071126',
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
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://api.groq.com" />
      </head>
      <body className="font-inter min-h-screen text-foreground antialiased" suppressHydrationWarning>

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
                      opens: "09:00",
                      closes: "19:00",
                    },
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Interior & Ceiling Services – Araria, Forbesganj, Bihar",
                    itemListElement: [
                      "PVC False Ceiling",
                      "Gypsum Ceiling",
                      "WPC Wall Panel",
                      "UV Marble Sheet",
                      "Modular TV Unit",
                      "Complete Interior Design",
                      "Bedroom Interior",
                      "Kitchen Interior",
                      "Office Interior",
                      "ACP Exterior",
                      "Louvers Panel",
                      "Charcoal Panel",
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
                  inLanguage: ["en-IN", "hi-IN"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.jkinterior.online/?s={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.jkinterior.online/#organization",
                  name: "JK Interior",
                  url: "https://www.jkinterior.online",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.jkinterior.online/logo.png",
                    width: 180,
                    height: 70,
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+91-8651070831",
                      contactType: "customer service",
                      areaServed: "IN",
                      availableLanguage: ["Hindi", "English"],
                      contactOption: "TollFree",
                    },
                    {
                      "@type": "ContactPoint",
                      telephone: "+91-8541849118",
                      contactType: "sales",
                      areaServed: "IN",
                      availableLanguage: ["Hindi", "English"],
                    },
                  ],
                  sameAs: [
                    "https://www.facebook.com/jkinterior",
                    "https://www.instagram.com/jkinterior",
                  ],
                },
              ],
            }),
          }}
        />


        <div className="relative z-10 min-h-screen">
          {children}
        </div>

        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
