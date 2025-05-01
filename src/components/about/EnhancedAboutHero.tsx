"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';

import InteractiveAvatar from '@/components/animations/InteractiveAvatar';
import TypewriterText from '@/components/animations/TypewriterText';
import AnimatedBlob from '@/components/animations/AnimatedBlob';
import FloatingElements from '@/components/animations/FloatingElements';
import ParallaxElement from '@/components/animations/ParallaxElement';

interface EnhancedAboutHeroProps {
  profileImage?: string;
}

const EnhancedAboutHero: React.FC<EnhancedAboutHeroProps> = ({ 
  profileImage = '/assets/profile.jpg' 
}) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for text
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Typewriter words
  const typewriterWords = [
    t('typewriterWord1'), // e.g., "Web Developer"
    t('typewriterWord2'), // e.g., "UI/UX Designer"
    t('typewriterWord3'), // e.g., "Problem Solver"
    t('typewriterWord4')  // e.g., "Creative Thinker"
  ];

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
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      id="about-hero"
    >
      {/* Background decorative elements */}
      <AnimatedBlob 
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 z-0"
        size={600}
        opacity={0.1}
        blur={80}
      />
      
      <AnimatedBlob 
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 z-0"
        size={500}
        opacity={0.1}
        blur={70}
        color1="#8b5cf6"
        color2="#ec4899"
      />
      
      <FloatingElements 
        className="absolute inset-0 z-0"
        count={20}
        opacity={0.07}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image with interactive effects */}
          <motion.div 
            className="relative flex-shrink-0"
            variants={itemVariants}
          >
            <ParallaxElement speed={0.2} direction="vertical" reverse>
              <div className="relative">
                <InteractiveAvatar
                  src={profileImage}
                  alt={t('aboutMe')}
                  size={300}
                  hoverEffect="all"
                  borderColor="#6366f1"
                  glowColor="rgba(99, 102, 241, 0.5)"
                />
                
                {/* Decorative circle */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30 dark:border-primary-light/30 z-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
              </div>
            </ParallaxElement>
          </motion.div>

          {/* Text Content with parallax effect */}
          <motion.div 
            className={`text-center md:text-${isRTL ? 'right' : 'left'} max-w-2xl`}
            style={{ y, opacity }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4"
              variants={itemVariants}
            >
              {t('aboutGreeting')}
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              {t('aboutTitle')}
            </motion.h1>
            
            <motion.div 
              className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6"
              variants={itemVariants}
            >
              {t('iAm')} <TypewriterText words={typewriterWords} className="text-primary dark:text-primary-light" />
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
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

export default EnhancedAboutHero;
