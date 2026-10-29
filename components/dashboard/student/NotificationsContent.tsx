'use client';

import React, { useState, useMemo } from 'react';
import type { User } from '@/types';
import { INITIAL_NOTIFICATIONS, type NotificationItem } from '@/data/studentNotifications';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';

interface NotificationsContentProps {
  user: User;
  onOpenUploadModal: (context: UploadContext) => void;
  onNavigate?: (section: string) => void;
  onUnreadCountChange?: (count: number) => void;
}

type NotificationFilter = 'all' | 'unread' | 'approvals' | 'receipts' | 'reminders';

/* ─── SVG Icons ─── */

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#15803D" strokeWidth="1.8" />
      <path d="M9 5V9.5L12 11" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 12V4.5M9 4.5L5.5 8M9 4.5L12.5 8"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 13.5H14.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ApprovedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" fill="#16A34A" />
      <path
        d="M5.5 9.5L8 12L13 6.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UnlockedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="4" y="8" width="10" height="7" rx="1.5" stroke="#15803D" strokeWidth="1.5" />
      <path
        d="M6 8V5.5C6 3.84315 7.34315 2.5 9 2.5C10.6569 2.5 12 3.84315 12 5.5"
        stroke="#15803D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReturnedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#DC2626" strokeWidth="1.8" />
      <path d="M9 6V10.5M9 12.5V13" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
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

export default function NotificationsContent({
  user: _user,
  onOpenUploadModal,
  onUnreadCountChange,
}: NotificationsContentProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');

  // Preferences toggles
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter((n) => n.isUnread).length,
      approvals: notifications.filter((n) => n.category === 'approvals').length,
      receipts: notifications.filter((n) => n.category === 'receipts').length,
      reminders: notifications.filter((n) => n.category === 'reminders').length,
    };
  }, [notifications]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    if (onUnreadCountChange) onUnreadCountChange(0);
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n));
      const unreadCount = updated.filter((n) => n.isUnread).length;
      if (onUnreadCountChange) onUnreadCountChange(unreadCount);
      return updated;
    });
  };

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter((n) => n.isUnread);
    if (activeFilter === 'approvals') return notifications.filter((n) => n.category === 'approvals');
    if (activeFilter === 'receipts') return notifications.filter((n) => n.category === 'receipts');
    if (activeFilter === 'reminders') return notifications.filter((n) => n.category === 'reminders');
    return notifications;
  }, [notifications, activeFilter]);

  const grouped = useMemo(() => {
    const today = filteredNotifications.filter((n) => n.group === 'TODAY');
    const earlier = filteredNotifications.filter((n) => n.group === 'EARLIER THIS MONTH');
    return { today, earlier };
  }, [filteredNotifications]);

  const renderNotificationCard = (item: NotificationItem) => (
    <div
      key={item.id}
      onClick={() => item.isUnread && handleMarkOneRead(item.id)}
      className={`rounded-2xl border p-4.5 transition-all flex items-start gap-3.5 ${
        item.isUnread
          ? 'border-[#C9D8CE] bg-white shadow-xs'
          : 'border-[#E2EBE5] bg-white hover:border-[#C9D8CE]'
      }`}
    >
      {/* Icon block */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          item.iconType === 'approved'
            ? 'bg-transparent'
            : item.iconType === 'returned'
            ? 'bg-[#FEE2E2]'
            : 'bg-[#F0FDF4] border border-[#DCFCE7]'
        }`}
      >
        {item.iconType === 'clock' && <ClockIcon />}
        {item.iconType === 'upload' && <UploadIcon />}
        {item.iconType === 'approved' && <ApprovedIcon />}
        {item.iconType === 'unlocked' && <UnlockedIcon />}
        {item.iconType === 'returned' && <ReturnedIcon />}
      </div>

      {/* Message body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
          <div className="flex items-center gap-2">
            {item.isUnread && (
              <span className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0" />
            )}
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              {item.title}
            </h3>
          </div>
          <span className="text-[12px] text-[#9CA3AF] font-sans shrink-0">
            {item.time}
          </span>
        </div>

        <p className="text-[13px] text-[#5F6D64] leading-relaxed mb-2.5" style={{ fontFamily: 'Inter, sans-serif' }}>
          {item.body}
        </p>

        {/* Action button if actionable notification */}
        {item.action && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkOneRead(item.id);
              onOpenUploadModal({
                clearanceTitle: item.action!.clearanceTitle,
                stepTitle: item.action!.stepTitle,
                docDescription: item.action!.docDescription,
              });
            }}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#15803D] hover:underline cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>{item.action.label}</span>
            <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex overflow-hidden min-w-0 bg-white">
      {/* Main scrollable column */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-10 py-8 min-w-0">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[26px] font-bold text-[#13241A] font-jakarta tracking-tight mb-1">
              Notifications
            </h1>
            <p className="text-[14px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Updates from officers and reminders about your clearance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <CheckIcon />
            <span>Mark all as read</span>
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
            All <span className="opacity-90">{counts.all}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('unread')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'unread'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Unread <span className="opacity-90">{counts.unread}</span>
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

          <button
            type="button"
            onClick={() => setActiveFilter('reminders')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'reminders'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Reminders <span className="opacity-90">{counts.reminders}</span>
          </button>
        </div>

        {/* Notifications Feed */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-7">
            {grouped.today.length > 0 && (
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#9CA3AF] uppercase mb-3 block font-sans">
                  TODAY
                </span>
                <div className="space-y-3">
                  {grouped.today.map(renderNotificationCard)}
                </div>
              </div>
            )}

            {grouped.earlier.length > 0 && (
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#9CA3AF] uppercase mb-3 block font-sans">
                  EARLIER THIS MONTH
                </span>
                <div className="space-y-3">
                  {grouped.earlier.map(renderNotificationCard)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E2EBE5] bg-white p-12 flex flex-col items-center justify-center text-center my-6">
            <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta mb-1.5">
              No notifications in this filter
            </h3>
            <p className="text-[13px] text-[#5F6D64] max-w-105 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Choose a different filter tab or view all notifications.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Show all notifications
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Notification Preferences Panel */}
      <div className="w-[320px] shrink-0 border-l border-[#E2EBE5] p-6 space-y-6 overflow-y-auto">
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta mb-1">
            Notification preferences
          </h3>
          <p className="text-[12px] text-[#5F6D64] mb-5 leading-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Choose how ClearUs reaches you about your clearance.
          </p>

          <div className="space-y-5">
            {/* Preference 1: Email updates */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-[13px] font-semibold text-[#13241A] font-jakarta">
                  Email updates
                </span>
                <span className="block text-[11px] text-[#5F6D64] font-sans">
                  Approvals, returns and receipt reminders
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                  emailUpdates ? 'bg-[#15803D]' : 'bg-[#E2EBE5]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    emailUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Preference 2: In-app notifications */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-[13px] font-semibold text-[#13241A] font-jakarta">
                  In app notifications
                </span>
                <span className="block text-[11px] text-[#5F6D64] font-sans">
                  Always on for clearance actions
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInAppNotifs(!inAppNotifs)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                  inAppNotifs ? 'bg-[#15803D]' : 'bg-[#E2EBE5]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    inAppNotifs ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Preference 3: Weekly summary */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-[13px] font-semibold text-[#13241A] font-jakarta">
                  Weekly summary
                </span>
                <span className="block text-[11px] text-[#5F6D64] font-sans">
                  Progress digest every Monday
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWeeklySummary(!weeklySummary)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                  weeklySummary ? 'bg-[#15803D]' : 'bg-[#E2EBE5]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    weeklySummary ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
