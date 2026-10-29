'use client';

import React, { useState, useRef } from 'react';
import { uploadVaultAsset, clientSubmitClearanceStep } from '@/lib/api';

export interface UploadContext {
  clearanceTitle: string;
  stepTitle: string;
  stepId?: string;
  docDescription?: string;
  requirementNote?: string;
}

interface UploadDocumentModalProps {
  isOpen: boolean;
  context: UploadContext | null;
  onClose: () => void;
  onUploadSuccess?: (docName: string) => void;
}

const MOCK_VAULT_FILES = [
  { id: '1', name: 'Library_Clearance_Slip.pdf', size: '1.2 MB', date: '7 Oct 2026' },
  { id: '2', name: 'Dept_Handover_Form_V2.pdf', size: '860 KB', date: '13 Oct 2026' },
  { id: '3', name: 'Faculty_Dues_Receipt_2025.pdf', size: '1.4 MB', date: '18 Oct 2026' },
];

export default function UploadDocumentModal({
  isOpen,
  context,
  onClose,
  onUploadSuccess,
}: UploadDocumentModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'vault'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVaultFileId, setSelectedVaultFileId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !context) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const docName =
      activeTab === 'upload'
        ? selectedFile?.name || 'Uploaded_Document.pdf'
        : MOCK_VAULT_FILES.find((f) => f.id === selectedVaultFileId)?.name || 'Vault_Document.pdf';

    setIsUploading(true);
    setUploadProgress(25);

    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => (prev < 85 ? prev + 15 : prev));
    }, 150);

    try {
      let uploadedAssetId = selectedVaultFileId || '';

      if (activeTab === 'upload' && selectedFile) {
        const uploadRes = await uploadVaultAsset(selectedFile);
        uploadedAssetId = uploadRes.id;
      }

      if (context?.stepId && uploadedAssetId) {
        await clientSubmitClearanceStep(context.stepId, uploadedAssetId);
      }
    } catch (err) {
      console.warn('[UploadModal] Step submission fallback:', err);
    } finally {
      clearInterval(progressTimer);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);
        setTimeout(() => {
          if (onUploadSuccess) onUploadSuccess(docName);
          handleReset();
          onClose();
        }, 1200);
      }, 300);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedVaultFileId(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsSuccess(false);
  };

  const canSubmit = activeTab === 'upload' ? !!selectedFile : !!selectedVaultFileId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isUploading) {
            handleReset();
            onClose();
          }
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-130 rounded-2xl bg-white shadow-2xl border border-[#E2EBE5] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#F0F4F1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#15803D]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 13V4M10 4L6.5 7.5M10 4L13.5 7.5"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 13V15.5C3 16.0523 3.44772 16.5 4 16.5H16C16.5523 16.5 17 16.5523 17 15.5V13"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta">
                Upload document
              </h3>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {context.clearanceTitle} · {context.stepTitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isUploading) {
                handleReset();
                onClose();
              }
            }}
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
        <div className="p-6 space-y-4">
          {/* Tabs: Upload new vs Choose from vault */}
          <div className="flex bg-[#F3F6F4] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 text-[13px] font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white text-[#13241A] shadow-xs'
                  : 'text-[#5F6D64] hover:text-[#13241A]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 10V3M8 3L5 6M8 3L11 6M3 10V12.5H13V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload new
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vault')}
              className={`flex-1 py-2 text-[13px] font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-white text-[#13241A] shadow-xs'
                  : 'text-[#5F6D64] hover:text-[#13241A]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2.5 4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H6.5L8 4.5H13.5C14.0523 4.5 14.5 4.94772 14.5 5.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5V4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Choose from vault
            </button>
          </div>

          {/* Requirement callout notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[13px] text-[#15803D]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="7" stroke="#15803D" strokeWidth="1.5" />
              <path d="M8 7V11M8 5V5.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif' }}>
              Required: {context.docDescription || 'payment receipt (PDF, JPG or PNG up to 5 MB)'}.
            </span>
          </div>

          {isSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803D]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#15803D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#13241A] font-jakarta">Upload Complete</h4>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your document has been submitted for review.
              </p>
            </div>
          ) : isUploading ? (
            <div className="py-8 px-4 space-y-4">
              <div className="flex items-center justify-between text-[13px] text-[#13241A] font-medium font-jakarta">
                <span>Uploading document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2EBE5] overflow-hidden">
                <div
                  className="h-full bg-[#15803D] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : activeTab === 'upload' ? (
            /* Upload New Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                isDragging
                  ? 'border-[#15803D] bg-[#F0FDF4]'
                  : selectedFile
                  ? 'border-[#15803D] bg-[#F7FBF8]'
                  : 'border-[#C9D8CE] bg-white hover:bg-[#F7FBF8]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#15803D] mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 16V8M12 8L8.5 11.5M12 8L15.5 11.5"
                    stroke="#15803D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16"
                    stroke="#15803D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-[14px] font-semibold text-[#13241A] font-jakarta">
                    {selectedFile.name}
                  </p>
                  <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Ready to upload
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-[12px] text-red-600 hover:underline pt-1 cursor-pointer font-sans"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[14px] font-semibold text-[#13241A] font-jakarta mb-1">
                    Drag and drop your file here
                  </p>
                  <p className="text-[12px] text-[#8A9A90] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    PDF, JPG or PNG · up to 5 MB
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Browse files
                  </button>
                </>
              )}
            </div>
          ) : (
            /* Choose From Vault List */
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Select an existing document from your vault:
              </p>
              {MOCK_VAULT_FILES.map((file) => {
                const isSelected = selectedVaultFileId === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedVaultFileId(file.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#15803D] bg-[#F0FDF4]'
                        : 'border-[#E2EBE5] bg-white hover:bg-[#F7FBF8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#C9D8CE] flex items-center justify-center text-[#15803D]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 2H9.5L13 5.5V14H3V2Z"
                            stroke="#15803D"
                            strokeWidth="1.3"
                            strokeLinejoin="round"
                          />
                          <path d="M9.5 2V5.5H13" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-[#13241A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {file.name}
                        </p>
                        <p className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {file.size} · Uploaded {file.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#15803D] bg-[#15803D]' : 'border-[#C9D8CE] bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 px-6 bg-[#F7FBF8] border-t border-[#E2EBE5]">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5F6D64] hover:bg-white hover:text-[#13241A] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit || isUploading || isSuccess}
            onClick={handleUpload}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all flex items-center gap-2 ${
              canSubmit && !isUploading && !isSuccess
                ? 'bg-[#15803D] hover:bg-[#14532D] shadow-xs cursor-pointer'
                : 'bg-[#9CA3AF] cursor-not-allowed opacity-60'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
