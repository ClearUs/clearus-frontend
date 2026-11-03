'use client';

import React, { useState } from 'react';
import type { User, Institution } from '@/types';
import StudentSidebar from '@/components/dashboard/student/Sidebar';
import HeaderBar from '@/components/dashboard/student/HeaderBar';
import OverviewContent from '@/components/dashboard/student/OverviewContent';
import MyClearancesContent from '@/components/dashboard/student/MyClearancesContent';
import ClearanceDetailContent from '@/components/dashboard/student/ClearanceDetailContent';
import ClearanceStepDetailContent from '@/components/dashboard/student/ClearanceStepDetailContent';
import DocumentVaultContent from '@/components/dashboard/student/DocumentVaultContent';
import TimelineContent from '@/components/dashboard/student/TimelineContent';
import NotificationsContent from '@/components/dashboard/student/NotificationsContent';
import ProfileSettingsContent from '@/components/dashboard/student/ProfileSettingsContent';
import UploadDocumentModal, {
  type UploadContext,
} from '@/components/dashboard/student/UploadDocumentModal';
import { INSTITUTIONS } from '@/data/institution';

const DEMO_INSTITUTION: Institution = {
  ...INSTITUTIONS[0],
  code: 'DEMO',
  name: 'Demo University',
  shortName: 'Demo',
  domain: 'youruniversity.clearus.tech',
};

const DEMO_USER: User = {
  id: 'usr_demo_chinedu',
  email: 'chinedu.okonkwo@youruniversity.clearus.tech',
  name: 'Chinedu Okonkwo',
  role: 'student',
  schoolCode: 'DEMO',
  matricNo: '2021/104928',
  department: 'Computer Science',
};

interface HeroDashboardMockupProps {
  onShowToast?: (message: string) => void;
}

function MobileClearUsLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="url(#mobile_clearus_linear)" />
      <path d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#DCFCE7" />
      <defs>
        <linearGradient id="mobile_clearus_linear" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MobileDashboardView({
  onShowToast,
  onOpenUploadModal,
}: {
  onShowToast?: (msg: string) => void;
  onOpenUploadModal: (ctx: UploadContext) => void;
}) {
  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden text-[#13241A] relative">
      {/* Top Mobile App Bar */}
      <div className="h-13 px-3.5 bg-white border-b border-[#E2EBE5] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <MobileClearUsLogo />
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-bold text-[#13241A] font-jakarta leading-tight truncate">
              Demo University
            </span>
            <span className="text-[9.5px] text-[#15803D] font-mono leading-tight truncate">
              youruniversity.clearus.tech
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onShowToast?.('You have 2 unread clearance notifications')}
            className="w-7.5 h-7.5 rounded-lg border border-[#E2EBE5] flex items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer"
            title="Notifications"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C7.23858 2.5 5 4.73858 5 7.5V10.5L3.5 13.5H16.5L15 10.5V7.5C15 4.73858 12.7614 2.5 10 2.5Z" stroke="#5F6D64" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M8 14.5C8 15.6046 8.89543 16.5 10 16.5C11.1046 16.5 12 15.6046 12 14.5" stroke="#5F6D64" strokeWidth="1.6" />
            </svg>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
          </button>
          <div className="w-7.5 h-7.5 rounded-full bg-[#16A34A] text-white text-[10px] font-bold flex items-center justify-center font-jakarta shadow-2xs">
            CO
          </div>
        </div>
      </div>

      {/* Scrollable Mobile Content */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-12">
        {/* Welcome Card */}
        <div className="rounded-2xl p-3.5 bg-gradient-to-br from-[#F0FDF4] via-white to-[#F7FBF8] border border-[#E2EBE5] shadow-2xs relative overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[9.5px] font-bold text-[#15803D] uppercase tracking-wider block">
                CLEARANCES · 2025/2026
              </span>
              <h2 className="text-[16px] font-bold text-[#13241A] font-jakarta leading-tight mt-0.5">
                Welcome back, Chinedu 👋
              </h2>
              <p className="text-[11px] text-[#5E7165] mt-1 leading-4">
                2 clearances left. Upload your Bursary receipt to finish.
              </p>
            </div>

            {/* Circular Mini Progress */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E2EBE5]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#16A34A]"
                    strokeDasharray="50, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-extrabold text-[#13241A] font-jakarta">50%</span>
              </div>
              <span className="text-[8.5px] text-[#5E7165] font-medium mt-0.5">2 of 4 cleared</span>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            type="button"
            onClick={() => {
              onOpenUploadModal({
                clearanceTitle: 'Bursary Clearance',
                stepTitle: 'Upload faculty dues receipt',
                docDescription: 'Payment receipt · PDF, JPG or PNG',
              });
              onShowToast?.('Opening upload for Bursary dues receipt');
            }}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-98 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span>Continue: Upload Bursary receipt</span>
            <span className="text-[13px]">→</span>
          </button>
        </div>

        {/* Clearances Header */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[12.5px] font-bold text-[#13241A] font-jakarta">Clearance Status</span>
            <span className="text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded-full border border-[#DCFCE7]">
              4 items
            </span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast?.('Viewing all clearances')}
            className="text-[11px] text-[#15803D] font-medium hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Clearance List Cards */}
        <div className="space-y-2">
          {/* Card 1: Library */}
          <div
            onClick={() => onShowToast?.('Library Clearance: Approved by Librarian Musa on 8 Oct')}
            className="p-2.5 rounded-xl border border-[#E2EBE5] bg-white flex items-center justify-between shadow-2xs hover:border-[#16A34A] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6.5 h-6.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                ✓
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-semibold text-[#13241A] font-jakarta block truncate">
                  Library Clearance
                </span>
                <span className="text-[10px] text-[#5E7165] block truncate">
                  University Library · 1 of 1 step
                </span>
              </div>
            </div>
            <span className="text-[9.5px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#DCFCE7] shrink-0">
              Approved
            </span>
          </div>

          {/* Card 2: Department */}
          <div
            onClick={() => onShowToast?.('Department Clearance: Head of Department sign-off pending')}
            className="p-2.5 rounded-xl border border-[#16A34A]/50 bg-[#FAFDFB] flex items-center justify-between shadow-2xs hover:border-[#16A34A] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6.5 h-6.5 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] text-[#15803D] flex items-center justify-center text-[10.5px] font-bold shrink-0">
                2
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-semibold text-[#13241A] font-jakarta block truncate">
                  Department Clearance
                </span>
                <span className="text-[10px] text-[#5E7165] block truncate">
                  Computer Science · 1 of 2 steps
                </span>
              </div>
            </div>
            <span className="text-[9.5px] font-semibold text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FEF3C7] shrink-0">
              Action req.
            </span>
          </div>

          {/* Card 3: Bursary */}
          <div
            onClick={() => {
              onOpenUploadModal({
                clearanceTitle: 'Bursary Clearance',
                stepTitle: 'Upload faculty dues receipt',
                docDescription: 'Payment receipt · PDF, JPG or PNG',
              });
              onShowToast?.('Opening upload for Bursary dues receipt');
            }}
            className="p-2.5 rounded-xl border border-[#16A34A] bg-white flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6.5 h-6.5 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] text-[#15803D] flex items-center justify-center text-[10.5px] font-bold shrink-0">
                3
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-semibold text-[#13241A] font-jakarta block truncate">
                  Bursary Clearance
                </span>
                <span className="text-[10px] text-[#5E7165] block truncate">
                  Bursary Accounts · 0 of 2 steps
                </span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-white bg-[#16A34A] px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
              Upload ↑
            </span>
          </div>

          {/* Card 4: Student Affairs (Locked) */}
          <div
            onClick={() => onShowToast?.('Student Affairs unlocks automatically after Bursary')}
            className="p-2.5 rounded-xl border border-[#E5E7EB] bg-white/70 flex items-center justify-between opacity-75 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6.5 h-6.5 rounded-full bg-[#F3F4F6] text-[#9CA3AF] flex items-center justify-center text-[10px] font-bold shrink-0">
                🔒
              </div>
              <div className="min-w-0">
                <span className="text-[12px] font-medium text-[#6B7280] font-jakarta block truncate">
                  Student Affairs
                </span>
                <span className="text-[10px] text-[#9CA3AF] block truncate">
                  Unlocks after Bursary
                </span>
              </div>
            </div>
            <span className="text-[9.5px] font-medium text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded shrink-0">
              Locked
            </span>
          </div>
        </div>

        {/* Vault Quick Access Strip */}
        <div
          onClick={() => onShowToast?.('Vault item ready: Dept_Handover_Form_V2.pdf')}
          className="p-2 rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] flex items-center justify-between cursor-pointer hover:bg-white transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[12px]">📄</span>
            <span className="text-[10.5px] font-medium text-[#13241A] truncate">
              Dept_Handover_Form_V2.pdf
            </span>
          </div>
          <span className="text-[9.5px] text-[#15803D] font-semibold shrink-0">In Vault ✓</span>
        </div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function HeroDashboardMockup({ onShowToast }: HeroDashboardMockupProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClearanceId, setSelectedClearanceId] = useState<string | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [uploadModalContext, setUploadModalContext] = useState<UploadContext | null>(null);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleSelectClearance = (clearanceId: string, stepId?: string) => {
    setSelectedClearanceId(clearanceId);
    setSelectedStepId(stepId || null);
    setActiveSection('clearances');
    if (onShowToast) {
      onShowToast(`Viewing ${clearanceId.replace('-', ' ')} clearance`);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'clearances':
        if (selectedClearanceId && selectedStepId) {
          return (
            <ClearanceStepDetailContent
              user={DEMO_USER}
              clearanceId={selectedClearanceId}
              stepId={selectedStepId}
              onBackToClearance={() => setSelectedStepId(null)}
              onBackToAllClearances={() => {
                setSelectedStepId(null);
                setSelectedClearanceId(null);
              }}
              onSelectStep={(stepId) => setSelectedStepId(stepId)}
              onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            />
          );
        }
        if (selectedClearanceId) {
          return (
            <ClearanceDetailContent
              user={DEMO_USER}
              clearanceId={selectedClearanceId}
              onBack={() => {
                setSelectedStepId(null);
                setSelectedClearanceId(null);
              }}
              onSelectStep={(stepId) => setSelectedStepId(stepId)}
              onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            />
          );
        }
        return (
          <MyClearancesContent
            user={DEMO_USER}
            selectedClearanceId={selectedClearanceId}
            onSelectClearance={handleSelectClearance}
            onNavigate={setActiveSection}
          />
        );
      case 'notifications':
        return (
          <NotificationsContent
            user={DEMO_USER}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
            onUnreadCountChange={setUnreadCount}
          />
        );
      case 'timeline':
        return (
          <TimelineContent
            user={DEMO_USER}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
          />
        );
      case 'vault':
        return (
          <DocumentVaultContent
            user={DEMO_USER}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
          />
        );
      case 'settings':
        return (
          <ProfileSettingsContent
            user={DEMO_USER}
            institution={DEMO_INSTITUTION}
            onNavigate={setActiveSection}
          />
        );
      case 'dashboard':
      default:
        return (
          <OverviewContent
            user={DEMO_USER}
            onNavigate={setActiveSection}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onSelectClearance={handleSelectClearance}
            padding="p-1 sm:p-2"
            textSize="text-sm"
          />
        );
    }
  };

  return (
    <div className="h-full w-full bg-white overflow-hidden relative">
      {/* Mobile-tailored Student Dashboard View (shown on < md screens) */}
      <div className="block md:hidden h-full w-full">
        <MobileDashboardView
          onShowToast={onShowToast}
          onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
        />
      </div>

      {/* Desktop Full Student Dashboard View (shown on md+ screens) */}
      <div className="hidden md:flex h-full w-full bg-white overflow-hidden relative">
        {/* Real Student Sidebar [385:191] */}
        <StudentSidebar
          user={DEMO_USER}
          activeSection={activeSection}
          onNavigate={(section) => {
            setSelectedClearanceId(null);
            setSelectedStepId(null);
            setActiveSection(section);
            if (onShowToast) {
              onShowToast(`Switched tab to ${section}`);
            }
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          unreadCount={unreadCount}
          className="h-full hidden md:flex"
        />

        {/* Main Column: Real HeaderBar [385:299] + Real Content [385:39] */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <HeaderBar
            institution={DEMO_INSTITUTION}
            onNavigate={(section) => {
              setSelectedClearanceId(null);
              setSelectedStepId(null);
              setActiveSection(section);
              if (onShowToast) {
                onShowToast(`Switched tab to ${section}`);
              }
            }}
            unreadCount={unreadCount}
          />

          {/* Scrollable Viewport with Real Dashboard Page */}
          <div className="flex-1 overflow-y-auto min-w-0 bg-white">
            {renderContent()}
          </div>
        </div>

        {/* Bottom Fade Gradient matching Figma [385:334] */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Shared Upload Modal inside Mockup */}
      <UploadDocumentModal
        isOpen={!!uploadModalContext}
        context={uploadModalContext}
        onClose={() => setUploadModalContext(null)}
        onUploadSuccess={(docName) => {
          if (onShowToast) {
            onShowToast(`File attached: ${docName}`);
          }
        }}
      />
    </div>
  );
}
