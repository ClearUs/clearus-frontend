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
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl">
      <div className="sm:col-span-5 relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search staff members by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 font-sans"
        />
      </div>

      <div className="sm:col-span-3">
        <div className="relative">
          <Building className="absolute left-3 top-3 w-3.5 h-3.5 text-white/30" />
          <select
            value={selectedCell}
            onChange={(e) => setSelectedCell(e.target.value)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-white/80 focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none font-sans"
          >
            <option value="all">Filter by Department (All)</option>
            {cellOptions.map(dept => (
              <option key={dept} value={dept} className="bg-neutral-950 text-white font-sans">{dept}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/30">
            <Filter className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="sm:col-span-3">
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-3.5 h-3.5 text-white/30" />
          <select
            value={selectedCapability}
            onChange={(e) => setSelectedCapability(e.target.value)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-white/80 focus:outline-none focus:border-amber-500/50 cursor-pointer appearance-none font-sans"
          >
            <option value="all">Filter by Privilege (All)</option>
            {capabilitiesMetadata.map(cap => (
              <option key={cap.key} value={cap.key} className="bg-neutral-950 text-white font-sans">{cap.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/30">
            <Filter className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="sm:col-span-1 flex items-center justify-center">
        <button
          type="button"
          onClick={onReset}
          className="w-full h-full py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold font-sans"
          title="Reset Filters to Default Schema"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="sm:hidden">Reset</span>
        </button>
      </div>
    </div>
  );
}