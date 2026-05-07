'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('toggles');
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('theme')}
      className="inline-flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-sm)] transition-colors hover:bg-[var(--color-surface-strong)]"
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}
