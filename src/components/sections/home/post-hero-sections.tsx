"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Zap, Factory, Anchor, Snowflake, Building2, Landmark,
  BookOpen, Leaf, Cpu, BarChart3, ArrowUpRight, Clock,
  type LucideIcon,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import Counter from "@/components/ui/counter";
import { VariantsSection } from "@/components/sections/home/variants-3d-showcase";
import { blogPostsSorted } from "@/data/blog";

const FloatingParticlesBackground = dynamic(
  () => import("@/components/ui/floating-particles").then((m) => m.FloatingParticlesBackground),
  { ssr: false },
);

const FloatingGridBackground = dynamic(
  () => import("@/components/ui/floating-grid-bg").then((m) => m.FloatingGridBackground),
  { ssr: false },
);

const FloatingOrbsBackground = dynamic(
  () => import("@/components/ui/floating-orbs-bg").then((m) => m.FloatingOrbsBackground),
  { ssr: false },
);

/* ========================================================================== */
/*  DATA                                                                       */
/* ========================================================================== */

const VARIANTS = [
  {
    name: "Rhino Elite",
    code: "RSL",
    reduction: 25,
    color: "#FF6600",
    colorLight: "#FFF3EB",
    badge: "Premium",
    emoji: "\uD83C\uDFC6",
    description:
      "Highest thermal performance for demanding industrial applications. Manufactured via India\u2019s first Electric Arc Furnace.",
    href: "/products/rhino-slabs",
    specs: ["750\u00B0C Max Temp", "A1 Fire Rated", "40\u2013200 kg/m\u00B3"],
    image: "/images/products/elite-hd.avif",
    badgeImage: "/images/products/elite.avif",
  },
  {
    name: "Rhino Enduro",
    code: "RWM",
    reduction: 45,
    color: "#4A4A4A",
    colorLight: "#F5F5F5",
    badge: "Balanced",
    emoji: "\uD83D\uDCAA",
    description:
      "The versatile all-rounder balancing performance and sustainability for every sector.",
    href: "/products/rhino-wired-matts",
    specs: ["650\u00B0C Max Temp", "A1 Fire Rated", "Flexible Install"],
    image: "/images/products/enduro-hd.avif",
    badgeImage: "/images/products/enduro.avif",
  },
  {
    name: "Rhino Eco-Green",
    code: "RBR",
    reduction: 65,
    color: "#2DB86E",
    colorLight: "#EDFBF3",
    badge: "Greenest",
    emoji: "\uD83C\uDF3F",
    description:
      "India\u2019s lowest carbon insulation. Built for net-zero buildings and IGBC/GRIHA projects.",
    href: "/products/rhino-building-rolls",
    specs: ["IGBC Ready", "65% Less CO\u2082", "Net-Zero Spec"],
    image: "/images/products/ecogreen-hd.avif",
    badgeImage: "/images/products/ecogreen.avif",
  },
];

const SECTORS: { icon: LucideIcon; name: string; desc: string; temp: string; color: string; highlight: boolean; image: string }[] = [
  { icon: Zap, name: "Power & Energy", desc: "Boilers, turbines & plant insulation", temp: "750\u00B0C", color: "#FF6600", highlight: true, image: "/images/applications/power-energy.jpg" },
  { icon: Factory, name: "Petrochemical", desc: "Pipelines, tanks & process units", temp: "650\u00B0C", color: "#FF8800", highlight: false, image: "/images/applications/petrochemical.jpg" },
  { icon: Anchor, name: "Marine & Offshore", desc: "Engine rooms & deck insulation", temp: "600\u00B0C", color: "#1D6FA4", highlight: false, image: "/images/applications/marine.jpg" },
  { icon: Snowflake, name: "Cold Storage & HVAC", desc: "Ducts, chillers & cold rooms", temp: "-40\u00B0C", color: "#2DB86E", highlight: true, image: "/images/applications/cold-storage.jpg" },
  { icon: Building2, name: "Green Buildings", desc: "IGBC, GRIHA & ECBC compliant", temp: "A1 Rated", color: "#2DB86E", highlight: false, image: "/images/applications/green-building.jpg" },
  { icon: Landmark, name: "Commercial", desc: "Offices, malls & residential towers", temp: "NRC \u2265 0.90", color: "#FF6600", highlight: false, image: "/images/applications/commercial.jpg" },
];

