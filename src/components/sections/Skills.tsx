"use client";

import { useState } from "react";
import { FaCode, FaServer, FaTools } from "react-icons/fa";
import styles from "./Skills.module.css";
import { useTranslation } from 'next-i18next';

const Skills = () => {
  const { t } = useTranslation('common');
  const [categories] = useState([
    {
      title: t('skillsFrontend'),
      icon: <FaCode className="text-3xl mb-4 text-primary" />,
      skills: [
        { name: t('skillReactjs'), progress: 90 },
        { name: t('skillNextjs'), progress: 85 },
        { name: t('skillTailwind'), progress: 90 },
        { name: t('skillTypescript'), progress: 85 },
        { name: t('skillHtmlCss'), progress: 95 },
      ],
    },
    {
      title: t('skillsBackend'),
      icon: <FaServer className="text-3xl mb-4 text-primary" />,
      skills: [
        { name: t('skillNodejs'), progress: 85 },
        { name: t('skillExpressjs'), progress: 80 },
        { name: t('skillRestApi'), progress: 85 },
        { name: t('skillGraphql'), progress: 75 },
      ],
    },
    {
      title: t('skillsTools'),
      icon: <FaTools className="text-3xl mb-4 text-primary" />,
      skills: [
        { name: t('skillGit'), progress: 90 },
        { name: t('skillMongodb'), progress: 80 },
        { name: t('skillPostgresql'), progress: 75 },
        { name: t('skillDocker'), progress: 70 },
      ],
    },
  ]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">{t('skillsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center">
                {category.icon}
                <h3 className="text-xl font-semibold mb-6 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium dark:text-white">
                        {skill.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className={`bg-primary h-2 rounded-full ${styles.progressBar}`}
                        data-progress={skill.progress}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;