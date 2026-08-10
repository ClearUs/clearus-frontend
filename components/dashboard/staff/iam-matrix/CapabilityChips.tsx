'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CapabilityMeta } from '@/types';

interface CapabilityChipsProps {
  permissions: string[];
  capabilitiesMetadata: CapabilityMeta[];
}

export default function CapabilityChips({ permissions, capabilitiesMetadata }: CapabilityChipsProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!permissions || permissions.length === 0) {
    return <span className="text-[10px] text-subtle italic font-medium font-sans">None configured</span>;
  }

  const showMore = permissions.length > 3;
  const displayed = showMore ? permissions.slice(0, 2) : permissions;
  const remainingCount = permissions.length - 2;

  const getLabel = (key: string) => {
    return capabilitiesMetadata.find(c => c.key === key)?.label || key;
  };

  return (
    <div className={`relative flex flex-wrap items-center gap-1.5 max-w-sm ${isOpen ? 'z-40' : 'z-10'}`}>
      {displayed.map((perm) => (
        <span 
          key={perm}
          className="px-2.5 py-1 rounded bg-chip text-amber-400 border border-amber-500/25 text-[9px] font-bold font-mono tracking-tight shadow-sm"
        >
          {getLabel(perm)}
        </span>
      ))}
      
      {showMore && (
        <div className="relative inline-block">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-black font-sans tracking-tight cursor-pointer transition-all flex items-center gap-0.5"
          >
            +{remainingCount} more
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 top-full left-0 mt-1.5 p-3 bg-surface-dropdown border border-edge rounded-xl shadow-2xl flex flex-col gap-1.5 min-w-50"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="text-[8px] uppercase tracking-widest font-bold text-muted mb-1 border-b border-edge-subtle pb-1 font-mono">
                  Active Permissions
                </div>
                {permissions.map((perm) => (
                  <div key={perm} className="flex items-center gap-1.5 py-0.5 text-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-[10px] font-bold text-secondary font-sans">{getLabel(perm)}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}