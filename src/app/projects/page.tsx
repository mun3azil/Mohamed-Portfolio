"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

interface ProjectsFilterProps {
  categories: string[];
  activeCategory: string | null;
}

// استيراد ProjectCard بشكل Lazy
const ProjectCard = dynamic(() => import('@/components/Projects/ProjectCard'));

// نستخدم مكون بسيط بدون تفاعل لتلافي مشكلة onClick في مكونات الخادم
const ProjectsFilter = ({ categories }: ProjectsFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <div className="inline-block px-4 py-2 rounded-full transition duration-300 bg-primary text-white">
        الكل
      </div>
      {categories.map((category) => (
        <div
          key={category}
          className="inline-block px-4 py-2 rounded-full transition duration-300 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  image: string | null;
  tags: string[];
  demoLink: string;
  codeLink: string;
  category: string;
}

export default function ProjectsPage() {
  const activeCategory = null;

  // عينة فقط من المشاريع للتقليل من حجم الكود
  const projects: Project[] = [
    {
      title: 'متجر إلكتروني',
      description: 'متجر إلكتروني متكامل مع سلة تسوق وبوابة دفع ولوحة تحكم للإدارة.',
      fullDescription: 'منصة تجارة إلكترونية متكاملة تتيح للمستخدمين تصفح المنتجات وإضافتها إلى سلة التسوق والدفع بأمان. تشمل الميزات الرئيسية: نظام تسجيل وتسجيل دخول، بحث وتصفية للمنتجات، سلة تسوق، بوابات دفع متعددة، تتبع الطلبات، ولوحة تحكم للإدارة. تم بناء الواجهة الأمامية باستخدام Next.js وReact، والواجهة الخلفية باستخدام Node.js وExpress، مع قاعدة بيانات MongoDB.',
      image: null,
      tags: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: 'https://example.com/ecommerce',
      codeLink: 'https://github.com/Mohammed/ecommerce',
      category: 'متاجر إلكترونية',
    },
    {
      title: 'منصة تعليمية',
      description: 'منصة تعليمية تفاعلية تدعم الدورات المسجلة والبث المباشر وإصدار الشهادات.',
      fullDescription: 'منصة تعليمية متكاملة تتيح للمعلمين إنشاء ونشر دورات تدريبية، وللطلاب التسجيل ومشاهدة الدروس وإجراء الاختبارات. تشمل الميزات: نظام إدارة الدورات، دعم الفيديو والصوت والملفات، نظام للمناقشات والتعليقات، دعم البث المباشر، نظام إصدار الشهادات، ولوحة تحكم إحصائية. تم تطويرها باستخدام React وNode.js مع قاعدة بيانات MongoDB وتكامل مع خدمات البث المباشر.',
      image: null,
      tags: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
      demoLink: 'https://example.com/education',
      codeLink: 'https://github.com/Mohammed/education-platform',
      category: 'منصات تعليمية',
    },
    {
      title: 'نظام إدارة المحتوى',
      description: 'نظام إدارة محتوى مخصص مع تحرير متقدم للنصوص وإدارة الوسائط المتعددة.',
      fullDescription: 'نظام إدارة محتوى مخصص يوفر واجهة سهلة الاستخدام لإنشاء وتحرير ونشر المحتوى. يتضمن النظام: محرر نصوص متقدم WYSIWYG، إدارة الوسائط المتعددة، دعم SEO، إدارة المستخدمين والأذونات، إدارة التعليقات، جدولة النشر، وقوالب قابلة للتخصيص. تم تطويره باستخدام Django وPython مع PostgreSQL وتكامل مع خدمات AWS للتخزين.',
      image: null,
      tags: ['Django', 'Python', 'PostgreSQL', 'AWS', 'JavaScript'],
      demoLink: 'https://example.com/cms',
      codeLink: 'https://github.com/Mohammed/cms-system',
      category: 'أنظمة إدارة المحتوى',
    }
  ];

  // استخراج جميع الفئات الفريدة من المشاريع
  const categories = [...new Set(projects.map((project) => project.category))];

  // تصفية المشاريع حسب الفئة النشطة
  const filteredProjects = projects;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">مشاريعي</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              مجموعة متنوعة من المشاريع التي قمت بتطويرها باستخدام مختلف التقنيات والأدوات
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Filter by Category */}
          <ProjectsFilter
            categories={categories}
            activeCategory={activeCategory}
          />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                fullDescription={project.fullDescription}
                image={project.image}
                tags={project.tags}
                demoLink={project.demoLink}
                codeLink={project.codeLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">هل لديك فكرة مشروع؟</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            أنا متحمس للتعاون معك لتحويل فكرتك إلى واقع. دعنا نتحدث عن كيفية تحقيق مشروعك القادم.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-primary rounded-md hover:bg-gray-100 transition duration-300 text-lg font-medium inline-block"
          >
            تواصل معي الآن
          </Link>
        </div>
      </section>
    </>
  );
}