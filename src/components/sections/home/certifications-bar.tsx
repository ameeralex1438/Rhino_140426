"use client";

import Image from "next/image";
import { certifications } from "@/data/products";

/* Map cert names to real certification logo images */
const certImageMap: Record<string, string> = {
  "ISO 9001": "/images/certifications/iso-9001.png",
  "ISO 14001": "/images/certifications/iso-14001.png",
  "ISO 45001": "/images/certifications/iso-45001.png",
  "ISO 50001": "/images/certifications/iso-50001.png",
  NaBL: "/images/certifications/nabl.avif",
  BIS: "/images/certifications/is-8183.avif",
  "Three Star": "/images/certifications/export-house.avif",
  GPTW: "/images/certifications/gptw.png",
};

/* Duplicate items for seamless infinite scroll */
const items = [...certifications, ...certifications];

export function CertificationsBar() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      {/* Green gradient line above */}
      <div className="line-gradient absolute inset-x-0 top-0" />

      {/* Marquee */}
      <div className="group relative flex overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />

        <div className="animate-marquee flex shrink-0 items-center gap-6 group-hover:[animation-play-state:paused] md:gap-10">
          {items.map((cert, i) => {
            const imageSrc = certImageMap[cert.name];
            return (
              <div
                key={`${cert.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-rhino-sand bg-white px-5 py-2.5 transition-all duration-300 hover:border-rhino-orange hover:shadow-[0_4px_16px_rgba(255,107,0,0.06)]"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={cert.name}
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="h-8 w-8 rounded-full bg-rhino-orange-pale" />
                )}
                <span className="whitespace-nowrap text-sm font-medium text-rhino-gray-900">
                  {cert.name}
                </span>
                <span className="whitespace-nowrap text-xs text-rhino-gray-500">
                  {cert.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className="animate-marquee flex shrink-0 items-center gap-6 group-hover:[animation-play-state:paused] md:gap-10"
          aria-hidden
        >
          {items.map((cert, i) => {
            const imageSrc = certImageMap[cert.name];
            return (
              <div
                key={`dup-${cert.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-rhino-sand bg-white px-5 py-2.5 transition-all duration-300 hover:border-rhino-orange hover:shadow-[0_4px_16px_rgba(255,107,0,0.06)]"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={cert.name}
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="h-8 w-8 rounded-full bg-rhino-orange-pale" />
                )}
                <span className="whitespace-nowrap text-sm font-medium text-rhino-gray-900">
                  {cert.name}
                </span>
                <span className="whitespace-nowrap text-xs text-rhino-gray-500">
                  {cert.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
