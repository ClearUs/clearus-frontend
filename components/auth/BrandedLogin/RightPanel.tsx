import React from 'react'
import { motion } from 'framer-motion';
import UniversityCrest from '@/components/landing/UniversityCrest';
import { Eye, EyeOff, Mail, ShieldAlert, AlertCircle } from 'lucide-react';
import { Institution } from '@/types';

interface RightPanelProps {
    code: string;
    studentDomain: string;
    email: string;
    showPassword: boolean;
    password: string;
    errorMsg: string;
    isLoading?: boolean;
    institution: Institution;
    handleFormSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    setEmail: (value: string) => void;
    handleDomainPillClick: (domain: string) => void;
    setErrorMsg: (value: string) => void;
    setPassword: (value: string) => void;
    setShowPassword: (value: boolean) => void;
}

export default function RightPanel({
    code,
    studentDomain,
    institution,
    email,
    showPassword,
    password,
    errorMsg,
    isLoading = false,
    handleFormSubmit,
    setEmail,
    handleDomainPillClick,
    setErrorMsg,
    setPassword,
    setShowPassword
}: RightPanelProps) {

    const getEmailDomainState = () => {
        if (!email) return { state: 'empty', text: 'Enter official email' };
        const parts = email.split('@');
        if (parts.length < 2) {
            return { state: 'typing_local', text: 'Waiting for @ domain...' };
        }
        const domain = parts[1].toLowerCase();
        if (!domain) {
            return { state: 'typing_domain', text: 'Choose or type domain' };
        }
        if (institution.allowedDomains.includes(domain)) {
            return { state: 'valid', text: 'Verified Institutional Domain', domain };
        }
        const hasPartialMatch = institution.allowedDomains.some(d => d.startsWith(domain));
        if (hasPartialMatch) {
            return { state: 'partial', text: 'Matching...' };
        }
        return { state: 'invalid', text: 'Domain unauthorized for this portal' };
    };

    const domainState = getEmailDomainState();

    return (
        <div className="flex-1 bg-surface-inset p-8 flex flex-col justify-center">
            <div className="max-w-sm w-full mx-auto space-y-6">

                <div className="flex items-center gap-3">
                    <UniversityCrest code={code} />
                    <div>
                        <h2 className="text-xl font-serif italic text-heading leading-none">Sign In</h2>
                        <p className="text-muted text-[11px] mt-1">Access the clearance registry with your university-issued identity.</p>
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted font-mono">Email Address</label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 w-4 h-4 text-subtle" />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                                placeholder={`student@student.${studentDomain}`}
                                className="w-full pl-10 pr-4 py-2.5 bg-bg-dark border border-edge rounded-xl text-heading placeholder-subtle text-sm focus:outline-none focus:border-green-500/40 transition-colors font-medium"
                                required
                            />
                        </div>

                        <div className="mt-1.5 flex flex-wrap gap-1.5 items-center min-h-5">
                            {domainState.state === 'valid' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-sans">
                                    <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                                    ✓ Approved Domain: {domainState.domain}
                                </span>
                            ) : domainState.state === 'invalid' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full font-sans">
                                    <AlertCircle className="w-3 h-3 text-rose-400" />
                                    ✗ Domain Unauthorized
                                </span>
                            ) : (
                                <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted font-mono">
                                    <span>Allowed:</span>
                                    {institution.allowedDomains.map(d => (
                                        <button
                                          key={d}
                                          type="button"
                                          onClick={() => handleDomainPillClick(d)}
                                          className="bg-chip hover:bg-chip-hover text-secondary border border-edge-subtle px-1.5 py-0.5 rounded text-[9px] transition-colors cursor-pointer"
                                        >
                                          @{d}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted font-mono">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-3.5 pr-10 py-2.5 bg-bg-dark border border-edge rounded-xl text-heading placeholder-subtle text-sm focus:outline-none focus:border-green-500/40 transition-colors font-mono tracking-widest"
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

                    <div className="text-right">
                        <span className="text-xs text-muted hover:text-heading transition-colors cursor-pointer font-medium font-sans">Forgot Password?</span>
                    </div>

                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-rose-500/10 text-rose-300 border border-rose-500/15 p-3 rounded-xl flex items-start gap-2 text-xs font-sans leading-normal"
                        >
                            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div>{errorMsg}</div>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-black rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-green-500/10 cursor-pointer"
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

            </div>
        </div>
    )
}
