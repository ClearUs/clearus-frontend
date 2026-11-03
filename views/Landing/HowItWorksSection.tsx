'use client';

import React, { useState } from 'react';

interface StepData {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    number: '01',
    title: 'Find your university',
    description:
      'Choose your school from the directory. Every school has its own ClearUs address, so you land in your own clearance space.',
  },
  {
    number: '02',
    title: 'Open your clearances',
    description:
      'See every clearance your school requires, from Library to Bursary, each with its own steps and status.',
  },
  {
    number: '03',
    title: 'Upload or attach documents',
    description:
      'Add a new file or pick one already in your vault. ClearUs does not take payments, you upload your receipt.',
  },
  {
    number: '04',
    title: 'Track approval, collect your certificate',
    description:
      'Officers review each step. Once a clearance is approved, its certificate is ready to download.',
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section id="how-it-works" className="w-full bg-white py-16 sm:py-24 border-t border-[#E2EBE5]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6">
        {/* Section Heading matching Figma [385:358] (679x94, NO EYEBROW) */}
        <div className="max-w-170 mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
            From first login to final certificate
          </h2>
          <p
            className="text-[15px] sm:text-[17px] text-[#5E7165] leading-6.5 mt-3 sm:mt-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Four steps. No office queues, no lost paperwork.
          </p>
        </div>

        {/* How row matching Figma [385:363] (1200x560, Product panel on left, Steps on right) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-8 max-w-300 mx-auto">
          {/* Product Panel matching Figma [385:364] (560x560, r=20, bg=#DCFCE7, pad=32) */}
          <div className="w-full lg:w-140 h-130 sm:h-140 shrink-0 rounded-[20px] bg-[#DCFCE7] p-4 sm:p-8 flex items-center justify-center relative shadow-xs">
            {/* Step Page matching Figma [385:365] (496x480, r=16, bg=white, border=#E2EBE5) */}
            <div className="w-full h-full max-w-124 max-h-120 rounded-2xl bg-white border border-[#E2EBE5] shadow-xs overflow-hidden flex flex-col relative">
              {/* Frame 4 matching Figma [385:367] (Clearance Content: Main 374px + Right Rail 177.5px) */}
              <div className="w-full h-full bg-[#F7FBF8] p-3 sm:p-3.5 flex flex-row gap-2.5 overflow-y-auto">
                {/* Column 1: Main [385:369] (width 374px) */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  {/* 1. Breadcrumb [385:370] */}
                  <div className="flex items-center gap-1 text-[8.5px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-[#15803D] font-medium">My Clearances</span>
                    <span className="text-[#8A9A90]">/</span>
                    <span className="text-[#15803D] font-medium">Bursary Clearance</span>
                    <span className="text-[#8A9A90]">/</span>
                    <span className="text-[#33463A] font-medium truncate">Faculty dues receipt</span>
                  </div>

                  {/* 2. Clearance Header [385:376] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 sm:p-3 flex flex-col gap-1.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-[#15803D] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          1
                        </div>
                        <h3 className="text-[12px] sm:text-[13px] font-bold text-[#13241A] font-jakarta truncate">
                          Upload faculty dues receipt
                        </h3>
                      </div>
                      <span
                        className="text-[9px] font-semibold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full shrink-0"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Action required
                      </span>
                    </div>
                    <p className="text-[9.5px] text-[#5F6D64] pl-7" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Step 1 of 2 · Bursary Clearance
                    </p>
                  </div>

                  {/* 3. Notice [385:387] */}
                  <div className="rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1.5 flex items-start gap-1.5">
                    <svg className="w-3 h-3 text-[#15803D] mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <p className="text-[8.5px] leading-tight text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <span className="font-bold text-[#15803D]">Payments happen outside ClearUs. </span>
                      Pay through the Bursary’s official channel, then upload each receipt below.
                    </p>
                  </div>

                  {/* 4. About this step [385:390] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 sm:p-3 flex flex-col gap-1.5 shadow-2xs">
                    <h4 className="text-[10.5px] font-bold text-[#13241A] font-jakarta">
                      About this step
                    </h4>
                    <p className="text-[8.5px] text-[#5E7165] leading-3.25" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Pay your faculty dues through the Bursary’s official channel, then upload the receipt here. The Bursary officer checks it before moving you to the next step.
                    </p>
                    <p className="text-[9px] font-semibold text-[#13241A] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Your receipt should
                    </p>
                    <div className="flex flex-col gap-0.5 text-[8px] text-[#33463A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>Be a clear photo or PDF of the full receipt</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>Show the amount, date and receipt number</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>Show your name or matric number</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>Be a PDF, JPG or PNG up to 5 MB</span>
                      </div>
                    </div>
                  </div>

                  {/* 5. Sample document [385:415] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 sm:p-3 flex flex-col gap-1.5 shadow-2xs">
                    <h4 className="text-[10.5px] font-bold text-[#13241A] font-jakarta">
                      Sample document
                    </h4>
                    <div className="rounded-lg border border-[#E2EBE5] bg-[#F7FBF8] p-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded bg-[#FEE2E2] text-[#DC2626] font-bold text-[9px] flex items-center justify-center shrink-0">
                          PDF
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8.5px] font-semibold text-[#13241A] truncate">
                            Sample_Faculty_Dues_Receipt.pdf
                          </p>
                          <p className="text-[7.5px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            PDF · 120 KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => showToast('Sample preview opened')}
                          className="text-[8px] font-semibold text-[#15803D] hover:underline cursor-pointer"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Preview
                        </button>
                        <span className="text-[#8A9A90] text-[8px]">·</span>
                        <button
                          type="button"
                          onClick={() => showToast('Downloading sample receipt...')}
                          className="text-[8px] font-semibold text-[#15803D] hover:underline cursor-pointer"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                    <p className="text-[8px] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Use this as a guide. Your receipt should look similar and show the same details.
                    </p>
                  </div>

                  {/* 6. Complete this step [385:442] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs">
                    <div className="min-w-0">
                      <h4 className="text-[10.5px] font-bold text-[#13241A] font-jakarta">
                        Complete this step
                      </h4>
                      <p className="text-[8px] text-[#5E7165] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Upload a new file or choose one already in your vault.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Vault modal opened: Receipt attached!')}
                      className="px-2.5 py-1.5 rounded-lg bg-[#16A34A] text-white text-[8.5px] font-semibold hover:bg-[#15803D] transition-colors cursor-pointer flex items-center gap-1 shrink-0 shadow-2xs active:scale-95"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M8 11V3M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 11V13C2.5 13.5 2.9 14 3.5 14H12.5C13.1 14 13.5 13.5 13.5 13V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Add document</span>
                    </button>
                  </div>
                </div>

                {/* Column 2: Right Rail [385:452] (width 177.5px in Figma) */}
                <div className="w-37.5 sm:w-44.25 shrink-0 flex flex-col gap-2">
                  {/* 1. Steps in this clearance [385:453] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 flex flex-col gap-1.5 shadow-2xs">
                    <h5 className="text-[8.5px] font-semibold text-[#13241A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Steps in this clearance
                    </h5>
                    {/* Active Step 1 */}
                    <div className="rounded-md border border-[#BBF7D0] bg-[#F0FDF4] p-1.5 flex items-center gap-1.5 min-w-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#15803D] text-white text-[7px] font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span className="text-[7.5px] font-semibold text-[#15803D] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Upload faculty dues receipt
                      </span>
                    </div>
                    {/* Step 2 */}
                    <div className="rounded-md border border-[#E2EBE5] bg-white p-1.5 flex items-center gap-1.5 min-w-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#E2EBE5] text-[#33463A] text-[7px] font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span className="text-[7.5px] font-medium text-[#5F6D64] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Upload convocation fee receipt
                      </span>
                    </div>
                  </div>

                  {/* 2. About this clearance [385:463] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 flex flex-col gap-1.5 shadow-2xs">
                    <h5 className="text-[8.5px] font-semibold text-[#13241A] mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      About this clearance
                    </h5>
                    <div className="flex flex-col gap-1 text-[7.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <div>
                        <span className="text-[#8A9A90] block">Office</span>
                        <span className="font-semibold text-[#13241A] block truncate">Bursary & Student Accounts</span>
                      </div>
                      <div>
                        <span className="text-[#8A9A90] block">Officer</span>
                        <span className="font-semibold text-[#13241A] block truncate">Senior Bursar</span>
                      </div>
                      <div>
                        <span className="text-[#8A9A90] block">Review time</span>
                        <span className="font-semibold text-[#13241A] block">Same day</span>
                      </div>
                      <div>
                        <span className="text-[#8A9A90] block">Closes</span>
                        <span className="font-semibold text-[#13241A] block">30 Nov 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Need help [385:481] */}
                  <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 flex flex-col gap-1.5 shadow-2xs">
                    <h5 className="text-[8.5px] font-bold text-[#13241A] font-jakarta leading-tight">
                      Need help with this clearance?
                    </h5>
                    <p className="text-[7px] text-[#5E7165] leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Message the officer if you are unsure what to upload.
                    </p>
                    <button
                      type="button"
                      onClick={() => showToast('Opening officer message modal...')}
                      className="w-full py-1 rounded-md border border-[#16A34A] text-[#15803D] text-[7.5px] font-semibold hover:bg-[#F0FDF4] transition-colors cursor-pointer text-center"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Message Senior Bursar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps List matching Figma [385:636] (616x540, 4 Step cards) */}
          <div className="w-full lg:w-154 flex flex-col justify-between gap-3.5">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full min-h-31.5 rounded-2xl p-5 sm:p-6 flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white border-2 border-[#16A34A] shadow-md ring-4 ring-[#16A34A]/10'
                      : 'bg-white border border-[#E2EBE5] hover:border-[#16A34A]/40 hover:bg-[#F7FBF8] shadow-2xs'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px] font-jakarta transition-colors ${
                      isActive ? 'bg-[#16A34A] text-white' : 'bg-[#DCFCE7] text-[#15803D]'
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Body */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#13241A] font-jakarta leading-tight mb-1.5">
                      {step.title}
                    </h3>
                    <p
                      className="text-[14px] sm:text-[15px] text-[#5E7165] leading-5.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Micro-interaction Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#13241A] text-white text-[13px] font-medium shadow-xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
