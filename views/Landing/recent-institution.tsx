import React from 'react'
import { motion } from 'framer-motion';
import { ExternalLink, History } from 'lucide-react';
import { INSTITUTIONS } from '@/data/institution';
import UniversityCrest from '@/components/landing/UniversityCrest';
import { Institution } from '@/types';


export default function RecentInstitution({ recentCodes, setRecentCodes: _setRecentCodes, handleSelectWithRecent }: { recentCodes: string[], setRecentCodes: React.Dispatch<React.SetStateAction<string[]>>, handleSelectWithRecent: (school: Institution) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-4xl mx-auto mt-8 text-left"
        >
            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-green-400" />
                    Recently Accessed Portals
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentCodes.map((code) => {
                    const school = INSTITUTIONS.find(inst => inst.code === code);
                    if (!school) return null;

                    return (
                        <button
                            key={school.code}
                            onClick={() => handleSelectWithRecent(school)}
                            className="p-5 rounded-xl bg-white/2 border border-white/10 hover:border-green-500/30 hover:bg-white/4 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-40 text-left shadow-lg relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/1 rounded-bl-full pointer-events-none"></div>
                            <div className="flex justify-between items-start w-full mb-3">
                                <UniversityCrest code={school.code} />
                                <span className="bg-white/5 text-white/70 border border-white/10 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                                    {school.code}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors tracking-tight line-clamp-2 leading-snug">
                                    {school.name}
                                </h3>
                                <div className="text-[11px] font-mono text-green-400 group-hover:text-green-300 transition-colors mt-2.5 flex items-center gap-1">
                                    <span>{school.shortName.toLowerCase()}.clearus.com</span>
                                    <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-green-300/60 transition-colors" />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    )
}
