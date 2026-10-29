'use client';

export class ClientApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(
      typeof body === 'object' && body && 'detail' in body
        ? String((body as { detail: string }).detail)
        : `Request failed with status ${status}`,
    );
    this.name = 'ClientApiError';
  }
}

async function tryRefresh(): Promise<boolean> {
  const res = await fetch('/api/auth/refresh', { method: 'POST' });
  return res.ok;
}

type FetchOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export async function clientFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const buildRequest = () => {
    const headers: Record<string, string> = {
      ...(!isFormData && options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers as Record<string, string>),
    };

    return fetch(`/api/proxy${path}`, {
      ...options,
      headers,
      body: isFormData
        ? (options.body as FormData)
        : options.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
    });
  };

  let res = await buildRequest();

  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      res = await buildRequest();
    }
  }

  if (!res.ok) {
    let errorBody: unknown;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { detail: res.statusText };
    }
    throw new ClientApiError(res.status, errorBody);
  }

  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}
