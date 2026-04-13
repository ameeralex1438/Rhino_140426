"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { BlurFade } from "@/components/ui/blur-fade";

const ease = [0.16, 1, 0.3, 1] as const;

function getKeySpecs(specs: (typeof products)[number]["specs"]): string[] {
  const items: string[] = [];
  if ("density" in specs && specs.density) items.push(specs.density);
  if ("fireRating" in specs && specs.fireRating) items.push(specs.fireRating);
  if ("maxServiceTemp" in specs && specs.maxServiceTemp) items.push(specs.maxServiceTemp);
  if ("thermalConductivity" in specs && specs.thermalConductivity) items.push(specs.thermalConductivity);
  return items.slice(0, 3);
}

export function ProductsHub() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pb-8 pt-32 md:px-12 md:pb-10 md:pt-40 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Our Products
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold text-[#111] sm:text-5xl md:text-6xl lg:text-7xl">
              Explore Our Range
            </h1>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="max-w-2xl text-base leading-relaxed text-[#555] md:text-lg">
              Five specialized product lines engineered for thermal, acoustic,
              and fire insulation — all manufactured using India&apos;s first
              electric arc furnace technology.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-[#FAFAF8] px-6 py-16 md:px-12 md:py-20 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          {/* First 3 products */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          {/* Last 2 products centered */}
          <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
            {products.slice(3).map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-24 xl:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <BlurFade delay={0} inView>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111] md:text-3xl">
              Not sure which product is right for you?
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mb-8 max-w-lg text-base text-[#555]">
              Our technical team can recommend the best insulation solution for
              your specific project requirements.
            </p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rhino-orange/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-rhino-orange/30"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" />
            </Link>
          </BlurFade>
        </div>
      </section>
    </>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const image = product.heroImage || "/images/products/product-1.jpeg";
  const specs = getKeySpecs(product.specs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden bg-[#FAFAF8] md:h-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Code badge */}
          <span className="absolute left-4 top-4 rounded-full bg-[#FF6600]/10 px-3 py-1 font-mono text-xs font-bold text-[#FF6600]">
            {product.code}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-bold text-[#111] md:text-2xl">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-[#666]">{product.tagline}</p>

          {/* Spec pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-gray-100 bg-[#FAFAF8] px-3 py-1 text-xs font-medium text-[#666]"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 pt-6">
            <span className="text-sm font-semibold text-[#FF6600] transition-all duration-300 group-hover:tracking-wide">
              View Details
            </span>
            <ArrowRight
              className="h-4 w-4 text-[#FF6600] transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductsHub;
