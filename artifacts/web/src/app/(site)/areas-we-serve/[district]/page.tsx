import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CityCard, ProjectCard, ReviewCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteForm } from "@/components/quote-form";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, faqPageSchema } from "@/components/json-ld";
import { BUSINESS } from "@/lib/constants";
import {
  getDistrictBySlug,
  getDistricts,
  getCitiesByDistrictId,
  getNearbyDistricts,
  getServices,
  getProjects,
  getReviewsByDistrict,
  getFaqsForDistrict,
} from "@/lib/queries";

export async function generateStaticParams() {
  const districts = await getDistricts();
  return districts.map((d) => ({ district: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ district: string }> }): Promise<Metadata> {
  const { district: slug } = await params;
  const district = await getDistrictBySlug(slug);
  if (!district) return {};
  return {
    title: `Interior & False Ceiling Services in ${district.name} District`,
    description: district.description,
  };
}

export default async function DistrictPage({ params }: { params: Promise<{ district: string }> }) {
  const { district: slug } = await params;
  const district = await getDistrictBySlug(slug);
  if (!district) notFound();

  const [cities, nearbyDistricts, services, allProjects, reviews, districtFaqs] = await Promise.all([
    getCitiesByDistrictId(district.id),
    getNearbyDistricts(district.slug),
    getServices(),
    getProjects(),
    getReviewsByDistrict(district.id),
    getFaqsForDistrict(district.slug),
  ]);

  const cityIds = new Set(cities.map((c) => c.id));
  const districtProjects = allProjects.filter((p) => p.cityId && cityIds.has(p.cityId)).slice(0, 6);

  const faqs =
    districtFaqs.length > 0
      ? districtFaqs
      : [{ question: `Does JK Interior serve all of ${district.name} district?`, answer: `Yes — we serve ${cities.map((c) => c.name).join(", ")} and surrounding areas in ${district.name} district with free site visits.` }];

  return (
    <>
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Breadcrumbs items={[{ name: "Areas We Serve", href: "/areas-we-serve" }, { name: `${district.name} District`, href: `/areas-we-serve/${district.slug}` }]} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Interior &amp; False Ceiling Services in {district.name} District</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{district.description}</p>
      </section>

      {/* Services available */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <SectionHeading title="Services Available" center={false} />
        <div className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent">
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Cities in district */}
      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title={`Cities We Serve in ${district.name}`} center={false} />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <CityCard key={city.slug} city={city} districtSlug={district.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects in district */}
      {districtProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading title={`Recent Projects in ${district.name} District`} center={false} />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {districtProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <Link href={`/gallery`} className="mt-6 inline-block font-bold text-primary hover:underline">
            See full gallery →
          </Link>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="bg-secondary/40 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading title={`What ${district.name} Customers Say`} center={false} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Nearby districts, Map, Quote form */}
      <section className="bg-secondary/40 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading title="Nearby Districts" center={false} />
            <ul className="mt-4 space-y-2">
              {nearbyDistricts.map((d) => (
                <li key={d.slug}>
                  <Link href={`/areas-we-serve/${d.slug}`} className="text-sm font-medium text-primary hover:underline">
                    {d.name} District →
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 aspect-video overflow-hidden rounded-2xl">
              <iframe
                title={`Map showing JK Interior service area near ${district.name}`}
                src={`https://www.google.com/maps?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=10&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <SectionHeading title={`Get a Quote for ${district.name}`} center={false} />
            <div className="mt-4">
              <QuoteForm defaultCity={district.name} />
            </div>
          </div>
        </div>
      </section>

      <CtaSection title={`Ready to start your ${district.name} project?`} />
    </>
  );
}
