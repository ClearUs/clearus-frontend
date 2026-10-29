'use client';

import React from 'react';
import type { VaultDocument } from '@/data/studentVault';

interface DocumentPreviewModalProps {
  document: VaultDocument | null;
  mode: 'preview' | 'details';
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentPreviewModal({
  document,
  mode,
  isOpen,
  onClose,
}: DocumentPreviewModalProps) {
  if (!isOpen || !document) return null;

  const handleDownload = () => {
    // Simulated file download
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-140 rounded-2xl bg-white shadow-2xl border border-[#E2EBE5] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[#F0F4F1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#15803D]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M11.667 2.5H5.83366C4.91319 2.5 4.16699 3.24619 4.16699 4.16667V15.8333C4.16699 16.7538 4.91319 17.5 5.83366 17.5H14.167C15.0875 17.5 15.8337 16.7538 15.8337 15.8333V6.66667L11.667 2.5Z"
                  stroke="#15803D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.667 2.5V6.66667H15.8337"
                  stroke="#15803D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta">
                {mode === 'preview' ? 'Document Preview' : 'Document Details'}
              </h3>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {document.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F6D64] hover:bg-[#F3F6F4] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {mode === 'preview' ? (
            /* Document Preview Canvas */
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] p-8 min-h-64 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-20 bg-white border border-[#C9D8CE] rounded-lg shadow-sm flex flex-col items-center justify-center mb-3">
                  <span className="text-[11px] font-bold text-[#15803D] uppercase">
                    {document.type}
                  </span>
                  <div className="w-8 h-0.5 bg-[#E2EBE5] mt-2" />
                  <div className="w-6 h-0.5 bg-[#E2EBE5] mt-1" />
                </div>
                <h4 className="text-[15px] font-semibold text-[#13241A] font-jakarta mb-1">
                  {document.name}
                </h4>
                <p className="text-[12px] text-[#8A9A90]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {document.type} · {document.size} · Uploaded {document.uploadedDate}
                </p>
                <span className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D]">
                  {document.status === 'approved' ? 'Verified & Approved' : 'Under Review'}
                </span>
              </div>
            </div>
          ) : (
            /* Document Details Metadata Table */
            <div className="space-y-3.5 text-[13px]">
              <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                <span className="text-[#5F6D64]">Document Name</span>
                <span className="font-semibold text-[#13241A] font-jakarta">{document.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                <span className="text-[#5F6D64]">File Type & Size</span>
                <span className="font-medium text-[#13241A]">
                  {document.type} · {document.size}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                <span className="text-[#5F6D64]">Clearance Category</span>
                <span className="font-medium text-[#13241A]">{document.clearanceCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                <span className="text-[#5F6D64]">Upload Date</span>
                <span className="font-medium text-[#13241A]">{document.uploadedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                <span className="text-[#5F6D64]">Status</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium ${
                    document.status === 'approved'
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#FEF3C7] text-[#B45309]'
                  }`}
                >
                  {document.status === 'approved' ? 'Approved' : 'In review'}
                </span>
              </div>
              {document.verifiedBy && (
                <div className="flex justify-between py-2 border-b border-[#F0F4F1]">
                  <span className="text-[#5F6D64]">Verified By</span>
                  <span className="font-medium text-[#13241A]">
                    {document.verifiedBy} ({document.verifiedAt})
                  </span>
                </div>
              )}
              {document.checksum && (
                <div className="py-2">
                  <span className="block text-[#5F6D64] mb-1">Integrity Checksum</span>
                  <code className="block text-[11px] bg-[#F7FBF8] p-2 rounded border border-[#E2EBE5] text-[#13241A] break-all font-mono">
                    {document.checksum}
                  </code>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 px-6 bg-[#F7FBF8] border-t border-[#E2EBE5]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5F6D64] hover:bg-white hover:text-[#13241A] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-[#15803D] hover:bg-[#14532D] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5M2.5 13.5H13.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download file
          </button>
        </div>
      </div>
    </div>
  );
}
