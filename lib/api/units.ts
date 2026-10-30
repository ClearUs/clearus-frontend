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

export interface StudentLevelOption {
  value: number;
  label: string;
}

export interface StudentRegistrationUnitsResponse {
  academic_units: UnitNode[];
  non_academic_units: UnitNode[];
  levels: StudentLevelOption[];
}

export async function getRegistrationUnits(
  tenant?: string,
): Promise<StudentRegistrationUnitsResponse> {
  return apiRequest<StudentRegistrationUnitsResponse>(
    '/api/v1/iam/students/registration/units/',
    {
      method: 'GET',
      tenant,
    },
  );
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

export async function getUnitPermissions(
  unitId: string,
  token: string,
  tenant?: string,
): Promise<string[]> {
  return apiRequest<string[]>(`/api/v1/iam/units/${unitId}/permissions/`, {
    method: 'GET',
    token,
    tenant,
  });
}

export interface StaffMember {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_name?: string;
  is_active?: boolean;
}

export interface InviteStaffPayload {
  first_name: string;
  last_name: string;
  email: string;
  unit_id: string;
  role_name: string;
  permissions?: string[];
  select_inheritable_permissions?: boolean;
}

export interface AcceptStaffInvitationPayload {
  uid: string;
  token: string;
  new_password: string;
}

export async function listStaffMembers(token: string, tenant?: string): Promise<StaffMember[]> {
  return apiRequest<StaffMember[]>('/api/v1/iam/staff/', {
    method: 'GET',
    token,
    tenant,
  });
}

export async function inviteStaffMember(
  payload: InviteStaffPayload,
  token: string,
  tenant?: string,
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>('/api/v1/iam/staff/invite/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function acceptStaffInvitation(
  payload: AcceptStaffInvitationPayload,
  tenant?: string,
): Promise<unknown> {
  return apiRequest('/api/v1/iam/staff/accept-invitation/', {
    method: 'POST',
    body: payload,
    tenant,
  });
}

export async function toggleStaffRoleStatus(
  staffRoleId: string,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest(`/api/v1/iam/staff/roles/${staffRoleId}/toggle-status/`, {
    method: 'PATCH',
    token,
    tenant,
  });
}


