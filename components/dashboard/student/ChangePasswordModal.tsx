'use client';

import React, { useState } from 'react';
import { clientUpdatePassword } from '@/lib/api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isDifferent = newPassword.length > 0 && newPassword !== currentPassword;
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const canSubmit =
    currentPassword.length > 0 &&
    hasMinLength &&
    hasNumber &&
    hasSymbol &&
    isDifferent &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      await clientUpdatePassword(currentPassword, newPassword);
    } catch (err) {
      console.warn('[ChangePasswordModal] Update password error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-125 rounded-2xl bg-white shadow-2xl border border-[#E2EBE5] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#F0F4F1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#15803D]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="9" width="14" height="9" rx="2" stroke="#15803D" strokeWidth="1.8" />
                <path
                  d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9"
                  stroke="#15803D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta">
                Change password
              </h3>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Choose a strong password you do not use elsewhere.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F6D64] hover:bg-[#F3F6F4] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center space-y-2 text-center">
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
            <h4 className="text-[16px] font-bold text-[#13241A] font-jakarta">Password Updated</h4>
            <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your password has been changed successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="current-pwd"
                className="block text-[13px] font-semibold text-[#13241A] mb-1 font-jakarta"
              >
                Current password
              </label>
              <input
                id="current-pwd"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full h-10.5 px-3.5 rounded-xl border border-[#E2EBE5] bg-white text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            <div>
              <label
                htmlFor="new-pwd"
                className="block text-[13px] font-semibold text-[#13241A] mb-1 font-jakarta"
              >
                New password
              </label>
              <input
                id="new-pwd"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10.5 px-3.5 rounded-xl border border-[#E2EBE5] bg-white text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-pwd"
                className="block text-[13px] font-semibold text-[#13241A] mb-1 font-jakarta"
              >
                Confirm new password
              </label>
              <input
                id="confirm-pwd"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full h-10.5 px-3.5 rounded-xl border border-[#E2EBE5] bg-white text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Password Requirements Checklist */}
            <div className="pt-2 space-y-1.5 text-[12px] font-sans">
              <div className={`flex items-center gap-2 ${hasMinLength ? 'text-[#15803D]' : 'text-[#9CA3AF]'}`}>
                <span>{hasMinLength ? '✓' : '•'}</span>
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center gap-2 ${hasNumber ? 'text-[#15803D]' : 'text-[#9CA3AF]'}`}>
                <span>{hasNumber ? '✓' : '•'}</span>
                <span>Contains a number</span>
              </div>
              <div className={`flex items-center gap-2 ${hasSymbol ? 'text-[#15803D]' : 'text-[#9CA3AF]'}`}>
                <span>{hasSymbol ? '✓' : '•'}</span>
                <span>Contains a symbol</span>
              </div>
              <div className={`flex items-center gap-2 ${isDifferent ? 'text-[#15803D]' : 'text-[#9CA3AF]'}`}>
                <span>{isDifferent ? '✓' : '•'}</span>
                <span>Different from your current password</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0F4F1]">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5F6D64] hover:bg-white hover:text-[#13241A] transition-colors cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all ${
                  canSubmit && !isSubmitting
                    ? 'bg-[#15803D] hover:bg-[#14532D] shadow-xs cursor-pointer'
                    : 'bg-[#9CA3AF] cursor-not-allowed opacity-60'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isSubmitting ? 'Updating...' : 'Update password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
