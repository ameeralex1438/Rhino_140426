"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ---------- stage data ---------- */
const stages = [
  {
    num: "01",
    label: "SOURCE",
    heading: "Raw Volcanic Rock",
    description:
      "Sourced from sustainable basalt mines across India and the world — ancient rock born from the earth's deepest furnaces, transformed into tomorrow's insulation.",
    statValue: "1600°C",
    statLabel: "Melting Point",
    image: "/images/process/plant-full.jpg",
    imageAlt: "Rhino Insulation manufacturing plant with raw volcanic rock stockpile",
    imageW: 560,
    imageH: 374,
  },
  {
    num: "02",
    label: "SMELT",
    heading: "Electric Smelting",
    description:
      "India's first and largest electric smelter — zero coke, zero coal, zero emissions. Powered by solar energy and an 80 MW captive power plant. The only rock mineral wool in India manufactured entirely without fossil fuels.",
    statValue: "ZERO",
    statLabel: "Fossil Fuels",
    image: "/images/process/smelting-real-3.jpg",
    imageAlt: "Molten volcanic rock flowing through the electric smelting conveyor",
    imageW: 560,
    imageH: 374,
  },
  {
    num: "03",
    label: "SPIN",
    heading: "Ultra-Fine Fibers",
    description:
      "Spun into fibers under 7 microns — finer than a human hair — through precision centrifuge technology monitored from our state-of-the-art control room.",
    statValue: "<7μm",
    statLabel: "Fiber Diameter",
    image: "/images/process/control-room.jpg",
    imageAlt: "Advanced digital control room monitoring the fiber spinning process",
    imageW: 560,
    imageH: 374,
  },
  {
    num: "04",
    label: "FORM",
    heading: "Sustainable Insulation",
    description:
      "Slabs, matts, rolls, and boards — delivering up to 65% less CO₂ than conventional insulation products, manufactured under solar-powered factory operations.",
    statValue: "65%",
    statLabel: "Less Carbon",
    image: "/images/process/solar-factory.jpg",
    imageAlt: "Solar-powered Rhino Insulation factory producing sustainable insulation",
    imageW: 560,
    imageH: 374,
  },
] as const;

/* ---------- animation helpers ---------- */
const EASE = [0.25, 0.1, 0.25, 1] as const;
const EASE_OUT = [0, 0, 0.2, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [...EASE_OUT] },
  },
} as const;

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [...EASE] },
  },
} as const;

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [...EASE] },
  },
} as const;

/* ---------- component ---------- */
export function TechnologyStory() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0C0F0A" }}
    >
      {/* ---- section header ---- */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 text-center md:pt-36 md:pb-20 lg:px-8">
        <motion.p
          className="text-xs tracking-[0.5em] text-rhino-orange"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [...EASE_OUT] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          THE TRANSFORMATION
        </motion.p>

        <motion.h2
          className="mt-4 font-display text-4xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [...EASE_OUT] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          From Rock to Revolution
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [...EASE_OUT] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Four stages turn ancient volcanic rock into the world&apos;s most
          sustainable insulation — without a single fossil fuel.
        </motion.p>
      </div>

      {/* ---- stages ---- */}
      <div className="relative mx-auto max-w-7xl px-6 pb-32 lg:px-8">
        {/* vertical connecting line */}
        <div
          className="absolute left-10 top-0 bottom-32 hidden w-px lg:block"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        />

        {stages.map((stage, i) => {
          const isEven = i % 2 === 0; // even = image LEFT, odd = image RIGHT
          const imageVariant = isEven ? slideFromLeft : slideFromRight;
          const textVariant = fadeUp;

          return (
            <div
              key={stage.label}
              className="relative mb-24 last:mb-0 lg:mb-32"
            >
              {/* timeline dot on the vertical line */}
              <motion.div
                className="absolute left-[34px] hidden h-3 w-3 rounded-full bg-rhino-orange lg:block"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [...EASE_OUT] }}
                viewport={{ once: true, margin: "-100px" }}
              />

              {/* two-column layout */}
              <div
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* ---- image column ---- */}
                <motion.div
                  className="w-full flex-shrink-0 lg:w-1/2"
                  variants={imageVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="group relative mx-auto max-w-[560px] overflow-hidden rounded-2xl">
                    {/* warm amber glow on hover */}
                    <div
                      className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(255,107,0,0.15) 0%, transparent 70%)",
                      }}
                    />
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      width={stage.imageW}
                      height={stage.imageH}
                      className="relative w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 560px"
                      priority={i < 2}
                    />
                  </div>
                </motion.div>

                {/* ---- text column ---- */}
                <motion.div
                  className="relative w-full lg:w-1/2"
                  variants={textVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* big watermark number */}
                  <span className="pointer-events-none absolute -top-6 left-0 select-none font-display text-8xl font-black leading-none text-white/10 lg:-top-8 lg:text-9xl">
                    {stage.num}
                  </span>

                  {/* label */}
                  <p className="relative mb-3 text-xs font-semibold tracking-[0.5em] text-rhino-orange">
                    {stage.label}
                  </p>

                  {/* heading */}
                  <h3 className="relative mb-4 font-display text-3xl font-bold text-white lg:text-4xl">
                    {stage.heading}
                  </h3>

                  {/* description */}
                  <p className="relative mb-8 max-w-md text-base leading-relaxed text-white/60">
                    {stage.description}
                  </p>

                  {/* stat */}
                  <div className="relative flex items-baseline gap-3">
                    <span className="font-display text-3xl font-black text-rhino-orange lg:text-4xl">
                      {stage.statValue}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                      {stage.statLabel}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- bottom gradient transition to cream ---- */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-48 w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0C0F0A 40%, #FAFBF7 100%)",
        }}
      />
    </section>
  );
}