const CASE_STUDIES = [
  {
    title: "500MW Thermal Power Station",
    tag: "Power & Energy",
    emoji: "\u26A1",
    meta: "Andhra Pradesh \u00B7 Rhino Elite \u00B7 12,000 sq.m.",
    color: "#FF6600",
    stat: "12,000",
    statLabel: "sq.m. installed",
  },
  {
    title: "IGBC Platinum Office Complex",
    tag: "Green Buildings",
    emoji: "\uD83C\uDFD7\uFE0F",
    meta: "Telangana \u00B7 Rhino Eco-Green \u00B7 8,400 sq.m.",
    color: "#2DB86E",
    stat: "8,400",
    statLabel: "sq.m. installed",
  },
  {
    title: "Offshore Platform Insulation",
    tag: "Marine & Offshore",
    emoji: "\u2693",
    meta: "Mumbai Offshore \u00B7 Rhino Enduro \u00B7 4,200 sq.m.",
    color: "#FF8800",
    stat: "4,200",
    statLabel: "sq.m. installed",
  },
];

function parseArticleDate(dateStr: string): number {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [mon, year] = dateStr.split(" ");
  return new Date(Number(year), months[mon] ?? 0).getTime();
}

const BLOG_POSTS_RAW: { category: string; icon: LucideIcon; color: string; title: string; date: string; readTime: string }[] = [
  {
    category: "Technology",
    icon: Cpu,
    color: "#FF8800",
    title: "How Rhino Eco-Green Achieves 65% Carbon Reduction Using Electric Arc Furnace Technology",
    date: "Mar 2026",
    readTime: "7 min",
  },
  {
    category: "Product Guides",
    icon: Zap,
    color: "#FF6600",
    title: "Rhino Elite vs Rhino Enduro: Which Insulation Variant Is Right for Your Project?",
    date: "Mar 2026",
    readTime: "5 min",
  },
  {
    category: "ECBC & Regulations",
    icon: BookOpen,
    color: "#FF6600",
    title: "How ECBC 2023 Changes Insulation Specifications for Commercial Buildings",
    date: "Feb 2026",
    readTime: "8 min",
  },
  {
    category: "Green Buildings",
    icon: Leaf,
    color: "#2DB86E",
    title: "Mineral Wool vs Glass Wool \u2014 Which Wins for IGBC Platinum Projects?",
    date: "Jan 2026",
    readTime: "6 min",
  },
  {
    category: "Technology",
    icon: Cpu,
    color: "#FF8800",
    title: "What Makes Electric Arc Furnace Rock Mineral Wool Fundamentally Different?",
    date: "Jan 2026",
    readTime: "10 min",
  },
  {
    category: "Sustainability",
    icon: BarChart3,
    color: "#2DB86E",
    title: "EPD Guide: What Architects Need to Specify Net-Zero Compliant Insulation",
    date: "Dec 2025",
    readTime: "7 min",
  },
];

// Sort by date descending — newest article always appears first (featured)
// Only show top 4 on homepage (1 featured + 3 stacked)
export const BLOG_POSTS_ALL = [...BLOG_POSTS_RAW].sort(
  (a, b) => parseArticleDate(b.date) - parseArticleDate(a.date),
);
const BLOG_POSTS = BLOG_POSTS_ALL.slice(0, 4);

/* ========================================================================== */
/*  ANIMATION HELPERS                                                          */
/* ========================================================================== */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ========================================================================== */
/*  3D TILT CARD                                                               */
/* ========================================================================== */

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

/* ========================================================================== */
/*  PARALLAX SECTION                                                           */
/* ========================================================================== */

