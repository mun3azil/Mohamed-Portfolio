"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-intl';
import { NAV_LINKS, NavLink } from './navLinksData';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
  currentLang: string;
}

const MobileMenu = ({ onClose, isOpen, currentLang }: MobileMenuProps) => {
  const { t } = useTranslation('common');

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity animate-fadeIn"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        className="site-header__mobile-menu fixed top-0 right-0 left-0 md:hidden bg-white dark:bg-gray-900 shadow-md z-50 animate-slideDown"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link: NavLink) => (
            <Link
              key={link.href}
              href={`/${currentLang}${link.href}`}
              className="site-header__mobile-link flex items-center w-full gap-2 text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-accent transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent active:text-primary py-2 rounded"
              onClick={onClose}
              aria-label={t(link.ariaLabelKey)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

