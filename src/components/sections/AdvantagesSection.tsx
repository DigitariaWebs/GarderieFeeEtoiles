'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      id: 1,
      title: "LES PRINCIPES PÉDAGOGIQUES PROGRAMME ÉDUCATIF",
      description:
        "Approche pédagogique centrée sur l'enfant unique. Apprentissage par le jeu et l'exploration selon sept dimensions développementales (affective, physique, motrice, sociale, morale, cognitive, langagière). Collaboration étroite entre éducatrices et parents pour une croissance harmonieuse.",
      image: "/AdvantagesSection/ProgrammeEducatif.jpg",
    },
    {
      id: 2,
      title: "LES SAINES HABITUDES ALIMENTAIRES",
      description:
        "Repas équilibrés selon le Guide alimentaire canadien avec menu rotatif mensuel. Dîner + 2 collations quotidiennes composées de produits frais et sains. Inclusion de substituts de viande (légumineuses, tofu) et diversification des protéines (poisson, volaille).",
      image: "/AdvantagesSection/AlimentationSaine.png",
    },
    {
      id: 3,
      title: "Activités Physiques",
      description:
        "Transmission de saines habitudes de vie avec activités physiques quotidiennes extérieures. Jeux moteurs variés (glissade, marche, course, modules extérieurs). En hiver: 2 heures d'exercice physique par jour pour un développement moteur optimal.",
      image: "/AdvantagesSection/ActivitesPhysiques.jpg",
    },
    {
      id: 4,
      title: "LA GARDERIE TRÈS BIEN SITUÉE",
      description:
        "Emplacement stratégique près de l'école primaire St-Anne, l'Aréna de Saint-Canut, la bibliothèque municipale et le Centre communautaire. Espace de jeu extérieur et grand stationnement pour faciliter l'accès des familles.",
      image: "/AdvantagesSection/EnvironnementSecurisant.jpg",
    },
    {
      id: 5,
      title: "LA STRUCTURATION DES ACTIVITÉS",
      description:
        "Journée structurée avec activités organisées, jeux libres, activités extérieures et routines adaptées au développement global. Programme journalier préparé bihebdomadairement par les éducatrices selon l'âge, les besoins et les intérêts de chaque enfant.",
      image: "/AdvantagesSection/CommunicationInscription.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="advantages"
      className="pb-16 sm:pb-20 lg:pb-24 bg-[var(--color-background)] scroll-m-8"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="relative min-h-[40vh] pt-6 flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6">
              Nos Avantages
            </h2>
            <p className="text-2xl md:text-3xl text-[var(--color-text)] font-medium">
              Découvrez tous les avantages que nous offrons pour le bien-être et
              le développement de votre enfant
            </p>
          </div>
        </div>

        {/* Advantages Grid - First Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {advantages.slice(0, 3).map((advantage) => (
            <motion.div
              key={advantage.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[var(--color-background)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Advantage Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={advantage.image}
                  alt={advantage.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Advantage Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 min-h-[4rem]">
                  {advantage.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advantages Grid - Second Row (Centered) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:flex md:justify-center gap-8"
        >
          {advantages.slice(3, 5).map((advantage) => (
            <motion.div
              key={advantage.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[var(--color-background)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full md:w-1/3 flex flex-col"
            >
              {/* Advantage Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={advantage.image}
                  alt={advantage.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Advantage Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 min-h-[4rem]">
                  {advantage.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;