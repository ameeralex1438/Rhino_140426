"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(value === 0 ? formatNumber(0) : "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const counter = { val: 0 };
          gsap.to(counter, {
            val: value,
            duration,
            ease: "power2.out",
            onUpdate() {
              setDisplay(formatNumber(counter.val));
            },
            onComplete() {
              setDisplay(formatNumber(value));
            },
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
