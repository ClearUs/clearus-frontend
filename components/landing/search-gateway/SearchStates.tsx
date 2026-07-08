import { Institution } from '@/types';
import React from 'react'
import UniversityCrest from '../UniversityCrest';
import { ArrowRight } from 'lucide-react';

export function ActiveSearching() {
    return (
        <div className="flex items-center justify-center py-8 gap-2 text-xs font-mono text-white/40">
            <svg className="animate-spin h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Searching registry...</span>
        </div>
    )
}


export function FoundInstitutes({ handleSelectWithRecent, setSearchQuery, inst }: { handleSelectWithRecent: (school: Institution) => void, setSearchQuery: (value: React.SetStateAction<string>) => void, inst: Institution }) {
    return (
        <button
            type="button"
            onClick={() => {
                handleSelectWithRecent(inst);
                setSearchQuery('');
            }}
            className="w-full text-left px-5 py-4 min-h-12 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="shrink-0 scale-75">
                    <UniversityCrest code={inst.code} />
                </div>
                <div>
                    <div className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                        {inst.name}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono mt-0.5">
                        {inst.code.toLowerCase()}.clearus.com • @{inst.allowedDomains[0]}
                    </div>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
        </button>
    )
}