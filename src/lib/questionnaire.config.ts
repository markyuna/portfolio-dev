import type { QuestionnaireSection } from "@/lib/questionnaire.types";

/** Show only an indicative price range to the public flow. Turn off to hide pricing entirely. */
export const showEstimateToClient = true;

/** Public estimate is shown as total ± this percentage. */
export const ESTIMATE_RANGE_PERCENT = 0.2;

export const CONTENT_PROVIDED_OPTION_ID = "contenu-tout-fourni";
export const URGENCY_OPTION_ID = "delai-moins-un-mois";
export const MAINTENANCE_QUESTION_ID = "maintenance";

export const questionnaireSections: QuestionnaireSection[] = [
  {
    id: "projet-objectifs",
    title: "Projet & objectifs",
    description: "Parlons d'abord de ce que vous voulez construire.",
    questions: [
      {
        id: "type-site",
        kind: "single",
        label: "Quel type de site souhaitez-vous ?",
        required: true,
        options: [
          { id: "type-vitrine", label: "Site vitrine", price: 800 },
          { id: "type-portfolio", label: "Portfolio", price: 600 },
          { id: "type-blog", label: "Blog / magazine", price: 700 },
          { id: "type-ecommerce", label: "E-commerce", price: 2500 },
          {
            id: "type-app",
            label: "Application sur mesure",
            price: 3200,
          },
        ],
      },
      {
        id: "objectif-principal",
        kind: "text",
        label: "Quel est l'objectif principal de ce site ?",
        placeholder:
          "Ex : générer des demandes de devis, vendre en ligne, présenter mon travail...",
        multiline: true,
      },
      {
        id: "audience",
        kind: "single",
        label: "À qui s'adresse le site ?",
        options: [
          { id: "audience-b2c", label: "Particuliers (B2C)", price: 0 },
          { id: "audience-b2b", label: "Entreprises (B2B)", price: 0 },
          { id: "audience-les-deux", label: "Les deux", price: 0 },
        ],
      },
    ],
  },
  {
    id: "public-contenu",
    title: "Public & contenu",
    description: "Qui va fournir la matière première du site ?",
    questions: [
      {
        id: "contenus",
        kind: "multiple",
        label: "Quels contenus faut-il créer ?",
        helper:
          "Sélectionnez tout ce qui doit être créé. \"Tout est fourni par le client\" annule les autres choix.",
        options: [
          {
            id: "contenu-redaction",
            label: "Rédaction des textes",
            price: 300,
          },
          {
            id: "contenu-photos",
            label: "Photos / visuels",
            price: 350,
          },
          {
            id: "contenu-logo",
            label: "Logo / identité visuelle",
            price: 450,
          },
          {
            id: CONTENT_PROVIDED_OPTION_ID,
            label: "Tout est fourni par le client",
            price: 0,
            exclusive: true,
          },
        ],
      },
      {
        id: "langues",
        kind: "single",
        label: "En combien de langues le site doit-il exister ?",
        options: [
          { id: "langue-fr", label: "Français uniquement", price: 0 },
          { id: "langue-bilingue", label: "Bilingue", price: 400 },
          {
            id: "langue-3-plus",
            label: "3 langues ou plus",
            price: 700,
          },
        ],
      },
    ],
  },
  {
    id: "design-pages",
    title: "Design & pages",
    description: "L'ampleur visuelle et structurelle du projet.",
    questions: [
      {
        id: "design",
        kind: "single",
        label: "Quel niveau de design souhaitez-vous ?",
        required: true,
        options: [
          {
            id: "design-template",
            label: "Template adapté",
            price: 0,
          },
          { id: "design-sur-mesure", label: "Sur mesure", price: 600 },
          { id: "design-refonte", label: "Refonte", price: 300 },
        ],
      },
      {
        id: "pages",
        kind: "single",
        label: "Combien de pages, environ ?",
        required: true,
        options: [
          { id: "pages-1-5", label: "1 à 5 pages", price: 0 },
          { id: "pages-6-10", label: "6 à 10 pages", price: 400 },
          { id: "pages-10-plus", label: "10 pages ou plus", price: 900 },
        ],
      },
    ],
  },
  {
    id: "fonctionnalites",
    title: "Fonctionnalités",
    description: "Les briques fonctionnelles dont vous avez besoin.",
    questions: [
      {
        id: "fonctionnalites",
        kind: "multiple",
        label: "Quelles fonctionnalités souhaitez-vous intégrer ?",
        options: [
          {
            id: "fonction-contact",
            label: "Formulaire de contact",
            price: 100,
          },
          {
            id: "fonction-rdv",
            label: "Prise de rendez-vous",
            price: 500,
          },
          {
            id: "fonction-paiement",
            label: "Paiement en ligne",
            price: 600,
          },
          {
            id: "fonction-espace-client",
            label: "Espace client",
            price: 800,
          },
          {
            id: "fonction-blog",
            label: "Blog / actualités",
            price: 300,
          },
          {
            id: "fonction-newsletter",
            label: "Newsletter",
            price: 150,
          },
          {
            id: "fonction-seo",
            label: "SEO de base",
            price: 250,
          },
          {
            id: "fonction-reseaux-liens",
            label: "Liens vers les réseaux sociaux",
            price: 100,
          },
          {
            id: "fonction-instagram-flux",
            label: "Flux Instagram intégré",
            price: 250,
          },
          {
            id: "fonction-avis-google",
            label: "Avis Google intégrés",
            price: 200,
          },
        ],
      },
    ],
  },
  {
    id: "budget-delais",
    title: "Budget & délais",
    description: "Le cadre temporel et financier du projet.",
    questions: [
      {
        id: "delai",
        kind: "single",
        label: "Quel est le délai souhaité ?",
        required: true,
        options: [
          { id: "delai-flexible", label: "Flexible", price: 0 },
          {
            id: URGENCY_OPTION_ID,
            label: "Moins d'un mois",
            price: 0,
            surchargePercent: 0.15,
            helper: "Majoration d'urgence de 15 % appliquée au sous-total.",
          },
          { id: "delai-date-precise", label: "Date précise", price: 0 },
        ],
      },
      {
        id: MAINTENANCE_QUESTION_ID,
        kind: "single",
        label: "Souhaitez-vous une maintenance après la mise en ligne ?",
        helper: "La maintenance est facturée séparément, hors devis.",
        options: [
          { id: "maintenance-aucune", label: "Aucune", price: 0 },
          {
            id: "maintenance-demande",
            label: "À la demande",
            price: 0,
            excludedFromTotal: true,
          },
          {
            id: "maintenance-forfait",
            label: "Forfait mensuel — 60 €/mois",
            price: 60,
            excludedFromTotal: true,
            helper: "Facturé séparément, chaque mois.",
          },
        ],
      },
      {
        id: "budget-client",
        kind: "single",
        label: "Quel budget aviez-vous en tête ?",
        helper: "Purement indicatif, n'influence pas l'estimation.",
        options: [
          { id: "budget-moins-1000", label: "Moins de 1 000 €", price: 0 },
          { id: "budget-1000-3000", label: "1 000 € – 3 000 €", price: 0 },
          { id: "budget-3000-6000", label: "3 000 € – 6 000 €", price: 0 },
          { id: "budget-6000-plus", label: "Plus de 6 000 €", price: 0 },
        ],
      },
      {
        id: "notes",
        kind: "text",
        label: "Une précision, une contrainte, une envie particulière ?",
        placeholder: "Facultatif — tout ce qui peut m'aider à cadrer le projet.",
        multiline: true,
      },
    ],
  },
];
