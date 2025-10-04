'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const RecentActivitySection: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "Portes ouvertes de la Fée des Étoiles",
      meta: "Samedi 2 décembre 2017 • 10010 boulevard Saint-Canut",
      body: "La garderie La Fée des Étoiles vous ouvre ses portes samedi 2 décembre 2017 au 10010 boulevard Saint-Canut. Venez découvrir nos installations et rencontrer notre équipe dévouée dans un environnement chaleureux.",
      cta: "En savoir plus",
      icon: "calendar",
      image: "/RecentActivitySection/PortesOuvertes.png",
    },
    {
      id: 2,
      title: "Le développement de votre enfant",
      meta: null,
      body: "À la garderie « La Fée des Étoiles », chaque enfant est unique et se développe à son propre rythme. Notre équipe s'adapte aux besoins individuels, favorisant l'épanouissement à travers des activités ludiques et éducatives.",
      cta: "Découvrir notre pédagogie",
      icon: "sparkles",
      image: "/RecentActivitySection/DeveloppementEnfant.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="recent-activities"
      aria-labelledby="recent-activities"
      className="pb-16 sm:pb-20 lg:pb-24 bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="relative min-h-[40vh] pt-6 flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6  ">
              Activités Récentes
            </h2>
            <p className="text-2xl md:text-3xl text-[var(--color-text)] font-medium">
              Découvrez nos dernières nouvelles et événements
            </p>
          </div>
        </div>

        {/* Content Sections */}
        {activities.map((activity, index) => (
          <div key={activity.id} className="py-10 px-6">
            <div
              className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:grid-flow-col-dense" : ""
              }`}
            >
              <div
                className={`flex flex-col justify-between h-80 md:h-[400px] ${
                  index % 2 === 1 ? "md:col-start-2" : ""
                }`}
              >
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
                    {activity.title}
                  </h3>
                  <div className="w-24 h-1 bg-[var(--color-secondary)]"></div>
                </div>

                <p className="text-xl text-[var(--color-text)] leading-relaxed">
                  {activity.body}
                </p>

                <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/10 p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                  <p className="text-lg italic text-[var(--color-secondary)] font-medium">
                    "{activity.cta}"
                  </p>
                </div>
              </div>

              {/* Activity image */}
              <div
                className={`relative h-80 md:h-[400px] rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? "md:col-start-1" : ""
                }`}
              >
                <Image
                  src={activity.image}
                  alt={`${activity.title} - Garderie Fée Étoiles`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivitySection;
