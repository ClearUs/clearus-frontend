import { getBackendUrl } from '@/lib/api/client';
import { isDevMode } from '@/lib/mode';

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

  return Response.json({ verified: true, simulated: true });
}

