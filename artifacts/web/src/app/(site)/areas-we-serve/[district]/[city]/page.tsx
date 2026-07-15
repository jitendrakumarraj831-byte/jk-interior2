import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";
import {
  getCityBySlug,
  getDistricts,
  getCitiesByDistrictId,
  getNearbyCities,
  getServices,
  getProjectsByCity,
  getRelatedBlogPosts,
  getFaqsByCategory,
} from "@/lib/queries";

export async function generateStaticParams() {
  const districts = await getDistricts();
  const params: { district: string; city: string }[] = [];
  for (const d of districts) {
    const cities = await getCitiesByDistrictId(d.id);
    for (const c of cities) params.push({ district: d.slug, city: c.slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ district: string; city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Interior Designer in ${city.name}, ${city.district?.name}`,
    description: city.description,
    alternates: { canonical: `${SITE_URL}/areas-we-serve/${city.district?.slug}/${city.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ district: string; city: string }> }) {
  const { district: districtSlug, city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city || city.district?.slug !== districtSlug) notFound();

  const [services, projects, nearbyCities, relatedBlogs, faqs] = await Promise.all([
    getServices(),
    getProjectsByCity(city.id),
    getNearbyCities(city.districtId, city.slug),
    getRelatedBlogPosts("", undefined, 2),
    getFaqsByCategory("district"),
  ]);

  const pageFaqs = faqs.length
    ? faqs
    : [{ question: `Does JK Interior work in ${city.name}?`, answer: `Yes — JK Interior regularly serves ${city.name} with free site visits and the same warranty as our Forbesganj projects.` }];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Areas We Serve", url: `${SITE_URL}/areas-we-serve` },
          { name: `${city.district?.name} District`, url: `${SITE_URL}/areas-we-serve/${city.district?.slug}` },
          { name: city.name, url: `${SITE_URL}/areas-we-serve/${city.district?.slug}/${city.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Areas We Serve", href: "/areas-we-serve" },
          { name: `${city.district?.name} District`, href: `/areas-we-serve/${city.district?.slug}` },
          { name: city.name, href: `/areas-we-serve/${city.district?.slug}/${city.slug}` },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Interior Designer in {city.name}, {city.district?.name}</h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">{city.distanceFromHq}</p>
        <p className="mt-4 text-muted-foreground">{city.description}</p>
        {city.uniqueContent && <p className="mt-4 text-muted-foreground">{city.uniqueContent}</p>}
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <SectionHeading title={`Services in ${city.name}`} center={false} />
        <div className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent">
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="bg-secondary/40 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading title={`Projects in ${city.name}`} center={false} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={{ ...p, city }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedBlogs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <SectionHeading title="Related Reading" center={false} />
          <ul className="mt-4 space-y-2">
            {relatedBlogs.map((b) => (
              <li key={b.slug}>
                <Link href={`/blog/${b.slug}`} className="text-sm font-medium text-primary hover:underline">
                  {b.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-6">
            <FaqAccordion faqs={pageFaqs} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
        <SectionHeading eyebrow="Instant Estimate" title={`Estimate Your ${city.name} Project`} />
        <Link href="/tools/price-calculator" className="mt-6 inline-flex rounded-xl gold-gradient px-8 py-3.5 text-sm font-bold text-white hover:opacity-90">
          Open Price Calculator →
        </Link>
      </section>

      {nearbyCities.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <SectionHeading title="Nearby Cities" center={false} />
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyCities.map((c) => (
              <Link key={c.slug} href={`/areas-we-serve/${districtSlug}/${c.slug}`} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent">
                {c.name}
              </Link>
            ))}
            <Link href={`/areas-we-serve/${districtSlug}`} className="rounded-full border border-border px-4 py-2 text-sm font-bold text-primary hover:bg-secondary">
              ← Back to {city.district?.name} District
            </Link>
          </div>
        </section>
      )}

      <CtaSection title={`Ready to start your ${city.name} project?`} />
    </>
  );
}
