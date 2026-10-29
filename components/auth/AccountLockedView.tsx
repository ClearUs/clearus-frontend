'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

interface AccountLockedViewProps {
  onResetPassword: () => void;
  lockDuration?: number;
}

export default function AccountLockedView({
  onResetPassword,
  lockDuration = 900,
}: AccountLockedViewProps) {
  const [countdown, setCountdown] = useState(lockDuration);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  return (
    <div className="w-full max-w-[625px]">
      <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-7 h-7 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          Account temporarily locked
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Too many failed sign-in attempts. For your security, you can try again after the timer ends, or reset your password below.
        </p>

        {countdown > 0 && (
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg mb-8">
            <span>{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onResetPassword}
          className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
        >
          Reset my password
        </button>

        <button
          type="button"
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          Contact support
        </button>
      </div>
    </div>
  );
}
