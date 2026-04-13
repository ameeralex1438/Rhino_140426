"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Zap, Thermometer, Layers, Recycle, MapPin, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import Counter from "@/components/ui/counter";

const ease = [0.16, 1, 0.3, 1] as const;

interface FeatureCard {
  icon: LucideIcon;
  heading: string;
  value?: string;
  description: string;
  color: string;
}

const features: FeatureCard[] = [
  {
    icon: Zap,
    heading: "Electric Smelter",
    value: "India\u2019s 1st",
    description: "Zero fossil fuel rock mineral wool manufacturing",
    color: "#FF6600",
  },
  {
    icon: Thermometer,
    heading: "Melting Point",
    value: "1800\u00B0C",
    description: "Volcanic rock transformed into ultra-fine fibers",
    color: "#FF8800",
  },
  {
    icon: Layers,
    heading: "Fiber Fineness",
    value: "<7\u00B5m",
    description: "Ultra-fine fibers for superior thermal performance",
    color: "#FF6600",
  },
  {
    icon: Recycle,
    heading: "Waste Recycling",
    value: "100%",
    description: "Complete circular economy manufacturing",
    color: "#2DB86E",
  },
];

const PARTNERS = ["Tenova Pyromet", "Siemens", "SGL Carbon", "ABB"];

/* 3D tilt helper */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
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
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className} style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

export function Manufacturing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section className="relative overflow-hidden bg-white py-28 md:py-36">
      <div ref={sectionRef}>
        {/* Two-column hero layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Parallax image stack */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, borderRadius: "2rem" }}
              animate={imageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease }}
              className="overflow-hidden rounded-3xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/process/solar-factory.jpg"
                alt="Solar-powered Rhino factory"
                className="h-72 w-full object-cover md:h-96"
              />
            </motion.div>

            {/* Overlapping smaller image */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={imageInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:-right-10 md:w-56"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/process/furnace-glow.jpg"
                alt="Electric furnace glow"
                className="h-32 w-full object-cover md:h-40"
              />
            </motion.div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="absolute -left-3 top-6 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl md:-left-8"
            >
              <p className="font-display text-2xl font-bold text-rhino-orange md:text-3xl">281</p>
              <p className="text-xs font-medium text-[#555]">Acres of Innovation</p>
            </motion.div>
          </motion.div>

          {/* Right: Text content */}
          <div>
            <Reveal>
              <span className="mb-3 block font-mono text-xs font-medium tracking-[0.3em] text-rhino-orange uppercase">
                Manufacturing
              </span>
              <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
                State-of-the-Art
                <br />
                Facility
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[#666] md:text-lg">
                Our 281-acre facility in Vizianagaram, Andhra Pradesh houses
                India&apos;s first and largest electric smelter for rock mineral wool.
              </p>
            </Reveal>

            {/* Technology partners */}
            <Reveal delay={0.2}>
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#888]">Technology Partners</p>
                <div className="flex flex-wrap gap-2">
                  {PARTNERS.map((p) => (
                    <span key={p} className="rounded-full border border-gray-200 bg-[#FAFAF8] px-4 py-1.5 text-xs font-medium text-[#555]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Feature cards grid */}
        <motion.div
          className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {features.map((f) => (
            <motion.div
              key={f.heading}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <TiltCard className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-[#FAFAF8] p-6 transition-all duration-500 hover:border-gray-200 hover:bg-white hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] md:p-7">
                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${f.color}10` }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} strokeWidth={1.8} />
                  </div>

                  {/* Value */}
                  {f.value && (
                    <span className="mb-1 font-display text-2xl font-bold text-[#111] md:text-3xl">
                      {f.value}
                    </span>
                  )}

                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#666]">
                    {f.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555]">
                    {f.description}
                  </p>

                  {/* Watermark icon */}
                  <f.icon
                    className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
                    style={{ color: f.color }}
                    strokeWidth={0.7}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Location bar */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#FAFAF8] p-6 transition-all duration-300 hover:shadow-md md:items-center md:p-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rhino-orange/10">
              <MapPin className="h-5 w-5 text-rhino-orange" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#111]">
                APIIC Industrial Park, Vizianagaram, Andhra Pradesh
              </p>
              <p className="mt-1 text-sm text-[#555]">
                Strategically located near Visakhapatnam &amp; Gangavaram Ports
                for efficient domestic and international distribution.
              </p>
            </div>
            <ArrowRight className="hidden h-5 w-5 shrink-0 text-[#ccc] md:block" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default Manufacturing;
