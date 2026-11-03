'use client';

import React from 'react';
import Link from 'next/link';

function ClearUsLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="url(#paint0_linear_footer_logo)" />
      <path
        d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#DCFCE7"
      />
      <defs>
        <linearGradient id="paint0_linear_footer_logo" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FooterSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-[#E2EBE5]/60 pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
      <div className="w-full max-w-312 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top Row matching Figma [385:2290] (1200x147, layout=HORIZONTAL, space-between) */}
        <div className="max-w-300 mx-auto flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-start gap-10 lg:gap-8">
          {/* Brand Column matching Figma [385:2291] (300px) */}
          <div className="w-full md:w-auto lg:w-75 shrink-0 flex flex-col items-start gap-4 max-w-[320px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <ClearUsLogo />
              <div className="flex flex-col">
                <span className="text-[17px] font-bold tracking-tight text-[#13241A] font-jakarta">
                  Clear<span className="text-[#15803D]">Us</span>
                </span>
                <span className="text-[9px] text-[#8A9A90] font-semibold tracking-wider uppercase font-sans">
                  Academic Network
                </span>
              </div>
            </Link>
            <p
              className="text-[15px] text-[#5E7165] leading-5.5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Academic clearance for Nigerian universities, fully online.
            </p>
          </div>

          {/* Product Column matching Figma [385:2299] (117px) */}
          <div className="w-auto flex flex-col gap-3.5">
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              Product
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors cursor-pointer text-left"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('features')}
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors cursor-pointer text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('find-school')}
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors cursor-pointer text-left"
                >
                  Find your school
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Students Column matching Figma [385:2305] (151px) */}
          <div className="w-auto flex flex-col gap-3.5">
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              Students
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>
                <Link
                  href="/auth"
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors cursor-pointer text-left"
                >
                  Help centre
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@clearus.tech?subject=Registry%20Inquiry"
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors"
                >
                  Contact your registry
                </a>
              </li>
            </ul>
          </div>

          {/* Schools Column matching Figma [385:2310] (203px) */}
          <div className="w-auto flex flex-col gap-3.5">
            <h3 className="text-[15px] font-bold text-[#13241A] font-jakarta">
              Schools
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>
                <Link
                  href="/request-school"
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors"
                >
                  Bring ClearUs to your school
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@clearus.tech"
                  className="text-[#5E7165] hover:text-[#15803D] transition-colors"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider matching Figma [385:2314] */}
        <div className="w-full max-w-300 mx-auto h-px bg-[#E2EBE5] my-10 sm:my-12" />

        {/* Footer Bottom Row matching Figma [385:2315] */}
        <div
          className="max-w-300 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#8A9A90]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <p>© 2026 ClearUs Digital Infrastructure Limited. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-[#13241A] transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#13241A] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
