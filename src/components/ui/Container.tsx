import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type ContainerProps = { className?: string; children?: ReactNode };

export function Container({ className, children }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-[var(--space-4)] md:px-[var(--space-6)]', className)}>{children}</div>;
}
