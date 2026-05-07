'use client';

import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/social';
import { siteConfig } from '@/data/site';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { useTranslations } from 'next-intl';

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="section-divider py-[var(--space-10)]">
      <Container className="flex flex-col gap-[var(--space-6)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[length:var(--text-sm)] font-semibold">{siteConfig.name}</p>
          <p className="mt-[var(--space-1)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{siteConfig.role}</p>
        </div>

        <nav className="flex flex-wrap gap-[var(--space-4)]">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              {item.key ? t(`navigation.${item.key}`) : item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-[var(--space-4)]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-strong)] transition-colors"
            >
              <span>{link.label}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L6 14" />
              </svg>
            </a>
          ))}
        </div>

        <TrackedButton
          href="#contact"
          className="hidden md:inline-flex"
          eventName="footer_primary_cta_click"
          eventPayload={{ cta: t('actions.startProject'), location: 'footer' }}
        >
          {t('actions.startProject')}
        </TrackedButton>
      </Container>
      <div className="text-center mt-[var(--space-8)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
