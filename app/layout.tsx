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
  url: 'https://www.jkinterior.online/',
  siteName: 'JK Interior',
  images: [
    {
      url: 'https://www.jkinterior.online/og-image.jpg', // ✅ FULL URL जरूरी
      width: 1200,
      height: 630,
      alt: 'JK Interior Services - PVC Paneling and Ceiling',
    },
  ],
  type: 'website',
},
  // 6. Icons (Aapka "Gol Chakkar" wala logo fix karne ke liye)
  icons: {
    icon: '/favicon.png', // Jo aapne abhi upload kiya hai
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
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
  <body className="font-mono min-h-screen bg-background text-foreground antialiased selection:bg-gold/25 selection:text-foreground">
    <AnimatedAura />
    <div className="relative z-10 min-h-screen">

    {/* SEO Schema (Google ke liye) */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "JK Interior",
          url: "https://www.jkinterior.online",
          telephone: "+918541849118",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Forbesganj",
            addressRegion: "Bihar",
            addressCountry: "IN"
          },
          description:
            "JK Interior provides gypsum ceiling, POP design, PVC wall paneling and interior services in Forbesganj, Bihar."
        })
      }}
    />

    {children}

    <Analytics />
    </div>
  </body>
</html>
  )
}
