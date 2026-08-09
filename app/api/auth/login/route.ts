import { cookies } from 'next/headers';
import { obtainToken } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';

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
  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json(
      { detail: 'Username and password are required.' },
      { status: 400 },
    );
  }

  try {
    const data = await obtainToken(username, password);
    const claims = decodeJwtPayload(data.access);
    const userId = typeof claims.user_id === 'string' ? claims.user_id : '';

    const store = await cookies();
    const cookieBase = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    store.set('cu_access', data.access, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 });
    store.set('cu_refresh', data.refresh, { ...cookieBase, httpOnly: true, maxAge: 60 * 60 * 24 });
    store.set('cu_role', 'staff', { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    store.set('cu_username', data.username, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });
    store.set('cu_user_id', userId, { ...cookieBase, httpOnly: false, maxAge: 60 * 60 * 24 });

    return Response.json({ username: data.username, user_id: userId });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return Response.json(
        { detail: err.message },
        { status: err.status },
      );
    }
    return Response.json(
      { detail: 'Authentication service unavailable. Please try again.' },
      { status: 503 },
    );
  }
}
