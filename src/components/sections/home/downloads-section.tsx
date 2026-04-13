"use client";

import { useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

/* -------------------------------------------------------------------------- */
/*  Downloads section — Brochures, TDS, Safety PDFs                           */
/* -------------------------------------------------------------------------- */

const DOWNLOADS = [
  {
    category: "Brochures",
    items: [
      {
        name: "Corporate Brochure",
        thumb: "/images/downloads/corp-brochure-thumb.avif",
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/692839215efbb5734008f0c0_RHINO%20-%20SARDA%20CORPORATE%20BROCHURE%20V2-06.08.2025%20(1).pdf",
      },
      {
        name: "Product Brochure",
        thumb: "/images/downloads/prod-brochure-thumb.avif",
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69283970a066196e1d5d8dd0_Backup_of_Rhino_Product_Brochure%2012.11.2025_compressed.pdf",
      },
    ],
  },
  {
    category: "Technical Data Sheets",
    items: [
      {
        name: "RRA \u2014 RockArmor",
        thumb: "/images/downloads/tds-rra-thumb.png",
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b2799194b819313f204399_RHINO.ROCKARMOR.RRA.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RWM \u2014 Wired Matts",
        thumb: "/images/downloads/tds-rwm-thumb.avif",
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27973d91ae4a78ddf4e09_RHINO.WIRED.MATTS.RWM.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RSL \u2014 Slabs",
        thumb: "/images/downloads/tds-rsl-thumb.avif",
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/68b27983e5007ebcdfb924f9_RHINO.SLAB.RSL.TDS%20JUN%20V1.01.pdf",
      },
      {
        name: "RLW \u2014 Loose Wool",
        thumb: "/images/downloads/tds-rlw-thumb.png",
        type: "PDF",
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
        type: "PDF",
        url: "https://cdn.prod.website-files.com/6804caf3d56cac735a5674a1/69b924915426dde74538cc47_RHINO.MSDS%20MAR%20V1.01%20.pdf",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Single download card with BorderBeam on hover                              */
/* -------------------------------------------------------------------------- */

function DownloadCard({
  item,
  index,
}: {
  item: { name: string; thumb: string; type: string; url: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <BlurFade delay={0.1 + index * 0.06} inView>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* BorderBeam — visible on hover */}
        {hovered && (
          <BorderBeam
            size={100}
            duration={8}
            colorFrom="var(--color-rhino-orange)"
            colorTo="#FF8800"
          />
        )}

        {/* Thumbnail */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f7f7f7]">
          <Image
            src={item.thumb}
            alt={item.name}
            fill
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Title + type */}
        <div className="pt-4">
          <p className="text-[14px] font-semibold text-[#111] transition-colors duration-200 group-hover:text-rhino-orange">
            {item.name}
          </p>
          <p className="mt-0.5 text-xs text-[#666]">{item.type}</p>
        </div>
      </a>
    </BlurFade>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export function DownloadsSection() {
  let globalIndex = 0;

  return (
    <section id="downloads" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.1} inView>
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-rhino-orange">
              Resources
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#111] md:text-4xl lg:text-[2.75rem]">
              Downloads
            </h2>
          </BlurFade>
        </div>

        {/* Download categories */}
        {DOWNLOADS.map((category) => (
          <div key={category.category} className="mb-14 last:mb-0">
            {/* Category label */}
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
              {category.category}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.items.map((item) => {
                const idx = globalIndex++;
                return (
                  <DownloadCard key={item.name} item={item} index={idx} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
