'use client';

import React from 'react';
import { Users, GraduationCap, AtSign, Shield, FileCheck, Building } from 'lucide-react';
import { OrgNode } from '@/types';

interface OrgInspectorPanelProps {
  selectedNode: OrgNode | null;
  nodes: OrgNode[];
  onOpenEditModal: (node: OrgNode) => void;
  onDeleteUnit: (id: string) => void;
}

export default function OrgInspectorPanel({ selectedNode, nodes, onOpenEditModal, onDeleteUnit }: OrgInspectorPanelProps) {
  if (!selectedNode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white/30 bg-[#0a0a0a]">
        <Building className="w-12 h-12 text-white/5 mb-3" />
        <p className="text-xs font-serif italic max-w-xs">Select any organizational unit block from the hierarchy directory to audit parameters.</p>
      </div>
    );
  }

  const parentNode = nodes.find(n => n.id === selectedNode.parentId);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-6 bg-[#0a0a0a] custom-scrollbar">
      
      {/* Dynamic Header Badge Context */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/40 font-mono">
          <span>Selected Connection Parameters</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-serif font-medium italic text-white tracking-tight leading-tight">
            {selectedNode.name}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase font-mono tracking-wider bg-white/5 text-white/60 border border-white/10 shrink-0">
            {selectedNode.type}
          </span>
        </div>
        {parentNode && (
          <p className="text-xs text-white/40 font-sans">
            Belongs to parent umbrella:{' '}
            <strong className="text-white/70 font-serif italic font-medium">{parentNode.name}</strong>
          </p>
        )}
      </div>

      {/* Demographics / Capacity Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/2 border border-white/5 shadow-inner">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-white/40 font-mono">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Total Staff</span>
          </div>
          <div className="text-xl font-black text-white mt-1 tracking-tight font-sans">
            {selectedNode.staffCount}
          </div>
        </div>

        {selectedNode.studentCount !== undefined && (
          <div className="p-4 rounded-xl bg-white/2 border border-white/5 shadow-inner">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-white/40 font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Students Capacity</span>
            </div>
            <div className="text-xl font-black text-white mt-1 tracking-tight font-sans">
              {selectedNode.studentCount.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Allowed Domain Email Gateways Section */}
      <div className="space-y-3 pt-3 border-t border-white/5 text-left">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono flex items-center gap-1.5">
          <AtSign className="w-3.5 h-3.5" />
          Allowed Email Domains
        </h4>
        {selectedNode.allowedDomains.length === 0 ? (
          <p className="text-xs text-white/30 italic font-serif">No domain constraint boundaries enforced on this node context.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.allowedDomains.map(domain => (
              <span key={domain} className="px-2.5 py-1 rounded-md bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 font-mono text-[10px] font-bold">
                {domain}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Linked Digital Checksheet Processes Matrix */}
      <div className="space-y-3 pt-3 border-t border-white/5 text-left">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Bound Clearance Processes
        </h4>
        {selectedNode.boundWorkflows.length === 0 ? (
          <p className="text-xs text-white/30 italic font-serif">No custom verification steps explicitly bound to this operations desk node.</p>
        ) : (
          <div className="space-y-1.5">
            {selectedNode.boundWorkflows.map(wf => (
              <div key={wf} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/1 border border-white/5 text-xs text-white/80 font-medium">
                <FileCheck className="w-4 h-4 text-cyan-400 opacity-80 shrink-0" />
                <span className="truncate">{wf}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Panel Action Controls Block */}
      <div className="pt-4 border-t border-white/5 flex items-center gap-3 mt-auto">
        <button
          type="button"
          onClick={() => onOpenEditModal(selectedNode)}
          className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs transition-colors cursor-pointer text-center"
        >
          Modify Info
        </button>
        <button
          type="button"
          onClick={() => onDeleteUnit(selectedNode.id)}
          className="flex-1 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold text-xs transition-colors cursor-pointer text-center"
        >
          Delete Unit
        </button>
      </div>

    </div>
  );
}