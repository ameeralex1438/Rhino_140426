"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const VARIANTS = [
  {
    name: "Elite",
    fullName: "Rhino Elite",
    color: "#FF6600",
    tagline: "Performance Excellence. Sustainability Leadership.",
    carbonReduction: 25,
    badge: "Premium",
    href: "/products/rhino-slabs",
    image: "/images/products/elite-nobg.png",
    description:
      "Highest thermal performance for demanding industrial applications. Manufactured via India\u2019s first Electric Arc Furnace.",
    leftSpecs: [
      { value: "750\u00B0C", label: "Max Service Temp" },
      { value: "A1", label: "Euro Fire Class" },
      { value: "40\u2013200", label: "Density kg/m\u00B3" },
    ],
    rightSpecs: [
      { value: "\u22640.037", label: "W/m\u00B7K Conductivity" },
      { value: "NRC 1.0", label: "Acoustic Rating" },
      { value: "\u22641%", label: "Water Absorption" },
    ],
  },
  {
    name: "Enduro",
    fullName: "Rhino Enduro",
    color: "#4A4A4A",
    tagline: "Resilient Composition. Minimized Impact.",
    carbonReduction: 45,
    badge: "Balanced",
    href: "/products/rhino-wired-matts",
    image: "/images/products/enduro-nobg.png",
    description:
      "The versatile all-rounder balancing performance and sustainability. Vibration resistant, thermally stable.",
    leftSpecs: [
      { value: "650\u00B0C", label: "Max Service Temp" },
      { value: "A1", label: "Euro Fire Class" },
      { value: "70\u2013150", label: "Density kg/m\u00B3" },
    ],
    rightSpecs: [
      { value: "\u22640.037", label: "W/m\u00B7K Conductivity" },
      { value: "High", label: "Flexibility Rating" },
      { value: "780\u00B0C", label: "Thermal Stability" },
    ],
  },
  {
    name: "Eco-Green",
    fullName: "Rhino Eco-Green",
    color: "#1a9d55",
    tagline: "65% Less Carbon. 100% Future Ready.",
    carbonReduction: 65,
    badge: "Greenest",
    href: "/products/rhino-building-rolls",
    image: "/images/products/ecogreen-nobg.png",
    description:
      "India\u2019s lowest carbon insulation. Built for net-zero buildings, IGBC & GRIHA certified projects.",
    leftSpecs: [
      { value: "IGBC", label: "Compliant" },
      { value: "A1", label: "Euro Fire Class" },
      { value: "40\u201396", label: "Density kg/m\u00B3" },
    ],
    rightSpecs: [
      { value: "\u22640.037", label: "W/m\u00B7K Conductivity" },
      { value: "NRC 0.90", label: "Acoustic Rating" },
      { value: "65%", label: "Less CO\u2082" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Single variant layer                                                       */
/* -------------------------------------------------------------------------- */

function VariantLayer({
  variant,
  active,
  mouseX,
  mouseY,
}: {
  variant: (typeof VARIANTS)[number];
  active: boolean;
  mouseX: number;
  mouseY: number;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (active) setLoaded(true);
  }, [active]);

  /* Transition helpers */
  const ease = "cubic-bezier(.16,1,.3,1)";

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity .3s ease",
        pointerEvents: active ? "auto" : "none",
        willChange: "opacity",
      }}
    >
      {/* =========== TOP: Badge + Name + Tagline =========== */}
      <div className="flex shrink-0 flex-col items-center text-center pt-3 md:pt-4">
        <span
          className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-xs"
          style={{
            backgroundColor: variant.color,
            opacity: active ? 1 : 0,
            transform: active ? "scale(1) translateY(0)" : "scale(0.85) translateY(8px)",
            transition: `all .4s ${ease} 50ms`,
          }}
        >
          {variant.badge}
        </span>
        <h3
          className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#111] md:text-4xl lg:text-[2.8rem]"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(10px)",
            transition: `all .5s ${ease} 100ms`,
          }}
        >
          {variant.fullName}
        </h3>
        <p
          className="mt-0.5 text-xs text-[#666] md:text-[13px]"
          style={{
            opacity: active ? 1 : 0,
            transition: `opacity .4s ${ease} 180ms`,
          }}
        >
          {variant.tagline}
        </p>
      </div>

      {/* =========== MIDDLE: Specs ── Lines ── Product ── Lines ── Specs =========== */}
      <div className="flex flex-1 min-h-0 items-center justify-center px-6 md:px-10 lg:px-14">
        <div className="flex w-full max-w-7xl items-center">

          {/* ---- LEFT: Specs + connecting lines ---- */}
          <div className="hidden w-[30%] flex-col gap-6 md:flex lg:gap-8 xl:gap-10">
            {variant.leftSpecs.map((spec, i) => (
              <div key={spec.label} className="flex items-center gap-0">
                {/* Spec text (right-aligned) */}
                <div
                  className="flex flex-1 flex-col items-end text-right pr-3"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateX(0)" : "translateX(-15px)",
                    transition: `all .4s ${ease} ${550 + i * 80}ms`,
                  }}
                >
                  <span className="font-display text-2xl font-bold lg:text-3xl xl:text-4xl" style={{ color: variant.color }}>
                    {spec.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#777] lg:text-xs">
                    {spec.label}
                  </span>
                </div>
                {/* Connecting line (grows from right → left, i.e. from product side) */}
                <div className="flex items-center">
                  <div
                    className="h-px w-10 origin-right lg:w-14 xl:w-20"
                    style={{
                      backgroundColor: `${variant.color}40`,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transition: `transform .5s ${ease} ${350 + i * 80}ms`,
                    }}
                  />
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: variant.color,
                      opacity: active ? 1 : 0,
                      transform: active ? "scale(1)" : "scale(0)",
                      transition: `all .3s ${ease} ${320 + i * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ---- CENTER: Product image ---- */}
          <div className="relative flex w-full shrink-0 items-center justify-center md:w-[40%]">
            {/* Colored glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                background: `radial-gradient(ellipse, ${variant.color}15 0%, ${variant.color}05 60%, transparent 70%)`,
                width: "160%",
                height: "160%",
                opacity: active ? 1 : 0,
                transition: `opacity .6s ease 200ms`,
              }}
            />
            {/* Image — drops from top */}
            <div
              style={{
                transform: active
                  ? `perspective(1200px) rotateY(${mouseX * 4}deg) rotateX(${-mouseY * 2}deg) translateY(0)`
                  : "perspective(1200px) translateY(-120px)",
                opacity: active ? 1 : 0,
                transition: `all .7s ${ease} 50ms`,
              }}
            >
              {loaded && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={variant.image}
                  alt={variant.fullName}
                  loading="lazy"
                  decoding="async"
                  className="relative h-[32vh] w-auto object-contain md:h-[28vh] lg:h-[34vh]"
                  style={{ filter: `drop-shadow(0 16px 32px ${variant.color}1a)`, willChange: "transform" }}
                />
              )}
            </div>
          </div>

          {/* ---- RIGHT: Connecting lines + Specs ---- */}
          <div className="hidden w-[30%] flex-col gap-6 md:flex lg:gap-8 xl:gap-10">
            {variant.rightSpecs.map((spec, i) => (
              <div key={spec.label} className="flex items-center gap-0">
                {/* Connecting line (grows from left → right, i.e. from product side) */}
                <div className="flex items-center">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: variant.color,
                      opacity: active ? 1 : 0,
                      transform: active ? "scale(1)" : "scale(0)",
                      transition: `all .3s ${ease} ${320 + i * 80}ms`,
                    }}
                  />
                  <div
                    className="h-px w-10 origin-left lg:w-14 xl:w-20"
                    style={{
                      backgroundColor: `${variant.color}40`,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transition: `transform .5s ${ease} ${350 + i * 80}ms`,
                    }}
                  />
                </div>
                {/* Spec text (left-aligned) */}
                <div
                  className="flex flex-1 flex-col items-start pl-3"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateX(0)" : "translateX(15px)",
                    transition: `all .4s ${ease} ${550 + i * 80}ms`,
                  }}
                >
                  <span className="font-display text-2xl font-bold lg:text-3xl xl:text-4xl" style={{ color: variant.color }}>
                    {spec.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#777] lg:text-xs">
                    {spec.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Mobile specs ---- */}
      <div
        className="flex shrink-0 justify-center px-4 md:hidden"
        style={{
          opacity: active ? 1 : 0,
          transition: `opacity .4s ${ease} 400ms`,
        }}
      >
        <div className="grid grid-cols-3 gap-6">
          {[...variant.leftSpecs, ...variant.rightSpecs].slice(0, 3).map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="font-display text-base font-bold" style={{ color: variant.color }}>{s.value}</span>
              <span className="mt-0.5 text-[9px] uppercase tracking-wider text-[#777]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =========== BOTTOM: Description + CO₂ + CTA =========== */}
      <div
        className="flex shrink-0 flex-col items-center gap-2 px-6 pt-2 pb-8 md:gap-2.5 md:pt-4 md:pb-10"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(12px)",
          transition: `all .5s ${ease} 500ms`,
        }}
      >
        <p className="max-w-xs text-center text-xs leading-relaxed text-[#555] md:max-w-sm md:text-sm">
          {variant.description}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#888]">CO&#x2082;</span>
          <div className="h-1.5 w-32 overflow-hidden rounded-full md:w-40" style={{ backgroundColor: `${variant.color}25` }}>
            <div
              className="h-full rounded-full"
              style={{
                background: variant.color,
                width: active ? `${100 - variant.carbonReduction}%` : "100%",
                transition: `width .8s ${ease} .6s`,
              }}
            />
          </div>
          <span className="font-mono text-xs font-bold md:text-sm" style={{ color: variant.color }}>
            -{variant.carbonReduction}%
          </span>
        </div>

        <Link
          href={variant.href}
          className="group inline-flex items-center gap-2 rounded-full border-2 px-5 py-1.5 text-xs font-semibold transition-all duration-300 hover:text-white md:px-6 md:py-2 md:text-sm"
          style={{ color: variant.color, borderColor: variant.color }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = variant.color;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = variant.color;
          }}
        >
          Explore {variant.name}
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main section                                                               */
/* -------------------------------------------------------------------------- */

export function VariantsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(-1); // -1 = nothing visible yet
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const prevIdx = useRef(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v <= 0.005 || v >= 0.99) {
      /* Section hasn't been scrolled into yet OR fully scrolled past — hide everything */
      if (prevIdx.current !== -1) {
        prevIdx.current = -1;
        setActiveIdx(-1);
      }
      return;
    }
    const idx = Math.min(2, Math.floor(Math.max(0, v) * 3));
    if (idx !== prevIdx.current) {
      prevIdx.current = idx;
      setActiveIdx(idx);
    }
  });

  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice) return;
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, [isTouchDevice]);

  return (
    <section ref={sectionRef} className="relative h-[180vh] md:h-[300vh]">
      <div
        className="sticky top-0 flex h-dvh flex-col items-center bg-white"
        style={{ willChange: "transform" }}
        onMouseMove={handleMouseMove}
      >
        {/* FIXED SECTION HEADER */}
        <div className="flex w-full shrink-0 flex-col items-center pt-16 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-rhino-orange md:text-xs">
            Three Groundbreaking Variants
          </p>
          <h2 className="mt-1 text-center font-display text-xl font-bold tracking-tight text-[#111] md:text-3xl lg:text-4xl">
            Choose Your Revolution
          </h2>
        </div>

        {/* PRODUCT AREA — stacked layers */}
        <div className="relative flex w-full flex-1 min-h-0 mt-2 md:mt-3">
          {VARIANTS.map((v, idx) => (
            <VariantLayer
              key={v.name}
              variant={v}
              active={idx === activeIdx}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
