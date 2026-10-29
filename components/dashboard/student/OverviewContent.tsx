'use client';

import React from 'react';
import type { User } from '@/types';
import Image from 'next/image';

interface OverviewContentProps {
  user: User;
  onNavigate?: (section: string) => void;
  onOpenUploadModal?: (context: {
    clearanceTitle: string;
    stepTitle: string;
    docDescription?: string;
  }) => void;
  onSelectClearance?: (clearanceId: string) => void;
}

interface ClearanceStep {
  id: string;
  number: number;
  title: string;
  department: string;
  officer: string;
  status: 'approved' | 'action_required' | 'locked';
  stepsCompleted: number;
  stepsTotal: number;
  documents?: { name: string; description: string }[];
  unlockMessage?: string;
}

const MOCK_CLEARANCES: ClearanceStep[] = [
  {
    id: '1',
    number: 1,
    title: 'Library Clearance',
    department: 'University Library Services',
    officer: 'Librarian Musa',
    status: 'approved',
    stepsCompleted: 2,
    stepsTotal: 2,
  },
  {
    id: '2',
    number: 2,
    title: 'Department Clearance',
    department: 'Computer Science',
    officer: 'Head of Department',
    status: 'approved',
    stepsCompleted: 2,
    stepsTotal: 2,
  },
  {
    id: '3',
    number: 3,
    title: 'Bursary Clearance',
    department: 'Bursary & Student Accounts',
    officer: 'Senior Bursar',
    status: 'action_required',
    stepsCompleted: 0,
    stepsTotal: 2,
    documents: [
      { name: 'Upload faculty dues receipt', description: 'Payment receipt · PDF, JPG or PNG' },
      { name: 'Upload convocation fee receipt', description: 'Payment receipt · PDF, JPG or PNG' },
    ],
  },
  {
    id: '4',
    number: 4,
    title: 'Student Affairs Clearance',
    department: 'Student Affairs Division',
    officer: 'Dean of Student Affairs',
    status: 'locked',
    stepsCompleted: 0,
    stepsTotal: 2,
    unlockMessage: 'Unlocks after Bursary',
  },
];

const MOCK_ACTIVITY = [
  { text: 'Department Clearance approved', sub: 'Head of Department · 14 Oct', dotColor: '#15803D' },
  { text: 'Form uploaded', sub: 'Dept_Handover_Form_V2.pdf · 13 Oct', dotColor: '#15803D' },
  { text: 'Library Clearance approved', sub: 'Librarian Musa · 8 Oct', dotColor: '#15803D' },
];

const MOCK_DOCUMENTS = [
  { name: 'Library_Clearance_Sl...', type: 'PDF', size: '1.2 MB' },
  { name: 'Dept_Handover_For...', type: 'PDF', size: '860 KB' },
];

