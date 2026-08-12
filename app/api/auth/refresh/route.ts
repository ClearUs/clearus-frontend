import { cookies } from 'next/headers';
import { refreshToken } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';

export async function POST() {
  const store = await cookies();
  const refresh = store.get('cu_refresh')?.value;
  const tenant = store.get('cu_tenant')?.value;

  if (!refresh) {
    return Response.json({ detail: 'No refresh token.' }, { status: 401 });
  }

  try {
    const data = await refreshToken(refresh, tenant);

    store.set('cu_access', data.access, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    return Response.json({ refreshed: true });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      store.delete('cu_access');
      store.delete('cu_refresh');
      store.delete('cu_role');
      store.delete('cu_email');
      store.delete('cu_user_id');
      store.delete('cu_tenant');
      return Response.json({ detail: 'Session expired.' }, { status: 401 });
    }
    return Response.json({ detail: 'Refresh failed.' }, { status: 503 });
  }
}
