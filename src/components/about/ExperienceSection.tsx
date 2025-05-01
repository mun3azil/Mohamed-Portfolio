"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { workExperience, education } from '@/data/experienceData';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const ExperienceSection = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('presentLabel');
    
    const date = new Date(dateString);
    const month = date.toLocaleString(currentLang === 'en' ? 'en-US' : 'ar-SA', { month: 'short' });
    const year = date.getFullYear();
    
    return `${month} ${year}`;
  };

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
    hidden: { x: isRTL ? 50 : -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4">
        {/* Work Experience */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 
              id="experience-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {t('experienceTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{t('experienceSubtitle')}</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div 
              className={`absolute top-0 bottom-0 ${isRTL ? 'right-[15px]' : 'left-[15px]'} md:${isRTL ? 'right-1/2' : 'left-1/2'} w-0.5 bg-gray-300 dark:bg-gray-700 transform ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'}`}
              aria-hidden="true"
            ></div>

            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {workExperience.map((job, index) => (
                <motion.div 
                  key={job.id}
                  className={`relative ${isRTL ? 'md:pr-1/2' : 'md:pl-1/2'}`}
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute top-0 ${isRTL ? 'right-0 md:right-1/2' : 'left-0 md:left-1/2'} w-8 h-8 bg-primary rounded-full transform ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <FaBriefcase className="text-white" />
                  </div>

                  {/* Content */}
                  <div 
                    className={`${isRTL ? 'mr-12 md:mr-0 md:ml-12' : 'ml-12 md:ml-0 md:mr-12'} bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <FaCalendarAlt className="mr-1" />
                        <span>
                          {formatDate(job.startDate)} - {formatDate(job.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="font-medium text-primary dark:text-primary-light">{job.company}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                      {job.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {job.link && (
                      <a 
                        href={job.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary dark:text-primary-light hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        aria-label={`Visit ${job.company} website`}
                      >
                        <span className="mr-1">Visit company</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-16">
            <h2 
              id="education-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {t('educationTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{t('educationSubtitle')}</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div 
              className={`absolute top-0 bottom-0 ${isRTL ? 'right-[15px]' : 'left-[15px]'} md:${isRTL ? 'right-1/2' : 'left-1/2'} w-0.5 bg-gray-300 dark:bg-gray-700 transform ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'}`}
              aria-hidden="true"
            ></div>

            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {education.map((edu) => (
                <motion.div 
                  key={edu.id}
                  className={`relative ${isRTL ? 'md:pr-1/2' : 'md:pl-1/2'}`}
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute top-0 ${isRTL ? 'right-0 md:right-1/2' : 'left-0 md:left-1/2'} w-8 h-8 bg-primary rounded-full transform ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <FaGraduationCap className="text-white" />
                  </div>

                  {/* Content */}
                  <div 
                    className={`${isRTL ? 'mr-12 md:mr-0 md:ml-12' : 'ml-12 md:ml-0 md:mr-12'} bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <FaCalendarAlt className="mr-1" />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="font-medium text-primary dark:text-primary-light">{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>

                    {edu.achievements && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
