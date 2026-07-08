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
    const [resolvedRole, setResolvedRole] = useState<User['role']>('staff');

    const staffDomain = institution.allowedDomains[0];
    const studentDomain = institution.allowedDomains[1] || staffDomain;

    const handleDomainPillClick = (domain: string) => {
        const prefix = email.includes('@') ? email.split('@')[0] : email;
        setEmail(`${prefix || 'student'}@${domain}`);
        setErrorMsg('');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const domainPart = email.trim().split('@')[1];

        if (!domainPart || !institution.allowedDomains.includes(domainPart.toLowerCase())) {
            setErrorMsg(`Access Rejected: The email domain is not authorized for ${institution.shortName}. Please sign in with your official university account.`);
            return;
        }
        
        setErrorMsg('');
        // The email domain determines the role: the student subdomain -> student,
        // anything else on the allow-list -> staff.
        setResolvedRole(domainPart.toLowerCase() === studentDomain.toLowerCase() ? 'student' : 'staff');
        // Shift view state directly into MFA canvas sequence
        setCurrentSubView('two-factor');
    };

    const handleMfaAuthenticationSuccess = () => {
        // BACKEND SEAM: the mock session is a client cookie the server guard reads
        // (see lib/session.ts). Replace this with a login API that sets an
        // httpOnly session cookie server-side; the redirect below stays the same.
        document.cookie = `cu_role=${resolvedRole}; path=/; samesite=lax`;
        // Authenticated profile confirmation; route to the role-scoped workspace.
        router.push(`/${resolvedRole}/${institution.code.toLowerCase()}`);
    };

    return (
        <div className="w-full flex flex-col md:flex-row min-h-145 border border-white/5 rounded-2xl overflow-hidden bg-[#070707] shadow-2xl relative">
            
            {/* LEFT SIDEBAR PANEL: Persistent Identity Shield */}
            <LeftPanel 
                code={institution.code} 
                name={institution.name} 
                motto={institution.motto} 
                staffDomain={staffDomain}
                bannerGradient={institution.colorTheme.bannerGradient} 
                studentDomain={studentDomain} 
            />

            {/* RIGHT WORKACTION PANEL: Conditional Form / MFA render loops */}
            {currentSubView === 'login' ? (
                <RightPanel 
                    code={institution.code} 
                    studentDomain={studentDomain} 
                    institution={institution} 
                    email={email} 
                    showPassword={showPassword} 
                    password={password} 
                    errorMsg={errorMsg} 
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