"use client";

import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { products, productVariants } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Layers,
  Shield,
  Scroll,
  BrickWall,
  Wind,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dynamic 3D backgrounds (heavy — lazy loaded)                              */
/* -------------------------------------------------------------------------- */

const FloatingGridBackground = dynamic(
  () =>
    import("@/components/ui/floating-grid-bg").then(
      (m) => m.FloatingGridBackground,
    ),
  { ssr: false },
);

const FloatingParticlesBackground = dynamic(
  () =>
    import("@/components/ui/floating-particles").then(
      (m) => m.FloatingParticlesBackground,
    ),
  { ssr: false },
);

/* -------------------------------------------------------------------------- */
/*  Constants & helpers                                                       */
/* -------------------------------------------------------------------------- */

const PRODUCT_COLORS: Record<string, string> = {
  rsl: "#FF6600",
  rwm: "#4A4A4A",
  rbr: "#FFB347",
  rra: "#E05500",
  rlw: "#2DB86E",
};

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  rsl: <Layers className="h-4 w-4" />,
  rwm: <Shield className="h-4 w-4" />,
  rbr: <Scroll className="h-4 w-4" />,
  rra: <BrickWall className="h-4 w-4" />,
  rlw: <Wind className="h-4 w-4" />,
};

/* Product images — use actual heroImage from product data */
const PRODUCT_IMAGES: Record<string, string> = {
  rsl: "/images/products/rsl-slab-with-packaging.jpg",
  rwm: "/images/products/sample-boxes-lineup.jpg",
  rbr: "/images/products/rbr-roll-packed.jpg",
  rra: "/images/products/product-photo-4.jpg",
  rlw: "/images/products/rlw-loose-wool-box.jpg",
};

/* NRC ratings for comparison */
const NRC_RATINGS: Record<string, string> = {
  rsl: "NRC up to 1.0",
  rwm: "Med-High",
  rbr: "NRC up to 0.90",
  rra: "High",
  rlw: "High",
};

/* Flexibility ratings */
const FLEXIBILITY: Record<string, string> = {
  rsl: "Medium",
  rwm: "Very High",
  rbr: "Very High",
  rra: "Very Rigid",
  rlw: "Free Form",
};

/* Water absorption */
const WATER_ABSORPTION: Record<string, string> = {
  rsl: "\u22641% by volume",
  rwm: "\u2014",
  rbr: "\u2014",
  rra: "\u2014",
  rlw: "\u2014",
};

/* Compressive strength */
const COMPRESSIVE: Record<string, string> = {
  rsl: "Up to 80 kPa",
  rwm: "\u2014",
  rbr: "\u2014",
  rra: "50 \u2013 150 kPa",
  rlw: "\u2014",
};

/* "Best in class" badges */
const BEST_IN_CLASS: Record<string, string[]> = {
  rsl: ["NRC Rating", "Water Absorption"],
  rwm: ["Flexibility"],
  rbr: [],
  rra: ["Compressive Strength", "Standards"],
  rlw: [],
};

/* -------------------------------------------------------------------------- */
/*  Spec-row data builder                                                     */
/* -------------------------------------------------------------------------- */

interface SpecRow {
  category: string;
  label: string;
  getValue: (p: (typeof products)[0]) => string;
  bestKey?: string; // matches BEST_IN_CLASS keys
}

const specRows: SpecRow[] = [
  /* Product Info */
  {
    category: "Product Info",
    label: "Product Code",
    getValue: (p) => p.code,
  },
  {
    category: "Product Info",
    label: "Tagline",
    getValue: (p) => p.tagline,
  },
  /* Thermal */
  {
    category: "Thermal",
    label: "Conductivity",
    getValue: (p) => p.specs.thermalConductivity,
  },
  {
    category: "Thermal",
    label: "Max Service Temp",
    getValue: (p) => p.specs.maxServiceTemp ?? "\u2014",
  },
  /* Fire */
  {
    category: "Fire",
    label: "Euro Fire Class",
    getValue: (p) => p.specs.fireRating,
  },
  {
    category: "Fire",
    label: "Melting Point",
    getValue: () => ">1000\u00B0C",
  },
  /* Acoustic */
  {
    category: "Acoustic",
    label: "NRC Rating",
    getValue: (p) => NRC_RATINGS[p.id],
    bestKey: "NRC Rating",
  },
  /* Physical */
  {
    category: "Physical",
    label: "Density Range",
    getValue: (p) => p.specs.density ?? "\u2014",
  },
  {
    category: "Physical",
    label: "Thickness Range",
    getValue: (p) => p.specs.thickness ?? "\u2014",
  },
  {
    category: "Physical",
    label: "Length",
    getValue: (p) => p.specs.length ?? "\u2014",
  },
  {
    category: "Physical",
    label: "Width",
    getValue: (p) => p.specs.width ?? "\u2014",
  },
  /* Mechanical */
  {
    category: "Mechanical",
    label: "Compressive Strength",
    getValue: (p) => COMPRESSIVE[p.id],
    bestKey: "Compressive Strength",
  },
  {
    category: "Mechanical",
    label: "Flexibility",
    getValue: (p) => FLEXIBILITY[p.id],
    bestKey: "Flexibility",
  },
  {
    category: "Mechanical",
    label: "Water Absorption",
    getValue: (p) => WATER_ABSORPTION[p.id],
    bestKey: "Water Absorption",
  },
  /* Standards */
  {
    category: "Standards",
    label: "BIS / ASTM Standards",
    getValue: (p) => p.specs.standards.join(", "),
    bestKey: "Standards",
  },
  /* Facings */
  {
    category: "Facings",
    label: "Available Facings",
    getValue: (p) =>
      p.specs.facings.length > 0 ? p.specs.facings.join(", ") : "N/A",
  },
];

