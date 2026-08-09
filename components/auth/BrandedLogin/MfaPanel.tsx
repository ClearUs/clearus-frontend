'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import UniversityCrest from '@/components/landing/UniversityCrest';

interface MfaPanelProps {
    code: string;
    onBackToLogin: () => void;
    onMfaSuccess: () => void;
}

export default function MfaPanel({ code, onBackToLogin, onMfaSuccess }: MfaPanelProps) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [isShaking, setIsShaking] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [countdown, setCountdown] = useState(119); // 01:59 standard countdown
    const [useBackupCodes, setUseBackupCodes] = useState(false);
    const [backupInput, setBackupCodeInput] = useState('');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown clock timer loop
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // Focus anchor loop on view mount
    useEffect(() => {
        if (!useBackupCodes) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [useBackupCodes]);

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `Resend code in ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const triggerVerification = (codeString: string) => {
        // Prototype token match hook: "123456"
        if (codeString === '123456') {
            setErrorMsg('');
            onMfaSuccess();
        } else {
            setOtp(Array(6).fill(''));
            setErrorMsg('Invalid verification token layout. Please check your device profile and retry.');
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                inputRefs.current[0]?.focus();
            }, 500);
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

    const handleBackupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (backupInput.trim().toUpperCase() === 'BACKUP123') {
            onMfaSuccess();
        } else {
            setErrorMsg('Invalid backup recovery credential.');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    return (
        <div className="flex-1 bg-[#0a0a0a] p-8 flex flex-col justify-center">
            <motion.div
                animate={isShaking ? { x: [-6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-sm w-full mx-auto space-y-6"
            >
                <div className="flex items-center gap-3">
                    <UniversityCrest code={code} />
                    <div>
                        <h2 className="text-2xl font-serif italic text-white tracking-tight">Two-Factor Authentication</h2>
                        <p className="text-white/45 text-xs mt-1">
                            {useBackupCodes ? "Verify session access using physical university recovery backsheets." : "Verify your session identity using the code generated for your profile."}
                        </p>
                    </div>
                </div>

                {!useBackupCodes ? (
                    /* Digit Inputs Interface container */
                    <div className="space-y-6">
                        <div className="bg-white/2 border border-white/5 p-4 rounded-xl text-xs space-y-1">
                            <div className="font-bold text-amber-400 font-mono flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                <span>MFA SECURED SESSION</span>
                            </div>
                            <p className="text-white/70">
                                Enter the 6-digit numeric token that has been generated. For demo purposes, you can use <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">123456</strong>.
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
                                    className="w-12 h-14 bg-white border border-slate-200 rounded-xl text-center text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 focus:bg-slate-50 transition-all"
                                    autoFocus={idx === 0}
                                    inputMode="numeric"
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono">
                            {countdown > 0 ? (
                                <span className="text-white/40">
                                    {formatCountdown(countdown)}
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setCountdown(119)}
                                    className="text-green-400 hover:text-green-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
                                >
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                                    <span>Resend verification code</span>
                                </button>
                            )}
                        </div>

                        {errorMsg && (
                            <div className="bg-rose-500/10 text-rose-300 border border-rose-500/15 p-3 rounded-xl flex items-start gap-2 text-xs font-sans leading-normal">
                                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                <div>{errorMsg}</div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => { setUseBackupCodes(true); setErrorMsg(''); }}
                                className="text-xs text-amber-400 hover:text-amber-300 transition-colors hover:underline font-semibold cursor-pointer"
                            >
                                Verify using backup codes
                            </button>
                            <button
                                type="button"
                                onClick={onBackToLogin}
                                className="text-xs text-white/45 hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Return to Sign In
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Emergency Fallback Override Panel form loop */
                    <form onSubmit={handleBackupSubmit} className="space-y-4">
                        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs space-y-1">
                            <span className="font-bold text-amber-400 font-mono block">EMERGENCY BYPASS SHEET</span>
                            <p className="text-white/70">Use simulation sequence <strong className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">BACKUP123</strong>.</p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono">Recovery Code</label>
                            <input
                                type="text"
                                value={backupInput}
                                onChange={e => setBackupCodeInput(e.target.value)}
                                placeholder="BACKUP123"
                                className="w-full px-4 py-2.5 bg-bg-dark border border-white/10 rounded-xl text-white font-mono tracking-widest uppercase focus:outline-none focus:border-green-500/40"
                                required
                            />
                        </div>

                        {errorMsg && (
                            <div className="bg-rose-500/10 text-rose-300 border border-rose-500/15 p-3 rounded-xl text-xs">
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                        >
                            Validate Override Token
                        </button>

                        <button
                            type="button"
                            onClick={() => { setUseBackupCodes(false); setErrorMsg(''); }}
                            className="w-full text-center text-xs text-white/40 hover:text-white transition-colors mt-2 block"
                        >
                            Back to numeric OTP grid
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}