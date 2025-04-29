"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '../../utils/navLinksData';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
  links: Array<{
    label: string;
    href: string;
    labelKey?: string;
    aria: string;
    icon?: string;
    subLinks?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

const MobileMenu = ({ onClose, isOpen, links }: MobileMenuProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        aria-label="القائمة الجانبية"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {links.map(link => (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                className="site-header__mobile-link flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-accent transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent active:text-primary py-2 rounded"
                onClick={onClose}
                aria-label={link.aria}
                aria-expanded={link.subLinks ? openDropdown === link.href : undefined}
                onMouseEnter={() => link.subLinks && setOpenDropdown(link.href)}
                onMouseLeave={() => link.subLinks && setOpenDropdown(null)}
                onFocus={() => link.subLinks && setOpenDropdown(link.href)}
                onBlur={() => setOpenDropdown(null)}
              >
                {link.icon && <span className={`icon-${link.icon}`} aria-hidden="true" />}
                {link.label}
              </Link>
              {link.subLinks && openDropdown === link.href && (
                <div className="absolute left-0 w-full bg-white shadow-lg dark:bg-gray-800 z-10 rounded-md mt-2 animate-fadeIn">
                  <ul className="p-4">
                    {link.subLinks.map((subLink, idx) => (
                      <li key={idx}>
                        <Link
                          href={subLink.href}
                          className="block py-2 px-4 text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-accent transition-all duration-300"
                          onClick={onClose}
                        >
                          {subLink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
