'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import UniversityCrest from '@/components/landing/UniversityCrest';

interface MfaPanelProps {
    code: string;
    email: string;
    tenant: string;
    onBackToLogin: () => void;
    onMfaSuccess: () => void;
    onResendCode: () => Promise<void>;
}

export default function MfaPanel({ code, email, tenant, onBackToLogin, onMfaSuccess, onResendCode }: MfaPanelProps) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [isShaking, setIsShaking] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [countdown, setCountdown] = useState(119);
    const [isResending, setIsResending] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, []);

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `Resend code in ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const triggerVerification = async (codeString: string) => {
        setIsVerifying(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: codeString, tenant }),
            });

            if (!res.ok) {
                const data = await res.json();
                setOtp(Array(6).fill(''));
                setErrorMsg(data.detail || 'Invalid verification code. Please try again.');
                setIsShaking(true);
                setTimeout(() => {
                    setIsShaking(false);
                    inputRefs.current[0]?.focus();
                }, 500);
                return;
            }

            onMfaSuccess();
        } catch {
            setErrorMsg('Network error. Please try again.');
            setOtp(Array(6).fill(''));
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleOtpChange = (val: string, index: number) => {
        if (val && !/^\d$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every(digit => digit !== '') && val) {
            triggerVerification(newOtp.join(''));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);
            inputRefs.current[5]?.focus();
            triggerVerification(pastedData);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await onResendCode();
            setCountdown(119);
            setErrorMsg('');
        } catch {
            setErrorMsg('Failed to resend code. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, start, middle, domain) =>
        `${start}${'*'.repeat(Math.min(middle.length, 6))}${domain}`
    );

    return (
        <div className="flex-1 bg-surface-inset p-8 flex flex-col justify-center">
            <motion.div
                animate={isShaking ? { x: [-6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-sm w-full mx-auto space-y-6"
            >
                <div className="flex items-center gap-3">
                    <UniversityCrest code={code} />
                    <div>
                        <h2 className="text-2xl font-serif italic text-heading tracking-tight">Two-Factor Authentication</h2>
                        <p className="text-muted text-xs mt-1">
                            Enter the 6-digit code sent to {maskedEmail}.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-chip border border-edge-subtle p-4 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-amber-400 font-mono flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>EMAIL VERIFICATION</span>
                        </div>
                        <p className="text-secondary">
                            A verification code has been sent to your email. Enter it below to complete sign-in.
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 md:gap-3">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                maxLength={1}
                                ref={el => { inputRefs.current[idx] = el; }}
                                value={digit}
                                onChange={e => handleOtpChange(e.target.value, idx)}
                                onKeyDown={e => handleKeyDown(e, idx)}
                                onPaste={idx === 0 ? handlePaste : undefined}
                                disabled={isVerifying}
                                className="w-12 h-14 bg-white border border-slate-200 rounded-xl text-center text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 focus:bg-slate-50 transition-all disabled:opacity-50"
                                autoFocus={idx === 0}
                                inputMode="numeric"
                            />
                        ))}
                    </div>

                    {isVerifying && (
                        <div className="text-center text-xs text-muted font-mono">Verifying...</div>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono">
                        {countdown > 0 ? (
                            <span className="text-muted">
                                {formatCountdown(countdown)}
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-green-400 hover:text-green-300 font-bold hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                                <span>{isResending ? 'Sending...' : 'Resend verification code'}</span>
                            </button>
                        )}
                    </div>

                    {errorMsg && (
                        <div className="bg-rose-500/10 text-rose-300 border border-rose-500/15 p-3 rounded-xl flex items-start gap-2 text-xs font-sans leading-normal">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div>{errorMsg}</div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-edge-subtle flex items-center justify-end">
                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="text-xs text-muted hover:text-heading transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Return to Sign In
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
