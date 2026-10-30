import { apiRequest } from './client';

export interface ClientPortal {
  id: string;
  name: string;
  code?: string;
  slug?: string;
  subdomain?: string;
  domain?: string;
  allowed_domains?: string[];
  allowed_email_domains?: string[];
  allowedDomains?: string[];
  email_domains?: string[];
  domains?: string[];
  logo_url?: string;
  is_active?: boolean;
  [key: string]: unknown;
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
