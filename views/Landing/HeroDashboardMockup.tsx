'use client';

import React, { useState } from 'react';
import type { User } from '@/types';
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

const DEMO_INSTITUTION = INSTITUTIONS[0];

const DEMO_USER: User = {
  id: 'usr_demo_victor',
  email: 'victor.chibuzo@futo.edu.ng',
  name: 'Victor Chibuzo',
  role: 'student',
  schoolCode: 'FUTO',
  matricNo: '2019/114829',
  department: 'Computer Science',
};

interface HeroDashboardMockupProps {
  onShowToast?: (message: string) => void;
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
    <div className="flex h-full w-full bg-white overflow-hidden relative">
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

      {/* Bottom Fade Gradient matching Figma [385:334] */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
