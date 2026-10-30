import { cookies } from 'next/headers';
import { getBackendUrl } from '@/lib/api/client';
import { isDevMode } from '@/lib/mode';

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const base64 = token.split('.')[1];
    const json = Buffer.from(base64, 'base64url').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  let email: string;
  let code: string;
  let tenant: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    code = body.code;
    tenant = body.tenant;
  } catch {
    return Response.json({ detail: 'Invalid request body.' }, { status: 400 });
  }

  if (!email || !code) {
    return Response.json(
      { detail: 'Email and verification code are required.' },
      { status: 400 },
    );
  }

  if (code.length !== 6) {
    return Response.json(
      { detail: 'Invalid code. Please enter the 6-digit code.' },
      { status: 400 },
    );
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const cookieBase = {
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    ...(isProduction && appDomain ? { domain: `.${appDomain}` } : {}),
  };

  // Live upstream call: POST /api/v1/core/auth/verify-email/
  try {
    const backend = getBackendUrl(tenant);
    const upstream = await fetch(`${backend}/api/v1/core/auth/verify-email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (upstream.ok) {
      const store = await cookies();
      let userId = '';
      if (typeof data.access === 'string') {
        const claims = decodeJwtPayload(data.access);
        userId = typeof claims.user_id === 'string' ? claims.user_id : '';
        store.set('cu_access', data.access, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 });
      }
      if (typeof data.refresh === 'string') {
        store.set('cu_refresh', data.refresh, { ...cookieBase, httpOnly: true, maxAge: 60 * 60 * 24 });
      }
      store.set('cu_role', 'student', { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
      store.set('cu_email', email, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
      if (userId) {
        store.set('cu_user_id', userId, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
      }
      if (tenant) {
        store.set('cu_tenant', tenant, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
      }

      return Response.json({ verified: true, ...data });
    }

    if (!isDevMode()) {
      return Response.json(
        { detail: data.detail || 'Email verification failed.' },
        { status: upstream.status },
      );
    }
  } catch (error) {
    if (!isDevMode()) {
      return Response.json(
        { detail: 'Upstream authentication service unavailable.' },
        { status: 502 },
      );
    }
    console.warn('[Register Verify] Upstream unreachable, falling back to dev mode:', error);
  }

  // Development simulation flow:
  if (code === '000000') {
    return Response.json(
      { detail: 'Invalid or expired verification code.' },
      { status: 400 },
    );
  }

  const store = await cookies();
  store.set('cu_role', 'student', { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
  store.set('cu_email', email, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
  if (tenant) {
    store.set('cu_tenant', tenant, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
  }

  return Response.json({ verified: true, simulated: true });
}

