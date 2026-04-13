"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const FloatingParticlesBackground = dynamic(
  () => import("@/components/ui/floating-particles").then((m) => m.FloatingParticlesBackground),
  { ssr: false },
);
const FloatingOrbsBackground = dynamic(
  () => import("@/components/ui/floating-orbs-bg").then((m) => m.FloatingOrbsBackground),
  { ssr: false },
);
import {
  Phone,
  Mail,
  Shield,
  GraduationCap,
  Megaphone,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Building2,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  regionalHeads,
  dealers,
  dealerBenefits,
  onboardingSteps,
} from "@/data/company";

const ease = [0.16, 1, 0.3, 1] as const;

const benefitIcons: LucideIcon[] = [Shield, GraduationCap, Megaphone, FlaskConical];

const zoneColors: Record<string, string> = {
  North: "#FF6600",
  East: "#2DB86E",
  West: "#FF8800",
  South: "#1D6FA4",
};

export function DealersPage() {
  const [formState, setFormState] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    existingBusiness: "",
    territoryInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls =
    "w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#111] placeholder:text-[#999] focus:border-rhino-orange focus:outline-none focus:ring-1 focus:ring-rhino-orange/30 transition-all duration-300";

  return (
    <>
      {/* ================================================================
          SECTION 1 — HERO (light, bg-white)
      ================================================================ */}
      <section className="relative overflow-hidden bg-white px-6 pb-12 pt-32 md:px-12 md:pt-40 xl:px-20">
        <FloatingOrbsBackground />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full blur-[140px]"
          style={{ background: "rgba(255,102,0,0.04)" }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: text — NO motion (Lenis breaks whileInView above fold) */}
          <div>
            <div className="animate-text-reveal mb-6 flex items-center gap-3" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <span className="h-px w-8 bg-rhino-orange md:w-12" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-rhino-orange md:text-sm">
                Dealer Network
              </span>
            </div>

            <h1 className="animate-text-reveal mb-6 font-display text-4xl font-bold leading-[1.05] text-[#111] sm:text-5xl md:text-6xl" style={{ "--delay": "0.2s" } as React.CSSProperties}>
              Partner With India&apos;s
              <br />
              <span className="text-rhino-orange">Greenest Insulation</span>
            </h1>

            <p className="animate-text-reveal mb-8 max-w-lg text-base leading-relaxed text-[#555] md:text-lg" style={{ "--delay": "0.4s" } as React.CSSProperties}>
              Join a growing network backed by Sarda Group&apos;s 90-year
              industrial legacy. Exclusive territories, technical training, and
              marketing support from India&apos;s first fossil-fuel-free rock
              mineral wool manufacturer.
            </p>

            <div className="animate-text-reveal" style={{ "--delay": "0.5s" } as React.CSSProperties}>
              <a
                href="#apply"
                className="animate-glow-pulse inline-flex items-center gap-2 rounded-full bg-rhino-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:bg-rhino-orange/90 hover:shadow-xl hover:shadow-rhino-orange/40 hover:scale-[1.02]"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: zone cards — CSS animation */}
          <div className="grid grid-cols-2 gap-4">
            {regionalHeads.map((head, i) => (
              <div
                key={head.zone}
                className="animate-text-reveal card-shine flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                style={{ "--delay": `${0.3 + i * 0.1}s` } as React.CSSProperties}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                  style={{ backgroundColor: zoneColors[head.zone] || head.color }}
                >
                  {head.zone[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#111]">
                    {head.zone} Zone
                  </p>
                  <p className="text-xs text-[#555]">
                    {head.cities.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ================================================================
          SECTION 2 — REGIONAL HEADS (bg-[#FAFAF8])
      ================================================================ */}
      <section className="relative overflow-hidden bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28 xl:px-20">
        <FloatingParticlesBackground light />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Sales Team
              </span>
              <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">
                Regional Sales Team
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {regionalHeads.map((head, i) => {
              const color = zoneColors[head.zone] || head.color;
              return (
                <BlurFade key={head.zone} delay={i * 0.08} inView className="h-full">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3, ease }}
                    className="card-shine relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                    style={{ borderLeft: `4px solid ${color}` }}
                  >
                    <div className="p-6">
                      {/* Zone badge */}
                      <span
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {head.zone} Zone
                      </span>

                      {/* Name */}
                      <h3 className="mb-3 font-display text-lg font-bold text-[#111]">
                        {head.name}
                      </h3>

                      {/* Contact info */}
                      <div className="mb-4 space-y-2">
                        <a
                          href={`tel:${head.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-rhino-orange"
                        >
                          <Phone className="h-3.5 w-3.5 shrink-0 text-[#999]" strokeWidth={1.8} />
                          {head.phone}
                        </a>
                        <a
                          href={`mailto:${head.email}`}
                          className="flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-rhino-orange"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0 text-[#999]" strokeWidth={1.8} />
                          <span className="truncate">{head.email}</span>
                        </a>
                      </div>

                      {/* Cities */}
                      <div className="flex flex-wrap gap-1.5">
                        {head.cities.map((city) => (
                          <span
                            key={city}
                            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-[#666]"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CURRENT DEALERS (bg-white)
      ================================================================ */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-28 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Partners
              </span>
              <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">
                Our Distribution Partners
              </h2>
            </div>
          </BlurFade>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
            {dealers.map((dealer, i) => (
              <BlurFade key={dealer.company} delay={i * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3, ease }}
                  className="card-shine rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rhino-orange/10">
                      <Building2 className="h-5 w-5 text-rhino-orange" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#111]">
                      {dealer.company}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-sm text-[#555]">
                    <p className="font-medium text-[#333]">{dealer.contact}</p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#999]" strokeWidth={1.8} />
                      {dealer.city}, {dealer.state}
                    </p>
                    {dealer.phone && (
                      <a
                        href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-1.5 transition-colors hover:text-rhino-orange"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#999]" strokeWidth={1.8} />
                        {dealer.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.3} inView>
            <p className="mt-10 text-center text-sm text-[#666]">
              And expanding across India —{" "}
              <a
                href="#apply"
                className="inline-flex items-center gap-1 font-semibold text-rhino-orange transition-colors hover:text-rhino-orange/80"
              >
                become our next partner <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — WHY PARTNER WITH RHINO (bg-[#FAFAF8])
      ================================================================ */}
      <section className="relative overflow-hidden bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28 xl:px-20">
        <FloatingOrbsBackground />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Benefits
              </span>
              <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">
                Why Partner With Rhino?
              </h2>
            </div>
          </BlurFade>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
            {dealerBenefits.map((benefit, i) => {
              const Icon = benefitIcons[i] || Shield;
              return (
                <BlurFade key={benefit.title} delay={i * 0.08} inView>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3, ease }}
                    className="card-shine rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rhino-orange/10">
                      <Icon className="h-5 w-5 text-rhino-orange" strokeWidth={1.8} />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-bold text-[#111]">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555]">
                      {benefit.description}
                    </p>
                  </motion.div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — ONBOARDING TIMELINE (bg-white)
      ================================================================ */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-28 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <BlurFade delay={0} inView>
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Process
              </span>
              <h2 className="font-display text-3xl font-bold text-[#111] md:text-4xl">
                Your Journey to Becoming a Dealer
              </h2>
            </div>
          </BlurFade>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative mx-auto max-w-5xl">
              {/* Dashed connector line */}
              <div className="absolute left-[10%] right-[10%] top-6 h-0.5 border-t-2 border-dashed border-gray-300" />

              <div className="relative grid grid-cols-5 gap-4">
                {onboardingSteps.map((step, i) => (
                  <BlurFade key={step.step} delay={i * 0.1} inView>
                    <div className="flex flex-col items-center text-center">
                      {/* Numbered circle */}
                      <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rhino-orange font-display text-lg font-bold text-white shadow-md">
                        {step.step}
                      </div>
                      <h4 className="mb-2 font-display text-base font-bold text-[#111]">
                        {step.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[#555]">
                        {step.description}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Vertical dashed line */}
              <div className="absolute bottom-0 left-[15px] top-0 w-0.5 border-l-2 border-dashed border-gray-300" />

              <div className="space-y-8">
                {onboardingSteps.map((step, i) => (
                  <BlurFade key={step.step} delay={i * 0.1} inView>
                    <div className="relative">
                      {/* Numbered circle */}
                      <div className="absolute -left-8 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-rhino-orange text-sm font-bold text-white shadow-md">
                        {step.step}
                      </div>
                      <div className="pl-4">
                        <h4 className="mb-1 font-display text-base font-bold text-[#111]">
                          {step.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-[#555]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — APPLICATION FORM (bg-[#FAFAF8])
      ================================================================ */}
      <section
        id="apply"
        className="relative scroll-mt-24 overflow-hidden bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28 xl:px-20"
      >
        <FloatingParticlesBackground light />
        <div className="relative z-10 mx-auto max-w-3xl">
          <BlurFade delay={0} inView>
            <div className="mb-12 text-center">
              <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.3em] text-rhino-orange">
                Apply
              </span>
              <h2 className="mb-3 font-display text-3xl font-bold text-[#111] md:text-4xl">
                Apply to Become a Dealer
              </h2>
              <p className="text-base text-[#555]">
                Fill out the form below and our regional team will contact you
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="card-shine rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold text-[#111]">
                    Application Submitted
                  </h3>
                  <p className="text-sm text-[#555]">
                    Our regional team will review your details and reach out
                    within 2-3 business days.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {/* Row: Company + Contact */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your company name"
                        value={formState.companyName}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            companyName: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={formState.contactPerson}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            contactPerson: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Row: Email + Phone */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            email: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            phone: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Row: City + State */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formState.city}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            city: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#333]">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={formState.state}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            state: e.target.value,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Existing Business */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#333]">
                      Existing Business
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your current business (products, sectors, annual turnover)"
                      value={formState.existingBusiness}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          existingBusiness: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  {/* Territory Interest */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#333]">
                      Territory Interest
                    </label>
                    <input
                      type="text"
                      placeholder="Which region/cities are you interested in?"
                      value={formState.territoryInterest}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          territoryInterest: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#333]">
                      Additional Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Anything else you'd like us to know?"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          message: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="animate-glow-pulse w-full rounded-full bg-rhino-orange px-8 py-4 font-display text-base font-semibold text-white shadow-lg shadow-rhino-orange/25 transition-all duration-300 hover:bg-rhino-orange/90 hover:shadow-xl hover:shadow-rhino-orange/40 hover:scale-[1.02] md:w-auto"
                    >
                      Submit Application &rarr;
                    </button>
                  </div>
                </div>
              )}
            </motion.form>
          </BlurFade>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — BOTTOM CTA (bg-white)
      ================================================================ */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-20 xl:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <BlurFade delay={0} inView>
            <h3 className="mb-4 font-display text-2xl font-bold text-[#111] md:text-3xl">
              Have questions?
            </h3>
            <p className="mb-6 text-base text-[#555]">
              Reach out to our team directly or visit our contact page.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#111] transition-all duration-300 hover:border-rhino-orange hover:text-rhino-orange hover:shadow-md"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918287768787"
                className="inline-flex items-center gap-2 rounded-full bg-rhino-orange/10 px-6 py-3 text-sm font-semibold text-rhino-orange transition-all duration-300 hover:bg-rhino-orange/20"
              >
                <Phone className="h-4 w-4" />
                +91 82877 68787
              </a>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
