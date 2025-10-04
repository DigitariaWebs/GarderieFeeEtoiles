import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 px-12 bg-[var(--color-background)] shadow-lg">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Garderie Fée Étoiles"
          className="h-12 w-auto"
        />
      </div>

      {/* Nav links in the center */}
      <nav className="flex space-x-6">
        <a
          href="#"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Accueil
        </a>
        <a
          href="/#recent-activities"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Activités récentes
        </a>
        <a
          href="#"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Services
        </a>
        <a
          href="#"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Notre Équipe
        </a>
        <a
          href="#"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
        >
          Tarifs
        </a>
      </nav>

      {/* Contact and Inscription buttons on the right */}
      <div className="flex space-x-4">
        <button className="bg-[var(--color-secondary)] text-[var(--color-text-light)] px-6 py-2 rounded-lg hover:bg-[var(--color-secondary-hover)] transition-colors">
          Inscription
        </button>
        <button className="bg-[var(--color-primary)] text-[var(--color-text-light)] px-6 py-2 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors">
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
