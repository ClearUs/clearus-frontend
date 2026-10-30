'use client';

import React, { useState, useRef } from 'react';

interface RequestExtensionModalProps {
  isOpen: boolean;
  currentDeadline?: string;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8.5" stroke="#15803D" strokeWidth="2" />
      <path
        d="M11 6V11L14.5 13"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
        stroke="#5E7165"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2"
        stroke="#8A9A90"
        strokeWidth="1.5"
      />
      <path d="M2 6.5H14" stroke="#8A9A90" strokeWidth="1.5" />
      <path d="M5 1.5V3.5M11 1.5V3.5" stroke="#8A9A90" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 13V4M10 4L6.5 7.5M10 4L13.5 7.5"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13V15C3.5 15.5523 3.94772 16 4.5 16H15.5C16.0523 16 16.5 15.5523 16.5 15V13"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const REASONS = [
  'Medical reasons',
  'Awaiting external document',
  'Fee payment processing',
  'Technical issues',
  'Personal/family emergency',
  'Other',
];

export default function RequestExtensionModal({
  isOpen,
  currentDeadline = '30 Nov 2026',
  onClose,
  onSubmitSuccess,
}: RequestExtensionModalProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [newDate, setNewDate] = useState('15 Dec 2026');
  const [explanation, setExplanation] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setExplanation('');
        setAttachedFile(null);
        if (onSubmitSuccess) onSubmitSuccess();
        onClose();
      }, 1200);
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim backdrop matching Figma [205:7194] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma [205:7195] (560x660, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[560px] rounded-[20px] bg-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header [205:7196] (560x98, pad=[22,24,22,24], gap=14) */}
        <div className="flex items-start justify-between px-6 py-[22px] border-b border-[#F0F4F1] shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Icon [205:7197] 44x44, r=12, fill=#F0FDF4 */}
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <ClockIcon />
            </div>
            {/* Titles [205:7201] gap=4 */}
            <div className="min-w-0">
              <h3 className="text-[20px] font-bold text-[#13241A] font-jakarta leading-tight">
                Request a deadline extension
              </h3>
              <p className="text-[14px] text-[#5E7165] font-sans mt-1">
                The Registry reviews requests within 2 working days.
              </p>
            </div>
          </div>

          {/* Close [205:7204] 36x36, r=10, fill=#F7FBF8 */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-[#F7FBF8] flex items-center justify-center text-[#5E7165] hover:bg-[#EEF4F0] transition-colors cursor-pointer shrink-0 ml-4"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body [205:7208] (pad=[0,24,24,24], gap=16) */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L9 17L19 7" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="text-[18px] font-bold text-[#13241A] font-jakarta">Request Submitted</h4>
            <p className="text-[14px] text-[#5E7165] font-sans">The Registry has received your request and will review within 2 working days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 pt-5 space-y-4">
              {/* Current Deadline Box [205:7209] (512x48, pad=[12,14,12,14], gap=10, r=12, fill=#F0FDF4, stroke=#BBF7D0) */}
              <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3.5 py-3 flex items-center gap-2.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-[#15803D]">
                  <circle cx="9" cy="9" r="7.5" stroke="#15803D" strokeWidth="1.8" />
                  <path d="M9 5V9L11.5 10.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-[14px] font-medium text-[#13241A] font-sans">
                  Current deadline: <strong>{currentDeadline}</strong>
                </span>
              </div>

              {/* Reason Field [205:7214] (512x74, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Reason
                </label>
                <div className="relative">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10 appearance-none cursor-pointer"
                  >
                    {REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A9A90]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Requested New Date [205:7220] (512x74, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Requested new date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="15 Dec 2026"
                    className="w-full h-12 px-3.5 pr-11 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A9A90]">
                    <CalendarIcon />
                  </div>
                </div>
              </div>

              {/* Explain Situation Field [205:7229] (512x126, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Explain your situation
                </label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Tell the Registry why you need more time…"
                  rows={3}
                  required
                  className="w-full h-[100px] px-3.5 py-3 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] placeholder-[#8A9A90] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10 resize-none"
                />
              </div>

              {/* Attachment [205:7233] (512x75, pad=[14,16,14,16], gap=12, r=12, fill=#F0FDF4, stroke=#BBF7D0) */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-xl bg-white border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shrink-0">
                  <UploadIcon />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-[14px] font-medium text-[#13241A] font-sans truncate">
                    {attachedFile ? attachedFile.name : 'Attach a supporting document (optional)'}
                  </p>
                  <p className="text-[13px] text-[#5E7165] font-sans truncate">
                    Medical letter, receipt or official note · PDF, JPG, PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Divider [205:7241] 560x1, fill=#E2EBE5 */}
            <div className="w-full h-px bg-[#E2EBE5]" />

            {/* Footer [205:7242] (560x76, pad=[16,24,16,24], gap=12) */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl text-[14px] font-semibold text-[#33463A] hover:bg-[#F7FBF8] transition-colors cursor-pointer font-sans"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !explanation.trim()}
                className={`px-5 py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer shadow-xs font-sans ${
                  explanation.trim() && !isSubmitting
                    ? 'bg-[#15803D] hover:bg-[#14532D] text-white'
                    : 'bg-[#E2EBE5] text-[#8A9A90] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
