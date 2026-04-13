"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Download,
  MessageSquareQuote,
  Check,
  Layers,
  Shield,
  ScrollText,
  BrickWall,
  Wind,
  Flame,
  Droplets,
  Snowflake,
  Factory,
  Building2,
  Warehouse,
  Volume2,
  Wrench,
  Container,
  ThermometerSun,
  X,
  ZoomIn,
} from "lucide-react";
import { products, productVariants } from "@/data/products";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Product = (typeof products)[number];

/* -------------------------------------------------------------------------- */
/*  Icon maps                                                                 */
/* -------------------------------------------------------------------------- */

const productIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  layers: Layers,
  shield: Shield,
  scroll: ScrollText,
  "brick-wall": BrickWall,
  wind: Wind,
};

const applicationIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Roof: Building2,
  Wall: Building2,
  Floor: Layers,
  Ceiling: Layers,
  Boiler: Factory,
  Furnace: Flame,
  Refiner: Factory,
  Vessel: Container,
  Tank: Container,
  Duct: Wind,
  HVAC: Wind,
  Pitched: Building2,
  Sandwich: Layers,
  Fire: Flame,
  Curtain: Building2,
  EIFS: Building2,
  Mechanical: Wrench,
  Cold: Snowflake,
  Clean: Snowflake,
  Prefab: Warehouse,
  Acoustic: Volume2,
  OEM: Wrench,
  Masonry: BrickWall,
  Valve: Wrench,
  Silencer: Volume2,
  Cryogenic: Snowflake,
  Muffler: Volume2,
  Metal: Building2,
  Machinery: Wrench,
  Pre: Building2,
  Storage: Container,
  Insulation: ThermometerSun,
  Kiln: Flame,
  ESP: Factory,
  Flanged: Wrench,
  Water: Droplets,
};

function getApplicationIcon(name: string): React.ComponentType<{ className?: string }> {
  for (const [keyword, icon] of Object.entries(applicationIconMap)) {
    if (name.includes(keyword)) return icon;
  }
  return Layers;
}

/* -------------------------------------------------------------------------- */
/*  Spec label formatter                                                      */
/* -------------------------------------------------------------------------- */

const specLabels: Record<string, string> = {
  density: "Density",
  thickness: "Thickness",
  length: "Length",
  width: "Width",
  thermalConductivity: "Thermal Conductivity",
  fireRating: "Fire Rating",
  maxServiceTemp: "Max Service Temp",
  compressiveStrength: "Compressive Strength",
  acoustic: "Acoustic Rating",
  waterAbsorption: "Water Absorption",
  flexibility: "Flexibility",
  packaging: "Packaging",
  standards: "Standards",
  facings: "Facings",
};

/* -------------------------------------------------------------------------- */
/*  Shared animation config                                                   */
/* -------------------------------------------------------------------------- */

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: "-80px" as const },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

/* -------------------------------------------------------------------------- */
/*  Variant status config                                                     */
/* -------------------------------------------------------------------------- */

const variantStatusConfig: Record<
  string,
  { badgeClass: string; label: string }
