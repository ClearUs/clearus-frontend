'use client';

import React from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, Move, Building, Layers, GraduationCap, FileCheck } from 'lucide-react';
import { OrgNode, Institution } from '@/types';

interface OrgTreePanelProps {
  institution: Institution;
  nodes: OrgNode[];
  selectedNodeId: string;
  setSelectedNodeId: (id: string) => void;
  expandedNodes: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  dragOverNodeId: string | null;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent, parentId: string | null) => void;
  onOpenAddModal: (parentId: string | null) => void;
  onOpenEditModal: (node: OrgNode) => void;
  onDeleteUnit: (id: string) => void;
}

export default function OrgTreePanel({
  institution,
  nodes,
  selectedNodeId,
  setSelectedNodeId,
  expandedNodes,
  toggleExpand,
  dragOverNodeId,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteUnit
}: OrgTreePanelProps) {
  
  const renderIcon = (type: OrgNode['type']) => {
    switch (type) {
      case 'faculty': return <Building className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'division': return <Layers className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'department': return <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'desk': return <FileCheck className="w-4 h-4 text-indigo-400 shrink-0" />;
    }
  };

  const renderTreeNode = (node: OrgNode, depth = 0): React.ReactNode => {
    const children = nodes.filter(n => n.parentId === node.id);
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = selectedNodeId === node.id;
    const isDragOver = dragOverNodeId === node.id;

    return (
      <div key={node.id} className="relative select-none w-full">
        {depth > 0 && (
          <div 
            className="absolute -left-4 top-0 bottom-1/2 w-4 border-l border-b border-white/10 rounded-bl"
            style={{ left: `${(depth - 1) * 20 + 10}px` }}
          />
        )}

        <div
          draggable
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node.id)}
          onClick={() => setSelectedNodeId(node.id)}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          className={`group flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer border ${
            isSelected 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
              : isDragOver
              ? 'bg-green-500/20 border-green-400 border-dashed text-green-300'
              : 'border-transparent hover:bg-white/5 text-[#B0B0B0] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2 truncate min-w-0">
            {children.length > 0 ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
                className="p-0.5 rounded hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <span className="w-4.5" />
            )}
            {renderIcon(node.type)}
            <span className="text-xs font-semibold font-serif italic truncate">{node.name}</span>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent px-1 shrink-0">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpenAddModal(node.id); }}
              className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-white/50 transition-colors cursor-pointer"
              title="Add Nested Child Unit"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpenEditModal(node); }}
              className="p-1 rounded bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 text-white/50 transition-colors cursor-pointer"
              title="Modify Unit"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDeleteUnit(node.id); }}
              className="p-1 rounded bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-white/50 transition-colors cursor-pointer"
              title="Delete Unit"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {children.length > 0 && isExpanded && (
          <div className="mt-0.5 space-y-0.5 w-full">
            {children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootNodes = nodes.filter(n => n.parentId === null);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-linear-to-b from-[#080808] to-[#030303]">
      <div className="px-5 py-3 border-b border-white/5 bg-white/2 flex items-center justify-between text-xs">
        <span className="text-[10px] font-mono uppercase font-bold text-white/40 tracking-wider">
          {institution.shortName} Hierarchy Directory
        </span>
        <div className="text-[9px] text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/10 font-mono flex items-center gap-1">
          <Move className="w-3 h-3" /> Structure customization active
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, null)}
      >
        {rootNodes.length === 0 ? (
          <div className="text-center py-16 text-white/30 text-xs font-serif italic">
            No organizational hierarchy blocks defined. Use &apos;Add Unit&apos; to initialize directory logs.
          </div>
        ) : (
          rootNodes.map(node => renderTreeNode(node, 0))
        )}
      </div>
    </div>
  );
}