'use client';

import React from 'react';
import type { VaultDocument } from '@/data/studentVault';

interface DocumentPreviewModalProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onEditDetails?: (doc: VaultDocument) => void;
  onDownload?: (doc: VaultDocument) => void;
}

function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M14 2H6C4.89543 2 4 2.89543 4 4V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V6L14 2Z"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V6H18"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11H14M8 15H11"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
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

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <rect
        x="3"
        y="6.5"
        width="10"
        height="7.5"
        rx="2"
        stroke="#15803D"
        strokeWidth="2"
      />
      <path
        d="M5.5 6.5V4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V6.5"
        stroke="#15803D"
        strokeWidth="2"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 3V11.5M9 11.5L5.5 8M9 11.5L12.5 8M3 14.5H15"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditPencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M12.75 2.25C13.1478 1.85218 13.6874 1.62866 14.25 1.62866C14.8126 1.62866 15.3522 1.85218 15.75 2.25C16.1478 2.64782 16.3713 3.18739 16.3713 3.75C16.3713 4.31261 16.1478 4.85218 15.75 5.25L5.625 15.375L1.5 16.5L2.625 12.375L12.75 2.25Z"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DocumentPreviewModal({
  document,
  isOpen,
  onClose,
  onEditDetails,
  onDownload,
}: DocumentPreviewModalProps) {
  if (!isOpen || !document) return null;

  const handleDownloadFile = () => {
    if (onDownload) {
      onDownload(document);
      return;
    }
    const blob = new Blob([`Simulated document content for ${document.name}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = document.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEditDetailsClick = () => {
    if (onEditDetails) {
      onEditDetails(document);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop matching Figma [205:5767] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma [205:5768] (960x682, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[960px] rounded-[20px] bg-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header matching Figma [205:5769] (960x98, pad=[22,24,22,24], gap=14) */}
        <div className="flex items-center justify-between px-6 py-[22px] border-b border-[#F0F4F1] shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Icon [205:5770] 44x44, r=12, fill=#F0FDF4 */}
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <FileIcon />
            </div>
            {/* Titles [205:5777] gap=4 */}
            <div className="min-w-0">
              <h3
                className="text-[20px] font-bold text-[#13241A] font-jakarta leading-tight truncate"
                title={document.name}
              >
                {document.name}
              </h3>
              <p className="text-[14px] text-[#5E7165] font-sans mt-1">
                {document.type} · {document.size} · 2 pages
              </p>
            </div>
          </div>

          {/* Close [205:5780] 36x36, r=10, fill=#F7FBF8 */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-[#F7FBF8] flex items-center justify-center text-[#5E7165] hover:bg-[#EEF4F0] cursor-pointer transition-colors shrink-0 ml-4"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body matching Figma [205:5784] (pad=[0,24,24,24], gap=16) */}
        <div className="p-6 pt-0 overflow-y-auto">
          {/* Preview Layout [205:5785] (912x560, gap=20, HORIZONTAL) */}
          <div className="flex flex-col lg:flex-row gap-5 items-start mt-6">
            {/* Preview Area [205:5786] (592x560, r=16, fill=#F7FBF8, stroke=#E2EBE5, pad=24) */}
            <div className="w-full lg:w-[592px] h-[560px] rounded-2xl bg-[#F7FBF8] border border-[#E2EBE5] p-6 flex items-center justify-center shrink-0">
              {/* Page [205:5787] (380x512, r=6, fill=#FFFFFF, stroke=#E2EBE5, pad=36, gap=12) */}
              <div className="w-[380px] h-[512px] rounded-[6px] bg-white border border-[#E2EBE5] p-9 flex flex-col justify-between select-none shadow-xs">
                {/* Header lines: [205:5788] 220x16 (#C9D8CE), [205:5789] 150x10 (#E2EBE5) */}
                <div className="space-y-2">
                  <div className="w-[220px] h-4 rounded-[3px] bg-[#C9D8CE]" />
                  <div className="w-[150px] h-2.5 rounded-[3px] bg-[#E2EBE5]" />
                </div>

                {/* Paragraph 1: [205:5790], [205:5791] 308x8, [205:5792] 200x8 */}
                <div className="space-y-2.5">
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[200px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                </div>

                {/* Paragraph 2: [205:5793], [205:5794] 308x8, [205:5795] 200x8 */}
                <div className="space-y-2.5">
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[200px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                </div>

                {/* Paragraph 3: [205:5796], [205:5797] 308x8, [205:5798] 200x8 */}
                <div className="space-y-2.5">
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[200px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                </div>

                {/* Section header [205:5799] 120x12 (#C9D8CE) & lines [205:5800-5804] */}
                <div className="space-y-2.5">
                  <div className="w-[120px] h-3 rounded-[3px] bg-[#C9D8CE]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[240px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[240px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                  <div className="w-[308px] h-2 rounded-[3px] bg-[#E2EBE5]" />
                </div>

                {/* Signatures [205:5805] 284x2 */}
                <div className="flex items-center justify-between w-[284px] pt-1">
                  <div className="w-[130px] h-0.5 rounded-[3px] bg-[#8A9A90]" />
                  <div className="w-[130px] h-0.5 rounded-[3px] bg-[#8A9A90]" />
                </div>
              </div>
            </div>

            {/* Details [205:5808] (300x433, gap=16, VERTICAL) */}
            <div className="w-full lg:w-[300px] flex flex-col gap-4 shrink-0">
              {/* Detail item 1: Uploaded [205:5809] 300x44, gap=2 */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#5E7165] font-sans font-normal">
                  Uploaded
                </span>
                <span className="text-[14px] text-[#13241A] font-sans font-medium">
                  {document.uploadedDate || '13 Oct 2026, 11:05'}
                </span>
              </div>

              {/* Detail item 2: Clearance [205:5812] 300x44, gap=2 */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#5E7165] font-sans font-normal">
                  Clearance
                </span>
                <span className="text-[14px] text-[#13241A] font-sans font-medium truncate" title={document.clearanceCategory}>
                  {document.clearanceCategory || 'Department Clearance'}
                </span>
              </div>

              {/* Detail item 3: Reviewed by [205:5815] 300x44, gap=2 */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#5E7165] font-sans font-normal">
                  Reviewed by
                </span>
                <span className="text-[14px] text-[#13241A] font-sans font-medium">
                  {document.verifiedBy || 'Head of Department'}
                </span>
              </div>

              {/* Detail item 4: Reviewed on [205:5818] 300x44, gap=2 */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#5E7165] font-sans font-normal">
                  Reviewed on
                </span>
                <span className="text-[14px] text-[#13241A] font-sans font-medium">
                  {document.verifiedAt || '14 Oct 2026, 16:40'}
                </span>
              </div>

              {/* Divider [205:5821] 300x1, fill=#E2EBE5 */}
              <div className="w-full h-px bg-[#E2EBE5]" />

              {/* Note [205:5822] (300x66, pad=[12,14,12,14], gap=10, r=12, fill=#F0FDF4, stroke=#BBF7D0) */}
              <div className="w-full rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-3 flex items-start gap-2.5">
                <LockIcon />
                <p className="text-[13px] text-[#33463A] leading-5 font-sans">
                  Documents from approved steps are locked and cannot be replaced.
                </p>
              </div>

              {/* Button / Outline [205:5827] Download (300x46, pad=[12,20,12,20], gap=8, r=12, fill=#FFFFFF, stroke=#16A34A) */}
              <button
                type="button"
                onClick={handleDownloadFile}
                className="w-full h-[46px] px-5 py-3 rounded-xl border border-[#16A34A] bg-white hover:bg-[#F7FBF8] flex items-center justify-center gap-2 text-[14px] font-semibold text-[#15803D] cursor-pointer transition-colors shadow-xs"
              >
                <DownloadIcon />
                <span>Download</span>
              </button>

              {/* Button / Outline [205:5833] Edit details (300x46, pad=[12,20,12,20], gap=8, r=12, fill=#FFFFFF, stroke=#16A34A) */}
              <button
                type="button"
                onClick={handleEditDetailsClick}
                className="w-full h-[46px] px-5 py-3 rounded-xl border border-[#16A34A] bg-white hover:bg-[#F7FBF8] flex items-center justify-center gap-2 text-[14px] font-semibold text-[#15803D] cursor-pointer transition-colors shadow-xs"
              >
                <EditPencilIcon />
                <span>Edit details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