function ParallaxSection({
  children,
  className,
  speed = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ========================================================================== */
/*  ANIMATED SECTION HEADER                                                    */
/* ========================================================================== */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <BlurFade delay={0} inView>
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange">
          {eyebrow}
        </p>
      </BlurFade>
      <BlurFade delay={0.1} inView>
        <h2
          className={`font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl ${
            light ? "text-[#111]" : "text-white"
          }`}
        >
          {title}
        </h2>
      </BlurFade>
      {subtitle && (
        <BlurFade delay={0.2} inView>
          <p
            className={`mt-4 max-w-xl text-base md:text-lg ${
              light ? "text-[#666]" : "text-white/60"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        </BlurFade>
      )}
    </div>
  );
}

/* ========================================================================== */
/*  MAIN EXPORT                                                                */
/* ========================================================================== */

export function PostHeroSections() {
  return (
    <div className="relative z-20">
      <SustainabilityIntro />
      <VariantsSection />
      <StatsStrip />
      <SardaHeritage />
      <GlobalPowerhouse />
      <SectorsRow />
      <OneNationOnePrice />
      <CaseStudies />
      <BlogGrid />
      <CtaSection />
      <Accreditations />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sustainability Intro — "Three Groundbreaking Solutions"                     */
/* -------------------------------------------------------------------------- */

function SustainabilityIntro() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] px-6 py-28 md:px-12 md:py-36 xl:px-20">
      {/* 3D Animated Background */}
      <FloatingOrbsBackground />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left */}
          <div className="min-w-0">
            <BlurFade delay={0} inView>
              <div className="mb-8 flex items-center gap-4">
                <span className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111]">
                  Sustainability
                </span>
                <span className="h-px w-10 bg-gray-300" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#666]">
                  Meets Innovation
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h2 className="mb-8 font-display text-4xl font-bold leading-[1.1] text-[#111] sm:text-5xl md:text-5xl lg:text-6xl">
                Three
                <br />
                Groundbreaking
                <br />
                Solutions
              </h2>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="max-w-md text-base leading-relaxed text-[#666] md:text-lg">
                Rhino stands as a powerful testament to our vision &mdash;
                turning environmental challenges into opportunities for a
                brighter, more sustainable future.
              </p>
            </BlurFade>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            <BlurFade delay={0.2} inView>
              <h3 className="mb-5 font-display text-lg font-bold text-[#111] md:text-xl">
                Elevating India to Global Sustainability Leadership.
              </h3>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="mb-6 text-base leading-[1.85] text-[#666]">
                With these three variants, Rhino Rock Mineral Wool ensures that
                every application &mdash; whether industrial, residential, or
                marine &mdash; belongs to high-performance thermal, acoustic, and
                fire insulation while benefiting from a greener future.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-base leading-[1.85] text-[#666]">
                For the first time in India, Rhino, the greenest rock mineral
                wool, will be available in three unique variants. Each variant has
                been meticulously engineered to meet diverse customer needs,
                achieving an unprecedented equilibrium between ambitious
                sustainability objectives and superior performance.
              </p>
            </BlurFade>

            {/* Variant pills */}
            <BlurFade delay={0.5} inView>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { name: "Elite", reduction: "25%", color: "#FF6600" },
                  { name: "Enduro", reduction: "45%", color: "#4A4A4A" },
                  { name: "Eco-Green", reduction: "65%", color: "#2DB86E" },
                ].map((v) => (
                  <span
                    key={v.name}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
                    style={{ borderColor: `${v.color}30`, color: v.color }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: v.color }}
                    />
                    {v.name} &middot; {v.reduction} less CO&#x2082;
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Products Grid — 3D tilt cards                                              */
/* -------------------------------------------------------------------------- */

function ProductsGrid() {
  return (
    <section className="overflow-hidden bg-white px-6 py-28 md:px-12 md:py-36 xl:px-20">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          eyebrow="Three Groundbreaking Variants"
          title="Choose Your Revolution"
          subtitle="Each variant is manufactured in the same state-of-the-art EAF facility — the difference is in the carbon offset level."
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {VARIANTS.map((v, i) => (
            <motion.div key={v.name} variants={fadeUp}>
              <TiltCard className="h-full">
                <Link
                  href={v.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1"
                >
                  {/* Product Image — large hero-style */}
                  <div className="relative h-72 w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white md:h-80">
                    {/* Radial glow behind product */}
                    <div
                      className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60"
                      style={{
                        background: `radial-gradient(ellipse at 50% 60%, ${v.color}20, transparent 70%)`,
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.image}
                      alt={v.name}
                      className="absolute inset-0 h-full w-full object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2 md:p-8"
                    />
                    {/* Reduction badge */}
                    <div
                      className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundColor: `${v.color}DD` }}
                    >
                      {v.badge}
                    </div>
                    {/* CO2 badge */}
                    <motion.div
                      className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    >
                      <span className="text-xs font-medium text-[#555]">CO&#x2082;</span>
                      <span className="font-display text-sm font-bold" style={{ color: v.color }}>
                        -{v.reduction}%
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-1 flex-col p-7 md:p-8">
                    {/* Animated hover glow */}
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-60 group-hover:scale-150"
                      style={{ background: v.color }}
                    />

                    {/* Title + Code */}
                    <div className="relative flex items-baseline gap-3">
                      <h3 className="font-display text-2xl font-bold text-[#111] lg:text-3xl">
                        {v.name}
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: v.color }}>
                      {v.description.split(".")[0]}.
                    </p>

                    {/* Specs pills — horizontal scroll on mobile */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {v.specs.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 group-hover:border-transparent"
                          style={{
                            borderColor: `${v.color}20`,
                            color: "#555",
                            backgroundColor: `${v.color}06`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Carbon meter — animated bar */}
                    <div className="mt-auto pt-6">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#777]">
                          Carbon Reduction
                        </span>
                        <span
                          className="font-display text-xl font-bold"
                          style={{ color: v.color }}
                        >
                          <NumberTicker value={v.reduction} className="!text-inherit" />%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${v.color}, ${v.color}88)`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${v.reduction}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>

                    {/* CTA link */}
                    <div className="mt-5 flex items-center gap-2 overflow-hidden">
                      <span
                        className="text-sm font-semibold transition-all duration-500 group-hover:tracking-wide"
                        style={{ color: v.color }}
                      >
                        Explore {v.name.split(" ")[1]}
                      </span>
                      <span
                        className="inline-block transition-all duration-500 group-hover:translate-x-1.5"
                        style={{ color: v.color }}
                      >
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  ONE NATION — ONE PRICE                                                     */
/* -------------------------------------------------------------------------- */

function DropLetter({
  letter,
  delay,
  color,
  shadow,
  fontWeight = "font-extrabold",
}: {
  letter: string;
  delay: number;
  color: string;
  shadow: string;
  fontWeight?: string;
}) {
  return (
    <motion.span
      className={`inline-block font-display ${fontWeight}`}
      style={{ color, textShadow: shadow, display: letter === " " ? "inline" : "inline-block" }}
      initial={{ opacity: 0, y: -120, rotateX: -90, scale: 1.2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.3, delay },
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}

function DropWord({
  text,
  baseDelay,
  color,
  shadow,
  className,
  fontWeight,
}: {
  text: string;
  baseDelay: number;
  color: string;
  shadow: string;
  className?: string;
  fontWeight?: string;
}) {
  return (
    <span className={className} style={{ perspective: "1200px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      {text.split("").map((letter, i) => (
        <DropLetter
          key={`${letter}-${i}`}
          letter={letter}
          delay={baseDelay + i * 0.06}
          color={color}
          shadow={shadow}
          fontWeight={fontWeight}
        />
      ))}
    </span>
  );
}

function OneNationOnePrice() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F2] via-[#FFF3E8] to-[#FFF8F2] py-16 md:py-20 lg:py-24"
    >
      {/* Horizontal accent lines */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-rhino-orange/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rhino-orange/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.span
            className="font-mono text-[10px] font-medium uppercase tracking-[0.5em] text-rhino-orange/70 md:text-xs"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.5em" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Promise to India
          </motion.span>

          {/* ONE NATION — supporting line, toned down */}
          <h2 className="mt-8 text-[2.4rem] leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-[6.5rem]">
            {isInView && (
              <DropWord text="ONE NATION" baseDelay={0.2} color="#1a1a1a" shadow="none" fontWeight="font-bold" />
            )}
          </h2>

          {/* Spacer */}
          <div className="my-3 md:my-5" />

          {/* ONE PRICE — the hero line */}
          <h2 className="text-[3.2rem] leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
            {isInView && (
              <DropWord text="ONE PRICE" baseDelay={0.9} color="var(--color-rhino-orange)" shadow="none" />
            )}
          </h2>

          {/* Subtext — more breathing room and larger */}
          <motion.p
            className="mt-12 max-w-2xl text-base leading-relaxed text-[#777] md:mt-16 md:text-lg md:leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            From Kashmir to Kanyakumari &mdash; every customer, every state,
            every project. Uniform pricing with zero regional markups.
            Transparent. Fair. Uncompromising.
          </motion.p>

          {/* Three pillars */}
          <motion.div
            className="mt-14 flex flex-wrap items-center justify-center gap-8 md:mt-16 md:gap-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              "Uniform Pricing",
              "Zero Hidden Costs",
              "Pan-India Delivery",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="hidden h-4 w-px bg-[#ddd] md:block" />
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666] md:text-sm">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats Strip — animated counters with parallax                              */
/* -------------------------------------------------------------------------- */

function StatsStrip() {
  const stats = [
    { value: 0, suffix: "%", label: "Fossil Fuels", sub: "Solar Powered", display: "0%" },
    { value: 65, suffix: "%", label: "Less Carbon", sub: "vs. Conventional", display: null },
    { value: 1800, suffix: "°C", label: "Melting Point", sub: "Volcanic Rock", display: null },
    { value: 7, suffix: "yr", label: "R&D Investment", sub: "Patent Pending", display: null },
  ];

  return (
    <section className="relative overflow-hidden bg-[#111] px-6 py-20 md:px-12 md:py-28 xl:px-20">
      {/* Animated gradient bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,102,0,0.15), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(45,184,110,0.1), transparent 60%)",
        }}
      />

      <ParallaxSection speed={0.3} className="relative">
        <motion.div
          className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Glow ring on hover */}
              <div className="absolute -inset-4 rounded-3xl bg-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative font-display text-3xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {s.display ? (
                  <span>{s.display}</span>
                ) : (
                  <Counter value={s.value} suffix={s.suffix} duration={2 + i * 0.3} className="text-white" />
                )}
              </span>
              <span className="relative mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-rhino-orange">
                {s.label}
              </span>
              <span className="relative mt-1 text-xs text-white/60">
                {s.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </ParallaxSection>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sarda Heritage — "The Strength Behind The Revolution"                      */
/* -------------------------------------------------------------------------- */

const sardaStats = [
  { label: "Sales", value: "\u20B96,000 Cr" },
  { label: "Work Force", value: "~8,000" },
  { label: "Exports", value: "60+ Countries" },
  { label: "Market CAP", value: "\u20B918,000 Cr" },
  { label: "Investor", value: "SARDAEN" },
];

function SardaHeritage() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] px-6 py-28 md:px-12 md:py-36 xl:px-20">
      {/* 3D Animated Background */}
      <FloatingParticlesBackground light />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left: Image with overlapping card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/process/smelting-real-2.jpg"
                alt="Sarda Group electric arc furnace — 1,800°C molten rock"
                className="h-72 w-full object-cover md:h-[440px]"
              />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute -bottom-8 -right-4 grid grid-cols-2 gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl md:-right-10 md:gap-3 md:p-5"
            >
              {sardaStats.slice(0, 4).map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-display text-sm font-bold text-[#111] md:text-base">{s.value}</span>
                  <p className="text-xs font-medium uppercase tracking-wider text-rhino-orange">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Sarda logo */}
            <div className="absolute left-5 top-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/sarda-venture-white.png"
                alt="Sarda Group"
                className="h-6 w-auto opacity-80"
              />
            </div>
          </motion.div>

          {/* Right: Text content */}
          <div>
            <BlurFade delay={0} inView>
              <div className="mb-5 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logos/sarda-venture-white.png"
                  alt="Sarda Group"
                  className="h-7 w-auto brightness-0 md:h-8"
                />
                <div className="h-5 w-px bg-gray-300" />
                <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-rhino-orange md:text-base">
                  The Sarda Group
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h2 className="mb-3 font-display text-3xl font-bold leading-[1.1] text-[#111] sm:text-4xl md:text-5xl">
                The Strength Behind
                <br />
                <span className="text-rhino-orange">The Revolution</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <h3 className="mb-6 text-lg font-semibold text-[#444] md:text-xl">
                Rooted in nearly a century of innovation and trust
              </h3>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="mb-5 text-sm leading-[1.85] text-[#666] md:text-base">
                For more than eight decades, the Sarda Group has been a driving
                force in advancement, influencing industries and improving
                people&apos;s lives all around the world. From the raw strength
                of minerals to the delicate elegance of real estate, Sarda&apos;s
                impact spans continents.
              </p>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="mb-5 text-sm leading-[1.85] text-[#666] md:text-base">
                We began as a small steel trading firm in the 1930s and have
                grown into a thriving worldwide enterprise with operations in
                Dubai, Hong Kong, Singapore, Indonesia, and Malaysia.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="mb-8 text-sm leading-[1.85] text-[#666] md:text-base">
                The Sarda Group is driven by an unrelenting dedication to making
                a substantial impact, with a varied presence in critical
                industries such as mining, power, steel, ferro alloys,
                agri-business, food products, horticulture, real estate, and
                construction materials.
              </p>
            </BlurFade>

            {/* Investor badge */}
            <BlurFade delay={0.5} inView>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-[#666]">Investor</span>
                <span className="font-display text-lg font-bold text-rhino-orange">SARDAEN</span>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Global Powerhouse — Sarda Group diversified businesses                     */
/* -------------------------------------------------------------------------- */

const industries = [
  "Power", "Mining", "Steel", "Ferro",
  "Hybrid Seeds", "Dairy Products", "Real Estate",
];

function GlobalPowerhouse() {
  return (
    <section className="overflow-hidden bg-white px-6 py-28 md:px-12 md:py-36 xl:px-20" style={{ borderBottom: "1px solid #eee" }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            <BlurFade delay={0} inView>
              <h2 className="mb-3 font-display text-4xl font-bold text-rhino-orange sm:text-5xl md:text-6xl">
                A Global Powerhouse
              </h2>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h3 className="mb-8 font-display text-2xl font-bold text-[#111] md:text-3xl">
                A legacy of generations
              </h3>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="mb-5 text-base leading-[1.85] text-[#666]">
                From mining to steel and power to infrastructure, the Sarda
                Group is driving global advancement through sustainable
                solutions. Sarda Group is India&apos;s largest manufacturer and
                exporter of manganese alloys, as well as one of its lowest-cost
                steel producers.
              </p>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="mb-8 text-base leading-[1.85] text-[#666]">
                Across industries, we continue to grow, innovate, and set new
                standards of excellence.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <a
                href="https://www.sardagroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rhino-orange/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                Visit Us
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </BlurFade>
          </div>

          {/* Right: Industry pills */}
          <div className="flex items-center">
            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {industries.map((ind) => (
                <motion.span
                  key={ind}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#333] shadow-sm transition-all duration-300 hover:border-rhino-orange/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  {ind}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sectors Row — Hover-reveal cards                                           */
/* -------------------------------------------------------------------------- */

function SectorsRow() {
  return (
    <section className="relative overflow-hidden bg-[#F3F2EE] px-6 py-28 md:px-12 md:py-36 xl:px-20">
      {/* 3D Animated Background */}
      <FloatingParticlesBackground light />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="text-center">
          <SectionHeader
            eyebrow="Applications"
            title="Built for Every Industry"
            subtitle="From 750°C furnace walls to green-rated office facades — one material, infinite applications."
            align="center"
          />
        </div>

        {/* Bento Grid */}
        <motion.div
          className="mt-16 grid auto-rows-[160px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[180px] md:grid-cols-4 md:gap-4 lg:auto-rows-[200px]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SECTORS.map((s, i) => (
            <motion.div
              key={s.name}
              variants={scaleIn}
              className={
                s.highlight
                  ? "col-span-1 row-span-1 sm:col-span-2 md:col-span-2"
                  : "col-span-1 row-span-1"
              }
            >
              <TiltCard className="h-full">
                <div
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/60 bg-white p-6 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] md:p-7"
                >
                  {/* Background sector image */}
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="pointer-events-none object-cover opacity-[0.22] transition-opacity duration-700 group-hover:opacity-[0.35]"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />

                  {/* Background gradient glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${s.color}12, transparent 60%)`,
                    }}
                  />

                  {/* Animated border beam on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      border: `1px solid ${s.color}30`,
                    }}
                  />

                  {/* Top row: Icon + Temp badge */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${s.color}18, ${s.color}08)`,
                        boxShadow: `0 0 0 1px ${s.color}20`,
                      }}
                    >
                      <s.icon className="h-5 w-5" style={{ color: s.color }} strokeWidth={1.8} />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-xs font-bold tracking-wider transition-all duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: `${s.color}20`,
                        color: s.color,
                        textShadow: `0 0 8px ${s.color}40`,
                      }}
                    >
                      {s.temp}
                    </span>
                  </div>

                  {/* Bottom: Text + Arrow */}
                  <div className="relative mt-auto">
                    <h3 className="text-lg font-bold text-[#111] transition-colors duration-300 group-hover:text-[#111] md:text-xl">
                      {s.name}
                    </h3>
                    <div className="mt-1.5 flex items-end justify-between gap-4">
                      <p className="text-sm font-medium leading-relaxed text-[#333]">
                        {s.desc}
                      </p>
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
                        style={{
                          backgroundColor: `${s.color}10`,
                          color: s.color,
                        }}
                      >
                        <span className="inline-block text-sm font-bold transition-transform duration-300 group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Large faded icon watermark */}
                  <s.icon
                    className="pointer-events-none absolute -bottom-6 -right-4 h-28 w-28 opacity-[0.04] transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-110 md:h-32 md:w-32"
                    style={{ color: s.color }}
                    strokeWidth={0.8}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA row */}
        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link
              href="/applications"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#333] shadow-sm transition-all duration-300 hover:border-rhino-orange hover:text-rhino-orange hover:shadow-md"
            >
              View All Applications
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Case Studies — Large immersive cards                                       */
/* -------------------------------------------------------------------------- */

function CaseStudies() {
  return (
    <section className="overflow-hidden bg-white px-6 py-28 md:px-12 md:py-36 xl:px-20">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          eyebrow="Case Studies"
          title="Proof in Performance"
          subtitle="Real installations across India. Verified results."
          align="center"
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CASE_STUDIES.map((c) => (
            <motion.div key={c.title} variants={fadeUp}>
              <TiltCard className="h-full">
                <div className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/60 bg-white p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                  {/* Background glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${c.color}, transparent 60%)`,
                    }}
                  />

                  {/* Top: Tag + Emoji */}
                  <div className="relative flex items-start justify-between">
                    <span
                      className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.tag}
                    </span>
                    <span className="text-5xl opacity-15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {c.emoji}
                    </span>
                  </div>

                  {/* Bottom: Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-[#111] md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#555]">{c.meta}</p>

                    {/* Stat */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <span
                        className="font-display text-3xl font-bold"
                        style={{ color: c.color }}
                      >
                        {c.stat}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-[#666]">
                        {c.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Blog Grid — Stunning editorial with 3D background                          */
/* -------------------------------------------------------------------------- */

function BlogGrid() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] px-6 py-28 md:px-12 md:py-36 xl:px-20">
      {/* 3D Animated Background */}
      <FloatingGridBackground />

      {/* Soft radial accents */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(255,102,0,0.04), transparent 60%), radial-gradient(ellipse 40% 50% at 90% 20%, rgba(45,184,110,0.03), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Insights"
            title="The Knowledge Hub"
            subtitle="Latest research, guides, and industry analysis from our experts."
          />
          <BlurFade delay={0.3} inView>
            <Link
              href="/blog"
              className="group shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-[#333] backdrop-blur-sm transition-all hover:border-rhino-orange hover:text-rhino-orange hover:shadow-lg hover:shadow-rhino-orange/10"
            >
              View All Articles
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </BlurFade>
        </div>

        {/* Featured + Grid layout */}
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Featured card (first post) */}
          <motion.div variants={fadeUp}>
            <TiltCard className="h-full">
              <Link href={`/blog/${blogPostsSorted[0]?.slug ?? ""}`} className="block h-full">
              <article className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.1)]">
                {/* Gradient bg */}
                <div
                  className="absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1]"
                  style={{
                    background: `linear-gradient(135deg, ${BLOG_POSTS[0].color}40, transparent 60%), radial-gradient(circle at 80% 20%, ${BLOG_POSTS[0].color}30, transparent 50%)`,
                  }}
                />

                {/* Large icon watermark */}
                {(() => {
                  const Icon = BLOG_POSTS[0].icon;
                  return (
                    <Icon
                      className="pointer-events-none absolute right-8 top-8 h-32 w-32 opacity-[0.06] transition-all duration-700 group-hover:opacity-[0.1] group-hover:scale-110 group-hover:rotate-6 md:h-40 md:w-40"
                      style={{ color: BLOG_POSTS[0].color }}
                      strokeWidth={0.7}
                    />
                  );
                })()}

                {/* Featured badge */}
                <div className="absolute left-6 top-6">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                    style={{ backgroundColor: BLOG_POSTS[0].color }}
                  >
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div className="relative p-8 pt-0">
                  <span
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${BLOG_POSTS[0].color}12`, color: BLOG_POSTS[0].color }}
                  >
                    {(() => { const Icon = BLOG_POSTS[0].icon; return <Icon className="h-3 w-3" />; })()}
                    {BLOG_POSTS[0].category}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold leading-tight text-[#111] transition-colors duration-300 group-hover:text-[#111] md:text-3xl">
                    {BLOG_POSTS[0].title}
                  </h3>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#666]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {BLOG_POSTS[0].readTime}
                    </span>
                    <span>{BLOG_POSTS[0].date}</span>
                  </div>
                  <div className="mt-5">
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                      style={{ color: BLOG_POSTS[0].color }}
                    >
                      Read Article <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
              </Link>
            </TiltCard>
          </motion.div>

          {/* Remaining 3 cards stacked */}
          <div className="flex flex-col gap-4">
            {BLOG_POSTS.slice(1).map((post, idx) => (
              <motion.div key={post.title} variants={fadeUp}>
                <TiltCard>
                  <Link href={`/blog/${blogPostsSorted[idx + 1]?.slug ?? ""}`} className="block">
                  <article className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)]">
                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ boxShadow: `inset 0 0 0 1px ${post.color}20` }}
                    />

                    {/* Icon */}
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${post.color}14, ${post.color}06)`,
                        boxShadow: `0 0 0 1px ${post.color}15`,
                      }}
                    >
                      <post.icon className="h-5 w-5" style={{ color: post.color }} strokeWidth={1.8} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <span
                        className="mb-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${post.color}10`, color: post.color }}
                      >
                        {post.category}
                      </span>
                      <h3 className="text-[15px] font-semibold leading-snug text-[#222] transition-colors duration-300 group-hover:text-[#111]">
                        {post.title}
                      </h3>
                      <div className="mt-2.5 flex items-center gap-3 text-xs text-[#888]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                      style={{ backgroundColor: `${post.color}10`, color: post.color }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </article>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accreditations                                                             */
/* -------------------------------------------------------------------------- */

const CERTIFICATIONS = [
  { name: "ISO 9001", sub: "Quality Management", image: "/images/certifications/iso-9001.png", category: "iso" },
  { name: "ISO 14001", sub: "Environmental", image: "/images/certifications/iso-14001.png", category: "iso" },
  { name: "ISO 45001", sub: "Health & Safety", image: "/images/certifications/iso-45001.png", category: "iso" },
  { name: "ISO 50001", sub: "Energy Management", image: "/images/certifications/iso-50001.png", category: "iso" },
  { name: "NaBL", sub: "Lab Accreditation", image: "/images/certifications/nabl.avif", category: "national" },
  { name: "IS 8183", sub: "BIS Standard", image: "/images/certifications/is-8183.avif", category: "national" },
  { name: "IS 1470", sub: "BIS Mineral Wool", image: "/images/certifications/is-1470.avif", category: "national" },
  { name: "Export House", sub: "Three Star Status", image: "/images/certifications/export-house.avif", category: "other" },
  { name: "Great Place to Work", sub: "Certified 2025", image: "/images/certifications/gptw.png", category: "other" },
];

function Accreditations() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 md:px-12 md:py-36 xl:px-20">
      {/* Soft gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[140px]"
          style={{ background: "rgba(255,102,0,0.04)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[300px] w-[400px] translate-y-1/3 rounded-full blur-[100px]"
          style={{ background: "rgba(45,184,110,0.03)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="text-center">
          <SectionHeader
            eyebrow="Accreditations"
            title="Trusted & Certified"
            subtitle="Internationally recognized standards backing every product we manufacture."
            align="center"
          />
        </div>

        {/* ISO row — featured large cards */}
        <motion.div
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CERTIFICATIONS.filter((c) => c.category === "iso").map((cert) => (
            <motion.div key={cert.name} variants={scaleIn}>
              <TiltCard className="h-full">
                <div className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:border-rhino-orange/25 hover:shadow-[0_16px_48px_-12px_rgba(255,102,0,0.12)] hover:-translate-y-1.5">
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,102,0,0.04), transparent 70%)" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="relative h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110 md:h-24"
                  />
                  <div className="relative text-center">
                    <span className="block text-sm font-bold text-[#111]">{cert.name}</span>
                    <span className="block text-xs font-medium text-[#666]">{cert.sub}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-10 flex max-w-sm items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ccc]">National &amp; Industry</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* National + Other certifications */}
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CERTIFICATIONS.filter((c) => c.category !== "iso").map((cert) => (
            <motion.div key={cert.name} variants={scaleIn}>
              <TiltCard className="h-full">
                <div className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 transition-all duration-500 hover:border-gray-200 hover:bg-white hover:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="relative h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110 md:h-16"
                  />
                  <div className="relative text-center">
                    <span className="block text-xs font-bold text-[#333]">{cert.name}</span>
                    <span className="block text-xs text-[#777]">{cert.sub}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA Section — Immersive gradient with 3D depth                             */
/* -------------------------------------------------------------------------- */

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#111] px-6 py-24 md:px-12 md:py-32 xl:px-20">
      {/* Animated bg elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--color-rhino-orange)" }}
        />
        <div
          className="absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
          style={{ background: "#2DB86E" }}
        />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-[1440px] flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange">
          Get Started
        </p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Ready to Specify Rhino?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base text-white/50 md:text-lg">
          Talk to our technical team for project-specific recommendations,
          thermal calculations, and sample arrangements.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-rhino-orange to-[#FF8800] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-rhino-orange/25 transition-all duration-300 hover:shadow-2xl hover:shadow-rhino-orange/40 hover:scale-[1.03] active:scale-[0.98] md:px-10 md:text-base"
          >
            <span className="relative z-10">Contact Technical Team</span>
            <span className="relative z-10 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/5 md:px-10 md:text-base"
          >
            Download TDS
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs font-medium uppercase tracking-[0.15em] text-white/50">
          <span>ISO 9001</span>
          <span className="text-white/10">|</span>
          <span>ISO 14001</span>
          <span className="text-white/10">|</span>
          <span>ISO 45001</span>
          <span className="text-white/10">|</span>
          <span>ISO 50001</span>
          <span className="text-white/10">|</span>
          <span>BIS Certified</span>
        </div>
      </motion.div>
    </section>
  );
}
