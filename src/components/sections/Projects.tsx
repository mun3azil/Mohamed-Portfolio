"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
}

// Adding ARIA labels and improving accessibility
const ProjectCard = ({ title, description, image, tags, demoLink, codeLink }: ProjectCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      role="article"
      aria-labelledby={`project-title-${title}`}
    >
      <div className="relative h-64 bg-gray-300 dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary to-secondary opacity-70"
            aria-hidden="true"
          >
            <span className="text-white text-2xl font-bold">{title}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 id={`project-title-${title}`} className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-100 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6" aria-label="Project tags">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-md shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`View demo of ${title}`}
            >
              عرض المشروع
            </Link>
          )}
          {codeLink && (
            <Link
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-primary text-primary rounded-md shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-gray-700"
              aria-label={`View source code of ${title}`}
            >
              الكود المصدري
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="spinner border-t-4 border-primary w-16 h-16 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('projectsLoading')}</p>
        </div>
      </section>
    );
  }

  const projects = [
    {
      title: t('project1Title'),
      description: t('project1Desc'),
      image: null,
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
      demoLink: 'https://example.com/ecommerce',
      codeLink: 'https://github.com/mohamed/ecommerce',
    },
    {
      title: t('project2Title'),
      description: t('project2Desc'),
      image: null,
      tags: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
      demoLink: 'https://example.com/education',
      codeLink: 'https://github.com/mohamed/education-platform',
    },
    {
      title: t('project3Title'),
      description: t('project3Desc'),
      image: null,
      tags: ['Django', 'Python', 'PostgreSQL', 'AWS'],
      demoLink: 'https://example.com/cms',
      codeLink: 'https://github.com/mohamed/cms-system',
    },
    {
      title: t('project4Title'),
      description: t('project4Desc'),
      image: null,
      tags: ['React Native', 'Firebase', 'GraphQL'],
      demoLink: 'https://example.com/fitness',
      codeLink: 'https://github.com/mohamed/fitness-tracker',
    },
    {
      title: t('project5Title'),
      description: t('project5Desc'),
      image: null,
      tags: ['Vue.js', 'D3.js', 'Express', 'MySQL'],
      demoLink: 'https://example.com/dashboard',
      codeLink: 'https://github.com/mohamed/analytics-dashboard',
    },
    {
      title: t('project6Title'),
      description: t('project6Desc'),
      image: null,
      tags: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      demoLink: 'https://example.com/chatbot',
      codeLink: 'https://github.com/mohamed/ai-chatbot',
    },
  ];

  const uniqueTags = Array.from(new Set(projects.flatMap((project) => project.tags)));
  const filteredProjects = filter
    ? projects.filter((project) => project.tags.includes(filter))
    : projects;

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{t('projectsTitle')}</h2>
          <p className="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
            {t('projectsIntro')}
          </p>
        </div>
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent text-sm font-medium ${
              !filter ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
            }`}
            aria-label={t('projectsAll')}
          >
            {t('projectsAll')}
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent text-sm font-medium ${
                filter === tag
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
              }`}
              aria-label={tag}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="px-8 py-4 bg-primary text-white rounded-md shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent text-lg font-medium"
            aria-label={t('projectsAllBtn')}
          >
            {t('projectsAllBtn')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;