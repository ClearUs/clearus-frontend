'use client';

import React, { useState, useEffect } from 'react';
import { Building, Plus } from 'lucide-react';
import { Institution, OrgNode } from '@/types';
import OrgTreePanel from './OrgTreePanel';
import OrgInspectorPanel from './OrgInspectorPanel';
import OrgModalManager from './OrgModalManager';

interface OrganizationalUnitsStudioProps {
  institution: Institution;
}

const getInitialOrgData = (institutionCode: string): OrgNode[] => {
  const code = institutionCode.toLowerCase();
  return [
    { id: 'science', name: 'Faculty of Science', type: 'faculty', staffCount: 34, studentCount: 1450, allowedDomains: [`*science.${code}.edu.ng`], boundWorkflows: ['Faculty Board Clearance', 'Academic Integrity Verification'], parentId: null },
    { id: 'physics', name: 'Dept of Physics', type: 'department', staffCount: 12, studentCount: 240, allowedDomains: [`*physics.${code}.edu.ng`], boundWorkflows: ['Lab Equipment Signing', 'Undergraduate Seminar Clearance'], parentId: 'science' },
    { id: 'comp-sci', name: 'Dept of Computer Science', type: 'department', staffCount: 8, studentCount: 412, allowedDomains: [`*cs.${code}.edu.ng`], boundWorkflows: ['Thesis Document Verification', 'Degree Progress Review'], parentId: 'science' },
    { id: 'bursary-div', name: 'Bursary Division', type: 'division', staffCount: 18, allowedDomains: [`*bursary.${code}.edu.ng`], boundWorkflows: ['School Fees Final Clearance Audit'], parentId: null },
    { id: 'student-accounts', name: 'Student Accounts Desk', type: 'desk', staffCount: 4, allowedDomains: [`*accounts.${code}.edu.ng`], boundWorkflows: ['Graduation Handbook Fee Clearance', 'Outstanding Bill Verification'], parentId: 'bursary-div' },
    { id: 'engineering', name: 'Faculty of Engineering', type: 'faculty', staffCount: 45, studentCount: 1890, allowedDomains: [`*eng.${code}.edu.ng`], boundWorkflows: ['Faculty Dues Verification', 'Workshop Safety Clearance'], parentId: null },
    { id: 'mech-eng', name: 'Dept of Mechanical Engineering', type: 'department', staffCount: 15, studentCount: 510, allowedDomains: [`*mech.${code}.edu.ng`], boundWorkflows: ['Machinery Lab Handover Check'], parentId: 'engineering' }
  ];
};

