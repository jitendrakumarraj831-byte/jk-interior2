import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  // 1. Optimized Title & Description for Local SEO
  title: 'JK Interior – PVC Wall Paneling & False Ceiling | Forbesganj, Bihar',
  description:
    'JK Interior provides expert PVC wall paneling, Gypsum false ceiling, WPC louvers, and fluted panels in Forbesganj, Narpatganj, Jogbani, and Araria. Best interior designer in Bihar. Call +91 8651070831.',
  
  // 2. Local & Service Keywords (Jo log search karte hain)
  keywords: [
    'PVC wall paneling Forbesganj',
    'False ceiling contractor Narpatganj',
    'WPC louvers price Bihar',
    'Gypsum ceiling design Araria',
    'Best interior designer in Forbesganj',
    'JK Interior Forbesganj',
    'PVC ceiling installation Jogbani',
    'Modern TV unit design Bihar',
    'Interior contractor in Araria district'
  ].join(', '),

  // 3. Canonical URL (Duplicate issue se bachne ke liye)
  alternates: {
    canonical: 'https://jkinterior.online',
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
  url: 'https://jkinterior.online/',
  siteName: 'JK Interior',
  images: [
    {
      url: 'https://jkinterior.online/og-image.jpg', // ✅ FULL URL जरूरी
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
  themeColor: '#faf7f2',
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
      <body className="font-mono antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
