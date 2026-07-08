import UniversityCrest from '@/components/landing/UniversityCrest'
import React from 'react'

interface LeftPanelProps {
  code: string;
  name: string;
  motto: string;
  staffDomain: string;
  studentDomain: string;
  bannerGradient: string; 
}

export default function LeftPanel({
  code, 
  name, 
  motto, 
  staffDomain, 
  studentDomain,
  bannerGradient
}: LeftPanelProps) {
  return (
    <div className={`w-full md:w-5/12 bg-linear-to-b ${bannerGradient} p-8 flex flex-col justify-between relative border-r border-white/5`}>
      {/* Subtle overlay elements for structural depth */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/2 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white/2 blur-2xl pointer-events-none" />

      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-4 mt-4">
          <UniversityCrest code={code} />
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-green-400 font-mono">
              Institutional Identity
            </span>
            <h1 className="text-xl font-bold font-serif italic text-white tracking-tight leading-tight">
              {name}
            </h1>
          </div>
        </div>
        <p className="text-xs md:text-sm text-white/60 italic font-serif border-l border-green-500/40 pl-3">
          &quot;{motto}&quot;
        </p>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-3 font-mono text-[11px] relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
          Institutional Guidelines
        </span>
        <div className="space-y-1.5 text-white/70">
          <p>• Staff Portal Domain: <strong className="text-white font-sans">{staffDomain}</strong></p>
          <p>• Student Portal Domain: <strong className="text-white font-sans">{studentDomain}</strong></p>
          <p className="text-amber-400/80">• Only official institutional emails allowed.</p>
        </div>
      </div>
    </div>
  )
}