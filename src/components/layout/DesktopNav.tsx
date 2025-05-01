"use client";

import Link from 'next/link';
import { useState } from 'react';

interface SubLink {
  href: string;
  label: string;
  aria: string;
  icon?: string;
}

interface NavLink {
  href: string;
  label: string;
  aria: string;
  icon?: string;
  subLinks?: SubLink[];
}

interface DesktopNavProps {
  links: NavLink[];
}

const DesktopNav = ({ links }: DesktopNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Keyboard navigation for dropdowns
  const handleKeyboardNavigation = (
    e: React.KeyboardEvent,
    subLinks: SubLink[],
    parentHref: string
  ) => {
    const ids = subLinks.map((s) => `${parentHref}-${s.href}`);
    const currentIndex = ids.indexOf(document.activeElement?.id || "");
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = document.getElementById(ids[(currentIndex + 1) % ids.length]);
      next?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = document.getElementById(ids[(currentIndex - 1 + ids.length) % ids.length]);
      prev?.focus();
    }
    if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  return (
    <nav className="site-header__nav hidden md:flex gap-8" aria-label="القائمة الرئيسية">
      {links.map(link => (
        <div
          key={link.href}
          className="relative"
          onMouseEnter={() => link.subLinks && setOpenDropdown(link.href)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <Link
            href={link.href}
            className="site-header__nav-link flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-105 hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded active:text-primary px-2 py-1"
            aria-label={link.aria}
            aria-expanded={link.subLinks ? openDropdown === link.href : undefined}
            onFocus={() => link.subLinks && setOpenDropdown(link.href)}
            onBlur={() => setOpenDropdown(null)}
          >
            {link.icon && <span className={`icon-${link.icon}`} aria-hidden="true" />}
            {link.label}
          </Link>
          {link.subLinks && openDropdown === link.href && (
            <div
              className="absolute left-0 top-full min-w-[180px] bg-white shadow-lg dark:bg-gray-800 z-10 rounded-md mt-2 animate-fadeIn"
              role="menu"
              aria-label={link.label + ' submenu'}
            >
              {/* استخدم عناصر li مباشرة داخل div مع role="menuitem" لكل عنصر */}
              {link.subLinks.map((subLink, index) => (
                <div key={index} role="menuitem">
                  <Link
                    href={subLink.href}
                    id={`${link.href}-${subLink.href}`}
                    className="flex items-center gap-2 py-2 px-3 text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-accent transition-all duration-300 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-accent active:text-primary hover:scale-105"
                    aria-label={subLink.aria}
                    tabIndex={0}
                    onKeyDown={e => handleKeyboardNavigation(e, link.subLinks!, link.href)}
                  >
                    {subLink.icon && <span className={`icon-${subLink.icon}`} aria-hidden="true" />}
                    {subLink.label}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;