import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { QuotationGenerator } from "./calculator";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Quotation Generator",
  description: "Generate a shareable, itemized quotation for your JK Interior project.",
};

export default async function QuotationGeneratorPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Quotation Generator", href: "/tools/quotation-generator" }]} />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Build Your Quote"
          title="Quotation Generator"
          description="Add line items to build an itemized quotation you can print, save as PDF, or share on WhatsApp."
          center={false}
        />
        <div className="mt-10">
          <QuotationGenerator services={services} />
        </div>
      </section>
    </>
  );
}
