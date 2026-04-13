"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Globe,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  leaders,
  sardaGroupStats,
  sardaTimeline,
  sardaVerticals,
  technologyPartners,
  globalOffices,
  certificationsDetailed,
  type Leader,
  type Certification,
} from "@/data/company";

const FloatingParticlesBackground = dynamic(
  () =>
    import("@/components/ui/floating-particles").then(
      (m) => m.FloatingParticlesBackground,
    ),
  { ssr: false },
);

const FloatingOrbsBackground = dynamic(
  () =>
    import("@/components/ui/floating-orbs-bg").then(
      (m) => m.FloatingOrbsBackground,
    ),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;

/* ========================================================================== */
/*  TiltCard helper                                                            */
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
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01,1.01,1.01)`;
  };
  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

/* ========================================================================== */
/*  Collapsible education block                                                */
/* ========================================================================== */

function EducationBlock({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#666] transition-colors hover:text-rhino-orange"
      >
        <GraduationCap className="h-3.5 w-3.5" />
        Education
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        className="overflow-hidden"
      >
        <ul className="mt-2 space-y-1 pl-5 text-xs text-[#777]">
          {items.map((ed) => (
            <li key={ed} className="list-disc">
              {ed}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ========================================================================== */
/*  1. NEERAJ SARDA SPOTLIGHT                                                  */
/* ========================================================================== */

function SpotlightHero({ leader, subtitle }: { leader: Leader; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#111]">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(255,102,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid items-center gap-0 lg:grid-cols-2">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
          className="relative h-[400px] overflow-hidden rounded-t-[2rem] lg:h-[500px] lg:rounded-l-[2rem] lg:rounded-tr-none"
        >
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111]/80 max-lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent lg:hidden" />
        </motion.div>

        {/* Content */}
        <div className="relative px-8 py-10 lg:px-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <span className="mb-3 inline-block font-mono text-xs font-semibold tracking-[0.3em] uppercase text-rhino-orange">
              {subtitle ?? "The Visionary"}
            </span>
            <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
              {leader.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-white/50">
              {leader.title}, {leader.company}
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-6 border-l-2 border-rhino-orange/40 pl-5 text-lg italic leading-relaxed text-white/80 md:text-xl"
          >
            &ldquo;{leader.quote}&rdquo;
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="mt-6 text-sm leading-[1.85] text-white/60"
          >
            {leader.bio}
          </motion.p>

          {leader.roles && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: 0.65 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {leader.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
                >
                  {role}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  2. LEADER CARD (for grid)                                                  */
/* ========================================================================== */

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  return (
    <BlurFade delay={0.1 + index * 0.15} inView>
      <TiltCard className="h-full">
        <div className="card-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
          {/* Photo */}
          <div className="relative h-80 w-full overflow-hidden md:h-96">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-display text-xl font-bold text-white">
                {leader.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-white/60">
                {leader.title}
              </p>
              <p className="text-xs text-white/40">{leader.company}</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-rhino-orange to-rhino-orange/30" />

            <p className="text-sm leading-[1.85] text-[#555]">{leader.bio}</p>

            <blockquote className="mt-4 text-sm italic leading-relaxed text-[#555]">
              &ldquo;{leader.quote}&rdquo;
            </blockquote>

            <EducationBlock items={leader.education} />
          </div>
        </div>
      </TiltCard>
    </BlurFade>
  );
}

/* ========================================================================== */
/*  MAIN LEADERSHIP EXPORT                                                     */
/* ========================================================================== */

export function Leadership() {
  const subtitles: Record<string, string> = {
    "kamal-kishore": "The Founder",
    "neeraj": "The Visionary",
  };

  return (
    <Section className="relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36">
      <FloatingOrbsBackground />

      {/* Section header */}
      <Reveal>
        <div className="relative z-10 mb-16 md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium tracking-[0.3em] text-rhino-orange uppercase">
            Leadership
          </span>
          <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            Driven by Vision
          </h2>
          <p className="mt-4 max-w-lg text-base text-[#555]">
            Guided by leadership that blends industrial expertise with
            sustainable innovation.
          </p>
        </div>
      </Reveal>

      {/* Leadership — same design for all */}
      <div className="relative z-10 space-y-12">
        {leaders.map((leader) => (
          <SpotlightHero
            key={leader.id}
            leader={leader}
            subtitle={subtitles[leader.id]}
          />
        ))}
      </div>
    </Section>
  );
}

/* ========================================================================== */
/*  3. SARDA GROUP CREDIBILITY                                                 */
/* ========================================================================== */

function parseStatValue(val: string): number {
  return parseInt(val.replace(/,/g, ""), 10);
}

export function SardaGroupCredibility() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36">
      <FloatingParticlesBackground light />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {/* Header */}
        <Reveal>
          <div className="mb-16 text-center md:mb-20">
            <span className="mb-3 inline-block font-mono text-xs font-semibold tracking-[0.3em] uppercase text-rhino-orange">
              Backed by the Sarda Group
            </span>
            <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
              90 Years of Industrial Excellence
            </h2>
          </div>
        </Reveal>

        {/* Stats strip */}
        <div ref={statsRef}>
          <motion.div
            className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {sardaGroupStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease },
                  },
                }}
                className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm"
              >
                <div className="font-display text-2xl font-bold text-[#111] md:text-3xl">
                  {stat.prefix ?? ""}
                  <NumberTicker
                    value={parseStatValue(stat.value)}
                    className="!text-inherit"
                  />
                  {stat.suffix ?? ""}
                </div>
                <p className="mt-1 text-xs font-medium text-[#666]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Business Verticals */}
        <Reveal>
          <div className="mb-20">
            <h3 className="mb-6 text-center font-mono text-xs font-semibold tracking-[0.3em] uppercase text-[#777]">
              Business Verticals
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {sardaVerticals.map((v, i) => (
                <BlurFade key={v.name} delay={i * 0.06} inView>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                    <v.icon className="h-4 w-4 text-rhino-orange" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-[#555]">
                      {v.name}
                    </span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Technology Partners - marquee */}
        <Reveal>
          <div className="mb-20">
            <h3 className="mb-6 text-center font-mono text-xs font-semibold tracking-[0.3em] uppercase text-[#777]">
              Technology Partners
            </h3>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#FAFAF8] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#FAFAF8] to-transparent" />
              <div className="flex animate-marquee gap-12 whitespace-nowrap py-4">
                {[...technologyPartners, ...technologyPartners].map(
                  (partner, i) => (
                    <span
                      key={`${partner}-${i}`}
                      className="text-lg font-semibold text-[#888] transition-colors hover:text-[#666]"
                    >
                      {partner}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Global Offices */}
        <Reveal>
          <div className="mb-16">
            <h3 className="mb-6 text-center font-mono text-xs font-semibold tracking-[0.3em] uppercase text-[#777]">
              Global Offices
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {globalOffices.map((office) => (
                <div
                  key={office.city}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-rhino-orange" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#555]">
                    {office.city}
                  </span>
                  <span className="text-xs text-[#555]">{office.country}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Stock badge */}
        <Reveal>
          <div className="flex justify-center">
            <a
              href="https://www.google.com/finance/quote/SARDAEN:NSE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm transition-all duration-300 hover:border-rhino-orange/30 hover:shadow-md"
            >
              <Globe className="h-4 w-4 text-rhino-orange" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[#555]">
                BSE 504614 / NSE SARDAEN
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-[#888] transition-colors group-hover:text-rhino-orange" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  4. CERTIFICATIONS DEEP DIVE                                                */
/* ========================================================================== */

const categoryLabels: Record<Certification["category"], string> = {
  quality: "Quality Management",
  environment: "Environmental",
  safety: "Health & Safety",
  energy: "Energy Management",
  lab: "Laboratory Accreditation",
  standard: "Indian Standards",
  trade: "Trade & Export",
  workplace: "Workplace Culture",
};

const categoryOrder: Certification["category"][] = [
  "quality",
  "environment",
  "safety",
  "energy",
  "lab",
  "standard",
  "trade",
  "workplace",
];

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <BlurFade delay={0.05 + index * 0.08} inView>
      <TiltCard className="h-full">
        <div className="card-shine group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)]">
          {/* Top bar */}
          <div className="flex items-start gap-4 p-5 pb-0">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain p-1.5"
                sizes="56px"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-display text-base font-bold text-[#111]">
                {cert.name}
              </h4>
              <p className="text-xs text-[#666]">{cert.issuingBody}</p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5 pt-3">
            <p className="text-sm font-medium text-[#444]">{cert.fullName}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#777]">
              {cert.description}
            </p>

            {/* Expandable relevance */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 flex items-center gap-1 text-xs font-semibold text-rhino-orange transition-colors hover:text-rhino-orange/70"
            >
              Why it matters for specifiers
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: expanded ? "auto" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <p className="mt-2 rounded-lg bg-rhino-orange/5 p-3 text-xs leading-relaxed text-[#555]">
                {cert.relevance}
              </p>
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </BlurFade>
  );
}

export function CertificationsDeepDive() {
  // Group certs by category
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      certs: certificationsDetailed.filter((c) => c.category === cat),
    }))
    .filter((g) => g.certs.length > 0);

  let globalIndex = 0;

  return (
    <Section className="relative overflow-hidden bg-white py-28 md:py-36">
      <FloatingOrbsBackground />

      <Reveal>
        <div className="relative z-10 mb-16 md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium tracking-[0.3em] text-rhino-orange uppercase">
            Certifications & Standards
          </span>
          <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            Verified Excellence
          </h2>
          <p className="mt-4 max-w-lg text-base text-[#555]">
            Every claim backed by internationally recognized certifications and
            India&apos;s first NaBL-accredited insulation testing laboratory.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {grouped.flatMap((group) =>
            group.certs.map((cert) => {
              const idx = globalIndex++;
              return <CertCard key={cert.name} cert={cert} index={idx} />;
            })
          )}
        </div>
      </div>
    </Section>
  );
}

export default Leadership;
