"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";

const ease = [0.16, 1, 0.3, 1] as const;

const HERO_STATS = [
  { value: 90, suffix: "+", label: "Years of Legacy" },
  { value: 60, suffix: "+", label: "Countries" },
  { value: 8000, suffix: "+", label: "Workforce" },
  { value: 15, suffix: "", label: "Companies" },
];

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-0 md:pt-40">
      {/* Soft gradient accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full blur-[140px]"
        style={{ background: "rgba(255,102,0,0.04)" }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-medium tracking-[0.3em] text-rhino-orange uppercase">
                About Rhino
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="mb-6 font-display text-4xl font-bold leading-[1.05] text-[#111] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              From Steel Trading
              <br />
              <span className="text-rhino-orange">to Sustainability</span>
              <br />
              Leadership
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="mb-8 max-w-lg text-base leading-relaxed text-[#666] md:text-lg"
            >
              For close to a century, the Sarda Group has stood as a pillar of
              progress — from a humble steel trading shop in the 1930s to
              India&apos;s greenest rock mineral wool manufacturer.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="flex flex-wrap gap-6 md:gap-10"
            >
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label}>
                  <span className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                    <NumberTicker value={stat.value} delay={0.8 + i * 0.15} className="!text-inherit" />
                    <span className="text-rhino-orange">{stat.suffix}</span>
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-[#666]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Large top image */}
              <div className="col-span-2 overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/events/neeraj-igbc-keynote.jpg"
                  alt="Neeraj Sarda keynote at IGBC 2025"
                  className="w-full object-contain"
                />
              </div>
              {/* Bottom left */}
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/events/booth-team-photo.jpg"
                  alt="Rhino team at exhibition booth"
                  className="h-36 w-full object-cover md:h-44"
                />
              </div>
              {/* Bottom right */}
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/process/molten-conveyor.jpg"
                  alt="Molten rock conveyor system"
                  className="h-36 w-full object-cover md:h-44"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="absolute -bottom-6 -left-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl md:-left-8"
            >
              <p className="font-display text-2xl font-bold text-rhino-orange md:text-3xl">281</p>
              <p className="text-xs font-medium text-[#555]">Acres of Innovation</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}

export default AboutHero;
