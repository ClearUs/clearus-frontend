export interface LoginStep1Response {
  message: string;
  expires_in_seconds: number;
}

export interface LoginStep2Response {
  access: string;
  refresh: string;
}

export interface RefreshedTokens {
  access: string;
  refresh: string;
}

export interface UnitNode {
  id: string;
  name: string;
  code_name: string;
  unit_type: string;
  identity_assets: Record<string, unknown>;
  permissions: string[];
  is_active: boolean;
  depth: number;
  parent_id: string | null;
  children: UnitNode[];
}

export interface UnitDetail {
  unit: {
    id: string;
    identity_assets: Record<string, unknown>;
    permissions: string[];
    name: string;
    code_name: string;
    unit_type: string;
    is_active: boolean;
  };
  total_staff: number;
  students_capacity: number;
  bound_clearance_processes: unknown[];
}

export interface CreateUnitPayload {
  name: string;
  code_name: string;
  unit_type: string;
  parent_id: string | null;
  permissions: string[];
  identity_assets: Record<string, unknown>;
}

export interface UpdateUnitPayload {
  name?: string;
  code_name?: string;
  unit_type?: string;
  is_active?: boolean;
  permissions?: string[];
  identity_assets?: Record<string, unknown>;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  owning_unit: string;
  is_active: boolean;
}

export interface CreateTemplatePayload {
  name: string;
  owning_unit: string;
  is_active: boolean;
}

export interface Requirement {
  id: string;
  template: string;
  name: string;
  requirement_type: string;
}

export interface CreateRequirementPayload {
  template: string;
  name: string;
  requirement_type: string;
}

export interface ApproveStepPayload {
  approved: boolean;
  comments: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface PasswordResetConfirmPayload {
  email: string;
  code: string;
  new_password: string;
}

export interface Request2faCodePayload {
  email: string;
  password?: string;
}

export interface UpdatePhotoPayload {
  image_url: string;
}

export interface ApiError {
  detail: string;
  [key: string]: unknown;
}
