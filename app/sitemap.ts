import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.jkinterior.online' },
    { url: 'https://www.jkinterior.online/services' },
    { url: 'https://www.jkinterior.online/about' },
    { url: 'https://www.jkinterior.online/gallery' },
    { url: 'https://www.jkinterior.online/contact' },
  ]
}
