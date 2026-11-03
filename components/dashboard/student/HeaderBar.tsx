'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Institution } from '@/types';

const crestMap: Record<string, string> = {
  FUTO: '/images/futo-crest.png',
  UNILAG: '/images/unilag-crest.png',
  UNN: '/images/unn-crest.png',
  UI: '/images/ui-crest.png',
  CU: '/images/cu-crest.png',
  BU: '/images/bu-crest.png',
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#5F6D64';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M15.5 10.5C14.5 13.5 11.5 15.5 8.5 15C5 14.5 2.5 11.5 3 8C3.3 5.5 5 3.5 7.5 2.5C5.5 5 6 9 9 11C11 12.5 13.5 12 15.5 10.5Z" fill={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#5F6D64';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3.5" fill={color} />
      <path d="M9 2V3.5M9 14.5V16M16 9H14.5M3.5 9H2M13.95 4.05L12.89 5.11M5.11 12.89L4.05 13.95M13.95 13.95L12.89 12.89M5.11 5.11L4.05 4.05" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#5F6D64" strokeWidth="1.5" />
      <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.60457 11.7835 9.54012 10.7917 9.86851C10.3452 10.0128 10 10.407 10 10.875V11.5" stroke="#5F6D64" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.75" fill="#5F6D64" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5C7.23858 2.5 5 4.73858 5 7.5V10.5L3.5 13.5H16.5L15 10.5V7.5C15 4.73858 12.7614 2.5 10 2.5Z" stroke="#5F6D64" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 14.5C8 15.6046 8.89543 16.5 10 16.5C11.1046 16.5 12 15.6046 12 14.5" stroke="#5F6D64" strokeWidth="1.5" />
    </svg>
  );
}

function ClearUsLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="url(#header_clearus_linear)" />
      <path d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#DCFCE7" />
      <defs>
        <linearGradient id="header_clearus_linear" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface HeaderBarProps {
  institution: Institution;
  onNavigate?: (section: string) => void;
  unreadCount?: number;
  className?: string;
}

export default function HeaderBar({ institution, onNavigate, unreadCount = 2, className }: HeaderBarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDemo = institution.code === 'DEMO' || institution.name.toLowerCase().includes('demo');
  const crestSrc = crestMap[institution.code] ?? crestMap.FUTO;
  const domain = institution.domain ?? (isDemo ? 'youruniversity.clearus.tech' : `${institution.code.toLowerCase()}.clearus.tech`);

  return (
    <header className={`h-16 bg-white border-b border-[#E2EBE5] flex items-center justify-between px-3 sm:px-6 shrink-0 ${className ?? ''}`}>
      {/* Search */}
      <div className="relative flex-1 max-w-110">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search clearances or documents"
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-[#E2EBE5] bg-[#F7FBF8] text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/30 focus:border-[#15803D]/50 transition-colors"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme toggle group */}
        <div className="hidden sm:flex items-center bg-white border border-[#E2EBE5] rounded-xl p-1 gap-0.5">
          <button
            onClick={() => setTheme('dark')}
            className={`w-9 h-9 rounded-lg flex items-center cursor-pointer justify-center transition-colors ${theme === 'dark' ? 'bg-[#15803D1A]' : 'hover:bg-white/60'
              }`}
          >
            <MoonIcon active={theme === 'dark'} />
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`w-9 h-9 rounded-lg flex items-center cursor-pointer justify-center transition-colors ${theme === 'light' ? 'bg-[#15803D1A]  ' : 'hover:bg-white/60'
              }`}
          >
            <SunIcon active={theme === 'light'} />
          </button>
        </div>

        {/* Help */}
        <button
          type="button"
          onClick={() => {
            window.open('mailto:registry@clearus.tech?subject=Clearance%20Support%20Request', '_blank');
          }}
          className="hidden sm:flex w-9 h-9 rounded-xl cursor-pointer border border-[#E2EBE5] bg-white items-center justify-center hover:bg-[#F9FAFB] transition-colors"
          title="Need help?"
        >
          <HelpCircleIcon />
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => onNavigate?.('notifications')}
          className="w-9 h-9 rounded-xl border border-[#E2EBE5] bg-white flex items-center justify-center cursor-pointer hover:bg-[#F9FAFB] transition-colors relative"
          title="Notifications"
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
          )}
        </button>

        {/* University crest + name */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l border-[#E2EBE5]">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-white flex items-center justify-center">
            {isDemo ? (
              <ClearUsLogo />
            ) : (
              <Image
                src={crestSrc}
                alt={`${institution.name} crest`}
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#13241A] leading-tight font-jakarta whitespace-nowrap">
              {institution.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#15803D] leading-tight whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
              {domain}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
