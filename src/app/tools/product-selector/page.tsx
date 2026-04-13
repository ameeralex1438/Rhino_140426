import type { Metadata } from "next";
import { ProductSelectorWizard } from "./wizard-client";

export const metadata: Metadata = {
  title: "Product Selector",
  description:
    "Find the right Rhino insulation product for your project. Answer a few questions about your application, temperature range, and priorities to get a tailored recommendation.",
};

export default function ProductSelectorPage() {
  return <ProductSelectorWizard />;
}
