'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onFindSchoolClick?: () => void;
}

function ClearUsLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="url(#paint0_linear_205_284)" />
      <path d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#DCFCE7" />
      <defs>
        <linearGradient id="paint0_linear_205_284" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function LandingNavbar({ onFindSchoolClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-5 pb-3 bg-transparent transition-all">
      {/* Nav bar matching Figma [385:2319] (1120x72, transparent background, no border, no card shadow) */}
      <div className="w-full max-w-280 mx-auto h-18 px-2 sm:px-6 flex items-center justify-between">
        {/* Logo [385:2320] */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          {/* Logo Tile [385:2321] (40x40, r=12) */}
          <div className="flex items-center gap-2">
              <ClearUsLogo />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight text-[#13241A] font-jakarta">
                  Clear<span className="text-[#15803D]">Us</span>
                </span>
                <span className="text-[8px] text-[#8A9A90] leading-none font-sans">Academic Network</span>
              </div>
            </div>
          
        </Link>

        {/* Desktop Links [385:2326] (gap=32) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => {
              if (onFindSchoolClick) onFindSchoolClick();
              else scrollToSection('find-school');
            }}
            className="text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find your school
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="text-[15px] font-medium text-[#33463A] hover:text-[#15803D] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            FAQ
          </button>
        </nav>

        {/* Desktop Actions [385:2331] */}
        <div className="hidden sm:flex items-center gap-4 lg:gap-5">
          <Link
            href="/auth"
            className="text-[15px] font-semibold text-[#13241A] hover:text-[#15803D] transition-colors cursor-pointer px-2 py-1.5"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Sign in
          </Link>

          {/* Nav CTA [385:2334] (174x48, r=12, fill=#14532D) */}
          <button
            type="button"
            onClick={() => {
              if (onFindSchoolClick) onFindSchoolClick();
              else scrollToSection('find-school');
            }}
            className="px-5 py-3 rounded-xl bg-[#14532D] text-white text-[14px] font-semibold hover:bg-[#0f3d21] transition-all shadow-xs cursor-pointer active:scale-95"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Find your university
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#13241A] hover:bg-black/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2EBE5] shadow-lg flex flex-col gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="text-left py-2 px-3 text-[15px] font-medium text-[#33463A] hover:bg-[#F7FBF8] rounded-lg"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="text-left py-2 px-3 text-[15px] font-medium text-[#33463A] hover:bg-[#F7FBF8] rounded-lg"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => {
              if (onFindSchoolClick) onFindSchoolClick();
              else scrollToSection('find-school');
            }}
            className="text-left py-2 px-3 text-[15px] font-medium text-[#33463A] hover:bg-[#F7FBF8] rounded-lg"
          >
            Find your school
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="text-left py-2 px-3 text-[15px] font-medium text-[#33463A] hover:bg-[#F7FBF8] rounded-lg"
          >
            FAQ
          </button>
          <div className="pt-2 border-t border-[#E2EBE5] flex flex-col gap-2">
            <Link
              href="/auth"
              className="py-2.5 text-center text-[15px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] rounded-lg"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={() => {
                if (onFindSchoolClick) onFindSchoolClick();
                else scrollToSection('find-school');
              }}
              className="w-full py-3 rounded-xl bg-[#14532D] text-white text-[14px] font-semibold text-center"
            >
              Find your university
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
