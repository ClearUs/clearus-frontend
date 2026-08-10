'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Institution } from '@/types/index';
import RadarSpinner from '@/components/redirect/RadarSpinner';
import StepProgressionCard from '@/components/redirect/StepProgressionCard';

interface RedirectionSplashProps {
    institution: Institution;
    onRedirectComplete: () => void;
}

export default function RedirectionSplash({ institution, onRedirectComplete }: RedirectionSplashProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStep(1), 700);
        const t2 = setTimeout(() => setStep(2), 1400);
        const t3 = setTimeout(() => setStep(3), 2100);
        const t4 = setTimeout(() => onRedirectComplete(), 2900);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [institution, onRedirectComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 min-h-137.5"
        >
            <div className="max-w-md w-full text-center space-y-6">

                <RadarSpinner institutionCode={institution.code} />

                <div>
                    <h2 className="text-xl md:text-2xl font-serif italic mb-2 text-heading">
                        Connecting to University Gateway
                    </h2>
                    <div className="inline-flex items-center justify-center gap-2 bg-surface-inset border border-edge px-4 py-2 rounded-xl font-mono text-xs">
                        <span className="text-muted">clearus.com</span>
                        <ArrowRight className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-bold">{institution.shortName.toLowerCase()}.clearus.com/login</span>
                    </div>
                </div>

                <StepProgressionCard step={step} />
            </div>
        </motion.div>
    );
}
