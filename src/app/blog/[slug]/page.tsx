import type { Metadata } from "next";
import { blogPosts, blogPostsSorted } from "@/data/blog";
import { notFound } from "next/navigation";
import { ArticleClient } from "./article-client";

/* -------------------------------------------------------------------------- */
/*  Static params                                                              */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* -------------------------------------------------------------------------- */
/*  Dynamic metadata                                                           */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Rhino Rock Mineral Wool`,
    description: post.excerpt,
  };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  /* Related: up to 3 posts from the same category (or fallback to newest) */
  const related = blogPostsSorted
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

  /* Strip non-serializable fields (icon is a LucideIcon component) */
  const serializePost = (p: typeof post) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    color: p.color,
    date: p.date,
    readTime: p.readTime,
    author: p.author,
    excerpt: p.excerpt,
    heroImage: p.heroImage,
    tags: p.tags,
    content: p.content,
  });

  return (
    <ArticleClient
      post={serializePost(post)}
      related={related.map(serializePost)}
    />
  );
}
