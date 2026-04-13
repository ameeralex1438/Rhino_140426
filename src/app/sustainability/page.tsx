import type { Metadata } from "next";
import { SustainabilityPage } from "@/components/sections/sustainability/sustainability-page";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Building the future without burning it. Zero fossil fuels, up to 65% less CO₂, 45-50% energy savings. Rhino's commitment to green insulation.",
};

export default function Sustainability() {
  return <SustainabilityPage />;
}
