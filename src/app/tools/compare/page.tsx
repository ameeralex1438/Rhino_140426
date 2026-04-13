import type { Metadata } from "next";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = {
  title: "Compare Products",
  description:
    "Side-by-side specifications for all Rhino insulation products. Compare thermal conductivity, fire ratings, acoustic performance, and more across RSL, RWM, RBR, RRA, and RLW.",
};

export default function ComparePage() {
  return <CompareClient />;
}
