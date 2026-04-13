"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";

interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    year: "1930s",
    title: "The Beginning",
    description: "Founded as a steel trading company in Rajnandgaon, Chhattisgarh \u2014 laying the foundation for nearly a century of industrial excellence.",
    highlight: true,
  },
  {
    year: "1973",
    title: "Incorporation",
    description: "Sarda Energy & Minerals Ltd. incorporated, marking the group\u2019s formal entry into large-scale industrial operations.",
    highlight: true,
  },
  {
    year: "2013",
    title: "Greenfield Facility",
    description: "Sarda Metals & Alloys established with a 281-acre greenfield facility in Vizianagaram, Andhra Pradesh.",
    highlight: true,
  },
  {
    year: "2018",
    title: "R&D Breakthrough",
    description: "Research & development begins on electric rock mineral wool technology with global partners including Tenova Pyromet and Siemens.",
    highlight: true,
  },
  {
    year: "2025",
    title: "India\u2019s First & RHINO Launched",
    description: "India\u2019s first electric smelter for rock mineral wool commissioned \u2014 zero fossil fuels, zero SO\u2082, zero NO\u2093. RHINO launched at IGBC Green Building Congress, Mumbai \u2014 India\u2019s greenest rock mineral wool brand.",
    highlight: true,
  },
];

export function Timeline() {
  return (
    <Section className="relative overflow-hidden bg-[#FAFAF8] py-28 md:py-36">
      {/* Header */}
      <Reveal>
        <div className="mb-16 text-center md:mb-20">
          <span className="mb-3 block font-mono text-xs font-medium tracking-[0.3em] text-rhino-orange uppercase">
            Our Journey
          </span>
          <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
            Milestones of Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#555]">
            Nine decades of building industries that endure.
          </p>
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Center line (desktop) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-rhino-orange/30 via-rhino-orange/15 to-transparent md:block" />

        {/* Left line (mobile) */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-rhino-orange/30 via-rhino-orange/15 to-transparent md:hidden" />

        <div className="space-y-8 md:space-y-0">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] as const,
                  delay: i * 0.08,
                }}
                className="relative md:py-6"
              >
                {/* Mobile layout */}
                <div className="flex gap-6 pl-10 md:hidden">
                  {/* Dot */}
                  <div className="absolute left-[11px] top-1">
                    <div className={`h-3 w-3 rounded-full border-2 ${m.highlight ? "border-rhino-orange bg-rhino-orange/20" : "border-gray-300 bg-white"}`} />
                  </div>

                  <div>
                    <span className="font-display text-lg font-bold text-rhino-orange">{m.year}</span>
                    <h3 className="mt-1 text-base font-bold text-[#111]">{m.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#555]">{m.description}</p>
                  </div>
                </div>

                {/* Desktop layout — alternating sides */}
                <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] md:items-center md:gap-0">
                  {/* Left content */}
                  <div className={`${isLeft ? "pr-10 text-right" : ""}`}>
                    {isLeft && (
                      <div>
                        <span className="font-display text-xl font-bold text-rhino-orange">{m.year}</span>
                        <h3 className="mt-1 text-lg font-bold text-[#111]">{m.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#555]">{m.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className={`h-3.5 w-3.5 rounded-full border-2 ${m.highlight ? "border-rhino-orange bg-rhino-orange/20" : "border-gray-300 bg-white"}`} />
                      {m.highlight && (
                        <div className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-rhino-orange/10" style={{ animationDuration: "3s" }} />
                      )}
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={`${!isLeft ? "pl-10" : ""}`}>
                    {!isLeft && (
                      <div>
                        <span className="font-display text-xl font-bold text-rhino-orange">{m.year}</span>
                        <h3 className="mt-1 text-lg font-bold text-[#111]">{m.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#555]">{m.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Timeline;
