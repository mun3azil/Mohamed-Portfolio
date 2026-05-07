'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

type BlogEngagementTrackerProps = {
  slug: string;
};

export function BlogEngagementTracker({ slug }: BlogEngagementTrackerProps) {
  useEffect(() => {
    trackEvent('blog_post_view', { slug });
  }, [slug]);

  return null;
}
