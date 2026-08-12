import { loginStep1 } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';

export async function POST(request: Request) {
  let email: string;
  let password: string;
  let tenant: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
    tenant = body.tenant;
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
