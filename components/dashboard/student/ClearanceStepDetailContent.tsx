'use client';

import React, { useState } from 'react';
import type { User } from '@/types';
import { STUDENT_CLEARANCES, type ClearanceItem, type ClearanceDocumentRequirement } from '@/data/studentClearances';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';
import MessageOfficerModal, {
  type MessageOfficerContext,
} from '@/components/dashboard/student/MessageOfficerModal';
import DocumentPreviewModal from '@/components/dashboard/student/DocumentPreviewModal';
import type { VaultDocument } from '@/data/studentVault';

interface ClearanceStepDetailContentProps {
  user: User;
  clearanceId: string;
  stepId: string;
  onBackToClearance: () => void;
  onBackToAllClearances: () => void;
  onSelectStep: (stepId: string) => void;
  onOpenUploadModal: (context: UploadContext) => void;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7.5L5.5 10L11 4.5" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleWhiteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#DC2626" strokeWidth="1.8" />
      <path d="M10 6V11" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="#DC2626" />
    </svg>
  );
}

function FilePdfIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke="#DC2626"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2V8H20" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13H10C10.5523 13 11 13.4477 11 14C11 14.5523 10.5523 15 10 15H8V13Z" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 15V17" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C1.5 8 4 3 8 3C12 3 14.5 8 14.5 8C14.5 8 12 13 8 13C4 13 1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 10.5V2.5M8 2.5L5 5.5M8 2.5L11 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ClearanceStepDetailContent({
  user: _user,
  clearanceId,
  stepId,
  onBackToClearance,
  onBackToAllClearances,
  onSelectStep,
  onOpenUploadModal,
}: ClearanceStepDetailContentProps) {
  const [messageContext, setMessageContext] = useState<MessageOfficerContext | null>(null);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);

  // Find clearance
  const clearance: ClearanceItem =
    STUDENT_CLEARANCES.find((c) => c.id === clearanceId) ||
    STUDENT_CLEARANCES.find((c) => c.id === 'bursary') ||
    STUDENT_CLEARANCES[0];

  // Find current step
  const docs = clearance.documents || [];
  const currentStep: ClearanceDocumentRequirement =
    docs.find((d) => d.id === stepId) ||
    docs[0] || {
      id: stepId,
      name: 'Upload requirement',
      description: 'Document upload required for this step',
      status: 'pending',
    };

  const currentStepIndex = docs.findIndex((d) => d.id === currentStep.id);
  const stepNumber = currentStep.stepNumber || currentStepIndex + 1;
  const totalSteps = docs.length || clearance.stepsTotal || 1;

  const isApproved = currentStep.status === 'approved';
  const isReturned = currentStep.status === 'returned';
  const isInReview = currentStep.status === 'in_review';

  // Handle sample download
  const handleDownloadSample = () => {
    const sample = currentStep.sampleDocument;
    const fileName = sample?.name || 'Sample_Document.pdf';
    const blob = new Blob([`Simulated document content for ${fileName}`], {
      type: 'application/pdf',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle sample preview
  const handlePreviewSample = () => {
    const sample = currentStep.sampleDocument;
    setPreviewDoc({
      id: 'sample-doc',
      name: sample?.name || 'Sample_Document.pdf',
      type: sample?.type || 'PDF',
      size: sample?.size || '120 KB',
      sizeBytes: 120 * 1024,
      uploadedDate: 'Sample Template',
      clearanceCategory: clearance.title,
      status: 'approved',
    });
  };

  return (
    <div className="flex-1 flex overflow-hidden min-w-0 bg-white">
      {/* Main Column */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-6 min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-[#5F6D64] mb-5 font-sans flex-wrap">
          <button
            type="button"
            onClick={onBackToAllClearances}
            className="text-[#15803D] hover:underline cursor-pointer font-medium"
          >
            My Clearances
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onBackToClearance}
            className="text-[#15803D] hover:underline cursor-pointer font-medium"
          >
            {clearance.title}
          </button>
          <span>/</span>
          <span className="text-[#13241A] font-medium">{currentStep.shortTitle || currentStep.name}</span>
        </nav>

        {/* Step Header Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 mb-5 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  isApproved
                    ? 'bg-[#16A34A]'
                    : isReturned
                    ? 'bg-[#FEF2F2] border border-[#FECACA]'
                    : isInReview
                    ? 'bg-[#EFF6FF] border border-[#BFDBFE]'
                    : 'bg-[#F0FDF4] border-2 border-[#16A34A]'
                }`}
              >
                {isApproved ? (
                  <CheckCircleWhiteIcon />
                ) : isReturned ? (
                  <span className="text-[15px] font-bold text-[#DC2626] font-jakarta">{stepNumber}</span>
                ) : isInReview ? (
                  <span className="text-[15px] font-bold text-[#2563EB] font-jakarta">{stepNumber}</span>
                ) : (
                  <span className="text-[15px] font-bold text-[#15803D] font-jakarta">{stepNumber}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-[20px] font-bold text-[#13241A] font-jakarta">
                    {currentStep.name.startsWith('Upload') ? currentStep.name : `Upload ${currentStep.name}`}
                  </h1>

                  {/* Status Badge */}
                  {isApproved && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D]">
                      Approved
                    </span>
                  )}
                  {isReturned && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                      Returned
                    </span>
                  )}
                  {isInReview && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#EFF6FF] text-[#2563EB]">
                      In review
                    </span>
                  )}
                  {!isApproved && !isReturned && !isInReview && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#16A34A] text-white">
                      Action required
                    </span>
                  )}
                </div>

                <p className="text-[13px] text-[#5F6D64] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Step {stepNumber} of {totalSteps} · {clearance.title}
                </p>
              </div>
            </div>

            <span className="text-[13px] text-[#8A9A90] font-sans shrink-0 hidden sm:inline">
              Step {stepNumber} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Returned Notice Banner */}
        {isReturned && currentStep.returnedInfo && (
          <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4 mb-5 flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <AlertIcon />
            </div>
            <div className="text-[13px] leading-relaxed text-[#B91C1C]">
              <p className="font-semibold font-jakarta mb-0.5">
                Returned by {currentStep.returnedInfo.officer}, {currentStep.returnedInfo.date}.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif' }}>{currentStep.returnedInfo.reason}</p>
            </div>
          </div>
        )}

        {/* Payment / Clearance Notice Callout */}
        {!isReturned && clearance.notice && (
          <div className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] p-4 mb-5 text-[13px] leading-relaxed">
            <span className="font-semibold text-[#13241A] font-jakarta">
              Payments happen outside ClearUs.{' '}
            </span>
            <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pay through the Bursary’s official channel, then upload each receipt below.
            </span>
          </div>
        )}

        {/* About this step Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 mb-5 shadow-xs">
          <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta mb-2">About this step</h2>
          <p className="text-[14px] text-[#33463A] leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {currentStep.aboutText || currentStep.description}
          </p>

          {/* Checklist format */}
          {currentStep.checklist && currentStep.checklist.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#F0F4F1]">
              <h3 className="text-[14px] font-medium text-[#13241A] font-jakarta mb-3">
                {currentStep.name.toLowerCase().includes('receipt') ? 'Your receipt should' : 'Your document should'}
              </h3>
              <div className="space-y-2.5">
                {currentStep.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </div>
                    <span className="text-[14px] text-[#33463A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How it works steps format */}
          {currentStep.workflowSteps && currentStep.workflowSteps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#F0F4F1]">
              <h3 className="text-[14px] font-medium text-[#13241A] font-jakarta mb-3">How it works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentStep.workflowSteps.map((ws) => (
                  <div key={ws.step} className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] p-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[12px] font-bold mb-2">
                      {ws.step}
                    </div>
                    <h4 className="text-[13px] font-semibold text-[#13241A] font-jakarta mb-1">
                      {ws.heading}
                    </h4>
                    <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {ws.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sample document Card */}
        {currentStep.sampleDocument && (
          <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 mb-5 shadow-xs">
            <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta mb-3.5">Sample document</h2>

            <div className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2EBE5] flex items-center justify-center shrink-0 shadow-xs">
                  <FilePdfIcon />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#13241A] font-jakarta">
                    {currentStep.sampleDocument.name}
                  </h3>
                  <p className="text-[12px] font-medium text-[#5F6D64] mt-0.5">
                    {currentStep.sampleDocument.type} · {currentStep.sampleDocument.size}
                    {currentStep.sampleDocument.pages ? ` · ${currentStep.sampleDocument.pages}` : ''}
                  </p>
                  <p className="text-[13px] text-[#5F6D64] mt-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {currentStep.sampleDocument.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-[13px] font-medium cursor-pointer bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-xs"
                >
                  <DownloadIcon />
                  <span>Download {currentStep.sampleDocument.name.includes('Template') ? 'form' : 'sample'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePreviewSample}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[#15803D] text-[13px] font-semibold hover:bg-[#F0FDF4] transition-colors cursor-pointer"
                >
                  <EyeIcon />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete / Resubmit this step Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 shadow-xs">
          <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta mb-2">
            {isReturned ? 'Resubmit this step' : isApproved ? 'Uploaded document' : 'Complete this step'}
          </h2>

          {/* If returned, show previous file row */}
          {isReturned && currentStep.returnedInfo && (
            <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2]/50 p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FilePdfIcon />
                <div>
                  <p className="text-[14px] font-medium text-[#13241A] font-jakarta">
                    {currentStep.returnedInfo.previousFileName}
                  </p>
                  <p className="text-[12px] text-[#5F6D64]">
                    {currentStep.returnedInfo.previousFileMeta}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                Returned
              </span>
            </div>
          )}

          {/* If approved, show submitted file */}
          {isApproved && currentStep.uploadedDocName && (
            <div className="rounded-xl border border-[#DCFCE7] bg-[#F0FDF4] p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FilePdfIcon />
                <div>
                  <p className="text-[14px] font-medium text-[#13241A] font-jakarta">
                    {currentStep.uploadedDocName}
                  </p>
                  <p className="text-[12px] text-[#5F6D64]">
                    {currentStep.uploadedDocMeta || 'Approved file'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D]">
                Approved
              </span>
            </div>
          )}

          <p className="text-[14px] text-[#33463A] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {isReturned
              ? 'Upload the corrected file or choose one already in your vault.'
              : isApproved
              ? 'Your document has been verified and approved by the department officer.'
              : 'Upload a new file or choose one already in your vault.'}
          </p>

          <div className="flex items-center gap-3">
            {isApproved ? (
              <button
                type="button"
                onClick={() => {
                  setPreviewDoc({
                    id: 'approved-doc',
                    name: currentStep.uploadedDocName || 'Clearance_Document.pdf',
                    type: 'PDF',
                    size: '340 KB',
                    sizeBytes: 340 * 1024,
                    uploadedDate: 'Approved',
                    clearanceCategory: clearance.title,
                    status: 'approved',
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C9D8CE] bg-white text-[#15803D] text-[13px] font-semibold hover:bg-[#F0FDF4] transition-colors cursor-pointer"
              >
                <EyeIcon />
                <span>View uploaded document</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onOpenUploadModal({
                    clearanceTitle: clearance.title,
                    stepTitle: currentStep.name,
                    stepId: currentStep.id,
                    docDescription: currentStep.description,
                  })
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[13px] font-medium cursor-pointer bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-xs"
              >
                <UploadIcon />
                <span>{isReturned ? 'Resubmit' : 'Add document'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Rail */}
      <div className="w-[320px] shrink-0 border-l border-[#E2EBE5] p-6 space-y-6 overflow-y-auto hidden lg:block">
        {/* Steps in this clearance Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[14px] font-semibold text-[#13241A] font-jakarta mb-3">
            Steps in this clearance
          </h3>

          <div className="space-y-2">
            {docs.map((s, idx) => {
              const isCurrent = s.id === currentStep.id;
              const sNum = s.stepNumber || idx + 1;
              const sApproved = s.status === 'approved';
              const sReturned = s.status === 'returned';

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectStep(s.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#F0FDF4] border border-[#DCFCE7]'
                      : 'hover:bg-[#F7FBF8]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                      isCurrent
                        ? 'bg-[#16A34A] text-white'
                        : sApproved
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : sReturned
                        ? 'bg-[#FEF2F2] text-[#DC2626]'
                        : 'bg-[#F7FBF8] border border-[#C9D8CE] text-[#5E7165]'
                    }`}
                  >
                    {sApproved ? '✓' : sNum}
                  </div>
                  <span
                    className={`text-[13px] truncate ${
                      isCurrent
                        ? 'font-semibold text-[#13241A]'
                        : 'font-normal text-[#5F6D64]'
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* About this clearance Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta mb-4">
            About this clearance
          </h3>

          <div className="space-y-3.5 text-[13px]">
            <div>
              <span className="block text-[#9CA3AF] text-[12px] font-sans">Office</span>
              <span className="text-[#13241A] font-medium font-jakarta">
                {clearance.office || clearance.department}
              </span>
            </div>

            <div>
              <span className="block text-[#9CA3AF] text-[12px] font-sans">Officer</span>
              <span className="text-[#13241A] font-medium font-jakarta">{clearance.officer}</span>
            </div>

            <div>
              <span className="block text-[#9CA3AF] text-[12px] font-sans">Review time</span>
              <span className="text-[#13241A] font-medium font-jakarta">
                {clearance.reviewTime || 'Same day'}
              </span>
            </div>

            <div>
              <span className="block text-[#9CA3AF] text-[12px] font-sans">Closes</span>
              <span className="text-[#13241A] font-medium font-jakarta">
                {clearance.closesDate || '30 Nov 2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Need help with this clearance? Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta mb-1.5">
            Need help with this clearance?
          </h3>
          <p className="text-[13px] text-[#5F6D64] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Message the officer if you are unsure what to upload.
          </p>

          <button
            type="button"
            onClick={() =>
              setMessageContext({
                officerName: clearance.officer,
                department: clearance.department,
                clearanceTitle: clearance.title,
              })
            }
            className="w-full py-2.5 rounded-xl border border-[#15803D] bg-white text-[13px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer text-center font-jakarta"
          >
            Message {clearance.officer}
          </button>
        </div>
      </div>

      {/* Message Officer Modal */}
      <MessageOfficerModal
        isOpen={!!messageContext}
        context={messageContext}
        onClose={() => setMessageContext(null)}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
}
