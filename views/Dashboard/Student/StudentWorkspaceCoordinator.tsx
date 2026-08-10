'use client';

import React from 'react';
import { Institution, User } from '@/types';

interface StudentWorkspaceProps {
  institution: Institution;
  user: User;
}

export default function StudentWorkspaceCoordinator({ institution, user }: StudentWorkspaceProps) {
  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full h-full space-y-6 custom-scrollbar">
        <header className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-faint">
            {institution.shortName} · Student Clearance
          </p>
          <h1 className="text-2xl font-semibold text-heading">Welcome, {user.name}</h1>
          <p className="text-sm text-muted">{user.matricNo ?? user.id}</p>
        </header>

        <div className="h-96 border border-edge-subtle bg-surface-card rounded-2xl flex items-center justify-center text-xs text-faint font-mono uppercase tracking-widest">
          Student Clearance Workspace Under Construction
        </div>
      </div>
    </div>
  );
}
