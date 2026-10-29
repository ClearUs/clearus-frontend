'use client';

import React, { useState } from 'react';
import type { User } from '@/types';
import { STUDENT_CLEARANCES, type ClearanceItem } from '@/data/studentClearances';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';
import MessageOfficerModal, {
  type MessageOfficerContext,
} from '@/components/dashboard/student/MessageOfficerModal';

interface ClearanceDetailContentProps {
  user: User;
  clearanceId: string;
  onBack: () => void;
  onOpenUploadModal: (context: UploadContext) => void;
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M5.5 7V5C5.5 3.61929 6.61929 2.5 8 2.5C9.38071 2.5 10.5 3.61929 10.5 5V7" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M11.667 2.5H5.83366C5.39163 2.5 4.96771 2.67559 4.65515 2.98816C4.34259 3.30072 4.16699 3.72464 4.16699 4.16667V15.8333C4.16699 16.2754 4.34259 16.6993 4.65515 17.0118C4.96771 17.3244 5.39163 17.5 5.83366 17.5H14.167C14.609 17.5 15.0329 17.3244 15.3455 17.0118C15.6581 16.6993 15.8337 16.2754 15.8337 15.8333V6.66667L11.667 2.5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="#8A9A90" />
      <path d="M11.667 2.5V6.66667H15.8337" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="#8A9A90" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 9V2.5M7 2.5L4.5 5M7 2.5L9.5 5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9V11.5H12V9" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBadge({ status }: { status: ClearanceItem['status'] }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D]" style={{ fontFamily: 'Inter, sans-serif' }}>
        Approved
      </span>
    );
  }
  if (status === 'action_required') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#16A34A] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        Action required
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#F7FBF8] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
      Locked
    </span>
  );
}

export default function ClearanceDetailContent({
  user: _user,
  clearanceId,
  onBack,
  onOpenUploadModal,
}: ClearanceDetailContentProps) {
  const [messageContext, setMessageContext] = useState<MessageOfficerContext | null>(null);

  // Find clearance by id, default to Bursary if not found
  const clearance =
    STUDENT_CLEARANCES.find((c) => c.id === clearanceId) ||
    STUDENT_CLEARANCES.find((c) => c.id === 'bursary') ||
    STUDENT_CLEARANCES[0];

  const isLocked = clearance.status === 'locked';
  const progressPercent =
    clearance.stepsTotal > 0
      ? Math.round((clearance.stepsCompleted / clearance.stepsTotal) * 100)
      : 0;

  return (
    <div className="flex-1 flex overflow-hidden min-w-0 bg-white">
      {/* Main scrollable column */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-6 min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-[#5F6D64] mb-5 font-sans">
          <button
            type="button"
            onClick={onBack}
            className="text-[#15803D] hover:underline cursor-pointer font-medium"
          >
            My Clearances
          </button>
          <span>/</span>
          <span className="text-[#13241A] font-medium">{clearance.title}</span>
        </nav>

        {/* Clearance Header Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 mb-5 shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3.5">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  clearance.status === 'approved'
                    ? 'bg-[#16A34A]'
                    : isLocked
                    ? 'bg-[#F7FBF8] border border-[#C9D8CE]'
                    : 'bg-[#F0FDF4] border-2 border-[#16A34A]'
                }`}
              >
                {clearance.status === 'approved' ? (
                  <CheckCircleIcon />
                ) : isLocked ? (
                  <LockIcon />
                ) : (
                  <span className="text-[15px] font-semibold text-[#15803D] font-jakarta">
                    {clearance.number}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-[20px] font-bold text-[#13241A] font-jakarta">
                    {clearance.title}
                  </h1>
                  <StatusBadge status={clearance.status} />
                </div>
                <p className="text-[13px] text-[#5F6D64] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {clearance.department} · {clearance.officer}
                </p>
              </div>
            </div>

            <span
              className={`text-[13px] font-sans ${
                clearance.status === 'approved'
                  ? 'text-[#15803D] font-medium'
                  : 'text-[#5F6D64]'
              }`}
            >
              {isLocked
                ? clearance.unlockMessage
                : `${clearance.stepsCompleted} of ${clearance.stepsTotal} steps`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-[#E2EBE5] overflow-hidden">
            <div
              className="h-full bg-[#16A34A] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Notice Callout */}
        {clearance.notice && (
          <div className="rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] p-4 mb-6 text-[13px] leading-relaxed">
            <span className="font-semibold text-[#13241A] font-jakarta">
              Payments happen outside ClearUs.{' '}
            </span>
            <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pay through the Bursary’s official channel, then upload each receipt below.
            </span>
          </div>
        )}

        {/* Steps Section */}
        <div className="mb-8">
          <h2 className="text-[18px] font-bold text-[#13241A] mb-1 font-jakarta">Steps</h2>
          <p className="text-[13px] text-[#5F6D64] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Select a step to see what is needed, download a sample and complete it.
          </p>

          <div className="space-y-3">
            {clearance.documents && clearance.documents.length > 0 ? (
              clearance.documents.map((step) => {
                const isStepApproved = step.status === 'approved';

                return (
                  <div
                    key={step.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#E2EBE5] bg-white hover:border-[#C9D8CE] transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#F7FBF8] border border-[#E2EBE5] flex items-center justify-center shrink-0">
                        <FileIcon />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            onOpenUploadModal({
                              clearanceTitle: clearance.title,
                              stepTitle: step.name,
                              stepId: step.id,
                              docDescription: step.description,
                            })
                          }
                          className="text-[14px] font-semibold text-[#15803D] underline underline-offset-2 hover:text-[#14532D] text-left cursor-pointer font-jakarta"
                        >
                          {step.name}
                        </button>
                        <p className="text-[12px] text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {isStepApproved ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D] font-sans">
                          Approved
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenUploadModal({
                              clearanceTitle: clearance.title,
                              stepTitle: step.name,
                              stepId: step.id,
                              docDescription: step.description,
                            })
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-[13px] font-medium cursor-pointer bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-xs"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <span>Add document</span>
                          <UploadIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-5 rounded-xl border border-[#E2EBE5] text-[13px] text-[#5F6D64] bg-[#F7FBF8]">
                No document uploads currently required for this clearance.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Rail */}
      <div className="w-[320px] shrink-0 border-l border-[#E2EBE5] p-6 space-y-6 overflow-y-auto">
        {/* About this clearance */}
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

        {/* Need help with this clearance? */}
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
    </div>
  );
}
