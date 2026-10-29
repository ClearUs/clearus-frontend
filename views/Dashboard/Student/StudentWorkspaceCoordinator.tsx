'use client';

import React, { useState } from 'react';
import type { Institution, User } from '@/types';
import StudentSidebar from '@/components/dashboard/student/Sidebar';
import HeaderBar from '@/components/dashboard/student/HeaderBar';
import OverviewContent from '@/components/dashboard/student/OverviewContent';
import MyClearancesContent from '@/components/dashboard/student/MyClearancesContent';
import ClearanceDetailContent from '@/components/dashboard/student/ClearanceDetailContent';
import DocumentVaultContent from '@/components/dashboard/student/DocumentVaultContent';
import TimelineContent from '@/components/dashboard/student/TimelineContent';
import NotificationsContent from '@/components/dashboard/student/NotificationsContent';
import ProfileSettingsContent from '@/components/dashboard/student/ProfileSettingsContent';
import UploadDocumentModal, {
  type UploadContext,
} from '@/components/dashboard/student/UploadDocumentModal';

interface StudentWorkspaceProps {
  institution: Institution;
  user: User;
}

export default function StudentWorkspaceCoordinator({ institution, user }: StudentWorkspaceProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClearanceId, setSelectedClearanceId] = useState<string | null>(null);
  const [uploadModalContext, setUploadModalContext] = useState<UploadContext | null>(null);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleSelectClearance = (clearanceId: string) => {
    setSelectedClearanceId(clearanceId);
    setActiveSection('clearances');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'clearances':
        if (selectedClearanceId) {
          return (
            <ClearanceDetailContent
              user={user}
              clearanceId={selectedClearanceId}
              onBack={() => setSelectedClearanceId(null)}
              onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            />
          );
        }
        return (
          <MyClearancesContent
            user={user}
            selectedClearanceId={selectedClearanceId}
            onSelectClearance={handleSelectClearance}
            onNavigate={setActiveSection}
          />
        );
      case 'notifications':
        return (
          <NotificationsContent
            user={user}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
            onUnreadCountChange={setUnreadCount}
          />
        );
      case 'timeline':
        return (
          <TimelineContent
            user={user}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
          />
        );
      case 'vault':
        return (
          <DocumentVaultContent
            user={user}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onNavigate={setActiveSection}
          />
        );
      case 'settings':
        return (
          <ProfileSettingsContent
            user={user}
            institution={institution}
            onNavigate={setActiveSection}
          />
        );
      case 'dashboard':
      default:
        return (
          <OverviewContent
            user={user}
            onNavigate={setActiveSection}
            onOpenUploadModal={(ctx) => setUploadModalContext(ctx)}
            onSelectClearance={handleSelectClearance}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <StudentSidebar
        user={user}
        activeSection={activeSection}
        onNavigate={(section) => {
          setSelectedClearanceId(null);
          setActiveSection(section);
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        unreadCount={unreadCount}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar
          institution={institution}
          onNavigate={(section) => {
            setSelectedClearanceId(null);
            setActiveSection(section);
          }}
          unreadCount={unreadCount}
        />
        {renderContent()}
      </div>

      {/* Shared Upload Modal */}
      <UploadDocumentModal
        isOpen={!!uploadModalContext}
        context={uploadModalContext}
        onClose={() => setUploadModalContext(null)}
        onUploadSuccess={(docName) => {
          console.log(`Document uploaded successfully: ${docName}`);
        }}
      />
    </div>
  );
}
