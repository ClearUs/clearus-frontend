'use client';

import React from 'react';
import { Trash2, Shield } from 'lucide-react';
import { IamStaffMember, CapabilityMeta } from '@/types';
import CapabilityChips from './CapabilityChips';

interface IamStaffTableProps {
  staffList: IamStaffMember[];
  institutionCode: string;
  capabilitiesMetadata: CapabilityMeta[];
  onToggleStatus: (id: string) => void;
  onDeleteStaff: (id: string) => void;
}

export default function IamStaffTable({
  staffList, institutionCode, capabilitiesMetadata, onToggleStatus, onDeleteStaff
}: IamStaffTableProps) {
  return (
    <div className="bg-surface-card border border-edge rounded-2xl overflow-hidden shadow-2xl w-full">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-collapse text-left min-w-200">
          <thead>
            <tr className="border-b border-edge bg-surface-card text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              <th className="px-6 py-4">Staff Profile</th>
              <th className="px-6 py-4">Assigned Department / Unit</th>
              <th className="px-6 py-4">Active Permissions</th>
              <th className="px-6 py-4 text-center">Status Badge</th>
              <th className="px-6 py-4 text-right pr-8">Action Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge-subtle text-xs text-secondary font-sans">
            {staffList.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-faint italic font-serif">
                  No authorized staff records found matching active filter metrics.
                </td>
              </tr>
            ) : (
              staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-chip transition-colors relative hover:z-30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-mono font-black text-amber-400 shadow-inner">
                        {staff.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-heading block leading-tight">{staff.name}</span>
                        <div className="flex flex-col gap-0.5 mt-0.5 font-mono text-[9px]">
                          <span className="text-amber-400 font-bold">{staff.staffId || `STAFF/${institutionCode.toUpperCase()}/000`}</span>
                          <span className="text-muted">{staff.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center bg-chip border border-edge-subtle px-2.5 py-1 rounded-xl text-[11px] font-semibold text-secondary">
                      {staff.assignedCell}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <CapabilityChips permissions={staff.permissions} capabilitiesMetadata={capabilitiesMetadata} />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(staff.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer hover:scale-105 shadow-sm ${
                        staff.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : staff.status === 'Pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                          : 'bg-neutral-800 text-muted border-edge'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-emerald-400' : staff.status === 'Pending' ? 'bg-amber-400' : 'bg-white/30'}`} />
                      <span>{staff.status === 'Pending' ? 'Pending Activation' : staff.status}</span>
                    </button>
                  </td>

                  <td className="px-6 py-4 text-right pr-8">
                    <button
                      type="button"
                      onClick={() => onDeleteStaff(staff.id)}
                      className="p-1.5 rounded-lg text-faint hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-surface-card border-t border-edge-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-faint font-mono font-bold uppercase tracking-wide">
        <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-400" /><span>Interactive Matrix (pg 2.3): Privileges map securely across active nodes.</span></div>
        <div className="font-sans font-medium tracking-normal text-muted normal-case">Account logs verified count: {staffList.length}</div>
      </div>
    </div>
  );
}