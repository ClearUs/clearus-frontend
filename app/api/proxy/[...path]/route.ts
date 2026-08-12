import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { getBackendUrl } from '@/lib/api/client';

async function proxy(req: NextRequest) {
  const store = await cookies();
  const token = store.get('cu_access')?.value;
  const tenant = store.get('cu_tenant')?.value;
  const backend = getBackendUrl(tenant);

  let path = req.nextUrl.pathname.replace('/api/proxy', '');
  if (!path.endsWith('/')) path += '/';
  const url = `${backend}${path}${req.nextUrl.search}`;

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
