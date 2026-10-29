// TODO: Wire to backend registration check endpoint when available
// Placeholder: validates input shape and returns success so the UI flow can be tested

export async function POST(request: Request) {
  let identifier: string;
  let method: string;

  try {
    const body = await request.json();
    identifier = body.identifier;
    method = body.method;
  } catch {
    return Response.json({ detail: 'Invalid request body.' }, { status: 400 });
  }

  if (!identifier || !method) {
    return Response.json(
      { detail: 'Identifier and method are required.' },
      { status: 400 },
    );
  }

  // Placeholder validation: simulate error states for testing via DevAuthNav
  // Prefix identifier with "err:" to trigger error states in dev
  if (identifier.startsWith('err:')) {
    const errCode = identifier.replace('err:', '');
    const errorMap: Record<string, { code: string; detail: string }> = {
      'matric_not_found': { code: 'matric_not_found', detail: 'Matric number not found in institution records.' },
      'already_registered': { code: 'already_registered', detail: 'This credential is already registered.' },
      'not_school_email': { code: 'not_school_email', detail: 'Not a valid school email address.' },
      'email_exists': { code: 'email_exists', detail: 'An account with this email already exists.' },
    };
    const err = errorMap[errCode];
    if (err) {
      return Response.json(err, { status: 400 });
    }
  }

  return Response.json({ valid: true });
}
