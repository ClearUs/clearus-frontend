'use client';

import React, { useState, useMemo } from 'react';
import { RefreshCw, Download, Activity } from 'lucide-react';
import { AuditLogEntry } from '@/types';
import LedgerFilterBar from './LedgerFilterBar';
import LedgerTable from './LedgerTable';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: "LOG-20260630-10492", timestamp: "2026-06-30T10:49:12Z", actorName: "Professor Ibrahim Musa", actorEmail: "i.musa@futo.edu.ng", actorRole: "Academic Clearance Officer", actionType: "CLEARANCE_APPROVED", targetResource: "Student Clearance: Chinedu Okafor", targetId: "2021/FUTO/5842", ipAddress: "197.210.64.12", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/126.0.0.0", integrityHash: "8f2c7a9b...", metadata: {} },
  { id: "LOG-20260630-10115", timestamp: "2026-06-30T10:11:05Z", actorName: "Dr. Joy Nwachukwu", actorEmail: "j.nwachukwu@futo.edu.ng", actorRole: "Bursary Officer", actionType: "CLEARANCE_APPROVED", targetResource: "Student Clearance: Joanne Mbatuegwu", targetId: "2021/FUTO/7302", ipAddress: "197.210.64.44", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", integrityHash: "5f6e7d8c...", metadata: {} },
  { id: "LOG-20260630-09351", timestamp: "2026-06-30T09:35:12Z", actorName: "Engr. Chidi Amadi", actorEmail: "c.amadi@futo.edu.ng", actorRole: "Student Affairs Coordinator", actionType: "CLEARANCE_REJECTED", targetResource: "Student Clearance: Yusuf Abubakar", targetId: "2021/FUTO/4119", ipAddress: "197.210.88.5", userAgent: "Mozilla/5.0 (Linux; Android 10; K)", integrityHash: "a1b2c3d4...", metadata: {} },
  { id: "LOG-20260630-08124", timestamp: "2026-06-30T08:12:44Z", actorName: "Professor Ibrahim Musa", actorEmail: "i.musa@futo.edu.ng", actorRole: "Academic Clearance Officer", actionType: "ROLE_UPDATED", targetResource: "Officer Privileges: Dr. Samuel Okoye", targetId: "STAFF/FUTO/442", ipAddress: "197.210.64.12", userAgent: "Mozilla/5.0 (Macintosh)", integrityHash: "3f3e3d3c...", metadata: {} },
  { id: "LOG-20260629-17451", timestamp: "2026-06-29T17:45:10Z", actorName: "Mrs. Amina Bello", actorEmail: "a.bello@futo.edu.ng", actorRole: "Super Administrator", actionType: "WORKFLOW_CREATED", targetResource: "Clearance Process: 2026 Academic Session", targetId: "WF-2026-GRAD", ipAddress: "102.89.34.191", userAgent: "Mozilla/5.0 (Windows NT 10.0; rv:127.0)", integrityHash: "bc7a8b9c...", metadata: {} }
];

export function StaffAuditLedger() {
  const [logs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionType, setSelectedActionType] = useState('all');
  const [selectedActor, setSelectedActor] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const uniqueActors = useMemo(() => {
    return Array.from(new Set(logs.map(l => l.actorName))).sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.targetResource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.targetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = selectedActionType === 'all' || log.actionType === selectedActionType;
      const matchesActor = selectedActor === 'all' || log.actorName === selectedActor;

      return matchesSearch && matchesAction && matchesActor;
    });
  }, [logs, searchTerm, selectedActionType, selectedActor]);

  const handleExportCSV = () => {
    const headers = 'UTC Timestamp,Actor,Action Type,Target Resource,IP Address\n';
    const csvContent = logs.map(l => 
      `"${l.timestamp}","${l.actorName} <${l.actorEmail}>","${l.actionType}","${l.targetResource} [${l.targetId}]","${l.ipAddress}"`
    ).join('\n');
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Clearance_Audit_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl w-full flex flex-col relative z-10">
      
      {/* Upper Control Ribbon Pane Header */}
      <div className="border-b border-white/10 bg-[#0c0c0c] px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-lg font-serif italic text-white leading-tight">Asynchronous Audit & Activity Log Ledger</h2>
          <p className="text-xs text-white/40 mt-1 max-w-xl leading-relaxed">
            Immutable, read-only system-level log records tracking all officer clearance determinations, workflow updates, and security authorizations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 font-sans">
          <button
            type="button"
            onClick={() => { setIsRefreshing(true); setTimeout(() => setIsRefreshing(false), 600); }}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Refresh Ledger Logs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <LedgerFilterBar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedActionType={selectedActionType} setSelectedActionType={setSelectedActionType}
        selectedActor={selectedActor} setSelectedActor={setSelectedActor}
        uniqueActors={uniqueActors} onReset={() => { setSearchTerm(''); setSelectedActionType('all'); setSelectedActor('all'); }}
      />

      <LedgerTable filteredLogs={filteredLogs} />

      {/* Footer Metrics Tray */}
      <div className="bg-[#0b0b0b] border-t border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40 font-mono font-bold tracking-wide uppercase">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Connection Trail: <strong className="text-emerald-400">SECURE CONSOLE ACTIVE</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span>Active Streams: <strong className="text-white font-sans">{filteredLogs.length} Records</strong></span>
          <span>Compliance Framework: <strong className="text-white">FUTO v2.6-SECURE</strong></span>
        </div>
      </div>

    </div>
  );
}