import type { Metadata } from "next";
import { ToolComingSoon } from "@/components/tool-coming-soon";

export const metadata: Metadata = {
  title: "Quotation Generator",
  description: "Generate a shareable, itemized quotation for your JK Interior project.",
};

export default function QuotationGeneratorPage() {
  return (
    <ToolComingSoon
      name="Quotation Generator"
      description="Generate a shareable, itemized quotation PDF for your project."
      href="/tools/quotation-generator"
    />
  );
}
