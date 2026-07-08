'use client';

import React from 'react';
import { Settings, Info, Lock, Unlock, Trash2 } from 'lucide-react';
import { WorkflowStep } from '@/types';

interface StepInspectorCardProps {
  selectedStep: WorkflowStep | null;
  currentScope: 'parent' | 'child';
  onDecoupleStep: (id: string) => void;
  onUpdateField: (field: keyof WorkflowStep, value: WorkflowStep[keyof WorkflowStep]) => void;
  onRemoveStep: (id: string) => void;
}

export default function StepInspectorCard({
  selectedStep,
  currentScope,
  onDecoupleStep,
  onUpdateField,
  onRemoveStep
}: StepInspectorCardProps) {
  if (!selectedStep) {
    return (
      <div className="py-12 text-center text-white/30 flex flex-col items-center justify-center bg-[#0e0e0e] border border-white/10 rounded-2xl p-5 shadow-xl">
        <Info className="w-8 h-8 text-white/10 mb-2" />
        <p className="text-xs font-serif italic">Select any clearance step card to inspect details.</p>
      </div>
    );
  }

  const isInherited = selectedStep.isInherited && currentScope === 'child';

  return (
    <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl font-sans text-left">
      <div className="border-b border-white/5 pb-3 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-400" />
          <h3 className="font-serif italic text-white text-sm tracking-normal">Clearance Step Inspector</h3>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.5 rounded-full">
          Step {selectedStep.sequence}
        </span>
      </div>

      {isInherited ? (
        <div className="bg-amber-500/5 border border-amber-500/20 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold font-serif italic">Shared University Requirement</span>
          </div>
          <p className="text-[10px] text-amber-300/70 leading-relaxed">
            This clearance step is configured centrally. You can decouple it to tailor specific guidelines or add custom requirements.
          </p>
          <button
            type="button"
            onClick={() => onDecoupleStep(selectedStep.id)}
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg cursor-pointer transition-all shadow-md"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock & Customize Step</span>
          </button>
        </div>
      ) : (
        <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2">
          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-300">Customized Local Step (Unlocked)</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider text-white/45 block font-mono font-bold">Step Name / Descriptor</label>
          <input
            type="text"
            disabled={isInherited}
            value={selectedStep.title.includes(':') ? selectedStep.title.split(':').slice(1).join(':').trim() : selectedStep.title}
            onChange={(e) => onUpdateField('title', `Step ${selectedStep.sequence}: ${e.target.value}`)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-green-400/40 disabled:opacity-40"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider text-white/45 block font-mono font-bold">Assigned Organizational Unit</label>
          <input
            type="text"
            disabled={isInherited}
            value={selectedStep.unitName}
            onChange={(e) => onUpdateField('unitName', e.target.value)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-green-400/40 disabled:opacity-40"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider text-white/45 block font-mono font-bold">Clearance Action Type</label>
          <select
            disabled={isInherited}
            value={selectedStep.requirementType}
            onChange={(e) => onUpdateField('requirementType', e.target.value)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-green-400/40 disabled:opacity-40 cursor-pointer"
          >
            <option value="DOCUMENT_UPLOAD">DOCUMENT UPLOAD (Digital Document Review)</option>
            <option value="FORM_UPLOAD">FORM UPLOAD (Department Handover Form)</option>
            <option value="FEE_PAYMENT">FEE PAYMENT (Bursary Bill Payment)</option>
            <option value="OFFICER_SIGN_OFF">OFFICER SIGN-OFF (Manual Sign-off Clearance)</option>
          </select>
        </div>

        {selectedStep.requirementType === 'FEE_PAYMENT' && (
          <div className="space-y-1 bg-blue-500/2 border border-blue-500/10 p-3 rounded-xl">
            <label className="text-[9px] uppercase tracking-wider text-blue-400 block font-bold font-mono">Levy Fee Amount (₦)</label>
            <input
              type="number"
              disabled={isInherited}
              value={selectedStep.feeAmount || ''}
              onChange={(e) => onUpdateField('feeAmount', Number(e.target.value))}
              className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
            />
          </div>
        )}

        {(selectedStep.requirementType === 'DOCUMENT_UPLOAD' || selectedStep.requirementType === 'FORM_UPLOAD') && (
          <div className="space-y-1 bg-amber-500/2 border border-amber-500/10 p-3 rounded-xl">
            <label className="text-[9px] uppercase tracking-wider text-amber-400 block font-bold font-mono">Expected File Blueprint</label>
            <input
              type="text"
              disabled={isInherited}
              value={selectedStep.requiredFileName || ''}
              onChange={(e) => onUpdateField('requiredFileName', e.target.value)}
              className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider text-white/45 block font-mono font-bold">Signing Officer (Assigned Agent)</label>
          <input
            type="text"
            disabled={isInherited}
            value={selectedStep.assignedOfficer}
            onChange={(e) => onUpdateField('assignedOfficer', e.target.value)}
            className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-green-400/40 disabled:opacity-40"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider text-white/45 block font-mono font-bold">Clearance Directives</label>
          <textarea
            disabled={isInherited}
            value={selectedStep.details}
            onChange={(e) => onUpdateField('details', e.target.value)}
            rows={3}
            className="w-full bg-bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white placeholder-white/10 focus:outline-none focus:border-green-400/40 disabled:opacity-40 resize-none"
          />
        </div>

        {!selectedStep.isInherited && (
          <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
            <button
              type="button"
              onClick={() => onRemoveStep(selectedStep.id)}
              className="flex items-center gap-1 text-[10px] font-bold text-rose-400/80 hover:text-rose-400 cursor-pointer font-sans"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Step</span>
            </button>
            <div className="text-white/30">ID: {selectedStep.id.split('-')[0]}</div>
          </div>
        )}
      </div>
    </div>
  );
}