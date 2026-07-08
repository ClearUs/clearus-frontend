'use client';

import React from 'react';
import { Calendar, Globe, Laptop } from 'lucide-react';
import { AuditLogEntry } from '@/types';

interface LedgerTableProps {
  filteredLogs: AuditLogEntry[];
}

export default function LedgerTable({ filteredLogs }: LedgerTableProps) {
  const getActionTypeLabel = (type: AuditLogEntry['actionType']) => {
    switch (type) {
      case 'CLEARANCE_APPROVED': return 'Clearance Approved';
      case 'CLEARANCE_REJECTED': return 'Clearance Flagged';
      case 'WORKFLOW_CREATED': return 'Clearance Process Created';
      case 'UNIT_CREATED': return 'Department Profile Created';
      case 'UNIT_MODIFIED': return 'Department Profile Updated';
      case 'ROLE_UPDATED': return 'Staff Role Adjusted';
      case 'MEMBER_INVITED': return 'Staff Officer Invited';
      case 'SECURITY_SEAL_VERIFIED': return 'Integrity Seal Verified';
      default: return 'System Activity';
    }
  };

  const getActionBadgeStyle = (type: AuditLogEntry['actionType']) => {
    switch (type) {
      case 'CLEARANCE_APPROVED': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'CLEARANCE_REJECTED': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'WORKFLOW_CREATED': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'UNIT_CREATED':
      case 'UNIT_MODIFIED': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'ROLE_UPDATED': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'MEMBER_INVITED': return 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
      case 'SECURITY_SEAL_VERIFIED': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      default: return 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20';
    }
  };

  return (
    <div className="overflow-x-auto w-full no-scrollbar">
      <table className="w-full text-left border-collapse min-w-225">
        <thead>
          <tr className="bg-[#0b0b0b] border-b border-white/5 text-[10px] text-white/30 uppercase tracking-wider font-mono">
            <th className="px-6 py-3.5">UTC Timestamp</th>
            <th className="px-6 py-3.5">Actor</th>
            <th className="px-6 py-3.5">Action Type</th>
            <th className="px-6 py-3.5">Target Resource</th>
            <th className="px-6 py-3.5">IP Address & User Agent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-xs font-sans">
          {filteredLogs.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-xs text-white/30 font-mono italic">
                No compliant audit log trail items match your active query filters.
              </td>
            </tr>
          ) : (
            filteredLogs.map((log) => {
              const date = new Date(log.timestamp);
              const formatUTC = date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

              return (
                <tr key={log.id} className="hover:bg-white/2 transition-colors group">
                  {/* TIMESTAMP */}
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                      <span className="font-mono text-[11px] text-white/70 font-semibold">{formatUTC}</span>
                    </div>
                  </td>

                  {/* ACTOR CARD */}
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div className="text-xs font-bold text-white/80">{log.actorName}</div>
                    <div className="text-[10px] text-white/40 font-mono mt-0.5">{log.actorEmail}</div>
                    <div className="text-[9px] text-emerald-400/70 font-mono mt-0.5 font-bold uppercase tracking-wider">{log.actorRole}</div>
                  </td>

                  {/* ACTION BADGE */}
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${getActionBadgeStyle(log.actionType)}`}>
                      {getActionTypeLabel(log.actionType)}
                    </span>
                  </td>

                  {/* TARGET BLOCK PANE */}
                  <td className="px-6 py-4.5">
                    <div className="text-xs font-semibold text-white/70 max-w-60 truncate" title={log.targetResource}>
                      {log.targetResource}
                    </div>
                    <div className="text-[10px] text-white/30 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>Ref ID:</span>
                      <span className="font-bold select-all text-white/50">{log.targetId}</span>
                    </div>
                  </td>

                  {/* SECURITY IP NET trail */}
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/60 mb-0.5">
                      <Globe className="w-3 h-3 text-white/20" />
                      <span className="select-all font-bold">{log.ipAddress}</span>
                    </div>
                    <div className="text-[9px] text-white/30 truncate max-w-65 flex items-center gap-1" title={log.userAgent}>
                      <Laptop className="w-2.5 h-2.5 shrink-0 opacity-40" />
                      <span className="truncate">{log.userAgent}</span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}