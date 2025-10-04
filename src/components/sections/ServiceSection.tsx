'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ServiceSection: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Programme Éducatif",
      description:
        "Un apprentissage par le jeu qui développe curiosité et confiance. Langage & pré-lecture, Mathématiques & sciences précoces, Arts créatifs & exploration sensorielle. Groupes adaptés à l'âge avec espaces et routines appropriées. Journée structurée avec routine prévisible.",
      image: "/ServiceSection/ProgrammeEducatif.png",
    },
    {
      id: 2,
      title: "Alimentation Saine",
      description:
        "Menus équilibrés inspirés du Guide alimentaire canadien. Dîner + 2 collations par jour, menu mensuel rotatif. Allergies et restrictions respectées pour la santé de chaque enfant.",
      image: "/ServiceSection/AlimentationSaine.png",
    },
    {
      id: 3,
      title: "Activités Physiques",
      description:
        "Sorties quotidiennes selon la météo. Jeux moteurs et plein air, balades et activités saisonnières. Développement de la motricité et du bien-être physique.",
      image: "/ServiceSection/ActivitesPhysiques.png",
    },
    {
      id: 4,
      title: "Environnement Sécurisant",
      description:
        "La sécurité et l'hygiène avant tout. Accès sécurisé, espaces propres et désinfectés. Éducatrices qualifiées et attentionnées dans un milieu bienveillant.",
      image: "/ServiceSection/EnvironnementSecurisant.png",
    },
    {
      id: 5,
      title: "Communication & Inscription",
      description:
        "Communication transparente avec les parents. Faits saillants du jour, suivi des progrès. Inscription simplifiée avec demande en ligne rapide et accompagnement personnalisé.",
      image: "/ServiceSection/CommunicationInscription.png",
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
      id="services"
      className="pb-16 sm:pb-20 lg:pb-24 bg-[var(--color-background)] scroll-m-8"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="relative min-h-[40vh] pt-6 flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6">
              Nos Services
            </h2>
            <p className="text-2xl md:text-3xl text-[var(--color-text)] font-medium">
              Découvrez tous les services que nous offrons pour le bien-être et
              le développement de votre enfant
            </p>
          </div>
        </div>

        {/* Services Grid - First Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {services.slice(0, 3).map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[var(--color-background)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid - Second Row (Centered) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center gap-8"
        >
          {services.slice(3, 5).map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[var(--color-background)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-1/3"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
