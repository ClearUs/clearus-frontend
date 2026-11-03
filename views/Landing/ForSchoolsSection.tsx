'use client';

import React from 'react';
import Image from 'next/image';

const SCHOOL_BULLETS = [
  'Build your own clearance process',
  'Officers review from one dashboard',
  'Approve, reject or request corrections with ease.',
  'Give your institution its own clearance portal (e.g. yourschool.clearus.tech).',
  'Reduce paperwork, manual follow ups and office congestion.',
];

export default function ForSchoolsSection() {
  return (
    <section id="for-schools" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-[#E2EBE5]/60 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* For schools Row matching Figma [385:2169] (1200x560, gap=80) */}
        <div className="max-w-300 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* =========================================================================
              LEFT PANEL: TEXT, BULLETS & CTA [385:2170] (520px)
             ========================================================================= */}
          <div className="w-full lg:max-w-130 flex flex-col gap-4 sm:gap-5">
            {/* Eyebrow [385:2171] is hidden (visible: false in Figma) */}

            {/* Title [385:2173] */}
            <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
              Built for registry and clearance offices too.
            </h2>

            {/* Description [385:2174] */}
            <p
              className="text-[15px] sm:text-[17px] text-[#5E7165] leading-6.5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Schools set up their clearances once: the steps, the documents and the officers who approve them. ClearUs keeps students moving and every office organised.
            </p>

            {/* Bullets List [385:2175] */}
            <div className="mt-2 flex flex-col gap-3.5 sm:gap-4">
              {SCHOOL_BULLETS.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  {/* Green Circle Check Badge [385:2177] */}
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

                  {/* Bullet Text [385:2179] */}
                  <span
                    className="text-[15px] sm:text-[16px] font-medium text-[#33463A] leading-5.5 sm:leading-6"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button matching Figma [385:2188] */}
            <div className="mt-3">
              <a
                href="mailto:partnerships@clearus.tech?subject=Bring%20ClearUs%20to%20our%20institution"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A34A] text-white text-[15px] font-semibold hover:bg-[#15803D] shadow-xs hover:shadow-md transition-all duration-300 group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Bring ClearUs to your school</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT PANEL [427:3351] (600x560: Two stacked officer images + Before/With badges)
             ========================================================================= */}
          <div className="w-full lg:w-150 shrink-0 relative">
            {/* Unified 2-Image Stack Container with 28px rounded corners [427:3352] */}
            <div className="w-full h-115 sm:h-140 rounded-[28px] overflow-hidden border border-[#E2EBE5] shadow-xs flex flex-col relative select-none">
              {/* Top Photo Slot: Officer overwhelmed before [427:3353] */}
              <div className="w-full h-1/2 relative overflow-hidden bg-neutral-100">
                <Image
                  src="/images/School_officer_working_at_desk_before.jpg"
                  alt="School officer swamped with manual paperwork in traditional registry"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover grayscale contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Lower Photo Slot: Officer organized with laptop after [427:3354] */}
              <div className="w-full h-1/2 relative overflow-hidden bg-neutral-100 border-t border-white/40">
                <Image
                  src="/images/School_officer_working_at_desk_after.jpg"
                  alt="School officer managing clearances cleanly from one dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Card 1: BEFORE [427:3359] (Top-Left of upper image) */}
            <div className="absolute top-4 left-4 sm:top-4.5 sm:left-4.5 z-10 w-38.75 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2EBE5] p-3 shadow-xl transition-transform duration-300 hover:-translate-y-1">
              {/* Status Badge [427:3360] */}
              <div className="w-fit px-2.5 py-0.5 rounded-full bg-[#FCDCDD] text-[#B42318] text-[11px] font-semibold tracking-wide uppercase font-inter mb-2">
                BEFORE
              </div>
              {/* Text [427:3362] */}
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] font-jakarta leading-snug">
                Traditional Registry
              </p>
            </div>

            {/* Floating Card 2: WITH CLEARUS [427:3355] (Bottom-Right of lower image) */}
            <div className="absolute bottom-4 right-4 sm:bottom-4.5 sm:right-4.5 z-10 w-55 sm:w-57.25 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2EBE5] p-3.5 shadow-xl transition-transform duration-300 hover:-translate-y-1">
              {/* Status Badge [427:3356] */}
              <div className="w-fit px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold tracking-wide uppercase font-inter mb-2">
                WITH CLEARUS
              </div>
              {/* Text [427:3358] */}
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] font-jakarta leading-5">
                Manage every clearance from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
