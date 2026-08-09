'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Layout, Plus, Sliders } from 'lucide-react';
import { Institution, WorkflowStep } from '@/types';
import { clientFetch, ClientApiError } from '@/lib/api/client-fetch';
import type { UnitNode, WorkflowTemplate } from '@/lib/api/types';

import CanvasHeader from '@/components/dashboard/staff/workflow-studio/CanvasHeader';
import InheritanceBar from '@/components/dashboard/staff/workflow-studio/InheritanceBar';
import WorkflowNodeCard from '@/components/dashboard/staff/workflow-studio/WorkflowNodeCard';
import StepInspectorCard from '@/components/dashboard/staff/workflow-studio/StepInspectorCard';

interface WorkflowStudioCanvasProps {
  institution: Institution;
}


const REQUIREMENT_META_MAP = {
  DOCUMENT_UPLOAD: { label: 'Document Upload & Review', badge: 'DOCUMENT UPLOAD', icon: <span className="text-emerald-400">↑</span>, colorClass: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' },
  FORM_UPLOAD: { label: 'Academic Form Submission', badge: 'FORM UPLOAD', icon: <span className="text-amber-400">📄</span>, colorClass: 'border-amber-500/20 bg-amber-500/5 text-amber-400' },
  FEE_PAYMENT: { label: 'Clearance Fee Payment', badge: 'FEE PAYMENT', icon: <span className="text-blue-400">₦</span>, colorClass: 'border-blue-500/20 bg-blue-500/5 text-blue-400' },
  OFFICER_SIGN_OFF: { label: 'Officer Manual Sign-off', badge: 'OFFICER SIGN-OFF', icon: <span className="text-purple-400">✓</span>, colorClass: 'border-purple-500/20 bg-purple-500/5 text-purple-400' }
};

export default function WorkflowStudioCanvas({ institution }: WorkflowStudioCanvasProps) {
  const [currentScope, setCurrentScope] = useState<'parent' | 'child'>('child');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [owningUnitId, setOwningUnitId] = useState<string | null>(null);

  const [draggingStepId, setDraggingStepId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clientFetch<UnitNode[]>('/api/v1/iam/units/tree/', { method: 'GET' })
      .then(tree => { if (tree.length > 0) setOwningUnitId(tree[0].id); })
      .catch(() => {});
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- resetting derived state when scope changes */
  useEffect(() => {
    setSteps([]);
    setSelectedStepId(null);
  }, [currentScope]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleDecoupleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          id: `decoupled-${Date.now()}-${step.sequence}`,
          isInherited: false,
          title: `${step.title} (Custom)`,
          unitName: ''
        };
      }
      return step;
    }));
    setTimeout(() => {
      setSteps(current => {
        const match = current.find(s => s.id.startsWith('decoupled-'));
        if (match) setSelectedStepId(match.id);
        return current;
      });
    }, 50);
  };

  const handleNodeDragStart = (e: React.MouseEvent, stepId: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('select') || target.closest('input') || target.closest('.lock-click-trigger')) return;

    e.preventDefault();
    setSelectedStepId(stepId);
    setDraggingStepId(stepId);

    const step = steps.find(s => s.id === stepId);
    if (step && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: ((e.clientX - rect.left) / canvasScale) - step.x,
        y: ((e.clientY - rect.top) / canvasScale) - step.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingStepId || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const nextX = ((e.clientX - rect.left) / canvasScale) - dragOffset.x;
      const nextY = ((e.clientY - rect.top) / canvasScale) - dragOffset.y;

      setSteps(prev => prev.map(s => s.id === draggingStepId ? { 
        ...s, 
        x: Math.round(Math.max(10, Math.min(1250, nextX))), 
        y: Math.round(Math.max(10, Math.min(410, nextY))) 
      } : s));
    };

    const handleMouseUp = () => { if (draggingStepId) setDraggingStepId(null); };

    if (draggingStepId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingStepId, dragOffset, canvasScale]);

  const forceAlignLinearChain = () => {
    setSteps(prev => [...prev].sort((a, b) => a.sequence - b.sequence).map((s, idx) => ({ ...s, x: 60 + idx * 290, y: 180 })));
  };

  const addNewStep = () => {
    const maxSeq = steps.length > 0 ? Math.max(...steps.map(s => s.sequence)) : 0;
    const nextSeq = maxSeq + 1;
    const newId = `step-custom-${Date.now()}`;
    const lastStep = steps.find(s => s.sequence === maxSeq);

    const newStep: WorkflowStep = {
      id: newId,
      sequence: nextSeq,
      title: `Step ${nextSeq}: New Requirement`,
      unitName: '',
      requirementType: 'DOCUMENT_UPLOAD',
      details: '',
      assignedOfficer: '',
      x: lastStep ? Math.min(lastStep.x + 280, 1100) : 80,
      y: lastStep ? lastStep.y : 180,
      isInherited: false
    };
    setSteps([...steps, newStep]);
    setSelectedStepId(newId);
  };

  const removeStep = (stepId: string) => {
    const remaining = steps.filter(s => s.id !== stepId);
    const reordered = remaining.map((s, idx) => ({
      ...s,
      sequence: idx + 1,
      title: s.title.startsWith('Step ') ? `Step ${idx + 1}: ${s.title.split(':').slice(1).join(':').trim()}` : s.title
    }));
    setSteps(reordered);
    if (selectedStepId === stepId) setSelectedStepId(reordered[0]?.id || null);
  };

  return (
    <div className="space-y-6 w-full">
      <CanvasHeader institution={institution} isSaving={isSaving} onForceAlign={forceAlignLinearChain} onSaveWorkflow={async () => {
        setIsSaving(true);
        setSaveError(null);
        try {
          const templateName = `${institution.shortName} Clearance – ${new Date().toISOString().split('T')[0]}`;
          const template = await clientFetch<WorkflowTemplate>('/api/v1/workflows/templates/', {
            method: 'POST',
            body: { name: templateName, owning_unit: owningUnitId, is_active: true },
          });

          for (const step of steps.filter(s => !s.isInherited)) {
            await clientFetch('/api/v1/workflows/requirements/', {
              method: 'POST',
              body: { template: template.id, name: step.title, requirement_type: step.requirementType },
            });
          }

          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
          const msg = err instanceof ClientApiError ? err.message : 'Failed to publish workflow.';
          setSaveError(msg);
          setTimeout(() => setSaveError(null), 5000);
        } finally {
          setIsSaving(false);
        }
      }} />
      <InheritanceBar institution={institution} currentScope={currentScope} setCurrentScope={setCurrentScope} />

      <AnimatePresence>
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3 text-left">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Clearance Process Published</h4>
              <p className="text-xs text-emerald-300/70 mt-0.5">The workflow template and requirements have been saved to the backend.</p>
            </div>
          </motion.div>
        )}
        {saveError && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-start gap-3 text-left">
            <div>
              <h4 className="text-sm font-bold text-rose-400">Publish Failed</h4>
              <p className="text-xs text-rose-300/70 mt-0.5">{saveError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-white/2 border border-white/5 rounded-xl p-3 px-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Layout className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white/80">Clearance Process Map</span>
              <span className="text-white/30 font-sans text-[10px]">({steps.length} Steps Active)</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <div className="flex items-center bg-[#0e0e0e] border border-white/10 rounded-lg p-0.5">
                <button type="button" onClick={() => setCanvasScale(p => Math.max(0.75, p - 0.1))} className="p-1 px-2.5 hover:text-white cursor-pointer">-</button>
                <span className="text-white/40">{Math.round(canvasScale * 100)}%</span>
                <button type="button" onClick={() => setCanvasScale(p => Math.min(1.2, p + 0.1))} className="p-1 px-2.5 hover:text-white cursor-pointer">+</button>
              </div>
              <button type="button" onClick={addNewStep} className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 py-1.5 px-3 rounded-lg border border-emerald-500/10 cursor-pointer font-sans font-bold text-xs">
                <Plus className="w-3.5 h-3.5" /><span>Add clearance step</span>
              </button>
            </div>
          </div>

          <div className="relative w-full bg-[#070707] border border-white/10 rounded-2xl overflow-auto custom-scrollbar h-120">
            <div className="absolute inset-y-0 left-0 min-w-337.5 w-full opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
            
            <div ref={canvasRef} className="relative h-120" style={{ transform: `scale(${canvasScale})`, transformOrigin: 'top left', width: `${100 / canvasScale}%`, minWidth: '1350px' }}>
              {steps.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Layout className="w-5 h-5 text-white/20" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/40">No clearance steps defined</p>
                      <p className="text-xs text-white/25 mt-1">Click &quot;Add clearance step&quot; to build your workflow</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" opacity="0.4" /></marker>
                      <marker id="arrow-selected" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" /></marker>
                    </defs>
                    {steps.map((s, idx) => {
                      if (idx === steps.length - 1) return null;
                      const next = steps[idx + 1];
                      const x1 = s.x + 250; const y1 = s.y + 75;
                      const x2 = next.x; const y2 = next.y + 75;
                      const isSel = selectedStepId === s.id || selectedStepId === next.id;
                      return (
                        <g key={s.id}>
                          {isSel && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="4" className="opacity-20 blur-[1px]" />}
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={isSel ? '#34d399' : 'rgba(255,255,255,0.12)'} strokeWidth={isSel ? '2' : '1.5'} markerEnd={`url(#${isSel ? 'arrow-selected' : 'arrow'})`} />
                        </g>
                      );
                    })}
                  </svg>

                  {steps.map(s => (
                    <WorkflowNodeCard
                      key={s.id} step={s} isSelected={selectedStepId === s.id} isDragging={draggingStepId === s.id} currentScope={currentScope}
                      meta={REQUIREMENT_META_MAP[s.requirementType]} onNodeDragStart={handleNodeDragStart} onDecoupleStep={handleDecoupleStep} onRemoveStep={removeStep}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[9px] font-mono">
              <div className="bg-black/90 border border-white/5 p-2 rounded-xl flex items-center gap-4 text-white/50 pointer-events-auto">
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span>Selected Process</span></div>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span>Inherited Lock</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <StepInspectorCard 
            selectedStep={steps.find(s => s.id === selectedStepId) || null} currentScope={currentScope} onDecoupleStep={handleDecoupleStep}
            onUpdateField={(f, v) => setSteps(prev => prev.map(s => s.id === selectedStepId ? { ...s, [f]: v } : s))} onRemoveStep={removeStep}
          />
          
          <div className="bg-[#0e0e0e]/50 border border-white/5 p-4 rounded-xl space-y-3 text-left">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Sliders className="w-3.5 h-3.5" /><span>Workflow Designer Tips</span>
            </h4>
            <div className="text-[10px] text-white/40 space-y-2 leading-relaxed font-sans">
              <p><strong>Sequential Process Flow</strong>: Students complete clearance steps from left to right. Drag steps to reorganize the process timeline sequence.</p>
              <p><strong>Inherited Requirements</strong>: Steps marked as locked are configured centrally. Decouple the requirement lock to declare custom guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}