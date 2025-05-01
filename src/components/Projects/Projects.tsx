"use client";

import { useMemo } from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = useMemo(() => [
    {
      title: 'مشروع 1',
      description: 'تطبيق ويب حديث يستخدم React و Node.js لتحسين تجربة المستخدم وتقديم حلول مرنة.',
      link: '/projects/project1',
    },
    {
      title: 'مشروع 2',
      description: 'موقع إلكتروني لبيع المنتجات مع واجهة مستخدم سهلة الاستخدام، مدعوم من MongoDB و Express.',
      link: '/projects/project2',
    },
    {
      title: 'مشروع 3',
      description: 'موقع شخصي مع مكونات تفاعلية وتوافق تام مع جميع الأجهزة باستخدام Next.js.',
      link: '/projects/project3',
    },
  ], []);

  return (
    <section className="projects-section py-16 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-primary">مشاريعي</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.title} className="project-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{project.description}</p>
                <Link
                  href={project.link}
                  className="text-primary font-medium hover:underline"
                  aria-label={`عرض تفاصيل ${project.title}`}
                >
                  اعرف المزيد
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;