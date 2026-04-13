"use client";

import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Sustainability stat strip — light green background with 3 big stats       */
/* -------------------------------------------------------------------------- */

const stats = [
  { number: "65%", label: "Less CO₂ Emissions" },
  { number: "ZERO", label: "Fossil Fuels — Solar Powered" },
  { number: "45-50%", label: "Annual Energy Savings" },
];

export function SustainabilitySection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#f0faf4",
        borderTop: "1px solid rgba(42,138,82,0.15)",
        borderBottom: "1px solid rgba(42,138,82,0.15)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className={`relative py-6 text-center md:py-0 ${
                i > 0
                  ? "border-t border-[rgba(42,138,82,0.15)] md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <span className="block font-display text-5xl font-bold text-[#22965A] md:text-6xl">
                {stat.number}
              </span>
              <span className="mt-2 block text-sm text-[#666]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
