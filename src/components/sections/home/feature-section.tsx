"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

/* -------------------------------------------------------------------------- */
/*  Reusable split feature section (Technology / Sustainability / Innovation)  */
/* -------------------------------------------------------------------------- */

interface FeatureSectionProps {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imagePosition: "left" | "right";
  bgColor?: "white" | "light";
  link?: { href: string; text: string };
}

/* ---- Clip-path reveal for the image (kept as-is) ---- */

const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] as const },
  },
};

export function FeatureSection({
  label,
  title,
  description,
  bullets,
  image,
  imagePosition,
  bgColor = "white",
  link,
}: FeatureSectionProps) {
  const isLeft = imagePosition === "left";
  const bg = bgColor === "light" ? "#f7f7f7" : "#ffffff";

  return (
    <section className="w-full" style={{ backgroundColor: bg }}>
      <div className="mx-auto flex max-w-[1440px] flex-col px-6 py-24 md:px-12 md:py-32 lg:flex-row lg:items-center lg:gap-16 lg:py-40 xl:px-20">
        {/* ---------------------------------------------------------------- */}
        {/*  Image column — clip-path reveal kept                            */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={clipReveal}
          className={`relative w-full lg:w-1/2 ${
            isLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="group relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/*  Text column — BlurFade for each element                         */}
        {/* ---------------------------------------------------------------- */}
        <div
          className={`mt-12 flex w-full flex-col lg:mt-0 lg:w-1/2 ${
            isLeft ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4"
          }`}
        >
          {/* Label */}
          <BlurFade delay={0.1} inView>
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-rhino-orange">
              {label}
            </span>
          </BlurFade>

          {/* Heading */}
          <BlurFade delay={0.2} inView>
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#111] md:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.3} inView>
            <p className="mb-8 mt-6 text-[15px] font-light leading-[1.8] text-[#555] md:text-base">
              {description}
            </p>
          </BlurFade>

          {/* Bullet points with orange squares */}
          <ul className="flex flex-col gap-3">
            {bullets.map((bullet, i) => (
              <BlurFade key={bullet} delay={0.35 + i * 0.08} inView>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-[6px] block h-[6px] w-[6px] flex-shrink-0 bg-rhino-orange"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-[#444]">{bullet}</span>
                </li>
              </BlurFade>
            ))}
          </ul>

          {/* Read More link */}
          {link && (
            <BlurFade delay={0.6} inView>
              <div className="mt-8">
                <Link
                  href={link.href}
                  className="group/link inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-rhino-orange transition-colors duration-300 hover:text-[#FF8800]"
                >
                  {link.text}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </section>
  );
}
