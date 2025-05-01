import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import "@/styles/about.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from '@/providers/ThemeProvider';
import ClientMain from '@/components/ui/ClientMain';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import ScrollToTop from '@/components/ui/ScrollToTop';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const cairo = Cairo({
  weight: ['400', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammed-portfolio.com'),
  title: {
    default: "Mohammad | مطور ويب محترف",
    template: "%s | Mohammad Portfolio"
  },
  description: "موقع Mohammad المتخصص في تطوير المواقع الإلكترونية وتصميم الواجهات وتحسين محركات البحث",
  keywords: [
    "تطوير الويب",
    "تصميم مواقع",
    "SEO",
    "استضافة",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "تطوير تطبيقات",
    "تصميم واجهات",
    "تحسين محركات البحث"
  ],
  authors: [{ name: "Mohammad", url: "https://mohammed-portfolio.com" }],
  creator: "Mohammad",
  publisher: "Mohammad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://mohammed-portfolio.com',
    title: 'Mohammed Portfolio | مطور ويب محترف',
    description: 'موقع شخصي متخصص في تطوير المواقع الإلكترونية وتصميم الواجهات',
    siteName: 'Mohammed Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohammed Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mohammed_dev',
    creator: '@mohammed_dev',
    title: 'Mohammed Portfolio | مطور ويب محترف',
    description: 'موقع شخصي متخصص في تطوير المواقع الإلكترونية وتصميم الواجهات',
    images: '/images/twitter-image.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
  alternates: {
    canonical: 'https://mohammed-portfolio.com',
    languages: {
      'ar-SA': 'https://mohammed-portfolio.com',
      'en-US': 'https://mohammed-portfolio.com/en',
    },
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  // Default to Arabic if no locale is specified
  const locale = params?.locale || 'ar';
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      {/* Head tags are now handled by the metadata object above */}
      <body
        className={`${roboto.variable} ${cairo.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Header />
              <ClientMain>
                {children}
              </ClientMain>
              <Footer />
              <ScrollToTop />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
