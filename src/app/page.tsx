"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostHeroSections } from "@/components/sections/home/post-hero-sections";


/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_FRAMES = 675;
const SCROLL_HEIGHT_PER_FRAME = 8; // px of scroll per frame
const SCROLL_HEIGHT = TOTAL_FRAMES * SCROLL_HEIGHT_PER_FRAME; // 5400px
const PRELOAD_THRESHOLD = 200; // min frames before unlocking scroll

/* -------------------------------------------------------------------------- */
/*  ScrollContent — content overlay that fades in/out at scroll positions      */
/* -------------------------------------------------------------------------- */

function ScrollContent({
  children,
  start,
  end,
  className,
  scrollYProgress,
}: {
  children: React.ReactNode;
  start: number;
  end: number;
  className?: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const fadeIn = Math.min(start + 0.03, (start + end) / 2);
  const fadeOut = Math.max(end - 0.03, (start + end) / 2);

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0],
  );

  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, pointerEvents: "none" }}
      className={cn(
        "fixed inset-0 z-10 flex items-center justify-center px-6 md:px-12 xl:px-20",
        className,
      )}
    >
      <motion.div style={{ pointerEvents }}>{children}</motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product card (glassmorphism)                                               */
/* -------------------------------------------------------------------------- */

function ProductCard({
  href,
  code,
  name,
}: {
  href: string;
  code: string;
  name: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:border-rhino-orange/50 hover:bg-white/15 hover:scale-105 md:px-6 md:py-5"
    >
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-rhino-orange">
        {code}
      </span>
      <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white md:text-base">
        {name}
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Variant mini-card                                                          */
/* -------------------------------------------------------------------------- */

function VariantCard({
  name,
  reduction,
  color,
}: {
  name: string;
  reduction: number;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-5 py-5 backdrop-blur-md md:px-8 md:py-6"
      style={{ borderColor: `${color}40` }}
    >
      <span
        className="font-display text-3xl font-bold md:text-4xl"
        style={{ color }}
      >
        {reduction}%
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-white/60">
        {name}
      </span>
      <span className="text-xs text-white/40">CO&#x2082; Reduction</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  OpeningContent — visible immediately, fades out on scroll                  */
/* -------------------------------------------------------------------------- */

function OpeningContent({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [hidden, setHidden] = useState(false);
  const opacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHidden(v > 0.01);
  });

  if (hidden) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-white px-6 md:px-12 xl:px-20"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-5 text-center">
        {/* Logo with staggered entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/rhino-logo.svg"
            alt="Rhino Rock Mineral Wool"
            className="h-12 w-auto md:h-16 lg:h-20"
          />
        </motion.div>

        {/* Tagline with letter-spacing animation */}
        <motion.p
          className="font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-[#666] md:text-sm md:tracking-[0.4em]"
          initial={{ opacity: 0, y: 15, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          India&apos;s Greenest Rock Mineral Wool
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-rhino-orange to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#888]">
            Scroll to explore
          </span>
          <div className="h-12 w-[1px] overflow-hidden bg-[#e0e0e0]">
            <div className="h-full w-full animate-pulse-down bg-[#999]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Loading screen                                                             */
/* -------------------------------------------------------------------------- */

function LoadingScreen({
  progress,
  visible,
}: {
  progress: number;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white",
        !visible && "pointer-events-none",
      )}
    >
      {/* Logo — same as header logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logos/rhino-logo.svg"
        alt="Rhino Rock Mineral Wool"
        className="mb-10 h-10 w-auto md:h-14"
      />

      {/* Progress bar */}
      <div className="w-48 md:w-64">
        <div className="mb-3 h-[2px] w-full overflow-hidden rounded-full bg-[#eee]">
          <motion.div
            className="h-full rounded-full bg-rhino-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="text-center font-mono text-xs tracking-wider text-[#666]">
          Loading experience&hellip; {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Homepage                                                                   */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastDrawnFrame = useRef(-1);

  /* ---- Detect mobile for reduced frame loading ---- */
  const isMobileRef = useRef(false);
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  /* ---- Preload all frames ---- */
  useEffect(() => {
    const mobile = isMobileRef.current;
    const step = mobile ? 3 : 1;
    const totalToLoad = mobile
      ? Math.ceil(TOTAL_FRAMES / step)
      : TOTAL_FRAMES;

    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      const img = new Image();
      img.src = `/images/frames/frame-${String(i).padStart(4, "0")}.jpg`;

      img.onload = () => {
        loadedCountRef.current += 1;
        const pct = (loadedCountRef.current / totalToLoad) * 100;
        setLoadProgress(pct);

        if (
          loadedCountRef.current >= Math.min(PRELOAD_THRESHOLD, totalToLoad)
        ) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCountRef.current += 1;
        const pct = (loadedCountRef.current / totalToLoad) * 100;
        setLoadProgress(pct);
      };

      // Store at every index for mobile — nearest frame mapping
      if (mobile) {
        // Fill in the gaps so any frame index maps to the closest loaded image
        for (
          let fill = i - 1;
          fill < Math.min(i - 1 + step, TOTAL_FRAMES);
          fill++
        ) {
          framesRef.current[fill] = img;
        }
      } else {
        framesRef.current[i - 1] = img;
      }
    }
  }, []);

  /* ---- Canvas resize helper ---- */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /* ---- Draw a frame with cover-fit ---- */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    // Cover-fit calculation
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ---- Scroll → frame mapping ---- */
  const { scrollYProgress } = useScroll();

  const currentFrame = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1],
  );

  useMotionValueEvent(currentFrame, "change", (latest) => {
    const index = Math.round(latest);
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    if (clamped !== lastDrawnFrame.current) {
      lastDrawnFrame.current = clamped;
      drawFrame(clamped);
    }
  });

  /* ---- Draw first frame once loaded ---- */
  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure canvas is sized
      requestAnimationFrame(() => {
        drawFrame(0);
      });
    }
  }, [isLoaded, drawFrame]);

  /* ---- Lock scroll until loaded ---- */
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  /* ---- Snap scroll to top when scrolling back near the start ---- */
  useEffect(() => {
    if (!isLoaded) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // If user scrolls back to near the top (within 50px), snap to 0
        if (window.scrollY > 0 && window.scrollY < 50) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoaded]);

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen progress={loadProgress} visible={!isLoaded} />

      {/* Scroll height spacer */}
      <div style={{ height: `${SCROLL_HEIGHT}px` }} />

      {/* Fixed canvas — the video frame viewport */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
        style={{ imageRendering: "auto" }}
      />

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/30" />

      {/* ================================================================== */}
      {/*  CONTENT OVERLAYS                                                   */}
      {/* ================================================================== */}

      {/* --- 0-5% — OPENING: Logo + tagline (visible immediately) --- */}
      <OpeningContent scrollYProgress={scrollYProgress} />

      {/* --- 5-18% — THE PLANT: Aerial footage --- */}
      <ScrollContent
        start={0.05}
        end={0.2}
        scrollYProgress={scrollYProgress}
        className="items-end justify-start pb-24 md:pb-32"
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-rhino-orange" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
              A Sarda Group Venture
            </p>
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl xl:text-8xl">
            281 Acres of
            <br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          <p className="mt-4 text-sm font-medium tracking-wide text-white/40 md:text-base">
            Vizianagaram, Andhra Pradesh
          </p>
        </div>
      </ScrollContent>

      {/* --- 20-28% — THE HERITAGE: 90 years + stats --- */}
      <ScrollContent
        start={0.2}
        end={0.32}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-8"
      >
        <div className="text-center">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
            Heritage
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            90 Years of
            <br />
            Industrial Excellence
          </h2>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-4 md:gap-10">
            {[
              { value: "\u20B96,000 Cr", label: "Revenue" },
              { value: "8,000+", label: "Workforce" },
              { value: "60+", label: "Countries" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <span className="stat-number font-display text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollContent>

      {/* --- 33-48% — THE FURNACE: ZERO FOSSIL FUELS --- */}
      <ScrollContent
        start={0.33}
        end={0.48}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-4"
      >
        <div className="text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-rhino-orange/80 md:text-xs">
            Patent Pending Technology
          </p>
          <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">ZERO</span>
            <br />
            <span className="bg-gradient-to-r from-rhino-orange to-rhino-orange-light bg-clip-text text-transparent">FOSSIL FUELS</span>
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-6 text-white/40">
            <span className="text-xs font-medium uppercase tracking-wider">Zero SO&#x2082;</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-wider">Zero NO&#x2093;</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-wider">Zero Coke</span>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50 md:text-base">
            India&apos;s first electric smelter for rock mineral wool
          </p>
        </div>
      </ScrollContent>

      {/* --- 40-50% — THE TEMPERATURE: 1800C --- */}
      <ScrollContent
        start={0.42}
        end={0.55}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-3"
      >
        <div className="text-center">
          <h2
            className="font-display text-[60px] font-black leading-none sm:text-[80px] md:text-[160px] lg:text-[200px]"
            style={{
              background: "linear-gradient(180deg, #FF8800 0%, #FF4400 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            1800&deg;C
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/50 md:text-base">
            Raw volcanic rock transformed into
            <br />
            ultra-fine insulation fibers
          </p>
        </div>
      </ScrollContent>

      {/* --- 50-58% — THE PRODUCT: Three Variants --- */}
      <ScrollContent
        start={0.52}
        end={0.62}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-8"
      >
        <div className="text-center">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
            Innovation
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Three Variants. One Revolution.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <VariantCard name="Elite" reduction={25} color="#FF6600" />
            <VariantCard name="Enduro" reduction={45} color="#4A4A4A" />
            <VariantCard name="Eco-Green" reduction={65} color="#00B894" />
          </div>
        </div>
      </ScrollContent>

      {/* --- 60-75% — THE SUSTAINABILITY: 65% less CO2 --- */}
      <ScrollContent
        start={0.62}
        end={0.75}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-4"
      >
        <div className="text-center">
          <h2
            className="font-display text-[60px] font-black leading-none sm:text-[80px] md:text-[140px] lg:text-[180px]"
            style={{
              background:
                "linear-gradient(180deg, #2DB86E 0%, #1B7A4A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            65%
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base font-medium text-white/70 md:text-lg">
            less CO&#x2082; than conventional insulation
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/40 md:text-base">
            Zero SO&#x2082; &middot; Zero NO&#x2093; &middot; Zero Coke
            &middot; Zero Coal
          </p>
        </div>
      </ScrollContent>

      {/* --- 75-85% — THE PRODUCTS: Explore Our Range --- */}
      <ScrollContent
        start={0.75}
        end={0.87}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-8"
      >
        <div className="text-center">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange md:text-xs">
            Products
          </p>
          <h2 className="mb-8 font-display text-3xl font-bold text-white md:text-5xl">
            Explore Our Range
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <ProductCard href="/products/rhino-slabs" code="RSL" name="Slabs" />
            <ProductCard
              href="/products/rhino-wired-matts"
              code="RWM"
              name="Wired Matts"
            />
            <ProductCard
              href="/products/rhino-building-rolls"
              code="RBR"
              name="Building Rolls"
            />
            <ProductCard
              href="/products/rhino-rockarmor"
              code="RRA"
              name="RockArmor"
            />
            <ProductCard
              href="/products/rhino-loose-wool"
              code="RLW"
              name="Loose Wool"
            />
          </div>
        </div>
      </ScrollContent>

      {/* --- 85-95% — THE CTA: Witness the Revolution --- */}
      <ScrollContent
        start={0.85}
        end={0.96}
        scrollYProgress={scrollYProgress}
        className="flex-col gap-6"
      >
        <div className="text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-white/40 md:text-xs">
            Ready to Transform?
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Witness the
            <br />
            <span className="bg-gradient-to-r from-rhino-orange to-rhino-orange-light bg-clip-text text-transparent">
              Revolution
            </span>
          </h2>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/technology"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rhino-orange to-rhino-orange-light px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rhino-orange/30 transition-all duration-500 hover:shadow-xl hover:shadow-rhino-orange/40 hover:scale-[1.04] hover:gap-3 active:scale-[0.98] md:px-10 md:py-4 md:text-base"
            >
              Explore Breakthroughs
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:bg-white/10 hover:scale-[1.04] hover:gap-3 active:scale-[0.98] md:px-10 md:py-4 md:text-base"
            >
              Get a Quote
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </div>
      </ScrollContent>

      {/* ================================================================== */}
      {/*  POST-HERO SECTIONS (after scroll animation ends)                   */}
      {/* ================================================================== */}
      <PostHeroSections />
    </>
  );
}
