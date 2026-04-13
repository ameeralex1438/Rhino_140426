import type { Metadata } from "next";
import { CaseStudiesListing } from "./listing";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world project showcases — see how Rhino insulation performs in power stations, green buildings, and offshore platforms.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesListing />;
}
