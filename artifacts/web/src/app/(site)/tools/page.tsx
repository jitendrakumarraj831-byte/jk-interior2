import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, FileText, Ruler, Receipt } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Tools & Calculators",
  description: "Free interior design tools — price calculator, material calculator, quotation generator, and estimate calculator.",
};

const TOOLS = [
  { href: "/tools/price-calculator", icon: Calculator, title: "Price Calculator", description: "Instant price range for your room based on dimensions and service.", status: "Live" },
  { href: "/tools/material-calculator", icon: Ruler, title: "Material Calculator", description: "Estimate the panels, boards and framework material needed for your room.", status: "Live" },
  { href: "/tools/quotation-generator", icon: FileText, title: "Quotation Generator", description: "Generate a shareable, itemized quotation you can print or share on WhatsApp.", status: "Live" },
  { href: "/tools/estimate-calculator", icon: Receipt, title: "Estimate Calculator", description: "Multi-room estimate across ceiling, wall panels, and TV unit in one go.", status: "Live" },
];

export default function ToolsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Free Tools" title="Tools & Calculators" description="Get an instant sense of cost before you even call us." center={false} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="glass-card card-hover block p-6">
              <div className="flex items-center justify-between">
                <tool.icon className="h-8 w-8 text-primary" />
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tool.status === "Live" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {tool.status}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-lg font-bold text-foreground">{tool.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
