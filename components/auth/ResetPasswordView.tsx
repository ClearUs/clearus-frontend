'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, OctagonAlert } from 'lucide-react';
import OtpInput from './OtpInput';

interface ResetPasswordViewProps {
  initialEmail: string;
  institutionCode: string;
  onBack: () => void;
}

type Step = 'enter-email' | 'link-expired' | 'verify-and-reset' | 'success';

export default function ResetPasswordView({
  initialEmail,
  institutionCode: _institutionCode,
  onBack,
}: ResetPasswordViewProps) {
  const [step, setStep] = useState<Step>('enter-email');
  const [email, setEmail] = useState(initialEmail);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(120);

  useEffect(() => {
    if (step !== 'verify-and-reset' || resendCountdown <= 0) return;
    const t = setInterval(() => setResendCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [step, resendCountdown]);

  const maskedEmail =
    email.length > 4
      ? email.slice(0, 3) + '***' + email.slice(email.indexOf('@'))
      : email;

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          purpose: 'password_reset',
          institution: _institutionCode,
          tenant: _institutionCode,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.detail || 'Failed to send reset code.');
        return;
      }
      setResendCountdown(120);
      setStep('verify-and-reset');
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: digits.join(''),
          new_password: newPassword,
          institution: _institutionCode,
          tenant: _institutionCode,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.detail || 'Reset failed. Check your code and try again.');
        return;
      }
      setStep('success');
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-156.25">
      <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100">
        <button
          type="button"
          onClick={step === 'verify-and-reset' ? () => setStep('enter-email') : onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {step === 'enter-email' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Forgot your password?
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Enter your matric number or email linked to your account and we&apos;ll send a verification code.
            </p>
            <form onSubmit={handleRequestCode} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Matric number or email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                </div>
              </div>
              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? 'Sending...' : (<>Send reset code <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
          </>
        )}

        {step === 'link-expired' && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <OctagonAlert className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              This link has expired
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Reset links are valid for 15 minutes. Request a new one to continue resetting your password.
            </p>
            <button
              type="button"
              onClick={() => setStep('enter-email')}
              className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
            >
              Request a new link
            </button>
            <button type="button" onClick={onBack} className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer block mx-auto">
              Back to sign in
            </button>
          </div>
        )}

        {step === 'verify-and-reset' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Enter code & new password
            </h1>
            <p className="text-gray-500 text-sm mb-2">
              We sent a 6-digit code to <span className="font-medium text-gray-700">{maskedEmail}</span>.
              Enter it along with your new password to reset your account.
            </p>
            <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
              Didn&apos;t find it? Check your spam or junk folder.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Verification code</label>
                <div className="flex justify-center">
                  <OtpInput value={digits} onChange={setDigits} disabled={isLoading} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">New password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
                    required
                  />
                </div>
              </div>
              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-sm">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || digits.join('').length < 6}
                className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
              >
                {isLoading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              {resendCountdown > 0 ? (
                <>Resend code in {Math.floor(resendCountdown / 60).toString().padStart(2, '0')}:{(resendCountdown % 60).toString().padStart(2, '0')}</>
              ) : (
                <button type="button" onClick={(e) => { handleRequestCode(e); }} className="text-green-700 hover:underline font-medium cursor-pointer">
                  Resend code
                </button>
              )}
            </p>
          </>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Password reset!
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Your password has been successfully changed. Sign in with your new password.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Back to sign in <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
