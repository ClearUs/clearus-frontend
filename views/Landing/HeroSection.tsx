'use client';

import React, { useState } from 'react';
import LandingNavbar from './Navbar';
import HeroDashboardMockup from './HeroDashboardMockup';

interface HeroSectionProps {
  onFindSchoolClick?: () => void;
  onSeeHowItWorksClick?: () => void;
}

export default function HeroSection({
  onFindSchoolClick,
  onSeeHowItWorksClick,
}: HeroSectionProps) {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3200);
  };

  const scrollToHowItWorks = () => {
    if (onSeeHowItWorksClick) {
      onSeeHowItWorksClick();
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindSchool = () => {
    if (onFindSchoolClick) {
      onFindSchoolClick();
    } else {
      const el = document.getElementById('find-school');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Frame 63 Container matching Figma [385:19] (1420x1063, rounded-b-[16px], gradient #DCFCE7 to #FFFFFF 85%) */}
      <div className="w-[calc(100%-16px)] sm:w-[calc(100%-20px)] max-w-355 mx-auto rounded-b-2xl sm:rounded-b-[20px] relative overflow-hidden bg-linear-to-b from-[#DCFCE7] via-[#F3FCF6] to-white pt-2 sm:pt-3 pb-12 sm:pb-16">
        {/* Figma Glow Left [385:20] (Ellipse, 560x1172, solid #BBF7D0, blur 120px) */}
        <div
          className="absolute -left-37.5 top-37.5 w-140 h-293 rounded-full pointer-events-none opacity-80"
          style={{
            backgroundColor: '#BBF7D0',
            filter: 'blur(120px)',
          }}
        />

        {/* Figma Glow Right [385:21] (Ellipse, 520x809, solid #BBF7D0, blur 120px) */}
        <div
          className="absolute right-27.5 top-86.5 w-130 h-202.25 rounded-full pointer-events-none opacity-80"
          style={{
            backgroundColor: '#BBF7D0',
            filter: 'blur(120px)',
          }}
        />

        {/* Transparent Navbar matching Figma [385:2318] sitting on top of Frame 63 gradient */}
        <LandingNavbar onFindSchoolClick={handleFindSchool} />

        {/* Headline Block matching Figma [385:22] (828x348, centered, NO BADGE) */}
        <div className="relative z-10 max-w-207] mx-auto text-center px-4 sm:px-6 pt-8 sm:pt-12">
          {/* Heading [385:27] (Plus Jakarta Sans Bold 68px, lh:76px, color #13241A) */}
          <h1 className="text-[36px] sm:text-[54px] lg:text-[68px] font-bold text-[#13241A] font-jakarta leading-[1.12] tracking-[-1.36px] text-center mb-5 sm:mb-6">
            Complete your clearance,{' '}
            <span className="block sm:inline">without the queues.</span>
          </h1>

          {/* Subtitle [385:28] (Inter Regular 18px, lh:28px, color #5E7165) */}
          <p
            className="text-[16px] sm:text-[18px] text-[#5E7165] leading-7 text-center max-w-165 mx-auto mb-8 sm:mb-10"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ClearUs takes your school’s clearance process online. Upload your documents once, follow every step, and collect your certificate without running from office to office.
          </p>

          {/* Hero CTAs matching Figma [385:29] */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Primary CTA [385:30] (201x56, r=12, fill=#16a34a) */}
            <button
              type="button"
              onClick={handleFindSchool}
              className="w-full sm:w-50.25 h-14 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-[16px] font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>Find your university</span>
              <span className="text-[18px]">→</span>
            </button>

            {/* Secondary CTA [385:33] (190x56, r=12, stroke=#c9d8ce) */}
            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="w-full sm:w-47.5 h-14 rounded-xl border border-[#C9D8CE] bg-transparent hover:bg-white/60 text-[#13241A] text-[16px] font-semibold inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              See how it works
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Frame matching Figma [385:35] (Frame 66: 1192x666) */}
        <div className="relative z-10 w-full max-w-325 mx-auto px-3 sm:px-6 mt-12 sm:mt-16">
          {/* Floating Chip 1: Top Right matching Figma [385:335] (top: 76px, right edge, 290x50, r=999) */}
          <div
            onClick={() => showToast('Vault item: Bursary receipt attached to clearance')}
            className="absolute top-2 sm:top-19 -right-2 sm:-right-4 lg:-right-6 z-30 animate-float-gentle cursor-pointer group"
            title="Click to interact"
          >
            <div className="rounded-full bg-white border border-[#E2EBE5] shadow-[0_16px_40px_-6px_rgba(20,83,45,0.22)] group-hover:shadow-2xl px-4 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all group-hover:scale-105 group-hover:border-[#16A34A]/50">
              <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-[12px] font-bold shrink-0 shadow-xs">
                ✓
              </div>
              <span
                className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Receipt attached from your vault
              </span>
            </div>
          </div>

          {/* Floating Chip 2: Left Side matching Figma [385:339] (top: 180px, left edge - slightly below Chip 1!) */}
          <div
            onClick={() => showToast('Library clearance certificate downloaded!')}
            className="absolute top-16 sm:top-45 -left-2 sm:-left-4 lg:-left-6 z-30 animate-float-reverse cursor-pointer group"
            title="Click to interact"
          >
            <div className="rounded-full bg-white border border-[#E2EBE5] shadow-[0_16px_40px_-6px_rgba(20,83,45,0.22)] group-hover:shadow-2xl px-4 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all group-hover:scale-105 group-hover:border-[#16A34A]/50">
              <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-[12px] font-bold shrink-0 shadow-xs">
                ✓
              </div>
              <span
                className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Certificate ready to download
              </span>
            </div>
          </div>

          {/* Product Shot Outer Border Container [385:36] (1184x666, r=30, fill=#F0FDF4/45, stroke=#FFFFFF) */}
          <div className="rounded-[26px] sm:rounded-[30px] p-2 sm:p-3 bg-[#F0FDF4]/45 border border-white shadow-2xl backdrop-blur-xs">
            {/* Student Dashboard Frame [385:37] powered by actual live dashboard components */}
            <div className="rounded-[18px] sm:rounded-[20px] bg-white border border-[#E2EBE5] shadow-xs overflow-hidden h-150 flex relative">
              <HeroDashboardMockup onShowToast={showToast} />
            </div>
          </div>
        </div>
      </div>

      {/* Value Strip matching Figma [385:343] (1440x193, 4 value items) */}
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Value 1 [385:345] */}
          <div className="flex flex-col py-1">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#13241A] font-jakarta mb-1.5">
              No more queues
            </h3>
            <p className="text-[14px] text-[#5E7165] leading-5.25" style={{ fontFamily: 'Inter, sans-serif' }}>
              Submit documents from wherever you are.
            </p>
          </div>

          {/* Value 2 [385:348] */}
          <div className="flex flex-col py-1 sm:border-l sm:border-[#E2EBE5] sm:pl-6 lg:pl-8">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#13241A] font-jakarta mb-1.5">
              One document vault
            </h3>
            <p className="text-[14px] text-[#5E7165] leading-5.25" style={{ fontFamily: 'Inter, sans-serif' }}>
              Upload a file once, reuse it for any step.
            </p>
          </div>

          {/* Value 3 [385:351] */}
          <div className="flex flex-col py-1 lg:border-l lg:border-[#E2EBE5] lg:pl-8">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#13241A] font-jakarta mb-1.5">
              Live progress
            </h3>
            <p className="text-[14px] text-[#5E7165] leading-5.25" style={{ fontFamily: 'Inter, sans-serif' }}>
              See what is approved, in review or returned.
            </p>
          </div>

          {/* Value 4 [385:354] */}
          <div className="flex flex-col py-1 sm:border-l sm:border-[#E2EBE5] sm:pl-6 lg:pl-8">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#13241A] font-jakarta mb-1.5">
              Certificates online
            </h3>
            <p className="text-[14px] text-[#5E7165] leading-5.25" style={{ fontFamily: 'Inter, sans-serif' }}>
              Download each clearance certificate when approved.
            </p>
          </div>
        </div>
      </div>

      {/* Micro-interaction Notification Toast */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#13241A] text-white text-[13px] font-medium shadow-xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>{activeToast}</span>
        </div>
      )}
    </section>
  );
}
