import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://clearus-backend.onrender.com';

async function proxy(req: NextRequest) {
  const store = await cookies();
  const token = store.get('cu_access')?.value;

  let path = req.nextUrl.pathname.replace('/api/proxy', '');
  if (!path.endsWith('/')) path += '/';
  const url = `${BACKEND}${path}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await req.text()
    : undefined;

  const upstream = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const responseBody = await upstream.text();

  return new Response(responseBody, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json' },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
