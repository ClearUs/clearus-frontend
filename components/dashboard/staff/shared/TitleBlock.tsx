'use client';

import React from 'react';
import { Menu, LogOut, GraduationCap, ArrowLeft } from 'lucide-react';
import { Institution, User } from '@/types';
import Link from 'next/link';
import ThemeToggle from '@/components/shared/ThemeToggle';

interface TitleBlockProps {
    institution: Institution;
    user: User;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function StaffTitleBlock({ institution, user, sidebarOpen, setSidebarOpen }: TitleBlockProps) {
    return (
        <div className="flex flex-col fixed top-0 left-0 w-screen z-30 ">
            <div className="w-full bg-surface-page/60  backdrop-blur-md border-b border-edge-subtle px-6 md:px-12 py-5 flex items-center justify-between">
                <div
                    className="flex items-center gap-2.5 md:gap-3 cursor-pointer group select-none shrink-0"
                    title="Academic Network Home"
                >
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-xl hover:bg-heading/10 text-heading border border-heading/10 transition-colors cursor-pointer"
                    >
                        <Menu className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    </button>

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
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link
                        href="/"
                        className="text-xs bg-white/5 hover:bg-white/10 text-heading/80 hover:text-heading px-3 py-2 rounded-xl border border-edge-subtle transition-all flex items-center gap-1.5 cursor-pointer font-medium font-sans"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Change University</span>
                    </Link>
                </div>
            </div>
            <div className={`${institution.colorTheme.primaryBg || 'bg-[#200505]'} border-b w-full border-white/5 px-6 py-4 text-heading flex items-center justify-between shadow-xl transition-colors duration-300`}>
                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-heading border border-white/15">
                            {institution.code}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h2 className="font-bold tracking-tight text-sm md:text-base">{institution.name}</h2>
                                <span className="bg-amber-400 text-slate-900 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wide">University Portal</span>
                            </div>
                            <p className="text-[10px] text-heading/70 italic">&quot;{institution.motto}&quot;</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">
                        {user.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="text-left hidden sm:block">
                        <div className="font-bold text-xs">{user.name}</div>
                        <div className="text-[10px] text-heading/70 font-mono">
                            Staff ID: {user.id}
                        </div>
                    </div>

                    <Link href="/">
                        <button
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-heading transition-all cursor-pointer border border-white/10"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
