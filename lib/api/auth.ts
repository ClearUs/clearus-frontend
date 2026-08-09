import { apiRequest } from './client';
import type { TokenPair, RefreshedTokens } from './types';

export async function obtainToken(username: string, password: string): Promise<TokenPair> {
  return apiRequest<TokenPair>('/api/v1/auth/pair', {
    method: 'POST',
    body: { username, password },
  });
}

export async function refreshToken(refresh: string): Promise<RefreshedTokens> {
  return apiRequest<RefreshedTokens>('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refresh },
  });
}

export async function verifyToken(token: string): Promise<Record<string, unknown>> {
  return apiRequest<Record<string, unknown>>('/api/v1/auth/verify', {
    method: 'POST',
    body: { token },
  });
}
