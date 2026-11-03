'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Institution } from '@/types/index';
import HeroSection from '@/views/Landing/HeroSection';
import HowItWorksSection from '@/views/Landing/HowItWorksSection';
import FeaturesSection from '@/views/Landing/FeaturesSection';
import StudentsSection from '@/views/Landing/StudentsSection';
import FindYourSchoolSection from '@/views/Landing/FindYourSchoolSection';
import ForSchoolsSection from '@/views/Landing/ForSchoolsSection';
import FaqSection from '@/views/Landing/FaqSection';
import FinalCtaSection from '@/views/Landing/FinalCtaSection';
import FooterSection from '@/views/Landing/FooterSection';
import RedirectionSplash from '@/views/Redirect/redirection-splash';

export default function LandingPage() {
    const router = useRouter();
    const [viewState, setViewState] = useState<'directory' | 'redirect'>('directory');
    const [selectedSchool, setSelectedSchool] = useState<Institution | null>(null);
    const [_recentCodes, setRecentCodes] = useState<string[]>([]);

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

        const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
        if (appDomain) {
            window.location.href = `https://${selectedSchool.code.toLowerCase()}.${appDomain}/auth`;
        } else {
            router.push(`/auth/${selectedSchool.code}`);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <AnimatePresence mode="wait">
                {viewState === 'directory' && (
                    <div key="directory-view" className="w-full flex flex-col items-center">
                        <main className="w-full flex flex-col">
                            {/* Section 1: Hero, Navbar & Value Strip */}
                            <HeroSection
                                onFindSchoolClick={() => {
                                    const el = document.getElementById('find-school');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            />

                            {/* Section 2: How It Works [385:357] */}
                            <HowItWorksSection />

                            {/* Section 3: Features Bento Grid [385:661] */}
                            <FeaturesSection />

                            {/* Section 4: Students Section [427:3298] */}
                            <StudentsSection />

                            {/* Section 5: Find Your School [385:2134] */}
                            <FindYourSchoolSection onSelectSchool={handleSelectWithRecent} />

                            {/* Section 6: For Schools [385:2168] */}
                            <ForSchoolsSection />

                            {/* Section 7: FAQ [385:2201] */}
                            <FaqSection />

                            {/* Section 8: Final CTA [385:2233] */}
                            <FinalCtaSection
                                onFindSchoolClick={() => {
                                    const el = document.getElementById('find-school');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            />

                            {/* Section 9: Footer [385:2289] */}
                            <FooterSection />
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