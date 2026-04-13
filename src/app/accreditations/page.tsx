import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, FileCheck, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditations & Certifications",
  description:
    "Rhino Rock Mineral Wool certifications, test reports, and industry accreditations by Sarda Metals & Alloys Ltd.",
};

const certifications = [
  {
    icon: ShieldCheck,
    title: "IS 8183:2024",
    body: "Bureau of Indian Standards certification for bonded mineral wool. Independently tested and verified for thermal conductivity, density, and fire resistance.",
  },
  {
    icon: Award,
    title: "CE Marking (EN 13162)",
    body: "European conformity marking for thermal insulation products for buildings. Meets harmonized EU performance standards.",
  },
  {
    icon: FileCheck,
    title: "FM Approved",
    body: "Factory Mutual approval for industrial and commercial insulation applications. Recognized globally for fire safety compliance.",
  },
  {
    icon: Globe,
    title: "GreenPro Certified",
    body: "CII-IGBC GreenPro certification for environmentally responsible manufacturing. Validates our commitment to sustainable production.",
  },
];

export default function AccreditationsPage() {
  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111] px-6 pb-20 pt-36 md:px-12 md:pt-44 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rhino-orange/5 to-transparent" />
        <div className="relative mx-auto max-w-[1440px]">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rhino-orange">
            Trust &amp; Compliance
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Accreditations &amp; Certifications
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Every Rhino product is backed by rigorous third-party testing and
            nationally &amp; internationally recognized certifications. No
            claims without proof.
          </p>
        </div>
      </section>

      {/* Certifications grid */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="group rounded-2xl border border-gray-200/60 bg-white p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rhino-orange/10">
                <cert.icon className="h-6 w-6 text-rhino-orange" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#111]">
                {cert.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#555]">
                {cert.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#666]">
            Need official test reports or certification documents for your
            project?
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-rhino-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-lg"
          >
            Request Documentation &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
