import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/papermache.png";
import rmtdevImg from "@/public/amazon_clone.png";
import wordanalyticsImg from "@/public/only_fans.png";

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
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Paper Mache Sculptures",
    description:
      "Actuellement, je me consacre à mon dernier projet : la création d'un portfolio web destiné à présenter mes réalisations artisanales en papier mâché.",
    tags: ["React", "Next.js", "Prismic.io", "Tailwind", "Gsap", "Astro"],
    imageUrl: corpcommentImg,
    projectLink: "https://www.marcosuarezsculpture.art/",
    codeSource: "https://github.com/markyuna/portfolio-prismic-papermache",
  },
  {
    title: "AmazonCone-Expo",
    description:
      "Ce projet est construit en utilisant Expo, React Native et AWS Amplify pour fournir une expérience d'achat fluide et réactive.",
    tags: ["React", "TypeScript", "AWS-Amplify", "Cloudinary"],
    imageUrl: rmtdevImg,
    projectLink: "https://expo.dev/@markyuna/AmazonClone",
    codeSource: "https://github.com/markyuna/AmazonClone-expo", 
  },
  {
    title: "OnlyFansClone-Expo",
    description:
      "Découvrez mon dernier projet, OnlyFans Expo, une application de pointe qui exploite la puissance d’Amplify pour les fonctionnalités d’authentification et de backend.",
    tags: ["React", "Expo-router", "AWS-Amplify", "Cloudinary"],
    imageUrl: wordanalyticsImg,
    projectLink: "https:/",
    codeSource: "https://github.com/markyuna/OnlyFansClone",
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
