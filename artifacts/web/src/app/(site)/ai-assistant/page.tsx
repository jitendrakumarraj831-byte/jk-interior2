import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Calculator, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Interior Assistant",
  description: "Ask JK Interior's AI assistant about materials, pricing, and get an instant cost estimate for your project.",
};

const FEATURES = [
  { icon: MessageCircle, title: "Ask Questions", description: "Get instant answers about materials, timelines, and warranty over WhatsApp." },
  { icon: Calculator, title: "Cost Estimator", description: "Use the Price Calculator for an instant room-based estimate." },
  { icon: BookOpen, title: "Material Guide", description: "Compare PVC, gypsum, WPC and UV marble on our service pages." },
];

export default function AiAssistantPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "AI Assistant", href: "/ai-assistant" }]} />
      <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
        <SectionHeading
          eyebrow="Coming Soon"
          title="JK Interior AI Assistant"
          description="Our full conversational AI assistant is being rebuilt for the new site. Until it launches, use these instant tools instead."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="glass-card p-6">
              <feature.icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-serif font-bold text-foreground">{feature.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/tools/price-calculator" className="rounded-xl gold-gradient px-6 py-3.5 text-sm font-bold text-white hover:opacity-90">
            Open Price Calculator
          </Link>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white hover:opacity-90"
          >
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </>
  );
}
