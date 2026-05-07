import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { ReactNode } from 'react';
import { getDirection, type Locale } from '@/lib/i18n';

type SiteShellProps = {
  children?: ReactNode;
  locale: Locale;
};

export function SiteShell({ children, locale }: SiteShellProps) {
  return (
    <div
      dir={getDirection(locale)}
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
