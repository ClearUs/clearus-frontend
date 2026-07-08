'use client';

import React from 'react';
import { Trash2, Lock, Unlock } from 'lucide-react';
import { WorkflowStep, RequirementMetaItem } from '@/types';

interface WorkflowNodeCardProps {
  step: WorkflowStep;
  isSelected: boolean;
  isDragging: boolean;
  currentScope: 'parent' | 'child';
  meta: RequirementMetaItem;
  onNodeDragStart: (e: React.MouseEvent, id: string) => void;
  onDecoupleStep: (id: string) => void;
  onRemoveStep: (id: string) => void;
}

export default function WorkflowNodeCard({
  step,
  isSelected,
  isDragging,
  currentScope,
  meta,
  onNodeDragStart,
  onDecoupleStep,
  onRemoveStep
}: WorkflowNodeCardProps) {
  const isInherited = step.isInherited && currentScope === 'child';

  return (
    <div
      style={{ left: step.x, top: step.y }}
      className={`absolute w-62.5 rounded-xl border p-4 select-none z-10 transition-all ${
        isSelected 
          ? isInherited
            ? 'border-amber-400/80 bg-[#120d05] shadow-xl ring-1 ring-amber-500/20'
            : 'border-emerald-400 bg-neutral-900 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20' 
          : isInherited 
            ? 'border-amber-500/10 bg-[#0d0904] hover:border-amber-500/20'
            : 'border-white/10 bg-[#0c0c0c] hover:border-white/20'
      } ${isDragging ? 'cursor-grabbing scale-102 opacity-90' : 'cursor-grab'}`}
      onMouseDown={(e) => onNodeDragStart(e, step.id)}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2.5 drag-handle font-mono text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
            isSelected 
              ? isInherited ? 'bg-amber-400 text-slate-950' : 'bg-emerald-400 text-slate-950' 
              : isInherited ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/80'
          }`}>
            ID: ST-0{step.sequence}
          </span>
        </div>

        {isInherited ? (
          <button
            type="button"
            onClick={() => onDecoupleStep(step.id)}
            className="lock-click-trigger flex items-center gap-1 px-2 py-0.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 rounded border border-amber-400/15 text-[8px] font-bold transition-all cursor-pointer font-sans"
            title="This step is configured centrally. Click to decouple and customize."
          >
            <Lock className="w-2.5 h-2.5 shrink-0 text-amber-400" />
            <span>University Step (Locked)</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {currentScope === 'child' && (
              <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/10">
                <Unlock className="w-2 h-2" />
                Custom
              </span>
            )}
            <button
              type="button"
              onClick={() => onRemoveStep(step.id)}
              className="text-white/30 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
              title="Delete this custom step"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 text-left font-sans">
        <h4 className="text-xs font-serif italic font-bold text-white leading-tight">
          {step.title.includes(':') ? step.title.split(':').slice(1).join(':').trim() : step.title}
        </h4>
        
        <div className="text-[9.5px] text-white/50 leading-tight">
          <span className="text-white/30 font-mono text-[8px] uppercase tracking-wide mr-1">Assigned Unit:</span>
          <span className="font-semibold text-white/70">{step.unitName}</span>
        </div>

        <div className="flex items-center justify-between pt-1.5">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[8px] font-mono font-bold ${meta.colorClass}`}>
            {meta.icon}
            <span>{meta.badge}</span>
          </div>
          <span className="text-[8px] text-white/30 font-mono">Assigned: {step.assignedOfficer.split(' ')[0]}</span>
        </div>

        <p className="text-[9px] text-white/35 line-clamp-2 leading-relaxed border-t border-white/3 pt-1.5 mt-1.5">
          {step.details}
        </p>
      </div>

      <div className="absolute top-17.75 -left-1 w-2.5 h-2.5 rounded-full border border-white/20 bg-neutral-950 z-20" />
      <div className="absolute top-17.75 -right-1.5 w-2.5 h-2.5 rounded-full border border-emerald-500/55 bg-neutral-950 z-20" />
    </div>
  );
}