'use client';

import React from 'react';
import Image from 'next/image';

interface BrandPanelProps {
  headline?: string;
  headlineBreak?: string;
  subDomain?: string;
  authImage?: string;
  features?: string[];
  subtext?: string;
  hasFeatures?: boolean
}

function ClearUsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-xl bg-white backdrop-blur-sm flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="#15803D" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight text-white">
        Clear<span className="text-green-300">Us</span>
      </span>
    </div>
  );
}

function EllipseRing({ size, top, left, id }: { size: number; top: number; left: number; id: string }) {
  const stroke = 60;
  const r = (size - stroke) / 2;
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top, left, width: size, height: size }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#328252" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#328252" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={`url(#${id})`} strokeWidth={stroke} fill="none" />
    </svg>
  );
}

function DecorativeEllipses() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <EllipseRing size={942} top={379} left={-333} id="grad-e2" />
      <EllipseRing size={705} top={497.5} left={-214} id="grad-e1" />
      <EllipseRing size={469} top={615.5} left={-96} id="grad-e3" />
    </div>
  );
}

function CircleTick() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#16A34A" />
      <path d="M16.3334 8.75L10.375 14.7083L7.66669 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
    </svg>

  )
}

const featuresData = [
  'Track every approval in one place',
  'Upload documents securely',
  'Stay updated on your clearance.',
];

export default function BrandPanel({
  headline = 'Clear every step,',
  headlineBreak = 'one approval at a time.',
  authImage = "/images/auth-hero.png",
  features = featuresData,
  subDomain,
  subtext,
  hasFeatures=true
}: BrandPanelProps) {
  return (
    <div className="flex flex-col h-full text-white relative w-full">
      <DecorativeEllipses />

      {/* Frame 2: text content area */}
      <div className="relative z-10 px-6 pt-12">
        <ClearUsLogo />

        <h1 className="text-[32px] lg:text-[38px] font-bold leading-[1.15] tracking-tight mt-6">
          {headline}<br />
          <span className='text-green-300'>{headlineBreak}</span>
        </h1>
        <p className='text-sm text-[#DCFCE7]'>{subtext}</p>

        {hasFeatures && <ul className="space-y-3.5 mt-4">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-white/90">
              <CircleTick />
              {f}
            </li>
          ))}
        </ul>}
      </div>

      {/* Frame 3: hero image — 516x699, top 385, left 65, radius 15, border 0.5 white/35%, inner shadow */}
      <div
        className="absolute z-10 overflow-hidden left-[20%] top-[38%]"
        style={{
          width: 350,
          height: 500,
          // top: 385,
          // left: 105,
          borderRadius: 15,
          border: '0.5px solid rgba(255,255,255,0.35)',
          boxShadow: 'inset 0 0 5px rgba(255,255,255,0.25)',
          background: '#E8E9EA',
        }}
      >
        <Image
          src={authImage}
          alt="Student"
          fill
          className="object-cover"
          priority
        />
      </div>

      {subDomain && (
        <p className="absolute bottom-5 left-16 z-10 text-[11px] text-white/30">{subDomain}</p>
      )}
    </div>
  );
}
