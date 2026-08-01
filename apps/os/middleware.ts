import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protected OS route patterns
  const isProtectedOsRoute =
    path.startsWith('/dashboard') ||
    path.startsWith('/admin') ||
    path.startsWith('/projects') ||
    path.startsWith('/bookings') ||
    path.startsWith('/gallery') ||
    path.startsWith('/albums') ||
    path.startsWith('/ai') ||
    path.startsWith('/delivery') ||
    path.startsWith('/clients') ||
    path.startsWith('/financials') ||
    path.startsWith('/settings') ||
    path.startsWith('/analytics') ||
    path.startsWith('/automation');

  // Allow next static resources, api routes, and public assets
  if (path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
    return NextResponse.next();
  }

  // In production, session verification token or cookie check
  const sessionToken = request.cookies.get('photomagic_os_session')?.value;

  if (isProtectedOsRoute && !sessionToken && process.env.NODE_ENV === 'production') {
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/login', websiteUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
