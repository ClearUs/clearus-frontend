// TODO: Wire to backend registration completion endpoint when available
// Placeholder: accepts valid input and returns success

export async function POST(request: Request) {
  let full_name: string;
  let password: string;
  let institution: string;

  try {
    const body = await request.json();
    full_name = body.full_name;
    password = body.password;
    institution = body.institution;
  } catch {
    return Response.json({ detail: 'Invalid request body.' }, { status: 400 });
  }

  if (!full_name || !password || !institution) {
    return Response.json(
      { detail: 'Full name, password, and institution are required.' },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return Response.json(
      { detail: 'Password must be at least 8 characters.' },
      { status: 400 },
    );
  }

  return Response.json({ registered: true, message: 'Account created successfully.' });
}
