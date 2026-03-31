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
  // Title mein main services aur location dono hain
  title: 'JK Interior – PVC Wall Paneling & False Ceiling | Forbesganj, Bihar',
  description:
    'JK Interior provides expert PVC wall paneling, Gypsum false ceiling, WPC louvers, and fluted panels in Forbesganj, Narpatganj, Jogbani, and Araria. Best interior designer in Bihar. Call +91 8651070831.',
  
  // Service + Location Based Keywords (SEO ke liye sabse zaroori)
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

  // Canonical URL: Google ko sahi address batane ke liye
  alternates: {
    canonical: 'https://jkinterior.online',
  },

  // Robots: Search engine indexing allow karne ke liye
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // OpenGraph: WhatsApp/Facebook share ke liye
  openGraph: {
    title: 'JK Interior – Modern Interior & Ceiling Work Experts',
    description:
      'Premium interior design, WPC louvers, and PVC wall paneling solutions in Forbesganj, Narpatganj and across Bihar.',
    url: 'https://jkinterior.online',
    siteName: 'JK Interior',
    images: [
      {
        url: '/og-image.jpg', // Yaad rahe GitHub par file name 'og-image.jpg' hi ho
        width: 1200,
        height: 630,
        alt: 'JK Interior Services - PVC Paneling and Ceiling',
      },
    ],
    type: 'website',
  },

  // Icons: Browser tab ke liye
  icons: {
    icon: '/placeholder-logo.png',
    apple: '/apple-icon.png',
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
