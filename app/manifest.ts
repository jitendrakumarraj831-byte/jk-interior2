import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JK Interior – Forbesganj',
    short_name: 'JK Interior',
    description:
      'PVC wall paneling, false ceiling, WPC louvers and modern interior design services in Forbesganj, Araria and across Bihar.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f0f7ff',
    theme_color: '#dbeafe',
    orientation: 'portrait',
    lang: 'en-IN',
    categories: ['business', 'productivity', 'lifestyle'],
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
