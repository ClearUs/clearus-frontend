'use client';

import React, { useState, useRef } from 'react';

interface ContactRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 6.5C3 5.39543 3.89543 4.5 5 4.5H17C18.1046 4.5 19 5.39543 19 6.5V15.5C19 16.6046 18.1046 17.5 17 17.5H5C3.89543 17.5 3 16.6046 3 15.5V6.5Z"
        stroke="#15803D"
        strokeWidth="2"
      />
      <path
        d="M3 7L11 12.5L19 7"
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

function ClipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15.5 8.5L9.5 14.5C8.11929 15.8807 5.88071 15.8807 4.5 14.5C3.11929 13.1193 3.11929 10.8807 4.5 9.5L10.5 3.5C11.3284 2.67157 12.6716 2.67157 13.5 3.5C14.3284 4.32843 14.3284 5.67157 13.5 6.5L7.5 12.5C7.08579 12.9142 6.41421 12.9142 6 12.5C5.58579 12.0858 5.58579 11.4142 6 11L11.5 5.5"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TOPICS = [
  'Clearance question',
  'Document issue',
  'Deadline extension',
  'Payment verification',
  'Other inquiry',
];

export default function ContactRegistryModal({
  isOpen,
  onClose,
  onSuccess,
}: ContactRegistryModalProps) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSubject('');
        setMessage('');
        setAttachedFile(null);
        if (onSuccess) onSuccess();
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
      {/* Scrim backdrop matching Figma [205:6526] */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma [205:6527] (560x573, r=20, fill=#FFFFFF) */}
      <div className="relative w-full max-w-[560px] rounded-[20px] bg-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header [205:6528] (560x98, pad=[22,24,22,24], gap=14) */}
        <div className="flex items-start justify-between px-6 py-[22px] border-b border-[#F0F4F1] shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Icon [205:6529] 44x44, r=12, fill=#F0FDF4 */}
            <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <MailIcon />
            </div>
            {/* Titles [205:6533] gap=4 */}
            <div className="min-w-0">
              <h3 className="text-[20px] font-bold text-[#13241A] font-jakarta leading-tight">
                Contact the Academic Registry
              </h3>
              <p className="text-[14px] text-[#5E7165] font-sans mt-1">
                Replies usually arrive within 1 working day.
              </p>
            </div>
          </div>

          {/* Close [205:6536] 36x36, r=10, fill=#F7FBF8 */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-[#F7FBF8] flex items-center justify-center text-[#5E7165] hover:bg-[#EEF4F0] transition-colors cursor-pointer shrink-0 ml-4"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form Body [205:6540] (pad=[0,24,24,24], gap=16) */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L9 17L19 7" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="text-[18px] font-bold text-[#13241A] font-jakarta">Message Sent</h4>
            <p className="text-[14px] text-[#5E7165] font-sans">The Academic Registry has received your message and will respond shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 pt-5 space-y-4">
              {/* Topic Field [205:6541] (512x74, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Topic
                </label>
                <div className="relative">
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10 appearance-none cursor-pointer"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
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

              {/* Subject Field [205:6547] (512x74, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your message"
                  required
                  className="w-full h-12 px-3.5 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] placeholder-[#8A9A90] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10"
                />
              </div>

              {/* Message Field [205:6551] (512x146, gap=6) */}
              <div className="space-y-1.5">
                <label className="block text-[13px] text-[#5E7165] font-sans font-normal">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what you need help with…"
                  rows={4}
                  required
                  className="w-full h-[120px] px-3.5 py-3 rounded-xl border border-[#C9D8CE] bg-white text-[14px] font-medium text-[#13241A] placeholder-[#8A9A90] font-sans focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/10 resize-none"
                />
              </div>

              {/* Attachment Button [205:6555] */}
              <div className="flex items-center justify-between pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#15803D] hover:text-[#14532D] cursor-pointer font-sans"
                >
                  <ClipIcon />
                  <span>{attachedFile ? attachedFile.name : 'Attach a file'}</span>
                </button>
                {attachedFile && (
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="text-[12px] text-[#B42318] hover:underline cursor-pointer font-sans"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Divider [205:6559] 560x1, fill=#E2EBE5 */}
            <div className="w-full h-px bg-[#E2EBE5]" />

            {/* Footer [205:6560] (560x76, pad=[16,24,16,24], gap=12) */}
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
                disabled={isSending || !subject.trim() || !message.trim()}
                className={`px-5 py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer shadow-xs font-sans ${
                  subject.trim() && message.trim() && !isSending
                    ? 'bg-[#15803D] hover:bg-[#14532D] text-white'
                    : 'bg-[#E2EBE5] text-[#8A9A90] cursor-not-allowed'
                }`}
              >
                {isSending ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
