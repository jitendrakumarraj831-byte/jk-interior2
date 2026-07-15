import type { Metadata } from "next";
import { ToolComingSoon } from "@/components/tool-coming-soon";

export const metadata: Metadata = {
  title: "Material Calculator",
  description: "Estimate the panels, boards, and framework material needed for your false ceiling or wall panel project.",
};

export default function MaterialCalculatorPage() {
  return (
    <ToolComingSoon
      name="Material Calculator"
      description="Estimate the panels, boards, and framework material needed for your room."
      href="/tools/material-calculator"
    />
  );
}
