import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rhino Rock Mineral Wool. Regional offices across India. Sales inquiries, technical support, and dealership opportunities.",
};

export default function Contact() {
  return <ContactPage />;
}
