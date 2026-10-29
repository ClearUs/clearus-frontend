'use client';

import React, { useState } from 'react';

export interface MessageOfficerContext {
  officerName: string;
  department: string;
  clearanceTitle: string;
  stepTitle?: string;
}

interface MessageOfficerModalProps {
  isOpen: boolean;
  context: MessageOfficerContext | null;
  onClose: () => void;
  onMessageSent?: () => void;
}

export default function MessageOfficerModal({
  isOpen,
  context,
  onClose,
  onMessageSent,
}: MessageOfficerModalProps) {
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !context) return null;

  const handleSend = () => {
    if (!messageText.trim()) return;
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setMessageText('');
        if (onMessageSent) onMessageSent();
        onClose();
      }, 1200);
    }, 700);
  };

  const handleClose = () => {
    if (!isSending) {
      setMessageText('');
      setIsSent(false);
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
                <path
                  d="M18 5L10 11L2 5"
                  stroke="#15803D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="4"
                  width="16"
                  height="13"
                  rx="2"
                  stroke="#15803D"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta">
                Message the officer
              </h3>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                About: {context.clearanceTitle}
                {context.stepTitle ? ` · ${context.stepTitle}` : ''}
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
        <div className="p-6 space-y-4">
          {/* Recipient info pill */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF8] border border-[#E2EBE5]">
            <span className="text-[13px] text-[#5F6D64] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              To
            </span>
            <span className="text-[13px] font-semibold text-[#13241A] font-jakarta">
              {context.officerName} · <span className="font-normal text-[#5F6D64]">{context.department}</span>
            </span>
          </div>

          {isSent ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center">
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
              <h4 className="text-[16px] font-bold text-[#13241A] font-jakarta">Message Sent</h4>
              <p className="text-[13px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {context.officerName} has received your inquiry and will respond shortly.
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="officer-msg-input"
                className="block text-[13px] font-medium text-[#13241A] mb-1.5 font-jakarta"
              >
                Message
              </label>
              <textarea
                id="officer-msg-input"
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Ask about the requirements or what needs to be verified..."
                className="w-full p-3 rounded-xl border border-[#E2EBE5] bg-white text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D] resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSent && (
          <div className="flex items-center justify-end gap-3 p-4 px-6 bg-[#F7FBF8] border-t border-[#E2EBE5]">
            <button
              type="button"
              disabled={isSending}
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5F6D64] hover:bg-white hover:text-[#13241A] transition-colors cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!messageText.trim() || isSending}
              onClick={handleSend}
              className={`px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all flex items-center gap-2 ${
                messageText.trim() && !isSending
                  ? 'bg-[#15803D] hover:bg-[#14532D] shadow-xs cursor-pointer'
                  : 'bg-[#9CA3AF] cursor-not-allowed opacity-60'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {isSending ? 'Sending...' : 'Send message'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
