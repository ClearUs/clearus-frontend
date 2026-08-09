import { apiRequest } from './client';
import type { UpdatePasswordPayload, UpdatePhotoPayload } from './types';

export async function updatePassword(
  payload: UpdatePasswordPayload,
  token: string,
): Promise<unknown> {
  return apiRequest('/api/v1/core/users/me/password/', {
    method: 'POST',
    body: payload,
    token,
  });
}

export async function updatePhoto(
  payload: UpdatePhotoPayload,
  token: string,
): Promise<unknown> {
  return apiRequest('/api/v1/core/users/me/photo/', {
    method: 'POST',
    body: payload,
    token,
  });
}

export async function downloadAsset(assetId: string, token: string): Promise<Blob> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://clearus-backend.onrender.com';
  const res = await fetch(`${BASE_URL}/api/v1/vault/${assetId}/download/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Asset download failed: ${res.status}`);
  return res.blob();
}
