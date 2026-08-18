import { apiRequest } from './client';
import type {
  LoginStep1Response,
  LoginStep2Response,
  RefreshedTokens,
  PasswordResetConfirmPayload,
  Request2faCodePayload,
} from './types';

export async function loginStep1(email: string, password: string, tenant?: string): Promise<LoginStep1Response> {
  return apiRequest<LoginStep1Response>('/api/v1/auth/login/', {
    method: 'POST',
    body: { email, password },
    tenant,
  });
}

export async function loginVerify2fa(email: string, code: string, tenant?: string): Promise<LoginStep2Response> {
  return apiRequest<LoginStep2Response>('/api/v1/auth/login/verify-2fa/', {
    method: 'POST',
    body: { email, code },
    tenant,
  });
}

export async function refreshToken(refresh: string, tenant?: string): Promise<RefreshedTokens> {
  return apiRequest<RefreshedTokens>('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refresh },
    tenant,
  });
}

export async function verifyToken(token: string, tenant?: string): Promise<Record<string, unknown>> {
  return apiRequest<Record<string, unknown>>('/api/v1/auth/verify', {
    method: 'POST',
    body: { token },
    tenant,
  });
}

export async function request2faCode<T = unknown>(
  payload: Request2faCodePayload,
  tenant?: string,
): Promise<T> {
  return apiRequest<T>('/api/v1/auth/2fa/request-code', {
    method: 'POST',
    body: payload,
    tenant,
  });
}

export async function resetPasswordConfirm(
  payload: PasswordResetConfirmPayload,
  tenant?: string,
): Promise<unknown> {
  return apiRequest('/api/v1/core/auth/password-reset/confirm/', {
    method: 'POST',
    body: payload,
    tenant,
  });
}
