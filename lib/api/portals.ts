import { apiRequest } from './client';

export interface ClientPortal {
  id: string;
  name: string;
  subdomain?: string;
  domain?: string;
  logo_url?: string;
  is_active?: boolean;
}

/**
 * Lists client portals for multi-tenant navigation (/api/v1/customers/portals/)
 */
export async function listClientPortals(tenant?: string): Promise<ClientPortal[]> {
  return apiRequest<ClientPortal[]>('/api/v1/customers/portals/', {
    method: 'GET',
    tenant,
  });
}
