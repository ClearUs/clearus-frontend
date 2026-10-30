'use client';

import React from 'react';

interface SignOutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSignOut: () => void;
}

function LogoutIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M12 28H7C5.89543 28 5 27.1046 5 26V6C5 4.89543 5.89543 4 7 4H12"
        stroke="#15803D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 22L27 16L21 10"
        stroke="#15803D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 16H12"
        stroke="#15803D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignOutConfirmModal({
  isOpen,
  onClose,
  onConfirmSignOut,
}: SignOutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop matching Figma [205:13250] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma [205:13251] (440x306, pad=[32,32,32,32], gap=16, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[440px] rounded-[20px] bg-white shadow-2xl p-8 flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Status Icon [205:13252] (72x72, r=999, fill=#F0FDF4) */}
        <div className="w-[72px] h-[72px] rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0 mb-4">
          <LogoutIcon />
        </div>

        {/* Title [205:13257] (font: Plus Jakarta Sans 700 24px, fill=#13241A) */}
        <h3 className="text-[24px] font-bold text-[#13241A] font-jakarta leading-tight mb-2">
          Sign out of ClearUs?
        </h3>

        {/* Message [205:13258] (font: Inter 400 14px, line-height: 22px, fill=#5E7165, w=344) */}
        <p className="w-full max-w-[344px] text-[14px] text-[#5E7165] font-sans leading-[22px] mb-6">
          Your progress is saved. You can sign back in at any time.
        </p>

        {/* Actions [205:13259] (gap=12, HORIZONTAL) */}
        <div className="flex items-center justify-center gap-3 w-full">
          {/* Button / Outline [205:13260] (90x46, pad=[12,20,12,20], r=12, fill=#FFFFFF, stroke=#16A34A) */}
          <button
            type="button"
            onClick={onClose}
            className="h-[46px] px-5 py-3 rounded-xl border border-[#16A34A] bg-white hover:bg-[#F7FBF8] text-[14px] font-semibold text-[#15803D] font-sans transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Button / Primary [205:13262] (96x44, pad=[12,20,12,20], r=12, fill=#16A34A) */}
          <button
            type="button"
            onClick={onConfirmSignOut}
            className="h-[44px] px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-[14px] font-semibold text-white font-sans transition-colors cursor-pointer shadow-xs"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
