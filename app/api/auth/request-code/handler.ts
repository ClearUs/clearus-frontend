import { request2faCode } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

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

  const tenant = getTenantFromHost(request.headers.get('host'));

  try {
    await request2faCode({ email, password }, tenant);
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
