import { cookies } from 'next/headers';
import { loginVerify2fa } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

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

  try {
    const body = await request.json();
    email = body.email;
    code = body.code;
  } catch {
    return Response.json(
      { detail: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (!email || !code) {
    return Response.json(
      { detail: 'Email and verification code are required.' },
      { status: 400 },
    );
  }

  const tenant = getTenantFromHost(request.headers.get('host'));

  try {
    const data = await loginVerify2fa(email, code, tenant);
    const claims = decodeJwtPayload(data.access);
    const userId = typeof claims.user_id === 'string' ? claims.user_id : '';

    const store = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN; // e.g. "clearus.tech"

    const cookieBase = {
      secure: isProduction,
      sameSite: 'lax' as const,
      path: '/',
      ...(isProduction && appDomain ? { domain: `.${appDomain}` } : {}),
    };

    store.set('cu_access', data.access, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 });
    store.set('cu_refresh', data.refresh, { ...cookieBase, httpOnly: true, maxAge: 60 * 60 * 24 });
    store.set('cu_role', 'staff', { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    store.set('cu_email', email, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    store.set('cu_user_id', userId, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    if (tenant) {
      store.set('cu_tenant', tenant, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    }

    return Response.json({ user_id: userId });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return Response.json(
        { detail: err.message },
        { status: err.status },
      );
    }
    return Response.json(
      { detail: 'Verification service unavailable. Please try again.' },
      { status: 503 },
    );
  }
}
