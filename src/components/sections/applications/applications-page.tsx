"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Building2,
  Home,
  Wind,
  Flame,
  Ship,
  Check,
  ArrowRight,
  Thermometer,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const ease = [0.16, 1, 0.3, 1] as const;

interface Sector {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  highlight: string;
  applications: string[];
  products: string[];
  color: string;
  image: string;
}

const sectors: Sector[] = [
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    description: "High-temperature environments demanding extreme durability and thermal stability.",
    highlight: "Up to 750\u00B0C",
    applications: [
      "Boilers, furnaces & electrostatic precipitators",
      "Refineries & petrochemical plants",
      "Process vessels & storage tanks",
      "Power generation facilities",
      "Acoustic machinery enclosures",
      "Cryogenic tanks & oxygen plants",
    ],
    products: ["RWM", "RSL", "RLW", "RRA"],
    color: "#FF6600",
    image: "/images/applications/industrial.jpg",
  },
  {
    id: "commercial",
    name: "Commercial",
    icon: Building2,
    description: "Energy efficiency and fire safety for offices, malls, hospitals, hotels, and data centers.",
    highlight: "ECBC Compliant",
    applications: [
      "External wall insulation (EIFS/ETICS)",
      "Curtain wall & fa\u00E7ade systems",
      "Ceiling & floor insulation",
      "Fire barrier assemblies",
      "Sandwich panels & partitions",
      "Data center thermal management",
    ],
    products: ["RSL", "RRA", "RBR"],
    color: "#FF8800",
    image: "/images/applications/commercial.jpg",
  },
  {
    id: "residential",
    name: "Residential",
    icon: Home,
    description: "Comfort, safety, and energy savings for homes, apartments, and villas.",
    highlight: "50% Energy Savings",
    applications: [
      "Pitched & flat roof insulation",
      "Internal wall partitions",
      "Floor & ceiling thermal control",
      "Prefab cabin insulation",
      "Cavity wall filling",
      "Acoustic privacy between rooms",
    ],
    products: ["RSL", "RBR", "RLW"],
    color: "#2DB86E",
    image: "/images/applications/residential.jpg",
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: Wind,
    description: "Duct insulation, acoustic control, and thermal management for HVAC systems.",
    highlight: "NRC \u2265 0.90",
    applications: [
      "Supply & return duct lining",
      "Smoke extraction systems",
      "Industrial ventilation",
      "AHU and chiller insulation",
      "Pipe lagging",
      "Acoustic silencers",
    ],
    products: ["RBR", "RWM", "RSL"],
    color: "#FF6600",
    image: "/images/applications/hvac.jpg",
  },
  {
    id: "fire-safety",
    name: "Fire Safety",
    icon: Flame,
    description: "Non-combustible insulation for fire barriers, compartmentation, and passive fire protection.",
    highlight: "Euro Class A1",
    applications: [
      "Fire stop & compartmentation zones",
      "Cavity barriers between floors",
      "Spandrel panel backing",
      "Fire-rated wall assemblies",
      "Expansion joint fire stops",
      "Structural fire protection",
    ],
    products: ["RRA", "RSL", "RLW"],
    color: "#FF8800",
    image: "/images/applications/fire-safety.jpg",
  },
  {
    id: "marine",
    name: "Marine",
    icon: Ship,
    description: "Specialized insulation for ships, offshore platforms, and marine environments.",
    highlight: "IMO Certified",
    applications: [
      "Ship engine room insulation",
      "Bulkhead & deck insulation",
      "Offshore platform thermal protection",
      "Marine exhaust systems",
      "Cold storage on vessels",
      "Acoustic treatment",
    ],
    products: ["RWM", "RSL", "RLW"],
    color: "#2DB86E",
    image: "/images/applications/marine.jpg",
  },
];

const productNames: Record<string, string> = {
  RSL: "Rhino Slabs",
  RWM: "Rhino Wired Matts",
  RBR: "Rhino Building Rolls",
  RRA: "Rhino RockArmor",
  RLW: "Rhino Loose Wool",
};

const productSlugs: Record<string, string> = {
  RSL: "rhino-slabs",
  RWM: "rhino-wired-matts",
  RBR: "rhino-building-rolls",
  RRA: "rhino-rockarmor",
  RLW: "rhino-loose-wool",
};

