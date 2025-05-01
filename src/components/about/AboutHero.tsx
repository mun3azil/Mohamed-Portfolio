"use client";

import { useTranslation } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaArrowDown } from 'react-icons/fa';

interface AboutHeroProps {
  profileImage?: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ 
  profileImage = '/assets/profile.jpg' 
}) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
            variants={itemVariants}
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
            <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl">
              <Image
                src={profileImage}
                alt={t('aboutMe')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className={`text-center md:text-${isRTL ? 'right' : 'left'} max-w-2xl`}
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              {t('aboutTitle')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {t('aboutIntro')}
            </motion.p>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8"
              variants={itemVariants}
            >
              {t('aboutBio')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link
                href={`/${currentLang}/contact`}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label={t('contactMeAria')}
              >
                {t('contactMe')}
              </Link>
              
              <a
                href="/assets/cv.pdf"
                download
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label={t('downloadCVAria')}
              >
                {t('downloadCV')}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center text-gray-500 dark:text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm mb-2">{t('scrollForMore')}</span>
            <FaArrowDown className="animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
