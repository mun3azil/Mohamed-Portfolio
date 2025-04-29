"use client";

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

// يمكنك لاحقًا استخراج هذه الروابط لملف منفصل لو المشروع كبر
const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  
  const links = [
    { href: '/about', labelKey: 'navAbout' },
    { href: '/services', labelKey: 'navServices' },
    { href: '/projects', labelKey: 'navProjects' },
    { href: '/blog', labelKey: 'navBlog' },
    { href: '/contact', labelKey: 'navContact' },
  ];

  const socialLinks = [
    { href: '#', icon: '📘', label: 'فيسبوك' },
    { href: '#', icon: '🐦', label: 'تويتر' },
    { href: '#', icon: '📱', label: 'إنستغرام' },
    { href: '#', icon: '💼', label: 'لينكد إن' },
  ];

  return (
    <footer 
      className="bg-light dark:bg-dark text-gray-700 dark:text-gray-300 mt-10 relative overflow-hidden"
      role="contentinfo"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معلومات الموقع */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block"
              aria-label={t('footerHomeAria')}
            >
              <div className="relative w-32 h-16">
                <Image
                  src="/assets/logo.png"
                  alt={t('greeting')}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              {t('footerDescription')}
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footerQuickLinks')}</h3>
            <nav className="space-y-2" aria-label={t('footerLinksAria')}>
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                  aria-label={t(link.labelKey)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footerContact')}</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-primary dark:text-primary-light">📧</span>
                <a 
                  href="mailto:contact@example.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                >
                  contact@example.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary dark:text-primary-light">📱</span>
                <a 
                  href="tel:+1234567890"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                >
                  +123 456 7890
                </a>
              </p>
            </div>
          </div>

          {/* النشرة البريدية */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footerNewsletter')}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('footerEmailPlaceholder')}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                  aria-label={t('footerEmailAria')}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
              >
                {t('footerSubscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* حقوق النشر وروابط التواصل الاجتماعي */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Mohammad. {t('footerCopyright')}
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;