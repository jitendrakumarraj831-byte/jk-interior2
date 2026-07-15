import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { PriceCalculator } from "./calculator";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Price Calculator",
  description: "Get an instant price range for your false ceiling or interior project based on room size and service.",
};

export default async function PriceCalculatorPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Price Calculator", href: "/tools/price-calculator" }]} />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Instant Estimate" title="Price Calculator" description="Enter your room size and service to get an instant price range." center={false} />
        <div className="mt-10">
          <PriceCalculator services={services} />
        </div>
      </section>
    </>
  );
}
