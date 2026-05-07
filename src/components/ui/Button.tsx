import { Link } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-[var(--radius-md)] px-[var(--space-6)] py-[var(--space-3)] text-[length:var(--text-sm)] font-medium transition-colors focus-ring disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)]',
    secondary:
      'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-strong)]',
    ghost: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
