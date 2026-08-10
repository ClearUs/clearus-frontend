import React from 'react';
import { GraduationCap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="w-full bg-surface-page/60 backdrop-blur-md border-b border-edge-subtle px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-30">
                <div
                    className="flex items-center gap-2.5 md:gap-3 cursor-pointer group select-none shrink-0"
                    title="Academic Network Home"
                >
                    <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-green-600 to-green-400 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <GraduationCap className="w-5 h-5 text-heading" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-sm md:text-lg font-black tracking-tight text-heading font-sans">
                            Clear<span className="text-green-400">Us</span>
                        </span>
                        <span className="block text-[8px] tracking-[0.25em] font-mono text-heading/40 uppercase group-hover:text-heading/60 transition-colors">
                            Academic Network
                        </span>
                    </div>
                </div>
                <ThemeToggle />
            </header>
  );
}
