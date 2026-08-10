import React from 'react'
import { motion } from 'framer-motion';


export default function Hero() {
    return (
        <div className="w-full text-center max-w-4xl mx-auto space-y-4 mb-10">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-4 text-heading font-normal tracking-tight leading-tight"
            >
                Fast-Track University <span className="font-sans not-italic font-black text-green-400 bg-clip-text">Clearance</span> Processes
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted max-w-2xl mx-auto tracking-wide mb-10 text-sm md:text-base leading-relaxed"
            >
                Unified institutional gateway to complete departmental, library, and bursary clearances with simple digital verification.
            </motion.p>
        </div>
    )
}
