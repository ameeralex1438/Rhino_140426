"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Flame,
  Wind,
  Zap,
  Sun,
  TreePine,
  Droplets,
  Factory,
  TrendingDown,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: Factory,
    title: "Zero Fossil Fuels",
    description: "Our electric smelter runs without coke or coal. No fossil fuels at any stage of manufacturing. Powered by solar energy and captive power generation for truly clean production.",
    stat: 100,
    statSuffix: "%",
    statLabel: "Electric Manufacturing",
  },
  {
    icon: Wind,
    title: "Zero Harmful Emissions",
    description: "Zero SO\u2082 and NOx emissions. Clean air in, clean air out.",
    stat: 0,
    statSuffix: "",
    statLabel: "SO\u2082 / NOx Released",
    statDisplay: "Zero",
  },
  {
    icon: TrendingDown,
    title: "65% Less CO\u2082",
    description: "Our Eco-Green variant achieves up to 65% reduction in embedded carbon dioxide.",
    stat: 65,
    statSuffix: "%",
    statLabel: "Carbon Reduction",
  },
  {
    icon: Zap,
    title: "50% Energy Savings",
    description: "Buildings insulated with Rhino can achieve 45-50% annual reduction in energy consumption.",
    stat: 50,
    statSuffix: "%",
    statLabel: "Annual Energy Savings",
  },
  {
    icon: Sun,
    title: "Solar Powered Production",
    description: "Our manufacturing facility is powered by solar energy and an 80 MW captive power plant. From raw material to finished insulation, every step runs on clean, renewable energy.",
    stat: 80,
    statSuffix: " MW",
    statLabel: "Captive Clean Power",
  },
];

const variants = [
  { name: "Rhino Elite", percentage: 25, color: "#FF6600", status: "Available Now" },
  { name: "Rhino Enduro", percentage: 45, color: "#4A4A4A", status: "Available Now" },
  { name: "Rhino Eco-Green", percentage: 65, color: "#2DB86E", status: "Available Now" },
];

const greenFeatures = [
  { icon: TreePine, title: "Green Building Credits", description: "Helps achieve IGBC, LEED, and GRIHA green building ratings." },
  { icon: Droplets, title: "Water Repellent", description: "Less than 0.5 kg/m\u00B2 water absorption. Maintains performance in humid conditions." },
  { icon: Flame, title: "Non-Combustible", description: "Euro Class A1 fire rating. Withstands temperatures exceeding 1000\u00B0C." },
  { icon: Leaf, title: "Inert & Non-Toxic", description: "IARC Group 3. Asbestos-free, rot-free, mold-resistant." },
];

export function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-32 md:px-12 md:pt-40 xl:px-20">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full blur-[140px]" style={{ background: "rgba(45,184,110,0.05)" }} />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <BlurFade delay={0} inView>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#2DB86E] md:w-12" />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#2DB86E]">
                  Sustainability
                </span>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h1 className="mb-6 max-w-xl font-display text-4xl font-bold leading-[1.05] text-[#111] sm:text-5xl md:text-6xl lg:text-7xl">
                Building the Future{" "}
                <span style={{ background: "linear-gradient(90deg, #2DB86E, #1B9B5A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Without Burning It
                </span>
              </h1>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="max-w-lg text-base leading-relaxed text-[#666] md:text-lg">
                India&apos;s greenest rock mineral wool. Solar powered. Zero fossil fuels in smelting. Zero SO&#x2082;. Zero NOx. Up to 65% lower embedded carbon.
              </p>
            </BlurFade>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="overflow-hidden rounded-3xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/process/green-path.jpg" alt="Green path at Rhino facility" className="h-72 w-full object-cover md:h-96" />
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Strip */}
      <section className="bg-[#111] px-6 py-16 md:px-12 md:py-20 xl:px-20">
        <motion.div
          className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {[
            { value: 0, suffix: "%", label: "Fossil Fuels", display: "0%" },
            { value: 65, suffix: "%", label: "Less Carbon", display: null },
            { value: 0, suffix: "", label: "SO\u2082 / NOx", display: "Zero" },
            { value: 7, suffix: "yr", label: "R&D Investment", display: null },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className="text-center"
            >
              <span className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {s.display ? (
                  <span>{s.display}</span>
                ) : (
                  <NumberTicker value={s.value} className="!text-white" />
                )}
                {!s.display && <span className="text-[#2DB86E]">{s.suffix}</span>}
              </span>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Four Pillars */}
      <section className="bg-[#FAFAF8] px-6 py-28 md:px-12 md:py-36 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#2DB86E]">
              Our Commitment
            </span>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="mb-16 font-display text-4xl font-bold text-[#111] md:text-5xl">
              Five Pillars of Sustainability
            </h2>
          </BlurFade>

          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-500 hover:border-[#2DB86E]/20 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2DB86E]/10">
                    <p.icon className="h-5 w-5 text-[#2DB86E]" strokeWidth={1.8} />
                  </div>
                  <span className="font-display text-3xl font-bold text-[#111] md:text-4xl">
                    {(p as Record<string, unknown>).statDisplay ? (
                      <span>{String((p as Record<string, unknown>).statDisplay)}</span>
                    ) : (
                      <><NumberTicker value={p.stat} className="!text-inherit" /><span className="text-[#2DB86E]">{p.statSuffix}</span></>
                    )}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#111] md:text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555]">{p.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#888]">{p.statLabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Variants */}
      <section className="bg-white px-6 py-28 md:px-12 md:py-36 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
              Carbon Reduction
            </span>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="mb-16 font-display text-4xl font-bold text-[#111] md:text-5xl">
              Three Levels of Impact
            </h2>
          </BlurFade>

          <div className="grid gap-6 md:grid-cols-3">
            {variants.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                className="rounded-3xl border border-gray-100 bg-[#FAFAF8] p-8 transition-all duration-500 hover:shadow-lg"
              >
                <h3 className="font-display text-xl font-bold text-[#111]">{v.name}</h3>
                <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${v.color}10`, color: v.color }}>
                  {v.status}
                </span>
                <div className="mt-6">
                  <span className="font-display text-5xl font-bold" style={{ color: v.color }}>
                    <NumberTicker value={v.percentage} delay={0.3 + i * 0.15} className="!text-inherit" />
                    <span className="text-3xl">%</span>
                  </span>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#666]">Less CO&#x2082; vs. Cupola</p>
                </div>
                <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${v.color}, ${v.color}88)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Green Features */}
      <section className="bg-[#FAFAF8] px-6 py-28 md:px-12 md:py-36 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#2DB86E]">
              Product Benefits
            </span>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="mb-16 font-display text-4xl font-bold text-[#111] md:text-5xl">
              Green by Design
            </h2>
          </BlurFade>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {greenFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-[#2DB86E]/20 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2DB86E]/10">
                  <f.icon className="h-5 w-5 text-[#2DB86E]" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-[#111]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#555]">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
