import { resetPasswordConfirm } from '@/lib/api/auth';
import { ApiResponseError } from '@/lib/api/client';

export async function POST(request: Request) {
  const { email, code, new_password } = await request.json();

  if (!email || !code || !new_password) {
    return Response.json(
      { detail: 'Email, verification code, and new password are required.' },
      { status: 400 },
    );
  }

  try {
    await resetPasswordConfirm({ email, code, new_password });
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
