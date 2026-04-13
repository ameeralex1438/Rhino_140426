"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { faqs, faqCategories } from "@/data/company";

const ease = [0.16, 1, 0.3, 1] as const;

export function FAQClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <>
      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative overflow-hidden bg-rhino-charcoal px-6 pb-10 pt-36 md:px-12 md:pb-12 md:pt-44 xl:px-20">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-rhino-orange/[0.04] blur-[120px]" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1D6FA4]/[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] text-center">
          <BlurFade delay={0} inView>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Knowledge Base
              </span>
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="mx-auto mb-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-rhino-orange to-rhino-orange-light bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
              Everything you need to know about Rhino insulation — from product
              specifications to sustainability and compliance.
            </p>
          </BlurFade>

          {/* Search */}
          <BlurFade delay={0.3} inView>
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setOpenIndex(null);
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white placeholder:text-white/30 backdrop-blur-sm focus:border-rhino-orange/40 focus:outline-none focus:ring-1 focus:ring-rhino-orange/20 transition-all duration-300"
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ================================================================
          CATEGORY FILTER + FAQ ACCORDION
      ================================================================ */}
      <section className="relative bg-rhino-dark px-6 py-10 md:px-12 md:py-12 xl:px-20">
        <div className="mx-auto max-w-4xl">
          {/* Category pills */}
          <BlurFade delay={0} inView>
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    activeCategory === cat
                      ? "bg-rhino-orange text-white shadow-[0_0_20px_rgba(255,102,0,0.25)]"
                      : "border border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </BlurFade>

          {/* Result count */}
          <p className="mb-8 text-center text-sm text-white/30">
            {filtered.length} {filtered.length === 1 ? "question" : "questions"} found
          </p>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={`${faq.category}-${faq.question}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, ease, delay: Math.min(i * 0.04, 0.3) }}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "border-rhino-orange/20 bg-white/[0.05]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-start gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                            isOpen
                              ? "bg-rhino-orange/20 text-rhino-orange"
                              : "bg-white/[0.06] text-white/30"
                          )}
                        >
                          {faq.category}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "text-base font-semibold transition-colors duration-300 pr-4",
                          isOpen ? "text-white" : "text-white/70"
                        )}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-white/30 transition-transform duration-300",
                        isOpen && "rotate-180 text-rhino-orange"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px w-full bg-white/[0.06] mb-4" />
                          <p className="text-sm leading-[1.8] text-white/50">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-white/30">
                  No questions match your search. Try different keywords or browse by category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}
      <section className="relative overflow-hidden bg-rhino-charcoal px-6 py-24 md:px-12 xl:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rhino-orange/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <BlurFade delay={0} inView>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rhino-orange/10">
              <MessageCircle className="h-7 w-7 text-rhino-orange" />
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
              Still Have Questions?
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="mb-10 text-lg text-white/40">
              Our team is ready to help with specifications, project support, or
              anything else you need.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-rhino-orange px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-rhino-orange-light hover:shadow-[0_0_30px_rgba(255,102,0,0.3)]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/tools/product-selector"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Product Selector
              </a>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
