import { apiRequest } from './client';
import { clientFetch } from './client-fetch';
import type {
  WorkflowTemplate,
  CreateTemplatePayload,
  Requirement,
  CreateRequirementPayload,
  ApproveStepPayload,
} from './types';

export interface StartSessionPayload {
  student_profile_id: string;
  template_id: string;
}

export interface SubmitStepPayload {
  submitted_asset_id: string;
}

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

export async function startClearanceSession(
  payload: StartSessionPayload,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest('/api/v1/workflows/sessions/start/', {
    method: 'POST',
    body: payload,
    token,
    tenant,
  });
}

export async function submitClearanceStep(
  stepId: string,
  payload: SubmitStepPayload,
  token: string,
  tenant?: string,
): Promise<unknown> {
  return apiRequest(`/api/v1/workflows/steps/${stepId}/submit/`, {
    method: 'PATCH',
    body: payload,
    token,
    tenant,
  });
}

/**
 * Client-side clearance step submission with padded simulation fallback
 */
export async function clientSubmitClearanceStep(
  stepId: string,
  submittedAssetId: string,
): Promise<{ success: boolean; simulated?: boolean; data?: unknown }> {
  try {
    const data = await clientFetch(`/api/v1/workflows/steps/${stepId}/submit/`, {
      method: 'PATCH',
      body: { submitted_asset_id: submittedAssetId },
    });
    return { success: true, simulated: false, data };
  } catch (error) {
    console.warn(
      `[Workflows API Simulation Fallback] Submit step ${stepId} fallback activated:`,
      error,
    );
    return {
      success: true,
      simulated: true,
      data: { step_id: stepId, submitted_asset_id: submittedAssetId },
    };
  }
}

/**
 * Client-side session initiation with padded simulation fallback
 */
export async function clientStartClearanceSession(
  studentProfileId: string,
  templateId: string,
): Promise<{ success: boolean; simulated?: boolean; data?: unknown }> {
  try {
    const data = await clientFetch('/api/v1/workflows/sessions/start/', {
      method: 'POST',
      body: { student_profile_id: studentProfileId, template_id: templateId },
    });
    return { success: true, simulated: false, data };
  } catch (error) {
    console.warn(
      `[Workflows API Simulation Fallback] Start session for student ${studentProfileId} fallback:`,
      error,
    );
    return {
      success: true,
      simulated: true,
      data: { session_id: `session_${Date.now()}` },
    };
  }
}

