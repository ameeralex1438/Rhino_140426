import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/hero";
import { Timeline } from "@/components/sections/about/timeline";
import { Manufacturing } from "@/components/sections/about/manufacturing";
import { Leadership } from "@/components/sections/about/leadership";
import { SardaGroupCredibility } from "@/components/sections/about/leadership";
import { CertificationsDeepDive } from "@/components/sections/about/leadership";
import { EventsAwards } from "@/components/sections/about/events-awards";
import { CtaSection } from "@/components/sections/home/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "From a steel trading shop in the 1930s to India's greenest rock mineral wool. 90 years of industrial excellence by the Sarda Group.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Timeline />
      <Manufacturing />
      <Leadership />
      <SardaGroupCredibility />
      <EventsAwards />
      <CertificationsDeepDive />
      <CtaSection />
    </>
  );
}
