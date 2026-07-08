'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Institution } from '@/types/index';
import Hero from '@/views/Landing/hero';
import SearchGateway from '@/views/Landing/search-gateway';
import RecentInstitution from '@/views/Landing/recent-institution';
import Features from '@/views/Landing/features';
import RedirectionSplash from '@/views/Redirect/redirection-splash';

export default function LandingPage() {
    const router = useRouter();
    const [viewState, setViewState] = useState<'directory' | 'redirect'>('directory');
    const [selectedSchool, setSelectedSchool] = useState<Institution | null>(null);
    const [recentCodes, setRecentCodes] = useState<string[]>([]);

    // Load recently accessed codes from localStorage on client-side initialization
    useEffect(() => {
        try {
            const existing = localStorage.getItem('clearus_recent_schools');
            if (existing) {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration from localStorage; must run in an effect to avoid an SSR hydration mismatch
                setRecentCodes(JSON.parse(existing));
            } else {
                const defaultList = ['FUTO', 'UNILAG'];
                localStorage.setItem('clearus_recent_schools', JSON.stringify(defaultList));
                setRecentCodes(defaultList);
            }
        } catch (e) {
            console.error('Error reading recent schools', e);
        }
    }, []);

    const handleSelectSchool = (school: Institution) => {
        setSelectedSchool(school);
        setViewState('redirect');
    };

    const handleSelectWithRecent = (school: Institution) => {
        try {
            const existing = localStorage.getItem('clearus_recent_schools');
            let list: string[] = existing ? JSON.parse(existing) : [];
            list = list.filter(code => code !== school.code);
            list.unshift(school.code);
            list = list.slice(0, 3);
            localStorage.setItem('clearus_recent_schools', JSON.stringify(list));
            setRecentCodes(list);
        } catch (e) {
            console.error('Error saving recent school', e);
        }
        handleSelectSchool(school);
    };

    const handleRedirectComplete = () => {

        if (!selectedSchool) return;

        router.push(`/auth/${selectedSchool.code}`);

    };

    return (
        <div className="flex-1 w-full flex flex-col justify-center min-h-[calc(100vh-180px)]">
            <AnimatePresence mode="wait">
                {viewState === 'directory' && (
                    <div key="directory-view" className="w-full flex flex-col items-center">
                        <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col items-center justify-center z-10">
                            <Hero />
                            <SearchGateway
                                setRecentCodes={setRecentCodes}
                                handleSelectWithRecent={handleSelectWithRecent}
                            />
                            {recentCodes.length > 0 && (
                                <RecentInstitution
                                    recentCodes={recentCodes}
                                    setRecentCodes={setRecentCodes}
                                    handleSelectWithRecent={handleSelectWithRecent}
                                />
                            )}
                            <Features />
                        </main>
                    </div>
                )}

                {viewState === 'redirect' && selectedSchool && (
                    <div key="redirect-view" className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col items-center justify-center z-10">
                        <RedirectionSplash
                            institution={selectedSchool}
                            onRedirectComplete={handleRedirectComplete}
                        />
                    </div>
                )}

            </AnimatePresence>
        </div>
    );
}