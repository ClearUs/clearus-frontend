import { ArrowLeft, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '@/components/shared/ThemeToggle'

export default function TopNav() {
    return (
        <div className="w-full bg-surface-page/60 backdrop-blur-md border-b border-edge-subtle px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-50">
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
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link
                    href={process.env.NEXT_PUBLIC_APP_DOMAIN!}
                    className="text-xs bg-white/5 hover:bg-white/10 text-heading/80 hover:text-heading px-3 py-2 rounded-xl border border-edge-subtle transition-all flex items-center gap-1.5 cursor-pointer font-medium font-sans"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change University</span>
                </Link>
            </div>
        </div>
    )
}
