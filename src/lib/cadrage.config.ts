import type { QuestionnaireAnswers } from "@/lib/questionnaire.types";
import type {
  CadrageAnswers,
  CadrageField,
  CadrageModule,
  CadrageModuleId,
  CadrageSection,
} from "@/lib/cadrage.types";

export const troncCommunSections: CadrageSection[] = [
  {
    id: "existant",
    title: "Existant",
    fields: [
      {
        id: "existant-type-projet",
        kind: "radio",
        label: "Création ou refonte ?",
        options: [
          { id: "refonte", label: "Refonte" },
          { id: "creation", label: "Création" },
        ],
      },

      // — Refonte —
      {
        id: "existant-plateforme",
        kind: "text",
        label: "Plateforme actuelle (WordPress, Wix, sur mesure...)",
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },
      {
        id: "existant-a-conserver",
        kind: "checkbox-group",
        label: "Éléments à conserver",
        options: [
          { id: "contenus", label: "Contenus" },
          { id: "seo", label: "SEO / référencement" },
          { id: "donnees", label: "Données (clients, produits...)" },
        ],
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },
      {
        id: "existant-export-donnees",
        kind: "text",
        label: "Export des données (format, modalités)",
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },
      {
        id: "existant-trafic-seo",
        kind: "text",
        label: "Trafic SEO actuel",
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },
      {
        id: "existant-plan-redirections",
        kind: "textarea",
        label: "Plan de redirections 301 (anciennes URLs à rediriger)",
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },
      {
        id: "existant-acces-admin-actuel",
        kind: "checkbox",
        label: "Accès admin au site actuel obtenu",
        showIf: { fieldId: "existant-type-projet", equals: "refonte" },
      },

      // — Création —
      {
        id: "creation-nom-domaine",
        kind: "text",
        label: "Nom de domaine souhaité",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-domaine-achete",
        kind: "radio",
        label: "Domaine déjà acheté ?",
        options: [
          { id: "oui", label: "Oui" },
          { id: "non", label: "Non" },
        ],
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-domaine-par-qui",
        kind: "text",
        label: "Acheté par qui ? (si applicable)",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-domaine-au-nom-client",
        kind: "checkbox",
        label: "Au nom du client",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-identite-marque",
        kind: "radio",
        label: "Identité de marque (logo / charte)",
        helper: "Si à créer : à ajouter comme prestation tarifée dans « Demandes libres du client ».",
        options: [
          { id: "existante", label: "Existante" },
          { id: "a-creer", label: "À créer" },
        ],
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-references-visuelles",
        kind: "textarea",
        label: "2-3 références visuelles (sites aimés / détestés)",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-presence-digitale",
        kind: "checkbox-group",
        label: "Présence digitale existante",
        options: [
          { id: "google-business", label: "Google Business" },
          { id: "reseaux-sociaux", label: "Réseaux sociaux" },
        ],
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-emails-pro",
        kind: "radio",
        label: "Emails professionnels",
        options: [
          { id: "existants", label: "Existants" },
          { id: "a-configurer", label: "À configurer" },
        ],
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-mots-cles-seo",
        kind: "text",
        label: "Mots-clés SEO cibles",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
      {
        id: "creation-zone-chalandise",
        kind: "text",
        label: "Zone de chalandise",
        showIf: { fieldId: "existant-type-projet", equals: "creation" },
      },
    ],
  },
  {
    id: "contenu",
    title: "Contenu",
    fields: [
      {
        id: "contenu-textes",
        kind: "radio",
        label: "Textes",
        options: [
          { id: "fournis", label: "Fournis" },
          { id: "a-recuperer", label: "À récupérer" },
          { id: "a-creer", label: "À créer" },
        ],
      },
      {
        id: "contenu-images",
        kind: "radio",
        label: "Images / visuels",
        options: [
          { id: "fournis", label: "Fournis" },
          { id: "a-recuperer", label: "À récupérer" },
          { id: "a-creer", label: "À créer" },
        ],
      },
      {
        id: "contenu-logo",
        kind: "radio",
        label: "Logo",
        options: [
          { id: "fourni", label: "Fourni" },
          { id: "a-recuperer", label: "À récupérer" },
          { id: "a-creer", label: "À créer" },
        ],
      },
      { id: "contenu-format-livraison", kind: "text", label: "Format de livraison des contenus" },
      { id: "contenu-date-limite", kind: "date", label: "Date limite d'envoi des contenus" },
    ],
  },
  {
    id: "legal",
    title: "Aspects légaux",
    fields: [
      { id: "legal-mentions-legales", kind: "checkbox", label: "Mentions légales à prévoir" },
      {
        id: "legal-politique-confidentialite",
        kind: "checkbox",
        label: "Politique de confidentialité à prévoir",
      },
      { id: "legal-bandeau-cookies", kind: "checkbox", label: "Bandeau cookies RGPD à prévoir" },
      {
        id: "legal-source",
        kind: "radio",
        label: "Contenu légal",
        options: [
          { id: "fourni-client", label: "Fourni par le client" },
          { id: "modeles-a-adapter", label: "Modèles à adapter" },
        ],
      },
    ],
  },
  {
    id: "acces",
    title: "Accès à prévoir",
    fields: [
      {
        id: "acces-a-prevoir",
        kind: "checkbox-group",
        label: "Accès à obtenir",
        options: [
          { id: "hebergeur", label: "Hébergeur" },
          { id: "admin-site-actuel", label: "Admin du site actuel" },
          { id: "google-business", label: "Google Business" },
          { id: "reseaux-sociaux", label: "Réseaux sociaux" },
          { id: "analytics-search-console", label: "Analytics / Search Console" },
        ],
      },
      { id: "acces-notes", kind: "textarea", label: "Notes sur les accès" },
    ],
  },
  {
    id: "apres-livraison",
    title: "Après livraison",
    fields: [
      { id: "apres-qui-met-a-jour", kind: "text", label: "Qui met à jour le contenu ?" },
      { id: "apres-maintenance-notes", kind: "text", label: "Maintenance envisagée" },
      { id: "apres-formation", kind: "checkbox", label: "Formation à prévoir" },
    ],
  },
  {
    id: "validation",
    title: "Validation",
    fields: [
      { id: "validation-interlocuteur", kind: "text", label: "Interlocuteur unique" },
      {
        id: "validation-allers-retours",
        kind: "number",
        label: "Allers-retours design inclus",
        defaultValue: "2",
      },
      { id: "validation-top-priorites", kind: "textarea", label: "Top 3 des priorités" },
    ],
  },
];

export const cadrageModules: CadrageModule[] = [
  {
    id: "A",
    title: "Module A — Vitrine/Portfolio",
    matchTypeSiteIds: ["type-vitrine", "type-portfolio"],
    sections: [
      {
        id: "moduleA-cadrage",
        title: "Cadrage",
        fields: [
          {
            id: "moduleA-action-principale",
            kind: "text",
            label: "Action principale attendue du visiteur",
          },
          { id: "moduleA-pages-validees", kind: "textarea", label: "Pages validées" },
          {
            id: "moduleA-references",
            kind: "textarea",
            label: "Références / concurrents",
          },
          { id: "moduleA-zone-chalandise", kind: "text", label: "Zone de chalandise" },
        ],
      },
    ],
  },
  {
    id: "B",
    title: "Module B — E-commerce",
    matchTypeSiteIds: ["type-ecommerce"],
    sections: [
      {
        id: "moduleB-plateforme",
        title: "Plateforme",
        fields: [
          {
            id: "moduleB-plateforme",
            kind: "radio",
            label: "Choix de plateforme",
            options: [
              { id: "sur-mesure-stripe", label: "Sur mesure + Stripe" },
              { id: "shopify", label: "Shopify" },
              { id: "autre", label: "Autre" },
            ],
          },
          { id: "moduleB-plateforme-raison", kind: "text", label: "Raison de ce choix" },
        ],
      },
      {
        id: "moduleB-catalogue",
        title: "Catalogue",
        fields: [
          { id: "moduleB-nb-produits", kind: "number", label: "Nombre de produits" },
          { id: "moduleB-variantes", kind: "text", label: "Variantes (taille, couleur...)" },
          {
            id: "moduleB-particularites",
            kind: "textarea",
            label: "Particularités du catalogue",
          },
          { id: "moduleB-format-import", kind: "text", label: "Format d'import du catalogue" },
        ],
      },
      {
        id: "moduleB-livraison-paiement",
        title: "Livraison & paiement",
        fields: [
          { id: "moduleB-zones-livraison", kind: "text", label: "Zones de livraison" },
          { id: "moduleB-frais-livraison", kind: "text", label: "Frais de livraison" },
          { id: "moduleB-click-collect", kind: "checkbox", label: "Click & collect" },
          {
            id: "moduleB-moyens-paiement",
            kind: "checkbox-group",
            label: "Moyens de paiement",
            options: [
              { id: "cb", label: "Carte bancaire" },
              { id: "virement", label: "Virement" },
              { id: "paypal", label: "PayPal" },
              { id: "autre", label: "Autre" },
            ],
          },
          {
            id: "moduleB-cgv",
            kind: "radio",
            label: "CGV",
            options: [
              { id: "fournies-client", label: "Fournies par le client" },
              { id: "a-rediger", label: "À rédiger" },
            ],
          },
        ],
      },
      {
        id: "moduleB-espace-client",
        title: "Espace client",
        fields: [
          {
            id: "moduleB-contenu-espace-client",
            kind: "textarea",
            label: "Contenu de l'espace client",
          },
        ],
      },
    ],
  },
  {
    id: "C",
    title: "Module C — Blog/Magazine",
    matchTypeSiteIds: ["type-blog"],
    sections: [
      {
        id: "moduleC-cadrage",
        title: "Cadrage",
        fields: [
          { id: "moduleC-qui-publie", kind: "text", label: "Qui publie, à quelle fréquence ?" },
          { id: "moduleC-categories", kind: "textarea", label: "Catégories" },
          { id: "moduleC-newsletter", kind: "checkbox", label: "Newsletter à prévoir" },
          { id: "moduleC-migration", kind: "checkbox", label: "Migration d'articles existants" },
          {
            id: "moduleC-migration-details",
            kind: "textarea",
            label: "Détails de la migration",
            showIf: { fieldId: "moduleC-migration", equals: true },
          },
        ],
      },
    ],
  },
  {
    id: "D",
    title: "Module D — Application sur mesure",
    matchTypeSiteIds: ["type-app"],
    sections: [
      {
        id: "moduleD-cadrage",
        title: "Cadrage",
        fields: [
          { id: "moduleD-probleme-metier", kind: "textarea", label: "Problème métier à résoudre" },
          { id: "moduleD-utilisateurs-roles", kind: "textarea", label: "Utilisateurs / rôles" },
          { id: "moduleD-parcours-critique", kind: "textarea", label: "Parcours critique" },
          { id: "moduleD-donnees", kind: "textarea", label: "Données manipulées" },
          {
            id: "moduleD-donnees-sensibles",
            kind: "checkbox",
            label: "Données sensibles (santé, finance...)",
          },
          { id: "moduleD-integrations", kind: "text", label: "Intégrations externes" },
          { id: "moduleD-volume", kind: "text", label: "Volume attendu" },
        ],
      },
    ],
  },
];

export function getModuleForTypeSite(typeSiteId: string | undefined): CadrageModuleId | undefined {
  return cadrageModules.find((m) => m.matchTypeSiteIds.includes(typeSiteId ?? ""))?.id;
}

/** questionnaire `fonctionnalites` option id -> extra cadrage fields to precise it. */
export const FUNCTIONALITY_PRECISION_FIELDS: Record<string, CadrageField[]> = {
  "fonction-rdv": [
    {
      id: "precision-rdv",
      kind: "text",
      label: "Prise de rendez-vous : outil existant (Calendly, autre) ou à développer ?",
    },
  ],
  "fonction-carte-interactive": [
    { id: "precision-carte", kind: "text", label: "Carte interactive : quel usage exact ?" },
  ],
  "fonction-avis-google": [
    {
      id: "precision-avis-google",
      kind: "radio",
      label: "Avis Google : fiche Google Business existante ?",
      options: [
        { id: "oui", label: "Oui" },
        { id: "non", label: "Non" },
      ],
    },
  ],
  "fonction-instagram-flux": [
    {
      id: "precision-instagram",
      kind: "radio",
      label: "Flux Instagram : compte professionnel existant ?",
      options: [
        { id: "oui", label: "Oui" },
        { id: "non", label: "Non" },
      ],
    },
  ],
};

export const MULTILINGUE_PRECISION_FIELD: CadrageField = {
  id: "precision-langues",
  kind: "text",
  label: "Multilingue : qui fournit les traductions ?",
};

/** Precision fields to show, driven by the loaded brief's own selected functionalities/languages. */
export function getPrecisionFields(briefAnswers: QuestionnaireAnswers): CadrageField[] {
  const fields: CadrageField[] = [];

  const fonctionnalites = briefAnswers["fonctionnalites"];
  const selectedIds = Array.isArray(fonctionnalites)
    ? fonctionnalites
    : fonctionnalites
      ? [fonctionnalites]
      : [];
  for (const id of selectedIds) {
    const extra = FUNCTIONALITY_PRECISION_FIELDS[id];
    if (extra) fields.push(...extra);
  }

  const langues = briefAnswers["langues"];
  if (langues === "langue-bilingue" || langues === "langue-3-plus") {
    fields.push(MULTILINGUE_PRECISION_FIELD);
  }

  return fields;
}

export function isCadrageFieldVisible(field: CadrageField, answers: CadrageAnswers): boolean {
  if (!field.showIf) return true;
  return answers[field.showIf.fieldId] === field.showIf.equals;
}

export function isCadrageFieldFilled(field: CadrageField, value: CadrageAnswers[string] | undefined): boolean {
  if (field.kind === "checkbox") return value === true;
  if (field.kind === "checkbox-group") return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.trim().length > 0;
}

export function computeCadrageProgress(
  answers: CadrageAnswers,
  activeModuleId: CadrageModuleId | undefined,
): { filled: number; total: number } {
  const activeModule = cadrageModules.find((m) => m.id === activeModuleId);
  const sections = [...troncCommunSections, ...(activeModule?.sections ?? [])];

  let filled = 0;
  let total = 0;
  for (const section of sections) {
    for (const field of section.fields) {
      if (!isCadrageFieldVisible(field, answers)) continue;
      total += 1;
      if (isCadrageFieldFilled(field, answers[field.id])) filled += 1;
    }
  }
  return { filled, total };
}
