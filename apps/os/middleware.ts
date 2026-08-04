import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protected OS & Admin route patterns
  const isAdminRoute =
    path.startsWith('/admin') ||
    path.startsWith('/financials') ||
    path.startsWith('/security') ||
    path.startsWith('/devops');
  const isProtectedOsRoute =
    isAdminRoute ||
    path.startsWith('/dashboard') ||
    path.startsWith('/projects') ||
    path.startsWith('/bookings') ||
    path.startsWith('/gallery') ||
    path.startsWith('/albums') ||
    path.startsWith('/ai') ||
    path.startsWith('/delivery') ||
    path.startsWith('/clients') ||
    path.startsWith('/settings') ||
    path.startsWith('/analytics') ||
    path.startsWith('/automation');

  // Allow static resources, api routes, and public assets
  if (path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
    return NextResponse.next();
  }

  // Session verification token check
  const sessionToken =
    request.cookies.get('photomagic_os_session')?.value ||
    request.cookies.get('sb-access-token')?.value;

  if (isProtectedOsRoute && !sessionToken) {
    if (process.env.NODE_ENV !== 'production') {
      const response = NextResponse.next();
      response.cookies.set('photomagic_os_session', 'sess_demo_dev_active', {
        path: '/',
        maxAge: 86400,
      });
      return response;
    }

    const studioUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
    const loginRedirectUrl = new URL('/login', studioUrl);
    loginRedirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginRedirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
