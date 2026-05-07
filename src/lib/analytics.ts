'use client';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type StoredAnalyticsEvent = {
  event: string;
  timestamp: string;
  payload: AnalyticsPayload;
};

const STORAGE_KEY = 'portfolio_analytics_events';

function storeEvent(entry: StoredAnalyticsEvent) {
  if (typeof window === 'undefined') return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const events: StoredAnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const nextEvents = [...events, entry].slice(-5000);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents));
  } catch {
    // Ignore storage failures (private mode, quotas, etc.)
  }
}

export function getStoredAnalyticsEvents(): StoredAnalyticsEvent[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const events: StoredAnalyticsEvent[] = raw ? JSON.parse(raw) : [];

    return events.filter((entry) => Boolean(entry?.event) && Boolean(entry?.timestamp));
  } catch {
    return [];
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  if (typeof window.va === 'function') {
    window.va('track', event, payload);
  }

  window.dataLayer.push({ event, ...payload });

  storeEvent({
    event,
    timestamp: new Date().toISOString(),
    payload,
  });
}
