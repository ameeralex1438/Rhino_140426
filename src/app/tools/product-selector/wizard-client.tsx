"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { BlurFade } from "@/components/ui/blur-fade";
import { products, productVariants } from "@/data/products";
import {
  Thermometer,
  Building2,
  Shield,
  Wind,
  Leaf,
  Flame,
  Music,
  Wrench,
  Snowflake,
  PanelTop,
  Layers,
  Factory,
  Award,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  Zap,
  Target,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dynamic background (SSR disabled — WebGL)                                  */
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

const ease = [0.16, 1, 0.3, 1] as const;

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  rsl: "/images/products/product-1.jpeg",
  rwm: "/images/products/product-2.jpeg",
  rbr: "/images/products/product-3.jpeg",
  rra: "/images/products/product-1.jpeg",
  rlw: "/images/products/product-3.jpeg",
};

const VARIANT_IMAGE_MAP: Record<string, string> = {
  elite: "/images/products/elite.avif",
  enduro: "/images/products/enduro.avif",
  "eco-green": "/images/products/ecogreen.avif",
};

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type ApplicationType =
  | "roof"
  | "external-wall"
  | "internal-partition"
  | "floor-ceiling"
  | "pipes-vessels"
  | "hvac-duct"
  | "fire-barrier"
  | "cold-storage"
  | "facade-cladding"
  | "general-fill";

type TemperatureRange = "below-100" | "100-400" | "400-650" | "above-650";

type Priority =
  | "fire-safety"
  | "thermal"
  | "acoustics"
  | "easy-install"
  | "low-carbon";

type GreenTarget = "none" | "igbc-griha" | "ecbc-super" | "net-zero";

interface WizardState {
  application: ApplicationType | null;
  temperature: TemperatureRange | null;
  priorities: Priority[];
  greenTarget: GreenTarget | null;
}

interface OptionItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

/* -------------------------------------------------------------------------- */
/*  Step options data                                                           */
/* -------------------------------------------------------------------------- */

const applicationOptions: OptionItem[] = [
  {
    id: "roof",
    label: "Roof",
    description: "Flat or pitched roof insulation",
    icon: PanelTop,
  },
  {
    id: "external-wall",
    label: "External Wall",
    description: "EWI, cavity, or rainscreen",
    icon: Building2,
  },
  {
    id: "internal-partition",
    label: "Internal Partition",
    description: "Drywall, stud, or block walls",
    icon: Layers,
  },
  {
    id: "floor-ceiling",
    label: "Floor / Ceiling",
    description: "Suspended or solid floors",
    icon: Layers,
  },
  {
    id: "pipes-vessels",
    label: "Pipes & Vessels",
    description: "Industrial pipe & tank lagging",
    icon: Factory,
  },
  {
    id: "hvac-duct",
    label: "HVAC Duct",
    description: "Duct lining & wrapping",
    icon: Wind,
  },
  {
    id: "fire-barrier",
    label: "Fire Barrier",
    description: "Fire-stops & compartmentation",
    icon: Flame,
  },
  {
    id: "cold-storage",
    label: "Cold Storage",
    description: "Refrigeration & cryogenic",
    icon: Snowflake,
  },
  {
    id: "facade-cladding",
    label: "Facade / Cladding",
    description: "Curtain walls & EIFS/ETICS",
    icon: Building2,
  },
  {
    id: "general-fill",
    label: "General Fill",
    description: "Cavities, gaps, irregular spaces",
    icon: Wind,
  },
];

const temperatureOptions: OptionItem[] = [
  {
    id: "below-100",
    label: "Below 100\u00B0C",
    description: "Building comfort range",
    icon: Thermometer,
  },
  {
    id: "100-400",
    label: "100 \u2013 400\u00B0C",
    description: "Industrial moderate heat",
    icon: Thermometer,
  },
  {
    id: "400-650",
    label: "400 \u2013 650\u00B0C",
    description: "Industrial high heat",
    icon: Flame,
  },
  {
    id: "above-650",
    label: "Above 650\u00B0C",
    description: "Extreme industrial",
    icon: Flame,
  },
];

