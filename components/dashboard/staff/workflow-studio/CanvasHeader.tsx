'use client';

import React from 'react';
import { GitCommit, Save, RefreshCw } from 'lucide-react';
import { Institution } from '@/types';

interface CanvasHeaderProps {
  institution: Institution;
  isSaving: boolean;
  onForceAlign: () => void;
  onSaveWorkflow: () => void;
}

export default function CanvasHeader({ institution, isSaving, onForceAlign, onSaveWorkflow }: CanvasHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
      <div className="text-left">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold font-mono">
          Clearance Workflow Designer
        </span>
        <h2 className="text-xl font-serif italic text-white mt-1">Clearance Process Canvas</h2>
        <p className="text-xs text-white/40 mt-0.5">
          Model, inherit, and publish strictly linear, non-branching clearance sequences for {institution.name}.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto font-sans">
        <button
          type="button"
          onClick={onForceAlign}
          className="flex items-center gap-1.5 bg-[#0e0e0e] hover:bg-neutral-800 border border-white/10 text-white/80 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          title="Auto-align steps in a perfect straight horizontal sequence"
        >
          <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
          <span>Align Linear Chain</span>
        </button>

        <button
          type="button"
          onClick={onSaveWorkflow}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-2 px-4 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          {isSaving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{isSaving ? 'Publishing...' : 'Publish Clearance'}</span>
        </button>
      </div>
    </div>
  );
}