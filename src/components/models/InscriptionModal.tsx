"use client"

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  X,
  AlertCircle,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface InscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InscriptionModal: React.FC<InscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childBirthDate: "",
    startDate: "",
    serviceType: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          parentName: "",
          parentEmail: "",
          parentPhone: "",
          childName: "",
          childBirthDate: "",
          startDate: "",
          serviceType: "",
          additionalInfo: "",
        });
        setIsLoading(false);
        setErrors({});
        setApiError("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate >= today;
  };

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      // Parent information validation
      if (!formData.parentName.trim()) {
        newErrors.parentName = "Le nom du parent est requis";
      } else if (formData.parentName.trim().length < 2) {
        newErrors.parentName = "Le nom doit contenir au moins 2 caractères";
      }

      if (!formData.parentEmail.trim()) {
        newErrors.parentEmail = "L'email du parent est requis";
      } else if (!validateEmail(formData.parentEmail)) {
        newErrors.parentEmail = "Veuillez entrer une adresse email valide";
      }

      if (!formData.parentPhone.trim()) {
        newErrors.parentPhone = "Le numéro de téléphone du parent est requis";
      } else if (!validatePhone(formData.parentPhone)) {
        newErrors.parentPhone = "Veuillez entrer un numéro de téléphone valide";
      }
    } else if (step === 2) {
      // Child information validation
      if (!formData.childName.trim()) {
        newErrors.childName = "Le nom de l'enfant est requis";
      } else if (formData.childName.trim().length < 2) {
        newErrors.childName = "Le nom doit contenir au moins 2 caractères";
      }

      if (!formData.childBirthDate.trim()) {
        newErrors.childBirthDate = "La date de naissance est requise";
      }
    } else if (step === 3) {
      // Service information validation
      if (!formData.startDate.trim()) {
        newErrors.startDate = "La date de début souhaitée est requise";
      } else if (!validateDate(formData.startDate)) {
        newErrors.startDate = "La date doit être dans le futur";
      }

      if (!formData.serviceType.trim()) {
        newErrors.serviceType = "Veuillez sélectionner un type de service";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateStep(3)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone,
          childName: formData.childName,
          childBirthDate: formData.childBirthDate,
          startDate: formData.startDate,
          serviceType: formData.serviceType,
          additionalInfo: formData.additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError(
          "Erreur de connexion. Vérifiez votre connexion internet et réessayez."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[70] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[86vh] overflow-hidden grid grid-cols-1 md:grid-cols-2"
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inscription-modal-title"
          >
            <div
              className="hidden md:flex flex-col justify-between p-8 lg:p-10 text-white h-full"
              style={{
                background: "var(--color-secondary)",
              }}
            >
              <div>
                <button
                  onClick={onClose}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-8 h-8 text-white" />
                </button>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  Inscrivez votre enfant
                </h2>
                <p className="mt-2 text-sm lg:text-base opacity-90">
                  Rejoignez notre communauté et offrez à votre enfant un
                  environnement d&apos;apprentissage exceptionnel.
                </p>
              </div>
              <div className="text-xs lg:text-sm opacity-70">
                © {new Date().getFullYear()} Garderie la fée des étoiles.
              </div>
            </div>

            <div className={`p-4 sm:p-6 md:p-8 flex flex-col ${isSubmitted ? 'justify-center' : 'justify-start'} overflow-y-auto h-full`}>
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    key="thankyou"
                    className="flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-[var(--color-secondary)]" />
                    </motion.div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-5">
                      Demande d&apos;inscription reçue !
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-2">
                      Merci pour votre intérêt. Nous vous contacterons sous peu
                      pour finaliser l&apos;inscription.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 bg-gray-100 text-gray-700 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        id="inscription-modal-title"
                        className="text-xl sm:text-2xl font-bold text-gray-800"
                      >
                        Formulaire d&apos;inscription
                      </h2>
                      <button
                        onClick={onClose}
                        aria-label="Fermer le formulaire"
                        className="md:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-500 mb-6">
                      Remplissez ce formulaire pour inscrire votre enfant à
                      notre garderie.
                    </p>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex items-center space-x-4">
                        {[1, 2, 3].map((step) => (
                          <React.Fragment key={step}>
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                currentStep >= step
                                  ? "bg-[var(--color-secondary)] text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {step}
                            </div>
                            {step < 3 && (
                              <div
                                className={`w-8 h-0.5 ${
                                  currentStep > step
                                    ? "bg-[var(--color-secondary)]"
                                    : "bg-gray-200"
                                }`}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex-1 flex flex-col"
                    >
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {apiError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600"
                          >
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{apiError}</span>
                          </motion.div>
                        )}

                        {/* Step 1: Parent Information */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                          >
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Informations du parent/tuteur
                              </h3>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative mb-4"
                              >
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="text"
                                  name="parentName"
                                  placeholder="Nom complet du parent/tuteur"
                                  required
                                  value={formData.parentName}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.parentName
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.parentName && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.parentName}
                                  </p>
                                )}
                              </motion.div>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative mb-4"
                              >
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="email"
                                  name="parentEmail"
                                  placeholder="Adresse email"
                                  required
                                  value={formData.parentEmail}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.parentEmail
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.parentEmail && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.parentEmail}
                                  </p>
                                )}
                              </motion.div>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative"
                              >
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="tel"
                                  name="parentPhone"
                                  placeholder="Numéro de téléphone"
                                  required
                                  value={formData.parentPhone}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.parentPhone
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.parentPhone && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.parentPhone}
                                  </p>
                                )}
                              </motion.div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Child Information */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                          >
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Informations de l&apos;enfant
                              </h3>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative mb-4"
                              >
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="text"
                                  name="childName"
                                  placeholder="Nom complet de l'enfant"
                                  required
                                  value={formData.childName}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.childName
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.childName && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.childName}
                                  </p>
                                )}
                              </motion.div>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative"
                              >
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="date"
                                  name="childBirthDate"
                                  placeholder="Date de naissance"
                                  required
                                  value={formData.childBirthDate}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.childBirthDate
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.childBirthDate && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.childBirthDate}
                                  </p>
                                )}
                              </motion.div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Service Information */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                          >
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Détails du service
                              </h3>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative mb-4"
                              >
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="date"
                                  name="startDate"
                                  placeholder="Date de début souhaitée"
                                  required
                                  value={formData.startDate}
                                  onChange={handleInputChange}
                                  className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                                    errors.startDate
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                />
                                {errors.startDate && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.startDate}
                                  </p>
                                )}
                              </motion.div>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative mb-4"
                              >
                                <select
                                  name="serviceType"
                                  required
                                  value={formData.serviceType}
                                  onChange={handleInputChange}
                                  className={`w-full pl-4 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                    errors.serviceType
                                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                                      : "border-gray-200 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                                  }`}
                                >
                                  <option value="" disabled>
                                    Sélectionnez un type de service
                                  </option>
                                  <option value="Garde régulière">
                                    Garde régulière
                                  </option>
                                  <option value="Garde occasionnelle">
                                    Garde occasionnelle
                                  </option>
                                  <option value="Service de garde d'urgence">
                                    Service de garde d&apos;urgence
                                  </option>
                                  <option value="Programme éducatif">
                                    Programme éducatif
                                  </option>
                                  <option value="Autre">Autre</option>
                                </select>
                                {errors.serviceType && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.serviceType}
                                  </p>
                                )}
                              </motion.div>

                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                className="relative"
                              >
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                <textarea
                                  name="additionalInfo"
                                  placeholder="Informations supplémentaires (allergies, besoins particuliers, etc.)"
                                  rows={3}
                                  value={formData.additionalInfo}
                                  onChange={handleInputChange}
                                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] focus:bg-gray-50 transition-shadow"
                                ></textarea>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Navigation Buttons */}
                      <div className="pt-4 flex gap-4  mt-auto">
                        {currentStep > 1 && (
                          <motion.button
                            type="button"
                            onClick={handlePrevious}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <ChevronLeft className="w-5 h-5" />
                            Précédent
                          </motion.button>
                        )}

                        {currentStep < 3 ? (
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            className="flex-1 text-white px-6 py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                            style={{
                              background: "var(--color-secondary)",
                            }}
                          >
                            Suivant
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98, y: 0 }}
                            className="flex-1 text-white px-6 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              background: "var(--color-secondary)",
                            }}
                          >
                            {isLoading ? "Envoi en cours..." : "Soumettre"}
                          </motion.button>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InscriptionModal;