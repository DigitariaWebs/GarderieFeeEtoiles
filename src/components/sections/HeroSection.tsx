'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <section
      className="relative overflow-hidden px-4 flex items-center justify-start"
      style={{ height: "calc(100vh - 72px)" }}
    >
      {/* Background Video with Parallax Effect */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        ></div>
        {isVisible && (
          <motion.video
            src="/HeroSection.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
          />
        )}
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-[var(--color-secondary)]/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-20 max-w-4xl px-12 sm:px-14 lg:px-16 text-left"
      >
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15]"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontSize: "clamp(1.875rem, 6vw, 4.5rem)",
              marginBottom: "1rem",
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Garderie Fée Étoiles
            </motion.span>
          </motion.h1>
        </motion.div>

        <div className="w-30 h-1 bg-[var(--color-secondary)] my-7"></div>

        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Bienvenue à la Garderie Fée Étoiles, votre garderie de confiance à Mirabel.
            Nous offrons un environnement sécurisant et stimulant pour vos enfants,
            avec une équipe dévouée et des activités enrichissantes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-start"
        >
          <motion.div
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto shadow-xl"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Nous contacter
            </Button>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="min-w-[180px] w-full sm:w-auto border-2 border-[var(--color-text-light)] text-[var(--color-text-light)] hover:bg-[var(--color-text-light)] hover:text-black backdrop-blur-sm bg-[var(--color-text-light)]/10"
            >
              Découvrez nos services
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
