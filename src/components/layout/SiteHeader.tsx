'use client';

import { Link } from '@/i18n/routing';
import { navigationItems } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTranslations } from 'next-intl';

export function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur">
      <Container className="flex h-[var(--space-16)] items-center justify-between">
        <Link href="#home" className="text-[length:var(--text-sm)] font-semibold tracking-wide md:text-[length:var(--text-base)]">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary navigation" className="flex max-w-[55vw] items-center gap-[var(--space-6)] overflow-x-auto md:max-w-none md:gap-[var(--space-8)]">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              {item.key ? t(`navigation.${item.key}`) : item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[var(--space-2)]">
          <LanguageToggle />
          <ThemeToggle />

          <TrackedButton
            href="#contact"
            className="hidden md:inline-flex hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-shadow"
            eventName="header_primary_cta_click"
            eventPayload={{ cta: t('actions.startProject'), location: 'header' }}
          >
            {t('actions.startProject')}
          </TrackedButton>
        </div>
      </Container>
    </header>
  );
}
