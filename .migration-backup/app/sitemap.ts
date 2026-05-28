import { MetadataRoute } from 'next'
import { CITIES } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-01')
  const base = 'https://www.jkinterior.online'

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${base}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/gallery`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${base}/cities/${city.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...corePages, ...cityPages]
}
