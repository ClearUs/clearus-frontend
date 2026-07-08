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
    { id: 'clearance_queue', label: 'Clearance Queue', icon: CheckSquare, badge: '28' },
    { id: 'verification_desk', label: 'Clearance Verification Desk', icon: FileCheck },
    { id: 'org_units', label: 'Organizational Units', icon: Building, hasChevron: true },
    { id: 'workflow_studio', label: 'Workflow Studio', icon: GitBranch, hasChevron: true },
    { id: 'iam_matrix', label: 'IAM Control Matrix', icon: Shield, hasChevron: true },
    { id: 'audit_ledger', label: 'Audit Log Ledger', icon: FileText, hasChevron: true },
  ];

  return (
    <aside 
      className={`bg-[#090909] flex flex-col h-screen shrink-0 z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        sidebarOpen 
          ? 'w-72 opacity-100 border-r border-white/10 visible' 
          : 'w-0 opacity-0 border-r-0 pointer-events-none invisible'
      }`}
    >
      {/* Overflow wrapper ensures contents don't warp layout grids when sidebar collapses */}
      <div className="w-72 p-4 space-y-6 overflow-x-hidden">
        
        {/* Workspace Tracker Label */}
        <div className="space-y-1">
          <div className="px-2.5 pb-2 border-b border-white/5">
            <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold font-mono block">
              ACTIVE WORKSPACE
            </span>
            <h4 className="text-xs font-serif italic text-white/90 mt-0.5">Staff Portal</h4>
          </div>
        </div>

        {/* Section Action Matrix */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block px-2.5 mb-2 font-mono">
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
                    ? 'bg-emerald-400/10 text-emerald-400 border border-white/5 shadow-md' 
                    : 'text-white/40 hover:bg-white/2 hover:text-white/80 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 ]" />
                  <span className="truncate">{sec.label}</span>
                </span>
                {sec.badge && (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                    {sec.badge}
                  </span>
                )}
                {sec.hasChevron && <span className="text-white/20 text-[9px] font-mono">▶</span>}
              </button>
            );
          })}
        </div>

        {/* Lower Settings Info Card */}
        <div className="bg-[#0e0e0e] rounded-2xl border border-white/5 p-5 space-y-4 shadow-xl">
          <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono">University Settings</h3>
          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-wide block">Authorized Domains</span>
              <div className="flex flex-col gap-1 mt-1.5">
                {institution.allowedDomains.map(dom => (
                  <span key={dom} className="bg-white/5 px-2.5 py-1 rounded border border-white/5 text-[10px] text-white/80 w-fit">
                    @{dom}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-wide block">Students</span>
                <div className="font-bold text-xs text-white mt-0.5 font-sans">
                  {institution.stats.totalStudents.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-wide block">Cleared</span>
                <div className="font-bold text-xs text-green-400 mt-0.5 font-sans">
                  +{institution.stats.clearedThisMonth.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}