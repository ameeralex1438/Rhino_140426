"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  INTRO OVERLAY — Rhino silhouette reveal (like the live site)              */
/* -------------------------------------------------------------------------- */

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete,
      });

      /* 0-0.6s: Rhino silhouette fades in at center — large, dramatic */
      tl.fromTo(
        ".intro-rhino-silhouette",
        { opacity: 0, scale: 1.1 },
        { opacity: 0.15, scale: 1, duration: 1.2, ease: "power2.out" },
        0.4
      );

      /* 0.8-1.8s: Logo fades in over the silhouette */
      tl.fromTo(
        ".intro-logo",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
        1.0
      );

      /* 1.2-2s: Tagline text below logo */
      tl.fromTo(
        ".intro-tagline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.6
      );

      /* 2-2.5s: Line expands */
      tl.fromTo(
        ".intro-line",
        { width: 0, opacity: 0 },
        { width: 160, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        2.0
      );

      /* 2.2-2.8s: "A Sarda Group Venture" and "Est. 1930" */
      tl.fromTo(
        ".intro-label-above",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        2.3
      );
      tl.fromTo(
        ".intro-label-below",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        2.3
      );

      /* 3.2-3.8s: Entire overlay fades out */
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.6, ease: "power2.inOut" },
        3.2
      );
    },
    { scope: overlayRef }
  );

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#000000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Rhino silhouette — their actual logo enlarged as watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logos/rhino-main-logo.svg"
        alt=""
        aria-hidden="true"
        className="intro-rhino-silhouette absolute h-[40vh] w-auto max-h-[300px] md:h-[50vh] md:max-h-[400px]"
        style={{ opacity: 0, filter: "brightness(0) invert(1)" }}
      />

      {/* Logo + tagline centered */}
      <div className="relative z-10 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/rhino-main-logo.svg"
          alt="Rhino Rock Mineral Wool"
          className="intro-logo h-14 w-auto md:h-20 lg:h-24"
          style={{ opacity: 0, filter: "brightness(0) invert(1)" }}
        />

        <p
          className="intro-tagline mt-4 text-xs font-light tracking-[0.4em] uppercase text-white/60 md:text-xs"
          style={{ opacity: 0 }}
        >
          India&apos;s Greenest Rock Mineral Wool
        </p>

        {/* Line + labels */}
        <div className="mt-8 flex flex-col items-center gap-2.5">
          <span
            className="intro-label-above text-xs font-light tracking-[0.5em] uppercase text-white/40"
            style={{ opacity: 0 }}
          >
            A Sarda Group Venture
          </span>
          <span
            className="intro-line block h-px bg-white/40"
            style={{ width: 0 }}
          />
          <span
            className="intro-label-below text-xs font-light tracking-[0.5em] uppercase text-white/40"
            style={{ opacity: 0 }}
          >
            Est. 1930
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO SECTION — Video background with Rhino logo                           */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [introComplete, setIntroComplete] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);

  /* ---- Lock body scroll during intro ---- */
  useEffect(() => {
    if (!introComplete) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [introComplete]);

  /* ---- Ensure video plays ---- */
  useEffect(() => {
    if (introComplete && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [introComplete]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /* ---- Scroll parallax ---- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  /* ---- GSAP hero text entrance ---- */
  useGSAP(
    () => {
      if (!introComplete || heroAnimated) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setHeroAnimated(true),
      });

      tl.fromTo(
        ".hero-logo",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      );
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );
      tl.fromTo(
        ".hero-headline-line",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.15,
        },
        0.6
      );
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        1.2
      );
      tl.fromTo(
        ".hero-bottom",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.5
      );
      tl.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.6
      );
    },
    { scope: sectionRef, dependencies: [introComplete] }
  );

  return (
    <>
      {/* ---- INTRO OVERLAY ---- */}
      <AnimatePresence>
        {!introComplete && (
          <IntroOverlay onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ---- VIDEO HERO ---- */}
      <section
        ref={sectionRef}
        className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Video background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/video/hero-poster.jpg"
            className="h-full w-full object-cover"
            style={{ minHeight: "115%", minWidth: "100%" }}
          >
            <source src="/images/video/hero-loop.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%),
              linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.7) 100%)
            `,
          }}
        />

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Noise */}
        <div className="noise pointer-events-none absolute inset-0 z-[3]" />

        {/* Content */}
        <motion.div
          ref={contentRef}
          className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-6 text-center md:px-12 xl:px-20"
          style={{ opacity: contentOpacity, scale: contentScale }}
        >
          {/* Rhino Logo — PROMINENT */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/rhino-main-logo.svg"
            alt="Rhino Rock Mineral Wool"
            className="hero-logo mb-8 h-12 w-auto md:h-16 lg:h-20"
            style={{ opacity: 0, filter: "brightness(0) invert(1)" }}
          />

          {/* Label */}
          <span
            className="hero-label mb-6 inline-block text-xs font-medium tracking-[0.3em] uppercase text-[#FF8800] md:mb-8"
            style={{ opacity: 0 }}
          >
            India&apos;s Greenest Rock Mineral Wool
          </span>

          {/* Headline */}
          <h1 className="font-display text-5xl font-bold leading-[1.0] tracking-[-0.02em] md:text-7xl lg:text-[6.5rem]">
            <span
              className="hero-headline-line block text-white"
              style={{ opacity: 0 }}
            >
              Witness the
            </span>
            <span
              className="hero-headline-line gradient-text-orange mt-1 block"
              style={{ opacity: 0 }}
            >
              Revolution
            </span>
          </h1>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/products"
              className="hero-cta inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-rhino-orange/40 md:text-lg"
              style={{
                opacity: 0,
                background: "linear-gradient(to right, var(--color-rhino-orange), #FF8800)",
                borderRadius: "25px",
              }}
            >
              Explore Breakthroughs
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-12 xl:px-20"
          style={{ opacity: contentOpacity }}
        >
          <div className="flex items-end justify-between">
            <span
              className="hero-bottom hidden text-xs font-light tracking-[0.15em] text-white/40 md:block"
              style={{ opacity: 0 }}
            >
              ISO 9001 &nbsp;|&nbsp; ISO 14001 &nbsp;|&nbsp; ISO 45001 &nbsp;|&nbsp; ISO 50001
            </span>

            <div
              className="hero-scroll-indicator flex flex-col items-center gap-3"
              style={{ opacity: 0 }}
            >
              <span
                className="text-xs font-light tracking-[0.3em] text-white/40"
                style={{ writingMode: "vertical-rl" as const }}
              >
                SCROLL
              </span>
              <span className="block h-10 w-px overflow-hidden bg-white/10">
                <span className="block h-full w-full animate-pulse-down bg-white/60" />
              </span>
              <ChevronDown className="h-3 w-3 text-white/30" />
            </div>

            {/* Glass-morphism stats bar */}
            <div className="hero-bottom hidden flex-wrap justify-end gap-3 md:flex md:gap-4" style={{ opacity: 0 }}>
              {[
                { value: "65%", label: "Less Carbon" },
                { value: "0%", label: "Fossil Fuels" },
                { value: "7yr", label: "R&D" },
                { value: "3", label: "Variants" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 px-5 py-3 text-center md:px-6 md:py-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <p className="font-display text-xl font-bold text-white md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/60 md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
