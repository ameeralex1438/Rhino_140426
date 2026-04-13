"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ========================================================================== */
/*  METADATA — exported from a separate file since this is 'use client'       */
/* ========================================================================== */
// Note: metadata must be in a server component. We handle SEO via the layout
// or a separate generateMetadata. For this standalone replica, the root layout
// metadata suffices. If needed, add a head.tsx or move metadata to layout.tsx.

/* ========================================================================== */
/*  DATA                                                                       */
/* ========================================================================== */

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Technology", href: "/technology" },
  { label: "Products", href: "#product" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Downloads", href: "#downloads" },
  { label: "Accreditation", href: "#accreditation" },
  { label: "Contact", href: "#form" },
];

const HERO_STATS = [
  { value: "65%", label: "Less Carbon" },
  { value: "0%", label: "Fossil Fuels" },
  { value: "7yr", label: "R&D" },
  { value: "3", label: "Variants" },
];

const TECH_BULLETS = [
  "Zero metallic shots in final product",
  "Soft and consistent fiber quality",
  "20% energy efficiency over cupola furnaces",
  "Waste recycling capability",
];

const SUSTAINABILITY_BULLETS = [
  "Zero coke/coal usage in manufacturing",
  "Zero SO\u2082/NOx emissions released",
  "Up to 65% lower embedded CO\u2082 emissions",
];

const INNOVATION_BULLETS = [
  "7 years of R&D with global technology partners",
  "Three variants with 25%-65% carbon reduction",
];

const VARIANTS = [
  {
    name: "Rhino Elite",
    image: "/images/products/product-1.jpeg",
    badge: "/images/products/elite.avif",
    description: "25% reduction in carbon emission",
    highlight: "25%",
  },
  {
    name: "Rhino Enduro",
    image: "/images/products/product-2.jpeg",
    badge: "/images/products/enduro.avif",
    description: "45% lower carbon footprint",
    highlight: "45%",
  },
  {
    name: "Rhino Eco-Green",
    image: "/images/products/product-3.jpeg",
    badge: "/images/products/ecogreen.avif",
    description: "65% reduction in carbon footprint",
    highlight: "65%",
  },
];

const SARDA_STATS = [
  { prefix: "Sales", value: "~Rs. 6,000 Cr" },
  { prefix: "Work Force", value: "~8,000" },
  { prefix: "Exports", value: "60+ Countries" },
  { prefix: "Market CAP", value: "~Rs. 18,000 Cr" },
  { prefix: "Investor", value: "SARDAEN" },
];

const DOWNLOADS = [
  {
    category: "Brochures",
    items: [
      {
        name: "Corporate Brochure",
        thumb: "/images/downloads/corp-brochure-thumb.avif",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/692839215efbb5734008f0c0_RHINO%20-%20SARDA%20CORPORATE%20BROCHURE%20V2-06.08.2025%20(1).pdf",
      },
      {
        name: "Product Brochure",
        thumb: "/images/downloads/prod-brochure-thumb.avif",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69283970a066196e1d5d8dd0_Backup_of_Rhino_Product_Brochure%2012.11.2025_compressed.pdf",
      },
    ],
  },
  {
    category: "Technical Data Sheets",
    items: [
      {
        name: "RRA — RockArmor",
        thumb: "/images/downloads/tds-rra-thumb.png",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b2799194b819313f204399_RHINO.ROCKARMOR.RRA.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RWM — Wired Matts",
        thumb: "/images/downloads/tds-rwm-thumb.avif",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27973d91ae4a78ddf4e09_RHINO.WIRED.MATTS.RWM.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RSL — Slabs",
        thumb: "/images/downloads/tds-rsl-thumb.avif",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27983e5007ebcdfb924f9_RHINO.SLAB.RSL.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RLW — Loose Wool",
        thumb: "/images/downloads/tds-rlw-thumb.png",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b279c0eeb9659891c1100b_RHINO.LOOSEWOOL.RLW.TDS%20JUN%20V1.01.pdf",
      },
    ],
  },
  {
    category: "Safety",
    items: [
      {
        name: "MSDS",
        thumb: "/images/downloads/msds-thumb.png",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69b924915426dde74538cc47_RHINO.MSDS%20MAR%20V1.01%20.pdf",
      },
    ],
  },
];

