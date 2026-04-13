import type { Metadata } from "next";
import { blogPostsSorted, blogCategories } from "@/data/blog";
import { BlogListingClient } from "./blog-listing-client";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description:
    "Industry insights, technical guides, and sustainability deep-dives from Rhino's engineering team. Stay ahead on insulation specifications, green building codes, and manufacturing innovation.",
};

export default function BlogPage() {
  /* Serialize posts for the client — strip the icon (LucideIcon is not serializable) */
  const posts = blogPostsSorted.map(({ icon, ...rest }) => rest);
  const categories = blogCategories;

  return <BlogListingClient posts={posts} categories={categories} />;
}
