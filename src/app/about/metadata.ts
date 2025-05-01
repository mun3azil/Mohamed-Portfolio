import { Metadata } from 'next';

// This file is no longer used as metadata is now generated dynamically in page.tsx
// Keeping this file for reference only

export const metadata: Metadata = {
  title: 'Mohammed - من أنا | مطور ويب محترف',
  description: 'تعرف على محمد، مطور ويب محترف يتمتع بخبرة واسعة في تصميم وتطوير المواقع وتحسين محركات البحث.',
  keywords: ['من أنا', 'تطوير مواقع', 'تصميم واجهات', 'تحسين محركات البحث', 'Mohammed'],
  openGraph: {
    title: 'Mohammed - من أنا | مطور ويب محترف',
    description: 'تعرف على محمد، مطور ويب محترف يتمتع بخبرة واسعة في تصميم وتطوير المواقع وتحسين محركات البحث.',
    url: 'https://mohammed-portfolio.com/about',
    type: 'website',
    images: [
      {
        url: 'https://mohammed-portfolio.com/assets/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Mohammed - Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed - من أنا | مطور ويب محترف',
    description: 'تعرف على محمد، مطور ويب محترف يتمتع بخبرة واسعة في تصميم وتطوير المواقع وتحسين محركات البحث.',
    images: ['https://mohammed-portfolio.com/assets/about-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://mohammed-portfolio.com/about',
    languages: {
      'ar': 'https://mohammed-portfolio.com/about',
      'en': 'https://mohammed-portfolio.com/en/about',
    },
  },
};