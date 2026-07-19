import type { Metadata } from "next";
import StartProjectPageContent from "@/components/sections/StartProjectPageContent";

const title = "Démarrer un projet";
const description =
  "Décrivez votre projet en quelques questions et recevez une estimation indicative — Marcos Suarez, développeur web à Paris.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/demarrer-un-projet",
  },
  openGraph: {
    url: "/demarrer-un-projet",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function StartProjectPage() {
  return <StartProjectPageContent />;
}
