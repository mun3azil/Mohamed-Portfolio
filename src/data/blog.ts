import type { BlogPostMeta } from '@/types/content';

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'design-system-first-frontend',
    title: 'Design System First: Building Faster, Cleaner Frontends',
    description:
      'How tokenized spacing, typography, and reusable primitives improve quality and delivery speed.',
    date: '2026-03-28',
    tags: ['Design System', 'Frontend Architecture', 'Next.js'],
  },
  {
    slug: 'performance-by-default-nextjs',
    title: 'Performance by Default in Next.js App Router',
    description:
      'Practical strategies for dynamic imports, image optimization, and reducing client-side JavaScript.',
    date: '2026-03-26',
    tags: ['Performance', 'Next.js', 'Web Vitals'],
  },
];
