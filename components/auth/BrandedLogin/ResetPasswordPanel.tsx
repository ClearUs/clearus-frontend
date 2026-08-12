'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import UniversityCrest from '@/components/landing/UniversityCrest';

interface ResetPasswordPanelProps {
    code: string;
    initialEmail: string;
    tenant: string;
    onBackToLogin: () => void;
}

type ResetStep = 'enter-email' | 'verify-and-reset' | 'success';

export default function ResetPasswordPanel({ code, initialEmail, tenant, onBackToLogin }: ResetPasswordPanelProps) {
    const [step, setStep] = useState<ResetStep>(initialEmail ? 'verify-and-reset' : 'enter-email');
    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (step === 'verify-and-reset') {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [step]);

    const handleOtpChange = (val: string, index: number) => {
        if (val && !/^\d$/.test(val)) return;
        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);
        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
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
            setOtp(pastedData.split(''));
            inputRefs.current[5]?.focus();
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStep('verify-and-reset');
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const codeString = otp.join('');
        if (codeString.length !== 6) {
            setErrorMsg('Please enter the complete 6-digit code.');
            return;
        }
        if (!newPassword) {
            setErrorMsg('Please enter a new password.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), code: codeString, new_password: newPassword, tenant }),
            });

            if (!res.ok) {
                const data = await res.json();
                setErrorMsg(data.detail || 'Password reset failed. Please check your code and try again.');
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
        <div className="flex-1 bg-surface-inset p-8 flex flex-col justify-center">
            <div className="max-w-sm w-full mx-auto space-y-6">
                <div className="flex items-center gap-3">
                    <UniversityCrest code={code} />
                    <div>
                        <h2 className="text-xl font-serif italic text-heading leading-none">Reset Password</h2>
                        <p className="text-muted text-[11px] mt-1">
                            {step === 'enter-email' && 'Enter your email to receive a reset code.'}
                            {step === 'verify-and-reset' && 'Enter the code sent to your email and set a new password.'}
                            {step === 'success' && 'Your password has been updated.'}
                        </p>
                    </div>
                </div>

                {step === 'enter-email' && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted font-mono">Email Address</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3.5 w-4 h-4 text-subtle" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.edu"
                                    className="w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-edge rounded-xl text-heading placeholder-subtle text-sm focus:outline-none focus:border-green-500/40 transition-colors font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 hover:bg-green-400 font-bold text-black rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-green-500/10 cursor-pointer"
                        >
                            Continue
                        </button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="w-full text-center text-xs text-muted hover:text-heading transition-colors flex items-center justify-center gap-1 font-semibold cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                        </button>
                    </form>
                )}

                {step === 'verify-and-reset' && (
                    <form onSubmit={handleResetSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted font-mono">Verification Code</label>
                            <div className="flex justify-between gap-2">
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
                                        disabled={isLoading}
                                        className="w-11 h-12 bg-white border border-slate-200 rounded-xl text-center text-lg font-bold font-mono text-slate-900 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all disabled:opacity-50"
                                        inputMode="numeric"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted font-mono">New Password</label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3.5 w-4 h-4 text-subtle" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full pl-10 pr-10 py-2.5 bg-bg-dark border border-edge rounded-xl text-heading placeholder-subtle text-sm focus:outline-none focus:border-green-500/40 transition-colors font-mono tracking-widest"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 text-faint hover:text-heading transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-rose-500/10 text-rose-300 border border-rose-500/15 p-3 rounded-xl flex items-start gap-2 text-xs font-sans leading-normal"
                            >
                                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                <div>{errorMsg}</div>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-black rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-green-500/10 cursor-pointer"
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="w-full text-center text-xs text-muted hover:text-heading transition-colors flex items-center justify-center gap-1 font-semibold cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                        </button>
                    </form>
                )}

                {step === 'success' && (
                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-xs space-y-2 flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-green-400">Password updated successfully</p>
                                <p className="text-secondary mt-1">You can now sign in with your new password.</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="w-full py-3 bg-green-500 hover:bg-green-400 font-bold text-black rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-green-500/10 cursor-pointer"
                        >
                            Back to Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
