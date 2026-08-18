import { getBackendUrl } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

const REQUEST_CODE_PATH = '/api/v1/auth/2fa/request-code';

export async function handleRequestCode(request: Request) {
  let email: string;
  let password: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } catch {
    return Response.json(
      { detail: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (!email) {
    return Response.json(
      { detail: 'Email is required.' },
      { status: 400 },
    );
  }

  const host = request.headers.get('host');
  const tenant = getTenantFromHost(host);
  const backendUrl = new URL(REQUEST_CODE_PATH, getBackendUrl(tenant));
  const debugHeaders = {
    'X-ClearUs-Backend-Host': backendUrl.host,
    'X-ClearUs-Backend-Path': backendUrl.pathname,
    'X-ClearUs-Tenant': tenant ?? '',
  };

  try {
    console.info('[auth/request-code] forwarding OTP request', {
      requestHost: host,
      tenant,
      backendHost: backendUrl.host,
      backendPath: backendUrl.pathname,
    });

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const contentType = res.headers.get('content-type') ?? '';
      const errorBody = contentType.includes('application/json')
        ? await res.json().catch(() => null)
        : await res.text().catch(() => '');
      const detail = typeof errorBody === 'object' && errorBody && 'detail' in errorBody
        ? String((errorBody as { detail: unknown }).detail)
        : res.statusText || 'Unable to send verification code. Please try again.';

      console.warn('[auth/request-code] backend rejected OTP request', {
        requestHost: host,
        tenant,
        backendHost: backendUrl.host,
        backendPath: backendUrl.pathname,
        backendStatus: res.status,
        contentType,
      });

      return Response.json(
        { detail },
        {
          status: res.status,
          headers: {
            ...debugHeaders,
            'X-ClearUs-Backend-Status': String(res.status),
          },
        },
      );
    }

    return Response.json(
      { success: true },
      { headers: debugHeaders },
    );
  } catch (err) {
    console.error('[auth/request-code] failed to reach backend', {
      requestHost: host,
      tenant,
      backendHost: backendUrl.host,
      backendPath: backendUrl.pathname,
      error: err instanceof Error ? err.message : String(err),
    });

    return Response.json(
      { detail: 'Unable to send verification code. Please try again.' },
      {
        status: 503,
        headers: debugHeaders,
      },
    );
  }
}
