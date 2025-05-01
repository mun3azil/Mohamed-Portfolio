import Link from 'next/link';
import { NAV_LINKS } from '../navLinksData';
import React from 'react';

interface NavLinksProps {
  onClickLink?: () => void;
  className?: string;
}

export const NavLinks: React.FC<NavLinksProps> = React.memo(({ onClickLink, className }) => (
  <nav className={className} aria-label="القائمة الرئيسية">
    {NAV_LINKS.map(({ href, label, ariaLabel, external }) => (
      <Link
        key={href}
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-accent transition-colors focus-visible:outline focus-visible:outline-primary rounded px-2 py-1"
        onClick={onClickLink}
      >
        {label}
      </Link>
    ))}
  </nav>
));

NavLinks.displayName = 'NavLinks';

export default NavLinks;
