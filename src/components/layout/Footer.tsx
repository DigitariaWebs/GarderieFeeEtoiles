"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-text-secondary)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center ">
              <Image
                src="/Logo.png"
                alt="Garderie la fée des étoiles Logo"
                width={450}
                height={450}
                className="w-38 h-auto"
              />
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Une garderie chaleureuse et sécurisante pour le développement de
              votre enfant. Apprentissage par le jeu dans un environnement
              bienveillant.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-[var(--color-primary)]">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>
                <span className="font-medium">Adresse: </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Rue+des+Étoiles+Montréal+QC+H1A+1A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  123 Rue des Étoiles, Montréal, QC H1A 1A1
                </a>
              </p>
              <p>
                <span className="font-medium">Téléphone: </span>
                <a
                  href="tel:+15141234567"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  +1 514 123 4567
                </a>
              </p>
              <p>
                <span className="font-medium">Email: </span>
                <a
                  href="mailto:contact@garderiefeeetoiles.com"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  contact@garderiefeeetoiles.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-[var(--color-primary)]">
              Liens Rapides
            </h4>
            <nav className="space-y-2">
              <Link
                href="#home"
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="#services"
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                À Propos
              </Link>
              <Link
                href="#faq"
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#contact"
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-[var(--color-text-secondary)]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {currentYear} Garderie la fée des étoiles. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Conditions d&apos;utilisation
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
