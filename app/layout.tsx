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
  title: 'JK Interior – Modern Interior & Ceiling Work | Forbesganj, Bihar',
  description:
    'JK Interior provides modern interior design, false ceiling, PVC ceiling, WPC louvers, fluted panels, TV unit design and more in Forbesganj, Narpatganj, Jogbani, Bihar. Call +91 8651070831.',
  keywords:
    'interior design, false ceiling, PVC ceiling, gypsum ceiling, WPC louvers, fluted panels, TV unit, Forbesganj, Bihar, JK Interior',
  
  // --- Naya Add Kiya Gaya: Canonical URL ---
  alternates: {
    canonical: 'https://jkinterior.online',
  },

  // --- Naya Add Kiya Gaya: Robots Configuration ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: 'JK Interior – Modern Interior & Ceiling Work',
    description:
      'Premium interior design and ceiling solutions in Forbesganj, Bihar.',
    url: 'https://jkinterior.online',
    siteName: 'JK Interior',
    // --- Naya Add Kiya Gaya: OG Image ---
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'JK Interior Design Services',
      },
    ],
    type: 'website',
  },

  // --- Naya Add Kiya Gaya: Favicon Icons ---
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
