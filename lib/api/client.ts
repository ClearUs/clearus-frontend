const FALLBACK_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://clearus-backend.onrender.com';
const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; // e.g. "clearus.tech"

export function getBackendUrl(tenant?: string): string {
  if (API_DOMAIN && tenant) {
    return `https://${tenant}-api.${API_DOMAIN}`;
  }
  return FALLBACK_URL;
}

export class ApiResponseError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(typeof body === 'object' && body && 'detail' in body
      ? String((body as { detail: string }).detail)
      : `Request failed with status ${status}`);
    this.name = 'ApiResponseError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string;
  tenant?: string;
};

export async function apiRequest<T>(
  path: string,
  { body, token, tenant, headers: extraHeaders, ...init }: RequestOptions = {},
): Promise<T> {
  const baseUrl = getBackendUrl(tenant);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders as Record<string, string>,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errorBody: unknown;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { detail: res.statusText };
    }
    throw new ApiResponseError(res.status, errorBody);
  }

  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}
