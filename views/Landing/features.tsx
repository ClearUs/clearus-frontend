import { Building2, Code2, ShieldCheck } from 'lucide-react'
import React from 'react'

export default function Features() {
    return (
        <div className="max-w-5xl mx-auto w-full border-t border-white/10 pt-10 mt-10 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0b0b0b] border border-white/5 p-6 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center font-bold text-xs">1</div>
                    <div>
                        <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                            <Code2 className="w-4 h-4 text-green-400" />
                            Global Student Routing
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            When a university is selected, the platform securely guides you to your institution&apos;s custom authentication portal.
                        </p>
                    </div>
                </div>

                <div className="bg-[#0b0b0b] border border-white/5 p-6 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center font-bold text-xs">2</div>
                    <div>
                        <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-green-400" />
                            Tailored Institutional Themes
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            The gateway loads designated logos, primary visual brand styles, departmental checksheets, and local rules automatically.
                        </p>
                    </div>
                </div>

                <div className="bg-[#0b0b0b] border border-white/5 p-6 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center font-bold text-xs">3</div>
                    <div>
                        <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-green-400" />
                            Academic Domain Verification
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Verifies credentials against authorized academic email domains to maintain clearance protocol security and reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
