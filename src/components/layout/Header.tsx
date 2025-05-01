"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'next-intl';
import { useTheme } from 'next-themes';

// Navigation links - these could be moved to a separate file for better organization
const NAV_LINKS = [
  { href: '/', labelKey: 'navHome', ariaLabelKey: 'navHomeAria' },
  { href: '/about', labelKey: 'navAbout', ariaLabelKey: 'navAboutAria' },
  { href: '/services', labelKey: 'navServices', ariaLabelKey: 'navServicesAria' },
  { href: '/projects', labelKey: 'navProjects', ariaLabelKey: 'navProjectsAria' },
  { href: '/blog', labelKey: 'navBlog', ariaLabelKey: 'navBlogAria' },
  { href: '/contact', labelKey: 'navContact', ariaLabelKey: 'navContactAria' },
];

// Supported languages
const LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
];

const Header = () => {
  // State hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Hooks
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Get current language from pathname
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme initialization to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle keyboard navigation and accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    // Trap focus within mobile menu when open
    const handleTabKey = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Tab') {
        const focusableElements = headerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || [];

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // If shift+tab on first element, move to last
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If tab on last element, move to first
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Set focus to first menu item when menu opens
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    }
  }, [isMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Toggle theme with animation
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // Switch language with path-based routing
  const switchLanguage = useCallback((lang: string) => {
    // Create the new path by replacing the language segment
    const segments = pathname?.split('/') || [];

    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'ar')) {
      segments[1] = lang;
    } else if (segments[0] === '') {
      segments.splice(1, 0, lang);
    }

    return segments.join('/') || `/${lang}`;
  }, [pathname]);

  // Animation variants with reduced motion support
  const menuVariants = {
    closed: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        staggerDirection: -1,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Header elevation animation
  const headerVariants = {
    top: {
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
    scrolled: {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(8px)",
      backgroundColor: isRTL
        ? theme === 'dark' ? "rgba(17, 24, 39, 0.85)" : "rgba(255, 255, 255, 0.85)"
        : theme === 'dark' ? "rgba(17, 24, 39, 0.85)" : "rgba(255, 255, 255, 0.85)"
    }
  };

  return (
    <motion.header
      ref={headerRef}
      className="fixed w-full top-0 z-50 transition-colors duration-300"
      role="banner"
      dir={isRTL ? 'rtl' : 'ltr'}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={prefersReducedMotion ? {} : headerVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href={`/${currentLang}`}
            className="relative w-24 h-12 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label={t('logoAria') || "Logo"}
          >
            <Image
              src="/assets/logo.png"
              alt={t('logoAlt') || "Portfolio Logo"}
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6 rtl:space-x-reverse"
            aria-label={t('mainNavAria') || "Main Navigation"}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={`/${currentLang}${link.href}`}
                className={`relative text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                  pathname === `/${currentLang}${link.href}`
                    ? 'font-bold text-primary dark:text-primary-light'
                    : 'font-medium'
                }`}
                aria-label={t(link.ariaLabelKey) || link.labelKey}
                aria-current={pathname === `/${currentLang}${link.href}` ? 'page' : undefined}
              >
                {t(link.labelKey)}
                {pathname === `/${currentLang}${link.href}` && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls: Language & Theme */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex gap-2 items-center">
              {LANGUAGES.map(lang => (
                <Link
                  key={lang.code}
                  href={switchLanguage(lang.code)}
                  locale={lang.code}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                    currentLang === lang.code
                      ? 'bg-primary text-white dark:bg-primary-light dark:text-gray-900'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  aria-label={t('switchLanguageAria', { language: lang.name }) || `Switch to ${lang.name}`}
                  aria-current={currentLang === lang.code ? 'true' : 'false'}
                >
                  {lang.code.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                aria-label={t(theme === 'dark' ? 'switchToLightMode' : 'switchToDarkMode') || (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              ref={menuButtonRef}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('closeMenu') || 'Close menu' : t('openMenu') || 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 relative"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  animate={{
                    top: isMenuOpen ? "50%" : "25%",
                    rotate: isMenuOpen ? 45 : 0,
                    translateY: isMenuOpen ? "-50%" : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full top-1/2 -translate-y-1/2"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    width: isMenuOpen ? 0 : 24
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  animate={{
                    top: isMenuOpen ? "50%" : "75%",
                    rotate: isMenuOpen ? -45 : 0,
                    translateY: isMenuOpen ? "-50%" : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              aria-hidden="true"
              onClick={closeMenu}
            />

            {/* Menu */}
            <motion.div
              id="mobile-menu"
              className="fixed top-[72px] inset-x-0 bg-white dark:bg-gray-900 shadow-lg z-50 max-h-[calc(100vh-72px)] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={t('mobileMenuAria') || "Mobile menu"}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="container mx-auto px-4 py-6 space-y-6">
                <nav className="flex flex-col space-y-4" aria-label={t('mobileNavAria') || "Mobile navigation"}>
                  {NAV_LINKS.map((link, index) => (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={`/${currentLang}${link.href}`}
                        className={`block py-3 px-4 text-lg rounded-lg transition-colors duration-200 ${
                          pathname === `/${currentLang}${link.href}`
                            ? 'bg-primary/10 text-primary dark:text-primary-light font-bold'
                            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={closeMenu}
                        aria-label={t(link.ariaLabelKey) || link.labelKey}
                        aria-current={pathname === `/${currentLang}${link.href}` ? 'page' : undefined}
                        ref={index === 0 ? firstMenuItemRef : null}
                      >
                        {t(link.labelKey)}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile language switcher */}
                <motion.div
                  variants={itemVariants}
                  className="pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {t('languageSwitcherLabel') || "Change language"}
                  </p>
                  <div className="flex gap-2">
                    {LANGUAGES.map(lang => (
                      <Link
                        key={lang.code}
                        href={switchLanguage(lang.code)}
                        locale={lang.code}
                        className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                          currentLang === lang.code
                            ? 'bg-primary text-white dark:bg-primary-light dark:text-gray-900'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                        aria-label={t('switchLanguageAria', { language: lang.name }) || `Switch to ${lang.name}`}
                        aria-current={currentLang === lang.code ? 'true' : 'false'}
                        onClick={closeMenu}
                      >
                        {lang.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;