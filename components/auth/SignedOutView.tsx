'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SignedOutViewProps {
  onSignIn: () => void;
  onBackToUniversity?: () => void;
}

export default function SignedOutView({ onSignIn, onBackToUniversity }: SignedOutViewProps) {
  return (
    <div className="min-h-screen bg-[#F7F8F8] flex flex-col items-center  px-4">
      <div className="w-full max-w-156.25">
        <div className="bg-white rounded-[25px] p-10 md:px-20 md:py-16 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-700" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            You have been signed out
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Your session has ended safely. To sign in again, you can simply log in with your existing credentials.
          </p>

          <button
            type="button"
            onClick={onSignIn}
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign in again <ArrowRight className="w-4 h-4" />
          </button>

          {onBackToUniversity && (
            <button
              type="button"
              onClick={onBackToUniversity}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Back to university page
            </button>
          )}
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-400">
        Privacy · Terms · © {new Date().getFullYear()} ClearUs Digital Infrastructure Limited
      </footer>
    </div>
  );
}
