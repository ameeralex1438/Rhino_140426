"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Factory,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp as fadeIn, fadeInUpDelay } from "@/lib/animations";

const offices = [
  {
    icon: Building2,
    name: "Registered Office",
    address: "125, B-Wing, Mittal Court, Nariman Point, Mumbai 400021, MH",
    phone: "022 2288 0080",
  },
  {
    icon: Factory,
    name: "Manufacturing Works",
    address:
      "APIIC Industrial Park, Kantakapalli, Kothavalasa, Vizianagaram 535240, AP",
    phone: "089222 48203",
  },
  {
    icon: Building2,
    name: "Vizag Office",
    address:
      "D#: 50-96-4/1, 2nd & 3rd Floor, Sri Gowri Nilayam, Seethamdhara NE, Visakhapatnam 530017, AP",
    phone: "089128 58200",
  },
];

const zones = [
  {
    zone: "North Zone",
    contact: "Rohit Bhatia",
    phone: "+91 82877 68787",
    email: "rohit.bhatia@rhinoinsulation.in",
    cities: "Delhi",
  },
  {
    zone: "East Zone",
    contact: "Sanjib Ghosh",
    phone: "+91 99030 76013",
    email: "sanjib.ghosh@rhinoinsulation.in",
    cities: "Kolkata, Bhubaneswar",
  },
  {
    zone: "West Zone",
    contact: "Manish Vaghela",
    phone: "+91 89777 66563",
    email: "manish.vaghela@rhinoinsulation.in",
    cities: "Vadodara, Pune",
  },
  {
    zone: "South Zone",
    contact: "Deepak K. Shidlingappa",
    phone: "+91 733 111 3029",
    email: "deepak.ks@rhinoinsulation.in",
    cities: "Bengaluru, Chennai",
  },
];



export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 xl:px-20 bg-rhino-cream">
        <div className="max-w-[1440px] mx-auto">
          <motion.p {...fadeIn} className="text-rhino-orange text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Contact
          </motion.p>
          <motion.h1
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-rhino-gray-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-rhino-gray-600 text-xl max-w-2xl"
          >
            Whether you need technical support, want to request a quote, or are
            interested in becoming a dealer — we&apos;re here to help.
          </motion.p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 px-6 md:px-12 xl:px-20 bg-rhino-cream">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            {...fadeIn}
            href="tel:+919964674466"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-rhino-sand hover:border-rhino-orange hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-rhino-orange-pale flex items-center justify-center">
              <Phone className="w-5 h-5 text-rhino-orange" />
            </div>
            <div>
              <p className="text-rhino-gray-900 font-medium">Call Us</p>
              <p className="text-rhino-gray-600">+91 99646 74466</p>
            </div>
          </motion.a>
          <motion.a
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
            href="mailto:sales@rhinoinsulation.in"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-rhino-sand hover:border-rhino-orange hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-rhino-orange-pale flex items-center justify-center">
              <Mail className="w-5 h-5 text-rhino-orange" />
            </div>
            <div>
              <p className="text-rhino-gray-900 font-medium">Email Us</p>
              <p className="text-rhino-gray-600">sales@rhinoinsulation.in</p>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Form + Offices */}
      <section className="py-20 px-6 md:px-12 xl:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div {...fadeIn}>
            <h2 className="font-display text-3xl font-bold text-rhino-gray-900 mb-8">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 placeholder:text-rhino-gray-400 focus:border-rhino-orange focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formState.company}
                  onChange={(e) =>
                    setFormState({ ...formState, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 placeholder:text-rhino-gray-400 focus:border-rhino-orange focus:outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 placeholder:text-rhino-gray-400 focus:border-rhino-orange focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 placeholder:text-rhino-gray-400 focus:border-rhino-orange focus:outline-none transition-colors"
                />
              </div>
              <select
                value={formState.product}
                onChange={(e) =>
                  setFormState({ ...formState, product: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 focus:border-rhino-orange focus:outline-none transition-colors"
              >
                <option value="">Select Product Interest</option>
                <option value="RSL">Rhino Slabs (RSL)</option>
                <option value="RWM">Rhino Wired Matts (RWM)</option>
                <option value="RBR">Rhino Building Rolls (RBR)</option>
                <option value="RRA">Rhino RockArmor (RRA)</option>
                <option value="RLW">Rhino Loose Wool (RLW)</option>
                <option value="other">Other / General Inquiry</option>
              </select>
              <textarea
                placeholder="Your Message *"
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-rhino-sand rounded-xl text-rhino-gray-900 placeholder:text-rhino-gray-400 focus:border-rhino-orange focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all",
                  submitted
                    ? "bg-rhino-orange-light text-white"
                    : "bg-rhino-orange text-white hover:bg-rhino-orange-light"
                )}
              >
                {submitted ? "Message Sent!" : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Offices */}
          <div className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-rhino-gray-900 mb-8">
              Our Offices
            </h2>
            {offices.map((office, i) => (
              <motion.div
                key={office.name}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-rhino-sand hover:border-rhino-orange hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-rhino-orange-pale flex items-center justify-center shrink-0 mt-1">
                    <office.icon className="w-5 h-5 text-rhino-orange" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-rhino-gray-900 mb-1">
                      {office.name}
                    </h3>
                    <p className="text-rhino-gray-600 text-sm mb-2">
                      {office.address}
                    </p>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-rhino-orange text-sm hover:underline"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Zones */}
      <section className="py-20 px-6 md:px-12 xl:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <motion.h2
            {...fadeIn}
            className="font-display text-3xl font-bold text-rhino-gray-900 mb-4"
          >
            Regional Sales Teams
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
            className="text-rhino-gray-600 mb-12"
          >
            Connect directly with your regional sales manager for faster assistance.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.zone}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-rhino-sand hover:border-rhino-orange hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-rhino-orange" />
                  <h3 className="font-display font-semibold text-rhino-gray-900">
                    {zone.zone}
                  </h3>
                </div>
                <p className="text-rhino-gray-900 font-medium mb-1">{zone.contact}</p>
                <p className="text-rhino-gray-500 text-sm mb-3">
                  {zone.cities}
                </p>
                <div className="space-y-1">
                  <a
                    href={`tel:${zone.phone.replace(/\s/g, "")}`}
                    className="block text-sm text-rhino-gray-600 hover:text-rhino-orange transition-colors"
                  >
                    {zone.phone}
                  </a>
                  <a
                    href={`mailto:${zone.email}`}
                    className="block text-sm text-rhino-gray-600 hover:text-rhino-orange transition-colors truncate"
                  >
                    {zone.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
