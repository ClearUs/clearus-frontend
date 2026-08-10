import { apiRequest } from './client';
import type {
  LoginStep1Response,
  LoginStep2Response,
  RefreshedTokens,
  PasswordResetConfirmPayload,
} from './types';

export async function loginStep1(email: string, password: string): Promise<LoginStep1Response> {
  return apiRequest<LoginStep1Response>('/api/v1/auth/login/', {
    method: 'POST',
    body: { email, password },
  });
}

export async function loginVerify2fa(email: string, code: string): Promise<LoginStep2Response> {
  return apiRequest<LoginStep2Response>('/api/v1/auth/login/verify-2fa/', {
    method: 'POST',
    body: { email, code },
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

export async function resetPasswordConfirm(
  payload: PasswordResetConfirmPayload,
): Promise<unknown> {
  return apiRequest('/api/v1/core/auth/password-reset/confirm/', {
    method: 'POST',
    body: payload,
  });
}
