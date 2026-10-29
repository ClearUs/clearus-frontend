'use client';

import React, { useState, useMemo } from 'react';
import type { User } from '@/types';
import { INITIAL_TIMELINE_EVENTS, type TimelineEvent } from '@/data/studentTimeline';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';

interface TimelineContentProps {
  user: User;
  onOpenUploadModal: (context: UploadContext) => void;
  onNavigate?: (section: string) => void;
}

type TimelineFilter = 'all' | 'approvals' | 'rejections' | 'uploads' | 'receipts';

/* ─── SVG Icons ─── */

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5M2.5 13.5H13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.5 8.5L7 11L12 5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#15803D" strokeWidth="1.8" />
      <path d="M8 4.5V8.5L10.5 10" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UploadEventIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 11V4M8 4L5 7M8 4L11 7"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12H13"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#DC2626" strokeWidth="1.8" />
      <path d="M8 5V9M8 11V11.5" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L3 3.5V7.5C3 11 8 14.5 8 14.5C8 14.5 13 11 13 7.5V3.5L8 1.5Z"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7.5L7.5 9L10.5 6"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 2H9.5L13 5.5V14H3.5V2Z"
        stroke="#15803D"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M9.5 2V5.5H13" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBadge({
  badge,
}: {
  badge: NonNullable<TimelineEvent['badge']>;
}) {
  if (badge.variant === 'approved') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] font-sans">
        {badge.text}
      </span>
    );
  }
  if (badge.variant === 'action_required') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#16A34A] text-white font-sans">
        {badge.text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEE2E2] text-[#DC2626] font-sans">
      {badge.text}
    </span>
  );
}

