"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

// Extracted for DRY: Navigation links config
const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', aria: 'الذهاب إلى الصفحة الرئيسية' },
  { href: '/about', label: 'من أنا', aria: 'تعرف على المزيد عني' },
  { href: '/services', label: 'خدماتي', aria: 'استكشاف خدماتي' },
  { href: '/projects', label: 'مشاريعي', aria: 'عرض مشاريعي' },
  { href: '/blog', label: 'المدونة', aria: 'قراءة المدونة' },
  { href: '/contact', label: 'اتصل بي', aria: 'اتصل بي' },
];

// Subcomponent for navigation links
const NavLinks = memo(({ isMobile, onClick }: { isMobile?: boolean; onClick?: () => void }) => (
  <>
    {NAV_LINKS.map(link => (
      <Link
        key={link.href}
        href={link.href}
        className={`site-header__link ${isMobile ? 'block py-2' : ''} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent focus-visible:outline-2 focus-visible:outline-primary rounded transition-colors duration-200 active:scale-95`}
        aria-label={link.aria}
        tabIndex={0}
        onClick={isMobile ? onClick : undefined}
      >
        {link.label}
      </Link>
    ))}
  </>
));
NavLinks.displayName = 'NavLinks';

// Subcomponent for theme toggle
const ThemeToggle = memo(({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="site-header__theme-toggle ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    type="button"
  >
    <span className="sr-only">{theme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}</span>
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
));
ThemeToggle.displayName = 'ThemeToggle';

// Subcomponent for mobile menu
const MobileMenu = memo(({ isOpen, onClose, menuRef }: { isOpen: boolean; onClose: () => void; menuRef: React.RefObject<HTMLDivElement | null> }) => (
  isOpen ? (
    <>
      <div
        className="site-header__backdrop fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity animate-fadeIn"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        ref={menuRef}
        className="site-header__mobile-menu fixed top-0 right-0 left-0 md:hidden bg-white dark:bg-gray-900 shadow-md z-50 animate-slideDown"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الجانبية"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <NavLinks isMobile onClick={onClose} />
        </div>
      </div>
    </>
  ) : null
));
MobileMenu.displayName = 'MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;
    const firstLink = menuRef.current.querySelector('a');
    (firstLink as HTMLElement)?.focus();
  }, [isMenuOpen]);

  return (
    <header className="site-header bg-white shadow-sm dark:bg-gray-900 sticky top-0 z-50" role="banner">
      <div className="site-header__container container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="site-header__brand text-2xl font-bold text-primary focus-visible:outline-2 focus-visible:outline-primary rounded" aria-label="الرئيسية">
          <span className="gradient-text">Mohammad</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="site-header__nav hidden md:flex gap-8" aria-label="القائمة الرئيسية">
          <NavLinks />
        </nav>
        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {/* Mobile Menu Button */}
        <button
          className="site-header__menu-btn md:hidden text-gray-500 dark:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span className="sr-only">{isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Navigation + Backdrop */}
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} menuRef={menuRef} />
    </header>
  );
};

export default memo(Header);
