import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/blog";
import { CaseStudyDetail } from "./detail";

/* ── Static params ───────────────────────────────────────────────── */

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/* ── Metadata ────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} | Rhino Rock Mineral Wool`,
    description: cs.excerpt,
  };
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return <CaseStudyDetail slug={slug} />;
}