const priorityOptions: OptionItem[] = [
  {
    id: "fire-safety",
    label: "Maximum Fire Safety",
    description: "Euro Class A1, non-combustible",
    icon: Shield,
  },
  {
    id: "thermal",
    label: "Best Thermal Performance",
    description: "Lowest lambda values",
    icon: Zap,
  },
  {
    id: "acoustics",
    label: "Superior Acoustics",
    description: "NRC up to 1.0",
    icon: Music,
  },
  {
    id: "easy-install",
    label: "Easy Installation",
    description: "Roll format, quick coverage",
    icon: Wrench,
  },
  {
    id: "low-carbon",
    label: "Lowest Carbon Footprint",
    description: "Up to 65% CO\u2082 reduction",
    icon: Leaf,
  },
];

const greenTargetOptions: OptionItem[] = [
  {
    id: "none",
    label: "None",
    description: "No specific certification",
    icon: Target,
  },
  {
    id: "igbc-griha",
    label: "IGBC / GRIHA",
    description: "Indian green building compliance",
    icon: Award,
  },
  {
    id: "ecbc-super",
    label: "ECBC Super",
    description: "Energy Conservation Building Code",
    icon: Globe,
  },
  {
    id: "net-zero",
    label: "Net-Zero / EPD",
    description: "Environmental Product Declaration",
    icon: Leaf,
  },
];

/* -------------------------------------------------------------------------- */
/*  Recommendation engine                                                      */
/* -------------------------------------------------------------------------- */

// Product IDs: rsl, rwm, rbr, rra, rlw

const APPLICATION_SCORES: Record<ApplicationType, Record<string, number>> = {
  roof: { rsl: 10, rwm: 2, rbr: 8, rra: 4, rlw: 1 },
  "external-wall": { rsl: 9, rwm: 2, rbr: 5, rra: 8, rlw: 1 },
  "internal-partition": { rsl: 8, rwm: 1, rbr: 7, rra: 6, rlw: 3 },
  "floor-ceiling": { rsl: 8, rwm: 1, rbr: 9, rra: 3, rlw: 2 },
  "pipes-vessels": { rsl: 3, rwm: 10, rbr: 2, rra: 1, rlw: 4 },
  "hvac-duct": { rsl: 4, rwm: 5, rbr: 10, rra: 2, rlw: 1 },
  "fire-barrier": { rsl: 7, rwm: 3, rbr: 4, rra: 10, rlw: 2 },
  "cold-storage": { rsl: 8, rwm: 2, rbr: 5, rra: 6, rlw: 7 },
  "facade-cladding": { rsl: 5, rwm: 1, rbr: 2, rra: 10, rlw: 1 },
  "general-fill": { rsl: 2, rwm: 1, rbr: 3, rra: 1, rlw: 10 },
};

const TEMPERATURE_SCORES: Record<TemperatureRange, Record<string, number>> = {
  "below-100": { rsl: 8, rwm: 4, rbr: 9, rra: 7, rlw: 6 },
  "100-400": { rsl: 9, rwm: 7, rbr: 8, rra: 8, rlw: 6 },
  "400-650": { rsl: 9, rwm: 9, rbr: 6, rra: 8, rlw: 7 },
  "above-650": { rsl: 10, rwm: 10, rbr: 5, rra: 8, rlw: 8 },
};

const PRIORITY_SCORES: Record<Priority, Record<string, number>> = {
  "fire-safety": { rsl: 9, rwm: 7, rbr: 7, rra: 10, rlw: 6 },
  thermal: { rsl: 10, rwm: 8, rbr: 8, rra: 7, rlw: 5 },
  acoustics: { rsl: 10, rwm: 6, rbr: 7, rra: 8, rlw: 7 },
  "easy-install": { rsl: 5, rwm: 7, rbr: 10, rra: 4, rlw: 8 },
  "low-carbon": { rsl: 8, rwm: 7, rbr: 8, rra: 7, rlw: 7 },
};

