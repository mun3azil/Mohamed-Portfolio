"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { interests } from '@/data/interestsData';
import ParallaxElement from '@/components/animations/ParallaxElement';
import AnimatedBlob from '@/components/animations/AnimatedBlob';

const EnhancedInterestsSection = () => {
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
      className="relative py-20 overflow-hidden"
      id="interests"
      aria-labelledby="interests-heading"
    >
      {/* Background decorative elements */}
      <AnimatedBlob 
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 z-0"
        size={500}
        opacity={0.07}
        blur={70}
        color1="#ec4899"
        color2="#8b5cf6"
      />
      
      <AnimatedBlob 
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 z-0"
        size={400}
        opacity={0.07}
        blur={60}
        color1="#6366f1"
        color2="#10b981"
      />
      
      <div className="container mx-auto px-4 relative z-10">
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
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('interestsSubtitle')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {interests.map((interest, index) => (
            <ParallaxElement
              key={interest.id}
              speed={0.1}
              direction="vertical"
              reverse={index % 2 === 0}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <interest.icon className="text-2xl text-primary dark:text-primary-light" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {interest.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {interest.description}
                </p>
                
                {/* Hidden easter egg */}
                <motion.div
                  className="mt-4 text-xs text-primary/70 dark:text-primary-light/70 italic"
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: 'auto' }}
                >
                  {t('interestEasterEgg', { interest: interest.title })}
                </motion.div>
              </motion.div>
            </ParallaxElement>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedInterestsSection;
