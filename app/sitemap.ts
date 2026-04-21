import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable date – avoids unnecessary changes telling search engines to re-crawl
  const lastModified = new Date('2026-04-21')
  const base = 'https://www.jkinterior.online'

  return [
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
}