/* ─── SVG Icons ─── */

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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.667 2.5H5.83366C5.39163 2.5 4.96771 2.67559 4.65515 2.98816C4.34259 3.30072 4.16699 3.72464 4.16699 4.16667V15.8333C4.16699 16.2754 4.34259 16.6993 4.65515 17.0118C4.96771 17.3244 5.39163 17.5 5.83366 17.5H14.167C14.609 17.5 15.0329 17.3244 15.3455 17.0118C15.6581 16.6993 15.8337 16.2754 15.8337 15.8333V6.66667L11.667 2.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#8A9A90" />
      <path d="M11.667 2.5V6.66667H15.8337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#8A9A90" />
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

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActivityDot({ color }: { color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 mt-1.5">
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

function DocFileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2H10.5L14 5.5V16H4V2Z" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10.5 2V5.5H14" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Progress Ring ─── */

function ProgressRing({ percentage }: { percentage: number }) {
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          className='shadow-md'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#15803D"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-extrabold text-[#13241A] font-jakarta" >
          {percentage}%
        </span>
        <span className="text-[12px] text-[#5F6D64] font-sans">cleared</span>
      </div>
    </div>
  );
}

/* ─── Status Badge ─── */

function StatusBadge({ status }: { status: ClearanceStep['status'] }) {
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

/* ─── Clearance Card ─── */

interface ClearanceCardProps {
  clearance: ClearanceStep;
  onSelectClearance?: (clearanceId: string) => void;
  onOpenUploadModal?: (context: {
    clearanceTitle: string;
    stepTitle: string;
    docDescription?: string;
  }) => void;
}

function ClearanceCard({ clearance, onSelectClearance, onOpenUploadModal }: ClearanceCardProps) {
  const isLocked = clearance.status === 'locked';
  const isActionRequired = clearance.status === 'action_required';

  return (
    <div
      className={`rounded-xl border p-5 transition-shadow ${
        isActionRequired
          ? 'border-[#15803D] bg-[#FFFFFF] shadow-xs'
          : isLocked
          ? 'border-[#E5E7EB] bg-[#FFFFFF]'
          : 'border-[#E2EBE5] bg-white hover:border-[#C9D8CE]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex items-start gap-3 ${!isLocked ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (!isLocked) onSelectClearance?.(clearance.id);
          }}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
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
              <span className="text-[14px] font-semibold text-[#15803D] font-jakarta">{clearance.number}</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[#13241A] font-jakarta hover:text-[#15803D] transition-colors">
                {clearance.title}
              </h3>
              <StatusBadge status={clearance.status} />
            </div>
            <p className="text-[13px] text-[#5F6D64] mt-0.5 font-sans">
              {clearance.department} · {clearance.officer}
            </p>
          </div>
        </div>

        <span className={`text-[13px] shrink-0 ml-4 font-sans ${clearance.status === "approved" ? "text-[#15803D]" : "text-[#9CA3AF]"}`}>
          {isLocked
            ? clearance.unlockMessage
            : `${clearance.stepsCompleted} of ${clearance.stepsTotal} steps`}
        </span>
      </div>

      {isActionRequired && clearance.documents && (
        <div className="mt-4 space-y-3">
          {clearance.documents.map((doc, i) => (
            <div key={i} className="flex items-center justify-between bg-[#F7FBF8] border border-[#E2EBE5] rounded-xl p-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#C9D8CE] flex items-center justify-center">
                  <FileIcon />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenUploadModal?.({
                        clearanceTitle: clearance.title,
                        stepTitle: doc.name,
                        docDescription: doc.description,
                      })
                    }
                    className="text-[13px] font-medium text-[#15803D] underline underline-offset-2 hover:text-[#14532D] text-left cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {doc.name}
                  </button>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {doc.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenUploadModal?.({
                    clearanceTitle: clearance.title,
                    stepTitle: doc.name,
                    docDescription: doc.description,
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent text-white text-[13px] font-medium cursor-pointer bg-[#16A34A] hover:bg-[#15803D] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Add document
                <UploadIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Content ─── */

export default function OverviewContent({
  user,
  onNavigate,
  onOpenUploadModal,
  onSelectClearance,
}: OverviewContentProps) {
  const firstName = user.name.split(' ')[0];
  const approvedCount = MOCK_CLEARANCES.filter((c) => c.status === 'approved').length;
  const totalCount = MOCK_CLEARANCES.length;
  const percentage = Math.round((approvedCount / totalCount) * 100);

  return (
    <div className="flex-1 flex overflow-hidden min-w-0">
      {/* Main scroll area */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-6 min-w-0">
        {/* Welcome hero */}
        <div className="rounded-2xl overflow-hidden relative p-6 mb-8 border border-[#E2EBE5] bg-white">
          <Image src="/images/hero-banner.png" alt="banner" width={808} height={420} className="absolute left-0 top-0 h-full" />
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <p
                className="text-[12px] font-medium uppercase mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#15803D',
                  letterSpacing: '0.06em',
                }}
              >
                CLEARANCES · 2025/2026
              </p>
              <h1
                className="text-[30px] leading-tight mb-2 font-jakarta"
                style={{
                  fontWeight: 800,
                  color: '#13241A',
                }}
              >
                Welcome back, {firstName}
              </h1>
              <p className="text-[14px] text-[#5F6D64] mb-5 max-w-100" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '22px' }}>
                You have {totalCount - approvedCount} clearances left. Upload your Bursary payment
                receipt to move on to the final sign off.
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onOpenUploadModal?.({
                      clearanceTitle: 'Bursary Clearance',
                      stepTitle: 'Upload faculty dues receipt',
                      docDescription: 'Payment receipt · PDF, JPG or PNG',
                    })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803D] text-white text-[14px] font-semibold rounded-lg hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Continue: Upload payment receipt
                  <ArrowRightIcon />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('clearances')}
                  className="text-[14px] font-medium text-[#15803D] hover:underline cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  View all clearances
                </button>
              </div>
            </div>

            <ProgressRing percentage={percentage} />
          </div>
        </div>

        {/* Clearances section */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#E2EBE5]">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] font-bold text-[#13241A] font-jakarta">
              Clearances
            </h2>
            <button
              type="button"
              onClick={() => onNavigate?.('clearances')}
              className="text-[13px] font-medium text-[#15803D] hover:underline font-sans cursor-pointer"
            >
              View all
            </button>
          </div>
          <p className="text-[13px] text-[#5F6D64] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Each clearance has its own steps. Upload the required documents to complete it.
          </p>

          <div className="space-y-3">
            {MOCK_CLEARANCES.map((clearance) => (
              <ClearanceCard
                key={clearance.id}
                clearance={clearance}
                onSelectClearance={(id) => {
                  if (onSelectClearance) onSelectClearance(id);
                  else if (onNavigate) onNavigate('clearances');
                }}
                onOpenUploadModal={onOpenUploadModal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-75 shrink-0 overflow-y-auto px-5 py-6 space-y-5">
        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-[#E2EBE5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              Recent activity
            </h3>
            <button
              type="button"
              onClick={() => onNavigate?.('timeline')}
              className="text-[13px] font-medium text-[#15803D] hover:underline font-jakarta cursor-pointer"
            >
              See timeline
            </button>
          </div>
          <div className="space-y-3.5">
            {MOCK_ACTIVITY.map((item, i) => (
              <div
                key={i}
                onClick={() => onNavigate?.('timeline')}
                className="flex items-start gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <ActivityDot color={item.dotColor} />
                <div>
                  <p className="text-[13px] font-medium text-[#13241A]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.text}</p>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document vault */}
        <div className="bg-white rounded-2xl border border-[#E2EBE5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              Document vault
            </h3>
            <button
              type="button"
              onClick={() => onNavigate?.('vault')}
              className="text-[13px] font-medium text-[#15803D] hover:underline font-sans cursor-pointer"
            >
              Open vault
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_DOCUMENTS.map((doc, i) => (
              <div
                key={i}
                onClick={() => onNavigate?.('vault')}
                className="flex items-center gap-3 cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-[#F7FBF8] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
                  <DocFileIcon />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#13241A]" style={{ fontFamily: 'Inter, sans-serif' }}>{doc.name}</p>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>{doc.type} · {doc.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
