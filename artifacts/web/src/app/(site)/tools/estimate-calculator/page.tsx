import type { Metadata } from "next";
import { ToolComingSoon } from "@/components/tool-coming-soon";

export const metadata: Metadata = {
  title: "Estimate Calculator",
  description: "Get a multi-room estimate across ceiling, wall panels, and TV unit work in one go.",
};

export default function EstimateCalculatorPage() {
  return (
    <ToolComingSoon
      name="Estimate Calculator"
      description="Multi-room estimate across ceiling, wall panels, and TV unit in one go."
      href="/tools/estimate-calculator"
    />
  );
}
