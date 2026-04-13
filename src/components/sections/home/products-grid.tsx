"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

/* -------------------------------------------------------------------------- */
/*  (heroImage now lives in product data — no hardcoded map needed)            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Extract spec pills from product specs                                      */
/* -------------------------------------------------------------------------- */

function getSpecPills(specs: (typeof products)[number]["specs"]): string[] {
  const pills: string[] = [];
  if ("density" in specs && specs.density) pills.push(specs.density as string);
  if ("fireRating" in specs && specs.fireRating)
    pills.push(specs.fireRating as string);
  if ("thermalConductivity" in specs && specs.thermalConductivity)
    pills.push(specs.thermalConductivity as string);
  return pills.slice(0, 3);
}

/* -------------------------------------------------------------------------- */
/*  Single product card                                                        */
/* -------------------------------------------------------------------------- */

function ProductCard({
  product,
  index,
  isWide = false,
}: {
  product: (typeof products)[number];
  index: number;
  isWide?: boolean;
}) {
  const pills = getSpecPills(product.specs);
  const fromRight = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={isWide ? "md:col-span-2 md:max-w-[calc(50%+1rem)] md:mx-auto" : ""}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-rhino-sand bg-white
                   transition-all duration-400
                   hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-rhino-orange"
      >
        {/* Product image */}
        <div className="relative bg-rhino-ivory p-6">
          <div className="aspect-[2/1] relative flex items-center justify-center">
            {product.heroImage && (
              <Image
                src={product.heroImage}
                alt={product.name}
                width={600}
                height={300}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product code badge */}
          <span className="mb-3 inline-block rounded-md bg-rhino-orange-pale px-2.5 py-1 text-xs font-bold tracking-widest text-rhino-orange">
            {product.code}
          </span>

          {/* Product name */}
          <h3 className="mb-1.5 font-display text-xl font-bold text-rhino-gray-900">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mb-5 text-sm leading-relaxed text-rhino-gray-600">
            {product.tagline}
          </p>

          {/* Divider */}
          <div className="mb-5 h-px w-full bg-rhino-sand" />

          {/* Spec highlights */}
          <div className="mb-5 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-rhino-cream px-3 py-1.5 text-xs font-medium text-rhino-gray-700"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* View details link */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-rhino-orange transition-colors group-hover:text-rhino-orange-dark">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export function ProductsGrid() {
  /* Split products: first 4 in 2-col grid, last one (RLW) as wide centered card */
  const gridProducts = products.slice(0, 4);
  const wideProduct = products[4]; // RLW - Loose Wool

  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 block text-xs font-medium tracking-[0.3em] text-rhino-orange">
            PRODUCT RANGE
          </span>
          <h2 className="font-display text-4xl font-bold text-rhino-gray-900 md:text-6xl">
            Engineered for Every Application
          </h2>
          <p className="mt-4 max-w-2xl text-base text-rhino-gray-600 md:text-lg">
            Five specialized product lines, each manufactured with zero-fossil-fuel
            electric smelting technology. Select the format that fits your project.
          </p>
        </motion.div>

        {/* 2-column product grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {gridProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}

          {/* Wide centered card for the fifth product */}
          {wideProduct && (
            <ProductCard
              product={wideProduct}
              index={4}
              isWide
            />
          )}
        </div>
      </div>
    </section>
  );
}
