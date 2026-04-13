"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";

/* -------------------------------------------------------------------------- */
/*  Scroll-driven text reveal — placed between Hero and first FeatureSection   */
/* -------------------------------------------------------------------------- */

const REVEAL_TEXT =
  "Forged in India\u2019s first electric smelter \u2014 zero fossil fuels, zero emissions, up to 65% less CO\u2082 \u2014 Rhino Rock Mineral Wool is redefining what insulation can be.";

export function TextRevealSection() {
  return (
    <section className="w-full bg-white">
      <TextRevealByWord text={REVEAL_TEXT} />
    </section>
  );
}
