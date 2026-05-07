import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-[var(--space-16)] md:py-[calc(var(--space-16)+var(--space-8))]', className)}>
      {children}
    </section>
  );
}
