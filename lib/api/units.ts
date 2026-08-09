import { apiRequest } from './client';
import type { UnitNode, UnitDetail, CreateUnitPayload, UpdateUnitPayload } from './types';

export async function getUnitsTree(token: string): Promise<UnitNode[]> {
  return apiRequest<UnitNode[]>('/api/v1/iam/units/tree/', {
    method: 'GET',
    token,
  });
}

export async function getUnitDetail(unitId: string, token: string): Promise<UnitDetail> {
  return apiRequest<UnitDetail>(`/api/v1/iam/units/${unitId}/detail/`, {
    method: 'GET',
    token,
  });
}

export async function createUnit(payload: CreateUnitPayload, token: string): Promise<UnitNode> {
  return apiRequest<UnitNode>('/api/v1/iam/units/', {
    method: 'POST',
    body: payload,
    token,
  });
}

export async function updateUnit(
  unitId: string,
  payload: UpdateUnitPayload,
  token: string,
): Promise<UnitNode> {
  return apiRequest<UnitNode>(`/api/v1/iam/units/${unitId}/`, {
    method: 'PATCH',
    body: payload,
    token,
  });
}
