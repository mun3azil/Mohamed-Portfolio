import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { defaultLocale, locales } from '@/lib/i18n';
import en from '../../messages/en.json';
import ar from '../../messages/ar.json';

const messagesMap = {
  en,
  ar,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: messagesMap[locale],
  };
});