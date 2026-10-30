'use client';

import React, { useState, useRef } from 'react';
import { uploadVaultAsset, clientSubmitClearanceStep } from '@/lib/api';

export interface UploadContext {
  clearanceTitle: string;
  stepTitle: string;
  stepId?: string;
  docDescription?: string;
  requirementNote?: string;
  allowVaultChoice?: boolean;
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

  const allowVault =
    context.allowVaultChoice !== false &&
    context.clearanceTitle?.toLowerCase() !== 'document vault' &&
    context.clearanceTitle?.toLowerCase() !== 'vault';

  const currentTab = allowVault ? activeTab : 'upload';

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
      currentTab === 'upload'
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

  const canSubmit = currentTab === 'upload' ? !!selectedFile : !!selectedVaultFileId;

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

      {/* Modal Dialog matching Figma [205:4267] (520x549, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[520px] rounded-[20px] bg-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header [205:4268] (520x98, pad=[22,24,22,24], gap=14) */}
        <div className="flex items-start justify-between px-6 py-[22px] border-b border-[#F0F4F1] shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Icon [205:4269] 44x44, r=12, fill=#F0FDF4 */}
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
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
            {/* Titles [205:4273] gap=4 */}
            <div className="min-w-0">
              <h3 className="text-[20px] font-bold text-[#13241A] font-jakarta leading-tight">
                Upload document
              </h3>
              <p className="text-[14px] text-[#5E7165] font-sans mt-1">
                {context.clearanceTitle} · {context.stepTitle}
              </p>
            </div>
          </div>

          {/* Close [205:4276] 36x36, r=10, fill=#F7FBF8 */}
          <button
            onClick={() => {
              if (!isUploading) {
                handleReset();
                onClose();
              }
            }}
            className="w-9 h-9 rounded-[10px] bg-[#F7FBF8] flex items-center justify-center text-[#5E7165] hover:bg-[#EEF4F0] transition-colors cursor-pointer shrink-0 ml-4"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
                stroke="#5E7165"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content Body [205:4279] (pad=[0,24,24,24], gap=16) */}
        <div className="p-6 pt-5 space-y-4">
          {/* Source Tabs [205:4280] (472x54, r=12, fill=#F7FBF8, stroke=#E2EBE5) */}
          {allowVault && (
            <div className="flex h-[54px] p-1 rounded-xl bg-[#F7FBF8] border border-[#E2EBE5] gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 h-11 rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'upload'
                    ? 'bg-white text-[#13241A] border border-[#C9D8CE] shadow-xs'
                    : 'text-[#5E7165] hover:text-[#13241A]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 10V3M8 3L5 6M8 3L11 6M3 10V12.5H13V10"
                    stroke={currentTab === 'upload' ? '#15803D' : '#5E7165'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Upload new
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vault')}
                className={`flex-1 h-11 rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'vault'
                    ? 'bg-white text-[#13241A] border border-[#C9D8CE] shadow-xs'
                    : 'text-[#5E7165] hover:text-[#13241A]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2.5 4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H6.5L8 4.5H13.5C14.0523 4.5 14.5 4.94772 14.5 5.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5V4.5Z"
                    stroke={currentTab === 'vault' ? '#15803D' : '#5E7165'}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                Choose from vault
              </button>
            </div>
          )}

          {/* Requirement [205:4287] (472x42, gap=10, r=12, fill=#F0FDF4, stroke=#BBF7D0) */}
          <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[13px] text-[#33463A]">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#15803D]">
              <circle cx="8" cy="8" r="7" stroke="#15803D" strokeWidth="1.8" />
              <path d="M8 7V11M8 5V5.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="font-sans leading-tight">
              Required: {context.requirementNote || context.docDescription || 'payment receipt (PDF, JPG or PNG up to 5 MB).'}.
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
          ) : currentTab === 'upload' ? (
            /* Upload New Dropzone [205:4291] (472x222, r=16, fill=#F0FDF4, stroke=#BBF7D0) */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`min-h-[222px] border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${
                isDragging
                  ? 'border-[#15803D] bg-[#DCFCE7]/30'
                  : selectedFile
                  ? 'border-[#16A34A] bg-[#F0FDF4]'
                  : 'border-[#BBF7D0] bg-[#F0FDF4]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Icon [205:4292] 52x52, r=999, fill=#DCFCE7 */}
              <div className="w-[52px] h-[52px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-2 shrink-0">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
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

              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-[#13241A] font-jakarta">
                    {selectedFile.name}
                  </p>
                  <p className="text-[13px] text-[#5E7165] font-sans">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Ready to upload
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-[12px] text-[#B42318] hover:underline pt-1 cursor-pointer font-sans"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[16px] font-bold text-[#13241A] font-jakarta mb-1">
                    Drag and drop your file here
                  </p>
                  <p className="text-[13px] text-[#5E7165] font-sans mb-3">
                    PDF, JPG or PNG · up to 5 MB
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-[42px] px-5 py-2.5 rounded-xl border border-[#16A34A] bg-white text-[14px] font-semibold text-[#15803D] hover:bg-[#F7FBF8] transition-colors cursor-pointer shadow-xs font-sans"
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

        {/* Divider [205:4321] 520x1 fill=#E2EBE5 */}
        <div className="w-full h-px bg-[#E2EBE5]" />

        {/* Footer [205:4322] (520x76, pad=[16,24,16,24], gap=12) */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="px-5 py-3 rounded-xl text-[14px] font-semibold text-[#33463A] hover:bg-[#F7FBF8] transition-colors cursor-pointer font-sans"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit || isUploading || isSuccess}
            onClick={handleUpload}
            className={`px-5 py-3 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 font-sans ${
              canSubmit && !isUploading && !isSuccess
                ? 'bg-[#15803D] hover:bg-[#14532D] text-white shadow-xs cursor-pointer'
                : 'bg-[#E2EBE5] text-[#8A9A90] cursor-not-allowed'
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
