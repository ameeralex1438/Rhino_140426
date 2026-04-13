"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationLinks } from "@/data/products";
import { RhinoLogo } from "@/components/ui/rhino-logo";

/* -------------------------------------------------------------------------- */
/*  Header — Light Theme with Orange Primary                                  */
/* -------------------------------------------------------------------------- */

export { Header };

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Reset header visibility on route change ---- */
  useEffect(() => {
    if (isHomepage) {
      setHeaderVisible(window.scrollY >= 5400);
    } else {
      setHeaderVisible(true);
    }
  }, [isHomepage]);

  /* ---- Scroll listener ---- */
  useEffect(() => {
    const SCROLL_HEIGHT = 5400;
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isHomepage) {
        setHeaderVisible(window.scrollY >= SCROLL_HEIGHT);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, []);

  /* ---- Products dropdown hover handlers (desktop) ---- */
  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setProductsOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setProductsOpen(false), 150);
  };

  /* ---- Find the products nav item ---- */
  const productsNav = navigationLinks.find((l) => l.label === "Products");

  return (
    <>
      <header
        id="shared-header"
        className={cn(
          "fixed left-0 right-0 z-50 backdrop-blur-xl border-b",
          isHomepage ? "transition-all duration-500" : "",
          isHomepage
            ? (headerVisible ? "top-0 opacity-100" : "-top-24 opacity-0 pointer-events-none")
            : "top-0 opacity-100",
          "bg-white/50 border-gray-200/30",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-500 md:px-12 xl:px-20",
            scrolled ? "h-16" : "h-20",
          )}
        >
          {/* ---- Logo ---- */}
          <Link href="/" className="group relative z-10 flex flex-col" onClick={closeMobile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/rhino-logo.svg"
              alt="Rhino Rock Mineral Wool"
              className={cn("w-auto transition-all duration-300", scrolled ? "h-9" : "h-11")}
            />
          </Link>

          {/* ---- Desktop Nav ---- */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => {
              const hasChildren = link.label === "Products" && productsNav?.children;

              if (hasChildren) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      href={link.href}
                      className={cn("group relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-rhino-orange", pathname.startsWith(link.href) ? "text-rhino-orange" : "text-[#444] hover:text-[#111]")}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          productsOpen && "rotate-180",
                        )}
                      />
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 bg-rhino-orange transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>

                    {/* ---- Mega Menu ---- */}
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                          className="absolute left-1/2 top-full pt-3 -translate-x-1/2"
                        >
                          <div className="w-[320px] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl shadow-black/10 lg:w-[520px]">
                            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
                              {productsNav.children!.map((child) => {
                                /* Extract product code from label, e.g. "(RSL)" */
                                const codeMatch = child.label.match(/\((\w+)\)/);
                                const code = codeMatch ? codeMatch[1] : "";
                                const name = child.label.replace(/\s*\(\w+\)/, "");

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setProductsOpen(false)}
                                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-gray-50"
                                  >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rhino-orange/15 font-mono text-xs font-bold text-rhino-orange transition-colors duration-200 group-hover:bg-rhino-orange group-hover:text-white">
                                      {code}
                                    </span>
                                    <span className="text-sm font-medium text-[#666] transition-colors duration-200 group-hover:text-[#111]">
                                      {name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="mt-2 border-t border-gray-200 pt-3">
                              <Link
                                href="/products"
                                onClick={() => setProductsOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rhino-orange transition-colors duration-200 hover:bg-gray-50"
                              >
                                View All Products
                                <span className="text-xs">&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Check active: exact match, startsWith, or children routes match
              const childPaths = link.children?.map((c: { href: string }) => c.href) ?? [];
              const isActive = pathname === link.href
                || (link.href !== "/" && pathname.startsWith(link.href))
                || childPaths.some((cp: string) => pathname === cp || pathname.startsWith(cp));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-rhino-orange",
                    isActive ? "text-rhino-orange" : "text-[#444] hover:text-[#111]",
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-4 right-4 h-[2px] bg-rhino-orange transition-transform duration-300 ease-out",
                    isActive ? "origin-left scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100",
                  )} />
                </Link>
              );
            })}
          </nav>

          {/* ---- Desktop CTA ---- */}
          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-rhino-orange px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-rhino-orange/20 transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-lg hover:shadow-rhino-orange/30 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get a Quote
            </Link>
            <a href="https://sardametals.com/" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/sarda-venture-white.png"
                alt="A Sarda Group Venture"
                className="h-8 w-auto brightness-0 opacity-60 transition-all duration-300 hover:opacity-90"
              />
            </a>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              mobileOpen
                ? "text-[#333] hover:bg-gray-100"
                : "text-[#333] hover:bg-gray-100",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#333]"
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ---- Bottom border on scroll ---- */}
        <div
          className={cn(
            "h-px w-full transition-opacity duration-500",
            scrolled ? "bg-gray-200 opacity-100" : "opacity-0",
          )}
        />
      </header>

      {/* ---- Mobile Full-Screen Overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop — white overlay */}
            <div className="absolute inset-0 bg-white/98 backdrop-blur-xl" />

            {/* Content */}
            <motion.nav
              initial={{ x: "30%" }}
              animate={{ x: 0 }}
              exit={{ x: "30%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative flex h-full flex-col justify-center px-8 pt-20"
            >
              <div className="space-y-1">
                {navigationLinks.map((link, i) => {
                  const hasChildren = link.label === "Products" && productsNav?.children;

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => setMobileProductsOpen((prev) => !prev)}
                            className="flex w-full items-center justify-between py-3 text-2xl font-bold text-[#111] sm:text-3xl font-display"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={cn(
                                "h-6 w-6 text-rhino-gray-400 transition-transform duration-300",
                                mobileProductsOpen && "rotate-180",
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileProductsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 pb-3 pl-4 pt-1">
                                  {productsNav!.children!.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={closeMobile}
                                      className="block py-2 text-lg text-[#666] transition-colors duration-200 hover:text-rhino-orange"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          className="block py-3 text-2xl font-bold text-[#111] sm:text-3xl transition-colors duration-200 hover:text-rhino-orange font-display"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center rounded-full bg-rhino-orange px-8 py-4 text-lg font-medium text-white shadow-lg shadow-rhino-orange/20 transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-xl active:scale-[0.98]"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
