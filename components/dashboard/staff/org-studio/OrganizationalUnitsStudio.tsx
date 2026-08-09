'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Building, Plus, Loader2 } from 'lucide-react';
import { Institution, OrgNode } from '@/types';
import { clientFetch, ClientApiError } from '@/lib/api/client-fetch';
import { flattenUnitTree, orgNodeToCreatePayload } from '@/lib/api/mappers';
import type { UnitNode, UnitDetail } from '@/lib/api/types';
import OrgTreePanel from './OrgTreePanel';
import OrgInspectorPanel from './OrgInspectorPanel';
import OrgModalManager from './OrgModalManager';

interface OrganizationalUnitsStudioProps {
  institution: Institution;
}

export default function OrganizationalUnitsStudio({ institution }: OrganizationalUnitsStudioProps) {
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activePane, setActivePane] = useState<'tree' | 'inspector'>('tree');
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  const [pendingMove, setPendingMove] = useState<{ nodeId: string; newParentId: string | null; impact: { subUnits: number; accounts: number } } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editNodeData, setEditNodeData] = useState<Partial<OrgNode>>({});
  const [newNodeData, setNewNodeData] = useState<Partial<OrgNode>>({
    name: '', type: 'department', staffCount: 5, studentCount: 100, allowedDomains: [], boundWorkflows: []
  });

  const [domainInput, setDomainInput] = useState('');
  const [workflowInput, setWorkflowInput] = useState('');

  const fetchUnits = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tree = await clientFetch<UnitNode[]>('/api/v1/iam/units/tree/', { method: 'GET' });
      const flat = flattenUnitTree(tree);

      const enriched = await Promise.all(
        flat.map(async (node) => {
          try {
            const detail = await clientFetch<UnitDetail>(`/api/v1/iam/units/${node.id}/detail/`, { method: 'GET' });
            return {
              ...node,
              staffCount: detail.total_staff,
              studentCount: detail.students_capacity > 0 ? detail.students_capacity : undefined,
              boundWorkflows: detail.bound_clearance_processes?.map((p: unknown) =>
                typeof p === 'string' ? p : (p as { name?: string })?.name ?? 'Workflow'
              ) ?? [],
            };
          } catch {
            return node;
          }
        })
      );

      setNodes(enriched);
      if (enriched.length > 0) {
        setSelectedNodeId(enriched[0].id);
        const rootIds = enriched.filter(n => n.parentId === null).reduce((acc, n) => ({ ...acc, [n.id]: true }), {} as Record<string, boolean>);
        setExpandedNodes(rootIds);
      }
    } catch (err) {
      const message = err instanceof ClientApiError ? err.message : 'Failed to load organizational units.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUnits(); }, [fetchUnits]);

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

  const executeMove = async () => {
    if (!pendingMove) return;
    setIsSaving(true);
    try {
      await clientFetch(`/api/v1/iam/units/${pendingMove.nodeId}/`, {
        method: 'PATCH',
        body: { parent_id: pendingMove.newParentId },
      });
      const updated = nodes.map(n => n.id === pendingMove.nodeId ? { ...n, parentId: pendingMove.newParentId } : n);
      setNodes(updated);
      if (pendingMove.newParentId) setExpandedNodes(prev => ({ ...prev, [pendingMove.newParentId!]: true }));
    } catch (err) {
      alert(err instanceof ClientApiError ? err.message : 'Failed to move unit.');
    } finally {
      setPendingMove(null);
      setIsSaving(false);
    }
  };

  const handleCreateUnit = async () => {
    if (!newNodeData.name?.trim()) return;
    setIsSaving(true);
    try {
      const payload = orgNodeToCreatePayload(newNodeData);
      const created = await clientFetch<UnitNode>('/api/v1/iam/units/', {
        method: 'POST',
        body: payload,
      });

      const node: OrgNode = {
        id: created.id,
        name: created.name,
        type: newNodeData.type || 'department',
        staffCount: 0,
        studentCount: newNodeData.type === 'faculty' || newNodeData.type === 'department' ? 0 : undefined,
        allowedDomains: newNodeData.allowedDomains || [],
        boundWorkflows: newNodeData.boundWorkflows || [],
        parentId: newNodeData.parentId || null,
      };

      setNodes(prev => [...prev, node]);
      setSelectedNodeId(node.id);
      setIsAddModalOpen(false);
      setNewNodeData({ name: '', type: 'department', staffCount: 5, studentCount: 100, allowedDomains: [], boundWorkflows: [] });
    } catch (err) {
      alert(err instanceof ClientApiError ? err.message : 'Failed to create unit.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateUnit = async () => {
    if (!editNodeData.id || !editNodeData.name?.trim()) return;
    setIsSaving(true);
    try {
      await clientFetch(`/api/v1/iam/units/${editNodeData.id}/`, {
        method: 'PATCH',
        body: {
          name: editNodeData.name.trim(),
          unit_type: editNodeData.type === 'faculty' ? 'academic' : editNodeData.type === 'division' ? 'non-academic' : editNodeData.type,
        },
      });

      setNodes(prev => prev.map(n => n.id === editNodeData.id ? {
        ...n,
        name: editNodeData.name!.trim(),
        type: editNodeData.type!,
        staffCount: Number(editNodeData.staffCount) || 0,
        studentCount: editNodeData.type === 'faculty' || editNodeData.type === 'department' ? Number(editNodeData.studentCount) || 0 : undefined,
        allowedDomains: editNodeData.allowedDomains || [],
        boundWorkflows: editNodeData.boundWorkflows || []
      } as OrgNode : n));

      setIsEditModalOpen(false);
    } catch (err) {
      alert(err instanceof ClientApiError ? err.message : 'Failed to update unit.');
    } finally {
      setIsSaving(false);
    }
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
    setNodes(updated);
    setSelectedNodeId(updated[0]?.id || '');
  };

  if (isLoading) {
    return (
      <div className="w-full bg-bg-dark text-[#E0E0E0] rounded-2xl border border-white/10 h-162.5 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          <span>Loading organizational units...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-bg-dark text-[#E0E0E0] rounded-2xl border border-white/10 h-162.5 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-rose-400 text-sm">{error}</p>
          <button onClick={fetchUnits} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white rounded-xl cursor-pointer">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-dark text-[#E0E0E0] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-162.5 shadow-2xl relative z-10">
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
