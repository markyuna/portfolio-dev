import { questionnaireSections } from "@/lib/questionnaire.config";
import { formatPriceFR } from "@/lib/format";
import { findOption } from "@/lib/questionnaire-lookup";
import type {
  CustomLineItem,
  LeadInfo,
  PricingResult,
  QuestionnaireAnswers,
} from "@/lib/questionnaire.types";

const STACK_SUGGESTIONS: Record<string, string> = {
  "type-vitrine": "Next.js (App Router) + Tailwind CSS, déploiement Vercel.",
  "type-portfolio": "Next.js (App Router) + Tailwind CSS, déploiement Vercel.",
  "type-blog": "Next.js (App Router) avec MDX ou CMS headless (Sanity/Contentful) + Tailwind CSS.",
  "type-ecommerce": "Next.js (App Router) + Stripe/Shopify (selon besoin) + Tailwind CSS.",
  "type-app": "Next.js (App Router) + base de données (Postgres/Prisma) + auth + Tailwind CSS.",
};

function getAnswerLabels(answers: QuestionnaireAnswers, questionId: string): string[] {
  for (const section of questionnaireSections) {
    const question = section.questions.find((q) => q.id === questionId);
    if (!question) continue;
    if (question.kind === "text") {
      const value = answers[questionId];
      return typeof value === "string" && value.trim() ? [value.trim()] : [];
    }
    const ids = answers[questionId];
    const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];
    return idList
      .map((id) => findOption(question, id)?.label)
      .filter((label): label is string => Boolean(label));
  }
  return [];
}

export function generateClaudePrompt(
  answers: QuestionnaireAnswers,
  lead: LeadInfo,
  pricing: PricingResult,
  customLines: CustomLineItem[] = [],
  cadrageMarkdown?: string,
): string {
  const typeSite = answers["type-site"];
  const typeSiteId = Array.isArray(typeSite) ? typeSite[0] : typeSite;
  const typeSiteLabel = getAnswerLabels(answers, "type-site")[0] ?? "Site web";
  const stack = (typeSiteId && STACK_SUGGESTIONS[typeSiteId]) ?? "Next.js (App Router) + Tailwind CSS, déploiement Vercel.";

  const objectif = getAnswerLabels(answers, "objectif-principal")[0] ?? "—";
  const audience = getAnswerLabels(answers, "audience")[0] ?? "—";
  const contenus = getAnswerLabels(answers, "contenus");
  const langues = getAnswerLabels(answers, "langues")[0] ?? "Français uniquement";
  const design = getAnswerLabels(answers, "design")[0] ?? "—";
  const pages = getAnswerLabels(answers, "pages")[0] ?? "—";
  const fonctionnalites = getAnswerLabels(answers, "fonctionnalites");
  const autreBesoin = getAnswerLabels(answers, "autre-besoin")[0];
  const delai = getAnswerLabels(answers, "delai")[0] ?? "Flexible";
  const notes = getAnswerLabels(answers, "notes")[0];
  const customLineItems = customLines.filter((l) => l.label.trim());

  const lines: string[] = [
    `# Nouveau projet — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    "",
    "## Contexte client",
    `- Client : ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
    `- Contact : ${lead.email}${lead.phone ? ` / ${lead.phone}` : ""}`,
    `- Audience : ${audience}`,
    "",
    "## Type de projet",
    `- ${typeSiteLabel}`,
    `- Niveau de design : ${design}`,
    `- Nombre de pages estimé : ${pages}`,
    `- Langues : ${langues}`,
    "",
    "## Objectif",
    `${objectif}`,
    "",
    "## Fonctionnalités demandées",
    ...(fonctionnalites.length ? fonctionnalites.map((f) => `- ${f}`) : ["- Aucune fonctionnalité spécifique mentionnée."]),
    ...customLineItems.map((l) => `- ${l.label} (prestation personnalisée, ${formatPriceFR(l.price)} HT)`),
    ...(autreBesoin ? [`- Autre besoin exprimé par le client : ${autreBesoin}`] : []),
    "",
    "## Contenu à créer",
    ...(contenus.length ? contenus.map((c) => `- ${c}`) : ["- Contenu fourni par le client."]),
    "",
    "## Contraintes",
    `- Délai souhaité : ${delai}`,
    `- Budget estimé (devis) : ${formatPriceFR(pricing.total)} HT`,
    ...(notes ? [`- Notes du client : ${notes}`] : []),
    "",
    "## Stack suggérée",
    stack,
    "",
    "## Premiers pas",
    "1. Explorer les attentes précises du client sur chaque fonctionnalité listée ci-dessus.",
    "2. Poser l'architecture du projet (routes, composants, structure de données) adaptée à la stack suggérée.",
    "3. Mettre en place le squelette du design (thème, typographie, composants réutilisables).",
    "4. Développer les pages/fonctionnalités par ordre de priorité métier.",
    "5. Prévoir un point de cadrage avec le client avant de démarrer si des zones restent floues.",
  ];

  const body = lines.join("\n");
  return cadrageMarkdown ? `${body}\n\n${cadrageMarkdown}` : body;
}
