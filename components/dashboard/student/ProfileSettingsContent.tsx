'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { User, Institution } from '@/types';
import ChangePasswordModal from '@/components/dashboard/student/ChangePasswordModal';
import { getStudentMe, type StudentProfile } from '@/lib/api';

interface ProfileSettingsContentProps {
  user: User;
  institution: Institution;
  onNavigate?: (section: string) => void;
}

/* ─── SVG Icons ─── */

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-[#9CA3AF]">
      <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5.5 7V5C5.5 3.61929 6.61929 2.5 8 2.5C9.38071 2.5 10.5 3.61929 10.5 5V7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditPencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-[#15803D]">
      <path
        d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="6.5" cy="11.5" r="4" stroke="#15803D" strokeWidth="1.6" />
      <path
        d="M9.5 8.5L14.5 3.5M14.5 3.5H16.5M14.5 3.5V5.5"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5L3.5 3.75V8.25C3.5 12.25 9 16.5 9 16.5C9 16.5 14.5 12.25 14.5 8.25V3.75L9 1.5Z"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8.5L8.25 10.25L11.75 6.75"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="5.5" y="2" width="7" height="14" rx="1.5" stroke="#15803D" strokeWidth="1.6" />
      <path d="M8.5 13H9.5" stroke="#15803D" strokeWidth="1.6" strokeLinecap="round" />
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

export default function ProfileSettingsContent({
  user,
  institution: _institution,
  onNavigate,
}: ProfileSettingsContentProps) {
  const router = useRouter();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  // Editable fields simulation
  const [email, setEmail] = useState(user.email || 'chinedu.okonkwo@student.futo.edu.ng');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [phone, setPhone] = useState('+234 803 555 0142');
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentMe().then((res) => {
      if (mounted && res) {
        setProfile(res);
        if (res.user?.email) setEmail(res.user.email);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const [sessionsSignedOut, setSessionsSignedOut] = useState(false);

  const handleSignOutOtherDevices = () => {
    setSessionsSignedOut(true);
    setTimeout(() => setSessionsSignedOut(false), 3000);
  };

  const handleSignOut = () => {
    router.push('/auth/signed-out');
  };

  return (
    <div className="flex-1 flex overflow-hidden min-w-0 bg-white">
      {/* Main scrollable column */}
      <div className="flex-1 overflow-y-auto px-6 xl:px-10 py-8 min-w-0">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold text-[#13241A] font-jakarta tracking-tight mb-1">
            Profile & settings
          </h1>
          <p className="text-[14px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your student record and account security.
          </p>
        </div>

        {/* Student Profile Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 mb-6 shadow-xs">
          {/* Avatar and Name banner */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#F0F4F1] mb-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#D1D5DB] shrink-0 border border-[#E2EBE5]">
                <Image
                  src="/images/profile.png"
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-[20px] font-bold text-[#13241A] font-jakarta">
                  {profile ? `${profile.user.first_name} ${profile.user.last_name}` : user.name}
                </h2>
                <p className="text-[13px] text-[#5F6D64] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Matric no. {profile?.matric_number || user.matricNo || '2021/104928'}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D] font-sans">
              Final year · 2025/2026
            </span>
          </div>

          {/* Academic & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Faculty (Locked) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Faculty
                </span>
                <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                  Faculty of Physical Sciences
                </span>
              </div>
              <LockIcon />
            </div>

            {/* Department (Locked) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Department
                </span>
                <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                  {(typeof profile?.academic_unit === 'object' && profile?.academic_unit?.name) || user.department || 'Computer Science'}
                </span>
              </div>
              <LockIcon />
            </div>

            {/* Programme (Locked) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Programme
                </span>
                <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                  B.Sc Computer Science
                </span>
              </div>
              <LockIcon />
            </div>

            {/* Level (Locked) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-[#F7FBF8] flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Level
                </span>
                <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                  {profile?.level ? `${profile.level} Level` : '400 Level'}
                </span>
              </div>
              <LockIcon />
            </div>

            {/* Email Address (Editable) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-white flex items-center justify-between focus-within:border-[#15803D]">
              <div className="flex-1 mr-2">
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Email address
                </span>
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setIsEditingEmail(false)}
                    autoFocus
                    className="w-full text-[14px] text-[#13241A] font-jakarta bg-transparent outline-none"
                  />
                ) : (
                  <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                    {email}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#F3F6F4] transition-colors cursor-pointer"
                title="Edit email address"
              >
                <EditPencilIcon />
              </button>
            </div>

            {/* Phone Number (Editable) */}
            <div className="p-3.5 rounded-xl border border-[#E2EBE5] bg-white flex items-center justify-between focus-within:border-[#15803D]">
              <div className="flex-1 mr-2">
                <span className="block text-[11px] text-[#9CA3AF] uppercase font-sans font-medium mb-0.5">
                  Phone number
                </span>
                {isEditingPhone ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setIsEditingPhone(false)}
                    autoFocus
                    className="w-full text-[14px] text-[#13241A] font-jakarta bg-transparent outline-none"
                  />
                ) : (
                  <span className="text-[14px] font-medium text-[#13241A] font-jakarta">
                    {phone}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#F3F6F4] transition-colors cursor-pointer"
                title="Edit phone number"
              >
                <EditPencilIcon />
              </button>
            </div>
          </div>

          {/* Locked fields registry callout notice */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[13px] text-[#15803D]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <circle cx="8" cy="8" r="7" stroke="#15803D" strokeWidth="1.5" />
              <path d="M8 7V11M8 5V5.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif' }}>
              Locked fields come from the Academic Registry. Contact the registry if something is wrong.
            </span>
          </div>
        </div>

        {/* Security Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-6 shadow-xs">
          <h3 className="text-[18px] font-bold text-[#13241A] font-jakarta mb-5">Security</h3>

          <div className="space-y-4">
            {/* Item 1: Password */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#E2EBE5] bg-white hover:border-[#C9D8CE] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0">
                  <KeyIcon />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#13241A] font-jakarta">Password</h4>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Last changed 3 months ago
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-4 py-2 rounded-xl border border-[#15803D] bg-white text-[13px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer self-start sm:self-auto font-jakarta"
              >
                Change password
              </button>
            </div>

            {/* Item 2: 2FA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#E2EBE5] bg-white hover:border-[#C9D8CE] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0">
                  <ShieldCheckIcon />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#13241A] font-jakarta">
                    Two-factor authentication
                  </h4>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Required · codes are sent to c•••••u@student.futo.edu.ng
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D] self-start sm:self-auto font-sans">
                Required
              </span>
            </div>

            {/* Item 3: Active Sessions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#E2EBE5] bg-white hover:border-[#C9D8CE] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0">
                  <DeviceIcon />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#13241A] font-jakarta">Active sessions</h4>
                  <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    This device · Chrome on Android · Active now
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOutOtherDevices}
                className="text-[13px] font-semibold text-[#15803D] hover:underline cursor-pointer self-start sm:self-auto font-jakarta"
              >
                {sessionsSignedOut ? 'Signed out other devices ✓' : 'Sign out other devices'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Side Panels) */}
      <div className="w-[320px] shrink-0 border-l border-[#E2EBE5] p-6 space-y-6 overflow-y-auto">
        {/* University Crest Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#F7FBF8] border border-[#E2EBE5] p-1 flex items-center justify-center shrink-0">
            <Image
              src="/images/futo-crest.png"
              alt="University Crest"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#13241A] font-jakarta leading-tight">
              Federal University of Technology, Owerri
            </h4>
            <p className="text-[12px] text-[#15803D] font-medium font-sans mt-0.5">
              futo.clearus.tech
            </p>
          </div>
        </div>

        {/* Clearance Summary Card */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta mb-4">
            Clearance summary
          </h3>

          <div className="space-y-3 text-[13px] mb-5">
            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Clearances cleared
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">2 of 4</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Receipts needed
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">2</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0F4F1]">
              <span className="text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Deadline
              </span>
              <span className="font-semibold text-[#13241A] font-jakarta">30 Nov 2026</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate?.('clearances')}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] text-white text-[13px] font-semibold hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs font-jakarta"
          >
            <span>View my clearances</span>
            <ArrowRightIcon />
          </button>
        </div>

        {/* Sign out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full py-2.5 rounded-xl border border-[#E2EBE5] bg-white text-[14px] font-semibold text-[#15803D] hover:bg-[#F7FBF8] hover:border-[#C9D8CE] transition-colors cursor-pointer text-center font-jakarta shadow-xs"
        >
          Sign out
        </button>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
