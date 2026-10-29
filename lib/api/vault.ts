'use client';

import { clientFetch } from './client-fetch';
import { isDevMode } from '@/lib/mode';

export interface UploadAssetResponse {
  id: string;
  name?: string;
  size?: number;
  content_type?: string;
  simulated?: boolean;
}

/**
 * Uploads a file asset to the ClearUs Vault.
 * Uses the live backend API (/api/v1/vault/upload/) via proxy.
 * In development, provides padded simulation fallback if unseeded.
 * In production, strictly throws errors on upstream failure.
 */
export async function uploadVaultAsset(file: File): Promise<UploadAssetResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await clientFetch<UploadAssetResponse>('/api/v1/vault/upload/', {
      method: 'POST',
      body: formData,
    });

    if (res && res.id) {
      return res;
    }

    if (!isDevMode()) {
      throw new Error('Upload succeeded upstream but did not return a valid asset ID.');
    }

    return {
      id: `sim_vault_${Date.now()}`,
      name: file.name,
      size: file.size,
      simulated: true,
    };
  } catch (error) {
    if (!isDevMode()) {
      throw error;
    }
    console.warn('[Vault API Simulation Fallback] Upload failed, using simulated asset in dev:', error);
    return {
      id: `sim_vault_${Date.now()}`,
      name: file.name,
      size: file.size,
      simulated: true,
    };
  }
}

/**
 * Downloads an asset from the ClearUs Vault.
 * Queries the live backend API (/api/v1/vault/{asset_id}/download/).
 * In production, strictly throws on download failure.
 */
export async function downloadVaultAsset(
  assetId: string,
  fileName: string = 'document.pdf',
): Promise<Blob> {
  try {
    const res = await fetch(`/api/proxy/api/v1/vault/${assetId}/download/`);
    if (res.ok) {
      const blob = await res.blob();
      triggerBrowserDownload(blob, fileName);
      return blob;
    }
    if (!isDevMode()) {
      throw new Error(`Download failed with status ${res.status}`);
    }
  } catch (error) {
    if (!isDevMode()) {
      throw error;
    }
    console.warn('[Vault API Simulation Fallback] Download failed, creating simulated blob in dev:', error);
  }

  // Fallback simulated document blob for dev mode only
  const mockContent = `ClearUs Digital Infrastructure Limited\nDocument ID: ${assetId}\nFile: ${fileName}\nVerified: ${new Date().toISOString()}`;
  const blob = new Blob([mockContent], { type: 'application/pdf' });
  triggerBrowserDownload(blob, fileName);
  return blob;
}

/**
 * Utility to trigger immediate browser file download from Blob
 */
function triggerBrowserDownload(blob: Blob, fileName: string) {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = fileName;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
