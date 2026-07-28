import React from 'react'
import { SITE_URL, SITE_NAME, OG_IMAGE } from '@/lib/constants'

type OpenGraph = { title?: string; description?: string; url?: string; image?: string }

export default function SeoHead({ title, description, canonical, jsonLd, openGraph }: { title: string; description: string; canonical?: string; jsonLd?: any[] | any; openGraph?: OpenGraph }) {
  const url = canonical ? `${SITE_URL.replace(/\/$/, '')}${canonical}` : SITE_URL
  const og = openGraph ?? { title, description, url, image: OG_IMAGE }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={og.title} />
      <meta property="og:description" content={og.description} />
      <meta property="og:url" content={og.url} />
      <meta property="og:image" content={og.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={og.title} />
      <meta name="twitter:description" content={og.description} />
      <meta name="twitter:image" content={og.image} />

      {jsonLd && (
        Array.isArray(jsonLd) ? (
          jsonLd.map((obj, i) => (
            <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
          ))
        ) : (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )
      )}
    </>
  )
}
