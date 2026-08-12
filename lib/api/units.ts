import { apiRequest } from './client';
import type { UnitNode, UnitDetail, CreateUnitPayload, UpdateUnitPayload } from './types';

export async function getUnitsTree(token: string, tenant?: string): Promise<UnitNode[]> {
  return apiRequest<UnitNode[]>('/api/v1/iam/units/tree/', {
    method: 'GET',
    token,
    // tenant,
  });
}

export async function getUnitDetail(unitId: string, token: string, tenant?: string): Promise<UnitDetail> {
  return apiRequest<UnitDetail>(`/api/v1/iam/units/${unitId}/detail/`, {
    method: 'GET',
    token,
    // tenant,
  });
}

export async function createUnit(payload: CreateUnitPayload, token: string, tenant?: string): Promise<UnitNode> {
  return apiRequest<UnitNode>('/api/v1/iam/units/', {
    method: 'POST',
    body: payload,
    token,
    // tenant,
  });
}

export async function updateUnit(
  unitId: string,
  payload: UpdateUnitPayload,
  token: string,
  tenant?: string,
): Promise<UnitNode> {
  return apiRequest<UnitNode>(`/api/v1/iam/units/${unitId}/`, {
    method: 'PATCH',
    body: payload,
    token,
    // tenant,
  });
}
