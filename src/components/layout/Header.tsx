"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

const Header = () => {
  const { openModal } = useModal();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 px-12 bg-[var(--color-background)] shadow-lg">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Image
          src="/Logo.png"
          alt="Garderie la fée des étoiles"
          width={448}
          height={448}
          className="h-12 w-auto"
        />
      </div>

      <nav className="flex space-x-6">
        <Link
          href="/"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Accueil
        </Link>
        <Link
          href="/#recent-activities"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Activités récentes
        </Link>
        <Link
          href="/#advantages"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Avantages
        </Link>
        <Link
          href="#tarifs"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Tarifs
        </Link>
        <Link
          href="/#faq"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          FAQ
        </Link>
      </nav>

      {/* Contact and Inscription buttons on the right */}
      <div className="flex space-x-4">
        <button
          className="bg-[var(--color-secondary)] text-[var(--color-text-light)] px-6 py-2 rounded-lg hover:bg-[var(--color-secondary-hover)] transition-colors"
          onClick={() => openModal("inscription")}
        >
          Inscription
        </button>
        <button
          className="bg-[var(--color-primary)] text-[var(--color-text-light)] px-6 py-2 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
          onClick={() => openModal("contact")}
        >
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
