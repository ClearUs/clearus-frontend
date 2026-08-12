import { resetPasswordConfirm } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';
import { getTenantFromHost } from '@/lib/tenant';

export async function POST(request: Request) {
  let email: string;
  let code: string;
  let new_password: string;

  try {
    const body = await request.json();
    email = body.email;
    code = body.code;
    new_password = body.new_password;
  } catch {
    return Response.json(
      { detail: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (!email || !code || !new_password) {
    return Response.json(
      { detail: 'Email, verification code, and new password are required.' },
      { status: 400 },
    );
  }

  const tenant = getTenantFromHost(request.headers.get('host'));

  try {
    await resetPasswordConfirm({ email, code, new_password }, tenant);
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return Response.json(
        { detail: err.message },
        { status: err.status },
      );
    }
    return Response.json(
      { detail: 'Password reset service unavailable. Please try again.' },
      { status: 503 },
    );
  }
}
