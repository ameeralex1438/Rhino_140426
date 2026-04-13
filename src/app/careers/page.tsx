import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Rhino Rock Mineral Wool — careers at India's greenest insulation manufacturer. A Sarda Group venture.",
};

export default function CareersPage() {
  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111] px-6 pb-20 pt-36 md:px-12 md:pt-44 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rhino-orange/5 to-transparent" />
        <div className="relative mx-auto max-w-[1440px]">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rhino-orange">
            Join the Herd
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Build India&apos;s Greenest Future
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Rhino is backed by the Sarda Group — decades of industrial
            leadership, now pioneering sustainable insulation with India&apos;s
            first electric smelter. We&apos;re growing fast and looking for
            people who want to make a real impact.
          </p>
        </div>
      </section>

      {/* Why Rhino */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">
          Why Rhino?
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "First-Mover Technology",
              desc: "Work with India's first Electric Arc Furnace for mineral wool — zero fossil fuels, cutting-edge manufacturing.",
            },
            {
              icon: MapPin,
              title: "Pan-India Impact",
              desc: "From power plants to green buildings, your work touches projects across every state in India.",
            },
            {
              icon: Briefcase,
              title: "Sarda Group Backing",
              desc: "The stability of a multi-decade industrial group with the energy of a startup brand.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200/60 bg-white p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rhino-orange/10">
                <item.icon className="h-6 w-6 text-rhino-orange" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#111]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Open positions CTA */}
        <div className="mt-20 rounded-2xl bg-[#111] p-10 text-center md:p-14">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Open Positions
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
            We&apos;re actively hiring across engineering, sales, and operations.
            Send your resume and a short note about why you want to join Rhino.
          </p>
          <a
            href="mailto:careers@rhinoinsulation.in"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-rhino-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-rhino-orange-dark hover:shadow-lg"
          >
            careers@rhinoinsulation.in &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
