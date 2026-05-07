'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export function LanguageToggle() {
  const t = useTranslations('toggles');
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'ar' : 'en';
  const segments = pathname.split('/').filter(Boolean);
  const tail = segments.slice(1).join('/');
  const switchedPath = `/${nextLocale}${tail ? `/${tail}` : ''}`;

  return (
    <Link
      href={switchedPath}
      aria-label={t('language')}
      className="inline-flex h-[2.25rem] items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3)] text-[length:var(--text-sm)] font-medium transition-colors hover:bg-[var(--color-surface-strong)]"
    >
      <span className="text-[var(--color-text)]">{locale.toUpperCase()}</span>
      <span className="text-[var(--color-text-muted)]">|</span>
      <span className="text-[var(--color-text-muted)]">{nextLocale.toUpperCase()}</span>
    </Link>
  );
}
