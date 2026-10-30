'use client';

import React, { useState } from 'react';
import type { VaultDocument } from '@/data/studentVault';

interface DocumentDetailsModalProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveTitle: (documentId: string, newTitle: string) => void;
}

function PencilEditIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M13.75 3.25C14.1478 2.85218 14.6874 2.62866 15.25 2.62866C15.8126 2.62866 16.3522 2.85218 16.75 3.25C17.1478 3.64782 17.3713 4.18739 17.3713 4.75C17.3713 5.31261 17.1478 5.85218 16.75 6.25L6.625 16.375L2.5 17.5L3.625 13.375L13.75 3.25Z"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
        stroke="#5E7165"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface DocumentDetailsDialogProps {
  document: VaultDocument;
  onClose: () => void;
  onSaveTitle: (documentId: string, newTitle: string) => void;
}

function DocumentDetailsDialog({
  document,
  onClose,
  onSaveTitle,
}: DocumentDetailsDialogProps) {
  const [title, setTitle] = useState(document.name);
  const [isSaving, setIsSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !title.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!title.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      onSaveTitle(document.id, title.trim());
      setIsSaving(false);
      onClose();
    }, 200);
  };

  return (
    <div className="relative w-full max-w-[520px] rounded-[20px] bg-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
      {/* Header matching Figma [205:13643] (520x98, pad=[22,24,22,24], gap=14) */}
      <div className="flex items-center justify-between px-6 py-[22px] border-b border-[#F0F4F1] shrink-0">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Icon [205:13644] (44x44, r=12, fill=#F0FDF4) */}
          <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
            <PencilEditIcon />
          </div>
          {/* Titles [205:13648] (gap=4) */}
          <div className="min-w-0">
            <h3 className="text-[20px] font-bold text-[#13241A] font-jakarta leading-tight">
              Document details
            </h3>
            <p className="text-[14px] text-[#5E7165] font-sans mt-1">
              Change the title. Your original file stays unchanged.
            </p>
          </div>
        </div>

        {/* Close [205:13651] (36x36, r=10, fill=#F7FBF8) */}
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-[10px] bg-[#F7FBF8] flex items-center justify-center text-[#5E7165] hover:bg-[#EEF4F0] transition-colors cursor-pointer shrink-0 ml-4"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Form Body matching Figma [205:13655] (520x339, pad=[0,24,24,24], gap=20) */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 pt-5 space-y-5">
          {/* Field [205:13656] (472x106, gap=8) */}
          <div className="space-y-2">
            <label
              htmlFor="document-title"
              className="block text-[14px] font-medium text-[#13241A] font-sans"
            >
              Document title
            </label>
            <input
              id="document-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!touched) setTouched(true);
              }}
              placeholder="e.g. Department handover form"
              className={`w-full h-12 px-4 rounded-xl border text-[14px] font-sans text-[#13241A] placeholder-[#8A9A90] focus:outline-none transition-all ${
                isInvalid
                  ? 'border-[#D92D20] bg-[#FEF3F2]/20 focus:border-[#D92D20] focus:ring-2 focus:ring-[#D92D20]/10'
                  : 'border-[#16A34A] bg-white focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10'
              }`}
              required
            />
            {isInvalid ? (
              <span className="block text-[13px] text-[#D92D20] font-sans">
                Enter a title for this document.
              </span>
            ) : (
              <span className="block text-[13px] text-[#5E7165] font-sans">
                Shown in your vault and on your clearance steps.
              </span>
            )}
          </div>

          {/* File info box matching Figma [205:13661] (472x189, r=12, fill=#F7FBF8, stroke=#E2EBE5) */}
          <div className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] overflow-hidden divide-y divide-[#E2EBE5]">
            {/* Original file name [205:13662] 470x47, pad=[12,16,12,16], gap=16 */}
            <div className="px-4 py-3 flex items-center gap-4 text-[13px]">
              <span className="text-[#5E7165] text-[12px] font-semibold w-[140px] shrink-0 font-sans">
                Original file name
              </span>
              <span className="font-medium text-[#13241A] font-sans truncate flex-1" title={document.name}>
                {document.name}
              </span>
            </div>

            {/* Uploaded [205:13665] 470x47, pad=[12,16,12,16], gap=16 */}
            <div className="px-4 py-3 flex items-center gap-4 text-[13px]">
              <span className="text-[#5E7165] text-[12px] font-semibold w-[140px] shrink-0 font-sans">
                Uploaded
              </span>
              <span className="font-medium text-[#13241A] font-sans flex-1">
                {document.uploadedDate || '13 Oct 2026, 11:05'}
              </span>
            </div>

            {/* File [205:13668] 470x47, pad=[12,16,12,16], gap=16 */}
            <div className="px-4 py-3 flex items-center gap-4 text-[13px]">
              <span className="text-[#5E7165] text-[12px] font-semibold w-[140px] shrink-0 font-sans">
                File
              </span>
              <span className="font-medium text-[#13241A] font-sans flex-1">
                {document.type} · {document.size}
              </span>
            </div>

            {/* Used in [205:13671] 470x46, pad=[12,16,12,16], gap=16 */}
            <div className="px-4 py-3 flex items-center gap-4 text-[13px]">
              <span className="text-[#5E7165] text-[12px] font-semibold w-[140px] shrink-0 font-sans">
                Used in
              </span>
              <span className="font-medium text-[#13241A] font-sans truncate flex-1" title={document.clearanceCategory}>
                {document.clearanceCategory || 'Department Clearance'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider [205:13674] 520x1 fill=#E2EBE5 */}
        <div className="w-full h-px bg-[#E2EBE5]" />

        {/* Footer matching Figma [205:13675] (520x76, pad=[16,24,16,24], gap=12) */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white">
          {/* Button / Ghost [205:13676] (88x44, pad=[12,20,12,20], r=12) */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-[14px] font-semibold text-[#33463A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Button / Primary [205:13678] (135x44, pad=[12,20,12,20], r=12, fill=#15803D) */}
          <button
            type="submit"
            disabled={isSaving || !title.trim()}
            className={`px-5 py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer shadow-xs ${
              title.trim() && !isSaving
                ? 'bg-[#15803D] hover:bg-[#14532D] text-white'
                : 'bg-[#E2EBE5] text-[#8A9A90] cursor-not-allowed'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function DocumentDetailsModal({
  document,
  isOpen,
  onClose,
  onSaveTitle,
}: DocumentDetailsModalProps) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop matching Figma [205:13641] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Keyed Dialog resets state cleanly without useEffect */}
      <DocumentDetailsDialog
        key={document.id}
        document={document}
        onClose={onClose}
        onSaveTitle={onSaveTitle}
      />
    </div>
  );
}
