import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { MaterialCalculator } from "./calculator";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Material Calculator",
  description: "Estimate the panels, boards, and framework material needed for your false ceiling or wall panel project.",
};

export default async function MaterialCalculatorPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Material Calculator", href: "/tools/material-calculator" }]} />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Plan Your Materials"
          title="Material Calculator"
          description="Enter your room size and service to estimate panels, framework, and fasteners needed."
          center={false}
        />
        <div className="mt-10">
          <MaterialCalculator services={services} />
        </div>
      </section>
    </>
  );
}
