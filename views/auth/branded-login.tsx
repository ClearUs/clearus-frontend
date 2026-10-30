'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Institution, User } from '@/types/index';
import AuthShell from '@/components/auth/AuthShell';
import BrandPanel from '@/components/auth/BrandPanel';
import SignInForm from '@/components/auth/SignInForm';
import TwoFactorView from '@/components/auth/TwoFactorView';
import ResetPasswordView from '@/components/auth/ResetPasswordView';
import AccountLockedView from '@/components/auth/AccountLockedView';
import RegisterView from '@/components/auth/RegisterView';
import DevAuthNav from '@/components/auth/DevAuthNav';
import UniversityCrest from '@/components/landing/UniversityCrest';

interface BrandedLoginProps {
  institution: Institution;
}

type SubView = 'login' | 'two-factor' | 'reset-password' | 'account-locked' | 'register';

export default function BrandedLogin({ institution }: BrandedLoginProps) {
  const router = useRouter();
  const [currentSubView, setCurrentSubView] = useState<SubView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [mfaLoading, setMfaLoading] = useState(false);
  const [resolvedRole, setResolvedRole] = useState<User['role']>('staff');

  const studentDomain = institution.allowedDomains[1] || institution.allowedDomains[0];
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;

  const handleLogin = async (identifier: string, pwd: string) => {
    setErrorMsg('');
    setIsLoading(true);
    setEmail(identifier);
    setPassword(pwd);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier.trim(), password: pwd }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 423 || data.locked) {
          setCurrentSubView('account-locked');
          return;
        }
        setErrorMsg(data.detail || 'Invalid credentials. Please try again.');
        return;
      }

      const domainPart = identifier.trim().split('@')[1];
      const role = domainPart?.toLowerCase() === studentDomain.toLowerCase() ? 'student' : 'staff';
      setResolvedRole(role);
      setCurrentSubView('two-factor');
    } catch {
      setErrorMsg('Network error. The server may be starting up — please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaVerify = async (code: string) => {
    setMfaError('');
    setMfaLoading(true);
    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMfaError(data.detail || 'Invalid code. Please try again.');
        return;
      }

      const instCode = institution.code.toLowerCase();
      if (appDomain) {
        window.location.href = `https://${instCode}.${appDomain}/${resolvedRole}`;
      } else {
        router.push(`/${resolvedRole}/${instCode}`);
      }
    } catch {
      setMfaError('Network error. Please try again.');
    } finally {
      setMfaLoading(false);
    }
  };

  const handleResendCode = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });
    if (!res.ok) throw new Error('Failed to resend verification code.');
  };

  const universityHeader = (
    <>
      <div className="flex items-center gap-3">
        <UniversityCrest code={institution.code} />
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">{institution.name}</p>
          <p className="text-xs text-green-700">{institution.code.toLowerCase()}.clearus.tech</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          if (appDomain) {
            window.location.href = `https://${appDomain}/auth`;
          } else {
            router.push('/auth');
          }
        }}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Change university
      </button>
    </>
  );

  return (
    <>
      {currentSubView === 'login' && (

        <AuthShell
          brandContent={<BrandPanel subDomain={`${institution.code.toLowerCase()}.clearus.tech`} />}
          header={universityHeader}
        >
          <SignInForm
            institutionName={institution.shortName || institution.name}
            onSubmit={handleLogin}
            onForgotPassword={() => setCurrentSubView('reset-password')}
            onRegister={() => setCurrentSubView('register')}
            errorMsg={errorMsg}
            isLoading={isLoading}
          />
        </AuthShell>
      )}

      {currentSubView === 'two-factor' && (
        <AuthShell
          brandContent={<BrandPanel subDomain={`${institution.code.toLowerCase()}.clearus.tech`} />}
          header={universityHeader}
        >

          <TwoFactorView
            email={email}
            onVerify={handleMfaVerify}
            onResend={handleResendCode}
            onBack={() => { setMfaError(''); setCurrentSubView('login'); }}
            errorMsg={mfaError}
            isLoading={mfaLoading}
          />
        </AuthShell>
      )}

      {currentSubView === 'account-locked' && (
        <AuthShell
          brandContent={<BrandPanel subDomain={`${institution.code.toLowerCase()}.clearus.tech`} />}
          header={universityHeader}
        >

          <AccountLockedView
            onResetPassword={() => setCurrentSubView('reset-password')}
          />
        </AuthShell>
      )}

      {currentSubView === 'reset-password' && (
        <AuthShell
          brandContent={<BrandPanel 
            headline="Don't worry, you're one"
            headlineBreak='step from getting back in.'
            features={["Reset your password securely.","Get back to your clearance progress.","Pick up right where you left off."]}
            authImage='/images/auth-forgot-password.png'
            subDomain={`${institution.code.toLowerCase()}.clearus.tech`}
             />}
          header={universityHeader}
        >

          <ResetPasswordView
            initialEmail={email}
            institutionCode={institution.code}
            onBack={() => { setErrorMsg(''); setCurrentSubView('login'); }}
          />
        </AuthShell>
      )}

      {currentSubView === 'register' && (
        <AuthShell
          brandContent={<BrandPanel 
            headline="Your journey to clearance,"
            headlineBreak='starts right here'
            features={["Set up your student account.","Keep your clearance details organized.","Take the first step towards getting cleared."]}
            authImage='/images/auth-register.png'
            subDomain={`${institution.code.toLowerCase()}.clearus.tech`} />}
          header={universityHeader}
        >

          <RegisterView
            institutionCode={institution.code}
            institutionName={institution.shortName || institution.name}
            onBack={() => { setErrorMsg(''); setCurrentSubView('login'); }}
            onComplete={() => {
              const instCode = institution.code.toLowerCase();
              if (appDomain) {
                window.location.href = `https://${instCode}.${appDomain}/student`;
              } else {
                router.push(`/student/${instCode}`);
              }
            }}
          />
        </AuthShell>
      )}
      <DevAuthNav
        currentView={currentSubView}
        onNavigate={(view) => {
          setErrorMsg('');
          setMfaError('');
          setCurrentSubView(view as SubView);
        }}
      />
    </>
  );
}
