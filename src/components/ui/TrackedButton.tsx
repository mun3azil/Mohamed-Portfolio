'use client';

import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import type { ReactNode } from 'react';

type TrackedButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  eventName: string;
  eventPayload?: Record<string, string | number | boolean>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

export function TrackedButton({
  children,
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedButtonProps) {
  return (
    <Button
      {...props}
      onClick={() => {
        trackEvent(eventName, eventPayload);
        onClick?.();
      }}
    >
      {children}
    </Button>
  );
}