/* Group rows by category */
function groupByCategory(rows: SpecRow[]) {
  const groups: { category: string; rows: SpecRow[] }[] = [];
  let current: { category: string; rows: SpecRow[] } | null = null;
  for (const row of rows) {
    if (!current || current.category !== row.category) {
      current = { category: row.category, rows: [] };
      groups.push(current);
    }
    current.rows.push(row);
  }
  return groups;
}

const specGroups = groupByCategory(specRows);

/* Check if all values match */
function allSame(values: string[]) {
  return values.every((v) => v === values[0]);
}

/* -------------------------------------------------------------------------- */
/*  Product toggle chip                                                       */
/* -------------------------------------------------------------------------- */

function ProductChip({
  product,
  active,
  onToggle,
  disabled,
}: {
  product: (typeof products)[0];
  active: boolean;
  onToggle: () => void;
  disabled: boolean;
}) {
  const color = PRODUCT_COLORS[product.id];

  return (
    <motion.button
      layout
      onClick={onToggle}
      disabled={disabled && !active}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium",
        "transition-all duration-300 cursor-pointer select-none",
        "border",
        active
          ? "text-white border-transparent shadow-lg"
          : "text-rhino-gray-600 border-rhino-gray-200 bg-white hover:border-rhino-gray-300",
        disabled && !active && "opacity-40 cursor-not-allowed",
      )}
      style={
        active
          ? { backgroundColor: color, borderColor: color }
          : undefined
      }
      whileHover={!disabled || active ? { scale: 1.05 } : undefined}
      whileTap={!disabled || active ? { scale: 0.97 } : undefined}
    >
      {PRODUCT_ICONS[product.id]}
      <span>{product.code}</span>
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="ml-1"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      )}
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Applications collapsible                                                  */
/* -------------------------------------------------------------------------- */

