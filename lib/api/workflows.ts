import { apiRequest } from './client';
import type {
  WorkflowTemplate,
  CreateTemplatePayload,
  Requirement,
  CreateRequirementPayload,
  ApproveStepPayload,
} from './types';

export async function createWorkflowTemplate(
  payload: CreateTemplatePayload,
  token: string,
  tenant?: string,
): Promise<WorkflowTemplate> {
  return apiRequest<WorkflowTemplate>('/api/v1/workflows/templates/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function createRequirement(
  payload: CreateRequirementPayload,
  token: string,
  tenant?: string,
): Promise<Requirement> {
  return apiRequest<Requirement>('/api/v1/workflows/requirements/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function linkRequirementDependency(
  requirementId: string,
  prerequisiteId: string,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest(`/api/v1/workflows/requirements/${requirementId}/dependencies/`, {
    method: 'POST',
    body: { prerequisite_id: prerequisiteId },
    token,
    tenant,
  });
}

export async function approveStep(
  stepId: string,
  payload: ApproveStepPayload,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest(`/api/v1/workflows/steps/${stepId}/approve/`, {
    method: 'PATCH',
    body: payload,
    token,
    tenant,
  });
}
