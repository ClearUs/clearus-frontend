'use client';

import { useRouter } from 'next/navigation';
import SignedOutView from '@/components/auth/SignedOutView';
import AuthShell from '@/components/auth/AuthShell';
import BrandPanel from '@/components/auth/BrandPanel';

export default function SignedOutPage() {
  const router = useRouter();

  return (
    <AuthShell
      brandContent={<BrandPanel
        headline='Every step forward,'
        headlineBreak='Your progress stays with you.'
        authImage='/images/auth-sign-out.png'
        features={["Find your university.", "Access the right clearance process.", "Keep your academic journey moving."]}
        subtext="Your clearance journey is always here when you're ready to continue."
        hasFeatures={false}
      />}
      header={""}>

      <SignedOutView
        onSignIn={() => router.push('/auth')}
        onBackToUniversity={() => router.push('/auth')}
      />
    </AuthShell>
  );
}