export function ApplicationsPage() {
  const detailRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToDetail = (id: string) => {
    const el = detailRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white px-6 pb-10 pt-32 md:px-12 md:pb-12 md:pt-40 xl:px-20">
        <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/4 -translate-y-1/4 rounded-full blur-[140px]" style={{ background: "rgba(255,102,0,0.04)" }} />

        <div className="relative mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-2">
          <div>
            <BlurFade delay={0} inView>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-rhino-orange md:w-12" />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">Applications</span>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h1 className="mb-6 font-display text-4xl font-bold text-[#111] sm:text-5xl md:text-6xl lg:text-7xl">
                Insulation for
                <br />
                <span className="text-rhino-orange">Every Sector</span>
              </h1>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="max-w-xl text-base leading-relaxed text-[#666] md:text-lg">
                From refineries operating at extreme temperatures to residential homes seeking comfort — Rhino has the right product for every application.
              </p>
            </BlurFade>
          </div>

          {/* Quick stats */}
          <BlurFade delay={0.3} inView>
            <div className="flex flex-wrap gap-6 lg:justify-end">
              {[
                { icon: Thermometer, value: "750\u00B0C", label: "Max Service Temp" },
                { icon: Shield, value: "A1", label: "Fire Rating" },
                { icon: Factory, value: "6", label: "Sectors Covered" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rhino-orange/10">
                    <s.icon className="h-4 w-4 text-rhino-orange" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="font-display text-xl font-bold text-[#111]">{s.value}</span>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#666]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── SECTOR CARDS GRID ── */}
      <section className="bg-[#FAFAF8] px-6 py-16 md:px-12 md:py-20 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">Sectors We Serve</span>
              <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl">Choose Your Sector</h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  onClick={() => scrollToDetail(s.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                >
                  {/* Background image */}
                  <Image
                    src={s.image}
                    alt={`${s.name} sector applications`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/50" />

                  {/* Color accent top */}
                  <div className="absolute left-0 right-0 top-0 h-1 z-10" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}60)` }} />

                  <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-7 md:p-8">
                    {/* Icon + Highlight badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center justify-center rounded-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: `${s.color}30`, width: 52, height: 52 }}
                      >
                        <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <span
                        className="rounded-full px-3 py-1 font-mono text-xs font-bold tracking-wider backdrop-blur-sm"
                        style={{ backgroundColor: `${s.color}30`, color: "#fff" }}
                      >
                        {s.highlight}
                      </span>
                    </div>

                    <div>
                      <h3 className="mb-2 font-display text-2xl font-bold text-white">{s.name}</h3>
                      <p className="mb-5 text-sm leading-relaxed text-white/75">{s.description}</p>

                      {/* Product codes */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {s.products.map((code) => (
                          <span key={code} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-medium text-white/80 backdrop-blur-sm">
                            {code}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
                        View applications <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAIL SECTIONS ── */}
      {sectors.map((sector, idx) => {
        const Icon = sector.icon;
        const isEven = idx % 2 === 0;

        return (
          <section
            key={sector.id}
            ref={(el) => { detailRefs.current[sector.id] = el; }}
            className="scroll-mt-20 px-6 py-28 md:px-12 md:py-36 xl:px-20"
            style={{ backgroundColor: isEven ? "#FFFFFF" : "#FAFAF8" }}
          >
            <div className="mx-auto max-w-[1440px]">
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
                className="relative mb-14 h-[300px] overflow-hidden rounded-2xl md:h-[400px]"
              >
                <Image
                  src={sector.image}
                  alt={`${sector.name} sector — ${sector.description}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm"
                      style={{ backgroundColor: `${sector.color}30` }}
                    >
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-white/70">
                        {sector.name} Sector
                      </p>
                      <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                        {sector.name} Applications
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                    {sector.description}
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
                {/* Applications — 3 cols */}
                <div className="lg:col-span-3">
                  <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#888]">Key Applications</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {sector.applications.map((app, i) => (
                      <motion.div
                        key={app}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:shadow-md"
                      >
                        <div
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${sector.color}12` }}
                        >
                          <Check className="h-3.5 w-3.5" style={{ color: sector.color }} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm leading-relaxed text-[#555]">{app}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recommended Products — 2 cols */}
                <div className="lg:col-span-2">
                  <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#888]">Recommended Products</h3>
                  <div className="space-y-3">
                    {sector.products.map((code, i) => (
                      <motion.div
                        key={code}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                      >
                        <Link
                          href={`/products/${productSlugs[code]}`}
                          className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
                        >
                          {/* Code badge */}
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${sector.color}, ${sector.color}CC)` }}
                          >
                            {code}
                          </div>
                          <div className="flex-1">
                            <p className="font-display text-base font-bold text-[#111]">{productNames[code]}</p>
                            <p className="text-xs text-[#666]">View specifications &rarr;</p>
                          </div>
                          <ArrowRight
                            className="h-5 w-5 shrink-0 text-[#ddd] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#555]"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
