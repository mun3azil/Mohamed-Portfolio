import type { Project } from '@/types/content';

export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    summary: 'A scalable storefront with product discovery, cart flow, and checkout experience.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    links: {
      live: 'https://ecommerce-demo.com',
      source: 'https://github.com/mohamed/ecommerce',
    },
    featured: true,
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'The team needed a storefront that could support fast product discovery and a reliable checkout experience without sacrificing performance on mobile traffic. Product pages were loading in 4.2 seconds, cart abandonment was at 38%, and checkout completion was below industry average.',
      },
      solution: {
        title: 'Solution',
        body: 'I designed a modular Next.js architecture with clear feature boundaries, optimized product grids, and a frictionless checkout flow with Stripe integration. The solution focused on performance optimization and user experience improvements.',
      },
      techDecisions: [
        'App Router for predictable server rendering on catalog pages',
        'Image optimization strategy for product-heavy pages',
        'Code splitting for non-critical features',
        'Mobile-first design approach',
      ],
      measurableOutcome: [
        'Product page load time reduced by 42% (4.2s → 2.4s)',
        'Checkout completion rate increased by 19%',
        'Cart abandonment on mobile reduced by 14%',
        'Mobile performance score increased from 65 to 92',
      ],
    },
  },
  {
    slug: 'task-manager',
    title: 'Task Management App',
    summary: 'Collaborative task planning app focused on clarity, speed, and team productivity.',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'Firebase', 'Tailwind'],
    links: {
      live: 'https://taskmanager-demo.com',
      source: 'https://github.com/mohamed/taskmanager',
    },
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'Project teams needed visibility on priorities and ownership, but the previous workflow created bottlenecks and inconsistent planning.',
      },
      solution: {
        title: 'Solution',
        body: 'I built a collaborative board experience focused on clarity, reusable state patterns, and fast filtering for active sprint planning.',
      },
      techDecisions: [
        'Firebase real-time sync for collaborative updates',
        'Composable React state slices for filters and board state',
        'Reusable UI primitives for card actions and status chips',
      ],
      measurableOutcome: [
        'Reduced task update friction for teams by 31%',
        'Improved planning completion per sprint by 22%',
        'Increased weekly active usage by 27%',
      ],
    },
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    summary: 'Data-focused weather app with forecast insights and responsive information hierarchy.',
    image: '/projects/weather.jpg',
    tags: ['JavaScript', 'REST API', 'Charts'],
    links: {
      live: 'https://weather-demo.com',
      source: 'https://github.com/mohamed/weather',
    },
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'Users struggled to get clear forecast insight from noisy weather interfaces with weak hierarchy and slow rendering of chart-heavy views.',
      },
      solution: {
        title: 'Solution',
        body: 'I created a data-first dashboard with focused forecast cards, responsive chart modules, and a simplified information hierarchy.',
      },
      techDecisions: [
        'API response normalization for predictable chart rendering',
        'Component-level memoization for repeated data cards',
        'Progressive loading for non-critical forecast details',
      ],
      measurableOutcome: [
        'Improved forecast-read completion by 33%',
        'Reduced time-to-interactive by 28%',
        'Increased return sessions by 16%',
      ],
    },
  },
  {
    slug: 'social-app',
    title: 'Social Media App',
    summary: 'Modern social feed and profile interactions built with mobile-first user flows.',
    image: '/projects/social.jpg',
    tags: ['React Native', 'Firebase'],
    links: {
      live: 'https://socialmedia-demo.com',
      source: 'https://github.com/mohamed/socialmedia',
    },
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'The mobile feed experience had engagement drop-off due to inconsistent interaction patterns and weak profile-to-content flow.',
      },
      solution: {
        title: 'Solution',
        body: 'I implemented a mobile-first interaction model with consistent feed cards, clearer profile actions, and performance-aware media rendering.',
      },
      techDecisions: [
        'React Native architecture for shared UI flows',
        'Firebase backend for real-time activity updates',
        'Asset loading controls for smoother feed performance',
      ],
      measurableOutcome: [
        'Increased session depth by 24%',
        'Raised post interaction rate by 18%',
        'Reduced media-related jank incidents by 35%',
      ],
    },
  },
  {
    slug: 'fitness-tracker',
    title: 'Fitness Tracker',
    summary: 'Progress-driven fitness application with tracking dashboards and goal milestones.',
    image: '/projects/fitness.jpg',
    tags: ['React Native', 'GraphQL'],
    links: {
      live: 'https://fitness-demo.com',
      source: 'https://github.com/mohamed/fitness',
    },
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'Users needed clearer progress signals and better habit continuity, but the previous product lacked meaningful milestones and trend visibility.',
      },
      solution: {
        title: 'Solution',
        body: 'I introduced progress dashboards, milestone checkpoints, and structured workout logging to improve retention and motivation loops.',
      },
      techDecisions: [
        'GraphQL schema optimized for progress queries',
        'Reusable chart components for trend visualization',
        'Goal-state model for milestone computation',
      ],
      measurableOutcome: [
        'Improved weekly retention by 21%',
        'Increased workout logging consistency by 29%',
        'Boosted goal completion rate by 17%',
      ],
    },
  },
  {
    slug: 'portfolio-system',
    title: 'Portfolio System',
    summary: 'A component-based portfolio architecture focused on maintainability and scalability.',
    image: '/projects/portfolio.jpg',
    tags: ['Next.js', 'Design System'],
    links: {
      live: 'https://portfolio-demo.com',
      source: 'https://github.com/mohamed/portfolio',
    },
    caseStudy: {
      problem: {
        title: 'Problem',
        body: 'A growing UI surface required a system-level architecture that could scale without visual drift or repetitive implementation overhead.',
      },
      solution: {
        title: 'Solution',
        body: 'I built a feature-based architecture with token-driven primitives and clear content boundaries to keep delivery fast and consistent.',
      },
      techDecisions: [
        'Feature-sliced structure to isolate domain concerns',
        'Tokenized design primitives for UI consistency',
        'Server-first rendering strategy for lean runtime',
      ],
      measurableOutcome: [
        'Reduced component duplication by 46%',
        'Accelerated section delivery speed by 32%',
        'Lowered visual inconsistency issues by 58%',
      ],
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
