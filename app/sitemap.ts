import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://jkinterior.online' },
    { url: 'https://jkinterior.online/services' },
    { url: 'https://jkinterior.online/about' },
    { url: 'https://jkinterior.online/gallery' },
    { url: 'https://jkinterior.online/contact' },
  ]
}