export default function OrganizationalUnitsStudio({ institution }: OrganizationalUnitsStudioProps) {
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('comp-sci');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'science': true, 'bursary-div': true, 'engineering': true
  });

  const [activePane, setActivePane] = useState<'tree' | 'inspector'>('tree');
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  const [pendingMove, setPendingMove] = useState<{ nodeId: string; newParentId: string | null; impact: { subUnits: number; accounts: number } } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [editNodeData, setEditNodeData] = useState<Partial<OrgNode>>({});
  const [newNodeData, setNewNodeData] = useState<Partial<OrgNode>>({
    name: '', type: 'department', staffCount: 5, studentCount: 100, allowedDomains: [], boundWorkflows: []
  });

  const [domainInput, setDomainInput] = useState('');
  const [workflowInput, setWorkflowInput] = useState('');

  useEffect(() => {
    const storageKey = `clearus_${institution.code}_org_nodes`;
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration from localStorage; must run in an effect to avoid an SSR hydration mismatch
      try { setNodes(JSON.parse(cached)); } catch { setNodes(getInitialOrgData(institution.code)); }
    } else {
      const initial = getInitialOrgData(institution.code);
      setNodes(initial);
      localStorage.setItem(storageKey, JSON.stringify(initial));
    }
  }, [institution]);

  const saveNodes = (updated: OrgNode[]) => {
    setNodes(updated);
    localStorage.setItem(`clearus_${institution.code}_org_nodes`, JSON.stringify(updated));
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedNodeId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedNodeId === targetId || isDescendant(draggedNodeId!, targetId)) return;
    setDragOverNodeId(targetId);
  };

  const isDescendant = (parentId: string, targetId: string): boolean => {
    const direct = nodes.filter(n => n.parentId === parentId);
    if (direct.some(c => c.id === targetId)) return true;
    return direct.some(c => isDescendant(c.id, targetId));
  };

  const countDescendants = (parentId: string): number => {
    const direct = nodes.filter(n => n.parentId === parentId);
    let total = direct.length;
    direct.forEach(c => { total += countDescendants(c.id); });
    return total;
  };

  const calculateStudentStaffImpact = (parentId: string): number => {
    const target = nodes.find(n => n.id === parentId);
    let total = (target?.staffCount || 0) + (target?.studentCount || 0);
    nodes.filter(n => n.parentId === parentId).forEach(c => { total += calculateStudentStaffImpact(c.id); });
    return total;
  };

  const handleDrop = (e: React.DragEvent, targetParentId: string | null) => {
    e.preventDefault();
    setDragOverNodeId(null);
    const nodeId = e.dataTransfer.getData('text/plain') || draggedNodeId;
    if (!nodeId || nodeId === targetParentId) return;

    if (targetParentId && isDescendant(nodeId, targetParentId)) return;

    const subUnits = countDescendants(nodeId);
    const accounts = calculateStudentStaffImpact(nodeId);

    setPendingMove({ nodeId, newParentId: targetParentId, impact: { subUnits, accounts } });
    setDraggedNodeId(null);
  };

  const executeMove = () => {
    if (!pendingMove) return;
    const updated = nodes.map(n => n.id === pendingMove.nodeId ? { ...n, parentId: pendingMove.newParentId } : n);
    saveNodes(updated);
    if (pendingMove.newParentId) setExpandedNodes(prev => ({ ...prev, [pendingMove.newParentId!]: true }));
    setPendingMove(null);
  };

  const handleCreateUnit = () => {
    if (!newNodeData.name?.trim()) return;
    const randomId = 'unit_' + Math.random().toString(36).substring(2, 9);
    const node: OrgNode = {
      id: randomId,
      name: newNodeData.name.trim(),
      type: newNodeData.type || 'department',
      staffCount: Number(newNodeData.staffCount) || 0,
      studentCount: newNodeData.type === 'faculty' || newNodeData.type === 'department' ? (Number(newNodeData.studentCount) || 0) : undefined,
      allowedDomains: newNodeData.allowedDomains || [],
      boundWorkflows: newNodeData.boundWorkflows || [],
      parentId: newNodeData.parentId || null
    };

    saveNodes([...nodes, node]);
    setSelectedNodeId(randomId);
    setIsAddModalOpen(false);
    setNewNodeData({ name: '', type: 'department', staffCount: 5, studentCount: 100, allowedDomains: [], boundWorkflows: [] });
  };

  const handleUpdateUnit = () => {
    if (!editNodeData.id || !editNodeData.name?.trim()) return;
    const updated = nodes.map(n => n.id === editNodeData.id ? {
      ...n,
      name: editNodeData.name!.trim(),
      type: editNodeData.type!,
      staffCount: Number(editNodeData.staffCount) || 0,
      studentCount: editNodeData.type === 'faculty' || editNodeData.type === 'department' ? Number(editNodeData.studentCount) || 0 : undefined,
      allowedDomains: editNodeData.allowedDomains || [],
      boundWorkflows: editNodeData.boundWorkflows || []
    } as OrgNode : n);

    saveNodes(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteUnit = (id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node || !window.confirm(`Are you sure you want to completely remove "${node.name}" and all sub-units?`)) return;

    const idsToRemove = new Set<string>([id]);
    const gatherIds = (pId: string) => {
      nodes.filter(n => n.parentId === pId).forEach(c => { idsToRemove.add(c.id); gatherIds(c.id); });
    };
    gatherIds(id);

    const updated = nodes.filter(n => !idsToRemove.has(n.id));
    saveNodes(updated);
    setSelectedNodeId(updated[0]?.id || '');
  };

  return (
    <div className="w-full bg-bg-dark text-[#E0E0E0] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-162.5 shadow-2xl relative z-10">

      {/* Dynamic Upper Header Action Row */}
      <div className="bg-[#0c0c0c] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Building className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h2 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">
              Organizational Units Studio
            </h2>
            <p className="text-[10px] text-white/40 font-mono mt-0.5">
              Configure hierarchical departments, office clearance desks, and workflow mappings.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewNodeData({ name: '', type: 'faculty', staffCount: 10, studentCount: 200, allowedDomains: [], boundWorkflows: [], parentId: null });
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2 bg-brand-green hover:bg-brand-green-bright text-black text-[10px] font-black uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-green/10"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Unit</span>
        </button>
      </div>

      {/* Grid Canvas Shell Splits */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-7 border-r border-white/10 h-full overflow-hidden">
          <OrgTreePanel
            institution={institution} nodes={nodes} selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId}
            expandedNodes={expandedNodes} toggleExpand={id => setExpandedNodes(p => ({ ...p, [id]: !p[id] }))}
            dragOverNodeId={dragOverNodeId} handleDragStart={handleDragStart} handleDragOver={handleDragOver}
            handleDragLeave={() => setDragOverNodeId(null)} handleDrop={handleDrop}
            onOpenAddModal={pId => { setNewNodeData({ name: '', type: 'department', staffCount: 5, studentCount: 120, allowedDomains: [], boundWorkflows: [], parentId: pId }); setIsAddModalOpen(true); }}
            onOpenEditModal={node => { setEditNodeData(node); setIsEditModalOpen(true); }} onDeleteUnit={handleDeleteUnit}
          />
        </div>

        <div className="lg:col-span-5 h-full overflow-hidden">
          <OrgInspectorPanel
            selectedNode={selectedNode} nodes={nodes}
            onOpenEditModal={node => { setEditNodeData(node); setIsEditModalOpen(true); }} onDeleteUnit={handleDeleteUnit}
          />
        </div>
      </div>

      {/* Shared Modals Matrix Overlays Layer */}
      <OrgModalManager
        pendingMove={pendingMove}
        onCancelMove={() => setPendingMove(null)}
        onExecuteMove={executeMove}
        isAddModalOpen={isAddModalOpen}
        onCancelAdd={() => setIsAddModalOpen(false)}
        newNodeData={newNodeData}
        setNewNodeData={setNewNodeData}
        domainInput={domainInput}
        setDomainInput={setDomainInput}
        workflowInput={workflowInput}
        setWorkflowInput={setWorkflowInput}
        onCreateUnit={handleCreateUnit}
        isEditModalOpen={isEditModalOpen}
        onCancelEdit={() => setIsEditModalOpen(false)}
        editNodeData={editNodeData}
        setEditNodeData={setEditNodeData}
        onUpdateUnit={handleUpdateUnit}
      />
    </div>
  );
}