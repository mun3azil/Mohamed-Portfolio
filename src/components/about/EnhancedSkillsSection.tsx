"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { skillCategories } from '@/data/skillsData';
import RadialSkillChart from '@/components/animations/RadialSkillChart';
import AnimatedGradient from '@/components/animations/AnimatedGradient';
import ParallaxElement from '@/components/animations/ParallaxElement';

const EnhancedSkillsSection = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // State for active skill (for tooltip)
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

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
      id="skills"
      aria-labelledby="skills-heading"
    >
      {/* Background gradient */}
      <AnimatedGradient 
        className="absolute inset-0 z-0" 
        opacity={0.05} 
        direction="radial"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('skillsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <ParallaxElement 
              key={category.id} 
              speed={0.2} 
              direction="vertical" 
              reverse={categoryIndex % 2 === 0}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center mb-6">
                  <category.icon className="text-3xl text-primary dark:text-primary-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t(category.titleKey)}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="relative"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <RadialSkillChart
                        percentage={skill.level}
                        label={skill.name}
                        icon={<skill.icon />}
                        size={100}
                        strokeWidth={6}
                      />
                      
                      {/* Tooltip */}
                      {activeSkill === skill.name && (
                        <motion.div
                          className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded shadow-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <p className="font-medium">{skill.level}% {t('skillProficiency')}</p>
                          <p>{t('skillYearsExperience', { years: skill.yearsOfExperience })}</p>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-700"></div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Easter egg message */}
                <motion.div
                  className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 italic"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {t('skillsEasterEgg')}
                </motion.div>
              </motion.div>
            </ParallaxElement>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedSkillsSection;
