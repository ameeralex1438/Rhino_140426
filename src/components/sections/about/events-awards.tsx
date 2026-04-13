"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Rocket,
  Award,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  Calendar,
  ExternalLink,
  Newspaper,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import { BlurFade } from "@/components/ui/blur-fade";
import { events, pressLinks, type Event } from "@/data/company";

const FloatingParticlesBackground = dynamic(
  () =>
    import("@/components/ui/floating-particles").then(
      (m) => m.FloatingParticlesBackground,
    ),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;

/* ========================================================================== */
/*  Type badge                                                                 */
/* ========================================================================== */

const typeConfig: Record<
  Event["type"],
  { label: string; icon: typeof Rocket; bg: string; text: string }
> = {
  launch: {
    label: "Product Launch",
    icon: Rocket,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  award: {
    label: "Award",
    icon: Award,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  expo: {
    label: "Exhibition",
    icon: Building2,
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  conference: {
    label: "Conference",
    icon: Users,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
};

function TypeBadge({ type }: { type: Event["type"] }) {
  const cfg = typeConfig[type];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <Icon className="h-3 w-3" strokeWidth={2} />
      {cfg.label}
    </span>
  );
}

/* ========================================================================== */
/*  Event card                                                                 */
/* ========================================================================== */

function EventCard({
  event,
  index,
  isRight,
}: {
  event: Event;
  index: number;
  isRight: boolean;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.15} inView>
      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="card-shine group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-gray-300 hover:shadow-lg md:p-8"
      >
        {/* Accent glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-10 blur-[80px]"
          style={{ background: event.color }}
        />

        {/* Badge + meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <TypeBadge type={event.type} />
          <span className="flex items-center gap-1.5 text-xs text-[#666]">
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#666]">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {event.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-[#111] md:text-2xl">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-[1.85] text-[#555]">
          {event.description}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2">
          {event.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-[#444]">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: event.color }}
                strokeWidth={1.5}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Photo gallery */}
        {event.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {event.images.map((img, i) => (
              <BlurFade key={img} delay={0.2 + i * 0.08} inView>
                <div className="group/img relative h-32 overflow-hidden rounded-xl md:h-40">
                  <Image
                    src={img}
                    alt={`${event.title} - photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover/img:bg-black/0" />
                </div>
              </BlurFade>
            ))}
          </div>
        )}
      </motion.div>
    </BlurFade>
  );
}

/* ========================================================================== */
/*  Press card                                                                 */
/* ========================================================================== */

function PressCard({
  item,
  index,
}: {
  item: (typeof pressLinks)[number];
  index: number;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.08} inView>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-shine group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-500 hover:border-rhino-orange/30 hover:shadow-lg"
      >
        <div>
          <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rhino-orange uppercase">
            <Newspaper className="h-3 w-3" strokeWidth={2} />
            {item.source}
          </span>
          <p className="text-sm font-medium leading-relaxed text-[#333] line-clamp-3">
            {item.title}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#666] transition-colors group-hover:text-rhino-orange">
          Read article
          <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
        </div>
      </a>
    </BlurFade>
  );
}

/* ========================================================================== */
/*  MAIN EXPORT                                                                */
/* ========================================================================== */

export function EventsAwards() {
  return (
    <section className="relative overflow-hidden bg-white py-28 md:py-36">
      <FloatingParticlesBackground light />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {/* Section header */}
        <Reveal>
          <div className="mb-16 text-center md:mb-20">
            <span className="mb-3 inline-block font-mono text-xs font-semibold tracking-[0.3em] uppercase text-rhino-orange">
              Events & Awards
            </span>
            <h2 className="font-display text-4xl font-bold text-[#111] md:text-5xl lg:text-6xl">
              Making an Impact
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-[#555]">
              From landmark product launches to global recognition &mdash; milestones
              that mark Rhino&apos;s journey.
            </p>
          </div>
        </Reveal>

        {/* ================================================================ */}
        {/*  Events timeline                                                  */}
        {/* ================================================================ */}
        <div className="relative mb-24">
          {/* Vertical timeline line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-rhino-orange/30 via-gray-200 to-transparent md:block" />

          <div className="space-y-10 md:space-y-16">
            {events.map((event, i) => {
              const isRight = i % 2 !== 0;
              return (
                <div
                  key={event.id}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Timeline dot (desktop) */}
                  <div className="absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ background: event.color }}
                      />
                      <div
                        className="absolute h-5 w-5 animate-ping rounded-full opacity-20"
                        style={{ background: event.color }}
                      />
                    </div>
                  </div>

                  {/* Card placement: alternate left/right */}
                  {isRight ? (
                    <>
                      <div className="hidden md:block" />
                      <EventCard event={event} index={i} isRight={isRight} />
                    </>
                  ) : (
                    <>
                      <EventCard event={event} index={i} isRight={isRight} />
                      <div className="hidden md:block" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================ */}
        {/*  Press coverage                                                   */}
        {/* ================================================================ */}
        <Reveal>
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block font-mono text-xs font-semibold tracking-[0.3em] uppercase text-[#666]">
              In the Press
            </span>
            <h3 className="font-display text-2xl font-bold text-[#111] md:text-3xl">
              Industry Coverage
            </h3>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pressLinks.map((item, i) => (
            <PressCard key={item.url} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsAwards;
