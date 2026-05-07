'use client';

import { useTranslations } from 'next-intl';

export function BlogPostList() {
  const t = useTranslations('blog');

  return (
    <section className="mx-auto w-full max-w-4xl px-[var(--space-4)] py-[var(--space-10)]">
      <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-primary)]">{t('eyebrow')}</p>
      <h1 className="mt-[var(--space-2)] text-[length:var(--text-4xl)] font-semibold">{t('title')}</h1>
      <p className="mt-[var(--space-3)] text-[var(--color-text-muted)]">{t('subtitle')}</p>

      <div className="mt-[var(--space-8)] rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-[var(--space-6)] text-[var(--color-text-muted)]">
        {t('emptyState')}
      </div>
    </section>
  );
}