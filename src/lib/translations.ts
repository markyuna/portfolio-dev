export type Locale = "en" | "fr";

export const translations = {
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
      cta: "Start a project",
    },
    hero: {
      badge: "Web Developer · Creative · AI",
      h1a: "I craft",
      h1highlight: "high-end",
      h1b: "digital experiences that elevate brands.",
      description:
        "I build premium websites and interfaces with modern technologies, refined design, smooth animations and a strong focus on results.",
      cta: "View Projects",
      ctaSecondary: "Contact Me",
      tags: [
        { value: "Next.js", label: "Modern stack" },
        { value: "UI/UX", label: "Premium design" },
        { value: "AI", label: "Creative tools" },
      ],
      featuredProject: "Featured Project",
      live: "Live",
      projectQuality: "Project quality",
      creativeDirection: "Creative direction",
      designCode: "Design + Code",
      focus: "Focus",
      premiumUX: "Premium UX",
      fastScalable: "Fast & scalable",
      elegantExperience: "Elegant experience",
    },
    featured: {
      badge: "Selected work",
      h2a: "Premium projects",
      h2highlight: "delivered.",
      cta: "View all projects",
      liveBadge: "Live",
    },
    about: {
      badge: "About me",
      h2a: "Developer,",
      h2highlight: "designer,",
      h2b: "builder.",
      bio: "I'm Marcos Suarez, a web developer based in Paris. I create modern, fast and visually refined digital experiences using Next.js, Tailwind CSS and motion-driven interfaces.",
      bio2: "From landing pages to full e-commerce platforms, I bring together clean engineering, strong visual direction and a focus on conversion.",
      cta: "More about me",
      stackTitle: "Tech stack",
      stats: [
        { value: "6+", label: "Premium projects" },
        { value: "5+", label: "Happy clients" },
        { value: "3+", label: "Years experience" },
      ],
    },
    contact: {
      badge: "Available for new projects",
      h2a: "Ready to build",
      h2highlight: "something great?",
      description:
        "Whether you need a premium website, a full e-commerce platform or a polished UI system — I'd love to hear about your project.",
      cta: "Start a project",
    },
    footer: {
      copyright: "All rights reserved.",
    },
    projects: {
      badge: "Selected work",
      h2a: "Digital work with",
      h2highlight: "cinematic depth.",
      description:
        "Premium interfaces, immersive motion, clean engineering and business-focused experiences crafted to feel sharp, modern and memorable.",
      statusLive: "Live",
      statusInProgress: "In progress",
      cta: "View project",
      ctaPreview: "Preview",
      ctaComingSoon: "Coming soon",
    },
    contactPage: {
      badge: "Contact",
      h1a: "Let's build something",
      h1highlight: "exceptional.",
      description:
        "I help brands, creators and businesses create premium digital experiences with clean development, refined UI and strong visual direction.",
      form: {
        header: "Tell me about your idea.",
        subheader:
          "Available for freelance projects, collaborations and long-term partnerships. I usually respond within 24 hours.",
        projectRequest: "Project request",
        projectRequestSub: "Share a few details and I'll get back to you.",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        projectType: "Project type",
        projectLabel: "Project",
        projectPlaceholder: "Tell me briefly about your project",
        message: "Message",
        messagePlaceholder: "What are you building? What do you need help with?",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent!",
        successSub: "Thanks for reaching out. I usually respond within 24 hours.",
        projectTypes: [
          "Premium website",
          "Portfolio",
          "Landing page",
          "E-commerce",
          "Web app",
        ],
      },
      contactItems: [
        {
          label: "Email",
          value: "marcossuarezr88@gmail.com",
          href: "mailto:marcossuarezr88@gmail.com",
        },
        {
          label: "Phone",
          value: "+33 6 62 48 24 91",
          href: "tel:+33662482491",
        },
        { label: "Location", value: "Paris, France", href: null },
      ],
    },
    aboutPage: {
      badge: "About",
      h1a: "I build",
      h1highlight: "premium web",
      h1b: "experiences with clean code and strong visual direction.",
      bio: "I'm Marcos Suarez, a web developer based in Paris. I create modern, responsive and polished websites using Next.js, Tailwind CSS and motion-driven interfaces.",
      cardBadge: "Creative developer",
      cardText:
        "I combine design sensitivity, technical execution and creative thinking to build websites that feel premium and memorable.",
      cardCta: "View projects",
      highlights: [
        {
          title: "Clean development",
          text: "Modern, maintainable code with Next.js, React and Tailwind CSS.",
        },
        {
          title: "Premium UI direction",
          text: "Interfaces with elegant spacing, visual rhythm and strong brand presence.",
        },
        {
          title: "Complete experiences",
          text: "From concept to launch, I design and build websites that feel polished.",
        },
      ],
      philosophy: {
        label: "Philosophy",
        quote:
          "Good design is not only about making things beautiful. It is about making every detail feel intentional, fluid and easy to understand.",
      },
    },
  },

  fr: {
    nav: {
      projects: "Projets",
      about: "À propos",
      contact: "Contact",
      cta: "Démarrer un projet",
    },
    hero: {
      badge: "Développeur Web · Créatif · IA",
      h1a: "Je crée des",
      h1highlight: "expériences",
      h1b: "digitales premium qui élèvent les marques.",
      description:
        "Je conçois des sites web et interfaces haut de gamme avec des technologies modernes, un design raffiné, des animations fluides et une forte orientation résultats.",
      cta: "Voir les projets",
      ctaSecondary: "Me contacter",
      tags: [
        { value: "Next.js", label: "Stack moderne" },
        { value: "UI/UX", label: "Design premium" },
        { value: "IA", label: "Outils créatifs" },
      ],
      featuredProject: "Projet phare",
      live: "En ligne",
      projectQuality: "Qualité du projet",
      creativeDirection: "Direction créative",
      designCode: "Design + Code",
      focus: "Focus",
      premiumUX: "UX Premium",
      fastScalable: "Rapide & scalable",
      elegantExperience: "Expérience élégante",
    },
    featured: {
      badge: "Travaux sélectionnés",
      h2a: "Projets premium",
      h2highlight: "livrés.",
      cta: "Voir tous les projets",
      liveBadge: "En ligne",
    },
    about: {
      badge: "À propos",
      h2a: "Développeur,",
      h2highlight: "designer,",
      h2b: "créateur.",
      bio: "Je suis Marcos Suarez, développeur web basé à Paris. Je crée des expériences digitales modernes, rapides et visuellement raffinées avec Next.js, Tailwind CSS et des interfaces animées.",
      bio2: "Des landing pages aux plateformes e-commerce complètes, j'allie ingénierie propre, direction visuelle forte et focus sur la conversion.",
      cta: "En savoir plus",
      stackTitle: "Stack technique",
      stats: [
        { value: "6+", label: "Projets premium" },
        { value: "5+", label: "Clients satisfaits" },
        { value: "3+", label: "Ans d'expérience" },
      ],
    },
    contact: {
      badge: "Disponible pour de nouveaux projets",
      h2a: "Prêt à construire",
      h2highlight: "quelque chose d'exceptionnel ?",
      description:
        "Que vous ayez besoin d'un site web premium, d'une plateforme e-commerce complète ou d'un système UI soigné — j'adorerais entendre parler de votre projet.",
      cta: "Démarrer un projet",
    },
    footer: {
      copyright: "Tous droits réservés.",
    },
    projects: {
      badge: "Travaux sélectionnés",
      h2a: "Un travail digital avec",
      h2highlight: "une profondeur cinématique.",
      description:
        "Interfaces premium, motion immersif, ingénierie propre et expériences orientées business — conçus pour être nets, modernes et mémorables.",
      statusLive: "En ligne",
      statusInProgress: "En cours",
      cta: "Voir le projet",
      ctaPreview: "Aperçu",
      ctaComingSoon: "Bientôt disponible",
    },
    contactPage: {
      badge: "Contact",
      h1a: "Construisons quelque chose",
      h1highlight: "d'exceptionnel.",
      description:
        "J'aide les marques, créateurs et entreprises à créer des expériences digitales premium avec un développement soigné, une UI raffinée et une forte direction visuelle.",
      form: {
        header: "Parlez-moi de votre idée.",
        subheader:
          "Disponible pour des projets freelance, collaborations et partenariats long terme. Je réponds généralement sous 24h.",
        projectRequest: "Demande de projet",
        projectRequestSub: "Partagez quelques détails et je vous répondrai.",
        name: "Nom",
        namePlaceholder: "Votre nom",
        email: "Email",
        emailPlaceholder: "vous@email.com",
        projectType: "Type de projet",
        projectLabel: "Projet",
        projectPlaceholder: "Décrivez brièvement votre projet",
        message: "Message",
        messagePlaceholder: "Que construisez-vous ? En quoi puis-je vous aider ?",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé !",
        successSub:
          "Merci de m'avoir contacté. Je réponds généralement sous 24h.",
        projectTypes: [
          "Site premium",
          "Portfolio",
          "Landing page",
          "E-commerce",
          "Application web",
        ],
      },
      contactItems: [
        {
          label: "Email",
          value: "marcossuarezr88@gmail.com",
          href: "mailto:marcossuarezr88@gmail.com",
        },
        {
          label: "Téléphone",
          value: "+33 6 62 48 24 91",
          href: "tel:+33662482491",
        },
        { label: "Localisation", value: "Paris, France", href: null },
      ],
    },
    aboutPage: {
      badge: "À propos",
      h1a: "Je construis des",
      h1highlight: "expériences web",
      h1b: "premium avec du code propre et une direction visuelle forte.",
      bio: "Je suis Marcos Suarez, développeur web basé à Paris. Je crée des sites web modernes, responsifs et soignés avec Next.js, Tailwind CSS et des interfaces animées.",
      cardBadge: "Développeur créatif",
      cardText:
        "Je combine sensibilité design, execution technique et pensée créative pour construire des sites qui semblent premium et mémorables.",
      cardCta: "Voir les projets",
      highlights: [
        {
          title: "Développement propre",
          text: "Code moderne et maintenable avec Next.js, React et Tailwind CSS.",
        },
        {
          title: "Direction UI premium",
          text: "Interfaces avec espacement élégant, rythme visuel et forte présence de marque.",
        },
        {
          title: "Expériences complètes",
          text: "Du concept au lancement, je conçois et construis des sites qui semblent soignés.",
        },
      ],
      philosophy: {
        label: "Philosophie",
        quote:
          "Un bon design ne consiste pas seulement à rendre les choses belles. C'est rendre chaque détail intentionnel, fluide et facile à comprendre.",
      },
    },
  },
};

export type Translations = typeof translations.en;
