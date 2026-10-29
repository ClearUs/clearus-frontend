'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCw, ShieldCheck, AlertCircle, OctagonAlert } from 'lucide-react';
import OtpInput from './OtpInput';

interface TwoFactorViewProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
  errorMsg: string;
  isLoading: boolean;
}

export default function TwoFactorView({
  email,
  onVerify,
  onResend,
  onBack,
  errorMsg,
  isLoading,
}: TwoFactorViewProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(119);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const code = digits.join('');

  const handleChange = useCallback(
    (next: string[]) => {
      setDigits(next);
      const joined = next.join('');
      if (joined.length === 6 && /^\d{6}$/.test(joined)) {
        onVerify(joined);
      }
    },
    [onVerify],
  );

  const handleResend = async () => {
    setResending(true);
    try {
      await onResend();
      setCountdown(119);
      setDigits(Array(6).fill(''));
    } finally {
      setResending(false);
    }
  };

  const maskedEmail =
    email.length > 4
      ? email.slice(0, 3) + '***' + email.slice(email.indexOf('@'))
      : email;

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  if (countdown <= 0 && code.length < 6) {
    return (
      <div className="w-full max-w-156.25">
        <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <OctagonAlert className="w-7 h-7 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            This code has expired
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Codes are valid for 2 minutes. Request a new one to verify your identity.
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
          >
            {resending ? 'Sending...' : 'Send a new code'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Contact support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-156.25">
      <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-green-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Two-step verification
          </h1>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          We sent a 6-digit code to <span className="font-medium text-gray-700">{maskedEmail}</span>.
          Enter it below to continue.
        </p>

        <div className="flex justify-center mb-6">
          <OtpInput value={digits} onChange={handleChange} disabled={isLoading} />
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm mb-4">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onVerify(code)}
          disabled={isLoading || code.length < 6}
          className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
        >
          {isLoading ? 'Verifying...' : 'Verify your account'}
        </button>

        <div className="text-center mt-6 text-sm text-gray-400 space-y-2">
          <p>
            <button type="button" onClick={onBack} className="text-green-700 hover:underline font-medium cursor-pointer">
              Go to login.
            </button>
            {' '}Session{' '}
            <span className="font-medium text-gray-600">
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </span>
          </p>
          <p>
            <button type="button" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
