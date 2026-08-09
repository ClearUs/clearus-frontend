import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/api/auth';

export async function GET() {
  const store = await cookies();
  const access = store.get('cu_access')?.value;
  const username = store.get('cu_username')?.value;

  if (!access) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  try {
    await verifyToken(access);
    return Response.json({ authenticated: true, username });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
