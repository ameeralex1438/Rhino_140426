"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import Counter from "@/components/ui/counter";
import { products } from "@/data/products";

/* -------------------------------------------------------------------------- */
/*  Dynamic background (SSR disabled — WebGL)                                 */
/* -------------------------------------------------------------------------- */

const FloatingParticlesBackground = dynamic(
  () =>
    import("@/components/ui/floating-particles").then(
      (m) => m.FloatingParticlesBackground,
    ),
  { ssr: false },
);

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

type AssemblyType =
  | "flat-roof"
  | "pitched-roof"
  | "external-wall"
  | "internal-wall"
  | "floor";

type ClimateZone =
  | "hot-dry"
  | "warm-humid"
  | "composite"
  | "temperate"
  | "cold";

const ASSEMBLY_OPTIONS: { value: AssemblyType; label: string }[] = [
  { value: "flat-roof", label: "Flat Roof" },
  { value: "pitched-roof", label: "Pitched Roof" },
  { value: "external-wall", label: "External Wall" },
  { value: "internal-wall", label: "Internal Wall" },
  { value: "floor", label: "Floor" },
];

const CLIMATE_OPTIONS: { value: ClimateZone; label: string }[] = [
  { value: "hot-dry", label: "Hot-Dry" },
  { value: "warm-humid", label: "Warm-Humid" },
  { value: "composite", label: "Composite" },
  { value: "temperate", label: "Temperate" },
  { value: "cold", label: "Cold" },
];

/** ECBC 2023 target U-values W/m2K — keyed by climateZone-assemblyCategory */
const ECBC_TARGETS: Record<string, number> = {
  "hot-dry-roof": 0.261,
  "hot-dry-wall": 0.397,
  "warm-humid-roof": 0.261,
  "warm-humid-wall": 0.44,
  "composite-roof": 0.261,
  "composite-wall": 0.397,
  "temperate-roof": 0.409,
  "temperate-wall": 0.499,
  "cold-roof": 0.261,
  "cold-wall": 0.352,
};

function getAssemblyCategory(
  assembly: AssemblyType,
): "roof" | "wall" | "floor" {
  if (assembly === "flat-roof" || assembly === "pitched-roof") return "roof";
  if (assembly === "external-wall" || assembly === "internal-wall")
    return "wall";
  return "floor";
}

function getEcbcTarget(climate: ClimateZone, assembly: AssemblyType): number {
  const cat = getAssemblyCategory(assembly);
  const key = `${climate}-${cat}`;
  return ECBC_TARGETS[key] ?? 0.4;
}

type SubstrateId = "rcc" | "brick" | "aac" | "metal" | "custom";

const SUBSTRATES: {
  id: SubstrateId;
  label: string;
  k: number;
}[] = [
  { id: "rcc", label: "RCC Concrete", k: 1.58 },
  { id: "brick", label: "Brick", k: 0.81 },
  { id: "aac", label: "AAC Block", k: 0.16 },
  { id: "metal", label: "Metal Sheet", k: 50 },
  { id: "custom", label: "Custom", k: 1.0 },
];

interface RhinoProduct {
  id: string;
  slug: string;
  code: string;
  name: string;
  densityMin: number;
  densityMax: number;
  kInsulation: number;
}

const RHINO_PRODUCTS: RhinoProduct[] = [
  {
    id: "rsl",
    slug: "rhino-slabs",
    code: "RSL",
    name: "Rhino Slabs",
    densityMin: 40,
    densityMax: 180,
    kInsulation: 0.037,
  },
  {
    id: "rwm",
    slug: "rhino-wired-matts",
    code: "RWM",
    name: "Rhino Wired Matts",
    densityMin: 70,
    densityMax: 150,
    kInsulation: 0.037,
  },
  {
    id: "rbr",
    slug: "rhino-building-rolls",
    code: "RBR",
    name: "Rhino Building Rolls",
    densityMin: 40,
    densityMax: 96,
    kInsulation: 0.037,
  },
  {
    id: "rra",
    slug: "rhino-rockarmor",
    code: "RRA",
    name: "Rhino RockArmor",
    densityMin: 80,
    densityMax: 160,
    kInsulation: 0.037,
  },
  {
    id: "rlw",
    slug: "rhino-loose-wool",
    code: "RLW",
    name: "Rhino Loose Wool",
    densityMin: 40,
    densityMax: 120,
    kInsulation: 0.04,
  },
];

