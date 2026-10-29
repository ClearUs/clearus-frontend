import { apiRequest, getBackendUrl } from './client';
import { clientFetch } from './client-fetch';
import { isDevMode } from '@/lib/mode';
import type { UpdatePasswordPayload, UpdatePhotoPayload } from './types';

export interface StudentProfile {
  id: string;
  matric_number: string;
  level: number;
  academic_unit?: {
    id: string;
    name: string;
    code_name?: string;
    unit_type?: string;
  };
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    photo_url?: string;
  };
}

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

/**
 * Client-side password update with padded simulation fallback
 */
export async function clientUpdatePassword(
  oldPassword: string,
  newPassword: string,
): Promise<{ success: boolean; simulated?: boolean; message?: string }> {
  try {
    await clientFetch('/api/v1/core/users/me/password/', {
      method: 'POST',
      body: { old_password: oldPassword, new_password: newPassword },
    });
    return { success: true, simulated: false };
  } catch (error) {
    if (!isDevMode()) {
      throw error;
    }
    console.warn('[Users API Simulation Fallback] Password update fallback in dev:', error);
    return { success: true, simulated: true, message: 'Password updated (simulated)' };
  }
}

/**
 * Client-side photo update with padded simulation fallback
 */
export async function clientUpdatePhoto(
  imageUrl: string,
): Promise<{ success: boolean; simulated?: boolean }> {
  try {
    await clientFetch('/api/v1/core/users/me/photo/', {
      method: 'POST',
      body: { image_url: imageUrl },
    });
    return { success: true, simulated: false };
  } catch (error) {
    if (!isDevMode()) {
      throw error;
    }
    console.warn('[Users API Simulation Fallback] Photo update fallback in dev:', error);
    return { success: true, simulated: true };
  }
}

/**
 * Client-side fetch of current student profile (/api/v1/iam/students/me/)
 */
export async function getStudentMe(): Promise<StudentProfile | null> {
  try {
    const profile = await clientFetch<StudentProfile>('/api/v1/iam/students/me/', {
      method: 'GET',
    });
    return profile;
  } catch (error) {
    console.warn('[Users API Simulation Fallback] getStudentMe fallback:', error);
    return null;
  }
}

