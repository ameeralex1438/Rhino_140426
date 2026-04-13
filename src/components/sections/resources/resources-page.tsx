"use client";

import { motion } from "framer-motion";
import { Download, FileText, Shield, Award, ArrowUpRight, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const ease = [0.16, 1, 0.3, 1] as const;

const brochures = [
  { name: "Corporate Brochure", description: "Sarda Group overview and Rhino brand story", image: "/images/downloads/corp-brochure-thumb.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/692839215efbb5734008f0c0_RHINO%20-%20SARDA%20CORPORATE%20BROCHURE%20V2-06.08.2025%20(1).pdf" },
  { name: "Product Catalogue", description: "Complete product range with specifications", image: "/images/downloads/prod-brochure-thumb.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69283970a066196e1d5d8dd0_Backup_of_Rhino_Product_Brochure%2012.11.2025_compressed.pdf" },
];

const tds = [
  { name: "Rhino Slabs", code: "RSL", image: "/images/downloads/tds-rsl-thumb.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27983e5007ebcdfb924f9_RHINO.SLAB.RSL.TDS%20JUN%20V1.01.pdf" },
  { name: "Rhino Wired Matts", code: "RWM", image: "/images/downloads/tds-rwm-thumb.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27973d91ae4a78ddf4e09_RHINO.WIRED.MATTS.RWM.TDS%20JUN%20V1.01.pdf" },
  { name: "Rhino RockArmor", code: "RRA", image: "/images/downloads/tds-rra-thumb.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b2799194b819313f204399_RHINO.ROCKARMOR.RRA.TDS%20JUN%20V1.01.pdf" },
  { name: "Rhino Loose Wool", code: "RLW", image: "/images/downloads/tds-rlw-thumb.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b279c0eeb9659891c1100b_RHINO.LOOSEWOOL.RLW.TDS%20JUN%20V1.01.pdf" },
];

const safety = [
  { name: "Material Safety Data Sheet (MSDS)", description: "Complete safety, handling, and disposal information", image: "/images/downloads/msds-thumb.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69b924915426dde74538cc47_RHINO.MSDS%20MAR%20V1.01%20.pdf" },
];

const certificates = [
  { name: "ISO 9001", label: "Quality Management", image: "/images/certifications/iso-9001.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8918bdf72ba252437_ISO_9001-ENG-187401-2015-AQ-IND-RvA-8-20250831.pdf", category: "iso" },
  { name: "ISO 14001", label: "Environmental Management", image: "/images/certifications/iso-14001.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf852f02dbf5c756f9e_ISO_14001-ENG-187402-2015-AE-IND-RvA-8-20250831.pdf", category: "iso" },
  { name: "ISO 45001", label: "Occupational Health & Safety", image: "/images/certifications/iso-45001.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8bce64aae0b59d44b_ISO_45001-ENG-C714980-2-20250831.pdf", category: "iso" },
  { name: "ISO 50001", label: "Energy Management", image: "/images/certifications/iso-50001.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d30cd13f2b3971db951_ISO-50001-2018.pdf", category: "iso" },
  { name: "NaBL", label: "Lab Accreditation", image: "/images/certifications/nabl.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d306a829551a9199e2e_NaBL%20Certificate%20TC-12249.pdf", category: "national" },
  { name: "Export House", label: "Three Star Status", image: "/images/certifications/export-house.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d309d5fb1b57f6928e1_Three_Star_Export_House_Certificate_-_SMAL.pdf", category: "national" },
  { name: "IS 8183", label: "BIS Standard", image: "/images/certifications/is-8183.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf8fc99ad9993f3e196_BIS%20Bonded%20Mineral%20Wool%20Certificate.pdf", category: "national" },
  { name: "IS 1470", label: "BIS Mineral Wool", image: "/images/certifications/is-1470.avif", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61cf83cfa78298be3051c_BIS%20Silico%20Manganese.pdf", category: "national" },
  { name: "Great Place to Work", label: "Certified 2025", image: "/images/certifications/gptw.png", url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68c61d309d012d88280c1066_GPTW%20-%20Sarda%20Metals%20%26%20Alloys%20Limited_Certificate.pdf", category: "other" },
];

/* Reusable download card with image */
function DownloadCard({ name, description, code, image, url, icon: Icon }: { name: string; description?: string; code?: string; image?: string; url: string; icon: LucideIcon }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-[#FF6600]/30 hover:shadow-lg"
    >
      {/* Thumbnail */}
      {image && (
        <div className="relative shrink-0 overflow-hidden bg-[#FAFAF8] p-2 sm:p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105 md:h-36"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 items-center gap-4 p-5 md:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6600]/10 transition-colors duration-300 group-hover:bg-[#FF6600]">
          <Icon className="h-5 w-5 text-[#FF6600] transition-colors duration-300 group-hover:text-white" strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold text-[#111]">{name}</h3>
            {code && (
              <span className="rounded-full bg-[#FF8800]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#FF8800]">
                {code}
              </span>
            )}
          </div>
          {description && <p className="mt-1 text-sm text-[#555]">{description}</p>}
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6600] opacity-0 transition-all duration-300 group-hover:opacity-100">
            Download PDF <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* Section header helper */
function SectionHeader({ eyebrow, title, icon: Icon }: { eyebrow: string; title: string; icon: LucideIcon }) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6600]/10">
          <Icon className="h-4 w-4 text-[#FF6600]" strokeWidth={1.8} />
        </div>
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">{title}</h2>
    </div>
  );
}

export function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pb-8 pt-32 md:px-12 md:pb-10 md:pt-40 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">Resources</span>
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold text-[#111] sm:text-5xl md:text-6xl">
              Downloads &amp; Documentation
            </h1>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="max-w-2xl text-base leading-relaxed text-[#555] md:text-lg">
              Access brochures, technical data sheets, safety documentation, and certification PDFs.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Brochures */}
      <section className="bg-[#FAFAF8] px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader eyebrow="Brochures" title="Company & Product Brochures" icon={BookOpen} />
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {brochures.map((b) => (
              <motion.div key={b.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                <DownloadCard name={b.name} description={b.description} image={b.image} url={b.url} icon={BookOpen} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TDS */}
      <section className="bg-white px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader eyebrow="Technical Data" title="Technical Data Sheets" icon={FileText} />
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {tds.map((t) => (
              <motion.div key={t.code} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                <DownloadCard name={t.name} code={t.code} image={t.image} url={t.url} icon={FileText} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-[#FAFAF8] px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader eyebrow="Safety" title="Safety Documentation" icon={Shield} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="max-w-xl"
          >
            <DownloadCard name={safety[0].name} description={safety[0].description} image={safety[0].image} url={safety[0].url} icon={Shield} />
          </motion.div>
        </div>
      </section>

      {/* Certifications — matching homepage accreditations style */}
      <section className="bg-white px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader eyebrow="Certifications" title="Accreditations & Certificates" icon={Award} />

          {/* ISO row — featured larger */}
          <motion.div
            className="mb-5 grid grid-cols-2 gap-5 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {certificates.filter((c) => c.category === "iso").map((c) => (
              <motion.div key={c.name} variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } } }}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-7 text-center transition-all duration-500 hover:border-rhino-orange/25 hover:shadow-[0_16px_48px_-12px_rgba(255,102,0,0.12)] hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.name} className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110 md:h-24" />
                  <div>
                    <span className="block text-sm font-bold text-[#111]">{c.name}</span>
                    <span className="block text-xs text-[#666]">{c.label}</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ccc]">National & Industry</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* National + Other — smaller grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {certificates.filter((c) => c.category !== "iso").map((c) => (
              <motion.div key={c.name} variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } } }}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 text-center transition-all duration-500 hover:border-gray-200 hover:bg-white hover:shadow-lg hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.name} className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110 md:h-16" />
                  <div>
                    <span className="block text-xs font-bold text-[#333]">{c.name}</span>
                    <span className="block text-xs text-[#777]">{c.label}</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
