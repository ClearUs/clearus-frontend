import { request2faCode } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

export async function POST(request: Request) {
  let email: string;
  let password: string | undefined;
  let tenant: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
    tenant = body.tenant || body.institution;
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

  const hostTenant = getTenantFromHost(request.headers.get('host'));
  const targetTenant = (tenant || hostTenant || 'futo').toLowerCase().trim();

  try {
    await request2faCode({ email, password }, targetTenant);
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return Response.json(
        { detail: err.message },
        { status: err.status },
      );
    }
    return Response.json(
      { detail: 'Unable to send verification code. Please try again.' },
      { status: 503 },
    );
  }
}
