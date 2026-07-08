'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { Institution } from '@/types';

interface InheritanceBarProps {
  institution: Institution;
  currentScope: 'parent' | 'child';
  setCurrentScope: (scope: 'parent' | 'child') => void;
}

export default function InheritanceBar({ institution, currentScope, setCurrentScope }: InheritanceBarProps) {
  return (
    <div className="bg-[#0e0e0e] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/15 text-emerald-400 mt-0.5 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Clearance Process Inheritance</span>
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
              currentScope === 'child' 
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
            }`}>
              {currentScope === 'child' ? 'Active Sub-unit: Departmental Level' : 'Faculty / Central Level'}
            </span>
          </h4>
          <p className="text-xs text-white/40 mt-1 max-w-2xl leading-relaxed">
            Academic departments inherit standard clearance processes directly from parent units. Sub-units can decouple individual inherited steps to forge custom specialized variations without disrupting the global templates.
          </p>
        </div>
      </div>

      <div className="flex items-center bg-bg-dark p-1.5 rounded-xl border border-white/5 shrink-0 font-mono text-xs">
        <button
          type="button"
          onClick={() => setCurrentScope('parent')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentScope === 'parent' 
              ? 'bg-emerald-500/10 text-emerald-400 font-black border border-emerald-500/20 shadow-inner' 
              : 'text-white/40 hover:text-white'
          }`}
        >
          Central Process Template
        </button>
        <button
          type="button"
          onClick={() => setCurrentScope('child')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentScope === 'child' 
              ? 'bg-amber-500/10 text-amber-400 font-black border border-amber-500/20 shadow-inner' 
              : 'text-white/40 hover:text-white'
          }`}
        >
          Sub-unit (Inherited)
        </button>
      </div>
    </div>
  );
}