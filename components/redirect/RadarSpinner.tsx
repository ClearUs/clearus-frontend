import React from 'react'
import { motion } from 'framer-motion';

export default function RadarSpinner({ institutionCode }: { institutionCode: string }) {
    return (
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[3px] border-edge-subtle border-t-green-400"
            />
            <div className="w-16 h-16 rounded-full bg-surface-card flex items-center justify-center font-bold text-sm text-heading border border-edge shadow-xl tracking-tight">
                {institutionCode}
            </div>
        </div>
    )
}
