'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Institution, User } from '@/types/index';
import LeftPanel from '@/components/auth/BrandedLogin/LeftPanel';
import RightPanel from '@/components/auth/BrandedLogin/RightPanel';
import MfaPanel from '@/components/auth/BrandedLogin/MfaPanel';
import ResetPasswordPanel from '@/components/auth/BrandedLogin/ResetPasswordPanel';

interface BrandedLoginProps {
    institution: Institution;
}

type SubView = 'login' | 'two-factor' | 'reset-password';

export default function BrandedLogin({ institution }: BrandedLoginProps) {
    const router = useRouter();
    const [currentSubView, setCurrentSubView] = useState<SubView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resolvedRole, setResolvedRole] = useState<User['role']>('staff');

    const staffDomain = institution.allowedDomains[0];
    const studentDomain = institution.allowedDomains[1] || staffDomain;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN; // e.g. "clearus.tech"

    const handleDomainPillClick = (domain: string) => {
        const prefix = email.includes('@') ? email.split('@')[0] : email;
        setEmail(`${prefix || 'student'}@${domain}`);
        setErrorMsg('');
    };

    const handleFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setErrorMsg(data.detail || 'Invalid credentials. Please try again.');
                setIsLoading(false);
                return;
            }

            const codeRes = await fetch('/api/auth/request-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            if (!codeRes.ok) {
                const data = await codeRes.json();
                setErrorMsg(data.detail || 'Failed to send verification code.');
                setIsLoading(false);
                return;
            }

            const domainPart = email.trim().split('@')[1];
            const role = domainPart?.toLowerCase() === studentDomain.toLowerCase() ? 'student' : 'staff';
            setResolvedRole(role);
            setCurrentSubView('two-factor');
        } catch {
            setErrorMsg('Network error. The authentication server may be starting up — please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        const res = await fetch('/api/auth/request-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim() }),
        });
        if (!res.ok) {
            throw new Error('Failed to resend verification code.');
        }
    };

    const handleMfaAuthenticationSuccess = () => {
        const code = institution.code.toLowerCase();
        if (appDomain) {
            window.location.href = `https://${code}.${appDomain}/${resolvedRole}`;
        } else {
            router.push(`/${resolvedRole}/${code}`);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row min-h-145 border border-edge rounded-2xl overflow-hidden bg-surface-card shadow-(--shadow-card) relative">

            <LeftPanel
                code={institution.code}
                name={institution.name}
                motto={institution.motto}
                staffDomain={staffDomain}
                bannerGradient={institution.colorTheme.bannerGradient}
                studentDomain={studentDomain}
            />

            {currentSubView === 'login' && (
                <RightPanel
                    code={institution.code}
                    studentDomain={studentDomain}
                    institution={institution}
                    email={email}
                    showPassword={showPassword}
                    password={password}
                    errorMsg={errorMsg}
                    isLoading={isLoading}
                    handleFormSubmit={handleFormSubmit}
                    setEmail={setEmail}
                    handleDomainPillClick={handleDomainPillClick}
                    setErrorMsg={setErrorMsg}
                    setPassword={setPassword}
                    setShowPassword={setShowPassword}
                    onForgotPassword={() => setCurrentSubView('reset-password')}
                />
            )}

            {currentSubView === 'two-factor' && (
                <MfaPanel
                    code={institution.code}
                    email={email.trim()}
                    onBackToLogin={() => setCurrentSubView('login')}
                    onMfaSuccess={handleMfaAuthenticationSuccess}
                    onResendCode={handleResendCode}
                />
            )}

            {currentSubView === 'reset-password' && (
                <ResetPasswordPanel
                    code={institution.code}
                    initialEmail={email.trim()}
                    onBackToLogin={() => setCurrentSubView('login')}
                />
            )}
        </div>
    );
}
