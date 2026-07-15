import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, OG_IMAGE, BUSINESS } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${BUSINESS.tagline}`, template: `%s | ${SITE_NAME}` },
  description:
    "JK Interior designs and installs premium false ceilings, wall panels, and complete interiors across Araria, Purnia, Supaul, Katihar, Madhepura and Kishanganj, Bihar.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE }],
  },
  twitter: { card: "summary_large_image" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: BUSINESS.name,
  image: OG_IMAGE,
  telephone: BUSINESS.phone1,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
  url: SITE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.googleRating,
    reviewCount: BUSINESS.googleReviewCount,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema} />
        {children}
      </body>
    </html>
  );
}
