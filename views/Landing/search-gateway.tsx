import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { INSTITUTIONS } from '@/data/institution';
import { Institution } from '@/types';
import { AlertCircle, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { ActiveSearching, FoundInstitutes } from '@/components/landing/search-gateway/SearchStates';


export default function SearchGateway({ setRecentCodes, handleSelectWithRecent }: { setRecentCodes: React.Dispatch<React.SetStateAction<string[]>>, handleSelectWithRecent: (school: Institution) => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isValidatingCode, setIsValidatingCode] = useState(false);
    const [dbValidatedSchool, setDbValidatedSchool] = useState<{ code: string; name: string } | null>(null);
    const [dbValidationError, setDbValidationError] = useState<string | null>(null);

    // Load recently accessed universities from local storage on mount
    useEffect(() => {
        try {
            const existing = localStorage.getItem('clearus_recent_schools');
            if (existing) {
                setRecentCodes(JSON.parse(existing));
            } else {
                // Fallback default list so the grid has beautiful content on initial load
                const defaultList = ['FUTO', 'UNILAG'];
                localStorage.setItem('clearus_recent_schools', JSON.stringify(defaultList));
                setRecentCodes(defaultList);
            }
        } catch (e) {
            console.error('Error reading recent schools', e);
        }
    }, [setRecentCodes]);

    // Real-time Database active validation check on typing
    useEffect(() => {
        const trimmed = searchQuery.trim();
        if (trimmed.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- clears async validation state when the input is emptied
            setDbValidatedSchool(null);
            setDbValidationError(null);
            return;
        }

        setIsValidatingCode(true);
        const delayDebounce = setTimeout(async () => {
            try {
                const res = await fetch(`/api/public/validate-code?code=${encodeURIComponent(trimmed)}`);
                const data = await res.json();
                if (data.valid) {
                    setDbValidatedSchool({ code: data.code, name: data.name });
                    setDbValidationError(null);
                } else {
                    setDbValidatedSchool(null);
                    if (trimmed.length >= 2) {
                        setDbValidationError(`No registered university matches "${trimmed.toUpperCase()}".`);
                    }
                }
            } catch (err) {
                console.error("DB Validation failed", err);
            } finally {
                setIsValidatingCode(false);
            }
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const filteredSchools = INSTITUTIONS.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Simulated Asynchronous registry typeahead lookup
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- drives the debounced typeahead spinner; reset via the timer below
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
            }, 250); // Mimic rapid DNS lookup
            return () => clearTimeout(timer);
        } else {
            setIsSearching(false);
        }
    }, [searchQuery]);

    const handleSubmitCode = (e: React.SubmitEvent) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;

        const matched = INSTITUTIONS.find(
            s => s.code.toUpperCase() === query.toUpperCase() ||
                s.name.toLowerCase().includes(query.toLowerCase())
        );

        if (matched) {
            handleSelectWithRecent(matched);
            setErrorMsg('');
            setSearchQuery('');
        } else {
            //   onEnterSchoolCode(query);
        }
    };
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-xl mx-auto w-full mb-4 relative group"
            >
                <div className="absolute -inset-1 bg-linear-to-r from-green-500/10 via-green-500/35 to-green-500/10 rounded-full blur opacity-30 group-focus-within:opacity-75 transition duration-1000"></div>
                <div className="relative bg-white border border-green-400 rounded-full p-1 shadow-2xl transition-all">
                    <form onSubmit={handleSubmitCode} className="flex flex-row items-center">
                        <div className="flex-1 flex items-center relative">
                            <div className="hidden sm:block pl-6 pr-3 text-slate-400 font-mono text-xs uppercase tracking-wider border-r border-slate-100 shrink-0 select-none">
                                portal.clearus.com/
                            </div>
                            <Search className="sm:hidden absolute left-4 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setErrorMsg('');
                                }}
                                placeholder="FUTO"
                                className="w-full pl-11 sm:pl-6 pr-4 py-2.5 bg-transparent font-sans font-bold text-lg uppercase tracking-wider text-slate-800 focus:outline-none placeholder:text-slate-300 min-h-10"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="m-1 w-10 h-10 sm:w-auto sm:h-10 sm:px-6 bg-green-500 text-white font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-green-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                            <span className="hidden sm:inline">CONTINUE</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </button>
                    </form>

                    {/* Asynchronous Typeahead Search-Select Dropdown */}
                    {searchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10">
                            {isSearching ? (
                                <ActiveSearching />
                            ) : filteredSchools.length > 0 ? (
                                filteredSchools.map((inst) => (
                                    <FoundInstitutes key={inst.code} handleSelectWithRecent={handleSelectWithRecent} setSearchQuery={setSearchQuery} inst={inst} />
                                ))
                            ) : (
                                <div className="p-6 text-center text-xs text-white/30 font-mono">
                                    No registry match for &quot;{searchQuery.toUpperCase()}&quot;
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Real-time DB active validation status check */}
            {
                (() => {
                    if (isValidatingCode) {
                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-green-400 font-mono text-[10px] flex items-center justify-center gap-1.5 mb-6 min-h-5"
                            >
                                <Search className="w-3.5 h-3.5 animate-spin text-green-400" />
                                <span>Searching for &quot;{searchQuery.toUpperCase()}&quot;...</span>
                            </motion.div>
                        );
                    }

                    if (dbValidatedSchool) {
                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-green-400 font-medium text-xs flex items-center justify-center gap-1.5 mb-6 min-h-5"
                            >
                                <ShieldCheck className="w-4 h-4 shrink-0 text-green-400 animate-pulse" />
                                <span>University &quot;{dbValidatedSchool.name}&quot; found.</span>
                            </motion.div>
                        );
                    }

                    if (dbValidationError && searchQuery.trim().length > 0) {
                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-rose-400 font-medium text-xs flex items-center justify-center gap-1.5 mb-6 min-h-5"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{dbValidationError}</span>
                            </motion.div>
                        );
                    }

                    return null;
                })()
            }

            {
                errorMsg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-rose-400 font-medium text-xs flex items-center justify-center gap-1.5 mb-6"
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                    </motion.div>
                )
            }
        </>

    )
}
