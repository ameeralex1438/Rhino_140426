import type { Metadata } from "next";
import { ApplicationsPage } from "@/components/sections/applications/applications-page";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Rhino rock mineral wool insulation for industrial, commercial, residential, HVAC, marine, and fire safety applications.",
};

export default function Applications() {
  return <ApplicationsPage />;
}
