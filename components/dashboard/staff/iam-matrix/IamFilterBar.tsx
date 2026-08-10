'use client';

import React from 'react';
import { Search, Building, Lock, Filter, RefreshCw } from 'lucide-react';
import { CapabilityMeta } from '@/types';

interface IamFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCell: string;
  setSelectedCell: (val: string) => void;
  selectedCapability: string;
  setSelectedCapability: (val: string) => void;
  cellOptions: string[];
  capabilitiesMetadata: CapabilityMeta[];
  onReset: () => void;
}

export default function IamFilterBar({
  searchTerm,
  setSearchTerm,
  selectedCell,
  setSelectedCell,
  selectedCapability,
  setSelectedCapability,
  cellOptions,
  capabilitiesMetadata,
  onReset
}: IamFilterBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-surface-inset border border-edge p-4 rounded-2xl">
      <div className="sm:col-span-5 relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-faint" />
        <input
          type="text"
          placeholder="Search staff members by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-bg-dark border border-edge rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-heading placeholder-subtle focus:outline-none focus:border-amber-500/50 font-sans"
        />
      </div>

      <div className="sm:col-span-3">
        <div className="relative">
          <Building className="absolute left-3 top-3 w-3.5 h-3.5 text-faint" />
          <select
            value={selectedCell}
            onChange={(e) => setSelectedCell(e.target.value)}
            className="w-full bg-bg-dark border border-edge rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-secondary focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none font-sans"
          >
            <option value="all">Filter by Department (All)</option>
            {cellOptions.map(dept => (
              <option key={dept} value={dept} className="bg-neutral-950 text-heading font-sans">{dept}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-faint">
            <Filter className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="sm:col-span-3">
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-3.5 h-3.5 text-faint" />
          <select
            value={selectedCapability}
            onChange={(e) => setSelectedCapability(e.target.value)}
            className="w-full bg-bg-dark border border-edge rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-secondary focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none font-sans"
          >
            <option value="all">Filter by Privilege (All)</option>
            {capabilitiesMetadata.map(cap => (
              <option key={cap.key} value={cap.key} className="bg-neutral-950 text-heading font-sans">{cap.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-faint">
            <Filter className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="sm:col-span-1 flex items-center justify-center">
        <button
          type="button"
          onClick={onReset}
          className="w-full h-full py-2 bg-chip border border-edge rounded-xl text-secondary hover:text-heading hover:bg-chip-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold font-sans"
          title="Reset Filters to Default Schema"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="sm:hidden">Reset</span>
        </button>
      </div>
    </div>
  );
}