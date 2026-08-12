import { loginStep1 } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

export async function POST(request: Request) {
  let email: string;
  let password: string;

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

  if (!email || !password) {
    return Response.json(
      { detail: 'Email and password are required.' },
      { status: 400 },
    );
  }

  const tenant = getTenantFromHost(request.headers.get('host'));

  try {
    const data = await loginStep1(email, password, tenant);
    return Response.json(data);
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
