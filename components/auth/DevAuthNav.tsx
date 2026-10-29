'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bug } from 'lucide-react';

interface DevAuthNavProps {
  currentView?: string;
  onNavigate: (view: string) => void;
}

const AUTH_SCREENS = [
  { id: 'login', label: 'Sign In' },
  { id: 'two-factor', label: '2FA / Enter code' },
  { id: 'account-locked', label: 'Account Locked' },
  { id: 'reset-password', label: 'Forgot Password' },
  { id: 'register', label: 'Register' },
] as const;

export default function DevAuthNav({ currentView, onNavigate }: DevAuthNavProps) {
  const [open, setOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-9999">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-mono px-3 py-2 rounded-lg shadow-lg hover:bg-gray-800 cursor-pointer"
      >
        <Bug className="w-3.5 h-3.5" />
        DEV
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>

      {open && (
        <div className="absolute bottom-10 right-0 bg-gray-900 rounded-lg shadow-xl p-2 min-w-50 space-y-0.5">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider px-2 py-1">Auth Screens</p>
          {AUTH_SCREENS.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => { onNavigate(s.id); setOpen(false); }}
              className={`w-full text-left text-xs px-2 py-1.5 rounded cursor-pointer transition-colors ${
                currentView === s.id ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {s.label}
            </button>
          ))}
          <div className="border-t border-gray-800 my-1" />
          <p className="text-[10px] text-gray-500 uppercase tracking-wider px-2 py-1">Pages</p>
          <a href="/auth" className="block w-full text-left text-xs px-2 py-1.5 rounded text-gray-300 hover:bg-gray-800">
            Select University
          </a>
          <a href="/auth/signed-out" className="block w-full text-left text-xs px-2 py-1.5 rounded text-gray-300 hover:bg-gray-800">
            Signed Out
          </a>
        </div>
      )}
    </div>
  );
}
