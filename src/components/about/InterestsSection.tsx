"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { interests } from '@/data/interestsData';

const InterestsSection = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
      id="interests"
      aria-labelledby="interests-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="interests-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('interestsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t('interestsSubtitle')}</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {interests.map((interest) => (
            <motion.div
              key={interest.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <interest.icon className="text-2xl text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {interest.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InterestsSection;
