import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 w-full mt-auto relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 left-10 w-96 h-96 bg-green-500/2 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Brand & Mission Statement */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-white tracking-tight">ClearUs Systems</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed max-w-md">
                        A professional and unified student clearance portal. Fast-track graduating class audits, manage departmental reviews, and coordinate final checklists.
                    </p>
                </div>

                {/* Security & Cryptography Compliance */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-1">Platform Guidelines</h4>
                    <p className="text-xs text-white/40 leading-relaxed max-w-md">
                        Maintains secure standard data privacy guidelines to protect student and university records under institutional policies.
                    </p>
                </div>
            </div>

            {/* Bottom Copyright & Terms */}
            <div className="max-w-6xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
                <p className="tracking-wide text-[11px] uppercase">
                    &copy; {new Date().getFullYear()} ClearUs Academic Systems. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6 text-[11px]">
                    <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
                    <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
                    <span className="hover:text-white transition-colors cursor-pointer">SUPPORT</span>
                </div>
            </div>
        </footer>
    );
}