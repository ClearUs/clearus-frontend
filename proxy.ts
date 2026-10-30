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
  const bareHost = hostname.split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If visiting the apex/root domain (e.g. clearus.tech or www.clearus.tech)
  // with a tenant path (/auth/[code], /student/[code], /staff/[code]),
  // redirect immediately to the tenant subdomain (e.g. futo.clearus.tech/auth).
  if (APP_DOMAIN && (bareHost === APP_DOMAIN || bareHost === `www.${APP_DOMAIN}`)) {
    const authMatch = pathname.match(/^\/auth\/([a-zA-Z0-9_-]+)(.*)/);
    if (authMatch) {
      const tenantCode = authMatch[1].toLowerCase();
      const rest = authMatch[2] || '';
      return NextResponse.redirect(`https://${tenantCode}.${APP_DOMAIN}/auth${rest}`);
    }

    const studentMatch = pathname.match(/^\/student\/([a-zA-Z0-9_-]+)(.*)/);
    if (studentMatch) {
      const tenantCode = studentMatch[1].toLowerCase();
      const rest = studentMatch[2] || '';
      return NextResponse.redirect(`https://${tenantCode}.${APP_DOMAIN}/student${rest}`);
    }

    const staffMatch = pathname.match(/^\/staff\/([a-zA-Z0-9_-]+)(.*)/);
    if (staffMatch) {
      const tenantCode = staffMatch[1].toLowerCase();
      const rest = staffMatch[2] || '';
      return NextResponse.redirect(`https://${tenantCode}.${APP_DOMAIN}/staff${rest}`);
    }

    return NextResponse.next();
  }

  const tenant = extractTenant(hostname);

  if (!tenant) return NextResponse.next();

  const segments = pathname.split('/').filter(Boolean);

  // If a request on a subdomain already includes the tenant segment in the path (e.g. futo.clearus.tech/auth/futo),
  // normalize and redirect to the clean subdomain path (e.g. futo.clearus.tech/auth).
  if (segments.length >= 2 && segments[1].toLowerCase() === tenant.toLowerCase()) {
    const cleanPath = `/${segments[0]}${segments.slice(2).length > 0 ? '/' + segments.slice(2).join('/') : ''}`;
    return NextResponse.redirect(new URL(cleanPath, request.url));
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
