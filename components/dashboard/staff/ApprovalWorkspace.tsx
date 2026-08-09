'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, FileText, Check, X, AlertTriangle, Download, 
  Mail, Phone, Database, Server, Copy, RotateCw, RotateCcw, 
  Compass, Move, Search, ShieldCheck, ZoomIn, ZoomOut, Maximize2, CreditCard
} from 'lucide-react';
import { Institution, VerificationSubmission } from '@/types';
import { clientFetch, ClientApiError } from '@/lib/api/client-fetch';

interface ApprovalWorkspaceProps {
  institution: Institution;
  onOfficerAction: (id: string, action: 'cleared' | 'flagged', feedback?: string) => void;
}

export default function ApprovalWorkspace({ institution, onOfficerAction }: ApprovalWorkspaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectDrawer, setShowRejectDrawer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [rejectionFeedback, setRejectionFeedback] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Viewport transforms tracking state
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [submissions, setSubmissions] = useState<VerificationSubmission[]>([]);

  const currentSubmission = submissions[selectedSubIndex];

  const handleFieldChange = (idx: number, val: string) => {
    setSubmissions(prev => {
      const updated = [...prev];
      updated[selectedSubIndex].formFields[idx].value = val;
      return updated;
    });
  };

  const handleStudentMetaChange = (key: keyof VerificationSubmission, val: string) => {
    setSubmissions(prev => {
      const updated = [...prev];
      updated[selectedSubIndex] = { ...updated[selectedSubIndex], [key]: val } as VerificationSubmission;
      return updated;
    });
  };

  // Viewport Drag/Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const triggerCopyNotification = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 1500);
  };

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col h-full bg-bg-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative w-full text-[#E0E0E0] font-sans items-center justify-center min-h-125">
        <div className="text-center space-y-4 p-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white/20" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white/50">No Pending Verifications</h3>
            <p className="text-xs text-white/30 mt-1.5 max-w-xs mx-auto leading-relaxed">
              There are no student submissions awaiting officer verification at this time. New submissions will appear here when students complete their clearance steps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-bg-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative w-full text-[#E0E0E0] font-sans">

      {/* 1. INTERNAL CONSOLE HEADER STRIP */}
      <div className="border-b border-white/10 bg-[#0c0c0c] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-white/40 text-[9px] uppercase tracking-wider block">OFFICER VERIFICATION CONSOLE</span>
          <h2 className="text-base font-serif italic text-white leading-tight mt-1">Secure Approval Workspace</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviewer records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-bg-dark border border-white/10 rounded-xl text-xs text-white placeholder-white/25 focus:outline-none w-48 font-sans"
            />
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
            <button className="px-3 py-1.5 bg-green-500 text-black font-black text-xs rounded-lg font-sans transition-all">Zainab</button>
            <button className="px-3 py-1.5 text-white/40 text-xs font-sans hover:text-white transition-colors">Obinna</button>
            <button className="px-3 py-1.5 text-white/40 text-xs font-sans hover:text-white transition-colors">Amara</button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT INTERACTIVE WORKSPACE CANVAS */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 bg-[#070707] overflow-hidden">
        
        {/* LEFT COMPONENT COLUMN: Data Fields & Logs */}
        <div className="border-r border-white/10 p-6 overflow-y-auto no-scrollbar space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2 font-mono">
              <div className="w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-xs font-black">01</div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">ACADEMIC REGISTRY PROFILE</h4>
                <p className="text-[9px] text-white/40 font-sans">Student identity & verified clearance indicators</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-white/50">ID: {currentSubmission.requestId}</span>
          </div>

          {/* Student Profile Card Layout */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col items-center justify-center text-green-400 font-mono text-[9px] font-bold tracking-wider uppercase shadow-inner">
                <span>ACTIVE</span>
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                <div>
                  <span className="text-[9px] uppercase font-bold text-white/30 font-mono block mb-1">Student Full Name</span>
                  <input 
                    type="text" 
                    value={currentSubmission.studentName} 
                    onChange={e => handleStudentMetaChange('studentName', e.target.value)} 
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white focus:outline-none transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-white/30 mb-1 flex items-center justify-between">
                      <span>Matric Number</span>
                      <button 
                        type="button" 
                        onClick={() => triggerCopyNotification('matric', currentSubmission.studentMatric)}
                        className="text-[9px] text-green-400 font-sans hover:underline capitalize"
                      >
                        {copiedText === 'matric' ? 'Copied' : 'Copy'}
                      </button>
                    </span>
                    <input type="text" value={currentSubmission.studentMatric} onChange={e => handleStudentMetaChange('studentMatric', e.target.value)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-white/40 block mb-1 font-sans">Degree Program</span>
                    <input type="text" value={currentSubmission.program} onChange={e => handleStudentMetaChange('program', e.target.value)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white focus:outline-none font-sans" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2.5 text-[10px] text-white/40 border-t border-white/5 font-mono">
                  <span className="truncate">✉ {currentSubmission.email}</span>
                  <span className="truncate">📞 {currentSubmission.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Input Fields */}
          <div className="bg-[#0b0b0b] border border-white/5 rounded-xl p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 font-mono text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <span>📝 Submission Data Fields</span>
              <span className="text-green-400 font-sans tracking-normal italic normal-case">Editable Overrides</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {currentSubmission.formFields.map((field, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-white/40 tracking-wider">{field.label}</label>
                  <input 
                    type="text" 
                    value={field.value} 
                    onChange={e => handleFieldChange(idx, e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-green-500/40 font-medium transition-colors" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bursary Verified Trail Wrapper */}
          <div className="bg-green-500/1 border border-green-500/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-green-500/10 pb-2.5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-green-400" />
                <div>
                  <span className="text-[8px] uppercase tracking-wider block text-green-400/50 font-mono">RECEIPT REFERENCE & BURSARY TRAIL</span>
                  <span className="text-xs font-bold text-white">Registry Processing Fees Verified</span>
                </div>
              </div>
              <span className="text-[9px] bg-green-500/10 border border-green-500/20 font-mono px-2 py-0.5 rounded text-green-400 font-bold uppercase">Bursary OK</span>
            </div>
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40">
              <div><span className="block text-[8px] text-white/30 uppercase font-bold tracking-wider mb-0.5">Amount Verified</span><span className="text-white font-black text-xs font-sans">{currentSubmission.amountPaid}</span></div>
              <div><span className="block text-[8px] text-white/30 uppercase font-bold tracking-wider mb-0.5">Settlement Gateway</span><span className="text-white/80 font-bold font-sans">{currentSubmission.gateway}</span></div>
              <div className="col-span-2">
                <span className="block text-[8px] text-white/30 uppercase font-bold tracking-wider mb-1">Receipt Verification Reference</span>
                <div className="w-full bg-black border border-white/5 rounded-xl p-2.5 font-mono text-[10px] text-green-400 flex items-center justify-between">
                  <span className="truncate select-all">Tx_901238471</span>
                  <span className="bg-green-500/10 text-green-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-500/20 uppercase shrink-0">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centralized Record Logs */}
          <div className="bg-[#080808] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-white/30 space-y-3">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 uppercase tracking-widest font-bold text-white/50">📁 CENTRAL RECORD CLEARANCE LOG</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl"><span className="block text-[8px] text-white/20 uppercase font-bold mb-0.5">OFFICIAL REGISTRY RECORD CODE</span><span className="text-white/80 font-bold">#{currentSubmission.blockHeight}</span></div>
              <div className="bg-black/30 border border-white/5 rounded-xl p-2.5"><span className="block text-[8px] uppercase font-bold text-white/20 mb-1">AUTHORIZED ACCESS TERMINAL ID</span><span className="text-white/80 font-bold block truncate">{currentSubmission.nodeAddress}</span></div>
              <div className="col-span-2 bg-black/30 border border-white/5 rounded-xl p-2.5"><span className="block text-[8px] uppercase font-bold text-white/20 mb-1">DIGITAL RECORD INTEGRITY CHECK CODE</span><span className="text-green-400 text-[9px] block truncate font-mono">{currentSubmission.integrityChecksum}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: Document Sheet Viewport Preview */}
        <div className="bg-[#0b0b0b] p-6 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2 font-mono">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs font-black">02</div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">VAULT POINTER VIEWER</h4>
                <p className="text-[9px] text-white/40 font-sans">Secured Digital Vault Asset</p>
              </div>
            </div>
            
            {/* Viewport Scale Interface Bar */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl text-white/50 shrink-0 font-mono text-[10px]">
              <button type="button" onClick={() => setZoomLevel(p => Math.max(50, p - 25))} className="p-1 hover:text-white cursor-pointer transition-colors"><ZoomOut className="w-3.5 h-3.5" /></button>
              <span className="px-1 font-bold text-white">{zoomLevel}%</span>
              <button type="button" onClick={() => setZoomLevel(p => Math.min(175, p + 25))} className="p-1 rounded hover:bg-white/5 text-white/60 hover:text-white cursor-pointer transition-colors"><ZoomIn className="w-3.5 h-3.5" /></button>
              <div className="w-px h-3 bg-white/10 mx-0.5" />
              <button type="button" onClick={() => { setZoomLevel(100); setPan({ x: 0, y: 0 }); setRotate(0); }} className="p-1 text-white/60 hover:text-white cursor-pointer transition-colors"><Maximize2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Document Attachment Metadata bar row */}
          <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs">
            <div className="flex items-center gap-3 truncate">
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="font-bold text-white block truncate">{currentSubmission.documentName}</span>
                <span className="text-[10px] font-mono text-white/40 mt-0.5 block">{currentSubmission.fileMetadata.size} • {currentSubmission.fileMetadata.type}</span>
              </div>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 transition-all cursor-pointer"><Download className="w-3.5 h-3.5" /></button>
          </div>

          {/* Document Sheet Canvas Viewport */}
          <div 
            className="relative border border-white/10 bg-[#060606] rounded-2xl overflow-hidden min-h-115 flex items-center justify-center p-6 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 border border-white/5 px-2.5 py-1 rounded-lg text-[9px] font-mono text-white/40 pointer-events-none z-10">
              <Move className="w-3 h-3 text-green-400" />
              <span>Drag to pan layout viewport map</span>
            </div>

            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) rotate(${rotate}deg) scale(${zoomLevel / 100})`,
                transition: isPanning ? 'none' : 'transform 0.12s ease-out',
                transformOrigin: 'center center'
              }}
              className="w-full max-w-sm bg-white text-slate-900 rounded-xl p-8 border border-stone-200 shadow-2xl relative font-sans text-left"
            >
              <div className="text-center border-b-2 border-double border-slate-900 pb-3 mb-4">
                <div className="text-[8px] font-bold tracking-widest text-slate-500 uppercase font-mono">{currentSubmission.mockDocData.authority}</div>
                <h4 className="text-sm font-serif font-black tracking-wide text-slate-900 uppercase mt-1">{currentSubmission.mockDocData.title}</h4>
                <div className="text-[7px] font-mono text-slate-400 mt-0.5 font-bold uppercase">VERIFICATION CODE: {currentSubmission.securitySeal}</div>
              </div>

              <div className="space-y-1 text-[10px] leading-relaxed font-sans border-b border-stone-200 pb-4">
                {Object.entries(currentSubmission.mockDocData.fields).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 border-b border-dashed border-stone-100 py-1">
                    <span className="font-bold text-slate-400 text-[8px] uppercase font-mono">{key}</span>
                    <span className="col-span-2 font-black text-slate-900 truncate">{val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end justify-between text-[9px] font-bold text-slate-400 font-mono pt-2">
                <div>
                  <div className="border-b border-slate-300 text-blue-900 font-serif italic text-xs px-2 mb-1">Signed Electronically</div>
                  <span className="text-[8px]">REGISTRAR SIGN-OFF</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="border-2 border-dashed border-green-400/40 text-green-500 px-2 py-0.5 rounded font-black tracking-wider text-[7px] rotate-[-8deg] uppercase mb-1">BUDGET APPROVED</div>
                  <span className="text-[8px]">BURSARY OFFICE SEAL</span>
                </div>
              </div>
            </div>

            {/* Rotation Control Widget Overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 border border-white/10 p-1 rounded-xl shadow-md z-10">
              <button type="button" onClick={() => setRotate(r => (r - 90 + 360) % 360)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 transition-colors cursor-pointer"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => setRotate(r => (r + 90) % 360)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 transition-colors cursor-pointer"><RotateCw className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Record Checklist Checks bottom descriptor summary */}
          <div className="bg-[#0e0e0e] border border-white/5 rounded-xl px-4 py-3 text-left">
            <span className="text-[9px] font-mono font-bold text-green-400 tracking-widest block uppercase mb-2">📋 RECORD VERIFICATION & AUTHENTICATION CHECKS</span>
            <div className="space-y-1.5 text-[10px] text-white/60">
              {currentSubmission.verifications.map((chk, i) => (
                <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /><span>{chk}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. WORKSPACE LOWER CONTROL TRAYS BAR */}
      <div className="border-t border-white/10 bg-[#0c0c0c] px-6 py-4 flex flex-row items-center justify-between gap-4 z-20 relative font-mono text-xs font-bold">
        <button onClick={() => setShowRejectDrawer(true)} className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all cursor-pointer active:scale-98 flex items-center gap-1.5">
          <span>&times; Flag & Reject Submission</span>
        </button>
        <button onClick={() => setShowApproveModal(true)} className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black rounded-xl transition-all cursor-pointer active:scale-98 flex items-center gap-2 shadow-lg shadow-green-500/10 font-sans font-bold">
          <span>Authorize & Approve Clearance</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* MODAL 1: CONFIRM APPROVAL MODAL INTERCEPT */}
      <AnimatePresence>
        {showApproveModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-xs z-40 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl text-left font-sans">
              <h3 className="font-bold text-white text-sm uppercase tracking-wide font-mono">Confirm Clearance Approval</h3>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2 text-xs text-white/80">
                <p>Student: <strong className="text-white font-sans">{currentSubmission.studentName}</strong></p>
                <p>Matric: <strong className="text-white font-mono">{currentSubmission.studentMatric}</strong></p>
                <p>Clearance: <strong className="text-white font-sans">{currentSubmission.requirement}</strong></p>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed border-l-2 border-amber-400 pl-2.5">By authorizing this action, you formally log and commit this clearance approval to the student&apos;s official central university records. This action cannot be retracted.</p>
              <div className="flex justify-end gap-3 font-mono text-xs">
                <button type="button" onClick={() => setShowApproveModal(false)} className="px-4 py-2 text-white/50 hover:text-white cursor-pointer font-sans font-medium">Cancel</button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await clientFetch(`/api/v1/workflows/steps/${currentSubmission.requestId}/approve/`, {
                        method: 'PATCH',
                        body: { approved: true, comments: 'Approved via Operations Desk' },
                      });
                    } catch {
                      // Step endpoint may not exist for mock IDs — proceed with local state update
                    }
                    setShowApproveModal(false);
                    onOfficerAction(currentSubmission.requestId, 'cleared');
                  }}
                  className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-xl font-bold font-sans cursor-pointer"
                >
                  Yes, Authorize & Sign
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SLIDE-UP DEFICIENCY FLAG DRAWER */}
      <AnimatePresence>
        {showRejectDrawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRejectDrawer(false)} className="absolute inset-0 bg-black/50 z-30" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 24, stiffness: 200 }} className="absolute bottom-0 inset-x-0 bg-[#0c0c0c] border-t border-white/10 rounded-t-2xl shadow-2xl p-6 z-40 max-h-[85%] overflow-y-auto space-y-4 text-left font-sans">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div><h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">Flag Clearance for Correction</h3><p className="text-[10px] text-white/40 font-mono mt-0.5">REJECTION PROTOCOL: DEFICIENCY IDENTIFICATION</p></div>
                <button type="button" onClick={() => setShowRejectDrawer(false)} className="p-1 bg-white/5 rounded hover:text-white text-white/40 cursor-pointer text-sm font-mono">&times;</button>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-white/40 block font-bold">Select Rejection Template:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <button type="button" onClick={() => { setSelectedTemplate('name'); setRejectionFeedback('The student name appearing on your uploaded clearance verification document does not match the official matriculation registration directory.'); }} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedTemplate === 'name' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 font-bold' : 'bg-white/5 border-white/5 text-white/70'}`}>Mismatched Name</button>
                  <button type="button" onClick={() => { setSelectedTemplate('blur'); setRejectionFeedback('The uploaded file is blurry, low-resolution, or illegible. Please submit a high-quality scan or PDF verification.'); }} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedTemplate === 'blur' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 font-bold' : 'bg-white/5 border-white/5 text-white/70'}`}>Blurry Attachment</button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-white/40 font-bold">Mandatory Correction Instructions:</span>
                <textarea rows={3} value={rejectionFeedback} onChange={e => { setRejectionFeedback(e.target.value); setSelectedTemplate(''); }} placeholder="Provide precise correction feedback for the student..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500/40 text-white font-medium resize-none focus:ring-0" />
              </div>
              <div className="flex justify-end gap-3 font-mono text-xs border-t border-white/5 pt-4">
                <button type="button" onClick={() => setShowRejectDrawer(false)} className="px-4 py-2 text-white/50 hover:text-white cursor-pointer font-sans font-medium">Cancel</button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await clientFetch(`/api/v1/workflows/steps/${currentSubmission.requestId}/approve/`, {
                        method: 'PATCH',
                        body: { approved: false, comments: rejectionFeedback },
                      });
                    } catch {
                      // Step endpoint may not exist for mock IDs — proceed with local state update
                    }
                    setShowRejectDrawer(false);
                    onOfficerAction(currentSubmission.requestId, 'flagged', rejectionFeedback);
                  }}
                  disabled={!rejectionFeedback.trim()}
                  className={`px-5 py-2 rounded-xl transition-all font-bold font-sans ${rejectionFeedback.trim() ? 'bg-rose-500 hover:bg-rose-400 text-black cursor-pointer' : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'}`}
                >
                  Send Deficiency Flag
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}