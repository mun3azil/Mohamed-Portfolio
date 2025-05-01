"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import AnimatedGradient from '@/components/animations/AnimatedGradient';

const EnhancedCallToAction = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Animated gradient background */}
      <AnimatedGradient 
        className="absolute inset-0 z-0" 
        opacity={1} 
        direction="diagonal"
        colors={['#4f46e5', '#8b5cf6', '#6366f1', '#a855f7']}
        duration={20}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </AnimatedGradient>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('ctaTitle')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentLang === 'en' 
              ? "Interested in working together? Let's discuss your project and see how I can help bring your ideas to life."
              : "هل أنت مهتم بالعمل معًا؟ دعنا نناقش مشروعك ونرى كيف يمكنني المساعدة في تحويل أفكارك إلى واقع."
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${currentLang}/contact`}
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                aria-label={t('contactMeAria')}
              >
                <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>{t('contactMe')}</span>
                <ArrowIcon />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/assets/cv.pdf"
                download
                className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                aria-label={t('downloadCVAria')}
              >
                {t('downloadCV')}
              </a>
            </motion.div>
          </motion.div>
          
          {/* Animated decorative elements */}
          <div className="absolute left-10 top-10 w-20 h-20 opacity-20" aria-hidden="true">
            <motion.div
              className="w-full h-full rounded-full border-4 border-white"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="absolute right-10 bottom-10 w-16 h-16 opacity-20" aria-hidden="true">
            <motion.div
              className="w-full h-full rounded-full bg-white"
              animate={{ 
                scale: [1, 1.5, 1],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedCallToAction;
