'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqData = {
    title: "Foire Aux Questions",
    subtitle: "Trouvez des réponses aux questions courantes sur nos services de garderie, processus d'inscription et politiques.",
    items: [
      {
        question: "Quelles sont vos exigences d'inscription?",
        answer: "Nous acceptons les enfants âgés de 0 à 5 ans. Les documents requis comprennent les registres de vaccination, les contacts d'urgence et un formulaire d'inscription complété. Nous exigeons également une visite de nos installations avant l'inscription."
      },
      {
        question: "Quelles sont vos heures d'ouverture?",
        answer: "Nous sommes ouverts du lundi au vendredi de 6h30 à 18h00. Nous sommes fermés les fins de semaine et les jours fériés. Des heures prolongées peuvent être disponibles sur demande."
      },
      {
        question: "Quelle est votre structure tarifaire?",
        answer: "Nos tarifs varient selon le groupe d'âge et la sélection du programme. Nous offrons des options à temps plein et à temps partiel. Veuillez nous contacter pour les prix actuels et les plans de paiement."
      },
      {
        question: "Offrez-vous des places subventionnées?",
        answer: "Nous sommes une garderie privée en cours de processus pour obtenir des places subventionnées. En attendant, nous offrons une possibilité de retour anticipé qui minimise le paiement des parents. Contactez-nous pour plus de détails sur nos options de financement."
      },
      {
        question: "Quelles mesures de sécurité avez-vous en place?",
        answer: "Nous maintenons des protocoles de sécurité stricts incluant des systèmes d'entrée sécurisés, des vérifications d'antécédents pour tout le personnel, des plans de préparation aux urgences et des exercices de sécurité réguliers."
      },
      {
        question: "Comment gérez-vous les urgences médicales?",
        answer: "Tout le personnel est formé aux premiers soins et à la RCR. Nous avons établi des procédures d'urgence et maintenons des contacts d'urgence pour tous les enfants. Nous travaillons étroitement avec les services d'urgence locaux au besoin."
      },
      {
        question: "Quelles sont vos politiques pour les enfants malades?",
        answer: "Les enfants montrant des signes de maladie doivent rester à la maison pour protéger les autres. Nous suivons les directives de santé publique pour les exigences de retour aux soins."
      },
      {
        question: "Quels repas et collations fournissez-vous?",
        answer: "Nous fournissons des repas et collations nutritifs préparés frais quotidiennement dans notre cuisine licenciée. Nous accommodons les restrictions alimentaires et les allergies."
      },
      {
        question: "Comment communiquez-vous avec les parents?",
        answer: "Nous utilisons plusieurs méthodes de communication incluant des rapports quotidiens, partage de photos, bulletins d'information et conférences parent-enseignant. Nous maintenons une politique de porte ouverte."
      }
    ]
  };

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Title & Contact Card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-[var(--color-primary)]">Questions</span>
                  <br />
                  <span className="text-[var(--color-primary)]">and </span>
                  <span className="text-[var(--color-text-secondary)]">
                    answers
                  </span>
                </h2>
                <p className="text-[var(--color-text)] text-lg">
                  {faqData.subtitle}
                </p>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--color-background)] rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 rounded-2xl flex items-center justify-center p-4 bg-[var(--color-background)]">
                      <Image
                        src="/Logo.png"
                        alt="Garderie Fee Etoiles Logo"
                        width={120}
                        height={120}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3">
                      <a
                        href="mailto:contact@garderiefeeetoiles.com"
                        className="flex items-center gap-4 p-4 rounded-2xl ring-1 ring-black/5 bg-[var(--color-background)] transition-all hover:-translate-y-0.5 shadow-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-[var(--color-primary)]">
                            Email
                          </h4>
                          <p className="text-[var(--color-text-secondary)]">
                            contact@garderiefeeetoiles.com
                          </p>
                        </div>
                      </a>
                      <a
                        href="tel:+15141234567"
                        className="flex items-center gap-4 p-4 rounded-2xl ring-1 ring-black/5 bg-[var(--color-background)] transition-all hover:-translate-y-0.5 shadow-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-[var(--color-primary)]">
                            Téléphone
                          </h4>
                          <p className="text-[var(--color-text-secondary)]">
                            +1 514 123 4567
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-7">
            <div className="space-y-4 max-h-[450px] overflow-y-auto border-4 border-[var(--color-primary)] rounded-2xl p-4">
              {faqData.items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[var(--color-background)] rounded-2xl overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-[var(--color-background)] transition-colors"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-[var(--color-secondary)] pr-8">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFaqIndex === index ? (
                        <Minus
                          size={20}
                          className="text-[var(--color-secondary)]"
                        />
                      ) : (
                        <Plus
                          size={20}
                          className="text-[var(--color-secondary)]"
                        />
                      )}
                    </div>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base text-justify">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
