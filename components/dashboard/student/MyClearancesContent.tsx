'use client';

import React, { useState, useMemo } from 'react';
import type { User } from '@/types';
import { STUDENT_CLEARANCES, type ClearanceItem } from '@/data/studentClearances';

interface MyClearancesContentProps {
  user: User;
  selectedClearanceId?: string | null;
  onSelectClearance?: (clearanceId: string) => void;
  onNavigate?: (section: string) => void;
}

type FilterType = 'all' | 'in_progress' | 'approved' | 'locked';

/* ─── SVG Icons ─── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M5.5 7V5C5.5 3.61929 6.61929 2.5 8 2.5C9.38071 2.5 10.5 3.61929 10.5 5V7" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Status Badge ─── */

function StatusBadge({ status }: { status: ClearanceItem['status'] }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#DCFCE7] text-[#15803D]" style={{ fontFamily: 'Inter, sans-serif' }}>
        Approved
      </span>
    );
  }
  if (status === 'action_required') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#16A34A] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        Action required
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#F7FBF8] text-[#5E7165]" style={{ fontFamily: 'Inter, sans-serif' }}>
      Locked
    </span>
  );
}

export default function MyClearancesContent({
  user: _user,
  onSelectClearance,
}: MyClearancesContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const counts = useMemo(() => {
    return {
      all: STUDENT_CLEARANCES.length,
      in_progress: STUDENT_CLEARANCES.filter((c) => c.status === 'action_required').length,
      approved: STUDENT_CLEARANCES.filter((c) => c.status === 'approved').length,
      locked: STUDENT_CLEARANCES.filter((c) => c.status === 'locked').length,
    };
  }, []);

  const filteredClearances = useMemo(() => {
    return STUDENT_CLEARANCES.filter((item) => {
      // Filter by status tab
      if (activeFilter === 'in_progress' && item.status !== 'action_required') return false;
      if (activeFilter === 'approved' && item.status !== 'approved') return false;
      if (activeFilter === 'locked' && item.status !== 'locked') return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDept = item.department.toLowerCase().includes(query);
        const matchOfficer = item.officer.toLowerCase().includes(query);
        return matchTitle || matchDept || matchOfficer;
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 xl:px-10 py-8 min-w-0 bg-white">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold text-[#13241A] font-jakarta tracking-tight mb-1">
          My Clearances
        </h1>
        <p className="text-[14px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Search all your clearances. Open one to see its steps and upload the required documents.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Search input */}
        <div className="relative flex-1 max-w-105">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clearances"
            className="w-full h-10.5 pl-10 pr-9 rounded-xl border border-[#E2EBE5] bg-white text-[14px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#13241A] hover:bg-[#F3F6F4] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            All <span className="opacity-90">{counts.all}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('in_progress')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'in_progress'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            In progress <span className="opacity-90">{counts.in_progress}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('approved')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'approved'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Approved <span className="opacity-90">{counts.approved}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('locked')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeFilter === 'locked'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Locked <span className="opacity-90">{counts.locked}</span>
          </button>
        </div>
      </div>

      {/* Clearances List */}
      {filteredClearances.length > 0 ? (
        <div className="space-y-3.5">
          {filteredClearances.map((clearance) => {
            const isLocked = clearance.status === 'locked';
            const isActionRequired = clearance.status === 'action_required';

            return (
              <div
                key={clearance.id}
                className={`rounded-2xl border p-5 transition-all ${
                  isActionRequired
                    ? 'border-[#15803D] bg-white shadow-xs'
                    : isLocked
                    ? 'border-[#E5E7EB] bg-white'
                    : 'border-[#E2EBE5] bg-white hover:border-[#C9D8CE]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left info block */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        clearance.status === 'approved'
                          ? 'bg-[#16A34A]'
                          : isLocked
                          ? 'bg-[#F7FBF8] border border-[#C9D8CE]'
                          : 'bg-[#F0FDF4] border-2 border-[#16A34A]'
                      }`}
                    >
                      {clearance.status === 'approved' ? (
                        <CheckCircleIcon />
                      ) : isLocked ? (
                        <LockIcon />
                      ) : (
                        <span className="text-[15px] font-semibold text-[#15803D] font-jakarta">
                          {clearance.number}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-[16px] font-semibold text-[#13241A] font-jakarta">
                          {clearance.title}
                        </h3>
                        <StatusBadge status={clearance.status} />
                      </div>
                      <p className="text-[13px] text-[#5F6D64] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {clearance.department} · {clearance.officer}
                      </p>
                    </div>
                  </div>

                  {/* Right actions block */}
                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <span
                      className={`text-[13px] font-sans ${
                        clearance.status === 'approved'
                          ? 'text-[#15803D] font-medium'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      {isLocked
                        ? clearance.unlockMessage
                        : `${clearance.stepsCompleted} of ${clearance.stepsTotal} steps`}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectClearance?.(clearance.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[13px] font-medium transition-colors cursor-pointer ${
                        isLocked
                          ? 'border-[#E5E7EB] text-[#9CA3AF] hover:bg-[#F9FAFB]'
                          : 'border-[#E2EBE5] text-[#13241A] hover:bg-[#F7FBF8] hover:border-[#C9D8CE]'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>View steps</span>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty No Results State matching Figma [205:4084] */
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-12 flex flex-col items-center justify-center text-center my-6">
          <div className="w-14 h-14 rounded-full bg-[#F3F6F4] flex items-center justify-center text-[#5F6D64] mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta mb-1.5">
            {searchQuery
              ? `No clearances match “${searchQuery}”`
              : 'No clearances match this filter'}
          </h3>
          <p className="text-[13px] text-[#5F6D64] max-w-105 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Check the spelling or try a clearance name like Library, Department or Bursary.
          </p>

          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
