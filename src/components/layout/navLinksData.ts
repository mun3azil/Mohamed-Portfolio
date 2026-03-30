// Centralized navigation links configuration for the entire application
// Used by Header, Footer, MobileMenu, and other navigation components

import { MessageDescriptor } from 'next-intl';

export interface NavLink {
  href: string;
  labelKey: MessageDescriptor;
  ariaLabelKey: MessageDescriptor;
  external?: boolean;
}

// Main navigation links used across the application
export const NAV_LINKS: NavLink[] = [
  {
    href: '/',
    labelKey: { id: 'navHome', defaultMessage: 'Home' },
    ariaLabelKey: { id: 'navHomeAria', defaultMessage: 'Go to homepage' },
  },
  {
    href: '/about',
    labelKey: { id: 'navAbout', defaultMessage: 'About' },
    ariaLabelKey: { id: 'navAboutAria', defaultMessage: 'Learn more about me' },
  },
  {
    href: '/services',
    labelKey: { id: 'navServices', defaultMessage: 'Services' },
    ariaLabelKey: { id: 'navServicesAria', defaultMessage: 'Explore my services' },
  },
  {
    href: '/projects',
    labelKey: { id: 'navProjects', defaultMessage: 'Projects' },
    ariaLabelKey: { id: 'navProjectsAria', defaultMessage: 'View my projects' },
  },
  {
    href: '/blog',
    labelKey: { id: 'navBlog', defaultMessage: 'Blog' },
    ariaLabelKey: { id: 'navBlogAria', defaultMessage: 'Read the blog' },
  },
  {
    href: '/contact',
    labelKey: { id: 'navContact', defaultMessage: 'Contact' },
    ariaLabelKey: { id: 'navContactAria', defaultMessage: 'Get in touch' },
  },
];
