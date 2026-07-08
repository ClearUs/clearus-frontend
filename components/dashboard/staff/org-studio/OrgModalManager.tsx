'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { OrgNode } from '@/types';

interface PendingMoveData {
  nodeId: string;
  newParentId: string | null;
  impact: { subUnits: number; accounts: number };
}

interface OrgModalManagerProps {
  // Move confirmation variables
  pendingMove: PendingMoveData | null;
  onCancelMove: () => void;
  onExecuteMove: () => void;
  
  // Creation modal variables
  isAddModalOpen: boolean;
  onCancelAdd: () => void;
  newNodeData: Partial<OrgNode>;
  setNewNodeData: React.Dispatch<React.SetStateAction<Partial<OrgNode>>>;
  domainInput: string;
  setDomainInput: (val: string) => void;
  workflowInput: string;
  setWorkflowInput: (val: string) => void;
  onCreateUnit: () => void;
  
  // Modification modal variables
  isEditModalOpen: boolean;
  onCancelEdit: () => void;
  editNodeData: Partial<OrgNode>;
  setEditNodeData: React.Dispatch<React.SetStateAction<Partial<OrgNode>>>;
  onUpdateUnit: () => void;
}

export default function OrgModalManager({
  pendingMove,
  onCancelMove,
  onExecuteMove,
  isAddModalOpen,
  onCancelAdd,
  newNodeData,
  setNewNodeData,
  domainInput,
  setDomainInput,
  workflowInput,
  setWorkflowInput,
  onCreateUnit,
  isEditModalOpen,
  onCancelEdit,
  editNodeData,
  setEditNodeData,
  onUpdateUnit
}: OrgModalManagerProps) {
  return (
    <>
      {/* MODAL 1: Confirm Drag & Drop Downstream Impact */}
      <AnimatePresence>
        {pendingMove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.96, opacity: 0 }} 
              className="bg-[#0c0c0c] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative text-left"
            >
              <div className="flex items-start gap-3.5 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Confirm Relationship Change</h3>
                  <p className="text-[10px] text-white/40 font-sans mt-0.5">Recalculating routing tree parenting parameters.</p>
                </div>
              </div>
              <div className="bg-bg-dark p-4 rounded-xl border border-white/5 text-xs text-white/70 space-y-2 mb-6">
                <p>Moving this block handles cascading updates across <strong className="text-emerald-400">{pendingMove.impact.subUnits}</strong> children nodes and resets data boundaries for <strong className="text-amber-400">{pendingMove.impact.accounts}</strong> accounts.</p>
              </div>
              <div className="flex justify-end gap-3 font-mono text-xs">
                <button type="button" onClick={onCancelMove} className="px-4 py-2 text-white/50 hover:text-white cursor-pointer font-sans font-medium">Cancel</button>
                <button type="button" onClick={onExecuteMove} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider rounded-lg shadow cursor-pointer font-sans">Proceed with Move</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Create / Add New Unit */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.96, opacity: 0 }} 
              className="bg-[#0c0c0c] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative text-left font-sans space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Add Organizational Unit</h3>
                <button type="button" onClick={onCancelAdd} className="text-white/40 hover:text-white text-sm font-mono cursor-pointer">&times;</button>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase text-white/40">Unit Name</label>
                <input type="text" value={newNodeData.name || ''} onChange={e => setNewNodeData(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Dept of Computer Science" className="w-full bg-bg-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40">Level Type</label>
                  <select value={newNodeData.type || 'department'} onChange={e => setNewNodeData(p => ({ ...p, type: e.target.value as OrgNode['type'] }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white/80 focus:outline-none cursor-pointer">
                    <option value="faculty">Faculty</option>
                    <option value="division">Division</option>
                    <option value="department">Department</option>
                    <option value="desk">Office / Desk</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40">Staff Count</label>
                  <input type="number" value={newNodeData.staffCount || 0} onChange={e => setNewNodeData(p => ({ ...p, staffCount: Number(e.target.value) }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              {(newNodeData.type === 'faculty' || newNodeData.type === 'department') && (
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40">Student Count Capacity</label>
                  <input type="number" value={newNodeData.studentCount || 0} onChange={e => setNewNodeData(p => ({ ...p, studentCount: Number(e.target.value) }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none" />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase text-white/40">Add Email Restriction Domain</label>
                <div className="flex gap-2">
                  <input type="text" value={domainInput} onChange={e => setDomainInput(e.target.value)} placeholder="e.g. *cs.unilag.edu.ng" className="flex-1 bg-bg-dark border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none" />
                  <button 
                    type="button" 
                    onClick={() => { 
                      if (!domainInput.trim()) return; 
                      setNewNodeData(p => ({ ...p, allowedDomains: [...(p.allowedDomains || []), domainInput.trim()] })); 
                      setDomainInput(''); 
                    }} 
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white cursor-pointer font-bold font-mono"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-white/5 pt-4 font-mono text-xs">
                <button type="button" onClick={onCancelAdd} className="px-4 py-2 text-white/50 hover:text-white cursor-pointer font-sans font-medium">Cancel</button>
                <button type="button" onClick={onCreateUnit} className="px-5 py-2 bg-emerald-500 text-black font-black uppercase tracking-wider rounded-lg cursor-pointer font-sans">Save Unit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Modify / Edit Existing Unit */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.96, opacity: 0 }} 
              className="bg-[#0c0c0c] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative text-left font-sans space-y-4"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Modify Unit Parameters</h3>
                <button type="button" onClick={onCancelEdit} className="text-white/40 hover:text-white text-sm font-mono cursor-pointer">&times;</button>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase text-white/40">Unit Name</label>
                <input type="text" value={editNodeData.name || ''} onChange={e => setEditNodeData(p => ({ ...p, name: e.target.value }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none font-serif italic" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40">Level Type</label>
                  <select value={editNodeData.type || 'department'} onChange={e => setEditNodeData(p => ({ ...p, type: e.target.value as OrgNode['type'] }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white/80 focus:outline-none cursor-pointer">
                    <option value="faculty">Faculty</option>
                    <option value="division">Division</option>
                    <option value="department">Department</option>
                    <option value="desk">Office / Desk</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40">Staff Count</label>
                  <input type="number" value={editNodeData.staffCount || 0} onChange={e => setEditNodeData(p => ({ ...p, staffCount: Number(e.target.value) }))} className="w-full bg-bg-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-white/5 pt-4 font-mono text-xs">
                <button type="button" onClick={onCancelEdit} className="px-4 py-2 text-white/50 hover:text-white cursor-pointer font-sans font-medium">Cancel</button>
                <button type="button" onClick={onUpdateUnit} className="px-5 py-2 bg-emerald-500 text-black font-black uppercase tracking-wider rounded-lg cursor-pointer font-sans">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}