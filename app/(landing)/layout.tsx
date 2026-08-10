import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="w-full min-h-screen bg-bg-dark flex flex-col justify-between relative overflow-hidden">
            {/* Structural Ambient Background Radial Fades */}
            <div className="absolute top-1/4 left-1/4 w-150 h-[150 rounded-full bg-brand-green/2 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-150 h-150 rounded-full bg-brand-green-bright/1 blur-[150px] pointer-events-none -z-10" />

            <div className="w-full min-h-screen flex flex-col justify-between text-body font-sans">

                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    );
}
