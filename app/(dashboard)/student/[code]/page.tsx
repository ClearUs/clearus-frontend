import React from 'react';
import { notFound } from 'next/navigation';
import { getInstitutionByCode } from '@/data/institution';
import { requireRole } from '@/lib/session';
import StudentWorkspaceCoordinator from '@/views/Dashboard/Student/StudentWorkspaceCoordinator';

interface DashboardPageProps {
  params: Promise<{ code: string }>;
}

export default async function StudentDashboardPage({ params }: DashboardPageProps) {
  const { code } = await params;

  const institution = getInstitutionByCode(code);
  if (!institution) {
    notFound();
  }

  // Server-side role gate: non-student sessions are redirected to their own
  // workspace before any student UI renders.
  const user = await requireRole(institution.code, 'student');

  return <StudentWorkspaceCoordinator institution={institution} user={user} />;
}
