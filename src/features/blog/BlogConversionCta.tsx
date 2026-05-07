'use client';

import { useTranslations } from 'next-intl';
import { TrackedButton } from '@/components/ui/TrackedButton';

type BlogConversionCtaProps = {
  slug?: string;
  placement?: 'mid' | 'end';
};

export function BlogConversionCta({ slug, placement }: BlogConversionCtaProps) {
  const tBlogCta = useTranslations('blogCta');
  const tActions = useTranslations('actions');
  const startProjectText = tActions('startProject');

  return (
    <aside className="my-[var(--space-10)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]">
      <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-primary)]">{tBlogCta('eyebrow')}</p>
      <h2 className="mt-[var(--space-2)] text-[length:var(--text-2xl)] font-semibold">{tBlogCta('title')}</h2>
      <p className="mt-[var(--space-3)] text-[var(--color-text-muted)]">{tBlogCta('description')}</p>
      <div className="mt-[var(--space-4)]">
        <TrackedButton
          href="#contact"
          eventName="blog_cta_click"
          eventPayload={{
            slug: slug ?? 'blog-index',
            placement: placement ?? 'end',
            cta: startProjectText,
          }}
        >
          {startProjectText}
        </TrackedButton>
      </div>
    </aside>
  );
}