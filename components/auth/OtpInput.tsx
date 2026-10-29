'use client';

import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function OtpInput({ value, onChange, disabled = false, autoFocus = true }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [autoFocus]);

  const handleChange = (val: string, index: number) => {
    if (val && !/^\d$/.test(val)) return;
    const next = [...value];
    next[index] = val;
    onChange(next);
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...value];
      if (value[index]) {
        next[index] = '';
        onChange(next);
      } else if (index > 0) {
        next[index - 1] = '';
        onChange(next);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      onChange(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {value.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={el => { inputRefs.current[idx] = el; }}
          value={digit}
          onChange={e => handleChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          onPaste={idx === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="w-12 h-14 bg-white border border-gray-200 rounded-xl text-center text-xl font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all disabled:opacity-50"
        />
      ))}
    </div>
  );
}
