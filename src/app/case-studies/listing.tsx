"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Box, BarChart3 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { caseStudies } from "@/data/blog";
import dynamic from "next/dynamic";
import Counter from "@/components/ui/counter";

const FloatingOrbsBackground = dynamic(
  () => import("@/components/ui/floating-orbs-bg").then((m) => m.FloatingOrbsBackground),
  { ssr: false },
);

const FloatingParticlesBackground = dynamic(
  () => import("@/components/ui/floating-particles").then((m) => m.FloatingParticlesBackground),
  { ssr: false },
);

/* -------------------------------------------------------------------------- */
/*  Animation variants (matching homepage easing)                              */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

/* -------------------------------------------------------------------------- */
/*  Inline TiltCard for 3D perspective                                         */
/* -------------------------------------------------------------------------- */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helper: parse stat string like "12,000" to number                          */
/* -------------------------------------------------------------------------- */

function parseStatNumber(stat: string): number {
  return parseInt(stat.replace(/,/g, ""), 10) || 0;
}

/* ========================================================================== */
/*  LISTING PAGE                                                               */
/* ========================================================================== */

export function CaseStudiesListing() {
  return (
    <main className="bg-[#FAFAF8]">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#111] pb-24 pt-36 md:pb-32 md:pt-44">
        {/* FloatingOrbsBackground */}
        <FloatingOrbsBackground />

        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated radial gradient glows */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "700px",
            height: "500px",
            background: "radial-gradient(ellipse at center, rgba(255,102,0,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at center, rgba(45,184,110,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
              Project Showcase
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-4xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl"
            >
              Real-World Impact
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            From 500MW power stations to IGBC Platinum offices and offshore
            platforms — see how Rhino insulation performs where it matters most.
          </motion.p>
        </div>
      </section>

      {/* ── Decorative line between hero and cards ──────────────── */}
      <div className="line-gradient mx-auto max-w-md" />

      {/* ── Case Study Cards ─────────────────────────────────────── */}
      <section className="relative -mt-16 pb-24 md:pb-32">
        {/* FloatingParticlesBackground — light */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingParticlesBackground light />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {caseStudies.map((cs, i) => (
              <motion.div key={cs.slug} variants={fadeUp}>
                <TiltCard className="h-full">
                  <Link href={`/case-studies/${cs.slug}`} className="group block h-full">
                    <article
                      className="card-shine relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)]"
                    >
                      {/* Hero image */}
                      <div className="relative h-56 overflow-hidden">
                        {/* Radial glow behind image — intensifies on hover */}
                        <div
                          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(ellipse at 50% 70%, ${cs.color}25, transparent 70%)`,
                          }}
                        />
                        <Image
                          src={cs.heroImage}
                          alt={cs.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Sector badge */}
                        <div className="absolute left-4 top-4 z-20">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                            style={{ backgroundColor: `${cs.color}CC` }}
                          >
                            <cs.sectorIcon className="h-3.5 w-3.5" strokeWidth={2} />
                            {cs.sector}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h2 className="font-display text-xl font-bold text-[#111] transition-colors duration-300 group-hover:text-[#FF6600]">
                          {cs.title}
                        </h2>

                        {/* Location */}
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-[#555]">
                          <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                          {cs.location}
                        </div>

                        {/* Product */}
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-[#555]">
                          <Box className="h-3.5 w-3.5" strokeWidth={1.8} />
                          {cs.product}
                        </div>

                        {/* Area stat — animated counter */}
                        <div className="mt-5 flex items-end gap-2 border-t border-gray-100 pt-5">
                          <BarChart3
                            className="h-5 w-5 text-[#FF6600]"
                            strokeWidth={1.8}
                          />
                          <Counter
                            value={parseStatNumber(cs.stat)}
                            className="font-display text-2xl font-bold leading-none text-[#111]"
                            suffix=""
                          />
                          <span className="pb-0.5 text-sm text-[#555]">
                            {cs.statLabel}
                          </span>
                        </div>

                        {/* Excerpt */}
                        <p className="mt-4 text-sm leading-relaxed text-[#666]">
                          {cs.excerpt}
                        </p>

                        {/* View Case Study — always visible, arrow animates */}
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6600]">
                          View Case Study
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-gray-200/60 bg-white py-24 md:py-32">
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <BlurFade delay={0.1}>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
              Let&apos;s Build Together
            </p>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h2 className="font-display text-3xl font-bold text-[#111] md:text-5xl">
              Have a project in mind?
            </h2>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="mx-auto mt-4 max-w-lg text-lg text-[#555]">
              Our technical team can help you specify the right Rhino insulation
              solution for your next project.
            </p>
          </BlurFade>
          <BlurFade delay={0.4}>
            <div className="relative mt-8 inline-block">
              {/* Radial glow behind button */}
              <div
                className="pointer-events-none absolute -inset-6 opacity-40"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,102,0,0.25) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              />
              <Link
                href="/contact"
                className="animate-glow-pulse relative inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#FF6600]/20 transition-all duration-300 hover:bg-[#FF8800] hover:shadow-xl hover:shadow-[#FF6600]/30"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
