import React from 'react';
import { RoleProvider, type UserRole } from '@/context/RoleContext';
import { getSessionRole } from '@/lib/session';

// Maps the lowercase session role to the client context's role enum.
const toUserRole = (role: Awaited<ReturnType<typeof getSessionRole>>): UserRole =>
  role === 'student' ? 'STUDENT' : 'STAFF';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A layout cannot pass data down to its children, but it CAN read the session
  // to seed the shared client context. The per-role pages resolve their own
  // institution/user data and enforce access — see lib/session.ts#requireRole.
  const role = await getSessionRole();

  return (
    <div className="h-screen bg-bg-dark text-[#E0E0E0] antialiased select-none overflow-x-hidden flex flex-col">
      <RoleProvider initialRole={toUserRole(role)}>{children}</RoleProvider>
    </div>
  );
}
