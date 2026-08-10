'use client';

import React, { useState } from 'react';
import { Institution, User } from '@/types';
import TitleBlock from '@/components/dashboard/staff/shared/TitleBlock';
import Sidebar from '@/components/dashboard/staff/shared/Sidebar';
import RequestQueueTable from '@/components/dashboard/staff/RequestQueueTable';
import ApprovalWorkspace from '@/components/dashboard/staff/ApprovalWorkspace';
import OrganizationalUnitsStudio from '@/components/dashboard/staff/org-studio/OrganizationalUnitsStudio';
import WorkflowStudioCanvas from '@/components/dashboard/staff/workflow-studio/WorkflowStudioCanvas';
import IamControlMatrix from '@/components/dashboard/staff/iam-matrix/IamControlMatrix';
import { StaffAuditLedger } from '@/components/dashboard/staff/audit-ledger/StaffAuditLedger';

interface StaffWorkspaceProps {
  institution: Institution;
  user: User;
}

export default function StaffWorkspaceCoordinator({ institution, user }: StaffWorkspaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('clearance_queue');
  const [queueTab, setQueueTab] = useState<'all' | 'pending' | 'urgent' | 'actioned'>('urgent');

  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      <TitleBlock
        institution={institution}
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex w-full relative mt-40 h-full overflow-hidden">
        <Sidebar
          institution={institution}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full h-full space-y-6 transition-all duration-300 custom-scrollbar">
          {activeSection === 'clearance_queue' && (
            <RequestQueueTable
              institution={institution}
              user={user}
              queueTab={queueTab}
              setQueueTab={setQueueTab}
            />
          )}

          {/* TAB 2: ACTIVE CLEARANCE VERIFICATION DESK WORKSPACE */}
          {activeSection === 'verification_desk' && (
            <ApprovalWorkspace
              institution={institution}
              onOfficerAction={(id, action, feedback) => {
                console.log(`Action recorded for request ${id}: ${action}. Feedback: ${feedback}`);
              }}
            />
          )}

          {activeSection === 'org_units' && (
            <OrganizationalUnitsStudio institution={institution} />
          )
          }
          {activeSection === 'workflow_studio' && (
            <WorkflowStudioCanvas institution={institution} />
          )
          }

          {activeSection === 'iam_matrix' && (
            <IamControlMatrix institution={institution} />
          )}

          {activeSection === 'audit_ledger' && (
            <StaffAuditLedger />
          )}

          {activeSection !== 'clearance_queue' && activeSection !== 'verification_desk' && activeSection !== 'org_units' && activeSection !== 'workflow_studio' && activeSection !== 'iam_matrix' && activeSection !== 'audit_ledger' && (
            <div className="h-96 border border-edge-subtle bg-surface-card rounded-2xl flex items-center justify-center text-xs text-faint font-mono uppercase tracking-widest">
              Section: {activeSection.replace('_', ' ')} Canvas Under Construction
            </div>
          )}
        </div>
      </div>
    </div>
  );
}