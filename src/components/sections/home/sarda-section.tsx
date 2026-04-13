"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

/* -------------------------------------------------------------------------- */
/*  Sarda Group heritage section — dark bg with factory image                 */
/* -------------------------------------------------------------------------- */

/* Stats with numeric values separated from prefix/suffix for NumberTicker */
const SARDA_STATS = [
  { prefix: "~\u20B9", value: 6000, suffix: " Cr", label: "Annual Sales" },
  { prefix: "~\u20B9", value: 18000, suffix: " Cr", label: "Market Cap" },
  { prefix: "~", value: 8000, suffix: "", label: "Workforce" },
  { prefix: "", value: 60, suffix: "+", label: "Export Countries" },
  { prefix: "", value: null, text: "SARDAEN", label: "BSE / NSE" },
];

export function SardaSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background image */}
      <Image
        src="/images/company/sarda-bg.jpg"
        alt="Sarda Group factory"
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />

      {/* Dark overlay — 75% */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 xl:px-8">
        {/* Center-aligned text block */}
        <div className="mx-auto max-w-2xl text-center">
          {/* Sarda logo */}
          <BlurFade delay={0.1} inView>
            <Image
              src="/images/logos/sarda-logo-white.svg"
              alt="Sarda Group"
              width={120}
              height={32}
              className="mx-auto mb-8 h-8 w-auto"
            />
          </BlurFade>

          {/* Heading */}
          <BlurFade delay={0.2} inView>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              The Strength Behind The Revolution
            </h2>
          </BlurFade>

          {/* Subtitle */}
          <BlurFade delay={0.3} inView>
            <p className="mt-4 text-white/50">
              Rooted in nearly a century of innovation and trust
            </p>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.4} inView>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-[1.8] text-white/60">
              The Sarda Group is a diversified conglomerate with a legacy spanning
              over nine decades. Headquartered in India, the group operates across
              metals, ferro alloys, power, and now advanced insulation — driven by
              a philosophy of sustainable industrialization and technology-forward
              manufacturing.
            </p>
          </BlurFade>
        </div>

        {/* Stats row — 5 stats with thin white dividers */}
        <div className="mt-16 flex flex-wrap items-center justify-center">
          {SARDA_STATS.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.5 + i * 0.08} inView>
              <div
                className={`flex flex-col items-center px-6 py-4 md:px-10 ${
                  i < SARDA_STATS.length - 1
                    ? "border-r border-white/10"
                    : ""
                }`}
              >
                <span className="font-display text-4xl font-bold text-white md:text-5xl">
                  {stat.value !== null ? (
                    <>
                      {stat.prefix}
                      <NumberTicker
                        value={stat.value}
                        className="font-display text-4xl font-bold text-white md:text-5xl"
                        delay={0.3}
                      />
                      {stat.suffix}
                    </>
                  ) : (
                    stat.text
                  )}
                </span>
                <span className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
                  {stat.label}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Visit button */}
        <BlurFade delay={0.9} inView>
          <div className="mt-14 text-center">
            <a
              href="https://www.sardagroup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 bg-transparent px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Visit Us
              <span className="text-white/60">&rarr;</span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
