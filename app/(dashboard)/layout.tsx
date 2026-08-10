import React from 'react';
import { RoleProvider, type UserRole } from '@/context/RoleContext';
import { getSessionRole } from '@/lib/session';

const toUserRole = (role: Awaited<ReturnType<typeof getSessionRole>>): UserRole =>
  role === 'student' ? 'STUDENT' : 'STAFF';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getSessionRole();

  return (
    <div className="h-screen bg-bg-dark text-body antialiased select-none overflow-x-hidden flex flex-col">
      <RoleProvider initialRole={toUserRole(role)}>{children}</RoleProvider>
    </div>
  );
}
