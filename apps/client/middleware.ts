import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie =
    request.cookies.get('sb-access-token') || request.cookies.get('photomagic-session');

  // Protected client portal routes
  if (pathname.startsWith('/portal') && !authCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*', '/login', '/register'],
};
