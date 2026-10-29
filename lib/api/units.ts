import { apiRequest } from './client';
import type { UnitNode, UnitDetail, CreateUnitPayload, UpdateUnitPayload } from './types';

export async function getUnitsTree(token: string, tenant?: string): Promise<UnitNode[]> {
  return apiRequest<UnitNode[]>('/api/v1/iam/units/tree/', {
    method: 'GET',
    token,
    tenant,
  });
}

export async function getUnitDetail(unitId: string, token: string, tenant?: string): Promise<UnitDetail> {
  return apiRequest<UnitDetail>(`/api/v1/iam/units/${unitId}/detail/`, {
    method: 'GET',
    token,
    tenant,
  });
}

export async function createUnit(payload: CreateUnitPayload, token: string, tenant?: string): Promise<UnitNode> {
  return apiRequest<UnitNode>('/api/v1/iam/units/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
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
    tenant,
  });
}

export interface RegisterStudentPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  matric_number: string;
  academic_unit_id: string;
  level: number;
}

export async function getRegistrationUnits(tenant?: string): Promise<UnitNode[]> {
  return apiRequest<UnitNode[]>('/api/v1/iam/students/registration/units/', {
    method: 'GET',
    tenant,
  });
}

export async function registerStudent(
  payload: RegisterStudentPayload,
  tenant?: string,
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>('/api/v1/iam/students/register/', {
    method: 'POST',
    body: payload,
    tenant,
  });
}

