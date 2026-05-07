import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type HeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function Heading({ title, subtitle, align = 'left', className }: HeadingProps) {
  return (
    <header className={cn(align === 'center' && 'text-center', className)}>
      <h2 className="text-[length:var(--text-3xl)] font-semibold tracking-tight md:text-[length:var(--text-4xl)]">{title}</h2>
      {subtitle ? <p className="mt-[var(--space-3)] text-[length:var(--text-lg)] text-[var(--color-text-muted)]">{subtitle}</p> : null}
    </header>
  );
}
