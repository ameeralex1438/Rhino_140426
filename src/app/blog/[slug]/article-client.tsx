"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { BlurFade } from "@/components/ui/blur-fade";
import type { BlogSection } from "@/data/blog";

/* -------------------------------------------------------------------------- */
/*  Dynamic background (SSR disabled — WebGL)                                  */
/* -------------------------------------------------------------------------- */

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

interface ArticleClientProps {
  post: SerializedPost;
  related: SerializedPost[];
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
      delayChildren: 0.05,
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

export function ArticleClient({ post, related }: ArticleClientProps) {
  /* Reading progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* ================================================================ */}
      {/*  READING PROGRESS BAR                                             */}
      {/* ================================================================ */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-rhino-orange"
        style={{ scaleX }}
      />

      {/* ================================================================ */}
      {/*  HERO IMAGE                                                       */}
      {/* ================================================================ */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority
          className="object-cover hero-ken-burns"
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Noise texture */}
        <div className="noise pointer-events-none absolute inset-0 z-[1]" />

        {/* back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
        >
          <Link
            href="/blog"
            className="absolute left-6 top-28 z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:scale-105 md:left-10 md:top-32"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Insights
          </Link>
        </motion.div>

        {/* title overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-4xl px-6 pb-10 md:pb-14">
          <BlurFade inView delay={0.1}>
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span>{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{post.readTime} read</span>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  ARTICLE BODY                                                     */}
      {/* ================================================================ */}
      <article className="relative mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* Floating particles background */}
        <div className="pointer-events-none absolute inset-0 -top-40 -bottom-40 overflow-hidden">
          <FloatingParticlesBackground light />
        </div>

        <div className="relative z-10">
          {post.content.map((section, idx) => (
            <BlurFade key={idx} inView delay={0.05 * idx}>
              <div>
                {/* heading */}
                {section.heading && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease }}
                    className="mt-12 mb-4 font-display text-2xl font-bold text-gray-900 md:text-3xl first:mt-0"
                  >
                    {section.heading}
                  </motion.h2>
                )}

                {/* paragraphs */}
                {section.paragraphs.map((para, pIdx) => (
                  <motion.p
                    key={pIdx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: pIdx * 0.05, ease }}
                    className="mb-4 text-base leading-relaxed text-[#444] md:text-lg"
                  >
                    {para}
                  </motion.p>
                ))}

                {/* bullet list — stagger animate each item */}
                {section.list && section.list.length > 0 && (
                  <motion.ul
                    className="mb-6 ml-6 list-disc space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                  >
                    {section.list.map((item, lIdx) => (
                      <motion.li
                        key={lIdx}
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.4, delay: lIdx * 0.06, ease },
                          },
                        }}
                        className="text-base leading-relaxed text-[#444] md:text-lg"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* specs table — rows slide in from left */}
                {section.specs && section.specs.length > 0 && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-gray-200">
                    <div className="grid grid-cols-2">
                      {section.specs.map((spec, sIdx) => (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ duration: 0.4, delay: sIdx * 0.06, ease }}
                          className={`flex flex-col gap-1 px-5 py-4 ${
                            sIdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } ${sIdx % 2 === 0 ? "border-r border-gray-200" : ""}`}
                          style={{ gridColumn: "span 1" }}
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {spec.label}
                          </span>
                          <span className="text-sm font-medium text-gray-900 md:text-base">
                            {spec.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </article>

      {/* ================================================================ */}
      {/*  RELATED ARTICLES                                                  */}
      {/* ================================================================ */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <BlurFade inView delay={0}>
              <h2 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">
                Continue Reading
              </h2>
            </BlurFade>

            <motion.div
              className="mt-10 grid gap-6 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {related.map((rel, i) => (
                <motion.div key={rel.slug} variants={fadeUp}>
                  <TiltCard className="h-full">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="card-shine group block overflow-hidden rounded-3xl border border-gray-100 bg-[#FAFAF8] transition-all duration-500 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-gray-200"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={rel.heroImage}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Radial glow on hover */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,102,0,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <div className="p-5">
                        <span
                          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                          style={{ backgroundColor: rel.color }}
                        >
                          {rel.category}
                        </span>
                        <h3 className="mt-2 font-display text-base font-bold leading-snug text-gray-900 line-clamp-2">
                          {rel.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                          <span>{rel.date}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-300" />
                          <span>{rel.readTime} read</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile horizontal scroll fallback */}
            <div className="mt-6 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
              {related.map((rel) => (
                <Link
                  key={rel.slug + "-mobile"}
                  href={`/blog/${rel.slug}`}
                  className="group flex-shrink-0 w-[300px] snap-start"
                >
                  <div className="card-shine overflow-hidden rounded-3xl border border-gray-100 bg-[#FAFAF8] transition-shadow duration-500 hover:shadow-xl">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={rel.heroImage}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                        style={{ backgroundColor: rel.color }}
                      >
                        {rel.category}
                      </span>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-gray-900 line-clamp-2">
                        {rel.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                        <span>{rel.date}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{rel.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  CTA                                                               */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28">
        {/* Radial glow behind CTA */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,102,0,0.12),transparent)]" />
        <div className="noise pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <BlurFade inView delay={0}>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to specify Rhino for your project?
            </h2>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <p className="mt-4 text-lg text-white/60">
              Get expert guidance on product selection, thermal calculations, and
              sustainability documentation from our technical team.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-rhino-orange/30 hover:brightness-110 animate-glow-pulse"
            >
              Get a Quote
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
