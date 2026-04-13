"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import dynamic from "next/dynamic";
import { BlurFade } from "@/components/ui/blur-fade";
import type { BlogSection } from "@/data/blog";

/* -------------------------------------------------------------------------- */
/*  Dynamic background imports (SSR disabled — WebGL)                         */
/* -------------------------------------------------------------------------- */

const FloatingOrbsBackground = dynamic(
  () => import("@/components/ui/floating-orbs-bg").then((m) => m.FloatingOrbsBackground),
  { ssr: false },
);

const FloatingParticlesBackground = dynamic(
  () => import("@/components/ui/floating-particles").then((m) => m.FloatingParticlesBackground),
  { ssr: false },
);

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SerializedPost {
  slug: string;
  title: string;
  category: string;
  color: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  heroImage: string;
  tags: string[];
  content: BlogSection[];
}

interface BlogListingClientProps {
  posts: SerializedPost[];
  categories: string[];
}

/* -------------------------------------------------------------------------- */
/*  Animation constants                                                        */
/* -------------------------------------------------------------------------- */

const ease = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/* -------------------------------------------------------------------------- */
/*  3D TILT CARD (matches homepage pattern)                                    */
/* -------------------------------------------------------------------------- */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
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
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BlogListingClient({ posts, categories }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const grid = filtered.slice(1);

  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* ================================================================== */}
      {/*  HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#0A0A0A] pt-32 pb-20 md:pt-40 md:pb-28">
        {/* 3D floating orbs background */}
        <FloatingOrbsBackground />

        {/* Radial gradient glows (homepage style) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,136,0,0.15),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(45,184,110,0.08),transparent)]" />

        {/* Noise texture overlay */}
        <div className="noise pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <BlurFade inView delay={0}>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] md:text-sm text-rhino-orange">
              Insights
            </span>
          </BlurFade>

          <BlurFade inView delay={0.15}>
            <h1 className="mt-4 font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Knowledge Hub
            </h1>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              Technical deep-dives, specification guides, and sustainability
              insights from Rhino&rsquo;s engineering team&nbsp;&mdash; helping you
              specify smarter and build greener.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  GRADIENT LINE DIVIDER (homepage style)                             */}
      {/* ================================================================== */}
      <div className="line-gradient" />

      {/* ================================================================== */}
      {/*  CATEGORY PILLS                                                     */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-4">
        <LayoutGroup>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                layout
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-rhino-orange bg-rhino-orange text-white shadow-lg shadow-rhino-orange/20"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 hover:scale-105"
                }`}
                whileHover={{ scale: activeCategory === cat ? 1 : 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease }}
              >
                {cat}
                {/* Animated glow underline on active */}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="category-glow"
                    className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-rhino-orange/60 blur-[2px]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </LayoutGroup>
      </section>

      {/* ================================================================== */}
      {/*  FEATURED ARTICLE                                                   */}
      {/* ================================================================== */}
      <AnimatePresence mode="wait">
        {featured && (
          <section key={featured.slug + "-featured"} className="mx-auto max-w-7xl px-6 py-10">
            <BlurFade inView delay={0.05}>
              <TiltCard className="h-full">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="card-shine group block overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-700 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] hover:border-gray-200"
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    {/* image */}
                    <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                      <Image
                        src={featured.heroImage}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Radial glow behind image on hover */}
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,102,0,0.08),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                    </div>

                    {/* copy */}
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                        style={{ backgroundColor: featured.color }}
                      >
                        {featured.category}
                      </motion.span>

                      <h2 className="font-display text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                        {featured.title}
                      </h2>

                      <p className="mt-4 text-base leading-relaxed text-[#555] line-clamp-3 md:text-lg">
                        {featured.excerpt}
                      </p>

                      <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                        <span>{featured.date}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{featured.readTime} read</span>
                      </div>

                      {/* Animated CTA */}
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rhino-orange transition-all duration-300 group-hover:gap-3">
                        Read Article
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Animated border glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px rgba(255,102,0,0.15)" }} />
                </Link>
              </TiltCard>
            </BlurFade>
          </section>
        )}
      </AnimatePresence>

      {/* ================================================================== */}
      {/*  ARTICLE GRID                                                       */}
      {/* ================================================================== */}
      {grid.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          {/* Floating particles behind the grid */}
          <div className="pointer-events-none absolute inset-0 -top-20 -bottom-20 overflow-hidden">
            <FloatingParticlesBackground light />
          </div>

          <motion.div
            className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <AnimatePresence mode="popLayout">
              {grid.map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={fadeUp}
                  layout
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease }}
                >
                  <TiltCard className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="card-shine group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-gray-200"
                    >
                      {/* image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          className="object-cover rounded-t-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Radial gradient glow behind image on hover */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,102,0,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      {/* body */}
                      <div className="flex flex-1 flex-col p-6">
                        <span
                          className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                          style={{ backgroundColor: post.color }}
                        >
                          {post.category}
                        </span>

                        <h3 className="font-display text-lg font-bold leading-snug text-gray-900 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#666] line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="mt-5 flex items-center gap-3 text-xs text-gray-400">
                          <span>{post.date}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-300" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-gray-400">
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