const STANDARD_THICKNESSES = [25, 40, 50, 60, 75, 80, 100, 120, 150, 200];

const SURFACE_RESISTANCE = 0.17; // combined inner + outer

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function roundUpToStandard(mm: number): number {
  for (const t of STANDARD_THICKNESSES) {
    if (t >= mm) return t;
  }
  return STANDARD_THICKNESSES[STANDARD_THICKNESSES.length - 1];
}

/* -------------------------------------------------------------------------- */
/*  Assembly Diagram                                                           */
/* -------------------------------------------------------------------------- */

function AssemblyDiagram({
  substrateMm,
  insulationMm,
  substrateName,
  productName,
}: {
  substrateMm: number;
  insulationMm: number;
  substrateName: string;
  productName: string;
}) {
  const totalVisual = substrateMm + insulationMm + 40; // 40 for surfaces
  const pctSurface = (20 / totalVisual) * 100;
  const pctSubstrate = (substrateMm / totalVisual) * 100;
  const pctInsulation = (insulationMm / totalVisual) * 100;

  const layers: { label: string; pct: number; color: string; detail: string }[] = [
    {
      label: "Outer Surface",
      pct: pctSurface,
      color: "bg-rhino-gray-600",
      detail: "",
    },
    {
      label: substrateName,
      pct: pctSubstrate,
      color: "bg-rhino-gray-400",
      detail: `${substrateMm} mm`,
    },
    {
      label: productName,
      pct: pctInsulation,
      color: "bg-rhino-orange",
      detail: `${insulationMm} mm`,
    },
    {
      label: "Inner Surface",
      pct: pctSurface,
      color: "bg-rhino-gray-600",
      detail: "",
    },
  ];

  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
        Assembly Cross-Section
      </p>
      <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-white/10">
        {layers.map((l, i) => (
          <div
            key={i}
            className={`${l.color} flex items-center justify-between px-4 transition-all duration-500`}
            style={{ minHeight: Math.max(l.pct * 1.6, 28) }}
          >
            <span className="text-xs font-semibold text-white/90 drop-shadow-sm">
              {l.label}
            </span>
            {l.detail && (
              <span className="text-xs font-bold text-white drop-shadow-sm">
                {l.detail}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Compliance Badge                                                           */
/* -------------------------------------------------------------------------- */

function ComplianceBadge({
  achievedU,
  targetU,
}: {
  achievedU: number;
  targetU: number;
}) {
  const ratio = achievedU / targetU;

  let label: string;
  let className: string;

  if (ratio <= 0.7) {
    label = "ECBC Super";
    className =
      "bg-rhino-green/20 text-rhino-green-bright border-rhino-green/30";
  } else if (ratio <= 1.0) {
    label = "ECBC Compliant";
    className =
      "bg-rhino-green/20 text-rhino-green-bright border-rhino-green/30";
  } else {
    label = "Below Target";
    className = "bg-rhino-orange/20 text-rhino-orange border-rhino-orange/30";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${className}`}
    >
      {ratio <= 1.0 ? (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M12 3l9.66 16.59A1 1 0 0120.66 21H3.34a1 1 0 01-.87-1.41L12 3z"
          />
        </svg>
      )}
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Calculator Component                                                  */
/* -------------------------------------------------------------------------- */

export default function ThermalCalculatorClient() {
  /* — State — */
  const [assembly, setAssembly] = useState<AssemblyType>("flat-roof");
  const [climate, setClimate] = useState<ClimateZone>("composite");
  const [targetUOverride, setTargetUOverride] = useState<string>("");
  const [substrateId, setSubstrateId] = useState<SubstrateId>("rcc");
  const [customK, setCustomK] = useState<string>("1.0");
  const [substrateMm, setSubstrateMm] = useState(150);
  const [productId, setProductId] = useState("rsl");
  const [density, setDensity] = useState(80);

  /* — Derived — */
  const selectedProduct =
    RHINO_PRODUCTS.find((p) => p.id === productId) ?? RHINO_PRODUCTS[0];
  const selectedSubstrate =
    SUBSTRATES.find((s) => s.id === substrateId) ?? SUBSTRATES[0];
  const substrateK =
    substrateId === "custom" ? parseFloat(customK) || 1.0 : selectedSubstrate.k;

  const ecbcDefault = getEcbcTarget(climate, assembly);
  const targetU = targetUOverride
    ? parseFloat(targetUOverride) || ecbcDefault
    : ecbcDefault;

  /* When climate or assembly changes, clear the override */
  const prevClimate = useRef(climate);
  const prevAssembly = useRef(assembly);
  useEffect(() => {
    if (climate !== prevClimate.current || assembly !== prevAssembly.current) {
      setTargetUOverride("");
      prevClimate.current = climate;
      prevAssembly.current = assembly;
    }
  }, [climate, assembly]);

  /* Reset density when product changes */
  useEffect(() => {
    setDensity(
      Math.round(
        (selectedProduct.densityMin + selectedProduct.densityMax) / 2,
      ),
    );
  }, [selectedProduct]);

  /* — Calculation (debounce is visual via motion) — */
  const calc = useMemo(() => {
    const kIns = selectedProduct.kInsulation;
    const R_substrate = (substrateMm / 1000) / substrateK;
    const R_without = R_substrate + SURFACE_RESISTANCE;
    const U_current = 1 / R_without;

    const R_target = 1 / targetU;
    const R_required = R_target - R_without;
    const rawThicknessMm =
      R_required > 0 ? Math.ceil(R_required * kIns * 1000) : 0;
    const chosenThickness =
      rawThicknessMm > 0 ? roundUpToStandard(rawThicknessMm) : 0;

    const R_total =
      R_without + (chosenThickness > 0 ? chosenThickness / 1000 / kIns : 0);
    const achievedU = 1 / R_total;

    const savingsPct =
      U_current > 0 && achievedU < U_current
        ? Math.round(((U_current - achievedU) / U_current) * 100)
        : 0;

    return {
      R_substrate,
      R_without,
      U_current,
      R_required,
      rawThicknessMm,
      chosenThickness,
      achievedU,
      savingsPct,
    };
  }, [substrateMm, substrateK, targetU, selectedProduct]);

  /* — Full product data for recommendation card — */
  const fullProduct = products.find((p) => p.id === productId);

  /* — Substrate label for diagram — */
  const substrateLabel =
    substrateId === "custom"
      ? `Custom (k=${substrateK})`
      : selectedSubstrate.label;

  /* -------------------------------------------------------------------- */
  /*  Render                                                                */
  /* -------------------------------------------------------------------- */

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="section-dark noise relative overflow-hidden">
        <FloatingParticlesBackground light={false} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-32 text-center md:pt-40">
          <BlurFade delay={0.1} inView>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-rhino-green/30 bg-rhino-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rhino-green-bright">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ECBC 2023 Compliant
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Thermal{" "}
              <span className="gradient-text-orange">Calculator</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-rhino-gray-300">
              Find the optimal Rhino insulation thickness for your building
              assembly. Achieve ECBC compliance in seconds.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ============ CALCULATOR ============ */}
      <section className="section-charcoal relative min-h-screen overflow-hidden py-16 md:py-24">
        <FloatingParticlesBackground light />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[2fr_3fr] lg:gap-14">
          {/* ---------- LEFT PANEL: INPUTS ---------- */}
          <div className="flex flex-col gap-6">
            <BlurFade delay={0.1} inView>
              <h2 className="font-display text-2xl font-bold text-white">
                Configuration
              </h2>
            </BlurFade>

            {/* Assembly Type */}
            <InputCard label="Assembly Type">
              <div className="flex flex-wrap gap-2">
                {ASSEMBLY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAssembly(opt.value)}
                    className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
                      assembly === opt.value
                        ? "bg-rhino-orange text-white shadow-lg shadow-rhino-orange/20"
                        : "bg-white/5 text-rhino-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </InputCard>

            {/* Climate Zone */}
            <InputCard label="Climate Zone (ECBC)">
              <select
                value={climate}
                onChange={(e) =>
                  setClimate(e.target.value as ClimateZone)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-rhino-orange"
              >
                {CLIMATE_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-rhino-charcoal"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </InputCard>

            {/* Target U-Value */}
            <InputCard label="Target U-Value (W/m\u00B2K)">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.001"
                  min="0.05"
                  max="5"
                  placeholder={ecbcDefault.toFixed(3)}
                  value={targetUOverride}
                  onChange={(e) => setTargetUOverride(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-rhino-gray-500 focus:border-rhino-orange"
                />
                <span className="shrink-0 text-xs text-rhino-gray-400">
                  ECBC: {ecbcDefault.toFixed(3)}
                </span>
              </div>
            </InputCard>

            {/* Substrate */}
            <InputCard label="Substrate Material">
              <select
                value={substrateId}
                onChange={(e) =>
                  setSubstrateId(e.target.value as SubstrateId)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-rhino-orange"
              >
                {SUBSTRATES.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                    className="bg-rhino-charcoal"
                  >
                    {s.label} (k={s.k})
                  </option>
                ))}
              </select>
              {substrateId === "custom" && (
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={customK}
                  onChange={(e) => setCustomK(e.target.value)}
                  placeholder="k-value (W/mK)"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-rhino-gray-500 focus:border-rhino-orange"
                />
              )}
            </InputCard>

            {/* Substrate Thickness */}
            <InputCard label={`Substrate Thickness: ${substrateMm} mm`}>
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={substrateMm}
                onChange={(e) => setSubstrateMm(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-rhino-orange"
              />
              <div className="mt-1 flex justify-between text-xs text-rhino-gray-500">
                <span>20 mm</span>
                <span>300 mm</span>
              </div>
            </InputCard>

            {/* Rhino Product */}
            <InputCard label="Rhino Product">
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-rhino-orange"
              >
                {RHINO_PRODUCTS.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    className="bg-rhino-charcoal"
                  >
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </InputCard>

            {/* Density */}
            <InputCard
              label={`Insulation Density: ${density} kg/m\u00B3`}
            >
              <input
                type="range"
                min={selectedProduct.densityMin}
                max={selectedProduct.densityMax}
                step={1}
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-rhino-orange"
              />
              <div className="mt-1 flex justify-between text-xs text-rhino-gray-500">
                <span>{selectedProduct.densityMin} kg/m&sup3;</span>
                <span>{selectedProduct.densityMax} kg/m&sup3;</span>
              </div>
            </InputCard>
          </div>

          {/* ---------- RIGHT PANEL: RESULTS ---------- */}
          <div className="flex flex-col gap-6">
            <BlurFade delay={0.15} inView>
              <h2 className="font-display text-2xl font-bold text-white">
                Results
              </h2>
            </BlurFade>

            {/* Primary result card */}
            <motion.div
              key={`${calc.chosenThickness}-${calc.achievedU.toFixed(3)}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-shine card-dark rounded-2xl p-6 md:p-8"
            >
              {calc.chosenThickness > 0 ? (
                <>
                  {/* Recommended Thickness */}
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
                    Recommended Thickness
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-6xl font-black tracking-tight text-rhino-orange md:text-7xl">
                      <Counter
                        value={calc.chosenThickness}
                        duration={1}
                      />
                    </span>
                    <span className="text-2xl font-bold text-rhino-gray-300">
                      mm
                    </span>
                  </div>

                  {/* Achieved U-Value */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
                        Achieved U-Value
                      </p>
                      <p className="font-display text-3xl font-bold text-white">
                        {calc.achievedU.toFixed(3)}{" "}
                        <span className="text-base font-normal text-rhino-gray-400">
                          W/m&sup2;K
                        </span>
                      </p>
                    </div>
                    <div className="text-sm text-rhino-gray-400">
                      vs target{" "}
                      <span className="font-bold text-white">
                        {targetU.toFixed(3)}
                      </span>
                    </div>
                    <ComplianceBadge
                      achievedU={calc.achievedU}
                      targetU={targetU}
                    />
                  </div>

                  {/* Energy savings */}
                  <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
                      Energy Savings Estimate
                    </p>
                    <p className="mt-1 text-lg font-bold text-rhino-green-bright">
                      ~{calc.savingsPct}% reduction{" "}
                      <span className="font-normal text-rhino-gray-300">
                        in heat transfer vs uninsulated
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-rhino-gray-500">
                      Uninsulated U-value: {calc.U_current.toFixed(3)} W/m
                      &sup2;K
                    </p>
                  </div>

                  {/* Assembly Diagram */}
                  <AssemblyDiagram
                    substrateMm={substrateMm}
                    insulationMm={calc.chosenThickness}
                    substrateName={substrateLabel}
                    productName={selectedProduct.name}
                  />
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg font-semibold text-rhino-green-bright">
                    No additional insulation needed
                  </p>
                  <p className="mt-2 text-sm text-rhino-gray-400">
                    Your substrate already meets the target U-value of{" "}
                    {targetU.toFixed(3)} W/m&sup2;K
                  </p>
                  <p className="mt-1 text-sm text-rhino-gray-500">
                    Current U-value: {calc.U_current.toFixed(3)} W/m&sup2;K
                  </p>
                </div>
              )}
            </motion.div>

            {/* Product Recommendation Card */}
            {fullProduct && calc.chosenThickness > 0 && (
              <motion.div
                key={`product-${productId}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-shine card-dark rounded-2xl p-6"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
                  Recommended Product
                </p>

                <h3 className="font-display text-xl font-bold text-white">
                  {fullProduct.name}{" "}
                  <span className="text-rhino-orange">
                    ({fullProduct.code})
                  </span>
                </h3>
                <p className="mt-1 text-sm text-rhino-gray-300">
                  {fullProduct.tagline}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <SpecChip
                    label="Thermal k"
                    value={
                      fullProduct.specs.thermalConductivity ?? "\u22640.037"
                    }
                  />
                  <SpecChip
                    label="Density"
                    value={fullProduct.specs.density ?? "-"}
                  />
                  <SpecChip
                    label="Fire Rating"
                    value={fullProduct.specs.fireRating ?? "-"}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${fullProduct.slug}`}
                    className="rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View Product
                  </Link>
                  <Link
                    href="/contact"
                    className="animate-glow-pulse rounded-xl bg-rhino-orange px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rhino-orange-light"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Technical Breakdown */}
            {calc.chosenThickness > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-dark rounded-2xl p-6"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-rhino-gray-400">
                  Calculation Breakdown
                </p>
                <div className="space-y-2 text-sm text-rhino-gray-300">
                  <Row
                    label="R (substrate)"
                    value={`${calc.R_substrate.toFixed(4)} m\u00B2K/W`}
                  />
                  <Row
                    label="R (surface)"
                    value={`${SURFACE_RESISTANCE.toFixed(2)} m\u00B2K/W`}
                  />
                  <Row
                    label="R (total, uninsulated)"
                    value={`${calc.R_without.toFixed(4)} m\u00B2K/W`}
                  />
                  <Row
                    label="U (uninsulated)"
                    value={`${calc.U_current.toFixed(3)} W/m\u00B2K`}
                  />
                  <div className="my-2 h-px bg-white/10" />
                  <Row
                    label="R (required from insulation)"
                    value={`${calc.R_required.toFixed(4)} m\u00B2K/W`}
                  />
                  <Row
                    label="Raw insulation thickness"
                    value={`${calc.rawThicknessMm} mm`}
                  />
                  <Row
                    label="Standard thickness (rounded up)"
                    value={`${calc.chosenThickness} mm`}
                  />
                  <Row
                    label="Achieved U-Value"
                    value={`${calc.achievedU.toFixed(3)} W/m\u00B2K`}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tiny sub-components                                                        */
/* -------------------------------------------------------------------------- */

function InputCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <label className="mb-2.5 block text-xs font-semibold uppercase tracking-widest text-rhino-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-3 py-2">
      <p className="text-xs uppercase tracking-wider text-rhino-gray-500">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-rhino-gray-200">
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-rhino-gray-400">{label}</span>
      <span className="font-mono text-white">{value}</span>
    </div>
  );
}
