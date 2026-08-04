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

  // Role-Based Route Protection Enforcement
  const userRole = request.cookies.get('photomagic_user_role')?.value || 'super_admin';

  // 1. Client Role Restrictions (Client accounts are strictly restricted to Client Portal & Proofing Vault)
  if (userRole === 'client') {
    const isClientAllowedRoute =
      path.startsWith('/portal') ||
      path.startsWith('/gallery') ||
      path.startsWith('/albums') ||
      path.startsWith('/delivery');

    if (!isClientAllowedRoute) {
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  // 2. Photographer / Editor Role Restrictions (Cannot access Admin, Financials, DevOps, or Security)
  if (userRole === 'photographer' || userRole === 'editor') {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/gallery', request.url));
    }
  }

  // 3. Studio Manager Role Restrictions (Cannot access DevOps or Security)
  if (userRole === 'studio_manager') {
    if (path.startsWith('/devops') || path.startsWith('/security')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
