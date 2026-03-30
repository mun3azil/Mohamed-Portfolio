"use client";

import Link from 'next/link';
import { useTranslation } from 'next-intl';
import { NAV_LINKS, NavLink } from '../navLinksData';
import React from 'react';

interface NavLinksProps {
  onClickLink?: () => void;
  className?: string;
  currentLang: string;
}

export const NavLinks: React.FC<NavLinksProps> = React.memo(({ onClickLink, className, currentLang }) => {
  const { t } = useTranslation('common');

  return (
    <nav className={className} aria-label="Main navigation">
      {NAV_LINKS.map((link: NavLink) => (
        <Link
          key={link.href}
          href={`/${currentLang}${link.href}`}
          aria-label={t(link.ariaLabelKey)}
          className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-accent transition-colors focus-visible:outline focus-visible:outline-primary rounded px-2 py-1"
          onClick={onClickLink}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </nav>
  );
});

NavLinks.displayName = 'NavLinks';

export default NavLinks;
