import type { Metadata } from "next";
import { DealersPage } from "@/components/sections/dealers/dealers-page";

export const metadata: Metadata = {
  title: "Dealers & Distribution",
  description:
    "Find a Rhino insulation dealer near you or apply to become a distributor. Regional sales offices across India.",
};

export default function Dealers() {
  return <DealersPage />;
}
