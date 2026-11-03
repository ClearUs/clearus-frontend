'use client';

import React from 'react';
import Image from 'next/image';

interface FinalCtaSectionProps {
  onFindSchoolClick?: () => void;
}

export default function FinalCtaSection({ onFindSchoolClick }: FinalCtaSectionProps) {
  const handleScrollToFindSchool = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onFindSchoolClick) {
      onFindSchoolClick();
      return;
    }
    const el = document.getElementById('find-school');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Band matching Figma [385:2234] (1200x387, r=32, bg=#16A34A, overflow=hidden) */}
        <div className="relative w-full max-w-300 mx-auto min-h-95 sm:min-h-96.75 rounded-3xl sm:rounded-4xl bg-[#16A34A] overflow-hidden px-6 py-12 sm:py-16 lg:py-20 flex flex-col items-center justify-center shadow-lg">
          {/* Glow Frame matching Figma [385:2235] (w=1286, h=660, bg=#14532D, blur=4px) */}
          <div
            className="absolute -bottom-80 left-1/2 -translate-x-1/2 w-[110%] sm:w-321.5 h-137.5 sm:h-165 rounded-full bg-[#14532D] opacity-90 pointer-events-none blur-md"
          />

          {/* Group 2085663546: Scattered graduation caps vector pattern [385:2245] */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/cta-caps.svg"
              alt=""
              fill
              className="object-cover object-center pointer-events-none"
              priority
            />
          </div>

          {/* CTA Content Frame matching Figma [385:2237] */}
          <div className="relative z-10 max-w-179 mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
            {/* Title & Description Frame [385:2238] */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-white font-jakarta leading-[1.15] tracking-[-0.66px]">
                Your clearance journey starts here.
              </h2>
              <p
                className="text-[15px] sm:text-[17px] lg:text-[18px] text-[#DCFCE7] leading-6.25 max-w-129.25 mx-auto"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Pick your university and see the clearance steps you need to complete, whether you&apos;re a fresher or a graduating student.
              </p>
            </div>

            {/* CTA Button matching Figma [385:2241] */}
            <a
              href="#find-school"
              onClick={handleScrollToFindSchool}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-4.5 rounded-xl bg-white text-[#14532D] text-[15px] sm:text-[16px] font-semibold shadow-md hover:bg-[#F0FDF4] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>Find your university</span>
              <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
