"use client"

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare, CheckCircle2, X, AlertCircle } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    details: ''
  });

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '', details: '' });
        setIsLoading(false);
        setErrors({});
        setApiError('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Veuillez sélectionner un service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          details: formData.details,
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
        setApiError('Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (apiError) {
      setApiError('');
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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2"
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div
              className="hidden md:flex flex-col justify-between p-8 lg:p-10 text-white"
              style={{
                background: "var(--color-primary)",
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
                  Contactez-nous
                </h2>
                <p className="mt-2 text-sm lg:text-base opacity-90">
                  Nous sommes là pour répondre à vos questions sur notre
                  garderie.
                </p>
              </div>
              <div className="text-xs lg:text-sm opacity-70">
                © {new Date().getFullYear()} Garderie la fée des étoiles.
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-start">
              <AnimatePresence mode="wait">
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
                      <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-[var(--color-primary)]" />
                    </motion.div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-5">
                      Message envoyé !
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-2">
                      Merci. Nous reviendrons vers vous très prochainement.
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
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        id="contact-modal-title"
                        className="text-xl sm:text-2xl font-bold text-gray-800"
                      >
                        Formulaire de contact
                      </h2>
                      <button
                        onClick={onClose}
                        aria-label="Fermer le formulaire"
                        className="md:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-500 mb-4">
                      Remplissez ce formulaire et nous vous contacterons
                      rapidement.
                    </p>
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.08 } },
                      }}
                    >
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

                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className="relative"
                      >
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Nom et prénom"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                            errors.name
                              ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                              : "border-gray-200 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
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
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Adresse email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                            errors.email
                              ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                              : "border-gray-200 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
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
                          name="phone"
                          placeholder="Numéro de téléphone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:bg-gray-50 transition-all ${
                            errors.phone
                              ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                              : "border-gray-200 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
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
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full pl-4 pr-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.service
                              ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                              : "border-gray-200 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                          }`}
                        >
                          <option value="" disabled>
                            Sélectionnez un sujet
                          </option>
                          <option value="Inscription">Inscription</option>
                          <option value="Informations sur les tarifs">
                            Informations sur les tarifs
                          </option>
                          <option value="Questions générales">
                            Questions générales
                          </option>
                          <option value="Visite de la garderie">
                            Visite de la garderie
                          </option>
                          <option value="Autre">Autre</option>
                        </select>
                        {errors.service && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.service}
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
                          name="details"
                          placeholder="Votre message..."
                          rows={4}
                          value={formData.details}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:bg-gray-50 transition-all"
                        ></textarea>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className="pt-2"
                      >
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          className="w-full text-white px-6 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: "var(--color-primary)",
                          }}
                        >
                          {isLoading
                            ? "Envoi en cours..."
                            : "Envoyer le message"}
                        </motion.button>
                      </motion.div>
                    </motion.form>
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

export default FormModal;
