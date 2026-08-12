import { NextRequest, NextResponse } from 'next/server';

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN; // "clearus.tech"

function extractTenant(hostname: string): string | null {
  if (!APP_DOMAIN) return null;

  // Handles localhost/ports cleanly
  const bareHost = hostname.split(':')[0].toLowerCase();

  if (
    bareHost === APP_DOMAIN ||
    bareHost === `www.${APP_DOMAIN}` ||
    !bareHost.endsWith(`.${APP_DOMAIN}`)
  ) {
    return null;
  }

  // Extracts tenant (e.g., "futo" from "futo.clearus.tech")
  return bareHost.replace(`.${APP_DOMAIN}`, '');
}

export function middleware(request: NextRequest) {
  // Prevent infinite loops on internally rewritten requests
  if (request.headers.has('x-middleware-rewrite')) {
    return NextResponse.next();
  }

  const hostname = request.nextUrl.hostname;
  const tenant = extractTenant(hostname);

  // Bare domain or www -> serve standard root routes without rewriting
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

  const segments = pathname.split('/').filter(Boolean);

  // If already prefixed with tenant (e.g., /staff/futo or /auth/futo), skip rewriting
  if (segments.length >= 2 && segments[1].toLowerCase() === tenant.toLowerCase()) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (pathname === '/' || pathname === '/auth') {
    // futo.clearus.tech/  OR  futo.clearus.tech/auth  -> /auth/futo
    url.pathname = `/auth/${tenant}`;
  } else {
    // futo.clearus.tech/staff           -> /staff/futo
    // futo.clearus.tech/staff/dashboard -> /staff/futo/dashboard
    const restOfPath = segments.slice(1).join('/');
    url.pathname = `/${segments[0]}/${tenant}${restOfPath ? `/${restOfPath}` : ''}`;
  }

  const response = NextResponse.rewrite(url);
  response.headers.set('x-middleware-rewrite', 'true');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
