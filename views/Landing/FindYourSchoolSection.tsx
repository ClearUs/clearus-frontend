'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { INSTITUTIONS } from '@/data/institution';
import { Institution } from '@/types';
// import UniversityCrest from '@/components/landing/UniversityCrest';

interface FindYourSchoolSectionProps {
  onSelectSchool?: (school: Institution) => void;
}

export default function FindYourSchoolSection({ onSelectSchool }: FindYourSchoolSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter institutions based on search query
  const filteredInstitutions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // In Figma default state, 4 featured schools: FUTO, UNILAG, UNN, OAU
      const featuredCodes = ['FUTO', 'UNILAG', 'UNN', 'OAU'];
      const featured = featuredCodes
        .map(code => INSTITUTIONS.find(i => i.code.toUpperCase() === code))
        .filter((i): i is Institution => Boolean(i));
      return featured;
    }

    return INSTITUTIONS.filter(inst =>
      inst.name.toLowerCase().includes(q) ||
      inst.code.toLowerCase().includes(q) ||
      inst.shortName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission paused while universities are not yet onboarded
    // if (onSelectSchool && filteredInstitutions.length > 0) {
    //   onSelectSchool(filteredInstitutions[0]);
    // }
  };

  return (
    <section id="find-school" className="w-full bg-[#F0FDF4] py-16 sm:py-20 lg:py-24 border-t border-[#E2EBE5]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory heading matching Figma [385:2135] (NO EYEBROW - visible: false in Figma) */}
        <div className="max-w-160 mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#13241A] font-jakarta leading-[1.18] tracking-[-0.66px]">
            Start from your university.
          </h2>
          <p
            className="text-[15px] sm:text-[17px] text-[#5E7165] leading-6.5 mt-3 sm:mt-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Pick your school and ClearUs takes you to its own address, with your clearances waiting.
          </p>
        </div>

        {/* Search Bar matching Figma [385:2140] (640x61, r=999, bg=white, border=#C9D8CE) */}
        <form onSubmit={handleSubmitSearch} className="w-full max-w-160 mx-auto mb-12 sm:mb-14">
          <div className="relative w-full h-14.5 sm:h-15.25 rounded-full bg-white border border-[#C9D8CE] shadow-xs px-5 sm:px-6 flex items-center gap-3 focus-within:border-[#16A34A] focus-within:ring-2 focus-within:ring-[#16A34A]/20 transition-all">
            {/* Search Icon */}
            <svg
              className="w-5 h-5 text-[#8A9A90] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Input field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              placeholder="Search your university"
              className="w-full bg-transparent text-[15px] sm:text-[16px] text-[#13241A] placeholder-[#8A9A90] focus:outline-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />

            {/* Clear button if text entered */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#8A9A90] hover:text-[#13241A] p-1 text-sm shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* School cards commented out until universities are onboarded */}
        {/*
        {filteredInstitutions.length > 0 ? (
          <div className="max-w-300 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredInstitutions.map((school) => {
              const domain = `${school.code.toLowerCase()}.clearus.tech`;

              return (
                <div
                  key={school.code}
                  onClick={() => onSelectSchool(school)}
                  className="rounded-[20px] bg-white border border-[#E2EBE5] p-6 flex flex-col justify-between h-59.25 shadow-2xs hover:border-[#16A34A] hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col">
                    <div className="w-13.5 h-13 relative mb-3 flex items-center justify-start shrink-0">
                      <UniversityCrest code={school.code} width={54} height={52} />
                    </div>

                    <h3 className="text-[16px] sm:text-[17px] font-bold text-[#13241A] font-jakarta leading-5.75 group-hover:text-[#16A34A] transition-colors line-clamp-2">
                      {school.name}
                    </h3>

                    <span
                      className="text-[13px] sm:text-[14px] font-medium text-[#15803D] mt-1.5 truncate"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {domain}
                    </span>
                  </div>

                  <div
                    className="text-[13px] sm:text-[14px] font-semibold text-[#13241A] flex items-center gap-1 group-hover:text-[#16A34A] transition-colors pt-2 border-t border-[#E2EBE5]/40"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span>Select school</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-100 mx-auto text-center py-8">
            <p className="text-[15px] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
              No university found matching &quot;{searchQuery}&quot;.
            </p>
          </div>
        )}
        */}

        {/* Global directory onboarding placeholder */}
        <div className="max-w-160 mx-auto text-center py-10 px-6 rounded-2xl bg-white border border-[#E2EBE5] shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-[#13241A] font-jakarta mb-1.5">
            Universities are currently being onboarded
          </h3>
          <p className="text-[14px] text-[#5E7165] max-w-120 mx-auto leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            We are actively integrating with Nigerian university registries. Your institution&apos;s dedicated portal will be accessible here soon.
          </p>
          <Link
            href="/request-school"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#15803D] hover:text-[#14532D] hover:underline"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Bring ClearUs to your school</span>
            <span>→</span>
          </Link>
        </div>

        {/* Bottom Text matching Figma [385:2167] */}
        <div className="text-center mt-12 sm:mt-16">
          <p
            className="text-[14px] sm:text-[15px] font-medium text-[#5E7165]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Don’t see your school? Ask your registry to{' '}
            <Link
              href="/request-school"
              className="text-[#16A34A] underline underline-offset-2 hover:text-[#15803D] font-semibold"
            >
              bring ClearUs to your campus
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
