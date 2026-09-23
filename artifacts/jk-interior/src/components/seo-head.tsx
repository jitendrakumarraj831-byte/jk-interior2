import { Helmet } from "react-helmet-async"
import { SITE_NAME, SITE_URL, WEBSITE_ID, businessRef } from "@/lib/seo"

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"

interface SeoHeadProps {
  title: string
  description: string
  /** Root-relative path, e.g. "/services". Required for indexable pages; omitted on the 404. */
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article"
  noindex?: boolean
  /** schema.org type of the WebPage node emitted for every indexable page. */
  pageType?: PageType
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  pageType = "WebPage",
  jsonLd,
}: SeoHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  // A noindex page (the 404) gets no canonical at all: pointing it at the
  // homepage would tell Google the error page is a copy of the home page.
  const canonicalUrl = canonical ? `${SITE_URL}${canonical === "/" ? "/" : canonical}` : undefined

  // Every indexable page describes itself as a WebPage that belongs to the one
  // WebSite and is about the one business entity — both referenced by @id.
  const webPage =
    canonicalUrl && !noindex
      ? {
          "@context": "https://schema.org",
          "@type": pageType,
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: fullTitle,
          description,
          inLanguage: "en-IN",
          isPartOf: { "@id": WEBSITE_ID },
          about: businessRef(),
        }
      : null

  const schemas = [
    ...(webPage ? [webPage] : []),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ]

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
