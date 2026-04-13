"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

/* -------------------------------------------------------------------------- */
/*  Custom Cursor                                                              */
/* -------------------------------------------------------------------------- */

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default true to prevent flash
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const hoveredRef = useRef(false);
  const rafRef = useRef<number>(0);

  // Detect touch device
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  // GSAP interpolation loop for smooth outer circle
  const animate = useCallback(() => {
    if (!outerRef.current || !dotRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth lerp for outer circle (delayed follow)
    const lerp = 0.15;
    posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

    outerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;

    // Dot follows exactly (1:1)
    dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Mouse move handler
  const onMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current.x = e.clientX;
    targetRef.current.y = e.clientY;
    setVisible(true);
  }, []);

  // Mouse leave/enter for document
  const onMouseLeave = useCallback(() => setVisible(false), []);
  const onMouseEnter = useCallback(() => setVisible(true), []);

  // Click pulse
  const onMouseDown = useCallback(() => {
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      scale: 0.8,
      duration: 0.1,
      ease: "power2.in",
    });
  }, []);

  const onMouseUp = useCallback(() => {
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      scale: hoveredRef.current ? 0 : 1,
      opacity: hoveredRef.current ? 0 : 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  // Hover handlers for interactive elements
  const onElementEnter = useCallback(() => {
    hoveredRef.current = true;
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, []);

  const onElementLeave = useCallback(() => {
    hoveredRef.current = false;
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const onImageEnter = useCallback(() => {
    hoveredRef.current = true;
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, []);

  // Setup all event listeners
  useEffect(() => {
    if (isTouch || typeof window === "undefined") return;

    // Hide default cursor globally
    document.body.classList.add("cursor-none");
    document.documentElement.style.cursor = "none";

    // Global mouse tracking
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Attach hover listeners to interactive elements
    const cursorOuter = outerRef.current;
    const cursorDot = dotRef.current;
    const isCursorEl = (el: Element) =>
      el === cursorOuter || el === cursorDot || cursorOuter?.contains(el) || cursorDot?.contains(el);

    const attachListeners = () => {
      // Links, buttons, and elements with data-cursor="pointer"
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], [role="button"], input[type="submit"]',
      );
      interactiveElements.forEach((el) => {
        if (isCursorEl(el)) return;
        el.addEventListener("mouseenter", onElementEnter);
        el.addEventListener("mouseleave", onElementLeave);
      });

      // Images with data-cursor="view"
      const imageElements = document.querySelectorAll(
        'img:not([data-cursor-ignore]), [data-cursor="view"]',
      );
      imageElements.forEach((el) => {
        if (isCursorEl(el)) return;
        el.addEventListener("mouseenter", onImageEnter);
        el.addEventListener("mouseleave", onElementLeave);
      });

      return { interactiveElements, imageElements };
    };

    let refs = attachListeners();

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      // Clean up old listeners
      refs.interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementEnter);
        el.removeEventListener("mouseleave", onElementLeave);
      });
      refs.imageElements.forEach((el) => {
        el.removeEventListener("mouseenter", onImageEnter);
        el.removeEventListener("mouseleave", onElementLeave);
      });
      // Re-attach
      refs = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("cursor-none");
      document.documentElement.style.cursor = "";

      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      cancelAnimationFrame(rafRef.current);
      observer.disconnect();

      refs.interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementEnter);
        el.removeEventListener("mouseleave", onElementLeave);
      });
      refs.imageElements.forEach((el) => {
        el.removeEventListener("mouseenter", onImageEnter);
        el.removeEventListener("mouseleave", onElementLeave);
      });
    };
  }, [
    isTouch,
    animate,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    onMouseDown,
    onMouseUp,
    onElementEnter,
    onElementLeave,
    onImageEnter,
  ]);

  // Don't render on server or touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Outer — Rhino favicon, smooth delayed follow */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 32,
          height: 32,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
          filter: "drop-shadow(0 2px 6px rgba(255, 102, 0, 0.4))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/rhino-favicon.png"
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
          data-cursor-ignore
        />
      </div>

      {/* Inner dot — exact 1:1 cursor position (click indicator) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 5,
          height: 5,
          backgroundColor: "var(--color-rhino-orange)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
