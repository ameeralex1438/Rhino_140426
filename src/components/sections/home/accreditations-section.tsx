"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

/* -------------------------------------------------------------------------- */
/*  Accreditations section — certification logos with Marquee                  */
/* -------------------------------------------------------------------------- */

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

export function AccreditationsSection() {
  return (
    <section
      id="accreditation"
      className="py-16 md:py-24"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <BlurFade delay={0.1} inView>
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-rhino-orange">
              Trust &amp; Quality
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#111] md:text-4xl lg:text-[2.75rem]">
              Accreditations
            </h2>
          </BlurFade>
        </div>

        {/* Marquee of certification logos */}
        <Marquee pauseOnHover className="[--duration:50s] [--gap:3rem]">
          {CERTIFICATIONS.map((cert) => (
            <a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-all duration-300"
              title={cert.name}
            >
              <div className="relative h-12 w-16 md:w-20">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                  sizes="80px"
                />
              </div>
              <span className="text-xs font-medium text-[#666] transition-colors duration-300 group-hover:text-[#111]">
                {cert.name}
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
