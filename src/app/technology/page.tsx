import type { Metadata } from "next";
import { TechHero } from "@/components/sections/technology/hero";
import { ElectricSmelting } from "@/components/sections/technology/electric-smelting";
import { ProcessSteps } from "@/components/sections/technology/process-steps";
import { VariantsScience } from "@/components/sections/technology/variants-science";
import { CtaSection } from "@/components/sections/home/cta-section";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "7 years of R&D. India's first electric smelter for rock mineral wool. Zero fossil fuels, 65% less CO₂, patent-pending innovation.",
};

export default function TechnologyPage() {
  return (
    <>
      <TechHero />
      <ElectricSmelting />
      <ProcessSteps />
      <VariantsScience />
      <CtaSection />
    </>
  );
}
