import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { ProjectCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";
import {
  getServiceBySlug,
  getServices,
  getRelatedServices,
  getProjectsByService,
  getRelatedBlogPosts,
  getDistricts,
  getFaqsByCategory,
} from "@/lib/queries";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [relatedServices, relatedProjects, relatedBlogs, districts, serviceFaqs] = await Promise.all([
    getRelatedServices(service.slug, 3),
    getProjectsByService(service.id, 3),
    getRelatedBlogPosts("", service.slug, 2),
    getDistricts(),
    getFaqsByCategory("service"),
  ]);

  const faqs = serviceFaqs.length ? serviceFaqs : [
    { question: `How much does ${service.name} cost?`, answer: `${service.name} typically costs ₹${service.priceRangeMin}–₹${service.priceRangeMax} per ${service.priceUnit}, depending on design complexity. Use our price calculator for a room-specific estimate.` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@type": "HomeAndConstructionBusiness", name: "JK Interior" },
    areaServed: districts.map((d) => d.name),
    description: service.overview,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.name, href: `/services/${service.slug}` }]} />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">{service.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{service.shortDescription}</p>
          <p className="mt-4 text-2xl font-bold text-primary">
            {service.priceRangeMin > 0 ? `₹${service.priceRangeMin}–₹${service.priceRangeMax} / ${service.priceUnit}` : "Custom quote"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/price-calculator" className="rounded-xl gold-gradient px-6 py-3 text-sm font-bold text-white hover:opacity-90">
              Get an Estimate
            </Link>
            <Link href="/contact" className="rounded-xl border border-border px-6 py-3 text-sm font-bold text-foreground hover:bg-secondary">
              Book Free Site Visit
            </Link>
          </div>
        </div>
        {service.heroImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image src={service.heroImage} alt={service.name} fill className="object-cover" priority />
          </div>
        )}
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <SectionHeading title="Overview" center={false} />
        <p className="mt-4 text-muted-foreground">{service.overview}</p>
      </section>

      {/* Benefits */}
      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading title="Benefits" center={false} />
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications & Materials */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <SectionHeading title="Applications" center={false} />
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {service.applications.map((app) => (
                <li key={app}>• {app}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Materials Used" center={false} />
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {service.materialsUsed.map((material) => (
                <li key={material}>• {material}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading title="Installation Process" center={false} />
          <ol className="mt-6 space-y-4">
            {service.installationProcess.map((step, i) => (
              <li key={step.step} className="glass-card flex gap-4 p-4">
                <span className="gold-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-foreground">{step.step}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery / recent projects for this service */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading title={`${service.name} — Recent Projects`} center={false} />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link href={`/gallery?material=${service.slug}`} className="mt-6 inline-block font-bold text-primary hover:underline">
            See full gallery for this service →
          </Link>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-6">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Related Services / Blogs / Areas Served */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading title="Related Services" center={false} />
            <ul className="mt-4 space-y-2">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm font-medium text-primary hover:underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Related Blogs" center={false} />
            <ul className="mt-4 space-y-2">
              {relatedBlogs.map((b) => (
                <li key={b.slug}>
                  <Link href={`/blog/${b.slug}`} className="text-sm font-medium text-primary hover:underline">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Areas Served" center={false} />
            <ul className="mt-4 space-y-2">
              {districts.map((d) => (
                <li key={d.slug}>
                  <Link href={`/areas-we-serve/${d.slug}`} className="text-sm font-medium text-primary hover:underline">
                    {d.name} District
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaSection title={`Ready to book ${service.name}?`} />
    </>
  );
}
