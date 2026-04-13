"use client";

import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Sector data                                                                */
/* -------------------------------------------------------------------------- */

const sectors = [
  { icon: "🏭", name: "Industrial" },
  { icon: "🏢", name: "Commercial" },
  { icon: "🏠", name: "Residential" },
  { icon: "❄️", name: "HVAC" },
  { icon: "⚓", name: "Marine" },
  { icon: "🔥", name: "Fire Safety" },
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export function SectorsRow() {
  return (
    <section className="w-full bg-[#f8f8f8] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12 md:mb-14"
        >
          <span className="mb-4 block text-xs font-medium tracking-[0.16em] uppercase text-rhino-orange">
            Applications
          </span>
          <h2 className="font-display text-4xl font-bold text-[#111] md:text-6xl">
            WHERE RHINO PERFORMS
          </h2>
        </motion.div>

        {/* 6-column grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={{ y: -3 }}
              className="cursor-pointer rounded-lg border border-[#e5e5e5] bg-white px-[18px] py-6 text-center transition-colors duration-250 hover:border-rhino-orange/40 hover:bg-[#FFF8F2]"
            >
              <span className="mb-3 block text-[28px]">{sector.icon}</span>
              <span className="text-xs font-semibold text-[#333]">
                {sector.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
