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
      body: "Venez découvrir nos nouveaux locaux lors des portes ouvertes de la garderie la Fée des Étoiles. En présence des éducatrices, de la directrice et de la fée des étoiles elle-même, profitez de rafraîchissements, visites et présentations.",
      cta: "La garderie la Fée des Étoiles vous ouvre ses portes samedi 2 décembre 2017 au 10010 boulevard St-Canut.",
      icon: "calendar",
      image: "/RecentActivitySection/PortesOuvertes.jpg",
    },
    {
      id: 2,
      title: "Le développement de votre enfant",
      meta: null,
      body: "Nos éducatrices nourrissent les forces de chaque enfant et les encouragent à atteindre de nouveaux défis. Elles touchent à toutes les sphères développementales pour voir grandir un petit être autonome et stable, dans un environnement sécurisant et bienveillant.",
      cta: 'À la garderie "la fée des étoiles", chaque enfant est unique et se développe à son propre rythme.',
      icon: "sparkles",
      image: "/RecentActivitySection/DeveloppementEnfant.jpg",
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
      className="pb-5 bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[30vh] md:min-h-[40vh] pt-12 md:pt-6 flex items-center justify-center"
        >
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-8 md:mb-6  ">
              Activités Récentes
            </h2>
            <p className="text-xl md:text-3xl text-[var(--color-text)] font-medium">
              Découvrez nos dernières nouvelles et événements
            </p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              variants={cardVariants}
              className="py-8 md:py-10 px-6"
            >
              <div
                className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                }`}
              >
                {/* Activity image */}
                <div
                  className={`relative h-64 md:h-[430px] rounded-2xl overflow-hidden ${
                    index % 2 === 1 ? "md:col-start-2" : "md:col-start-1"
                  }`}
                >
                  <Image
                    src={activity.image}
                    alt={`${activity.title} - Garderie la fée des étoiles`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col justify-between min-h-64 md:h-[430px] ${
                    index % 2 === 1 ? "md:col-start-1" : "md:col-start-2"
                  }`}
                >
                  <div>
                    <h3 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
                      {activity.title}
                    </h3>
                    <div className="w-24 h-1 bg-[var(--color-secondary)] mb-4"></div>
                  </div>

                  <p className="text-lg md:text-xl text-[var(--color-text)] leading-relaxed mb-8">
                    {activity.body}
                  </p>

                  <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/10 p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                    <p className="text-lg italic text-[var(--color-secondary)] font-medium">
                      &ldquo;{activity.cta}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentActivitySection;
