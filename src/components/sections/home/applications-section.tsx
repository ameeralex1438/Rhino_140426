"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface TabData {
  id: string;
  label: string;
  heading: string;
  applications: string[];
  relatedProducts: string[];
}

const tabs: TabData[] = [
  {
    id: "industrial",
    label: "Industrial",
    heading: "Heavy-Duty Industrial Insulation",
    applications: [
      "Boilers, furnaces, kilns, and ESPs up to 750\u00B0C",
      "Process vessels, storage tanks, and piping in refineries",
      "Petrochemical plants, power stations, and smelters",
      "Acoustic enclosures for heavy machinery and generators",
    ],
    relatedProducts: ["RWM", "RSL", "RLW"],
  },
  {
    id: "commercial",
    label: "Commercial",
    heading: "Commercial Building Performance",
    applications: [
      "Office towers, malls, and mixed-use developments",
      "Curtain wall and facade insulation systems (EIFS/ETICS)",
      "Fire compartmentation and smoke barriers",
      "Sandwich panel cores for pre-engineered buildings",
    ],
    relatedProducts: ["RSL", "RRA", "RBR"],
  },
  {
    id: "residential",
    label: "Residential",
    heading: "Comfort and Safety at Home",
    applications: [
      "Pitched and flat roof thermal insulation",
      "Interior and exterior wall insulation",
      "Floor and ceiling sound insulation",
      "Prefab cabins, modular homes, and temporary structures",
    ],
    relatedProducts: ["RSL", "RBR"],
  },
  {
    id: "hvac",
    label: "HVAC",
    heading: "HVAC Duct and Pipe Insulation",
    applications: [
      "Duct lining and duct wrap for air handling units",
      "Chilled water pipe insulation to prevent condensation",
      "Equipment plenums and acoustic treatment",
      "Clean room and hospital HVAC systems",
    ],
    relatedProducts: ["RBR", "RSL", "RLW"],
  },
  {
    id: "fire-safety",
    label: "Fire Safety",
    heading: "Passive Fire Protection",
    applications: [
      "Fire barrier assemblies rated up to 4 hours",
      "Fire stops, cavity barriers, and penetration seals",
      "Structural steel fireproofing",
      "Escape route protection and smoke containment",
    ],
    relatedProducts: ["RSL", "RRA", "RLW"],
  },
];

export function ApplicationsSection() {
  const [activeTab, setActiveTab] = useState("industrial");
  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <Section className="bg-rhino-cream py-24 md:py-32">
      {/* Header */}
      <Reveal>
        <div className="mb-12 md:mb-16">
          <span className="mb-4 block text-xs font-medium tracking-[0.3em] text-rhino-orange">
            APPLICATIONS
          </span>
          <h2 className="font-display text-3xl font-bold text-rhino-gray-900 md:text-5xl lg:text-6xl">
            Insulation for Every Sector
          </h2>
        </div>
      </Reveal>

      {/* Tab bar */}
      <div className="relative mb-12">
        <div className="flex gap-2 overflow-x-auto pb-px scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-rhino-orange text-white shadow-sm"
                  : "border border-rhino-sand bg-white text-rhino-gray-700 hover:border-rhino-orange hover:text-rhino-orange",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left -- heading + bullets */}
            <div>
              <h3 className="mb-6 font-display text-2xl font-bold text-rhino-gray-900 md:text-3xl">
                {activeData.heading}
              </h3>
              <ul className="space-y-4">
                {activeData.applications.map((app) => (
                  <li
                    key={app}
                    className="flex items-start gap-3 text-base leading-relaxed text-rhino-gray-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rhino-orange" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right -- related products */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 text-xs font-medium tracking-[0.2em] text-rhino-gray-500">
                RELATED PRODUCTS
              </span>
              <div className="flex flex-wrap gap-3">
                {activeData.relatedProducts.map((code) => (
                  <span
                    key={code}
                    className="rounded-full bg-rhino-orange-pale px-4 py-2 text-sm font-medium text-rhino-orange transition-colors hover:bg-rhino-orange hover:text-white"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
