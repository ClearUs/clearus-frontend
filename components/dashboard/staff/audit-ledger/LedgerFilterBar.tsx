'use client';

import React from 'react';
import { Search, Filter, User, RefreshCw } from 'lucide-react';

interface LedgerFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedActionType: string;
  setSelectedActionType: (val: string) => void;
  selectedActor: string;
  setSelectedActor: (val: string) => void;
  uniqueActors: string[];
  onReset: () => void;
}

export default function LedgerFilterBar({
  searchTerm,
  setSearchTerm,
  selectedActionType,
  setSelectedActionType,
  selectedActor,
  setSelectedActor,
  uniqueActors,
  onReset
}: LedgerFilterBarProps) {
  return (
    <div className="bg-surface-dropdown p-6 border-b border-edge grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Search Bar Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-faint" />
        <input
          type="text"
          placeholder="Search by Actor, Resource ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-bg-dark border border-edge rounded-xl pl-10 pr-4 py-2.5 text-xs text-heading placeholder-subtle focus:outline-none focus:border-emerald-500/40 font-sans"
        />
      </div>

      {/* Action Type Dropdown */}
      <div className="relative">
        <Filter className="absolute left-3.5 top-3 w-4 h-4 text-faint" />
        <select
          value={selectedActionType}
          onChange={(e) => setSelectedActionType(e.target.value)}
          className="w-full bg-bg-dark border border-edge rounded-xl pl-10 pr-8 py-2.5 text-xs text-secondary focus:outline-none focus:border-emerald-500/40 cursor-pointer appearance-none font-sans"
        >
          <option value="all">All Action Types</option>
          <option value="CLEARANCE_APPROVED">Clearance Approvals</option>
          <option value="CLEARANCE_REJECTED">Clearance Rejections</option>
          <option value="WORKFLOW_CREATED">Workflow Designs</option>
          <option value="UNIT_CREATED">Unit Creations</option>
          <option value="UNIT_MODIFIED">Unit Profile Changes</option>
          <option value="ROLE_UPDATED">Officer Role Adjustments</option>
          <option value="MEMBER_INVITED">Officer Invitations</option>
          <option value="SECURITY_SEAL_VERIFIED">System Integrity Audits</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-faint text-[10px]">
          ▼
        </div>
      </div>

      {/* Staff Actor Lookup Selection Dropdown with Reset Anchor */}
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <User className="absolute left-3.5 top-3 w-4 h-4 text-faint" />
          <select
            value={selectedActor}
            onChange={(e) => setSelectedActor(e.target.value)}
            className="w-full bg-bg-dark border border-edge rounded-xl pl-10 pr-8 py-2.5 text-xs text-secondary focus:outline-none focus:border-emerald-500/40 cursor-pointer appearance-none font-sans"
          >
            <option value="all">All Staff Actors</option>
            {uniqueActors.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-faint text-[10px]">
            ▼
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="px-3.5 bg-chip border border-edge rounded-xl text-secondary hover:text-heading hover:bg-chip-hover transition-colors flex items-center justify-center cursor-pointer shrink-0"
          title="Reset filters to default"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}