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
  openGraph: {
    title: 'JK Interior – Modern Interior & Ceiling Work',
    description:
      'Premium interior design and ceiling solutions in Forbesganj, Bihar.',
    type: 'website',
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
