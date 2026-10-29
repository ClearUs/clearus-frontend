'use client';

import React from 'react';
import { GraduationCap, Globe } from 'lucide-react';
import UniversityCrest from '@/components/landing/UniversityCrest';

interface SchoolSplashProps {
  code: string;
  name: string;
}

export default function SchoolSplash({ code, name }: SchoolSplashProps) {
  return (
    <div className="min-h-screen bg-[#F7FBF8] flex flex-col">
      {/* ClearUs logo top-left */}
      <div className="flex items-center gap-2.5 pt-10 pl-14">
        <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">
          Clear<span className="text-green-700">Us</span>
        </span>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5 w-110 max-w-full px-4">
          {/* Crest with spinner ring */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-26 h-25 flex items-center justify-center">
              <UniversityCrest code={code} />
            </div>
            {/* Small spinner below the crest */}
            <div className="w-8 h-8 rounded-full border-2 border-green-200 border-t-green-600 animate-spin" />
          </div>

          {/* Heading */}
          <h1
            className="text-[30px] font-extrabold leading-9.5 text-gray-900 tracking-tight text-center font-jakarta">
            Taking you to your school
          </h1>

          {/* University name */}
          <p className="text-base font-normal leading-6 text-gray-500 text-center">
            {name}
          </p>

          {/* URL pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2EBE5] rounded-full px-3.5 py-2">
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">{code.toLowerCase()}.clearus.tech</span>
          </div>

          {/* Progress bar */}
          <div className="w-70 h-1.5 bg-[#BBF7D0] rounded-full overflow-hidden">
            <div className="h-full bg-[#16A34A] rounded-full animate-progress" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 1.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
