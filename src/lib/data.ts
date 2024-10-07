import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import papermacheImg from "@/public/papermache.png";
import amazonImg from "@/public/amazon_clone.png";
import onlyfansImg from "@/public/only_fans.png";
import airbnbImg from "@/public/airbnb.png";

export const links = [
  {
    name: "Accueil",
    hash: "#accueil",
  },
  {
    name: "Profil",
    hash: "#profil",
  },
  {
    name: "Projets",
    hash: "#projets",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "CDD - RESPONSABLE CASH ZONE",
    location: "SODEXO LIVE / JEUX OLYMPIQUES DE PARIS 2024",
    description:
    "Gestion des flux financiers et sécurisation des fonds.",
    icon: React.createElement(FaReact),
    date: "JUILLET 2024 - SEPT 2024",
  },
  {
    title: "LE WAGON BOOTCAMP",
    location: "Paris, France",
    description:
    "CERTIFICATION DE CONCEPTEUR - DÉVELOPPEUR D'APPLICATIONS WEB",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2023",
  },
  {
    title: "TECHNICIEN INFORMATIQUE SYSTÈME & RÉSEAUX (BAC+2)",
    location: "Centre de Formation GEFI - Créteil ",
    description:
    "Installation, configuration et dépannage de périphériques.",
    icon: React.createElement(LuGraduationCap),
    date: "2021 - 2022",
  },
  {
    title: "PROFESSEUR WEB DESIGN",
    location: "ECOLE D'INFORMATIQUE / Gervacio Cabrera - CUBA",
    description:
    "Enseignement des interfaces utilisateurs en HTML et CSS.",
    icon: React.createElement(CgWorkAlt),
    date: "2006 - 2007",
  },
] as const;

export const projectsData = [
  {
    title: "Paper Mache Sculptures",
    description:
      "Actuellement, je me consacre à mon dernier projet : la création d'un portfolio web destiné à présenter mes réalisations artisanales en papier mâché.",
    tags: ["React", "Next.js", "Prismic.io", "Tailwind", "Gsap", "Astro"],
    imageUrl: papermacheImg,
    projectLink: "https://www.marcosuarezsculpture.online/",
    codeSource: "https://github.com/markyuna/portfolio-prismic-papermache",
  },
  {
    title: "AmazonCone-Expo",
    description:
      "Ce projet est construit en utilisant Expo, React Native et AWS Amplify pour fournir une expérience d'achat fluide et réactive.",
    tags: ["React", "TypeScript", "AWS-Amplify", "Cloudinary"],
    imageUrl: amazonImg,
    projectLink: "https://expo.dev/@markyuna/AmazonClone",
    codeSource: "https://github.com/markyuna/AmazonClone-expo", 
  },
  {
    title: "OnlyFansClone-Expo",
    description:
      "Découvrez mon dernier projet, OnlyFans Expo, une application de pointe qui exploite la puissance d’Amplify pour les fonctionnalités d’authentification et de backend.",
    tags: ["React", "Expo-router", "AWS-Amplify", "Cloudinary"],
    imageUrl: onlyfansImg,
    projectLink: "https:/",
    codeSource: "https://github.com/markyuna/OnlyFansClone",
  },
  {
    title: "AirbnbClone-Expo",
    description:
      "Elle intègre des technologies telles que AWS Amplify pour l'authentification des utilisateurs et GraphQL pour la gestion des données.",
    tags: ["React Native", "TypeScript", "Expo", "AWS-Amplify", "Cloudinary"],
    imageUrl: airbnbImg,
    projectLink: "https:/",
    codeSource: "https://github.com/markyuna/AirbnbClone-Expo",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Expo",
  "Git",
  "Tailwind",
  "Prisma",
  "Prismic.io",
  "Astro",
  "GSAP",
  "GraphQL",
  "PostgreSQL",
  "Framer Motion",
] as const;
