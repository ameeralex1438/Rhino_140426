"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";

const ease = [0.16, 1, 0.3, 1] as const;

const cupolaItems = [
  "Burns coke and coal",
  "Releases SO\u2082 and NOx",
  "Higher carbon footprint",
  "Metallic shot contamination",
  "Inconsistent fiber quality",
];

const electricItems = [
  "Zero fossil fuels",
  "Zero SO\u2082/NOx emissions",
  "Up to 65% less CO\u2082",
  "Zero metallic shots",
  "Consistent ultra-fine fibers",
];

export function ElectricSmelting() {
  return (
    <Section className="relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36">
      <Reveal>
        <div className="mb-16 md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
            The Difference
          </span>
          <h2 className="max-w-4xl font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            Electric Smelting vs Cupola Furnace
          </h2>
        </div>
      </Reveal>

      {/* Comparison Cards */}
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        {/* Cupola */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-white"
        >
          <div className="h-1 w-full bg-red-400" />
          <div className="p-8 md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="mb-6 font-display text-xl font-bold text-[#111] md:text-2xl">
              Conventional Cupola Furnace
            </h3>
            <ul className="space-y-4">
              {cupolaItems.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                  </div>
                  <span className="text-[#666]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Electric */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-white"
        >
          <div className="h-1 w-full bg-[#2DB86E]" />
          <div className="p-8 md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
              <Check className="h-5 w-5 text-[#2DB86E]" />
            </div>
            <h3 className="mb-6 font-display text-xl font-bold text-[#111] md:text-2xl">
              Rhino Electric Smelter
            </h3>
            <ul className="space-y-4">
              {electricItems.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-3.5 w-3.5 text-[#2DB86E]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[#666]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Dark stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="rounded-3xl bg-[#111] px-8 py-10 md:px-12 md:py-14"
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          {[
            { value: 20, suffix: "%", label: "More Energy Efficient" },
            { value: 100, suffix: "%", label: "Waste Recycling" },
            { value: 0, suffix: "%", label: "Fossil Fuels Used", display: "0" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-3xl font-bold text-white md:text-5xl">
                {stat.display != null ? (
                  <span className="!text-white">{stat.display}</span>
                ) : (
                  <NumberTicker value={stat.value} className="!text-white" />
                )}
                <span className="text-[#2DB86E]">{stat.suffix}</span>
              </span>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export default ElectricSmelting;
