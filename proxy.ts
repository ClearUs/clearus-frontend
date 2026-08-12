import { NextRequest, NextResponse } from 'next/server';

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN;

function extractTenant(hostname: string): string | null {
  if (!APP_DOMAIN) return null;

  const bareHost = hostname.split(':')[0].toLowerCase();

  if (
    bareHost === APP_DOMAIN ||
    bareHost === `www.${APP_DOMAIN}` ||
    !bareHost.endsWith(`.${APP_DOMAIN}`)
  ) {
    return null;
  }

  return bareHost.replace(`.${APP_DOMAIN}`, '');
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const tenant = extractTenant(hostname);

  if (!tenant) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length >= 2 && segments[1].toLowerCase() === tenant.toLowerCase()) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (pathname === '/' || pathname === '/auth') {
    url.pathname = `/auth/${tenant}`;
  } else {
    const restOfPath = segments.slice(1).join('/');
    url.pathname = `/${segments[0]}/${tenant}${restOfPath ? `/${restOfPath}` : ''}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
