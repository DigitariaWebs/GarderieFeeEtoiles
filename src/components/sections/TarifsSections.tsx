'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TarifsSections: React.FC = () => {
  return (
    <section id="tarifs" className="pb-20 bg-[var(--color-background)] scroll-m-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Nos Tarifs
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Découvrez nos tarifs compétitifs adaptés à tous les besoins de votre famille
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Part-time Supplement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[var(--color-text-secondary)]/20"
          >
            <div className="mb-6">
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                +4 $
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wide">
                par jour
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              Temps Partiel
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Supplément pour les enfants à temps partiel (2 ou 3 jours par semaine)
            </p>
            <a
              href="tel:5149129499"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Appeler
            </a>
          </motion.div>

          {/* Infants Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-[var(--color-primary)] relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Le plus populaire
              </span>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                43 $
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wide">
                par jour
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              Poupons
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Tarif de base pour les enfants âgés de moins de 18 mois
            </p>
            <a
              href="tel:5149129499"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Appeler
            </a>
          </motion.div>

          {/* Children Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center border border-[var(--color-text-secondary)]/20"
          >
            <div className="mb-6">
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                41 $
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wide">
                par jour
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              Enfants
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Tarif de base pour les enfants âgés de 18 mois et plus
            </p>
            <a
              href="tel:5149129499"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Appeler
            </a>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="bg-[var(--color-background)] rounded-xl p-6 border border-[var(--color-text-secondary)]/20 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
              Informations Importantes
            </h4>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Les tarifs sont sujets à changement. Pour les tarifs exacts et les options de paiement,
              veuillez nous contacter directement. Nous offrons également des places subventionnées
              dans certains cas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TarifsSections;
