'use client';

import React from 'react';
import { CheckSquare, FileCheck, Building, GitBranch, Shield, FileText } from 'lucide-react';
import { Institution, User } from '@/types';

interface SidebarProps {
  institution: Institution;
  user: User;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function StaffSidebar({
  institution,
  sidebarOpen,
  activeSection,
  setActiveSection
}: SidebarProps) {

  const sections = [
    { id: 'clearance_queue', label: 'Clearance Queue', icon: CheckSquare },
    { id: 'verification_desk', label: 'Clearance Verification Desk', icon: FileCheck },
    { id: 'org_units', label: 'Organizational Units', icon: Building, hasChevron: true },
    { id: 'workflow_studio', label: 'Workflow Studio', icon: GitBranch, hasChevron: true },
    { id: 'iam_matrix', label: 'IAM Control Matrix', icon: Shield, hasChevron: true },
    { id: 'audit_ledger', label: 'Audit Log Ledger', icon: FileText, hasChevron: true },
  ];

  return (
    <aside
      className={`bg-surface-sidebar flex flex-col h-screen shrink-0 z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        sidebarOpen
          ? 'w-72 opacity-100 border-r border-edge visible'
          : 'w-0 opacity-0 border-r-0 pointer-events-none invisible'
      }`}
    >
      <div className="w-72 p-4 space-y-6 overflow-x-hidden">

        <div className="space-y-1">
          <div className="px-2.5 pb-2 border-b border-edge-subtle">
            <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold font-mono block">
              ACTIVE WORKSPACE
            </span>
            <h4 className="text-xs font-serif italic text-heading mt-0.5">Staff Portal</h4>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-faint uppercase tracking-widest block px-2.5 mb-2 font-mono">
            SECTIONS
          </span>

          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-400/10 text-emerald-400 border border-edge-subtle shadow-md'
                    : 'text-muted hover:bg-chip hover:text-heading border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{sec.label}</span>
                </span>
                {sec.hasChevron && <span className="text-subtle text-[9px] font-mono">▶</span>}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
