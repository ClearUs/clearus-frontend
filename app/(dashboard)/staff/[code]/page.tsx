import React from 'react';
import { notFound } from 'next/navigation';
import { getInstitutionByCode } from '@/data/institution';
import { requireRole } from '@/lib/session';
import StaffWorkspaceCoordinator from '@/views/Dashboard/Staff/StaffWorkspaceCoordinator';

interface DashboardPageProps {
  params: Promise<{ code: string }>;
}

export default async function StaffDashboardPage({ params }: DashboardPageProps) {
  const { code } = await params;

  const institution = getInstitutionByCode(code);
  if (!institution) {
    notFound();
  }

  // Server-side role gate: non-staff sessions are redirected to their own
  // workspace before any staff UI renders.
  const user = await requireRole(institution.code, 'staff');

  return <StaffWorkspaceCoordinator institution={institution} user={user} />;
}
