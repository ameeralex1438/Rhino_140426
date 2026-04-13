import type { Metadata } from "next";
import { ResourcesPage } from "@/components/sections/resources/resources-page";

export const metadata: Metadata = {
  title: "Resources & Downloads",
  description:
    "Download Rhino product brochures, technical data sheets, MSDS, ISO certificates, and specification documents.",
};

export default function Resources() {
  return <ResourcesPage />;
}
