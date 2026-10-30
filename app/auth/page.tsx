'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { INSTITUTIONS } from '@/data/institution';
import UniversityCrest from '@/components/landing/UniversityCrest';
import SchoolSplash from '@/components/auth/SchoolSplash';
import AuthShell from '@/components/auth/AuthShell';
import BrandPanel from '@/components/auth/BrandPanel';

export default function SelectUniversityPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [splash, setSplash] = useState<{ code: string; name: string } | null>(null);

  const filtered = INSTITUTIONS.filter(
    i =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.code.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (code: string, name: string) => {
    setSplash({ code, name });
    setTimeout(() => {
      const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
      if (appDomain) {
        window.location.href = `https://${code.toLowerCase()}.${appDomain}/auth`;
      } else {
        router.push(`/auth/${code}`);
      }
    }, 1800);
  };

  if (splash) {
    return <SchoolSplash code={splash.code} name={splash.name} />;
  }

  return (
    <AuthShell
      brandContent={<BrandPanel
        headline='Your next chapter starts,'
        headlineBreak='with the right campus.'
        authImage='/images/auth-select-school.png'
        features={["Find your university.", "Access the right clearance process.", "Keep your academic journey moving."]}
      />}
      header={""}
    >

      <div className="h-screen w-full bg-[#F7F8F8] flex flex-col items-center py-12">
        <div className="w-full">
          <div className="bg-white rounded-[25px] p-10 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2 ">
              Select your university
            </h1>
            <p className="text-gray-500 text-sm mb-8 ">
              Choose your institution to sign in or create an account.
            </p>

            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for your university..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition-all"
              />
            </div>

            <div className="space-y-2">
              {filtered.map(inst => (
                <button
                  key={inst.code}
                  type="button"
                  onClick={() => handleSelect(inst.code, inst.name)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                    <UniversityCrest code={inst.code} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{inst.name}</p>
                    <p className="text-xs text-gray-400">{inst.code.toLowerCase()}.clearus.tech</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors shrink-0" />
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-6">
                  No universities found matching &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </AuthShell>

  );
}
