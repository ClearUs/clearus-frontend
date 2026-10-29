import { getBackendUrl } from '@/lib/api/client';
import { isDevMode } from '@/lib/mode';

interface RegisterCompleteBody {
  email?: string;
  matric?: string;
  full_name?: string;
  department?: string;
  academic_unit_id?: string;
  level?: string | number;
  password?: string;
  institution?: string;
}

export async function POST(request: Request) {
  let body: RegisterCompleteBody;

  try {
    body = (await request.json()) as RegisterCompleteBody;
  } catch {
    return Response.json({ detail: 'Invalid request body.' }, { status: 400 });
  }

  const {
    email,
    matric,
    full_name,
    department,
    academic_unit_id,
    level,
    password,
    institution,
  } = body;

  if (!password || (!email && !matric)) {
    return Response.json(
      { detail: 'Email or matric number and password are required.' },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return Response.json(
      { detail: 'Password must be at least 8 characters.' },
      { status: 400 },
    );
  }

  const nameParts = (full_name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Student';
  const lastName = nameParts.slice(1).join(' ') || 'User';

  const payload = {
    email: email || `${matric}@student.${institution || 'clearus'}.edu.ng`,
    password,
    first_name: firstName,
    last_name: lastName,
    matric_number: matric || 'MAT999',
    academic_unit_id: academic_unit_id || department || '00000000-0000-0000-0000-000000000000',
    level: parseInt(String(level).replace(/\D/g, ''), 10) || 100,
  };

  try {
    const backend = getBackendUrl(institution);
    const upstream = await fetch(`${backend}/api/v1/iam/students/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json().catch(() => ({}));
    if (upstream.ok) {
      return Response.json({ registered: true, id: data.id, ...data });
    }

    if (!isDevMode()) {
      return Response.json(
        { detail: data.detail || 'Registration failed.' },
        { status: upstream.status },
      );
    }
  } catch (error) {
    if (!isDevMode()) {
      return Response.json(
        { detail: 'Upstream registration service unavailable.' },
        { status: 502 },
      );
    }
    console.warn('[Register Complete] Upstream unreachable, falling back to dev mode:', error);
  }

  return Response.json({
    registered: true,
    id: `student_${Date.now()}`,
    simulated: true,
    message: 'Account created successfully (simulated).',
  });
}

