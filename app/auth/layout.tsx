"use client"
import React from 'react';
import { motion } from 'framer-motion';

import TopNav from '@/components/auth/BrandedLogin/TopNav';
import Footer from '@/components/shared/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-bg-dark">
            <TopNav />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
            >

                {children}
            </motion.div>
            <Footer />
        </main>
    );
}