import { NextRequest, NextResponse } from 'next/server';

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN; // e.g. "clearus.tech"

function extractTenant(hostname: string): string | null {
  if (!APP_DOMAIN) return null;

  const bareHost = hostname.split(':')[0];

  if (
    bareHost === APP_DOMAIN ||
    bareHost === `www.${APP_DOMAIN}` ||
    !bareHost.endsWith(`.${APP_DOMAIN}`)
  ) {
    return null;
  }

  return bareHost.replace(`.${APP_DOMAIN}`, '');
}

export function middleware(request: NextRequest) {
  if (!APP_DOMAIN) return NextResponse.next();

  const hostname = request.headers.get('host') || '';
  const tenant = extractTenant(hostname);

  if (!tenant) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Don't rewrite API routes, static assets, or Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If the path already contains the tenant code (e.g. /staff/futo from client-side nav),
  // let it pass through — the route already resolves.
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 2 && segments[1].toLowerCase() === tenant.toLowerCase()) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (pathname === '/') {
    // futo.clearus.tech/ → serve /auth/futo
    url.pathname = `/auth/${tenant}`;
  } else {
    // futo.clearus.tech/staff → serve /staff/futo
    // futo.clearus.tech/auth  → serve /auth/futo
    const firstSegment = segments[0];
    url.pathname = `/${firstSegment}/${tenant}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
