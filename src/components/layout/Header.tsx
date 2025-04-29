"use client";

import Link from 'next/link';
import { useState, useCallback, memo, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '../../utils/navLinksData';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');
  const { locale, locales, asPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link 
            href="/" 
            className="relative w-24 h-12 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-2"
            aria-label={t('greeting')}
          >
            <Image
              src="/assets/logo.png"
              alt={t('greeting')}
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav 
            links={NAV_LINKS.map(link => ({
              ...link,
              label: t(link.labelKey || link.label, link.label)
            }))} 
          />

          {/* Language and Theme Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-2 items-center">
              {locales && locales.map((lng) => (
                <button
                  key={lng}
                  onClick={() => window.location.href = `/${lng}${asPath}`}
                  disabled={locale === lng}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                    locale === lng 
                      ? 'bg-primary text-white' 
                      : 'bg-light-darker dark:bg-dark-lighter text-gray-800 dark:text-gray-100'
                  }`}
                  aria-label={t('switchLanguage', { lng: lng.toUpperCase() })}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg bg-light-darker dark:bg-dark-lighter text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out hover:scale-110"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={handleToggleMenu}
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={handleCloseMenu}
        links={NAV_LINKS.map(link => ({
          ...link,
          label: t(link.labelKey || link.label, link.label)
        }))}
      />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
