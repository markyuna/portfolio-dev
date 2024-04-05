"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function Profil() {
  const { ref } = useSectionInView("Profil");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="Profil"
    >
      <SectionHeading>A PROPOS DE MOI</SectionHeading>
      <p className="mb-3">
        Après mon arrivée en{" "}
        <span className="font-medium">France</span>,  j'ai choisi de cultiver 
        ma passion pour la programmation. Je me suis engagé dans un bootcamp 
        de codage chez Le Wagon, où j'ai acquis des compétences en {" "}
        <span className="font-medium">développement Web full-stack</span>.{" "}
        Ce qui me passionne le plus dans la programmation, c'est la résolution de problèmes. 
        J'apprécie le sentiment de satisfaction lorsque je parviens enfin à trouver une solution
        à un défi. Mes technologies de prédilection incluent React, Next.js, Node.js et AWS-Amplify. 
        De plus, je maîtrise TypeScript et Prisma. Je suis toujours avide de découvrir de nouvelles 
        technologies et je suis actuellement à la recherche d'un poste à temps plein en tant que 
        développeur web junior.

      </p>

      <p>
        <span className="italic">En dehors du codage</span>, mes centres d'intérêt incluent les jeux vidéo, 
        le cinéma, et mon hobby préféré est la création de <a href="https://www.marcosuarezsculpture.art/" className="font-bold from-stone-800">sculptures</a> en papier mâché pour stimuler ma créativité.
      </p>
    </motion.section>
  );
}
