"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";

const ease = [0.16, 1, 0.3, 1] as const;

const variants = [
  { name: "Rhino Elite", percentage: 25, color: "#FF6600", status: "Available Now" },
  { name: "Rhino Enduro", percentage: 45, color: "#4A4A4A", status: "Available Now" },
  { name: "Rhino Eco-Green", percentage: 65, color: "#2DB86E", status: "Available Now" },
];

export function VariantsScience() {
  return (
    <Section className="relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36">
      <Reveal>
        <div className="mb-16 text-center md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
            Carbon Reduction
          </span>
          <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            Three Variants, One Mission
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#555]">
            Each variant delivers a different level of carbon reduction compared to conventional cupola furnace products.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {variants.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.12 }}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-lg"
          >
            {/* Icon */}
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${v.color}10` }}
            >
              <Leaf className="h-5 w-5" style={{ color: v.color }} strokeWidth={1.8} />
            </div>

            {/* Name */}
            <h3 className="font-display text-xl font-bold text-[#111] md:text-2xl">
              {v.name}
            </h3>

            {/* Status */}
            <span
              className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${v.color}10`, color: v.color }}
            >
              {v.status}
            </span>

            {/* Percentage */}
            <div className="mt-6">
              <span className="font-display text-5xl font-bold" style={{ color: v.color }}>
                <NumberTicker value={v.percentage} delay={0.3 + i * 0.15} className="!text-inherit" />
                <span className="text-3xl">%</span>
              </span>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#666]">
                Less CO&#x2082; vs. Cupola
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${v.color}, ${v.color}88)` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${v.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default VariantsScience;
