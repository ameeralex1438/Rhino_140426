"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

/* -------------------------------------------------------------------------- */
/*  Contact form section — two-column premium layout                          */
/* -------------------------------------------------------------------------- */

const PRODUCT_OPTIONS = [
  "Rhino Slabs (RSL)",
  "Rhino Wired Matts (RWM)",
  "Rhino Building Rolls (RBR)",
  "Rhino RockArmor (RRA)",
  "Rhino Loose Wool (RLW)",
];

const OFFICES = [
  { city: "Raipur", detail: "Corporate HQ, Chhattisgarh" },
  { city: "Mumbai", detail: "Regional Sales Office" },
  { city: "Delhi NCR", detail: "North India Sales" },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    product: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you soon.");
  };

  const inputClasses =
    "w-full border-0 border-b border-[#ddd] bg-transparent pb-3 pt-1 text-[14px] text-[#111] outline-none transition-colors duration-300 placeholder:text-[#ccc] focus:border-rhino-orange";

  const labelClasses =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-[#666]";

  return (
    <section id="form" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* ---- Left side — Info (40%) ---- */}
          <div className="lg:w-[40%]">
            <BlurFade delay={0.1} inView>
              <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-rhino-orange">
                Reach Out
              </span>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#111] md:text-4xl lg:text-[2.75rem]">
                Get in Touch
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="mt-6 text-[15px] font-light leading-[1.8] text-[#555]">
                Whether you need a quote, technical support, or want to become a
                dealer — our team is ready to help. Reach out and we will get
                back to you within 24 hours.
              </p>
            </BlurFade>

            {/* Contact info */}
            <BlurFade delay={0.4} inView>
              <div className="mt-10 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <Phone className="h-4 w-4 text-rhino-orange" />
                  <span className="text-[14px] text-[#444]">
                    +91 771 400 4000
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-4 w-4 text-rhino-orange" />
                  <span className="text-[14px] text-[#444]">
                    info@rhinoinsulation.in
                  </span>
                </div>
              </div>
            </BlurFade>

            {/* Regional offices */}
            <BlurFade delay={0.5} inView>
              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#666]">
                  Regional Offices
                </p>
                <div className="flex flex-col gap-3">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#ccc]" />
                      <div>
                        <p className="text-[13px] font-semibold text-[#333]">
                          {office.city}
                        </p>
                        <p className="text-[12px] text-[#666]">
                          {office.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          {/* ---- Right side — Form (60%) ---- */}
          <div className="lg:w-[60%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name — full width */}
              <BlurFade delay={0.15} inView>
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                </div>
              </BlurFade>

              {/* Email + Phone row */}
              <BlurFade delay={0.25} inView>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClasses}>
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* Country + City row */}
              <BlurFade delay={0.35} inView>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-country" className={labelClasses}>
                      Country
                    </label>
                    <input
                      id="contact-country"
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="India"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-city" className={labelClasses}>
                      City
                    </label>
                    <input
                      id="contact-city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Mumbai"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* Product — full width */}
              <BlurFade delay={0.45} inView>
                <div>
                  <label htmlFor="contact-product" className={labelClasses}>
                    Product of Interest
                  </label>
                  <select
                    id="contact-product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="">Select a product</option>
                    {PRODUCT_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </BlurFade>

              {/* Message */}
              <BlurFade delay={0.55} inView>
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your requirements..."
                  />
                </div>
              </BlurFade>

              {/* Submit */}
              <BlurFade delay={0.65} inView>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg py-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:brightness-110"
                  style={{
                    background: "linear-gradient(to right, var(--color-rhino-orange), #FF8800)",
                  }}
                >
                  Submit Inquiry
                </button>
              </BlurFade>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
