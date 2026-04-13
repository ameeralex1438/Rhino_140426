"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";

/* -------------------------------------------------------------------------- */
/*  Variant data                                                               */
/* -------------------------------------------------------------------------- */

const variants = [
  {
    id: "elite",
    name: "Rhino Elite",
    tagline: "The gold standard for performance",
    image: "/images/products/product-1.jpeg",
    description:
      "Top-tier thermal and acoustic insulation with a significantly smaller carbon footprint. For projects that demand the best.",
    carbonPercent: 25,
    carbonColor: "#FF6600",
    status: "Available Now",
    link: "/products#elite",
  },
  {
    id: "enduro",
    name: "Rhino Enduro",
    tagline: "Balanced sustainability meets performance",
    image: "/images/products/product-2.jpeg",
    description:
      "The perfect balance between long-term sustainability and robust performance. Engineered for demanding projects.",
    carbonPercent: 45,
    carbonColor: "#1D6FA4",
    status: "Available Now",
    link: "/products#enduro",
  },
  {
    id: "eco-green",
    name: "Rhino Eco-Green",
    tagline: "The definitive sustainability benchmark",
    image: "/images/products/product-3.jpeg",
    description:
      "Sets a new global benchmark. The definitive choice for industry leaders committed to a carbon-responsible future.",
    carbonPercent: 65,
    carbonColor: "#2A8A52",
    status: "Available Now",
    link: "/products#eco-green",
  },
];

/* -------------------------------------------------------------------------- */
/*  Single product card                                                        */
/* -------------------------------------------------------------------------- */

function ProductCard({
  variant,
  index,
}: {
  variant: (typeof variants)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <BlurFade delay={0.2 + index * 0.15} inView>
      <motion.div
        className="group relative overflow-hidden bg-white transition-all duration-400"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
        whileHover={{
          y: -6,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* BorderBeam — visible on hover */}
        {hovered && (
          <BorderBeam
            colorFrom="#FF6600"
            colorTo="#FF8800"
            size={200}
            duration={8}
          />
        )}

        {/* Product image — full width, no padding */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={variant.image}
            alt={variant.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Variant name */}
          <h3 className="font-display text-xl font-bold text-[#111]">
            {variant.name}
          </h3>

          {/* Tagline */}
          <p className="mb-4 mt-1 text-[13px] text-[#666]">
            {variant.tagline}
          </p>

          {/* Key stat — NumberTicker */}
          <p
            className="font-display text-3xl font-bold"
            style={{ color: variant.carbonColor }}
          >
            <NumberTicker
              value={variant.carbonPercent}
              className="font-display text-3xl font-bold !text-inherit"
            />
            %
          </p>
          <p className="mt-0.5 text-[12px] text-[#777]">carbon reduction</p>

          {/* Divider */}
          <div className="my-5 h-px bg-[#eee]" />

          {/* Description */}
          <p className="text-[13px] leading-relaxed text-[#666]">
            {variant.description}
          </p>

          {/* Status + link */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-medium text-[#666]">
              {variant.status}
            </span>
            <Link
              href={variant.link}
              className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#666] transition-colors duration-200 hover:text-[#FF6600]"
            >
              Explore &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </BlurFade>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export function VariantsShowcase() {
  return (
    <section id="product" className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.1} inView>
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6600]">
              Product Variants
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#111] md:text-4xl lg:text-[2.75rem]">
              Three Groundbreaking Solutions
            </h2>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <p className="mx-auto mt-4 max-w-xl text-[#555]">
              Each variant targets a specific level of carbon reduction — choose
              the one that matches your sustainability goals.
            </p>
          </BlurFade>
        </div>

        {/* Three product cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant, i) => (
            <ProductCard key={variant.id} variant={variant} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
