"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Leaf } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const ease = [0.16, 1, 0.3, 1] as const;

const badges = [
  { icon: ShieldCheck, label: "Patent Pending", color: "#FF6600" },
  { icon: Zap, label: "7 Years R&D", color: "#FF8800" },
  { icon: Leaf, label: "Zero Fossil Fuels", color: "#2DB86E" },
];

export function TechHero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-32 md:px-12 md:pt-40 xl:px-20">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full blur-[140px]"
        style={{ background: "rgba(255,102,0,0.04)" }}
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <div>
          <BlurFade delay={0} inView>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Technology
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="mb-6 max-w-xl font-display text-4xl font-bold leading-[1.05] text-[#111] sm:text-5xl md:text-6xl">
              7 Years of Research,{" "}
              <span className="text-rhino-orange">One Revolutionary</span>{" "}
              Technology
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-[#666] md:text-lg">
              India&apos;s first Electric Arc Furnace for rock mineral wool.
              Zero fossil fuels. Up to 65% lower CO&#x2082;. Built with global
              technology partners.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-[#FAFAF8] px-4 py-2 text-sm font-medium text-[#555]"
                >
                  <b.icon className="h-4 w-4" style={{ color: b.color }} strokeWidth={1.8} />
                  {b.label}
                </span>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="overflow-hidden rounded-3xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/process/furnace-glow.jpg"
            alt="Electric arc furnace"
            className="h-72 w-full object-cover md:h-96"
          />
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-[1440px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </section>
  );
}

export default TechHero;