function getRecommendation(state: WizardState) {
  const productIds = ["rsl", "rwm", "rbr", "rra", "rlw"];
  const scores: Record<string, number> = {};

  for (const pid of productIds) {
    let score = 0;
    if (state.application) {
      score += (APPLICATION_SCORES[state.application]?.[pid] ?? 0) * 3;
    }
    if (state.temperature) {
      score += (TEMPERATURE_SCORES[state.temperature]?.[pid] ?? 0) * 2;
    }
    for (const p of state.priorities) {
      score += (PRIORITY_SCORES[p]?.[pid] ?? 0) * 2;
    }
    scores[pid] = score;
  }

  // Find winner
  let bestId = "rsl";
  let bestScore = 0;
  for (const pid of productIds) {
    if (scores[pid] > bestScore) {
      bestScore = scores[pid];
      bestId = pid;
    }
  }

  const product = products.find((p) => p.id === bestId) ?? products[0];

  // Determine variant
  let variantId = "elite";
  if (state.greenTarget === "net-zero") {
    variantId = "eco-green";
  } else if (
    state.greenTarget === "ecbc-super" ||
    state.greenTarget === "igbc-griha" ||
    state.priorities.includes("low-carbon")
  ) {
    variantId = "enduro";
  }

  const variant =
    productVariants.find((v) => v.id === variantId) ?? productVariants[0];

  return { product, variant, score: bestScore };
}

/* -------------------------------------------------------------------------- */
/*  3D TILT CARD                                                               */
/* -------------------------------------------------------------------------- */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

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

/* -------------------------------------------------------------------------- */
/*  Step transition variants                                                   */
/* -------------------------------------------------------------------------- */

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(8px)",
  }),
};

/* -------------------------------------------------------------------------- */
/*  OptionTile component                                                       */
/* -------------------------------------------------------------------------- */

function OptionTile({
  item,
  selected,
  onSelect,
  index,
}: {
  item: OptionItem;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease }}
      onClick={onSelect}
      className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-300 ${
        selected
          ? "border-rhino-orange bg-rhino-orange/5 shadow-lg shadow-rhino-orange/10"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Selected checkmark */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <CheckCircle2 className="h-5 w-5 text-rhino-orange" />
        </motion.div>
      )}

      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
          selected
            ? "bg-rhino-orange text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-rhino-orange/10 group-hover:text-rhino-orange"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Label */}
      <span
        className={`font-display text-sm font-bold transition-colors duration-300 ${
          selected ? "text-rhino-orange" : "text-gray-900"
        }`}
      >
        {item.label}
      </span>

      {/* Description */}
      <span className="text-xs leading-relaxed text-gray-500">
        {item.description}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress dots                                                              */
/* -------------------------------------------------------------------------- */