const CERTIFICATIONS = [
  {
    name: "ISO 9001",
    image: "/images/certifications/iso-9001.png",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8918bdf72ba252437_ISO_9001-ENG-187401-2015-AQ-IND-RvA-8-20250831.pdf",
  },
  {
    name: "ISO 14001",
    image: "/images/certifications/iso-14001.png",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf852f02dbf5c756f9e_ISO_14001-ENG-187402-2015-AE-IND-RvA-8-20250831.pdf",
  },
  {
    name: "ISO 45001",
    image: "/images/certifications/iso-45001.png",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8bce64aae0b59d44b_ISO_45001-ENG-C714980-2-20250831.pdf",
  },
  {
    name: "ISO 50001",
    image: "/images/certifications/iso-50001.png",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d30cd13f2b3971db951_ISO-50001-2018.pdf",
  },
  {
    name: "NaBL",
    image: "/images/certifications/nabl.avif",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d306a829551a9199e2e_NaBL%20Certificate%20TC-12249.pdf",
  },
  {
    name: "Export House",
    image: "/images/certifications/export-house.avif",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d309d5fb1b57f6928e1_Three_Star_Export_House_Certificate_-_SMAL.pdf",
  },
  {
    name: "IS 8183",
    image: "/images/certifications/is-8183.avif",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8fc99ad9993f3e196_BIS%20Bonded%20Mineral%20Wool%20Certificate.pdf",
  },
  {
    name: "IS 1470",
    image: "/images/certifications/is-1470.avif",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf83cfa78298be3051c_BIS%20Silico%20Manganese.pdf",
  },
  {
    name: "Great Place to Work",
    image: "/images/certifications/gptw.png",
    url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d309d012d88280c1066_GPTW%20-%20Sarda%20Metals%20%26%20Alloys%20Limited_Certificate.pdf",
  },
];

const FOOTER_ZONES = [
  {
    zone: "North Zone",
    name: "Mr. Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "north@rhinoinsulation.in",
  },
  {
    zone: "East Zone",
    name: "Mr. Sunil Patel",
    phone: "+91 98765 43211",
    email: "east@rhinoinsulation.in",
  },
  {
    zone: "West Zone",
    name: "Mr. Amit Shah",
    phone: "+91 98765 43212",
    email: "west@rhinoinsulation.in",
  },
  {
    zone: "South Zone",
    name: "Mr. Venkat Rao",
    phone: "+91 98765 43213",
    email: "south@rhinoinsulation.in",
  },
];

const FOOTER_OFFICES = [
  {
    city: "Mumbai",
    address:
      "Office No. 1201, 12th Floor, Meadows Tower, Sahar Plaza, Andheri-Kurla Road, Andheri (E), Mumbai - 400059",
  },
  {
    city: "Vizianagaram",
    address:
      "Plant: Sarda Metals & Alloys Ltd., Industrial Estate, Vizianagaram - 535003, Andhra Pradesh",
  },
  {
    city: "Visakhapatnam",
    address:
      "Sarda Metals & Alloys Ltd., 125, B-Wing, Mittal Court, Nariman Point, Mumbai 400021",
  },
];

const PRODUCT_OPTIONS = [
  "Rhino Slabs (RSL)",
  "Rhino Wired Matts (RWM)",
  "Rhino Building Rolls (RBR)",
  "Rhino RockArmor (RRA)",
  "Rhino Loose Wool (RLW)",
];

/* ========================================================================== */
/*  PAGE                                                                       */
/* ========================================================================== */

