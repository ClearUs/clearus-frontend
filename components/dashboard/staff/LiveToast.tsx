'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastData {
  id: string;
  studentName: string;
  itemName: string;
  message: string;
}

interface LiveToastProps {
  liveToast: ToastData | null;
  onClose: () => void;
}

export default function LiveToast({ liveToast, onClose }: LiveToastProps) {
  useEffect(() => {
    if (!liveToast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-dismiss after 4 seconds
    return () => clearTimeout(timer);
  }, [liveToast, onClose]);

  return (
    <AnimatePresence>
      {liveToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900/95 border border-emerald-500/30 rounded-2xl shadow-2xl p-4 flex items-start gap-3.5 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 font-mono">
            LIVE
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
              <span>🔔 Real-Time Update</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </p>
            <p className="text-[11px] text-white/90 mt-1 font-semibold truncate">
              {liveToast.studentName}
            </p>
            <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed font-sans">
              {liveToast.message}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/30 hover:text-white text-xs font-bold px-1 transition-colors cursor-pointer"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}