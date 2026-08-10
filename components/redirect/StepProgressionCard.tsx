import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import React from 'react'

export default function StepProgressionCard({ step }: { step: number }) {
    return (
        <div className="text-left space-y-3.5 max-w-sm mx-auto bg-surface-card p-5 rounded-2xl border border-edge-subtle shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between text-[10px] uppercase text-faint font-bold font-mono tracking-widest border-b border-edge-subtle pb-2 mb-1">
                <span>Redirection Step</span>
                <span>Status</span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <span className={step >= 0 ? 'text-secondary' : 'text-subtle'}>1. Connecting to school gateway</span>
                {step > 0 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                ) : (
                    <Loader2 className="w-3.5 h-3.5 text-green-400 animate-spin shrink-0" />
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <span className={step >= 1 ? 'text-secondary' : 'text-subtle'}>2. Retrieving clearance details</span>
                {step > 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                ) : step === 1 ? (
                    <Loader2 className="w-3.5 h-3.5 text-green-400 animate-spin shrink-0" />
                ) : (
                    <span className="text-[10px] text-subtle font-bold font-mono uppercase tracking-wider">Pending</span>
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <span className={step >= 2 ? 'text-secondary' : 'text-subtle'}>3. Loading authorized email domains</span>
                {step > 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                ) : step === 2 ? (
                    <Loader2 className="w-3.5 h-3.5 text-green-400 animate-spin shrink-0" />
                ) : (
                    <span className="text-[10px] text-subtle font-bold font-mono uppercase tracking-wider">Pending</span>
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium border-t border-edge-subtle pt-3 mt-1">
                <span className={step >= 3 ? 'text-heading font-semibold' : 'text-subtle'}>Configuring visual theme</span>
                {step >= 3 ? (
                    <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase border border-green-500/20">
                        <ShieldCheck className="w-2.5 h-2.5" /> Secure
                    </div>
                ) : (
                    <span className="text-[10px] text-subtle font-bold font-mono uppercase tracking-wider">Injecting</span>
                )}
            </div>
        </div>
    )
}
