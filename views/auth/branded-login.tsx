'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Institution, User } from '@/types/index';
import LeftPanel from '@/components/auth/BrandedLogin/LeftPanel';
import RightPanel from '@/components/auth/BrandedLogin/RightPanel';
import MfaPanel from '@/components/auth/BrandedLogin/MfaPanel';

interface BrandedLoginProps {
    institution: Institution;
}

export default function BrandedLogin({ institution }: BrandedLoginProps) {
    const router = useRouter();
    const [currentSubView, setCurrentSubView] = useState<'login' | 'two-factor'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resolvedRole, setResolvedRole] = useState<User['role']>('staff');

    const staffDomain = institution.allowedDomains[0];
    const studentDomain = institution.allowedDomains[1] || staffDomain;

    const handleDomainPillClick = (domain: string) => {
        const prefix = email.includes('@') ? email.split('@')[0] : email;
        setEmail(`${prefix || 'student'}@${domain}`);
        setErrorMsg('');
    };

    const handleFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        const username = email.trim().split('@')[0];

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setErrorMsg('Invalid credentials. Please try again.');
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

    const handleMfaAuthenticationSuccess = () => {
        router.push(`/${resolvedRole}/${institution.code.toLowerCase()}`);
    };

    return (
        <div className="w-full flex flex-col md:flex-row min-h-145 border border-edge rounded-2xl overflow-hidden bg-surface-card shadow-[var(--shadow-card)] relative">

            <LeftPanel
                code={institution.code}
                name={institution.name}
                motto={institution.motto}
                staffDomain={staffDomain}
                bannerGradient={institution.colorTheme.bannerGradient}
                studentDomain={studentDomain}
            />

            {currentSubView === 'login' ? (
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
                />
            ) : (
                <MfaPanel
                    code={institution.code}
                    onBackToLogin={() => setCurrentSubView('login')}
                    onMfaSuccess={handleMfaAuthenticationSuccess}
                />
            )}
        </div>
    );
}
