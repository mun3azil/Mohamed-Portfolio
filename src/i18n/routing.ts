import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from '@/lib/i18n';

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/projects': '/projects',
    '/projects/[slug]': '/projects/[slug]',
    '/blog': '/blog',
    '/contact': '/contact',
    '/analytics/funnel': '/analytics/funnel',
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing as any);
