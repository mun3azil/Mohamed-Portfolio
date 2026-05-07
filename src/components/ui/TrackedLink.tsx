'use client';

import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: string;
  eventPayload?: Record<string, string | number | boolean>;
};

export function TrackedLink({ href, children, className, eventName, eventPayload }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={() => {
        trackEvent(eventName, eventPayload);
      }}
    >
      {children}
    </Link>
  );
}
