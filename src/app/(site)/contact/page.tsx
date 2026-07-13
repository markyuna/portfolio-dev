import type { Metadata } from "next";
import ContactPageContent from "@/components/sections/ContactPageContent";

const title = "Contact";
const description =
  "Start a project with Marcos Suarez — premium websites, modern UX and high-end web experiences. Usually responds within 24 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
