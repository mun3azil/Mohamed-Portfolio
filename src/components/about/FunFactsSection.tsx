"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaCoffee, 
  FaCode, 
  FaLaptopCode, 
  FaHeadphones, 
  FaBook, 
  FaPlane, 
  FaGamepad, 
  FaGuitar 
} from 'react-icons/fa';

// Fun facts data
const funFacts = [
  {
    id: 'coffee',
    icon: FaCoffee,
    titleKey: 'funFactCoffeeTitle',
    valueKey: 'funFactCoffeeValue',
    color: '#6366f1'
  },
  {
    id: 'code',
    icon: FaCode,
    titleKey: 'funFactCodeTitle',
    valueKey: 'funFactCodeValue',
    color: '#8b5cf6'
  },
  {
    id: 'projects',
    icon: FaLaptopCode,
    titleKey: 'funFactProjectsTitle',
    valueKey: 'funFactProjectsValue',
    color: '#ec4899'
  },
  {
    id: 'music',
    icon: FaHeadphones,
    titleKey: 'funFactMusicTitle',
    valueKey: 'funFactMusicValue',
    color: '#f43f5e'
  },
  {
    id: 'books',
    icon: FaBook,
    titleKey: 'funFactBooksTitle',
    valueKey: 'funFactBooksValue',
    color: '#10b981'
  },
  {
    id: 'travel',
    icon: FaPlane,
    titleKey: 'funFactTravelTitle',
    valueKey: 'funFactTravelValue',
    color: '#0ea5e9'
  },
  {
    id: 'games',
    icon: FaGamepad,
    titleKey: 'funFactGamesTitle',
    valueKey: 'funFactGamesValue',
    color: '#f59e0b'
  },
  {
    id: 'hobbies',
    icon: FaGuitar,
    titleKey: 'funFactHobbiesTitle',
    valueKey: 'funFactHobbiesValue',
    color: '#ef4444'
  }
];

const FunFactsSection = () => {
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
      className="py-20 bg-gray-50 dark:bg-gray-800"
      id="fun-facts"
      aria-labelledby="fun-facts-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="fun-facts-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('funFactsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('funFactsSubtitle')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {funFacts.map((fact) => (
            <motion.div
              key={fact.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${fact.color}20` }}
              >
                <fact.icon 
                  className="text-2xl"
                  style={{ color: fact.color }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(fact.titleKey)}
              </h3>
              <p className="text-xl font-bold text-primary dark:text-primary-light">
                {t(fact.valueKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FunFactsSection;
