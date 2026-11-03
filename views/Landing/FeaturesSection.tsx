'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function FeaturesSection() {
  // Micro-interactions state
  const [clearanceFilter, setClearanceFilter] = useState<'all' | 'progress' | 'approved' | 'locked'>('all');
  const [vaultFilter, setVaultFilter] = useState<'all' | 'review' | 'approved'>('all');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'approvals' | 'rejections' | 'uploads' | 'receipts'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [bursarySearch, setBursarySearch] = useState('');
  const [vaultSearch, setVaultSearch] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://futo.clearus.tech/verify/CLR-LIB-104928');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="features" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-[#E2EBE5]/60 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6">
        {/* Section Heading matching Figma [385:662] (NO EYEBROW - visible: false in Figma) */}
        <div className="max-w-205 mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
            Built around how clearance really works
          </h2>
          <p
            className="text-[15px] sm:text-[17px] text-[#5E7165] leading-6.5 mt-3 sm:mt-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Everything a student needs to clear, in one clean place.
          </p>
        </div>

        {/* Feature Bento Grid matching Figma [385:667] (Max width 1200px, 2 rows, gap 24px) */}
        <div className="max-w-300 mx-auto flex flex-col gap-6">
          {/* =========================================================================
              ROW 1 [385:668]: Card 1 (744px) + Card 2 (432px)
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* -----------------------------------------------------------------------
                CARD 1: Features / My Clearances [385:669] (Wide: 744x456, r=20, bg=#F7FAF8, p=32)
               ----------------------------------------------------------------------- */}
            <div className="lg:col-span-7 rounded-[20px] bg-[#F7FAF8] border border-[#E2EBE5] p-6 sm:p-8 flex flex-col justify-between gap-5 transition-all duration-300 hover:border-[#16A34A]/40 shadow-xs">
              {/* Text Frame [385:670] */}
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#13241A] font-jakarta leading-[1.3]">
                  Every clearance, one list
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#5E7165] mt-1.5 leading-5.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Library, Department, Bursary and more. Each clearance has its own steps and its own status.
                </p>
              </div>

              {/* Visual Frame: My Clearances [385:673] (680x312, r=16, bg=white, border=#E2EBE5) */}
              <div className="w-full h-78 rounded-2xl bg-white border border-[#E2EBE5] shadow-2xs overflow-hidden flex flex-col relative select-none">
                {/* Content Frame [385:676] */}
                <div className="p-3.5 sm:p-4.5 flex flex-col gap-3 h-full overflow-y-auto">
                  {/* Page Header [385:677] */}
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[13px] sm:text-[14px] font-bold text-[#13241A] font-jakarta">
                      My Clearances
                    </h4>
                    <p className="text-[9.5px] sm:text-[10px] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Search all your clearances. Open one to see its steps and upload the required documents.
                    </p>
                  </div>

                  {/* Search & Filters [385:680] */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2EBE5]/60 pb-2.5">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-32.5 max-w-50">
                      <svg
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8A9A90]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={bursarySearch}
                        onChange={(e) => setBursarySearch(e.target.value)}
                        placeholder="Search clearances"
                        className="w-full pl-7 pr-2 py-1 text-[9.5px] rounded-md border border-[#E2EBE5] bg-[#F7FBF8] text-[#13241A] placeholder-[#8A9A90] focus:outline-none focus:border-[#16A34A]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setClearanceFilter('all')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1 transition-colors ${
                          clearanceFilter === 'all'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FBF8] text-[#5E7165] border border-[#E2EBE5] hover:bg-[#E2EBE5]/40'
                        }`}
                      >
                        <span>All</span>
                        <span className={`text-[8px] px-1 rounded-full ${clearanceFilter === 'all' ? 'bg-white/20' : 'bg-[#E2EBE5] text-[#13241A]'}`}>
                          4
                        </span>
                      </button>
                      <button
                        onClick={() => setClearanceFilter('progress')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1 transition-colors ${
                          clearanceFilter === 'progress'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FBF8] text-[#5E7165] border border-[#E2EBE5] hover:bg-[#E2EBE5]/40'
                        }`}
                      >
                        <span>In progress</span>
                        <span className={`text-[8px] px-1 rounded-full ${clearanceFilter === 'progress' ? 'bg-white/20' : 'bg-[#E2EBE5] text-[#13241A]'}`}>
                          1
                        </span>
                      </button>
                      <button
                        onClick={() => setClearanceFilter('approved')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1 transition-colors ${
                          clearanceFilter === 'approved'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FBF8] text-[#5E7165] border border-[#E2EBE5] hover:bg-[#E2EBE5]/40'
                        }`}
                      >
                        <span>Approved</span>
                        <span className={`text-[8px] px-1 rounded-full ${clearanceFilter === 'approved' ? 'bg-white/20' : 'bg-[#E2EBE5] text-[#13241A]'}`}>
                          2
                        </span>
                      </button>
                      <button
                        onClick={() => setClearanceFilter('locked')}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1 transition-colors ${
                          clearanceFilter === 'locked'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FBF8] text-[#5E7165] border border-[#E2EBE5] hover:bg-[#E2EBE5]/40'
                        }`}
                      >
                        <span>Locked</span>
                        <span className={`text-[8px] px-1 rounded-full ${clearanceFilter === 'locked' ? 'bg-white/20' : 'bg-[#E2EBE5] text-[#13241A]'}`}>
                          1
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Clearance Cards List */}
                  <div className="flex flex-col gap-2">
                    {/* 1. Library Clearance [385:698] */}
                    {(clearanceFilter === 'all' || clearanceFilter === 'approved') && (
                      <div className="rounded-[10px] border border-[#E2EBE5] bg-white p-2.5 flex items-center justify-between gap-3 shadow-2xs hover:border-[#16A34A]/30 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#13241A] font-jakarta truncate">
                                Library Clearance
                              </span>
                              <span className="text-[8.5px] font-semibold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                                Approved
                              </span>
                            </div>
                            <span className="text-[9.5px] text-[#5E7165] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                              University Library Services · Librarian Musa
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[9.5px] font-semibold text-[#15803D]">
                            2 of 2 steps
                          </span>
                          <button className="px-2 py-1 rounded-md border border-[#C9D8CE] text-[#15803D] text-[9.5px] font-medium flex items-center gap-1 hover:bg-[#F0FDF4] transition-colors">
                            <span>View steps</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. Department Clearance [385:715] */}
                    {(clearanceFilter === 'all' || clearanceFilter === 'approved') && (
                      <div className="rounded-[10px] border border-[#E2EBE5] bg-white p-2.5 flex items-center justify-between gap-3 shadow-2xs hover:border-[#16A34A]/30 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#13241A] font-jakarta truncate">
                                Department Clearance
                              </span>
                              <span className="text-[8.5px] font-semibold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                                Approved
                              </span>
                            </div>
                            <span className="text-[9.5px] text-[#5E7165] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Computer Science · Head of Department
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[9.5px] font-semibold text-[#15803D]">
                            2 of 2 steps
                          </span>
                          <button className="px-2 py-1 rounded-md border border-[#C9D8CE] text-[#15803D] text-[9.5px] font-medium flex items-center gap-1 hover:bg-[#F0FDF4] transition-colors">
                            <span>View steps</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 3. Bursary Clearance [385:732] (Active highlighted card in Figma with border-[#16A34A]) */}
                    {(clearanceFilter === 'all' || clearanceFilter === 'progress') && (
                      <div className="rounded-[10px] border border-[#16A34A] bg-white p-2.5 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-[#F0FDF4] border border-[#16A34A] text-[#15803D] text-[10px] font-bold flex items-center justify-center shrink-0">
                            3
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#13241A] font-jakarta truncate">
                                Bursary Clearance
                              </span>
                              <span className="text-[8.5px] font-semibold text-white bg-[#16A34A] px-2 py-0.5 rounded-full">
                                Action required
                              </span>
                            </div>
                            <span className="text-[9.5px] text-[#5E7165] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Bursary & Student Accounts · Senior Bursar
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[9.5px] font-medium text-[#8A9A90]">
                            0 of 2 steps
                          </span>
                          <button className="px-2 py-1 rounded-md border border-[#C9D8CE] text-[#15803D] text-[9.5px] font-medium flex items-center gap-1 hover:bg-[#F0FDF4] transition-colors">
                            <span>View steps</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 4. Student Affairs Clearance [385:748] (Locked card) */}
                    {(clearanceFilter === 'all' || clearanceFilter === 'locked') && (
                      <div className="rounded-[10px] border border-[#E2EBE5] bg-[#FAFCFB] p-2.5 flex items-center justify-between gap-3 shadow-2xs opacity-85">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-[#F7FBF8] border border-[#C9D8CE] text-[#8A9A90] flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-medium text-[#5E7165] font-jakarta truncate">
                                Student Affairs Clearance
                              </span>
                              <span className="text-[8.5px] font-medium text-[#5E7165] bg-[#F7FBF8] border border-[#E2EBE5] px-2 py-0.5 rounded-full">
                                Locked
                              </span>
                            </div>
                            <span className="text-[9.5px] text-[#8A9A90] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Student Affairs Division · Dean of Student Affairs
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[9.5px] text-[#8A9A90]">
                            Unlocks after Bursary
                          </span>
                          <button className="px-2 py-1 rounded-md border border-[#C9D8CE] text-[#8A9A90] text-[9.5px] font-medium flex items-center gap-1 opacity-60 cursor-not-allowed">
                            <span>View steps</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------------------------
                CARD 2: Features / Document Vault [385:916] (Narrow: 432x456, r=20, bg=#F7FAF8, p=32)
               ----------------------------------------------------------------------- */}
            <div className="lg:col-span-5 rounded-[20px] bg-[#F7FAF8] border border-[#E2EBE5] p-6 sm:p-8 flex flex-col justify-between gap-5 transition-all duration-300 hover:border-[#16A34A]/40 shadow-xs">
              {/* Text Frame [385:917] */}
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#13241A] font-jakarta leading-[1.3]">
                  A vault for your documents
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#5E7165] mt-1.5 leading-5.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Upload once. Attach the same file to any step that needs it.
                </p>
              </div>

              {/* Visual Frame: Document Vault [385:920] (368x290, r=16, bg=white, border=#E2EBE5) */}
              <div className="w-full h-78 rounded-2xl bg-white border border-[#E2EBE5] shadow-2xs overflow-hidden flex flex-col relative select-none">
                <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 h-full overflow-y-auto">
                  {/* Page Header [385:924] */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-[12px] sm:text-[13px] font-bold text-[#13241A] font-jakarta truncate">
                        Document vault
                      </h4>
                      <p className="text-[8.5px] sm:text-[9px] text-[#5E7165] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        All your clearance documents in one secure place.
                      </p>
                    </div>
                    <button className="px-2 py-1 bg-[#16A34A] text-white rounded-md text-[8.5px] font-semibold flex items-center gap-1 hover:bg-[#15803D] transition-colors shrink-0 shadow-2xs">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Upload document</span>
                    </button>
                  </div>

                  {/* 4 Stat Cards Row [385:935] */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {/* Stat 1: Documents tracked */}
                    <div className="rounded-lg border border-[#E2EBE5] bg-[#F7FAF8] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] text-[#5E7165] font-medium truncate">Tracked</span>
                      <span className="text-[13px] font-bold text-[#13241A] font-jakarta leading-none my-0.5">3</span>
                      <span className="text-[6.5px] text-[#15803D] truncate">2 approved</span>
                    </div>

                    {/* Stat 2: In review */}
                    <div className="rounded-lg border border-[#E2EBE5] bg-[#F7FAF8] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] text-[#5E7165] font-medium truncate">In review</span>
                      <span className="text-[13px] font-bold text-[#13241A] font-jakarta leading-none my-0.5">1</span>
                      <span className="text-[6.5px] text-[#B45309] truncate">Passport</span>
                    </div>

                    {/* Stat 3: Approved */}
                    <div className="rounded-lg border border-[#E2EBE5] bg-[#F7FAF8] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] text-[#5E7165] font-medium truncate">Approved</span>
                      <span className="text-[13px] font-bold text-[#13241A] font-jakarta leading-none my-0.5">2</span>
                      <span className="text-[6.5px] text-[#5E7165] truncate">Locked</span>
                    </div>

                    {/* Stat 4: Storage used */}
                    <div className="rounded-lg border border-[#E2EBE5] bg-[#F7FAF8] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] text-[#5E7165] font-medium truncate">Storage</span>
                      <span className="text-[10px] font-bold text-[#13241A] font-jakarta leading-none my-0.5">2.4 MB</span>
                      <div className="w-full bg-[#E2EBE5] h-1 rounded-full overflow-hidden">
                        <div className="bg-[#16A34A] h-full w-[12%]" />
                      </div>
                    </div>
                  </div>

                  {/* Filter row & search [385:1011] */}
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setVaultFilter('all')}
                        className={`px-1.5 py-0.5 rounded text-[8px] font-medium flex items-center gap-1 ${
                          vaultFilter === 'all'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                        }`}
                      >
                        <span>All</span>
                        <span className="text-[7px]">3</span>
                      </button>
                      <button
                        onClick={() => setVaultFilter('review')}
                        className={`px-1.5 py-0.5 rounded text-[8px] font-medium flex items-center gap-1 ${
                          vaultFilter === 'review'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                        }`}
                      >
                        <span>In review</span>
                        <span className="text-[7px]">1</span>
                      </button>
                      <button
                        onClick={() => setVaultFilter('approved')}
                        className={`px-1.5 py-0.5 rounded text-[8px] font-medium flex items-center gap-1 ${
                          vaultFilter === 'approved'
                            ? 'bg-[#13241A] text-white'
                            : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                        }`}
                      >
                        <span>Approved</span>
                        <span className="text-[7px]">2</span>
                      </button>
                    </div>

                    <div className="relative min-w-22.5">
                      <input
                        type="text"
                        value={vaultSearch}
                        onChange={(e) => setVaultSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-4 pr-1.5 py-0.5 text-[8px] rounded border border-[#E2EBE5] bg-[#F7FBF8] text-[#13241A] placeholder-[#8A9A90] focus:outline-none focus:border-[#16A34A]"
                      />
                      <svg
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-[#8A9A90]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Document Cards List & Drag zone */}
                  <div className="flex flex-col gap-1.5">
                    {/* Document 1: Library Clearance Slip */}
                    {(vaultFilter === 'all' || vaultFilter === 'approved') && (
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex items-center justify-between gap-2 shadow-2xs hover:border-[#16A34A]/40 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-[#13241A] truncate">
                              Library_Clearance_Slip.pdf
                            </span>
                            <span className="text-[8px] text-[#5E7165]">
                              PDF · 1.2 MB · Uploaded 7 Oct 2026
                            </span>
                          </div>
                        </div>
                        <span className="text-[7.5px] bg-[#F7FBF8] border border-[#E2EBE5] text-[#15803D] px-1.5 py-0.5 rounded shrink-0">
                          Library Clearance
                        </span>
                      </div>
                    )}

                    {/* Document 2: Dept Handover Form */}
                    {(vaultFilter === 'all' || vaultFilter === 'approved') && (
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex items-center justify-between gap-2 shadow-2xs hover:border-[#16A34A]/40 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-[#13241A] truncate">
                              Dept_Handover_Form_V2.pdf
                            </span>
                            <span className="text-[8px] text-[#5E7165]">
                              PDF · 866 KB · Uploaded 13 Oct 2026
                            </span>
                          </div>
                        </div>
                        <span className="text-[7.5px] bg-[#F7FBF8] border border-[#E2EBE5] text-[#15803D] px-1.5 py-0.5 rounded shrink-0">
                          Department Clearance
                        </span>
                      </div>
                    )}

                    {/* Document 3: Passport Photograph */}
                    {(vaultFilter === 'all' || vaultFilter === 'review') && (
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex items-center justify-between gap-2 shadow-2xs hover:border-[#16A34A]/40 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-[#13241A] truncate">
                              Passport_Photograph.jpg
                            </span>
                            <span className="text-[8px] text-[#5E7165]">
                              JPG · 340 KB · Uploaded 19 Oct 2026
                            </span>
                          </div>
                        </div>
                        <span className="text-[7.5px] bg-[#FEF3C7] text-[#B45309] font-medium px-1.5 py-0.5 rounded shrink-0">
                          In review
                        </span>
                      </div>
                    )}

                    {/* Drag and Drop Zone [385:1072] */}
                    <div className="rounded-xl border border-dashed border-[#16A34A] bg-[#F0FDF4]/50 p-2.5 flex flex-col items-center justify-center text-center gap-0.5 mt-0.5">
                      <svg className="w-4 h-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-[9px] font-semibold text-[#13241A]">
                        Drag and drop files here
                      </span>
                      <span className="text-[7.5px] text-[#5E7165]">
                        PDF, JPG or PNG · up to 5 MB each
                      </span>
                      <button className="mt-1 px-2.5 py-0.5 bg-white border border-[#16A34A] text-[#16A34A] rounded text-[8px] font-semibold hover:bg-[#F0FDF4] transition-colors shadow-2xs">
                        Browse files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              ROW 2 [385:1298]: Card 3 (432px) + Card 4 (744px)
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* -----------------------------------------------------------------------
                CARD 3: Features / Timeline [385:1299] (Narrow: 432x434, r=20, bg=#F7FAF8, p=32)
               ----------------------------------------------------------------------- */}
            <div className="lg:col-span-5 rounded-[20px] bg-[#F7FAF8] border border-[#E2EBE5] p-6 sm:p-8 flex flex-col justify-between gap-5 transition-all duration-300 hover:border-[#16A34A]/40 shadow-xs">
              {/* Text Frame [385:1300] */}
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#13241A] font-jakarta leading-[1.3]">
                  A timeline you can trust
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#5E7165] mt-1.5 leading-5.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Every approval, return and upload, in order.
                </p>
              </div>

              {/* Visual Frame: Timeline [385:1303] (368x290, r=16, bg=white, border=#E2EBE5) */}
              <div className="w-full h-78 rounded-2xl bg-white border border-[#E2EBE5] shadow-2xs overflow-hidden flex flex-col relative select-none">
                <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 h-full overflow-y-auto">
                  {/* Page Header [385:1307] */}
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[12px] sm:text-[13px] font-bold text-[#13241A] font-jakarta">
                      Clearance timeline
                    </h4>
                    <p className="text-[8.5px] sm:text-[9px] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Every upload, approval and update on your clearance, newest first.
                    </p>
                  </div>

                  {/* Filter chips [385:1324] */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                    <button
                      onClick={() => setTimelineFilter('all')}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-medium shrink-0 flex items-center gap-1 ${
                        timelineFilter === 'all'
                          ? 'bg-[#13241A] text-white'
                          : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                      }`}
                    >
                      <span>All activity</span>
                      <span className="text-[7.5px]">7</span>
                    </button>
                    <button
                      onClick={() => setTimelineFilter('approvals')}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-medium shrink-0 flex items-center gap-1 ${
                        timelineFilter === 'approvals'
                          ? 'bg-[#13241A] text-white'
                          : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                      }`}
                    >
                      <span>Approvals</span>
                      <span className="text-[7.5px]">2</span>
                    </button>
                    <button
                      onClick={() => setTimelineFilter('uploads')}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-medium shrink-0 flex items-center gap-1 ${
                        timelineFilter === 'uploads'
                          ? 'bg-[#13241A] text-white'
                          : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                      }`}
                    >
                      <span>Uploads</span>
                      <span className="text-[7.5px]">2</span>
                    </button>
                    <button
                      onClick={() => setTimelineFilter('receipts')}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-medium shrink-0 flex items-center gap-1 ${
                        timelineFilter === 'receipts'
                          ? 'bg-[#13241A] text-white'
                          : 'bg-[#F7FAF8] text-[#5E7165] border border-[#E2EBE5]'
                      }`}
                    >
                      <span>Receipts</span>
                      <span className="text-[7.5px]">1</span>
                    </button>
                  </div>

                  {/* Timeline Stream [385:1486] */}
                  <div className="flex flex-col gap-2 relative pl-4 border-l-2 border-[#E2EBE5] ml-1">
                    {/* Event 1: TODAY · 20 OCT 2026 */}
                    <div className="relative flex flex-col gap-0.5">
                      <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-[#B45309] ring-2 ring-white" />
                      <span className="text-[7px] font-bold text-[#8A9A90] uppercase tracking-wider">
                        TODAY · 20 OCT 2026
                      </span>
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#13241A]">
                            Bursary receipts reminder
                          </span>
                          <span className="text-[7px] font-semibold bg-[#FEF3C7] text-[#B45309] px-1.5 py-0.5 rounded-full">
                            Action required
                          </span>
                        </div>
                        <p className="text-[8px] text-[#5E7165] leading-3">
                          Your faculty dues and convocation fee receipts are still missing. Upload them before 30 Nov 2026 to keep your clearance on track.
                        </p>
                        <span className="text-[7px] text-[#8A9A90]">
                          09:12 · Automated reminder · Bursary & Student Accounts
                        </span>
                      </div>
                    </div>

                    {/* Event 2: 14 OCT 2026 */}
                    <div className="relative flex flex-col gap-0.5">
                      <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white" />
                      <span className="text-[7px] font-bold text-[#8A9A90] uppercase tracking-wider">
                        14 OCT 2026
                      </span>
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#13241A]">
                            Department Clearance approved
                          </span>
                          <span className="text-[7px] font-semibold bg-[#DCFCE7] text-[#15803D] px-1.5 py-0.5 rounded-full">
                            Approved
                          </span>
                        </div>
                        <p className="text-[8px] text-[#5E7165] leading-3">
                          Form approved. Signature and stamp confirmed.
                        </p>
                        <span className="text-[7px] text-[#8A9A90]">
                          16:40 · Head of Department · Computer Science
                        </span>
                      </div>
                    </div>

                    {/* Event 3: 13 OCT 2026 */}
                    <div className="relative flex flex-col gap-0.5">
                      <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-[#15803D] ring-2 ring-white" />
                      <span className="text-[7px] font-bold text-[#8A9A90] uppercase tracking-wider">
                        13 OCT 2026
                      </span>
                      <div className="rounded-lg border border-[#E2EBE5] bg-white p-2 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#13241A]">
                            Form re-uploaded
                          </span>
                          <span className="text-[7px] text-[#8A9A90]">11:05</span>
                        </div>
                        <p className="text-[8px] text-[#5E7165] leading-3">
                          You submitted the corrected handover form for review.
                        </p>
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#F0FDF4] border border-[#E2EBE5] rounded text-[7.5px] text-[#15803D] w-fit font-medium">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Dept_Handover_Form_V2.pdf</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------------------------
                CARD 4: Features / Certificate [385:1813] (Wide: 744x434, r=20, bg=#F7FAF8, p=32)
               ----------------------------------------------------------------------- */}
            <div className="lg:col-span-7 rounded-[20px] bg-[#F7FAF8] border border-[#E2EBE5] p-6 sm:p-8 flex flex-col justify-between gap-5 transition-all duration-300 hover:border-[#16A34A]/40 shadow-xs">
              {/* Text Frame [385:1814] */}
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#13241A] font-jakarta leading-[1.3]">
                  A certificate for every clearance
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#5E7165] mt-1.5 leading-5.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  The moment a clearance is approved, its certificate is ready to download and print.
                </p>
              </div>

              {/* Visual Frame: Certificate [385:1817] (680x290, r=16, bg=white, border=#E2EBE5) */}
              <div className="w-full h-78 rounded-2xl bg-white border border-[#E2EBE5] shadow-2xs overflow-hidden flex flex-col relative select-none">
                <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 h-full overflow-y-auto">
                  {/* Top Breadcrumb & Page Header [385:1822] */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#E2EBE5]/60 pb-2">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1 text-[8px] text-[#8A9A90]">
                        <span className="text-[#15803D]">My Clearances</span>
                        <span>/</span>
                        <span className="text-[#15803D]">Library Clearance</span>
                        <span>/</span>
                        <span className="text-[#13241A] font-medium">Certificate</span>
                      </div>
                      <h4 className="text-[12px] sm:text-[13px] font-bold text-[#13241A] font-jakarta truncate">
                        Library Clearance certificate
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button className="px-2 py-1 rounded-md border border-[#E2EBE5] bg-white text-[#13241A] text-[8.5px] font-medium flex items-center gap-1 hover:bg-[#F7FAF8]">
                        <svg className="w-2.5 h-2.5 text-[#5E7165]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Print</span>
                      </button>
                      <button className="px-2 py-1 rounded-md bg-[#16A34A] text-white text-[8.5px] font-semibold flex items-center gap-1 hover:bg-[#15803D]">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Certificate Presentation [385:1820] */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                    {/* Main Certificate Mockup [385:1845] (cols-7) */}
                    <div className="md:col-span-7 rounded-xl border border-[#E2EBE5] bg-white p-3 shadow-2xs">
                      {/* Inner Decorative Green Border [385:1846] */}
                      <div className="rounded-lg border border-[#16A34A] p-3 flex flex-col items-center text-center gap-1.5 bg-[#FAFDFB]">
                        {/* University Crest */}
                        <div className="relative w-7 h-7 shrink-0">
                          <Image
                            src="/images/futo-crest.png"
                            alt="FUTO Crest"
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Certificate Header */}
                        <div>
                          <span className="text-[7px] font-bold tracking-widest text-[#13241A] uppercase block">
                            FEDERAL UNIVERSITY OF TECHNOLOGY, OWERRI
                          </span>
                          <span className="text-[12px] font-bold text-[#13241A] font-jakarta block">
                            Certificate of Clearance
                          </span>
                          <span className="text-[7.5px] text-[#5E7165] italic block mt-0.5">
                            This is to certify that
                          </span>
                        </div>

                        {/* Student Details */}
                        <div>
                          <span className="text-[11px] font-bold text-[#13241A] font-jakarta block">
                            Chinedu Okonkwo
                          </span>
                          <span className="text-[7.5px] text-[#5E7165] block">
                            Matric no. 2021/104928 · B.Sc Computer Science · 400 Level
                          </span>
                        </div>

                        <p className="text-[7px] text-[#5E7165] leading-2.75 max-w-70">
                          has satisfied every requirement of the Library Clearance for the 2025/2026 academic session.
                        </p>

                        {/* Cleared Units */}
                        <div className="flex items-center justify-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1 text-[7px] font-medium text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#E2EBE5]">
                            <svg className="w-2.5 h-2.5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Library clearance slip</span>
                          </div>
                          <div className="flex items-center gap-1 text-[7px] font-medium text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#E2EBE5]">
                            <svg className="w-2.5 h-2.5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>ID card return form</span>
                          </div>
                        </div>

                        {/* Certificate Footer */}
                        <div className="w-full border-t border-[#E2EBE5] pt-2 mt-1 flex items-center justify-between text-left">
                          <div>
                            <div className="w-16 border-b border-[#13241A] mb-0.5" />
                            <span className="text-[7.5px] font-bold text-[#13241A] block">Librarian Musa</span>
                            <span className="text-[6.5px] text-[#8A9A90] block">Issued 8 Oct 2026</span>
                          </div>

                          {/* QR Code Mockup */}
                          <div className="w-8 h-8 border border-[#13241A]/20 bg-white p-0.5 grid grid-cols-4 gap-0.5">
                            <div className="bg-[#13241A] col-span-2 row-span-2 rounded-2xs" />
                            <div className="bg-[#13241A]" />
                            <div className="bg-transparent" />
                            <div className="bg-transparent" />
                            <div className="bg-[#13241A]" />
                            <div className="bg-[#13241A]" />
                            <div className="bg-transparent" />
                            <div className="bg-[#13241A]" />
                            <div className="bg-[#13241A]" />
                          </div>

                          <div className="text-right">
                            <span className="text-[6.5px] text-[#8A9A90] block">Certificate ref.</span>
                            <span className="text-[7.5px] font-mono font-bold text-[#13241A] block">CLR-LIB-104928</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Rail Details [385:1920] (cols-5) */}
                    <div className="md:col-span-5 flex flex-col gap-2">
                      {/* Verify Card [385:1921] */}
                      <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <span className="text-[9.5px] font-bold text-[#13241A] font-jakarta">
                            Anyone can verify this
                          </span>
                        </div>
                        <p className="text-[8px] text-[#5E7165] leading-3">
                          Employers or other schools can confirm this certificate is genuine using the link below.
                        </p>
                        <div className="flex items-center justify-between gap-1 p-1 bg-[#F7FBF8] border border-[#E2EBE5] rounded text-[7.5px] font-mono text-[#5E7165]">
                          <span className="truncate">futo.clearus.tech/verify/CLR-LIB-104928</span>
                          <button
                            onClick={handleCopyLink}
                            className="text-[#16A34A] hover:text-[#15803D] shrink-0 font-medium"
                          >
                            {copiedLink ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <button
                          onClick={handleCopyLink}
                          className="w-full py-1 bg-[#16A34A] text-white rounded text-[8px] font-semibold flex items-center justify-center gap-1 hover:bg-[#15803D] transition-colors shadow-2xs"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span>{copiedLink ? 'Link copied to clipboard!' : 'Copy verification link'}</span>
                        </button>
                      </div>

                      {/* Certificate details [385:1936] */}
                      <div className="rounded-xl border border-[#E2EBE5] bg-white p-2.5 flex flex-col gap-1 shadow-2xs">
                        <span className="text-[9px] font-bold text-[#13241A] font-jakarta mb-0.5">
                          Certificate details
                        </span>
                        <div className="flex items-center justify-between text-[7.5px]">
                          <span className="text-[#8A9A90]">Issued</span>
                          <span className="font-semibold text-[#13241A]">8 Oct 2026</span>
                        </div>
                        <div className="flex items-center justify-between text-[7.5px]">
                          <span className="text-[#8A9A90]">Clearance</span>
                          <span className="font-semibold text-[#13241A]">Library Clearance</span>
                        </div>
                        <div className="flex items-center justify-between text-[7.5px]">
                          <span className="text-[#8A9A90]">Issued by</span>
                          <span className="font-semibold text-[#13241A]">Librarian Musa</span>
                        </div>
                        <div className="flex items-center justify-between text-[7.5px]">
                          <span className="text-[#8A9A90]">Status</span>
                          <span className="font-semibold text-[#15803D]">Valid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
