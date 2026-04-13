"use client";

import { motion } from "framer-motion";
import { Mountain, Flame, Wind, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

interface Step {
  num: string;
  icon: LucideIcon;
  heading: string;
  description: string;
  color: string;
}

const steps: Step[] = [
  {
    num: "01",
    icon: Mountain,
    heading: "Source",
    description: "Raw volcanic rock from sustainable domestic and international sources",
    color: "#FF6600",
  },
  {
    num: "02",
    icon: Flame,
    heading: "Smelt",
    description: "Heated to 1600\u20131800\u00B0C in our electric smelter \u2014 no coke, no coal",
    color: "#FF8800",
  },
  {
    num: "03",
    icon: Wind,
    heading: "Spin",
    description: "Transformed into ultra-fine fibers under 7 microns diameter",
    color: "#FF6600",
  },
  {
    num: "04",
    icon: Package,
    heading: "Form",
    description: "Shaped into slabs, matts, rolls, boards, and loose wool",
    color: "#2DB86E",
  },
];

export function ProcessSteps() {
  return (
    <Section className="relative overflow-hidden bg-white py-28 md:py-36">
      <Reveal>
        <div className="mb-16 md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
            The Process
          </span>
          <h2 className="max-w-3xl font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            From Rock to Insulation
          </h2>
          <p className="mt-4 max-w-xl text-base text-[#555] md:text-lg">
            Four precision steps transform raw volcanic rock into world-class insulation.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-[#FAFAF8] p-7 transition-all duration-500 hover:bg-white hover:shadow-lg"
          >
            {/* Step number */}
            <span className="mb-5 block font-mono text-xs tracking-[0.3em] text-[#ddd]">
              STEP {step.num}
            </span>

            {/* Icon */}
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${step.color}10` }}
            >
              <step.icon className="h-5 w-5" style={{ color: step.color }} strokeWidth={1.8} />
            </div>

            <h3 className="mb-2 font-display text-xl font-bold text-[#111] md:text-2xl">
              {step.heading}
            </h3>
            <p className="text-sm leading-relaxed text-[#555]">
              {step.description}
            </p>

            {/* Watermark */}
            <step.icon
              className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
              style={{ color: step.color }}
              strokeWidth={0.7}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default ProcessSteps;
