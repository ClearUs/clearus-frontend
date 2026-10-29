import React from 'react';

interface AuthShellProps {
  brandContent: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthShell({ brandContent, header, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col bg-[#F7F8F8]">
        {header && (
          <div className="flex items-center justify-between px-11.25 pt-7.5">
            {header}
          </div>
        )}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          {children}
        </div>
        <div className="px-11.25 pb-7.5">
          <p className="text-xs text-gray-400 flex items-center gap-5">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>&copy; {new Date().getFullYear()} ClearUs Digital Infrastructure Limited</span>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[40%] lg:min-w-[40%] bg-[#14532D] relative overflow-hidden">
        {brandContent}
      </div>
    </div>
  );
}
