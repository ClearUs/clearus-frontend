import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get('cu_access')?.value ?? null;
}

export async function getRefreshTokenValue(): Promise<string | null> {
  const store = await cookies();
  return store.get('cu_refresh')?.value ?? null;
}
