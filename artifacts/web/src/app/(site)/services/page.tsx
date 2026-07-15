import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Interior & False Ceiling Services",
  description: "Explore all 12 JK Interior services — PVC & gypsum false ceiling, WPC wall panels, UV marble, TV units, office and kitchen interiors, and more.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Interior & False Ceiling Services"
          description="Every service below has its own detailed page covering benefits, materials, installation process, pricing and real project examples."
          center={false}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
