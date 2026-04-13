import type { Metadata } from "next";
import { FAQClient } from "./faq-client";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers about Rhino rock mineral wool insulation — products, specifications, sustainability, ECBC compliance, ordering, and installation.",
};

export default function FAQPage() {
  return <FAQClient />;
}
