'use client';

import React from 'react';
import Image from 'next/image';

const STUDENT_BULLETS = [
  'See which office is reviewing each step',
  'Get instant notifications when a step is approved or returned.',
  'Resubmit returned documents in a few clicks, straight from your vault.',
  'Know exactly what needs fixing without running from office to office.',
  'No more endless queues, unnecessary waiting or fighting for a spot in line.',
];

export default function StudentsSection() {
  return (
    <section id="students" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-[#E2EBE5]/60 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Students Row matching Figma [427:3299] (1200x560, gap=80) */}
        <div className="max-w-300 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* =========================================================================
              LEFT PANEL [427:3300] (600x560: Two stacked images + Before/With badges)
             ========================================================================= */}
          <div className="w-full lg:w-150 shrink-0 relative">
            {/* Unified 2-Image Stack Container with 28px rounded corners [427:3301] */}
            <div className="w-full h-115 sm:h-140 rounded-[28px] overflow-hidden border border-[#E2EBE5] shadow-xs flex flex-col relative select-none">
              {/* Top Photo Slot: Student sweating / standing in queue [427:3302] */}
              <div className="w-full h-1/2 relative overflow-hidden bg-neutral-100">
                <Image
                  src="/images/Student_standing_sweating.jpg"
                  alt="Student enduring campus clearance queues"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover grayscale contrast-105"
                  priority
                />
                {/* Subtle dark gradient overlay to ensure card readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Lower Photo Slot: Student smiling with laptop using ClearUs [427:3303] */}
              <div className="w-full h-1/2 relative overflow-hidden bg-neutral-100 border-t border-white/40">
                <Image
                  src="/images/Girl_using_laptop_for_clearus.jpg"
                  alt="Student using ClearUs on laptop comfortably"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Card 1: BEFORE [427:3308] (Top-Left of upper image) */}
            <div className="absolute top-4 left-4 sm:top-4.5 sm:left-4.5 z-10 w-55 sm:w-57.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2EBE5] p-3 shadow-xl transition-transform duration-300 hover:-translate-y-1">
              {/* Status Badge [427:3309] */}
              <div className="w-fit px-2.5 py-0.5 rounded-full bg-[#FCDCDD] text-[#B42318] text-[11px] font-semibold tracking-wide uppercase font-inter mb-2">
                BEFORE
              </div>
              {/* Text [427:3311] */}
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] font-jakarta leading-snug">
                Long queues. Endless waiting.
              </p>
            </div>

            {/* Floating Card 2: WITH CLEARUS [427:3304] (Bottom-Right of lower image) */}
            <div className="absolute bottom-4 right-4 sm:bottom-4.5 sm:right-4.5 z-10 w-60 sm:w-62.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2EBE5] p-3.5 shadow-xl transition-transform duration-300 hover:-translate-y-1">
              {/* Status Badge [427:3305] */}
              <div className="w-fit px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold tracking-wide uppercase font-inter mb-2">
                WITH CLEARUS
              </div>
              {/* Text [427:3307] */}
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] font-jakarta leading-5">
                Clear your school files and documents. Anytime, anywhere.
              </p>
            </div>
          </div>

          {/* =========================================================================
              RIGHT PANEL: TEXT & BULLETS [427:3312] (520px)
             ========================================================================= */}
          <div className="w-full lg:max-w-130 flex flex-col gap-4 sm:gap-5">
            {/* Eyebrow [427:3313] is hidden (visible: false in Figma) */}

            {/* Title [427:3315] */}
            <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
              Clear your documents without campus stress.
            </h2>

            {/* Description [427:3316] */}
            <p
              className="text-[15px] sm:text-[17px] text-[#5E7165] leading-6.5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Every office that signs off on your clearance is on ClearUs. You see who has your documents, what is pending, and what each office needs next.
            </p>

            {/* Bullets List [427:3317] */}
            <div className="mt-2 flex flex-col gap-3.5 sm:gap-4">
              {STUDENT_BULLETS.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  {/* Green Circle Check Badge [427:3319] */}
                  <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-110 transition-transform">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  {/* Bullet Text [427:3321] */}
                  <span
                    className="text-[15px] sm:text-[16px] font-medium text-[#33463A] leading-5.5 sm:leading-6"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