function ApplicationsList({
  applications,
}: {
  applications: string[];
}) {
  const [open, setOpen] = useState(false);
  const shown = open ? applications : applications.slice(0, 3);

  return (
    <div>
      <ul className="space-y-1">
        {shown.map((app) => (
          <li key={app} className="flex items-start gap-1.5 text-sm leading-snug">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rhino-orange" />
            {app}
          </li>
        ))}
      </ul>
      {applications.length > 3 && (
        <button
          onClick={() => setOpen(!open)}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-rhino-orange hover:underline cursor-pointer"
        >
          {open ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              +{applications.length - 3} more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Variant comparison bar                                                    */
/* -------------------------------------------------------------------------- */

function VariantBar({
  variant,
  delay,
}: {
  variant: (typeof productVariants)[0];
  delay: number;
}) {
  const statusLabel =
    variant.status === "available" ? "Available Now" : `Coming ${variant.status}`;
  const pricePositions: Record<string, string> = {
    elite: "Premium",
    enduro: "Balanced",
    "eco-green": "Greenest",
  };

  return (
    <BlurFade delay={delay} inView>
      <div className="rounded-2xl border border-rhino-gray-200 bg-white p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-rhino-gray-900">
              {variant.name}
            </h4>
            <p className="text-sm text-rhino-gray-500">{variant.tagline}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              variant.status === "available"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700",
            )}
          >
            {statusLabel}
          </span>
        </div>

        {/* Carbon reduction bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-rhino-gray-600">Carbon Reduction</span>
            <span className="font-semibold" style={{ color: variant.color }}>
              <NumberTicker value={variant.carbonReduction} delay={delay} />%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-rhino-gray-100">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: variant.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${variant.carbonReduction}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-rhino-gray-500">
          <span>
            Price Positioning:{" "}
            <strong className="text-rhino-gray-900">
              {pricePositions[variant.id]}
            </strong>
          </span>
        </div>
      </div>
    </BlurFade>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main compare client                                                       */
/* -------------------------------------------------------------------------- */

export function CompareClient() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "rsl",
    "rwm",
    "rbr",
  ]);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  const toggleProduct = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) {
          if (prev.length <= 2) return prev; // minimum 2
          return prev.filter((x) => x !== id);
        }
        if (prev.length >= 5) return prev; // maximum 5
        return [...prev, id];
      });
    },
    [],
  );

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.includes(p.id)),
    [selectedIds],
  );

  const colWidth = useMemo(() => {
    const count = selectedProducts.length;
    if (count <= 2) return "minmax(220px, 1fr)";
    if (count <= 3) return "minmax(200px, 1fr)";
    return "minmax(180px, 1fr)";
  }, [selectedProducts.length]);

  return (
    <main className="min-h-screen">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="section-dark relative overflow-hidden">
        <FloatingGridBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-10 sm:px-6 md:pb-12 lg:px-8">
          <BlurFade delay={0.1} inView>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-rhino-orange">
              Product Comparison Tool
            </p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Compare{" "}
              <span className="gradient-text-orange">Products</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <p className="mt-4 max-w-2xl text-lg text-rhino-gray-400">
              Side-by-side specifications for all Rhino insulation products.
              Select 2 to 5 products to compare their thermal, fire, acoustic,
              and mechanical properties.
            </p>
          </BlurFade>

          {/* Product selector chips */}
          <BlurFade delay={0.4} inView>
            <div className="mt-10">
              <p className="mb-3 text-sm text-rhino-gray-400">
                Select products to compare ({selectedIds.length}/5):
              </p>
              <LayoutGroup>
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence mode="popLayout">
                    {products.map((product) => (
                      <ProductChip
                        key={product.id}
                        product={product}
                        active={selectedIds.includes(product.id)}
                        onToggle={() => toggleProduct(product.id)}
                        disabled={
                          selectedIds.length >= 5 &&
                          !selectedIds.includes(product.id)
                        }
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </div>
          </BlurFade>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rhino-cream to-transparent" />
      </section>

      {/* ============================================================= */}
      {/*  COMPARISON TABLE                                              */}
      {/* ============================================================= */}
      <section className="section-light relative overflow-hidden py-10 lg:py-14">
        <FloatingParticlesBackground light />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Scrollable table */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
            <div
              className="inline-grid min-w-full"
              style={{
                gridTemplateColumns: `220px repeat(${selectedProducts.length}, ${colWidth})`,
              }}
            >
              {/* ---- Sticky header row ---- */}
              <div className="sticky top-0 z-20 bg-rhino-cream/80 backdrop-blur-sm border-b border-rhino-sand p-4">
                {/* empty corner */}
              </div>
              {selectedProducts.map((p) => (
                <div
                  key={`header-${p.id}`}
                  className={cn(
                    "sticky top-0 z-20 p-4 text-center",
                    "bg-rhino-cream/80 backdrop-blur-sm border-b border-rhino-sand",
                    "transition-colors duration-200",
                    hoveredCol === p.id && "bg-rhino-orange-pale/60",
                  )}
                  onMouseEnter={() => setHoveredCol(p.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${PRODUCT_COLORS[p.id]}20` }}
                  >
                    <span style={{ color: PRODUCT_COLORS[p.id] }}>
                      {PRODUCT_ICONS[p.id]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-rhino-gray-900">
                    {p.name}
                  </h3>
                  <p className="text-xs text-rhino-gray-500">{p.code}</p>
                </div>
              ))}

              {/* ---- Product image row ---- */}
              <div className="sticky left-0 z-10 flex items-center bg-rhino-cream px-4 py-3 text-xs font-semibold uppercase tracking-wider text-rhino-gray-500 border-b border-rhino-sand/50">
                Product
              </div>
              {selectedProducts.map((p) => (
                <div
                  key={`img-${p.id}`}
                  className={cn(
                    "flex items-center justify-center p-4 border-b border-rhino-sand/50",
                    "transition-colors duration-200",
                    hoveredCol === p.id && "bg-rhino-orange-pale/30",
                  )}
                  onMouseEnter={() => setHoveredCol(p.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-xl md:h-32">
                    <Image
                      src={PRODUCT_IMAGES[p.id]}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}

              {/* ---- Spec rows grouped by category ---- */}
              {specGroups.map((group, gi) => (
                <React.Fragment key={group.category}>
                  {/* Category header */}
                  <BlurFade
                    delay={0.05 * gi}
                    inView
                    className="sticky left-0 z-10 col-span-full"
                  >
                    <div className="bg-rhino-slate/5 px-4 py-2.5 border-b border-rhino-sand/50">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-rhino-orange">
                        {group.category}
                      </span>
                    </div>
                  </BlurFade>

                  {group.rows.map((row, ri) => {
                    const values = selectedProducts.map((p) =>
                      row.getValue(p),
                    );
                    const isSame = allSame(values);

                    return (
                      <React.Fragment key={row.label}>
                        {/* Label cell */}
                        <BlurFade
                          delay={0.02 * (gi * 4 + ri)}
                          inView
                          className="sticky left-0 z-10 flex items-center bg-rhino-cream px-4 py-3 border-b border-rhino-sand/30"
                        >
                          <span className="text-sm font-medium text-rhino-gray-700">
                            {row.label}
                          </span>
                        </BlurFade>

                        {/* Value cells */}
                        {selectedProducts.map((p) => {
                          const val = row.getValue(p);
                          const isBest =
                            row.bestKey &&
                            BEST_IN_CLASS[p.id]?.includes(row.bestKey);

                          return (
                            <div
                              key={`${row.label}-${p.id}`}
                              className={cn(
                                "flex items-center justify-center px-3 py-3 text-center text-sm border-b border-rhino-sand/30",
                                "transition-colors duration-200",
                                hoveredCol === p.id && "bg-rhino-orange-pale/30",
                                isSame && !isBest && "text-rhino-gray-400",
                                !isSame && !isBest && "text-rhino-gray-800 font-medium",
                                isBest && "text-rhino-gray-900 font-semibold",
                              )}
                              onMouseEnter={() => setHoveredCol(p.id)}
                              onMouseLeave={() => setHoveredCol(null)}
                            >
                              <span className="inline-flex items-center gap-1.5">
                                {val}
                                {isBest && (
                                  <Crown
                                    className="h-3.5 w-3.5 flex-shrink-0"
                                    style={{ color: PRODUCT_COLORS[p.id] }}
                                  />
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ))}

              {/* ---- Applications row (collapsible) ---- */}
              <BlurFade
                delay={0.3}
                inView
                className="sticky left-0 z-10 col-span-full"
              >
                <div className="bg-rhino-slate/5 px-4 py-2.5 border-b border-rhino-sand/50">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-rhino-orange">
                    Applications
                  </span>
                </div>
              </BlurFade>

              <div className="sticky left-0 z-10 flex items-start bg-rhino-cream px-4 py-4 border-b border-rhino-sand/30">
                <span className="text-sm font-medium text-rhino-gray-700">
                  Applications
                </span>
              </div>
              {selectedProducts.map((p) => (
                <div
                  key={`apps-${p.id}`}
                  className={cn(
                    "px-3 py-4 border-b border-rhino-sand/30",
                    "transition-colors duration-200",
                    hoveredCol === p.id && "bg-rhino-orange-pale/30",
                  )}
                  onMouseEnter={() => setHoveredCol(p.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <ApplicationsList applications={p.applications} />
                </div>
              ))}

              {/* ---- View Product links ---- */}
              <div className="sticky left-0 z-10 bg-rhino-cream px-4 py-6" />
              {selectedProducts.map((p) => (
                <div
                  key={`link-${p.id}`}
                  className={cn(
                    "flex items-center justify-center px-3 py-6",
                    "transition-colors duration-200",
                    hoveredCol === p.id && "bg-rhino-orange-pale/30",
                  )}
                  onMouseEnter={() => setHoveredCol(p.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-rhino-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-rhino-gray-800 transition-all hover:border-rhino-orange hover:text-rhino-orange hover:shadow-md"
                  >
                    View Product
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  VARIANT COMPARISON                                            */}
      {/* ============================================================= */}
      <section className="section-white relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rhino-orange">
              Sustainability Variants
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2 className="font-display text-3xl font-bold tracking-tight text-rhino-gray-900 sm:text-4xl">
              Elite vs Enduro vs Eco-Green
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-3 max-w-2xl text-rhino-gray-500">
              Every Rhino product is available in three sustainability tiers.
              Choose the right balance of performance, price, and environmental
              impact for your project.
            </p>
          </BlurFade>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {productVariants.map((v, i) => (
              <VariantBar key={v.id} variant={v} delay={0.2 + i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CTA                                                           */}
      {/* ============================================================= */}
      <section className="section-dark relative overflow-hidden py-20">
        <FloatingGridBackground />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <BlurFade delay={0.1} inView>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need help choosing?
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-lg text-rhino-gray-400">
              Our technical team can recommend the optimal product
              configuration for your specific application requirements.
            </p>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-rhino-orange-dark hover:shadow-lg hover:shadow-rhino-orange/20"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/tools/product-selector"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Product Selector Tool
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
