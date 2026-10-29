// TODO: Wire to backend OTP verification endpoint when available
// Placeholder: accepts any 6-digit code as valid

export async function POST(request: Request) {
  let email: string;
  let code: string;

  try {
    const body = await request.json();
    email = body.email;
    code = body.code;
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

  // Placeholder: reject "000000" to test error state
  if (code === '000000') {
    return Response.json(
      { detail: 'Invalid or expired verification code.' },
      { status: 400 },
    );
  }

  return Response.json({ verified: true });
}
