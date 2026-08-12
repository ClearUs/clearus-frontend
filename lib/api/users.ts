import { apiRequest, getBackendUrl } from './client';
import type { UpdatePasswordPayload, UpdatePhotoPayload } from './types';

export async function updatePassword(
  payload: UpdatePasswordPayload,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest('/api/v1/core/users/me/password/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function updatePhoto(
  payload: UpdatePhotoPayload,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest('/api/v1/core/users/me/photo/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function downloadAsset(assetId: string, token: string, tenant?: string): Promise<Blob> {
  const baseUrl = getBackendUrl(tenant);
  const res = await fetch(`${baseUrl}/api/v1/vault/${assetId}/download/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Asset download failed: ${res.status}`);
  return res.blob();
}
