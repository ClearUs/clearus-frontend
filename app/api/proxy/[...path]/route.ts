import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { getBackendUrl } from '@/lib/api/client';

async function proxy(req: NextRequest) {
  const store = await cookies();
  const token = store.get('cu_access')?.value;
  const tenant = store.get('cu_tenant')?.value;
  const backend = getBackendUrl(tenant);

  let path = req.nextUrl.pathname.replace('/api/proxy', '');
  if (!path.endsWith('/') && !path.includes('.')) path += '/';
  const url = `${backend}${path}${req.nextUrl.search}`;

  const incomingContentType = req.headers.get('content-type');
  const headers: Record<string, string> = {};
  if (incomingContentType) {
    headers['Content-Type'] = incomingContentType;
  }
  const incomingAccept = req.headers.get('accept');
  if (incomingAccept) {
    headers['Accept'] = incomingAccept;
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await req.arrayBuffer()
    : undefined;

  try {
    const upstream = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const responseBody = await upstream.arrayBuffer();

    return new Response(responseBody, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json' },
    });
  } catch (error) {
    console.error(`[API Proxy Error] Failed to reach upstream at ${url}:`, error);
    return Response.json(
      {
        detail: 'Upstream service unavailable or unreachable',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
