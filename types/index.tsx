export interface Institution {
  code: string;
  name: string;
  shortName: string;
  motto: string;
  primaryColor: string;
  accentColor: string;
  colorTheme: {
    primaryBg: string;
    primaryText: string;
    primaryBorder: string;
    accentBg: string;
    accentText: string;
    bannerGradient: string;
    lightAccentBg: string;
  };
  allowedDomains: string[];
  departments: string[];
  stats: {
    totalStudents: number;
    pendingClearances: number;
    clearedThisMonth: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff';
  schoolCode: string;
  matricNo?: string;
  staffId?: string;
  department: string;
}

export interface VerificationSubmission {
  requestId: string;
  studentName: string;
  studentMatric: string;
  requirement: string;
  department: string;
  program: string;
  email: string;
  phone: string;
  amountPaid: string;
  transactionDate: string;
  gateway: string;
  blockHeight: number;
  nodeAddress: string;
  integrityChecksum: string;
  documentName: string;
  securitySeal: string;
  formFields: { label: string; value: string }[];
  verifications: string[];
  fileMetadata: {
    size: string;
    type: string;
  },
  mockDocData: {
    title: string;
    authority: string;
    date: string;
    fields: { [key: string]: string };
  };
}

export interface OrgNode {
  id: string;
  name: string;
  type: 'faculty' | 'division' | 'department' | 'desk';
  staffCount: number;
  studentCount?: number;
  allowedDomains: string[];
  boundWorkflows: string[];
  parentId: string | null;
}

export interface WorkflowStep {
  id: string;
  sequence: number;
  title: string;
  unitName: string;
  requirementType: 'DOCUMENT_UPLOAD' | 'FORM_UPLOAD' | 'FEE_PAYMENT' | 'OFFICER_SIGN_OFF';
  details: string;
  assignedOfficer: string;
  feeAmount?: number;
  requiredFileName?: string;
  x: number;
  y: number;
  isInherited?: boolean;
}

export interface RequirementMetaItem {
  label: string;
  badge: string;
  icon: React.ReactNode;
  colorClass: string;
}

export interface IamStaffMember {
  id: string;
  staffId: string;
  name: string;
  email: string;
  assignedCell: string;
  permissions: string[];
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface CapabilityMeta {
  key: string;
  label: string;
  module: 'WORKFLOW' | 'VAULT_CLEARANCE' | 'UNIT_CELL_ADMIN';
  description: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO UTC format
  actorName: string;
  actorEmail: string;
  actorRole: string;
  actionType: 'CLEARANCE_APPROVED' | 'CLEARANCE_REJECTED' | 'WORKFLOW_CREATED' | 'UNIT_CREATED' | 'UNIT_MODIFIED' | 'ROLE_UPDATED' | 'MEMBER_INVITED' | 'SECURITY_SEAL_VERIFIED';
  targetResource: string;
  targetId: string;
  ipAddress: string;
  userAgent: string;
  integrityHash: string;
  metadata: Record<string, unknown>;
}