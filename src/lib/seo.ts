import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { blogPosts } from '@/data/blog';

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} | ${siteConfig.role}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'full stack developer',
      'next.js',
      'typescript',
      'portfolio',
      'frontend architecture',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: siteConfig.url,
      title: `${siteConfig.name} | ${siteConfig.role}`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} | ${siteConfig.role}`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildBlogIndexMetadata(): Metadata {
  const title = `Blog | ${siteConfig.name}`;
  const description = 'Practical articles on Next.js, frontend architecture, conversion UX, and web performance engineering.';

  return {
    title,
    description,
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/blog`,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'Blog index preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export function buildBlogPostMetadata(slug: string): Metadata {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: `Post Not Found | ${siteConfig.name}`,
      description: 'The article you are looking for is unavailable or may have been moved.',
    };
  }

  const title = `${post.title} | ${siteConfig.name}`;
  const description = post.description;
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
