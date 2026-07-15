import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { EstimateCalculator } from "./calculator";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Estimate Calculator",
  description: "Get a multi-room estimate across ceiling, wall panels, and TV unit work in one go.",
};

export default async function EstimateCalculatorPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Estimate Calculator", href: "/tools/estimate-calculator" }]} />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Whole-Home Estimate"
          title="Estimate Calculator"
          description="Add every room in your home with its own service and size to get one combined estimate."
          center={false}
        />
        <div className="mt-10">
          <EstimateCalculator services={services} />
        </div>
      </section>
    </>
  );
}
