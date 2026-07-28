import { SITE_URL } from '@/lib/constants'
import { getServices, getProjects, getDistricts, getCitiesByDistrictId, getBlogPosts } from '@/lib/queries'

const STATIC_ROUTES = [
  '',
  '/services',
  '/projects',
  '/gallery',
  '/blog',
  '/areas-we-serve',
  '/tools',
  '/tools/price-calculator',
  '/tools/material-calculator',
  '/tools/quotation-generator',
  '/tools/estimate-calculator',
  '/ai-assistant',
  '/about',
  '/contact',
  '/faq',
  '/reviews',
]

export default async function sitemap() {
  const [services, projects, districts, blogPosts] = await Promise.all([getServices(), getProjects(), getDistricts(), getBlogPosts()])

  const entries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
    lastmod: new Date().toISOString(),
  }))

  for (const service of services) {
    entries.push({ url: `${SITE_URL}/services/${service.slug}`, changeFrequency: 'weekly', priority: 0.9, lastmod: service.updatedAt ?? service.createdAt ?? new Date().toISOString() })
  }

  for (const project of projects) {
    entries.push({ url: `${SITE_URL}/projects/${project.slug}`, changeFrequency: 'monthly', priority: 0.6, lastmod: project.updatedAt ?? project.createdAt ?? new Date().toISOString() })
  }

  for (const post of blogPosts) {
    entries.push({ url: `${SITE_URL}/blog/${post.slug}`, changeFrequency: 'monthly', priority: 0.6, lastmod: post.updatedAt ?? post.createdAt ?? new Date().toISOString() })
  }

  for (const district of districts) {
    entries.push({ url: `${SITE_URL}/areas-we-serve/${district.slug}`, changeFrequency: 'monthly', priority: 0.8, lastmod: district.updatedAt ?? new Date().toISOString() })
    const cities = await getCitiesByDistrictId(district.id)
    for (const city of cities) {
      entries.push({ url: `${SITE_URL}/areas-we-serve/${district.slug}/${city.slug}`, changeFrequency: 'monthly', priority: computeCityPriority(city), lastmod: city.updatedAt ?? city.createdAt ?? new Date().toISOString() })
    }
  }

  return entries
}

function computeCityPriority(city) {
  const d = (city.distanceFromHq || '').toLowerCase()
  if (d.includes('main')) return 0.9
  const m = (city.distanceFromHq || '').match(/(\d+)\s*km/)
  if (!m) return 0.7
  const km = Number(m[1])
  if (km <= 30) return 0.8
  if (km <= 60) return 0.7
  return 0.6
}
