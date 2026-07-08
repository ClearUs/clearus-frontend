'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ExternalLink } from 'lucide-react';
import { Institution, CapabilityMeta } from '@/types';

interface EmailInviteData {
  name: string;
  email: string;
  staffId: string;
  assignedCell: string;
  permissions: string[];
}

interface InvitationEmailModalProps {
  inviteData: EmailInviteData | null;
  onClose: () => void;
  institution: Institution;
  capabilitiesMetadata: CapabilityMeta[];
  onCompleteActivation: () => void;
}

export default function InvitationEmailModal({
  inviteData, onClose, institution, capabilitiesMetadata, onCompleteActivation
}: InvitationEmailModalProps) {
  if (!inviteData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-lg bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left"
        >
          {/* SMTP Header */}
          <div className="bg-neutral-900 border-b border-white/5 px-5 py-4 flex items-center justify-between font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-bold text-amber-400 uppercase tracking-wider">Portal SMTP Transaction Relay [Module 5 Active]</span>
            </div>
            <button type="button" onClick={onClose} className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
          </div>

          {/* Envelope Grid */}
          <div className="p-4 bg-neutral-950/60 border-b border-white/5 space-y-2 text-xs font-mono text-white/70">
            <p><span className="text-white/30 inline-block w-16 text-right mr-2">From:</span><span className="text-amber-400 font-bold">Academic Registry &lt;no-reply@${institution.code.toLowerCase()}.edu.ng&gt;</span></p>
            <p><span className="text-white/30 inline-block w-16 text-right mr-2">To:</span><span className="text-emerald-400 font-bold">{inviteData.email}</span></p>
            <p><span className="text-white/30 inline-block w-16 text-right mr-2">Subject:</span><span className="text-white/90">Action Required: Activate Account (ID: {inviteData.staffId})</span></p>
          </div>

          {/* Contents Body */}
          <div className="p-6 md:p-8 space-y-5 text-xs text-white/70 max-h-87.5] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /><span className="font-serif italic text-white text-sm font-medium">{institution.name}</span></div>
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase font-bold">Official Credential</span>
            </div>
            <p className="font-bold text-white font-sans text-xs">Hello {inviteData.name},</p>
            <p className="leading-relaxed">You have been authorized as an official Clearance Officer under the <strong className="text-white">{inviteData.assignedCell}</strong> unit. Please complete your passcode encryption parameters below.</p>

            <div className="p-4 bg-neutral-900 border border-white/5 rounded-xl space-y-2">
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest block">Assigned Privileges Scope</span>
              <div className="flex flex-wrap gap-1">
                {inviteData.permissions.map(perm => (
                  <span key={perm} className="px-2 py-0.5 bg-[#080808] border border-white/5 rounded font-mono text-[9px]">
                    {capabilitiesMetadata.find(c => c.key === perm)?.label || perm}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={onCompleteActivation}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Complete Portal Activation</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}