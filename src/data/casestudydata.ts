
import { CaseStudyData } from '@/features/caseStudy/casestudysection';

export const ecommerceCaseStudy: CaseStudyData = {
  headline: 'E-Commerce Platform: 42% Faster Checkout Experience',
  hook: 'A scalable storefront with optimized product discovery, frictionless cart flow, and checkout experience.',

  problem: {
    title: 'The Challenge: Slow Performance, High Cart Abandonment',
    description: 'The team needed a storefront that could support fast product discovery and a reliable checkout experience without sacrificing performance on mobile traffic.',
    issues: [
      'Product pages loading in 4.2 seconds (too slow)',
      'Cart abandonment at 38% (losing revenue)',
      'Checkout completion below industry average',
      'Poor mobile performance',
    ],
    image: {
      src: '/projects/ecommerce-before.jpg',
      alt: 'Before: Slow loading e-commerce interface with poor user experience',
    },
  },

  solution: {
    title: 'The Fix: Performance-First Architecture',
    description: 'I designed a modular Next.js architecture with clear feature boundaries, optimized product grids, and a frictionless checkout flow with Stripe integration.',
    improvements: [
      'Optimized product page rendering',
      'Streamlined checkout flow',
      'Mobile-first design approach',
      'Performance-focused image loading',
    ],
    image: {
      src: '/projects/ecommerce-after.jpg',
      alt: 'After: Fast loading e-commerce interface with optimized user experience',
    },
  },

  results: {
    title: 'The Impact: Measurable Business Growth',
    metrics: [
      {
        label: 'Faster Load Time',
        value: '42%',
        description: 'Product page load time (4.2s → 2.4s)',
      },
      {
        label: 'Higher Conversion',
        value: '19%',
        description: 'Increase in checkout completion rate',
      },
      {
        label: 'Less Abandonment',
        value: '14%',
        description: 'Reduction in mobile cart abandonment',
      },
      {
        label: 'Better Performance',
        value: '41%',
        description: 'Increase in mobile performance score (65 → 92)',
      },
    ],
    image: {
      src: '/projects/ecommerce-metrics.jpg',
      alt: 'Performance metrics dashboard showing improvements in Core Web Vitals',
    },
  },

  cta: {
    title: "Ready to improve your website's performance and conversions?",
    primary: {
      text: 'Start a Project',
      href: '#contact',
    },
    secondary: {
      text: 'View Live Demo',
      href: 'https://ecommerce-demo.com',
    },
  },
};
