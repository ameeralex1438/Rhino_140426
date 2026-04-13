"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ---------- stat data ---------- */
const stripStats = [
  { value: 7, suffix: "+", label: "Years of R&D" },
  { value: 65, suffix: "%", label: "Less CO\u2082" },
  { value: 1000, suffix: "\u00B0C+", label: "Fire Resistance" },
  { value: 60, suffix: "+", label: "Countries" },
] as const;

/* ---------- inline count-up hook ---------- */
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [start]);

  return { ref, count };
}

/* ---------- single stat cell ---------- */
function StatCell({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-10 md:py-14",
        /* 2x2 grid borders on mobile */
        index < 2 && "border-b border-rhino-sand/60 md:border-b-0",
        index % 2 === 0 && "border-r border-rhino-sand/60 md:border-r-0",
        /* desktop vertical dividers */
        index !== stripStats.length - 1 &&
          "md:border-r md:border-rhino-sand/60",
      )}
    >
      {/* number */}
      <div className="relative">
        <span className="font-display text-5xl font-bold text-rhino-gray-900 md:text-7xl">
          {count}
          {suffix}
        </span>
        {/* orange accent underline */}
        <div
          className="mx-auto mt-2 h-[2px] w-10 rounded-full"
          style={{ backgroundColor: "#E85D04" }}
        />
      </div>

      {/* label */}
      <span className="mt-1 text-sm uppercase tracking-widest text-rhino-gray-500">
        {label}
      </span>
    </div>
  );
}

/* ---------- main component ---------- */
export function StatsStrip() {
  return (
    <section className="relative overflow-hidden">
      {/* background: volcanic rock texture behind cream overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/volcanic-rock.avif"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* cream overlay at 92% opacity */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(250, 251, 247, 0.92)" }}
        />
      </div>

      {/* stat grid */}
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
        {stripStats.map((stat, i) => (
          <StatCell
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
