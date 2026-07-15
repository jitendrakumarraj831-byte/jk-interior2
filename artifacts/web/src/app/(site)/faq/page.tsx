import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, faqPageSchema } from "@/components/json-ld";
import { getFaqs, getServices, getDistricts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about JK Interior's pricing, timelines, warranty, and service areas.",
};

export default async function FaqPage() {
  const [faqs, services, districts] = await Promise.all([getFaqs(), getServices(), getDistricts()]);

  const generalFaqs = faqs.filter((f) => f.category === "general" || f.category === "pricing");
  const serviceFaqsBySlug = new Map(services.map((s) => [s.slug, faqs.filter((f) => f.category === "service" && f.serviceSlug === s.slug)]));
  const districtFaqsBySlug = new Map(districts.map((d) => [d.slug, faqs.filter((f) => f.category === "district" && f.districtSlug === d.slug)]));

  return (
    <>
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />

        <div className="mt-10">
          <h2 className="font-serif text-xl font-bold text-foreground">General &amp; Pricing</h2>
          <div className="mt-4">
            <FaqAccordion faqs={generalFaqs} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif text-xl font-bold text-foreground">By Service</h2>
          <div className="mt-4 space-y-8">
            {services.map((service) => {
              const items = serviceFaqsBySlug.get(service.slug) ?? [];
              if (!items.length) return null;
              return (
                <div key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm font-bold text-primary hover:underline">
                    {service.name} →
                  </Link>
                  <div className="mt-2">
                    <FaqAccordion faqs={items} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif text-xl font-bold text-foreground">By Area</h2>
          <div className="mt-4 space-y-8">
            {districts.map((district) => {
              const items = districtFaqsBySlug.get(district.slug) ?? [];
              if (!items.length) return null;
              return (
                <div key={district.slug}>
                  <Link href={`/areas-we-serve/${district.slug}`} className="text-sm font-bold text-primary hover:underline">
                    {district.name} District →
                  </Link>
                  <div className="mt-2">
                    <FaqAccordion faqs={items} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
