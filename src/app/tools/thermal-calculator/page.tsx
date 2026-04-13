import type { Metadata } from "next";
import ThermalCalculatorClient from "./calculator-client";

export const metadata: Metadata = {
  title: "Thermal Calculator",
  description:
    "Calculate the optimal insulation thickness for your building assembly. ECBC 2023 compliant U-Value calculator for Rhino Rock Mineral Wool products.",
  keywords: [
    "U-value calculator",
    "thermal calculator",
    "insulation thickness",
    "ECBC compliance",
    "rock mineral wool calculator",
    "R-value",
    "thermal resistance",
  ],
};

export default function ThermalCalculatorPage() {
  return <ThermalCalculatorClient />;
}
