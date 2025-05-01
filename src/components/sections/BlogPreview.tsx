"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string | null;
  date: string;
  slug: string;
  category: string;
}

const BlogCard = React.memo(({ title, excerpt, image, date, slug, category }: BlogCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
      <div className="relative h-48 bg-gray-300 dark:bg-gray-700 custom-relative">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-secondary opacity-70">
            <span className="text-white text-xl font-bold">{category}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="ml-2">{date}</span>
          <span className="mx-2">•</span>
          <span className="bg-accent-alt bg-opacity-20 text-accent-alt px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 hover:text-primary transition">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:text-secondary font-medium inline-flex items-center group"
        >
          قراءة المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-2"
            width="16" 
            height="16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
});

const BlogPreviewComponent = () => {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="spinner border-t-4 border-primary w-16 h-16 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('blogLoading')}</p>
        </div>
      </section>
    );
  }

  const posts = [
    {
      title: t('blog1Title'),
      excerpt: t('blog1Excerpt'),
      image: null,
      date: '15 يناير 2023',
      slug: 'seo-best-practices-2023',
      category: t('blog1Category'),
    },
    {
      title: t('blog2Title'),
      excerpt: t('blog2Excerpt'),
      image: null,
      date: '28 فبراير 2023',
      slug: 'nextjs-for-beginners',
      category: t('blog2Category'),
    },
    {
      title: t('blog3Title'),
      excerpt: t('blog3Excerpt'),
      image: null,
      date: '10 مارس 2023',
      slug: 'designing-attractive-user-interfaces',
      category: t('blog3Category'),
    },
  ];

  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('blogTitle')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('blogIntro')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              slug={post.slug}
              category={post.category}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="px-8 py-4 bg-primary text-white rounded-md hover:bg-secondary transition duration-300 text-lg font-medium inline-block"
          >
            {t('blogAllBtn')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewComponent;