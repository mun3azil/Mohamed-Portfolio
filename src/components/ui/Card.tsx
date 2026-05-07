import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children?: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      {children}
    </article>
  );
}
