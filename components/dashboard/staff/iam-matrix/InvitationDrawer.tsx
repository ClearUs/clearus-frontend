'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Shield, AlertCircle, Building, Lock } from 'lucide-react';
import { Institution, CapabilityMeta, OrgNode } from '@/types';
import { createPortal } from 'react-dom';

interface InvitationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    institution: Institution;
    formError: string;
    firstName: string;
    setFirstName: (val: string) => void;
    lastName: string;
    setLastName: (val: string) => void;
    newStaffId: string;
    setNewStaffId: (val: string) => void;
    emailPrefix: string;
    setEmailPrefix: (val: string) => void;
    newCell: string;
    setNewCell: (val: string) => void;
    isTreeOpen: boolean;
    setIsTreeOpen: (open: boolean) => void;
    expandedNodes: string[];
    setExpandedNodes: (nodes: string[]) => void;
    newPermissions: string[];
    adminPermissions: string[];
    capabilitiesMetadata: CapabilityMeta[];
    onPermissionToggle: (perm: string) => void;
    onSelectAllInheritable: () => void;
    onSubmit: (e: React.SubmitEvent) => void;
}

export default function InvitationDrawer({
    isOpen, onClose, institution, formError,
    firstName, setFirstName, lastName, setLastName, newStaffId, setNewStaffId,
    emailPrefix, setEmailPrefix, newCell, setNewCell, isTreeOpen, setIsTreeOpen,
    expandedNodes, setExpandedNodes, newPermissions, adminPermissions,
    capabilitiesMetadata, onPermissionToggle, onSelectAllInheritable, onSubmit
}: InvitationDrawerProps) {
    const [mounted, setMounted] = React.useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal mount guard; standard client-only render pattern
    React.useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 cursor-pointer"
                    />
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#090909] border-l border-white/10 shadow-2xl p-6 flex flex-col h-full overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-amber-400" />
                                <h4 className="italic text-white text-base font-bold uppercase tracking-wider font-sans ">Create Staff Member</h4>
                            </div>
                            <button type="button" onClick={onClose} className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"><X className="w-4 h-4" /></button>
                        </div>

                        <form onSubmit={onSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-6 text-left">
                                {formError && (
                                    <div className="p-3 bg-rose-500/10 text-rose-400 text-xs font-semibold rounded-xl border border-rose-500/25 flex items-center gap-2 font-sans"><AlertCircle className="w-4 h-4 shrink-0" /><span>{formError}</span></div>
                                )}

                                {/* Identities fields */}
                                <div className="space-y-3.5">
                                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono block">System Identity</span>
                                    <div className="grid grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5 font-mono">First Name</label>
                                            <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="w-full bg-bg-dark border border-white/10 text-white text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/50 placeholder-white/20 font-sans" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5 font-mono">Last Name</label>
                                            <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="w-full bg-bg-dark border border-white/10 text-white text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/50 placeholder-white/20 font-sans" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5 font-mono">Employee ID</label>
                                            <input type="text" required value={newStaffId} onChange={e => setNewStaffId(e.target.value)} placeholder={`e.g. EMP/${institution.code}/101`} className="w-full bg-bg-dark border border-white/10 text-white text-xs font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/50 placeholder-white/20 font-mono uppercase" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5 font-mono">Institutional Email</label>
                                            <div className="relative flex items-center">
                                                <input type="text" required value={emailPrefix} onChange={e => setEmailPrefix(e.target.value)} placeholder="username" className="w-full bg-bg-dark border border-white/10 text-white text-xs font-medium rounded-xl pl-3.5 pr-28 py-2.5 focus:outline-none focus:border-amber-500/50 placeholder-white/20 font-mono" />
                                                <span className="absolute right-3 text-[10px] font-bold text-white/40 pointer-events-none font-mono">@{institution.code.toLowerCase()}.edu.ng</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Department tree nodes list selection */}
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono block">Department Binding</span>
                                    <div className="relative">
                                        <button type="button" onClick={() => setIsTreeOpen(!isTreeOpen)} className="w-full bg-bg-dark border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 flex items-center justify-between font-sans text-left cursor-pointer">
                                            <span className="flex items-center gap-2"><Building className="w-4 h-4 text-amber-500" /><span>{newCell}</span></span>
                                            <span className="text-white/40 text-[10px] font-mono">{isTreeOpen ? '▲' : '▼'}</span>
                                        </button>
                                        {isTreeOpen && (
                                            <div className="absolute z-50 left-0 right-0 mt-2 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl p-3 max-h-56 overflow-y-auto space-y-2 custom-scrollbar font-mono text-[11px]">
                                                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest pb-1 border-b border-white/5">Select Organizational Unit</div>
                                                <button type="button" onClick={() => { setExpandedNodes(expandedNodes.includes('academic') ? expandedNodes.filter(n => n !== 'academic') : [...expandedNodes, 'academic']); }} className="flex items-center gap-1.5 w-full text-left py-1 text-[9px] text-white/60 font-bold uppercase">
                                                    <span>{expandedNodes.includes('academic') ? '▼' : '▶'}</span>📂 Academic Units
                                                </button>
                                                {expandedNodes.includes('academic') && (
                                                    <div className="pl-3 border-l border-white/5 ml-1.5 flex flex-col">
                                                        {institution.departments.map(d => (
                                                            <button type="button" key={d} onClick={() => { setNewCell(d); setIsTreeOpen(false); }} className={`text-left py-1 px-2 rounded font-sans text-xs ${newCell === d ? 'text-amber-400 bg-white/5 font-bold' : 'text-white/70 hover:text-white'}`}>🎓 {d}</button>
                                                        ))}
                                                    </div>
                                                )}
                                                <button type="button" onClick={() => { setExpandedNodes(expandedNodes.includes('admin') ? expandedNodes.filter(n => n !== 'admin') : [...expandedNodes, 'admin']); }} className="flex items-center gap-1.5 w-full text-left py-1 text-[9px] text-white/60 font-bold uppercase">
                                                    <span>{expandedNodes.includes('admin') ? '▼' : '▶'}</span>📂 Support Divisions
                                                </button>
                                                {expandedNodes.includes('admin') && (
                                                    <div className="pl-3 border-l border-white/5 ml-1.5 flex flex-col">
                                                        {['Bursary Division', 'Student Affairs Division', 'Library Services', 'Sports & Recreation'].map(d => (
                                                            <button type="button" key={d} onClick={() => { setNewCell(d); setIsTreeOpen(false); }} className={`text-left py-1 px-2 rounded font-sans text-xs ${newCell === d ? 'text-amber-400 bg-white/5 font-bold' : 'text-white/70 hover:text-white'}`}>🏛️ {d}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Multi modules checks options loops */}
                                <div className="space-y-4 pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Explicit Privilege Assignment</span>
                                        <button type="button" onClick={onSelectAllInheritable} className="text-[10px] font-bold text-white/60 hover:text-white font-sans cursor-pointer">Inherit All Capabilities</button>
                                    </div>

                                    {['WORKFLOW', 'VAULT_CLEARANCE', 'UNIT_CELL_ADMIN'].map(modKey => (
                                        <div key={modKey} className="space-y-2">
                                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5 pb-1 font-mono">
                                                {modKey.replace('_', ' ')} Operations Controls
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5">
                                                {capabilitiesMetadata.filter(c => c.module === modKey).map(cap => {
                                                    const isInheritable = adminPermissions.includes(cap.key);
                                                    const isChecked = newPermissions.includes(cap.key);
                                                    return (
                                                        <div key={cap.key} className="flex items-start gap-2.5 font-sans">
                                                            <div className="relative flex items-center mt-0.5">
                                                                <input type="checkbox" checked={isChecked} disabled={!isInheritable} onChange={() => onPermissionToggle(cap.key)} className="rounded border-white/30 text-amber-500 focus:ring-0 bg-neutral-900 w-3.5 h-3.5 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" />
                                                            </div>
                                                            <div className="leading-tight">
                                                                <span className={`text-xs font-bold block ${isInheritable ? isChecked ? 'text-amber-400' : 'text-white/80' : 'text-white/20 line-through'}`}>{cap.label}</span>
                                                                <span className="text-[10px] text-white/40 block mt-0.5">{cap.description}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 mt-auto flex items-center justify-between font-sans text-xs">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/60 hover:text-white bg-white/5 transition-colors cursor-pointer font-bold">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-black tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer">Secure Issue Invitation</button>
                            </div>
                        </form>
                    </motion.div>
                </>

            )}
        </AnimatePresence>, document.body
    )
}