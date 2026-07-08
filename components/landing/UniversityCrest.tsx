import React from 'react'

export default function UniversityCrest({ code }: { code: string }) {
    if (code === 'FUTO') {
        return (
            <div className="w-12 h-12 rounded-xl bg-[#091530] border border-[#f2a900]/30 flex items-center justify-center shadow-lg relative overflow-hidden transition-all group-hover:border-[#f2a900]/60">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 L15 25 V65 C15 80 50 95 50 95 C50 95 85 80 85 65 V25 L50 5 Z" fill="#0d1b3e" stroke="#f2a900" strokeWidth="3" />
                    <circle cx="50" cy="45" r="18" stroke="#f2a900" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="50" y="78" fill="#f2a900" fontSize="13" fontWeight="900" fontFamily="monospace" textAnchor="middle">FUTO</text>
                    <path d="M42 45 L58 45 M50 37 L50 53" stroke="#f2a900" strokeWidth="2" strokeLinecap="round" />
                    <path d="M44 41 L56 49 M44 49 L56 41" stroke="#f2a900" strokeWidth="1.5" />
                </svg>
            </div>
        );
    }
    if (code === 'UNILAG') {
        return (
            <div className="w-12 h-12 rounded-xl bg-[#200505] border border-[#0051ba]/30 flex items-center justify-center shadow-lg relative overflow-hidden transition-all group-hover:border-[#0051ba]/60">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 C30 5 15 20 15 45 C15 75 50 95 50 95 C50 95 85 75 85 45 C85 20 70 5 50 5 Z" fill="#2d0a0a" stroke="#0051ba" strokeWidth="3" />
                    <path d="M30 45 Q50 35 70 45" stroke="#d97706" strokeWidth="2.5" fill="none" />
                    <path d="M30 52 Q50 42 70 52" stroke="#d97706" strokeWidth="1.5" fill="none" />
                    <rect x="42" y="58" width="16" height="12" rx="1" fill="#d97706" />
                    <text x="50" y="32" fill="#d97706" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">LAGOS</text>
                </svg>
            </div>
        );
    }
    if (code === 'UI') {
        return (
            <div className="w-12 h-12 rounded-xl bg-[#03251c] border border-[#f59e0b]/30 flex items-center justify-center shadow-lg relative overflow-hidden transition-all group-hover:border-[#f59e0b]/60">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 L85 20 V55 C85 75 50 95 50 95 C50 95 15 75 15 55 V20 L50 5 Z" fill="#064e3b" stroke="#f59e0b" strokeWidth="3" />
                    <path d="M32 40 L50 30 L68 40 V65 L50 75 L32 65 V40 Z" fill="#042f2e" stroke="#f59e0b" strokeWidth="2" />
                    <text x="50" y="52" fill="#f59e0b" fontSize="14" fontWeight="900" fontFamily="serif" textAnchor="middle">UI</text>
                    <path d="M42 58 H58" stroke="#f59e0b" strokeWidth="2" />
                </svg>
            </div>
        );
    }
    if (code === 'ABU') {
        return (
            <div className="w-12 h-12 rounded-xl bg-[#021c11] border border-[#10b981]/30 flex items-center justify-center shadow-lg relative overflow-hidden transition-all group-hover:border-[#10b981]/60">
                <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5 C50 5 85 15 85 50 C85 80 50 95 50 95 C50 95 15 80 15 50 C15 15 50 5 50 5 Z" fill="#032f1d" stroke="#10b981" strokeWidth="3" />
                    <circle cx="50" cy="40" r="15" stroke="#10b981" strokeWidth="2" />
                    <path d="M44 40 A6 6 0 1 1 56 40" stroke="#10b981" strokeWidth="2" fill="none" />
                    <text x="50" y="72" fill="#10b981" fontSize="13" fontWeight="900" fontFamily="monospace" textAnchor="middle">ABU</text>
                </svg>
            </div>
        );
    }
    return null;
}