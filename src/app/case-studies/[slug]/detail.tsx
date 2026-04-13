"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { caseStudies } from "@/data/blog";
import dynamic from "next/dynamic";
import Counter from "@/components/ui/counter";

const FloatingParticlesBackground = dynamic(
  () => import("@/components/ui/floating-particles").then((m) => m.FloatingParticlesBackground),
  { ssr: false },
);

/* -------------------------------------------------------------------------- */
/*  Animation helpers (matching homepage easing)                               */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
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

function parseStatNumber(s: string): number {
  return parseInt(s.replace(/,/g, ""), 10) || 0;
}

/* ========================================================================== */
/*  DETAIL PAGE                                                                */
/* ========================================================================== */

export function CaseStudyDetail({ slug }: { slug: string }) {
  const cs = caseStudies.find((c) => c.slug === slug)!;
  const related = caseStudies.filter((c) => c.slug !== slug);
  const SectorIcon = cs.sectorIcon;

  return (
    <main className="bg-[#FAFAF8]">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative h-[400px] overflow-hidden md:h-[500px]">
        <Image
          src={cs.heroImage}
          alt={cs.title}
          fill
          priority
          className="hero-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <span
                className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                style={{ backgroundColor: `${cs.color}CC` }}
              >
                <SectorIcon className="h-3.5 w-3.5" strokeWidth={2} />
                {cs.sector}
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              >
                {cs.title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="mt-3 flex items-center gap-1.5 text-base text-white/70 md:text-lg"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              {cs.location}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Orange accent line ────────────────────────────────── */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #FF6600 50%, transparent 100%)",
        }}
      />

      {/* ── Stats Bar ──────────────────────────────────────────── */}
      <section className="border-b border-gray-200/60 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-gray-100 px-6">
          {[
            { label: "Area Installed", value: cs.area, isArea: true },
            { label: "Product Used", value: cs.product, isArea: false },
            { label: "Sector", value: cs.sector, isArea: false },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE }}
              className="group py-8 text-center transition-all duration-500 hover:bg-gray-50/60 md:py-10"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,102,0,0.04) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                {stat.isArea ? (
                  <p className="font-display text-xl font-bold text-[#111] md:text-2xl">
                    <Counter
                      value={parseStatNumber(cs.stat)}
                      suffix=" sq.m."
                      className="font-display text-xl font-bold text-[#111] md:text-2xl"
                    />
                  </p>
                ) : (
                  <p className="font-display text-xl font-bold text-[#111] md:text-2xl">
                    {stat.value}
                  </p>
                )}
                <p className="mt-1 text-xs uppercase tracking-wider text-[#555] md:text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Content Sections ───────────────────────────────────── */}
      <section className="relative py-16 md:py-24">
        {/* FloatingParticlesBackground — light */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingParticlesBackground light />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          {/* The Challenge */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
                The Challenge
              </p>
              <h2 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                Project Requirements
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-6 text-base leading-relaxed text-[#555] md:text-lg"
            >
              {cs.challenge}
            </motion.p>
          </div>

          {/* The Solution */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
                The Solution
              </p>
              <h2 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                Rhino&apos;s Approach
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-6 text-base leading-relaxed text-[#555] md:text-lg"
            >
              {cs.solution}
            </motion.p>
          </div>

          {/* Results */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
                Results
              </p>
              <h2 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                Measured Outcomes
              </h2>
            </motion.div>
            <ul className="mt-6 space-y-4">
              {cs.results.map((result, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: EASE,
                  }}
                  className="flex gap-3"
                >
                  {/* Pulsing checkmark on viewport enter */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.6,
                      ease: EASE,
                    }}
                    className="mt-0.5 shrink-0"
                  >
                    <CheckCircle2
                      className="h-5 w-5 text-green-500"
                      strokeWidth={2}
                    />
                  </motion.div>
                  <span className="text-base leading-relaxed text-[#555] md:text-lg">
                    {result}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
                Technical Specifications
              </p>
              <h2 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                Product Details
              </h2>
            </motion.div>
            <motion.div
              className="mt-6 grid gap-4 sm:grid-cols-2"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {cs.specs.map((spec) => (
                <motion.div key={spec.label} variants={scaleIn}>
                  <TiltCard className="h-full">
                    <div className="card-shine rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                      <p className="text-xs font-medium uppercase tracking-wider text-[#555]">
                        {spec.label}
                      </p>
                      <p className="mt-1 font-display text-base font-bold text-[#111]">
                        {spec.value}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <BlurFade delay={0.2}>
            <div className="relative">
              {/* Radial gradient glow behind card */}
              <div
                className="pointer-events-none absolute -inset-8 opacity-30"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,102,0,0.15) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />
              <div className="relative rounded-3xl border border-gray-100 bg-white p-8 text-center md:p-12">
                <h3 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                  Ready to discuss your project?
                </h3>
                <p className="mx-auto mt-3 max-w-md text-base text-[#555]">
                  Our technical team can help you specify the right Rhino
                  insulation for your application.
                </p>
                <div className="relative mt-6 inline-block">
                  <div
                    className="pointer-events-none absolute -inset-4 opacity-40"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(255,102,0,0.25) 0%, transparent 70%)",
                      filter: "blur(12px)",
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
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── Related Case Studies ───────────────────────────────── */}
      <section className="border-t border-gray-200/60 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <BlurFade delay={0.1}>
            <p className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
              More Projects
            </p>
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-[#111] md:text-4xl">
              Related Case Studies
            </h2>
          </BlurFade>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {related.map((r) => {
              const RIcon = r.sectorIcon;
              return (
                <motion.div key={r.slug} variants={fadeUp}>
                  <TiltCard className="h-full">
                    <Link href={`/case-studies/${r.slug}`} className="group block h-full">
                      <div
                        className="card-shine flex h-full overflow-hidden rounded-3xl border border-gray-100 bg-[#FAFAF8] transition-all duration-500 group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)]"
                      >
                        <div className="relative hidden h-auto w-48 shrink-0 overflow-hidden md:block">
                          <Image
                            src={r.heroImage}
                            alt={r.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Hover glow on image */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(ellipse at 50% 50%, ${r.color}20, transparent 70%)`,
                            }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-6">
                          <span
                            className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                            style={{ backgroundColor: r.color }}
                          >
                            <RIcon className="h-3 w-3" strokeWidth={2} />
                            {r.sector}
                          </span>
                          <h3 className="font-display text-lg font-bold text-[#111] transition-colors duration-300 group-hover:text-[#FF6600]">
                            {r.title}
                          </h3>
                          <p className="mt-1 text-sm text-[#555]">{r.location}</p>
                          {/* Always visible, arrow animates */}
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6600]">
                            View Case Study
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#555] transition-colors duration-300 hover:text-[#FF6600]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
