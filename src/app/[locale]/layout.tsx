
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { SiteShell } from '@/components/layout/SiteShell';
import { notFound } from 'next/navigation';
import { isValidLocale, locales, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Mohamed - Full Stack Developer',
  description: 'I build conversion-focused web products that drive qualified leads.',
};

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale: Locale = locale;

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider locale={validLocale} messages={messages}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteShell locale={validLocale}>
          <main id="main">
            {children}
          </main>
        </SiteShell>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
