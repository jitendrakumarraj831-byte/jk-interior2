import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { QuoteForm } from "@/components/quote-form";

export function ToolComingSoon({ name, description, href }: { name: string; description: string; href: string }) {
  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name, href }]} />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Coming Soon" title={name} description={description} center={false} />
        <p className="mt-4 text-sm text-muted-foreground">
          This tool is in development for our next update. In the meantime, try the{" "}
          <Link href="/tools/price-calculator" className="font-bold text-primary hover:underline">
            Price Calculator
          </Link>{" "}
          for an instant estimate, or request a free quote below.
        </p>
        <div className="mt-8 max-w-md">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
