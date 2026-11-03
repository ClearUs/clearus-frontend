import React from 'react';

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen bg-white text-[#13241A] font-sans antialiased selection:bg-[#DCFCE7] selection:text-[#15803D]">
            {children}
        </div>
    );
}
