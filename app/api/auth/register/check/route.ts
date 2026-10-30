import { getInstitutionByCode } from '@/data/institution';

export async function POST(request: Request) {
  let identifier: string;
  let method: string;
  let institution: string | undefined;

  try {
    const body = await request.json();
    identifier = body.identifier;
    method = body.method;
    institution = body.institution;
  } catch {
    return Response.json({ detail: 'Invalid request body.' }, { status: 400 });
  }

  if (!identifier || !method) {
    return Response.json(
      { detail: 'Identifier and method are required.' },
      { status: 400 },
    );
  }

  // Server-side email domain validation safeguard
  if (method === 'school-email' && identifier.includes('@')) {
    const domain = identifier.split('@')[1]?.toLowerCase().trim();
    if (institution) {
      const inst = getInstitutionByCode(institution);
      if (inst && inst.allowedDomains && inst.allowedDomains.length > 0) {
        const isAllowed = inst.allowedDomains.some((d) => {
          const norm = d.toLowerCase().trim().replace(/^@/, '');
          return domain === norm || domain.endsWith('.' + norm);
        });
        if (!isAllowed) {
          const allowedList = inst.allowedDomains.map((d) => `@${d.replace(/^@/, '')}`).join(', ');
          return Response.json(
            {
              code: 'not_school_email',
              detail: `Email domain @${domain} is not permitted for ${inst.name}. Accepted domains: ${allowedList}`,
            },
            { status: 400 },
          );
        }
      }
    }
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
