import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, faqPageSchema } from "@/components/json-ld";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about JK Interior's pricing, timelines, warranty, and service areas.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />
        <div className="mt-10">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
