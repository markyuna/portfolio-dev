import { Locale } from "@/lib/translations";

export type ProjectStatus = "En ligne" | "En cours";

export type Project = {
  title: string;
  subtitle: Record<Locale, string>;
  category: Record<Locale, string>;
  description: Record<Locale, string>;
  image: string;
  tags: string[];
  url: string;
  status: ProjectStatus;
  metrics: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    title: "Tempel Outdoor",
    subtitle: { en: "Premium outdoor e-commerce", fr: "E-commerce outdoor premium" },
    category: { en: "Premium e-commerce", fr: "E-commerce premium" },
    description: {
      en: "A full-featured e-commerce platform for premium outdoor equipment — spas, saunas, billiards and fitness gear — with bilingual support, cart system, product catalog and a high-end brand identity.",
      fr: "Une plateforme e-commerce complete pour equipements outdoor premium — spas, saunas, billards et fitness — avec support bilingue, panier, catalogue produits et une identite de marque haut de gamme.",
    },
    image: "/images/mockups/tempel-outdoor.webp",
    tags: ["Next.js", "Tailwind", "Framer Motion", "E-commerce"],
    url: "https://tempel-outdoor.vercel.app",
    status: "En cours",
    metrics: {
      en: ["Full e-commerce catalog", "Bilingual FR / EN", "Premium brand direction"],
      fr: ["Catalogue e-commerce complet", "Bilingue FR / EN", "Direction de marque premium"],
    },
  },
  {
    title: "Koalit",
    subtitle: { en: "Premium bedding e-commerce", fr: "E-commerce literie premium" },
    category: { en: "Retail & e-commerce", fr: "Retail & e-commerce" },
    description: {
      en: "A full redesign and e-commerce build for Koalit, a French premium bedding retailer — featuring a sleep quiz, complete product catalog, booking flow and an elegant brand identity.",
      fr: "Une refonte complete et build e-commerce pour Koalit, detaillant francais de literie premium — avec quiz sommeil, catalogue produits complet, flux de reservation et identite de marque elegante.",
    },
    image: "/images/mockups/koalit.webp",
    tags: ["Next.js", "Tailwind", "E-commerce", "SEO"],
    url: "https://koalit-refonte.vercel.app",
    status: "En cours",
    metrics: {
      en: ["Sleep diagnostic quiz", "Full shop catalog", "SEO-optimized content"],
      fr: ["Quiz diagnostic sommeil", "Catalogue boutique complet", "Contenu optimise SEO"],
    },
  },
  {
    title: "France Courtier",
    subtitle: { en: "High-end financial platform", fr: "Plateforme financiere haut de gamme" },
    category: { en: "Premium business website", fr: "Site business premium" },
    description: {
      en: "A refined financial services website with animated sections, lead generation flow and a high-end visual identity.",
      fr: "Un site de services financiers raffine avec des sections animees, un parcours de generation de leads et une identite visuelle haut de gamme.",
    },
    image: "/images/mockups/france-courtier.webp",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Supabase"],
    url: "https://francecourtier-site.vercel.app",
    status: "En ligne",
    metrics: {
      en: ["Lead generation flow", "Premium UI system", "Admin-ready backend"],
      fr: ["Parcours de generation de leads", "Systeme UI premium", "Backend admin-ready"],
    },
  },
  {
    title: "DND Conseil",
    subtitle: { en: "Renovation consulting platform", fr: "Plateforme de conseil en renovation" },
    category: { en: "Construction consulting website", fr: "Site de conseil en construction" },
    description: {
      en: "A premium website for a building renovation consulting service, with elegant visuals, conversion-focused sections and a structured quote request journey.",
      fr: "Un site premium pour un service de conseil en renovation — avec des visuels elegants, des sections orientees conversion et un parcours de demande de devis structure.",
    },
    image: "/images/mockups/dnd-conseils.webp",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Supabase"],
    url: "https://dnd-conseils.vercel.app/",
    status: "En ligne",
    metrics: {
      en: ["Quote request flow", "Premium service positioning", "Admin lead management"],
      fr: ["Parcours de demande de devis", "Positionnement service premium", "Gestion admin des leads"],
    },
  },
  {
    title: "Marcos Papermache",
    subtitle: { en: "AI-powered art experience", fr: "Experience artistique propulsee par l'IA" },
    category: { en: "Art & e-commerce experience", fr: "Art & experience e-commerce" },
    description: {
      en: "A creative website for handmade paper-mache sculptures, with multilingual content and a custom AI image generation experience.",
      fr: "Un site creatif pour des sculptures en papier mache artisanales, avec du contenu multilingue et une experience de generation d'images par IA.",
    },
    image: "/images/mockups/marcos-papermache.webp",
    tags: ["Next.js", "AI", "Supabase", "Vercel"],
    url: "https://www.marcospapermache.com",
    status: "En ligne",
    metrics: {
      en: ["AI creation journey", "Multilingual content", "Premium art direction"],
      fr: ["Parcours de creation IA", "Contenu multilingue", "Direction artistique premium"],
    },
  },
  {
    title: "Quizmify",
    subtitle: { en: "Interactive learning system", fr: "Systeme d'apprentissage interactif" },
    category: { en: "Interactive quiz app", fr: "Application quiz interactive" },
    description: {
      en: "A modern quiz experience focused on clean interactions, dynamic content and playful user engagement.",
      fr: "Une experience quiz moderne centree sur des interactions fluides, du contenu dynamique et un engagement utilisateur ludique.",
    },
    image: "/images/mockups/quizmify.webp",
    tags: ["React", "Next.js", "UI Design"],
    url: "https://quizmify-two.vercel.app/",
    status: "En ligne",
    metrics: {
      en: ["Interactive UI", "Clean game logic", "Responsive experience"],
      fr: ["UI interactive", "Logique de jeu propre", "Experience responsive"],
    },
  },
];
