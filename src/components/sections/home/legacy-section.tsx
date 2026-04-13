"use client";

import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Sarda Group / Legacy Section — dark bg with sarda-bg.jpg                  */
/* -------------------------------------------------------------------------- */

const stats = [
  { label: "Sales", value: "~\u20B96,000 Cr" },
  { label: "Workforce", value: "~8,000" },
  { label: "Exports", value: "60+ Countries" },
  { label: "Market Cap", value: "~\u20B918,000 Cr" },
  { label: "Investor", value: "SARDAEN" },
];

export function LegacySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
      {/* Background image — subtle */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/company/sarda-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 block text-xs font-medium tracking-[0.3em] text-rhino-orange">
            SARDA GROUP
          </span>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            The Strength Behind The Revolution
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            Rhino Insulation is a division of Sarda Energy &amp; Minerals Ltd (SEML),
            one of India&apos;s most diversified industrial conglomerates. With over
            nine decades of engineering excellence, SEML powers every Rhino product
            with world-class manufacturing DNA.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-4"
            >
              <div className="text-center">
                <span className="block text-xs font-medium tracking-wider text-white/40 uppercase">
                  {stat.label}
                </span>
                <span className="mt-1 block font-display text-lg font-bold text-white md:text-xl">
                  {stat.value}
                </span>
              </div>
              {i < stats.length - 1 && (
                <span className="hidden h-8 w-px bg-white/15 md:block" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Visit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-12 text-center"
        >
          <a
            href="https://sardagroup.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/30 bg-transparent px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            style={{ borderRadius: "25px" }}
          >
            Visit Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
