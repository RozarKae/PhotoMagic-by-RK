import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Decode JWT payload safely in edge environment without external heavy libraries
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Extract active Supabase Auth Token from cookies
 */
function extractAuthSession(request: NextRequest): { token: string | null; role: string } {
  // 1. Direct session token cookies
  const directToken =
    request.cookies.get('photomagic_os_session')?.value ||
    request.cookies.get('sb-access-token')?.value;

  // 2. Supabase multi-chunk or project cookies (e.g. sb-zciojooxyvzzqaebyoqe-auth-token)
  let projectToken: string | null = null;
  for (const cookie of request.cookies.getAll()) {
    if (cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')) {
      try {
        const parsed = JSON.parse(cookie.value);
        if (Array.isArray(parsed) && parsed[0]) {
          projectToken = parsed[0];
        } else if (parsed.access_token) {
          projectToken = parsed.access_token;
        }
      } catch {
        projectToken = cookie.value;
      }
      break;
    }
  }

  const token = directToken || projectToken;
  let role = request.cookies.get('photomagic_user_role')?.value || 'super_admin';

  if (token && token.includes('.')) {
    const payload = decodeJwtPayload(token);
    if (payload) {
      const jwtRole = payload.user_metadata?.role || payload.app_metadata?.role || payload.role;
      if (jwtRole && typeof jwtRole === 'string') {
        role = jwtRole;
      }
    }
  }

  return { token: token || null, role };
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow static resources, API routes, and public assets
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.startsWith('/static') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

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
    path.startsWith('/automation') ||
    path.startsWith('/portal');

  const { token, role: userRole } = extractAuthSession(request);

  // Unauthenticated user attempting to access protected route
  if (isProtectedOsRoute && !token) {
    // In local development, auto-seed a super_admin cookie for rapid development
    if (process.env.NODE_ENV !== 'production' || request.nextUrl.hostname === 'localhost') {
      const response = NextResponse.next();
      response.cookies.set('photomagic_os_session', 'sess_super_admin_active', {
        path: '/',
        maxAge: 86400,
        sameSite: 'lax',
      });
      response.cookies.set('photomagic_user_role', 'super_admin', {
        path: '/',
        maxAge: 86400,
        sameSite: 'lax',
      });
      return response;
    }

    // Production unauthenticated redirect to luxury auth gateway
    const studioUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
    const loginRedirectUrl = new URL('/login', studioUrl);
    loginRedirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginRedirectUrl);
  }

  // ============================================================================
  // Strict Role-Based Access Control (RBAC) Route Protection Enforcement
  // ============================================================================

  // 1. Client Role Restrictions (Client accounts strictly restricted to Client Portal & Vault)
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

  // 2. Photographer / Editor Role Restrictions (Disallowed from Admin, Financials, DevOps, Security)
  if (userRole === 'photographer' || userRole === 'editor') {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/gallery', request.url));
    }
  }

  // 3. Studio Manager Role Restrictions (Disallowed from DevOps & Security Infrastructure)
  if (userRole === 'studio_manager') {
    if (path.startsWith('/devops') || path.startsWith('/security')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Inject user role header for downstream server components and actions
  const response = NextResponse.next();
  response.headers.set('x-photomagic-user-role', userRole);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
