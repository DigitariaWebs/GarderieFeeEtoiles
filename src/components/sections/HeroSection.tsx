'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Button from "@/components/ui/Button";

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroSectionImages = [
    "ChildrenDoingHandStuff.jpg",
    "ChildrenDoingHandStuffWithAnAdult.jpg",
    "ChildrenInTheSnow.jpg",
    "ChildrenPlayingAround.jpg",
    "ChildrenWithAdultInPlayGround.jpg",
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSectionImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroSectionImages.length]);

  return (
    <section className="pt-16 md:pt-32 pb-16 md:pb-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "Hubot Sans, Inter, sans-serif" }}
            >
              Garderie la fée des étoiles
            </h1>
            <p
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              style={{ fontFamily: "Hubot Sans, Inter, sans-serif" }}
            >
              Bienvenue à la Garderie la fée des étoiles, votre garderie de
              confiance à Mirabel. Nous offrons un environnement sécurisant et
              stimulant pour vos enfants, avec une équipe dévouée et des
              activités enrichissantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
              <Button
                size="lg"
                variant="outline"
                className="min-w-[180px] w-full sm:w-auto border-2 border-[var(--color-text-light)] text-[var(--color-text-light)] hover:bg-[var(--color-text-light)] hover:text-black backdrop-blur-sm bg-[var(--color-text-light)]/10"
              >
                Découvrez nos services
              </Button>
            </div>
          </motion.div>

          {/* Right Creative Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Gallery Container */}
            <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden">
              {/* Layered Images with Creative Transitions */}
              <div className="absolute inset-0">
                {heroSectionImages.map((image, index) => {
                  const isActive = index === currentImageIndex;
                  const isPrev =
                    index ===
                    (currentImageIndex - 1 + heroSectionImages.length) %
                      heroSectionImages.length;
                  const isNext =
                    index ===
                    (currentImageIndex + 1) % heroSectionImages.length;

                  return (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{
                        x: "200%",
                        opacity: 0,
                        scale: 0.8,
                        filter: "brightness(0.7) contrast(0.8)",
                      }}
                      animate={{
                        x: isActive
                          ? 0
                          : isPrev
                          ? "-100%"
                          : isNext
                          ? "100%"
                          : "200%",
                        opacity: isActive ? 1 : isPrev ? 0.3 : isNext ? 0.3 : 0,
                        scale: isActive ? 1 : 0.8,
                        filter: isActive
                          ? "brightness(1) contrast(1.1)"
                          : "brightness(0.7) contrast(0.8)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                    >
                      <Image
                        src={`/HeroSection/${image}`}
                        alt={`Service ${
                          index + 1
                        } - Garderie la fée des étoiles`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />

                      {/* Organic Gradient Overlays */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, transparent 0%, rgba(79, 163, 209, 0.1) 50%, transparent 100%)"
                            : "linear-gradient(45deg, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Creative Corner Accents */}
              <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
                <div
                  className="w-full h-full rounded-br-full"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <div
                  className="w-full h-full rounded-tl-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
              </div>

              {/* Minimal Info Display */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  />
                  <div>
                    <div className="text-white text-xs opacity-80">
                      Services
                    </div>
                    <div className="text-white text-sm font-bold">Garderie</div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <button
                  className="text-white/70 hover:text-white transition-colors p-2"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) =>
                        (prev - 1 + heroSectionImages.length) %
                        heroSectionImages.length
                    )
                  }
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex space-x-1">
                  {heroSectionImages.map((_, index) => (
                    <button
                      key={index}
                      className="h-0.5 transition-all duration-300 rounded-full"
                      style={{
                        width: index === currentImageIndex ? "24px" : "8px",
                        backgroundColor:
                          index === currentImageIndex
                            ? "var(--color-secondary)"
                            : "rgba(255,255,255,0.3)",
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                <button
                  className="text-white/70 hover:text-white transition-colors p-2"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev + 1) % heroSectionImages.length
                    )
                  }
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Side Texture Elements */}
            <div
              className="absolute -left-2 top-1/4 w-1 h-16 rounded-full opacity-30"
              style={{ backgroundColor: "var(--color-secondary)" }}
            />
            <div
              className="absolute -right-2 bottom-1/4 w-1 h-12 rounded-full opacity-20"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
