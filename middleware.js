import { i18n } from '../next-i18next.config';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // إذا كان الرابط يبدأ بـ /_next أو /api أو ملف ثابت، تجاهل
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.[^/]+$/)
  ) {
    return NextResponse.next();
  }
  // إذا كان الرابط لا يحتوي على بادئة لغة، أعد التوجيه للغة الافتراضية
  const hasLocale = i18n.locales.some((lng) => pathname.startsWith(`/${lng}`));
  if (!hasLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
};