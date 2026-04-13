import type { Metadata } from "next";
import { ProductsHub } from "@/components/sections/products/products-hub";
import { CtaSection } from "@/components/sections/home/cta-section";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Rhino's complete range of rock mineral wool insulation: Slabs, Wired Matts, Building Rolls, RockArmor, and Loose Wool. Available in Elite, Enduro, and Eco-Green variants.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHub />
      <CtaSection />
    </>
  );
}
