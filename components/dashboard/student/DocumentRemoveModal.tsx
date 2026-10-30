'use client';

import React, { useState } from 'react';
import type { VaultDocument } from '@/data/studentVault';

interface DocumentRemoveModalProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemove: (documentId: string) => void;
}

function TrashIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path
        d="M3.125 6.25H5.20833H21.875"
        stroke="#B42318"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33398 6.25V4.16667C8.33398 3.61439 8.7817 3.16667 9.33398 3.16667H15.584C16.1363 3.16667 16.584 3.61439 16.584 4.16667V6.25M19.709 6.25V20.8333C19.709 21.3856 19.2613 21.8333 18.709 21.8333H6.20898C5.6567 21.8333 5.20898 21.3856 5.20898 20.8333V6.25H19.709Z"
        stroke="#B42318"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.416 11.4583V16.6667M14.5827 11.4583V16.6667"
        stroke="#B42318"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DocumentRemoveModal({
  document,
  isOpen,
  onClose,
  onConfirmRemove,
}: DocumentRemoveModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !document) return null;

  const handleRemove = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onConfirmRemove(document.id);
      setIsDeleting(false);
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop matching Figma [205:11621] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma [205:11622] (440x306, pad=[32,32,32,32], gap=16, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[440px] rounded-[20px] bg-white shadow-2xl p-8 flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Status Icon [205:11623] (72x72, r=999, fill=#FEE4E2) */}
        <div className="w-[72px] h-[72px] rounded-full bg-[#FEE4E2] flex items-center justify-center shrink-0 mb-4">
          <TrashIcon />
        </div>

        {/* Title [205:11625] (font: Plus Jakarta Sans 700 24px, fill=#13241A) */}
        <h3 className="text-[24px] font-bold text-[#13241A] font-jakarta leading-tight mb-2">
          Remove this document?
        </h3>

        {/* Message [205:11626] (font: Inter 400 14px, line-height: 22px, fill=#5E7165, w=344) */}
        <p className="w-full max-w-[344px] text-[14px] text-[#5E7165] font-sans leading-[22px] mb-6">
          {document.name} will be deleted from your vault. You can upload it again at any time.
        </p>

        {/* Actions [205:11627] (gap=12, HORIZONTAL) */}
        <div className="flex items-center justify-center gap-3 w-full">
          {/* Button / Outline [205:11628] (90x46, pad=[12,20,12,20], r=12, fill=#FFFFFF, stroke=#16A34A) */}
          <button
            type="button"
            onClick={onClose}
            className="h-[46px] px-5 py-3 rounded-xl border border-[#16A34A] bg-white hover:bg-[#F7FBF8] text-[14px] font-semibold text-[#15803D] font-sans transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Button / Danger [205:11630] (95x44, pad=[12,20,12,20], r=12, fill=#B42318) */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={isDeleting}
            className="h-[44px] px-5 py-3 rounded-xl bg-[#B42318] hover:bg-[#911B13] text-[14px] font-semibold text-white font-sans transition-colors cursor-pointer shadow-xs disabled:opacity-60"
          >
            {isDeleting ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
}