function ProgressDots({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const labels = ["Application", "Temperature", "Priority", "Certification"];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                i < currentStep
                  ? "bg-rhino-orange text-white shadow-lg shadow-rhino-orange/30"
                  : i === currentStep
                    ? "animate-glow-pulse border-2 border-rhino-orange bg-white text-rhino-orange"
                    : "border-2 border-gray-200 bg-gray-50 text-gray-400"
              }`}
            >
              {i < currentStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`hidden text-xs font-medium uppercase tracking-wider sm:block ${
                i <= currentStep ? "text-rhino-orange" : "text-gray-400"
              }`}
            >
              {labels[i]}
            </span>
          </div>

          {/* Connector line */}
          {i < totalSteps - 1 && (
            <div
              className={`hidden h-0.5 w-8 rounded-full transition-colors duration-500 sm:block lg:w-12 ${
                i < currentStep ? "bg-rhino-orange" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Result card                                                                */
/* -------------------------------------------------------------------------- */

function ResultCard({
  product,
  variant,
}: {
  product: (typeof products)[number];
  variant: (typeof productVariants)[number];
}) {
  const specs = product.specs;
  const variantImage = VARIANT_IMAGE_MAP[variant.id] ?? "/images/products/elite.avif";

  const VARIANT_NOBG_MAP: Record<string, string> = {
    elite: "/images/products/elite-nobg.png",
    enduro: "/images/products/enduro-nobg.png",
    "eco-green": "/images/products/ecogreen-nobg.png",
  };
  const heroImage = VARIANT_NOBG_MAP[variant.id] ?? "/images/products/elite-nobg.png";

  const specGrid = [
    {
      label: "Density",
      value: "density" in specs ? specs.density : "N/A",
    },
    {
      label: "Conductivity",
      value: specs.thermalConductivity,
    },
    {
      label: "Fire Rating",
      value: specs.fireRating,
    },
    {
      label: "Max Temp",
      value:
        "maxServiceTemp" in specs
          ? (specs.maxServiceTemp as string)
          : "750\u00B0C",
    },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, filter: "blur(12px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease }}
    >
      <TiltCard className="mx-auto max-w-4xl">
        <div className="card-shine overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-black/5">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Left — image */}
            <div className="relative h-72 overflow-hidden bg-[#FAFAF8] md:h-full md:min-h-[420px]">
              <Image
                src={heroImage}
                alt={`${variant.name} - ${product.name}`}
                fill
                className="object-contain p-6 md:p-10"
              />
              {/* Radial glow overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,102,0,0.08),transparent_70%)]" />

              {/* Variant badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/60 px-4 py-3 backdrop-blur-md">
                <Image
                  src={variantImage}
                  alt={variant.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-xs font-semibold text-white">
                    {variant.name}
                  </p>
                  <p className="text-xs text-white/60">
                    Available Now
                  </p>
                </div>
              </div>
            </div>

            {/* Right — details */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              {/* Product code pill */}
              <span className="mb-3 inline-block w-fit rounded-full bg-rhino-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rhino-orange">
                {product.code}
              </span>

              {/* Product name */}
              <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h2>

              {/* Tagline */}
              <p className="mt-1 text-base font-medium text-gray-500">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                {product.shortDescription}
              </p>

              {/* Spec grid */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {specGrid.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {spec.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-gray-900">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Carbon reduction badge */}
              <div
                className="mt-5 flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{
                  backgroundColor: `${variant.color}15`,
                  borderLeft: `3px solid ${variant.color}`,
                }}
              >
                <Leaf className="h-4 w-4" style={{ color: variant.color }} />
                <span className="text-sm font-semibold" style={{ color: variant.color }}>
                  {variant.carbonReduction}% less carbon
                </span>
                <span className="text-xs text-gray-500">
                  &mdash; {variant.tagline}
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-rhino-orange hover:text-rhino-orange"
                >
                  View Full Specs
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-xl hover:shadow-rhino-orange/30"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main wizard component                                                      */
/* -------------------------------------------------------------------------- */

export function ProductSelectorWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<WizardState>({
    application: null,
    temperature: null,
    priorities: [],
    greenTarget: null,
  });

  const totalSteps = 4;
  const isResult = step === totalSteps;

  const recommendation = useMemo(() => {
    if (!isResult) return null;
    return getRecommendation(state);
  }, [isResult, state]);

  const advance = useCallback(
    (key: keyof WizardState, value: string) => {
      setState((prev) => ({ ...prev, [key]: value }));
      setDirection(1);
      // Small delay so user sees their selection before transitioning
      setTimeout(() => setStep((s) => s + 1), 250);
    },
    [],
  );

  const togglePriority = useCallback((value: Priority) => {
    setState((prev) => {
      const has = prev.priorities.includes(value);
      return {
        ...prev,
        priorities: has
          ? prev.priorities.filter((p) => p !== value)
          : [...prev.priorities, value],
      };
    });
  }, []);

  const advanceFromPriorities = useCallback(() => {
    setDirection(1);
    setTimeout(() => setStep((s) => s + 1), 250);
  }, []);

  const reset = useCallback(() => {
    setDirection(-1);
    setStep(0);
    setState({
      application: null,
      temperature: null,
      priorities: [],
      greenTarget: null,
    });
  }, []);

  /* ---------------------------------------------------------------------- */
  /*  Step content renderers                                                  */
  /* ---------------------------------------------------------------------- */

  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <StepWrapper
            key="step-0"
            title="What are you insulating?"
            subtitle="Select your primary application to narrow down the best product."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {applicationOptions.map((opt, i) => (
                <OptionTile
                  key={opt.id}
                  item={opt}
                  selected={state.application === opt.id}
                  onSelect={() =>
                    advance("application", opt.id)
                  }
                  index={i}
                />
              ))}
            </div>
          </StepWrapper>
        );
      case 1:
        return (
          <StepWrapper
            key="step-1"
            title="What\u2019s your operating temperature?"
            subtitle="The temperature range determines which products can withstand your conditions."
          >
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
              {temperatureOptions.map((opt, i) => (
                <OptionTile
                  key={opt.id}
                  item={opt}
                  selected={state.temperature === opt.id}
                  onSelect={() =>
                    advance("temperature", opt.id)
                  }
                  index={i}
                />
              ))}
            </div>
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper
            key="step-2"
            title="What matters most?"
            subtitle="Select one or more performance characteristics that are critical for your project."
          >
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-5">
              {priorityOptions.map((opt, i) => (
                <OptionTile
                  key={opt.id}
                  item={opt}
                  selected={state.priorities.includes(opt.id as Priority)}
                  onSelect={() => togglePriority(opt.id as Priority)}
                  index={i}
                />
              ))}
            </div>
            {state.priorities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  onClick={advanceFromPriorities}
                  className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-3 text-sm font-bold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-xl hover:shadow-rhino-orange/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </StepWrapper>
        );
      case 3:
        return (
          <StepWrapper
            key="step-3"
            title="Any green building targets?"
            subtitle="Sustainability certifications influence which product variant we recommend."
          >
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
              {greenTargetOptions.map((opt, i) => (
                <OptionTile
                  key={opt.id}
                  item={opt}
                  selected={state.greenTarget === opt.id}
                  onSelect={() =>
                    advance("greenTarget", opt.id)
                  }
                  index={i}
                />
              ))}
            </div>
          </StepWrapper>
        );
      default:
        return null;
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ================================================================ */}
      {/*  HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Particles behind hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingParticlesBackground light />
        </div>

        {/* Radial gradient glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,136,0,0.15),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(45,184,110,0.08),transparent)]" />

        {/* Noise */}
        <div className="noise pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <BlurFade inView delay={0}>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange">
              Product Selector
            </span>
          </BlurFade>

          <BlurFade inView delay={0.15}>
            <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Perfect
              <br />
              <span className="gradient-text-orange">Insulation</span>
            </h1>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              Answer four quick questions and we&rsquo;ll recommend the ideal
              Rhino product and variant for your project.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Gradient line */}
      <div className="line-gradient" />

      {/* ================================================================ */}
      {/*  WIZARD BODY                                                      */}
      {/* ================================================================ */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Floating particles behind wizard */}
        <div className="pointer-events-none absolute inset-0 -top-20 -bottom-20 overflow-hidden">
          <FloatingParticlesBackground light />
        </div>

        <div className="relative z-10">
          {/* Progress indicator (hidden on result) */}
          {!isResult && (
            <BlurFade inView delay={0.1}>
              <div className="mb-10">
                <ProgressDots currentStep={step} totalSteps={totalSteps} />
                <p className="mt-4 text-center text-sm text-gray-400">
                  Step {step + 1} of {totalSteps}
                </p>
              </div>
            </BlurFade>
          )}

          {/* Animated step transitions */}
          <AnimatePresence mode="wait" custom={direction}>
            {isResult && recommendation ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease }}
              >
                {/* Result header */}
                <div className="mb-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rhino-orange/10"
                  >
                    <CheckCircle2 className="h-8 w-8 text-rhino-orange" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">
                    We Recommend
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Based on your selections, here&rsquo;s the best match.
                  </p>
                </div>

                {/* Result card */}
                <ResultCard
                  product={recommendation.product}
                  variant={recommendation.variant}
                />

                {/* Start over button */}
                <div className="mt-10 text-center">
                  <motion.button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition-all duration-300 hover:border-rhino-orange hover:text-rhino-orange"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start Over
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease }}
              >
                {renderStepContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step wrapper                                                               */
/* -------------------------------------------------------------------------- */

function StepWrapper({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <h2 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
