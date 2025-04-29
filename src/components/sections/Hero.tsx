'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';

interface HeroProps {
  title: string;
  description: string;
}

const Hero = ({ title, description }: HeroProps) => {
  const { t } = useTranslation('common');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('animate-fadeIn');
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative py-20 bg-gradient-to-b from-light to-light-darker dark:from-dark dark:to-dark-lighter overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" aria-hidden="true" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-right space-y-6">
            <h1 
              id="hero-title" 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideDown"
            >
              <span className="block text-gray-800 dark:text-gray-100">{t('heroWelcome')}</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-slideUp">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-scaleIn">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-white rounded-lg shadow-soft hover:shadow-hover transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark text-lg font-medium"
                aria-label={t('heroContactAria')}
              >
                {t('heroContactBtn')}
              </Link>
              
              <Link
                href="/projects"
                className="px-8 py-4 bg-white dark:bg-dark-lighter text-primary dark:text-primary-light border-2 border-primary dark:border-primary-light rounded-lg shadow-soft hover:shadow-hover transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark text-lg font-medium"
                aria-label={t('heroProjectsAria')}
              >
                {t('heroProjectsBtn')}
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-bounceIn">
            <div
              className="w-72 h-72 md:w-96 md:h-96 relative mx-auto rounded-full overflow-hidden border-4 border-primary dark:border-primary-light shadow-hover"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 dark:opacity-30" />
              <Image
                src="/images/profile.jpg"
                alt={t('heroImgAlt')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>
            
            {/* Skills Badges */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-lighter p-3 rounded-full shadow-hover animate-slideUp">
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full text-xl">
                <span>{t('badgeJS')}</span>
              </div>
            </div>
            
            <div className="absolute top-1/4 -right-6 bg-white dark:bg-dark-lighter p-3 rounded-full shadow-hover animate-slideDown">
              <div className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full text-xl">
                <span>{t('badgeR')}</span>
              </div>
            </div>
            
            <div className="absolute -top-4 left-1/4 bg-white dark:bg-dark-lighter p-3 rounded-full shadow-hover animate-scaleIn">
              <div className="w-12 h-12 flex items-center justify-center bg-accent-alt text-white rounded-full text-xl">
                <span>{t('badgeHTML')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;