export default function WebflowHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    product: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    alert("Thank you for your inquiry. We will get back to you soon.");
  };

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}>
      {/* ================================================================== */}
      {/*  NAVIGATION                                                        */}
      {/* ================================================================== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12 xl:px-20">
          {/* Logo */}
          <Link href="/home" className="shrink-0">
            <Image
              src="/images/logos/rhino-main-logo.svg"
              alt="Rhino Insulation"
              width={140}
              height={40}
              className="h-9 w-auto brightness-0 invert"
              unoptimized
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#form"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(to right, #FF6600, #FF8800)",
              }}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 text-white/80 text-base font-medium hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#form"
              className="mt-4 block w-full rounded-full py-3 text-center text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(to right, #FF6600, #FF8800)",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        )}
      </nav>

      {/* ================================================================== */}
      {/*  SECTION 1 — HERO                                                  */}
      {/* ================================================================== */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/video/poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/video/intro.mp4" type="video/mp4" />
          <source src="/images/video/intro.webm" type="video/webm" />
        </video>

        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-12 xl:px-20">
          <div className="flex w-full items-center justify-between">
            {/* Left: Text */}
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70 md:text-base">
                India&apos;s Greenest Rock Mineral Wool
              </p>
              <h1
                className="mb-8 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
              >
                Witness the
                <br />
                Revolution
              </h1>
              <Link
                href="#product"
                className="inline-block rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:brightness-110 hover:scale-105"
                style={{
                  background: "linear-gradient(to right, #FF6600, #FF8800)",
                  borderRadius: "25px",
                }}
              >
                Explore Breakthroughs
              </Link>
            </div>

            {/* Right: Large logo */}
            <div className="hidden lg:block">
              <Image
                src="/images/logos/rhino-hero-logo.svg"
                alt="Rhino"
                width={320}
                height={320}
                className="h-64 w-auto opacity-20 brightness-0 invert xl:h-80"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-[1440px] px-6 pb-8 md:px-12 xl:px-20">
            <div className="flex flex-wrap justify-end gap-3 md:gap-4">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 px-5 py-3 text-center md:px-6 md:py-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <p
                    className="text-xl font-bold text-white md:text-2xl"
                    style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/60 md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 2 — TECHNOLOGY (Image Left / Text Right)                  */}
      {/* ================================================================== */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 md:px-12 lg:flex-row lg:gap-16 xl:px-20">
          {/* Image Left */}
          <div className="w-full lg:w-1/2">
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/electric-arc-furnace.avif"
                alt="Electric Arc Furnace — India's first electric smelter for rock mineral wool"
                width={720}
                height={520}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="w-full lg:w-1/2">
            <h2
              className="mb-6 text-3xl font-bold leading-tight text-[#111] md:text-4xl lg:text-[42px]"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Breakthrough Results.
              <br />
              Demand Breakthrough Thinking.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#555] md:text-lg">
              Forged in India&apos;s first and largest electric smelter for rock
              mineral wool, Rhino stands as a testament to innovation and
              sustainability. Our proprietary electric melting technology delivers
              superior fiber quality with dramatically lower environmental impact.
            </p>
            <ul className="mb-8 space-y-3">
              {TECH_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[#333]">
                  <span
                    className="mt-2 block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "#FF6600" }}
                  />
                  <span className="text-base">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/technology"
              className="text-base font-semibold transition-colors hover:underline"
              style={{ color: "#FF6600" }}
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 3 — SUSTAINABILITY (Text Left / Image Right)              */}
      {/* ================================================================== */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-[1440px] flex-col-reverse items-center gap-12 px-6 md:px-12 lg:flex-row lg:gap-16 xl:px-20">
          {/* Text Left */}
          <div className="w-full lg:w-1/2">
            <h2
              className="mb-6 text-3xl font-bold leading-tight text-[#111] md:text-4xl lg:text-[42px]"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Zero % Fossil Fuels.
              <br />
              100% Future Ready.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#555] md:text-lg">
              Our revolutionary electric smelting technology eliminates the need
              for coke and coal, producing insulation with dramatically lower
              environmental impact. No combustion, no SO&#8322; or NOx — just
              clean, efficient electric melting powered by renewable energy.
            </p>
            <ul className="mb-8 space-y-3">
              {SUSTAINABILITY_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[#333]">
                  <span
                    className="mt-2 block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "#FF6600" }}
                  />
                  <span className="text-base">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sustainability"
              className="text-base font-semibold transition-colors hover:underline"
              style={{ color: "#FF6600" }}
            >
              Read More &rarr;
            </Link>
          </div>

          {/* Image Right */}
          <div className="w-full lg:w-1/2">
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/sustainability-bg.avif"
                alt="Sustainable manufacturing — zero fossil fuel production"
                width={720}
                height={520}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 4 — INNOVATION (Image Left / Text Right)                  */}
      {/* ================================================================== */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 md:px-12 lg:flex-row lg:gap-16 xl:px-20">
          {/* Image Left */}
          <div className="w-full lg:w-1/2">
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/factory.jpeg"
                alt="Rhino factory — 7 years of R&D innovation"
                width={720}
                height={520}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="w-full lg:w-1/2">
            <h2
              className="mb-6 text-3xl font-bold leading-tight text-[#111] md:text-4xl lg:text-[42px]"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Multiplied by three.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#555] md:text-lg">
              After 7 years of research and global partnerships, Rhino
              introduces three revolutionary variants — each engineered to
              meet different sustainability targets without compromising
              performance. From 25% to 65% carbon reduction, there&apos;s a
              Rhino product for every ambition.
            </p>
            <ul className="mb-8 space-y-3">
              {INNOVATION_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[#333]">
                  <span
                    className="mt-2 block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "#FF6600" }}
                  />
                  <span className="text-base">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              className="text-base font-semibold transition-colors hover:underline"
              style={{ color: "#FF6600" }}
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 5 — THREE VARIANTS                                        */}
      {/* ================================================================== */}
      <section id="product" className="py-20 md:py-28 lg:py-32" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          {/* Section heading */}
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#FF6600" }}
            >
              Product Range
            </p>
            <h2
              className="mx-auto max-w-2xl text-3xl font-bold text-[#111] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Three Groundbreaking Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#555] md:text-lg">
              Each variant targets a specific level of carbon reduction — choose the one that matches your sustainability goals.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VARIANTS.map((variant) => (
              <div
                key={variant.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product image */}
                <div className="relative h-64 w-full overflow-hidden md:h-72">
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  {/* Badge */}
                  <div className="mb-4 flex items-center">
                    <Image
                      src={variant.badge}
                      alt={`${variant.name} variant badge`}
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                      unoptimized
                    />
                  </div>
                  <h3
                    className="mb-2 text-xl font-bold text-[#111]"
                    style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
                  >
                    {variant.name}
                  </h3>
                  <p className="text-base text-[#555]">
                    <span className="font-bold" style={{ color: "#FF6600" }}>
                      {variant.highlight}
                    </span>{" "}
                    {variant.description.replace(variant.highlight + " ", "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 6 — SARDA GROUP                                           */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
        {/* Background */}
        <Image
          src="/images/company/sarda-bg.jpg"
          alt="Sarda Group heritage"
          fill
          className="object-cover"
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo */}
            <Image
              src="/images/logos/sarda-logo-white.svg"
              alt="Sarda Group"
              width={180}
              height={60}
              className="mx-auto mb-8 h-14 w-auto"
              unoptimized
            />

            <h2
              className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              The Strength Behind The Revolution
            </h2>
            <p className="mb-6 text-lg text-white/70 md:text-xl">
              Rooted in nearly a century of innovation and trust
            </p>
            <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/60">
              The Sarda Group is a diversified conglomerate with a legacy
              spanning over nine decades. Headquartered in India, the group
              operates across metals, ferro alloys, power, and now advanced
              insulation — driven by a philosophy of sustainable industrialization
              and technology-forward manufacturing.
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {SARDA_STATS.map((stat) => (
              <div
                key={stat.prefix}
                className="rounded-xl border border-white/10 px-4 py-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {stat.prefix}
                </p>
                <p
                  className="mt-1 text-lg font-bold text-white md:text-xl"
                  style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://www.sardagroup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              style={{ borderRadius: "25px" }}
            >
              Visit Us
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 7 — DOWNLOADS                                             */}
      {/* ================================================================== */}
      <section id="downloads" className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          {/* Heading */}
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#FF6600" }}
            >
              Resources
            </p>
            <h2
              className="text-3xl font-bold text-[#111] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Downloads
            </h2>
          </div>

          {/* Download categories */}
          {DOWNLOADS.map((category) => (
            <div key={category.category} className="mb-12 last:mb-0">
              <h3
                className="mb-6 text-xl font-bold text-[#111]"
                style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
              >
                {category.category}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-xl border border-[#e0e0e0] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6600]/30 hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-[#f9f9f9]">
                      <Image
                        src={item.thumb}
                        alt={item.name}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    {/* Title */}
                    <div className="flex items-center gap-2 px-4 py-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span className="text-sm font-medium text-[#333] group-hover:text-[#FF6600] transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 8 — ACCREDITATIONS                                        */}
      {/* ================================================================== */}
      <section
        id="accreditation"
        className="py-20 md:py-28 lg:py-32"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#FF6600" }}
            >
              Trust & Quality
            </p>
            <h2
              className="text-3xl font-bold text-[#111] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Accreditation
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-xl border border-[#e0e0e0] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6600]/30 hover:shadow-lg"
              >
                <div className="relative mb-3 h-20 w-20">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-xs font-semibold text-[#333] group-hover:text-[#FF6600] transition-colors">
                  {cert.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 9 — CONTACT FORM                                          */}
      {/* ================================================================== */}
      <section id="form" className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#FF6600" }}
            >
              Reach Out
            </p>
            <h2
              className="text-3xl font-bold text-[#111] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display, Space Grotesk, sans-serif)" }}
            >
              Get in Touch
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-2xl rounded-2xl border border-[#e0e0e0] bg-white p-8 shadow-sm md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="you@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Country */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="India"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="Mumbai"
                />
              </div>

              {/* Product */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Product of Interest
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#ccc] bg-white px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                >
                  <option value="">Select a product</option>
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#333]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-lg border border-[#ccc] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#FF6600]"
                  placeholder="Tell us about your requirements..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full py-3.5 text-base font-semibold text-white transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(to right, #FF6600, #FF8800)",
                borderRadius: "25px",
              }}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTION 10 — FOOTER                                               */}
      {/* ================================================================== */}
      <footer className="bg-[#111] text-white">
        {/* Orange top line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #FF6600 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 md:px-12 xl:px-20">
          {/* Top row: Logo + Zone Managers */}
          <div className="mb-12 grid gap-10 lg:grid-cols-5">
            {/* Logo & tagline */}
            <div className="lg:col-span-1">
              <Image
                src="/images/logos/rhino-main-logo.svg"
                alt="Rhino Insulation"
                width={140}
                height={40}
                className="mb-4 h-9 w-auto brightness-0 invert"
                unoptimized
              />
              <p className="text-sm leading-relaxed text-white/50">
                India&apos;s Greenest Rock Mineral Wool. A Sarda Group venture.
              </p>
            </div>

            {/* Zone Managers */}
            {FOOTER_ZONES.map((zone) => (
              <div key={zone.zone}>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                  {zone.zone}
                </h4>
                <p className="text-sm font-medium text-white/80">{zone.name}</p>
                <p className="mt-1 text-sm text-white/50">{zone.phone}</p>
                <a
                  href={`mailto:${zone.email}`}
                  className="text-sm text-white/50 transition-colors hover:text-[#FF6600]"
                >
                  {zone.email}
                </a>
              </div>
            ))}
          </div>

          {/* Offices */}
          <div className="mb-12 border-t border-white/10 pt-8">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-wider text-white/40">
              Our Offices
            </h4>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FOOTER_OFFICES.map((office) => (
                <div key={office.city}>
                  <p className="mb-1 text-sm font-semibold text-white/80">
                    {office.city}
                  </p>
                  <p className="text-xs leading-relaxed text-white/40">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation logos */}
          <div className="mb-8 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {CERTIFICATIONS.slice(0, 5).map((cert) => (
                <div
                  key={cert.name}
                  className="relative h-10 w-10 opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0"
                >
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row">
            <p>&copy;2026. Rhino. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white/60"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-white/60"
              >
                Terms &amp; Condition
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