> = {
  available: {
    badgeClass: "bg-rhino-orange-pale text-rhino-orange border-rhino-orange/20",
    label: "Available Now",
  },
  "2026": {
    badgeClass: "bg-rhino-orange-pale text-rhino-orange border-rhino-orange/20",
    label: "Available Now",
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function ProductDetail({ product }: { product: Product }) {
  const otherProducts = products.filter((p) => p.id !== product.id);
  const ProductIcon = productIconMap[product.icon] || Layers;
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => setLightboxImage(src), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const heroImage = product.heroImage;
  const gallery = product.gallery ?? [];

  /* ---- Build specs table rows (exclude arrays) ---- */
  const scalarSpecs = Object.entries(product.specs).filter(
    ([key]) => key !== "standards" && key !== "facings",
  );

  return (
    <div className="w-full bg-rhino-cream">
      {/* ================================================================ */}
      {/*  LIGHTBOX MODAL                                                  */}
      {/* ================================================================ */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt={product.name}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
              />
              <button
                onClick={closeLightbox}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-5 w-5 text-rhino-gray-900" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/*  FULL-WIDTH HERO IMAGE                                           */}
      {/* ================================================================ */}
      {heroImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] w-full overflow-hidden md:h-[500px]"
        >
          <Image
            src={heroImage}
            alt={product.name}
            fill
            priority
            className="hero-ken-burns object-cover"
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Product name overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 xl:px-20">
            <div className="mx-auto max-w-[1440px]">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-3 inline-block rounded-md bg-rhino-orange px-3 py-1.5 text-xs font-bold tracking-widest text-white"
              >
                {product.code}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-6xl"
              >
                {product.name}
              </motion.h1>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {/* ================================================================ */}
        {/*  HERO TEXT AREA                                                  */}
        {/* ================================================================ */}
        <div className={cn("pb-16", heroImage ? "pt-12" : "pt-40")}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="mb-8 flex items-center gap-2 text-sm text-rhino-gray-500"
          >
            <Link
              href="/products"
              className="transition-colors hover:text-rhino-orange"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-rhino-gray-900">{product.name}</span>
          </motion.nav>

          {!heroImage && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                className="mb-5 inline-flex items-center gap-3"
              >
                <span className="rounded-md bg-rhino-orange-pale px-3 py-1.5 text-xs font-bold tracking-widest text-rhino-orange">
                  {product.code}
                </span>
                <ProductIcon className="h-5 w-5 text-rhino-gray-400" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="font-display text-5xl font-bold leading-[1.08] text-rhino-gray-900 md:text-6xl"
              >
                {product.name}
              </motion.h1>
            </>
          )}

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className={cn("text-xl text-rhino-gray-600", heroImage ? "mt-2" : "mt-4")}
          >
            {product.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-rhino-gray-600"
          >
            {product.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {product.tdsUrl && (
              <a
                href={product.tdsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-4 text-lg font-medium text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:scale-[1.03] hover:bg-rhino-orange-dark"
              >
                <Download className="h-4 w-4" />
                Download TDS
              </a>
            )}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-rhino-sand bg-white px-8 py-4 text-lg font-medium text-rhino-gray-900 transition-all duration-300 hover:border-rhino-orange hover:text-rhino-orange"
            >
              <MessageSquareQuote className="h-4 w-4" />
              Get a Quote
            </a>
          </motion.div>
        </div>

        {/* ================================================================ */}
        {/*  PRODUCT PHOTO GALLERY                                           */}
        {/* ================================================================ */}
        {gallery.length > 1 && (
          <motion.section {...sectionAnim} className="pb-16 md:pb-20">
            <h2 className="mb-8 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
              Product Gallery
            </h2>
            <div
              className={cn(
                "grid gap-4",
                gallery.length === 2 && "grid-cols-1 sm:grid-cols-2",
                gallery.length === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                gallery.length >= 4 && "grid-cols-1 sm:grid-cols-2",
              )}
            >
              {gallery.map((src, i) => (
                <BlurFade key={src} delay={i * 0.1} inView>
                  <button
                    type="button"
                    onClick={() => openLightbox(src)}
                    className="group relative h-64 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-rhino-sand bg-white"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} - Photo ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </button>
                </BlurFade>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================================================================ */}
        {/*  KEY BENEFITS                                                    */}
        {/* ================================================================ */}
        <motion.section {...sectionAnim} className="py-16 md:py-20">
          <h2 className="mb-10 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
            Key Benefits
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="flex items-start gap-3 rounded-xl border border-rhino-sand bg-white p-5 transition-all duration-300 hover:border-rhino-orange hover:shadow-md"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rhino-orange-pale">
                  <Check className="h-3.5 w-3.5 text-rhino-orange" />
                </div>
                <span className="text-sm leading-relaxed text-rhino-gray-600">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/*  TECHNICAL SPECIFICATIONS                                        */}
        {/* ================================================================ */}
        <motion.section {...sectionAnim} className="py-16 md:py-20">
          <h2 className="mb-10 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
            Technical Specifications
          </h2>

          <div className="overflow-hidden rounded-2xl border border-rhino-sand">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-rhino-sand bg-rhino-cream">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-rhino-gray-500">
                    Property
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-rhino-gray-500">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {scalarSpecs.map(([key, value], i) => (
                  <tr
                    key={key}
                    className={cn(
                      "border-b border-rhino-sand/50 transition-colors",
                      i % 2 === 0 ? "bg-white" : "bg-rhino-cream",
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-rhino-gray-600">
                      {specLabels[key] || key}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-rhino-gray-900">
                      {String(value)}
                    </td>
                  </tr>
                ))}

                {/* Standards row */}
                {product.specs.standards.length > 0 && (
                  <tr
                    className={cn(
                      "border-b border-rhino-sand/50",
                      scalarSpecs.length % 2 === 0
                        ? "bg-white"
                        : "bg-rhino-cream",
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-rhino-gray-600">
                      Standards
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {product.specs.standards.map((std) => (
                          <span
                            key={std}
                            className="rounded-md bg-rhino-orange-pale px-2.5 py-1 text-xs font-medium text-rhino-orange"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Facings row */}
                {product.specs.facings.length > 0 && (
                  <tr
                    className={cn(
                      (scalarSpecs.length + 1) % 2 === 0
                        ? "bg-white"
                        : "bg-rhino-cream",
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-rhino-gray-600">
                      Facings
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {product.specs.facings.map((facing) => (
                          <span
                            key={facing}
                            className="rounded-full border border-rhino-sand bg-rhino-cream px-3 py-1 text-xs text-rhino-gray-600"
                          >
                            {facing}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/*  APPLICATIONS                                                    */}
        {/* ================================================================ */}
        <motion.section {...sectionAnim} className="py-16 md:py-20">
          <h2 className="mb-10 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
            Applications
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((app, i) => {
              const AppIcon = getApplicationIcon(app);
              return (
                <motion.div
                  key={app}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="flex items-center gap-4 rounded-xl border border-rhino-sand bg-rhino-cream p-5 transition-colors duration-300 hover:border-rhino-orange"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rhino-orange-pale">
                    <AppIcon className="h-5 w-5 text-rhino-orange" />
                  </div>
                  <span className="text-sm font-medium text-rhino-gray-900">
                    {app}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/*  AVAILABLE VARIANTS                                              */}
        {/* ================================================================ */}
        <motion.section {...sectionAnim} className="py-16 md:py-20">
          <h2 className="mb-10 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
            Available In
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {productVariants.map((variant, i) => {
              const cfg = variantStatusConfig[variant.status] || variantStatusConfig["2026"];
              return (
                <motion.div
                  key={variant.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="rounded-2xl border border-rhino-sand bg-white p-6 transition-colors duration-500 hover:border-rhino-orange hover:shadow-md"
                  style={{ borderTopColor: variant.color, borderTopWidth: "2px" }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-rhino-gray-900">
                      {variant.name}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                        cfg.badgeClass,
                      )}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="mb-3 text-xs font-medium tracking-wide" style={{ color: variant.color }}>
                    {variant.tagline}
                  </p>
                  <p className="text-sm leading-relaxed text-rhino-gray-600">
                    {variant.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/*  RELATED PRODUCTS                                                */}
        {/* ================================================================ */}
        <motion.section {...sectionAnim} className="py-16 pb-24 md:py-20 md:pb-32">
          <h2 className="mb-10 font-display text-3xl font-bold text-rhino-gray-900 md:text-4xl">
            Explore Other Products
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-rhino-sand bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-rhino-orange hover:shadow-md"
                >
                  {p.heroImage && (
                    <div className="relative h-36 w-full overflow-hidden bg-rhino-cream">
                      <Image
                        src={p.heroImage}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-xs font-bold tracking-widest text-rhino-orange">
                      {p.code}
                    </span>
                    <h3 className="mb-1 font-display text-base font-bold text-rhino-gray-900">
                      {p.name}
                    </h3>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-rhino-gray-500">
                      {p.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-rhino-orange transition-colors group-hover:text-rhino-orange-dark">
                      View
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