export default function TimelineContent({
  user: _user,
  onOpenUploadModal,
}: TimelineContentProps) {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all');
  const [isDownloading, setIsDownloading] = useState(false);

  const counts = useMemo(() => {
    return {
      all: INITIAL_TIMELINE_EVENTS.length,
      approvals: INITIAL_TIMELINE_EVENTS.filter((e) => e.category === 'approvals').length,
      rejections: INITIAL_TIMELINE_EVENTS.filter((e) => e.category === 'rejections').length,
      uploads: INITIAL_TIMELINE_EVENTS.filter((e) => e.category === 'uploads').length,
      receipts: INITIAL_TIMELINE_EVENTS.filter((e) => e.category === 'receipts').length,
    };
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return INITIAL_TIMELINE_EVENTS;
    return INITIAL_TIMELINE_EVENTS.filter((e) => e.category === activeFilter);
  }, [activeFilter]);

  const handleDownloadHistory = () => {
    setIsDownloading(true);
    const content = INITIAL_TIMELINE_EVENTS.map(
      (e) => `[${e.dateGroup} ${e.time}] ${e.title} - ${e.description} (${e.meta})`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Clearance_Timeline_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsDownloading(false), 500);
  };

  return (
    <div className="flex-1 flex overflow-hidden min-w-0 bg-white">
      {/* Main scrollable column */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-10 py-8 min-w-0">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[26px] font-bold text-[#13241A] font-jakarta tracking-tight mb-1">
              Clearance timeline
            </h1>
            <p className="text-[14px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Every upload, approval and update on your clearance, newest first.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadHistory}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-[13px] font-semibold hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <DownloadIcon />
            <span>{isDownloading ? 'Downloading...' : 'Download history'}</span>
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            All activity <span className="opacity-90">{counts.all}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('approvals')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'approvals'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Approvals <span className="opacity-90">{counts.approvals}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('rejections')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'rejections'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Rejections <span className="opacity-90">{counts.rejections}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('uploads')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'uploads'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Uploads <span className="opacity-90">{counts.uploads}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('receipts')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'receipts'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Receipts <span className="opacity-90">{counts.receipts}</span>
          </button>
        </div>

        {/* Timeline Events Feed */}
        {filteredEvents.length > 0 ? (
          <div className="relative border-l-2 border-[#E2EBE5] ml-4 space-y-8 pl-6">
            {filteredEvents.map((event) => {
              const isApproval = event.badge?.variant === 'approved';
              const isAction = event.badge?.variant === 'action_required';
              const isReturned = event.badge?.variant === 'returned';

              return (
                <div key={event.id} className="relative">
                  {/* Timeline bullet icon */}
                  <div
                    className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-xs ${
                      isApproval
                        ? 'bg-[#16A34A]'
                        : isReturned
                        ? 'bg-[#FEE2E2]'
                        : isAction
                        ? 'bg-[#F0FDF4]'
                        : event.category === 'uploads'
                        ? 'bg-[#F0FDF4]'
                        : 'bg-[#F0FDF4]'
                    }`}
                  >
                    {isApproval ? (
                      <CheckCircleIcon />
                    ) : isReturned ? (
                      <AlertIcon />
                    ) : isAction ? (
                      <ClockIcon />
                    ) : event.category === 'uploads' ? (
                      <UploadEventIcon />
                    ) : (
                      <ShieldCheckIcon />
                    )}
                  </div>

                  {/* Date Group header */}
                  <div className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase mb-2 font-sans">
                    {event.dateGroup}
                  </div>

                  {/* Card content */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-4.5 hover:border-[#C9D8CE] transition-all shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
                          {event.title}
                        </h3>
                        {event.badge && <StatusBadge badge={event.badge} />}
                      </div>
                      <span className="text-[12px] text-[#9CA3AF] font-sans">
                        {event.time}
                      </span>
                    </div>

                    <p className="text-[13px] text-[#5F6D64] mb-2 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {event.description}
                    </p>

                    <p className="text-[12px] text-[#9CA3AF] font-sans">
                      {event.meta}
                    </p>

                    {/* Attached document badge */}
                    {event.attachedDocName && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2EBE5] bg-[#F7FBF8] text-[12px] font-medium text-[#15803D]">
                        <FileIcon />
                        <span>{event.attachedDocName}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E2EBE5] bg-white p-12 flex flex-col items-center justify-center text-center my-6">
            <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta mb-1.5">
              No events found in this category
            </h3>
            <p className="text-[13px] text-[#5F6D64] max-w-105 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Select &quot;All activity&quot; to view your complete clearance timeline.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Show all activity
            </button>
          </div>
        )}
      </div>

      {/* Right Column (Side Panels) */}
      <div className="w-[320px] shrink-0 border-l border-[#E2EBE5] p-6 space-y-6 overflow-y-auto">
        {/* Waiting on you card */}
        <div
          className="rounded-2xl border border-[#BBF7D0] p-5 shadow-xs relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block mb-2 font-sans">
            WAITING ON YOU
          </span>
          <h3 className="text-[18px] font-bold text-[#13241A] font-jakarta mb-2">
            Bursary receipts
          </h3>
          <p className="text-[13px] text-[#374151] mb-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Upload your faculty dues and convocation fee receipts to unlock the final sign-off.
            Waiting since 14 Oct 2026.
          </p>

          <button
            type="button"
            onClick={() =>
              onOpenUploadModal({
                clearanceTitle: 'Bursary Clearance',
                stepTitle: 'Upload faculty dues receipt',
                docDescription: 'Payment receipt · PDF, JPG or PNG',
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] text-white text-[13px] font-semibold hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs w-full justify-center"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Upload receipts</span>
            <ArrowRightIcon />
          </button>
        </div>

        {/* Typical approval time */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta mb-4">
            Typical approval time
          </h3>

          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Library
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">1–2 days</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Department
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">2–3 days</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Bursary
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">Same day</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Student Affairs
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">1–2 days</span>
            </div>
          </div>

          <p className="text-[11px] text-[#9CA3AF] mt-4 leading-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Working days after you submit everything required.
          </p>
        </div>
      </div>
    </div>
  );
}
