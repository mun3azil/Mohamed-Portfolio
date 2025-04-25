import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from '@/context/ThemeContext';
import ClientMain from '@/components/ui/ClientMain';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const cairo = Cairo({
  weight: ['400', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: "Mohammad | مطور ويب محترف",
  description: "موقع Mohammad المتخصص في تطوير المواقع الإلكترونية وتصميم الواجهات وتحسين محركات البحث",
  keywords: "تطوير الويب، تصميم مواقع، SEO، استضافة، React، Next.js",
  openGraph: {
    title: 'Mohammed Portfolio',
    description: 'Professional web developer portfolio',
    url: 'https://mohammed-portfolio.com',
    images: [
      {
        url: '/public/globe.svg',
        width: 800,
        height: 600,
        alt: 'Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mohammed_dev',
    title: 'Mohammed Portfolio',
    description: 'Professional web developer portfolio',
    images: '/public/globe.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${roboto.variable} ${cairo.variable} antialiased`}
      >
        <ThemeProvider>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Header />
              <ClientMain>
                {children}
              </ClientMain>
              <Footer />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
